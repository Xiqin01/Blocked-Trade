import { Menus } from '@/types/menu';

export const menuData: Menus[] = [
    {
        id: '0',
        title: '系统首页',
        index: '/dashboard',
        icon: 'Odometer',
    },
    {
        index: '/system-user',
        title: '用户管理',
        icon: 'User', // 图标名称
        id: '11' // 权限ID
    },
    {
        index: '/remote',
        title: '远程连接页面',
        icon: 'User', // 图标名称
        id: '11' // 权限ID
    },
    {
        id: '6',
        icon: 'DocumentAdd',
        index: '6',
        title: '附加页面',
        children: [
            {
                id: '62',
                pid: '6',
                index: '/login',
                title: '登录',
            },
            // {
            //     id: '63',
            //     pid: '6',
            //     index: '/register',
            //     title: '注册',
            // },
            // {
            //     id: '64',
            //     pid: '6',
            //     index: '/reset-pwd',
            //     title: '重设密码',
            // },
            {
                id: '65',
                pid: '6',
                index: '/403',
                title: '403',
            },
            {
                id: '66',
                pid: '6',
                index: '/404',
                title: '404',
            },
        ],
    },
];
