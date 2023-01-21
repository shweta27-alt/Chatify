<template>
  <div class="left-container group-container">
    <div>
      <div class="user-heading">
        <div>Add Group Participants</div>
        <div @click="closeGroupSidebar" class="close-group">
          <img src="../assets/cross.png" alt="" />
        </div>
      </div>
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
          <input class="group-name" placeholder="Add group name" type="text" />
        </div>
        <input
          type="text"
          placeholder="Add users to group"
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
            <div class="search-user">
              <p class="friend-name">{{ data.fullName }}</p>
              <p class="friend-detail">{{ data.email }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="create-group" @click="onGroupAdd">
      <img src="../assets/next.png" alt="" />
    </div>
  </div>
</template>

<script>
import apiService from "../services/api.services";

export default {
  props: {
    isShowGroup: {
      type: Boolean,
    },
  },
  data() {
    return {
      userSearchData: "",
      responseUser: [],
      groupUser: [],
      showAddGroupUser: true,
    };
  },

  methods: {
    async searchUser() {
      let response = await apiService.usersearch(this.userSearchData);
      this.responseUser = response.data.users;
    },
    closeGroupSidebar() {
      this.$emit("closeGroupSidebar");
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
    onGroupAdd() {
      this.$toast.show("group created successfully", {
        type: "success",
        position: "top",
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  box-sizing: border-box;
}

.left-container {
  width: 25%;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  margin-right: 15px;
  box-sizing: border-box;
  padding: 25px;
  box-shadow: 0 4px 8px 0 rgba(58, 58, 58, 0.2),
    0 6px 20px 0 rgba(28, 28, 28, 0.19);
  @media only screen and (max-width: 600px) {
    width: 58%;
    padding: 14px;
    border-radius: unset;
  }
}

.user-heading {
  width: 100%;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-top: 20px;
  font-size: 14px;
  font-weight: bold;
  color: rgb(116, 116, 115);
  @media only screen and (max-width: 600px) {
    height: 23px;
    font-size: 10px;
  }
}

.search-bar {
  width: 100%;
  height: 28px;
  padding: 0;
  margin: 0;
  border: 1px solid #d5dfea;
  border-radius: 16px;
  box-sizing: border-box;
  outline: none;
  padding-left: 18px;
  @media only screen and (max-width: 600px) {
    font-size: 10px;
    padding-left: 5px;
  }
}

.user {
  margin-top: 20px;
  width: 100%;
  overflow-y: scroll;
}

.user-icon {
  margin-left: 20px;
  margin-right: 20px;
  height: 30px;
  margin-top: 10px;
}
.user-data {
  display: flex;
  align-items: center;
}

.user-one {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60px;
  border-top: 2px solid #f5f6f6;
}

.user-one-pic {
  height: 40px;
  /* margin-left:5px; */
  padding-top: 10px;
}

.friend-name {
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 10;
  margin-left: 15px;
}

.number {
  height: 24px;
  margin-left: 20px;
  display: flex;
  padding-bottom: 20px;
  margin-top: 20px;
}

.user-name-show {
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  margin-left: 30px;
  height: 60px;
  background-color: rgb(255, 255, 255);
}

.chat-user-name,
.dummy-chat {
  margin-left: 20px;
  margin-top: 10px;
  text-align: left;
}

.dummy-chat {
  display: flex;
  flex-direction: row;
  background-color: rgb(233, 240, 240);
  width: 70%;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px 10px 10px 10px;
}

.time-name-chat {
  margin-left: 30px;
  text-align: left;
  color: #7792b1;
}

.sender-name,
.dummy-chat-text {
  margin-top: 5px;
}

.user-text-area {
  width: 100%;
  height: 80px;
  margin-top: 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.say-something-text {
  margin-left: 30px;
  color: rgb(148, 147, 147);
}

.sender-image {
  margin-left: 20px;
}

.search-bar-user {
  display: flex;
  width: 200px;
  background-color: rgb(216, 222, 220);
  height: 30px;
  margin-top: 20px;
  color: rgb(117, 116, 115);
  align-items: center;
  padding-left: 10px;
}

.user-image,
.notification,
.full-screen {
  padding-top: 15px;
}

.chats {
  overflow-y: scroll;
  max-height: 485px;
}

.time-name-chat-user {
  margin-right: 30px;
  color: #ffffff;
}

.sender-name-user {
  justify-content: flex-end;
}

.send-button {
  background-color: rgb(200, 223, 239);
  height: 36px;
  width: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;
}
.send-button-img {
  height: 20px;
}

.button-position {
  display: flex;
  flex-direction: row-reverse;
  margin-right: 20px;
}

.chatify-logo {
  height: 65px;
  margin-left: 20px;
}

.nav-icons {
  height: 30px;
}

.user-profile-notification {
  display: flex;
  flex-direction: row;
  margin-right: 20px;
}

.message-text {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
  outline: none;
}

.profile {
  width: 350px;
  background-color: yellow;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -ms-transition: all 1s ease;
  -o-transition: all 1s ease;
  transition: all 1s ease;
}
.chat-content {
  font-size: 15px;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 15px;
  p {
    padding: 0;
    margin: 0;
  }
}
.close-group {
  cursor: pointer;
  height: 10px;
  img {
    height: 100%;
  }
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
.group-user-name {
  margin-left: 4px;
}
.create-group {
  height: 40px;
  img {
    height: 100%;
  }
}
.group-name {
  width: 100%;
  border: 0;
  border-bottom: 3px solid #f5f6f6;
  margin-bottom: 15px;
  outline: none;
}
</style>
