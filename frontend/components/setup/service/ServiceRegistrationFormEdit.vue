<template> 
<div>  
    <div class='mb-3'>
        <v-icon class='body' @click='routerBack'>mdi-arrow-left</v-icon>
    </div>
    <div style='text-align: center;'>
        <v-btn class=' subtitle-2' text color='blue-grey' >
            <v-icon class='body-1 pr-2'>mdi-plus</v-icon> EDIT Your Service
        </v-btn>
    </div>
<!-- 2. Service Name ----->                            
            <table style='font-size: 0.8rem;width: 95%;margin: 0 auto;'>
                <tr style='text-align: left;'>
                    <th> <v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>Service Name</th> 
                </tr>
                <tr>
                    <td><input v-model='service_name' v-text='data[0].name' required style='border: 1px solid grey; width: 99%; padding-left: 10px;' type="text" /></td>
                </tr>
            </table>

<!-- 3. Price, 4. Duration ---->                            
            <table style='font-size: 0.8rem;width: 95%;margin: 0 auto;'>
                <tr style='text-align: left;'>
                    <th> <v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>Price ($AU)</th> 
                    <th> <v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>Duration</th> 
                </tr>
                <tr>
                    <td><input v-model='service_price' required style='border: 1px solid grey; width: 95%; padding-left: 10px;' type="number" min='1'></td>
                    <td><select v-model='service_duration' style='border: 1px solid grey; width: 97%; padding-left: 10px;' type="text" >
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
            <table style='font-size: 0.8rem;width: 95%;margin: 0 auto;'>
                <tr style='text-align: left;'>
                    <th> <v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>Description</th> 
                </tr>
                <tr>
                    <td><textarea v-model='service_description' style='border: 1px solid grey; width: 99%; padding-left: 10px;' ></textarea></td>
                </tr>
            </table>

<!-- 8. photo upload ------------------>
            <table style='font-size: 0.8rem;width: 95%;margin: 0 auto;'>
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

        
<!-- 9. Submit ---->

            <v-dialog v-model="dialog" width="370">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color='blue-grey' v-bind="attrs" v-on="on" style='display: inline-block; float: left; margin-left: 47%;bottom: 10px;' depressed outlined small>Remove</v-btn> 
                </template>

                <v-card>
                    <v-card-title></v-card-title>
                    <v-card-text class='body-2'>
                    Are you really want to delete this item?
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey" small text @click="onDelete" >I accept </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-btn color='lime darken-4' style='display: inline-block; float: left;; bottom: 10px;' depressed outlined small @click="onSubmit">Update</v-btn>

 


</div>
</template>


<script>
export default {
    props: {
        service_id:{
            data: String,
            required: true
        },
        parent_id:{
            data: String,
            required: true
        }
    },

    data() {
        return {
            dialog: false,
            service_name: '',
            service_price: '',
            service_duration: '',
            service_description: '',
            service_image: '',

            service_category: '',  //upper category of the service
            service_item: [],  // all data of the service
            dialog: false,  // dialog for removing a category selected
        }
    },


    // created(){
    //     this.fetchData()
    // },
    computed:{
        data(){
            const Item = this.$store.state.service.service
            // const data = Item.find(e=>e._id === this.parent_id)
            // const result = data.filter(e=>e.serviceId === this.service_id)

            const result = Item.find(e=>e._id === this.parent_id).service.filter(e=>e.serviceId === this.service_id)

            this.service_name = result[0].name
            this.service_price = result[0].price
            this.service_duration = result[0].duration
            this.service_description = result[0].description
            this.service_image = result[0].image

            return result
        },
    },

    methods:{
        routerBack(){
            this.$emit("ModalEmit", false)
        },
        onSubmit(){
            this.$store.dispatch('service/updateService', {
                id: this.service_id,
                parent_id: this.parent_id,

                name: this.service_name,
                price: this.service_price,
                duration: this.service_duration,
                description: this.service_description,
                image: this.service_image,
            })
            this.$emit("ModalEmit", false)  // close this windows of the registration form 
        },
 
        onDelete(){
            // const id = this.service_id
            // const parent_id = this.parent_id
            this.$store.dispatch('service/deleteService', {
                service_id: this.service_id,
                category_id: this.parent_id
            })
            this.dialog = false
            
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