<template lang="html">
  <div class="three-body" ref="ThreeRef"></div>
</div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import mixin from "./../assets/js/util.js"

import snow from '@/assets/img/snow.jpg'
import snowFlake from '@/assets/img/snow-01.png'
export default {
name: "SnowJs",
data() {
  return {
    renderer: undefined,
    camera: undefined,
    scene: undefined,
    light: undefined,
    width: undefined,
    height: undefined,
    mesh: undefined,
    clouds: []
  };
},
mixins: [mixin],
mounted() {
  this.init()
},
methods: {
  initSnow() {
    // 获取屏幕大小
    let THIS = this
    this.scene = new THREE.Scene()
    this.width = window.innerWidth
    this.height = window.innerHeight
    // 创建场景

    // 创建背景图
    // let plane = new THREE.PlaneBufferGeometry(900, 450)
    let plane = new THREE.PlaneBufferGeometry(900, 450)
    // 设置背景图的位置
    plane.translate(0,-40,-40)
    // 设置背景的纹理
    let planeTexture  = new THREE.TextureLoader().load(snow, ()=>{
      let material = new THREE.MeshBasicMaterial({
        map: planeTexture,
        // side: THREE.BackSide
      })

      let planeMesh = new THREE.Mesh(plane, material)

      THIS.scene.add(planeMesh)
    })

    console.log(planeTexture)
    let material = new THREE.MeshBasicMaterial({
      map: planeTexture,
      // side: THREE.BackSide
    })

    let planeMesh = new THREE.Mesh(plane, material)

    this.scene.add(planeMesh)
  },
  initGeometry () {
    this.scene = new THREE.Scene()
    let geometry = new THREE.BoxGeometry(100, 100, 40)
    let materialBox = new THREE.MeshStandardMaterial({
      color: 0xFFD700,
      metalness: 1.0,
      roughness: 0.6,
    })
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.mesh = new THREE.Mesh(geometry, materialBox)
    this.mesh.position.set(0,0,20)
    // scene.add(point)
    this.scene.add(this.mesh)
  },
  initCamera() {
    // 创建相机 使用正交投影相机
    this.camera = new THREE.PerspectiveCamera(45, this.width/this.height, 2, 500)

    // 设置相机位置
    this.camera.position.set(0,0,400)

    // 设置相机观察点
    this.camera.lookAt(this.scene.position)

    // 将相机添加到场景中
    this.scene.add(this.camera)

  },
  initPointSnow () {
    // 创建雪花动画
    let typeNum = 2;
    let range = 500;
    // 创建雪花纹理
    var texture = new THREE.TextureLoader().load(snowFlake);

    // 使用图片纹理材质
    let materials = [];
    for (let i = 0 ; i < typeNum; i++) {
      var material = new THREE.PointsMaterial({
        size: 4,
        map: texture, // 纹理
        transparent: true, // 透明
        opacity: 1, // 透明度
        depthTest: false, // 可以去掉texture的黑色背景
        blending: THREE.AdditiveBlending // 融合模式
      });
      // offset 纹理在UV坐标系中分别在 U,V坐标上偏移多少， U 水平坐标 V 垂直坐标
      // repeat 纹理在UV坐标系中分别在UV坐标系上重复多少

      material.map.offset = new THREE.Vector2(1/typeNum * i, 0);
      material.map.repeat = new THREE.Vector2(1/typeNum, 1);
      materials.push(material);
    }

    // 通过自定义几何体设置粒子位置
    var geoms = [];
    for (var k = 0; k < typeNum; k++) {
      var geom = new THREE.Geometry();
      for (var i = 0; i < 100; i++) {
        // 随机生成雪花的位置
        var v = new THREE.Vector3(
          Math.random() * range - range/2,
          Math.random() * range - range/2,
          Math.random() * range - range/2
        );
        // 随机生成雪花分别沿x、y、z轴方向移动速度
        v.velocityY = 0.1 + Math.random() / 5;
            v.velocityX = (Math.random() - 0.5) / 3;
            v.velocityZ = (Math.random() - 0.5) / 3;
            // 添加顶点
        geom.vertices.push(v);
      }
      geoms.push(geom);
    }

    // 点云
    this.clouds = [];
    for (var i = 0; i < typeNum; i++) {
      var points = new THREE.Points(geoms[i], materials[i]);
      this.clouds.push(points)
      this.scene.add(points);
    }


  },
  initRender () {
    // 创建渲染器
    this.renderer = new THREE.WebGLRenderer({
      // 执行抗锯齿
      antialias: true
    })

    this.renderer.setClearColor(0xb9d3ff, 1) // 设置背景颜色

    // 设置渲染窗口的大小
    this.renderer.setSize(this.width, this.height)

    // 将渲染器添加到页面上
    this.$refs.ThreeRef.appendChild(this.renderer.domElement)


  },
  render () {
      let range = 150
      this.clouds.forEach(function (points, i) {
        var vertices = points.geometry.vertices;

          vertices.forEach(function (v, idx) {
            // 计算位置
            v.y = v.y - (v.velocityY);
              v.x = v.x - (v.velocityX);
              v.z = v.z - (v.velocityZ);

              // 边界检查
              if (v.y <= -range/2) v.y = range / 2;
              if (v.x <= -range/2 || v.x >= range/2) v.x = v.x * -1;
              if (v.z <= -range/2 || v.z >= range/2) v.velocityZ = v.velocityZ * -1;
          });

          //重要：渲染时需要更新位置（如果没有设为true,则无法显示动画）
          points.geometry.verticesNeedUpdate = true;
    });
    // 执行渲染操作
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.render);
  },
  init() {
    // this.initGeometry()
    this.initSnow()
    this.initPointSnow()
    this.initCamera()
    // this.initLight()
    this.initRender()
    this.render()
    // this.animation()

  },
  initLight() {
    // 加载环境光
    var ambient = new THREE.AmbientLight(0xffffff);
    // this.scene.add(ambient);
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 150, 270, 150 );
    this.scene.add( spotLight );

    var spotLightHelper = new THREE.SpotLightHelper( spotLight );

    this.scene.add( spotLightHelper );
    // 加载平行光
    // // 平行光
    // var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
    // directionalLight.position.set(80, 100, 50);
    // // 方向光指向对象网格模型mesh2，可以不设置，默认的位置是0,0,0
    // // directionalLight.target = mesh2;
    // this.scene.add(directionalLight);
  },
  initObject() {



  },
  threeStart() {

  },
  animation() {
    var controls = new OrbitControls(this.camera,this.renderer.domElement);//创建控件对象
    // controls.addEventListener('change', this.render);
  },
  createOnThree() {

  }
}
};
</script>

<style lang="less" scoped>
.three-js-body {
.three-body {
  width: 1000px;
  height: 800px;
  canvas {
    width: 100%;
    height: 100%;
  }
}
}
</style>
