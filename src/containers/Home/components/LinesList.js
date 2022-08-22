import PropTypes from 'prop-types'
import { useMemo } from 'react';
import BoxLayout from "./BoxLayout";

import styled from 'styled-components'

const Ul = styled.ul`
  list-style: none;
  font-family: 'PingFang SC';
  & > li:nth-of-type(2n) {
    background: rgba(255, 255, 255, 0.1);
  }
  & > li {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 56px;
    line-height: 56px;
    font-size: 16px;
    color: #fff;
    & > span:nth-of-type(1) {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: #FF3333;
      border-radius: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 12px;
      color: #fff;
    }
    & > span:last-of-type {
      display: inline-block;
      font-style: normal;
      font-weight: 600;
      font-size: 22px;
      line-height: 34px;
      color: #00EDC6;
      i {
        font-size: 20px;
        font-style: normal;
      }
    }
  }
`

const LinesList = ({
  lines = [],
  gridInfo = {}
}) => {
  const list = useMemo(() => {
    if (lines.length && gridInfo.line_v_or && gridInfo.line_v_or.length) {
      return lines.map((line, index) => {
        return {
          ...line,
          v: parseFloat(gridInfo.line_v_or[index]) || 0
        }
      }).sort((a, b) => {
        return b.v - a.v
      })
    }
    return []
  }, [lines, gridInfo])

  console.log('list', list)
  
  return (
    <BoxLayout title="输电线路率排行榜" style={{
      height: 'calc(100% - 224px)'
    }}>
      <Ul>
      {
        list.map((val, index) => {
          if (parseFloat(val.v) > 50 && val.source.name && val.target.name) {
            return (
              <li>
                <span>{index + 1}</span>
                <span>{`${val.source.name}_${parseInt(val.source.id) + 1} 
                ~ ${val.target.name}_${parseInt(val.target.id) + 1}`}</span>
                <span>{`${parseFloat(val.v).toFixed(1)}`}<i>%</i></span>
              </li>
            )
          }
          return null
          
        })
      }
      </Ul>
    </BoxLayout>
  )
}

LinesList.propTypes = {
  lines: PropTypes.array,
  gridInfo: PropTypes.object,
}

export default LinesList