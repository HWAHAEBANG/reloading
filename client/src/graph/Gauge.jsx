import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import RingLoader from "react-spinners/RingLoader";

export default function Gauge() {
  // loading ===========================
  const loaderBox = {
    display: "flex",
    justifyContents: "center",
    alignItems: "center",
    height: "250px",
  };

  const override = {
    display: "block",
    margin: "auto",
  };

  const [loading, setLoading] = useState(false);
  // ===================================

  const options = {
    chart: {
      type: "gauge",
      backgroundColor: "transparent",
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },
    title: {
      text: "부동산 시장 과열 지수",
      floating: true,
      x: 0, // x값을 설정하여 가로 방향으로 이동시킵니다.
      y: 10, // y값을 설정하여 세로 방향으로 이동시킵니다.
    },
    pane: {
      startAngle: -100,
      endAngle: 100,
      background: [
        {
          borderWidth: 0,
          backgroundColor: "transparent",
          outerRadius: "109%",
          innerRadius: "107%",
        },
        {
          borderWidth: 0,
          backgroundColor: "transparent",
          outerRadius: "107%",
          innerRadius: "105%",
        },
        {
          borderWidth: 0,
          backgroundColor: "transparent",
          outerRadius: "79%",
          innerRadius: "77%",
        },
      ],
      size: "80%",
    },

    // 차트 데이터 설정
    yAxis: {
      min: 0,
      max: 100,
      lineColor: "#FFF",
      tickColor: "#FFF",
      minorTickColor: "#FFF",
      offset: -25,
      lineWidth: 2,
      labels: {
        distance: -20,
        rotation: "auto",
        style: {
          color: "#FFF",
        },
      },
      tickLength: 5,
      minorTickLength: 5,
      endOnTick: false,
      plotBands: [
        {
          from: 0,
          to: 20,
          color: "#4282ef", // blue
          thickness: 20,
        },
        {
          from: 20,
          to: 40,
          color: "#42c4ef", // sky
          thickness: 20,
        },
        {
          from: 40,
          to: 60,
          color: "#55BF3B", // green
          thickness: 20,
        },
        {
          from: 60,
          to: 80,
          color: "#DDDF0D", // yellow
          thickness: 20,
        },
        {
          from: 80,
          to: 100,
          color: "#DF5353", // red
          thickness: 20,
        },
      ],
    },

    series: [
      {
        name: "Speed",
        data: [30],
        tooltip: {
          valueSuffix: " km/h",
        },
        // 차트 색상 설정
        dial: {
          backgroundColor: "#666",
          baseLength: "80%",
          baseWidth: 2,
          radius: "100%",
          rearLength: "0%",
          topWidth: 1,
          borderColor: "#DDD",
          borderWidth: 1,
          pivotRadius: 5,
          pivotBackgroundColor: "#FFF",
          pivotBorderColor: "#000",
          pivotBorderWidth: 2,
        },
        pivot: {
          backgroundColor: "#DDD",
          radius: 6,
        },
        dataLabels: {
          enabled: false,
        },
      },
    ],
  };

  return (
    <div>
      {loading ? (
        <div style={loaderBox}>
          <RingLoader
            color='#36d7b7'
            loading={loading}
            cssOverride={override}
            size={200}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        </div>
      ) : (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
}

// const options = {
//   chart: {
//     type: "gauge",
//     plotBackgroundColor: null,
//     plotBackgroundImage: null,
//     plotBorderWidth: 0,
//     plotShadow: false,
//     backgroundColor: "transparent",
//     style: {
//       width: "100%",
//       height: "100%",
//     },
//   },

//   title: {
//     text: "시장 과열 척도",
//   },

//   pane: {
//     startAngle: -90,
//     endAngle: 89.9,
//     background: null,
//     center: ["50%", "75%"],
//     size: "80%",
//   },

//   // the value axis
//   yAxis: {
//     min: 0,
//     max: 100,
//     tickPixelInterval: 45,
//     tickPosition: "inside",
//     tickColor: Highcharts.defaultOptions.chart.backgroundColor || "#FFFFFF",
//     tickLength: 20,
//     tickWidth: 2,
//     minorTickInterval: null,
//     labels: {
//       distance: 20,
//       style: {
//         fontSize: "14px",
//       },
//     },
// plotBands: [
//   {
//     from: 0,
//     to: 20,
//     color: "#4282ef", // blue
//     thickness: 20,
//   },
//   {
//     from: 20,
//     to: 40,
//     color: "#42c4ef", // sky
//     thickness: 20,
//   },
//   {
//     from: 40,
//     to: 60,
//     color: "#55BF3B", // green
//     thickness: 20,
//   },
//   {
//     from: 60,
//     to: 80,
//     color: "#DDDF0D", // yellow
//     thickness: 20,
//   },
//   {
//     from: 80,
//     to: 100,
//     color: "#DF5353", // red
//     thickness: 20,
//   },
// ],
// },

//   series: [
//     {
//       name: "Speed",
//       data: [20],
//       tooltip: {
//         valueSuffix: "", // km/h
//       },
//       dataLabels: {
//         format: "{y}", //km/ha
//         borderWidth: 0,
//         color:
//           (Highcharts.defaultOptions.title &&
//             Highcharts.defaultOptions.title.style &&
//             Highcharts.defaultOptions.title.style.color) ||
//           "#333333",
//         style: {
//           fontSize: "16px",
//         },
//       },
//       dial: {
//         radius: "80%",
//         backgroundColor: "gray",
//         baseWidth: 12,
//         baseLength: "0%",
//         rearLength: "0%",
//       },
//       pivot: {
//         backgroundColor: "gray",
//         radius: 6,
//       },
//     },
//   ],
// };
