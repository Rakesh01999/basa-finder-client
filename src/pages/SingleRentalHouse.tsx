/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSingleListingQuery,
  useCreateRentalRequestMutation,
} from "../redux/features/rentals/rentalManagementApi";
import {
  Card,
  Skeleton,
  Typography,
  Carousel,
  Tag,
  Button,
  Divider,
  Input,
} from "antd";
import {
  HomeOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { toast } from "sonner";
import { useAppSelector } from "../redux/hooks";
import { useCurrentUser } from "../redux/features/auth/authSlice";

const { Title, Text } = Typography;
const { TextArea } = Input;

type UserType = {
  _id: string;
  userId: string;
  name: string;
  email: string;
  role: "admin" | "landlord" | "tenant";
  status: string;
  exp: number;
  iat: number;
};

// Define error type to fix the TypeScript error
// interface ApiError {
//   data?: {
//     message?: string;
//   };
//   status?: number;
//   [key: string]: any; // Allow for other properties that might exist
// }

// Blue Theme
const blueColors = {
  primary: "#1E3A8A",
  secondary: "#2563EB",
  background: "#EFF6FF",
};

const SingleRentalHouse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAppSelector(useCurrentUser) as UserType | null;
  const { data: listingData, isFetching, error } = useGetSingleListingQuery(id);
  const [createRentalRequest, { isLoading: isRequesting }] =
    useCreateRentalRequestMutation();
  const [images, setImages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch rental house details.");
      navigate("/rental-listings");
    }
  }, [error, navigate]);

  useEffect(() => {
    if (listingData?.data) {
      setImages(listingData.data.images || []);
    }
  }, [listingData]);

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Skeleton active />
      </div>
    );
  }

  if (!listingData?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Text className="text-lg text-red-500">Listing not found.</Text>
      </div>
    );
  }

  const { location, description, rentAmount, bedrooms, amenities, landlordId } =
    listingData.data;

  // Handle Rental Request Submission
  const handleRentalRequest = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message before sending a request.");
      return;
    }

    try {
      const rentalRequest = {
        rentalRequest: {
          rentalHouseId: id,
          tenantId: user?.userId,
          landlordId: landlordId,
          message,
        },
      };

      console.log("Sending Rental Request:", rentalRequest);
      await createRentalRequest(rentalRequest).unwrap();
      toast.success("Rental request sent successfully!");
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to send rental request."
      );
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{
        background: `linear-gradient(135deg, ${blueColors.background} 0%, ${blueColors.secondary} 100%)`,
      }}
    >
      {/* Rental House Details Card */}
      <Card className="w-full max-w-3xl shadow-lg rounded-lg" style={{ backgroundColor: "#f9fafb" }}>
        {/* Image Carousel */}
        {images.length > 0 ? (
          <Carousel autoplay className="mb-6">
            {images.map((img, index) => (
              <div key={index} className="flex justify-center">
                <img
                  src={img}
                  alt={`House Image ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="flex justify-center items-center h-64 bg-gray-200 rounded-lg">
            <Text>No Images Available</Text>
          </div>
        )}

        {/* Listing Info */}
        <div className="p-4">
          <Title level={3} className="text-gray-800">
            <HomeOutlined className="mr-2 text-blue-500" /> {location}
          </Title>
          <Text className="text-gray-600">{description}</Text>
          <Divider />

          {/* Rent and Bedrooms */}
          <div className="flex justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-green-600">
              <DollarOutlined className="mr-2" /> ৳{rentAmount.toLocaleString()}
            </Text>
            <Text className="text-lg font-semibold">
              🛏 {bedrooms} {bedrooms === 1 ? "Bedroom" : "Bedrooms"}
            </Text>
          </div>

          {/* Amenities */}
          <Title level={5} className="text-gray-700">🏠 Amenities</Title>
          <div className="flex flex-wrap gap-2 mb-4">
            {amenities.length > 0 ? (
              amenities.map((amenity: string, index: number) => (
                <Tag color="blue" key={index}>{amenity}</Tag>
              ))
            ) : (
              <Text>No amenities listed</Text>
            )}
          </div>

          <Divider />

          {/* Message Input Field */}
          <Title level={5} className="text-gray-700 flex items-center gap-2">
            <MessageOutlined className="text-blue-500" />
            Send a Message to the Landlord
          </Title>
          <TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            rows={3}
            maxLength={500}
            className="mb-4"
          />

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button
              type="default"
              onClick={() => navigate("/rental-listings")}
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
            >
              Back to Listings
            </Button>
            <Button
              type="primary"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
              onClick={handleRentalRequest}
              loading={isRequesting}
            >
              <CheckCircleOutlined />
              Request Rental
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SingleRentalHouse;