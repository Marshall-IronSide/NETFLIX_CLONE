import {create} from 'zustand';
import axios from 'axios';

axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

const API_URL = 'http://localhost:5000/api'; // Replace with your backend URL
export const useAuthStore = create((set) => ({
    // Initial state

    user: null,
    isLoading: false,
    error: null,
    message: null,
    fetchinUser: true,

    //functions

    signUp: async (username, email, password) => {
        set({ isLoading: true, message: null });

        try{
            const response = await axios.post(`${API_URL}/signup`, { username, email, password });
            set({ isLoading: false, user: response.data.user });
        }catch(error) {
            set({ isLoading: false, error: error.response.data.message || "Error signing up" });
            throw error;
        }
    },

    login: async (username, password) => {
        set({ isLoading: true, message: null, error: null });

        try {
            const response = await axios.post(`${API_URL}/login`, { username, password });
            const { user, message } = response.data;
            set({ user, message, isLoading: false });
            return { user, message };
        } catch (error) {
            set({ isLoading: false, error: error.response.data.message || "Error logging in" });
            throw error;
        }
    },

    fetchUser: async () => {
        set({ fetchinUser: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/fetch-user`);
            set({ user: response.data.user, fetchinUser: false });
        } catch (error) {
            set({ fetchingUser: false, error: null, user: null });
            throw error;
        }
    },

    logout: async() => {
        set ({isLoading: true, error: null, message: null})

        try {
            const response = await axios.post(`${API_URL}/logout`)
            const {message} = response.data;
            set({
                message,
                isLoading: false,
                user: null,
                error: null
            })

            return {message};
        } catch (error) {
            set({ isLoading: false, error: error.response.data.message || "Error loggin out" });
            throw error;
        }
    }
}));