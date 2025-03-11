import { Card, Typography } from "antd";

const { Title, Text } = Typography;

// Theme Colors
const blueColors = {
  primary: "#1E3A8A",
  secondary: "#2563EB",
  background: "#EFF6FF",
};

const Terms = () => {
  return (
    <div
      className="min-h-screen flex justify-center items-center px-6"
      style={{
        background: `linear-gradient(135deg, ${blueColors.background} 0%, ${blueColors.secondary} 100%)`,
      }}
    >
      <Card
        className="w-full max-w-4xl shadow-lg rounded-lg overflow-hidden p-6"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${blueColors.secondary}`,
        }}
      >
        <Title level={2} style={{ color: blueColors.primary }}>
          📜 Terms & Conditions
        </Title>
        <Text className="text-gray-700">
          Welcome to **Basa Finder [Online Rental Platform]**! By accessing or using our services, you agree to
          comply with the following terms and conditions. Please read them carefully.
        </Text>

        <div className="mt-6 space-y-4">
          <div>
            <Title level={4} style={{ color: blueColors.secondary }}>
              1. User Responsibilities
            </Title>
            <Text>
              Users must provide accurate information, comply with rental agreements, and ensure
              lawful use of our platform.
            </Text>
          </div>

          <div>
            <Title level={4} style={{ color: blueColors.secondary }}>
              2. Payment & Transactions
            </Title>
            <Text>
              All payments are securely processed. Any fraudulent activity will result in account
              suspension.
            </Text>
          </div>

          <div>
            <Title level={4} style={{ color: blueColors.secondary }}>
              3. Property Listings
            </Title>
            <Text>
              Landlords must ensure listings are genuine and up-to-date. Any misleading
              information may lead to removal from the platform.
            </Text>
          </div>

          <div>
            <Title level={4} style={{ color: blueColors.secondary }}>
              4. Account Termination
            </Title>
            <Text>
              We reserve the right to terminate accounts violating our policies or engaging in
              suspicious activities.
            </Text>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Text className="text-gray-600">
            For more details, please contact our **support team**.
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Terms;
