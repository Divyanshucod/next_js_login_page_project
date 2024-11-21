"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
export default function signUp(){
    const router = useRouter()
    const [user,setUser] = React.useState({
        email:'',
        password:'',
        username:''
    })
    const [buttonDisabled,setButtonDisabled] = React.useState(true)
    const [loading,setLoading] = React.useState(false)
    useEffect(()=>{
           if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false)
           }
    },[user])
    const onSignUp = async ()=>{
          try {
            setLoading(true)
            let response = axios.post('/api/users/signUp',user)
            console.log(response);
            router.push('/login')
            
          } catch (error:any) {
            console.log(error);
            
            toast(error.message)
          }finally{
            setLoading(false)
          }
    }
    return (
        <div className="flex justify-center max-h-100 w-100 flex-col items-center bg-slate-700 p-10">
           <h1 className="text-white">Sign Up</h1>
           <label htmlFor="username" className="text-white">Username</label>
           <input
              type="text"
              id="username"
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({...user,username:e.target.value})}
              className="outline-white"
            />
            <label htmlFor="email" className="text-white">email</label>
           <input
              type="text"
              id="email"
              placeholder="email"
              value={user.email}
              onChange={(e) => setUser({...user,email:e.target.value})}
              className="outline-white"
            />

            <label htmlFor="password" className="text-white">password</label>
           <input
              type="password"
              id="password"
              placeholder="password"
              value={user.password}
              onChange={(e) => setUser({...user,password:e.target.value})}
              className="outline-white"
            />
            <button onClick={onSignUp} className="p-1 rounded-sm border border-slate-200 m-5" disabled={buttonDisabled?true:false}>Sign Up</button>
            <Link href='/login'>Visit Login</Link>
        </div>
    )
}