import { creatUser } from "../../scripts/api.js"
import { ToastError } from "./toast.js"
ToastError()
const inputName = document.querySelector("#name")
const inputPassowrd = document.querySelector("#password")
const inputEmail = document.querySelector("#email")
const selectRegister = document.querySelector("#nivelPro")
let select = ""

function getValueSelect(){
    selectRegister.addEventListener("change", (e)=>{
        select =  e.target.value
    })
}

function inputClear(){
    inputName.value = ""
    inputEmail.value = ""
    inputPassowrd.value = ""
}



async function Main(http){
    getValueSelect()
    // -----------------------------------------------
    const buttonRegister = document.querySelector("#cadastrar")
    buttonRegister.addEventListener("click", async (e)=>{
        e.preventDefault()
        const newUser = await creatUser(
            http.creatUser, inputName.value, inputPassowrd.value, inputEmail.value, select
        )
        inputClear()

        if(newUser.error == "email alread exists!"){
            ToastError()
            const boxWarpp = document.querySelector(".box-main-wrapp")
            boxWarpp.classList.remove("d-none")
            boxWarpp.classList.add("showUp")

            setTimeout(function(){
                boxWarpp.remove()
            }, 4000)
        } else {
            setTimeout(function(){
                window.location.replace("../login/index.html")
            }, 500)

        }

    })
// ----------------------------------------------------
}

export {
    Main
}