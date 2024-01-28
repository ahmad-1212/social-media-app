import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Home from "./pages/Home";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notfound from "./pages/Notfound";
import HomeLayout from "./Components/AppLayout/HomeLayout";
import ProfileLayout from "./Components/AppLayout/ProfileLayout";
import ProtectedRoute from "./Components/UI/ProtectedRoute";
import Account from "./pages/Account";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnWindowFocus: true,
    },
  },
});

const App = () => {
  const theme = localStorage.getItem("theme");
  const element = document.documentElement;
  const contextClass = {
    success: "border-l-4 border-l-green-500",
    error: "border-l-4 border-l-red-500",
  };

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }, [theme, element.classList]);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <HomeLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="/home" />} />
            <Route path="home" index element={<Home />} />
            <Route path="notifications" element={<Notification />} />
          </Route>
          <Route
            element={
              <ProtectedRoute>
                <ProfileLayout />
              </ProtectedRoute>
            }
          >
            <Route path="profile/:profileId" element={<Profile />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectedRoute authPage={true}>
                <Login />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute authPage={true}>
                <Signup />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={false}
          role="alert"
          toastClassName={(context) =>
            contextClass[context?.type] +
            " relative flex py-3 px-2 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer text-gray-800 dark:text-gray-500 font-[500] bg-white dark:bg-gray-800 mb-3 shadow-lg items-start"
          }
        />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
