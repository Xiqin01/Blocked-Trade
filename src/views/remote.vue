<template>
    <div id="app">
      <iframe
        class="iframe"
        style="border:none"
        :width="searchTableWidth"
        :height="searchTableHeight"
        :src="reportUrl"
      ></iframe>

    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  
  const reportUrl = ref('https://www.w3school.com.cn/sql/sql_dates.asp');
  const searchTableHeight = ref(0);
  const searchTableWidth = ref(0);
  
  const widthHeight = () => {
    searchTableHeight.value = window.innerHeight ;
    searchTableWidth.value = window.innerWidth-40 ;
  };
  
  onMounted(() => {
    window.onresize = () => {
      widthHeight(); // 自适应高宽度
    };
    widthHeight();
});

 
  
  // 从路由里动态获取 url地址   具体地址看libs下util.js里的 backendMenuToRoute  方法
  // reportUrl.value = 'https://www.bilibili.com/';
  
  // watch(
  //   () => useRoute(),
  //   () => {
  //     // 监听路由变化
  //     reportUrl.value = 'https://www.baidu.com/';
  //   }
  // );
  </script>

<style>
.iframe {
  transform: scale(0.95, 1);
  transform-origin: left top;

}

</style>