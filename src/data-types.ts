export interface signupInt {
  name: string,
  password: string,
  email:string
}
export interface userSignup {
  name: string,
  password: string,
  email:string
}


export interface loginInt {
  email: string,
  password:string
}
export interface userLogin {
  email: string,
  password:string
}

export interface productI {
  id:number,
  name: string,
  category: string,
  color: string,
  description: string,
  price: number,
  image: string,
  quantity: undefined | number,
  productId: undefined | number
}
export interface cart {
  id: number | undefined,
  name: string,
  category: string,
  color: string,
  description: string,
  price: number,
  image: string,
  quantity: undefined | number,
  productId: number,
  userId:number

}

export interface priceSummary {
  price: number,
  discount: number,
  tax: number,
  delivery: number,
  total: number
}

export interface order {
  id:number|undefined,
  email: string,
  address: string,
  contact: string,
  totalPrice: number,
  userId:number
}
