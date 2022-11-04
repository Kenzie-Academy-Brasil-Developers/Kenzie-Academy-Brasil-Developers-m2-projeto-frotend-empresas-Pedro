import { openBuger } from "../../scripts/hamburger.js";
import { https } from "../../scripts/https.js";
import { Main } from "../login/load.js";

function location(){

    const buttonHome = document.querySelector(".button-white")
    buttonHome.addEventListener("click", ()=>{
        setTimeout(function(){
            window.location.replace("../home/index.html")
        }, 500)
    })

    const buttonCadastro = document.querySelector(".button-blue")
    buttonCadastro.addEventListener("click", ()=>{
        setTimeout(function(){
            window.location.replace("../register/index.html")
        }, 500)
    })

    const buttonRegister = document.querySelector("#cadastrar")
    buttonRegister.addEventListener("click", (e)=>{
        e.preventDefault()

        setTimeout(function(){
            window.location.replace("../register/index.html")
        }, 500)
    })
}

addEventListener("DOMContentLoaded", (event) =>{
    openBuger()
    location()
    Main(https)
})