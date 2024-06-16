import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import summaryApi from "./common";
import Context from "./context/context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const fatchUserDeatils = async () => {
    const dataResponse = await fetch(summaryApi.current_user.url, {
      method: summaryApi.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  useEffect(() => {
    fatchUserDeatils();
  });

  return (
    <>
      <Context.Provider
        value={{
          fatchUserDeatils, // user datels fatch
        }}
      >
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(100vh-120px)]">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
};

export default App;
