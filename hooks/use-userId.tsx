import { create } from 'zustand'
import { toast } from 'react-hot-toast'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Discoteca } from '@/type'

interface UserIdSet {
    userId: string,
    addItem: (data: string) => void;
}

const useUserIdSet = create(
    persist<UserIdSet>((set, get) => ({
        userId: "",
        addItem: (data: string) => {
            set({ userId: data });
        },
    }), {
        name: "user-storage",
        storage: createJSONStorage(() => localStorage)
    }))

export default useUserIdSet;