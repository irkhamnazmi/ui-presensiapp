import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Presence from "./pages/Presence";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { Redirect, Route, Switch } from "wouter";

function App() {
  const auth = localStorage.getItem("user");

  const ProtectedRoute = ({ children }) => {
    if (!auth) {
      return <Redirect to="/login" />;
    }
    return children;
  };

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/404" component={NotFound} />

      <Route path="/">
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      </Route>
      <Route path="/presensi">
        <ProtectedRoute>
          <Layout>
            <Presence />
          </Layout>
        </ProtectedRoute>
      </Route>
      <Route path="/pengguna">
        <ProtectedRoute>
          <Layout>
            <Users />
          </Layout>
        </ProtectedRoute>
      </Route>
      <Route>
        <Redirect to="/404" />
      </Route>
    </Switch>
  );
}

export default App;
