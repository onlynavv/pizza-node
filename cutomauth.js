import jwt from "jsonwebtoken"

export const auth = (request, response, next) =>{
    try{
        const token = request.header("x-auth-token")
        jwt.verify(token, process.env.SECRET_KEY)
        next()
    }catch(err){
        response.status(401).send({error:err.message})
    }
}

// export const authAndVerifyAdmin = (request, response, next)=>{
//     auth(request, response, ()=>{
//         if(request.user.isAdmin){
//             next()
//         }else{
//             response.status(401).send({msg:"you are not allowed"})
//         }
//     })
// }