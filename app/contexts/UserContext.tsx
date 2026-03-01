'use client'
import { createContext } from "react";

type UserData = {
  name: string,
  age: number,
  id: string
}

export const UserContext = createContext<UserData>({ name: '', age: 0, id: '' });
