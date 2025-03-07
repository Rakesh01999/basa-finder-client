/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Form, Input, Button, Select, InputNumber, Upload, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCreateListingMutation } from "../../../redux/features/rentals/rentalManagementApi";
import { toast } from "sonner";

const blueColors = {
  primary: "#1E3A8A", // Deep Blue
  secondary: "#2563EB", // Vibrant Blue
  background: "#EFF6FF", // Light Blue
};

const { Option } = Select;

const CreateRentalListing: React.FC = () => {
  const navigate = useNavigate();
  const [createListing, { isLoading }] = useCreateListingMutation();
  const [form] = Form.useForm();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // **Handle Multiple Image Upload to Cloudinary**
  const handleFileUpload = async (info: any) => {
    const files = info.fileList;
    const uploadedUrls: string[] = [];

    try {
      setIsUploading(true);
      const toastId = toast.loading("Uploading images...");

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file.originFileObj);
        formData.append("upload_preset", "pxuxm8bg");
        formData.append("cloud_name", "dd3w1s9gq");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dd3w1s9gq/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const uploadResult = await response.json();
        uploadedUrls.push(uploadResult.url);
      }

      setImageUrls([...imageUrls, ...uploadedUrls]); // ✅ Append new images to state
      toast.dismiss(toastId);
      toast.success("Images uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed!");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  // **Handle Removing an Image**
  const handleRemoveImage = (index: number) => {
    const updatedUrls = [...imageUrls];
    updatedUrls.splice(index, 1);
    setImageUrls(updatedUrls);
    toast.success("Image removed successfully");
  };

  // **Handle Form Submission**
  const handleSubmit = async (values: any) => {
    try {
      if (imageUrls.length === 0) {
        toast.error("Please upload at least one image.");
        return;
      }

      const listingData = {
        location: values.location,
        description: values.description,
        rentAmount: Number(values.rentAmount),
        bedrooms: Number(values.bedrooms),
        images: imageUrls, // ✅ Send Cloudinary URLs to backend
        amenities: values.amenities,
      };

      await createListing(listingData).unwrap();
      toast.success("Listing created successfully!");
      navigate("/dashboard/rental-listings");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
    } catch (error) {
      toast.error("Failed to create listing. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-6"
      style={{
        background: `linear-gradient(135deg, ${blueColors.background} 0%, ${blueColors.secondary} 100%)`,
      }}
    >
      {/* Page Title */}
      <Card className="w-full max-w-3xl text-center shadow-lg mb-6">
        <h1 className="text-2xl font-semibold text-blue-800">
          Create Rental Listing
        </h1>
        <p className="text-gray-600 text-sm">
          Add a new property listing with all necessary details.
        </p>
      </Card>

      {/* Form */}
      <Card className="w-full max-w-3xl shadow-md p-6">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* Location */}
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Location is required" }]}
          >
            <Input placeholder="Enter property location" />
          </Form.Item>

          {/* Description */}
          <Form.Item name="description" label="Description">
            <Input.TextArea
              rows={3}
              placeholder="Provide details about the property"
            />
          </Form.Item>

          {/* Rent Price */}
          <Form.Item
            name="rentAmount"
            label="Rent Amount (৳)"
            rules={[{ required: true, message: "Rent is required" }]}
          >
            <InputNumber min={1000} max={100000} className="w-full" />
          </Form.Item>

          {/* Bedrooms */}
          <Form.Item
            name="bedrooms"
            label="Number of Bedrooms"
            rules={[{ required: true, message: "Select bedrooms" }]}
          >
            <Select placeholder="Select bedroom count">
              <Option value={0}>Studio</Option>
              <Option value={1}>1 Bedroom</Option>
              <Option value={2}>2 Bedrooms</Option>
              <Option value={3}>3 Bedrooms</Option>
              <Option value={4}>4+ Bedrooms</Option>
            </Select>
          </Form.Item>

          {/* Amenities */}
          <Form.Item name="amenities" label="Amenities">
            <Select mode="multiple" placeholder="Select amenities">
              <Option value="WiFi">WiFi</Option>
              <Option value="Parking">Parking</Option>
              <Option value="Gym">Gym</Option>
              <Option value="Pool">Swimming Pool</Option>
              <Option value="Furnished">Furnished</Option>
            </Select>
          </Form.Item>

          {/* Image Upload */}
          <Form.Item label="Upload Images">
            <Upload
              accept="image/*"
              listType="picture"
              multiple // ✅ Enable multiple image selection
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleFileUpload}
            >
              <Button icon={<UploadOutlined />} loading={isUploading}>
                {isUploading ? "Uploading..." : "Click to Upload"}
              </Button>
            </Upload>

            {/* Preview Uploaded Images */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {imageUrls.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Uploaded ${index}`}
                    className="w-full h-24 object-cover rounded-md shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </Form.Item>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              onClick={() => navigate("/dashboard/rental-listings")}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Create Listing
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CreateRentalListing;
