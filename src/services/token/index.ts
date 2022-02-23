import axios from "../axiosInceptor";

interface OAuthResponse {
  code: string;
  jwt: string;
  client: string;
}

export const getToken = async (code: string): Promise<any> => {
  console.log("token service")
  return axios.post(
    `${process.env.REACT_APP_PUNCHH_API}/fetchoauthinfo`,
    {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "https://dpropt.com/login"
    },
    {
      headers: {
          "Content-Type": "application/json"
        }
      }
    );
  };
