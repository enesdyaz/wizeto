<template>
<div>
    <div  :class="{modal: isModal || isEditModal || isCategoryModal}" >
        <div>
            <category-form />
        </div>

        <div class='add_form'>
            <v-btn text  @click="isModal = true"><v-icon>mdi-shape-square-rounded-plus</v-icon></v-btn>
        </div>
    </div>

<!-- service registration form -->    
    <transition name='fade'> 
        <div v-if='isModal'>
            <v-container >
                <service-registration-form  @ModalEmit="ModalInfo"/>
            </v-container>
        </div>
    </transition>

<!-- service category form -->
    <transition name='fade'> 
        <div v-if='isCategoryModal' >
            <v-container >
                <service-category-form  @ModalEmit="ModalInfo"/>
            </v-container>
        </div>
    </transition>
<!-- EDIT registration form -->  






</div>
</template>


<script>
import ServiceRegistrationForm from './ServiceRegistrationForm'
import ServiceRegistrationFormEdit from './ServiceRegistrationFormEdit'
import ServiceCategoryForm from './ServiceCategoryForm'
import CategoryForm from './CategoryForm'
export default {
    components: {
        ServiceRegistrationForm,
        ServiceRegistrationFormEdit,
        ServiceCategoryForm,
        CategoryForm,
    },
    data () {
        return {
            dialog: false,
            isModal: false,
            isEditModal: false,
            items: this.$store.state.category.service_items,
            select1: '',
            select2: '',
            nameList: [],
            service_id: '',
            isCategoryModal: false,
        }
    },
    computed:{
        categoryList(){
            let array = this.items.map(function(e){ return e.category})
            return Array.from(new Set(array))
        },

        categoryName(){
            let select = this.select1
            if(this.select1===''){
                return null
            }else{
                return this.items.filter(function(e){
                    if(e.category == select){
                        return e.name
                    }
                    
            })
        }}
   
    
    },

    methods:{
        ModalInfo(i){
            this.isModal = i
            this.isEditModal = i
            this.isCategoryModal = i
        },
        editService(id){
            this.isEditModal = true
            this.service_id = id
            // this.$store.category.dispatch('editData', todo)
        }
    }
  }
</script>



<style lang="scss" scoped>

.select_box{
    margin-left: 10px;

    .select_inner{
        margin-top: 12px;
        border-radius: 14px;
        padding: 0 20px;
        // white-space: nowrap;
    }
    .select2_inner{
    overflow: scroll;
}
}

.add_form{
    margin-left: 2%;
}
.modal{
    border-radius: 10px;
    display: none;
}


.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}


</style>