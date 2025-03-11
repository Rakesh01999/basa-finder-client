import { z } from "zod";


const registrationSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z
    .enum(['landlord', 'tenant'], {
      // invalid_type_error: "Role must be either 'admin' or 'customer'",
      invalid_type_error: "Role must be either 'admin', 'landlord', or 'tenant'",
    }),
});

export default registrationSchema;
