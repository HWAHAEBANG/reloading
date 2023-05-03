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
  const [unsoldHouseData, setUnsoldHouseData] = useState();
  const [housePriceIndexData, setHousePriceIndexData] = useState();
  const [rentalPriceIndexData, setRentalPriceIndexData] = useState();

  useEffect(() => {
    axios
      .get(`https://reloading1.herokuapp.com/unsoldHouse`, {
        withCredentials: true,
      })
      .then((response) => {
        setUnsoldHouseData(response.data.data);
      });

    axios
      .get(`https://reloading1.herokuapp.com/housePriceIndexAroundSeoul`, {
        withCredentials: true,
      })
      .then((response) => {
        setHousePriceIndexData(response.data.data);
      });

    axios
      .get(`https://reloading1.herokuapp.com/rentalPriceIndexAroundSeoul`, {
        withCredentials: true,
      })
      .then((response) => {
        setRentalPriceIndexData(response.data.data);
      });
  }, []);

  const getAverage = (arr) => {
    const sum = arr.reduce((acc, cur) => acc + cur[1], 0);
    const avg = sum / arr.length;
    return avg;
  };

  const standard =
    unsoldHouseData && unsoldHouseData.map((item) => [item[0], 15000]);

  const options = {
    chart: {
      zoomType: "x",
      backgroundColor: "transparent",
      // height: "90%", // 필요없음. 아니 없어야됨
      // width: "100%",
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
        name: "미분양 물량",
        data: unsoldHouseData,
        tooltip: {
          valueSuffix: "호",
        },
      },
      {
        type: "line",
        name: "수도권 아파트 매매지수",
        yAxis: 1,
        data: housePriceIndexData,
        tooltip: {
          valueSuffix: "%",
        },
      },
      {
        type: "line",
        name: "수도권 아파트 전세지수",
        yAxis: 1,
        data: rentalPriceIndexData,
        tooltip: {
          valueSuffix: "%",
        },
      },
      {
        type: "line",
        name: "너나위님 기준",
        yAxis: 0,
        data: standard,
        tooltip: {
          valueSuffix: "호",
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
