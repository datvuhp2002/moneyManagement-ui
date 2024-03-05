import config from "~/config";
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import { FooterOnly } from "~/layout";
import Register from "~/pages/Register";
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
const privateRoutes = [{ path: config.routes.home, component: Home }];
export { publicRoutes, privateRoutes };
