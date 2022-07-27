import styles from "./index.less";
import { useRef } from "react";
import { useEffect } from "react";
import mapConfigJson from "./map_styles.json";

const { BMapGL, mapvgl, THREE } = window;
//BMapGL是3d地图的基础api
//mapvgl是地图的图层api
console.log("THREE", THREE);
// const THREE = mapvgl.THREE;
//必须引入Threejs脚本才能用

const dataList = [
  {
    id: 1,
    type: 'creater',
    child: [2, 6],
    position: [118.693328, 33.945154]
  },
  {
    id: 2,
    type: 'consumer',
    child: [3, 4],
    position: [117.993328, 33.345154],
  },
  {
    id: 3,
    type: 'consumer',
    child: [6],
    position: [118.693328, 33.145154],
  },
  {
    id: 4,
    type: 'consumer',
    child: [],
    position: [117.693328, 33.945154],
  },
  {
    id: 5,
    type: 'creater',
    child: [2, 3],
    position: [118.293328, 32.945154],
  },
  {
    id: 6,
    type: 'consumer',
    child: [],
    position: [119.693328, 33.945154],
  }
];

const getLineLayerData = (data) => {
  const rArray = []
  if (data && data.length) {
    const dataObj = data.reduce((total, item) => {
      total[item.id] = item
      return total
    }, {})
    data.forEach(val => {
      if (val.child && val.child.length) {
        val.child.forEach(valKey => {
          if (dataObj[valKey]) {
            rArray.push([val.position, dataObj[valKey].position])
          }
        })
      }
    })
  }
  return rArray
}

const tubeDataList = [
  [
    [118.693328, 33.945154],
    [117.993328, 33.345154],
  ],
  [
    [117.993328, 33.345154],
    [118.693328, 33.145154],
  ],
  [
    [118.693328, 33.145154],
    [118.293328, 32.945154],
  ],
];

// 生产者颜色
const CREATER_COLOR = '#5CDBD3'
// 消费者颜色
const CONSUMER_COLOR = '#FF85C0'

const Home = () => {
  const mapRef = useRef(null);
  const view = useRef(null);
  const threeLayer = useRef(null);
  const lineLayer = useRef(null);

  // 坐标点转换
  // 要将百度的坐标点转换为gps坐标点
  const transformMercatorProjection = (x, y) => {
    const projection = mapvgl.MercatorProjection;
    const point = projection.convertLL2MC(new BMapGL.Point(x, y));
    return point;
  };

  // 将模型加入至threeLayer图层中
  const joinToThreeLayer = (geometry) => {
    if (threeLayer.current && geometry) {
      threeLayer.current.add(geometry);
    }
  };

  // 创建曲线管道
  const drawTube = (data) => {
    // let texture = new THREE.TextureLoader().load("texture.png");
    // texture.wrapS = texture.wrapT = THREE.RepeatWrapping; //每个都重复
    // texture.repeat.set(1, 1);
    // texture.needsUpdate = true;
    var canvas = document.createElement("canvas");
    canvas.width = 50;
    canvas.height = 50;

    var context = canvas.getContext("2d");
    var gradient = context.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, "red");
    // gradient.addColorStop(0.5, "green");
    gradient.addColorStop(1, "green");

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    let material = new THREE.MeshBasicMaterial({
      map: texture,
      // color: "red",
      side: THREE.BackSide,
      transparent: true,
    });

    console.log("data", data);
    // 创建顶点数组
    let points = [
      new THREE.Vector3(data[0].lng, data[0].lat, 0),
      new THREE.Vector3(data[1].lng, data[1].lat, 0),
      // new THREE.Vector3(10, 0, 10),
      // new THREE.Vector3(0, 0, 10),
    ];

    console.log("points", points);

    // CatmullRomCurve3创建一条平滑的三维样条曲线
    let curve = new THREE.CatmullRomCurve3(points); // 曲线路径

    // 创建管道
    let tubeGeometry = new THREE.TubeGeometry(curve, 200, 500);

    let mesh = new THREE.Mesh(tubeGeometry, material);

    threeLayer.current.add(mesh);

    function animate() {
      // 一定要在此函数中调用
      // threeLayer.current.add(mesh);
      if (texture) texture.offset.x -= 500;
      requestAnimationFrame(animate);
    }

    animate();
  };

  // 创建线
  const drawLine = (data) => {
    //声明的几何体， 里边有个vertices参数可以用来存放点
    var geometry = new THREE.Geometry();
    //LineBasicMaterial(parameters)//basic翻译：基础//Material翻译：原料
    //Parameters:是一个定义材质外观的对象，它包含多个属性来定义材质，这些属性是//翻译：参数
    //Color:线条的颜色，用16进制来表示，默认的颜色是白色。
    //Linewidth
    //Linecap:线条两端的外观，默认是圆角端点，当线条较粗的时候才看得出效果//cap翻译：帽子
    //Linejoin:两个线条的连接点处的外观，默认是round 圆角//join翻译：加入
    //VertexColors:定义线条材质是否使用顶点元素，这是一个boolean值。意思是线条各部分的颜色根据顶点的颜色来进行插值。//vertex翻译：顶点
    //Fog:定义材质的颜色是否受全局雾效的影响。//翻译：雾
    var material = new THREE.LineBasicMaterial({
      vertexColors: true,
    });
    //定义两种颜色分别是两个端点的颜色
    var color1 = new THREE.Color("#5CDBD3"),
      color2 = new THREE.Color("#FF85C0");
    //线的材质可以由两点的颜色决定
    var p1 = new THREE.Vector3(data[0].lng, data[0].lat, 100);
    var p2 = new THREE.Vector3(data[1].lng, data[1].lat, -100);
    console.log("p1--p2", p1, p2);
    // p1.set(-100, 0, 100);
    // p2.set(100, 0, -100);
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    geometry.colors.push(color1, color2);
    //定义线条 这里会传进去三个参数
    //第一个是几何体geometry，里面包含两个顶点和顶点颜色
    //第二个是线条的材质
    //第三个是一组点的连接方式
    return new THREE.Line(geometry, material, THREE.LinePieces);
  };

  // 创建点
  const drawPoint = (point, {
    type
  }) => {
    //首先新建一个长宽高为3的正方体
    const geometry = new THREE.BoxGeometry(4000, 4000, 20);
    //新建材质
    const material = new THREE.MeshBasicMaterial({
      color: type === 'creater' ? CREATER_COLOR : CONSUMER_COLOR,
      flatShading: true,
      wireframe: false,
    });
    //创建一个Mesh对象，传入模型和材质
    var cube = new THREE.Mesh(geometry, material);
    //调整位置，应该使用转换后的坐标
    cube.position.x = point.lng;
    cube.position.y = point.lat;
    return cube;
  };

  useEffect(() => {
    mapRef.current = new BMapGL.Map("map_container");
    mapRef.current.enableKeyboard();
    // mapRef.current.enableScrollWheelZoom();+
    mapRef.current.enableInertialDragging();
    // mapRef.current.enableContinuousZoom();
    //设置中心点和缩放大小
    mapRef.current.centerAndZoom(new BMapGL.Point(118.693328, 33.945154), 10);
    //相机倾斜角度-- 默认相机视角是从上往下
    // mapRef.current.setTilt(80);
    //相机旋转角度 -- 默认朝着正北方向
    mapRef.current.setHeading(0);
    // 设置地图个性化样式
    mapRef.current.setMapStyleV2({ styleJson: mapConfigJson });
    /**
     * viewLayer是图层管理容器
     * threeLayer是three层相关的容器
     */
    // 使用threeLayer创建3D图层
    // 首先创建场景，用于添加图层
    view.current = new mapvgl.View({
      map: mapRef.current,
    });
    // threeLayer.current = new mapvgl.ThreeLayer();
    const lineLayerData = getLineLayerData(dataList)
    console.log('lineLayerData', lineLayerData)
    lineLayerData.forEach(valData => {
      const singleLineLayer = new mapvgl.LineRainbowLayer({
        style: "normal", // road, arrow, normal
        width: 5,
        color: ["#2C8295", "#8C6379"],
        data: [
          {
            geometry: {
              type: "LineString",
              coordinates: valData,
            },
          },
        ],
      });
      view.current.addLayer(singleLineLayer);
    })
    
    // view.current.addLayer(threeLayer.current)

    // const pointerListLayer = new mapvgl.MarkerListLayer({
    //   enablePicked: true,
    //     // autoSelect: true,
    //     // selectedColor: '#00f', // 选中项颜色
    //     onClick: e => {console.log(e)}
    // });
    // 呼吸圆圈层
    var breathLayer = new mapvgl.CircleLayer({
      // 绘制带波纹扩散的圆
      type: 'wave',
      // 扩散半径，支持直接设置和回调两种形式
      radius: r => 1.6 * r,
      // 周期影响扩散速度，越小越快
      duration: 1 / 3,
      // 拖尾影响波纹数，越大越多
      trail: 4
  });
  var textLayer = new mapvgl.TextLayer({
    color: '#fff',
    fontFamily: 'Microsoft Yahei',
    fontSize: 14,
    flat: false,
    collides: true,
    offset: [0, 0],
    padding: [2, 2],
    margin: [0, 0],
    offset: [0, -24],
   
});
//   var iconLayer = new mapvgl.IconLayer({
//     width: 100 / 2,
//     height: 153 / 2,
//     // offset: [0, - 153 / 2 / 2],
//     icon: <div style={{
//       color: '#fff',
//       width: '40px',
//       height: '80px',
//       background:' rgba(0, 0, 0, 1)'
//     }}>
//       12
//     </div>,
//     enablePicked: true, // 是否可以拾取
//     // selectedIndex: -1, // 选中项
//     // selectedColor: '#ff0000', // 选中项颜色
//     autoSelect: true, // 根据鼠标位置来自动设置选中项
//     onClick: (e) => { // 点击事件
//         console.log(e)
//     },
// });
  view.current.addLayer(breathLayer);
  view.current.addLayer(textLayer)
  // breathLayer.setData(data.slice(18, 25));

    const pointsData = []
    // const iconsData = []
    const textData = []
    dataList.forEach((val) => {
      if (val && val.position && val.position.length > 1) {
        // const transformPoint = transformMercatorProjection(val.position[0], val.position[1]);
        pointsData.push({
          geometry: {
              type: 'Point',
              coordinates: val.position
          },
          // 可对单个点设置颜色和大小
          color: val.type === 'creater' ? '#15758a' : '#e8298f',
          size: 8
      })
    //   iconsData.push({
    //     geometry: {
    //         type: 'Point',
    //         coordinates: val.position
    //     }

    // })
    textData.push( {
      geometry: {
          type: 'Point',
          coordinates: val.position
      },
      properties: {
              text: '文字' // 展示的文字
      }
  })
      //   pointsData.push({
      //     geometry: {
      //         type: 'Point',
      //         coordinates: val.position
      //     },
      //     properties: {
      //       fillColor: 'yellow',
      //       fillSize: 10,
      //       fillBorderColor: val.type === 'creater' ? '#15758a' : '#e8298f',
      //       fillBorderWidth: 20,
      //       shadowColor: val.type === 'creater' ? 'rgba(84, 134, 145, 0.2)' : 'rgba(140, 99, 121, 0.2)',
      //       shadowSize: 25,
      //       shadowBorderColor: val.type === 'creater' ? 'rgb(84, 134, 145)' : 'rgb(140, 99, 121)',
      //       shadowBorderWidth: 4,
      //     }
      // })

        // const cube = drawPoint(transformPoint, val);
        // joinToThreeLayer(cube);
      }
    });

    // view.current.addLayer(pointerListLayer);
    breathLayer.setData(pointsData);
    textLayer.setData(textData)
    // iconLayer.setData(iconsData)
    // tubeDataList.forEach((val) => {
    //   if (val && val.length > 1) {
    //     const points = val.map((item) => {
    //       return transformMercatorProjection(item[0], item[1]);
    //     });
    //     const cube = drawTube(points);
    //     joinToThreeLayer(cube);
    //   }
    // });

    // 开始创建threeLayer 模型

    //最后将配置完成的正方体加入Threejs图层
    // threeLayer.current.add(cube);
    // console.log("threeLayer.current", threeLayer.current);

    // drawTube();
    // setTimeout(() => {
    //   material.color = "green";
    //   threeLayer.current.renderer.render();
    // }, 2000);

    //   var view = new mapvgl.View({
    //     map: mapRef.current
    // });
    // var threeLayer = new mapvgl.ThreeLayer();
    // view.addLayer(threeLayer);
    // mapvglView.current.addLayer(threeLayer.current)
    //   var projection = mapvgl.MercatorProjection;
    // var point = projection.convertLL2MC(new BMapGL.Point(116.403928,39.914972));
    // var point2 = projection.convertLL2MC(new BMapGL.Point(116.493759,39.914972));
    //   var geometry = new THREE.BoxGeometry(5500, 5500, 5000);
    //   var material =  new THREE.MeshBasicMaterial( { color: 0xff0000, flatShading: true, wireframe: false } );
    //   var cube = new THREE.Mesh(geometry, material);
    //   cube.position.x = point.lng;
    //   cube.position.y = point.lat;
    //   cube.position.z = 2500;
    //   threeLayer.add(cube);
    //   var geometry = new THREE.BoxGeometry(5500, 5500, 5000);
    //   var material =  new THREE.MeshBasicMaterial( { color: 0xffffff, flatShading: true, wireframe: true } );
    //   var cube = new THREE.Mesh(geometry, material);
    //   cube.position.x = point.lng;
    //   cube.position.y = point.lat;
    //   cube.position.z = 2500;
    //   threeLayer.add(cube);
    //   var geometry = new THREE.BoxGeometry(20, 20, 20);
    //   var material =  new THREE.MeshBasicMaterial( { color: 0xff0000, flatShading: true, wireframe: false } );
    //   var cube = new THREE.Mesh(geometry, material);
    //   cube.position.z = 10;
    //   threeLayer.add(cube, point2);
  }, []);
  return (
    <div>
      <div
        id="map_container"
        style={{
          height: "100vh",
        }}
      ></div>
      {/* <div id="canvas"></div> */}
    </div>

    // <div className={styles.wrap} style={{
    //   heigh: '100vh'
    // }}>
    //   <Map
    //     ref={mapRef}
    //     center={{ lng: 118.693328, lat: 33.945154 }}
    //     zoom="11"
    //     style={{
    //       position: 'relative', height: '100vh'
    //     }}
    //     mapStyleV2={{
    //       styleJson: ConfigJson
    //     }}
    //   >
    //     <MapvglView effects={['bright']} ref={ref => {
    //       console.log('ref.view', ref.view)
    //       mapvglView.current = ref.view
    //     }}>
    //       <MapvglLayer
    //         type="ThreeLayer"
    //         getMethods={(data) => {
    //           console.log('data', data)
    //           threeLayer.current = data.setViewport()
    //         }}
    //       />
    //     </MapvglView>
    //   </Map>
    // </div>
  );
};

export default Home;
