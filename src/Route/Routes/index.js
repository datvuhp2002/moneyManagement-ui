import config from "~/config";
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import { FooterOnly } from "~/layout";
import Register from "~/pages/Register";
import QuanLyGiaoDich from "~/pages/quanlygiaodich";
import QuanLyVi from "~/pages/quanlyvi";
import ThietLapUngDung from "~/pages/thietlapungdung";
const publicRoutes = [
  {
    path: config.routes.login,
    component: Login,
   
  },
  {
    path: config.routes.register,
    component: Register,
   
  },
];
const privateRoutes = [{ path: config.routes.home, component: Home,name:"Trang chủ" },{
  path:config.routes.quanlygiaodich,component: QuanLyGiaoDich,name:"Quản lý giao dịch"
},{
  path:config.routes.quanlyvi, component: QuanLyVi,name:"Quản lý ví"
},{
  path: config.routes.thietlapungdung, component:ThietLapUngDung,name:"Thiết Lập ứng dụng"
}];
export { publicRoutes, privateRoutes };
