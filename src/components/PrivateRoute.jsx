import { Redirect } from "wouter";
import { isLoggedIn } from "../lib/utils";

export default function PrivateRoute({ component: Component }) {
  return isLoggedIn() ? <Component /> : <Redirect to="/login" />;
}
