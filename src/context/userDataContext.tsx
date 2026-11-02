'use client'
import { createContext, useState } from "react"
export interface BookBdata{
    bookBdata : {email:string,_id : string}[],
    setBookBdata : React.Dispatch<React.SetStateAction<{
        email:string,
        _id : string
    }[]>>
}
export const UserDataContext = createContext<BookBdata | undefined>(undefined)
export default function UserDataProvider({children}: {children : React.ReactNode}) {
    const [bookBdata,setBookBdata] = useState([{email: "",_id: ""}]);
    const sheard : BookBdata = {
        bookBdata,
        setBookBdata
    }
    return (
        <UserDataContext.Provider value={sheard}>
            {children}
        </UserDataContext.Provider>
    )
}