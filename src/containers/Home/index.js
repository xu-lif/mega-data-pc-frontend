import Map from "./Map";
import styles from "./index.less";

import LeftFirst from "./components/LeftFirst";
import LeftSecond from './components/LeftSecond'
import LeftThird from './components/LeftThird'
import LeftFour from './components/LeftFour'

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
      <div className={styles.headerWrap}>
        <div className={styles.headerTitle} style={{
          backgroundImage: 'url(images/header_title.svg)'
        }}>
          智慧电网
        </div>
      </div>
      <Map/>
      <div className={styles.bodyWrap}>
        <div className={styles.leftWrap}>
          <LeftFirst />
          <LeftSecond />
          <LeftThird />
        </div>
        <div className={styles.centerWrap}></div>
        <div className={styles.rightWrap}>
          <RightFirst />
          <RightSecond />
          <LeftFour />

          {/* <LeftFirst /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
