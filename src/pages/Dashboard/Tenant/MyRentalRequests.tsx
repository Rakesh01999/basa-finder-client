/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  useGetTenantRequestsQuery,
  useMakePaymentMutation,
} from "../../../redux/features/rentals/rentalManagementApi";
import {
  Card,
  Skeleton,
  Typography,
  Tag,
  Button,
  Divider,
  Empty,
  Modal,
} from "antd";
import {
  HomeOutlined,
  CheckCircleOutlined,
  PhoneOutlined,
  DollarOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { toast } from "sonner";
import dayjs from "dayjs"; // ✅ Format date properly
import { useAppSelector } from "../../../redux/hooks";
import { useCurrentUser } from "../../../redux/features/auth/authSlice";

const { Title, Text } = Typography;

// Theme colors
const blueColors = {
  primary: "#1E3A8A", // Deep Blue
  secondary: "#2563EB", // Vibrant Blue
  background: "#EFF6FF", // Light Blue
};

const MyRentalRequests: React.FC = () => {
  const {
    data: rentalRequests,
    isFetching,
    error,
  } = useGetTenantRequestsQuery(undefined);
  const [makePayment, { isLoading: isPaying }] = useMakePaymentMutation();
  const [requests, setRequests] = useState<any[]>([]);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<any>(null);

  type UserType = {
    _id: string;
    name: string;
    email: string;
    role: "admin" | "landlord" | "tenant";
    status: string;
    exp: number;
    iat: number;
  };

  const user = useAppSelector(useCurrentUser) as UserType | null;
  console.log('user:',user);
  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch rental requests.");
    }
  }, [error]);

  useEffect(() => {
    if (rentalRequests?.data) {
      setRequests(rentalRequests.data);
    }
  }, [rentalRequests]);

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Skeleton active />
      </div>
    );
  }

  if (!requests.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Empty description="No rental requests found" />
      </div>
    );
  }

  // **🔹 Handle Payment**
  const handleProceedToPayment = (request: any) => {
    console.log("f-MyRR", request);
    setCurrentRequest(request);
    setPaymentModalVisible(true);
  };

  const handleConfirmPayment = async () => {
    if (!currentRequest) return;
    
    try {
      const paymentData = {
        requestId: currentRequest._id,
        listingId: currentRequest.rentalHouseId, // ✅ Fix: Ensure listingId is sent
        tenantEmail: user?.email || "", // ✅ Ensure email is sent
        amount: currentRequest.rentAmount,
        name: user?.name || "Anonymous", // ✅ Ensure name is sent
        phone: currentRequest.phone || "N/A", // ✅ Ensure phone is sent
        address: currentRequest.address || "N/A", // ✅ Ensure address is sent
      };
  
      console.log("Sending Payment Data:", paymentData);
  
      await makePayment(paymentData).unwrap();
      toast.success("Payment successful!");
  
      setRequests((prev) =>
        prev.map((req) =>
          req._id === currentRequest._id
            ? { ...req, paymentStatus: "paid" }
            : req
        )
      );
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error((error as any)?.data?.message || "Payment failed. Please try again.");
    } finally {
      setPaymentModalVisible(false);
      setCurrentRequest(null);
    }
  };
  
  return (
    <div
      className="flex flex-col items-center min-h-screen p-6"
      style={{
        background: `linear-gradient(135deg, ${blueColors.background} 0%, ${blueColors.secondary} 100%)`,
      }}
    >
      <Title level={2} className="text-gray-800">
        📜 My Rental Requests
      </Title>

      <div className="w-full max-w-4xl space-y-6">
        {requests.map((request) => {
          const isApproved = request.status === "approved";
          const hasLandlordContact = isApproved && request.landlordPhone;

          return (
            <Card
              key={request._id}
              className="shadow-lg rounded-lg"
              style={{ backgroundColor: "#f9fafb" }}
            >
              <div className="p-4">
                {/* 📌 Rental House Details */}
                <Title
                  level={4}
                  className="text-gray-800 flex items-center gap-2"
                >
                  <HomeOutlined className="text-blue-500" /> {request.location}
                </Title>

                <Text className="text-gray-600">{request.message}</Text>

                <Divider />

                {/* 🏠 House Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <DollarOutlined className="text-green-500" />
                    <Text className="font-semibold">
                      ৳{request.rentAmount.toLocaleString()}
                    </Text>
                  </div>
                  <div className="flex items-center gap-2">
                    🛏
                    <Text className="font-semibold">
                      {request.bedrooms} Bedrooms
                    </Text>
                  </div>
                </div>

                {/* 📅 Created At */}
                <div className="flex items-center gap-2 mb-4">
                  <CalendarOutlined className="text-blue-500" />
                  <Text className="font-semibold">
                    Requested on{" "}
                    {dayjs(request.createdAt).format("MMMM D, YYYY")}
                  </Text>
                </div>

                <Divider />

                {/* ✅ Request Status */}
                <div className="flex items-center gap-2 mb-4">
                  <Text className="font-semibold">Request Status:</Text>
                  <Tag
                    color={
                      isApproved
                        ? "green"
                        : request.status === "pending"
                        ? "blue"
                        : "red"
                    }
                  >
                    {request.status.toUpperCase()}
                  </Tag>
                </div>

                {/* ✅ Show Payment Status Only if Request is Approved */}
                {isApproved && (
                  <div className="flex items-center gap-2 mb-4">
                    <Text className="font-semibold">Payment Status:</Text>
                    <Tag
                      color={
                        request.paymentStatus === "paid" ? "green" : "orange"
                      }
                    >
                      {request.paymentStatus.toUpperCase()}
                    </Tag>
                  </div>
                )}

                {/* ✅ Show Landlord Contact if Approved & Phone Exists */}
                {hasLandlordContact && (
                  <>
                    <Divider />
                    <Title level={5} className="text-gray-700">
                      👤 Landlord Contact Info
                    </Title>
                    <div className="flex items-center gap-2">
                      <PhoneOutlined className="text-green-500" />
                      <Text className="font-semibold">
                        {request.landlordPhone}
                      </Text>
                    </div>
                  </>
                )}

                <Divider />

                {/* 🎯 Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  {/* <Button type="default" className="bg-gray-400 text-white px-4 py-2 rounded-md w-full sm:w-auto">
                    View Details
                  </Button> */}

                  <Button
                    type="primary"
                    disabled={!isApproved || request.paymentStatus === "paid"}
                    className={`px-4 py-2 rounded-md flex items-center gap-2 w-full sm:w-auto ${
                      !isApproved || request.paymentStatus === "paid"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                    onClick={() => handleProceedToPayment(request)}
                  >
                    <CheckCircleOutlined />
                    {request.paymentStatus === "paid"
                      ? "Payment Completed"
                      : "Proceed to Payment"}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* 🔹 Payment Modal */}
      <Modal
        title="Confirm Payment"
        open={paymentModalVisible}
        onOk={handleConfirmPayment}
        onCancel={() => setPaymentModalVisible(false)}
        okText="Pay Now"
        confirmLoading={isPaying}
      >
        <div className="py-4">
          <Text className="block mb-2">
            You are about to pay{" "}
            <span className="font-bold text-lg text-green-600">
              ৳{currentRequest?.rentAmount?.toLocaleString()}
            </span>{" "}
            for rental request.
          </Text>
          <Text>Are you sure you want to proceed?</Text>
        </div>
      </Modal>
    </div>
  );
};

export default MyRentalRequests;
