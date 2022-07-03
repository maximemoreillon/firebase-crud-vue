<template>
  <v-app>
    <v-app-bar app color="#444444" dark clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Firebase + Vue.js</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn :to="{name: 'account'}" icon v-if="user">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn :to="{name: 'login'}" icon v-else>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense nav>
        <template v-for="(item, index) in nav">
          <v-list-group :value="true" prepend-icon="mdi-folder" :key="index" v-if="item.items" no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item v-for="(sub_item, sub_index) in item.items" :key="`${index}_${sub_index}`" link
              :to="sub_item.to" exact>
              <v-list-item-content>
                <v-list-item-title v-text="sub_item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-item exact :key="item.title" link :to="item.to" v-else>
            <v-list-item-icon v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main class="grey lighten-4">
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <v-footer>
      <v-col class="text-center" cols="12"> Firebase + Vue.js - Maxime MOREILLON </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { getAuth } from "firebase/auth"

export default {
  name: "App",
  components: {},

  data() {
    return {
      drawer: null,
      nav: [
        {
          title: "items",
          icon: "mdi-format-list-bulleted",
          to: { name: "items" },
        },
       
        {
          title: "About",
          icon: "mdi-information-outline",
          to: { name: "about" },
        },
      ],
    };
  },
  mounted(){
    getAuth().onAuthStateChanged( (user) => {
      this.$store.commit('setUser', user)
    })
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  }
};
</script>