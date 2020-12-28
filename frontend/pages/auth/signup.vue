<template>
<div>
            <div class='d-flex'>
                <v-btn text class='body-2' to="/"><v-icon style='font-size: 1rem;'>mdi-chevron-left</v-icon> BACK</v-btn>
                <v-spacer></v-spacer>
                <v-btn text class='body-2' to='/auth/login'>LOGIN<v-icon style='font-size: 1rem;'>mdi-chevron-right</v-icon> </v-btn>
            </div>

            <v-row class='mt-4' style='margin: 0 auto;'>
                <v-col>
                    <div class='mx-auto text-center' Elevation='8'  height='600' max-width='370'>
                        <br>
                        <div class='d-inline-block'>
                            <v-img width="150" src="/logo/logo-black.png"></v-img>

                        </div>
                        <br><br><br><br>
                        <v-btn text color='primary' class='subtitle'>CREATE YOUR ACCOUNT </v-btn> 
                        
                        <div class='caption pa-2'>By creating an account, you agree to our Terms of Service and have read and understood the Privacy Policy</div>
                        <br><br>
                        
                        <v-btn  text outlined  @click='dialog = !dialog'><v-img class='mr-8' width='20' src='/logo/email.png'></v-img>signup with e-mail<span style='width: 20px;'></span></v-btn>
                        <transition name="slide-fade">

                        <div v-if='dialog'>
                        <br>
                            <div style='width: 400px; margin: 0 auto;'>
                                <v-form @submit.prevent='onSubmit'>
                                    <v-text-field v-model='username' type='username' style='width:80%; margin: 0 auto;' outlined hide-details dense autofocus placeholder='User Name'></v-text-field>    
                                    <v-text-field v-model='email' type='email' style='width:80%; margin: 0 auto;' outlined hide-details dense placeholder='harry@wizeto.com'></v-text-field>    
                                    <v-text-field v-model='password' type='password' style='width:80%; margin: 0 auto;' outlined hide-details dense placeholder='Password'></v-text-field>    
                                    <v-text-field v-model='confirmPassword' type='password' style='width:80%; margin: 0 auto;' outlined hide-details dense placeholder='Confirm Password'></v-text-field>    
                                    <br>
                                    <v-btn type='submit' small color='blue-grey' dark>sign up</v-btn>
                                </v-form>
                            </div>
                        </div>
                        </transition>
                        <br><br>
                        <v-divider></v-divider>
                        <br>
                        <!-- <div>
                            <v-btn text outlined class='subtitle' ><v-img class='mr-8' width='16' src='/logo/facebook.png'></v-img> signup with Facebook</v-btn>
                        </div>
                        <div>
                            <v-btn text outlined class='subtitle mt-2 pr-4'><v-img class='mr-8' width='16' src='/logo/gmail.png'></v-img> signup with Gmail <span style='width: 30px;'></span></v-btn>
                        </div> -->
                        
            


                    </div>
                </v-col>
            </v-row> 
</div>
</template>

<script>
export default {
    layout: 'landing',
    data(){
        return{
            dialog: false,

            // signup store
            username: '',
            email: '',
            password: '',
            confirmPassword: '',

        }
    },
    methods:{
        onSubmit(){
            this.$store.dispatch('user/signup', {
                username: this.username,
                email: this.email,
                password: this.password
            })
        }
    },
    created(){
        setTimeout(()=>{
        this.dialog = true
        },500);
    },
    computed: {
        me(){
                return this.$store.state.user.me
            }
    },
    watch: {
        me(value) {
            if (value) {
            this.$router.push({
                path: '/setup/dashboard',
            });
            }
        }
    },
}
</script>


<style lang="scss">
    slide-fade-enter-active {
    transition: all .2s ease;
    }
     .slide-fade-enter-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateY(80px);
    opacity: 0;
    }
</style>
