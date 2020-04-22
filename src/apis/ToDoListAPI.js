import axios from "axios";
import { TO_DO_LIST_API_BASE_URL } from "../constants/constants";

class ToDoListAPI {
  static getToDoList() {
    return axios.get(TO_DO_LIST_API_BASE_URL);
  }
}

export default ToDoListAPI;
