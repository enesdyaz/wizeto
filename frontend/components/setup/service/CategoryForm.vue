<template>
<div style=' padding: 5%;  width: 100%;overflow: auto'>
<!-- 1. Category Regster Form -->
    <div :class="{modal: isModal || isEditModal}" >
        <div style='text-align: center;'>
            <v-btn class=' subtitle-2' text color='blue-grey' >
                <v-icon class='body-1 pr-2'>mdi-plus</v-icon> Register Your Service  aaa
            </v-btn>
        </div>
        <br>

        <div>
            <v-row no-gutters>
                <v-col xs='6'>
                    <div class='subtitle-2 bold' style='color: #607D8A'><v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>CATEGORY NAME</div>
                    <div><input style='background: #fff; width: 100%;' v-model='category1' v-on:keyup.enter="onEnter"  type="text" ></div>
                </v-col>
            </v-row>                
        </div>
        <br>

        <div v-for='(c, index) in category' :key='index' style='margin-bottom: 40px'>
            <div class='body-2' style='color: #455a64;margin: 10px 0;'>
                <v-icon style='font-size: 12px;'>mdi-menu-right-outline</v-icon> {{c.parent.toUpperCase()}}
                <button style='float: right; border: 1px solid #455a64; padding: 0 10px;border-radius: 5px;' text color='blue-grey' dark small v-on:click='addService(c)'>ADD SERVICE</button>
                <span v-if='c.content.length < 1'>
                    <button style='float: right; border: 1px solid #90a4ae; color: #90a4ae; padding: 0 10px;border-radius: 5px;' text small v-on:click='removeCategory(c.id)'>REMOVE</button>
                </span>
                
            </div>
            <div style='display: flex; background: #fff;color: #455a64;border-radius: 5px;padding-bottom: 4px;margin: 5px 0;' 
            v-for='a in c.content' :key='a.id' >
                <div style='width: 15%;line-height: 40px; text-align: center;' ><v-icon>mdi-checkbox-marked-circle-outline</v-icon></div>
                <div style='width: 65%;'>
                    <div class='overline'><button v-on:click="editService(a.parentId, a.id)">{{a.name}}</button></div>
                    <div class='caption' style='margin-top: -11px;'><button v-on:click="editService(a.parentId, a.id)">{{textCut(a.description, 40)}}</button></div>
                </div>
                <div style='width: 20%;color: #ff6f00;' class='d-flex align-center mt-1'><div>$ {{a.price}}</div></div>
            </div>
        </div>
    </div>
<!-- dialog Layout-->
    <div class='text-center'>
        <v-btn color="blue-grey" small  dark @click.stop="dialogLayout = true" >Open Layout </v-btn>
    </div>

        <v-dialog v-model="dialogLayout" max-width="370" >
        <v-card>
            <v-card-title class="subtitle-1">Choose your Layout</v-card-title>

            <v-card-text>
                <div>
                    <div class='text-center' >
                        <v-btn-toggle v-model='serviceLayoutSelect' mandatory>
                            <v-btn color='blue-grey' text small><v-icon>mdi-view-sequential</v-icon></v-btn>
                            <v-btn color='blue-grey' text small><v-icon>mdi-view-column</v-icon></v-btn>
                            <v-btn color='blue-grey' text small><v-icon>mdi-view-headline</v-icon></v-btn>
                        </v-btn-toggle>
                    </div>
                </div>

                <div>
                    <div v-if='serviceLayoutSelect === 0 ' ><serviceView /></div>
                    <div v-else-if ='serviceLayoutSelect === 1'><serviceView2 /></div>
                    <div v-else><serviceView3 /></div>
                </div>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-grey" text @click="dialogLayout = false" > Cancel </v-btn>
                <v-btn color="blue-grey" text @click="dialogLayout = false" > Confirm </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>     
        



<!-- transition -->
        <transition name='fade'> 
            <div v-if='isModal' >
                <v-container >
                    <service-registration-form :prop='categoryParent' @ModalEmit="ModalInfo"/>
                </v-container>
            </div>
        </transition>

        <transition name='fade'> 
            <div v-if='isEditModal'>
                <v-container >
                    <service-registration-form-edit :service_id='service_id' :parent_id='parent_id' @ModalEmit="ModalInfo"/>
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

            //layout
            serviceLayoutSelect: '',
            dialogLayout: false,
            
        }
    },

    computed:{
        category(){
            return this.$store.state.parent.category
        }
    },
    methods:{
        addService(parentId, childId){   // add category
            this.categoryParent = {parent: parentId, child: childId}
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
            this.$store.dispatch('parent/delete', id)
        },
        toggle(id){
            this.$store.dispatch('parent/toggle', id)
        },
    
        onEnter(){
            if(this.category2){
                const index = this.category.findIndex(v => v.parent === this.category2)
                this.$store.dispatch('parent/addChild', {
                id: Date.now(),
                index: index,
                child: this.category1,
                content: [],
                }).then(()=>{this.category1=''})
                .catch(()=>{console.log('fail')})
            } 
            else{
                this.$store.dispatch('parent/addParent', {
                id: Date.now(),
                parent: this.category1,
                child: [],
                content: [],
                toggle: false
            }).then(()=>{ this.category1=''}).catch(()=>{ console.log('fail')})
            }
        },

        editService(parentId, id){
            this.isEditModal = true
            this.service_id = id
            this.parent_id = parentId
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