/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useGetTenantRequestsQuery, useMakePaymentMutation } from "../../../redux/features/rentals/rentalManagementApi";
import { Card, Skeleton, Typography, Tag, Button, Divider, Empty, Modal } from "antd";
import { HomeOutlined, CheckCircleOutlined, PhoneOutlined, DollarOutlined } from "@ant-design/icons";
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
  const [makePayment, { isLoading: isPaying }] = useMakePaymentMutation();
  const [requests, setRequests] = useState<any[]>([]);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<any>(null);

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
    setCurrentRequest(request);
    setPaymentModalVisible(true);
  };

  const handleConfirmPayment = async () => {
    if (!currentRequest) return;

    try {
      await makePayment({
        requestId: currentRequest._id,
        amount: currentRequest.rentAmount, // Ensure correct field name from API
      }).unwrap();

      toast.success("Payment successful!");
      setRequests((prev) =>
        prev.map((req) =>
          req._id === currentRequest._id ? { ...req, paymentStatus: "paid" } : req
        )
      );
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      console.error(error);
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
            <Card key={request._id} className="shadow-lg rounded-lg" style={{ backgroundColor: "#f9fafb" }}>
              <div className="p-4">
                <Title level={4} className="text-gray-800 flex items-center gap-2">
                  <HomeOutlined className="text-blue-500" /> House ID: {request.rentalHouseId}
                </Title>

                <Text className="text-gray-600">{request.message}</Text>

                <Divider />

                {/* Request Status */}
                <div className="flex items-center gap-2 mb-4">
                  <Text className="font-semibold">Request Status:</Text>
                  <Tag color={isApproved ? "green" : request.status === "pending" ? "blue" : "red"}>
                    {request.status.toUpperCase()}
                  </Tag>
                </div>

                {/* ✅ Show Payment Status Only if Request is Approved */}
                {isApproved && (
                  <div className="flex items-center gap-2 mb-4">
                    <Text className="font-semibold">Payment Status:</Text>
                    <Tag color={request.paymentStatus === "paid" ? "green" : "orange"}>
                      {request.paymentStatus.toUpperCase()}
                    </Tag>
                  </div>
                )}

                {/* ✅ Show Landlord Contact if Approved & Phone Exists */}
                {hasLandlordContact && (
                  <>
                    <Divider />
                    <Title level={5} className="text-gray-700">👤 Landlord Contact Info</Title>
                    <div className="flex items-center gap-2">
                      <PhoneOutlined className="text-green-500" />
                      <Text className="font-semibold">{request.landlordPhone}</Text>
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
                    disabled={!isApproved || request.paymentStatus === "paid"}
                    className={`px-4 py-2 rounded-md flex items-center gap-2 w-full sm:w-auto ${
                      !isApproved || request.paymentStatus === "paid"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                    onClick={() => handleProceedToPayment(request)}
                  >
                    <CheckCircleOutlined />
                    {request.paymentStatus === "paid" ? "Payment Completed" : "Proceed to Payment"}
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
