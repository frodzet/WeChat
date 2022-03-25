<template>
  <body>
    <div class="chat-container">
      <header class="chat-header">
        <h1>WeChat - Username: {{userStore.userName}}</h1>
        <a href="/" class="btn">Leave Room</a>
      </header>
      <main class="chat-main">
        <div class="chat-sidebar">
          <h3>Current Room:</h3>
          <h2 class="chat-sidebar-room">{{ chatStore.currentRoom }}</h2>
          <h3>All Rooms:</h3>
          <h2
            class="chat-sidebar-room"
            :to="'/chat/' + room.name"
            v-for="(room, index) in chatStore.listOfRooms"
            :key="index"
            @click="chatStore.joinChat(room.name)"
          >
            {{ room.name }}
          </h2>
        </div>
        <div class="chat-messages">
          <div class="message">
            <p class="meta">
              System <span>{{ getDateTimeNow() }}</span>
            </p>
            <p class="text">
              Welcome to WeChat - a new way to interact with people.
            </p>
          </div>
          <div
            class="message"
            v-for="(chat, index) in chatStore.chats"
            v-bind:key="index"
          >
            <p class="meta">
              {{ chat.user }} <span>{{ getDateTimeNow() }}</span>
            </p>
            <p class="text">
              {{ chat.text }}
            </p>
          </div>
          <div class="message" v-for="(chat, index) in chatStore.isTyping" v-bind:key="index">
            <p class="meta">
              {{ chat }}
            </p>
            <p class="text">
              is typing...
            </p>
          </div>
        </div>
      </main>
      <div class="chat-form-container">
        <form id="chat-form">
          <input
            v-model="txtChatInput"
            v-on:input="typing"
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
          />
          <button class="btn" type="button" @click="sendChat">Send</button>
        </form>
      </div>
    </div>
  </body>
</template>

<script setup lang="ts">
import { ChatStore } from "@/stores/chatStore";
import { ref } from "vue";
import { UserStore } from "@/stores/userStore";

const txtChatInput = ref("");

const chatStore = ChatStore();
const userStore = UserStore();
chatStore.getMessages();
chatStore.updateTyping();

function sendChat() {
  chatStore.sendMessage({
    user: userStore.userName,
    text: txtChatInput.value,
  });
  txtChatInput.value = "";
  const txtInputField = document.getElementById("msg");
  txtInputField?.focus();
}

function typing() {
  chatStore.isTypingText({
    user: userStore.userName,
    text: txtChatInput.value,
  });
}

function getDateTimeNow() {
  return new Date().toLocaleString();
}
</script>

<style scoped>
.chat-sidebar-room:hover {
  color: burlywood;
  cursor: pointer;
}
</style>
