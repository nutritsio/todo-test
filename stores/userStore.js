import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        users: [],
        // userTodos: []
    }),
    actions: {
        async getUsers() {
            const { data: pack } = await useFetch(
                "https://jsonplaceholder.typicode.com/users"
            );

            this.users = pack.value;
        },
        // async getUserTodos(uri) {
        //     const { data: todoItems } = await useFetch(uri);

        //     this.userTodos = todoItems.value;
        // },
    },
    getters: {
        getUserName: (state) => {
            return (userId) => state.users.find((user) => user.id == userId)?.name
        },
    }
})
