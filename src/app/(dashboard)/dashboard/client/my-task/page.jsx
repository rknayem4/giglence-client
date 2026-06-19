import ClientTasksSection from '@/Components/ClientCom/MyTask';
import { Briefcase } from '@gravity-ui/icons';
import React from 'react';

const MyTaskPage = () => {
  // Mock session data for illustration—ensure this matches how your application passes session data!


  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header section */}
      <div className="mb-8 border-b border-gray-100 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#3B82F6]">
            <Briefcase size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#333333]">
              Client Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage, monitor, and track all your posted tasks and contract deliverables.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-section Wrapper */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm md:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#333333]">
            My Posted Tasks
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Review live applications, active project progress, or past historic task postings.
          </p>
        </div>

        {/* Dynamic Task Content Feed */}
        <ClientTasksSection  />
      </div>
    </div>
  );
};

export default MyTaskPage;