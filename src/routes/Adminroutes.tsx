import AllRentalListings from "../pages/Dashboard/Admin/manage_allRentalListings/AllRentalListings";
import DeleteRentalListings from "../pages/Dashboard/Admin/manage_allRentalListings/DeleteRentalListings";
// import EditRentalListings from "../pages/Dashboard/Admin/manage_allRentalListings/EditRentalListings";
import Calculate_revenue from "../pages/Dashboard/Admin/all_payment/Calculate_revenue";
import Acctivate_account from "../pages/Dashboard/Admin/manage_user/Acctivate_account";
import GetAllRentalListings from "../pages/Dashboard/Admin/manage_allRentalListings/GetAllRentalListings";
import UpdateAdminProfile from "../pages/Dashboard/Admin/UpdateAdminProfile";
import ChangeAdminPassword from "../pages/Dashboard/Admin/ChangeAdminPassword";
import AllPayments from "../pages/Dashboard/Admin/all_payment/AllPayments";

export const adminChildren = [
  {
    name: "Manage Users",
    path: "manage_users",
    element: <Acctivate_account />,
  },
  {
    name:"Manage All Rental Listings",
    children: [
      {
        name: "Get All Listings",
        path: "get_all_listings",
        element: <GetAllRentalListings />,
      },
      {
        name: "Edit Listings",
        path: "edit_listings",
        element: <AllRentalListings />,
      },
      {
        name: "Delete Listings",
        path: "delete_listings",
        element: <DeleteRentalListings />,
      },
    ]
  },
  {
    name: "All Payments",
    children: [
      {
        name: "See all payments history",
        path: "all_payments",
        element: <AllPayments />,
      },
      {
        name: "Total Revenue",
        path: "total_revenue",
        element: <Calculate_revenue />,
      },
    ],
  },
  {
    name: "Account Setting",
    children: [
      {
        name: "Update Profile",
        path: "admin-profile",
        element: <UpdateAdminProfile />,
      },
      {
        name: "Change Password",
        path: "admin-password",
        element: <ChangeAdminPassword />,
      },
    ]
  }
];
