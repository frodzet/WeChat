<template>
  <input v-model="txtRoomListener" placeholder="Enter room name" /> <br />
  <router-link v-bind:to="'/chat/' + txtRoomListener" @click="createRoom">Connect</router-link>
  <ul>
    <RouterLink
      v-bind:to="'/chat/' + room.name"
      v-for="(room, index) in chatStore.listOfRooms"
      @click="joinRoom(room.name)"
      v-bind:key="index"
    >
      {{ room.name }}
    </RouterLink>
  </ul>
</template>

<script setup lang="ts">
import { ChatStore } from "@/stores/chatStore";
import { ref } from "vue";

const chatStore = ChatStore();
const txtRoomListener = ref("");
chatStore.sendRoomRequest();

function joinRoom(name: string) {
  chatStore.joinChat(name);
}

function createRoom() {
  chatStore.joinChat(txtRoomListener.value);
}
</script>

<style scoped></style>
