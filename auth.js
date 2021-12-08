import express from "express"
import { genPassword, createUser,getByUserName } from "./helper.js"
const router = express.Router()
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

router.route("/signup")
.get((request, response)=>{
    response.send("hai from auth router")
})

router.route("/signup")
.post(async(request, response)=>{
    const {username, password} = request.body
    const userFromDB = await getByUserName(username)
    console.log(userFromDB)

    if(userFromDB){
        response.status(400).send({msg:"username already exists"})
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
    const result = await createUser({username, password:hashedPassword})
    response.send(result)
})

router.route("/login")
.post(async (request, response)=>{
    const {username, password} = request.body
    const userFromDB = await getByUserName(username)

    if(!userFromDB){
        response.status(401).send({msg:"incorrect username"})
        return
    }

    const storedPassword = userFromDB.password

    const isPasswordMatch = await bcrypt.compare(password, storedPassword)

    if(isPasswordMatch){
        const token = jwt.sign({id:userFromDB._id}, process.env.SECRET_KEY)
        response.send({msg:"successfull login"})
    }else{
        response.status(401).send({msg: "incorrect password"})
    }
})

export const authRouter = router