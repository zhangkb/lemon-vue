<template lang="html">
    <div class="home">
        <div class="home-top">
            <h2>Lemon</h2>
            <p>承蒙你出现，够我喜欢好多年</p>
        </div>
        <div class="home-scroll">
            <swiper :options="swiperOption" ref="scrollSwiper">
                <swiper-slide>
                    <div class="img-box">
                        <img src="../assets/img/1.jpg" alt="">
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="img-box">
                        <img src="../assets/img/2.jpg" alt="">
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="img-box">
                        <img src="../assets/img/3.jpg" alt="">
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="img-box">
                        <img src="../assets/img/4.jpg" alt="">
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="img-box">
                        <img src="../assets/img/5.jpg" alt="">
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="img-box">
                        <img src="../assets/img/6.jpg" alt="">
                    </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <div class="home-body">

        </div>
        <div class="home-page-box">

        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data () {
      return {
          swiperOption: {
              slidesPerView: 3,
              spaceBetween: 20,
              // centerInsufficientSlides: true,
              pagination: {
                el: '.swiper-pagination',
                clickable: true
              },
              autoplay: {
                  delay: 3000,
              },
              loop: true
          }
      }
    },
    computed: {
        swiper() {
            return this.$refs.scrollSwiper.swiper;
        }
    },
}
</script>

<style lang="less">
    .home {
        // height: 800px;
        .home-top {
            width: 100%;
            padding: 80px 0;
            h2 {
                font-family: 'FuturaLTCondensedBoldOblique';
                font-size: 50px;
                color: #5ca087;
                text-align: center;
            }
            p {
                color: #aaaaaa;
                font-size: 15px;
                text-align: center;
            }
        }
        .home-scroll {
            // height: 354px;
            .img-box {
                // max-width: 1200px;
                img {
                    width: 100%;
                }
            }
        }
        .home-body {
            min-height: 400px;
        }
    }
</style>
