import { openBuger } from "../../scripts/hamburger.js";
import { https } from "../../scripts/https.js";
import { Main } from "./load.js";

function location(){
    const buttonHome = document.querySelector(".button-white")
    buttonHome.addEventListener("click", ()=>{
        setTimeout(function(){
            window.location.replace("../home/index.html")
        }, 500)
    })

    const buttonLogin = document.querySelector(".button-blue")
    buttonLogin.addEventListener("click", ()=>{
        setTimeout(function(){
            window.location.replace("../login/index.html")
        }, 500)
    })

    const buttonReturn = document.querySelector("#home")
    buttonReturn.addEventListener("click", (e)=>{
        e.preventDefault()
        setTimeout(function(){
            window.location.replace("../home/index.html")
        }, 500)
    })
}

addEventListener("DOMContentLoaded", (event) =>{
    openBuger()
    location()
    Main(https)
})