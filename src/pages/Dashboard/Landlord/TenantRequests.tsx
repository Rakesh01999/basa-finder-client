/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useGetLandlordRequestsQuery, useUpdateRequestStatusMutation } from "../../../redux/features/rentals/rentalManagementApi";
import { Card, Skeleton, Typography, Tag, Button, Divider, Empty, Input, Modal } from "antd";
import { HomeOutlined, CheckCircleOutlined, CloseCircleOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { toast } from "sonner";

const { Title, Text } = Typography;

// Theme colors
const blueColors = {
  primary: "#1E3A8A", // Deep Blue
  secondary: "#2563EB", // Vibrant Blue
  background: "#EFF6FF", // Light Blue
};

const LandlordRentalRequests: React.FC = () => {
  const { data: rentalRequests, isFetching, error } = useGetLandlordRequestsQuery(undefined);
  const [updateRentalRequest] = useUpdateRequestStatusMutation();
  const [requests, setRequests] = useState<any[]>([]);
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const [landlordPhone, setLandlordPhone] = useState("");
  const [currentRequestId, setCurrentRequestId] = useState("");

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

  // Handle phone number submission and approval
  const handlePhoneSubmit = async () => {
    if (!landlordPhone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    try {
      await updateRentalRequest({
        requestId: currentRequestId,
        status: "approved",
        landlordPhone
      }).unwrap();
      
      toast.success("Request approved successfully!");
      setRequests((prev) =>
        prev.map((req) => (req._id === currentRequestId ? { ...req, status: "approved" } : req))
      );
      setPhoneModalVisible(false);
      setLandlordPhone("");
    } catch (error) {
      toast.error((error as any)?.data?.message || "Failed to update request.");
      console.log(error);
    }
  };

  // Open modal for approval
  const handleApproval = (requestId: string) => {
    setCurrentRequestId(requestId);
    setPhoneModalVisible(true);
  };

  // Handle reject action
  const handleReject = async (requestId: string) => {
    try {
      await updateRentalRequest({ requestId, status: "rejected" }).unwrap();
      toast.success("Request rejected successfully!");
      setRequests((prev) =>
        prev.map((req) => (req._id === requestId ? { ...req, status: "rejected" } : req))
      );
    } catch (error) {
      toast.error((error as any)?.data?.message || "Failed to update request.");
      console.log(error);
    }
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen p-6"
      style={{
        background: `linear-gradient(135deg, ${blueColors.background} 0%, ${blueColors.secondary} 100%)`,
      }}
    >
      <Title level={2} className="text-gray-800">🏠 Tenant Rental Requests</Title>

      <div className="w-full max-w-4xl space-y-6">
        {requests.map((request) => {
          const isPending = request.status === "pending";
          const isApproved = request.status === "approved";
          const hasTenantContact = isPending || isApproved;

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
                    <Tag color={isApproved ? "green" : isPending ? "blue" : "red"}>
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

                {/* Tenant Contact (ONLY for Pending/Approved Requests) */}
                {hasTenantContact && request.tenant && (
                  <>
                    <Divider />
                    <Title level={5} className="text-gray-700">👤 Tenant Contact Info</Title>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Text className="flex items-center gap-2">
                        <PhoneOutlined className="text-green-500" /> {request.tenant.phone}
                      </Text>
                      <Text className="flex items-center gap-2">
                        <MailOutlined className="text-blue-500" /> {request.tenant.email}
                      </Text>
                    </div>
                  </>
                )}

                <Divider />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  {isPending && (
                    <>
                      <Button
                        type="primary"
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 w-full sm:w-auto"
                        onClick={() => handleApproval(request._id)}
                      >
                        <CheckCircleOutlined />
                        Approve Request
                      </Button>

                      <Button
                        type="default"
                        // danger
                        // className="bg-red-600 hover:bg-red-700  px-4 py-2 rounded-md flex items-center gap-2 w-full sm:w-auto"
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2 w-full sm:w-auto"
                        onClick={() => handleReject(request._id)}
                      >
                        <CloseCircleOutlined />
                        Reject Request
                      </Button>
                    </>
                  )}

                  {!isPending && 
                  <></>
                  // (
                  //   <Button type="default" className="bg-gray-400 text-white px-4 py-2 rounded-md w-full sm:w-auto">
                  //     View Details
                  //   </Button>
                  // )
                  }
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Phone Number Modal */}
      <Modal
        title="Provide Your Contact Number"
        open={phoneModalVisible}
        onOk={handlePhoneSubmit}
        onCancel={() => {
          setPhoneModalVisible(false);
          setLandlordPhone("");
        }}
        okText="Submit & Approve"
      >
        <div className="py-4">
          <Text className="block mb-2">Please provide your phone number for the tenant to contact you:</Text>
          <Input
            placeholder="Enter your phone number"
            value={landlordPhone}
            onChange={(e) => setLandlordPhone(e.target.value)}
            className="w-full"
            type="tel"
          />
        </div>
      </Modal>
    </div>
  );
};

export default LandlordRentalRequests;