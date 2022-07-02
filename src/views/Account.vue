<template>
    <v-card>
        <v-card-title>Account</v-card-title>

        <v-card-text v-if="!user">
            You must be logged in to view this page
        </v-card-text>

        <template v-else>
            <v-card-text>
                
            </v-card-text>
        </template>

    </v-card>
</template>

<script>


export default {
    name: 'Account',

    data() {
        return {
            stripe_role: null,
        }
    },

    methods: {



    },
    computed: {
        user() {
            return this.$store.state.user
        }
    }


}
</script>