'use client'
import { UserContext } from "../contexts/UserContext"

const layout = ({ children }: { children: React.ReactNode }) => {
  const user = { name: 'natnael', age: 23, id: 'lsjd234' }
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

export default layout
