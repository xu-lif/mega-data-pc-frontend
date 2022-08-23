import React from 'react'
import { Column } from "@ant-design/plots";
import styled from "styled-components";

import BoxLayout from "./BoxLayout";

const ContentWrap = styled.div`
  height: 100%;
  padding: 16px 24px;
`;

const RightSecond = () => {
  const data = [
    {
      name: "London",
      月份: "电力负载",
      月均降雨量: 18.9,
    },
    {
      name: "London",
      月份: "交流器",
      月均降雨量: 28.8,
    },
    {
      name: "London",
      月份: "光伏",
      月均降雨量: 39.3,
    },
    {
      name: "London",
      月份: "电力",
      月均降雨量: 81.4,
    },
    {
      name: "London",
      月份: "电池",
      月均降雨量: 81.4,
    },
    {
      name: "Berlin",
      月份: "电力负载",
      月均降雨量: 12.4,
    },
    {
      name: "Berlin",
      月份: "交流器",
      月均降雨量: 23.2,
    },
    {
      name: "Berlin",
      月份: "光伏",
      月均降雨量: 34.5,
    },
    {
      name: "Berlin",
      月份: "电力",
      月均降雨量: 99.7,
    },
    {
      name: "Berlin",
      月份: "电池",
      月均降雨量: 52.6,
    },
  ];
  const config = {
    data,
    height: "100%",
    isGroup: true,
    xField: "月份",
    yField: "月均降雨量",
    seriesField: "name",
    columnStyle: (data) => {
      if (data.name === 'Berlin') {
        return {
          fill: 'l(270) 0:rgba(255, 0, 92, 1) 1:rgba(250, 255, 0, 1)',
          radius: [10, 10, 10, 10],        
        }
      }
      return {
        fill: "l(270) 0:rgba(0, 245, 160, 1) 1:rgba(0, 217, 245, 1)",
        radius: [10, 10, 10, 10],
      }
    },
    columnBackground: {
      style: {
        fill: '151A20',
        radius: [10, 10, 10, 10], 
      }
    },
    // maxColumnWidth: 30,
    minColumnWidth: 5,
    /** 设置颜色 */
    // color: ['#1ca9e6', '#f88c24'],
    legend: false,
    /** 设置间距 */
    // marginRatio: 0.1,

    xAxis: {
      // type: 'time',
      label: {
        style: {
          fill: '#fff',
          lineWidth: 1,
        }
      },
      tickLine: null,
      line: null,

    },
    // point: {
    //   style: {
    //     stroke: '#000',
    //     lineWidth: 2
    //   }
    // },
    yAxis: {
      line: null,
      label: null,
      grid: null,
    },

    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: "interval-adjust-position",
        }, // 数据标签防遮挡
        {
          type: "interval-hide-overlap",
        }, // 数据标签文颜色自动调整
        {
          type: "adjust-color",
        },
      ],
      columnBackground: {
        style: {
          fill: "red",
        },
      },
    },
  };
  return (
    <BoxLayout title="发电单元类型分布">
      <ContentWrap>
        <Column {...config} />
      </ContentWrap>
    </BoxLayout>
  );
};

export default React.memo(RightSecond);
