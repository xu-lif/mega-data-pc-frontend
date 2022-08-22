import BoxLayout from "./BoxLayout";
import styled from "styled-components";
import PropTypes from 'prop-types'
import data from "../data";

const BodyWrap = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-column-gap: 16px;
  padding: 16px;
`;
const ItemWrap = styled.div`
  display: flex;
  align-items: center;
  & > div:nth-of-type(1) {
    width: 48px;
    height: 48px;
    margin-right: 16px;
    background-size: contain; 
    background-repeat: no-repeat;
    background-position: center;
  }
  & > div:nth-of-type(2) {
    font-size: 16px;
    line-height:26px;
    color: rgba(250, 250, 250, 0.64);
    & > div:nth-of-type(1) {
      /* margin-bottom: 2px; */
    }
    &  i {
      font-style: normal;
      font-size: 26px;
      line-height: 40px;
      color: rgba(250, 250, 250, 0.87);
      font-weight: 500;
      margin-right: 8px;
    }
  }
`

const LeftFirst = ({
  data = {},
}) => {
  return (
    <BoxLayout title="容量指标">
      <BodyWrap>
        <ItemWrap>
          <div style={{
            backgroundImage: `url(${'images/dianchang_num.svg'})`
          }}/>
          <div>
            <div>
              发电单元数量
            </div>
            <div>
            <i>{data.n_gen}</i>
            家
            </div>
          </div>
        </ItemWrap>
        <ItemWrap>
          <div style={{
            backgroundImage: `url(${'images/dianji_num.svg'})`
          }}/>
          <div>
            <div>
              变电站数量
            </div>
          <div>
            <i>5</i>
            座
          </div>
          </div>
        </ItemWrap>
        <ItemWrap>
          <div style={{
            backgroundImage: `url(${'images/fadian_unit.svg'})`
          }}/>
          <div>
            <div>
              负载数量
            </div>
            <div>
            <i>{data.n_load}</i>
            台
          </div>
          </div>

        </ItemWrap>
        <ItemWrap>
          <div style={{
            backgroundImage: `url(${'images/rongliang.svg'})`
          }}/>
          <div>
            <div>
            输电线路数量
            </div>
            <div>
            <i>{data.n_line}</i>
            条
          </div>
          </div>

        </ItemWrap>

      </BodyWrap>
    </BoxLayout>
  );
};

LeftFirst.propTypes = {
  data: PropTypes.object
}

export default LeftFirst;
