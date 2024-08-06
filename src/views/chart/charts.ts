import { color } from 'echarts';
import { graphic } from 'echarts/core';
import { tr } from 'element-plus/es/locale';
import { ref } from 'vue';

// 问题1:图形显示不全,老是偏移
export const TrappedCount = ref(0);

export const TrappedAmount = ref(0);


export const ReasonDist = ref({
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            const { data, color } = params;
            return `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color}"></span>${data.name}<br/>受阻资金总额: ${data.value[0].toFixed(2)}元<br/>受阻笔数: ${data.value[1]}`;
          },
    },
    color: ['#E64747', '#EF7473', '#FF8C36', '#FCC353', '#F7C6BB'],
    series: [
        {
            name: '受阻资金总额',
            type: 'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
            },
            // 传数据的时候一定要排好序的
            data: [],
        },
    ],
});


export const Trend = ref({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
    },
    xAxis: {
        type: 'category',
        // boundaryGap: false,
        data: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'],

    },
    yAxis:[
        {
            type: 'value',
            name: '受阻资金总额',
            position: 'left',
            axisLine: {
                show: true // 可选：取消轴线
            },
            splitLine:{  
                show:true  
            }
        },
        {
            type: 'value',
            name: '受阻交易笔数',
            position: 'right',
            axisLine: {
                show: true // 可选：取消轴线
            },
            splitLine:{  
                show:true  
            }
        }
    ],
    grid: {
        top: '2%',
        left: '2%',
        // right: '0%',
        bottom: '10%',
        containLabel: true,
    },
    
    color: ['#E64747','#FF8C36'],
    series: [
        {
            name:'受阻资金总额',
            type: 'line',
            // 渐变填充
            areaStyle: {
                color: new graphic.LinearGradient(1, 0, 1, 1, [
                    {
                        offset: 0,
                        color: 'rgba(244, 67, 54 ,0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(244, 67, 54 ,0.2)',
                    },
                ]),
            },
            smooth: true,
            data: [],

        },
        {
            name :'受阻交易笔数',
            type: 'line',
            smooth: true,
            data: [],
            yAxisIndex: 1

        },
    ],
    legend: {
        data: ['受阻资金总额', '受阻交易笔数'],
        bottom: '1%',
        left: 'center',
    },
});


export const mapOptions = ref({
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color}"></span>${params.name} <br/>受阻资金总额: ${params.data.value[0]}<br/>受阻交易笔数: ${params.data.value[1]}`;
        }

    },
    geo: {
        map: 'china',
        roam: false,
        center: [108, 35],
        emphasis: {
            itemStyle: { areaColor: '#FCC353'}, // 鼠标移到某个省份上时，该省份的颜色变为黄色,且不显示标签
            label: { show: false },  
        },  
        select: { 
            itemStyle: { areaColor: '#FCC353' },
            label:{ show: false },   // 鼠标选中某个省份时，该省份的颜色变为黄色,且不显示标签
        }
    },
    visualMap: {
        show: false,
        min: 0,
        max: 1000,
        realtime: false,
        calculable: false,
        dimension: 0,
        inRange: {
            color: ['#fff', '#ff4747'],
        },
    },
    series: [
        {
            geoIndex: 0,
            name: '地域分布',
            type: 'map',
            coordinateSystem: 'geo',
            map: 'china',
            data: [
                // { name: '北京', value: [100,20] },
                // { name: '上海', value: [100,20] },
                // { name: '广东', value: [100,20] },
                // { name: '浙江', value: [90 ,20]},
                // { name: '江西', value: [80 ,20]},
                // { name: '山东', value: [70 ,20]},
                // { name: '广西', value: [60 ,20]},
                // { name: '河南', value: [50 ,20]},
                // { name: '河南', value: [40 ,20]},
                // { name: '青海', value: [70 ,20]},
                // { name: '河南', value: [30 ,20]},
                // { name: '黑龙江', value: [20 ,20]},
                // { name: '新疆', value: [20 ,20]},
                // { name: '云南', value: [20 ,20]},
                // { name: '甘肃', value: [20 ,20]},
            ],
        },
    ],
 
});


export const AmountDist = ref({
    xAxis: {
        type: 'category',
        data: ['<5k', '5w', '50w', '500w', '>500w'],
        axisLabel: {
            rotate: -45, // 旋转45度
        },
    },
    yAxis:[
        {
            type: 'value',
            name: '受阻资金总额',
            position: 'left',
            axisLine: {
                show: true // y轴
            },
            // splitNumber: 3
        },
        {
            type: 'value',
            name: '受阻交易笔数',
            position: 'right',
            axisLine: {
                show: true // y轴线
            },
            // splitNumber: 4,
        },
    ],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
    },
    color: ['#E64747','rgba(255, 140, 54 ,0.6)' ],
    series: [
        {
            data: [],
            type: 'bar',
            name:'受阻资金总额',
            barWidth: '50%',
            yAxisIndex:0
           
        },
        {
            data: [],
            type: 'line',
            name:'受阻交易笔数',
            yAxisIndex: 1
        },
    ],
    legend: {
        data: ['受阻资金总额', '受阻交易笔数'],
        bottom: '1%',
        left: 'center',
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '2%',
        bottom: '10%',
        containLabel: true,
    },
});


export const CardDist = ref({
    xAxis: [
        {
            type: 'category',
            data: [],
            // name: '卡种',
            axisLabel: {
                rotate: -45, // 旋转45度
            },
        },
    ],
    yAxis: [
        {
            type: 'value',
            name: '受阻资金总额',
            axisLine:{  
                show:true  
            }
        }, 
        {
                type: 'value',
                name: '受阻交易笔数',
                axisLine:{  
                    show:true  
                },
                position: 'right',

        }
    ],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
    },
    color: ['#E64747', 'rgba(253,145,116,1.000)'], // 用rgba柱子不会消失
    series: [
        {
            data: [],
            type: 'bar',
            name: '受阻资金总额',
        },
        {
            data: [],
            type: 'bar',
            name: '受阻交易笔数',
            yAxisIndex: 1,
        },
    ],
    legend: {
        data: ['受阻资金总额', '受阻交易笔数'],
        bottom: '1%',
        left: 'center',
    },
    grid: {
        top: '8%',
        left: '2%',
        right: '15%',
        bottom: '10%',
        containLabel: true,
    },

});