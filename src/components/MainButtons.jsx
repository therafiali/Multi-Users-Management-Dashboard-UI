"use client";
import { FolderDown, Pause, Play, SendHorizontal, Trash } from "lucide-react";
import { MultiStepLoader as Loader } from "@/components/ui/MultiStepLoader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { useRef, useState } from "react";
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
} from "@/components/ui/MainButtonTrigger";

const MainButtons = () => {
  const loadingStates = [
    {
      text: "Server is Up",
    },
    {
      text: "Minining is Started",
    },
    {
      text: "Data Collection Started",
    },
    {
      text: "Data Approving",
    },
    {
      text: "56% is Approved",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [btnStatus, setStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const timeoutRef = useRef(null);

  function ChangeButtonStatus() {
    setStatus((prevStatus) => !prevStatus);
    if (!btnStatus) {
      setLoading(true);
      setIsModalOpen(true); // Open the modal when starting new loading
    } else {
      // Stop loading and close the modal immediately
      setLoading(false);
      setIsModalOpen(false);

      // Clear existing timeout to avoid unwanted behavior
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }

  function handleLoadingComplete() {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a timeout to close the modal after a delay
    timeoutRef.current = setTimeout(() => {
      setStatus(false);
      setIsModalOpen(false); // Close the modal after the delay
    }, 2000); // 2000 ms = 2 seconds delay
  }

  return (
    <div className="flex justify-between items-center py-6 px-6 ">
      <div className="flex space-x-2">
        <div className="flex flex-col sm:flex-row   sm:space-y-0 ">
          {isModalOpen && (
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <ModalTrigger>
                <Loader
                  loadingStates={loadingStates}
                  loading={loading}
                  duration={2000}
                  onComplete={handleLoadingComplete}
                />
              </ModalTrigger>
              <ModalBody>
                <div className="h-96 relative ">
                  <Loader
                    loadingStates={loadingStates}
                    loading={loading}
                    duration={2000}
                    onComplete={handleLoadingComplete}
                  />
                </div>
              </ModalBody>
            </Modal>
          )}


          {loading &&
            btnStatus && ( // Only show the close button when loading and btnStatus is true
              <button
                className="fixed top-4 right-4 text-black dark:text-white z-[120]"
                onClick={() => {
                  setLoading(false);
                  setIsModalOpen(false); // Close modal immediately
                }}
              >
                <IconSquareRoundedX className="h-10 w-10" />
              </button>
            )}
          <div className="flex flex-col sm:flex-row  space-y-2  sm:space-y-0 sm:space-x-4  ">
          <div>
            <button
              onClick={ChangeButtonStatus}
              className="flex justify-center items-center space-x-2 px-1 py-1 sm:px-2 sm:py-2 rounded-md text-sm sm:text-lg bg-indigo-500 text-white font-semibold tracking-wide transition duration-200 hover:bg-white hover:text-indigo-500 border-2 border-transparent hover:border-indigo-500 "
            >
              <div className="">
                {btnStatus === false ? <Play /> : <Pause />}
              </div>
              <div>{btnStatus === false ? "Start" : "Stop"}</div>
            </button>
          </div>
            <button className="flex justify-center items-center space-x-2 px-1 py-1 sm:px-2 sm:py-2 rounded-md text-sm sm:text-lg bg-indigo-500 text-white font-semibold tracking-wide transition duration-200 hover:bg-white hover:text-indigo-500 border-2 border-transparent hover:border-indigo-500 ">
              <SendHorizontal />
              <span>Send</span>
            </button>

            <button className="hidden sm:flex justify-center items-center space-x-2 px-1 py-1 sm:px-2 sm:py-2 rounded-md text-sm sm:text-lg bg-indigo-500 text-white font-semibold tracking-wide transition duration-200 hover:bg-white hover:text-indigo-500 border-2 border-transparent hover:border-indigo-500">
              <Trash />
              <span>Delete</span>
            </button>

            <button className="hidden sm:flex justify-center items-center space-x-2 px-1 py-1 sm:px-2 sm:py-2 rounded-md text-sm sm:text-lg bg-indigo-500 text-white font-semibold tracking-wide transition duration-200 hover:bg-white hover:text-indigo-500 border-2 border-transparent hover:border-indigo-500">
              <FolderDown />
              <span>Export</span>
            </button>
          </div>
        </div>
        <div className="sm:hidden flex flex-col space-y-2 ">
          <button className="flex justify-center items-center space-x-2 px-1 py-1 sm:px-2 sm:py-2 rounded-md text-sm sm:text-lg bg-indigo-500 text-white font-semibold tracking-wide transition duration-200 hover:bg-white hover:text-indigo-500 border-2 border-transparent hover:border-indigo-500">
            <Trash />
            <span>Delete</span>
          </button>

          <button className="flex justify-center items-center space-x-2 px-1 py-1 sm:px-2 sm:py-2 rounded-md text-sm sm:text-lg bg-indigo-500 text-white font-semibold tracking-wide transition duration-200 hover:bg-white hover:text-indigo-500 border-2 border-transparent hover:border-indigo-500">
            <FolderDown />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className=" flex justify-center items-center space-x-8">
        {/* <button className=" px-8 py-2 rounded-md bg-indigo-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-indigo-500">
        Status
      </button> */}
        <p className="font-semibold text-sm">Status</p>
        <div
          className={`${
            btnStatus === false ? "bg-red-500" : "bg-emerald-500"
          } w-5 h-5 rounded-full flex flex-col items-center justify-center ml-2 mt-1`}
        >
          <p
            className={` ${
              btnStatus === false ? "bg-red-500" : "bg-emerald-500"
            } w-5 h-5 rounded-full animate-ping  `}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default MainButtons;

// "use client";
// import { useState, useRef } from "react";
// import { MultiStepLoader as Loader } from "@/components/ui/MultiStepLoader";
// import { IconSquareRoundedX } from "@tabler/icons-react";
// import { Modal, ModalTrigger, ModalBody, ModalContent } from "@/components/ui/animated-modal";
// import { FolderDown, Pause, Play, SendHorizontal, Trash } from "lucide-react";

// const MainButtons = () => {
//   const loadingStates = [
//     { text: "Server is Up" },
//     { text: "Mining is Started" },
//     { text: "Data Collection Started" },
//     { text: "Data Approving" },
//     { text: "56% is Approved" },
//   ];

// const [loading, setLoading] = useState(false);
// const [btnStatus, setStatus] = useState(false);
// const [isModalOpen, setIsModalOpen] = useState(true);
// const timeoutRef = useRef(null);

// function ChangeButtonStatus() {
//   setStatus((prevStatus) => !prevStatus);
//   if (!btnStatus) {
//     setLoading(true);
//     setIsModalOpen(true); // Open the modal when starting new loading
//   } else {
//     // Stop loading and close the modal immediately
//     setLoading(false);
//     setIsModalOpen(false);

//     // Clear existing timeout to avoid unwanted behavior
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//   }
// }

// function handleLoadingComplete() {
//   // Clear any existing timeout
//   if (timeoutRef.current) {
//     clearTimeout(timeoutRef.current);
//   }

//   // Set a timeout to close the modal after a delay
//   timeoutRef.current = setTimeout(() => {
//     setStatus(false)
//     setIsModalOpen(false); // Close the modal after the delay
//   }, 2000); // 2000 ms = 2 seconds delay
// }

// return (
//   <div className="flex justify-between items-center py-6 px-6">
//     <div className="flex space-x-2">
//       <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
//         {/* Modal component with loader */}
//         {isModalOpen && (
//           <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
//             <ModalTrigger>
//               <Loader
//                 loadingStates={loadingStates}
//                 loading={loading}
//                 duration={2000}
//                 onComplete={handleLoadingComplete}
//               />
//             </ModalTrigger>
//             <ModalBody>
//               <div className="h-96 relative">
//                 <Loader
//                   loadingStates={loadingStates}
//                   loading={loading}
//                   duration={2000}
//                   onComplete={handleLoadingComplete}
//                 />
//               </div>
//             </ModalBody>
//             <ModalContent>
//               {/* Optional content */}
//             </ModalContent>
//           </Modal>
//         )}

//         <button
//           onClick={ChangeButtonStatus}
//           className="flex justify-center items-center space-x-2 px-1 py-1 sm:px-2 sm:py-2 rounded-md text-sm sm:text-lg bg-indigo-500 text-white font-semibold tracking-wide transition duration-200 hover:bg-white hover:text-indigo-500 border-2 border-transparent hover:border-indigo-500"
//         >
//           <div className="">{btnStatus === false ? <Play /> : <Pause />}</div>
//           <div>{btnStatus === false ? "Start" : "Stop"}</div>
//         </button>
//         {loading && btnStatus && ( // Only show the close button when loading and btnStatus is true
//           <button
//             className="fixed top-4 right-4 text-black dark:text-white z-[120]"
//             onClick={() => {
//               setLoading(false);
//               setIsModalOpen(false); // Close modal immediately
//             }}
//           >
//             <IconSquareRoundedX className="h-10 w-10" />
//           </button>
//         )}
//       </div>
//     </div>
//   </div>
// );
// };

// export default MainButtons;
