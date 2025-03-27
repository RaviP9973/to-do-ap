import { PlusCircle, ListTodo } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TaskInput from "./Components/TaskInput";
import TaskList from "./Components/TaskList";
import { useState } from "react";

const TodoApp = ({title}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 py-6 overflow-y-hidden">
      {/* Header */}
      <Card className=" w-4/5 shadow-lg rounded-2xl min-h-[90vh]">
        <CardContent className="p-6 ">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
              <ListTodo className="w-7 h-7 text-blue-500" />
              To-Do List
            </h2>
            <h4>{title}</h4>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setOpen(!open)}
            >
              <PlusCircle className="w-5 h-5" />
              Add Task
            </Button>
          </div>

          {/* Separator */}
          <div className="border-t my-4"></div>

          {/* Task Input & List */}
          <TaskInput open={open} setOpen={setOpen} />
          <TaskList title={title}/>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoApp;
