<template>
    <v-card>
        <v-card-title>Account</v-card-title>
        <v-card-text v-if="user">

            <v-row>
                <v-col>
                    E-mail
                </v-col>
                <v-col>
                    {{user.email}}
                </v-col>
            </v-row>

        </v-card-text>
    </v-card>
</template>

<script>

import { getAuth } from "firebase/auth"

export default {
    name: 'Account',

    data() {
        return {
            user: null
        }
    },
    mounted(){
        this.get_user()
    },
    methods: {
        get_user(){
            this.user = getAuth().currentUser
        }
    },



}
</script>