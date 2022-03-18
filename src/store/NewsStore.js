import { makeAutoObservable } from "mobx";

export default class NewsStore {
  constructor() {
    this._news = []
    this._count = 0
    makeAutoObservable(this);
  }

  setNews(array) {
    this._news = array
  }
  setCount(int) {
    this._count = int
  }

  get news() {
    return this._news
  }
  get count() {
    return this._count
  }
}
