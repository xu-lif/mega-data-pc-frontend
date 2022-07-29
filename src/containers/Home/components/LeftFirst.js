import BoxLayout from "./BoxLayout";
import styled from "styled-components";

const BodyWrap = styled.div`
  height: 100%;
  width: 100%;
`;

const LeftFirst = () => {
  return (
    <BoxLayout title="容量指标">
      <BodyWrap></BodyWrap>
    </BoxLayout>
  );
};

export default LeftFirst;
