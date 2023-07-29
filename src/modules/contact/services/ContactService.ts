import axios from 'axios';
import { IContact } from '../models/IContact';
export class ContactService {
    
    private static serverUrl:string = process.env.REACT_APP_CONTACT_SERVER_URL ? process.env.REACT_APP_CONTACT_SERVER_URL : ""

    //get all contacts
    public static getAllContacts(): Promise<{data: IContact[]}>{
        
            let dataURL = `${this.serverUrl}/contacts`;
            return axios.get(dataURL);
        
    }

    //get a contact
    public static getContact(contactId:string): Promise<{data: IContact}>{
        
            let dataURL = `${this.serverUrl}/contacts/${contactId}`;
            return axios.get(dataURL);
        
    }

    //create a contact
    public static createContact(contact:IContact): Promise<{data: IContact}>{
      
            let dataURL = `${this.serverUrl}/contacts`;
            return axios.post(dataURL,contact);
        
    }

    //update a contact
    public static updateContact(contact:IContact, contactId:string): Promise<{data: IContact}>{

            let dataURL = `${this.serverUrl}/contacts/${contactId}`;
            return axios.put(dataURL,contact);
        
    }

    //delete a contact
    public static deleteContact(contactId:string):Promise<{data: {}}>{
        
            let dataURL = `${this.serverUrl}/contacts/${contactId}`;
            return axios.delete(dataURL);
        
    }
}
