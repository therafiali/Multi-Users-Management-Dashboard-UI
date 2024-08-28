"use client";
import React from "react";
import PageTitle from "@/components/PageTitle";
import TableStats from "@/components/ui/Widgets/TableStats";
import UserTableStats from "@/components/ui/Widgets/UserTableStats";
import MainStats from "@/components/ui/Widgets/MainStats";
import CrossHair from "@/components/ui/Graphs/CrossHair";
import ChartsOverviewDemo from "@/components/ui/ChartsOverviewDemo";
import CustomLineChart from "@/components/charts/LabelLineChart";
import PieAnimation from "@/components/charts/MuiCircleChat";
import SameDataComposed from "@/components/charts/SameDataComposed";
import BrushBarChart from "@/components/charts/BrushBarChart";

function Page() {
  return (
    <div className="bg-indigo-50/70 h-full">
      <PageTitle text={"Dashboard"} />
      <div className="mt-4 sm:mt-0">
        <div className="flex  space-x-4 mt-8 mx-1">
          {/* <CrossHair/> */}
          {/* <UserTableStats /> */}
          {/* <TableStats /> */}
          {/* <MainStats/> */}
 

          {/* <BasicPi /> */}
          <p className="w-2/5   m-0 p-2    bg-white  border rounded-md">
            <SameDataComposed />
          </p>
          <p className="w-3/5   m-0 p-2   bg-white  border rounded-md">
            <PieAnimation />
          </p>
          {/* <p className="w-full  m-0    bg-white  border rounded-md ">
            <CustomLineChart />
          </p>
          <p className="w-full  m-0    bg-white  border rounded-md">
            <BrushBarChart /> */}
          {/* </p> */}
        </div>
        <div className=" flex flex-col sm:flex-row sm:flex-wrap justify-center items-center  space-y-4 sm:space-y-0 sm:space-x-4">
          <MainStats />
        </div>
      </div>
    </div>
  );
}

export default Page;
