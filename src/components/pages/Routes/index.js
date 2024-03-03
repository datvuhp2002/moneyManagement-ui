import config from "~/config";
import Home from "../Home";
import Login from "../Login";
import { FooterOnly } from "~/layout";
const publicRoutes = [
  {
    path: config.routes.login,
    component: Login,
    layout: FooterOnly,
  },
];
const privateRoutes = [{ path: config.routes.home, component: Home }];
export { publicRoutes, privateRoutes };
