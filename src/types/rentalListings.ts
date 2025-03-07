export type TRentalListing = {
    _id: string;
    landlordId: string;  // ID of the landlord who owns the property
    location: string;  // Address or city
    description: string;  // Property details
    rentAmount: number;  // Monthly rent price
    bedrooms: number;  // Number of bedrooms
    bathrooms: number;  // Number of bathrooms
    areaSize: number;  // Size in square feet or meters
    images: string[];  // Array of image URLs
    amenities: string[];  // List of amenities (Wi-Fi, Parking, etc.)
    isAvailable: boolean;  // Availability status
    isDeleted: boolean;  // Soft delete status
    createdAt: string;
    updatedAt: string;
};

// Rental Request (For Tenants Requesting to Rent a Property)
export interface TRentalRequest {
    _id: string;
    tenantId: string;  // ID of the tenant making the request
    listingId: string;  // ID of the rental listing being requested
    status: "pending" | "approved" | "rejected";  // Request status
    message?: string;  // Optional message from the tenant
    createdAt: string;
    updatedAt: string;
}

// Payment Model (For Rent Payments)
export interface TRentalPayment {
    _id: string;
    tenantEmail: string;
    listingId: string;
    requestId: string;
    amount: number;
    status: "Pending" | "Paid" | "Failed" | "Cancelled";
    transaction: {
        id: string;
        transactionStatus: string;
        bank_status: string;
        sp_code: string;
        sp_message: string;
        method: string;
        date_time: string;
    };
    createdAt: string;
    updatedAt: string;
}
