import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

export default function JeonsePriceRatio() {
  const [jeonsePriceRatioData, setJeonsePriceRatioData] = useState();

  useEffect(() => {
    axios
      .get(
        `http://reloading-env.eba-7nrbgs4x.ap-northeast-2.elasticbeanstalk.com/jeonsePriceRatio`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setJeonsePriceRatioData(response.data.data);
      });
  }, []);

  // 중첩배열용
  const getAverage = (arr) => {
    const sum = arr.reduce((acc, cur) => acc + cur[1], 0);
    const avg = sum / arr.length;
    return avg;
  };

  const avg =
    jeonsePriceRatioData &&
    jeonsePriceRatioData.map((item) => [
      item[0],
      parseFloat(getAverage(jeonsePriceRatioData).toFixed(1)),
    ]);

  const options = {
    chart: {
      type: "area",
      backgroundColor: "transparent",
      // width: "100%",
      // height: "100%",
    },
    title: {
      text: "서울 전세가율",
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: [
      {
        title: {
          text: "Fruit units",
        },
      },
      // {
      //   title: {
      //     text: "전년도 대비 증감율 (%)",
      //   },
      //   opposite: true,
      // },
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
        type: "area",
        name: "서울 전세가율",
        // yAxis: 1,
        data: jeonsePriceRatioData,
        tooltip: {
          valueSuffix: "%",
        },
      },
      // {
      //   name: "John",
      //   data: [3, 4, 3, 5, 4, 10, 12],
      // },
      {
        name: "서울 전세가율 평균",
        type: "line", // 꺾은 선 그래프 추가
        data: avg,
        // yAxis: 1,
        tooltip: {
          valueSuffix: "%",
        },
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
