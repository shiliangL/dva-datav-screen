<!--
 * @Author: shiliangL
 * @Date: 2021-12-07 10:39:34
 * @LastEditTime: 2022-08-11 18:49:30
 * @LastEditors: Do not edit
 * @Description: 数据数字效果
 * @Description: 占比条
-->
<template>
  <div class="dva-capsule-bar">
    <div class="capsule-bar-title">
      <div class="title"> {{ initConfig.title }} </div>
      <div class="value">
        <dva-count2 :end="summary"></dva-count2>
        <span class="unit"> {{ initConfig.unit }} </span>
      </div>
    </div>
    <div class="content">
      <div
        class="grid"
        :style="{'grid-template-columns': `repeat(${initConfig.list.length}, 1fr)`}"
      >
        <div
          :key="index"
          class="grid-item-columns"
          v-for="(item,index) in initConfig.list"
        >
          <div class="title">
            <div
              class="legend"
              :style="{'color': item.color, 'background': item.color }"
            >
            </div>
            {{ item.title }}
          </div>
          <div class="value"> {{ item.value }} <span class="unit"> {{ item.unit }} </span> </div>
        </div>
      </div>
      <div class="capsule-bar dva-progress-active">
        <div
          :key="index"
          class="capsule-bar-item"
          v-for="(item,index) in initConfig.list"
          :style="{'background': item.color, 'width': getPercentage(item) }"
        >
          <!-- 色带 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import DvaCount2 from 'dva-datav2/dva-count2'

export default {
  name: 'DvaCapsuleBar',
  props: {
    config: {
      type: Object,
      desc: '配置项-常规配置-不参与数据响应式',
      default: () => ({
      })
    }
  },
  components: {
    DvaCount2
  },
  data () {
    return {
      initConfig: {
        title: '智能设备总数',
        unit: '个',
        list: [
          { title: '在线个数', value: 16, unit: '个', color: '#00cfff' },
          { title: '待机个数', value: 7, unit: '个', color: '#592CF3' },
          { title: '离线个数', value: 5, unit: '个', color: '#FCE173' }
        ]
      }
    }
  },
  computed: {
    summary () {
      const { list = [] } = this.initConfig
      return list.reduce((sum, cur) => ((cur.value || 0) + sum), 0)
    }
  },
  watch: {
    config: {
      immediate: true,
      handler (config) {
        Object.assign(this.initConfig, config || {})
      }
    }
  },
  methods: {
    getPercentage (item) {
      return item.value ? ((item.value / this.summary) * 100 + '%') : '0%'
    }
  }
}
</script>

<style lang="scss" scoped>
.dva-capsule-bar {
  padding: 10px;
  .capsule-bar-title {
    display: flex;
    align-items: baseline;
    margin-bottom: 6px;
    .title {
      font-size: 16px;
    }
    .value {
      font-size: 18px;
      display: flex;
      padding: 0 4px;
      color: #fce173;
      align-items: baseline;
      .unit {
        font-size: 12px;
        display: inline-block;
      }
    }
  }
  .grid {
    display: grid;
    margin: 2px 0;
    .grid-item-columns {
      line-height: 1.4;
    }
    .title {
      font-size: 14px;
      .legend {
        width: 10px;
        height: 10px;
        display: inline-block;
      }
    }
    .value {
      color: #63e1ff;
      display: flex;
      font-size: 18px;
      padding-left: 18px;
      align-items: baseline;
      .unit {
        font-size: 12px;
      }
    }
  }
  .capsule-bar {
    height: 6px;
    width: 100%;
    padding: 2px;
    display: flex;
    align-items: center;
    border-radius: 22px;
    box-shadow: 0 0 3px #999;
    border: 1px solid rgba(225, 225, 225, 0.45);
    .capsule-bar-item {
      height: 100%;
      border-radius: 22px;
      background: #3483df;
      transition: all 0.6s ease;
    }
  }
}
</style>
