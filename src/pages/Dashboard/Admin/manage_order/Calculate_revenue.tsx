/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Statistic, Spin, Typography } from "antd";
import { useCalculateRevenueMutation } from "../../../../redux/features/rentals/rentalManagementApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const { Title, Paragraph } = Typography;

const CalculateRevenue = () => {
  const [calculateRevenue, { data: revenueData, isLoading }] =
    useCalculateRevenueMutation();
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  console.log(revenueData);
  // Fetch revenue on component mount
  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const result = await calculateRevenue(undefined).unwrap();
        setTotalRevenue(result?.data?.totalRevenue || 0);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
      } catch (error) {
        toast.error("Failed to fetch revenue data.");
      }
    };
    fetchRevenue();
  }, [calculateRevenue]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r p-6 text-center">
      {/* Header Section */}
      <div className="max-w-lg w-full text-white">
        <Title level={2} className="text-white font-bold drop-shadow-lg">
          🏠 BasaFinder Revenue Dashboard 💰
        </Title>
        <Paragraph className="text-lg">
          Track your total rental earnings from **BasaFinder**. Stay updated
          with the latest revenue figures and make informed business decisions.
        </Paragraph>
      </div>

      {/* Revenue Display Card */}
      <Card
        className="mt-6 w-80 shadow-lg rounded-2xl border-none bg-white transform transition hover:scale-105"
        style={{
          background: "linear-gradient(135deg, #ffffff, #f3f4f6)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
        }}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <Spin size="large" />
          </div>
        ) : (
          <Statistic
            title="Total Rental Revenue"
            value={totalRevenue}
            prefix="৳"
            precision={2}
            valueStyle={{
              color: "#16a34a",
              fontSize: "32px",
              fontWeight: "bold",
              textShadow: "0px 0px 8px rgba(22, 163, 74, 0.6)",
            }}
          />
        )}
      </Card>
    </div>
  );
};

export default CalculateRevenue;
