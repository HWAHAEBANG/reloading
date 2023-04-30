import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import darkUnica from "highcharts/themes/dark-unica";

// 테마 설정
darkUnica(Highcharts);
// polar 차트를 사용하기 위해 highcharts-more 라이브러리 추가
highchartsMore(Highcharts);

export default function SpiderWebDemo() {
  const [mock, setMock] = useState([10000, 47000, 11000, 49000, 12000, 43000]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMock(
        MOCK_DATA_LIST[Math.floor(Math.random() * MOCK_DATA_LIST.length)]
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [mock]);

  useEffect(() => {
    // 차트 생성 후 DOM에 추가
    const chart = Highcharts.chart("polar-container", options);
    return () => {
      // 컴포넌트가 언마운트될 때 차트 제거
      chart.destroy();
    };
  }, []);
  const options = {
    chart: {
      polar: true,
      type: "line",
      backgroundColor: "transparent",
      style: {
        width: "100%",
        height: "100%",
      },
    },
    title: {
      text: "핵심 지표별 진행 상황",
      x: 0,
    },
    // subtitle: {
    //   text: "중심에서 멀수록 투자 적기",
    //   x: 0,
    // },
    pane: {
      size: "80%",
    },
    xAxis: {
      categories: [
        "매매 거래량",
        "PIR",
        "HAI",
        "주간 매매가 변동율",
        "전세가율",
        "미분양",
      ],
      tickmarkPlacement: "on",
      lineWidth: 0,
    },
    yAxis: {
      gridLineInterpolation: "polygon",
      lineWidth: 0,
      min: 0,
    },
    tooltip: {
      shared: true,
      pointFormat:
        "<span style='color:{series.color}'>{series.name}: <b>${point.y:,.0f}</b><br/>",
    },
    legend: {
      enabled: false,
      align: "right",
      verticalAlign: "top",
      y: 70,
      layout: "vertical",
    },
    series: [
      {
        name: "Allocated Budget",
        data: mock,
        pointPlacement: "on",
      },
      // {
      //   name: "Actual Spending",
      //   data: [50000, 39000, 42000, 31000, 26000, 14000],
      //   pointPlacement: "on",
      // },
    ],
  };

  return <div id='polar-container'></div>;
}

const ARR1 = [10000, 47000, 11000, 49000, 12000, 43000];
const ARR2 = [16000, 39000, 17000, 38000, 18000, 34000];
const ARR3 = [23000, 31000, 22000, 29000, 24000, 26000];
const ARR4 = [32000, 14000, 33000, 12000, 34000, 10000];
const ARR5 = [46000, 19000, 45000, 20000, 44000, 22000];
const ARR6 = [39000, 27000, 38000, 29000, 37000, 32000];
const ARR7 = [50000, 15000, 49000, 13000, 48000, 11000];

const MOCK_DATA_LIST = [ARR1, ARR2, ARR3, ARR4, ARR5, ARR6, ARR7];
