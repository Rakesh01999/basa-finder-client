import { useState, useEffect } from "react";
import { TQueryParam } from "../types";
import { useGetAllListingsQuery } from "../redux/features/rentals/rentalManagementApi";
import {
  Button,
  Input,
  Select,
  Table,
  Pagination,
  type TableColumnsType,
  type TableProps,
  Card,
  Spin,
} from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import "./pagination.css";

// Define Bedroom Filter Options
const bedroomOptions = [
  { value: "", label: "All Bedrooms" },
  { value: "1", label: "1 Bedroom" },
  { value: "2", label: "2 Bedrooms" },
  { value: "3", label: "3 Bedrooms" },
  { value: "4", label: "4+ Bedrooms" },
];

// Define Data Type
export type TTableData = {
  key: string;
  location: string;
  rentAmount: number;
  bedrooms: number;
  amenities: string;
};

const AllListings = () => {
  const [params] = useState<TQueryParam[] | undefined>(undefined);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [bedroomFilter, setBedroomFilter] = useState<string>("");
  const [filteredData, setFilteredData] = useState<TTableData[]>([]);
  const navigate = useNavigate();

  // Fetch all rental listings
  const { data: listingsData, isFetching } = useGetAllListingsQuery([
    ...(params || []),
    { name: "page", value: pagination.current.toString() },
    { name: "limit", value: pagination.pageSize.toString() },
  ]);

  const tableData: TTableData[] | undefined = listingsData?.data?.map(
    ({ _id, location, rentAmount, bedrooms, amenities }) => ({
      key: _id,
      location,
      rentAmount,
      bedrooms,
      amenities: amenities.join(", "),
    })
  );

  // **Enhanced Search & Filter Functionality**
  useEffect(() => {
    let filtered = tableData || [];

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.rentAmount.toString().includes(searchTerm)
      );
    }

    if (bedroomFilter) {
      filtered = filtered.filter((item) =>
        bedroomFilter === "4"
          ? item.bedrooms >= 4
          : item.bedrooms.toString() === bedroomFilter
      );
    }

    setFilteredData(filtered);
  }, [searchTerm, bedroomFilter, listingsData]);

  // **Table Columns**
  const columns: TableColumnsType<TTableData> = [
    { title: "Location", key: "location", dataIndex: "location" },
    {
      title: "Rent Price",
      key: "rentAmount",
      dataIndex: "rentAmount",
      render: (rentAmount) => (
        <span className="font-semibold text-blue-600">
          ৳{rentAmount.toLocaleString()}
        </span>
      ),
    },
    { title: "Bedrooms", key: "bedrooms", dataIndex: "bedrooms" },
    { title: "Amenities", key: "amenities", dataIndex: "amenities" },
    {
      title: "Action",
      key: "x",
      render: (record: TTableData) => (
        <Button
          onClick={() => navigate(`/listings/${record.key}`)}
          className="transition-all duration-300 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md shadow-md"
        >
          View
        </Button>
      ),
    },
  ];

  // **Pagination Handler**
  const onChange: TableProps<TTableData>["onChange"] = (paginationConfig) => {
    const { current, pageSize } = paginationConfig;
    setPagination({ current: current!, pageSize: pageSize! });
  };

  // **Search Handler**
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // **Theme Colors**
  const blueColors = {
    primary: "#1E3A8A",
    secondary: "#2563EB",
    background: "#EFF6FF",
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
        <h1
          className="text-2xl font-semibold text-gray-800"
          style={{ color: blueColors.primary }}
        >
          Explore Our Rental Listings
        </h1>
        <p className="text-gray-600 text-sm">
          Find your perfect home with ease.
        </p>
      </Card>

      {/* Search & Filter Inputs */}
      {/* <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-4 mb-4"> */}
      <div className="w-full max-w-3xl flex flex-col justify-center items-center gap-4 mb-4">
        {/* Filter by Bedrooms */}
        <Select
          placeholder="Filter by Bedrooms"
          className="w-full sm:w-1/3 border-2 border-blue-500 rounded-lg"
          value={bedroomFilter}
          onChange={(value) => setBedroomFilter(value)}
          options={bedroomOptions}
          allowClear
        />

        {/* Search by Location or Rent Price */}
        <Input
          placeholder="Search by location or price"
          value={searchTerm}
          onChange={handleSearch}
          prefix={<SearchOutlined className="text-blue-500" />}
          className="w-full sm:w-2/3 px-4 py-2 border-2 border-blue-500 focus:border-blue-700 rounded-xl transition-all"
        />
      </div>

      {/* Listings Table */}
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
            loading={isFetching}
            columns={columns.map((column) => ({
              ...column,
              align: "center",
            }))}
            dataSource={filteredData}
            pagination={false}
            onChange={onChange}
            scroll={{ x: "max-content" }}
            className="rounded-lg overflow-hidden"
            components={{
              header: {
                /* eslint-disable @typescript-eslint/no-explicit-any */
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
        )}
      </Card>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={listingsData?.meta?.total}
          showSizeChanger
          showQuickJumper
          responsive
          pageSizeOptions={["5", "10", "15", "20"]}
          onChange={(page, pageSize) =>
            setPagination({ current: page, pageSize })
          }
          className="bg-white border border-blue-500 rounded-lg shadow-md px-3 py-1"
        />
      </div>
    </div>
  );
};

export default AllListings;
