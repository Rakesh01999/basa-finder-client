import { Card, Typography } from "antd";

const { Title, Text } = Typography;

// Theme Colors
const blueColors = {
  primary: "#1E3A8A",
  secondary: "#2563EB",
  background: "#EFF6FF",
};

const Privacy = () => {
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
          🔒 Privacy Policy
        </Title>
        <Text className="text-gray-700">
          Your privacy is important to us. This policy explains how we collect, use, and protect
          your data.
        </Text>

        <div className="mt-6 space-y-4">
          <div>
            <Title level={4} style={{ color: blueColors.secondary }}>
              1. Data Collection
            </Title>
            <Text>
              We collect user data including names, email addresses, and rental history to enhance
              platform security and improve services.
            </Text>
          </div>

          <div>
            <Title level={4} style={{ color: blueColors.secondary }}>
              2. Use of Information
            </Title>
            <Text>
              Your information is used for processing transactions, personalizing your experience,
              and improving security.
            </Text>
          </div>

          <div>
            <Title level={4} style={{ color: blueColors.secondary }}>
              3. Third-Party Sharing
            </Title>
            <Text>
              We do not sell or rent your personal data. Third-party integrations comply with
              strict security measures.
            </Text>
          </div>

          <div>
            <Title level={4} style={{ color: blueColors.secondary }}>
              4. Account & Security
            </Title>
            <Text>
              Users are responsible for maintaining the confidentiality of their login credentials.
              We implement security measures to protect your data.
            </Text>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Text className="text-gray-600">
            If you have any concerns, please visit our **support center**.
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Privacy;
