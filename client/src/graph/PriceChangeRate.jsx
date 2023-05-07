import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

export default function PriceChangeRate() {
  const [priceChangeRateData, setPriceChangeRateData] = useState();

  console.log(priceChangeRateData);

  useEffect(() => {
    axios
      .get(
        `http://reloading-env.eba-7nrbgs4x.ap-northeast-2.elasticbeanstalk.com/priceChangeRate`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // console.log("확인1", response.data.data);
        setPriceChangeRateData(response.data.data);
      });
  }, []);

  const options = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: "주간 매매가 증감률(변동률)",
    },
    xAxis: {
      type: "datetime",
      // categories: ["Apples", "Oranges", "Pears", "Grapes", "Bananas"],
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "주간 매매가 증감률(변동율)",
        type: "area",
        data: priceChangeRateData,
        tooltip: {
          valueSuffix: "%",
        },
      },
    ],
    plotOptions: {
      series: {
        borderWidth: 0,
      },
    },
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
