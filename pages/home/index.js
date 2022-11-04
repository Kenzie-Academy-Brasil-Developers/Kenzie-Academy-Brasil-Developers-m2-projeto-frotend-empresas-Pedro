import { openBuger } from "../../scripts/hamburger.js";
import { https } from "../../scripts/https.js";
import { Main } from "./load.js";

function location(){
    const buttonLogin = document.querySelector(".button-white")
    buttonLogin.addEventListener("click", ()=>{
        setTimeout(function(){
            window.location.replace("../login/index.html")
        }, 500)
    })

    const buttonRegister = document.querySelector(".button-blue")
    buttonRegister.addEventListener("click", ()=>{
        setTimeout(function(){
            window.location.replace("../register/index.html")
        }, 500)
    })
}

addEventListener("DOMContentLoaded", (event)=>{
    openBuger()
    location()
    Main(https)
})