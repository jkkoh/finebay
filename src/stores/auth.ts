import {defineStore} from "pinia"
import {useApi, useApiPrivate} from "../composables/useApi"

export interface User{
  id: number,
  name: string,
  email: string
}

export interface State{
  name: User,
  accessToken: string,
  authReady: boolean
}

export interface LoginData {
  email: string,
  password: string
}

export interface RegisterData {
  email: string,
  name: string,
  password: string,
  password_confirm: string,
  postCode: string,
  address: string,
  address1: string,
  address2: string,
  address3: string,
  account_type : number,
}

export interface KakaoRegisterData {
  email: string,
  name: string,
  password: string,
  account_type : number,
}


export const useAuthStore = defineStore('auth', {
  state: (): State => {
    return {
      name: {} as User,
      accessToken: "" as string,
      authReady: false as boolean
    }
  },

  getters: {
    userDetail: (state: State) => state.name,
    isAuthenticated: (state: State) => state.accessToken ? true : false
  },

  actions:{
    async attempt(){
      try {
        await this.refresh()
        await this.getUser()
      } catch (error) {
        return
      }
      return
    },


    async login(payload: LoginData){
      try {
        const {data} = await useApi().post(`/api/auth/login`, payload);
        this.accessToken = data.access_token
        await this.getUser()
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async register(payload: RegisterData){
      try {
        const {data} = await useApi().post(`/api/auth/register`, payload);
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },
    async kakaoRegister(payload: KakaoRegisterData){
      try {
        const {data} = await useApi().post(`/api/auth/register`, payload);
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },
    async getUser(){
      try {
        const {data} = await useApiPrivate().get(`/api/auth/user`);
        this.name = data
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },
    async logout(){
      try {
        const {data} = await useApiPrivate().post(`/api/auth/logout`);
        this.accessToken = ""
        this.name = {} as User
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },
    async refresh(){
      try {
        const {data} = await useApi().post(`/api/auth/refresh`);
        this.accessToken = data.access_token
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    }
  }
})