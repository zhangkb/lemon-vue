<template lang="html">
    <div>
      <ul class="header-tap">
        <li>
            <router-link :to="{ name: 'GeometryJs', params: {} }">GeometryJs</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'SnowJs', params: {} }">SnowJs</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ShadowJs', params: {} }">ShadowJs</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'OverallView', params: {} }">OverallView</router-link>
        </li>

      </ul>
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
  name: "TherreJs",
  data() {
    return {
      renderer: undefined,
      camera: undefined,
      scene: undefined,
      light: undefined,
      width: undefined,
      height: undefined
    };
  },
  mixins: [mixin],
  mounted() {
    this.initRobot()
  },
  methods: {
    initRobot() {
      // 创建场景
      let scene = new THREE.Scene();
      // 创建物体
      let geometry = new THREE.BufferGeometry() // 创建一个Buffer几何体
      // BufferGeometry 实际就是一个面、线、点的几何表述，你可以理解为
      // 一个图的数据集合，通过坐标系进行绘图
      let vertices = new Float32Array([
        0, 0, 0, //顶点1坐标
        50, 0, 0, //顶点2坐标
        0, 100, 0, //顶点3坐标
        0, 0, 10, //顶点4坐标
        0, 0, 100, //顶点5坐标
        50, 0, 10, //顶点6坐标
      ])

      // 创建属性缓冲区
      let attribute = new THREE.BufferAttribute(vertices, 3) // 3, 表示3个数据为1组，表明坐标轴的X,Y,Z

      // 设置几何体 attribute 属性的位置信息
      geometry.attributes.position = attribute

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
      geometry.attributes.color = new THREE.BufferAttribute(colors, 3); //3个为一组,表示一个顶点的颜色数据RGB


      // 创建顶点法向量
      var normals = new Float32Array([
        0,0,1,
        0,0,1,
        0,0,1,

        0,1,0,
        0,1,0,
        0,1,0,
      ])

      geometry.attributes.normal = new THREE.BufferAttribute(normals, 3)
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

      let point = new THREE.Points(geometry, material2)
      let mesh = new THREE.Mesh(geometry, material)

      // scene.add(point)
      scene.add(mesh)

      // 创建相机
      // 获取窗口大小
      let width = window.innerWidth
      let height = window.innerHeight
      // 计算窗口宽高比例
      let k = width / height
      let s = 200 // 三维场景显示范围的控制洗漱，系数越大你看到的范围越大
      let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)

      // 设置相机位置
      camera.position.set(200, 300, 200)
      // 设置 相机的聚焦点
      camera.lookAt(scene.position)


      // 创建三维坐标辅助坐标系
      var axisHelper = new THREE.AxesHelper(250);
      scene.add(axisHelper);


      // 创建渲染器对象

      let renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)
      renderer.setClearColor(0xb9d3ff, 1) // 设置背景颜色

      // 将渲染器对象加入到页面中

      this.$refs.ThreeRef.appendChild(renderer.domElement)

      function render() {
        // 执行渲染操作
        renderer.render(scene, camera)
      }

      render()
      // 添加鼠标控制器

      var controls = new OrbitControls(camera,renderer.domElement);//创建控件对象
      controls.addEventListener('change', render);
    },
    initThree() {

    },
    initCamera() {

    },
    initScene() {

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
.header-tap {
  background-color: #fff;
  line-height: 40px;
  margin: 10px;
  li {
    display: inline-block;
    padding: 0 10px;
    margin: 0 10px;
  }
}
</style>
