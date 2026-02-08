import { createContext, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react";
import type { UserType } from "../@types/UserType";

interface ContextType {
  token: boolean | {},
  setToken: Dispatch<SetStateAction<boolean | UserType>>,
  users: UserType[],
  setUsers: Dispatch<SetStateAction<UserType[]>>,
}

export const Context = createContext<ContextType>({} as ContextType)


export const GlobalContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 1, firstname: "Diyorbek", lastname: "Tursunov", email: "diyorbek@gmail.com", password: "1234" },
    { id: 2, firstname: "Doniyor", lastname: "Tojiev", email: "doniyor@gmail.com", password: "1234" },
  ])
  const [token, setToken] = useState<boolean | UserType>(false)

  return <Context.Provider value={{setToken, token, users, setUsers}}>{children}</Context.Provider>
}
