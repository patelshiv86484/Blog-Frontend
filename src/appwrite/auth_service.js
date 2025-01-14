import confi from "../confi/confi.js"
import { ID, Account, Client } from "appwrite"

export class authService {
    client = new Client();//Client object is the foundation for interacting with the Appwrite server. It establishes the connection and handles communication (making API requests).Connection Management: The Client object manages the underlying HTTP connections to the Appwrite server. Creating multiple Client instances would lead to unnecessary overhead, potentially creating multiple connections and consuming more resources.
    account;//no account created with new as account requires particular client only as argument.
    constructor() {
        this.client//chained method calls.
            .setEndpoint(confi.appwriteurl)
            .setProject(confi.projectid)
        this.account = new Account(this.client)//Account object provides methods for managing user accounts and authentication. It uses the Client to make requests to the Appwrite server.Think of it as the "user management interface" that uses the "connection" provided by the Client
    }

    async createAccount({ email, password, name }) {//applying wraper on appwrite methods to avoid dependency on appwrite only OR avoiding vendor locking situation 
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

    async login({ email, psswrd }) {
        try {
            return await this.account.createEmailPasswordSession(email, psswrd);//User A and User B log's in form different browsers.
        }
        catch (error) {
            return error;
        }
    }

    async getcurrentuser() {
        try {
            return await this.account.get();//Get the currently logged in user.If called in User A's browser, it retrieves User A's information. If called in User B's browser, it retrieves User B's information, because each browser has its own session identifier.
        }
        catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null;//no active user.
    }

    async logout() {
        try {
            await this.account.deleteSessions()//If called in User A's browser, it deletes User A's session, logging them out. User B is unaffected.
        }
        catch (error) {
            console.log("Logout error::", error)
        }
    }
}

const authservice = new authService();
export default authservice //Single Appwrite Client: The Client object in Appwrite is responsible for managing the connection to your Appwrite server. You should only have one Client instance per application. Your singleton ensures this.