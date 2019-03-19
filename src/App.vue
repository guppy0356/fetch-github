<template>
  <div id="app">
    <form v-on:submit.prevent='fetchData'>
      <input type="text" v-model="user">
      <button type="submit" name="button">送信</button>
    </form>
    <div v-for="response in responses" v-bind:key="response.id">
      <img v-bind:src="response.avatar_url">
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const apiURL = 'https://api.github.com/users/';

export default {
  name: 'app',
  data: function() {
    return {
      user: null,
      responses: []
    }
  },
  methods: {
    fetchData: function() {
      let self = this;

      axios.get(apiURL + this.user, { params: { access_token: process.env.VUE_APP_TOKEN } })
        .then(function(response) { self.responses.push(response.data); })
    }
  }
}
</script>
