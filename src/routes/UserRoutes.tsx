import ChangePassword from "../pages/Dashboard/User/Changepassword";
import UpdateProfile from "../pages/Dashboard/User/UpdateProfile";

export const userChildren = [
  {
    name: "Update Profile",
    path: "update-profile",
    element: <UpdateProfile />,
  },
  {
    name: "Change Password",
    path: "change_password",
    element: <ChangePassword />,
  },
];
