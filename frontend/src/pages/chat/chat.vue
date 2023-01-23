<template>
  <div class="container">
    <div class="nav-bar-project">
      <div class="logo-wrapper">
        <div class="mobile-icon" @click="openUserSidebar">mobile-icon</div>
        <div>
          <img src="../../assets/chatify-logo.jpeg" class="chatify-logo" />
        </div>
      </div>
      <div class="user-profile-notification">
        <div class="notification">
          <img src="../../assets/notification-bell.png" class="user-icon" />
        </div>
        <div class="user-image" @click="onProfileClick">
          <img :src="userData && userData.profilePic" />
        </div>
      </div>
    </div>
    <div class="lower-chat">
      <div class="inner-container">
        <user-sidebar
          @selectedChat="selectedChat"
          @showGroupSidebar="showGroupSidebar"
          :key="selectChat && selectChat.chatName"
          v-if="!showGroupContainer"
          :class="{
            'user-sidebar': true,
            'show-user-sidebar': showMobileUserSidebar,
          }"
        />
        <group-sidebar
          @closeGroupSidebar="closeGroupSidebar"
          :isShowGroup="showGroupContainer"
          :class="{
            'group-container': true,
          }"
          v-else
        />
        <message-bar
          @showFriendsProfile="showFriendsProfile"
          :selectChat="selectChat"
          :key="selectChat._id"
        />
        <profile-sidebar
          @userData="setUserdata"
          :class="{
            'profile-container': true,
            profile: showProfileContainer,
          }"
        />
        <friend-sidebar
          v-if="showFriendProfile"
          :selectChat="selectChat"
          @selectedChat="selectedChat"
          @userData="setUserdata"
          class="friend-container"
        />
      </div>
    </div>
  </div>
</template>

<script>
import messageBar from "../../components/message-bar.vue";
import userSideBar from "../../components/user-sidebar.vue";
import groupSideBar from "../../components/group-sidebar.vue";
import profileSidebar from "../../components/profile-sidebar.vue";
import friendSidebar from "../../components/friend-sidebar.vue";
export default {
  components: {
    "message-bar": messageBar,
    "user-sidebar": userSideBar,
    "profile-sidebar": profileSidebar,
    "friend-sidebar": friendSidebar,
    "group-sidebar": groupSideBar,
  },
  data() {
    return {
      showProfileContainer: false,
      userData: null,
      showGroupContainer: false,
      showMobileUserSidebar: false,
      showFriendProfile: false,
      selectChat: {},
    };
  },
  methods: {
    onProfileClick() {
      this.showMobileUserSidebar = false;
      this.showProfileContainer = !this.showProfileContainer;
      this.showFriendProfile = false;
    },
    setUserdata(user) {
      this.userData = user;
    },
    showGroupSidebar() {
      this.showGroupContainer = true;
    },
    closeGroupSidebar() {
      this.showGroupContainer = false;
    },
    openUserSidebar() {
      this.showProfileContainer = false;
      this.showFriendProfile = false;
      this.showMobileUserSidebar = !this.showMobileUserSidebar;
    },
    showFriendsProfile() {
      this.showMobileUserSidebar = false;
      this.showProfileContainer = false;
      this.showFriendProfile = !this.showFriendProfile;
    },
    selectedChat(data) {
      this.selectChat = data;
      console.log("heyyyyy", this.selectChat);
    },
  },
  mounted() {
    this.userData = this.$store.state.userData.user;
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

.lower-chat {
  width: 100%;
  background-color: rgb(243, 246, 255);
  display: flex;
  flex-direction: column;
  height: 91%;
}

.inner-container {
  width: 95%;
  position: relative;
  margin: 30px;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: rgb(243, 246, 255);
  border-radius: 15px;
  height: 96%;
  @media only screen and (max-width: 600px) {
    width: 100%;
    margin: 0;
    height: 100%;
  }
}

.user {
  margin-top: 20px;
  width: 100%;
}

.user-icon {
  margin-left: 20px;
  margin-right: 20px;
  height: 30px;
  margin-top: 10px;
  border-radius: 50%;
}
.user-data {
  display: flex;
  align-items: center;
}

.user {
  /* text-align: center; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  height: 60px;
}

.user-pic {
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

.nav-bar-project {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 9%;
  width: 100%;
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
  justify-content: center;
  align-items: center;
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

.profile-container,
.friend-container {
  width: 0;
  overflow: hidden;
}
.group-container {
  overflow: hidden;
  padding: 0;
  width: 25%;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media only screen and (max-width: 600px) {
    width: 58%;
    padding: 14px;
  }
}
.profile,
.friend-container {
  width: 350px;
  background-color: rgb(255, 255, 255);
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-left: 15px;
  border-radius: 10px;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
  @media only screen and (max-width: 600px) {
    border-radius: unset;
  }
}

.user-image {
  cursor: pointer;
  margin-left: 20px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  overflow: hidden;
  img {
    height: 100%;
  }
}
.user-sidebar {
  @media only screen and (max-width: 600px) {
    display: none;
  }
}

.mobile-icon {
  display: none;
  @media only screen and (max-width: 600px) {
    display: inline-block;
  }
}
.show-user-sidebar {
  display: inline-block;
}
.logo-wrapper {
  display: flex;
}
</style>