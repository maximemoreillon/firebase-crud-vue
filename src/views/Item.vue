<template>
  <v-card
    :loading="loading">

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
        <v-col cols="auto">
          <v-toolbar-title>
            Item
          </v-toolbar-title>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <v-btn
            :loading="deleting"
            icon
            color="#c00000"
            @click="delete_item()">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>

    <v-card-text v-if="item">
      <v-row>
        <v-col>
          <v-text-field
            readonly
            label="Name"
            v-model="item.name"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { firestore } from '@/firebase.js'
import {
  collection,
  doc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore'

export default {
  name: 'NewItem',
  data(){
    return {
      item: null,
      loading: false,
      deleting: false,
    }
  },
  mounted(){
    this.get_item()
  },
  methods: {
    async get_item(){

      try {
        this.loading = true
        const collectionRef = collection(firestore, 'items')
        const docRef = doc(collectionRef,this.item_id)
        const docSnap = await getDoc(docRef)
        this.item = docSnap.data()
      } 
      catch (error) {
        alert(error)
      }
      finally {
        this.loading = false
      }
      
    },
    async delete_item(){

      try {
        this.deleting = true
        const collectionRef = collection(firestore, 'items')
        const docRef = doc(collectionRef,this.item_id)
        await deleteDoc(docRef)
        this.$router.push({name: 'items'})
      } 
      catch (error) {
        alert(error)
      }
      finally {
        this.deleting = false
      }
      
    },
  },
  computed: {
    item_id(){
      return this.$route.params.id
    }
  }
}
</script>
