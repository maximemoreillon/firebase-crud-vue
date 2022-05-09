<template>
  <v-card
    max-width="30em"
    class="mx-auto">
    <v-toolbar flat>
      <v-row align="center">
        <v-col cols="auto">
          <v-btn
            icon
            exact
            :to="{name: 'items'}">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-toolbar-title>New item</v-toolbar-title>
        </v-col>
        <v-spacer />
        
      </v-row>
    </v-toolbar>
    <v-card-text>
      <v-form @submit.prevent="create_item()">
        <v-row>
          <v-col>
            <v-text-field
              label="Name"
              v-model="name" />
          </v-col>
        </v-row>
        <v-row>
          <v-spacer />
          <v-col 
            cols="auto">
            <v-btn
              type="submit">
              Create item
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { firestore } from '@/firebase.js'
import {
  collection,
  addDoc,
} from 'firebase/firestore'

export default {
  name: 'NewItem',
  data(){
    return {
      name: '',
      loading: false,
    }
  },
  methods: {
    async create_item(){
      try {
        const properties = { name: this.name }
        const collectionRef = collection(firestore, 'items')
        const {id} = await addDoc(collectionRef, properties)
        this.$router.push({name: 'item', params: {id}})
      } 
      catch (error) {
        alert(error)
      }
      
    }
  }
}
</script>
