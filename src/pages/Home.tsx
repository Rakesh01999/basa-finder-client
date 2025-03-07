import RentalListingsCard from "./Card";
import Swipper from "./Swipper";
import Testimonials from "./Testimonials";

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

const Home = () => {
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
        <h2 className="text-3xl font-bold text-blue-600 text-center">
          Find Your Perfect Rental House Today!
        </h2>
        <p className="text-gray-600 text-center text-sm sm:text-base mt-2">
          Hand-picked collections just for you.
        </p>
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
