import axios from "../axiosInceptor";

interface OAuthResponse {
  code: string;
  jwt: string;
  client: string;
}

export const getToken = async (code: string): Promise<any> => {
  console.log("token service")
  // return Promise.resolve("abc");
  return axios.post(
    `${process.env.REACT_APP_PUNCHH_API}/fetchoauthinfo`,
    {
      grant_type: "authorization_code",
      code: code,
      client_id: "c7f0b80300f53da0f25b52b06c8b9b89afcb47397e8e2c1f3fe9b58200171a41",
      redirect_uri: "https://dpropt.com/login"
    },
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "User-Agent": ""
      },
      }
    );
  };