'use client'
import { UserContext } from "@/app/contexts/UserContext";
import { useContext } from "react";

const page = () => {
  const userData = useContext(UserContext);

  return (
    <div>
      {userData.name}
      {userData.age}
      {userData.id}
    </div>
  )
}

export default page
