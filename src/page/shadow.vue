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
name: "ShadowJs",
data() {
  return {
    renderer: undefined,
    camera: undefined,
    scene: undefined,
    light: undefined,
    width: undefined,
    height: undefined,
    mesh: undefined,
    // initGeometry,
    raycaster: new THREE.Raycaster(),
    mouse: new THREE.Vector2()
  };
},
mixins: [mixin],
mounted() {
  this.init()
},
methods: {
  initGeometry () {
    this.geometry = new THREE.BoxGeometry(40,40,40)
    let material = new THREE.MeshStandardMaterial({
      color: 0xFFD700,
      metalness: 1.0,
      roughness: 0.6,
    })
    this.mesh = new THREE.Mesh(this.geometry, material)
    // this.mesh.position.y = -60
    this.scene.add(this.mesh)

    // 设置产生阴影的网格模型
    this.mesh.castShadow = true
  },
  initBackShadow () {
    // 创建一个平面产生用来接收阴影数据
    let plane = new THREE.PlaneGeometry(300, 200)
    let material = new THREE.MeshLambertMaterial({
      color: 0x999999
    })
    let mesh = new THREE.Mesh(plane, material)
    this.scene.add(mesh)
    // 旋转网格模型 -PI/2
    mesh.rotateX(-Math.PI/2)
    mesh.position.y = -100
    // 设置网格模型能接收阴影
    mesh.receiveShadow = true
  },
  initScene () {
    // 获取屏幕大小
    let THIS = this
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.scene = new THREE.Scene()
    // 创建三维坐标辅助坐标系
    var axisHelper = new THREE.AxesHelper(250);
    this.scene.add(axisHelper);
  },
  initCamera() {
    // 创建相机 使用正交投影相机
    this.camera = new THREE.PerspectiveCamera(45, this.width/this.height, 2, 1500)

    // 设置相机位置
    this.camera.position.set(0,0,400)

    // 设置相机观察点
    this.camera.lookAt(this.scene.position)

    // 将相机添加到场景中
    this.scene.add(this.camera)

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
    // this.renderer.shadowMap.enabled = true;
    // 将渲染器添加到页面上
    this.$refs.ThreeRef.appendChild(this.renderer.domElement)


  },
  clickHandler (enent) {
    var raycaster = new THREE.Raycaster()
    // var mouse = new THREE.Vector2()


    var vector = new THREE .Vector3( );
    // 三维坐标对象
    vector.set( ( event.clientx / window.innerWidth) * 2 - 1, - ( event.clientY / window.innerHeight) * 2 + 1, 0.5);
    vector.unproject(this.camera) ;

    // mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    // mouse.y = (event.clientY/window.innerHeight) *2 + 1

    // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
    // raycaster.setFromCamera( mouse, this.camera );
    var raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize())

    // 获取raycaster直线和所有模型相交的数组集合
    var intersects = raycaster.intersectObjects( this.scene.children );
    console.log(intersects);
    // this.mesh.material.color.set( 0xFFD700 );
    // this.render()
     //将所有的相交的模型的颜色设置为红色
     for ( var i = 0; i < intersects.length; i++ ) {

      this.mesh.material.color.set( 0xff0000 );
            this.render()

    }
  },
  mouseOverHandler (event) {
    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    this.raycaster.setFromCamera( this.mouse, this.camera );

    // 计算物体和射线的焦点
    var intersects = this.raycaster.intersectObjects( this.scene.children );
    console.log(intersects)
    for ( var i = 0; i < intersects.length; i++ ) {

      intersects[ i ].object.material.color.set( 0xff0000 );
      // this.render()
    }
  },
  render () {
    // 执行渲染操作
    // this.raycaster.setFromCamera( this.mouse, this.camera );

    // // 计算物体和射线的焦点
    // var intersects = this.raycaster.intersectObjects( this.scene.children );
    // console.log(intersects)
    // for ( var i = 0; i < intersects.length; i++ ) {

    //   intersects[ i ].object.material.color.set( 0xff0000 );

    // }
    this.renderer.render(this.scene, this.camera)
    let axis = new THREE.Vector3(0,-10,0)
    // this.mesh.rotateOnAxis(axis, 0.01)
    // this.mesh.rotateX(0.01)
    // console.log('-------', Date.now())
    // requestAnimationFrame(this.render);
  },
  renderBack () {
    this.renderer.render(this.scene, this.camera)
  },
  init() {
    // this.initGeometry()
    this.initScene()
    this.initCamera()
    this.initLight()
    this.initGeometry()
    this.initBackShadow()
    this.initRender()
    this.render()
    this.animation()
    window.addEventListener( 'mousemove', this.mouseOverHandler, false );
    window.addEventListener( 'click', this.clickHandler, false );
  },
  initLight() {
    // 加载环境光
    var ambient = new THREE.AmbientLight(0xffffff);
    // this.scene.add(ambient);
    // var spotLight = new THREE.SpotLight( 0xffffff );
    // spotLight.position.set( 150, 270, 150 );
    // this.scene.add( spotLight );

    // var spotLightHelper = new THREE.SpotLightHelper( spotLight );

    // this.scene.add( spotLightHelper );
    // 加载平行光
    // // 平行光
    // var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
    // directionalLight.position.set(80, 100, 50);
    // // 方向光指向对象网格模型mesh2，可以不设置，默认的位置是0,0,0
    // // directionalLight.target = mesh2;
    // this.scene.add(directionalLight);

    // 方向光
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // 设置光源位置
    directionalLight.position.set(60, 100, 40);
    this.scene.add(directionalLight);
    // 设置用于计算阴影的光源对象
    directionalLight.castShadow = true;
    // 设置计算阴影的区域，最好刚好紧密包围在对象周围
    // 计算阴影的区域过大：模糊  过小：看不到或显示不完整
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 300;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 200;
    directionalLight.shadow.camera.bottom = -100;
    // 设置mapSize属性可以使阴影更清晰，不那么模糊
    directionalLight.shadow.mapSize.set(1024,1024)
    console.log(directionalLight.shadow.camera);
  },
  initObject() {



  },
  threeStart() {

  },
  animation() {
    var controls = new OrbitControls(this.camera,this.renderer.domElement);//创建控件对象
    controls.removeEventListener('change', true)
    controls.addEventListener('change', this.renderBack);
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
