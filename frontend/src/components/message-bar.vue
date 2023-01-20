<template>
  <div class="right-container">
    <div class="user-name-show">
      <div class="chat-user">
        <img src="../assets/girl.png" class="user-one-pic" />
      </div>

      <div class="chat-user-name">
        <div>Willie Lagasse</div>
        <div class="time-limit">2 day ago</div>
      </div>
    </div>

    <div class="chats">
      <div class="dummy-chat">
        <div class="sender-image">
          <img src="../assets/girl.png" class="user-one-pic" />
        </div>

        <div class="time-name-chat">
          <div class="text-time">09:25</div>
          <div class="sender-name">Willie Lagasse</div>

          <div class="dummy-chat-text">
            What do you think about our plans for this product launch?
          </div>
        </div>
      </div>

      <div class="dummy-chat">
        <div class="sender-image">
          <img src="../assets/girl.png" class="user-one-pic" />
        </div>

        <div class="time-name-chat">
          <div class="text-time">09:28</div>
          <div class="sender-name">Willie Lagasse</div>

          <div class="dummy-chat-text">
            It looks to me like you have a lot planned before your deadline. I
            would suggest you push your deadline back so you have time to run a
            successful advertising campaign.
          </div>
        </div>
      </div>

      <div class="dummy-chat">
        <div class="sender-image">
          <img src="../assets/girl.png" class="user-one-pic" />
        </div>

        <div class="time-name-chat">
          <div class="text-time">09:29</div>
          <div class="sender-name">Willie Lagasse</div>

          <div class="dummy-chat-text">
            I would suggest you discuss this further with the advertising team.
          </div>
        </div>
      </div>
      <div class="dummy-chat-sender">
        <div class="sender-image-user">
          <img src="../assets/girl.png" class="user-one-pic" />
        </div>

        <div class="time-name-chat-user">
          <div class="text-time">09:31</div>
          <div class="sender-name-user">Willie Lagasse</div>

          <div class="dummy-chat-text">discuss this further with team.</div>
        </div>
      </div>
    </div>

    <div class="user-text-area">
      <input type="text" class="message-text" placeholder="Say something..." />
      <div class="button-position">
        <div class="send-button">
          <img src="../assets/send-message.png" class="send-button-img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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

.user-one {
  /* text-align: center; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  height: 60px;
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
    @media only screen and (max-width: 600px) {
     width: 100%;
      margin-left: 0;
      margin-right: 0;
  }
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
  height: 70px;
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

.dummy-chat-sender {
  background-color: rgb(141, 158, 195);
  width: 70%;
  display: flex;
  flex-direction: row-reverse;
  margin-left: 26%;
  border-radius: 10px;
  margin-top: 10px;
  padding: 10px 10px 10px 10px;
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

.profile-container {
  width: 0;
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
</style>