// Firebase 配置与默认数据结构
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDmu4gvfwamueoENzCKBITSOiU25gp_X4g",
  authDomain: "fleet-dispatch-tx.firebaseapp.com",
  databaseURL: "https://fleet-dispatch-tx-default-rtdb.firebaseio.com",
  projectId: "fleet-dispatch-tx",
  storageBucket: "fleet-dispatch-tx.firebasestorage.app",
  messagingSenderId: "217502711239",
  appId: "1:217502711239:web:813029b32a27856a57ede2"
};

window.FIREBASE_CONFIG = FIREBASE_CONFIG;

// 约 50 个常用地点库（选中后自动带出详细地址）
const COMMON_LOCATIONS = [
  { name: "丰健伟诊所", address: "9150 Bellaire Blvd, Houston, TX 77036" },
  { name: "阳光中心（Westline 主中心）", address: "6501 Westline Dr, Houston, TX 77036" },
  { name: "休斯敦卫理公会医院（医学中心）", address: "6565 Fannin St, Houston, TX 77030" },
  { name: "休斯敦卫理公会西区医院", address: "18500 Katy Fwy, Houston, TX 77094" },
  { name: "休斯敦卫理公会糖城医院", address: "16655 Southwest Fwy, Sugar Land, TX 77479" },
  { name: "纪念赫尔曼医学中心（TMC）", address: "6411 Fannin St, Houston, TX 77030" },
  { name: "纪念赫尔曼西南医院", address: "7600 Beechnut St, Houston, TX 77074" },
  { name: "纪念赫尔曼凯蒂医院", address: "23900 Katy Fwy, Katy, TX 77494" },
  { name: "纪念赫尔曼糖城医院", address: "1317 Lake Pointe Pkwy, Sugar Land, TX 77478" },
  { name: "MD 安德森癌症中心", address: "1515 Holcombe Blvd, Houston, TX 77030" },
  { name: "贝勒医学院诊所（McNair）", address: "7200 Cambridge St, Houston, TX 77030" },
  { name: "德州儿童医院（医学中心）", address: "6621 Fannin St, Houston, TX 77030" },
  { name: "HCA 休斯敦医疗中心医院", address: "7737 Southwest Fwy, Houston, TX 77074" },
  { name: "HCA 休斯敦西区医院", address: "12141 Richmond Ave, Houston, TX 77082" },
  { name: "CHI 圣路加贝勒医学中心", address: "6720 Bertner Ave, Houston, TX 77030" },
  { name: "百利大道华埠诊所中心", address: "9100 Bellaire Blvd, Houston, TX 77036" },
  { name: "百利中心眼科/牙科诊所", address: "9180 Bellaire Blvd, Houston, TX 77036" },
  { name: "黄金广场医疗中心", address: "9889 Bellaire Blvd, Houston, TX 77036" },
  { name: "惠康广场医疗门诊", address: "9600 Bellaire Blvd, Houston, TX 77036" },
  { name: "百利城综合医疗中心", address: "9315 Bellaire Blvd, Houston, TX 77036" },
  { name: "敦煌广场健康服务中心", address: "9630 Clarewood Dr, Houston, TX 77036" },
  { name: "新星广场内科诊所", address: "8001 Wilcrest Dr, Houston, TX 77072" },
  { name: "糖城华埠医疗中心", address: "3524 Hwy 6 S, Sugar Land, TX 77478" },
  { name: "凯蒂亚洲城诊所", address: "23119 Colonial Pkwy, Katy, TX 77449" },
  { name: "休斯敦华人保健中心", address: "5855 Sovereign Dr, Houston, TX 77036" },
  { name: "Quest Diagnostics 百利采样点", address: "9155 Bellaire Blvd, Houston, TX 77036" },
  { name: "Labcorp 医学检验中心（西南）", address: "7500 Beechnut St, Houston, TX 77074" },
  { name: "Kelsey-Seybold 诊所（百利/西南）", address: "7580 Fannin St, Houston, TX 77054" },
  { name: "Kelsey-Seybold 诊所（糖城）", address: "1560 First Colony Blvd, Sugar Land, TX 77479" },
  { name: "Kelsey-Seybold 诊所（凯蒂）", address: "22300 Katy Fwy, Katy, TX 77450" },
  { name: "CVS Pharmacy（百利/Cook Rd）", address: "9105 Bellaire Blvd, Houston, TX 77036" },
  { name: "Walgreens（百利/Gessner）", address: "8905 Bellaire Blvd, Houston, TX 77036" },
  { name: "99 大华超级市场（百利店）", address: "9380 Bellaire Blvd, Houston, TX 77036" },
  { name: "99 大华超级市场（糖城店）", address: "16300 Southwest Fwy, Sugar Land, TX 77479" },
  { name: "99 大华超级市场（凯蒂店）", address: "23119 Colonial Pkwy, Katy, TX 77449" },
  { name: "惠康超级市场", address: "9600 Bellaire Blvd, Houston, TX 77036" },
  { name: "H-Mart 亚洲超市（百利店）", address: "1302 Blalock Rd, Houston, TX 77055" },
  { name: "H-Mart 亚洲超市（糖城店）", address: "13825 Southwest Fwy, Sugar Land, TX 77478" },
  { name: "H-E-B 超市（Beechnut/Kirkwood）", address: "12680 W Airport Blvd, Meadows Place, TX 77477" },
  { name: "Costco Wholesale（西南区）", address: "12350 Richmond Ave, Houston, TX 77082" },
  { name: "Costco Wholesale（糖城）", address: "1500 Industrial Blvd, Sugar Land, TX 77478" },
  { name: "休斯敦赫曼公园（Hermann Park）", address: "6001 Fannin St, Houston, TX 77030" },
  { name: "亚瑟·斯托里公园（Arthur Storey Park）", address: "7400 W Sam Houston Pkwy S, Houston, TX 77072" },
  { name: "糖城纪念公园（Sugar Land Memorial Park）", address: "15300 University Blvd, Sugar Land, TX 77479" },
  { name: "休斯敦中国城图书馆", address: "9130 Bellaire Blvd, Houston, TX 77036" },
  { name: "哈里斯县社保/银发服务站（西南）", address: "10701 Corporate Dr, Stafford, TX 77477" },
  { name: "德州 DMV 车管服务点（休斯敦西南）", address: "10503 S Wilcrest Dr, Houston, TX 77099" },
  { name: "休斯敦市中心市政厅", address: "901 Bagby St, Houston, TX 77002" },
  { name: "贝莱尔市社区中心", address: "7008 S Rice Ave, Bellaire, TX 77401" },
  { name: "西南纪念康复护理中心", address: "11950 S Sam Houston Pkwy W, Houston, TX 77031" }
];

window.COMMON_LOCATIONS = COMMON_LOCATIONS;

window.FleetSync = Object.assign({}, window.FleetSync || {}, {
  FIREBASE_CONFIG: FIREBASE_CONFIG,
  COMMON_LOCATIONS: COMMON_LOCATIONS,
  ENABLE_FIREBASE: true,
  DEFAULT_STATE: {
    vehicles: ["1号车", "2号车", "3号车", "4号车", "5号车", "6号车", "7号车", "8号车", "9号车"],
    drivers: [
      { id: "d1", name: "陈师傅", code: "CHEN01", email: "driver1@example.com" },
      { id: "d2", name: "李师傅", code: "LI02", email: "driver2@example.com" },
      { id: "d3", name: "王师傅", code: "WANG03", email: "driver3@example.com" }
    ],
    members: [],
    routes: [],
    regularRoutes: [],
    adhocRoutes: [],
    tripRecords: [],
    updatedAt: new Date().toISOString()
  }
});