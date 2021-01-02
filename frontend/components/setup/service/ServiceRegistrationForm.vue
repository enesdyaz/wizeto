<template>
<!-- Registration Form -->
<div>
<!-- 1. Service Registration -->
    <v-card class='card'  style='width: 330px;'>
        <div class='card_title' style='font-size: 0.8rem;height: 30px;line-height: 30px;text-align: center;background: #627F8C;color: #fff;'>
            <v-icon style='color: white;padding-right: 4px;font-size: 0.9rem'>mdi-content-duplicate</v-icon> Service Registration
<!-- windows_close -->
            <button class="window_close" @click="window_close"></button>
        </div>

        <v-card-text>
            <form>

<!-- 2. Service Name ----->                            
            <table style='font-size: 0.8rem;width: 98%;margin-bottom: 10px;color: #627F8C'>
                <tr style='text-align: left;'>
                    <th> <v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>Service Name</th> 
                </tr>
                <tr>
                    <td><input v-model='service_name' required v-focus style='border: 1px solid grey; width: 99%; padding-left: 10px;' type="text" ></td>
                </tr>
            </table>

<!-- 3. Price, 4. Duration ---->                            
            <table style='font-size: 0.8rem;width: 98%;margin-bottom: 10px;color: #627F8C'>
                <tr style='text-align: left;'>
                    <th> <v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>Price ($AU)</th> 
                    <th> <v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>Duration</th> 
                </tr>
                <tr>
                    <td><input v-model='service_price' required style='border: 1px solid grey; width: 99%; padding-left: 10px;' type="number" min='1'></td>
                    <td><select v-model='service_duration' style='border: 1px solid grey; width: 99%; padding-left: 10px;' type="text" >
                        <option value="0" selected>none</option>    
                        <option value="10">10 min</option>    
                        <option value="15">15 min</option>    
                        <option value="30">30 min</option>    
                        <option value="45">45 min</option>    
                        <option value="60">1 hr</option>    
                        <option value="90">1.5 hr</option>    
                        <option value="120">2 hr</option>    
                        <option value="150">2.5 hr</option>    
                        <option value="180">3 hr</option>    
                        <option value="240">4 hr</option>    
                        <option value="300">5 hr</option>    
                        
                        </select>
                    </td>
                </tr>
            </table>


<!-- 7. description ------------------>
            <table style='font-size: 0.8rem;width: 98%;color: #627F8C'>
                <tr style='text-align: left;'>
                    <th> <v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>Description</th> 
                </tr>
                <tr>
                    <td><textarea v-model='service_description' rows='6' style='border: 1px solid grey; width: 99%; padding-left: 10px;' ></textarea></td>
                </tr>
            </table>

<!-- 8. photo upload ------------------>
            <table style='font-size: 0.8rem;width: 98%;color: #627F8C'>
                <tr style='text-align: left;'>
                    <th> <v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>Photo Upload (upto 2M)</th> 
                </tr>
                <tr>
                    <td v-if='!service_image'>  
                        <input type="file" @change='onFileChange'>
                    </td>
                    <td v-else>
                        <img class='image' :src="service_image" />
                        <button @click="removeImage" style='padding-left: 10px'>Remove image</button>
                    </td>
                </tr>
            </table>
            </form>
        </v-card-text>

<!-- 9. Submit ---->
        <v-card-actions>
            <v-btn style='margin-left: 77%;bottom: 10px;' depressed outlined small @click="onSubmit">SAVE</v-btn>
        </v-card-actions>
        <div  v-if='error' class='pb-8'><v-btn text color='red' x-small><v-icon>mdi-alert-octagon-outline</v-icon>{{error}}</v-btn></div>
    </v-card>
<!-- Registration ends ---->
</div>
</template>


<script>
export default {
    props:['parentId'],

    data () {
        return {
            //STORE
            service_name: '',
            service_price: '',
            service_duration: '',
            service_description: '',
            service_image: '',

            category_input: 'basic',
            service_category: '',  //upper category of the service
            
            //not STORE
            error:'',
        }
    },

    methods:{
        onSubmit(){
                if(this.service_name && this.service_price){
                    
                    this.$store.dispatch('service/addService', {
                    categoryId: this.parentId,
                    serviceId: Date.now(),
                    name: this.service_name,
                    price: this.service_price,
                    duration: this.service_duration,
                    description: this.service_description,
                    image: this.service_image,
                    }).then(()=>{console.log('parent data was inserted')}).catch(()=>{console.log('error')})
                                this.$emit("ModalEmit", false)  // close this windows of the registration form 

                }else{
                    console.log('no service name')
                    this.error = "please insert the service name or price"
                    setTimeout(()=>{this.error = ''}, 5000)
                }
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




<style lang="scss">

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
.vicon{
    font-size: 1rem;
    color: #627F8C
}


</style>