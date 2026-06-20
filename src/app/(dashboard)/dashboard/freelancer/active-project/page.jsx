"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Input, TextArea, Textarea } from "@heroui/react";
import toast from "react-hot-toast";

export default function ActiveProjects() {
  const { data: session } = authClient.useSession();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal Sheet State Mapping
  const [selectedProject, setSelectedProject] = useState(null);
  const [submittedLink, setSubmittedLink] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchActiveProjects = async () => {
      if (!session?.user?.email) return;
      try {
        setLoading(true);
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
        const res = await fetch(
          `${baseUrl}/api/freelancer/active-projects?freelancerEmail=${session.user.email}`,
        );

        if (!res.ok)
          throw new Error(
            "Failed to clear current dashboard pool registry values.",
          );
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
        toast.error("Could not fetch running contracts dynamically.");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveProjects();
  }, [session?.user?.email]);

  const handleSubmitProjectReceipt = async (e) => {
    e.preventDefault();
    if (!submittedLink.trim())
      return toast.error(
        "Please supply a valid deployment URL asset file link.",
      );

    try {
      setIsSubmitting(true);
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

      // Match properties cleanly into request schema requirements
      const payload = {
        taskId: selectedProject._id,
        proposalId: selectedProject.proposalId,
        taskTitle: selectedProject.title,
        clientEmail:
          selectedProject.clientEmail || selectedProject.client_email,
        freelancerEmail: session?.user?.email,
        submittedLink: submittedLink,
        message: message,
      };

      const res = await fetch(`${baseUrl}/api/freelancer/projects/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok)
        throw new Error(
          result.error || "Submission transaction mutation failed.",
        );

      toast.success(
        "Work delivered successfully! Filed directly to system storage archives.",
      );

      // Clear components matching targeted instances out of tracking dashboard views array
      setProjects((prev) => prev.filter((p) => p._id !== selectedProject._id));
      setSelectedProject(null);
      setSubmittedLink("");
      setMessage("");
    } catch (err) {
      toast.error(
        err.message || "An error occurred during submission workflow routing.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="text-center py-10 text-gray-400 font-medium">
        Loading execution pipelines...
      </div>
    );

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
        Your Active Contracts
      </h2>

      {projects.length === 0 ? (
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center text-gray-400 italic text-sm">
          You don't have any running active projects at the moment.
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition flex flex-col md:flex-row md:justify-between md:items-center gap-4"
            >
              <div>
                <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2.5 py-0.5 rounded-md border border-emerald-100 uppercase tracking-wider">
                  In Progress
                </span>
                <h3 className="text-lg font-bold text-gray-800 mt-2">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2 max-w-xl">
                  {project.description}
                </p>
                <div className="flex gap-4 mt-3 text-xs text-gray-400 font-medium">
                  <p>
                    Budget Allocation:{" "}
                    <span className="text-purple-600 font-extrabold">
                      ${project.budget}
                    </span>
                  </p>
                  <p>
                    Client Liaison Contact:{" "}
                    <span className="text-gray-700 font-semibold">
                      {project.clientEmail ||
                        project.client_email ||
                        "System Assignment"}
                    </span>
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setSelectedProject(project)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 h-10 rounded-xl transition shadow-sm md:self-center"
              >
                Submit Delivery Form
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Popover Form Context Wrapper overlay modal screen sheet */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-50 pb-2">
              Deliver Project Assets
            </h3>

            <form
              onSubmit={handleSubmitProjectReceipt}
              className="space-y-4 mt-4"
            >
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Deliverables URL Link Address
                </label>
                <Input
                  required
                  type="url"
                  placeholder="https://github.com/repository-name or live link..."
                  value={submittedLink}
                  onChange={(e) => setSubmittedLink(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Accompanying Cover Message / Notes
                </label>
                <TextArea
                  placeholder="Type any instructions, context summaries or handover descriptions for the managing client..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <Button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setSelectedProject(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs"
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs px-5"
                >
                  Finalize & Archive Project
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
