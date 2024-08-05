<template>
    <div>
        <!-- 修改数据 -->
        <!-- <el-row :gutter="20" class="mgb10">
            <el-col :span="12">
                <el-button type="primary" @click="changeMapData1">修改map中的数据a</el-button>
            </el-col>
            <el-col :span="12">
                <el-button type="primary" @click="changeMapData2">修改map中的数据b</el-button>
            </el-col>
        </el-row> -->

        <!-- 展示数字卡片 -->
        <el-row :gutter="20" class="mgb20">  <!-- 表示gutter数字卡片的间距为20 -->
            <!-- 格子1:受阻资金总额 -->
            <el-col :span="11">
                <el-card shadow="hover" body-class="card-body">
                    <el-icon class="card-icon ">
                        <WalletFilled />
                    </el-icon>
                    <div class="card-content">
                        <span class="card-num ">{{TrappedMoney}}</span>
                        <!--<countup class="card-num " :end="6666" />--> <!-- 嵌入一个countup组件，检测动态变化 -->
                        <div>阻滞资金总额</div>
                    </div>
                </el-card>
            </el-col>
            <!-- 格子2：受阻资金笔试 -->
            <el-col :span="11">
                <el-card shadow="hover" body-class="card-body">
                    <el-icon class="card-icon">
                        <Coin/>
                    </el-icon>
                    <div class="card-content">
                         <span class="card-num ">{{TrappedAmount}}</span>
                        <!-- <countup class="card-num " :end="168" /> -->  <!-- 检测动态变化的 -->
                        <div>阻滞资金笔数</div>
                    </div>
                </el-card>
            </el-col>
            <!-- 格子3：时间筛选器 -->
            <el-col :span="2" >
                <el-card shadow="hover" body-class="card-body">
                    <el-radio-group v-model="timeType" class="time-filter"  >
                        <el-radio label="day">按日</el-radio>
                        <el-radio label="month">按月</el-radio>
                        <el-radio label="year">按年</el-radio>
                    </el-radio-group>  
                </el-card>   
            </el-col>
        </el-row>
        <!-- 展示图表 -->
        <!-- 第一行：受阻资金变化趋势和分布状况 -->
        <el-row :gutter="20" class="mgb20">
            <el-col :span="11">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">原因分布</p>
                        <p class="card-header-desc">受阻资金的原因分布</p>
                    </div>
                    <v-chart class="chart" :option="ReasonDist" />
                </el-card>
            </el-col>
            <el-col :span="13">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">变化趋势</p>
                        <p class="card-header-desc">受阻资金的变化趋势</p>
                    </div>
                    <v-chart class="chart" :option="Trend" />
                </el-card>
            </el-col>
        </el-row>
        <!-- 第二行：资金量分布，地区分布，卡种分布 -->
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" >
                    <div class="card-header">
                        <p class="card-header-title">资金cut分布</p>
                        <p class="card-header-desc">受阻资金大小分布情况</p>
                    </div>
                    <v-chart class="chart" :option="AmountDist" />
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover" >
                    <div class="card-header">
                        <p class="card-header-title">地区分布</p>
                        <p class="card-header-desc">最近一个段时间的受阻资金分布情况</p>
                    </div>
                    <v-chart class="map-chart" :option="mapOptions" />
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover" >
                    <div class="card-header">
                        <p class="card-header-title">卡的种类分布</p>
                        <p class="card-header-desc">不同卡种类受阻资金的分布</p>
                    </div>
                        <v-chart class="card-chart" :option="CardDist" />
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts" name="dashboard">
import countup from '@/components/countup.vue'; //实现数字动画效果
import { use, registerMap } from 'echarts/core';
import { BarChart, LineChart, PieChart, MapChart } from 'echarts/charts';
import {
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    VisualMapComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';
import { ReasonDist, Trend, mapOptions,CardDist,AmountDist} from './chart/charts';  // 图片在这里
// import { dashOpt1, dashOpt2, mapOptions } from './chart/options';  // 图片备份
import chinaMap from '@/utils/china';
import { ref ,onMounted, watch } from 'vue';


// 注册画图组件
use([
    CanvasRenderer,
    BarChart,
    GridComponent,
    LineChart,
    PieChart,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    VisualMapComponent,
    MapChart,
]);
registerMap('china', chinaMap);

// 初始化元素
const timeType = ref('day');
let TrappedMoney = ref(0);
let TrappedAmount = ref(0);

//假装：获取后端的数据，并存入SessionStorage中
let ReasonData = {dataType:'reason',
        value:[ 
        { value: [1048,200], name: 'Reason 1'},
        { value: [735,200], name: 'Reason 2' },
        { value: [580,200], name: 'Reason 3' },
        { value: [484,200], name: 'Reason 4' },
        { value: [300,200], name: 'Reason 5' },
        ]}



//阻滞资金金额和比数
onMounted(() => {
    // 获取用户权限

    // 根据权限，发送请求获取数据,并存入SessionStorage中

    // 初始化数据
    TrappedMoney.value = 6666;
    TrappedAmount.value = 8888;
    ReasonDist.value.series[0].data = ReasonData.value; 
});


//监听事件,当timeType改变时，重新渲染图表
watch(timeType, () => {
    ChangeDashboardData(timeType.value);

});

const ChangeDashboardData = function (timeType) {
    if (timeType === 'day') {
       // 切换成按日分布的数据
       TrappedMoney.value = 6666;
       TrappedAmount.value = 8888;
       ReasonDist.value.series[0].data = [
        { value: [1048,200], name: 'Reason 1', },
        { value: [735,200], name: 'Reason 2' },
        { value: [580,200], name: 'Reason 3' },
        { value: [484,200], name: 'Reason 4' },
        { value: [300,200], name: 'Reason 5' },
        ];  
        Trend.value.xAxis.data = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
        Trend.value.series[0].data = [1200, 1320, 3010, 1340, 900, 2300, 2100] ;
        Trend.value.series[1].data = [220, 122, 191, 234, 190, 130, 310];
    }

    if (timeType === 'month') {
        // 切换成按月分布的数据
        TrappedMoney.value = 66660;
        TrappedAmount.value = 99990;
        ReasonDist.value.series[0].data = [
            { name: '原因1', value:[5000,50] },
            { name: '原因2', value:[4000,50] },
            { name: '原因3', value:[3000,50] },
            { name: '原因4', value:[2000,50] },
            { name: '原因5', value:[1000,50] },
        ];  
        Trend.value.xAxis.data = ['month1', 'month2', 'month3', 'month4', 'month5'];
        Trend.value.series[0].data = [5000, 4000, 3000, 2000, 1000] ;
        Trend.value.series[1].data = [510, 450, 540, 503, 50] ;
        
    }
    

    if (timeType === 'year') {
        // 切换成按年分布的数据
        TrappedMoney.value = 666600;
        TrappedAmount.value = 888800;
        ReasonDist.value.series[0].data = [
            { name: '原因1', value:[10000,50] },
            { name: '原因2', value:[20000,50] },
            { name: '原因3', value:[30000,50] },
            { name: '原因4', value:[40000,50] },
            { name: '原因5', value:[50000,50] },
        ];  
    }
};

</script>

<style>
.card-body {
    display: flex;
    align-items: center;
    height: 100px;
    padding: 0;
}
</style>


<style scoped>
/* time-filter */
.time-filter {
    margin-left: 10px;
}

/* 数字卡片样式 */
.card-content {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
    padding: 0 20px;
    /* height: 30px; */
}

.card-num {
    font-size: 30px;
    color: #000
}

.card-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #ffffff;
    background: #B71A21;
}



/* 图表卡片样式 */
.card-header {
    padding-left: 10px;
    margin-bottom: 20px;
}

.card-header-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
}

.card-header-desc {
    font-size: 14px;
    color: #999;
}

/* 图表样式 */
.chart {
    width: 100%;
    height: 400px;
}

.card-chart { 
    width: 100%;
    height: 400px;

}
.map-chart {
    width: 100%;
    height: 400px;
}




</style>
