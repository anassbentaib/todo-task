"use client";

import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { getTasks, saveTasks } from "../utils/taskStorage";
import { useRouter } from "next/navigation";
import { FaTrashCan } from "react-icons/fa6";
import ConfirmModal from "../components/ConfirmModal";

type Task = {
  id: number;
  title: string;
  description: string;
};

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const router = useRouter();
  useEffect(() => {
    const storedTasks = getTasks();
    setTasks(storedTasks);
  }, []);
  const openDeleteModal = (taskId: number) => {
    setTaskToDelete(taskId);
    setIsModalOpen(true);
  };
  const confirmDelete = () => {
    if (taskToDelete !== null) {
      const updatedTasks = tasks.filter((task) => task.id !== taskToDelete);
      saveTasks(updatedTasks);
      setTasks(updatedTasks);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTaskToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Task List
      </h1>
      {tasks.length > 0 ? (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 border rounded-md flex items-center justify-between dark:bg-gray-800 dark:border-gray-700"
            >
              <div>
                <h3 className="text-lg font-bold dark:text-white">
                  {task.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {task.description}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => router.push(`/create-task?taskId=${task.id}`)}
                  className="p-2 rounded-full text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() => openDeleteModal(task.id)}
                  className="p-2 rounded-full text-red-500 hover:bg-blue-100 dark:hover:bg-gray-700"
                >
                  <FaTrashCan size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No tasks available.
        </p>
      )}
      {isModalOpen && (
        <ConfirmModal confirmDelete={confirmDelete} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Home;
