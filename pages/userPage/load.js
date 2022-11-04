import { allEmployees, employeesDepartment, infoUser } from "../../scripts/api.js"
import { creatEmployeesDepartment, creatHeaderCompany, creatUserInfo } from "../../scripts/creat.js"

function renderUserInfo(obj, http, token){
    creatUserInfo(obj.username, obj.email, obj.professional_level, obj.kind_of_work, http, token)
}

function renderHeaderCompany(obj){
    creatHeaderCompany(obj.name, obj.departments[0].description)
}

function renderEmployeesDepartment(obj){
    obj[0].users.forEach(element =>{
        creatEmployeesDepartment(element.username, element.professional_level)
    })
}

async function Main(http, token){
    const user = await infoUser(
        http.userInfo, token
    )
    renderUserInfo(user, http, token)
        
    if(user.department_uuid == null){
        const divContentCompany = document.querySelector(".box-content-company")

        let titleUnemployed = document.createElement("h2")
        titleUnemployed.classList.add("title-unemployed")
        titleUnemployed.innerHTML = "Você ainda não foi contratado"
        divContentCompany.append(titleUnemployed)

    } else {

        const departmentEmployees = await employeesDepartment(
            http.departmentEmployees, token
        )
        renderHeaderCompany(departmentEmployees)
        
        const employees = await allEmployees(
            http.allEmployees, token
        )
        renderEmployeesDepartment(employees)


    }
}

export {
    Main
}