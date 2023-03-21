<template>
  <Form class="form" @submit="submit">
    <div class="form-inputForm"
         v-for="{ as, name, label, children, ...attrs } in schema.fields"
         :key="name">
      <label :for="name">{{ label }}</label>
      <Field :as="as" :id="name" :name="name" v-bind="attrs">
        <template v-if="children && children.length">
          <component
              v-for="({ tag, text, ...childAttrs }, idx) in children"
              :key="idx"
              :is="tag"
              v-bind="childAttrs"
          >
            {{ text }}
          </component>
        </template>
      </Field>

      <ErrorMessage class="error" :name="name"/>
    </div>
    <slot name="actions"></slot>
  </Form>
</template>


<script>
import {Form, Field, ErrorMessage} from 'vee-validate';

export default {
  name: 'DynamicForm',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  props: {
    schema: {
      type: Object,
      required: true,
    },
  },
  methods: {
    submit(e) {
      this.$emit('onSubmit',e);
    }
  }
};
</script>