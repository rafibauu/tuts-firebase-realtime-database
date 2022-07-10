import { createContext, useContext, useState } from 'react'

export const InitialUser = {
  email: null,
  uid: null,
  profile: null,
  isReady: false
}

const UserContext = createContext()

export const useUser = () => {
  return useContext(UserContext)
}

export const UserProvider = (props) => {
  const [userState, setUserState] = useState(InitialUser)

  const setUser = (user) => {
    setUserState({ ...userState, ...user, isReady: true });
  }

  const resetUser = () => {
    setUserState(InitialUser);
  }

  const value = { ...userState, setUser, resetUser };

  return <UserContext.Provider value={value} {...props} />
}
