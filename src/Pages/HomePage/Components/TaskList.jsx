import { toggleTask, deleteTask } from "@/slices/toDoSlice";
import React, { useEffect, useState } from "react";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import newTask from "../../../assets/Task";
import Lottie from "lottie-react";
import TaskDetailsDialog from "./TaskDetailsDialog";
const TaskList = ({ title }) => {
  const allTasks = useSelector((state) => state.todo.tasks);
  const dispatch = useDispatch();
  const tasks = allTasks.filter((task) => {
    if (title === "Completed") return task.completed;
    if (title === "Pending") return !task.completed;
    if (title === "Important!") return task.priority==="High"; // "all" case
    else
    return true; // "all" case
  });
  useEffect(() => {
    console.log("tasks", tasks);
  }, [tasks]);

  const [openDialog, setOpenDialog] = useState(false);
  // const [dialogOpen, setDialogOpen] = useState(false);
  const [taskId, setTaskId] = useState(null);
  if (tasks.length === 0)
    return (
      <div className="w-full flex justify-center">
        <Lottie
          loop={true}
          autoPlay={true}
          animationData={newTask}
          className=""
          style={{ width: "400px", height: "400px" }}
        />
      </div>
    );

  return (
    <ul className="list-none p-0 mt-8 w-3/4 mx-auto space-y-4">
      <TaskDetailsDialog
        taskId={taskId}
        isOpen={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setTaskId(null);
        }}
      />

      {tasks.map((task) => (
        <li
          key={task.id}
          className={`relative px-5 py-4 border-b border-gray-300 flex flex-col bg-[#f0f6fe] rounded-lg shadow-md transition duration-200 group ${
            task.completed
              ? "line-through text-gray-500 bg-gray-200"
              : "hover:bg-blue-100"
          }`}
          onClick={() => {
            setOpenDialog(true);
            setTaskId(task.id);
          }}
        >
          {/* Task Title */}
          <p className="font-semibold text-lg">{task.title}</p>

          {/* Task Description */}
          <p className="text-gray-700 mt-1">
            {task.description.length > 100
              ? task.description.substring(0, 100) + "..."
              : task.description}
          </p>

          {/* Date, Priority, and Reminder */}
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <p>
              <strong>Date:</strong>{" "}
              {task.date ? new Date(task.date).toLocaleDateString() : "N/A"}
            </p>
            <p className="flex gap-1 items-center">
              <strong>Priority:</strong> {task.priority}
            </p>
            <p>
              <strong>Reminder:</strong> {task.reminder ? "On" : "Off"}
            </p>
          </div>

          {/* Delete Button & Checkbox (Hidden by Default, Visible on Hover) */}
          <div className="absolute top-3 right-3 flex gap-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-100">
            {/* Checkbox to toggle completion */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
              className="cursor-pointer w-5 h-5 accent-blue-500"
            />

            {/* Delete Button */}
            <button
              onClick={() => dispatch(deleteTask(task.id))}
              className="cursor-pointer"
            >
              <RiDeleteBin7Fill className="text-red-600 text-xl" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
