import Navbar from "./layouts/Navbar";
import BottomNavigation from "./layouts/BottomNavbar";
import Dashboard from "./pages/Dashboard";
import Invitation from "./pages/Invitation";
import GuestBook from "./pages/GuestBook";
import Setting from "./pages/Setting";
import { Route, Switch, useLocation } from "wouter";
import Theme from "./pages/Theme";
import DetailTheme from "./pages/DetailTheme";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

const hiddenNavRoutes = ["/login", "/register", "/forgot-password"];
const hiddenBottomRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/undangan/tema",
  "/404",
];

function App() {
  const [location] = useLocation();

  const shouldShowNav = !hiddenNavRoutes.includes(location);
  const shouldShowBottomNav = !hiddenBottomRoutes.includes(location);
  return (
    <>
      {shouldShowNav && <Navbar />}
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/undangan" component={Invitation} />
        <Route path="/bukutamu" component={GuestBook} />
        <Route path="/seting" component={Setting} />
        <Route path="/undangan/tema" component={Theme} />
        <Route path="/undangan/tema/:id" component={DetailTheme} />
        <Route path="/404" component={NotFound} />
      </Switch>
      {shouldShowBottomNav && <BottomNavigation />}
    </>
  );
}

export default App;
