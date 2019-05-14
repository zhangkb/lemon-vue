<template lang="html">
  <div class="list-body">
    <div class="scrollBox" ref="scrollBox">
      <!-- <div></div> -->
      <p v-for="item in luckArr">{{item}}</p>
      <!-- {{ luckArr }} -->
    </div>
    <button @click="luckDraw">机选一注</button>
  </div>
</template>

<script>
  export default {
    name: 'FootPrint',
    data () {
        return {
          luckArr: []
        }
    },
    methods: {
      getScrollTop(){
        let top = this.$refs.scrollBox.scrollTop
        console.log(top);
      },
      luckDraw() {
          let frontArea =
              ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35'] // 前区号码
          let backArea =
              ['01','02','03','04','05','06','07','08','09','10','11','12'] // 后区号码
          let frontResult = [];
          let backResult = [];

          function frontRandom () {

              if (frontResult.length >= 5)return

              shuffle(frontArea) // 数据获取前统一打乱5次
              shuffle(frontArea)
              shuffle(frontArea)
              shuffle(frontArea)
              shuffle(frontArea)

              let randomIndex = Math.floor(Math.random()*frontArea.length)

              frontResult.push(frontArea[randomIndex])
              frontArea = frontArea.filter(function(item){
                  return item != frontArea[randomIndex]
              })
              frontRandom()
          }

          function backRandom () {
              if (backResult.length >= 2) return

              shuffle(backArea) // 数据获取前统一打乱5次
              shuffle(backArea)
              shuffle(backArea)
              shuffle(backArea)
              shuffle(backArea)

              let randomIndex = Math.floor(Math.random()*backArea.length)

              backResult.push(backArea[randomIndex])
              backArea = backArea.filter(function(item){
                  return item != backArea[randomIndex]
              })
              backRandom()
          }

          function shuffle(arr) { // 数组打乱
              var length = arr.length,
              randomIndex,
              temp;
              while (length) {
              randomIndex = Math.floor(Math.random() * (length--));
              temp = arr[randomIndex];
              arr[randomIndex] = arr[length];
              arr[length] = temp
              }
              return arr;
          }

          frontRandom()
          backRandom()

          let result = frontResult.sort().join(' ') + ' - ' + backResult.sort().join(' ')
          this.luckArr.push(result)
      }
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
          color: #333;
      }
      .scrollBox {
            width: 200px;
            /* height: 200px; */
            /* overflow-y: scroll; */
            /* overflow: auto; */
            margin-bottom: 20px;
            p {
              background: linear-gradient(to right, red, blue);
              -webkit-background-clip: text;
              color: transparent;
            }
        }
        .scrollBox div {
            /* width: 200px; */
            height: 400px;
            background-image: linear-gradient(red,blue)
        }
  }
</style>
