<template>
    <v-dialog v-model="dialog" max-width="30rem">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
                <v-icon left>mdi-plus</v-icon>
                <span>New item</span>
            </v-btn>
        </template>
        <v-card >
            <v-card-title class="text-h5">
                New item
            </v-card-title>

            <v-form @submit.prevent="create_item()">
                <v-card-text>
                    <v-row>
                        <v-col>
                            <v-text-field label="Name" v-model="newItem.name" ref="itemNameInput"/>
                        </v-col>
                        
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-text-field label="Description" v-model="newItem.description" />
                        </v-col>
                    </v-row>

                    
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                        Cancel
                    </v-btn>
                    <v-btn color="primary" text type="submit" :loading="loading">
                        Create
                    </v-btn>
                </v-card-actions>
            </v-form>

        </v-card>
    </v-dialog>

</template>
<script>
import { firestore } from '@/firebase.js'
import {
    collection,
    addDoc,
} from 'firebase/firestore'
export default {
    name: 'CreateItemDialog',
    data() {
        return {
            dialog: false,
            newItem: {
                name: '',
                description: '',
            },
            loading: false,
        }
    },
    watch: {
        dialog(){
            if(!this.dialog) return
            setTimeout(() => {
                this.$refs.itemNameInput.focus()
            }, 0)
        }
    },
    methods: {
        async create_item() {
            this.loading = true

            try {
                const collectionRef = collection(firestore, 'items')
                await addDoc(collectionRef, this.newItem)
                this.$emit('itemCreated')
                this.dialog = false

                // reset input
                this.newItem = {
                    name: '',
                    description: '',
                }
            }
            catch (error) {
                alert(error)
            }
            finally {
                this.loading = false
            }

        }
    }
}
</script>