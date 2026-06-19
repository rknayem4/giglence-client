"use client";

import { useEffect, useState } from "react";
import { Magnifier, Briefcase } from "@gravity-ui/icons";
import { Input, Select, ListBox, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { getOpenTasks } from "@/lib/Action/publicAPI";
import TaskCard from "@/Components/Shared/TaskCard";

export default function TaskBrowserPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 1. Fetch data only once on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await getOpenTasks();
        setTasks(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load available tasks.");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // 2. Compute Filtered Tasks synchronously during rendering pass (No State needed!)
  const filteredTasks = tasks.filter((task) => {
    // Search filter matching
    const matchesSearch =
      searchQuery.trim() === "" ||
      task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter matching
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "all" ||
      task.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Reset page number smoothly if calculated elements fall out of index scope
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const activePage =
    currentPage > totalPages && totalPages > 0 ? 1 : currentPage;

  // Pagination slice limits configuration
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTasksForPage = filteredTasks.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const categories = [
    { key: "all", label: "All Categories" },
    { key: "development", label: "Software Development" },
    { key: "design", label: "UI/UX Design" },
    { key: "marketing", label: "Digital Marketing" },
    { key: "writing", label: "Content Writing" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page Heading */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#333333] sm:text-5xl">
          Explore Open Project Tasks
        </h1>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="sm:col-span-2">
          {/* A helper container to style the input with the icon inside */}
          <div className="relative flex items-center w-full">
            {/* Position the icon absolutely inside the input area */}
            <span className="absolute left-3 z-10 flex items-center pointer-events-none">
              <Magnifier className="text-gray-400" />
            </span>

            <Input
              placeholder="Search keywords, tech stacks, or deliverables..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              // Add padding to the left so text doesn't overlap the absolute icon
              className="w-full [&_input]:pl-10"
            />
          </div>
        </div>
        <div>
          <Select
            className="w-full"
            placeholder="Select a category"
            selectedKeys={[selectedCategory]}
            onSelectionChange={(keys) => {
              const currentKey = Array.from(keys)[0];
              setSelectedCategory(currentKey || "all");
              setCurrentPage(1); // Safely clear tracking bounds here
            }}
          >
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox selectionMode="single">
                {categories.map((cat) => (
                  <ListBox.Item
                    id={cat.key}
                    key={cat.key}
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
      </div>

      {/* Content Render Tree */}
      {loading ? (
        <div className="text-center py-20">
          <p className="text-gray-500 font-medium">
            Fetching available projects...
          </p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <Briefcase size={40} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-semibold text-gray-700">
            No Open Tasks Found
          </h3>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentTasksForPage.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              <Button
                variant="secondary"
                disabled={activePage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="rounded-xl px-4"
              >
                Previous
              </Button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`h-10 w-10 rounded-xl font-medium transition-all ${
                      activePage === index + 1
                        ? "bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white shadow-md"
                        : "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <Button
                variant="secondary"
                disabled={activePage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="rounded-xl px-4"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
