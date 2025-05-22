import axios from "axios"

    async function createAccount({ email, password, userName }) {//applying wraper on database methods to avoid dependency on database only OR avoiding vendor locking situation 
        try {
            const newUser=await axios.post('/api/users/register',{
                email,
                password,
                userName,
            })
            return newUser
        }
        catch (error) {
             console.log("Error in creating new user in frontend /database/js",error)
        }
    }

    async function LoginDB({ email, psswrd }) {
        try {
            return await axios.post('/api/users/login',{
                email,
                psswrd
            })
        }
        catch (error) {
            console.log("Error in creating logging user in frontend /database/js",error)
        }
    }


    
   

    async function getcurrentuser() {
        try {
            return await axios.get('/api/users/current-user',
                  {
                     withCredentials: true,
                  })
        }
        catch (error) {
            console.log("database serive :: getCurrentUser :: error", error);
        }
        return null;//no active user.
    }
    


    async function LogoutDB() {
       try {
            return await axios.post('/api/users/logout',
                  {
                     withCredentials: true,
                  })
        }
        catch (error) {
            console.log("database service :: logout :: error", error);
        }
        return null;//no active user.
    }
//implement refreshaccessstoken,changepassword,updateaccount.
    export {createAccount,LoginDB,getcurrentuser,LogoutDB}