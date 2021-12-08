import { client } from "./index.js";
import bcrypt from "bcrypt"

 async function getPizza() {
    return await client.db("practice").collection("pizzas").find({}).toArray();
}
 async function postPizza(data) {
    return await client.db("practice").collection("pizzas").insertMany(data);
}

async function createUser(data) {
    return await client.db("practice").collection("users").insertOne(data);
}

async function getByUserName(username){
    return await client.db("practice").collection("users").findOne({username:username})
}

async function genPassword(password){
    const NO_OF_ROUNDS = 10
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS)
    console.log(salt)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(hashedPassword)
    return hashedPassword
}

export {getPizza, postPizza, createUser, genPassword,getByUserName}