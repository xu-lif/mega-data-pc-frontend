import BoxLayout from "./BoxLayout";
import { RadialBar } from '@ant-design/plots'
import styled from 'styled-components'

const ContentWrap = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 120px;
  padding: 16px;
  padding-top: 24px;
  align-items: center;
  & > ul {
    list-style: none;
    padding: 0;
    margin: 0;
    & > li:first-of-type {
      font-size: 16px;
      line-height: 28px;
      color: rgba(255,255,255,0.75);
      margin-bottom: 10px;
    }
    & > li:last-of-type {
      font-size: 32px;
      line-height: 40px;
      i {
        font-style: normal;
      }
    }
  }
  & > ul:nth-of-type(1) {
    & > li:last-of-type {
      color: #ff4d4f;
    }
  }
  & > ul:nth-of-type(2) {
    & > li:last-of-type {
      color: #36c361;
    }
  }
  & > div {
    justify-items: end;
  }
`

const LeftFour = () => {
  const data = [
    {
      name: '响应偏差率',
      value: (26 / 100) * 360,
    },
    {
      name: '响应完成率',
      value: (54 / 100) * 360,
    }
  ]

  const config = {
    data,
    height: 140,
    width: 120,
    xField: 'name',
    yField: 'value',
    maxAngle: 270,
    maxBarWidth: 4,
    // intervalPadding: 6,
    // dodgePadding: 6,
    //最大旋转角度,
    radius: 0.8,
    innerRadius: 0.7,
    tooltip: null,
    xAxis: false,
    // theme: 'dark',
    barBackground: {
      style: {
        fill: 'rgba(255,255,255,0.45)',
      },
    },
    colorField: 'name',
    color: ({ name }) => {
      if (name === '响应偏差率') {
        return '#ff4d4f'
      }
      return '#36c361';
    },
  };

  return (
    <BoxLayout title="年度平均考核指标">
      <ContentWrap>
        <ul>
          <li>响应偏差率</li>
          <li>
            <span/>
            <i>26%</i>
          </li>
        </ul>
        <ul>
          <li>响应完成率</li>
          <li>
            <span/>
            <i>54%</i>
          </li>
        </ul>
        <div>
          <RadialBar {...config} />
        </div>
      </ContentWrap>
    </BoxLayout>
    
  );
};

export default LeftFour;
