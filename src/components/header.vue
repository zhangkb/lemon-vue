<template lang="html">
    <div class="header-nav">
        <div class="icon-home">
            <span><router-link :to="{ name: 'Home', params: {} }">LemonBlog</router-link></span>
        </div>
        <ul class="header-tap">
            <li>
                <router-link :to="{ name: 'Article', params: {} }">文章</router-link>
            </li>
            <li>
                <router-link :to="{ name: 'Create', params: {} }">记录</router-link>
            </li>
            <li>

                <router-link :to="{ name: 'ThreeJs', params: {} }">足迹</router-link>
            </li>
            <li>

                <router-link :to="{ name: 'PointJs', params: {} }">学习地图</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Count', params: {} }">统计</router-link>
          </li>
            <li>
                <router-link :to="{ name: 'FootPrint', params: {} }">Me</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data () {
        return {

        }
    },
}
</script>

<style lang="less">
    .header-nav {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e7e7e7;
        line-height: 60px;
        color: #777;
        background-color: #fff;
        a {
            color: #777;
            text-decoration: none;
        }
        .icon-home {
            margin-left: 30px;
            font-size: 20px;
            font-family: 'FuturaLTCondensedBoldOblique';
            a {
                color: #777;
                text-decoration: none;
            }
        }
        .header-tap {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            padding: 0 20px;
            font-size: 16px;
            li {
                color: #777;
                padding: 0 20px;
                cursor: pointer;
                a {
                    color: #777;
                    text-decoration: none;
                }
            }
        }
    }
</style>
