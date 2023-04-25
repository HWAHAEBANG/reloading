import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import darkUnica from "highcharts/themes/dark-unica";

// 테마 설정
darkUnica(Highcharts);
// polar 차트를 사용하기 위해 highcharts-more 라이브러리 추가
highchartsMore(Highcharts);

export default function PolarChart() {
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
      x: -0,
    },
    subtitle: {
      text: "중심에서 멀수록 투자 적기",
    },
    pane: {
      size: "80%",
    },
    xAxis: {
      categories: [
        "매매 거래량",
        "주간 매매가 변동율",
        "미분양",
        "전세가율",
        "HAI",
        "PIR",
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
        data: [43000, 19000, 60000, 35000, 17000, 10000],
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
