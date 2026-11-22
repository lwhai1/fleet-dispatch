// Firebase 配置与兼容辅助文件
// 请将下方占位字段替换为你在 Firebase 控制台 -> Project settings -> General 中的真实 Web 应用配置
const FIREBASE_CONFIG = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "fleet-dispatch-tx.firebaseapp.com",
  databaseURL: "https://fleet-dispatch-tx-default-rtdb.firebaseio.com",
  projectId: "fleet-dispatch-tx",
  storageBucket: "fleet-dispatch-tx.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

window.FIREBASE_CONFIG = FIREBASE_CONFIG;

window.FleetSync = Object.assign({}, window.FleetSync || {}, {
  FIREBASE_CONFIG: FIREBASE_CONFIG,
  ENABLE_FIREBASE: true,
  DEFAULT_STATE: {
    drivers: [
      { id: "d1", name: "陈师傅", code: "CHEN01" },
      { id: "d2", name: "李师傅", code: "LI02" },
      { id: "d3", name: "王师傅", code: "WANG03" }
    ],
    members: [],
    routes: [
      { id: "r1", lineName: "1号线", vehicleNo: "1号车", assignedDriverId: "d1", dispatchDate: "", departureTime: "08:00", stops: [] },
      { id: "r2", lineName: "2号线", vehicleNo: "2号车", assignedDriverId: "d2", dispatchDate: "", departureTime: "08:00", stops: [] },
      { id: "r3", lineName: "3号线", vehicleNo: "3号车", assignedDriverId: "d3", dispatchDate: "", departureTime: "08:00", stops: [] }
    ],
    updatedAt: new Date().toISOString()
  }
});
