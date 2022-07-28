import Map from "./Map";
import styles from './index.less'

console.log(styles)

const Home = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <div className={styles.headerWrap}>
        头部
      </div>
      <Map />
    </div>
  );
};

export default Home;
