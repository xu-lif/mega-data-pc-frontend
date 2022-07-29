import Map from "./Map";
import styles from "./index.less";

import LeftFirst from "./components/LeftFirst";
import RightFirst from "./components/RightFirst";
import RightSecond from "./components/RightSecond";

console.log("styles", styles);

const Home = () => {
  return (
    <div
      className={styles.wrap}
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <div className={styles.headerWrap}>1</div>
      <div className={styles.bodyWrap}>
        <div className={styles.leftWrap}>
          {/* <LeftFirst />
          <LeftFirst />
          <LeftFirst />
          <LeftFirst /> */}
        </div>
        <div className={styles.centerWrap}></div>
        <div className={styles.rightWrap}>
          <RightFirst />
          <RightSecond />
          {/* <LeftFirst /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
