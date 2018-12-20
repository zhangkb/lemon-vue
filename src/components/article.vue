<template lang="html">
    <div class="article-body">
        <ul>
            <li v-for="item in article" @click="changeUrl(item._id)">
                <img :src="item.imgUrl" alt="">
                <h2>{{ item.title }}</h2>
                <p>
                    <span>{{ item.author }}</span>
                    <span>{{ formatDate(item.changeDate) }}</span>
                </p>
            </li>
        </ul>
    </div>
    <!-- 尽调文档
    1. 主要是数据处理
    2.多余的两个弹窗是显示编辑文档和预览文档
    3. 暂时考虑把文档作为一个弹窗去做
    根据传递过来的数据进行相应的展示
    两种结果
    1. 文档修改状态 修改状态 需要的值的 数据源 以及 页面可修改状态 返回值 修改后的数据
    2. 文档创建状态 创建状态 没有数据源或者理解为数据源为空 以及 页面可修改状态 返回值 生成的数据
    3. 文档预览状态 预览状态 数据源 以及页面查看状态 不可修改 返回值 无

    删除弹窗
    提示用户此操作将会删除某些数据
    删除文档的权限 当前文档无关联任务
    1. 确定 执行删除操作 返回值 操作结果 成功或失败
    2. 取消 取消操作 无返回值

    导入文档弹窗
    1. 显示操作界面
    2. 导入成功 查看预览文档 预览文档的状态值 跳转到上边的文档状态


    列表操作按钮

    1. 文档按钮 点击显示文档 可修改状态 用户可随时修改文档
    2. 删除按钮 点击弹窗提示用户当前操作为删除操作 只有当前文档无关联任务时删除操作才执行上边的内容

    文档模块暂时内容为这些

    关于组件传值的信息
    通过watch 监控数据源的变化 如果有修改 则告诉父组件数据进行了修改如果用户点击确定 提交当前修改内容
    用户点击取消的话就清除当前操作 并将值恢复成原有的数据格式

    也就是每一个要保留一个响应的数据来维系真正的值 -->
</template>

<script>
import axios from "axios";
import qs from "qs";
import mixin from './../assets/js/util.js'
export default {
    name: 'Article',
    data () {
        return {
            article: [
                {
                    title: 'asjkdhasda',
                    author: '小可爱',
                    changeDate: '2017-12-12'
                }
            ],
        }
    },
    mixins: [mixin],
    mounted() {
        this.listArticle();
    },
    methods: {
        listArticle () {
            var _this = this;
            axios.get("http://120.79.214.223:3000/list", {
                params:{
                    name: '小可爱'
                }
            }).then((res) => {
              var data = res.data.data;
              _this.article = data;
            });
        },
        changeUrl (id) {
            window.open('http://lemontea.xin/#/list/'+id)
        }
    },
}
</script>

<style lang="less">
    .article-body {
        width: 1280px;
        margin: 0 auto;
        min-height: 600px;
        ul {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            margin-top: 40px;
            li {
                position: relative;
                width: 100%;
                padding: 25px;
                background: #fff;
                border-radius: 10px;
                border: 1px solid #e0e0e0;
                cursor: pointer;
                margin: 20px 0;
                padding-left: 100px;
                img {
                    position: absolute;
                    display: block;
                    left: 10px;;
                    top: 50%;
                    width: 80px;
                    transform: translateY(-50%);
                }
                h2 {
                    color: #333;
                    cursor: pointer;
                    margin: 10px 0;
                }
                p {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                span {
                    color: #999;
                }
            }
        }
    }
</style>
