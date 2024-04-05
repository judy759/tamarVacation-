import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../Slices/UserSlice";
import { updateVacation } from "../Slices/VacationSlice";

const DispatchData = (path, data) => {
  const dispatch = useDispatch();
  switch (path) {
    case 'vacation': {
      dispatch(updateVacation({ data }));
      break;
    }
    case 'users': {
      dispatch(updateUser({ data }));
      break;
    }
    default:
      break;
  }
};

export const get = async (path) => {
  try {
    const res = await axios.get({url:`http://localhost:4444/api/${path}`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "authorization":'Bearer '+localStorage.getItem("token")
    }
  });
    if (res.data) {
      DispatchData(path, res.data);
    }
  } catch (error) {
      console.log(error);
  }
};

export const updateComplete = async (id) => {
  try {
    await axios.put({url:`http://localhost:8525/api/task/completed/${id}`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "authorization":'Bearer '+localStorage.getItem("token")
    }});
  } catch (error) {
    console.error(error);
  }
};

export const update = async (url, body) => {
  try {
    await axios.put({url:url, body:body, headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "authorization":'Bearer '+localStorage.getItem("token")
    }});
    // obj.refetch()
  } catch (error) {
    console.error(error);
  }
};

export const deleteItem = async (url, body, obj) => {
  try {
    await axios.delete({url:url, body:body, headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "authorization":'Bearer '+localStorage.getItem("token")
    }});
    // obj.refetch()
  } catch (error) {
    console.error(error);
  }
};

export const create = async (url, body) => {
  try {
    await axios.post({url:url, body:body, headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "authorization":'Bearer '+localStorage.getItem("token")
    }});
    // obj.refetch()
      console.log("create");
  } catch (error) {
    console.error(error);
  }
};
