import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._isLoading = false
        makeAutoObservable(this)
    }

    setIsAuth(status) {
        this._isAuth = status
    }
    setIsLoading(status) {
        this._isLoading = status
    }

    get isAuth() {
        return this._isAuth
    }
    get isLoading() {
        return this._isLoading
    }
}