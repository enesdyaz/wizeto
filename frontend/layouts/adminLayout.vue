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
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact dense >

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
    <v-app-bar  :clipped-left="clipped" color='white' fixed height='70' app flat dense>

      <v-app-bar-nav-icon class='d-lg-none' @click.stop="drawer = !drawer" />
      <div class='d-none d-sm-flex'>
        <div class='title'>SETUP <div class='caption' style='margin-top: -8px;color: #90A4AE'>make your own website with widgets</div></div>
      </div>

      <!-- <v-toolbar-title v-text="title" /> -->

      <v-spacer />
      <div style='padding-right: 20px;'>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search"  outlined  dense hide-details ></v-text-field>
      </div>
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
      search: '',
      drawer: true,
      fixed: false,
      clipped: false,

      profileImage: '/v.png',
      items: [
        {
          icon: 'mdi-chevron-down',
          title: 'Home',
          to: '/client/client'
        },
        {
          icon: 'mdi-chevron-down',
          title: 'Service',
          to: '/setup/service'
        },
        {
          icon: 'mdi-chevron-down',
          title: 'Display1',
          to: '/display/service1/'
        },
         {
          icon: 'mdi-chevron-down',
          title: 'Display2',
          to: '/display/service2'
        },
        {
          icon: 'mdi-chevron-down',
          title: 'Display3',
          to: '/display/service3'
        },
         {
          icon: 'mdi-chevron-down',
          title: 'Booking',
          to: '/setup/booking'
        },
        {
          icon: 'mdi-chevron-down',
          title: 'BookingDisplay',
          to: '/display/bookingDisplay'
        },
        {
          icon: 'mdi-chevron-down',
          title: 'inbox',
          to: '/setup/inbox'
        },
        {
          icon: 'mdi-chevron-down',
          title: 'mainWidget',
          to: '/setup/mainWidget'
        },
        {
          icon: 'mdi-chevron-down',
          title: 'cardWidget',
          to: '/setup/cardWidget'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Wizeto'
    }
  }
}
</script>
