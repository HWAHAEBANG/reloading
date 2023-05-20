import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import RingLoader from "react-spinners/RingLoader";

export default function PriceChangeRate() {
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
  const [priceChangeRateData, setPriceChangeRateData] = useState();

  // console.log(priceChangeRateData);

  useEffect(() => {
    Promise.all([
      axios.get(
        `http://reloading-env.eba-7nrbgs4x.ap-northeast-2.elasticbeanstalk.com/allCharts/priceChangeRate`,
        {
          withCredentials: true,
        }
      ),
    ])
      .then((responses) => {
        const priceChangeRateResponse = responses[0];

        setPriceChangeRateData(priceChangeRateResponse.data.data);

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
