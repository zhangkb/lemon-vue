<template lang="html">
  <div class="three-js-body">
    主要做什么呢？ 当然是主要做动画了啊
    <button @click="createOnThree">创建一个小方块</button>
    <button @click="initRobot">创建一条线</button>
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
      /**
       * 创建场景对象Scene
       */
      var scene = new THREE.Scene();
      /**
       * 创建网格模型
       */
      var geometry = new THREE.SphereGeometry(40, 40, 40); //创建一个球体几何对象
      // var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
      // var material = new THREE.MeshPhongMaterial({
      //  color: 0x0000ff,
      // opacity: .7,
      // transparent: true,
      //  specular:0x4488ee,
      //  shininess:12
      // }); //材质对象Material

      // var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      // scene.add(mesh); //网格模型添加到场景中

      // 图片加载器
      // var ImageLoader = new THREE.ImageLoader();
      // // load方法回调函数，按照路径加载图片，返回一个html的元素img对象
      // ImageLoader.load("weixiang", function(img) {
      //   // image对象作为参数，创建一个纹理对象Texture
      //   var texture = new THREE.Texture(img);
      //   // 下次使用纹理时触发更新
      //   texture.needsUpdate = true;
      //   var material = new THREE.MeshLambertMaterial({
      //     map: texture //设置纹理贴图
      //   });
      //   var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      //   scene.add(mesh); //网格模型添加到场景中
      // });

      var loader = new THREE.TextureLoader()
      var texture = loader.load(weixiang, ()=>{})
      // var material = new THREE.MeshLambertMaterial({
      //   map: texture
      // })

      var material = new THREE.MeshPhongMaterial({
        map: texture,
        bumpMap:texture,//凹凸贴图
        bumpScale:5,
      });

      var mesh = new THREE.Mesh(geometry, material)
      mesh.rotateY(4.3)
      // let mesh = new THREE.Mesh(
      //   new THREE.SphereGeometry(35, 40, 40),
      //   new THREE.MeshLambertMaterial( {
      //       map: new THREE.TextureLoader().load(weixiang) }
      //   )
      // )


      // 创建身体
      var bodyGeome = new THREE.CylinderGeometry(40, 40, 100, 8, 8);
      var bodyMateria = new THREE.MeshLambertMaterial({
        color: 0xff00ff
      });
      var bodyMesh = new THREE.Mesh(bodyGeome, bodyMateria);
      bodyMesh.position.set(0, -75, 0);
      scene.add(bodyMesh);

      // 创建胳膊
      var armGeome = new THREE.CylinderGeometry(15, 15, 100, 25);
      var armMateria = new THREE.MeshLambertMaterial({
        color: 0xff00ff
      });
      var armMesh = new THREE.Mesh(armGeome, armMateria);
      armMesh.position.set(50, -5, 10);
      armMesh.rotateX(10);
      scene.add(armMesh);

      // 创建胳膊
      var armGeome2 = new THREE.CylinderGeometry(15, 15, 100, 25);
      var armMateria2 = new THREE.MeshLambertMaterial({
        color: 0xff00ff
      });
      var armMesh = new THREE.Mesh(armGeome2, armMateria2);
      armMesh.position.set(-60, -45, 10);
      armMesh.rotateZ(8);
      scene.add(armMesh);

      // 球体网格模型
      var geometry2 = new THREE.SphereGeometry(60, 40, 40);
      var material2 = new THREE.MeshLambertMaterial({
        color: 0xff00ff,
        wireframe: true
      });
      var mesh2 = new THREE.Mesh(geometry2, material2); //网格模型对象Mesh
      mesh2.translateY(180); //球体网格模型沿Y轴正方向平移120
      // scene.add(mesh2);

      // 圆柱网格模型
      var geometry3 = new THREE.CylinderGeometry(50, 50, 100, 25);
      var material3 = new THREE.MeshLambertMaterial({
        color: 0xffff00
      });
      var mesh3 = new THREE.Mesh(geometry3, material3); //网格模型对象Mesh
      // mesh3.translateX(120); //球体网格模型沿Y轴正方向平移120
      mesh3.position.set(120, 0, 0); //设置mesh3模型对象的xyz坐标为120,0,0
      // scene.add(mesh3); //

      /**
       * 光源设置
       */
      //点光源
      var point = new THREE.PointLight(0xffffff);
      point.position.set(0, 200, 500); //点光源位置
      scene.add(point); //点光源添加到场景中
      //环境光
      var ambient = new THREE.AmbientLight(0x444444);
      scene.add(ambient);
      // console.log(scene)
      // console.log(scene.children)

      // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
      var axisHelper = new THREE.AxisHelper(250);
      // scene.add(axisHelper);

      /**
       * 相机设置
       */
      var width = window.innerWidth; //窗口宽度
      var height = window.innerHeight; //窗口高度
      var k = width / height; //窗口宽高比
      var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
      //创建相机对象
      var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
      camera.position.set(0, 300, 200); //设置相机位置
      camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
      /**
       * 创建渲染器对象
       */
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height); //设置渲染区域尺寸
      renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
      this.$refs.ThreeRef.appendChild(renderer.domElement); //body元素中插入canvas对象
      //执行渲染操作   指定场景、相机作为参数
      // renderer.render(scene, camera);
      // 渲染函数
      function render() {
        renderer.render(scene, camera); //执行渲染操作
        scene.add(mesh)
        requestAnimationFrame(render);
      }
      //间隔20ms周期性调用函数fun,20ms也就是刷新频率是50FPS(1s/20ms)，每秒渲染50次
      // setInterval("render()",20);
      render();

      var controls = new OrbitControls(camera,renderer.domElement);//创建控件对象
      controls.addEventListener('change', render);//监听鼠标、键盘事件
    },
    initThree() {
      // 空间坐标系 - 右手坐标系
      this.width = this.$refs.ThreeRef.clientWidth;
      this.height = this.$refs.ThreeRef.clientHeight;
      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      this.renderer.setSize(this.width, this.height);
      this.$refs.ThreeRef.appendChild(this.renderer.domElement);
      this.renderer.setClearColor(0xffffff, 1.0);
    },
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(
        45,
        this.width / this.height,
        100,
        10000
      );

      this.camera.position.x = 0;
      this.camera.position.y = 1000;
      this.camera.position.z = 0;
      this.camera.up.x = 0;
      this.camera.up.y = 0;
      this.camera.up.z = 1;
      this.camera.lookAt({
        x: 0,
        y: 0,
        z: 0
      });
    },
    initScene() {
      this.scene = new THREE.Scene();
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

      this.light = new THREE.AmbientLight(0xffffff, 1.0, 0);
      this.light.position.set(100, 100, 200);
      this.scene.add(this.light);
    },
    initObject() {
      // 最常见的材质之一就是Lambert材质，这是在灰暗的或不光滑的表面产生均匀散射而形成的材质类型。比如一张纸就是Lambert表面。 首先它粗糙不均匀，不会产生镜面效果。我们在阅读书籍的时候，没有发现书上一处亮，一处不亮吧，它非常均匀，这就是兰伯特材质。
      var geometry = new THREE.Geometry();
      var material = new THREE.LineBasicMaterial({
        vertexColors: true
      });
      var color1 = new THREE.Color(0x444444),
        color2 = new THREE.Color(0xff0000);

      // 线的材质可以由2点的颜色决定

      var p1 = new THREE.Vector3(-500, 0, 0);
      var p2 = new THREE.Vector3(500, 0, 0);

      // vertices 顶点的队列，保存了模型中每个顶点的位置信息。
      geometry.vertices.push(p1);
      geometry.vertices.push(p2);
      // geometry中colors表示顶点的颜色，必须材质中vertexColors等于THREE.VertexColors 时，颜色才有效，如果vertexColors等于THREE.NoColors时，颜色就没有效果了。那么就会去取材质中color的值

      for (let i = 0; i <= 20; i++) {
        geometry.colors.push(color1, color2);

        var line1 = new THREE.Line(geometry, material);
        line1.position.z = i * 50 - 500;
        this.scene.add(line1);

        var line = new THREE.Line(geometry, material);

        line.position.x = i * 50 - 500;
        line.rotation.y = (90 * Math.PI) / 180;
        this.scene.add(line);
      }
    },
    threeStart() {
      this.initThree();
      this.initCamera();
      this.initScene();
      this.initLight();
      this.initObject();

      this.animation();
    },
    animation() {
      //renderer.clear();
      // this.camera.position.y = this.camera.position.y +1;
      // this.camera.position.x = this.camera.position.x +1;
      this.camera.rotation.z = this.camera.rotation.z + 0.01;
      // this.camera.rotation.x = this.camera.rotation.x +0.01;
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animation);
    },
    createOnThree() {
      let _this = this;
      this.initThree();
      this.initCamera();
      this.initScene();
      this.initLight();
      var geometry = new THREE.CubeGeometry(1, 1, 1);
      // 创建基础的 表层材质
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      // 把渲染成的小方块 和 材质合并
      var cube = new THREE.Mesh(geometry, material);
      // 添加到场景中
      this.scene.add(cube);
      // this.camera.position.z = 5;
      function render() {
        // 相当于setinterval 让浏览器去执行一次参数中的函数，这样通过上面render中调用requestAnimationFrame()函数，requestAnimationFrame()函数又让rander()再执行一次，就形成了我们通常所说的游戏循环了。
        requestAnimationFrame(render);

        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;
        /**
                 * 渲染应该使用渲染器，结合相机和场景来得到结果画面。实现这个功能的函数是

                 renderer.render(scene, camera);

                 渲染函数的原型如下：

                 render( scene, camera, renderTarget, forceClear )

                 各个参数的意义是：

                 scene：前面定义的场景

                 camera：前面定义的相机

                 renderTarget：渲染的目标，默认是渲染到前面定义的render变量中

                 forceClear：每次绘制之前都将画布的内容给清除，即使自动清除标志autoClear为false，也会清除。
                 */
        _this.renderer.render(_this.scene, _this.camera);
      }
      render();
    }
  }
};
</script>

<style lang="less">
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
