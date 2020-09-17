<template>
  <v-app>

<!--- Drawer -->
    <v-navigation-drawer dark v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app dense>

      <v-list>
        <v-container class='d-flex justify-center'>
          <img width='150' alt="Vuetify Logo" :src="profileImage" >
        </v-container>

        <v-subheader>menu</v-subheader>

        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact dense >

          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>

        </v-list-item>
      </v-list>
    </v-navigation-drawer>

<!-- Tool bar -->
    <v-app-bar :clipped-left="clipped" color='white' fixed app flat dense>

      <v-app-bar-nav-icon class='d-lg-none' @click.stop="drawer = !drawer" />

      <!-- <v-toolbar-title v-text="title" /> -->

      <v-spacer />
      <div><v-icon style='font-size: 1.2rem;'>mdi-account</v-icon><span style='font-size: 1rem;' >enesdyaz</span></div>
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer" >
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>


<!-- content -->
    <v-main style='background: whitesmoke;'>
        <nuxt />
    </v-main>

<!-- right navigation -->



    <!-- <v-footer :absolute="!fixed" app >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>


<script>
export default {
  data () {
    return {
      drawer: true,
      fixed: false,
      clipped: false,

      profileImage: '/vuetify-logo.svg',
      items: [
        {
          icon: 'mdi-apps',
          title: 'Service',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
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
