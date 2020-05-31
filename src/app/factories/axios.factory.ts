import axios, { AxiosInstance } from 'axios'

export class AxiosFactory {
  public static make (baseUrl: string): AxiosInstance {
    return axios.create({ baseURL: baseUrl })
  }
}
