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

import weixiang from '@/assets/img/weixiang.jpg'
export default {
name: "GeometryJs",
data() {
  return {
    renderer: undefined,
    camera: undefined,
    scene: undefined,
    light: undefined,
    width: undefined,
    height: undefined,
    mesh: undefined
  };
},
mixins: [mixin],
mounted() {
  this.init()
},
methods: {
  initRobot() {
    // 创建场景
    this.scene = new THREE.Scene();
    // 创建物体
    // let geometry = new THREE.SphereGeometry(60, 100, 100) // 创建一个Buffer几何体
    let geometry = new THREE.BoxGeometry(40, 40, 40) // 创建一个Buffer几何体
    // let geometry = new THREE.BufferGeometry() // 创建一个Buffer几何体
    // BufferGeometry 实际就是一个面、线、点的几何表述，你可以理解为
    // 一个图的数据集合，通过坐标系进行绘图

    // 使用Vector3 定义顶点位置坐标数据
    let p1 = new THREE.Vector3(50, 0, 0)
    let p2 = new THREE.Vector3(0, 70, 0)
    let p3 = new THREE.Vector3(80, 70, 0)

    // 创建属性缓冲区
    // let attribute = new THREE.BufferAttribute(vertices, 3) // 3, 表示3个数据为1组，表明坐标轴的X,Y,Z

    // 设置几何体 attribute 属性的位置信息
    // geometry.attributes.position = attribute

    // 类型数组创建顶点颜色color数据
    var colors = new Float32Array([
      1, 0, 0, //顶点1颜色
      0, 1, 0, //顶点2颜色
      0, 0, 1, //顶点3颜色

      1, 1, 0, //顶点4颜色
      0, 1, 1, //顶点5颜色
      1, 0, 1, //顶点6颜色
    ]);
    // 设置几何体attributes属性的颜色color属性
    // geometry.attributes.color = new THREE.BufferAttribute(colors, 3); //3个为一组,表示一个顶点的颜色数据RGB


    // 创建顶点法向量
    var normals = new Float32Array([
      0,0,1,
      0,0,1,
      0,0,1,

      0,1,0,
      0,1,0,
      0,1,0,
    ])

    // geometry.attributes.normal = new THREE.BufferAttribute(normals, 3)
    // 创建材质信息 三角网格渲染模式
    let material = new THREE.MeshBasicMaterial({
      // color: 0x0000ff, //三角形的颜色
      vertexColors: THREE.VertexColors, //以顶点颜色为准
      side: THREE.DoubleSide, // 两面可见
    })

    let material2 = new THREE.PointsMaterial({
      // color: 0x0000ff,
      vertexColors: THREE.VertexColors, //以顶点颜色为准
      size: 10.0
    })

    let materialBox = new THREE.MeshStandardMaterial({
      color: 0xFFD700,
      metalness: 1.0,
      roughness: 0.6,
    })

    let point = new THREE.Points(geometry, material2)
    this.mesh = new THREE.Mesh(geometry, materialBox)
    this.mesh.position.set(0,10,0)
    // scene.add(point)
    this.scene.add(this.mesh)


    // 创建产生投影的网格模型
    this.mesh.castShadow = true

    // 创建一个平面网格模型作为阴影展示面
    let plane = new THREE.PlaneGeometry(300, 200)
    let materialPlane = new THREE.MeshLambertMaterial({
      // 漫反射材质
      color: 0xffffff
    })
    console.log(plane)


    // plane.position.set(0,0,-100)

    let meshPlane = new THREE.Mesh(plane, materialPlane)
    meshPlane.rotateX(-Math.PI / 2); //旋转网格模型
    meshPlane.position.y = -10; //设置网格模型y坐标
    this.scene.add(meshPlane)
    // 设置接收阴影的投影面
    meshPlane.receiveShadow = true



    // 方向光
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // 设置光源位置
    directionalLight.position.set(160, 160, 160);
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
    // directionalLight.shadow.mapSize.set(1024,1024)
    console.log(directionalLight.shadow.camera);


  },
  initCamera() {
    // 创建相机
    // 获取窗口大小
    let width = window.innerWidth
    let height = window.innerHeight
    // 计算窗口宽高比例
    let k = width / height
    let s = 200 // 三维场景显示范围的控制洗漱，系数越大你看到的范围越大
    this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)

    // 设置相机位置
    this.camera.position.set(200, 300, 200)
    // 设置 相机的聚焦点
    this.camera.lookAt(this.scene.position)


    // 创建三维坐标辅助坐标系
    var axisHelper = new THREE.AxesHelper(250);
    this.scene.add(axisHelper);
  },
  initScene() {

  },
  clickHandler () {

  },
  initRender () {
    // 创建渲染器对象
    let width = window.innerWidth
    let height = window.innerHeight
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(width, height)
    this.renderer.setClearColor(0xb9d3ff, 1) // 设置背景颜色

    // 将渲染器对象加入到页面中
    this.renderer.shadowMap.enabled = true
    this.$refs.ThreeRef.appendChild(this.renderer.domElement)
  },
  render () {
    // 执行渲染操作
    this.renderer.render(this.scene, this.camera)

    this.mesh.rotateY(0.0001);//每次绕y轴旋转0.01弧度
    // requestAnimationFrame(this.render);//请求再次执行渲染函数render
    // 添加鼠标控制器


  },
  init() {
    this.initRobot()
    // this.initLight()
    this.initCamera()
    this.initRender()
    this.render()
    this.animation()
  },
  initLight() {
    // AmbientLight 环境光 环境光是经过多次反射而来的光称为环境光，无法确定其最初的方向。环境光是一种无处不在的光。环境光源放出的光线被认为来自任何方向。因此，当你仅为场景指定环境光时，所有的物体无论法向量如何，都将表现为同样的明暗程度。 （这是因为，反射光可以从各个方向进入您的眼睛）
    // AreaLight 区域光
    // PointLight  点光源 由这种光源放出的光线来自同一点，且方向辐射自四面八方。例如蜡烛放出的光，萤火虫放出的光。点光源用PointLight来表示，它的构造函数如下所示：

    // PointLight( color, intensity, distance )

    // 这个类的参数稍微复杂一些，我们花点时间来解释一下：

    // Color：光的颜色

    // Intensity：光的强度，默认是1.0,就是说是100%强度的灯光，

    // distance：光的距离，从光源所在的位置，经过distance这段距离之后，光的强度将从Intensity衰减为0。 默认情况下，这个值为0.0，表示光源强度不衰减。

    // THREE.SpotLight( hex, intensity, distance, angle, exponent )

    // 这种光源的光线从一个锥体中射出，在被照射的物体上产生聚光的效果。使用这种光源需要指定光的射出方向以及锥体的顶角α

    // Hex：聚光灯发出的颜色，如0xFFFFFF

    // Intensity：光源的强度，默认是1.0，如果为0.5，则强度是一半，意思是颜色会淡一些。和上面点光源一样。

    // Distance：光线的强度，从最大值衰减到0，需要的距离。 默认为0，表示光不衰减，如果非0，则表示从光源的位置到Distance的距离，光都在线性衰减。到离光源距离Distance时，光源强度为0.

    // Angle：聚光灯着色的角度，用弧度作为单位，这个角度是和光源的方向形成的角度。

    // exponent：光源模型中，衰减的一个参数，越大衰减约快。

    //点光源
    // var point = new THREE.PointLight(0xffffff);
    // point.position.set(0, 800, 500); //点光源位置
    // this.scene.add(point); //点光源添加到场景中

    // //环境光
    // var ambient = new THREE.AmbientLight(0x444444);
    // this.scene.add(ambient);

    // 聚光灯
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 50, 90, 50 );

    spotLight.angle = Math.PI /6
    spotLight.castShadow = true
    spotLight.shadow.camera.near = 1
    spotLight.shadow.camera.far = 300
    spotLight.shadow.camera.fov = 20
    // spotLight.shadow.camera.top = 200
    // spotLight.shadow.camera.bottom = -100
    // spotLight.shadow.camera.left = -50
    // spotLight.shadow.camera.right = 50

    this.scene.add( spotLight );

    var spotLightHelper = new THREE.SpotLightHelper( spotLight );

    this.scene.add( spotLightHelper );
  },
  initObject() {
    // 最常见的材质之一就是Lambert材质，这是在灰暗的或不光滑的表面产生均匀散射而形成的材质类型。比如一张纸就是Lambert表面。 首先它粗糙不均匀，不会产生镜面效果。我们在阅读书籍的时候，没有发现书上一处亮，一处不亮吧，它非常均匀，这就是兰伯特材质。


    // 线的材质可以由2点的颜色决定


    // vertices 顶点的队列，保存了模型中每个顶点的位置信息。

    // geometry中colors表示顶点的颜色，必须材质中vertexColors等于THREE.VertexColors 时，颜色才有效，如果vertexColors等于THREE.NoColors时，颜色就没有效果了。那么就会去取材质中color的值


  },
  threeStart() {

  },
  animation() {
    var controls = new OrbitControls(this.camera,this.renderer.domElement);//创建控件对象
    controls.addEventListener('change', this.render);
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
