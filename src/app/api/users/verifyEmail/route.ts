import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import {NextRequest , NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'
connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {token} =reqBody
        console.log(token);
        //assumption ki token aagaya
        const user = await User.findOne({verifyToken : token,verifyTokenExpiry:{$gt:Date.now()}})
        if(!user){
            return NextResponse.json({error:"invalid token details"},{status:500})
        }
        console.log(user);
        user.isVerified=true;
        user.verifiedToken=undefined;
        user.verifyTokenExpiry=undefined;
        
        await user.save();
        return NextResponse.json({message:"Email verified successfully",success:true},{status:500})

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:510})
    }
}