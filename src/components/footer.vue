<template lang="html">
    <div class="footer-nav">
        <div class="footer-body">

        </div>
        <div class="footer-bottom">
            Copyright © lemontea.xin All rights reserved.
        </div>
    </div>
</template>

<script>
export default {
    name: 'Fotter',
    data () {
        return {

        }
    },
}
</script>

<style lang="less">
    .footer-nav {
        .footer-body {
            height: 180px;
            background-color: #575756;
            font-weight: 300;
            text-align: left;
            padding-top: 20px;
            padding-bottom: 10px;
        }
        .footer-bottom {
            color: #7c7c7c;
            line-height: 20px;
            font-weight: 400;
            font-size: 14px;
            text-align: center;
            letter-spacing: 1px;
            padding: 15px 0;
            background: #373735;
        }
    }
</style>
