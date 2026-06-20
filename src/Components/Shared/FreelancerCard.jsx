import { Envelope } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FaLaptop } from "react-icons/fa6";

const FreelancerCard = ({ user }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-200">
      <div>
        {/* Profile Avatar Header Row Section */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-14 w-14 rounded-2xl  border-blue-100 flex items-center justify-center  font-bold text-lg uppercase shadow-sm shrink-0">
            
            {user.image ? <img src={user.image} alt={user.name} className="rounded-2xl" /> : user.name.substring(0, 2) }
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-[#333333] truncate leading-snug">
              {user.name || "Independent Professional"}
            </h3>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5 truncate">
              <Envelope size={12} /> {user.email}
            </p>
          </div>
        </div>

        {/* Subtitle / Functional Profession Summary */}
        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-3">
          <FaLaptop size={14} className="text-gray-400" />
          <span>{user.title || "Freelance Specialist"}</span>
        </div>

        {/* Render Skill Badges Collection Array */}
        {user.skills && user.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 my-3">
            {user.skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="text-[11px] font-medium bg-gray-50 text-gray-600 px-2.5 py-0.5 rounded-lg border border-gray-100 capitalize"
              >
                {skill}
              </span>
            ))}
            {user.skills.length > 4 && (
              <span className="text-[10px] text-gray-400 font-bold self-center ml-1">
                +{user.skills.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Dynamic Action Trigger to specific routing profiles details */}
      <div className="mt-6 pt-4 border-t border-gray-50">
        <Link href={`/freelancers/${user._id}`} passHref className="w-full">
          <Button className="w-full h-11 rounded-xl bg-gray-50 hover:bg-gradient-to-r hover:from-[#3B82F6] hover:to-[#8B5CF6] text-gray-700 hover:text-white font-semibold transition">
            View Full Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FreelancerCard;
