/**
 * 能力分布图 (#capBars > .cap-bars-plot) → ECharts option 组装
 *
 * 数据源与 demo-yearly-tr.html#getCapDistData 完全一致，勿另算：
 *   labels / before / min / max / mid / after
 *
 * 字段含义
 *   categories   = labels = CAP_OPTIONS = ['高','中','低']（自上而下）
 *   current      = after  = 当前筛选下 reached 且 capability===档 的人数
 *   beforeAdjust = before = 全员 reached 的 initCapability 分布（不受列表筛选）
 *   standard     = mid    = round((min+max)/2)，图例「标准」蓝点/蓝虚线用此值
 *   standardMin/Max = min/max = ceil/floor(globalTotal * CAP_FORCE.%/100)
 *                   现图灰色轨道上的浅蓝区间；ECharts 用 markArea 表达，不用 mid 替代区间
 *
 * 条形配色（与 barFillByRange 一致）
 *   actual ∈ [min,max] → #10B981（达标绿 BAR_OK）
 *   否则              → #F43F5E（超限/不足红 BAR_BAD）
 *
 * 视觉对应（横向条，与 cap-bars-plot 一致）
 *   bar     = 当前
 *   line灰  = 调整前（连接 before 三点）
 *   line蓝  = 标准（连接 mid 三点）
 *   markArea = [min,max] 标准区间底带
 *
 * 默认快照（页面无筛选、初始 Mock，2026-09-21 实测 getCapDistData）：
 *   before [7,23,14]  after [7,16,13]  min [7,22,7]  max [11,30,11]  mid [9,26,9]
 *   barColors ['#10B981','#F43F5E','#F43F5E']  // 高达标；中不足；低超限
 *
 * 用法（换 ECharts 时）：
 *   const stats = getCapDistData();
 *   chart.setOption(buildCapBarsEchartsOption(stats));
 *
 * 本文件不接入页面，不改动现有自定义 SVG/DOM 渲染。
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CapBarsEchartsData = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var BAR_OK = '#10B981';
  var BAR_BAD = '#F43F5E';
  var COLOR_BEFORE = '#A1A1AA';
  var COLOR_STANDARD = '#2563EB';
  var RANGE_FILL = 'rgba(37,99,235,0.10)';

  /** 与 demo-yearly-tr.html barFillByRange 一致 */
  function barFillByRange(actual, min, max) {
    return actual >= min && actual <= max ? BAR_OK : BAR_BAD;
  }

  /**
   * @param {object} stats getCapDistData() 返回值
   * @returns {{
   *   categories: string[],
   *   current: number[],
   *   beforeAdjust: number[],
   *   standard: number[],
   *   standardMin: number[],
   *   standardMax: number[],
   *   barColors: string[]
   * }}
   */
  function toCapBarsSeriesData(stats) {
    var categories = (stats && stats.labels) || ['高', '中', '低'];
    var current = (stats && stats.after) || [];
    var beforeAdjust = (stats && stats.before) || [];
    var standardMin = (stats && stats.min) || [];
    var standardMax = (stats && stats.max) || [];
    var standard = (stats && stats.mid) || [];
    var barColors = current.map(function (v, i) {
      return barFillByRange(v, standardMin[i], standardMax[i]);
    });
    return {
      categories: categories,
      current: current,
      beforeAdjust: beforeAdjust,
      standard: standard,
      standardMin: standardMin,
      standardMax: standardMax,
      barColors: barColors
    };
  }

  /**
   * 组装可直接 chart.setOption 的 ECharts option（横向 bar + 两条折线）。
   * @param {object} stats getCapDistData() 返回值
   * @returns {object} ECharts option
   */
  function buildCapBarsEchartsOption(stats) {
    var d = toCapBarsSeriesData(stats);
    var n = d.categories.length;
    var markAreaData = [];
    for (var i = 0; i < n; i++) {
      markAreaData.push([
        { yAxis: d.categories[i], xAxis: d.standardMin[i] },
        { yAxis: d.categories[i], xAxis: d.standardMax[i] }
      ]);
    }

    return {
      color: [COLOR_BEFORE, COLOR_STANDARD],
      grid: { left: 48, right: 36, top: 12, bottom: 36, containLabel: false },
      legend: {
        bottom: 0,
        left: 'left',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: { fontSize: 11, color: '#71717A' },
        data: [
          { name: '调整前', icon: 'circle' },
          { name: '标准', icon: 'circle' },
          { name: '当前', icon: 'rect' }
        ]
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (items) {
          if (!items || !items.length) return '';
          var idx = items[0].dataIndex;
          var lines = [d.categories[idx]];
          lines.push('调整前: ' + d.beforeAdjust[idx] + '人');
          lines.push('当前: ' + d.current[idx] + '人');
          lines.push('标准点: ' + d.standard[idx] + '人');
          lines.push('要求区间: ' + d.standardMin[idx] + '–' + d.standardMax[idx] + '人');
          return lines.join('<br/>');
        }
      },
      xAxis: {
        type: 'value',
        min: 0,
        minInterval: 1,
        axisLabel: { color: '#A1A1AA', fontSize: 11 },
        splitLine: { lineStyle: { color: '#E4E4E7' } }
      },
      yAxis: {
        type: 'category',
        data: d.categories,
        inverse: true,
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: { color: '#3F3F46', fontSize: 12, fontWeight: 600 }
      },
      series: [
        {
          name: '当前',
          type: 'bar',
          data: d.current.map(function (v, i) {
            return { value: v, itemStyle: { color: d.barColors[i], borderRadius: [0, 999, 999, 0] } };
          }),
          barWidth: 12,
          z: 2,
          markArea: {
            silent: true,
            itemStyle: { color: RANGE_FILL },
            data: markAreaData,
            z: 0
          }
        },
        {
          name: '调整前',
          type: 'line',
          data: d.beforeAdjust,
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: { color: COLOR_BEFORE, borderColor: '#fff', borderWidth: 1.5 },
          lineStyle: { color: COLOR_BEFORE, width: 1.75, type: [1, 5] },
          smooth: 0.35,
          z: 3
        },
        {
          name: '标准',
          type: 'line',
          data: d.standard,
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: { color: COLOR_STANDARD, borderColor: '#fff', borderWidth: 1.5 },
          lineStyle: { color: COLOR_STANDARD, width: 1.75, type: [1, 5] },
          smooth: 0.35,
          z: 4
        }
      ]
    };
  }

  /** 文档用：与初始 Mock 一致的系列快照（非运行时权威，运行时请调 getCapDistData） */
  var SAMPLE_FROM_GET_CAP_DIST_DATA = {
    categories: ['高', '中', '低'],
    current: [7, 16, 13],
    beforeAdjust: [7, 23, 14],
    standard: [9, 26, 9],
    standardMin: [7, 22, 7],
    standardMax: [11, 30, 11],
    barColors: ['#10B981', '#F43F5E', '#F43F5E']
  };

  return {
    BAR_OK: BAR_OK,
    BAR_BAD: BAR_BAD,
    barFillByRange: barFillByRange,
    toCapBarsSeriesData: toCapBarsSeriesData,
    buildCapBarsEchartsOption: buildCapBarsEchartsOption,
    SAMPLE_FROM_GET_CAP_DIST_DATA: SAMPLE_FROM_GET_CAP_DIST_DATA
  };
});
