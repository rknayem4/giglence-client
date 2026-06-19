"use client";

import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
  Select,
  ListBox,
  TextArea,
} from "@heroui/react";
import { Briefcase, File } from "@gravity-ui/icons";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { createTask } from "@/lib/Action/taskPostApi";
import { redirect } from "next/navigation";

export default function CreateTaskPage() {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const taskData = {
        title: formData.get("title"),
        category: formData.get("category"),
        description: formData.get("description"),
        budget: Number(formData.get("budget")),
        deadline: formData.get("deadline"),
        client_email: session?.user?.email, // Added optional chaining just in case
        client_id: session?.user?.id,
        status: "open",
        deliverable_url: formData.get("deliverable_url"),
      };

      // Correctly calling your API function here
      const result = await createTask(taskData);

      if (result.acknowledged) {
        // MongoDB returns { acknowledged: true, insertedId: ... }
        toast.success("Task posted successfully!");
      } else {
        throw new Error("Database failed to save the task");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
      redirect("/dashboard/client/my-task");
    }
  };

  const categories = [
    { key: "development", label: "Software Development" },
    { key: "design", label: "UI/UX Design" },
    { key: "marketing", label: "Digital Marketing" },
    { key: "writing", label: "Content Writing" },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      {/* Heading & Subheading */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-[#333333]">
          Post a New Project Task
        </h1>
        <p className="mt-3 text-gray-500">
          Provide project requirements, deadline details, and set your budget
          allocation.
        </p>
      </div>

      <Form
        onSubmit={onSubmit}
        className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl md:p-10"
      >
        <section className="w-full">
          <h2 className="mb-6 text-xl font-bold text-[#333333] flex items-center gap-2">
            <Briefcase className="text-[#3B82F6]" /> Task Specifications
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Task Title */}
            <TextField name="title" isRequired>
              <Label>Task Title</Label>
              <Input placeholder="Build an e-commerce platform dashboard" />
              <FieldError />
            </TextField>

            {/* Category Select */}
            <div className="flex flex-col gap-2">
              <Label>Category</Label>
              <Select
                name="category"
                className="w-full"
                placeholder="Select task category"
              >
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {categories.map((cat) => (
                      <ListBox.Item
                        key={cat.key}
                        id={cat.key}
                        textValue={cat.label}
                      >
                        {cat.label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Budget */}
            <TextField name="budget" type="number" isRequired>
              <Label>Budget ($ USD)</Label>
              <Input placeholder="1500" min="1" />
              <FieldError />
            </TextField>

            {/* Deadline */}
            <TextField name="deadline" type="date" isRequired>
              <Label>Deadline Date</Label>
              <Input />
              <FieldError />
            </TextField>

            {/* Deliverable URL */}
            <div className="md:col-span-2">
              <TextField name="deliverable_url" type="url">
                <Label className="flex items-center gap-1">
                  <File size={14} /> Deliverable Resource / Brief URL (Optional)
                </Label>
                <Input placeholder="https://figma.com/... or cloud document link" />
                <FieldError />
              </TextField>
            </div>
          </div>

          {/* Task Description */}
          <div className="mt-5 flex flex-col">
            <Label>Task Description & Scope</Label>
            <TextArea
              name="description"
              placeholder="Outline specific core features, technical expectations, and system requirements..."
              className="mt-2"
              isRequired
            />
          </div>
        </section>

        {/* Form Action Controls */}
        <div className="flex gap-4 justify-center items-center mt-8 w-full">
          <Button
            type="reset"
            variant="secondary"
            className="px-6 rounded-full"
          >
            Reset
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-lg font-semibold text-white shadow-lg transition hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Task Post"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
