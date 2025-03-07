import AllListings from "../pages/Dashboard/Tenant/AllListings";
// import MakePayment from "../pages/Dashboard/Tenant/MakePayment";
import PaymentHistory from "../pages/Dashboard/Tenant/PaymentHistory";
import UpdateProfile from "../pages/Dashboard/Tenant/UpdateProfile";
import MyRentalRequests from "../pages/Dashboard/Tenant/MyRentalRequests";
import ChangePassword from "../pages/Dashboard/Tenant/Changepassword";

export const tenantChildren = [
  {
    name: "Rental Listings",
    path: "listings",
    element: <AllListings />,
  },
  {
    name: "Manage Rental Requests",
    children: [
      {
        name: "View Requests",
        path: "rental-requests",
        element: <MyRentalRequests />,
      },
    //   {
    //     name: "Make Payment",
    //     path: "make-payment",
    //     element: <MakePayment />,
    //   },
      {
        name: "Payment History",
        path: "payment-history",
        element: <PaymentHistory />,
      },
    ],
  },
  {
    name: "Account Settings",
    children: [
      {
        name: "Update Profile",
        path: "update-profile",
        element: <UpdateProfile />,
      },
      {
        name: "Change Password",
        path: "changePassword",
        element: <ChangePassword />,
      },
    ],
  },
];
