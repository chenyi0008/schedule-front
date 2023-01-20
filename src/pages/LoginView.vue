<template>
    <!-- 外层容器 -->
    <div class="LoginContainer">
        <!-- Title  -->
        <div class="pageTitle">

        </div>
        <!-- 登录模块 -->
        <div class="LoginBox">
            <!-- 图片 -->
            <div class="LoginLogo">
                <img src="../assets/loginLogo.png" alt="">
            </div>
            <!-- 登录框 -->
            <div class="LoginForm">
                <div class="LoginTitle">
                    <p>Welcome</p>
                </div>
                <!-- s输入框 -->
                <div class="InputArea" >
                    <el-form label-width="55px" ref="LoginFormRef" :model="LoginForm" :rules="rules">
                        <el-form-item label="账号" prop="username">
                            <el-input v-model="LoginForm.username" ></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="LoginForm.password" type="password"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <!-- 按钮 -->
                <div class="LoginBtn">
                    <el-form>
                        <el-form-item>
                            <el-button type="primary" @click="login" round >登录</el-button>
                            <el-button type="success" @click="reg" round>注册</el-button>
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
            LoginForm: {
                username: 'admin',
                password: 'admin'
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'blur'}
                ]
            }
        };
    },
    methods:{
        login(){
            this.$refs.LoginFormRef.validate(async valid=>{
                if(!valid) return;
                const result = await this.$axios.post('user',this.LoginForm);
                if(result.data.data){
                    window.sessionStorage.setItem("token",result.data.data);
                }
                if(result.status != 200) this.$message.error("登陆失败");
                else if(result.data.msg == "登录成功"){
                    this.$message.success(result.data.msg);
                    this.$router.push('/home');
                    }
                else this.$message(result.data.msg);
                
            });
        },

        reg(){
            this.$router.push('/register');
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
