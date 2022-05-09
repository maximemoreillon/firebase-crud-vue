<template>
  <v-card>
    <v-toolbar flat>
      <v-row align="center">
        <v-col>
          <v-toolbar-title>
            Items
          </v-toolbar-title>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <v-btn
            icon
            :to="{name: 'new_item'}">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>

    <v-card-text>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="items"
        @click:row="row_clicked($event)"/>
    </v-card-text>
  </v-card>
</template>

<script>
import { firestore } from '@/firebase.js'
import {
  collection,
  getDocs,
} from 'firebase/firestore'

export default {
  name: 'Items',
  data(){
    return {
      loading: false,
      items: [],
      headers: [
        {text: 'Name', value: 'data.name'},
        {text: 'Description', value: 'data.description'},
      ]
    }
  },
  mounted(){
    this.get_items()
  },
  methods: {
    async get_items(){
      this.loading = true
      try {
        const collectionRef = collection(firestore, "items")
        const querySnapshot = await getDocs(collectionRef)
        this.items = querySnapshot.docs.map( doc => ({id: doc.id, data: doc.data() }) )
      }
      catch (e) {
        console.error(e);
      }
      finally {
        this.loading = false
      }
    },
    row_clicked({id}){
      this.$router.push({name: 'item', params: {id}})
    }
  }
}
</script>
