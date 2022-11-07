import { deleteDeparment, deleteUsers, editDepartment, listAllDepartments, listAllUsers, editUsers, editInfoUser } from "./api.js"
import { creatListDepartments, creatListUsers } from "./creat.js"


function creatOptions(companies, id){
    let option = document.createElement("option")
    option.value = `${id}`
    option.innerHTML = `${companies}`

    return option
}

function renderDepartments(arr, tokenAdmin, http){
    arr.forEach(element =>{
        creatListDepartments(element.name, element.description, element.companies.name, element.uuid, tokenAdmin, http)
    })
}

function renderUsers(arr, tokenAdmin, http, arrDepartments){
    arr.forEach(element =>{
        console.log(element)
        if(element.username !== "ADMIN"){
            creatListUsers(element.username, element.professional_level, element.department_uuid, element.uuid, tokenAdmin, http, arrDepartments)
        }
    })
}

function modalCreatDepartment(){
    const divWrapp = document.querySelector(".modal-wrapper")

    let divContent = document.createElement("div")
    divContent.classList.add("box-creat-departments", "relative", "flex", "flex-column")

    let buttonClose = document.createElement("button")
    buttonClose.classList.add("button-close", "absolute")
    buttonClose.innerHTML = `<i class="fa fa-xmark"></i>`

    buttonClose.addEventListener("click", (e)=>{
        divContent.remove()
        divWrapp.classList.add("d-none")
    })

    let titleModal = document.createElement("h2")
    titleModal.classList.add("title-modal")
    titleModal.innerText = "Criar Departamento"

    let formModal = document.createElement("form")
    formModal.classList.add("form-modal", "flex", "flex-column")
    formModal.insertAdjacentHTML("beforeend", `
    <input id="department" class="input-register" type="text" name="name" placeholder="Nome do departamento" required="true">
    <input id="description" class="input-register" type="text" name="description" placeholder="Descrição" required="true">
    <select class="input-register" title="selectCompanies" name="companies" id="companies" required="true">
        <option value="">Selecionar empresa
    </option>
    </select>
    <button class="button-creat-department">Criar o departamento</button>
    `)

    divContent.append(buttonClose, titleModal, formModal)
    divWrapp.append(divContent)
}

function modalDeleteDerpartment(id, tokenAdmin, department, http){
    const divWrapp = document.querySelector(".modal-wrapper")
    const ulList = document.querySelector(".departments-ulList")

    let divContent = document.createElement("div")
    divContent.classList.add("box-delete-departments", "relative", "flex", "flex-column", "align-center", "justify-center")

    let buttonClose = document.createElement("button")
    buttonClose.classList.add("button-close", "absolute")
    buttonClose.innerHTML = `<i class="fa fa-xmark"></i>`

    buttonClose.addEventListener("click", (e)=>{
        divContent.remove()
        divWrapp.classList.add("d-none")
    })

    let titleDelete = document.createElement("h2")
    titleDelete.classList.add("title-delete-depertments")
    titleDelete.innerText = `Realmente deseja deletar o departamento ${department} e demetir seus funcionários?`

    let buttonDelete = document.createElement("button")
    buttonDelete.classList.add("button-delete-department")
    buttonDelete.innerHTML = "Confirmar"
    buttonDelete.addEventListener("click", async (button)=>{
        button.preventDefault()

        const departmentDelete = deleteDeparment(
            http.deleteDepartment, id, tokenAdmin
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

    divContent.append(buttonClose, titleDelete, buttonDelete)
    divWrapp.append(divContent)
}

function modalEditDepartment(id, tokenAdmin, description, http){
    const divWrapp = document.querySelector(".modal-wrapper")
    const ulList = document.querySelector(".departments-ulList")

    let divContent = document.createElement("div")
    divContent.classList.add("box-edit-departments", "relative", "flex", "flex-column", "align-center", "justify-center")

    let buttonClose = document.createElement("button")
    buttonClose.classList.add("button-close", "absolute")
    buttonClose.innerHTML = `<i class="fa fa-xmark"></i>`

    buttonClose.addEventListener("click", (e)=>{
        divContent.remove()
        divWrapp.classList.add("d-none")
    })

    let titleModal = document.createElement("h2")
    titleModal.classList.add("title-modal")
    titleModal.innerText = "Editar Departamento"

    let formModal = document.createElement("form")
    formModal.classList.add("form-modal", "flex", "flex-column")
    
    let textArea = document.createElement("textarea")
    textArea.classList.add("textearea-modal")
    textArea.setAttribute("placeholder", "Digite a descrição aqui...")
    textArea.innerHTML = `${description}`

    let buttonEdit = document.createElement("button")
    buttonEdit.classList.add("button-creat-department")
    buttonEdit.innerHTML = "Salvar alterações"
    buttonEdit.addEventListener("click", (e)=>{
        e.preventDefault()

        const departmentEdit = editDepartment(
            http.editDepartment, id, tokenAdmin, textArea.value
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
           }, 600)

    })

    formModal.append(textArea, buttonEdit)
    divContent.append(buttonClose, titleModal, formModal)
    divWrapp.append(divContent)
}

function modalDeleteUsers(name, id, tokenAdmin, http){
    const divWrapp = document.querySelector(".modal-wrapper")
    const ulList = document.querySelector(".users-ulList")
    let divContent = document.createElement("div")
    divContent.classList.add("box-delete-users", "relative", "flex", "flex-column", "align-center", "justify-center")

    let buttonClose = document.createElement("button")
    buttonClose.classList.add("button-close", "absolute")
    buttonClose.innerHTML = `<i class="fa fa-xmark"></i>`

    buttonClose.addEventListener("click", (e)=>{
        divContent.remove()
        divWrapp.classList.add("d-none")
    })

    let titleDelete = document.createElement("h2")
    titleDelete.classList.add("title-delete-users")
    titleDelete.innerText = `Realmente deseja remover o usuário ${name}?`

    let buttonDelete = document.createElement("button")
    buttonDelete.classList.add("button-delete-users")
    buttonDelete.innerHTML = "Deletar"
    buttonDelete.addEventListener("click", async (e)=>{
        e.preventDefault()

        const usersDelete = await deleteUsers(
            http.deleteUsers, id, tokenAdmin
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

            const allUsers = await listAllUsers(
                http.allUsers, tokenAdmin
            )
            renderUsers(allUsers, tokenAdmin, http, allDepartments)
           }, 600)
    })

    divContent.append(buttonClose, titleDelete, buttonDelete)
    divWrapp.append(divContent)
}

function modalEditUsers(http, id, tokenAdmin){
    const divWrapp = document.querySelector(".modal-wrapper")
    const ulList = document.querySelector(".users-ulList")

    let divContent = document.createElement("div")
    divContent.classList.add("box-edit-users", "relative", "flex", "flex-column")

    let buttonClose = document.createElement("button")
    buttonClose.classList.add("button-close", "absolute")
    buttonClose.innerHTML = `<i class="fa fa-xmark"></i>`

    buttonClose.addEventListener("click", (e)=>{
        divContent.remove()
        divWrapp.classList.add("d-none")
    })

    let titleModal = document.createElement("h2")
    titleModal.classList.add("title-modal")
    titleModal.innerText = "Editar Usuário"

    let formModal = document.createElement("form")
    formModal.classList.add("form-modal", "flex", "flex-column")
    formModal.insertAdjacentHTML("beforeend", `
    <select class="input-register" title="selectCompanies" name="selectModality" id="selectModality" required="true">
        <option value="">Selecionar modalidade de trabalho
    </option>
    <option value="presencial">Presencial</option>
    <option value="home office">Home office</option>
    </select>

    <select class="input-register" title="selectCompanies" name="selectProNivel" id="selectProNivel" required="true">
        <option value="">Selecionar nível profissional
    </option>
    <option value="estágio">Estágio</option>
    <option value="júnior">Junior</option>
    <option value="pleno">Pleno</option>
    <option value="sênior">Sênior</option>
    </select>
    `)

    let buttonEdit = document.createElement("button")
    buttonEdit.classList.add("button-edit-users")
    buttonEdit.innerHTML = "Editar"

    formModal.append(buttonEdit)
    divContent.append(buttonClose, titleModal, formModal)
    divWrapp.append(divContent)

    const selectModality = document.querySelector("#selectModality")
    const selectNivel = document.querySelector("#selectProNivel")
    buttonEdit.addEventListener("click", async (e)=>{
        e.preventDefault()
        
        const usersEdit = await editUsers(
            http.editUsers, id, tokenAdmin, selectModality.value, selectNivel.value
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

            const allUsers = await listAllUsers(
                http.allUsers, tokenAdmin
            )
            renderUsers(allUsers, tokenAdmin, http, allDepartments)
           }, 600)

    })
}

function modalOptionsDepartments(id, tokenAdmin, http, department, company, description){
    const divWrapp = document.querySelector(".modal-wrapper")

    let divContent = document.createElement("div")
    divContent.classList.add("box-options-department", "relative", "flex", "flex-column")

    let buttonClose = document.createElement("button")
    buttonClose.classList.add("button-close", "absolute")
    buttonClose.innerHTML = `<i class="fa fa-xmark"></i>`

    buttonClose.addEventListener("click", (e)=>{
        divContent.remove()
        divWrapp.classList.add("d-none")
    })

    let titleModal = document.createElement("h2")
    titleModal.classList.add("title-modal")
    titleModal.innerText = `${department}`

    let divDescription = document.createElement("div")
    divDescription.classList.add("box-departments-options", "flex", "justify-between")
    divDescription.insertAdjacentHTML("beforeend", `
    <div class="box-description-options flex flex-column">
    <h3 class="title-description-options">${description}</h3>
    <span class="span-description-options">${company}</span>
    </div>

    <div class="box-select-options flex flex-column ">
    <select class="input-options" title="selectUsers" name="selectUsers" id="selectUsers" required="true">
        <option value="">Selecionar usuário
    </option>
    </select>

    <button class="button-options">Contratar</button>
    </div>
    `)

    let ulListOptions = document.createElement("li")
    ulListOptions.classList.add("ulList-options", "flex")

    divContent.append(buttonClose, titleModal, divDescription, ulListOptions)
    divWrapp.append(divContent)

}

function creatOptionsModal(name, id){
    let option = document.createElement("option")
    option.value = `${id}`
    option.innerHTML = `${name}`

    return option
}

function creatLiOptions(name, levelPro, uuid, company, departmentId){

    let liList = {
        name: `${name}`,
        levelPro: `${levelPro}`,
        company: `${company}`,
        uuid: `${uuid}`
    }
    
    return liList

}

function creatModalInfoUser(){
    const divWrapp = document.querySelector(".modal-wrapper")

    let divContent = document.createElement("div")
    divContent.classList.add("box-creat-info", "relative", "flex", "flex-column")

    let buttonClose = document.createElement("button")
    buttonClose.classList.add("button-close", "absolute")
    buttonClose.innerHTML = `<i class="fa fa-xmark"></i>`

    buttonClose.addEventListener("click", (e)=>{
        divContent.remove()
        divWrapp.classList.add("d-none")
    })

    let titleModal = document.createElement("h2")
    titleModal.classList.add("title-modal")
    titleModal.innerText = "Editar Perfil"

    let formModal = document.createElement("form")
    formModal.classList.add("form-modal", "flex", "flex-column")
    formModal.insertAdjacentHTML("beforeend", `
    <input id="username" class="input-register" type="text" name="name" placeholder="Seu nome" required="true">
    <input id="useremail" class="input-register" type="email" name="email" placeholder="seu e-mail" required="true">
    <input id="userpassword" class="input-register" type="password" name="password" placeholder="Sua senha" required="true">
    `)

    let buttonEdit = document.createElement("button")
    buttonEdit.classList.add("button-edit-perfil")
    buttonEdit.innerHTML = "Editar perfil"

    formModal.append(buttonEdit)
    divContent.append(buttonClose, titleModal, formModal)
    divWrapp.append(divContent)

}


export {
    modalCreatDepartment,
    creatOptions,
    modalDeleteDerpartment,
    modalEditDepartment,
    modalDeleteUsers,
    modalEditUsers,
    modalOptionsDepartments,
    creatOptionsModal,
    creatLiOptions,
    creatModalInfoUser
}