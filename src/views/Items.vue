<template>
  <v-card>
    <v-card-title>
      Items
    </v-card-title>
    <v-card-text>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="items">
        
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { firestore } from '@/firebase.js'
import {
  collection,
  getDocs,
} from "firebase/firestore"

export default {
  name: 'Items',
  data(){
    return {
      loading: false,
      items: [],
      headers: [
        {text: 'ID', value: 'id'},
        {text: 'Name', value: 'data.name'},
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
        console.log(this.items);
      }
      catch (e) {
        console.error(e);
      }
      finally {
        this.loading = false
      }
    }
  }
}
</script>
