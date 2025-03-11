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
  Form,
  Input,
  Space,
} from "antd";
import {
  HomeOutlined,
  CheckCircleOutlined,
  PhoneOutlined,
  DollarOutlined,
  CalendarOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { toast } from "sonner";
import dayjs from "dayjs";
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
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<any>(null);
  const [form] = Form.useForm();

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

  // Initialize form with user data when a request is selected
  useEffect(() => {
    if (currentRequest && user) {
      form.setFieldsValue({
        name: user.name || "",
        email: user.email || "",
        phone: "",
        address: "",
      });
    }
  }, [currentRequest, user, form]);

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

  // Handle initial payment button click - open info form first
  const handleProceedToPayment = (request: any) => {
    setCurrentRequest(request);
    setInfoModalVisible(true);
  };

  // Handle form submission and proceed to payment confirmation
  const handleInfoSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        // Save form values to current request
        setCurrentRequest({
          ...currentRequest,
          name: values.name,
          phone: values.phone,
          address: values.address,
        });

        // Close info modal and open payment confirmation
        setInfoModalVisible(false);
        setPaymentModalVisible(true);
      })
      .catch((errorInfo) => {
        console.log("Form validation failed:", errorInfo);
      });
  };

  // Handle Payment Confirmation
  const handleConfirmPayment = async () => {
    if (!currentRequest) return;

    try {
      const paymentData = {
        requestId: currentRequest._id,
        listingId: currentRequest.rentalHouseId,
        tenantEmail: user?.email || "",
        amount: currentRequest.rentAmount,
        name: currentRequest.name,
        phone: currentRequest.phone,
        address: currentRequest.address,
        status: "pending", // ✅ Ensure initial payment status is "pending"
      };

      console.log("Sending Payment Data:", paymentData);

      const response = await makePayment(paymentData).unwrap();
      toast.success("Payment initiated successfully!");

      // Redirect only if checkout URL exists
      const checkoutUrl = response?.data?.checkoutUrl;
      if (typeof checkoutUrl === "string" && checkoutUrl.startsWith("https")) {
        window.location.href = checkoutUrl;
      } else {
        toast.error("Invalid payment URL received.");
      }
    } catch (err) {
      toast.error("Payment was not successful.");
      console.error("Payment error:", err);
    } finally {
      setPaymentModalVisible(false);
      setCurrentRequest(null);
      form.resetFields();
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
              className="shadow-lg rounded-lg md:text-2xl"
              style={{ backgroundColor: "#f9fafb" }}
            >
              <div className="p-4">
                {/* Rental House Details */}
                <Title
                  level={4}
                  className="text-gray-800 flex items-center gap-2"
                >
                  <HomeOutlined className="text-blue-500" /> {request.location}
                </Title>

                <Text className="text-gray-600">💬 {request.message}</Text>

                <Divider />

                {/* House Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <DollarOutlined className="text-green-500" />
                    <Text className="font-semibold">
                      ৳{request.rentAmount.toLocaleString()}
                      {/* ৳{currentRequest?.rentAmount ? currentRequest.rentAmount.toLocaleString() : "N/A"} */}
                    </Text>
                  </div>
                  <div className="flex items-center gap-2">
                    🛏
                    <Text className="font-semibold">
                      {request.bedrooms} Bedrooms
                    </Text>
                  </div>
                </div>

                {/* Created At */}
                <div className="flex items-center gap-2 mb-4">
                  <CalendarOutlined className="text-blue-500" />
                  <Text className="font-semibold">
                    Requested on{" "}
                    {dayjs(request.createdAt).format("MMMM D, YYYY")}
                  </Text>
                </div>

                <Divider />

                {/* Request Status */}
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

                {/* Show Payment Status Only if Request is Approved */}
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

                {/* Show Landlord Contact if Approved & Phone Exists */}
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

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-3">
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

      {/* Tenant Information Collection Modal */}
      <Modal
        title="Your Contact Information"
        open={infoModalVisible}
        onOk={handleInfoSubmit}
        onCancel={() => {
          setInfoModalVisible(false);
          setCurrentRequest(null);
          form.resetFields();
        }}
        okText="Continue to Payment"
      >
        <div className="py-4">
          <Text className="block mb-4">
            Please provide your contact information to complete the rental
            payment.
          </Text>
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Your full name" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Your phone number"
              />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please enter your address" }]}
            >
              <Space direction="vertical" className="w-full">
                <Space className="mb-1">
                  <EnvironmentOutlined />
                  <Text>Address details:</Text>
                </Space>
                <Input.TextArea placeholder="Your complete address" rows={3} />
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* Payment Confirmation Modal */}
      <Modal
        title="Confirm Payment"
        open={paymentModalVisible}
        onOk={handleConfirmPayment}
        onCancel={() => {
          setPaymentModalVisible(false);
          setCurrentRequest(null);
        }}
        okText="Pay Now"
        confirmLoading={isPaying}
      >
        <div className="py-4">
          <Title level={5}>Payment Details</Title>
          <div className="mt-2 mb-4">
            <div className="flex justify-between mb-2">
              <Text>Property:</Text>
              <Text strong>{currentRequest?.location || "Property"}</Text>
            </div>
            <div className="flex justify-between mb-2">
              <Text>Amount:</Text>
              <Text strong className="text-green-600">
                {/* ৳{currentRequest?.rentAmount?.toLocaleString()} */}
                {currentRequest?.rentAmount ? `৳${currentRequest.rentAmount.toLocaleString()}` : "N/A"}
              </Text>
            </div>
          </div>

          <Divider />

          <Title level={5}>Contact Information</Title>
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-2">
              <UserOutlined />
              <Text>{currentRequest?.name}</Text>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <PhoneOutlined />
              <Text>{currentRequest?.phone}</Text>
            </div>
            <div className="flex items-center gap-2">
              <EnvironmentOutlined />
              <Text>{currentRequest?.address}</Text>
            </div>
          </div>

          <Divider />

          <Text className="block mt-4">
            Are you sure you want to proceed with this payment?
          </Text>
        </div>
      </Modal>
    </div>
  );
};

export default MyRentalRequests;
