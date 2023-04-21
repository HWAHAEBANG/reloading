import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function RentalPriceIndex() {
  const options = {
    chart: {
      type: "area",
      height: 400,
      backgroundColor: "transparent",
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
    yAxis: [
      {
        title: {
          text: "Fruit units",
        },
      },
      {
        title: {
          text: "전년도 대비 증감율 (%)",
        },
        opposite: true,
      },
    ],
    tooltip: {
      split: true,
      valueSuffix: " units",
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "John",
        data: [3, 4, 3, 5, 4, 10, 12],
      },
      {
        name: "Sales",
        type: "line", // 꺾은 선 그래프 추가
        data: [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210],
        yAxis: 1,
        tooltip: {
          valueSuffix: "%",
        },
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
