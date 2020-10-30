<template> 
<!-- Registration Form -->
<div>
<!-- 1. Service Registration -->
    <v-card class='card'  style='width: 330px;'>
        <div class='card_title' style='font-size: 0.8rem;height: 30px;line-height: 30px;text-align: center;background: #455a64;color: #fff;'>
            <v-icon style='color: white; padding-right: 4px; font-size: 0.9rem'>mdi-content-duplicate</v-icon> Update Registration
<!-- windows_close -->
            <button class="window_close" @click="window_close"></button>
        </div>

        <v-card-text>
            <br>
<!-- 2. Service Name ----->                            
            <table style='font-size: 0.8rem;width: 98%;margin-bottom: 10px;'>
                <tr style='text-align: left;'>
                    <th> <v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>Service Name</th> 
                </tr>
                <tr>
                    <td><input v-model='service_name'  required style='border: 1px solid grey; width: 99%; padding-left: 10px;' type="text" /></td>
                </tr>
            </table>

<!-- 3. Price, 4. Duration ---->                            
            <table style='font-size: 0.8rem;width: 98%;margin-bottom: 10px;'>
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

<!-- 5. Category_list  ---->                            
            <table style='font-size: 0.8rem;width: 98%;margin-bottom: 10px;'>
                <tr style='text-align: left;'>
                    <th> <v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>Category</th> 
                </tr>
                <tr>
                    <td>
                        <select  v-model='category_input' style='float: left;border: 1px solid grey; padding-left: 10px;width: 135px;' type="text" required>
                            <option v-for="(list, index) in category_list" :key="index" title="">{{list.name}}</option>
                        </select>

                        <button @click.stop="dialog = true"  style='float: left; padding-left: 1px;padding-right: 2px;'><v-icon style='font-size: 1rem;margin-top: 1px;'>mdi-close</v-icon></button>
                        <v-dialog v-model="dialog" max-width="290" >
                            <v-card>
                                <v-card-title class="headline">DELETE</v-card-title>

                                    <v-card-text>
                                        Are you really want to remove this category? <br><br>
                                        <span style='font-size: 0.7rem; padding:0;margin: 0'>
                                        The data from this category will be moved to 'BASIC' category If there is no category.
                                        </span>
                                    </v-card-text>
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                        <v-btn color="green darken-1" text @click="dialog = false" > Disagree </v-btn>
                                        <v-btn color="green darken-1" text @click="remove_category" >  Agree </v-btn>
                                    </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </td>

<!-- 6. add_category ------------------>
                    <td>
                        <form v-on:submit.prevent="addCategory" style='padding: 0; margin: 0;width: 130px;'>
                            <input v-model='service_category' style=' margin-left: 5px; width: 70%; border: 1px solid grey; padding-left: 10px;' type="text" placeholder='category'>
                            <button style='padding: 0;margin: 0;'>ADD</button> 
                        </form>
                        
                    </td>
                </tr>
            </table>

<!-- 7. description ------------------>
            <table style='font-size: 0.8rem;width: 98%;'>
                <tr style='text-align: left;'>
                    <th> <v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>Description</th> 
                </tr>
                <tr>
                    <td><textarea v-model='service_description' style='border: 1px solid grey; width: 99%; padding-left: 10px;' ></textarea></td>
                </tr>
            </table>

<!-- 8. photo upload ------------------>
            <table style='font-size: 0.8rem;width: 98%;'>
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
        </v-card-text>
        
<!-- 9. Submit ---->
        <v-card-actions>
            <v-btn color='blue-grey' style='display: inline-block; float: left; margin-left: 47%;bottom: 10px;' depressed outlined small @click="onDelete">Remove</v-btn>
            <v-btn color='lime darken-4' style='display: inline-block; float: left;; bottom: 10px;' depressed outlined small @click="onSubmit">Update</v-btn>
        </v-card-actions>
        
    </v-card>
<!-- Registration ends ---->
</div>
</template>


<script>
export default {
    props: {
        service_id:{
            data: String,
            required: true
        }
    },

    data() {
        return {
            items: this.$store.state.category.service_items,
            service_name: '',
            service_price: '',
            service_duration: '',
            service_description: '',
            service_image: '',

            category_input: '',
            service_category: '',  //upper category of the service
            service_item: [],  // all data of the service
            dialog: false,  // dialog for removing a category selected
        }
    },
    created(){
        this.dataList
    },

    computed:{
        category_list(){
            return this.$store.state.category.service_category
        },
        dataList(){
            const array = this.items
            const id = this.service_id
            let newData = []

            array.map(function(e){
                if(e.id == id){
                    newData.push(e)
                }
            })
            this.service_name = newData[0].name
            this.service_price = newData[0].price
            this.service_duration = newData[0].duration
            this.service_description = newData[0].description
            this.service_image = newData[0].image
            this.category_input = newData[0].category

            return newData
        },
    },

    methods:{
        remove_category(){
            this.$store.commit('category/removeCategory', this.category_input)
            this.dialog = false
        },
        addCategory(e){
        this.$store.commit('category/addCategory', this.service_category)
        this.service_category = ''
        },

        service_list(){
            //temporary id
            var d = new Date()
            let service_id = "A"+d.getDate()+d.getHours()+d.getMinutes()+d.getSeconds()

            this.service_item.push({
                service_id: this.service_id,
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
            this.$store.commit('category/updateData', this.service_item)
            this.$emit("ModalEmit", false)  // close this windows of the registration form 
        },
        onDelete(){
            const id = this.service_id
            this.$store.commit('category/deleteData', id)
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