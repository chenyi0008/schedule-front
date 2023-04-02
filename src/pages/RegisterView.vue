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

        <!-- 输入框 -->
        <div class="InputArea">
          <el-form v-show="showAct" lable-position="left" label-width="75px" ref="RegisterFormRef" :model="RegisterForm"
            :rules="userInfoRules">
            <el-form-item label="账号" prop="userName">
              <el-input v-model="RegisterForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="RegisterForm.password" type="password"></el-input>
            </el-form-item>
          </el-form>

          <!-- 邮箱验证码 -->
          <el-form v-show="showEmail" lable-position="left" label-width="75px" ref="RegisterEmailFormRef"
            :model="RegisterForm" :rules="emailInfoRules">
            <el-form-item class="EmailText" label="邮箱" prop="registerEmail" v-show="showEmail">
              <el-input placeholder="请输入验证邮箱" style="width: 265px;" v-model="RegisterForm.registerEmail"></el-input>
            </el-form-item>

            <el-form-item class="ACK" label="验证码" style="width:350px" prop="registerEmail" v-show="showEmail">
              <el-input placeholder="请输入验证码" style="width: 130px;" v-model="RegisterForm.ACK"></el-input>
              <el-button v-if="flag" @click="getACK" v-show="showEmail" class="getBut">获取验证码</el-button>
              <el-button v-if="!flag" class="getBut" :disabled=false>剩余{{ second }}s</el-button>
            </el-form-item>

          </el-form>
        </div>

        <!-- 注册按钮 -->
        <div class="LoginBtn">
          <el-form>
            <el-form-item>
              <el-button type="primary" @click="register" v-show="showEmail" round>验证并注册</el-button>
              <el-button type="primary" @click="switchToEmail" v-show="showAct" round>验证邮箱</el-button>
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
import { putRegisterByEmail } from "@/apis/user";
import { postACK } from "@/apis/user";

export default {
  data() {
    return {
      showAct: true,
      showEmail: false,
      second: 60, //获取验证码间隔时间60s
      flag: true,
      RegisterForm: {
        // userInfo:{
        //   userName: "12345",
        //   password: "123456",
        // },
        // emailInfo:{
        //   registerEmail: "abc@qq.com",
        //   ACK: "",
        // },
        userName: "12345",
        password: "123456",
        registerEmail: "abc@qq.com",
        ACK: "",
      },
      userInfoRules: {
        userName: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 5, max: 8, message: "长度在 5 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 18, message: "长度在 5 到 18 个字符", trigger: "blur" },
        ],
      },
      emailInfoRules: {
        registerEmail: [
          { required: true, message: "请填入您的邮箱", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              if (
                /^\w{1,64}@[a-z0-9\-]{1,256}(\.[a-z]{2,6}){1,2}$/i.test(
                  value
                ) == false
              ) {
                callback(new Error("邮箱格式错误"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          }
        ],
      },
      // finalCheckRules:{
      //   registerEmail:[
      //     {required:true, message:"请填入您的邮箱" ,trigger: "blur" },
      //     {
      //       validator: function(rule, value, callback) {
      //         if (
      //           /^\w{1,64}@[a-z0-9\-]{1,256}(\.[a-z]{2,6}){1,2}$/i.test(
      //             value
      //           ) == false
      //         ) {
      //           callback(new Error("邮箱格式错误"));
      //         } else {
      //           callback();
      //         }
      //       },
      //       trigger:"blur",
      //     }
      //   ], 
      //   ACk:[
      //   { required: true, message: "请输入密码", trigger: "blur" },
      //   ]
      // }
    };
  },
  methods: {
    register() {
      this.$refs.RegisterEmailFormRef.validate(async (valid) => {
        if (!valid) return;
        putRegisterByEmail(this.RegisterForm).then((res) => {
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
          this.$message.warning("请完善注册信息");
          console.log(valid);
        }
        if (valid) {
          this.showAct = false;
          this.showEmail = true;
          console.log(this.showAct);
          console.log(valid);
        }
      })

    },
    getACK() {
      this.$refs.RegisterEmailFormRef.validate(async (valid) => {
        if (!valid) return;
        postACK(this.RegisterForm).then((res) => {
          console.log(res);
          if (res.status != 200) this.$message.error("发送失败");
          else if (res.data.msg == "发送成功") this.$router.push("/login");
          this.$message(res.data.msg);
        })
      });
      var that = this;
      if (that.flag) {
        that.flag = false;
        var interval = window.setInterval(function () {
          if (that.second-- <= 0) {
            that.second = 60;
            that.flag = true;
            window.clearInterval(interval);
          }
        }, 1000);
      }

    },
    backToRegister() {
      this.showAct = true;
      this.showEmail = false;
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
