"use client"
import Header from "@/components/Header"
import { useState, useEffect } from "react";

const page = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <main>
      <Header />
      <div className={`card ${show ? "show" : ""}`}>
        Hello
      </div>
    </main>
  )
}

export default page
