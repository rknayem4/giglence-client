export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        {/* Logo Loader */}
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border-4 border-[#3B82F6]/20"></div>

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#3B82F6] border-r-[#8B5CF6]"></div>
        </div>

        {/* Brand Name */}
        <h2 className="mt-6 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-3xl font-bold text-transparent">
          Giglance
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Connecting Clients & Freelancers...
        </p>

        {/* Dots */}
        <div className="mt-4 flex gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#3B82F6]"></span>
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-[#6366F1]"
            style={{ animationDelay: "0.15s" }}
          ></span>
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-[#8B5CF6]"
            style={{ animationDelay: "0.3s" }}
          ></span>
        </div>
      </div>
    </div>
  );
}