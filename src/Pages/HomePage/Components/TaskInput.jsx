import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addTask } from "@/slices/toDoSlice";

const TaskInput = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  // const [date, setDate] = useState("Today");
  const [priority, setPriority] = useState("Low");
  const [reminder, setReminder] = useState(false);
  const [date, setDate] = useState(new Date());

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview the image
    }
  };
  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(
        addTask({
          title: task,
          description: description,
          date: date ? date.toISOString() : null,
          completed: false,

          id: Date.now(),
          priority,
          reminder,
        })
      );
      setTask("");
      setDescription("");
      setDate(null);
      setPriority(false);
      setReminder(false);
      setOpen(false);
    }
  };


  return (
    <div className="text-center">
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogTrigger>
          <p
            className="flex items-center gap-2 text-[#a81f00] "
            onClick={() => setOpen(!open)}
          >
            <FaPlus size={16} />
            Add Task
          </p>
        </DialogTrigger>
        <DialogContent className="border-none w-[90%] md:w-[75%] lg:w-[60%] xl:w-1/2 !max-w-[None] flex flex-col bg-white ">
          <DialogHeader>
            <DialogTitle>Add new task</DialogTitle>
          </DialogHeader>
          <div className="p-4 bg-white shadow-md rounded-lg w-full space-y-3">
            {/* Task Title Input */}
            <Input
              type="text"
              placeholder="Task title..."
              className="text-lg font-semibold border-none focus:ring-0 bg-[#f0fefd]"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />

            {/* Description Input */}
            <Textarea
              placeholder="Description"
              className="mt-2 text-sm border-none focus:ring-0 h-32 bg-[#f0fefd]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex flex-wrap items-center gap-2 justify-around mt-3">
              {/* calender */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    {date ? format(date, "PPP") : "Select Date & Time"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-2 bg-white rounded-md shadow-md">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    showOutsideDays
                  />
                </PopoverContent>
              </Popover>

              <select
                name="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className=" p-2 border rounded-lg"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setReminder(!reminder)}
                className={`${reminder ? "text-blue-500" : ""}`}
              >
                <Clock className="w-4 h-4 mr-1" /> Reminders
              </Button>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-4">
              <Button variant="ghost" className="mr-2" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleAddTask}>
                Add Task
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskInput;
