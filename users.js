import express from "express"
const router = express.Router()
import {authAndVerifyUser} from "./cutomauth.js"
import {updatePassword} from "./helper.js"

// password update
router.route("/:id")
.put(authAndVerifyUser,async (request, response)=>{
    const {password} = request.body
    const {userId} = request.params.id

    if(password.length < 8){
        response.status(400).send({msg: "password must be longer"})
        return
    }

    if(!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)){
		response.status(400).send({msg: "pattern does not match"})
		return
	}

    const hashedPassword = await genPassword(password)
    const result = await updatePassword({userId, password:hashedPassword})
    response.send(result)
})