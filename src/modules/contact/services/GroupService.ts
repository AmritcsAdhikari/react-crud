import axios from 'axios';
import { IContact } from '../models/IContact';
import { IGroup } from '../models/IGroup';

export class GroupService{
    private static serverUrl:string = process.env.REACT_APP_CONTACT_SERVER_URL? process.env.REACT_APP_CONTACT_SERVER_URL:""

    //get all groups
    public static getAllGroups():Promise<{data:IGroup[]}>{

            let dataURL = `${this.serverUrl}/groups`;
            return axios.get(dataURL);
        
    }

    //get a group
    public static getGroup(contact:IContact):Promise<{data:IGroup}>{
        let {groupId} = contact;
        
            let dataURL = `${this.serverUrl}/groups/${groupId}`;
            return axios.get(dataURL);
        
    }
}