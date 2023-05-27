import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import RingLoader from "react-spinners/RingLoader";

export default function JeonsePriceRatio() {
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
  const [jeonsePriceRatioData, setJeonsePriceRatioData] = useState();
  const [housePriceIndexData, setHousePriceIndexData] = useState();
  const [jeonsePriceIndexData, setJeonsePriceIndexData] = useState();

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:5000/allCharts/jeonsePriceRatio`, {
        withCredentials: true,
      }),
      axios.get(`http://localhost:5000/allCharts/housePriceIndexSeoul`, {
        withCredentials: true,
      }),
      axios.get(`http://localhost:5000/allCharts/JeonsePriceIndexSeoul`, {
        withCredentials: true,
      }),
    ])
      .then((responses) => {
        const jeonsePriceRatioResponse = responses[0];
        const housePriceIndexResponse = responses[1];
        const jeonsePriceIndexResponse = responses[2];

        setJeonsePriceRatioData(jeonsePriceRatioResponse.data.data);
        setHousePriceIndexData(housePriceIndexResponse.data.data);
        setJeonsePriceIndexData(jeonsePriceIndexResponse.data.data);
        // 추가 작업을 수행할 수 있습니다.

        setLoading(false);
      })
      .catch((error) => {
        // 에러 처리
        console.error(error);
        setLoading(false);
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
      {
        name: "서울 아파트 매매 지수", // 지역이름 변수로 놓자
        type: "line",
        data: housePriceIndexData,
        tooltip: {
          valueSuffix: "%",
        },
      },
      {
        name: "서울 아파트 전세 지수", // 지역이름 변수로 놓자
        type: "line",
        data: jeonsePriceIndexData,
        tooltip: {
          valueSuffix: "%",
        },
      },
    ],
  };

  console.log("매매", housePriceIndexData);
  console.log("전세", jeonsePriceIndexData);

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
