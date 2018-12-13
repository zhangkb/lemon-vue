<template lang="html">
    <div class="header-nav">
        <div class="icon-home">
            <span>LemonBlog</span>
        </div>
        <ul class="header-tap">
            <li>
                文章
            </li>
            <li>
                足迹
            </li>
            <li>
                学习地图
            </li>
            <li>
                Me
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
        .icon-home {
            margin-left: 30px;
            font-size: 20px;
            font-family: 'FuturaLTCondensedBoldOblique';
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
            }
        }
    }
</style>
