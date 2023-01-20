<template>
  <div class="auth-wrapper">
    <div class="upper-part">
      <div class="logo">
        <img src="../assets/chatify-logo.jpeg" class=" chat-logo"/>
        </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.upper-part {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding:15px;
}

.lower-part{
  font-size: 14px;
}
.logo {
  height: 100px;
  display: flex;
  justify-content: center;
}

.chat-logo{
  height:74px;
}
</style>