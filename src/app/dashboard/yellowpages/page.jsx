

"use client";
import React, { useEffect, useState } from "react";
import MainButtons from "@/components/MainButtons";
import PageTitle from "@/components/PageTitle";
import { BACKEND_URL } from "@/components/ui/Login";
import YellowTablePaginator from "@/components/YellowTablePaginator";
import Loader from "@/components/ui/Loader";
import CustomPagination from "@/components/ui/CustomPagination";
import { ModalProvider } from "@/components/ui/TableModal";
import { Toaster } from "react-hot-toast";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Dropdown from "@/components/ui/DropDown";


const fetchTableData = async (page = 1, limit = 10, filter = "null") => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/scraper/grants_gov/paginate?page=${page}&limit=${limit}&filterBy=${filter}`
    );
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("Fetch failed, using dummy data", error);
    // Dummy data for development/testing
    return {
      total_pages: 3,
      data: Array.from({ length: 10 }).map((_, i) => ({
        id: i + 1,
        "Opportunity Title": `Opportunity ${i + 1}`,
        "Opportunity Number": `OPP-${1000 + i}`,
        "Posted Date": `2025-11-${10 + i}`,
        "Close Date": `2025-12-${10 + i}`,
        "Opportunity Status": "Pending",
        status: "N/A",
        categories: "Education",
        source: "Grants.gov",
        url: "https://www.example.com",
      })),
    };
  }
};


export default function Page() {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("null"); // New state for filter

  useEffect(() => {
    const loadTableData = async () => {
      setLoading(true);
      const { data, total_pages } = await fetchTableData(
        page + 1,
        rowsPerPage,
        filter
      );

      setData(data);
      setTotalCount(total_pages);
      setLoading(false);
    };

    loadTableData();
  }, [page, rowsPerPage, filter]); // Added filter to dependency array

  const handleChangePage = (event, newPage) => {
    setPage(event);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(0); // Reset to first page when filter changes
  };

  const totalPages = Math.ceil(totalCount / rowsPerPage);

  return (
    <div className="bg-indigo-50/70 h-auto ">
      <div>
        <PageTitle text={"Yellow Pages"} />
        <div className="bg-white m-1 md:m-6 border rounded-md ">
          <MainButtons scriptName={"yellowpages"} />
          <div className="mt-4 md:mt-0">
            <Dropdown filter={filter} onFilterChange={handleFilterChange} />
          </div>

          <ModalProvider>
            <YellowTablePaginator
              data={data}
              totalCount={totalCount}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </ModalProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <CustomPagination
            page={page}
            totalPages={totalCount}
            onChangePage={handleChangePage}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
