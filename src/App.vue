<template>
  <div id="app">
      <header-nav></header-nav>
      <router-view/>
      <footer-nav></footer-nav>
  </div>
</template>

<script>
import HeaderNav from './components/header'
import FooterNav from './components/footer'
import axios from "axios";
import qs from "qs";
export default {
    name: 'App',
    data () {
        return {

        }
    },
    components: {
        HeaderNav,
        FooterNav,
    },
    mounted () {
        this.countNum();
    },
    methods: {
        countNum () {
            axios.get("http://120.79.214.223:3000/count",{params:{}}).then((data) => {
                console.log(data);
            })
        },
    }
}
</script>

<style>
    @import 'swiper/dist/css/swiper.css';
    body,html {
        background-color: #f6f6f6;
    }
    #app {
        min-width: 1280px;
    }
</style>
