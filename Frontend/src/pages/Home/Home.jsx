import { useSelector } from "react-redux";
import UserHome from "./UserHome";
import AdminHome from "./AdminHome";
import HomeSkeleton from "./skeletons/HomeSkeleton";

const Home = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  // 🔹 While user is being fetched
  if (isAuthenticated && !user) {
    return <HomeSkeleton />;
  }

  // 🔹 Admin Home
  if (user?.role === "admin") {
    return <AdminHome />;
  }

  // 🔹 Normal User Home (default)
  return <UserHome />;
};

export default Home;
