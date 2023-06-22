import {defineStore} from "pinia"
import {useApi, useApiPrivate} from "../composables/useApi"
import  axios  from "axios"
import { Auth , Hub } from 'aws-amplify'



export interface User{
  id: number,
  name: string,
  email: string
}

export interface State{
  name: User,
  accessToken: string,
  authReady: boolean,
  awsAccessToken: string,
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

export interface BuyData {
  customerName: string,
  customerEmail: string,
  customerPhoneNumber: string[],
  customerPostCode:string,
  customerAddress:string,
  customerAddress1:string,
  deliveryName:string,
  deliveryPostCode:string,
  deliveryAddress:string,
  deliveryAddress1:string,
  deliveryPhoneNumber:string[],
  productInfo:string[],
  salesInfo:string[],
  priceInfoActualPrice:string[],
  priceInfoDeliveryFee:number,
  priceInfoDiscount:number,
  priceInfoFinalPrice:number,
  paymentInfoType:string,
}

export interface KakaoRegisterData {
  email: string,
  name: string,
  password: string,
  account_type : number,
}

export interface emailCheckData {
  emailUnique: string
}


export const useAuthStore = defineStore('auth', {
  state: (): State => {
    return {
      name: {} as User,
      accessToken: "" as string,
      authReady: false as boolean,
      awsAccessToken: "" as string,
    }
  },

  getters: {
    userDetail: (state: State) => state.name,
    isAuthenticated: (state: State) => state.accessToken ? true : false,
    isKakaoAuthenticated: (state: State) => window.Kakao.Auth.getAccessToken() ? true : false,
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
        const username = payload.email
        const password = payload.password
        const user = await Auth.signIn(username, password)
      } catch (error: Error | any) {
        throw error.message
      }
    },
    async getUserInfo(){
      const Awsuser = await Auth.currentAuthenticatedUser();
      const attributes = await Auth.userAttributes(Awsuser);
      console.log(attributes)
      console.log(attributes[2].Value)
      console.log(typeof(attributes[1]))

      const userInfo = {
        user : attributes[8].Value,
        name: attributes[2].Value
      }
      return userInfo
    },

    async register(payload: RegisterData){
      try {
        const username = payload.email 
        const name = payload.name
        const password = payload.password
        const email = payload.email
        const zoneCode = payload.postCode
        const address = payload.address
        const address1 = payload.address1
        const address2 = payload.address2
        const address3 = payload.address3
        const { user } = await Auth.signUp({
          username,
          password,
          attributes: {
            email,
            'custom:name': `${name}`,
            'custom:zoneCode': `${zoneCode}`,
            'custom:address' : `${address}`,
            'custom:address1' : `${address1}`,
            'custom:address2' : `${address2}`,
            'custom:address3' : `${address3}`,
            'custom:userPoints' : 0,
          },
          autoSignIn: {
            enabled: true,
          }
        })
      } catch (error: Error | any) {
        throw error.message
      }
    },
    async kakaoRegister(payload: KakaoRegisterData){
      try {
        window.Kakao.Auth.login({
          scope: 'account_email, profile_nickname, phone_number, shipping_address, plusfriends, age_range',
          success: function(){
            window.Kakao.API.request({
              url:'/v2/user/me',
              success: function(response: any){
                const Kaccount = response.kakao_account;
                console.log('--------------------')
                console.log(Kaccount);
                console.log('--------------------')

                const userInfo = {
                  email: Kaccount.email,
                  name: Kaccount.profile.nickname,
                  emailUnique: Kaccount.email + '2',
                  password: '',
                  account_type: 2,
                }
                console.log('--------------------')
                console.log(userInfo)
                console.log('--------------------')
              }
            })
          }
        })
        // const {data} = await useApi().post(`/api/auth/register`, userInfo);
        // return data
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
        await Auth.signOut()
      } catch (error: Error | any) {
        console.log('error in sigining out: ', error)
      }
    },
    async kakaoLogout(){
      try {
        return window.Kakao.Auth.logout()
      } catch (error: Error | any){
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