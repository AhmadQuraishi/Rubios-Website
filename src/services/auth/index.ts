import axios from '../axiosInceptor';
interface OAuthResponse {
    code: string;
    jwt: string;
    client: string;
  }
export const getToken = async (code: string): Promise<any> => {
    return axios.post(
      `https://sandbox.punchh.com/oauth/token`,
      {
        grant_type: "authorization_code",
        code: code,
        client_id: process.env.REACT_APP_PUNCHH_CLIENT_ID,
        client_secret: process.env.REACT_APP_PUNCHH_CLIENT_SECRET,
        redirect_uri: window.location.origin + "/login"
      },
      {
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json",
          "Origin": window.location.origin
        }
      }
    );
  };