import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
import darkUnica from "highcharts/themes/dark-unica";
import axios from "axios";

highchartsMore(Highcharts);
solidGauge(Highcharts);
darkUnica(Highcharts);

export default function AmountAndPrice() {
  // const [categories, setCategories] = useState();
  const [pirData, setPirData] = useState();
  const [housePriceIndexData, setHousePriceIndexData] = useState();
  const [rentalPriceIndexData, setRentalPriceIndexData] = useState();
  const [jeonsePriceRatioData, setJeonsePriceRatioData] = useState();

  // //재사용 용
  // const getAverage = (arr) => {
  //   const sum = arr.reduce((acc, cur) => acc + cur);
  //   const avg = sum / arr.length;
  //   return avg;
  // };

  /**
   * 코드 서명
   *  받아온 배열 안에 배열에 중첩되어있으므로 위의 코드는 사용할 수 없다.
   *  아래와 같이 조금 변형해줘야한다.
   *  각 배열의 두번째 값의 평균을 구하고자 함으로 cur[1]을 해줘야한다.
   * 이때 주의할 점은 초기값으로 꼭 0을 넣어줘야한다는 것이다.
   * 그렇지않으면 acc의 초기값으로 첫번쨰 요소인 배열자료형이 들어가고,
   * 배열 + 숫자 가 연산되어 NaN가 나오기 때문이다.
   */

  // 재사용 불가
  const getAverage = (arr) => {
    const sum = arr.reduce((acc, cur) => acc + cur[1], 0);
    const avg = sum / arr.length;
    return avg;
  };

  const avg =
    pirData &&
    pirData.map((item) => [
      item[0],
      parseFloat(getAverage(pirData).toFixed(1)),
    ]);

  // console.log("pirData", pirData);
  // console.log("avg", avg);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/pir`, { withCredentials: true })
      .then((response) => {
        setPirData(response.data.data);
      });

    axios
      .get(`http://localhost:5000/housePriceIndexSeoul`, {
        withCredentials: true,
      })
      .then((response) => {
        setHousePriceIndexData(response.data.data);
      });

    axios
      .get(`http://localhost:5000/rentalPriceIndexSeoul`, {
        withCredentials: true,
      })
      .then((response) => {
        setRentalPriceIndexData(response.data.data);
      });

    axios
      .get(`http://localhost:5000/jeonsePriceRatio`, {
        withCredentials: true,
      })
      .then((response) => {
        setJeonsePriceRatioData(response.data.data);
      });
  }, []);

  const options = {
    chart: {
      zoomType: "xy",
      backgroundColor: "transparent",
      // width: "100%", ?
      // height: "100%", ?
    },
    title: {
      text: "서울 아파트 거래량과 가격지수",
    },
    // subtitle: {
    //   text: "Price to Income Ratio",
    // },
    xAxis: {
      type: "datetime",
    },
    yAxis: [
      {
        // Primary yAxis
        labels: {
          // 좌축 눈금 단위
          format: "{value}%",
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
        title: {
          // 좌측 눈금 이름
          text: "꺾은 선",
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
      },
      {
        // Secondary yAxis
        title: {
          // 우측 눈금 이름
          text: "PIR",
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
      // {
      //   name: "서울 PIR",
      //   type: "area",
      //   yAxis: 1,
      //   data: pirData,
      //   tooltip: {
      //     valueSuffix: "", //" mm"
      //   },
      // },
      // {
      //   name: "서울 전세가율",
      //   type: "spline",
      //   // yAxis: 1,
      //   data: jeonsePriceRatioData,
      //   tooltip: {
      //     valueSuffix: "%", //" mm"
      //   },
      // },
      {
        name: "서울 매매 지수", // 지역이름 변수로 놓자
        type: "spline",
        yAxis: 1,
        data: housePriceIndexData,
        tooltip: {
          valueSuffix: "%",
        },
      },
      {
        name: "서울 전세 지수", // 지역이름 변수로 놓자
        type: "spline",
        yAxis: 1,
        data: rentalPriceIndexData,
        tooltip: {
          valueSuffix: "%",
        },
      },
      // {
      //   name: "PIR평균", // 지역이름 변수로 놓자
      //   type: "spline",
      //   yAxis: 1, // 이거 있으면 좌측 눈금 따라가나보다!
      //   data: avg,
      //   tooltip: {
      //     valueSuffix: "", //" mm"
      //   },
      // },
    ],
    // plotOptions: {
    //   series: {
    //     borderWidth: 0,
    //   },
    // },
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        // constructorType={"MultipleAxes"}
        options={options}
      />
    </div>
  );
}
