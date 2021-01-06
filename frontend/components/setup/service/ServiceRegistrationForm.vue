<template> 
<div> 
    <div style='display: flex;justify-content: space-between;'>
        <div>
            <v-icon @click='routerBack' style='color: #607D8A;font-size: 1.2rem;'>mdi-chevron-left-circle</v-icon>
        </div>
        <div >
            <v-btn class=' subtitle-2'  text small  elevation='0' color='blue-grey' >
            
            ADD Your Service
            </v-btn>
        </div>
        <div style='width: 5%;'></div>
    </div>
<hr><br>

            <table style='font-size: 0.8rem;width: 95%;margin: 0 auto;'>
                <tr style='text-align: left;'>
                    <th> <div class='caption blue-grey--text font-weight-bold'><v-icon style='font-weight: bold; font-size: 1rem; color: #607d8a'>mdi-chevron-right</v-icon> NAME</div></th> 
                    <td><input style='width: 100%;padding-left: 10px;' v-model='service_name' required  type="text" /></td>
                </tr>
                <tr>
                    <th> <div class='caption blue-grey--text font-weight-bold'><v-icon style='font-weight: bold; font-size: 1rem; color: #607d8a'>mdi-chevron-right</v-icon> PRICE</div></th> 
                    <td><input v-model='service_price' required style='width: 100%;padding-left: 10px;' type="number" min='1'></td>
                </tr>
                <tr>
                    <th> <div class='caption blue-grey--text font-weight-bold'><v-icon style='font-weight: bold; font-size: 1rem; color: #607d8a'>mdi-chevron-right</v-icon> DURATION</div></th> 
                    <td><select v-model='service_duration' style='width: 100%;padding-left: 10px;' type="text" >
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
<br>

<!-- 7. description ------------------>
            <table style='font-size: 0.8rem;width: 95%;margin: 0 auto;'>
                <tr style='text-align: left;'>
                    <th> <div class='caption blue-grey--text font-weight-bold'><v-icon style='font-weight: bold; font-size: 1rem; color: #607d8a'>mdi-chevron-right</v-icon> DESCRIPTION</div></th> 
                </tr>
                <tr>
                    <td>
                        <editor @content="editorContent"  />
                    </td>
                    <!-- <td><textarea v-model='service_description' style='border: 1px solid grey; width: 99%; padding-left: 10px;' ></textarea></td> -->
                </tr>
            </table><br>

<!-- 8. photo upload ------------------>
            <table style='font-size: 0.8rem;width: 95%;margin: 0 auto;'>
                <tr style='text-align: left;'>
                    <th> <div class='caption blue-grey--text font-weight-bold'><v-icon style='font-weight: bold; font-size: 1rem; color: #607d8a'>mdi-chevron-right</v-icon> PHOTO</div></th> 
                </tr>
                <tr>
                    <td v-if='!image.length'>  
                        <input type="file" @change='onChangeImage' >
                    </td>
                    <td v-else>
                        <img style='margin-top: 5px;'  class='image' :src="`http://localhost:3085/${image}`" />
                        <button @click="removeImage" style='padding-left: 10px'>Remove image</button>
                    </td>
                </tr>
            </table><br><br>    

        
<!-- 9. Submit ---->
        <div style='text-align: center;'>
            <v-btn color='lime darken-4'  depressed outlined small @click="onSubmit">SAVE</v-btn>
            <div  v-if='error' class='mt-8'><v-btn outlined dark color='red' x-small><v-icon class='caption pr-2'>mdi-alert-circle-outline</v-icon>{{error}}</v-btn></div>
        </div>

</div>
</template>


<script>

export default {
    props:['parentId'],
    components: {
    },
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
    computed:{
        image(){
            return this.$store.state.service.imagePath
        }
    },
    created(){
        this.removeImage()
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
                    image: this.image,
                    })
                    .then(()=>{
                        this.$store.commit('service/DELETE_IMAGE')
                            })
                    .catch(()=>{console.log('error')})
                                this.$emit("ModalEmit", false)  // close this windows of the registration form 

                }else{
                    console.log('no service name')
                    this.error = "please insert the service name or price"
                    setTimeout(()=>{this.error = ''}, 5000)
                }
        },
        onChangeImage(e) {
            let i = 0
            e.target.files.forEach(e=> i = i + e.size) 

            if(i>3000000){   // 3Mb
                console.log(i)
                this.message = 'Please upload less than 3 Mb'
                this.snackbar = true 
            }else{
                const imageFormData = new FormData();
                [].forEach.call(e.target.files, (f) => {
                imageFormData.append('image', f);   // { image: [file1, file2] }
                });
                console.log(imageFormData)
                this.$store.dispatch('service/uploadImages', imageFormData);
            }
        },
        routerBack(){
            this.$emit("ModalEmit", false)
        },
        editorContent(text){
            this.service_description=text
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

        removeImage(){
        this.$store.commit('service/DELETE_IMAGE')
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


</style>

