<template>
  <div class="user">
    <router-link to="/users">Users List</router-link>
    <h1 class="user__header">UserName: {{ userName }}</h1>

    <div class="user__todos">
      <div
        v-for="(todoItem, index) in todoItems"
        :key="index"
        class="user__todo"
        :class="{
          'user__todo--completed': todoItem?.completed,
        }"
      >
        {{ todoItem.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/userStore";
const userStore = useUserStore();

const { id } = useRoute().params;
const uri = "https://jsonplaceholder.typicode.com/todos?userId=" + id;

const { data: todoItems } = await useFetch(uri);

const userName = userStore.getUserName(id);

definePageMeta({
  layout: "user",
});
</script>

<style lang="scss" scoped>
.user {
  margin: 20px;

  &__header {
    text-align: center;
    margin: 40px 0;
  }

  &__todos {
    display: grid;
    gap: 15px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  &__todo {
    width: 200px;
    height: 200px;
    line-height: 200px;
    border: 1px solid gray;
    background: gray;
    color: #000;
    text-align: center;
    font-size: 14px;
    transition: all 0.3s;

    &--completed {
      background: #008000;
    }

    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
      z-index: 1;
      cursor: pointer;
    }
  }
}
</style>
