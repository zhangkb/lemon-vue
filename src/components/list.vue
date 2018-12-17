<template lang="html">
    <div class="list-body">
        <div>
            <h2>{{ title }}</h2>
            <span>{{ author }}</span><span>{{ changeDate }}</span>
        </div>
        <div v-html="content" class="list-code">

        </div>
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
        .list-code {
            padding: 25px 0;
        }
        h2 {
            color: #333;
            cursor: pointer;
            margin: 10px 0;
        }
        p {
            line-height: 30px;
        }
    }
</style>
