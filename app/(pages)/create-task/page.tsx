"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { getTasks, saveTasks } from "@/app/utils/taskStorage";
import { useEffect } from "react";
import { Task } from "@/app/types";

type TaskFormInputs = {
  title: string;
  description: string;
};

const CreateTask = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormInputs>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (taskId) {
      const tasks = getTasks();
      const taskToEdit = tasks.find((task: Task) => task.id === Number(taskId));
      if (taskToEdit) {
        reset({
          title: taskToEdit.title,
          description: taskToEdit.description,
        });
      }
    }
  }, [taskId, reset]);

  const onSubmit: SubmitHandler<TaskFormInputs> = (data) => {
    try {
      const existingTasks = getTasks();
      if (taskId) {
        const updatedTasks = existingTasks.map((task: Task) =>
          task.id === Number(taskId) ? { ...task, ...data } : task
        );
        saveTasks(updatedTasks);
      } else {
        const newTask = { id: Date.now(), ...data };
        const updatedTasks = [...existingTasks, newTask];
        saveTasks(updatedTasks);
      }
      reset();
      router.push("/");
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full  bg-white max-w-3xl mx-auto dark:bg-gray-800 p-6 shadow-md rounded-lg"
      >
        <h1 className="text-2xl font-bold text-center mb-6 dark:text-white">
          {taskId ? "Edit Task" : "Create Task"}
        </h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium dark:text-white">
              Title
            </label>
            <input
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              })}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Enter task title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-white">
              Description
            </label>
            <textarea
              {...register("description")}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Enter task description (optional)"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {taskId ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
