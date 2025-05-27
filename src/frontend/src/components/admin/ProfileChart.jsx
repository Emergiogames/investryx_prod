import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ProfileChart = ({isDashboardData}) => {

  // const [isDashboardData, setDashboardDatas] = useState('')

  // useEffect(() => {
  //   getDashboardDetails()
  //     .then((response) => {
  //       const dashboardDatas = response.data
  //       setDashboardDatas(dashboardDatas)
  //       // console.log("dashboardDatas",dashboardDatas);
  //     })
  // },[])
  
  const [series] = useState([isDashboardData.totalUsers, isDashboardData.totalPosts, isDashboardData.totalReports]); // Only three data points
  const [options] = useState({
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '24px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function (w) {
              return ; 
              // return isDashboardData.totalUsers+isDashboardData.totalPosts+isDashboardData.totalReports; 
            },
          },
        },
      },
    },
    labels: ['Users', 'Posts', 'Report'], // Only three labels
    colors: ['#0000FF', '#FFD700', '#FF0000'], // Red, Yellow, Blue
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="radialBar" height={200} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ProfileChart;
