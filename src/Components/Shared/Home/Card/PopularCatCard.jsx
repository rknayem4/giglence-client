import { Card } from "@heroui/react";
import React from "react";

const PopularCatCard = ({cat}) => {
  return (
    <Card
      onClick={() => handleCategoryNavigation(cat.slug)}
      className={`group border border-gray-100 p-6 bg-white rounded-3xl transition-all duration-300 hover:shadow-xl flex flex-col justify-between items-start text-left cursor-pointer ${cat.borderHover}`}
    >
      <Card.Content className="p-0 space-y-5 w-full flex flex-col h-full justify-between">
        {/* Dynamic Icon Frame Box layout */}
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${cat.bgClass}`}
        >
          <div className="group-hover:text-white transition duration-300">
            {cat.icon}
          </div>
        </div>

        {/* Typography Metadata Container */}
        <div className="space-y-1.5 pt-4">
          <h3 className="font-extrabold text-gray-800 text-lg tracking-tight group-hover:text-indigo-600 transition">
            {cat.name}
          </h3>
          <p className="text-xs text-gray-400 font-medium leading-relaxed">
            {cat.description}
          </p>
        </div>

        {/* Interactive Click Indicator Token Link */}
        <div className="pt-4 flex items-center gap-1 text-[11px] font-bold text-indigo-600/0 group-hover:text-indigo-600 transition-all duration-300">
          <span>Browse Jobs</span>
          <span className="transform translate-x-0 group-hover:translate-x-1 transition duration-200">
            →
          </span>
        </div>
      </Card.Content>
    </Card>
  );
};

export default PopularCatCard;
