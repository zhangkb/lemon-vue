<template lang="html">
  <div class="count-body">
      <input type="file" ref="upload" accept=".xls,.xlsx" class="outputlist_upload">
      <button @click="setCharts">生成图表</button>
      <v-chart :options="option" style="width: 600px;height: 600px"></v-chart>
  </div>
</template>

<script>
  import XLSX from 'xlsx'
  export default {
    name: 'Count',
    data () {
        return {
          excelArr: [],
          option: {
            color: ['#ffe600','#90d7ec','#009ad6'],
            xAxis: {
              type: 'category',
              data: ['前10人均','前20人均','后20人均','人均']
              // 前10人均、前20人均、20后人均、人均、及格率、优秀率、20后总分、20后人数、总分、人数、及格人数、优秀人数
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            yAxis: {
              type: 'value'
            },
            series: []
          }
        }
    },
    mounted() {
      this.$refs.upload.addEventListener('change', e => {//绑定监听表格导入事件
        this.readExcel(e);
      })
    },
    methods: {
      readExcel(e){
        // 读取表格数据
        var _this = this;
        const files = e.target.files;

        if (files.length <= 0) {
          // 如果不存在文件，抛出错误
          return false;
        } else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
          // this.$Message.error('上传格式不正确，请上传xls或者xlsx格式');
          alert('上传格式不正确，请上传xls或者xlsx格式')
          return false;
        }
        _this.excelArr = [];
        const fileReader = new FileReader();

        fileReader.onload = (ev) => {
          try {
            const Data = ev.target.result;
            const WorkBook = XLSX.read(Data, {
              type: 'binary'
            })
            let sheet = WorkBook.SheetNames;

            // 根据excel的表格数据进行数据统计

            let gradeAll =  sheet.map(function(item){
              let result = {
                name: item
              }
              // var wsname = WorkBook.SheetNames[0]; // 第一张表
              var ws = XLSX.utils.sheet_to_json(WorkBook.Sheets[item])
              let arr = ws.map(function(item) {
                          let result = {
                            id: item.ID,
                            name: item.Name,
                            grade: item.Grade
                          }
                          return result
                        })
              result.data = arr;
              return result;
            })
            gradeAll = _this.setAverageValue(gradeAll)
            _this.excelArr = gradeAll

            console.log(gradeAll);
            // var wsname = WorkBook.SheetNames[0]; // 第一张表
            // var ws = XLSX.utils.sheet_to_json(WorkBook.Sheets[wsname])
            // console.log(ws);
            // _this.excelArr = [];
            // _this.excelArr = ws.map(function(item) {
            //   let result = {
            //     id: item.ID,
            //     name: item.Name,
            //     grade: item.Grade
            //   }
            //   return result
            // })
            // // console.log(_this.excelArr);
            // // let grade =


            // _this.option.series = series;
            _this.$refs.upload.value = ''
          } catch (error) {
            return false;
            _this.$refs.upload.value = ''
          }
        }

        fileReader.readAsBinaryString(files[0]);
      },
      getAverageValue(arr,number){
        // 获取数组中前N个人人均分数
        // if (!number) {
        //   number = arr.length
        // }
        let grade = arr.map((item) => {
          let result = item.grade
          return result;
        });
        grade = grade.sort(function(a,b){
          return b-a;
        });
        grade = grade.slice(0,number)
        let result = grade.reduce((prev,item) => {
          return prev + item
        })
        return Math.round((result/grade.length)*100)/100
      },
      setAverageValue(arr){
        // 多表格设置平均值有关数据
        // 包括前二十、前十、后二十、平均值
        let result = arr.map((item) => {
          item.topten = this.getAverageValue(item.data,10)
          item.toptwenty = this.getAverageValue(item.data,20)
          item.latertwenty = this.getAverageValue(item.data.slice(item.data.length-20),20)
          item.average = this.getAverageValue(item.data)

          return item;
        })
        return result;
      },
      setCharts(){
        let series = [];
        for (let index = 0; index < this.excelArr.length; index++) {
          const element = this.excelArr[index];
          let name = element.name
          // .slice(5) + '班'
          let item = {
            data: [element.topten,element.toptwenty,element.latertwenty,element.average],
            type: 'bar',
            name: name,
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
          }
          series.push(item)
        }

        let xAxis = this.excelArr.map((item) => {
          let result = item.name.slice(5) + '班'
        })
        // this.option.xAxis.data = xAxis;
        this.option.series = series;
      }
    },
}
</script>

<style lang="less">
  .count-body {
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
