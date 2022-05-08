<template>
  <v-card
    :loading="loading">
    <v-card-title>
       Item
    </v-card-title>
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
} from 'firebase/firestore'

export default {
  name: 'NewItem',
  data(){
    return {
      item: null,
      loading: false,
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
  },
  computed: {
    item_id(){
      return this.$route.params.id
    }
  }
}
</script>
