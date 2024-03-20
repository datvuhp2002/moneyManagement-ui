import config from "~/config";
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import Register from "~/pages/Register";
import QuanLyGiaoDich from "~/pages/quanlygiaodich";
import QuanLyVi from "~/pages/quanlyvi";
import ThietLapUngDung from "~/pages/thietlapungdung";
import TrangCaNhan from "~/pages/TrangCaNhan";
import CaiDat from "~/pages/CaiDat";
import ReportErrorPage from "~/pages/CaiDat/Error";
import FooterOnly from "~/layout/FooterOnly";
import ChiTietGiaoDich from "~/pages/ChiTietGiaoDich";
import ThemGiaoDich from "~/pages/themgiaodich";
const publicRoutes = [
  {
    path: config.routes.login,
    component: Login,
    layout: FooterOnly,
  },
  {
    path: config.routes.register,
    component: Register,
    layout: FooterOnly,
  },
];
const privateRoutes = [
  { path: config.routes.home, component: Home, name: "Trang chủ" },
  {
    path: config.routes.quanlygiaodich,
    component: QuanLyGiaoDich,
    name: "Quản lý giao dịch",
  },
  {
    path: config.routes.quanlyvi,
    component: QuanLyVi,
    name: "Quản lý ví",
  },
  {
    path: config.routes.thietlapungdung,
    component: ThietLapUngDung,
    name: "Thiết Lập ứng dụng",
  },
  {
    path: config.routes.trangcanhan,
    component: TrangCaNhan,
  },
  { path: config.routes.caidat, component: CaiDat },
  { path: config.routes.error, component: ReportErrorPage },
  { path: config.routes.chitietgiaodich, component: ChiTietGiaoDich },
  { path: config.routes.themgiaodich, component: ThemGiaoDich },
];
export { publicRoutes, privateRoutes };
