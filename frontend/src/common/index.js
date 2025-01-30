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
  logout_user: {
    url: `${backendDomin}/api/user-Logout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomin}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/api/update-user`,
    method: "put",
  },
  uplodeProduct: {
    url: `${backendDomin}/api/uplode-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomin}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomin}/api/update-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomin}/api/get-CategoryProduct`,
    method: "get",
  },
  addSlider: {
    url: `${backendDomin}/api/slider-add`,
    method: "post",
  },
  getSlider: {
    url: `${backendDomin}/api/slider-get`,
    method: "get",
  },
  getAllSlider: {
    url: `${backendDomin}/api/get-all-slider`,
    method: "get",
  },
};

export default summaryApi;
