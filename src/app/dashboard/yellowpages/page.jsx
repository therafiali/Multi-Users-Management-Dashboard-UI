"use client";
import TableDemo from "@/components/ui/TableDemo";
import MainButtons from "@/components/MainButtons";
import PageTitle from "@/components/PageTitle";
import { MultiStepLoader as Loader } from "@/components/ui/MultiStepLoader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { useState } from "react";
import PageTables from "@/components/ui/PageTables";



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

export default function Page() {
  const [btnStatus, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const ChangeButtonStatus = () => {
    setStatus((prevStatus) => !prevStatus);
    if (!btnStatus) {
      setLoading(true);
    }
  }

  return (
    <div className="bg-indigo-50/70 h-auto ">
      <div>
        <PageTitle text={"Yellow pages"} />

        <div className="bg-white m-2 sm:m-6 border rounded-md ">
          <MainButtons />
          {/* <TableDemo data={tableData} /> */}
          <PageTables/>
        </div>
      </div>
    </div>
  );
};

