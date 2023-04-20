import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
import darkUnica from "highcharts/themes/dark-unica";
import "./unsoldHouse.css";
import axios from "axios";

highchartsMore(Highcharts);
solidGauge(Highcharts);
darkUnica(Highcharts);

export default function UnsoldHouse() {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/unsoldHouse`, { withCredentials: true })
      .then((response) => {
        console.log("확인2", response.data.data);
        setData(response.data.data);
      });
  }, []);

  const options = {
    chart: {
      zoomType: "x",
      backgroundColor: "transparent",
    },
    title: {
      text: "수도권 미분양 물량 추이",
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: [
      {
        title: {
          text: "호",
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
      shared: true,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
      line: {
        lineWidth: 1,
      },
    },
    series: [
      {
        type: "area",
        name: "USD to EUR",
        data: data,
      },
      {
        type: "line",
        name: "전년도 대비 증감율",
        yAxis: 1,
        data: data,
        tooltip: {
          valueSuffix: "%",
        },
      },
      {
        type: "line",
        name: "전년도 대비 증감율",
        yAxis: 1,
        data: data,
        tooltip: {
          valueSuffix: "%",
        },
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
