<template>
  <div class="datav-aside">
    <div class="datav-aside-item">
      <DvaTitleBar title="设备在线情况" />
      <div class="content">
        <dva-capsule-bar
          :config="item"
          v-for="(item,index) in capsuleList"
          :key="index"
        ></dva-capsule-bar>
      </div>
    </div>
    <div class="datav-aside-item">
      <DvaTitleBar title="设备异常情况" />
      <div class="content">
        <dva-grid-section
          :gap="10"
          :dataList="gridData"
        ></dva-grid-section>
      </div>
    </div>
    <div class="datav-aside-item">
      <DvaTitleBar title="设备异常统计" />
      <div class="content">
        <DvaChartPie
          isUnit
          style="height:180px"
          :showDecorator="false"
          :showDecoratorLine="false"
          :chartData="chartData"
        ></DvaChartPie>
      </div>
    </div>
    <div class="datav-aside-item">
      <DvaTitleBar title="设备能耗统计" />
      <div class="content">
        <dva-core-chart
          style="height:190px"
          :option="lineOption"
          @ready="lineReady"
        />
      </div>
    </div>
  </div>
</template>

<script>

// const { echarts } = window
export default {
  name: 'DeviceProfileLeft',
  desc: '设备监控左边面板',
  data () {
    return {
      gridData: [
        { text: '今日预警总数', num: 320, unit: '项', icon: 'icon-ceshishenqing' },
        { text: '本月预警总数', num: 2220, unit: '项', icon: 'icon-tubiao-zhuzhuangtu' },
        { text: '今日报警总数', num: 350, unit: '项', icon: 'icon-xiaoxi' },
        { text: '本月报警总数', num: 4220, unit: '项', icon: 'icon-tubiao-bingtu' },
        { text: '已处理异常数', num: 1820, unit: '项', icon: 'icon-gongdanqueren' },
        { text: '待处理异常数', num: 230, unit: '项', icon: 'icon-renwujincheng' }
      ],
      capsuleList: [
        {
          title: '设备总数',
          unit: '个',
          list: [{
            title: '在线个数',
            value: 24523,
            unit: '个',
            color: 'linear-gradient(-90deg, #5071FF, #21CDFF)'
          },
          {
            title: '离线个数',
            value: 1033,
            unit: '个',
            color: 'linear-gradient(269deg, #fadb4d, #fff2b7)'
          }
          ]
        }
      ],
      chartData: [
        { name: '温度异常', value: 1612, unit: '项' },
        { name: '噪音警告', value: 1116, unit: '项' },
        { name: '气味报警', value: 912, unit: '项' },
        { name: '远程异常', value: 526, unit: '项' },
        { name: '其他报警', value: 328, unit: '项' }
      ],
      lineOption: {
        backgroundColor: 'transparent',
        grid: {
          top: '4%',
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        legend: {
          top: 0,
          right: 10,
          show: false,
          icon: 'stack',
          textStyle: {
            color: '#fff'
          },
          itemWidth: 10,
          itemHeight: 10,
          data: ['注册总量', '安装总量']
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
              backgroundColor: '#6a7985'
            }
          }
        },
        xAxis: [{
          type: 'category',
          boundaryGap: true,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#f9f9f9'
            }
          },
          axisLabel: {
            // rotate: 35,
            textStyle: {
              color: '#d1e6eb'
            }
          },
          axisTick: {
            show: false
          },
          data: new Array(12).fill(0).map((value, index) => (index + 1 + '月'))
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false,
            lineStyle: {
              color: '#0a3256'
            }
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#d1e6eb'
            }
          },
          axisTick: {
            show: false
          }
        }],
        series: [
          {
            name: '设备能耗',
            type: 'bar',
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(0,244,255,1)'
                },
                {
                  offset: 1,
                  color: 'rgba(0,77,167,1)'
                }
                ]
              },
              borderWidth: 0,
              borderColor: '#fff',
              shadowColor: 'rgba(0, 0, 0, .3)',
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2
            },
            data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330]
          }
        ]
      }
    }
  },
  beforeDestroy () {
    clearInterval(this._setInterval)
  },
  methods: {
    lineReady (chart) {
      let len = 0
      clearInterval(this._setInterval)
      this._setInterval = setInterval(() => {
        if (len === 12) len = 0
        chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: len
        })
        len++
      }, 3200)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
