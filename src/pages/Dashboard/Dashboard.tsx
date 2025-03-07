import MainLayout from "../../components/layout/MainLayout";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbars from "../Navbar/Navbars";

type UserType = {
  email: string;
  role: "admin" | "landlord" | "tenant";
  exp: number;
  iat: number;
};

const Dashboard = () => {
  const user = useAppSelector(useCurrentUser) as UserType | null;
  const role = user?.role;
  console.log(role);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "admin") {
      navigate("/dashboard/manage_users");
    } else if (role === "landlord") {
      navigate("/dashboard/rental-listings");
    } else if (role === "tenant") {
      // navigate("/dashboard/requests");
      navigate("/dashboard/update-profile");
    } else {
      navigate("/dashboard/update-profile");
    }
  }, [navigate, role]);

  return (
    <Navbars>
      <MainLayout />
    </Navbars>
  );
};

export default Dashboard;
