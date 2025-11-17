"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SendHorizontal, FolderDown } from "lucide-react";
import { MultiStepLoader as Loader } from "@/components/ui/MultiStepLoader";
import SettingsModal from "./ui/SettingsModal";
import { useRouter } from "next/navigation";

const MainButtons = ({ scriptName = "scriptName" }) => {
  const loadingStates = [
    { text: "Server is Up" },
    { text: "Mining is Started" },
    { text: "Data Collection Started" },
    { text: "Data Approving" },
    { text: "93% is Approved" },
  ];

  const router = useRouter();
  const timeoutRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [btnStatus, setBtnStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scriptStatus, setScriptStatus] = useState("Not Started");

console.log("model", isModalOpen  )



  const handleStart = () => {
    setBtnStatus(true);
    setLoading(true);
    setIsModalOpen(true);
    setScriptStatus("Started");

    // Auto-close modal after 5 seconds
    // timeoutRef.current = setTimeout(() => {
    //   setLoading(false);
    //   setIsModalOpen(false);
    //   setScriptStatus("Completed");
    //   setBtnStatus(false);
    // }, 5000);
  };

  const handleSend = () => {
    router.push(`/dashboard/transfer/${scriptName}`);
  };

  const handleExport = () => {
    alert("Fake export: collection_data.csv");
  };

  return (
    <div className="flex justify-between items-center py-2 md:py-6 md:px-6">
      <div className="flex space-x-2">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <button
            onClick={handleStart}
            className="flex justify-center items-center space-x-2 px-2 py-2 rounded-md text-sm sm:text-lg bg-primaryColor text-white font-semibold tracking-wide transition duration-200 hover:bg-white hover:text-primaryColor border-2 border-transparent hover:border-primaryColor"
          >
            {btnStatus === false ? <Play /> : <Pause />}
            <span>{btnStatus === false ? "Start" : "Stop"}</span>
          </button>

          <SettingsModal />

          <button
            onClick={handleSend}
            className="flex justify-center items-center space-x-2 px-2 py-2 rounded-md text-sm sm:text-lg bg-primaryColor text-white font-semibold tracking-wide transition duration-200 hover:bg-white hover:text-primaryColor border-2 border-transparent hover:border-primaryColor"
          >
            <SendHorizontal />
            <span>Send</span>
          </button>

          <button
            onClick={handleExport}
            className="flex justify-center items-center space-x-2 px-2 py-2 rounded-md text-sm sm:text-lg bg-primaryColor text-white font-semibold tracking-wide transition duration-200 hover:bg-white hover:text-primaryColor border-2 border-transparent hover:border-primaryColor"
          >
            <FolderDown />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center space-x-4">
        <p className="font-semibold text-sm">Status:</p>
        <div className="flex items-center">
          <p className="capitalize">{scriptStatus}</p>
          <div
            className={`${
              btnStatus === false ? "bg-red-500" : "bg-emerald-500"
            } w-5 h-5 rounded-full flex items-center justify-center ml-2 mt-1`}
          >
            <p
              className={`${
                btnStatus === false ? "bg-red-500" : "bg-emerald-500"
              } w-5 h-5 rounded-full animate-ping`}
            ></p>
          </div>
        </div>
      </div>

      {/* Modal Loader */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-md p-4">
            <Loader
              loadingStates={loadingStates}
              loading={loading}
              duration={1000}
              onComplete={() => {
                setLoading(false);
                setIsModalOpen(false);
                setScriptStatus("Completed");
                setBtnStatus(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainButtons;
