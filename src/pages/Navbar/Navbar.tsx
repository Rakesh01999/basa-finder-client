import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const user = useAppSelector(useCurrentUser);

  // Enhanced Color Palette
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

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 shadow-lg transition-all duration-300"
      style={{
        backgroundColor: colors.primary,
        backdropFilter: "blur(15px)",
        // background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)`,
      }}
    >
      <div className="container mx-auto flex justify-between items-center p-4 max-w-6xl">
        {/* Logo Section with Animated Hover */}
        <div
          className="flex items-center space-x-4 group cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="https://i.postimg.cc/VNMmf35B/logo.png"
            alt="Bike"
            // className="w-16 h-16  border-white/20 transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
            className="w-16 h-16 group-hover:scale-270 hover:bg-blue-500"
          />
          <span
            className="text-2xl font-bold tracking-wider transition-all duration-300 group-hover:text-teal-200"
            style={{ color: colors.text.primary }}
          >
            {/* AutoVerse */}
            <img
              // src="https://i.postimg.cc/3wVbWVM9/logo.png"
              src="https://i.postimg.cc/8zxTV1kz/lg.png"
              alt="Bike"
              className="md:w-32 w-24"
            />
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-6 items-center">
            <NavLink href="/" label="Home" />
            <NavLink href="/allListings" label="All Rentals" />
            <NavLink href="/dashboard" label="Dashboard" />
            <NavLink href="/about" label="About" />

            {user && (
              <NavLink href="/profile" label="My Profile" />
            )}

            {!user && (
              <>
                <NavLink href="/login" label="Login" />
                <NavLink href="/register" label="Register" />
              </>
            )}
          </div>

          {user && (
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-full font-medium transition-all duration-300 
              hover:bg-white/20 hover:shadow-2xl group relative overflow-hidden"
              style={{
                color: colors.text.primary,
                border: `2px solid ${colors.text.primary}`,
              }}
            >
              <span className="relative z-10">Logout</span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            {menuOpen ? (
              <X
                size={28}
                className="text-white transition-transform duration-300 hover:rotate-90"
              />
            ) : (
              <Menu
                size={28}
                className="text-white transition-transform duration-300 hover:rotate-180"
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Slide Animation */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full transition-all duration-500 ease-in-out transform"
          style={{
            backgroundColor: colors.primary,
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            animationName: "slideDown",
            animationDuration: "0.5s",
          }}
        >
          <div className="container mx-auto p-6 space-y-4">
            <MobileNavLink href="/" label="Home" />
            <MobileNavLink href="/allListings" label="All Rentals" />
            <MobileNavLink href="/dashboard" label="Dashboard" />
            <MobileNavLink href="/about" label="About" />
            
            {user && (
              <MobileNavLink href="/profile" label="My Profile" />
            )}

            {!user && (
              <>
                <MobileNavLink href="/login" label="Login" />
                <MobileNavLink href="/register" label="Register" />
              </>
            )}

            {user && (
              <button
                onClick={handleLogout}
                className="w-full px-6 py-3 rounded-lg font-medium text-center 
                transition-all duration-300 hover:bg-white/20 group relative overflow-hidden"
                style={{
                  color: colors.text.primary,
                  border: `2px solid ${colors.text.primary}`,
                }}
              >
                <span className="relative z-10">Logout</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Custom Styles for Slide Animation */}
      {/* <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style> */}
    </nav>
  );
};

// Desktop Navigation Link Component
const NavLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    className="text-base font-medium tracking-wider transition-all duration-300 
    transform hover:scale-105 hover:text-blue-200 relative group"
    style={{
      color: "white",
    }}
  >
    {label}
    <span
      className="absolute bottom-0 left-0 w-0 h-0.5 bg-white 
      transition-all duration-300 group-hover:w-full"
    ></span>
  </a>
);

// Mobile Navigation Link Component
const MobileNavLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    className="block py-3 text-base font-medium tracking-wider 
    transition-all duration-300 hover:bg-white/10 rounded-lg px-4 
    relative group"
    style={{
      color: "rgba(255,255,255,0.9)",
    }}
  >
    {label}
    <span
      className="absolute bottom-0 left-0 w-0 h-0.5 bg-white 
      transition-all duration-300 group-hover:w-full"
    ></span>
  </a>
);

export default Navbar;