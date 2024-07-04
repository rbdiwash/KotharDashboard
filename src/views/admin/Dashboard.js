import React from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import HeaderStats from "components/Headers/HeaderStats";
import CardTable from "components/Cards/CardTable";
import ProfitLossTable from "components/ProfitLossTable";

export default function Dashboard() {
  return (
    <>
      <HeaderStats />
      <div className="px-4 md:px-10 mx-auto w-full -m-24 dashBody  md:min-h-screen mb-24 lg:mb-0">
        <div className="flex flex-wrap">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardLineChart />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardBarChart />
          </div>
        </div>
        <div className="flex flex-wrap mt-2">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <ProfitLossTable />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            {/* <CardSocialTraffic /> */}
            <CardPageVisits />
          </div>
        </div>
      </div>
    </>
  );
}
