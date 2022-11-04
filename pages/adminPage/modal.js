import { listAllCompanies, creatDepartments, listAllDepartments, deleteDeparment } from "../../scripts/api.js"
import { creatListDepartments } from "../../scripts/creat.js"
import { modalCreatDepartment, creatOptions } from "../../scripts/creatModal.js"


function renderCompanies(arr){
    let result = []
    arr.forEach(element =>{
     result.push(creatOptions(element.name, element.uuid))
    })
    return result
}

function renderDepartments(arr, tokenAdmin, http){
    arr.forEach(element =>{
        creatListDepartments(element.name, element.description, element.companies.name, element.uuid, tokenAdmin, http)
    })
}

async function showModalCreatDepartment(http, tokenAdmin){

    const allCompanies = await listAllCompanies(
        `${http.getCompanies}`
    )
// ---------------------------------------------
    const divWrapp = document.querySelector(".modal-wrapper")
    const buttonCreat = document.querySelector(".button-creat")
    buttonCreat.addEventListener("click", (e)=>{

        divWrapp.classList.remove("d-none")
        modalCreatDepartment()
        const inputDepartment = document.querySelector("#department")
        const inputDescription = document.querySelector("#description")
        const ulList = document.querySelector(".departments-ulList")

        const selectModal = document.querySelector("#companies")
        renderCompanies(allCompanies).forEach(element =>{
            selectModal.insertAdjacentHTML("beforeend", `
            <option value="${element.value}">${element.innerHTML}</option>
            `)
        })

    const buttonCreat = document.querySelector(".button-creat-department")
    const divContent = document.querySelector(".box-creat-departments")
    buttonCreat.addEventListener("click", async (button)=>{
        button.preventDefault()

        const departments = await creatDepartments(
        http.creatDepartment, inputDepartment.value, inputDescription.value, selectModal.value, tokenAdmin
        )

        setTimeout(function(){
            ulList.innerHTML = ""
            divContent.remove()
            divWrapp.classList.add("d-none")
        }, 500)

        setTimeout(async function(){
            const allDepartments = await listAllDepartments(
                http.getAllDepartments, tokenAdmin
                )
                renderDepartments(allDepartments, tokenAdmin, http)
           }, 1000)
        })
    })
}



export {
    showModalCreatDepartment
}