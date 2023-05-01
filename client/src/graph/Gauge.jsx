import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function Gauge() {
  const options = {
    chart: {
      type: "gauge",
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      backgroundColor: "transparent",
      style: {
        width: "100%",
        height: "100%",
      },
    },

    title: {
      text: "시장 과열 척도",
    },

    pane: {
      startAngle: -90,
      endAngle: 89.9,
      background: null,
      center: ["50%", "75%"],
      size: "80%",
    },

    // the value axis
    yAxis: {
      min: -100,
      max: 100,
      tickPixelInterval: 45,
      tickPosition: "inside",
      tickColor: Highcharts.defaultOptions.chart.backgroundColor || "#FFFFFF",
      tickLength: 20,
      tickWidth: 2,
      minorTickInterval: null,
      labels: {
        distance: 20,
        style: {
          fontSize: "14px",
        },
      },
      plotBands: [
        {
          from: -100,
          to: -60,
          color: "#4282ef", // blue
          thickness: 20,
        },
        {
          from: -60,
          to: -20,
          color: "#42c4ef", // sky
          thickness: 20,
        },
        {
          from: -20,
          to: 20,
          color: "#55BF3B", // green
          thickness: 20,
        },
        {
          from: 20,
          to: 60,
          color: "#DDDF0D", // yellow
          thickness: 20,
        },
        {
          from: 60,
          to: 100,
          color: "#DF5353", // red
          thickness: 20,
        },
      ],
    },

    series: [
      {
        name: "Speed",
        data: [-60],
        tooltip: {
          valueSuffix: "", // km/h
        },
        dataLabels: {
          format: "{y}", //km/ha
          borderWidth: 0,
          color:
            (Highcharts.defaultOptions.title &&
              Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            "#333333",
          style: {
            fontSize: "16px",
          },
        },
        dial: {
          radius: "80%",
          backgroundColor: "gray",
          baseWidth: 12,
          baseLength: "0%",
          rearLength: "0%",
        },
        pivot: {
          backgroundColor: "gray",
          radius: 6,
        },
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
