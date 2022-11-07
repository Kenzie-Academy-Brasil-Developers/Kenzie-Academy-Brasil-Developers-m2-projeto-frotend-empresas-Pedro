import { listAllCompanies, listAllSectors ,ListSpecificCompanies } from "../../scripts/api.js"
import { creatListCompanies, creatListSectors } from "../../scripts/creat.js"

function renderCompanies(arr){
    arr.forEach(element =>{
        creatListCompanies(element.name, element.opening_hours, element.sectors.description)
    })
}

function renderSectors(arr){
    arr.forEach(element =>{
        creatListSectors(element.description)
    })
}

async function Main(http){

    const allCompanies = await listAllCompanies(
        `${http.getCompanies}`
    )
    renderCompanies(allCompanies)

    const allSectors = await listAllSectors(
        `${http.getAllSector}`
    )
    renderSectors(allSectors)

    const selectHome = document.querySelector(".select-home")
    const ulList = document.querySelector(".ulListCompanies")
    selectHome.addEventListener("change", async (e)=>{
        ulList.innerHTML = ""

        const specificCompanies = await ListSpecificCompanies(
            `${http.getCompaniesSector}`+`${e.target.value}`
        )
        renderCompanies(specificCompanies)
    })

}

export {
    Main
}