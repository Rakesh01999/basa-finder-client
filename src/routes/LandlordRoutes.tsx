import MyRentalListings from "../pages/Dashboard/Landlord/MyRentalListings";
import CreateRentalListing from "../pages/Dashboard/Landlord/CreateRentalListing";
import UpdateRentalListing from "../pages/Dashboard/Landlord/UpdateRentalListing";
import TenantRequests from "../pages/Dashboard/Landlord/TenantRequests";
import UpdateProfile from "../pages/Dashboard/User/UpdateProfile";
import DeleteMyRentalListing from "../pages/Dashboard/Landlord/DeleteMyRentalListing";

export const landlordChildren = [
  {
    name: "My Rental Listings",
    path: "rental-listings",
    element: <MyRentalListings />,
  },
  {
    name: "Manage Listings",
    children: [
      {
        name: "Create Listing",
        path: "create-listing",
        element: <CreateRentalListing />,
      },
      {
        name: "Update Listing",
        // path: "update-listing/:listingId",
        path: "update-listing",
        element: <UpdateRentalListing />,
      },
      {
        name: "Delete Listing",
        path: "delete-listing/:listingId",
        element: <DeleteMyRentalListing />,
      },
    ],
  },
  {
    name: "Tenant Requests",
    path: "tenant-requests",
    element: <TenantRequests />,
  },
  {
    name: "Update Profile",
    path: "update-profile",
    element: <UpdateProfile />,
  },
];
