/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Button, Tag, Card, Spin, Select } from "antd";
import {
  useAlluserQuery,
  useBlockUserMutation,
  useActivateUserMutation,
  useUpdateUserRoleMutation,
} from "../../../../redux/features/rentals/rentalManagementApi";
import { toast } from "sonner";

// Define interface for user data
interface TUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  isBlocked: boolean;
}

const Acctivate_account = () => {
  const { data: Alluser, isFetching } = useAlluserQuery(undefined);
  const [blockUser] = useBlockUserMutation();
  const [activateUser] = useActivateUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();

  // Handle blocking users
  const handleBlockUser = async (userId: string) => {
    try {
      await blockUser({ userId });
      toast.success("User successfully blocked", {
        duration: 3000,
        position: "top-center",
        style: { fontSize: "16px", backgroundColor: "#F44336", color: "#fff" }, // Red for blocked users
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
    } catch (error) {
      toast.error("Failed to block user", {
        duration: 3000,
        position: "top-center",
        style: { fontSize: "16px", backgroundColor: "#FF5722", color: "#fff" }, // Orange for errors
      });
    }
  };

  // Handle activating blocked users
  const handleActivateUser = async (userId: string) => {
    try {
      await activateUser({ userId });
      toast.success("User successfully activated", {
        duration: 3000,
        position: "top-center",
        style: { fontSize: "16px", backgroundColor: "#0F766E", color: "#fff" }, // Deep teal for success
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
    } catch (error) {
      toast.error("Failed to activate user", {
        duration: 3000,
        position: "top-center",
        style: { fontSize: "16px", backgroundColor: "#FF9800", color: "#fff" }, // Warning color
      });
    }
  };

  // Handle updating user role
  const handleUpdateUserRole = async (userId: string, newRole: string) => {
    try {
      await updateUserRole({ userId, role: newRole });
      toast.success(`User role updated to ${newRole.toUpperCase()}`, {
        duration: 3000,
        position: "top-center",
        style: { fontSize: "16px", backgroundColor: "#0F4C81", color: "#fff" }, // Blue for success
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
    } catch (error) {
      toast.error("Failed to update user role", {
        duration: 3000,
        position: "top-center",
        style: { fontSize: "16px", backgroundColor: "#FF9800", color: "#fff" }, // Warning color
      });
    }
  };

  // Blue Theme Colors
  const blueColors = {
    primary: "#0F4C81", // Deep Blue
    secondary: "#2196F3", // Bright Blue
    background: "#E3F2FD", // Light Blue
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <span className="font-medium text-gray-800">{name}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => <span className="text-gray-600">{email}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag
          color={
            role === "admin" ? "red" : role === "landlord" ? "purple" : "blue"
          }
          className="font-semibold"
        >
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: TUser) => (
        <Tag
          color={
            record.isBlocked ? "red" : status === "active" ? "green" : "orange"
          }
          className="font-semibold"
        >
          {record.isBlocked ? "BLOCKED" : status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Edit Role",
      key: "editRole",
      render: (record: TUser) => (
        <Select
          defaultValue={record.role}
          style={{ width: 120 }}
          onChange={(newRole) => handleUpdateUserRole(record._id, newRole)}
          disabled={record.role === "admin"} // Prevent changing admin role
        >
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="landlord">Landlord</Select.Option>
          <Select.Option value="tenant">Tenant</Select.Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: TUser) => (
        <div className="flex gap-2">
          {record.isBlocked ? (
            <Button
              type="primary"
              className="bg-green-600 text-white px-4 py-1 rounded-md shadow-md"
              onClick={() => handleActivateUser(record._id)}
            >
              Activate
            </Button>
          ) : (
            <Button
              type="primary"
              danger
              disabled={record.role === "admin"}
              onClick={() => handleBlockUser(record._id)}
              className="transition-all duration-300 px-4 py-1 rounded-md shadow-md"
            >
              {record.role === "admin" ? "Admin" : "Block"}
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-5 py-10">
      {/* Title Section */}
      <Card
        className="w-full max-w-4xl text-center shadow-lg mb-6"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${blueColors.secondary}`,
        }}
      >
        <h2
          className="text-2xl font-semibold"
          style={{ color: blueColors.primary }}
        >
          Manage User Accounts
        </h2>
        <p className="text-gray-600 text-sm">
          View, block, activate, and update user roles with ease.
        </p>
      </Card>

      {/* User Table */}
      <Card
        className="w-full max-w-6xl shadow-md"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${blueColors.secondary}`,
        }}
      >
        {isFetching ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            loading={isFetching}
            dataSource={Alluser?.data || []}
            rowKey="_id"
            scroll={{ x: "max-content" }}
            className="rounded-lg overflow-hidden"
          />
        )}
      </Card>
    </div>
  );
};

export default Acctivate_account;
