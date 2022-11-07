function openBuger (){
    const menuBtn = document.querySelector(".menu-btn")
    const subMenu = document.querySelector(".sub-menu-wrap")
    let menuOpen = false
    menuBtn.addEventListener("click", ()=>{
        if(!menuOpen) {
            menuBtn.classList.add("open")
            menuOpen = true
        } else {
            menuBtn.classList.remove("open")
            menuOpen = false
        }
        subMenu.classList.toggle("open-menu")
    })
}

export {
    openBuger
}