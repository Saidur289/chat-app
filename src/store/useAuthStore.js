import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { data } from "react-router-dom";


export const useAuthStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIng: false,
    isUpdateProfile: false,

    isCheckingAuth: true,
    checkAuth: async() => {
        try {
            const res = await axiosInstance.get('/auth/check')
            set({authUser: res.data})
        } catch (error) {
            console.log('error in check auth', error);
            set({authUser: null})
        }
        finally{
            set({isCheckingAuth: false})
        }
    },
    signup: async(data) => {
        set({isSigninUp: true})
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            set({authUser: res.data})
            toast.success("Account Create Successfully")
          
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
        finally{
            set({isSigninUp: false})
        }
    },
    login: async(data) => {
        set({isLoggingIng: true})
        try {
            const res = await axiosInstance.post('/auth/login', data)
            set({authUser: res.data})
            toast.success("Login Successfully")
          
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
        finally{
            set({isLoggingIng: false})
        }
    },
    logout: async() => {
        try {
            await axiosInstance.post('/auth/logout')
            set({authUser: null})
            toast.success("Logout Successfully")
            
        } catch (error) {
            toast.error(error)
        }
    },
    updateProfile: async (data) => {
        set({isUpdateProfile: true})
        try {
              const res = await axiosInstance.put('/auth/update-profile', data)
              set({authUser: res.data})
              toast.success('Profile updated successfully')
        } catch (error) {
            console.log("error in update profile:", error);
      toast.error(error.response.data.message);
        }
        finally {
            set({ isUpdatingProfile: false });
          }
    },
}))