// git test
import { Card, CardHeader} from "@nextui-org/react";
import { NavBar } from "./components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom"; 
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <BrowserRouter>
      <main className="dark text-foreground bg-background">
        <NavBar />
        <Routes>
          <Route
            path="/home"
            element={<Homepage/>}
          />
          <Route
            path="/"
            element={<Homepage/>}
          />
          <Route
            path="*"
            element={<NotFound/>}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
} 

export default App;
