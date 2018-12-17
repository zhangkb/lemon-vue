<template lang="html">
    <div class="article-body">
        <ul>
            <li v-for="item in article">
                <h2>{{ item.title }}</h2>
                <span>{{item.author }}</span>
                <span>{{ item.changeDate }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
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
                width: 100%;
                padding: 25px;
                background: #fff;
                border-radius: 10px;
                border: 1px solid #e0e0e0;
                cursor: pointer;
                margin: 20px 0;
                h2 {
                    color: #333;
                    cursor: pointer;
                    margin: 10px 0;
                }
            }
        }
    }
</style>
