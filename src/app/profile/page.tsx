"use client"
import axios from "axios";

export default function Profile(){
    const logOut = async ()=>{
        try {
            const response = await axios.get('/api/users/logout');
            console.log(response.data);

        } catch (error:any) {
            console.log(error.message);
            
        }
    }
    return (
        <div className="flex flex-col items-center justify-center py-2 h-screen">
            <h1>Profile</h1>
            <button onClick={logOut}>Log Out</button>
        </div>
    )
}