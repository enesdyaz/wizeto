<template>
    <div style='padding: 5%;  width: 100%;overflow: auto'>
    <!--  1. Form -->
        <div :class="{modal: isModal || isEditModal}" >
            <div style='text-align: center;'>
                <v-btn class=' subtitle-2' text color='blue-grey' >
                    <v-icon class='body-1 pr-2'>mdi-plus</v-icon> Register Your Service
                </v-btn>
            </div>
            <br>
            <div>
                <div class='caption blue-grey--text font-weight-bold'><v-icon style='font-weight: bold; font-size: 1rem; color: #607d8a'>mdi-chevron-right</v-icon> CATEGORY NAME</div>
                <div><input ref='category' style='margin-top: 2px; background: #fff;  width: 75%; margin-right: 10px;padding-left:10px;border-radius: 5px;' v-model='category1' v-on:keyup.enter="onEnter"  type="text" >
                <v-btn color="blue-grey"  small text outlined @click.prevent="onEnter" >Enter </v-btn></div>
            </div>
            <br><br>

    <!-- Control -->
                <div class='caption blue-grey--text font-weight-bold'><v-icon style='font-weight: bold; font-size: 1rem; color: #607d8a'>mdi-chevron-right</v-icon> DISPLAY</div>

            <div style='border: 1px solid #607d8a;padding: 5px;margin-top:5px; '>
                <v-btn-toggle v-model='serviceLayoutSelect' mandatory>
                    <v-btn color='blue-grey' text small><v-icon style='font-size: 1.2rem;color: #263238'>mdi-format-list-bulleted-square</v-icon></v-btn>
                    <v-btn color='blue-grey' text small><v-icon style='font-size: 1.2rem;color: #263238'>mdi-table-arrow-right</v-icon></v-btn>
                    <v-btn color='blue-grey' text small><v-icon style='font-size: 1.2rem;color: #263238'>mdi-table-arrow-down</v-icon></v-btn>
                    <v-btn color='blue-grey' text small><v-icon style='font-size: 1.2rem;color: #263238'>mdi-view-grid-outline</v-icon></v-btn>
                </v-btn-toggle>
            </div>

        <br>

    <!-- View -->
            <div v-for='(c, index) in service' :key='index' style='margin-bottom: 30px'>
                <div class='body-2' style='display: flex; color: #455a64;margin: 2px 0;'>
                    <v-icon style='font-size: 12px;'>mdi-square-medium</v-icon> 
                    <input ref='inputTitle' class='ml-1 body pl-2' :value='c.category.toUpperCase()' :readonly='toggleC' style='margin-top: -1; color: #455a64; font-weight: 400; width: 60%;border: none;' type='text' @click='toggleC=!toggleC' @blur="categoryUpdate(c._id, index)" @keyup.enter="categoryUpdate(c._id, index)" >
                    <v-spacer></v-spacer>

                    <div v-if="c.item?c.item.length:c.item" style='display: none;'></div>
                    <div v-else> <v-btn style=' margin-right: 5px;height: 25px;margin-top: 7px;'  color='red darken-2' dark small v-on:click='onDelete(c._id)'><v-icon class='body-2'>mdi-delete-outline</v-icon></v-btn></div>
                    <v-btn style='height: 25px;margin-top: 7px;' color='blue-grey lighten-1' dark small v-on:click='addService(c._id)'><v-icon class='body-2'>mdi-plus</v-icon></v-btn>

                </div>

                <div style='display: flex; background: #fff;color: #455a64;border-radius: 5px;padding-bottom: 4px;margin: 5px;' 
                v-for='(a, i) in c.item' :key='i' >
                    <div style='width: 15%;line-height: 40px; text-align: center;' ><v-icon>mdi-checkbox-marked-circle-outline</v-icon></div>
                    <div style='width: 65%;'>
                        <div class='overline' style='font-weight:bold'><button v-on:click="editService(a.categoryId, a.serviceId, i, a._id)">{{a.name?textCut(a.name.toUpperCase(), 40):''}}</button></div>
                        <div class='caption' style='margin-top: -11px;'><button v-on:click="editService(a.categoryId, a.serviceId, i, a._id)">{{(a.description?textCut(removeHTML(a.description.trim()), 25):'')}}</button></div>
                    </div>
                    <div style='width: 20%;color: #ff6f00;' class='d-flex align-center mt-1'><div>$ {{a.price}}</div></div>
                </div>
            </div>
        </div>


    <!-- transition -->
        <transition name='fade'> 
            <div v-if='isModal' >
                <service-registration-form :parentId='categoryParent' @ModalEmit="ModalInfo"/>
            </div>
        </transition>

        <transition name='fade'> 
            <div v-if='isEditModal'>
                <service-registration-form-edit :service_id='service_id' :parent_id='parent_id' :index='index' :sid='sid' @ModalEmit="ModalInfo"/>
            </div>
        </transition>
        <v-dialog v-model='loading' persistent>
                <loading />
        </v-dialog>

</div>



</template>


<script>

import ServiceRegistrationForm from './ServiceRegistrationForm'
import ServiceRegistrationFormEdit from './ServiceRegistrationFormEdit'
import serviceView from '../service/view/serviceView'
import serviceView2 from '../service/view/serviceView2'
import serviceView3 from '../service/view/serviceView3'
import {mapState} from 'vuex'
import loading from '../../loader/loading'
export default {
    components:{
        ServiceRegistrationForm,
        ServiceRegistrationFormEdit,
        serviceView,
        serviceView2,
        serviceView3,
        loading
    },
    data(){
        return{
            category1: '',
            category2: null,
            dialog: false,
            isModal: false,
            isEditModal: false,
            categoryParent: "",
            service_id: '',
            parent_id: '',
            index: '',

            //layout
            serviceLayoutSelect: '',
            dialogLayout: false,

            //categoryUpdate
            categoryButton: false,
            categoryName: '',
            toggleC: true,

            //serviceupdate
            sid: '',

            //loader
            loading: false,
            
        }
    },
    created(){
        this.fetchData()
    },

    computed:{
        service(){
            const data = this.$store.state.service.service
            if(data === null || undefined){
                return 
            }
            return data
        },
    

        
    },
    watch:{
        serviceLayoutSelect(number){
            this.$store.dispatch('category/serviceLayout', number)
        }
    },
    methods:{
        removeHTML(text){
            return text.replace(/(<([^>]+)>)/ig,"")
        },
        categoryUpdate(id, index){
            this.toggleC = !this.toggleC
            const category = this.$refs.inputTitle[index].value.trim()
            if (!category) return 
            this.$store.dispatch('service/updateCategory', {
                id: id,
                category: category
            })
        },


        fetchData(){
            this.$store.dispatch('service/fetchData', {})
            
        },

        setFocus: function() {
        this.$refs.category.focus();
        },
        addService(parentId){   // add category
            this.categoryParent = parentId
            this.isModal = true
        },

        removeCategory(id){    // remove category
            this.$store.dispatch('parent/removeCategory', id)
        },
  
        ModalInfo(i){
            this.isModal = i
            this.isEditModal = i
        },
        onDialog(){
            alert('dialog')
        },
        onDelete(id){
            this.$store.dispatch('service/deleteCategory', id)
        },
        toggle(id){
            this.$store.dispatch('parent/toggle', id)
        },
    
        onEnter(){
            const serviceItem = this.$store.state.service.service
            const index = serviceItem.findIndex(e=>e.category.toUpperCase() === this.category1.toUpperCase())
            const name = this.category1
            console.log(name)

            if(!name.length){
                return  
            } 
            else if(index >= 0){
                alert('same name exists')
                return
            } else {
            this.$store.dispatch('service/addCategory', {category: name, toggle: this.categoryButton})
            this.category1 = ''
            }

        },

        editService(categoryId, serviceId, index, _id){
            this.isEditModal = true
            this.service_id = serviceId
            this.parent_id = categoryId
            this.index = index
            this.sid = _id
            // this.$store.category.dispatch('editData', todo)
        },

        textCut(txt, len, lastTxt) {
            if (len == "" || len == null) { // 기본값
                len = 20;
            }
            if (lastTxt == "" || lastTxt == null) { // 기본값
                lastTxt = "...";
            }
            if (txt.length > len) {
                txt = txt.substr(0, len) + lastTxt;
            }
            return txt;
        }
    }
}
</script>


<style lang="scss" >
input[type=text] {
    padding: 2px;
    margin: 3px 0;
    box-sizing: border-box;
    -webkit-transition: 0.5s;
    transition: 0.5s;
    border: 2px solid #ccc; border-radius: 5px;
    outline: none;
}
input[type=text]:focus {
    border: 2px solid #455a64; border-radius: 5px;
    background: white;
}
input[type=text]:hover {
    border: 2px solid #455a64; border-radius: 5px;
    background: white;
}
input[type=number] {
    padding: 2px;
    margin: 3px 0;
    box-sizing: border-box;
    -webkit-transition: 0.5s;
    transition: 0.5s;
    border: 2px solid #ccc; border-radius: 5px;
    outline: none;
}
input[type=number]:focus {
    border: 2px solid #455a64;
    background: white; border-radius: 5px;
}
input[type=number]:hover {
    border: 2px solid #455a64;
    background: white; border-radius: 5px;
}
select {
    padding: 2px;
    margin: 3px 0;
    box-sizing: border-box;
    -webkit-transition: 0.5s;
    transition: 0.5s;
    border: 2px solid #ccc; border-radius: 5px;
    outline: none;
}
select:focus {
    border: 2px solid #455a64; border-radius: 5px;
    background: white;
}
select:hover {
    border: 2px solid #455a64; border-radius: 5px;
    background: white;
}


.slide-fade-enter-active {
    transition: all .5s ;
}
.slide-fade-leave-active {
    transition: all .5s ease cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateY(10px);
    opacity: 0;
}


.bottom{
    border-bottom: 1px solid grey;
    padding: 10px 0;
}
.parent{
    .parent_item{
        border-bottom: 1px solid transparent;
        padding: 10px 0;
    }
}
.child{
    list-style:none;
    padding-left: 20px;
    font-size: 0.9rem;
        &:last-child{
        border-bottom: 1px solid grey;
        padding-bottom: 10px;
    }

}
.modal{
    border-radius: 10px;
    display: none;
}


</style>