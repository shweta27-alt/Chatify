<template>
  <div class="container">
    <auth-wrapper>
      <div class="main-content">
        <div class="username">
          <input
            type="text"
            placeholder="Phone number or email address"
            class="login-input-field"
            v-model="username"
          />
        </div>

        <div class="password">
          <input
            type="password"
            placeholder="Password"
            class="login-input-field"
            v-model="password"
          />
        </div>
        <p class="error-text" v-if="showError">
          {{ errorMessage }}
        </p>
        <div class="login-button-div">
          <button
            class="login-button"
            v-on:click="loginButton"
            :disabled="!(username && password)"
          >
            <strong>Log in</strong>
          </button>
        </div>
        <div class="partition">OR</div>
      </div>
      <div class="loginwith-socialsites">
        <div class="loginwith-google">
          <div>
            <img
              src="../../assets/search.png"
              alt="google"
              class="google-logo"
            />
          </div>

          <div class="login-google-text">Log in with Google</div>
        </div>

        <div class="forgot-password">Forgotten your password?</div>
      </div>
    </auth-wrapper>

    <div class="lower-part">
      Don't have an account?
      <div v-on:click="newlogin" class="sign-up">Sign up</div>
    </div>

  </div>
</template>

<script>
import authWrapper from "../../components/auth-wrapper.vue";
import apiService from "../../services/api.services";
export default {
  name: "login.vue",
  components: {
    "auth-wrapper": authWrapper,
  },
  methods: {
    newlogin() {
      this.$router.push("/auth/register");
    },

    loginButton() {
      const data = {
        username: this.username,
        password: this.password,
      };

      if (this.username && this.password) {
        apiService
          .login(data)
          .then((response) => {
            console.log(response);
            let { data } = response;
            console.log(data);
            this.showError = false;
            this.errorMessage = "";
            this.$router.push("/chat");
          })
          .catch((error) => {
            console.log(error);
            this.showError = true;
            this.errorMessage = error && error.response && error.response.data && error.response.data.message;
          });
      }
    },
  },
  data() {
    return {
      username: "",
      password: "",
      showError: false,
      errorMessage: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 350px;
  background-color: rgb(255, 254, 254);
  border: 2px black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.lower-part {
  height: 100px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.logo,
.main-content {
  margin-left: 35px;
  margin-right: 35px;
}

.login-button {
  width: 100%;
  height: 36px;
}

.login-input-field {
  width: 100%;
  margin-top: 5px;
  padding: 9px 0 7px 8px;
  background: rgb(250, 250, 250);
  border: 1px solid lightgrey;
  outline: none;
}

.save-password {
  margin-top: 15px;
}

.partition,
.forgot-password {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  font-size: 12px;
  cursor: pointer;
}

.forgot-password,
.loginwith-google,
.loginwith-facebook {
  margin-top: 15px;
}

.google-logo {
  height: 16px;
}

.loginwith-google {
  font-size: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;
}

.sign-up {
  padding-left: 5px;
  color: rgb(57, 98, 221);
  cursor: pointer;
}

.login-google-text {
  margin-left: 6px;
}

.error-text {
  color: red;
  font-size: 11px;
  margin-top: 3px;
  margin-bottom: 2px;
  display: flex;
  justify-content: left;
}

.login-button {
  background-color: rgb(61, 124, 251);
  border-radius: 5px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-top: 15px;
  font-size: 14px;
  cursor: pointer;
}

button[disabled] {
  background-color: rgb(105, 104, 104);
  cursor: default;
}
</style>
