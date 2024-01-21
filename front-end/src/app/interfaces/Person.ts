export interface addPerson
{
    name: string,
    surname: string,
    birthDate: string,
    email: string,
    cpf: string,
    rg: string,
    addresses: address[],
    contacts: contat[],
    userId:string | null
  }


 

  export interface address{
    street: string,
    number: number,
    cep: string,
    complemento: string,
    city: string,
    state: string
  }


  export interface contat{
    name: string,
    contactNumber: string,
    type: string
  }