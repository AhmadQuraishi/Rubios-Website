const INITIAL_STATE = {
  authorizationcode: null,
  authtoken: '99aUK4SLSvQwZkmCeM8kSgp6uCPR2KNz',
  basketid: null,
  contactnumber: '15055555555',
  emailaddress: 'ron@example.com',
  expiresin: null,
  firstname: 'Ron',
  lastname: 'Idaho',
  provider: 'punchh',
  providertoken:
    'ede0074cdd8df2f60ff81037cae9358ca9cdf9030c1698d5d3709b65456ce2c1',
  provideruserid: 'JckRvf5eQoHPFNb8-Uhm',
  refreshtoken: null,
};

const TokensReducer = (state = INITIAL_STATE, action: any) => {
  return state;
};

export default TokensReducer;
