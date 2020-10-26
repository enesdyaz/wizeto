<template>
  <v-app>

<!--- Drawer -->
    <v-navigation-drawer dark v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app dense>

      <v-list>
        <v-container class='d-flex justify-center'>
          <img width='100' alt="Vuetify Logo" :src="profileImage" >
        </v-container>
<br>
        <v-subheader>ADMIN PANEL</v-subheader>
        <v-divider></v-divider>
        <v-list-item  v-for="(item, i) in items" :key="i" :to="item.to" dense>

          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content style='margin-left: -20px'>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>

        </v-list-item>
      </v-list>
    </v-navigation-drawer>





<!-- Tool bar -->
    <v-app-bar>

      <v-app-bar-nav-icon class='d-lg-none' @click.stop="drawer = !drawer" />
      <div class='d-none d-sm-flex'>
        <div class='title'>SETUP <div class='caption' style='margin-top: -8px;color: #90A4AE'>make your own website with widgets</div></div>
      </div>

      <!-- <v-toolbar-title v-text="title" /> -->

      <v-spacer />
      <div class='d-none d-sm-flex' style='padding-right: 20px;'>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line outlined  dense hide-details ></v-text-field>
      </div>
      <div><v-icon style='font-size: 1.2rem;'>mdi-account</v-icon><span style='font-size: 1rem;' >enesdyaz</span></div>
 
    </v-app-bar>


<!-- content -->
    <v-main style='background: whitesmoke;'>
        <nuxt />
    </v-main>

<!-- right navigation -->

  </v-app>
</template>
<style lang="scss" scoped>


</style>

<script>
export default {
  data () {
    return {
      search: '',
      drawer: true,
      fixed: false,
      clipped: false,

      profileImage: '/v.png',
      items: [
        {
          icon: 'mdi-chevron-down',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-chevron-down',
          title: 'Service',
          to: '/service'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Wizeto'
    }
  }
}
</script>
