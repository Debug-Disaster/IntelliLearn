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
import {Classroom as SecondClassroom} from "./components/Classroom";
import Classroom from "./pages/Classroom";
import JoinClassroom from "./pages/JoinClassroom";
import MyClasses from "./pages/MyClasses";
import { PostAssignment } from "./pages/PostAssignment";
import { Assignment } from "./components/Assignment";
import MinaAi from "./pages/MinaAi";
import { PostLesson } from "./pages/PostLesson";
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
            path="/classrooms/create"
            element={<CreateClassroom/>}
          />
          <Route
            path="/profile/:username"
            element={<Profil/>}
          />
          <Route
            path="/profile/:username/:action"
            element={<Profil/>}
          />
          <Route
            path="/classrooms"
            element={<Classroom/>}
          />
          <Route
            path="/classrooms/join"
            element={<JoinClassroom/>}
          />
          <Route
            path="/classrooms/myclasses"
            element={<MyClasses/>}
          />
          <Route
            path="/classrooms/view/:id"
            element={<SecondClassroom/>}
          />
          <Route
            path="/classrooms/:id/new/assignment"
            element={<PostAssignment/> }  
          />
          <Route
            path="/classrooms/:id/new/lesson"
            element={<PostLesson/> }  
          />
          <Route
            path="/classrooms/:id/assignment/:index"
            element={<Assignment/>}
          />
          <Route
            path="/minaAi"
            element={<MinaAi/>}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
} 

export default App;
