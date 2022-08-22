import PropTypes from "prop-types";
import styled from "styled-components";

const BoxWrap = styled.div`
  height: 100%;
  width: 100%;
  color: #fff;
  /* border-top: 1px solid #326178; */
  /* border-bottom: 1px solid #326178; */
  border-radius: 4px;
  background: rgba(10, 13, 16, 0.3);
  & > div:last-of-type::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  /* border-bottom: 1px solid #326178; */
  font-size: 16px;
  line-height: 36px;
  color: rgba(255, 255, 255, 0.87);
  background: rgba(27, 126, 242, 0.14);
  position: relative;
  padding-left: 6px;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -6px;
    bottom: 0;
    width: 4px;
    background: #1B7EF2;
  }
  
  & > i {
    display: inline-block;
    width: 0px;
    height: 0px;
    /* min-width: 24px; */
    border-width: 6px;
    border-style: solid;
    border-color: transparent transparent transparent #29F1FA;
    margin-right: 12px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const BoxLayout = ({ children, title, icon, style = {} }) => {
  return (
    <BoxWrap style={style}>
      <Header>
        <i
          style={{
            backgroundImage: `ulr(${icon})`,
          }}
        />
        {title}
      </Header>
      <div
        style={{
          height: "calc(100% - 36px)",
          overflow: 'auto'
        }}
      >
        {children}
      </div>
    </BoxWrap>
  );
};

BoxLayout.propTypes = {
  title: PropTypes.string, // 标题
  icon: PropTypes.string, // 图标
  children: PropTypes.object,
  style: PropTypes.object,
};

export default BoxLayout;
