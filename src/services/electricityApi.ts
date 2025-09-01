import axios from "axios";

const API_URL = "https://api.electricitymap.org/v3/carbon-intensity/latest?zone=NG";

const electricityApi = axios.create({
    baseURL: API_URL,
    headers: {
      "auth-token": import.meta.env.VITE_ELECTRICITYMAP_API_KEY as string,
    },
  });

export const fetchElectricity = async(zone: string) => {
    const response = await electricityApi.get(`/carbon-intensity/latest?zone=${zone}`)
    console.log(response.data)
    return response.data
}

export default electricityApi;