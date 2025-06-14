import { Button } from "@/components/ui/button";
import Navbar from "./layouts/Navbar";
import BottomNavigation from "./components/ui/bottomNavigation";
import Dashboard from "./pages/Dashboard";
import Invitation from "./pages/Invitation";
import GuestBook from "./pages/GuestBook";
import Setting from "./pages/Setting";

function App() {
  return (
    <>
      <Navbar />
      <Invitation />

      <BottomNavigation />
    </>
  );
}

export default App;
