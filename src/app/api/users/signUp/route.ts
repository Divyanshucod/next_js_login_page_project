import connect from "@/dbConfig/dbConfig"
import User from '@/models/userModel'
import { NextRequest,NextResponse } from "next/server"

import  bcryptjs from 'bcryptjs'


connect()

export async function POST(request:NextRequest){
    try{
        const requestBody = await request.json()
        
        const {username,email,password} = requestBody

        // check user already exist
        const user = await User.findOne({email:email})
        if(user){
            return NextResponse.json({message:"User already exits"},{status:200})
        }

        // hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)
        
        const new_user = new User({
            username,
            email,
            password:hashedPassword
        })
        
        await new_user.save()

        return NextResponse.json({
            message:"user created successfully",
            success:true,
            user:new_user
        })
    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}