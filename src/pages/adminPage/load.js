import { listAllDepartments, listAllCompanies, listCompaniesDepartment, listAllUsers } from "../../scripts/api.js"
import { creatListDepartments, creatListUsers, creatSelectCompanies } from "../../scripts/creat.js"

function renderDepartments(arr, tokenAdmin, http){
    arr.forEach(element =>{
        creatListDepartments(element.name, element.description, element.companies.name, element.uuid, tokenAdmin, http)
    })
}

function renderCompanies(arr){
    arr.forEach(element =>{
        creatSelectCompanies(element.name, element.uuid)
    })
}

function renderUsers(arr, tokenAdmin, http, arrDepartments){
    arr.forEach(element =>{
        if(element.username !== "ADMIN"){
            creatListUsers(element.username, element.professional_level, element.department_uuid, element.uuid, tokenAdmin, http, arrDepartments)
        }
    })
}

async function Main(http, token){

    const allDepartments = await listAllDepartments(
        http.getAllDepartments, token
    )
    renderDepartments(allDepartments, token, http)

    const allCompanies = await listAllCompanies(
        `${http.getCompanies}`
    )
    renderCompanies(allCompanies)

    const selectCompanies = document.querySelector("#selectCompanies")
    const ulList = document.querySelector(".departments-ulList")
    selectCompanies.addEventListener("change", async (e)=>{
        let arrOptions = [...e.target.childNodes]
        let result = arrOptions.find(element => element.value == e.target.value)
        ulList.innerHTML = ""

        const companiesDepartment = await listCompaniesDepartment(
            http.getCompaniesDeparments, result.id, token
        )
        renderDepartments(companiesDepartment)
    })

    const allUsers = await listAllUsers(
        http.allUsers, token
    )
    renderUsers(allUsers, token, http, allDepartments)

} 

export {
    Main
}