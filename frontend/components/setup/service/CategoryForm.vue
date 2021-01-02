<template>
<div style=' padding: 5%;  width: 100%;overflow: auto'>
<!--  1. Form -->
    <div :class="{modal: isModal || isEditModal}" >
        <div style='text-align: center;'>
            <v-btn class=' subtitle-2' text color='blue-grey' >
                <v-icon class='body-1 pr-2'>mdi-plus</v-icon> Register Your Service
            </v-btn>
        </div>
        <br>
        <div>
            <div class='caption'><v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>CATEGORY NAME</div>
            <div><input ref='category' style='background: #fff; border: 1px solid grey; width: 82%;margin-right: 10px;' v-model='category1' v-on:keyup.enter="onEnter"  type="text" >
            <v-btn color="blue-grey" style='float: right' x-small text outlined @click.stop="onEnter" >Enter </v-btn></div>
        </div>
        <br><br>

<!-- Control -->
        <div class='caption'><v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>DISPLAY</div>

        <div style='border: 1px solid grey;padding: 5px; '>
            <v-btn-toggle v-model='serviceLayoutSelect' mandatory>
                <v-btn color='blue-grey' text small><v-icon style='font-size: 1.2rem;'>mdi-format-list-bulleted-square</v-icon></v-btn>
                <v-btn color='blue-grey' text small><v-icon style='font-size: 1.2rem;'>mdi-table-arrow-right</v-icon></v-btn>
                <v-btn color='blue-grey' text small><v-icon style='font-size: 1.2rem;'>mdi-table-arrow-down</v-icon></v-btn>
                <v-btn color='blue-grey' text small><v-icon style='font-size: 1.2rem;'>mdi-view-grid-outline</v-icon></v-btn>
            </v-btn-toggle>
        </div>

    <br>

<!-- View -->
        <div v-for='(c, index) in service' :key='index' style='margin-bottom: 40px'>
            <div class='body-2' style='display: flex; color: #455a64;margin: 10px 0;'>
                <v-icon style='font-size: 12px;'>mdi-menu-right-outline</v-icon> 
                <input autofocus ref='inputTitle' class='ml-1 body pl-2' :value='c.category.toUpperCase()' :readonly='toggleC' style='margin-top: -1; color: #455a64; font-weight: 400' type='text' @click='toggleC=!toggleC' @blur="categoryUpdate(c._id, index)" @keyup.enter="categoryUpdate(c._id, index)" >
                <v-spacer></v-spacer>

                <div v-if="c.service?c.service.length:c.service" style='display: none;'></div>
                <div v-else> <v-btn style=' margin-right: 5px;height: 25px;'  color='red darken-2' dark small v-on:click='onDelete(c._id)'><v-icon class='body-2'>mdi-delete-outline</v-icon></v-btn></div>
                <v-btn style='height: 25px;' color='blue-grey lighten-1' dark small v-on:click='addService(c._id)'><v-icon class='body-2'>mdi-plus</v-icon></v-btn>

            </div>

            <div style='display: flex; background: #fff;color: #455a64;border-radius: 5px;padding-bottom: 4px;margin: 5px 0;' 
            v-for='(a, i) in c.item' :key='i' >
                <div style='width: 15%;line-height: 40px; text-align: center;' ><v-icon>mdi-checkbox-marked-circle-outline</v-icon></div>
                <div style='width: 65%;'>
                    <div class='overline'><button v-on:click="editService(a.categoryId, a.serviceId, i, a._id)">{{a.name?textCut(a.name, 30):''}}</button></div>
                    <div class='caption' style='margin-top: -11px;'><button v-on:click="editService(a.categoryId, a.serviceId, i, a._id)">{{a.description?textCut(a.description, 40):''}}</button></div>
                </div>
                <div style='width: 20%;color: #ff6f00;' class='d-flex align-center mt-1'><div>$ {{a.price}}</div></div>
            </div>
        </div>
    </div>


<!-- transition -->
        <transition name='fade'> 
            <div v-if='isModal' >
                <v-container >
                    <service-registration-form :parentId='categoryParent' @ModalEmit="ModalInfo"/>
                </v-container>
            </div>
        </transition>

        <transition name='fade'> 
            <div v-if='isEditModal'>
                <v-container >
                    <service-registration-form-edit :service_id='service_id' :parent_id='parent_id' :index='index' :sid='sid' @ModalEmit="ModalInfo"/>
                </v-container>
            </div>
        </transition>

</div>
</template>


<script>

import ServiceRegistrationForm from './ServiceRegistrationForm'
import ServiceRegistrationFormEdit from './ServiceRegistrationFormEdit'
import serviceView from '../service/view/serviceView'
import serviceView2 from '../service/view/serviceView2'
import serviceView3 from '../service/view/serviceView3'
import {mapState} from 'vuex'
export default {
    components:{
        ServiceRegistrationForm,
        ServiceRegistrationFormEdit,
        serviceView,
        serviceView2,
        serviceView3,
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
        }

        
    },
    watch:{
        serviceLayoutSelect(number){
            this.$store.dispatch('category/serviceLayout', number)
        }
    },
    methods:{

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
            // const index = serviceItem.findIndex(e=>e.category === this.category1)

            if(!this.category1.length){
                alert('no empty value')
                return  
            } 
            // if(index >= 0){
            //     alert('same name exists')
            //     return
            // }
            this.$store.dispatch('service/addCategory', {category: this.category1, toggle: this.categoryButton})
            this.category1 = ''

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


<style lang="scss" scoped>

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