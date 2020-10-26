<template>
    <div>

        <v-stepper v-model="e6" vertical>
            <v-stepper-step :complete="e6 > 1" step="1" editable>
                Select the date
                <small></small>
            </v-stepper-step>
{{bookingData}}
            <v-stepper-content step="1">
               
                    <v-date-picker  class="mt-4" 
                        color="blue-grey" >
                    </v-date-picker>

                <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
                <v-btn text>Cancel</v-btn>
            </v-stepper-content>



            <v-stepper-step :complete="e6 > 2" step="2" editable>
                Configure analytics for this app</v-stepper-step>

            <v-stepper-content step="2">
            <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
            <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
            <v-btn text>Cancel</v-btn>
            </v-stepper-content>



            <v-stepper-step :complete="e6 > 3" step="3" editable>Select an ad format and name ad unit</v-stepper-step>

            <v-stepper-content step="3">
            <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
            <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
            <v-btn text>Cancel</v-btn>
            </v-stepper-content>

        </v-stepper>
    </div>
</template>

<script>
export default {
    layout: 'adminLayout',
    data () {
        return {
            e6: 1, 

        }
    },

    methods: {
        
    },
    created(){
        this.bookingData
    },

    computed: {
        bookingData(){
            const data = this.$store.state.booking.bookingData
                console.log(typeof data)
                if(typeof data === 'object'){
                    console.log('yes data exist')

                this.period= data.period
                this.duration =  data.duration
                this.arrayDay =  data.arrayDay
                this.start_time= data.start_time
                this.finish_time = data.finish_time
                this.book = data.book // initial 
                }
        }
    }
}
</script>