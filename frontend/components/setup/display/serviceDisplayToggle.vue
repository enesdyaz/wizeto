<template>
<div>
    {{item}}
    <v-list dense flat>
   
        <v-list-group style='margin-left: -30px;' v-for='(data, index) in category' :key='index' :value="true"  small sub-group>

            <template  v-slot:activator >
                <v-list-item-content >
                    <v-list-item-title style='color: #607d8b; '>{{data.parent.toUpperCase()}}</v-list-item-title>
                </v-list-item-content>
            </template>

            <v-list-item-group style='padding-left: 10%; color: red;' v-model='item' color='primary'>

                <v-list-item style='margin: 0' v-for="(content, i) in data.content" :key="i"  :value='content.name'>
                    <v-list-item-title  style='margin-left: -3%; font-weight: 400;' v-text="content.name"></v-list-item-title>

                    <v-list-item-icon>
                     <div style='padding-right: 10px;font-size: 0.8rem;margin-top: 3px;'>${{content.price}}</div>
                    </v-list-item-icon>
                </v-list-item>
            </v-list-item-group>
        </v-list-group>

    </v-list>
</div>
</template>

<script>
  export default {
    layout: 'adminLayout',
    data(){
        return{
            item: ''
        }
    },
    computed:{
        category(){
            return this.$store.state.parent.category
        }
    },
  }
</script>