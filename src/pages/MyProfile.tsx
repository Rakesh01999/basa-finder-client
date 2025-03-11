import { Card, Typography, Button, Divider, Spin } from "antd";
// import { useAppSelector } from "../../redux/hooks";
// import { useCurrentUser } from "../../redux/features/auth/authSlice";
import {
  MailOutlined,
  IdcardOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../redux/hooks";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

// ✅ Define User Type
interface UserType {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "landlord" | "tenant";
  status: string;
  exp: number;
  iat: number;
}

// ✅ Blue Theme
const blueColors = {
  primary: "#1E3A8A",
  secondary: "#2563EB",
  background: "#EFF6FF",
};

const MyProfile = () => {
  const user = useAppSelector(useCurrentUser) as UserType | null;
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        background: `linear-gradient(135deg, ${blueColors.background} 0%, ${blueColors.secondary} 100%)`,
      }}
    >
      <Card
        className="w-full max-w-lg rounded-2xl shadow-xl overflow-hidden text-center transform transition-all duration-300"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: `2px solid ${blueColors.primary}`,
        }}
      >
        {/* Profile Avatar */}
        <div className="relative w-24 h-24 mx-auto mt-6">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
            alt="User Avatar"
            className="w-full h-full rounded-full border-4 border-blue-400 shadow-lg"
          />
        </div>

        {/* User Info */}
        <div className="mt-4">
          <Title level={3} style={{ color: blueColors.primary }}>
            {user.name}
          </Title>
          <Text className="text-gray-500">{user.role.toUpperCase()}</Text>
        </div>

        <Divider />

        {/* User Details */}
        <div className="space-y-4 text-gray-700 text-left px-8">
          <div className="flex items-center gap-3">
            <MailOutlined className="text-lg text-blue-500" />
            <Text className="font-medium">{user.email}</Text>
          </div>

          <div className="flex items-center gap-3">
            <IdcardOutlined className="text-lg text-blue-500" />
            <Text className="font-medium">User ID: {user._id}</Text>
          </div>

          <div className="flex items-center gap-3">
            <CalendarOutlined className="text-lg text-blue-500" />
            <Text className="font-medium">
              Joined: {new Date(user.iat * 1000).toLocaleDateString()}
            </Text>
          </div>
        </div>

        <Divider />

        {/* Actions */}
        <div className="flex justify-center space-x-4 pb-6">
          <Button
            type="primary"
            onClick={() => navigate(`/dashboard/update-profile`)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Edit / Update Profile
          </Button>
          <Button
            type="default"
            onClick={() => navigate(`/dashboard/changePassword`)}
            className="border-blue-600 text-blue-600 hover:bg-blue-100"
          >
            Change Your Password
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default MyProfile;
