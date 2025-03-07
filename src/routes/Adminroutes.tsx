import AllRentalListings from "../pages/Dashboard/Admin/manage_allRentalListings/AllRentalListings";
import DeleteRentalListings from "../pages/Dashboard/Admin/manage_allRentalListings/DeleteRentalListings";
// import EditRentalListings from "../pages/Dashboard/Admin/manage_allRentalListings/EditRentalListings";
import All_order from "../pages/Dashboard/Admin/manage_order/All_order";
import Calculate_revenue from "../pages/Dashboard/Admin/manage_order/Calculate_revenue";
// import CreateCar from "../pages/Dashboard/Admin/manage_product/CreateCar";
// import DeleteCar from "../pages/Dashboard/Admin/manage_product/DeleteCar";
// import GetAllCar from "../pages/Dashboard/Admin/manage_product/GetAllCar";
// import UpdateCar from "../pages/Dashboard/Admin/manage_product/UpdateCar";
import Acctivate_account from "../pages/Dashboard/Admin/manage_user/Acctivate_account";
import GetAllRentalListings from "../pages/Dashboard/Admin/manage_allRentalListings/GetAllRentalListings";
import UpdateAdminProfile from "../pages/Dashboard/Admin/UpdateAdminProfile";
import ChangeAdminPassword from "../pages/Dashboard/Admin/ChangeAdminPassword";

export const adminChildren = [
  {
    name: "Manage_users",
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
  // {
  //   name: "Manage Product",
  //   children: [
  //     {
  //       name: "Create Bike",
  //       path: "create_bike",
  //       element: <CreateCar />,
  //     },
  //     {
  //       name: "See all bikes",
  //       path: "get_bike",
  //       element: <GetAllCar />,
  //     },
  //     {
  //       name: "Update Bike",
  //       path: "update_bike",
  //       element: <UpdateCar />,
  //     },
  //     {
  //       name: "Delete Bike",
  //       path: "delete_bike",
  //       element: <DeleteCar />,
  //     },
  //   ],
  // },
  {
    name: "Manage Order",
    children: [
      {
        name: "See all order",
        path: "all_order",
        element: <All_order />,
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
