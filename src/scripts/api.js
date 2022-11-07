async function listAllCompanies(urlApi){
    try{
        const data = await fetch(urlApi)
        const dataJSON = await data.json()
        return dataJSON

    } catch(error){
        return errorApi
    }
}

async function listAllSectors(urlApi){
    try{
        const data = await fetch(urlApi)
        const dataJSON = await data.json()
        return dataJSON

    } catch(error){
        return error
    }
}

async function ListSpecificCompanies(urlApi){
    try{
        const data = await fetch(urlApi)
        const dataJSON = data.json()
        return dataJSON

    } catch(error){
        return errorApi
    }
}

async function creatUser(urlApi, name, password, email, levelPro){
    try{
        const data = {
            username: `${name}`,
            password: `${password}`,
            email: `${email}`,
            professional_level: `${levelPro}`,
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
        }

        const responseJSON = await fetch(`${urlApi}`, options)
        const response = await responseJSON.json()
        return response

    } catch(error){
        const objError = {
            error: `${error.join()}`
        }
        return objError
    }
}

async function userLogin(urlApi, email, password){
    try{
        const data = {
            email: `${email}`,
            password: `${password}`
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
        }

        const responseJSON = await fetch(`${urlApi}`, options)
        const response = await responseJSON.json()
        return response

    } catch(error){
        return error
    }
}


async function verificUser(urlApi, token) {

    try{
        const dataJSON = await fetch(`${urlApi}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token.token}`
            },
        })

        const data= await dataJSON.json()
        return data

    } catch(error){
        return error
    }
}

async function listAllDepartments(urlApi, tokenAdmin){
    try{
        const dataJSON = await fetch(`${urlApi}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${tokenAdmin}`
            }
        })

        const data = await dataJSON.json()
        return data


    } catch(error){
        return error
    }
}

async function listCompaniesDepartment(urlApi, id, tokenAdmin){

    try{
        const dataJSON = await fetch(`${urlApi}`+`${id}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${tokenAdmin}`,
            },
        })

        const data = await dataJSON.json()
        return data


    } catch(error){
        return error
    }
}

async function creatDepartments(urlApi, name, description, id, tokenAdmin){

    try{
        const data = {
            name: `${name}`,
            description: `${description}`,
            company_uuid: `${id}`
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${tokenAdmin}`,
            },
            body: JSON.stringify(data)
        }

        const responseJSON = await fetch(`${urlApi}`, options)
        const response = await responseJSON.json()
        return response

    } catch(error){
        return error
    }
}

async function deleteDeparment(urlApi, id, tokenAdmin){

    try{
        const dataJSON = await fetch(`${urlApi}`+`${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${tokenAdmin}`
            }
        })

        const data = await dataJSON.json()
        return data

    } catch (error){
        return error
    }
}

async function editDepartment(urlApi, id, tokenAdmin, description){

    try{
        const data = {
            description: `${description}`
        }


        const option =  {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${tokenAdmin}`,
            },
            body: JSON.stringify(data)
        }

        const responseJSON = await fetch(`${urlApi}`+`${id}`, option)
        const response = await responseJSON.json()
        return response

    } catch(error){
        return error
    }
}

async function listAllUsers(urlApi, tokenAdmin){
    try{
        const dataJSON = await fetch(`${urlApi}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${tokenAdmin}`
            }
        })

        const data = await dataJSON.json()
        return data


    } catch(error){
        return error
    }
}

async function deleteUsers(urlApi, id, tokenAdmin){

    try{
        const dataJSON = await fetch(`${urlApi}`+`${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${tokenAdmin}`,
            },
        })

    } catch(error){
        return error
    }
}

async function editUsers(urlApi, id, tokenAdmin, kindWork, proLevel){

    try{
        const data = {
            kind_of_work: `${kindWork}`,
            professional_level: `${proLevel}`
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${tokenAdmin}`,
            },
            body: JSON.stringify(data)
        }

        const responseJSON = await fetch(`${urlApi}`+`${id}`, options)
        const response = await responseJSON.json()
        return response

    } catch(error){

    }
}

async function listAllUsersOutOfWork(urlApi, tokenAdmin){

    try{
        const dataJSON = await fetch(`${urlApi}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${tokenAdmin}`
            }
        })

        const data = await dataJSON.json()
        return data

    } catch(error){

    }
}

async function hideEmployees(urlApi, tokenAdmin, userId, departmentId){

    try{
        const data = {
            user_uuid: `${userId}`,
            department_uuid: `${departmentId}`
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${tokenAdmin}`
            },
            body: JSON.stringify(data)
        }

        const responseJSON = await fetch(`${urlApi}`, options)
        const response = await responseJSON.json()
        return response


    } catch(error){
        return error
    }
}

 async function dismissEmployees(urlApi, tokenAdmin, userId){
    
    try{
        const dataJSON = await fetch(`${urlApi}`+`${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${tokenAdmin}`,
            },
        })

        const data = await dataJSON.json()
        return data

    } catch(error){
        return error
    }
 }

 async function infoUser(urlApi, token){
    try{
        const dataJSON = await fetch(`${urlApi}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        const data = await dataJSON.json()
        return data

    } catch(error){
        return error
    }
 }

 async function allEmployees(urlApi, token) {

    try{
        const dataJSON = await fetch(`${urlApi}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        const data = await dataJSON.json()
        return data

    } catch (error){
        return error
    }
 }

 async function employeesDepartment(urlApi, token){

    try{
        const dataJSON = await fetch(`${urlApi}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        const data = await dataJSON.json()
        return data

    } catch(error){
        return error
    }
 }

 async function editInfoUser(urlApi, token, username, password, email) {

    try{
        const data = {
            username: `${username}`,
            password: `${password}`,
            email: `${email}`
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        }
        
        const responseJSON = await fetch(`${urlApi}`, options)
        const response = await responseJSON.json()
        return response

    } catch(error){
        return error
    }
 }

export {
    listAllCompanies,
    listAllSectors,
    ListSpecificCompanies,
    creatUser,
    userLogin,
    verificUser,
    listAllDepartments,
    listCompaniesDepartment,
    creatDepartments,
    deleteDeparment,
    editDepartment,
    listAllUsers,
    deleteUsers,
    editUsers,
    listAllUsersOutOfWork,
    hideEmployees,
    dismissEmployees,
    infoUser,
    allEmployees,
    employeesDepartment,
    editInfoUser,
}