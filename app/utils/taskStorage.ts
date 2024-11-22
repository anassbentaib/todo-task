import { Task } from "../types";

export const getTasks = () => {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
};

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
