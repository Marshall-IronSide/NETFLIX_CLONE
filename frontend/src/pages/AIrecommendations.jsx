import React from "react";

const AIrecommendations = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#181818] via-[#232323] to-[#181818] relative overflow-hidden">
        <img src="/background_banner.jpg" className="absolute inset-0 w-full h-full object-cover opacity-20 blur-[2px]"/>
    <div
      className="relative w-full max-w-md mx-auto rounded-2xl bg-[#181818]/90 shadow-2xl border
         border-[#333333] px-8 py-10 mt-4 flex flex-col items-center min-h-120"
    >
      <h2 className="text-3xl font-extrabold mt-8 text-center text-white tracking-tight drop-shadow-lg">
        AI Movie Recommendations
      </h2>
      <div className="w-full flex items-center mt-8">
        <div className="flex-1 h-2 bg-[#232323] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#e50914] transition-all duration-300 "
            style={{ width: "50%" }}
          ></div>
        </div>
        <span className="ml-4 text-white text-sm font-semibold">2/5</span>
      </div>
      <div className="w-full flex flex-col flex-1">
        <div className="mb-6 flex-1">
          <h3 className="text-lg font-semibold text-white mb-6 text-center">
            What is your preferred genre?
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <button className="w-full py-3 rounded-xl border-2 transition font-semibold
             text-base flex items-center justify-center gap-2 bg-[#e50914] border-[#e50914] text-white shadow-lg">
              Option 1
            </button>
            <button className="w-full py-3 rounded-xl border-2 bg-[#232323] border-[#333333] text-white shadow-lg">
              Option 2
            </button>
            <button className="w-full py-3 rounded-xl border-2">
              Option 3
            </button>
            <button className="w-full py-3 rounded-xl border-2">
              Option 4
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
            <button type="button" className="px-6 py-2 rounded-lg font-semibold transition border-2 border-[#444] text-white bg-[#181818] hover:bg-[#232323]">
                Back
            </button>
            <button type="button" className="px-6 py-2 rounded-lg font-semibold transition border-2 border-[#e50914] text-white bg-[#e50914] hover:bg-[#e0060df1] ml-2">
                Next
            </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AIrecommendations;
