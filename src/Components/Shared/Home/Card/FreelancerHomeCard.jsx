import { Button, Card } from "@heroui/react";
import { Link } from "lucide-react";
import React from "react";

const FreelancerHomeCard = ({ freelancer }) => {
  return (
    <Card className="border border-gray-100 hover:border-emerald-200 hover:shadow-2xl transition duration-300 bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
      <Card.Content className="p-6 text-center space-y-4">
        {/* Avatar Profile Layout Context */}
        <div className="relative w-20 h-20 mx-auto">
          <img
            src={
              freelancer.image ||
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
            }
            alt={`${freelancer.name}'s profile`}
            className="w-full h-full object-cover rounded-full border-2 border-emerald-500/20 p-0.5"
          />
          <span className="absolute bottom-0 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
        </div>

        {/* Profile Identification Metadata Block */}
        <div className="space-y-1">
          <h3 className="font-extrabold text-gray-800 text-base tracking-tight line-clamp-1">
            {freelancer.name}
          </h3>

          {/* Star Rating Layout Engine */}
          <div className="flex justify-center items-center gap-1.5">
            <span className="text-amber-500 text-sm">★</span>
            <span className="text-xs font-black text-gray-700">
              {freelancer.averageRating
                ? freelancer.averageRating.toFixed(1)
                : "5.0"}
            </span>
          </div>
        </div>

        {/* Dynamic Skill Array Token Layer */}
        <div className="flex flex-wrap justify-center gap-1.5 pt-1">
          {(freelancer.skills || ["UI/UX", "Next.js", "React"])
            .slice(0, 3)
            .map((skill, index) => (
              <span
                key={index}
                className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md"
              >
                {skill}
              </span>
            ))}
        </div>
      </Card.Content>

      {/* Quantitative Metric Summary Line Footer Layer */}
      <Card.Footer className="bg-gray-50/70 border-t border-gray-50 p-4 px-6 flex flex-col gap-3">
        <div className="text-center w-full">
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider block">
            Completed Contracts
          </span>
          <span className="text-base font-black text-gray-800">
            {freelancer.totalCompletedJobs || 0} Projects
          </span>
        </div>
        <Link href={`/freelancers/${freelancer._id}`}>
          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold h-9 rounded-xl transition"
            size="sm"
          >
            View Profile
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default FreelancerHomeCard;
