const backendDomin = "http://localhost:3212";

const summaryApi = {
  signUp: {
    url: `${backendDomin}/api/signup`,
    method: "post",
  },
  signin: {
    url: `${backendDomin}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomin}/api/user-Datails`,
    method: "get",
  },
};

export default summaryApi;
