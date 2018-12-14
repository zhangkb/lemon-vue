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
                        <div class="img-title">
                            <span>杂学课</span>
                            <p>杂学支离二各载，汗牛充栋终何为。</p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="img-box">
                        <img src="../assets/img/2.jpg" alt="">
                        <div class="img-title">
                            <span>草医录</span>
                            <p>月有盈亏花有开谢，想人生最苦离别。</p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="img-box">
                        <img src="../assets/img/3.jpg" alt="">
                        <div class="img-title">
                            <span>美食集</span>
                            <p>小园五亩翦蓬蒿，便觉人间迹可逃。</p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="img-box">
                        <img src="../assets/img/4.jpg" alt="">
                        <div class="img-title">
                            <span>花草集</span>
                            <p>若教解语应倾国，任是无情也动人</p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="img-box">
                        <img src="../assets/img/5.jpg" alt="">
                        <div class="img-title">
                            <span>工作日</span>
                            <p>半醒半醉日复日， 花开花落年复年。</p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="img-box">
                        <img src="../assets/img/6.jpg" alt="">
                        <div class="img-title">
                            <span>记事本</span>
                            <p>雨后闲来无别事，我在等风也等你</p>
                        </div>
                    </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <div class="home-body">

            <div class="list-box">
                <div class="list-header">
                    <span class="list-date">
                        2018-12-14
                    </span>
                    <h2 class="list-title">
                        招婚启事：张志杰
                    </h2>
                    <p class="list-type">
                        <span class="list-type-color">
                            温柔可爱、秀外慧中、出得厅堂、入得厨房
                        </span>
                    </p>
                </div>
                <div class="list-img">
                    <img src="../assets/img/timg.jpg" alt="">
                </div>
                <div class="list-intro">
                    <p>
                        家乡：河南省安阳市 毕业院校：河南科技大学
                    </p>
                    <p>
                        性格温柔可爱、秀外慧中、出得厅堂、入得厨房，欢迎各位小姐姐来撩哦 ^.0!
                    </p>
                </div>
            </div>
            
            <div class="list-box">
                <div class="list-header">
                    <span class="list-date">
                        2018-12-14
                    </span>
                    <h2 class="list-title">
                        网站登录的简单JWT实现
                    </h2>
                    <p class="list-type">
                        <span class="list-type-color">
                            javaScript、Node、JWT、网站登录
                        </span>
                    </p>
                </div>
                <div class="list-img">
                    <img src="../assets/img/post-img-3.jpg" alt="">
                </div>
                <div class="list-intro">
                    <p>
                        JWT(json web token)是为了在网络应用环境间传递声明而执行的一种基于JSON的开放标准。

                    </p>
                    <p>
                        JWT的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源。比如用在用户登录上。
                    </p>
                </div>
            </div>

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
            > .swiper-container {
                padding-bottom: 40px;
            }
            .img-box {
                position: relative;
                // max-width: 1200px;
                img {
                    width: 100%;
                }
                .img-title {
                    position: absolute;
                    bottom: 0;
                    width: calc(100% - 30px);
                    padding: 20px 15px;
                    background-color: rgba(0,0,0,.8);
                    span {
                        color: #fff;
                        font-size: 18px;
                        font-weight: 500;
                        letter-spacing: 2px;
                        display: inline-block;
                        line-height: 18px;
                        cursor: pointer;
                    }
                    p {
                        margin-bottom: 0px;
                        margin-top: 15px;
                        font-size: 14px;
                        color: #fff;
                        text-align: left;
                        line-height: 16px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }
            }
        }
        .home-body {
            min-height: 400px;
            min-width: 1024px;
            max-width: 1280px;
            margin: 0 auto;
        }
    }
    .list-box {
        width: 100%;
        text-align: center;
        background: #fff;
        margin-top: 50px;
        box-shadow: 0px 30px 60px 0px #f9f9f9;
        -webkit-box-shadow: 0px 30px 60px 0px #f9f9f9;
        background-color: #fff;
        word-break: break-word;
        border: 1px solid #ddd;
        margin-bottom: 50px;
        overflow: hidden;
        padding: 30px 0;
        .list-date {
            width: 100%;
            display: block;
            font-size: 16px;
            color: #bfbfbf;
            letter-spacing: 1px;
            text-align: center;
            font-style: normal;
            font-weight: normal;
            padding: 10px 0;
        }
        .list-title {
            font-size: 24px;
            color: #575756;
            margin: 0;
            text-decoration: none;
            cursor: pointer;
            &:hover {
                color: #5ca087;
            }
        }
        .list-type {
            font-weight: 400;
            color: #7fcaad;
            text-transform: capitalize;
            letter-spacing: 2px;
            padding-top: 10px;
            display: block;
            text-align: center;
            font-size: 16px;
            margin-bottom: 44px;
        }
        .list-img {
            width: 100%;
            img {
                width: 100%;
            }
        }
        .list-intro {
            max-width: 740px;
            margin: 50px auto;
            padding: 0 20px;
            font-size: 16px;
            p {
                letter-spacing: 0.6px;
                line-height: 30px;
                // width: 100%;
                text-align: left;
                // white-space: pre-wrap;
                word-wrap: break-word;
                word-break: break-all;
                color: #333;
                margin: 0 0 15px 0;
            }
        }
    }
</style>
