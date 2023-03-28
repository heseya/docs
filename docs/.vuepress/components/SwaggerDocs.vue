<template>
  <div :id="containerId"></div>
</template>

<script>
import { SwaggerUIBundle } from 'swagger-ui-dist'
import 'swagger-ui/dist/swagger-ui.css'

export default {
  name: 'SwaggerDocs',
  props: {
    openApiUrl: {
      type: String,
      required: true,
    },
  },
  computed: {
    containerId() {
      return `swagger-ui-${Math.round(Math.random() * 10000)}`
    },
  },

  mounted() {
    SwaggerUIBundle({
      url: this.openApiUrl,
      dom_id: `#${this.containerId}`,
    })
  },
}
</script>

<style lang="scss">
.swagger-ui {
  div,
  p,
  pre,
  span:not(.opblock-summary-method),
  small,
  button,
  td,
  tr,
  th,
  .response-col_status,
  .response-col_description,
  .title {
    font-family: var(--font-family) !important;
    color: var(--c-text) !important;
  }

  a {
    color: var(--c-brand) !important;
  }
}
</style>
