<template>
  <div class="left-container group-container">
    <div class="group-sidebar">
      <div class="user-heading">
        <div>Add Group Participants</div>
        <div @click="closeGroupSidebar" class="close-group">
          <img src="../assets/cross.png" alt="" />
        </div>
      </div>
      <div class="search-bar-wrapper">
        <div v-if="groupUser.length > 0">
          <div class="group-add-user-wrapper">
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
            class="group-name"
            placeholder="Add group name"
            v-model="groupName"
            type="text"
          />
        </div>
        <input
          type="text"
          placeholder="Add users to group"
          class="search-bar"
          v-model="userSearchData"
          @input="searchUser"
        />
      </div>

      <div class="user-wrapper" v-if="userSearchData">
        <div class="user">
          <div
            class="user-data"
            v-for="data in responseUser"
            :key="data.username"
            @click="addGroupUser(data)"
          >
            <div class="user-image-wrapper">
              <img :src="data.profilePic" />
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
      groupName: "",
    };
  },

  methods: {
    async searchUser() {
      //debounce the serch user result with 300 milliseconds
      let timer;
      clearTimeout(timer);
      timer = setTimeout(async () => {
        try {
          let response = await apiService.usersearch(this.userSearchData);
          this.responseUser = response.data.users;
        } catch (err) {
          console.log(err);
          this.$toast.show("Something went wrong", {
            type: "error",
            position: "top",
          });
        }
      }, 300);
    },
    closeGroupSidebar() {
      this.$emit("closeGroupSidebar");
    },
    addGroupUser(data) {
      //if group user already exists throw an error
      let ifGroupUserExists = this.groupUser.find((val) => val._id == data._id);
      if (!ifGroupUserExists) {
        this.groupUser.push(data);
      } else {
        this.$toast.show("User already added to group", {
          type: "error",
          position: "top",
        });
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
      let groupUserId = this.groupUser.map((val) => {
        return val._id;
      });
      if (groupUserId.length == 0) {
        return this.$toast.show("please add users to group", {
          type: "error",
          position: "top",
        });
      }
      //throw an error if user have not enter the group name
      if (!this.groupName) {
        return this.$toast.show("please enter group name", {
          type: "error",
          position: "top",
        });
      }
      //check for group length should be greater then 1 atleast 2 are required
      if (groupUserId.length > 1) {
        let data = { name: this.groupName, users: JSON.stringify(groupUserId) };
        //create a group
        return apiService
          .groupAdd(data)
          .then(() => {
            this.$toast.show("group created successfully", {
              type: "success",
              position: "top",
            });
            this.closeGroupSidebar();
          })
          .catch((error) => {
            this.$toast.show("Something went wrong", {
              type: "error",
              position: "top",
            });
            console.log(error);
          });
      }
      return this.$toast.show("please add atleast 2 users", {
        type: "error",
        position: "top",
      });
    },
  },
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
  width: 28%;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  margin-right: 15px;
  box-sizing: border-box;
  padding: 25px;
  box-shadow: 0 4px 8px 0 rgba(58, 58, 58, 0.2),
    0 6px 20px 0 rgba(28, 28, 28, 0.19);
  @media only screen and (max-width: 600px) {
    width: 100%;
    padding: 14px;
    margin-right: 0;
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
  padding-left: 12px;
  font-size: 12px;
  @media only screen and (max-width: 600px) {
    font-size: 10px;
    padding-left: 5px;
  }
}

.user-wrapper {
  margin-top: 20px;
  width: 100%;
  height: 53%;
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
  overflow-x: scroll;
  border-top: 2px solid #f5f6f6;
  border-radius: 10px;
  padding-left: 9px;
  padding-top: 5px;
  padding-bottom: 5px;
  &:hover {
    background-color: #eff2f9;
  }
}

.user {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.user-pic {
  height: 40px;
  width: 40px;
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
  padding-top: 3px;
  padding-bottom: 3px;
  cursor: pointer;
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
  margin-left: 13px;
  img {
    height: 100%;
  }
}
.search-user {
  text-align: left;
  font-size: 13px;
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
    cursor: pointer;
  }
}
.group-name {
  width: 100%;
  border: 0;
  border-bottom: 3px solid #f5f6f6;
  margin-bottom: 15px;
  outline: none;
}
.group-sidebar {
  height: 96%;
}
.group-add-user-wrapper {
  height: 110px;
  overflow-y: scroll;
  margin-bottom: 20px;
}
.group-user-name {
  margin-left: 5px;
}

.user-image-wrapper {
  border-radius: 50%;
  height: 40px;
  overflow: hidden;
  flex-basis: 40px;
  flex-grow: 0;
  flex-shrink: 0;
  img {
    height: 100%;
  }
}
</style>
