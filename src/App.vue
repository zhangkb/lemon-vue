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
export default {
    name: 'App',
    data () {
        return {

        }
    },
    components: {
        HeaderNav,
        FooterNav,
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
