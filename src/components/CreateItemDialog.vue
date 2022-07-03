<template>
    <v-dialog v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
                New
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="text-h5">
                New item
            </v-card-title>

            <v-form v-if="item">
                <v-card-text>
                    <v-row>
                        <v-col>
                            <v-text-field label="Name" v-model="item.name" />
                        </v-col>
                        <v-col>
                            <v-text-field label="Description" v-model="item.description" />
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                        Cancel
                    </v-btn>
                    <v-btn color="primary" text @click="create_item()" :loading="loading">
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
            dialog: null,
            defaults: {
                name: '',
                description: '',
            },
            item: null,
            loading: false,
        }
    },
    mounted() {
        this.item = { ...this.defaults }
    },
    methods: {
        async create_item() {
            try {
                this.loading = true
                const collectionRef = collection(firestore, 'items')
                await addDoc(collectionRef, this.item)
                this.$emit('create')
                this.dialog = false
                this.item = { ...this.defaults }
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