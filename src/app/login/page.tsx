"use client"
import {useEffect}  from "react"
import Link from "next/link"
import React from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
export default function login(){
    const router = useRouter()
    const [user,setUser] = React.useState({
        email:'',
        password:'',
    })
    const [buttonDisabled,setButtonDisabled] = React.useState(true)
    const [loading,setLoading] = React.useState(false)
    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0){
         setButtonDisabled(false)
        }
 },[user])
    const onLogin = async ()=>{
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login',user)
            console.log(response);
            
            router.push('/profile')
        } catch (error:any) {
            toast(error.message)
        }finally{
            setLoading(false)
        }
    }
    return (
        <div className="flex justify-center max-h-100 w-100 flex-col items-center bg-slate-700 p-10">
           <h1 className="text-white">{loading?"processing":"Login"}</h1>
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
            <button onClick={onLogin} className="p-1 rounded-sm border border-slate-200 m-5" disabled={buttonDisabled?true:false}>Login</button>
            <Link href='/signUp'>Visit Signup</Link>
        </div>
    )
}