//useState & useEffect

/*
const page = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.log('theres a change on : ', count)
  }, [count]);
  return (
    <div className= 'p-10' >
    <p className='text-center' > { count } </p>
      < div className = 'flex gap-10 justify-center' >
        <button onClick={ () => setCount(count - 1) }> decrease </button>
          < button onClick = {() => setCount(count + 1)}> increase </button>
            </div>
            </div>
  )
}
*/

//use context
/*
layout

'use client'
import { usercontext } from "../contexts/usercontext"

const layout = ({ children }: { children: react.reactnode }) => {
  const user = { name: 'natnael', age: 23, id: 'lsjd234' }
  return (
    <usercontext.provider value={user}>
      {children}
    </usercontext.provider>
  )
}

export default layout

provider
'use client'
import { createContext } from "react";

type UserData = {
  name: string,
  age: number,
  id: string
}

export const UserContext = createContext<UserData>({ name: '', age: 0, id: '' });


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
 */


//useRef
/*
"use client";

import { useRef } from "react";

const page = () => {
  const InputRef = useRef(null);
  const handleFocus = () => {
    InputRef.current?.focus();
    InputRef.current.style.border = '2px solid blue';
  }

  return (
    <div className="flex flex-col">
      <input ref={InputRef} />
      <button onClick={handleFocus}>focus on input</button>
    </div>
  )
}

export default page
 */

//useMemo
/*
import { useMemo } from "react"

const users = [
  { id: "64a1b", name: "Natnael", email: "nat@dev.com", role: "admin", status: "active", age: 23 },
  { id: "72b3c", name: "Alice", email: "alice@test.com", role: "user", status: "active", age: 28 },
  { id: "12d4e", name: "Bob", email: "bob@company.org", role: "user", status: "inactive", age: 34 },
  { id: "88f9g", name: "Charlie", email: "charlie@web.dev", role: "moderator", status: "active", age: 21 },
  { id: "33h2j", name: "Diana", email: "diana@ui.com", role: "user", status: "active", age: 29 },
  { id: "55k8l", name: "Evan", email: "evan@node.js", role: "admin", status: "inactive", age: 40 },
  { id: "99m1n", name: "Fiona", email: "fiona@react.io", role: "user", status: "active", age: 24 },
  { id: "22p5q", name: "George", email: "george@sql.com", role: "user", status: "active", age: 31 },
  { id: "44r7s", name: "Hannah", email: "hannah@next.js", role: "moderator", status: "active", age: 26 },
  { id: "66t9u", name: "Ian", email: "ian@express.com", role: "user", status: "active", age: 27 }
];

const page = () => {
  const activeUsers = useMemo(() => {
    console.log('calculating cound');
    return users.filter(u => u.status === 'active').length
  }, [users])

  return (
    <div>Active Users: {activeUsers}</div>
  )
}

export default page
 */
