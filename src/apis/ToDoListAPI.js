import axios from "axios";
import { TO_DO_LIST_API_BASE_URL } from "../constants/constants";

class ToDoListAPI {
  static getToDoList() {
    return axios.get(TO_DO_LIST_API_BASE_URL);
  }

  static updateToDoTask(id, data) {
    return axios.put(TO_DO_LIST_API_BASE_URL + "/" + id, data);
  }

  static addToDOTask(data) {
    return axios.post(TO_DO_LIST_API_BASE_URL, data);
  }

  static removeToDOTask(id, data) {
    return axios.delete(TO_DO_LIST_API_BASE_URL + "/" + id, data);
  }
}

export default ToDoListAPI;
