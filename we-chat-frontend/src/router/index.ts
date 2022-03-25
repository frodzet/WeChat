import { createRouter, createWebHistory } from "vue-router";
import CreateUserView from "../views/CreateUserView.vue";
import RoomView from "../views/RoomView.vue";
import ChatView from "../views/ChatView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "createUser",
      component: CreateUserView,
    },
    {
      path: "/chat/:name",
      name: "Chat",
      component: ChatView,
    },
    {
      path: "/room",
      name: "Room",
      component: RoomView,
    },
  ],
});

export default router;
