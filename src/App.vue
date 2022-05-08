<template>
  <v-app>
    <v-app-bar
      app
      color="#444444"
      dark >

      <v-toolbar-title>
        Firebase CRUD Vue
      </v-toolbar-title>

    </v-app-bar>

    <v-main 
      class="grey lighten-4">
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
    
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
