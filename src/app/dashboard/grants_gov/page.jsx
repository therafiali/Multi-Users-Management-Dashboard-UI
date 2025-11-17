"use client";
import MainButtons from "@/components/MainButtons";
import PageTitle from "@/components/PageTitle";
import { useEffect, useState } from "react";
import GrantsgovTablePaginator from "@/components/GrantsgovTablePagination";
import CustomPagination from "@/components/ui/CustomPagination";
import { ModalProvider } from "@/components/ui/TableModal";
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
  const [filter, setFilter] = useState("null");

  useEffect(() => {
    const loadTableData = async () => {
      const result = await fetchTableData(page + 1, rowsPerPage, filter);
      setData(result.data);
      setTotalCount(result.total_pages);
    };
    loadTableData();
  }, [page, rowsPerPage, filter]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(0);
  };

  return (
    <div className="bg-indigo-50/70 h-auto">
      <PageTitle text={"Grants Gov"} />
      <div className="bg-white m-6 border rounded-md">
        <MainButtons scriptName={"grants_gov"} />

        <div className="mt-4 md:mt-0">
          <Dropdown filter={filter} onFilterChange={handleFilterChange} />
        </div>

        <ModalProvider>
          <GrantsgovTablePaginator
            data={data}
            totalCount={totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </ModalProvider>

        <CustomPagination
          page={page}
          totalPages={totalCount}
          onChangePage={handleChangePage}
          loading={false}
        />
      </div>
    </div>
  );
}
