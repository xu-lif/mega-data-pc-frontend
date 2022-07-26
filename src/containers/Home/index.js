import styles from "./index.less";
import { Map, MapvglView, MapvglLayer,Marker, Arc, NavigationControl, InfoWindow } from "react-bmapgl";
import { useRef } from "react";
import { useEffect } from "react";
import ConfigJson from './map_styles.json'

const { mapvgl, BMapGL } = window 
console.log('mapvgl', mapvgl, BMapGL)

const THREE = mapvgl.THREE

const Home = () => {
  const mapRef = useRef(null);
  const mapvglView = useRef(null)
  const threeLayer = useRef(null)
  useEffect(() => {
  //   var view = new mapvgl.View({
  //     map: mapRef.current
  // });
  
  // var threeLayer = new mapvgl.ThreeLayer();
  // view.addLayer(threeLayer);
  console.log('mapvglView.current', mapvglView.current)
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
  }, [])
  return (
    <div className={styles.wrap} style={{
      heigh: '100vh'
    }}>
      <Map
        ref={mapRef}
        center={{ lng: 118.693328, lat: 33.945154 }}
        zoom="11"
        style={{
          position: 'relative', height: '100vh'
        }}
        mapStyleV2={{     
          styleJson: ConfigJson
        }}
      >
        <MapvglView effects={['bright']} ref={ref => {
          console.log('ref.view', ref.view)
          mapvglView.current = ref.view
        }}>
          <MapvglLayer
            type="ThreeLayer"
            getMethods={(data) => {
              console.log('data', data)
              threeLayer.current = data.setViewport()
            }}
          />
        </MapvglView>
      </Map>
    </div>
  );
};

export default Home;
