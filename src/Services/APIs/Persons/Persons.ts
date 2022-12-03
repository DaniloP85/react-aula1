import api from "../Common/api";

const getPersons = (prodID: string) => api.get("/persons/getPersons/" + prodID);
// const getPersonsPost = (data: any) => api.post("/persons/getPersons", data);
const getAllPersons = (data: string) => api.get("/persons/?" + data);

export default {
  getPersons,
  getAllPersons
  // getPersonsPost,
};