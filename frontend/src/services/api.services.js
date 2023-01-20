import axios from "axios";
const getHeader = () => {
  return {
    headers: { "Content-Type": "application/json" },
  };
};

const getUrl = () => {
  return "http://localhost:5080";
};

const apiService = {
  getUser() {

  },
  login(data) {
    return axios.post(getUrl() + "/authentication/login", data, { withCredentials: true }, getHeader());
  },
  register(data) {
    return axios.post(
      getUrl() + "/authentication/register/form",
      data,
      getHeader()
    );
  },

  logout() {
    return axios.post(getUrl() + "/authentication/logout",{},{ withCredentials: true }, getHeader());
  },

  usersession() {
    return axios.get(getUrl() + "/authentication/usersession", { withCredentials: true }, getHeader())
  },

  usersearch(userData) {
    return axios.get(getUrl() + `/chat/usersearch?search=${userData}`, { withCredentials: true }, getHeader())
  },

  profileupdate(data) {
    return axios.post(getUrl() + "/authentication/update-profile", data, { withCredentials: true }, getHeader())
  },

  createuserchat(data){
    return axios.post(getUrl() + "/chat/access-chat", data, { withCredentials: true }, getHeader())
  }
};

export default apiService;
