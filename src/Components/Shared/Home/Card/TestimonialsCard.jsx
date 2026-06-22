import { Card } from "@heroui/react";
import React from "react";

const TestimonialsCard = ({ review }) => {
  return (
    <Card className="border border-gray-100 p-8 bg-white rounded-3xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">
      <Card.Content className="p-0 space-y-6 flex flex-col justify-between h-full">
        {/* Visual Quote Icon Bracket Design Asset */}
        <div className="text-4xl font-serif text-indigo-200 leading-none h-4">
          “
        </div>

        {/* Main Quote Text Body Block */}
        <blockquote className="text-sm text-gray-600 leading-relaxed font-medium italic relative z-10">
          {review.quote}
        </blockquote>

        {/* Rating Block Separator Line Layout */}
        <div className="flex gap-0.5 text-amber-400 text-xs pt-2">
          {Array.from({ length: review.rating }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>

        <hr className="border-gray-50 my-1" />

        {/* Profile Identity Context Header Block */}
        <div className="flex items-center gap-4">
          <img
            src={review.avatar}
            alt={`${review.name} avatar profile`}
            className="w-11 h-11 rounded-full object-cover border border-gray-100 bg-gray-50"
          />
          <div>
            <h4 className="font-extrabold text-gray-800 text-sm tracking-tight">
              {review.name}
            </h4>
            <p className="text-[11px] font-medium text-gray-400 truncate max-w-[170px]">
              {review.role}
            </p>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default TestimonialsCard;
