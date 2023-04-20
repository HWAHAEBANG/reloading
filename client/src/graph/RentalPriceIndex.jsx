import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function RentalPriceIndex() {
  const options = {
    chart: {
      type: "area",
      height: 400,
    },
    title: {
      text: "Average fruit consumption during one week",
    },
    xAxis: {
      categories: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      tickmarkPlacement: "on",
      title: {
        enabled: false,
      },
    },
    yAxis: {
      title: {
        text: "Fruit units",
      },
    },
    tooltip: {
      split: true,
      valueSuffix: " units",
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "John",
        data: [3, 4, 3, 5, 4, 10, 12],
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
