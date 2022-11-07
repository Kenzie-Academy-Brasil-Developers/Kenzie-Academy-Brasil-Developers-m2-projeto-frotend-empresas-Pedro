import { dismissEmployees, editInfoUser, hideEmployees, listAllUsers, listAllUsersOutOfWork } from "./api.js"
import { modalDeleteDerpartment, modalDeleteUsers, modalOptionsDepartments, modalEditDepartment, modalEditUsers, creatOptionsModal, creatLiOptions, creatModalInfoUser } from "./creatModal.js"

function creatListCompanies(name, time, sector){
    const ulList = document.querySelector(".ulListCompanies")

    let liCompanies = document.createElement("li")
    liCompanies.classList.add("liCompanies", "flex", "flex-column", "justify-between")
    liCompanies.insertAdjacentHTML("beforeend", `
    <h2 class="title-2">${name}</h2>
    <div class="box-companies-description flex flex-column">
     <p class="text-companies-description">${time}</p>
        <span class="span-setor">${sector}</span>
    </div>
    `)

    ulList.append(liCompanies)
}

function creatListSectors(sector){
    const selectHome = document.querySelector(".select-home")

    let optionSelect = document.createElement("option")
    optionSelect.classList.add("option-select")
    optionSelect.value = `${sector}`
    optionSelect.innerHTML = `${sector}`

    selectHome.append(optionSelect)
}

async function renderUsersOutOfWork(http, tokenAdmin){
    let result = []
    const outOfWork = await listAllUsersOutOfWork(
        http.usersOutOfWork, tokenAdmin
    )
    outOfWork.forEach(element =>{
        result.push(creatOptionsModal(element.username, element.uuid))
    })
    return result
}

async function renderAllUsers(http, tokenAdmin, company, id){
    let result = []
    const allUsers = await listAllUsers(
        http.allUsers, tokenAdmin
    )
    allUsers.forEach(element =>{
        if(element.department_uuid == id){
         result.push(creatLiOptions(element.username, element.professional_level, element.uuid, company, id))
        }
    })
    return result
}

async function ulListCreatLi(http, tokenAdmin, company, id, department, description){
    const divOptions = document.querySelector(".box-options-department")
    const ulList = document.querySelector(".ulList-options")
    await (await renderAllUsers(http, tokenAdmin, company, id)).forEach(element =>{
        let liList = document.createElement("li")
        liList.classList.add("liList-options", "flex", "flex-column")

        let titleLi = document.createElement("h3")
        titleLi.classList.add("title-options-modal")
        titleLi.innerText = `${element.name}`

        let spanLevelPro = document.createElement("span")
        spanLevelPro.classList.add("span-options-modal")
        spanLevelPro.innerHTML = `${element.levelPro}`

        let spanCompany = document.createElement("span")
        spanCompany.classList.add("span-options-modal")
        spanCompany.innerHTML = `${element.company}`

        let buttonDismiss = document.createElement("button")
        buttonDismiss.classList.add("button-off-users")
        buttonDismiss.innerHTML = "Desligar"
        buttonDismiss.addEventListener("click", async (e)=>{

            const dismiss = await dismissEmployees(
                http.dismissEmployees, tokenAdmin, element.uuid
            )  
        
            divOptions.remove()
            modalOptionsDepartments(id, tokenAdmin, http, department, company, description)

            const selectUsers = document.querySelector("#selectUsers")
            await (await renderUsersOutOfWork(http, tokenAdmin)).forEach(element => {
                selectUsers.insertAdjacentHTML("beforeend", `
                <option value="${element.value}">${element.innerHTML}</option>
                `)
            })

            ulListCreatLi(http, tokenAdmin, company, id, department, description)
        })

        liList.append(titleLi, spanLevelPro, spanCompany, buttonDismiss)
        ulList.append(liList)
    })
}

function creatListDepartments(department, description, company, id, tokenAdmin, http){
    const divWrapp = document.querySelector(".modal-wrapper")
    const ulList = document.querySelector(".departments-ulList")

    let lilist = document.createElement("li")
    lilist.classList.add("departments-lilist", "flex", "flex-column")
    lilist.insertAdjacentHTML("afterbegin", `
    <div class="box-departments-description flex flex-column">
        <h3 class="title-departments-names">${department}</h3>
        <span class="span-department">${description}</span>
        <span class="span-department">${company}</span>
    </div>
    `)

    let divDepartmentsIcons = document.createElement("div")
    divDepartmentsIcons.classList.add("box-departments-icons", "flex", "justify-center", "align-center")

    let spanEyes = document.createElement("span")
    spanEyes.innerHTML = `<i class="fa fa-eye icon-departments"></i>`
    spanEyes.addEventListener("click",async (e)=>{

        divWrapp.classList.remove("d-none")
        modalOptionsDepartments(id, tokenAdmin, http, department, company, description)

        const selectUsers = document.querySelector("#selectUsers")
        await (await renderUsersOutOfWork(http, tokenAdmin)).forEach(element => {
            selectUsers.insertAdjacentHTML("beforeend", `
            <option value="${element.value}">${element.innerHTML}</option>
            `)
        })

        ulListCreatLi(http, tokenAdmin, company, id, department, description)

        // ------------------------------------------------------------------
        const buttonEngage = document.querySelector(".button-options")
        const divOptions = document.querySelector(".box-options-department")
        buttonEngage.addEventListener("click", async (e)=>{
            e.preventDefault()
            const selectUsersBefore = document.querySelector("#selectUsers")

            const hide = await hideEmployees(
                http.hideEmployees, tokenAdmin, selectUsersBefore.value, id
            )

            divOptions.remove()

            modalOptionsDepartments(id, tokenAdmin, http, department, company, description)

            const selectUsers = document.querySelector("#selectUsers")
            await (await renderUsersOutOfWork(http, tokenAdmin)).forEach(element => {
                selectUsers.insertAdjacentHTML("beforeend", `
                <option value="${element.value}">${element.innerHTML}</option>
                `)
            })
            ulListCreatLi(http, tokenAdmin, company, id, department, description)
        })

    })

    let spanPen = document.createElement("span")
    spanPen.innerHTML = `<i class="fa fa-pen"></i>`
    spanPen.addEventListener("click", (e)=>{
        divWrapp.classList.remove("d-none")
        modalEditDepartment(id, tokenAdmin, description, http)
    })

    let spanTrash = document.createElement("span")
    spanTrash.innerHTML = `<i class="fa fa-trash icon-departments"></i>`
    spanTrash.addEventListener("click", (e)=>{
        divWrapp.classList.remove("d-none")
        modalDeleteDerpartment(id, tokenAdmin, department, http)
    })

    divDepartmentsIcons.append(spanEyes, spanPen, spanTrash)
    lilist.append(divDepartmentsIcons)
    ulList.append(lilist)
}

function creatSelectCompanies(companies, id){
    const selectCompanies = document.querySelector("#selectCompanies")

    let option = document.createElement("option")
    option.value = `${companies}`.toLowerCase()
    option.innerHTML = `${companies}`
    option.id = `${id}`

    selectCompanies.append(option)
}

function creatListUsers(name, proLevel, company, id, tokenAdmin, http, arrDepartments){
    const divWrapp = document.querySelector(".modal-wrapper")
    const ulList = document.querySelector(".users-ulList")
    
    if(company == null){
        company = "Desempregado"
    } else {
        let result = arrDepartments.find(element => element.uuid == company)
        company = result.companies.name
    }

    let lilist = document.createElement("li")
    lilist.classList.add("departments-lilist", "flex", "flex-column")
    lilist.insertAdjacentHTML("afterbegin", `
    <div class="box-departments-description flex flex-column">
        <h3 class="title-departments-names">${name}</h3>
        <span class="span-department">${proLevel}</span>
        <span class="span-department">${company}</span>
    </div>
    `)

    let divDepartmentsIcons = document.createElement("div")
    divDepartmentsIcons.classList.add("box-departments-icons", "flex", "justify-center", "align-center")

    let spanPen = document.createElement("span")
    spanPen.innerHTML = `<i class="fa fa-pen color-pen"></i>`
    spanPen.addEventListener("click", (e)=>{
        divWrapp.classList.remove("d-none")
        modalEditUsers(http, id, tokenAdmin)
    })

    let spanTrash = document.createElement("span")
    spanTrash.innerHTML = `<i class="fa fa-trash icon-departments"></i>`
    spanTrash.addEventListener("click", (e)=>{
        divWrapp.classList.remove("d-none")
        modalDeleteUsers(name, id, tokenAdmin, http)
    })

    divDepartmentsIcons.append(spanPen, spanTrash)
    lilist.append(divDepartmentsIcons)
    ulList.append(lilist)
   
}

function creatUserInfo(name, email, proNivel, kindWork, http, token){
    const divWrapp = document.querySelector(".modal-wrapper ")
    const divUserInfo = document.querySelector(".box-user-header")

    let divUserDescription = document.createElement("div")
    divUserDescription.classList.add("box-user-description", "flex", "flex-column")
    divUserDescription.insertAdjacentHTML("beforeend", `
    <h2 class="title-username">${name}</h2>
    <span class="span-email-users">Email: ${email}</span>
    `)

    let spanProNivel = document.createElement("span")
    spanProNivel.classList.add("span-title-users")
    spanProNivel.innerHTML = `${proNivel}`

    let spanKindWork = document.createElement("span")
    spanKindWork.classList.add("span-title-users")
    spanKindWork.innerHTML = `${kindWork}`

    let spanPen = document.createElement("span")
    spanPen.classList.add("span-pen-users")
    spanPen.innerHTML = `<i class="fa fa-pen"></i>`
    spanPen.addEventListener("click", (e)=>{
        divWrapp.classList.remove("d-none")
        creatModalInfoUser()

        const inputName = document.querySelector("#username")
        const inputPassword = document.querySelector("#userpassword")
        const inputEmail = document.querySelector("#useremail")
        const buttonEdit = document.querySelector(".button-edit-perfil")
        buttonEdit.addEventListener("click", async (e)=>{
            const edit = await editInfoUser(
                http.updateUser, token, inputName.value, inputPassword.value, inputEmail.value
            )
            console.log(edit)
        })
    })

    divUserInfo.append(divUserDescription, spanProNivel, spanKindWork, spanPen)
}

function creatHeaderCompany(name, deparment){
    const divContentCompany = document.querySelector(".box-content-company")

    divContentCompany.insertAdjacentHTML("afterbegin", `
    <div class="box-company-header flex align-center justify-center">
    <h2 class="title-company">
    ${name} - ${deparment}
    </h2>
    </div>
    `)
}

function creatEmployeesDepartment(name, proNivel){
    const ulList = document.querySelector(".ulList-users")

    ulList.insertAdjacentHTML("afterbegin", `
    <li class="liList-users flex flex-column">
        <span class="span-title-name">${name}</span>
        <span class="span-nivelPro">${proNivel}</span>
    </li>
    `)

}

export{
    creatListCompanies,
    creatListSectors,
    creatListDepartments,
    creatSelectCompanies,
    creatListUsers,
    creatUserInfo,
    creatHeaderCompany,
    creatEmployeesDepartment
}