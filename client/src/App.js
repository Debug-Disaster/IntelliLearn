import { Card, CardHeader} from "@nextui-org/react";
import { Navbar } from "./components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom"; 
function App() {
  return (
    <main className="dark text-foreground bg-background">
      <Navbar />
    </main>
  );
}

export default App;
