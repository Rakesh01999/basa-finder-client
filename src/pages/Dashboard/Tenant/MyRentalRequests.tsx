/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useGetTenantRequestsQuery } from "../../../redux/features/rentals/rentalManagementApi";
import { Card, Skeleton, Typography, Tag, Button, Divider, Empty } from "antd";
import { HomeOutlined, CheckCircleOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { toast } from "sonner";

const { Title, Text } = Typography;

// Theme colors
const blueColors = {
  primary: "#1E3A8A", // Deep Blue
  secondary: "#2563EB", // Vibrant Blue
  background: "#EFF6FF", // Light Blue
};

const MyRentalRequests: React.FC = () => {
  const { data: rentalRequests, isFetching, error } = useGetTenantRequestsQuery(undefined);
  const [requests, setRequests] = useState<any[]>([]);

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
          const hasContact = isApproved && request.landlordContact;
          return (
            <Card key={request._id} className="shadow-lg rounded-lg" style={{ backgroundColor: "#f9fafb" }}>
              <div className="p-4">
                <Title level={4} className="text-gray-800 flex items-center gap-2">
                  <HomeOutlined className="text-blue-500" /> House ID: {request.rentalHouseId}
                </Title>

                <Text className="text-gray-600">{request.message}</Text>

                <Divider />

                {/* Request & Payment Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Text className="font-semibold">Request Status:</Text>
                    <Tag color={isApproved ? "green" : request.status === "pending" ? "blue" : "red"}>
                      {request.status.toUpperCase()}
                    </Tag>
                  </div>
                  <div className="flex items-center gap-2">
                    <Text className="font-semibold">Payment Status:</Text>
                    <Tag color={request.paymentStatus === "paid" ? "green" : "orange"}>
                      {request.paymentStatus.toUpperCase()}
                    </Tag>
                  </div>
                </div>

                {/* ✅ Landlord Contact (ONLY when Approved & Info is provided) */}
                {hasContact && (
                  <>
                    <Divider />
                    <Title level={5} className="text-gray-700">👤 Landlord Contact Info</Title>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Text className="flex items-center gap-2">
                        <PhoneOutlined className="text-green-500" /> {request.landlordContact.phone}
                      </Text>
                      <Text className="flex items-center gap-2">
                        <MailOutlined className="text-blue-500" /> {request.landlordContact.email}
                      </Text>
                    </div>
                  </>
                )}

                <Divider />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <Button type="default" className="bg-gray-400 text-white px-4 py-2 rounded-md w-full sm:w-auto">
                    View Details
                  </Button>

                  <Button
                    type="primary"
                    disabled={!isApproved}
                    className={`px-4 py-2 rounded-md flex items-center gap-2 w-full sm:w-auto ${
                      !isApproved ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    <CheckCircleOutlined />
                    Proceed to Payment
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MyRentalRequests;
