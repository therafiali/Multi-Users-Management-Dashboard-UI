"use client";
import TableDemo from "@/components/ui/TableDemo";
import MainButtons from "@/components/MainButtons";
import PageTitle from "@/components/PageTitle";
import { useState } from "react";
import PageTables from "@/components/ui/PageTables";

const tableData = [
  {
    businessName: "Business Name",
    address: "Address",
    type: "Passport",
    receiveDate: "18 Dec, 2019 01:02 PM",
    status: "Approved",
    checkedBy: { initials: "JS", name: "Janet Snyder" },
  },
  {
    businessName: "Business Name",
    address: "Address",
    type: "Passport",
    receiveDate: "18 Dec, 2019 01:02 PM",
    status: "Approved",
    checkedBy: { initials: "JS", name: "Janet Snyder" },
  },
  {
    businessName: "Business Name",
    address: "Address",
    type: "Passport",
    receiveDate: "18 Dec, 2019 01:02 PM",
    status: "Approved",
    checkedBy: { initials: "JS", name: "Janet Snyder" },
  },
  {
    businessName: "Business Name",
    address: "Address",
    type: "Passport",
    receiveDate: "18 Dec, 2019 01:02 PM",
    status: "Approved",
    checkedBy: { initials: "JS", name: "Janet Snyder" },
  },
  {
    businessName: "Business Name",
    address: "Address",
    type: "Passport",
    receiveDate: "18 Dec, 2019 01:02 PM",
    status: "Approved",
    checkedBy: { initials: "JS", name: "Janet Snyder" },
  },
  {
    businessName: "Business Name",
    address: "Address",
    type: "Passport",
    receiveDate: "18 Dec, 2019 01:02 PM",
    status: "Approved",
    checkedBy: { initials: "JS", name: "Janet Snyder" },
  },
  {
    businessName: "Business Name",
    address: "Address",
    type: "Passport",
    receiveDate: "18 Dec, 2019 01:02 PM",
    status: "Approved",
    checkedBy: { initials: "JS", name: "Janet Snyder" },
  },
  // ... more data objects
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
        <PageTitle text={"Grants Gov"} />

        <div className="bg-white m-6 border rounded-md ">
          <MainButtons />
          {/* <TableDemo data={tableData} /> */}
          <PageTables/>
        </div>
      </div>
    </div>
  );
};

