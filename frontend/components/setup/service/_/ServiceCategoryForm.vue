<template>
<!-- Registration Form -->
<div>

<!-- 1. Service Registration -->
    <v-card class='card'  style='width: 330px;'>
        <div class='card_title' style='font-size: 0.8rem;height: 30px;line-height: 30px;text-align: center;background: #627F8C;color: #fff;'>
            <v-icon style='color: white;padding-right: 4px;font-size: 0.9rem'>mdi-content-duplicate</v-icon> Category Registration
<!-- windows_close -->
            <button class="window_close" @click="window_close"></button>
        </div>

        <v-card-text>
            <br>

<!-- 2. Service Name ----->                            

<!-- 6. add_category ------------------>
            <table>
                <tr style='text-align: left;'>
                    <th> <v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>Category Name</th> 
                </tr>
                <tr>
                    <td>
                        <form v-on:submit.prevent="addCategory">
                            <input v-model='service_category' style='width: 285px; border: 1px solid grey; padding-left: 10px;' type="text" placeholder='add category' required>
                        </form>
                        
                    </td>
                </tr>
            </table>

<!-- 7. description ------------------>
            <table style='font-size: 0.8rem;width: 98%;'>
                <tr style='text-align: left;'>
                    <th> <v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>Category Description(option)</th> 
                </tr>
                <tr>
                    <td><textarea v-model='category_description' style='border: 1px solid grey; width: 99%; padding-left: 10px;' ></textarea></td>
                </tr>
            </table>

<!-- 8. Icon List ------------------>
            <div>
                  <v-row justify="space-between">
                        <v-col >
                            <v-sheet elevation="0" class="pa-0">
                                <v-chip-group column mandatory v-model='selectedIcon' active-class="primary--text" >
                                <v-chip v-for="(icon, i) in icons" :key="i">
                                    <v-icon class='body-2'>mdi-{{ icon }}</v-icon>
                                </v-chip>
                                </v-chip-group>
                            </v-sheet>
                        </v-col>
                    </v-row>    
            
            
            
            
            
            </div>       


        </v-card-text>
        
<!-- 9. Submit ---->
        <v-card-actions>
            <v-btn style='margin-left: 77%;bottom: 10px;' depressed outlined small @click="onSubmit">SAVE</v-btn>
        </v-card-actions>
    </v-card>
<!-- Registration ends ---->
</div>
</template>


<script>
export default {

    data () {
        return {
            service_name: '',
            service_price: '',
            service_duration: '',
            service_description: '',
            service_image: '',

            category_input: 'basic',
            service_category: '',  //upper category of the service
            service_item: [],  // all data of the service
            category_description: '',
            icons:[
                'close',
                'plus',
                'minus',
                'account',
                'alarm-panel',
                'airplane',
                'alert',
                'alert-octagon',
                'atlassian',
                'av-timer',
                'baby-face-outline',
                'audio-video',


            ],
        }
    },
    created(){
        this.$store.commit('category/addCategory', 'basic')
    },
    computed:{
        category_list(){
            return this.$store.state.category.service_category
        }
    },
    methods:{
        addCategory(e){
        this.$store.commit('category/addCategory', this.service_category)
        this.service_category = ''
        },

        service_list(){
            //temporary id
            var d = new Date()
            let service_id = "A"+d.getDate()+d.getHours()+d.getMinutes()+d.getSeconds()

            this.service_item.push({
                service_id: service_id,
                service_category: this.category_input,
                service_name: this.service_name,
                service_price: this.service_price,
                service_duration: this.service_duration,
                service_description: this.service_description,
                service_image: this.service_image,
            })
        },

        onSubmit(){
            this.service_list()
            this.$store.commit('category/addData', this.service_item)
            this.$emit("ModalEmit", false)  // close this windows of the registration form 
        },
        window_close(){
            this.$emit("ModalEmit", false)  // close this windows of the registration form 

        },

        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },

        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.service_image = e.target.result;
            };
            reader.readAsDataURL(file);
        },

        removeImage: function (e) {
        this.service_image = '';
        }
    },
    
    directives: {
    focus: {
        // directive definition
        inserted: function (el) {
        el.focus()
        }
    }
    }
}

</script>




<style lang="scss" scoped>

.card{
    margin: 0 auto;
    background: red;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
.window_close{
    height: 15px;
    width: 15px;
    background-color: rgb(179, 68, 68);
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 8px;

}
.image {
    width: 100%;
    display: block;
    margin-bottom: 10px;
}


</style>