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
        name: null,
      },
    };
    this._todayCalories = {};
    this._isSelectedProduct = {};
    this._categories = [];
    this._authInput = null;
    makeAutoObservable(this);
  }

  setIsAuth(status) {
    this._isAuth = status;
  }
  setIsLoading(status) {
    this._isLoading = status;
  }
  setProfile(profile) {
    this._profile = profile;
  }

  setIsSelectedProduct(obj) {
    this._isSelectedProduct = obj;
  }

  setTodayCalories(obj) {
    this._todayCalories = obj;
  }

  setCategories(arr) {
    this._categories = arr;
  }

  setAuthInput(str) {
    this._authInput = str;
  }

  get isAuth() {
    return this._isAuth;
  }
  get isLoading() {
    return this._isLoading;
  }

  get profile() {
    return this._profile;
  }

  get isSelectedProduct() {
    return this._isSelectedProduct;
  }

  get todayCalories() {
    return this._todayCalories;
  }

  get categories() {
    return this._categories;
  }

  get authInput() {
    return this._authInput;
  }
}
