import { useSearchParams, useNavigate } from "react-router-dom";
import { useVerifyPaymentQuery } from "../redux/features/rentals/rentalManagementApi";
import { Card, Spin, Typography, Button } from "antd";
import {
  CheckCircleOutlined,
  HomeOutlined,
  FileTextOutlined,
  DollarOutlined,
  CreditCardOutlined,
  MailOutlined,
  MoneyCollectOutlined,
  SaveOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

// 🎨 **Blue Theme**
const blueColors = {
  primary: "#1E3A8A", // Deep Blue
  secondary: "#2563EB", // Vibrant Blue
  background: "#EFF6FF", // Light Blue
};

const VerifyPayment = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");

  const { isLoading, data } = useVerifyPaymentQuery(orderId, {
    refetchOnMountOrArgChange: true,
  });

  // ✅ Extract first item from array
  const paymentData = data?.data?.[0];
  const navigate = useNavigate();

  console.log("Payment Verification Data:", paymentData);

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-blue-500">
        <Spin size="large" />
      </div>
    );

  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center p-6"
      style={{
        background: `linear-gradient(135deg, ${blueColors.background} 0%, ${blueColors.secondary} 100%)`,
      }}
    >
      <Card
        className="w-full max-w-3xl shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl border border-blue-300"
        style={{
          background: "white",
        }}
      >
        <div className="text-center mb-6">
          <div
            className="mx-auto mb-4 w-20 h-20 flex items-center justify-center rounded-full shadow-lg"
            style={{
              background: paymentData?.is_verify ? blueColors.primary : "#DC2626", // Green ✅ if verified, Red ❌ if not
            }}
          >
            {paymentData?.is_verify ? (
              <CheckCircleOutlined className="text-4xl text-white" />
            ) : (
              <CloseCircleOutlined className="text-4xl text-white" />
            )}
          </div>
          <Title level={3} style={{ color: blueColors.primary }}>
            Payment Verification
          </Title>
          <Text className="text-gray-600">
            {paymentData?.is_verify ? "Your payment has been successfully verified!" : "Payment verification failed. Please check your order details."}
          </Text>
        </div>

        {/* 🔹 Payment Details */}
        {paymentData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800 p-4">
            <div className="flex items-center gap-2">
              <FileTextOutlined className="text-xl text-blue-500" />
              <Text className="font-semibold">Transaction ID:</Text>
              <Text>{paymentData.order_id}</Text>
            </div>

            <div className="flex items-center gap-2">
              <HomeOutlined className="text-xl text-blue-500" />
              <Text className="font-semibold">Customer:</Text>
              <Text>{paymentData.name}</Text>
            </div>

            <div className="flex items-center gap-2">
              <MailOutlined className="text-xl text-blue-500" />
              <Text className="font-semibold">Email:</Text>
              <Text>{paymentData.email}</Text>
            </div>

            <div className="flex items-center gap-2">
              <CreditCardOutlined className="text-xl text-blue-500" />
              <Text className="font-semibold">Payment Method:</Text>
              <Text>{paymentData.method}</Text>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircleOutlined className={`text-xl ${paymentData.is_verify ? "text-green-500" : "text-red-500"}`} />
              <Text className="font-semibold">Payment Status:</Text>
              <Text className={paymentData.is_verify ? "text-green-500" : "text-red-500"}>
                {paymentData.is_verify ? "Verified ✅" : "Not Verified ❌"}
              </Text>
            </div>

            <div className="flex items-center gap-2">
              <SaveOutlined className="text-xl text-blue-500" />
              <Text className="font-semibold">Invoice No:</Text>
              <Text>{paymentData.invoice_no}</Text>
            </div>

            <div className="flex items-center gap-2">
              <DollarOutlined className="text-xl text-blue-500" />
              <Text className="font-semibold">Amount:</Text>
              <Text className="text-green-600 font-semibold">
                ৳{paymentData.amount} {paymentData.currency}
              </Text>
            </div>

            <div className="flex items-center gap-2">
              <MoneyCollectOutlined className="text-xl text-blue-500" />
              <Text className="font-semibold">Transaction Status:</Text>
              <Text>{paymentData.sp_message}</Text>
            </div>
          </div>
        ) : (
          <div className="text-center text-red-500 text-lg font-bold p-4">
            No payment details found. Please check your order ID.
          </div>
        )}

        {/* 🔹 Button */}
        <div className="mt-6 text-center pb-4">
          <Button
            onClick={handleHomeRedirect}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg shadow-md transition-all text-lg"
          >
            Go to Home
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default VerifyPayment;
