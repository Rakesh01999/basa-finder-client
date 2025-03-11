/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card as AntCard, Button, Spin } from "antd";
import {
  EnvironmentOutlined,
  HomeOutlined,
  DollarOutlined,
  BankOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useGetAllListingsQuery } from "../redux/features/rentals/rentalManagementApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RentalListings = () => {
  const { data: listings, isFetching } = useGetAllListingsQuery(undefined);
  const displayedListings = listings?.data?.slice(0, 6);

  const [totalListings, setTotalListings] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (listings?.data) {
      setTotalListings(listings.data.length);
    }
  }, [listings]);

  const handleViewAll = () => {
    navigate("/allListings");
  };

  // BasaFinder Theme Colors
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
    <div className="min-h-screen flex flex-col items-center px-5 pb-10">
      {/* Title Section */}
      <div className="text-center mb-6">
        {/* <h2
          className="text-3xl font-bold"
          style={{ color: colors.primary }}
        >
          Featured Rental Houses
        </h2>
        <p className="text-gray-600 text-sm">
          Find your perfect rental home in prime locations
        </p> */}
      </div>

      {/* Loader while fetching */}
      {isFetching ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {displayedListings?.map((property: any) => (
            <AntCard
              key={property._id}
              hoverable
              className="rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                border: `1px solid ${colors.accent}`,
              }}
              cover={
                <img
                  alt={`Property at ${property.location}`}
                  src={property.images[0]}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              }
            >
              <div className="space-y-2 text-sm">
                <p>
                  <EnvironmentOutlined style={{ color: colors.secondary }} />{" "}
                  <strong>Location:</strong> {property.location}
                </p>
                <p>
                  <HomeOutlined style={{ color: colors.secondary }} />{" "}
                  <strong>Bedrooms:</strong> {property.bedrooms}
                </p>
                <p>
                  <DollarOutlined style={{ color: colors.secondary }} />{" "}
                  <strong>Rent:</strong>{" "}
                  <span style={{ color: colors.primary, fontWeight: "600" }}>
                    ${property.rentAmount.toLocaleString()}/month
                  </span>
                </p>
                <p>
                  <BankOutlined style={{ color: colors.secondary }} />{" "}
                  <strong>Amenities:</strong>{" "}
                  {property.amenities?.slice(0, 2).join(", ")}
                  {property.amenities?.length > 2 && "..."}
                </p>
              </div>
              <Button
                className="w-full mt-3"
                style={{
                  backgroundColor: colors.secondary,
                  color: colors.text.primary,
                  border: "none",
                  borderRadius: "4px",
                  height: "36px",
                  fontWeight: "500",
                }}
                onClick={() => navigate(`/listings/${property._id}`)}
              >
                View Details
              </Button>
            </AntCard>
          ))}
        </div>
      )}

      {/* View All Button */}
      {totalListings > 6 && (
        <div className="text-center mt-8">
          {/* <Button
            style={{
              backgroundColor: colors.primary,
              color: colors.text.primary,
              height: "44px",
              width: "160px",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
            onClick={handleViewAll}
          >
            View All Rentals
          </Button> */}
          <button
            onClick={handleViewAll}
            className="mt-6 px-6 py-3 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:bg-blue-50 transition-all transform hover:scale-105 flex gap-2 hover:gap-4"
          >
            <p> View All Rentals</p>
            <ArrowRightOutlined className="" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RentalListings;
