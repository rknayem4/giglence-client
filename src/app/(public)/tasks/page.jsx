"use client";

import { useEffect, useState } from "react";
import { Magnifier, Briefcase } from "@gravity-ui/icons";
import { Input, Select, ListBox, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { getOpenTasks } from "@/lib/Action/publicAPI";
import TaskCard from "@/Components/Shared/TaskCard";
import { useSearchParams } from "next/navigation";

export default function TaskBrowserPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States triggering server requests
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

const itemsPerPage = 9;
  const searchParams = useSearchParams();
  const activeCategoryFilter = searchParams.get("category");

  const categories = [
    { key: "all", label: "All Categories" },
    { key: "development", label: "Software Development" },
    { key: "design", label: "UI/UX Design" },
    { key: "marketing", label: "Digital Marketing" },
    { key: "writing", label: "Content Writing" },
    { key: "other", label: "Other Services" },
  ];

  // Sync entry query params safely
  useEffect(() => {
    if (activeCategoryFilter) {
      setSelectedCategory(activeCategoryFilter.toLowerCase());
      setCurrentPage(1);
    }
  }, [activeCategoryFilter]);

  // ⭐️ Centralized Server Fetch Mechanism
  useEffect(() => {
    const fetchServerData = async () => {
      try {
        setLoading(true);
        // Request segment data bounds from Express backend directly
        const responseData = await getOpenTasks(
          currentPage,
          itemsPerPage,
          searchQuery,
          selectedCategory,
        );

        setTasks(responseData.tasks || []);
        setTotalPages(responseData.totalPages || 1);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch fresh project assets from server.");
      } finally {
        setLoading(false);
      }
    };

    // Optional Debounce fallback can be mapped here to limit keystroke server strain
    const timer = setTimeout(() => {
      fetchServerData();
    }, 300); // 300ms network delay debounce wrapper

    return () => clearTimeout(timer);
  }, [currentPage, searchQuery, selectedCategory]);
  console.log(selectedCategory);

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
          <div className="relative flex items-center w-full">
            <span className="absolute left-3 z-10 flex items-center pointer-events-none">
              <Magnifier className="text-gray-400" />
            </span>

            <Input
              placeholder="Search keywords, tech stacks, or deliverables..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset page indices immediately on new keywords
              }}
              className="w-full [&_input]:pl-10 pl-9"
            />
          </div>
        </div>
        <div>
          <Select
            className="w-full"
            placeholder="Select a category"
            selectedKeys={new Set([selectedCategory])}
            onSelectionChange={(key) => {
              console.log("Selected:", key);
              setSelectedCategory(key);
              setCurrentPage(1);
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
      ) : tasks.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <Briefcase size={40} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-semibold text-gray-700">
            No Open Tasks Found
          </h3>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              <Button
                variant="secondary"
                disabled={currentPage === 1}
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
                      currentPage === index + 1
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
                disabled={currentPage === totalPages}
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
