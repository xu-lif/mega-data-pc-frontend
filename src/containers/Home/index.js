import { useMemo } from 'react'

import Map from "./Map";
import styles from "./index.less";

import LeftFirst from "./components/LeftFirst";
import LinesList from './components/LinesList';
// import LeftSecond from './components/LeftSecond'
import LeftThird from './components/LeftThird'
// import LeftFour from './components/LeftFour'

import RightFirst from "./components/RightFirst";
import RightSecond from "./components/RightSecond";

import CenterMap from './components/CenterMap'

import sourceData, { transformSourceData } from "./data"; 


const Home = () => {

  const data = useMemo(() => {
    return transformSourceData(sourceData)
  }, [])

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
          <LeftFirst data={sourceData.gird_num_info}/>
          <LinesList lines={data.lines} gridInfo={sourceData.grid_info}/>
          {/* <LeftThird /> */}
        </div>
        <div className={styles.centerWrap}>
          <CenterMap data={data} gridInfo={sourceData.grid_info} gridLayout={sourceData.grid_layout} />
        </div>
        <div className={styles.rightWrap}>
          <RightFirst />
          <RightSecond />
          <LeftThird />
          {/* <LeftFour /> */}

          {/* <LeftFirst /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
