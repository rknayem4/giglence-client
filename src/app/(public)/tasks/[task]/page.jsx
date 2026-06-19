"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Envelope,
  FileText,
  PaperPlane,
} from "@gravity-ui/icons";
import { Button, Form, TextField, Label, Input, TextArea } from "@heroui/react";
import toast from "react-hot-toast";
import { BsCurrencyBitcoin } from "react-icons/bs";
import { submitProposal } from "@/lib/Action/proposals";
import { getSingleTask } from "@/lib/Action/publicAPI";
import { useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function TaskDetailsPage() {
  const { task: taskId } = useParams();
  const { data: session } = authClient.useSession();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Mocked authenticated freelancer user session information


  useEffect(() => {
    if (!taskId) return;
    const fetchTaskDetails = async () => {
      try {
        setLoading(true);
        const data = await getSingleTask(taskId);
        setTask(data);
      } catch (err) {
        console.error(err);
        toast.error("Could not load project requirements.");
      } finally {
        setLoading(false);
      }
    };
    fetchTaskDetails();
  }, [taskId]);

  const onProposalSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const proposalPayload = {
        task_id: taskId,
        client_id: task.client_id,
        freelancer_email: session.user.email,
        freelancer_id: session.user.id,
        proposed_budget: Number(formData.get("proposed_budget")),
        estimated_days: Number(formData.get("estimated_days")),
        cover_note: formData.get("cover_note"),
        status: "pending", // Baseline status setup
        submitted_at: new Date().toISOString(),
      };

      const result = await submitProposal(proposalPayload);

      if (result.acknowledged) {
        toast.success("Your proposal was sent successfully!");
        e.target.reset(); // Clear form values safely
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 font-medium">
        Loading project file...
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold">
        Project data could not be located.
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Side: Main Project Requirements & Description Detail Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#3B82F6] capitalize">
                {task.category}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                  task.status === "open"
                    ? "bg-green-50 text-green-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                ● Status: {task.status}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold text-[#333333] tracking-tight mb-4">
              {task.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6 bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center gap-1.5 font-semibold text-gray-800">
                <BsCurrencyBitcoin className="text-amber-500" /> Budget: $
                {task.budget}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="text-gray-400" /> Deadline: {task.deadline}
              </div>
              <div className="flex items-center gap-1.5">
                <Envelope className="text-gray-400" /> Client:{" "}
                {task.client_email}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-lg font-bold text-[#333333] mb-3 flex items-center gap-2">
                <FileText size={18} className="text-gray-400" /> Project Outline
                & Objectives
              </h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {task.description}
              </p>
            </div>

            {task.deliverable_url && (
              <div className="mt-6 p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-between">
                <span className="text-xs text-blue-700 font-medium">
                  Attached Brief Resource Link:
                </span>
                <a
                  href={task.deliverable_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#3B82F6] underline hover:text-[#8B5CF6]"
                >
                  View Attachment Material
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Interactive Bid Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xl sticky top-6">
            <h2 className="text-xl font-bold text-[#333333] mb-2 flex items-center gap-2">
              <PaperPlane className="text-[#3B82F6]" size={18} /> Submit
              Proposal
            </h2>
            <p className="text-xs text-gray-400 mb-6">
              Specify your execution conditions and include a professional
              portfolio brief below.
            </p>

            {/* CONDITION 1: Check if the user is a freelancer */}
            {session?.user?.role !== "freelancer" ? (
              <div className="rounded-xl bg-blue-50 p-4 text-center border border-blue-100">
                <p className="text-xs font-medium text-blue-700 leading-relaxed">
                  Only registered <strong>Freelancers</strong> can apply or
                  submit proposal offers to tasks.
                </p>
              </div>
            ) : /* CONDITION 2: If they are a freelancer, check if the task is open */
            task.status !== "open" ? (
              <div className="rounded-xl bg-amber-50 p-4 text-center border border-amber-200">
                <p className="text-xs font-medium text-amber-700">
                  This task position is locked or no longer collecting freelance
                  applications.
                </p>
              </div>
            ) : (
              /* Render Form if both conditions pass safely */
              <Form onSubmit={onProposalSubmit} className="space-y-4">
                {/* Proposed Budget */}
                <TextField name="proposed_budget" type="number" isRequired>
                  <Label>Your Quote ($ USD)</Label>
                  <Input placeholder={task.budget} min="1" />
                </TextField>

                {/* Estimated Delivery Duration */}
                <TextField name="estimated_days" type="number" isRequired>
                  <Label>Estimated Days to Complete</Label>
                  <Input placeholder="7" min="1" />
                </TextField>

                {/* Pitch Details */}
                <div className="flex flex-col">
                  <Label>Cover Note</Label>
                  <TextArea
                    name="cover_note"
                    placeholder="Describe your skill alignment, milestones framework, and approach strategy..."
                    className="mt-1"
                    isRequired
                  />
                </div>

                {/* Action Handler Trigger */}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 mt-4 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] font-semibold text-white shadow-md transition hover:scale-[1.01] disabled:opacity-50"
                >
                  {submitting
                    ? "Sending Offer..."
                    : "Submit Project Application"}
                </Button>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
