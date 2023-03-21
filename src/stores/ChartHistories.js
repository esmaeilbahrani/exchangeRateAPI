import {defineStore} from 'pinia';

export const useHistoriesStore = defineStore({
    id: 'histories',
    state: () => ({
        histories: [],
    }),
    actions: {
        addHistory(history) {
            this.histories.push(history);
            if (this.histories.length > 3) {
                this.histories.shift();
            }
        },
    },
});