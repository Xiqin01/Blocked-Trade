<template>
    <div class="sidebar">
        <!-- 背景色/文字颜色在pinia里，可以修改主题的时候修改 -->
        <!-- 激活时的颜色不随主题变化而变化 -->
         <!--:text-color="sidebar.textColor" -->
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"  
            :collapse="sidebar.collapse"
            :background-color="sidebar.bgColor" 
            text-color="#ffffff" 
            active-text-color= "#ffffff" 
            router
        >
            <template v-for="item in menuData">
                <!-- 判断是否有子菜单，有则渲染子菜单 -->
                 <!-- v-permiss在maim.ts里定义，判断是否有权限 -->
                <template v-if="item.children">
                    <el-sub-menu :index="item.index" :key="item.index" v-permiss="item.id">
                        <template #title>
                            <el-icon>
                                <component :is="item.icon"></component>
                            </el-icon>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.children">
                            <el-sub-menu
                                v-if="subItem.children"
                                :index="subItem.index"
                                :key="subItem.index"
                                v-permiss="item.id"
                            >
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem, i) in subItem.children"
                                    :key="i"
                                    :index="threeItem.index"
                                >
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-sub-menu>
                            <el-menu-item v-else :index="subItem.index" v-permiss="item.id">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
                <!-- 没有子菜单 -->
                <template v-else>
                    <!-- 判断是否有权限，没有则不渲染 -->
                    <el-menu-item :index="item.index" :key="item.index" v-permiss="item.id">
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRoute } from 'vue-router';
import { menuData } from '@/components/menu';


const route = useRoute();
const onRoutes = computed(() => {
    return route.path;
});
const sidebar = useSidebarStore();


</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 50px;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}

.sidebar-el-menu {
    min-height: 100%;
}

.el-menu-item.is-active { background-color: #85161b;  }
.el-sub-menu.is-active { background-color: #85161b; }
</style>
