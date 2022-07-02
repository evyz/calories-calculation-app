import { makeAutoObservable } from "mobx"

export default class AdminStore {
  constructor() {
    this._products = []
    this._productsCount = 0
    makeAutoObservable(this)
  }

  setProducts(arr) {
    this._products = arr
  }

  setProductsCount(num) {
    this._productsCount = num
  }

  get products() {
    return this._products
  }

  get productsCount() {
    return this._productsCount
  }
}