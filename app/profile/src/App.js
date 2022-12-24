import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import NoPage from "./views/404";
import Home from "./views/home";
import Layout from "./views/layout";
import Login from './views/login';
import Profile from "./views/profile";
import Register from "./views/register";
import injectContext from "../src/context/appContext";
import { Details } from "./views/details";
import Editor from "./views/editor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="editor" element={<Editor />} />
          <Route path="/star/:id" element={<Details />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default injectContext(App);
