import React from "react";

import CalendarHeatMap from "./CalendarHeatMapPkg/index";
import "./CalendarHeatMapPkg/styles.css";

export default function HeatMap() {
  return (
    <div>
      <CalendarHeatMap
        startDate={new Date("2016-01-01")}
        endDate={new Date("2016-04-01")}
        values={[
          { date: "2016-01-01", count: 12 },
          { date: "2016-01-22", count: 122 },
          { date: "2016-01-30", count: 38 },
        ]}
      />
    </div>
  );
}
