import "../styles/App.css";
import { getPosts } from "../api/index";

import { useEffect, useState } from "react";
import { Home, Login, Register, Settings, UserProfile } from "../pages/index";
import { Loader, Navbar } from "./index";
import "../styles/index.css";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "../hook/index";

function App() {
  const auth = useAuth();

  useEffect(() => {
    console.log(auth.user, "from app");
  });

  if (auth.loading) {
    return <Loader />;
  }
  //to check useParams
  const Test = () => {
    let { id } = useParams();
    return <div>now showinng{id}</div>;
  };
  //to check tostify
  function Notification() {
    const notify = () => {
      toast.success("my toast mesage", {
        position: toast.POSITION.TOP_CENTER,
      });
    };

    return (
      <div>
        <button onClick={notify}>Notify !</button>
        <ToastContainer />
      </div>
    );
  }
  // function ProtectedRoute({ children, ...rest }) {
  //   const auth = useAuth();
  //   return (
  //     <Route
  //       {...rest}
  //       render={() => {
  //         if (auth.user) {
  //           return children;
  //         }

  //         return <Navigate  to='/login'/>
  //       }}
  //     />
  //   );
  // }
  function ProtectedRoute({ children }) {
    const auth = useAuth();
    return auth.user ? children : <Navigate to="/login" replace />;
  }
  return (
    <div className="App">
      {/* <Notification/> */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login/:id" element={<Login />} /> 
        <Route path="/user/:userId" element={<UserProfile/>} />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>404</div>} />;
      </Routes>
    </div>
  );
}

export default App;
