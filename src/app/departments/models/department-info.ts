
import { DepartmentContact } from './department-contact';
export interface IDepartmentInfo{
    id: number;
    name: String;
    email: string|number;
    telephone: number;
    APIkey: string |number;
}
export class DepartmentInfo {
    id: number;
    name:String;
    email: string| number;
    telephone: number;
    APIkey: string |number;
    constructor(name?:string,email?:string|number,telephone?:number,APIkey?: string |number){
        this.name = name;
        this.email = email;
        this.telephone = telephone;
        this.APIkey = APIkey;
 
    }
}