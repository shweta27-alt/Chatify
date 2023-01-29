<template>
  <div class="right-container">
    <div
      class="user-name-show"
      @click="showFriendsProfile"
      v-if="Object.keys(selectChat).length > 0"
    >
      <div class="chat-user">
        <img :src="getChatUserImage" />
      </div>

      <div class="chat-user-name">
        <div>{{ getMessageUserName }}</div>
      </div>
    </div>

    <div class="chats" v-if="Object.keys(selectChat).length > 0" ref="chats">
      <div v-for="data in chats" :key="data._id">
        <div class="dummy-chat" v-if="userData._id != data.sender._id">
          <div class="sender-image">
            <img :src="data.sender.profilePic" />
          </div>

          <div class="time-name-chat">
            <div class="text-time">
              {{
                getUserMessageTime(data)
                  ? `${getUserMessageTime(data)} ago`
                  : "just now"
              }}
            </div>
            <div class="sender-name">{{ data.sender.fullName }}</div>

            <div class="dummy-chat-text">
              {{ data.content }}
            </div>
          </div>
        </div>

        <div class="dummy-chat-sender" v-if="userData._id == data.sender._id">
          <div class="sender-image-user">
            <img :src="data.sender.profilePic" />
          </div>

          <div class="time-name-chat-user">
            <div class="text-time">
              {{
                getUserMessageTime(data)
                  ? `${getUserMessageTime(data)} ago`
                  : "just now"
              }}
            </div>
            <div class="sender-name-user">{{ data.sender.fullName }}</div>

            <div class="dummy-chat-text">{{ data.content }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="user-text-area" v-if="Object.keys(selectChat).length > 0">
      <input
        type="text"
        class="message-text"
        placeholder="Say something..."
        v-model="message"
        @input="onTyping"
        @keyup.enter="onSendMessage"
      />
      <div class="typing-wrapper" v-if="isTyping">
        <img src="../assets/loading.gif" alt="" />
      </div>
      <div class="button-position">
        <div class="send-button" @click="onSendMessage">
          <img src="../assets/send-message.png" class="send-button-img" />
        </div>
      </div>
    </div>

    <div v-if="!(Object.keys(selectChat).length > 0)" class="message-screen">
         <img src="../assets/chatify-screen.png" alt="" />
    </div>
  </div>
</template>

<script>
import apiService from "../services/api.services";
import io from "socket.io-client";
export default {
  data() {
    return {
      userData: {},
      message: "",
      chats: [],
      socketConnected: false,
      socket: null,
      typing: false,
      isTyping: false,
      notification:[]
    };
  },
  watch: {
    chats(oldvalue, newvalue) {
      if (oldvalue.length !== newvalue.length) {
        let chatsWrapper = this.$refs["chats"];
        this.$nextTick(function () {
          chatsWrapper &&
            chatsWrapper.scroll({
              top: chatsWrapper.scrollHeight,
              behavior: "smooth",
            });
        });
      }
    },
  },
  methods: {
    showFriendsProfile() {
      this.$emit("showFriendsProfile");
    },
    onTyping() {
      if (!this.socketConnected) return;
      if (!this.typing) {
        this.typing = true;
        //emit the typing event to backend 
        this.socket.emit("typing", this.selectChat._id);
        //added debouncing to stop tyiping after some delay
        let timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.typing = false;
          //emit the stop typing event to backend 
          this.socket.emit("stop typing", this.selectChat._id);
        }, 2000);
      }
    },
    onSendMessage() {
      if (this.message) {
        let data = {
          content: this.message,
          chatId: this.selectChat._id,
        };
        apiService
          .sendmessage(data)
          .then((response) => {
            this.message = "";
            //to emit the message to the backend socket
            this.socket.emit("new message", response.data);
            this.fetchMessage();
            this.$emit('fetchChat');
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    fetchMessage() {
      if (this.selectChat._id) {
        apiService
          .fetchmessage(this.selectChat._id)
          .then((response) => {
            this.chats = response.data.reverse();
            //with chat id create a new room for user
            this.socket.emit("join chat", this.selectChat._id);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getUserMessageTime(message) {
      return this.getMessageTimeSince(message.created_at);
    },
    getMessageTimeSince(createdAt) {
      let date = new Date(`${createdAt}`);
      let seconds = Math.floor((new Date() - date) / 1000);

      let interval = seconds / 31536000;

      if (interval > 1) {
        return Math.floor(interval) + " years";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes";
      }
      return 0;
    },
  },

  mounted() {
    this.userData = this.$store.state.userData.user;
    this.fetchMessage();
    this.socket = io("http://localhost:5080");
    //emit the user data to server to join the group
    this.socket.emit("setup", this.userData);  
    this.socket.on("connected", () => {
      this.socketConnected = true;
    });
    
  },

  updated() {
    //to check the typing event from backend 
    this.socket.on("typing", () => (this.isTyping = true));
    //to check the stop typing event from backend 
    this.socket.on("stop typing", () => (this.isTyping = false));
    //to read the message from backend and show message pr notification 
    this.socket.on("message received", (newMessageRecived) => {
      if (
        !this.selectChat ||
        this.selectChat._id !== newMessageRecived.chat._id
      ) {
        if(!(this.notification.find(val=>val._id==newMessageRecived._id))){
          this.notification=[newMessageRecived,...this.notification];
          this.$emit('notification',this.notification);
        }
          
      } else {
        let ifChatExists = this.chats.find(
          (val) => val._id == newMessageRecived._id
        );
        if (!ifChatExists) {
          this.chats = [newMessageRecived, ...this.chats];
        }
      }
    });
  },

  computed: {
    getMessageUserName() {
      if (this.selectChat.isGroupChat) {
        return this.selectChat.chatName;
      } else {
        let userName =
          this.selectChat.users &&
          this.selectChat.users.find((val) => {
            return val._id != this.userData._id;
          });
        return userName && userName.fullName;
      }
    },
    getChatUserImage() {
      if (!this.selectChat.isGroupChat) {
        let userImage =
          this.selectChat.users &&
          this.selectChat.users.find((val) => {
            return val._id != this.userData._id;
          });
        return userImage && userImage.profilePic;
      } else {
        return "https://res.cloudinary.com/dkidih85l/image/upload/v1674413380/ndfqhrchmispwymvcsyh.png";
      }
    },
  },
  props: {
    selectChat: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {},
};
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  box-sizing: border-box;
}

.right-container {
  width: 70%;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  padding-left: 30px;
  padding-right: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  @media only screen and (max-width: 600px) {
    width: 100%;
    border-radius: unset;
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
  padding-top: 10px;
}

.friend-name {
  font-size: 14px;
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
  align-items: center;
  margin-top: 30px;
  height: 60px;
  background-color: rgb(255, 255, 255);
  cursor: pointer;
}

.dummy-chat {
  margin-left: 20px;
  margin-top: 10px;
  text-align: left;
}
.chat-user-name {
  margin-left: 20px;
  text-align: left;
}

.dummy-chat {
  display: flex;
  flex-direction: row;
  background-color: rgb(233, 240, 240);
  width: 70%;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px 10px 10px 15px;
  @media only screen and (max-width: 600px) {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
}

.time-name-chat {
  margin-left: 20px;
  text-align: left;
  color: #7792b1;
  width: 80%;
}

.sender-name,
.dummy-chat-text {
  margin-top: 5px;
  word-break: break-all;
}

.user-text-area {
  width: 100%;
  height: 10%;
  margin-top: 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.say-something-text {
  margin-left: 30px;
  color: rgb(148, 147, 147);
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

.dummy-chat-sender {
  background-color: rgb(141, 158, 195);
  width: 70%;
  display: flex;
  flex-direction: row-reverse;
  margin-left: 26%;
  border-radius: 10px;
  margin-top: 10px;
  padding: 10px 15px 10px 10px;
  text-align: right;
  box-sizing: border-box;

  @media only screen and (max-width: 600px) {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
}

.user-image,
.notification,
.full-screen {
  padding-top: 15px;
}

.chats {
  overflow-y: scroll;
  height: 70%;
  display: flex;
  flex-direction: column-reverse;
}

.time-name-chat-user {
  margin-right: 10px;
  color: #ffffff;
  width: 80%;
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
  cursor: pointer;
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

.sender-image-user,
.chat-user {
  margin-left: 20px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
  }
}
.sender-image {
  border-radius: 50%;
  height: 40px;
  width: 40px;
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
  }
}
.typing-wrapper {
  height: 100%;
  img {
    height: 100%;
  }
}
.message-screen{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    height: 45%;
     @media only screen and (max-width: 600px) {
       height: 200px;
  }
  }
}
</style>
