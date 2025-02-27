import { CartProduct } from "@/types/cartProduct";
import { Product } from "@/types/product";
import { StateCreator } from "zustand"

type CartState = {
    products: CartProduct[];
    total: number
}

type CartActions = {
    addProduct: (product: Product) => void
    removeProduct: (productId: string) => void
    incQty: (productId: string) => void
    decQty: (productId: string) => void
    getProductById: (productId: string) => CartProduct | undefined
    setTotal: (total: number) => void
    reset: () => void
}

export type CartSlice = CartState & CartActions

const initialState: CartState = {
    products: [],
    total: 0
}

export const createCartSlice: StateCreator<CartSlice, [['zustand/immer', never]], [], CartSlice> = (set, get) => ({
    ...initialState,
    incQty: (productId: string) => set((state) => {
        const foundProduct = state.products.find((p) => p.id === productId)
        if (foundProduct) {
            foundProduct.quantity += 1
            state.total += foundProduct.price
        }
    }),
    decQty: (productId: string) => set((state) => {
        const foundIndex = state.products.findIndex((p) => p.id === productId)
        if (foundIndex !== -1) {
            if(state.products[foundIndex].quantity === 1) {
                state.products.splice(foundIndex, 1)
        } else {
            state.products[foundIndex].quantity -= 1
            state.total -= state.products[foundIndex].price
        }
    }
    }),
    addProduct: (product: Product) => set((state) => {
        state.products.push({ ...product, quantity: 1 })
    
    }),
    removeProduct: (productId: string) => set((state) => {
        state.products = state.products.filter((p) => p.id !== productId)
    }),
    getProductById: (productId: string) => get().products.find((p) => p.id === productId),
    setTotal: (total: number) => set((state) => {
        state.total = total
    }),
    reset: () => set(initialState)
})