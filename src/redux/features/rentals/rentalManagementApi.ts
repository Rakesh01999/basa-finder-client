/* eslint-disable @typescript-eslint/no-explicit-any */
// import { data } from "react-router-dom";
import { TQueryParam, TRentalListing, TRentalRequest, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

// Define types for the BasaFinder application
// export interface TRentalListing {
//   _id: string;
//   location: string;
//   description: string;
//   rentAmount: number;
//   bedrooms: number;
//   images: string[];
//   amenities: string[];
//   landlordId: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface TRentalRequest {
//   _id: string;
//   listingId: string;
//   tenantId: string;
//   message: string;
//   moveInDate: string;
//   duration: string;
//   status: "pending" | "approved" | "rejected";
//   landlordPhone?: string;
//   paymentStatus?: "pending" | "completed";
//   createdAt: string;
//   updatedAt: string;
// }

export interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: "admin" | "landlord" | "tenant";
  createdAt: string;
  updatedAt: string;
}

const rentalManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============= Listing Endpoints =============
    getAllListings: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
        //   url: "/listings",
          url: "/landlords/listings",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TRentalListing[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["rentalListings"],
    }),

    getLandlordListings: builder.query({
      query: () => {
        return {
          // url: "/landlords/listings",
          url: "/landlords/landlord/listings",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TRentalListing[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["rentalListings"],
    }),

    getSingleListing: builder.query({
      query: (id) => {
        // console.log('frmapi-',listingId);
        console.log('frmapi-',id);
        return {
          // url: `/listings/${listingId}`,
          // url: `/landlords/listings/${listingId}`,
          url: `/landlords/listings/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TRentalListing>) => {
        return {
          data: response.data,
        };
      },
      providesTags: ["rentalListings"],
    }),

    createListing: builder.mutation({
      query: (listingData) => {
        return {
          url: "/landlords/listings",
          method: "POST",
          body: {
            rentalHouse: {
              location: listingData.location,
              description: listingData.description,
              rentAmount: Number(listingData.rentAmount),
              bedrooms: Number(listingData.bedrooms),
              images: listingData.images,
              amenities: listingData.amenities,
            }
          }
        };
      },
      transformResponse: (response: TResponseRedux<TRentalListing>) => {
        return {
          data: response.data,
        };
      },
      invalidatesTags: ["rentalListings"],
    }),

    updateListing: builder.mutation({
      query: ({ data, listingId }) => {
        console.log(data, listingId);
        return {
          url: `/landlords/listings/${listingId}`,
          // method: "PUT",
          method: "PATCH",
          body: data,
        };
      },
      transformResponse: (response: TResponseRedux<TRentalListing>) => {
        return {
          data: response.data,
        };
      },
      invalidatesTags: ["rentalListings"],
    }),

    deleteListing: builder.mutation({
      query: ({ listingId }) => {
        console.log(listingId);
        return {
          url: `/landlords/listings/${listingId}`,
          method: "DELETE",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
        };
      },
      invalidatesTags: ["rentalListings"],
    }),

    // ============= Rental Request Endpoints =============
    getAllRequests: builder.query({
      query: () => ({
        url: "/landlords/requests",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TRentalRequest[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["rentalRequests"],
    }),

    getTenantRequests: builder.query({
      query: () => ({
        url: "/tenants/requests",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TRentalRequest[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["rentalRequests"],
    }),

    createRentalRequest: builder.mutation({
      query: (requestData) => ({
        // url: "/tenants/requests",
        url: "/tenants/create",
        method: "POST",
        body: requestData,
      }),
      transformResponse: (response: TResponseRedux<TRentalRequest>) => {
        console.log(response);
        return {
          data: response.data,
        };
      },
      invalidatesTags: ["rentalRequests"],
    }),

    updateRequestStatus: builder.mutation({
      query: ({ requestId, status, landlordPhone }) => {
        const body: any = { status };
        if (landlordPhone) {
          body.landlordPhone = landlordPhone;
        }
        
        return {
          url: `/landlords/requests/${requestId}`,
          method: "PUT",
          body,
        };
      },
      transformResponse: (response: TResponseRedux<TRentalRequest>) => {
        return {
          data: response.data,
        };
      },
      invalidatesTags: ["rentalRequests"],
    }),

    // ============= Payment Endpoints =============
    verifyPayment: builder.query({
      query: (requestId) => ({
        url: "/payments/verify",
        params: { request_id: requestId },
        method: "GET",
      }),
    }),

    makePayment: builder.mutation({
      query: (paymentData) => ({
        url: "/payments/process",
        method: "POST",
        body: paymentData,
      }),
      transformResponse: (response: TResponseRedux<any>) => {
        console.log("Payment API Response:", response);
        return {
          data: response.data,
        };
      },
      invalidatesTags: ["rentalRequests"],
    }),

    // ============= Admin Endpoints =============
    getAllUsers: builder.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<User[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["users"],
    }),

    updateUserRole: builder.mutation({
      query: ({ userId, role }) => {
        return {
          url: `/admin/users/${userId}`,
          method: "PUT",
          body: { role },
        };
      },
      invalidatesTags: ["users"],
    }),

    deleteUser: builder.mutation({
      query: (userId) => {
        return {
          url: `/admin/users/${userId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["users"],
    }),

    adminUpdateListing: builder.mutation({
      query: ({ data, listingId }) => {
        return {
          url: `/admin/listings/${listingId}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["rentalListings"],
    }),

    adminDeleteListing: builder.mutation({
      query: (listingId) => {
        return {
          url: `/admin/listings/${listingId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["rentalListings"],
    }),

    // ============= User Profile Endpoints =============
    updateProfile: builder.mutation({
      query: (profileData) => {
        return {
          // url: "/profile",
          url: "/update-profile",
          // method: "PUT",
          method: "PATCH",
          body: profileData,
        };
      },
      invalidatesTags: ["users"],
    }),

    alluser: builder.query({
      query: () => ({
          // url: "/alluser",
          url: "/users",
          method: "GET",
      }),
      // providesTags: ['tags']
      providesTags: ['users'],
  }),

    blockUser: builder.mutation({
      query: (userId) => {
          console.log(userId.userId)
          return {
              url: `/${userId.userId}`,
              method: "PUT",
          };
      },
      // invalidatesTags: ["tags"],
      invalidatesTags: ["users"],
  }),

    activateUser: builder.mutation({
      query: (userId) => {
          // console.log(userId)
          // console.log(userId.userId)
          return {
              url: `/${userId.userId}`,
              method: "PATCH",
          };
      },
      // invalidatesTags: ["tags"],
      invalidatesTags: ["users"],
  }),

    changePassword: builder.mutation({
      query: (passwordData) => {
        return {
          url: "/change-password",
          method: "POST",
          body: passwordData,
        };
      },
    }),

    calculateRevenue: builder.mutation({
      query: () => {
        return {
          url: "/payment/revenue",
          method: "GET"
        };
      },
    }),
  }),
});

export const {
  // Listing hooks
  useGetAllListingsQuery,
  useGetLandlordListingsQuery,
  useGetSingleListingQuery,
  useCreateListingMutation,
  useUpdateListingMutation,
  useDeleteListingMutation,
  
  // Request hooks
  useGetAllRequestsQuery,
  useGetTenantRequestsQuery,
  useCreateRentalRequestMutation,
  useUpdateRequestStatusMutation,
  
  // Payment hooks
  useVerifyPaymentQuery,
  useMakePaymentMutation,
  useCalculateRevenueMutation,
  
  // Admin hooks
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useAdminUpdateListingMutation,
  useAdminDeleteListingMutation,
  
  // Profile hooks
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useBlockUserMutation,
  useActivateUserMutation,
  useAlluserQuery,
} = rentalManagementApi;