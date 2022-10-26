
export interface User {
  id?: number;
  name?: string;
  email?: string;
  userName?: string;
  password?: string;
  cccd?: string;
  literacy?: string;
  phoneNumber?: string;
  homeTown?: string;
  avatarName?: string;
  salary?: number;
  gender?: string;
  position?: string;
  leader?: boolean;
  birthDay?: Date;
  delete?: boolean;
  role?
  active?: boolean;
  unit?: Unit;
}

export interface Unit {
  id?:number,
  name?: string,
  status?: boolean
}

export interface UsserDTO{
name?: string,
  email?: string,
  literacy?: string,
  position?: string,
  salary?:number,
  birthDay?: Date,
  unit?:Unit
}



