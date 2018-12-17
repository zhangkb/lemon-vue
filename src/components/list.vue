<template lang="html">
    <div class="list-body">
        <div v-html="content">

        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data () {
        return {

        }
    },
    methods: {
        listArticle () {
            var _this = this;
            axios.get("http://localhost:3000/list", {
                params:{
                    _id: this.$route.query.id
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
