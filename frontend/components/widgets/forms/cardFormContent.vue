<template>
<div>
    <div style='padding: 0; margin: 0;text-align: center;'>
        <v-btn style='margin-top: -5px;' x-small text color='blue-grey' class='body-2'>add</v-btn>
        <v-switch style='display: inline-block;' color='primary'  hide-details v-model="addOn" inset dense ></v-switch>
    </div>  
    <div style='padding: 5%;'>

        <form @submit.prevent='onSubmit'>
            
            <table  style='width: 100%;'>
                <tr>
                    <th><v-icon class='vIcon'>mdi-chevron-down</v-icon>Title</th> 
                    <td ><input  v-model='title' v-on:keyup.enter="onEnter" type="text" /></td>
                </tr>
                <tr>
                    <th><v-icon class='vIcon'>mdi-chevron-down</v-icon>Subtitle</th> 
                    <td ><input  v-model='subtitle' v-on:keyup.enter="onEnter" type="text"  /></td>
                </tr>
                <tr>
                    <th><v-icon class='vIcon'>mdi-chevron-down</v-icon>Image</th> 
                    <td  v-if='!backgroundImage'>  
                        <input  style='border: none;padding: 0;' type="file" @change='onFileChange'>
                    </td>
                    <td v-else>
                        <img style='width: 150px;' :src="backgroundImage" />
                        <button @click="removeImage" style='padding-left: 10px'>Remove image</button>
                    </td>   
                </tr><br>
                <tr>
                    <th></th>
                    <td>
                        <v-btn color='blue-grey' dark type='submit' x-small>save</v-btn>
                    </td>
                </tr>
            </table>
        </form>
    </div>
</div>
</template>

<script>
export default {
 
    data(){
        return{
            title: '',
            subtitle: '',
            addOn: false,
            backgroundImage: '',
        }
    },

    methods:{
        onSubmit(){
            this.$store.dispatch('widget/addCard', {
                title: this.title,
                subtitle: this.subtitle,
                addOn: this.addOn,
                backgroundImage: this.backgroundImage
            })
        },

        //image
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
                vm.backgroundImage = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        removeImage: function (e) {
            this.backgroundImage = '';
        }, 
        // image_end
    },

    created(){
    const data = this.$store.state.widget.card
    console.log(data)
        if(data.length !== 0){
            this.title =  data.title
            this.subtitle =  data.subtitle
            this.addOn = data.addOn
            this.backgroundImage = data.backgroundImage

            }else{
                console.log('no data length')
            }
    },
}
</script>


<style lang="scss" scoped>
table{  
    tr{ 
        th{ font-size: 0.8rem; font-weight: 300;  width: 30%;}
        td{ padding: 1px; width: 60%;}
    }
}
.vIcon{
    font-size: 1rem;
    font-weight: 200;
}
input{ width: 100%; padding-left: 5px;  font-size: 0.8rem; font-weight: 300; border: 1px solid grey; border-radius: 5px;  }
textarea{ width: 100%; border: 1px solid grey; border-radius: 5px; font-size: 0.8rem; font-weight: 300; padding-left: 5px;}
</style>