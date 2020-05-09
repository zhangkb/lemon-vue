// 在计算机世界里，3D世界是由点组成，两个点能够组成一条直线，三个不在一条直线上的点就能够组成一个三角形面，无数三角形面就能够组成各种形状的物体
// 我们通常把这种网格模型叫做Mesh模型。给物体贴上皮肤，或者专业点就叫做纹理，那么这个物体就活灵活现了。最后无数的物体就组成了我们的3D世界
import * as THREE from "three"

var mixin = {
    methods: {
        formatDate (time) {
            var date = new Date(time);
            var year = date.getFullYear(),
            month = date.getMonth() + 1,//月份是从0开始的
            day = date.getDate(),
            hour = date.getHours(),
            min = date.getMinutes(),
            sec = date.getSeconds();
            var newTime = year + '-' +
            month + '-' +
            day + ' ' +
            hour + ':' +
            min + ':' +
            sec;
            return newTime;
        },
        createPoint (refDom) {
            var scene = new THREE.Scene()
            var camera = new THREE.new THREE.PerspectiveCamera(75, 1, 0.1, 1000)

            var renderer = new Three.WebGLRenderer();

            renderer.setSize(window.innerWidth, window.innerHeight)

            // 4、创建渲染区域的大小 参数 宽 高
            // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
            renderer.setSize(window.innerWidth, window.innerHeight)

            refDom.appendChild(renderer.domElement)
            // 在3D世界中点可以用THREE.Vector3D来表示。对应源码为/src/math/Vector3.js
            var point1 = new THREE.Vector3(4,8,9)

            var point2 = new THREE.Vector3()

            point2.set(6,9,10)

            var material = new Three.MeshBasicMaterial({color: 0x00ff00});
            // 把渲染成的小方块 和 材质合并
            var cube = new Three.Mesh(geometry, material);

        }
    }

};
export default mixin;
