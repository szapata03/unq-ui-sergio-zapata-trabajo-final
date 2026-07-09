import Axios from 'axios';

const url = 'https://word-api-hmlg.vercel.app'

export async function validateWord(word) {
  const { data } = await Axios.get(`${url}/api/validate`, {
    params: { word },
  })
  return data.exists === true
}