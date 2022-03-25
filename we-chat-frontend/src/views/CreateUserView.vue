<template>
  <body>
    <div class="join-container">
      <header class="join-header">
        <h1>WeChat - Create User</h1>
      </header>
      <main class="join-main">
        <form action="/room">
          <div class="form-control">
            <label for="username">Username</label>
            <input
              v-model="inputName"
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              required
            />
            <label for="username">E-Mail</label>
            <input
              v-model="inputEmail"
              type="text"
              name="email"
              id="email"
              placeholder="Enter email..."
              required
            />
            <label for="username">Password</label>
            <input
              v-model="inputPassword"
              type="text"
              name="password"
              id="password"
              placeholder="Enter password..."
              required
            />
          </div>
          <RouterLink :to="'/room'">
            <button @click="handleCreateUser" class="btn" type="button">Create User</button>
          </RouterLink>

        </form>
      </main>
    </div>
  </body>
</template>

<script setup lang="ts">
import { UserStore } from "@/stores/userStore";
import { ref } from "vue";

const userStore = UserStore();
const inputName = ref("");
const inputEmail = ref("");
const inputPassword = ref("");

function handleCreateUser() {
  userStore.createUser(inputName.value, inputEmail.value, inputPassword.value);
}
</script>

<style scoped></style>
