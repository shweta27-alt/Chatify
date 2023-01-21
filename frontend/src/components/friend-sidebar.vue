<template>
  <div>
    <div>
      <div class="friend-photo-user">
        <img src="../assets/girl.png" class="friend-user" />
      </div>
      <div class="frineds-info">
        <div>shweta saindane</div>
        <div>9999999999</div>
        <div>test@gmail.com</div>
      </div>
      <div class="frineds-about">
        <div class="frineds-about-txt">About</div>
        <div>tetstttttttyttttttttttt</div>
      </div>
    </div>
    <div class="group-info">
      <div class="group-participants">
        <div>2 participants</div>
        <div>
          <div>test 1</div>
          <div>test 2</div>
        </div>
      </div>
      <div class="edit-group-participants">
        <div>Add or edit participants</div>
        <div class="search-bar-wrapper">
          <div v-if="groupUser.length > 0">
            <div
              v-for="data in groupUser"
              :key="data.username"
              class="group-user"
            >
              <div class="group-user-info">
                <div class="group-user-img">
                  <img :src="data.profilePic" alt="" />
                </div>
                <div class="group-user-name">{{ data.fullName }}</div>
              </div>
              <div class="remove-group-user" @click="removeGroupUser(data)">
                <img src="../assets/cross.png" alt="" />
              </div>
            </div>
          </div>
          <input
            type="text"
            placeholder="Search user or create chat"
            class="search-bar"
            v-model="userSearchData"
            @input="searchUser"
          />
        </div>

        <div class="user" v-if="userSearchData">
          <div class="user-one">
            <div
              class="user-data"
              v-for="data in responseUser"
              :key="data.username"
              @click="addGroupUser(data)"
            >
              <div>
                <img :src="data.profilePic" class="user-one-pic" />
              </div>
              <div>
                <p class="friend-name">{{ data.fullName }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from "../services/api.services";
export default {
  props: {
    isFriendsProfile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      profiledata: null,
      responseUser: [],
      userSearchData: "",
      groupUser: [],
    };
  },
  mounted() {
    this.profiledata = this.$store.state.userData.user;
  },
  methods: {
    async searchUser() {
      let response = await apiService.usersearch(this.userSearchData);
      this.responseUser = response.data.users;
      console.log(this.responseUser);
    },
    addGroupUser(data) {
      let ifGroupUserExists = this.groupUser.find((val) => val._id == data._id);
      if (!ifGroupUserExists) {
        this.groupUser.push(data);
      }
    },
    removeGroupUser(data) {
      let removeUserIndex = this.groupUser.findIndex(
        (val) => val._id == data._id
      );
      if (removeUserIndex >= 0) {
        this.groupUser.splice(removeUserIndex, 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.friend-user {
  height: 130px;
  padding-top: 20px;
  border-radius: 50%;
}

.friend-photo-user {
  margin-left: 15px;
  margin-right: 20px;
  border-radius: 10px;
}
.user-one {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60px;
}
.user-data {
  display: flex;
  align-items: center;
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
  @media only screen and (max-width: 600px) {
    width: 80%;
  }
}
.about-me-profile {
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
}
.user-one-pic {
  height: 40px;
  /* margin-left:5px; */
  padding-top: 10px;
}

.friend-name {
  font-size: 14px;
  font-weight: 10;
  margin-left: 15px;
}
.group-user {
  background-color: #e9edef;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-right: 8px;
  justify-content: space-between;
  margin-bottom: 10px;
}
.group-user-img {
  height: 15px;
  img {
    height: 100%;
    border-radius: 50%;
  }
}
.group-user-info {
  display: flex;
  align-items: center;
}
.remove-group-user {
  height: 10px;
  padding-bottom: 9px;
  img {
    height: 100%;
  }
}
.search-user {
  text-align: left;
  font-size: 10px;
  margin-left: 10px;
  p {
    margin: 0;
  }
}
.frineds-about {
  margin-top: 20px;
  text-align: left;
  margin-left: 15px;
  margin-right: 15px;
  border-top: 1px solid grey;
  .frineds-about-txt {
    margin-top: 10px;
  }
}

.group-info {
  margin-top: 20px;
}
.group-participants {
  margin-top: 20px;
  text-align: left;
  margin-left: 16px;
}
.edit-group-participants {
  margin-top: 20px;
  text-align: left;
  margin-left: 16px;
}
</style>

