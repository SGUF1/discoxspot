import { create } from 'zustand'
import { toast } from 'react-hot-toast'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Discoteca } from '@/type'

interface PreferedDiscoteche {
    items: Discoteca[],
    addItem: (data: Discoteca) => void;
    removeAll: () => void
}

const useLike = create(
    persist<PreferedDiscoteche>((set, get) => ({
        items: [],
        addItem: (data: Discoteca) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.id === data.id);

            if (existingItem) {
                set({ items: [...get().items.filter((item) => item.id !== data.id)] });
                return toast.success("Discoteca rimossa dai preferiti")
            }

            set({ items: [...get().items, data] });
            toast.success('Discoteca aggiunta ai preferiti')
        },
        removeAll: () => set({ items: [] })
    }), {
        name: "discoteche-storage",
        storage: createJSONStorage(() => localStorage)
    }))

export default useLike;