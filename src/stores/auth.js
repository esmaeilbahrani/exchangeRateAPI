import {defineStore} from 'pinia';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: {
            email: 'admin@admin.com',
            password: '123456',
        }
    }),
});