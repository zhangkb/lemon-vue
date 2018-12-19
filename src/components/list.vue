<template lang="html">
    <div class="list-body">
        <div class="list-title">
            <h2>{{ title }}</h2>
        </div>

        <div class="ql-container ql-snow">
            <div class="ql-editor list-code" v-html="content">
            </div>
        </div>
        <p class="list-date"><span>{{ author }}</span><span>{{ formatDate(changeDate) }}</span></p>
        <!-- <div v-html="content" class="list-code">

        </div> -->
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
    name: 'Header',
    data () {
        return {
            content: '',
            title: '',
            author: '',
            changeDate: '',
        }
    },
    mounted() {
        this.listArticle();
    },
    methods: {
        listArticle () {
            var _this = this;
            // 120.79.214.223
            axios.get("http://120.79.214.223:3000/detail", {
                params:{
                    _id: _this.$route.params.id
                }
            }).then((res) => {
              var data = res.data.data;
              _this.content = data[0].content;
              _this.title = data[0].title;
              _this.author = data[0].author;
              _this.changeDate = data[0].changeDate;
            });
        },
    },
}
</script>

<style lang="less">
    .list-body {
        width: 1200px;
        margin: 40px auto;
        padding: 25px 40px;
        background-color: #fff;
        .list-title {
            border-bottom: 1px solid #e0e0e0;
        }
        .list-code {
            padding: 25px 0;
        }
        .list-date {
            display: flex;
            justify-content:space-between;
            align-items: center;
            padding: 20px 40px 10px 40px;
            border-top: 1px solid #e0e0e0;
        }
        h2 {
            color: #333;
            cursor: pointer;
            margin: 10px 0;
            padding-bottom: 15px;
            text-align: center;
        }
        p {
            line-height: 30px;
            color: #333;
        }
        .ql-container.ql-snow {
            border: none;
        }
    }
</style>
