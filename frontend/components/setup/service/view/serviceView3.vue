<template>
<div><br>
    <v-list dense flat>
        <v-list-group v-for='(data, index) in category' :key='index' :value="true"  sub-group >
            <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title style='color: #607d8b; '>{{data.parent.toUpperCase()}}</v-list-item-title>
                </v-list-item-content>
            </template>
          
            <v-list-item-group style='padding-left: 10%; color: red;' v-model='setting' color='primary'>
                <v-list-item v-for="(content, i) in data.content" :key="i"  :value='content.name'>
                    <v-list-item-title  style='font-weight: 400;' v-text="content.name"></v-list-item-title>
                    <v-list-item-icon>
                      <div style='padding-right: 10px;font-size: 0.8rem;margin-top: 3px;'>${{content.price}}</div>
                    </v-list-item-icon>
                </v-list-item>
            </v-list-item-group>
            <br>

        </v-list-group>

    </v-list>
</div>
</template>

<script>
  export default {
    data: () => ({
      admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
      setting: '',
    }),
    computed:{
        category(){
            return this.$store.state.parent.category
        }
    },
  }
</script>