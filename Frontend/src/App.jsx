import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import fetchUserDetails from "./utils/auth/fetchUserDetails";
import { setUserDetails } from "./Store/userSlice";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();

  // 🔥 Hydrate auth state ONCE
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const res = await fetchUserDetails();
      if (res?.success) {
        dispatch(setUserDetails(res.data));
      }
    };

    initAuth();
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Toaster/>
      <Footer/>
    </div>
  );
}

export default App;
