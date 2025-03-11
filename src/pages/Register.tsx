import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import registrationSchema from "../schemas/RegistrationSchema";
import { Radio } from "antd";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [register] = useRegisterMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Registering...");

    try {
      const res = await register(data).unwrap();
      console.log(res);

      const user = verifyToken(res?.data?.accessToken);
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Signed Up Successfully", { id: toastId, duration: 2000 });

      navigate("/");
    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed", { id: toastId, duration: 5000 });
    }
  };

  // Blue Color Theme
  const blueColors = {
    primary: "#1E3A8A", // Deep Blue
    secondary: "#2563EB", // Vibrant Blue
    background: "#EFF6FF", // Light Blue
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        background: `linear-gradient(135deg, ${blueColors.background} 0%, ${blueColors.secondary} 100%)`,
      }}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
      >
        <h2 className="text-center text-2xl font-bold text-blue-700">
          Sign Up
        </h2>
        <PHForm onSubmit={onSubmit} resolver={zodResolver(registrationSchema)}>
          {/* Name Field */}
          <PHInput
            type="text"
            name="name"
            label="Name"
            placeholder="Enter your full name"
          />

          {/* Email Field */}
          <PHInput
            type="email"
            name="email"
            label="Email"
            placeholder="Enter your email"
          />

          {/* Password Field */}
          <PHInput
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
          />

          {/* User Role Selection */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">User Role</label>
            <Radio.Group name="role" defaultValue="tenant" className="mt-2">
              <Radio value="tenant" className="text-gray-800">Tenant</Radio>
              <Radio value="landlord" className="text-gray-800">Landlord</Radio>
            </Radio.Group>
          </div>

          {/* Remember Me */}
          <label className="flex items-center mt-4">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ms-2 text-sm text-gray-600">Remember me</span>
          </label>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white mt-5 shadow-sm hover:bg-blue-700 transition-all"
            >
              Sign Up
            </button>
          </div>
        </PHForm>

        {/* Support Information */}
        <div className="mt-6 text-center">
          <p className="text-sm font-bold text-gray-600">
            Need help? Call us at{" "}
            <span className="font-semibold text-blue-600">
              01928374658
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
