<template>
    <div class="login-bg">
        <div class="login-container">
            <div class="login-header">
                <img class="logo mr10" src="../../assets/img/ICBC_logo2.png" alt="" />
                <div class="login-title">阻滞资金监控平台</div>
            </div>
            <el-form :model="param" :rules="rules" ref="login" size="large">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="用户名">
                        <template #prepend>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="密码"
                        v-model="param.password"
                        @keyup.enter="submitForm(login)"
                    >
                        <template #prepend>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="pwd-tips">
                    <el-checkbox class="pwd-checkbox" v-model="checked" label="记住密码" />
                    <!-- <el-link type="primary" @click="$router.push('/reset-pwd')">忘记密码</el-link> -->
                </div>
                <el-button class="login-btn" type="primary" size="large" @click="submitForm(login)">登录</el-button>
                <p class="login-tips">有问题及时联系技术人员。</p>
                <!-- <p class="login-text">
                    没有账号？<el-link type="primary" @click="$router.push('/register')">立即注册</el-link>
                </p> -->
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useTabsStore } from '@/store/tabs';
import { usePermissStore } from '@/store/permiss';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import axios from 'axios';
import md5 from 'md5'

interface LoginInfo {
    username: string;
    password: string;
}

const lgStr = localStorage.getItem('login-param');
const defParam = lgStr ? JSON.parse(lgStr) : null;
const checked = ref(lgStr ? true : false);

const router = useRouter();
const param = reactive<LoginInfo>({
    username: defParam ? defParam.username : '',
    password: defParam ? defParam.password : '',
});

// 输入用户名和密码的要求
const rules: FormRules = {
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
        },
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};
const permiss = usePermissStore();
const login = ref<FormInstance>();


//本地验证
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {   //表单验证，只是验证这个表单是否满足rule的要求
        if (valid) {
            const encryptedPassword: string = md5(param.password)
            console.log(param.username);
            console.log(param.password);
            console.log("加密后的密码：",encryptedPassword);
            ElMessage.success('登录成功');
            localStorage.setItem('vuems_name', param.username);
            const keys = permiss.defaultList[param.username == 'admin' ? 'admin' : 'user'];
            permiss.handleSet(keys);
            router.push('/dashboard');
            //记住密码
            if (checked.value) {
                localStorage.setItem('login-param', JSON.stringify(param));
            } else {
                localStorage.removeItem('login-param');
            }
        } else {
            ElMessage.error('登录失败');
            return false;
        }
    });
};

//向后端发送请求验证
// const submitForm = (formEl: FormInstance | undefined) => {
//     if (!formEl) return;
//     formEl.validate((valid) => {   //表单验证，只是验证这个表单是否满足rule的要求
//         if (valid) {
//             const encryptedPassword: string = md5(param.password)
//             console.log(param.username);
//             console.log(param.password);
//             console.log("加密后的密码：",encryptedPassword);
//             // 发数据到后端验证
//             axios.post('/api/login', {
//                 username: param.username,
//                 password: encryptedPassword
//             }).then(res => {
//                 if (res.data.code === 200) {
//                     ElMessage.success('登录成功');
//                     localStorage.setItem('vuems_name', param.username);
//                     localStorage.setItem('token', res.data.data); // 保存token
//                     const keys = permiss.defaultList[param.username == 'admin' ? 'admin' : 'user'];
//                     permiss.handleSet(keys);
//                     router.push('/dashboard');
//                     //记住密码
//                     if (checked.value) {
//                         localStorage.setItem('login-param', JSON.stringify(param));
//                     } else {
//                         localStorage.removeItem('login-param');
//                     }
//                 } else {
//                     ElMessage.error('登录失败');
//                 }
//             }).catch(err => {
//                 ElMessage.error('登录失败');
//             });
//         } else {
//             ElMessage.error('表单不合法');
//             return false;
//         }
//     });
// };




const tabs = useTabsStore();
tabs.clearTabs();
</script>

<style scoped>
.login-bg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: url(../../assets/img/login_bg_img.png) center/cover no-repeat;
}

.login-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 35px;
}

.logo {
    width: 35px;
}

.login-title {
    font-size: 22px;
    color: #333;
    font-weight: bold;
}

.login-container {
    width: 450px;
    /* height: 400px; */
    border-radius: 5px;
    background: #fff;
    padding: 40px 50px 50px;
    box-sizing: border-box;
}

.pwd-tips {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin: -10px 0 10px;
    color: #787878;
}

.pwd-checkbox {
    height: auto;
    padding-top: 10px;
}

.login-btn {
    display: block;
    width: 100%;
    color: #ffffff;
    background-color:  #B71A21;
    border-color: #ffffff;
    font-size: 18px;

}

.login-tips {
    font-size: 12px;
    color: #999;
}

.login-text {
    display: flex;
    align-items: center;
    margin-top: 20px;
    font-size: 14px;
    color: #787878;
}
</style>
