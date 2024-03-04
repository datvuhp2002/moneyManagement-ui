import config from "~/config";
import Home from "../../components/pages/Home";
import Login from "../../components/pages/Login";
import { FooterOnly } from "~/layout";
import Register from "~/components/pages/Register";
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
