import axios from "../axiosInceptor";


export const getToken = async (code: string): Promise<any> => {
  console.log("token service")
  // return Promise.resolve("abc");
  return axios.post(
    `${process.env.REACT_APP_PUNCHH_API}/fetchoauthinfo`,
    {
      grant_type: "authorization_code",
      code: code,
      client_id: process.env.REACT_APP_PUNCHH_CLIENT_ID,
      redirect_uri: "https://dpropt.com/login"
    },
    );
  };