// import logo from './logo.svg';
import { useState, Suspense, lazy, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppContext from "./Context";
import Cookies from "js-cookie";
import { UserEntity } from "./data/entity/UserEntity";
import Navbar from "./views/layout/navbar/Navbar";
const Home = lazy(() => import("./views/page/home/Home"));
const ChatList = lazy(() => import("./views/page/chat/ChatList"));
const Setting = lazy(() => import("./views/page/setting/Setting"));

function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [contextUserEntity, setContextUserEntity] = useState<UserEntity | null>(
    null
  );
  //Context
  const contextAccessToken: string = Cookies.get("token") ?? "";

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          contextAccessToken,
          contextUserEntity,
          setContextUserEntity,
        }}
      >
        <BrowserRouter>
          <Navbar showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
          <Suspense
            fallback={
              <div className="loading-text">
                <span>L</span>
                <span>o</span>
                <span>a</span>
                <span>d</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<ChatList />} />
              <Route path="/setting" element={<Setting />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
