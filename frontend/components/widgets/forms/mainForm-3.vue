<template>
<div>
<!-- Content -->    
    <div style='text-align: center;'>
            <v-btn class=' subtitle-2' text color='blue-grey' >
                <v-icon class='body-1 pr-2'>mdi-plus</v-icon> Main Section
            </v-btn>

    </div>
<!-- add on -->
    <div>
        <v-card>
                <v-tabs v-model="tab" background-color="primary" dark>
                    <v-tab >
                        1
                    </v-tab>
                    <v-tab >
                        2
                    </v-tab>
                    <v-tab >
                        3
                    </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <v-card flat>
                            <v-card-text style='margin: 0; padding: 0'>
                                <main-form-content></main-form-content>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>

                    <v-tab-item>
                        <v-card flat>
                            <v-card-text>B</v-card-text>
                        </v-card>
                    </v-tab-item>

                    <v-tab-item>
                        <v-card flat>
                            <v-card-text>C</v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
    </div>
</div>
</template>

<script>
import mainFormContent from './mainFormContent'
export default {
    components:{
        mainFormContent
    },
    data(){
        return{
            tab: null,
        }
    }
}
</script>

<style>

</style>