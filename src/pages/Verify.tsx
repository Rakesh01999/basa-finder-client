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
  DeliveredProcedureOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const VerifyPayment = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const { isLoading, data,  } = useVerifyPaymentQuery(orderId, {
    refetchOnMountOrArgChange: true,
  });

  const paymentData = data?.data?.[0];
  const navigate = useNavigate();

  console.log("Payment Verification Data:", data);

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-blue-500">
        <Spin size="large" />
      </div>
    );

  const handleHomeRedirect = () => {
    navigate("/");
  };

  // Teal Theme for Styling
  const tealColors = {
    primary: "#0F766E",
    secondary: "#14B8A6",
    background: "#ECFDF5",
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center p-6"
      style={{
        background: `linear-gradient(135deg, ${tealColors.background} 0%, ${tealColors.secondary} 100%)`,
      }}
    >
      <Card
        className="w-full max-w-4xl shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${tealColors.secondary}`,
        }}
      >
        <div className="text-center mb-6">
          <div
            className="mx-auto mb-4 w-20 h-20 flex items-center justify-center rounded-full shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${tealColors.primary} 0%, ${tealColors.secondary} 100%)`,
            }}
          >
            <DeliveredProcedureOutlined className="text-4xl text-white" />
          </div>
          <Title level={3} style={{ color: tealColors.primary }}>
            Payment Verification
          </Title>
          <Text className="text-gray-600">Review your payment details below.</Text>
        </div>

        {/* Payment Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
          <div className="flex items-center gap-2">
            <FileTextOutlined className="text-xl text-teal-500" />
            <Text className="font-semibold md:text-xl lg:text-2xl">Transaction ID:</Text>
            <Text className="md:text-xl lg:text-2xl">{paymentData?.transactionId}</Text>
          </div>

          <div className="flex items-center gap-2">
            <HomeOutlined className="text-xl text-teal-500" />
            <Text className="font-semibold md:text-xl lg:text-2xl">Customer:</Text>
            <Text className="md:text-xl lg:text-2xl">{paymentData?.tenantName}</Text>
          </div>

          <div className="flex items-center gap-2">
            <MailOutlined className="text-xl text-teal-500" />
            <Text className="font-semibold md:text-xl lg:text-2xl">Customer Email:</Text>
            <Text className="md:text-xl lg:text-2xl">{paymentData?.tenantEmail}</Text>
          </div>

          <div className="flex items-center gap-2">
            <CreditCardOutlined className="text-xl text-teal-500" />
            <Text className="font-semibold md:text-xl lg:text-2xl">Payment Method:</Text>
            <Text className="md:text-xl lg:text-2xl">{paymentData?.paymentMethod}</Text>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircleOutlined
              className={`text-xl ${
                paymentData?.isVerified ? "text-green-500" : "text-red-500"
              }`}
            />
            <Text className="font-semibold md:text-xl lg:text-2xl">Payment Status:</Text>
            <span className="md:text-xl lg:text-2xl">
              <Text className={paymentData?.isVerified ? "text-green-500" : "text-red-500"}>
                {paymentData?.isVerified ? "Verified" : "Not Verified"}
              </Text>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <SaveOutlined className="text-xl text-teal-500" />
            <Text className="font-semibold md:text-xl lg:text-2xl">Invoice No:</Text>
            <Text className="md:text-xl lg:text-2xl">{paymentData?.invoiceNo}</Text>
          </div>

          <div className="flex items-center gap-2">
            <DollarOutlined className="text-xl text-teal-500" />
            <Text className="font-semibold md:text-xl lg:text-2xl">Amount:</Text>
            <Text className="md:text-xl lg:text-2xl">
              ৳{paymentData?.amount} {paymentData?.currency}
            </Text>
          </div>

          <div className="flex items-center gap-2">
            <MoneyCollectOutlined className="text-xl text-teal-500" />
            <Text className="font-semibold md:text-xl lg:text-2xl">Transaction Status:</Text>
            <Text className="md:text-xl lg:text-2xl">{paymentData?.transactionStatus}</Text>
          </div>
        </div>

        {/* Button */}
        <div className="mt-6 text-center">
          <Button
            onClick={handleHomeRedirect}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold md:py-6 px-6 rounded-lg shadow-md transition-all md:text-xl "
          >
            Go to Home
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default VerifyPayment;
