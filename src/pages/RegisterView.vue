<template>
  <!-- 外层容器 -->
  <div class="LoginContainer">
    <!-- 登录模块 -->
    <div class="LoginBox">
      <!-- 图片 -->
      <!-- <div class="LoginPic">
        <img class="registerPicture" src="../assets/img/registerLogo.png" alt="" />
      </div> -->
      <!-- 登录框 -->
      <div class="LoginForm">
        <div class="LoginTitle">
          <img class="logo" src="../assets/img/avatar.svg" alt="">
          <div class="title">Register for</div>
          <div>MyAdmin</div>
        </div>

        <!-- s输入框 -->
        <div class="InputArea">
          <el-form lable-position="left" label-width="70px" ref="RegisterFormRef" :model="RegisterForm" :rules="rules">
            <el-form-item label="账号" prop="userName" v-show="showAct">
              <el-input v-model="RegisterForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" v-show="showAct">
              <el-input v-model="RegisterForm.password" type="password"></el-input>
            </el-form-item>

            <!-- 邮箱验证码 -->
            <el-form-item class="EmailText" label="验证邮箱" prop="registerEmail" v-show="showEmail">
              <el-input placeholder="请输入验证邮箱" style="width: 265px;" v-model="RegisterForm.registerEmail"></el-input>
            </el-form-item>

            <el-form-item class="ACK" label="验证码" style="width:350px" prop="registerEmail" v-show="showEmail">
              <el-input placeholder="请输入验证码" style="width: 130px;" v-model="RegisterForm.ACK"></el-input>
              <el-button @click="getACK" v-show="showEmail" class="getBut">获取验证码</el-button>
            </el-form-item>

          </el-form>
        </div>

        <!-- 注册按钮 -->
        <div class="LoginBtn">
          <el-form>
            <el-form-item>
              <el-button type="primary" @click="switchToEmail" round>验证</el-button>
              <el-button type="success" @click="backToRegister" v-show="showEmail" round>返回</el-button>
              <el-button type="success" @click="back" v-show="showAct" round>返回 </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { putRegister } from "@/apis/user";
export default {
  data() {
    return {
      showAct: true,
      showEmail: false,
      RegisterForm: {
        userName: "",
        password: "",
        registerEmail: "",
        ACK: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 5, max: 8, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 8, message: "长度在 5 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    register() {
      this.$refs.RegisterFormRef.validate(async (valid) => {
        if (!valid) return;
        putRegister(this.RegisterForm).then((res) => {
          console.log(res);
          if (res.status != 200) this.$message.error("注册失败");
          else if (res.data.msg == "注册成功") this.$router.push("/login");
          this.$message(res.data.msg);
        });
      });
    },
    back() {
      this.$router.push("/login");
    },
    switchToEmail() {
      this.$refs.RegisterFormRef.validate(async (valid) => {
        if (!valid) {
          this.$alert("请完善注册信息");
        }
        if (valid) {
            this.showAct = false;
            this.showEmail = true;
            console.log(this.showAct);
          }
      })

    },
    getACK() {

    },
    backToRegister() {
      this.showAct = true;
      this.showEmail = false;
    }
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
      color: #10109b;

      .logo {
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

  .title {
    font-size: 20px;
    font-weight: bolder;
    font-style: initial;
    color: #10109b;
  }

  .getBut {
    float: right;
    margin-right: 15px;
  }
}
</style>
