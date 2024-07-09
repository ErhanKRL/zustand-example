import { StateCreator } from "zustand"

type userState = {
    userName: string
    fullName: string
    age: number
    address: string
}

type userActions = {
   setAddress: (address: string) => void
   fetchUser: () => Promise<void>
}

export type UserSlice = userState & userActions

export const createUserSlice: StateCreator<UserSlice, [['zustand/immer', never]], [], UserSlice> = (
    set
) => ({
    userName: "",
    fullName: "",
    age: 0,
    address: "",
    setAddress: (address: string) => set((state) => { 
        state.address = address 
    }),
    fetchUser: async() => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set((state) => {
            state.userName = "John@test.com"
            state.fullName = "John Smith"
            state.age = 25
            state.address = ""
        })
    },
})  