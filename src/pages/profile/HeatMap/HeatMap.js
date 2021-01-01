import React, { useContext } from "react";

import { Container } from "@material-ui/core";
import ReactTooltip from "react-tooltip";

import CalendarHeatMap from "./CalendarHeatMapPkg/index";
import "./CalendarHeatMapPkg/styles.css";
import AppContext from "../../../context/AppContext";

export default function HeatMap() {
  const { userProgress } = useContext(AppContext);

  // We want two infos that are deprived from userProgress: how many lessons user has done on a specific day
  // The result object has the form of { [date] : [count] }
  // For example: {'2020-12-25':5, '2020-12-31':10}
  const dateCountObjectForm = userProgress.reduce((allDays, currentDay) => {
    if (currentDay.dateComplete.toDate().toLocaleDateString() in allDays) {
      allDays[currentDay.dateComplete.toDate().toLocaleDateString()] += 1;
    } else {
      allDays[currentDay.dateComplete.toDate().toLocaleDateString()] = 1;
    }

    return allDays;
  }, {});
  // Then we convert the objects above to correct form that can be input for CalendarHeatMap
  // Which is [{date: [date], count: [count]}]
  // For example, [{date: '2020-12-25', count: 5}, {date: '2020-12-31', count: 10}]
  const dateCountArrayForm = [];
  for (const property in dateCountObjectForm) {
    const createdObject = {
      date: property,
      count: dateCountObjectForm[property],
    };
    dateCountArrayForm.push(createdObject);
  }

  // These methods below are used for react-tooltip config
  const getTooltipDataAttrs = (value) => {
    // Temporary hack around null value.date issue
    if (!value || !value.date) {
      return null;
    }
    // Configuration for react-tooltip
    return {
      "data-tip": `${value.count} lessons done on ${value.date}`,
    };
  };

  return (
    <Container>
      <CalendarHeatMap
        values={dateCountArrayForm}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-github-${value.count}`;
        }}
        tooltipDataAttrs={getTooltipDataAttrs}
      />
      <ReactTooltip />
    </Container>
  );
}
