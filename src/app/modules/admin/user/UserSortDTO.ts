export interface USortDTOs{
  name?: string,
  email?: string,
  literacy?: string,
  position?: string,
  salary?:number,
  birthDay?: Date,
  unit?:Unit
  sortByValueUserDTOS?:SortByValueUserDTO[]
}
export interface Unit {
  id?:number,
  name?: string,
  status?: boolean
}

export interface SortByValueUserDTO{
  name?:string,
  type?:string
}
