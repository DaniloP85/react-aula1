import api from "../Common/api";

const getPersons = (prodID: string) => api.get("/persons/getPersons/" + prodID);
// const getPersonsPost = (data: any) => api.post("/persons/getPersons", data);
const getAllPersons = (data: string) => api.get("/persons/?" + data);
const addPersons = (data: any) => api.post("/persons/person", data);

export default {
  getPersons,
  getAllPersons,
  addPersons
  // getPersonsPost,
};