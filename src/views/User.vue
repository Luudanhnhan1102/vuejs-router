<template>
  <div>
    <h1>Welcome {{ user }}</h1>
    <p>
      <router-link
        :to="{
          name: 'invoices'
        }"
        >Invoices</router-link
      >
    </p>
    <button class="btn" @click="logOut">Log out</button>
  </div>
</template>
<script>
import store from '@/store'
export default {
  data() {
    return {
      user: store.user
    }
  },
  methods: {
    logOut() {
      store.user = null
      this.$router.push('/')
    }
  }
}
</script>
