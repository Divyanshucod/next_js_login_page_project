'use client'
import React from "react"
export default function UserProfile({params}:any){
    const { id } = React.use(params)
    return (
        <div className="flex flex-col items-center justify-center py-2 h-screen">
            <h1>Profile</h1>
            <p className="text-4xl">Profile page {id}</p>
        </div>
    )
}