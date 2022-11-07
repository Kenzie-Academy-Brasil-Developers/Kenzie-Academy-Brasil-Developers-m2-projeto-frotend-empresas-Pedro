import { https } from "../../scripts/https.js";
import { Main } from "./load.js";
import { showModalCreatDepartment } from "./modal.js";

function location(){
    const buttonLogout = document.querySelector("#logout")
    buttonLogout.addEventListener("click", (e)=>{
        localStorage.removeItem("token")
        setTimeout(function(){
            window.location.replace("../home/index.html")
        }, 500)
    })
}

addEventListener("DOMContentLoaded", (event) =>{
    const localS = localStorage.getItem("token")
    location()
    Main(https, localS)
    showModalCreatDepartment(https, localS)
})