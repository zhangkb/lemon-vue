<template lang="html">
    <div class="list-body">
        <div v-html="content">

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
            content: ''
        }
    },
    mounted() {
        this.listArticle();
    },
    methods: {
        listArticle () {
            var _this = this;
            // 120.79.214.223
            debugger
            axios.get("http://120.79.214.223:3000/detail", {
                params:{
                    _id: _this.$route.params.id
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
    .list-body {
        width: 1280px;
        margin: 0 auto;
    }
</style>
