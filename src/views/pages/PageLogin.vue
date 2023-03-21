<template>
  <div class="page pageLogin">
    <div class="page__title">
      <h2 class="page__title-caption">Login to Account</h2>
      <h3 class="page__title-text">Exchange Rate API </h3>
    </div>

    <div class="pageLogin__form">
      <DynamicForm :schema="formSchema" @onSubmit="login">
        <template v-slot:actions>
          <button type="submit" class="btn btn-primary">Login</button>
        </template>
      </DynamicForm>

      <div class="alert alert-red" v-if="!!error">{{ error }}</div>

      <ul class="pageLogin__form-help">
        <li>email: <b>{{ user.email }}</b></li>
        <li>password: <b>{{ user.password }}</b></li>
      </ul>
    </div>

  </div>
</template>
<script>
import DynamicForm from '../components/DynamicForm.vue';
import * as Yup from 'yup';
import {emailRegex} from '../../assets/js/rules.';
import {useAuthStore} from '../../stores/auth.js';

export default {
  components: {
    DynamicForm,
  },
  setup() {
    const authStore = useAuthStore();

    return {
      user: authStore.user,
    };
  },
  data() {
    return {
      error: null,
      formSchema: {
        fields: [
          {
            label: 'Email',
            name: 'email',
            as: 'input',
            rules: Yup.string().matches(emailRegex, 'this must be a valid email').required(),
          },
          {
            label: 'Password',
            name: 'password',
            as: 'input',
            type: 'password',
            rules: Yup.string().min(6).required(),
          },
        ],
      },
    }
  },
  methods: {
    login(e) {
      if (e.email === this.user.email && e.password === this.user.password) {
        this.$cookies.set('session', this.user.email);
        this.$router.replace({name: 'ExchangeRate'});
      } else {
        this.error = 'The username or password is incorrect';
      }

    }
  },
};
</script>