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
            <v-row>
                <v-spacer></v-spacer>
                <v-col cols="auto">
                    <v-btn :to="{name: 'login'}">
                        <v-icon left>mdi-logout</v-icon>
                        <span>Logout</span>
                    </v-btn>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>

        </v-card-text>
    </v-card>
</template>

<script>


export default {
    name: 'Account',

    data() {
        return {
        }
    },
    mounted(){
    },
    computed: {
        user(){
            return this.$store.state.user
        }
    }



}
</script>