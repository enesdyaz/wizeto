<template>
  <v-app>

<!--- Drawer -->
    <v-navigation-drawer color='grey darken-4' dark v-model="drawer" fixed app dense>

      <v-list subheader>
        <br>
            <v-container class='d-flex justify-center align-end' style=' width: 70%; border-radius: 20px;'>
                <v-img contain max-width='120'  :src="profileImage" /><br>
            </v-container>    <br>
        
            <v-subheader>ADMIN PANEL </v-subheader>
            <v-divider></v-divider>

           <v-list-item-group mandatory>
              <v-list-item @click='click(item.title)' class='tile' v-for="(item, i) in items" :key="i" dense >
                  <v-list-item-action>
                      <v-icon   class='icon'  style='font-size: 1.2rem;  font-weight: 100;'>{{ item.icon }}</v-icon>
                  </v-list-item-action>
                  <nuxt-link  style='color: white;' :to="item.to">
                  <v-list-item-content   style='margin-left: -20px;'>
                      <v-list-item-title  class='list_title'  v-text="item.title" />
                  </v-list-item-content></nuxt-link>
              </v-list-item>  <br>
          </v-list-item-group>


            <v-subheader>INBOX</v-subheader>
            <v-divider></v-divider>
          <v-list-item-group >
              <v-list-item @click='click(item.title)' class='tile' v-for="(item, i) in items2" :key="i" dense inactive>
                  <v-list-item-action>
                      <v-icon   class='icon'  style='font-size: 1.2rem;  font-weight: 100;'>{{ item.icon }}</v-icon>
                  </v-list-item-action>
                  <nuxt-link style='color: white;' :to="item.to">  
                  <v-list-item-content   style='margin-left: -20px;'>
                      <v-list-item-title  class='list_title'  v-text="item.title" />
                  </v-list-item-content>
                  </nuxt-link>
              </v-list-item>  <br>
          </v-list-item-group>
            
      </v-list>
    </v-navigation-drawer>

<!-- Tool bar -->
<client-only>
    <v-app-bar  :clipped-left="clipped" color='white' hide-on-scroll height='60' app  flat dense >

      <v-app-bar-nav-icon class='d-lg-none' @click.stop="drawer = !drawer" />

      <div class='d-none d-sm-flex'>
        <div class='title'>SETUP <div class='caption' style='margin-top: -8px;color: #90A4AE'>make your own website with widgets</div></div>
      </div>

      <v-spacer />
      <div style='padding-right: 20px;'>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search"  outlined dense hide-details ></v-text-field>
      </div>

      <v-btn style='border-radius: 25px; padding: 0' elevation='0' color="red" >
          <v-btn text v-model='avatar' @click='avatar = !avatar'><span class="white--text caption"><v-icon style='font-size: 1rem;padding-right: 4px;'>mdi-fingerprint</v-icon>{{me.username}}</span></v-btn>
      </v-btn>

      <transition name="slide-fade">
          <div v-if='avatar' class='ml-4'>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                      <v-avatar color='primary' size='30'>
                        <v-btn text @click='logout' v-bind="attrs" v-on="on"><v-icon class='white--text body-1'>mdi-power</v-icon></v-btn>
                      </v-avatar>
                </template>
                <span>Log out</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                      <v-avatar color='primary' size='30'>
                        <v-btn text to='/setup/dashboard' v-bind="attrs" v-on="on"><v-icon class='white--text body-1'>mdi-cog-outline</v-icon></v-btn>
                      </v-avatar>
                </template>
                <span>Sccount Setting</span>
              </v-tooltip>

          </div>
      </transition>
    </v-app-bar>
</client-only>>

<!-- content -->
    <v-main style='background: whitesmoke;'>
        <nuxt  />
    </v-main>

  </v-app>
</template>


<script>
import listGroup from '../components/default/listGroup'
export default {
  components:{
    listGroup
  },
  data () {
    return {
      listArray:'',
      navItem:'',
      search: '',
      drawer: true,
      fixed: false,
      clipped: false,

      profileImage: '/logo/logo_white.png',
      items2: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Inbox',
          to: '/setup/inbox'
        },
      ],
      items: [

        {
          icon: 'mdi-gift-outline',
          title: 'Service',
          to: '/admin'
        },
        {
          icon: 'mdi-bookmark-minus-outline',
          title: 'Booking',
          to: '/admin'
        },
        {
          icon: 'mdi-image-edit-outline',
          title: 'Cards',
          to: '/admin'
        },
        {
          icon: 'mdi-text-box-outline',
          title: 'text',
          to: '/admin'
        },
      ],
      title: 'Wizeto',

      //auth
      avatar: false,
    }
  },
  computed:{
    me(){
      return this.$store.state.user.me
    }
  },

  methods:{
    click(item){
      this.navItem = item
      console.log('navagation', item)
      this.$store.commit('layout/navItem', item)
    },
    logout(){
      this.$store.dispatch('user/logout', {}).then(
        this.$router.push({
          path: '/'
        })
      )
      
    }
  }
}
</script>


<style lang="scss" scoped>


.tile{
  width:100%;
  height: 15px;
}
.icon{
  color: #546e7a;
}

  slide-fade-enter-active {
  transition: all .2s ease;
  }
  .slide-fade-enter-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.7, 1.0);
  }
  .slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.7, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(40px);
  opacity: 0;
  }

</style>