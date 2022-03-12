import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._isLoading = false;
    this._profile = {
      avatar: {
        color: null,
        ico: null,
      },
      role: null,
      profile: {
        createdAt: null,
        email: null,
        id: null,
        name: null
      }
    }
    makeAutoObservable(this);
  }

  setIsAuth(status) {
    this._isAuth = status;
  }
  setIsLoading(status) {
    this._isLoading = status;
  }
  setProfile(profile) {
    this._profile = profile
  }

  get isAuth() {
    return this._isAuth;
  }
  get isLoading() {
    return this._isLoading;
  }

  get profile() {
    return this._profile
  }
}
