<template>
  <div class="left-container">
    <div class="user-heading">
      <div>My Chat</div>
      <div @click="onUserGroupChatClick" class="group-chat-heading">
        <img src="../assets/users-group.png" alt="create group chat" />
      </div>
    </div>
    <div class="search-bar-wrapper">
      <input
        type="text"
        placeholder="Search user or create chat"
        class="search-bar"
        v-model="userSearchData"
        @input="searchUser"
      />
    </div>

    <div class="user-wrapper" v-if="userSearchData">
      <div
        class="user"
        v-for="data in responseUser"
        :key="data.username"
        @click="createUserChat(data)"
      >
        <div class="user-data">
          <div class="user-image-wrapper">
            <img :src="data.profilePic" />
          </div>
          <div class="search-user">
            <p class="friend-name">{{ data.fullName }}</p>
            <p class="friend-name">{{ data.email }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="user-wrapper" v-else>
      <div
        v-for="data in userChat"
        :class="`user ${data._id == selectedChat._id ? 'selected' : ''}`"
        :key="data._id"
        @click="setSelectedChat(data)"
      >
        <div class="user-data">
          <div class="user-image-wrapper">
            <img :src="getChatUserImage(data)" />
          </div>
          <div class="chat-content">
            <p class="chat-friend-name">{{ getChatUserName(data) }}</p>
            <p class="latest-chat">
              {{ data.latestMessage && data.latestMessage.content }}
            </p>
          </div>
          <div class="notification" v-if="getNotification(data)">{{ getNotification(data) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from "../services/api.services";

export default {
  data() {
    return {
      userSearchData: "",
      responseUser: [],
      userChat: [],
      userData: null,
      selectedChat: "",
      chatNotification: this.notification,
    };
  },
  methods: {
    async searchUser() {
      let response = await apiService.usersearch(this.userSearchData);
      this.responseUser = response.data.users;
      console.log(this.responseUser);
    },
    onUserGroupChatClick() {
      this.$emit("showGroupSidebar");
    },
    createUserChat(data) {
      apiService
        .createuserchat({ userId: data._id })
        .then((response) => {
          console.log(response);
          this.fetchUserChat();
        })
        .catch((error) => console.log(error));
      this.userSearchData = "";
    },
    getChatUserName(data) {
      if (!data.isGroupChat) {
        let userName = data.users.find((val) => {
          return val._id != this.userData._id;
        });
        return userName.fullName;
      } else {
        return data.chatName;
      }
    },
    getChatUserEmail(data) {
      if (!data.isGroupChat) {
        let userEmail = data.users.find((val) => {
          return val._id != this.userData._id;
        });
        return userEmail.email;
      } else {
        return "";
      }
    },
    getChatUserImage(data) {
      if (!data.isGroupChat) {
        let userImage = data.users.find((val) => {
          return val._id != this.userData._id;
        });
        return userImage.profilePic;
      } else {
        return "https://res.cloudinary.com/dkidih85l/image/upload/v1674413380/ndfqhrchmispwymvcsyh.png";
      }
    },
    fetchUserChat() {
      apiService
        .fetchchat()
        .then((response) => {
          this.userChat = response.data.result;
          console.log(this.userChat);
        })
        .catch((error) => console.log(error));
    },
    setSelectedChat(data) {
      this.selectedChat = data;
      console.log("selected chat", this.selectedChat);
      this.chatNotification = this.chatNotification.filter(
        (val) => val.chat._id != data._id
      );
      this.$emit("selectedChat", data);
    },
    getNotification(data) {
      let notificationCount =
        this.chatNotification.length > 0 &&
        this.chatNotification.filter((val) => val.chat._id == data._id);
      return notificationCount.length ? notificationCount.length : "";
    },
  },

  mounted() {
    this.userData = this.$store.state.userData.user;
    this.fetchUserChat();
    this.selectedChat = this.selectChat;
    console.log(this.notification)
  },
  props: {
    notification: {
      type: Array,
      default() {
        return [];
      },
    },
    selectChat: {
      type: Object,
      default() {
        return {};
      },
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
  margin-top: 13px;
  width: 100%;
  border-radius: 10px;
  padding: 8px;
  box-sizing: border-box;
  &:hover {
    background-color: #eff2f9;
  }
  &.selected {
    background-color: #eff2f9;
  }
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
  word-break: break-word;
}

.user-wrapper {
  display: flex;
  flex-direction: column;
  height: 80%;
  overflow-y: scroll;
}

.user-pic {
  height: 40px;
  width: 40px;
  /* margin-left:5px; */
  padding-top: 10px;
}

.friend-name {
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
  flex: auto;
  p {
    padding: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    width: 143px;
    white-space: nowrap;
  }
}
.group-chat-heading {
  cursor: pointer;
  height: 18px;
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

.notification {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: #93b4d4;
  color: #ffffff;
  padding: 0;
}
</style>
