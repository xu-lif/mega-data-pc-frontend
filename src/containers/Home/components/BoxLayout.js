import PropTypes from "prop-types";
import styled from "styled-components";

const BoxWrap = styled.div`
  height: 100%;
  width: 100%;
  border-top: 1px solid #326178;
  border-bottom: 1px solid #326178;
  border-radius: 4px;
  background: #273032;
`;

const Header = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #326178;
  font-size: 16px;
  line-height: 36px;
  color: #b9ced2;
  & > i {
    display: inline-block;
    width: 24px;
    height: 24px;
    min-width: 24px;
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
