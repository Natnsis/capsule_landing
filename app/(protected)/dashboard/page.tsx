'use client'

import { useMessageStore } from "@/app/stores/useUserStore"
import { useEffect } from "react";

const page = () => {
  const getMessages = useMessageStore((state) => state.getComments);
  const messages = useMessageStore((state) => state.messages);

  useEffect(() => {
    getMessages()
  }, [getMessages])
  return (
    <div>
      {messages[0]?.body}
    </div>
  )
}

export default page
