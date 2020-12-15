<template>
    <v-list-item-group mandatory>
            <v-list-item @click='click(item.title)' class='tile' v-for="(item, i) in items" :key="i" dense >
                <v-list-item-action>
                    <v-icon  :to="item.to"  class='icon'  style='font-size: 1.2rem;  font-weight: 100;'>{{ item.icon }}</v-icon>
                </v-list-item-action>

                <v-list-item-content   style='margin-left: -20px;'>
                    <v-list-item-title  class='list_title'  v-text="item.title" />
                </v-list-item-content>
            </v-list-item>  <br>
        </v-list-item-group>
</template>
<script>
export default {
    props: ['items'],
    methods:{
        click(item){
            this.$store.commit('layout/navItem', item)
    },
    }

}
</script>