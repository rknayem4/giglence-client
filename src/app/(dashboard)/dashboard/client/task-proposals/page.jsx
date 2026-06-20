
import ProposalsTask from "@/Components/ClientCom/ProposalsTask";
import { getClientTasks } from "@/lib/Action/taskPostApi";
import { auth } from "@/lib/auth";
import { Briefcase } from "@gravity-ui/icons";
import { headers } from "next/headers";

export default async function ClientProposalsDashboard() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const myTask = await getClientTasks(session.user.id);
  // console.log(data);
  return (
    <section>
      <div className="mb-8 border-b border-gray-100 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#3B82F6]">
            <Briefcase size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#333333]">
              Proposals of my task
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage, monitor, and track all your posted tasks and contract
              deliverables.
            </p>
          </div>
        </div>
      </div>
      <div>
        {
         myTask.map(task => <ProposalsTask key={task._id} task={task} />)
        }
      </div>
      
    </section>
  );
}
