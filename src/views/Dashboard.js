import AddTask from "./AddTask";
import TasksContainer from "./TasksContainer";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseUrl = "https://drab-teal-moose-tutu.cyclic.app";
const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState("");
  const [users, setUsers] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("auth");
    if (isAuthenticated === "true") {
      setIsAuth(true);
    }
  }, []);
  useEffect(() => {
    getTasks();
    getUser();
  }, []);
  const getUser = async () => {
    // const response = await fetch("/login").then((r) => r.json());
    // console.log(response);
    // return response;

    let userDetails = JSON.parse(localStorage.getItem("user"));
    // console.log(userDetails);
    setUsers(userDetails);
  };
  const getTasks = async () => {
    // const ApiUrl = "https://jsonplaceholder.typicode.com/todos";
    const ApiUrl = `${baseUrl}/gettasks`;
    const res = await axios.get(ApiUrl);
    setTasks(res.data);
  };
  const addTasks = async (taskName) => {
    const id = uuidv4();
    // const ApiUrl = "https://jsonplaceholder.typicode.com/todos";
    const ApiUrl = `${baseUrl}/addtask`;
    const taskData = {
      id: id,
      title: taskName,
      completed: false,
    };
    const res = axios.post(ApiUrl, taskData);
    // console.log(res);
    if (res.status === 201) {
      setTasks([...tasks, taskData]);
    }
  };
  // console.log("tasks", tasks);
  const completeTask = async (id) => {
    // console.log("id", id);
    const ApiUrl = `${baseUrl}/update`;

    const taskData = {
      id: id,
      completed: true,
    };
    const res = await axios.post(ApiUrl, taskData);
    if (res.status === 200) {
      const taskData = tasks.map((task) => {
        if (task.taskid === id) {
          return { ...task, completed: true };
        }
        return task;
      });
      setTasks(taskData);
    }

    // console.log("taskData", taskData);
  };
  const undoTask = async (id) => {
    // console.log("id", id);
    const ApiUrl = `${baseUrl}/update`;

    const taskData = {
      id: id,
      completed: false,
    };
    const res = await axios.post(ApiUrl, taskData);

    if (res.status === 200) {
      const taskData = tasks.map((task) => {
        if (task.taskid === id) {
          return { ...task, completed: false };
        }
        return task;
      });
      setTasks(taskData);
    }
    // console.log("taskData", taskData);
  };
  const deleteTask = async (id) => {
    const ApiUrl = `${baseUrl}/delete`;
    axios.post(`${ApiUrl}/${id}`);
    const taskData = tasks.filter((task) => task.taskid !== id);
    setTasks(taskData);

    // console.log(taskData);
  };
  const updateTask = async (id, taskName) => {
    const ApiUrl = `${baseUrl}/update`;
    const taskData = {
      id: id,
      title: taskName,
      completed: false,
    };
    const res = await axios.post(ApiUrl, taskData);
    if (res.status === 200) {
      const taskData = tasks.map((task) => {
        if (task.taskid === id) {
          console.log(id);
          return { ...task, title: taskName };
        }
        return task;
      });
      // console.log(taskData);
      console.log("id", id);
      setTasks(taskData);
    }
  };
  const logout = async () => {
    const ApiUrl = `${baseUrl}/logout`;

    const res = await axios.post(ApiUrl);
    if (res.status === 200) {
      localStorage.setItem("auth", false);
      localStorage.clear();
      return navigate("/");
    }
  };
  if (!isAuth) {
    return navigate("/");
  }

  return (
    <div className="container">
      <p>Welcome {users.name}</p>
      <button onClick={logout}>Logout</button>
      <h1>My ToDo List</h1>
      <AddTask updateTask={addTasks} />
      <TasksContainer
        tasksList={tasks && tasks.filter((task) => !task.completed)}
        type="pending"
        primaryButtonClick={completeTask}
        updateTask={updateTask}
      />
      <TasksContainer
        type="completed"
        tasksList={tasks && tasks.filter((task) => task.completed)}
        primaryButtonClick={undoTask}
        secondaryButtonClick={deleteTask}
      />
      {/* <p>{users}</p> */}
    </div>
  );
};
export default Dashboard;
