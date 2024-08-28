import React from "react";

const MainStats = () => {
  return (
    <section className="py-4 leading-6 text-indigo-500 sm:py-4 lg:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold leading-9 sm:text-4xl sm:leading-tight text-indigo-500">
            Exceptional Data  Statistics
          </h2>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8 lg:mt-16">
          <div className="relative overflow-hidden rounded-xl shadow border-t-4 border-indigo-200 bg-white">
            <div className="py-10 px-6">
              <div className="flex items-center">
                <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                  <span className="absolute -top-4 h-2 w-full bg-indigo-500" />
                  150
                </h3>
                <span className="ml-3 text-base font-medium capitalize">
                  Hotels Featured
                </span>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl shadow border-t-4 border-indigo-200 bg-white">
            <div className="py-10 px-6">
              <div className="flex items-center">
                <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                  <span className="absolute -top-4 h-2 w-full bg-indigo-500" />
                  75
                </h3>
                <span className="ml-3 text-base font-medium capitalize">
                  Resorts Listed
                </span>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl shadow border-t-4 border-indigo-200 bg-white">
            <div className="py-10 px-6">
              <div className="flex items-center">
                <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                  <span className="absolute -top-4 h-2 w-full bg-indigo-500" />
                  500+
                </h3>
                <span className="ml-3 text-base font-medium capitalize">
                  Rooms Available
                </span>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl shadow border-t-4 border-indigo-200 bg-white">
            <div className="py-10 px-6">
              <div className="flex items-center">
                <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                  <span className="absolute -top-4 h-2 w-full bg-indigo-500" />
                  98%
                </h3>
                <span className="ml-3 text-base font-medium capitalize">
                  Guest Reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainStats;
