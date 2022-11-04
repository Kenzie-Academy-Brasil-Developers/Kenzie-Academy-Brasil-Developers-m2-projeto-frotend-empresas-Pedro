function ToastError(){
    const body = document.querySelector(".main")

    let divWrapp = document.createElement("div")
    divWrapp.classList.add("box-main-wrapp", "flex", "absolute", "align-center", "d-none")
    divWrapp.insertAdjacentHTML("beforeend", `
    <span class="span-icon-error"><i class="fa fa-xmark"></i></span>
    <p class="text-error">Ops! O email que você tentou cadastrar já existe!</p>
    `)

    body.append(divWrapp)
}

export {
    ToastError
}