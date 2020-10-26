<template>
<div style='border: 1px solid orange; width: 100%;overflow: auto'>
<!-- 1. Category Regster Form -->
    <div :class="{modal: isModal}" >
        <div>
            <v-btn class=' subtitle-2' text color='blue-grey' >
                <v-icon class='body-1 pr-2'>mdi-plus</v-icon> Register your product or service 
            </v-btn>
        </div>
            <div>
                <v-row no-gutters>
                    <v-col xs='6'  style='border: 1px solid red;'>
                        <div class='subtitle-2 bold' style='color: #607D8A'><v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>Category Name111</div>
                        <div><input v-model='category1' v-on:keyup.enter="onEnter"  style='width: 100%; border: 1px solid grey;' type="text" ></div>
                    </v-col>

                    <v-col xs='6'  style='border: 1px solid blue;'>
                        <div><v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>Parent</div>
                        <div>
                            <select v-model='category2' style='width: 100%; border: 1px solid grey;' type="text" >
                                <option value="" selected>none</option>    
                                <option v-for="(p, index) in category" :key="index" :value="p.parent">{{p.parent}}</option>    
                            </select>
                        </div>
                    </v-col>
                </v-row>                

            </div>

<!-- 2. Category List --->
            <table style='font-size: 0.8rem;margin-bottom: 10px;color: #607D8A; width: 100%;'>
                <tr style='text-align: left;'>
                    <th> <v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>List</th> 
                </tr>

                <tr>
                    <td>
                        <ul class='parent' v-for="(p,i) in category" :key="i">
                            <div :class='{parent_item : p.toggle && p.child.length >0, bottom : true}'>
<!--   2.1 Parent Category -->
                                <button   @click='toggle(p.id)'>
                                    <v-icon style='font-size: 1rem;'>mdi-text</v-icon>
                                    <button v-if='!p.child.length < 1'>{{p.parent.toUpperCase()}}</button>
                                    <button v-else v-on:click='addForm(p)'>{{p.parent.toUpperCase()}}</button>
                                </button>

                                    <div v-if='p.child.length < 1'><button @click='onDelete(p.id)' style='float:right;margin-top: -20px; padding-right: 2px;'><v-icon style='font-size: 1rem;'>
                                        mdi-close</v-icon></button></div>
                                    <div v-else-if='p.toggle' ><v-icon style='font-size: 1.3rem;float:right;margin-top: -16px;'>mdi-chevron-down</v-icon></div>
                                    <div v-else><v-icon  style='font-size: 1.3rem;float:right;margin-top: -16px;'>mdi-chevron-right</v-icon></div>
                            </div>



                                <transition name='slide-fade'>
                                    <div v-if="p.toggle" style='border-top: transparent'>
<!-- 2.2 Child Category -->
                                    <li class='child' v-for='(c, index) in p.child' :key='index'>
                                        <v-icon style='font-size: 1rem;padding-right: 6px;'>mdi-square-small</v-icon>
                                        <button v-on:click='addForm(p, c)'>{{c.child}}</button>
                                    </li>
                                    </div>
                                </transition>
                        </ul>
                    </td>
                </tr>
            </table>
        </div>

        <transition name='fade'> 
            <div v-if='isModal' >
                <v-container >
                    <service-registration-form :prop='categoryParent' @ModalEmit="ModalInfo"/>
                </v-container>
            </div>
        </transition>
</div>
</template>

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

<script>

import ServiceRegistrationForm from './ServiceRegistrationForm'
export default {
    components:{
        ServiceRegistrationForm,
    },
    data(){
        return{
            category1: '',
            category2: null,
            dialog: false,
            isModal: false,
            categoryParent: "",
            
        }
    },

    computed:{
        category(){
            return this.$store.state.parent.category
        }
    },
    methods:{
        addForm(p, c){
            console.log(parent)
            this.categoryParent = {parent: p, child: c}
            this.isModal = true
        },
  
        ModalInfo(i){
            this.isModal = i
        },
        onDialog(){
            alert('dialog')
        },
        onDelete(id){
            this.$store.dispatch('parent/delete', id)
        },
        toggle(id){
            console.log(id)
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
        }
    }
}
</script>