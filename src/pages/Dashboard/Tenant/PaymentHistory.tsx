/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useMyPaymentQuery } from "../../../redux/features/rentals/rentalManagementApi";
import {
  Table,
  Card,
  Spin,
  Typography,
  Pagination,
  type TableColumnsType,
  type TableProps,
} from "antd";
import dayjs from "dayjs";
// import "./pagination.css";
import "../../pagination.css";

const { Title, Text } = Typography;

// Updated Type for Payment Data based on actual API response
type TPayment = {
  _id: string;
  requestId: string;
  listingId: string;
  tenantEmail: string;
  name: string;
  phone: string;
  address: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  transaction: {
    id: string;
    transactionStatus: string | null;
    bank_status: string;
    date_time: string;
    method: string;
  };
};

// ✅ Blue Theme
const blueColors = {
  primary: "#1E3A8A",
  secondary: "#2563EB",
  background: "#EFF6FF",
};

const PaymentHistory: React.FC = () => {
  const { data: paymentData, isFetching } = useMyPaymentQuery(undefined);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [payments, setPayments] = useState<TPayment[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    console.log("Payment API Response:", paymentData);
    // Check if paymentData.data.result exists and is an array
    if (paymentData?.data?.result && Array.isArray(paymentData.data.result)) {
      setPayments(paymentData.data.result);
      setTotal(paymentData.data.meta?.total || 0);
    }
  }, [paymentData]);
  // ✅ Updated Columns for Table to match actual data structure
  const columns: TableColumnsType<TPayment> = [
    {
      title: "Listing ID",
      key: "listingId",
      dataIndex: ["listingId"],
      render: (id) => id || "N/A",
    },
    // {
    //   title: "Order ID",
    //   key: "orderId",
    //   dataIndex: ["transaction", "id"],
    //   render: (id) => id || "N/A",
    // },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
      render: (amount) => `৳${(amount || 0).toLocaleString()}`,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <span className={(status?.toLowerCase() === "paid" || status?.toLowerCase() === "success") ? "text-green-600" : "text-orange-500"}>
          {status ? status.toUpperCase() : "PENDING"}
        </span>
      ),
    },
    {
      title: "Payment Method",
      key: "method",
      dataIndex: ["transaction", "method"],
      render: (method) => method || "N/A",
    },
    {
      title: "Date & Time",
      key: "date_time",
      dataIndex: ["transaction", "date_time"],
      render: (date) => (date ? dayjs(date).format("MMM D, YYYY - h:mm A") : "N/A"),
    },
  ];

  // ✅ Pagination handler
  const onChange: TableProps<TPayment>["onChange"] = (paginationConfig) => {
    setPagination({
      current: paginationConfig.current!,
      pageSize: paginationConfig.pageSize!,
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center px-5 py-6"
      style={{
        background: `linear-gradient(135deg, ${blueColors.background} 0%, ${blueColors.secondary} 100%)`,
      }}
    >
      {/* Title Card */}
      <Card
        className="w-full max-w-3xl text-center shadow-lg mb-6"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${blueColors.secondary}`,
        }}
      >
        <Title level={2} className="text-gray-800" style={{ color: blueColors.primary }}>
          💳 Payment History
        </Title>
        <Text className="text-gray-600">Track all your rental payments.</Text>
      </Card>

      {/* Payment Table */}
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
        ) : payments.length > 0 ? (
          <Table
            loading={isFetching}
            columns={columns.map((column) => ({ ...column, align: "center" }))}
            dataSource={payments.map(payment => ({ ...payment, key: payment._id }))}
            pagination={false}
            onChange={onChange}
            scroll={{ x: "max-content" }}
            className="rounded-lg overflow-hidden"
            components={{
              header: {
                cell: (props: any) => (
                  <th
                    {...props}
                    style={{
                      ...props.style,
                      backgroundColor: blueColors.secondary,
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  />
                ),
              },
            }}
          />
        ) : (
          <div className="flex justify-center items-center min-h-[300px]">
            <Text className="text-gray-600">No payment records found.</Text>
          </div>
        )}
      </Card>

      {/* Pagination */}
      {payments.length > 0 && (
        <div className="mt-4 flex justify-center">
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={total}
            showSizeChanger
            showQuickJumper
            responsive
            pageSizeOptions={["5", "10", "15", "20"]}
            onChange={(page, pageSize) => setPagination({ current: page, pageSize })}
            className="bg-white border border-blue-500 rounded-lg shadow-md px-3 py-1"
          />
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;