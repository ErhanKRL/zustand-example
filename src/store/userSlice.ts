import { StateCreator } from "zustand"

type userState = {
    userName: string
    fullName: string
    age: number
    address: string
}

type userActions = {
   setAdress: (address: string) => void
}

export type UserSlice = userState & userActions

export const createUserSlice: StateCreator<UserSlice, [['zustand/immer', never]], [], UserSlice> = (
    set
) => ({
    userName: "",
    fullName: "",
    age: 0,
    address: "",
    setAdress: (address: string) => set((state) => { 
        state.address = address 
    }),
})  