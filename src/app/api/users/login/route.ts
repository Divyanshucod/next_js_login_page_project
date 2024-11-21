
import connect from "@/dbConfig/dbConfig"
import User from '@/models/userModel'
import { NextRequest,NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import  bcryptjs from 'bcryptjs'


connect()

export async function POST(request:NextRequest){
    try{
        const requestBody = await request.json()
        console.log(requestBody);
        
        const {email,password} = requestBody

        // check user already exist
        const user = await User.findOne({email:email})
        if(!user){
            return NextResponse.json({message:"User does not exist"},{status:200})
        }

        // check password
        const validate = await bcryptjs.compare(password,user.password)
        console.log(validate);
        
        if(!validate){
            return NextResponse.json({message:"Password incorrect!"},{status:200})
        }
       // create token data
       const token_data = {
        id: user._id,
        username:user.username,
        email:user.email
       }
       // create token
       const token = await jwt.sign(token_data,process.env.TOKEN_SECRET!,{expiresIn:'1h'})
       const response = NextResponse.json({
        message:"Login Successfull",
        success:true
       })
        response.cookies.set('token',token,{
            httpOnly:true,
        })
        return response;
    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}