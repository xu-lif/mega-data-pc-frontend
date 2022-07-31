import BoxLayout from "./BoxLayout";
import { Line } from "@ant-design/charts";

import styled from "styled-components";

const ContentWrap = styled.div`
  height: 100%;
  padding: 12px 0 12px 12px
`;

const RightFirst = () => {
  const data = [
    {
      year: "7.20",
      value: 50,
      category: "发电负荷"
    },
    {
      year: "7.21",
      value: 110,
      category: "发电负荷"
    },
    {
      year: "7.22",
      value: 40,
      category: "发电负荷"
    },
    {
      year: "7.23",
      value: 120,
      category: "发电负荷"
    },
    {
      year: "7.24",
      value: 140,
      category: "发电负荷"
    },
    {
      year: "7.25",
      value: 40,
      category: "发电负荷"
    },
    {
      year: "7.26",
      value: 180,
      category: "发电负荷"
    },
    {
      year: "7.27",
      value: 60,
      category: "发电负荷"
    },
    {
      year: "7.28",
      value: 200,
      category: "发电负荷"
    },
    {
      year: "7.20",
      value: 100,
      category: "用电负荷"
    },
    {
      year: "7.21",
      value: 60,
      category: "用电负荷"
    },
    {
      year: "7.22",
      value: 110,
      category: "用电负荷"
    },
    {
      year: "7.23",
      value: 80,
      category: "用电负荷"
    },
    {
      year: "7.24",
      value: 150,
      category: "用电负荷"
    },
    {
      year: "7.25",
      value: 127,
      category: "用电负荷"
    },
    {
      year: "7.26",
      value: 190,
      category: "用电负荷"
    },
    {
      year: "7.27",
      value: 70,
      category: "用电负荷"
    },
    {
      year: "7.28",
      value: 130,
      category: "用电负荷"
    },
  ];
  const config = {
    data,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    // smooth: true,
    height: '100%',
    xAxis: {
      // type: 'time',
      label: {
        style: {
          fill: '#fff',
          lineWidth: 1,
        }
      },
      line: null,

    },
    colorField: 'category',
    color: ['#00F9FF', '#F72585'],
    point: {
      style: {
        stroke: '#000',
        lineWidth: 2
      }
    },
    yAxis: {
      grid: null,
      label: {
        style: {
          fill: '#fff',
          lineWidth: 1,
        }
      },
      line: null,
    },
   
    area: {
      style: {
        fill: 'l(90) 0:rgba(247, 37, 133, 0.8) 0.5:rgba(247, 37, 133, 0.5) 1:rgba(13, 17, 21, 0)'
      },
    },
  };
  return (
    <BoxLayout title="发电，用电负荷曲线图">
      <ContentWrap>
      <Line {...config} />
      </ContentWrap>
    </BoxLayout>
  );
};

export default RightFirst;
