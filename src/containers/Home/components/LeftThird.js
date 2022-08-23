// import { Liquid } from '@ant-design/plots';
import styled from 'styled-components'

import BoxLayout from "./BoxLayout";
import PropTypes from 'prop-types'

const ContentWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
`
const CreatePower = styled.div`
  width: 138px;
  height: 138px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  /* background: rgba(0, 114, 48, 0.18); */
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  & > ul {
    position: absolute;
    list-style: none;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    & > li {
      color: #47BC78;
      font-size: 18px;
      line-height: 25px;
      text-align: center;
    } 
    & > li:nth-of-type(2) {
      color: #47BC78;
      font-size: 18px;
      line-height: 25px;
      i {
        font-style: normal;
        color: #fff;
        font-size: 32px;
        line-height: 45px;
        margin-right: 10px;
      }
    } 
  }
`
const ConsumerPower = styled(CreatePower)`
& > ul > li {
  color: #F2994A;
}
& > ul > li:nth-of-type(2) {
  color: #F2994A;
}
  /* background: rgba(108, 67, 6, 0.38); */
`

const LeftThird = ({
  data = {}
}) => {
  
  return (
    <BoxLayout title="当前电量负荷情况">
      {/* <Liquid {...config} /> */}
      <div>
      <ContentWrap>
        <CreatePower
          style={{
            backgroundImage: `url(${'images/circle_green.svg'})`
          }}
        >
          <ul>
            <li>
              发电量
            </li>
            <li><i>{
              data.gen
              }</i>kw</li>
          </ul>
        </CreatePower>
        <ConsumerPower
           style={{
            backgroundImage: `url(${'images/circle_yellow.svg'})`
          }}
        >
          <ul>
            <li>
              用电量
            </li>
            <li><i>{data.load}</i>kw</li>
          </ul>
        </ConsumerPower>
      </ContentWrap>
      </div>
    </BoxLayout>
  );
};

LeftThird.propTypes = {
  data: PropTypes.object
}

export default LeftThird;
