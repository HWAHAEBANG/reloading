import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function PriceChangeRate() {
  const options = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: "Column chart with negative values",
    },
    xAxis: {
      categories: ["Apples", "Oranges", "Pears", "Grapes", "Bananas"],
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "John",
        data: [5, 3, 4, 7, 2],
      },
      {
        name: "Jane",
        data: [2, -2, -3, 2, 1],
      },
      {
        name: "Joe",
        data: [3, 4, 4, -2, 5],
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
