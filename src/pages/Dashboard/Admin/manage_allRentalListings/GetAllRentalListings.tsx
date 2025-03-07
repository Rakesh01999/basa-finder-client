/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Input, Table, Button, Tag, Tooltip, Slider, Card } from "antd";
import { SearchOutlined, HomeOutlined } from "@ant-design/icons";
import { useGetAllListingsQuery } from "../../../../redux/features/rentals/rentalManagementApi";
import type { TQueryParam } from "../../../../types";
import { useNavigate } from "react-router-dom";
import type { TableColumnsType } from "antd";

// Type definitions
type TRentalData = {
  key: string;
  location: string;
  price: number;
  bedrooms: number;
  amenities: string[];
  status: string;
  landlordId: string;
};

const GetAllRentalListings: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<TRentalData[]>([]);

  // Price Range State (Default: 0 - 50,000)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);

  // Bedrooms Filter
  const [bedroomFilter, setBedroomFilter] = useState<number | null>(null);

  const navigate = useNavigate();

  const { data: listingsData, isFetching } = useGetAllListingsQuery([
    ...(params || []),
    { name: "page", value: pagination.current.toString() },
    { name: "limit", value: pagination.pageSize.toString() },
  ]);

  const tableData = listingsData?.data?.map(
    // ({ _id, location, description, rentAmount, bedrooms, amenities, status, landlordId }) => ({
    ({
      _id,
      location,
      description,
      rentAmount,
      bedrooms,
      amenities,
      landlordId,
    }) => ({
      key: _id,
      location,
      description: description || "No description provided",
      price: rentAmount,
      bedrooms,
      amenities: amenities || [],
      status: status || "Available",
      landlordId,
    })
  );

  // Real-time Filtering (Search + Price Range + Bedrooms)
  useEffect(() => {
    if (tableData) {
      const filtered = tableData.filter((item) => {
        // Search term matching
        const isMatch =
          item.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase());

        // Apply price range filtering
        const isInPriceRange =
          item.price >= priceRange[0] && item.price <= priceRange[1];

        // Apply bedroom filtering if set
        const matchesBedrooms =
          bedroomFilter === null || item.bedrooms === bedroomFilter;

        return isMatch && isInPriceRange && matchesBedrooms;
      });

      setFilteredData(filtered);
    }
  }, [searchTerm, priceRange, bedroomFilter, listingsData]);

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      Available: "green",
      Pending: "orange",
      Rented: "red",
      Maintenance: "blue",
    };
    return statusColors[status] || "default";
  };

  const columns: TableColumnsType<TRentalData> = [
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (location) => (
        <Tooltip title={location}>
          <span className="font-semibold">{location}</span>
        </Tooltip>
      ),
      filters: Array.from(
        new Set((tableData || []).map((item) => item.location))
      ).map((location) => ({ text: location, value: location })),
      onFilter: (value, record) => record.location === value,
    },
    {
      title: "Price (Monthly)",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span className="text-green-600 font-bold">
          ${price.toLocaleString()}
        </span>
      ),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Bedrooms",
      dataIndex: "bedrooms",
      key: "bedrooms",
      filters: [
        { text: "Studio", value: 0 },
        { text: "1 Bedroom", value: 1 },
        { text: "2 Bedrooms", value: 2 },
        { text: "3 Bedrooms", value: 3 },
        { text: "4+ Bedrooms", value: 4 },
      ],
      onFilter: (value, record) => {
        if (value === 4) {
          return record.bedrooms >= 4;
        }
        return record.bedrooms === value;
      },
      render: (bedrooms) => (
        <span className="font-medium">
          {bedrooms === 0
            ? "Studio"
            : `${bedrooms} ${bedrooms === 1 ? "Bedroom" : "Bedrooms"}`}
        </span>
      ),
    },
    {
      title: "Amenities",
      dataIndex: "amenities",
      key: "amenities",
      render: (amenities) => (
        <div className="flex flex-wrap gap-1">
          {amenities.slice(0, 3).map((amenity: string, index: number) => (
            <Tag key={index} color="blue">
              {amenity}
            </Tag>
          ))}
          {amenities.length > 3 && (
            <Tooltip title={amenities.slice(3).join(", ")}>
              <Tag color="blue">+{amenities.length - 3} more</Tag>
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Available", value: "Available" },
        { text: "Pending", value: "Pending" },
        { text: "Rented", value: "Rented" },
        { text: "Maintenance", value: "Maintenance" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag color={getStatusColor(status)} className="font-medium">
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: TRentalData) => (
        <div className="flex space-x-2">
          <Button
            onClick={() => navigate(`/listings/${record.key}`)}
            className="transition-all duration-300 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md shadow-md"
          >
            View
          </Button>
          {/* If user is a Tenant, show Request button */}
          <Button
            onClick={() => navigate(`/rental-request/${record.key}`)}
            className="transition-all duration-300 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md shadow-md"
            // Here you would add logic to only show this for Tenants and Available properties
            // disabled={userRole !== "tenant" || record.status !== "Available"}
          >
            Request
          </Button>
        </div>
      ),
    },
  ];

//   const tealColors = {
//     primary: "#0F766E", // Deep Teal
//     secondary: "#14B8A6", // Bright Teal
//     background: "#ECFDF5", // Light Teal
//   };
const blueColors = {
    primary: "#1E3A8A", // Deep Blue
    secondary: "#2563EB", // Vibrant Blue
    background: "#EFF6FF", // Light Blue
  };


  // Generate bedroom filter options
  const bedroomOptions = [
    { label: "Any", value: null },
    { label: "Studio", value: 0 },
    { label: "1 Bedroom", value: 1 },
    { label: "2 Bedrooms", value: 2 },
    { label: "3 Bedrooms", value: 3 },
    { label: "4+ Bedrooms", value: 4 },
  ];

  return (
    <div className="p-6 min-h-screen">
      <div className="shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center">
          <div className="flex justify-between items-center mb-6">
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
                <HomeOutlined /> Available Rental Listings
              </h1>
            </Card>
          </div>
        </div>

        {/* Search & Filters Section */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="md:col-span-1">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search by location or description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              size="large"
            />
          </div>

          {/* Price Range Filter */}
          <div className="flex flex-col bg-white rounded-xl p-3 shadow-sm">
            <span className="text-lg font-semibold text-gray-600">
              Monthly Rent Range
            </span>
            <Slider
              range
              min={0}
              max={50000}
              step={500}
              defaultValue={priceRange}
              onChange={(value) => setPriceRange(value as [number, number])}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>${priceRange[0].toLocaleString()}</span>
              <span>${priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          {/* Bedroom Filter */}
          <div className="flex flex-col bg-white rounded-xl p-3 shadow-sm">
            <span className="text-lg font-semibold text-gray-600 mb-2">
              Bedrooms
            </span>
            <div className="flex flex-wrap gap-2">
              {bedroomOptions.map((option) => (
                <Button
                  key={option.value === null ? "any" : option.value}
                  type={bedroomFilter === option.value ? "primary" : "default"}
                  onClick={() => setBedroomFilter(option.value)}
                  className={
                    bedroomFilter === option.value
                      ? "bg-blue-500 text-white"
                      : ""
                  }
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredData.length} of {tableData?.length || 0} listings
          </p>
        </div>

        {/* Listings Table */}
        <Table
          columns={columns}
          dataSource={filteredData}
          loading={isFetching}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: listingsData?.meta?.total,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
            onChange: (page, pageSize) => {
              setPagination({ current: page, pageSize });
            },
          }}
          scroll={{ x: 800 }}
          className="shadow-sm"
          rowClassName={(record) =>
            record.status === "Rented" ? "bg-red-50" : ""
          }
          components={{
            header: {
              cell: (props: any) => (
                <th
                  {...props}
                  style={{
                    ...props.style,
                    color: "blue",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                />
              ),
            },
          }}
        />
      </div>
    </div>
  );
};

export default GetAllRentalListings;
