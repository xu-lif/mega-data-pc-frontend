import { useEffect, useRef } from "react";

const dataListDemo = [
  {
    id: 1,
    type: "creator",
    child: [2, 6],
    position: [118.693328, 33.945154],
  },
  {
    id: 2,
    type: "consumer",
    child: [3, 4],
    position: [117.993328, 33.345154],
  },
  {
    id: 3,
    type: "consumer",
    child: [6],
    position: [118.693328, 33.145154],
  },
  {
    id: 4,
    type: "consumer",
    child: [],
    position: [117.693328, 33.945154],
  },
  {
    id: 5,
    type: "creator",
    child: [2, 3],
    position: [118.293328, 32.945154],
  },
  {
    id: 6,
    type: "consumer",
    child: [],
    position: [119.693328, 33.945154],
  },
];

var data = [
  {
    type: "Feature",
    properties: {
      name: "北京市-天津市",
    },
    geometry: {
      type: "LineString",
      coordinates: [
        ["116.407394", "39.904211"],
        ["117.200983", "39.084158"],
      ],
    },
  },
  {
    type: "Feature",
    properties: {
      name: "北京市-河北省",
    },
    geometry: {
      type: "LineString",
      coordinates: [
        ["116.407394", "39.904211"],
        ["114.530235", "38.037433"],
      ],
    },
  },
];

const { LKMap, mapvgl } = window;

// 生产者颜色
const CREATOR_COLOR = "#5CDBD3";
// 消费者颜色
const CONSUMER_COLOR = "#FF85C0";

const getGradualLineLayerData = (data) => {
  const rArray = [];
  if (data && data.length) {
    const dataObj = data.reduce((total, item) => {
      total[item.id] = item;
      return total;
    }, {});
    data.forEach((val) => {
      if (val.child && val.child.length) {
        val.child.forEach((valKey) => {
          if (dataObj[valKey]) {
            // rArray.push([val.position, dataObj[valKey].position]);
            rArray.push({
              type: "Feature",
              // properties: {
              //   name: "北京市-河北省",
              // },
              geometry: {
                type: "LineString",
                coordinates: [val.position, dataObj[valKey].position],
              },
              parentPoint: val,
              childPoint: dataObj[valKey],
            });
          }
        });
      }
    });
  }
  return rArray;
};

const getScatterPointLayerData = (data) => {
  return {
    type: "FeatureCollection",
    features: data.map((val) => {
      return {
        ...val,
        geometry: {
          type: "Point",
          coordinates: val.position,
        },
        properties: {
          pType: val.type,
        },
      };
    }),
  };
};

const Map = () => {
  const mapRef = useRef(null);
  const gradualLineLayerRef = useRef(null);
  const scatterPointLayerRef = useRef(null);

  // 创建地图
  const createMap = () => {
    mapRef.current = new LKMap.Map("map", {
      // 地图中心
      center: [118.693328, 33.945154],
      // 地图缩放级别
      style: "lkmap://styles/3e46461651084f19a29688d4ac71e3c8",
      zoom: 7,
    });
  };

  // 创建渐变可视化图层
  const createGradualLineView = () => {
    const gradualData = getGradualLineLayerData(dataListDemo);
    gradualLineLayerRef.current = new mapvgl.GradualLineLayer({
      map: mapRef.current, // 添加到的地图对象
      data: gradualData, // geojson线数据
    });
    return gradualData;
  };

  // 创建呼吸点图层
  const createScatterPointView = () => {
    const data = getScatterPointLayerData(dataListDemo);
    console.log("data", data);
    const view = new mapvgl.View({ map: mapRef.current });
    // 初始化完成添加 Layer
    view.on("loaded", () => {
      // 创建图层实例
      scatterPointLayerRef.current = new mapvgl.ScatterPointLayer({
        id: "scatter",
        data: data, // geojson数据
        color: {
          keyName: "pType",
          value: (v) => {
            console.log("v", v);
            return v === "creator" ? CREATOR_COLOR : CONSUMER_COLOR;
          },
        }, // 颜色
        size: 40, // 大小
      });
      view.addLayer(scatterPointLayerRef.current);
    });
  };

  // 地图加载完成之后，开始创建各种图层
  const addLayerFun = () => {
    const gradualData = createGradualLineView();
    createScatterPointView();
    if (gradualLineLayerRef.current) {
      // 渐变图层设置样式
      const lineWidth = 5;
      gradualData.forEach((val) => {
        gradualLineLayerRef.current.addLayer({
          id: `${val.parentPoint.id}-${val.childPoint.id}`,
          style: {
            color: {
              0:
                val.parentPoint.type === "creator"
                  ? CREATOR_COLOR
                  : CONSUMER_COLOR,
              1:
                val.childPoint.type === "creator"
                  ? CREATOR_COLOR
                  : CONSUMER_COLOR,
            },
            width: lineWidth,
          },
        });
      });
    }
  };

  useEffect(() => {
    createMap();
    if (mapRef.current) {
      mapRef.current.on("load", addLayerFun);
    }
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div
        id="map"
        style={{
          width: "100%",
          height: "100%",
        }}
      ></div>
    </div>
  );
};

export default Map;
