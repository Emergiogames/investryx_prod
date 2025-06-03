import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { chartData } from '../../services/admin/apiMethods';

function ApexChart() {
  const [userData, setUserData] = useState([])
  const [postData, setPostData] = useState([])

  const [options] = useState({
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: [
        "2018-09-19T00:00:00.000Z", 
        "2018-09-19T01:30:00.000Z", 
        "2018-09-19T02:30:00.000Z", 
        "2018-09-19T03:30:00.000Z", 
        "2018-09-19T04:30:00.000Z", 
        "2018-09-19T05:30:00.000Z", 
        "2018-09-19T06:30:00.000Z"
      ]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      }
    },
    title: {
      text: "User Growth and Post Creation",
      align: "left",
      style: {
        fontSize: "16px",
        color: "#666",
      },
    },
    yaxis: {
      min: 0,
    },
  });
  
  useEffect(() => {
    chartData()
      .then((response) => {
        console.log("response",response.data.chartData);
        const { userJoinedDetails, postCreationDetails } = response.data.chartData
        
        setUserData(userJoinedDetails.map((item) => ({
          month: new Date(item._id).toISOString(),
          userCount: item.userCount
        })))
        setPostData(postCreationDetails.map((item) => ({
          month: new Date(item._id).toISOString(),
          postCount: item.postCount,
        })))
        .catch((error) => {
          console.error("Error fetching chart data:", error);
        });
      })
  }, [])

  const series = [
    {
      name: 'Users',
      data: userData.map(item => ({ x: item.month, y: item.userCount })),
    },
    {
      name: 'Posts',
      data: postData.map(item => ({ x: item.month, y: item.postCount })),
    },
  ];

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="area" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default ApexChart;
