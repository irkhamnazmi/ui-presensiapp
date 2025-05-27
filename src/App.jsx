import { Button } from "@/components/ui/button";
import Navbar from "./layouts/Navbar";
import BottomNavigation from "./components/ui/bottomNavigation";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Navbar />
      <Dashboard />

      <BottomNavigation />
    </>
  );
}

export default App;
