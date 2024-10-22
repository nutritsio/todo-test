<template>
  <div class="table-component">
    <!-- Search -->
    <div class="table-component__search">
      <input
        v-model="searchQuery"
        class="table-component__searchTerm"
        placeholder="Search by name"
        type="text"
      />
    </div>

    <!-- Table -->
    <table v-if="users?.length">
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, rowIndex) in paginatedRows" :key="rowIndex">
          <td>
            <NuxtLink :to="`/users/${user?.id}`">{{ user?.name }}</NuxtLink>
          </td>
          <td>{{ user?.email }}</td>
          <td>{{ user?.phone }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p>User List is empty.</p>
    </div>

    <!-- Pagination -->
    <div class="table-component__pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
      <span class="table-component__pagination--text"
        >Page {{ currentPage }} of {{ totalPages }}</span
      >
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  users: {
    type: Array,
    default: () => [],
  },
});

const headers = ref(["Name", "Email", "Phone"]);

const rowsPerPage = 5;
const currentPage = ref(1);
const searchQuery = ref("");

const route = useRoute();
const router = useRouter();

const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return props.users;
  }
  return props.users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / rowsPerPage)
);

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  return filteredUsers.value.slice(start, end);
});

watch(
  () => route.query.page,
  (newPage) => {
    if (newPage) {
      currentPage.value = parseInt(newPage, 10) || 1;
    } else {
      currentPage.value = 1;
    }
  },
  { immediate: true }
);

const prevPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    goToPage(currentPage.value + 1);
  }
};

const goToPage = (page) => {
  router.push({ query: { ...route.query, page } });
};
</script>

<style lang="scss" scoped>
.table-component {
  position: relative;
  margin: 40px;

  &__pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    &--text {
      color: black;
      font-size: 14px;
      margin: 0 20px;
    }
  }

  &__search {
    width: 300px;
    position: relative;
    display: flex;
    margin-bottom: 20px;
  }

  &__searchTerm {
    width: 100%;
    border: 3px solid #00b4cc;
    padding: 5px;
    height: 20px;
    border-radius: 5px 0 0 5px;
    outline: none;
    color: #9dbfaf;

    &:focus {
      color: #00b4cc;
    }
  }

  // Defaults
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 8px;
    border: 1px solid #ccc;
    text-align: left;
  }

  thead {
    background-color: #f5f5f5;
  }

  button {
    background-color: #fff;
    border: none;
    position: relative;
    display: inline-flex;
    grid-gap: 12px;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    line-height: 20px;
    font-weight: 700;
    text-decoration: none;
    border-radius: 4px;
    padding: 10px 16px;
    cursor: pointer;
    vertical-align: middle;
    box-sizing: border-box;
    letter-spacing: 0.2px;
    transition: all 0.2s;
    background: rgb(94, 94, 237);
  }
}
</style>
