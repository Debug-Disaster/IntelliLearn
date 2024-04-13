// git test
import { Card, CardHeader} from "@nextui-org/react";
import { NavBar } from "./components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom"; 
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { CreateClassroom } from "./pages/CreateClassroom";
import Profil from "./pages/Profil";
import Classroom from "./pages/Classroom";
import JoinClassroom from "./pages/JoinClassroom";
import MyClasses from "./pages/MyClasses";
import ViewClassroom from "./viewClassroom";
function App() {
  return (
    <BrowserRouter>
      <main className="dark text-foreground">
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
          <Route
            path="/signin"
            element={<SignIn/>}
          />
          <Route
            path="/signup"
            element={<SignUp/>}
          />
          <Route
            path="/classroom/create"
            element={<CreateClassroom/>}
          />
          <Route
            path="/profile/:username"
            element={<Profil/>}
          />
          <Route
            path="/classroom"
            element={<Classroom/>}
          />
          <Route
            path="/classroom/join"
            element={<JoinClassroom/>}
          />
          <Route
            path="/classroom/myclasses"
            element={<MyClasses/>}
          />
          <Route
            path="/classroom/:classroomId"
            element={<ViewClassroom/>}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
} 

export default App;
