import axios from "../axiosInceptor";

interface OAuthResponse {
  code: string;
  jwt: string;
  client: string;
}

export const getToken = async (code: string): Promise<any> => {
  return axios.post(
    `${process.env.REACT_APP_PUNCHH_API}/fetchoauthinfo`,
    {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env['REACT_APP_PUNCHH_API ']
    },
    {
      headers: {
        "accept": "application/json",
          "Content-Type": "application/json"
        }
      }
    );
  };
