import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { List, CheckCircle, Clock, Star } from "lucide-react";

const sidebarList = [
  { title: "All Tasks", icon: List },
  { title: "Completed", icon: CheckCircle },
  { title: "Pending", icon: Clock },
  { title: "Important!", icon: Star },
];

export default function SidebarMenu({ setTitle }) {
  const [selectedItem, setSelectedItem] = useState("All Tasks");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="m-4">
          ☰ Menu
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-4">
        <h2 className="text-xl font-bold mb-4">Task Manager</h2>
        <nav className="space-y-2">
          {sidebarList.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`w-full justify-start ${
                selectedItem === item.title
                  ? "bg-gray-300"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => {
                setSelectedItem(item.title);

                setTitle(item.title);
              }}
            >
              <item.icon className="mr-2" />
              {item.title}
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
