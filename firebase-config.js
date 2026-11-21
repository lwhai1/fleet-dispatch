/**
 * 共享存储与同步引擎
 * 支持 localStorage + BroadcastChannel（同浏览器多标签即时同步）
 * 可选启用 Firebase Realtime Database 实现跨设备云端同步
 */
window.FleetSync = (function () {
  const STORAGE_KEY = 'fleet_dispatch_system_v2';
  const CHANNEL_NAME = 'fleet_dispatch_sync_channel_v2';

  // 如需跨手机/跨电脑云端同步，请设为 true 并填入你的 Firebase 项目配置
  const ENABLE_FIREBASE = false;
  const FIREBASE_CONFIG = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT.firebaseapp.com',
    databaseURL: 'https://YOUR_PROJECT-default-rtdb.firebaseio.com',
    projectId: 'YOUR_PROJECT',
    storageBucket: 'YOUR_PROJECT.appspot.com',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID'
  };

  const DEFAULT_STATE = {
    updatedAt: new Date().toISOString(),
    drivers: [
      { id: 'drv-1', name: '陈师傅', code: 'CHEN01' },
      { id: 'drv-2', name: '董师傅', code: 'DONG02' },
      { id: 'drv-3', name: '冯师傅', code: 'FENG03' },
      { id: 'drv-4', name: '张师傅', code: 'ZHANG04' },
      { id: 'drv-5', name: '刘师傅', code: 'LIU05' },
      { id: 'drv-6', name: '杨师傅', code: 'YANG06' },
      { id: 'drv-7', name: '马师傅', code: 'MA07' }
    ],
    members: [
      {
        id: 'm-101',
        name: '王建国',
        phone: '713-555-0142',
        address: '6501 Westline Dr, Houston, TX 77036',
        specialNeeds: '轮椅、需送上门',
        notes: '侧门坡道进入，先敲门确认'
      },
      {
        id: 'm-102',
        name: '李秀英',
        phone: '281-555-0188',
        address: '24500 Katy Fwy, Katy, TX 77494',
        specialNeeds: '需送上门',
        notes: '餐食请交到一楼前台或家属'
      },
      {
        id: 'm-103',
        name: '赵明德',
        phone: '832-555-0165',
        address: '13800 Southwest Fwy, Sugar Land, TX 77478',
        specialNeeds: '轮椅',
        notes: '需折叠轮椅放后备箱'
      },
      {
        id: 'm-104',
        name: '林美华',
        phone: '713-555-0191',
        address: '6100 Hermann Park Dr, Houston, TX 77030',
        specialNeeds: '需送上门',
        notes: '上午 9:15 前务必送达餐食'
      },
      {
        id: 'm-105',
        name: '周志强',
        phone: '281-555-0124',
        address: '10500 Bellaire Blvd, Houston, TX 77072',
        specialNeeds: '无特殊需要',
        notes: '常规站点上车'
      }
    ],
    routes: [
      {
        id: 'rt-1',
        lineName: '1号线',
        vehicleNo: '2号车',
        assignedDriverId: 'drv-1',
        stops: [
          { memberId: 'm-101', pickedUp: false, mealDelivered: false, updatedAt: '' },
          { memberId: 'm-102', pickedUp: false, mealDelivered: false, updatedAt: '' }
        ]
      },
      {
        id: 'rt-2',
        lineName: '2号线',
        vehicleNo: '4号车',
        assignedDriverId: 'drv-2',
        stops: [
          { memberId: 'm-103', pickedUp: false, mealDelivered: false, updatedAt: '' }
        ]
      },
      {
        id: 'rt-3',
        lineName: '3号线',
        vehicleNo: '1号车',
        assignedDriverId: 'drv-3',
        stops: [
          { memberId: 'm-104', pickedUp: false, mealDelivered: false, updatedAt: '' }
        ]
      },
      {
        id: 'rt-4',
        lineName: '4号线',
        vehicleNo: '3号车',
        assignedDriverId: 'drv-4',
        stops: []
      },
      {
        id: 'rt-5',
        lineName: '5号线',
        vehicleNo: '5号车',
        assignedDriverId: 'drv-5',
        stops: []
      },
      {
        id: 'rt-6',
        lineName: '6号线',
        vehicleNo: '6号车',
        assignedDriverId: 'drv-6',
        stops: []
      },
      {
        id: 'rt-7',
        lineName: '7号线',
        vehicleNo: '7号车',
        assignedDriverId: 'drv-7',
        stops: []
      }
    ]
  };

  let dbRef = null;
  const channel = ('BroadcastChannel' in window) ? new BroadcastChannel(CHANNEL_NAME) : null;

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function initFirebaseIfNeeded() {
    if (!ENABLE_FIREBASE || dbRef || !window.firebase) return;
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
    dbRef = firebase.database().ref('fleetDispatchStateV2');
  }

  function readLocal() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const initial = clone(DEFAULT_STATE);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(raw);
    } catch (e) {
      return clone(DEFAULT_STATE);
    }
  }

  function writeLocal(state) {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (channel) {
      channel.postMessage({ type: 'STATE_UPDATED', updatedAt: state.updatedAt });
    }
  }

  async function loadState() {
    initFirebaseIfNeeded();
    if (ENABLE_FIREBASE && dbRef) {
      try {
        const snap = await dbRef.once('value');
        const val = snap.val();
        if (val && Array.isArray(val.routes) && Array.isArray(val.drivers)) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
          return val;
        }
        const initial = readLocal();
        await dbRef.set(initial);
        return initial;
      } catch (err) {
        console.warn('Firebase 读取失败，回退本地存储:', err);
        return readLocal();
      }
    }
    return readLocal();
  }

  async function saveState(nextState) {
    const normalized = clone(nextState);
    writeLocal(normalized);
    initFirebaseIfNeeded();
    if (ENABLE_FIREBASE && dbRef) {
      try {
        await dbRef.set(normalized);
      } catch (err) {
        console.warn('Firebase 写入失败，已保存在本地:', err);
      }
    }
    return normalized;
  }

  function onRemoteChange(callback) {
    if (channel) {
      channel.onmessage = (event) => {
        if (event.data && event.data.type === 'STATE_UPDATED') {
          callback(readLocal());
        }
      };
    }
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          callback(JSON.parse(e.newValue));
        } catch (_) {}
      }
    });
  }

  return {
    ENABLE_FIREBASE,
    DEFAULT_STATE,
    loadState,
    saveState,
    onRemoteChange
  };
})();