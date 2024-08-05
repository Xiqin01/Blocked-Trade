<template>
    <div class="tabs-container">
        <!-- 标签页 -->
        <el-tabs v-model="activePath" class="tabs" type="card" closable @tab-click="clickTabls" @tab-remove="closeTabs">
            <el-tab-pane
                v-for="item in tabs.list"
                :key="item.path"
                :label="item.title"
                :name="item.path"
                @click="setTags(item)"
            ></el-tab-pane>
        </el-tabs>
        
        <!-- 关闭标签页的东西 -->
        <div class="Tabs-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="small" type="primary" plain>
                    标签选项
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu size="small">
                        <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="current">关闭当前</el-dropdown-item>
                        <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTabsStore } from '../store/tabs';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const activePath = ref(route.fullPath);
const tabs = useTabsStore();

// 设置标签
const setTags = (route: any) => {
    //设置标签前，先检查该标签是否存在
    const isExist = tabs.list.some((item) => {
        return item.path === route.fullPath;
    });  
    // 如果不存在，则添加标签
    if (!isExist) {
        tabs.setTabsItem({
            name: route.name,
            title: route.meta.title,
            path: route.fullPath,
        });
    }
};

// 初始化标签
setTags(route); 
// 路由变化时，更新标签
onBeforeRouteUpdate((to) => {
    setTags(to);
});


// 关闭全部标签
const closeAll = () => {
    tabs.clearTabs();
    router.push('/');
};


// 关闭其他标签
const closeOther = () => {
    const curItem = tabs.list.filter((item) => {
        return item.path === route.fullPath;
    });
    tabs.closeTabsOther(curItem);
};
const handleTags = (command: string) => {
    switch (command) {
        case 'current':
            // 关闭当前页面的标签页
            tabs.closeCurrentTag({
                $router: router,
                $route: route,
            });
            break;
        case 'all':
            closeAll();
            break;

        case 'other':
            closeOther();
            break;
    }
};

// 点击标签页，跳转路由
const clickTabls = (item: any) => {
    router.push(item.props.name);
};

// 关闭标签页时
const closeTabs = (path: string) => {
    // 在tab.list中找 该标签页的索引
    const index = tabs.list.findIndex((item) => item.path === path); 
    // 如果是当前标签页，则关闭当前标签页，并跳转到上一个标签页
    tabs.delTabsItem(index);
    const item = tabs.list[index] || tabs.list[index - 1];
    router.push(item ? item.path : '/');
};


// 如果路由变化了，修改activePath，更新tabs的情况（有v-model绑定）
watch(
    () => route.fullPath,
    (newVal, oldVal) => {
        activePath.value = newVal;
    }
);
</script>

<style scss>
.tabs-container {
    position: relative;
    overflow: hidden;
    background: #fff;
    padding: 2px 120px 0 0;
    /* top: 50px */
}

.tabs {
    .el-tabs__header {
        margin-bottom: 0;
    }

    .el-tabs__nav {
        height: 28px;
    }

    .el-tabs__nav-next,
    .el-tabs__nav-prev {
        line-height: 32px;
    }

    &.el-tabs {
        --el-tabs-header-height: 28px;
    }
}

/* 标签页被选中的时候的颜色 */
/* .el-tabs .is-active {
    background-color: #B71A21;
    color: #ffffff  !important
} */

.Tabs-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
}
</style>
