import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import RentalListingsCard from "./Card";
import Swipper from "./Swipper";
import Testimonials from "./Testimonials";
import { ArrowRightOutlined } from "@ant-design/icons";
const colors = {
  primary: "#1E40AF", // Deep Blue (Brand Identity)
  secondary: "#3B82F6", // Vivid Blue (Buttons & Highlights)
  accent: "#60A5FA", // Soft Blue (Accent UI Elements)
  background: "#EFF6FF", // Light Blue (Page Background)
  text: {
    primary: "#FFFFFF", // White for contrast
    secondary: "#BFDBFE", // Soft Blue for readability
    hover: "#93C5FD", // Lighter Blue for Hover Effects
  },
};

// ✅ Define User Type
interface UserType {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "landlord" | "tenant";
  status: string;
  exp: number;
  iat: number;
  address?: string | "N/A";
  phone_number?: number | "N/A";
}

const Home = () => {
  const user = useAppSelector(useCurrentUser) as UserType | null;
  const navigate = useNavigate();
  console.log("f-Home-user-role:", user?.role);

  // Function to handle the CTA button click
  const handlePostRentalClick = () => {
    navigate("/dashboard/create-listing");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{
        // background: `linear-gradient(135deg, #ECFDF5 0%, #14B8A6 100%)`,
        // background: `linear-gradient(135deg, #2043B1 0%, #5FA3F9 100%)`,
        // background: `linear-gradient(135deg, #2043B1 0%, #FFFFFF 100%)`,
        backgroundColor: colors.primary,
        backdropFilter: "blur(15px)",
        // background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)`,
      }}
    >
      {/* Hero Swiper Section */}
      <div className="w-full">
        <Swipper />
      </div>

      {/* Featured Products / Custom Cards */}
      <div className="mt-10 w-full max-w-6xl px-4">
        {/* <h2 className="text-3xl font-bold text-blue-600 text-center"> */}
        <div className="flex flex-col items-center">
          {/* Conditional Call-to-Action Button for Landlords */}
          {user?.role === "landlord" ? (
            <>
              <h2 className="text-3xl font-bold text-white text-center">
                Manage Your Rental Properties Efficiently !
              </h2>
              <p className="text-gray-800 text-center text-sm sm:text-base mt-2">
                View all posted listings or create / post listings
              </p>
              <button
                onClick={handlePostRentalClick}
                className="mt-6 px-6 py-3 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:bg-blue-50 transition-all transform hover:scale-105 flex gap-2 hover:gap-4"
              >
                <p>Rental House</p>
                <ArrowRightOutlined className="" />
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-white text-center">
                Find Your Perfect Rental House Today !
              </h2>
              <p className="text-gray-800 text-center text-sm sm:text-base mt-2">
                Hand-picked collections just for you.
              </p>
            </>
          )}
        </div>

        <div className="mt-6">
          {/* <CustomCard /> */}
          <RentalListingsCard />
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="w-full max-w-6xl px-4 mt-16">
        <div className="mt-6">
          <Testimonials />
        </div>
      </div>
    </div>
  );
};

export default Home;
