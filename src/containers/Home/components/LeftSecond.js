import BoxLayout from "./BoxLayout";
import styled from 'styled-components'

const ItemWrap = styled.div`
  /* display: flex; */
  /* align-items: center; */
  /* flex-wrap: wrap; */
  color: rgba(250, 250, 250, 0.7);
  position: relative;
  padding-left: 24px;
  line-height: 40px;
  
  & > div:first-of-type {
    position: relative;
    display: flex;
    align-items: center;
    font-size: 14px;
    & > span {
      display: inline-block;
      width: 18px;
      height: 18px;
      border: 1px solid #1B7EF2;
      background: rgba(27, 126, 242, 0.17);
      border-radius: 50%;
      position: relative;
      margin-right: 8px;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8px;
        height: 8px;
        border: 2px solid #96D2FF;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        background:rgba(27, 126, 242, 0.29);
      }
    }
  }
  & > div:nth-of-type(2) {
    padding-left: 16px;
  }
  & > div {
    i {
      font-size: 28px;
      line-height: 36px;
      color: #fff;
      margin: 0 6px 12px 0;
      font-style: normal;
    }
    & > span {
      font-size: 14px;
      line-height: 28px;
      color: gray;
    }
    & > span:nth-of-type(1) {
      margin-right: 16px;
    }
    & > span > span {
      color: #29F1FA
    }
  }
`

const LeftSecond = () => {
  return (
    <BoxLayout title="运行模式：计划曲线">
      <div>
      <ItemWrap>
        <div>
          <span />注册调控能力
        </div>
        <div style={{
          wdith: '100%',
          paddingLeft: '16px'
        }}>
          <span><span>削峰：</span> <i>18.30</i>kw</span>
          <span><span>填谷：</span> <i>12.64</i>kw</span>
        </div>
      </ItemWrap>
      {/* <ItemWrap>
        
        <div>
        发电负荷因子
        </div>
          <div>
          <span>
            <i>18.30</i>kw
          </span>
          </div>
      </ItemWrap> */}
      <ItemWrap>
      <div>
      <span />网供负荷
        </div>
        
        <div>
          <span><i>18.52</i>kw</span>
        </div>
      </ItemWrap>
      <ItemWrap>
        
        <div>
        <span />上网负荷
        </div>
        <div>
          <span> <i>17.62</i>kw</span>
        </div>
      </ItemWrap>
      </div>
  </BoxLayout>
  );
};

export default LeftSecond;
