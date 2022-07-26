import styles from "./index.less";
import { Map, Marker, NavigationControl, InfoWindow } from "react-bmapgl";
import { useRef } from "react";
import { useEffect } from "react";

const Home = () => {
  const mapRef = useRef(null);
  return (
    <div className={styles.wrap}>
      <Map
        ref={mapRef}
        center={{ lng: 116.402544, lat: 39.928216 }}
        zoom="11"
        styles={{}}
      >
        <Marker position={{ lng: 116.402544, lat: 39.928216 }} />
        {/* <NavigationControl />
        <InfoWindow
          position={{ lng: 116.402544, lat: 39.928216 }}
          text="内容"
          title="标题"
        /> */}
      </Map>
      <button
        onClick={() => {
          console.log(mapRef.current);
        }}
      ></button>
    </div>
  );
};

export default Home;
