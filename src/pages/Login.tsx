import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { NavLink, useNavigate } from "react-router-dom";
import { setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginSchema from "../schemas/LoginValidation";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    // const toastId = toast.loading("Logging in");
    const toastId = toast.loading("Signing in");

    try {
      const res = await login(data).unwrap();

      const user = verifyToken(res?.data?.accessToken);

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Signed in successfully", { id: toastId, duration: 2000 });

      navigate("/");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err?.message, { id: toastId, duration: 5000 });
      } else {
        toast.error("Something went wrong or blocked", {
          id: toastId,
          duration: 5000,
        });
      }
    }
  };


    // Blue Theme
    // const blueColors = {
    //   primary: "#1E3A8A", // Deep Blue
    //   secondary: "#2563EB", // Vibrant Blue
    //   background: "#EFF6FF", // Light Blue
    // };
  
  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        // background: `linear-gradient(135deg, ${blueColors.background} 0%, ${blueColors.secondary} 100%)`,
        backgroundImage: `url('https://i.postimg.cc/BnsH4VQy/3d-rendering-isometric-house.jpg')`,  // ✅ Replace with actual image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        
      }}
    >
      <div
        className="w-full max-w-md rounded-lg bg-gray-100 p-8 shadow-md
      xl:-mt-32 lg:-mt-20 
      "
      >
        <h2 className="text-center text-2xl font-bold text-blue-700">
          Sign In
        </h2>
        <PHForm onSubmit={onSubmit} resolver={zodResolver(LoginSchema)}>
          <PHInput
            type="text"
            name="email"
            label="Email"
            placeholder="Enter you email"
          />
          <PHInput
            type="text"
            name="password"
            label="Password"
            placeholder="Enter your password"
          />

          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ms-2 text-sm text-gray-600">Remember me</span>
          </label>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white mt-5 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </div>
        </PHForm>
        <div className="mt-8 flex justify-center text-center">
          <p className="text-sm font-bold text-gray-600">
            are you not register{" "}
            <span className="font-semibold text-blue-600">
              <NavLink to="/register">Sign Up</NavLink>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
