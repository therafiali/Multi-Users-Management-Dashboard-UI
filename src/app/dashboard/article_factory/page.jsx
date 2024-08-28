"use client";
import TableDemo from "@/components/ui/TableDemo";
import MainButtons from "@/components/MainButtons";
import PageTitle from "@/components/PageTitle";
import { useEffect, useState } from "react";
import PageTables from "@/components/ui/PageTables";
import { BACKEND_URL } from "@/components/ui/Login";
import DataTable from "@/components/ui/ScraperTableData";

// const tableData = [
//   {
//     businessName: "Business Name",
//     address: "Address",
//     type: "Passport",
//     receiveDate: "18 Dec, 2019 01:02 PM",
//     status: "Approved",
//     checkedBy: { initials: "JS", name: "Janet Snyder" },
//   },
//   {
//     businessName: "Business Name",
//     address: "Address",
//     type: "Passport",
//     receiveDate: "18 Dec, 2019 01:02 PM",
//     status: "Approved",
//     checkedBy: { initials: "JS", name: "Janet Snyder" },
//   },
//   {
//     businessName: "Business Name",
//     address: "Address",
//     type: "Passport",
//     receiveDate: "18 Dec, 2019 01:02 PM",
//     status: "Approved",
//     checkedBy: { initials: "JS", name: "Janet Snyder" },
//   },
//   {
//     businessName: "Business Name",
//     address: "Address",
//     type: "Passport",
//     receiveDate: "18 Dec, 2019 01:02 PM",
//     status: "Approved",
//     checkedBy: { initials: "JS", name: "Janet Snyder" },
//   },
//   {
//     businessName: "Business Name",
//     address: "Address",
//     type: "Passport",
//     receiveDate: "18 Dec, 2019 01:02 PM",
//     status: "Approved",
//     checkedBy: { initials: "JS", name: "Janet Snyder" },
//   },
//   {
//     businessName: "Business Name",
//     address: "Address",
//     type: "Passport",
//     receiveDate: "18 Dec, 2019 01:02 PM",
//     status: "Approved",
//     checkedBy: { initials: "JS", name: "Janet Snyder" },
//   },
//   {
//     businessName: "Business Name",
//     address: "Address",
//     type: "Passport",
//     receiveDate: "18 Dec, 2019 01:02 PM",
//     status: "Approved",
//     checkedBy: { initials: "JS", name: "Janet Snyder" },
//   },
//   // ... more data objects
// ];

export default function Page() {
  const [btnStatus, setStatus] = useState(false);
  const [scrapeData, setScrapeData] = useState("");

  // const [loading, setLoading] = useState(false);

  // const ChangeButtonStatus = () => {
  //   setStatus((prevStatus) => !prevStatus);
  //   if (!btnStatus) {
  //     setLoading(true);
  //   }
  // }

  async function fetchData() {
    try {
      const response = await fetch(
        `${BACKEND_URL}/scraper/yellowpages/paginate?page=1&limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
    
      return { error: error.message };
    }
  }
  useEffect(() => {
    async function loadData() {
      const result = await fetchData();
      if (result.error) {
       
      } else {
        setScrapeData(result.data);
     
      }
    }

    loadData();
  }, []);
  return (
    <div className="bg-indigo-50/70 h-auto ">
      <div>
        <PageTitle text={"Article Factory"} />

        <div className="bg-white m-6 border rounded-md ">
          <MainButtons />
          {/* <TableDemo data={tableData} /> */}
          {/* <PageTables /> */}
          <DataTable/>
        </div>
      </div>
    </div>
  );
}
