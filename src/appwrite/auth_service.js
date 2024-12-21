import confi from "../confi/confi.js"
import { ID, Account, Client } from "appwrite"

export class authService {
    client = new Client();
    account;//no account created with new as account requires particular client only as argument.
    constructor() {
        this.client//chained method calls.
            .setEndpoint(confi.appwriteurl)
            .setProject(confi.projectid)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {//aplying wraper on appwrite methods to avoid dependency on appwrite only OR avoiding vendor locking situation 
        try {
            const useraccount = await this.account.create(ID.unique(), email, password, name);
            if (useraccount) {
                //if created account then login directly without telling them that now login with your username and password.
                return this.login({ email, password });
            }
            else {
                return useraccount
            }
        }
        catch (error) {
            return error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);//OR  .createEmailSession(email,password);
        }
        catch (error) {
            return error;
        }
    }

    async getcurrentuser() {
        try {
            return await this.account.get();//Get the currently logged in user
        }
        catch (error) {
            console.log("Appwrite serive(by us) :: getCurrentUser :: error", error);
        }
        return null;//no active user.
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        }
        catch (error) {
            console.log("Logout error::", error)
        }
    }
}

const authservice = new authService();
export default authservice  //whenever an user wants authentication it impoerts this single instance object all time for all user.