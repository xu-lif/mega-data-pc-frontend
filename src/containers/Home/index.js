import { useEffect, useMemo, useRef, useState } from 'react'

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

import sourceData, { transformSourceData, updateSourceData } from "./data"; 


const Home = () => {
  const [data, setData] = useState(transformSourceData(sourceData))
  const [curGenAndLoad, setCurGenAndLoad] = useState({
    gen: 654,
    load: 486
  })
  const timerRef = useRef()

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setData((oldVal) => {
        return {
          ...oldVal,
          sourceData: updateSourceData(oldVal.sourceData)
        }
      })
      setCurGenAndLoad(oldVal => {
        return ({
          gen: oldVal.gen + parseInt(Math.random() * 20) - 5,
          load: oldVal.load + parseInt(Math.random() * 20) - 8          
        })
      })
    }, 1000)
    return () => {
      if (timerRef.current) timerRef.current.clearInterval();
    }
  }, [])

  console.log('data', data)


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
          <LeftFirst data={data.sourceData.gird_num_info}/>
          <LinesList lines={data.lines} gridInfo={data.sourceData.grid_info}/>
          {/* <LeftThird /> */}
        </div>
        <div className={styles.centerWrap}>
          <CenterMap data={data} gridInfo={data.sourceData.grid_info} gridLayout={data.sourceData.grid_layout} />
        </div>
        <div className={styles.rightWrap}>
          <RightFirst />
          <RightSecond />
          <LeftThird data={curGenAndLoad}/>
          {/* <LeftFour /> */}

          {/* <LeftFirst /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
