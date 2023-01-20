<template>
  <div>
    <div class="profile-photo-user">
      <label for="image-input">
        <img
          :src="profiledata && profiledata.profilepic"
          class="profile-picture"
        />
      </label>

      <input type="file" id="image-input" @change="uploadProfileImage" />
    </div>

    <div class="Information">
      <div class="Username">
        <div class="user-name-profile">
          <img src="../assets/user.png" class="user-profile-img" />
        </div>

        <div>
          <p class="name-info">Name</p>
          <p class="profile-name">{{ profiledata && profiledata.fullname }}</p>
        </div>
      </div>

      <div class="about-me">
        <div>
          <img src="../assets/info-button.png" class="info-button-img" />
        </div>

        <div class="about-me-profile">
          <p class="about-me-text">About</p>
          <div class="profile-bio">
            <textarea
              type="text"
              class="about-user-text"
              v-model="profileBio"
              @input="profileBioChange"
              :disabled="editProfileBio"
            />
            <img
              class="profilebio-icon"
              src="../assets/pencil.png"
              alt=""
              @click="updateProfileBio"
              v-if="editProfileBio"
            />
            <img
              class="profilebio-icon"
              src="../assets/check.png"
              alt=""
              @click="submitProfileBio"
              v-else
            />
          </div>
          <!-- <p class="about-user-text">
            {{
              profiledata && profiledata.profilebio
                ? profiledata.profilebio
                : "Hey there, I am using chatify"
            }}
          </p> -->
        </div>
      </div>

      <div class="Phone-no">
        <div class="User-phone-no">
          <img src="../assets/telephone.png" class="user-telephone" />
        </div>
        <div>
          <p class="phone-info">Phone</p>
          <p class="phone-no-info">
            {{
              profiledata &&
              `+${profiledata.mobile[0]["countryCode"]} ${profiledata.mobile[0]["phoneNumber"]} `
            }}
          </p>
        </div>
      </div>
    </div>

    <div><button v-on:click="logout" class="logout-button">Logout</button></div>
  </div>
</template>

<script>
import apiService from "@/services/api.services";
import axios from "axios";
export default {
  data() {
    return {
      profiledata: null,
      profileBio: "",
      editProfileBio: true,
    };
  },
  mounted() {
    this.profiledata = this.$store.state.userData.user;
    console.log(this.profiledata.profilebio);
    this.profileBio =
      this.profiledata && this.profiledata.profilebio
        ? this.profiledata.profilebio
        : "Hey there, I am using chatify";

    apiService.createuserchat({userId: "63ba899da4f8a716d32ee0fe"})
    .then((response)=>console.log(response))
    .catch((error)=>console.log(error))

  },
  methods: {
    updateProfileBio() {
      this.editProfileBio = false;
    },
    submitProfileBio() {
      this.editProfileBio = true;
      apiService
        .profileupdate({ profileBio: this.profileBio })
        .then(({ data }) => {
          this.profiledata = data.user;
          this.$store.dispatch("getUserData");
          this.$emit('userData',this.profiledata);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    profileBioChange(e) {
      e.target.style.height = `${e.target.scrollHeight}px`;
    },
    logout() {
      apiService
        .logout()
        .then((response) => {
          console.log(response);
          this.showError = false;
          this.errorMessage = "";
          this.$router.push("/auth/login");
        })
        .catch((error) => {
          console.log(error);
          this.showError = true;
          this.errorMessage =
            error &&
            error.response &&
            error.response.data &&
            error.response.data.message;
        });
    },
    updateProfileImage(data) {
      apiService
        .profileupdate({ profileImage: data })
        .then(({ data }) => {
          this.profiledata = data.user;
          this.$store.dispatch("getUserData");
          this.$emit('userData',this.profiledata);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async uploadProfileImage(e) {
      let values = e.target.files[0];
      const data = new FormData();
      data.append("file", values);
      data.append("upload_preset", "Chatify");
      const getHeader = () => {
        return {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        };
      };
      axios
        .post(
          "https://api.cloudinary.com/v1_1/dkidih85l/image/upload",
          data,
          { withCredentials: false },
          getHeader()
        )
        .then(({ data }) => {
          console.log(data.secure_url);
          this.updateProfileImage(data.secure_url);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-picture {
  height: 130px;
  padding-top: 20px;
  border-radius:50% ;
}

.profile-photo-user {
  margin-left: 15px;
  margin-right: 20px;
  border-radius: 10px;

  #image-input {
    display: none;
  }
}

.about-me-text {
  text-align: left;
  padding-left: 10px;
  font-size: 12px;
}

.name-info,
.about-me-text,
.phone-info {
  text-align: left;
  padding-left: 10px;
  font-size: 12px;
}

.user-profile-img,
.info-button-img,
.user-telephone {
  height: 15px;
  width: 15px;
  margin-top: 13px;
}

.Username,
.about-me,
.Phone-no {
  display: flex;
  padding-left: 10px;
}
.about-user-text {
  padding: 0;
}

.profile-name,
.about-user-text,
.phone-no-info {
  font-size: 14px;
  padding-left: 10px;
  border: none;
  resize: none;
  outline: none;
}

.info-button-img,
.user-telephone {
  height: 15px;
  width: 15px;
}

.logout-button {
  width: 70%;
  height: 30px;
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
  border-radius: 12px;
  border: 1px;
  background-color: rgb(224, 224, 224);
}
.profilebio-icon {
  height: 15px;
  margin-left: 5px;
}
.profile-bio {
  display: flex;
  align-items: center;
}
</style>
