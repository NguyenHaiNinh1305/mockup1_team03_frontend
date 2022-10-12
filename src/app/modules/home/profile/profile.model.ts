export interface User {
  id?:number
  name?:string;
  email?:string;
  userName?:string;
  phoneNumber?:string;
  homeTown?:string;
  avatarName?:string;
  gender?:string;
  birthDay?:Date;
  cccd?:string;
  unit?:Unit;
  salary?:number;
  position?:string

}

export interface Unit {
  id?:number;
  name?:string;
  status?:number

}
