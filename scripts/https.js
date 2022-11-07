let https = {
    getCompanies: "http://localhost:6278/companies",
    getCompaniesSector: "http://localhost:6278/companies/",
    getAllSector: "http://localhost:6278/sectors",
    creatUser: "http://localhost:6278/auth/register",
    userLogin: "http://localhost:6278/auth/login",
    typeofUser: "http://localhost:6278/auth/validate_user",
    getAllDepartments: "http://localhost:6278/departments",
    getCompaniesDeparments: "http://localhost:6278/departments/",
    creatDepartment: "http://localhost:6278/departments",
    deleteDepartment: "http://localhost:6278/departments/",
    editDepartment: "http://localhost:6278/departments/",
    allUsers: "http://localhost:6278/users",
    deleteUsers: "http://localhost:6278/admin/delete_user/",
    editUsers: "http://localhost:6278/admin/update_user/",
    usersOutOfWork: "http://localhost:6278/admin/out_of_work",
    hideEmployees: "http://localhost:6278/departments/hire/",
    dismissEmployees: "http://localhost:6278/departments/dismiss/",
    userInfo: "http://localhost:6278/users/profile",
    allEmployees: "http://localhost:6278/users/departments/coworkers",
    departmentEmployees: "http://localhost:6278/users/departments",
    updateUser: "http://localhost:6278/users"
}

export {
    https
}