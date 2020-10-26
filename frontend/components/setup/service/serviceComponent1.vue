<template>
<div >
    <div>
        <v-btn class=' subtitle-2' text color='blue-grey' >
            <v-icon class='body-1 pr-2'>mdi-plus</v-icon> Register your product or service 
        </v-btn>

        <div style='border: 1px solid purple'>
            <div>  <category-form /></div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
    // scss
</style>

<script>
import CategoryForm from './CategoryForm'

export default {
    components:{
        CategoryForm,
    },
    
}
</script>
