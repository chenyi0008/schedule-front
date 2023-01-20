<template>
    <!-- 外层容器 -->
    <div class="LoginContainer">
        <!-- 登录模块 -->
        <div class="LoginBox">
            <!-- 图片 -->
            <div class="LoginLogo">
                <img src="../assets/registerLogo.png" alt="">
            </div>
            <!-- 登录框 -->
            <div class="LoginForm">
                <div class="LoginTitle">
                    <p>Register</p>
                </div>
                <!-- s输入框 -->
                <div class="InputArea" >
                    <el-form label-width="55px" ref="RegisterFormRef" :model="RegisterForm" :rules="rules">
                        <el-form-item label="账号" prop="userName">
                            <el-input v-model="RegisterForm.userName" ></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="RegisterForm.password" type="password"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <!-- 按钮 -->
                <div class="LoginBtn">
                    <el-form>
                        <el-form-item>
                            <el-button type="primary" @click="register" round >注册</el-button>
                            <el-button type="success" @click="back" round>返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            RegisterForm: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'blur'},
                    { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
                ],
            }
        };
    },
    methods:{
        register(){
            this.$refs.RegisterFormRef.validate(async valid=>{
                if(!valid) return;
                const result  = await this.$axios.put('user',this.RegisterForm);
                console.log(result);
                if(result.status != 200) this.$message.error("注册失败");
                this.$message(result.data.msg);
            });
        },
        back(){
            this.$router.push('/login');
        }
    }   
}
</script>
<style lang="less" scoped>
.LoginContainer {
    background-image: url(../assets/bg.png);
    background-size: 100%;
    height: 100%;
}

.LoginBox {
    width: 880px;
    height: 450px;
    background-color: aliceblue;
    border-radius: 5%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 85%;

    .LoginLogo {
        float: left;
        width: 490px;
        height: 450px;


        img {
            width: 100%;
            height: 100%;
        }
    }

    .LoginForm {
        float: right;
        width: 390px;
        height: 450px;

        .LoginTitle {
            padding-left: 50px;
            font-size: 50px;
            font-weight: bolder;
            font-style: oblique;
        }

        .InputArea {
            padding-right: 30px;
            margin-top: 50px;
        }

        .LoginBtn {
            margin-top: 30px;
            margin-left: 100px;
        }
    }

}
</style>
