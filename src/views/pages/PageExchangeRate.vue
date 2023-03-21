<template>
  <div class="page pageExchange">
    <div class="page__title">
      <h2 class="page__title-caption">Welcome to Exchange Rate API</h2>
    </div>

    <div class="pageExchange__chart">
      <ExchangeCurrency/>
    </div>

  </div>
</template>

<script>

import ExchangeCurrency from "../components/ExchangeCurrency.vue";
import {useAuthStore} from '../../stores/auth.js';

export default {
  components: {ExchangeCurrency},
  setup() {
    const authStore = useAuthStore();

    return {
      user: authStore.user,
    };
  },
  mounted() {
    this.checkSession();
  },
  methods: {
    checkSession() {
      if (this.$cookies.get('session') !== this.user.email) {
        this.$router.replace({name:'Login'});
      }
    }
  }
}
</script>