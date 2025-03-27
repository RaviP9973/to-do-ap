import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Edit, Save } from "lucide-react";
import { Calendar as CalendarIcon, Clock, MoreHorizontal } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../../../slices/toDoSlice"; // Import action for updating tasks
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const TaskDetailsDialog = ({ taskId, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todo.tasks || []);
  const [task, setTask] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === taskId);
    console.log(foundTask);
    setTask(foundTask || null);
    setEditedTask(foundTask ? { ...foundTask } : null);
  }, [taskId, tasks]);

  // Handle changes
  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };
  const handleDateChange = (newDate) => {
    setDate(newDate);
    setEditedTask((prev) => ({ ...prev, date: newDate.toISOString() }));
  };

  // Save changes to Redux
  const handleSave = () => {
    if (editedTask) {
      dispatch(updateTask(editedTask));
      setTask(editedTask);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Edit className="w-5 h-5 text-blue-500" />
            Edit Task
          </DialogTitle>
          <DialogDescription>Details for task ID: {taskId}</DialogDescription>
        </DialogHeader>
        {task ? (
          <div className="space-y-4">
            {/* Editable Title */}
            <Input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />

            {/* Editable Description */}
            <Textarea
              name="description"
              value={editedTask.description}
              onChange={handleChange}
              className="w-full h-32 p-2 border rounded-lg"
              rows="3"
            />

            {/* Task Date */}
            <div className="flex justify-start gap-2 items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <CalendarIcon className="" />
                    {editedTask?.date
                      ? format(new Date(date), "PPP")
                      : "Select Date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-2 bg-white rounded-md shadow-md">
                  <Calendar
                    mode="single"
                    selected={
                      editedTask.date ? new Date(editedTask.date) : null
                    }
                    onSelect={handleDateChange}
                    //   onChange={handleDateChange}
                    showOutsideDays
                  />
                </PopoverContent>
              </Popover>

              {/* Editable Priority */}
              <select
                name="priority"
                value={editedTask.priority}
                onChange={handleChange}
                className=" p-2 border rounded-lg"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setEditedTask({
                    ...editedTask,
                    reminder: !editedTask.reminder,
                  })
                }
                className={`${editedTask.reminder ? "text-blue-500" : ""}`}
              >
                <Clock className="w-4 h-4 mr-1" /> Reminders
              </Button>
            </div>
            {/* Status & Save Button */}
            <div
              className="flex justify-between items-center"
              name="completed"
              onClick={() =>
                setEditedTask({
                  ...editedTask,
                  completed: !editedTask.completed,
                })
              }
            >
              {editedTask.completed ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}

              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-1"
              >
                <Save className="w-5 h-5" />
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-red-500 font-semibold">
            <p>No task found with ID: {taskId}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailsDialog;
