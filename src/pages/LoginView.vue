<template>
  <!-- 外层容器 -->
  <div class="LoginContainer">
    <!-- Title  -->
    <div class="pageTitle"></div>
    <!-- 登录模块 -->
    <div class="LoginBox">
      <!-- 图片 -->
      <!-- <div class="LoginPic">
        <img class="loginPicture" src="../assets/img/loginPic.png" alt="" />
      </div> -->
      <!-- 登录框 -->
      <div class="LoginForm">
        <div class="LoginTitle">
          <img class="logo" src="../assets/img/avatar.svg" alt="">
          <div class="title">Login for</div>
          <div>MyAdmin</div>
        </div>
        <!-- s输入框 -->
        <div class="InputArea">
          <el-form
            label-width="55px"
            ref="LoginFormRef"
            :model="LoginForm"
            :rules="rules"
          >
            <el-form-item label="账号" prop="username">
              <el-input v-model="LoginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="LoginForm.password"
                type="password"
                @keyup.enter.native ="login"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- 按钮 -->
        <div class="LoginBtn">
          <el-form>
            <el-form-item>
              <el-button type="primary" @click="login" round>登录</el-button>
              <el-button type="success" @click="reg" round>注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postLogin } from "@/apis/user";
import storage from "@/storage";
export default {
  data() {
    return {
      LoginForm: {
        username: "admin",
        password: "admin",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs.LoginFormRef.validate(async (valid) => {
        if (!valid) return;
        postLogin(this.LoginForm).then(async (res) => {
          console.log(res);
          if (res.status != 200) this.$message.error("登陆失败");
          else if (res.data.msg == "登录成功") {
            this.$message.success(res.data.msg);
            storage.set("token", res.data.data);
            window.sessionStorage.setItem("token", res.data.data);
            this.$router.push("/main");
          } else this.$message(res.data.msg);
        });
        // console.log(window);
        // console.log(this);
        // const result = await this.$axios.post("user", this.LoginForm);
        // if (result.data.data) {
        //   window.sessionStorage.setItem("token", result.data.data);
        // }
        // if (result.status != 200) his.$message.error("登陆失败");
        // else if (result.data.msg ==t "登录成功") {
        //   this.$message.success(result.data.msg);
        //   this.$router.push("/main");
        // } else this.$message(result.data.msg);
      });
    },

    reg() {
      this.$router.push("/register");
    },
  },
};
</script>
<style lang="less" scoped>
.LoginContainer {
  background-image: url(../assets/img/bg.png);
  background-size: 100%;
  height: 100%;
}

.LoginBox {
  width: 420px;
  height: 500px;
  background-color: aliceblue;
  border-radius: 5%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 85%;
  .LoginPic {
    float: left;
    width: 490px;
    height: 450px;

    .loginPicture {
      width: 110%;
      height: 100%;
    }
  }
  .LoginForm {
    float: right;
    width: 390px;
    height: 450px;
    margin-top: 50px;

    .LoginTitle {
      padding-left: 50px;
      font-size: 50px;
      font-weight: bolder;
      font-style: initial;
      color:#10109b;
      .logo{
        padding-left: 90px;
        margin-top: -30px;
        margin-bottom: -20px;
        width: 70px;
      }
    }

    .InputArea {
      padding-right: 60px;
      margin-top: 30px;
    }

    .LoginBtn {
      margin-top: 30px;
      margin-left: 100px;
    }
  }
  .title{
    font-size: 20px;
      font-weight: bolder;
      font-style: initial;
      color:#10109b;
  }
}
</style>
