import { userLogin, verificUser } from "../../scripts/api.js";

async function Main(http){
   
    const inputEmail = document.querySelector("#email")
    const inputPassoword = document.querySelector("#password")
    const buttonLogin = document.querySelector("#login")
    buttonLogin.addEventListener("click", async (e)=>{
        e.preventDefault()

        const userToken = await userLogin(
            http.userLogin, inputEmail.value, inputPassoword.value
        )

        JSON.stringify(localStorage.setItem("token", userToken.token))

        const userType = await verificUser(
            http.typeofUser, userToken
        )

        if(userType.is_admin == true){
            setTimeout(function(){
                window.location.replace("../adminPage/index.html")
            }, 500)
        } else {
            setTimeout(function(){
                window.location.replace("../userPage/index.html")
            }, 500)
        }
       
    })

}

export {
    Main
}