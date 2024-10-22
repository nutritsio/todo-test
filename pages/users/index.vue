<template>
  <div class="users">
    <router-link to="/">Go Home Page</router-link>
    <h1 class="users__title">Users List</h1>

    <Table :users="users" />
  </div>
</template>

<script setup>
import Table from "~/components/Table.vue";

definePageMeta({
  layout: "users",
});

import { useUserStore } from "~/stores/userStore";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const { users } = storeToRefs(userStore);

userStore.getUsers();
</script>

<style lang="scss" scoped>
.users {
  &__title {
    text-align: center;
    margin: 40px 0;
  }
}
</style>
