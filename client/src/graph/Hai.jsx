import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
import darkUnica from "highcharts/themes/dark-unica";
import axios from "axios";
import { FcLeft } from "react-icons/fc";
import RingLoader from "react-spinners/RingLoader";

highchartsMore(Highcharts);
solidGauge(Highcharts);
darkUnica(Highcharts);

export default function Hai() {
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
  const [categories, setCategories] = useState();
  const [data, setData] = useState();

  const getAverage = (arr) => {
    const sum = arr.reduce((acc, cur) => acc + cur);
    const avg = sum / arr.length;
    return avg;
  };

  const average = new Array(data && data.length); // 데이터 개수만큼 빈 배열을 만들고
  data && average.fill(parseFloat(getAverage(data).toFixed(1))); // 평균으로 다 채운다. 원본을 수정함.
  //toFixed를 하면 문자열로 변환되는 것 주의!

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:5000/allCharts/hai`, {
        withCredentials: true,
      }),
    ])
      .then((responses) => {
        const haiResponse = responses[0];

        setCategories(haiResponse.data.categories);
        setData(haiResponse.data.data);

        // 추가 작업을 수행할 수 있습니다.

        setLoading(false);
      })
      .catch((error) => {
        // 에러 처리
        console.error(error);
        setLoading(false);
      });
  }, []);

  const options = {
    chart: {
      zoomType: "xy",
      backgroundColor: "transparent",
      style: {
        // position: "absolute",
        // top: 0,
        // left: 0,
        width: "100%",
        height: "100%",
        // margin: "0",
        // height: (3 / 4) * 200 + "%",
        // backgroundColor: "red",
      },
    },
    title: {
      text: "HAI : 연소득대비 주택 가격 비율 ",
    },
    subtitle: {
      text: "Housing Affordability Index",
    },
    xAxis: [
      {
        categories: categories,
        crosshair: true, // 뭘까
      },
    ],
    yAxis: [
      {
        // Primary yAxis
        labels: {
          // 좌축 눈금 단위
          format: "{value}°C",
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
        title: {
          // 좌측 눈금 이름
          text: "서울 매매지수",
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
      },
      {
        // Secondary yAxis
        title: {
          // 우측 눈금 이름
          text: "HAI",
          style: {
            color: Highcharts.getOptions().colors[0],
          },
        },
        labels: {
          // 우축 눈금 단위
          format: "{value}", //"{value} mm"
          style: {
            color: Highcharts.getOptions().colors[0],
          },
        },
        opposite: true,
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
      layout: "vertical",
      align: "left",
      x: 120,
      verticalAlign: "top",
      y: 100,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || // theme
        "rgba(255,255,255,0.25)",
    },
    series: [
      {
        name: "서울 HAI",
        type: "column",
        yAxis: 1,
        data: data,
        tooltip: {
          valueSuffix: "", //" mm"
        },
      },
      {
        name: "서울 매매 지수", // 지역이름 변수로 놓자
        type: "spline",
        data: [
          7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6,
        ],
        tooltip: {
          valueSuffix: "°C",
        },
      },
      {
        name: "기준 금리", // 지역이름 변수로 놓자
        type: "spline",
        data: [
          7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6,
        ].reverse(),
        tooltip: {
          valueSuffix: "°C",
        },
      },
      {
        name: "HAI평균", // 지역이름 변수로 놓자
        type: "spline",
        yAxis: 1, // 이거 있으면 좌측 눈금 따라가나보다!
        data: average,
        tooltip: {
          valueSuffix: "", //" mm"
        },
      },
    ],
    plotOptions: {
      series: {
        borderWidth: 0,
      },
    },
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
        <HighchartsReact
          highcharts={Highcharts}
          // constructorType={"MultipleAxes"}
          options={options}
        />
      )}
    </div>
  );
}
