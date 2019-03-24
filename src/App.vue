<template>
  <v-app id="inspire">
    <v-content>
      <v-container>

        <v-alert :value="userNotFound" type="warning">
          Oops! Github username not found.
        </v-alert>

        <v-form ref="form" v-model="valid" lazy-validation v-on:submit.prevent>
          <v-text-field v-model="user" :rules="userRules" label="Github Username" required></v-text-field>

          <v-btn :disabled="!valid" color="success" @click="submit">
            Submit
          </v-btn>

          <v-btn color="error" @click="reset">
            Reset Form
          </v-btn>
        </v-form>

        <v-layout row wrap>
          <v-flex sm3 v-for="(response, index) in responses" v-bind:key="index">
            <v-card flat class="ma-3 text-xs-center">

              <div class="text-xs-right">
                <v-btn flat icon @click="remove(index)">
                  <v-icon>close</v-icon>
                </v-btn>
              </div>

              <v-avatar size="100">
                <img :src="response.avatar_url">
              </v-avatar>

              <v-card-text>
                <h3>
                  {{ response.login }}
                </h3>
                Public Repositories:
                <a :href="response.html_url" target="_blank">
                  {{ response.public_repos }}
                </a>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>

      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'

const apiURL = 'https://api.github.com/users/';

export default {
  name: 'app',
  data: function() {
    return {
      valid: true,
      user: '',
      userRules: [
        v => !!v || 'Github Username is required'
      ],
      userNotFound: false,
      responses: []
    }
  },
  methods: {
    submit: function() {
      if (this.$refs.form.validate()) {
        let self = this;
        axios.get(apiURL + this.user, { params: { access_token: process.env.VUE_APP_TOKEN } })
          .then(function(response) { self.responses.push(response.data); })
          .catch(function() { self.userNotFound = true; });
      }
    },
    reset: function() {
      this.$refs.form.reset();
      this.userNotFound = false;
    },
    remove: function(index) {
      this.responses.splice(index, 1);
    }
  }
}
</script>
