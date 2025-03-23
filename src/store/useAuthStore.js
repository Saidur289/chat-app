import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const navigate = useNavigate()
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
    }
    signup: async(data) => {
        set({isSigninUp: true})
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            set({authUser: res.data})
            toast.success("Account Create Successfully")
            navigate('/')
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
        finally{
            set({isSigninUp: false})
        }
    }
}))