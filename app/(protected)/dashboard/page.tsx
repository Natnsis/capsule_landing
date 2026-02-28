import { useContext } from "react"
import { UserProvider } from "../contextProvider"

const page = () => {
  const user = useContext(UserProvider);
  return (
    <div>this is the dashboard and users fetched ${user?.id}</div>
  )
}

export default page
