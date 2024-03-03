import { FooterOnly } from "~/components/layout";
import Home from "../Home";
import Login from "../Login";

const publicRoutes = [
  { path: "/", component: Home },
  {
    path: "/login",
    component: Login,
    layout: FooterOnly,
  },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
