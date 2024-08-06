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
                        <countup class="card-num " :end="TrappedAmount" /> <!-- 嵌入一个countup组件，数字动态变化 -->
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
                        <countup class="card-num " :end="TrappedCount" />  
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
import countup from "@/components/countup.vue"; //实现数字动画效果
import { use, registerMap } from "echarts/core";
import { BarChart, LineChart, PieChart, MapChart } from "echarts/charts";
import {
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    VisualMapComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import VChart from "vue-echarts";
import { ReasonDist, Trend, mapOptions,CardDist,AmountDist} from "./chart/charts";  // 图片在这里
// import { dashOpt1, dashOpt2, mapOptions } from "./chart/options";  // 图片备份
import chinaMap from "@/utils/china";
import { ref ,onMounted, watch } from "vue";
import axios from "axios";


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
registerMap("china", chinaMap);

// 初始化元素
let timeType = ref("day");
let TrappedCount = ref(0);
let TrappedAmount = ref(0);



//假装：获取后端的数据
import DashBoardData from "../../data_example.json"
console.log(DashBoardData)
let data_by_day = DashBoardData.data.ByDay
let data_by_month = DashBoardData.data.ByMonth
let data_by_year = DashBoardData.data.ByYear




const set_charts_data = function (filter_data) {
    // total
    TrappedCount.value = filter_data.Total.TotalCount;
    TrappedAmount.value = filter_data.Total.TotalAmount;

    //reason
    ReasonDist.value.series[0].data = [];
    for (let i = 0; i <filter_data.ReasonsDist.reasons.length; i++) {
        ReasonDist.value.series[0].data.push({
            name: filter_data.ReasonsDist.reasons[i],
            value: [filter_data.ReasonsDist.amount[i], filter_data.ReasonsDist.count[i]]
        })
    }

    // trend
    Trend.value.xAxis.data = filter_data.TrendDist.Time;
    Trend.value.series[0].data = filter_data.TrendDist.amount;
    Trend.value.series[1].data = filter_data.TrendDist.count;

    //amount
    AmountDist.value.xAxis.data = filter_data.AmountDist.AmountCut;
    AmountDist.value.series[0].data = filter_data.AmountDist.amount;
    AmountDist.value.series[1].data = filter_data.AmountDist.count;

    //geo
    mapOptions.value.visualMap.max = Math.max.apply(null,filter_data.GeoDist.amount); // 设置视觉映射最大值
    console.log(mapOptions.value.visualMap.max)
    for (let i = 0; i <filter_data.GeoDist.Geo.length; i++) {
        mapOptions.value.series[0].data.push({
            name: filter_data.GeoDist.Geo[i],
            value: [filter_data.GeoDist.amount[i], filter_data.GeoDist.count[i]]
        })
    }

    //card
    CardDist.value.xAxis[0].data = filter_data.CardDist.CardType;
    CardDist.value.series[0].data = filter_data.CardDist.amount;
    CardDist.value.series[1].data = filter_data.CardDist.count;

}

const get_data = function () {
    // 获取用户权限

    // 根据权限，发送请求获取数据,并存入SessionStorage中
}

//挂载时初始化图表
onMounted(() => {
    //从后端获取数据
    get_data();
    
    //初始化图表，默认是按日
    set_charts_data(data_by_day)
});


//监听事件,当timeType改变时，重新渲染图表
watch(timeType, () => {
    ChangeDashboardData(timeType.value);

});

const ChangeDashboardData = function (timeType) {
    if (timeType === "day") {
       // 切换成按日分布的数据
       set_charts_data(data_by_day)
    }
    if (timeType === "month") {
        // 切换成按月分布的数据
        set_charts_data(data_by_month)
    }
    if (timeType === "year") {
        // 切换成按年分布的数据
        set_charts_data(data_by_year)
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
