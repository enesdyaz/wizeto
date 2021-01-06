<template> 
<div> 
    <div style='display: flex;justify-content: space-between;'>
        <div>
            <v-icon @click='routerBack' style='color: #607D8A;font-size: 1.2rem;'>mdi-chevron-left-circle</v-icon>
        </div>
        <div >
            <v-btn class=' subtitle-2'  text small  elevation='0' color='blue-grey' >
            
            EDIT Your Service
            </v-btn>
        </div>
        <div style='width: 5%;'></div>
    </div>
<hr><br>

            <table style='font-size: 0.8rem;width: 95%;margin: 0 auto;'>
                <tr style='text-align: left;'>
                    <th> <div class='caption blue-grey--text font-weight-bold'><v-icon style='font-weight: bold; font-size: 1rem; color: #607d8a'>mdi-chevron-right</v-icon> NAME</div></th> 
                    <td><input style='width: 100%;padding-left: 10px;' v-model='service_name' v-text='data[0].name' required  type="text" /></td>
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
                        <editor @content="editorContent" :description="service_description" />
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
                    <td v-if='!service_image'>  
                        <input type="file" @change='onChangeImage' >
                    </td>
                    <td v-else>
                        <img style='margin-top: 5px;'  class='image' :src="`http://localhost:3085/${service_image}`" />
                        <button @click="removeImage" style='padding-left: 10px'>Remove image</button>
                    </td>
                </tr>
            </table><br><br>      

        
<!-- 9. Submit ---->
        <div style='text-align: center;'>
                <v-dialog v-model="dialog" width="370">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color='blue-grey' v-bind="attrs" v-on="on"  depressed outlined small>Remove</v-btn> 
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
                <v-btn color='lime darken-4'  depressed outlined small @click="onSubmit">Update</v-btn>
            </div>
</div>
</template>


<script>
export default {
    components:{
    },
    props: {
        service_id:{
            data: String,
            required: true
        },
        parent_id:{
            data: String,
            required: true
        },

        sid: {
            data: String
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
            const data = this.$store.state.service.service
            // const data = Item.find(e=>e._id === this.parent_id)
            // const result = data.filter(e=>e.serviceId === this.service_id)
            console.log('ocomputed', data)

            // const result = data.find(e=>e._id === this.parent_id).item.filter(e=>e.serviceId === this.service_id)
            const result =  data.find(e=>e._id === this.parent_id).item.filter(e=>e._id === this.sid)
            console.log('result', result)
            this.service_name = result[0].name
            this.service_price = result[0].price
            this.service_duration = result[0].duration
            this.service_description = result[0].description
            this.service_image = result[0].image

            return result
        },
        image(){
            return this.$store.state.service.imagePath
        }
    },
   

    watch:{
        image(){
            this.service_image = this.image
        }
    },

    methods:{
        routerBack(){
            this.$emit("ModalEmit", false)
        },
        editorContent(text){
            this.service_description=text
        },
        onSubmit(){
            this.$store.dispatch('service/updateService', {
                id: this.service_id,
                parent_id: this.parent_id,
                sid: this.sid,

                name: this.service_name,
                price: this.service_price,
                duration: this.service_duration,
                description: this.service_description,
                image: this.service_image,
            }).then(()=>{})
            this.$emit("ModalEmit", false)  // close this windows of the registration form 
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

        onDelete(){
            // const id = this.service_id
            // const parent_id = this.parent_id
            this.$store.dispatch('service/deleteService', {
                sid: this.sid,
                category_id: this.parent_id,
                service_id: this.service_id
            }).then()
            this.dialog = false
            
            this.$emit("ModalEmit", false)  // close this windows of the registration form 
        },

        removeImage(){
        this.service_image = ""
        this.$store.commit('service/DELETE_IMAGE')
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