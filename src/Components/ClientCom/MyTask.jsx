"use client";

import { useEffect, useState } from "react";
import { Pencil, CircleCheck, Xmark } from "@gravity-ui/icons"; // Using gravity ui icons
import { Button, Form, TextField, Label, Input, TextArea } from "@heroui/react";
import toast from "react-hot-toast";
import { getClientTasks, updateClientTask } from "@/lib/Action/taskPostApi";
import { authClient } from "@/lib/auth-client";

export default function ClientTasksSection() {
    const { data: session } = authClient.useSession();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null); // Track task being edited

  const fetchTasks = async () => {
    if (!session?.user?.id) return;
    try {
      setLoading(true);
      const data = await getClientTasks(session.user.id);
      setTasks(data);
    } catch (err) {
      toast.error("Could not load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [session?.user?.id]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updatedFields = {
      title: formData.get("title"),
      budget: Number(formData.get("budget")),
      deadline: formData.get("deadline"),
      description: formData.get("description"),
      deliverable_url: formData.get("deliverable_url"),
    };

    try {
      const res = await updateClientTask(editingTask._id, updatedFields);
      if (res.acknowledged) {
        toast.success("Task updated safely!");
        setEditingTask(null);
        fetchTasks(); // Reload the data
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <p className="text-gray-500">Loading tasks...</p>;

  return (
    <div className="space-y-6">
      {/* Edit Form Overlay (Simple View Toggle) */}
      {editingTask && (
        <div className="rounded-2xl border-2 border-blue-200 bg-blue-50/50 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Editing: {editingTask.title}</h3>
            <Button size="sm" variant="ghost" onClick={() => setEditingTask(null)}>
              <Xmark /> Cancel
            </Button>
          </div>
          <Form onSubmit={handleEditSubmit} className="space-y-4 bg-white p-4 rounded-xl shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField name="title" defaultValue={editingTask.title} isRequired>
                <Label>Title</Label>
                <Input />
              </TextField>
              <TextField name="budget" type="number" defaultValue={editingTask.budget} isRequired>
                <Label>Budget ($)</Label>
                <Input />
              </TextField>
              <TextField name="deadline" type="date" defaultValue={editingTask.deadline} isRequired>
                <Label>Deadline</Label>
                <Input />
              </TextField>
              <TextField name="deliverable_url" defaultValue={editingTask.deliverable_url}>
                <Label>Deliverable Link</Label>
                <Input />
              </TextField>
            </div>
            <div className="flex flex-col">
              <Label>Description</Label>
              <TextArea name="description" defaultValue={editingTask.description} isRequired />
            </div>
            <Button type="submit" className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white">
              <CircleCheck size={16} /> Save Changes
            </Button>
          </Form>
        </div>
      )}

      {/* Grid List View */}
      <div className="grid gap-4 md:grid-cols-2">
        {tasks.map((task) => (
          <div key={task._id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-[#333333]">{task.title}</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                  task.status === 'open' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                }`}>
                  {task.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4">{task.description}</p>
            </div>

            <div className="mt-4 border-t border-gray-50 pt-3 flex justify-between items-center">
              <div className="text-xs text-gray-400 space-x-4">
                <span>Budget: <strong className="text-gray-700">${task.budget}</strong></span>
                <span>Deadline: <strong className="text-gray-700">{task.deadline}</strong></span>
              </div>

              {/* Conditional Rendering: Only show Edit Button if status is exactly 'open' */}
              {task.status === "open" ? (
                <Button 
                  size="sm" 
                  variant="light"
                  className="text-blue-600 hover:bg-blue-50 rounded-lg"
                  onClick={() => setEditingTask(task)}
                >
                  <Pencil size={14} /> Edit
                </Button>
              ) : (
                <span className="text-xs text-gray-400 italic">Locked (In-Progress)</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}