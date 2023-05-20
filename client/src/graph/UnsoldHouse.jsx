import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
import darkUnica from "highcharts/themes/dark-unica";
import "./unsoldHouse.css";
import axios from "axios";
import RingLoader from "react-spinners/RingLoader";

highchartsMore(Highcharts);
solidGauge(Highcharts);
darkUnica(Highcharts);

export default function UnsoldHouse() {
  // loading ===========================
  const loaderBox = {
    display: "flex",
    justifyContents: "center",
    alignItems: "center",
    height: "400px",
  };

  const override = {
    display: "block",
    margin: "auto",
  };

  const [loading, setLoading] = useState(true);
  // ===================================
  const [unsoldHouseData, setUnsoldHouseData] = useState();
  const [housePriceIndexData, setHousePriceIndexData] = useState();
  const [rentalPriceIndexData, setRentalPriceIndexData] = useState();

  useEffect(() => {
    Promise.all([
      axios.get(
        `http://reloading-env.eba-7nrbgs4x.ap-northeast-2.elasticbeanstalk.com/allCharts/unsoldHouse`,
        {
          withCredentials: true,
        }
      ),
      axios.get(
        `http://reloading-env.eba-7nrbgs4x.ap-northeast-2.elasticbeanstalk.com/allCharts/housePriceIndexAroundSeoul`,
        {
          withCredentials: true,
        }
      ),
      axios.get(
        `http://reloading-env.eba-7nrbgs4x.ap-northeast-2.elasticbeanstalk.com/allCharts/JeonsePriceIndexAroundSeoul`,
        {
          withCredentials: true,
        }
      ),
    ])
      .then((responses) => {
        const unsoldHouseResponse = responses[0];
        const housePriceIndexResponse = responses[1];
        const rentalPriceIndexResponse = responses[2];

        setUnsoldHouseData(unsoldHouseResponse.data.data);
        setHousePriceIndexData(housePriceIndexResponse.data.data);
        setRentalPriceIndexData(rentalPriceIndexResponse.data.data);

        // 추가 작업을 수행할 수 있습니다.

        setLoading(false);
      })
      .catch((error) => {
        // 에러 처리
        console.error(error);
        setLoading(false);
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
