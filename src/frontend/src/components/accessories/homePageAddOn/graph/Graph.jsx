import React, { useEffect, useState, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';

function Graph({ props }) {
  const [graphData, setGraphData] = useState(null);


  useEffect(() => {
    if (props) {
      setGraphData(props?.data);
    }
  }, [props]);

  console.log("Graph data lastz5555: ", graphData);

  // Helper function to ensure data for two months, defaulting missing data to 0
  const formatGraphData = (dataArray) => {
    const formattedData = [0, 0]; // default values for two months
    dataArray?.forEach(({ month, total_rate }) => {
      if (month === 11) {
        formattedData[0] = total_rate || 0;
      } else if (month === 12) {
        formattedData[1] = total_rate || 0;
      }
    });
    return formattedData;
  };

  const businessData = useMemo(() => formatGraphData(graphData?.business), [graphData?.business]);
  const investorData = useMemo(() => formatGraphData(graphData?.investor), [graphData?.investor]);
  const franchiseData = useMemo(() => formatGraphData(graphData?.franchise), [graphData?.franchise]);

  // Calculate percentage change for business data
  const calculatePercentageChange = (data) => {
    if (data[0] === 0) return 100; // If starting from 0, consider it 100% increase
    return ((data[1] - data[0]) / data[0]) * 100;
  };

  const investorPercentageChange = useMemo(() => calculatePercentageChange(investorData), [investorData]);

  const totalBusiness = useMemo(() => graphData?.total || 0, [graphData?.total]);

  const chartOptions = useMemo(() => ({
    series: [
      {
        name: "Business",
        data: businessData,
      },
      {
        name: "Investor",
        data: investorData,
      },
      {
        name: "Franchise",
        data: franchiseData,
      },
    ],
    options: {
      chart: {
        height: "100%",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: true,
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 6,
      },
      xaxis: {
        categories: ['November', 'December'],
        labels: {
          show: true,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: true,
        labels: {
          formatter: function (value) {
            return '₹' + value.toLocaleString();
          }
        }
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -26
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: true,
        },
        y: {
          show: true,
          formatter: function (value) {
            return '₹' + value.toLocaleString();
          }
        },
      },
    },
  }), [businessData, investorData, franchiseData]);

  console.log('chart options :', chartOptions);

  return (
    <div className="max-w-full bg-amber-50 bg-opacity-30 rounded-lg shadow dark:bg-gray-800 p-4 md:px-44">
      <div className='py-20'>
      <h1 className='text-5xl font-medium mb-5  text-center '>Business Analysis</h1>
      </div>
      <div className="flex justify-between mb-5">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
            ₹{totalBusiness.toLocaleString()}
          </h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">Total Business</p>
        </div>
        <div className={`flex items-center px-2.5 py-0.5 text-base font-semibold ₹{investorPercentageChange >= 0 ? 'text-green-500' : 'text-red-500'} dark:text-green-500 text-center`}>
          {investorPercentageChange >= 0 ? '+' : ''}{investorPercentageChange.toFixed(2)}%
          <svg className={`w-3 h-3 ms-1 ₹{investorPercentageChange >= 0 ? '' : 'transform rotate-180'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
          </svg>
        </div>
      </div>

      {graphData && (
        <ReactApexChart options={chartOptions.options} series={chartOptions.series} type="area" height={350} />
      )}
    </div>
  );
}

export default Graph;