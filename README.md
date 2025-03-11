# BasaFinder 🏡 - Smart Rental & Housing Solution

## 📌 Project Overview

BasaFinder is a **full-stack web application** designed to provide a **smart rental housing solution** that seamlessly connects **landlords** and **tenants** while being managed by an **admin**. It allows landlords to post and manage rental properties, while tenants can search, view, and request rentals. The platform features a **secure authentication system, role-based access, and a smooth payment process** for securing rentals.

---
## 🌟 Features & Functionalities

### **1️⃣ User Roles**
- **Admin:** Manages user accounts, oversees rental listings, and ensures compliance.
- **Landlord:** Posts and manages rental listings, responds to rental requests, and approves payments.
- **Tenant:** Searches for rental houses, submits rental requests, and completes payments for approved requests.

### **2️⃣ Authentication & Security**
- **JWT-based Authentication** for secure login and session management.
- **Bcrypt password hashing** for enhanced security.
- **Role-based access control** for secure data handling.

### **3️⃣ Rental Listings & Search**
- Landlords can post detailed rental listings with images.
- Tenants can **search and filter** rentals by `location`, `price range`, and `number of bedrooms`.

### **4️⃣ Rental Request & Approval System**
- Tenants can submit rental requests.
- Landlords can approve or reject requests.
- Once approved, payment options become available, and the landlord’s contact details are shared.

### **5️⃣ Secure Payment System**
- Payment integration (Stripe, ShurjoPay, etc.) to handle rental payments securely.
- Payment history for tenants and landlords.

### **6️⃣ Dashboards**
- **Admin Dashboard**: User & rental management.
- **Landlord Dashboard**: View listings, manage requests, and approve payments.
- **Tenant Dashboard**: View requests, check payment status, and track rental approvals.

### **7️⃣ Additional Features**
- **Email Notifications** for rental approvals and updates.
- **Profile Management**: Users can update their information and passwords.
- **Responsive UI** for seamless access across all devices.

---
## 🛠️ Tech Stack

### **Frontend:**
- **Next.js** (React Framework for SSR & SSG)
- **TypeScript** for type safety
- **Tailwind CSS** for responsive UI
- **Redux Toolkit** for state management
- **Ant Design** for UI components

### **Backend:**
- **Node.js** with **Express.js** for building APIs
- **MongoDB** (Mongoose) for database management
- **JWT Authentication** for secure login
- **Bcrypt.js** for password encryption
- **Cloudinary** for image storage

### **Deployment:**
- **Frontend**: Vercel
- **Backend**: Vercel / AWS / Heroku
- **Database**: MongoDB Atlas

---
## 📌 Installation & Setup Guide

### **1️⃣ Clone the Repositories**
```sh
# Frontend
git clone https://github.com/yourusername/basafinder-client.git
cd basafinder-client

# Backend
git clone https://github.com/yourusername/basafinder-server.git
cd basafinder-server
```

### **2️⃣ Install Dependencies**
```sh
# Inside both frontend and backend folders
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a **.env** file in both the frontend and backend projects and add the required environment variables.

#### **Frontend (.env.local)**
```
NEXT_PUBLIC_API_BASE_URL=https://basa-finder-server.vercel.app/api/v1
NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL=<your-cloudinary-url>
```

#### **Backend (.env)**
```
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
CORS_ORIGIN=https://basa-finder-client.vercel.app
CLOUDINARY_URL=<your-cloudinary-url>
```

### **4️⃣ Run the Development Server**
```sh
# Frontend
npm run dev

# Backend
npm run start
```

### **5️⃣ Access the Application**
- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000/api/v1`

---
## 🌍 Live Deployment
- **Frontend**: [BasaFinder Client](https://basa-finder-client.vercel.app/)
- **Backend**: [BasaFinder API](https://basa-finder-server.vercel.app/)

---
## 📝 API Endpoints

### **Authentication**
| Method | Endpoint                 | Description               |
|--------|--------------------------|---------------------------|
| POST   | `/auth/register`         | Register a new user      |
| POST   | `/auth/login`            | User login               |

### **Rental Listings**
| Method | Endpoint                     | Description |
|--------|--------------------------------|-------------|
| GET    | `/listings`                   | Get all rental listings |
| POST   | `/landlords/listings`         | Create a rental listing |
| PUT    | `/landlords/listings/:id`     | Update a rental listing |
| DELETE | `/landlords/listings/:id`     | Delete a rental listing |

### **Rental Requests**
| Method | Endpoint                     | Description |
|--------|--------------------------------|-------------|
| POST   | `/tenants/requests`          | Submit a rental request |
| GET    | `/tenants/requests`          | View tenant’s rental requests |
| PUT    | `/landlords/requests/:id`    | Approve or reject a request |

### **Payments**
| Method | Endpoint                     | Description |
|--------|--------------------------------|-------------|
| GET    | `/payment/my-payments`       | View tenant payment history |
| GET    | `/payment/all-payments`      | Admin view of all payments |

---
## 🎯 Future Improvements
- 🔹 **AI-powered rental recommendations**
- 🔹 **Google Maps integration for precise rental locations**
- 🔹 **In-app messaging between tenants & landlords**

---
## 🤝 Contributing
We welcome contributions! Feel free to **fork** the repo, make your changes, and submit a **pull request**.

---
## 📞 Contact Us
📧 Email: support@basafinder.com  
📱 Phone: +880 1234 567890  
🌍 Website: [BasaFinder](https://basa-finder-client.vercel.app/)  

---
## 📜 License
This project is **MIT Licensed**. You are free to use, modify, and distribute it under the terms of the license.

---
### **⭐ If you like this project, don’t forget to star the repository! ⭐**

