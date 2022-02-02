import express from "express"
import { genPassword, createAdmin,getByAdminName } from "./helper.js"
const router = express.Router()
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cors from "cors"
import {auth, authAndVerifyAdmin} from "./cutomauth.js"

const app = express()
app.use(cors())

router.route("/signup")
.get((request, response)=>{
    response.send("hai from auth router")
})

router.route("/signup")
.post(async(request, response)=>{
    const {adminname, password, role,email,firstname,lastname} = request.body
    const adminFromDB = await getByAdminName(adminname)
    console.log(adminFromDB)

    if(adminFromDB){
        response.status(400).send({msg:"adminname already exists"})
        return
    }

    if(password.length < 8){
        response.status(400).send({msg: "password must be longer"})
        return
    }

    if(!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)){
		response.status(400).send({msg: "pattern does not match"})
		return
	}

    const hashedPassword = await genPassword(password)
    const result = await createAdmin({adminname, password:hashedPassword, role, email, firstname, lastname})
    if(result.acknowledged === true){
        response.send({msg:"admin created sucessfully"})
    }
    else{
        response.status(400).send({msg:"try again.."})
    }
})

router.route("/login")
.post(async (request, response)=>{
    const {adminname, password} = request.body
    const adminFromDB = await getByAdminName(adminname)

    if(!adminFromDB){
        response.status(401).send({msg:"incorrect credentials"})
        return
    }

    const storedPassword = adminFromDB.password

    const isPasswordMatch = await bcrypt.compare(password, storedPassword)

    if(isPasswordMatch && adminFromDB.role === "admin"){
        const token = jwt.sign({id:adminFromDB._id, role:adminFromDB.role}, process.env.SECRET_KEY,{expiresIn:"1h"})
        response.cookie("token", token, {expiresIn: "1h"})
        response.status(200).send({msg:"successfull login",token:token,adminFromDB})
    }else{
        response.status(401).send({msg: "incorrect credentials"})
    }
})

router.route("/logout")
.post(async (request, response)=>{
    response.clearCookie("token")
    response.status(200).send({msg:"signout successfully"})
})

export const adminAuthRouter = router