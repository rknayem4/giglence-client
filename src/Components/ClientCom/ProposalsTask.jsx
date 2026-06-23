"use client";

import { getProposalsByTaskId } from "@/lib/Action/proposals";
import { Table, Button } from "@heroui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProposalsTask = ({ task }) => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [taskStatus, setTaskStatus] = useState(task.status || "open");

  // Fetch proposals securely on mount
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true);
        const data = await getProposalsByTaskId(task._id);

        // Debugging point: Look at your F12 developer console to check properties!
        // console.log(`Proposals loaded for task: ${task.title}`, data);

        setProposals(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading task proposals:", error);
      } finally {
        setLoading(false);
      }
    };

    if (task?._id) {
      fetchProposals();
    }
  }, [task?._id]);

  const handleAcceptProposal = async (proposal) => {
    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proposalId: proposal._id,
          freelancer_email: proposal.freelancer_email,
          freelancer_id: proposal.freelancer_id,

          taskId: task._id,
          task_name: task.title,

          client_email: task.client_email,

          amount: Number(proposal.proposed_budget),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // window.location.href = data.url;  --- its error because of nextjs 13, so we use this
      // window.open(data.url, "_blank");
      window.location.href = data.url;
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Action mutation handler
  // const handleAcceptProposals = async (acceptedProposalId) => {
  //   if (!confirm("Are you sure?")) return;

  //   try {
  //     setIsProcessing(true);

  //     // FIX: Change from '/api/client/proposals/accept' to include your backend base address
  //     // If you have an env file or baseUrl variable imported, use that:
  //     const backendUrl =
  //       process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

  //     const res = await fetch(`${backendUrl}/api/client/proposals/accept`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         taskId: task._id,
  //         acceptedProposalId: acceptedProposalId,
  //       }),
  //     });

  //     const result = await res.json();
  //     if (!res.ok)
  //       throw new Error(result.error || "Failed to process acceptance.");

  //     toast.success("Proposal accepted!");
  //     setTaskStatus("On the progress");

  //     // Sync local array elements state to reflect accepted/rejected instantly
  //     setProposals((prev) =>
  //       prev.map((prop) => ({
  //         ...prop,
  //         status: prop._id === acceptedProposalId ? "accepted" : "rejected",
  //       })),
  //     );
  //   } catch (error) {
  //     toast.error(error.message || "An unexpected error occurred.");
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };
  // console.log(task, taskStatus, proposals);

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xl overflow-hidden my-5">
      {/* Task Information Heading Grid Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 border-b border-gray-50 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2.5">
            {task.title}
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                taskStatus === "On the progress"
                  ? "bg-amber-50 text-amber-600 border border-amber-100"
                  : "bg-blue-50 text-blue-600 border border-blue-100"
              }`}
            >
              {taskStatus}
            </span>
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-1">
            {task.description}
          </p>
        </div>

        <div className="flex gap-4 text-xs font-semibold text-gray-400 bg-gray-50 p-3 rounded-2xl border border-gray-100/50 self-start md:self-center">
          <p>
            Budget: <strong className="text-gray-800">${task.budget}</strong>
          </p>
          <div className="w-px bg-gray-200"></div>
          <p>
            Deadline: <strong className="text-gray-800">{task.deadline}</strong>
          </p>
        </div>
      </div>

      {/* Proposals Rendering Body */}
      {loading ? (
        <div className="text-center py-6 text-sm text-gray-400 font-medium">
          Loading incoming proposals...
        </div>
      ) : proposals.length === 0 ? (
        <div className="text-center py-6 text-sm text-gray-400 italic">
          No proposals submitted for this project listing yet.
        </div>
      ) : (
        <Table aria-label={`Proposals submitted for ${task.title}`}>
          <Table.ScrollContainer>
            <Table.Content
              aria-label="Freelancer applications table"
              className="min-w-[700px]"
            >
              <Table.Header>
                <Table.Column isRowHeader>Freelancer Mail</Table.Column>
                <Table.Column>Proposed Bid</Table.Column>
                <Table.Column>Cover Message</Table.Column>
                <Table.Column>Proposal Status</Table.Column>
                <Table.Column align="end">Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                {proposals.map((proposal) => {
                  const currentPropStatus = proposal.status || "pending";

                  return (
                    <Table.Row
                      key={proposal._id}
                      className="border-b border-gray-50 last:border-0"
                    >
                      {/* Flexed key matching checks for fallback to alternative schema names */}
                      <Table.Cell className="font-semibold text-gray-800">
                        <Link
                          href={`/freelancers/${proposal.freelancer_id}`}
                          className="underline"
                        >
                          {proposal.freelancer_email ||
                            proposal.freelancer_name ||
                            "Independent Specialist"}
                        </Link>
                      </Table.Cell>

                      <Table.Cell className="font-extrabold text-purple-600">
                        ${proposal.proposed_budget || "--"}
                      </Table.Cell>

                      <Table.Cell className="max-w-[280px] truncate text-gray-500 text-xs">
                        {proposal.cover_note || "No message provided."}
                      </Table.Cell>

                      <Table.Cell>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                            currentPropStatus === "accepted"
                              ? "bg-green-50 text-green-600 border border-green-100"
                              : currentPropStatus === "rejected"
                                ? "bg-red-50 text-red-500 border border-red-100"
                                : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {proposal.status}
                        </span>
                      </Table.Cell>

                      <Table.Cell>
                        {taskStatus !== "On the progress" &&
                        currentPropStatus === "pending" ? (
                          // <Button
                          //   size="sm"
                          //   disabled={isProcessing}
                          //   onClick={() => handleAcceptProposal(proposal._id)}
                          //   className="bg-blue-600 hover:bg-blue-700 font-bold text-white text-xs px-4 rounded-xl shadow-md transition"
                          // >
                          //   Accept Bid
                          // </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAcceptProposal(proposal)}
                            className="bg-blue-600 hover:bg-blue-700 font-bold text-white text-xs px-4 rounded-xl shadow-md transition"
                          >
                            Accept & Pay
                          </Button>
                        ) : currentPropStatus === "accepted" ? (
                          <span className="text-xs text-green-600 font-semibold italic">
                            Contract Active
                          </span>
                        ) : (
                          <span className="text-xs text-gray-300 font-normal select-none">
                            —
                          </span>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      )}
    </div>
  );
};

export default ProposalsTask;
