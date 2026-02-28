import { UserProvider } from "@/app/contextProvider"

const layout = ({ children }: { children: React.ReactNode }) => {
  const user = { name: 'natnael', age: 23, id: 'lsjd234' }
  return (
    <main>
      <UserProvider.Provider value={user}>
        {children}
      </UserProvider.Provider>
    </main>
  )
}

export default layout
