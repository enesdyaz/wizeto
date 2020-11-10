<template>
<div :class="{modal: isModal, containerView:true}"  >
    
    <table class='table'>
        <tr class='tr'>
            <th style='text-align: center;padding-bottom: 10%;'>BOOKING LIST</th> 
        </tr>

        <tr>
            <td>
                <ul class='parent' v-for="(p,i) in category" :key="i">
                    <div :class='{parent_item : p.toggle && p.child.length >0, bottom : true}'>
<!-- 1. Parent Category -->
                        <button   @click='toggle(p.id)'>
                            <v-icon class='vIcon' style='font-size: 1rem;padding-right: 6px;'>mdi-text</v-icon>
                            <button v-if='!p.child.length < 1'>{{p.parent.toUpperCase()}}</button>
                            <button v-else >{{p.parent.toUpperCase()}}</button>
                        </button>

                            <div v-if='p.child.length < 1'><button style='float:right;margin-top: -20px;'><v-icon  class='vIcon' >
                                mdi-chevron-right</v-icon></button></div>
                            <div v-else-if='p.toggle' ><v-icon  class='vIcon' style='font-size: 1.3rem;float:right;margin-top: -16px;'> mdi-chevron-down</v-icon></div>
                            <div v-else><v-icon  class='vIcon' style='font-size: 1.3rem;float:right;margin-top: -16px;'> mdi-chevron-right</v-icon></div>
                    </div>



                        <transition name='slide-fade'>
                            <div v-if="p.toggle" style='border-top: transparent'>
<!-- 2. Child Category -->
                            <li class='child' v-for='(c, index) in p.child' :key='index'>
                                <v-icon class='vIcon' style='padding-right: 6px;'>mdi-square-small</v-icon>
                                <button>{{c.child}}</button>
                            </li>
                            </div>
                        </transition>
                </ul>
            </td>
        </tr>
    </table>
            
</div>
</template>


<script>
export default {
    data(){
        return{
            dialog: false,
            isModal: false,
        }
    },
    computed:{
        category(){
            return this.$store.state.parent.category
        }
    },
    methods:{
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
    },
}
</script>


<style lang="scss" scoped>
$fontColor: white;
$backgroundColor: #607D8A;
$parentSize: 0.8rem;
$childSize: 0.7rem;


.vIcon{
    color: $fontColor;
}
.containerView{
    background: $backgroundColor;
    .table{
    font-size: 0.8rem;
    width: 100%;
    color: $fontColor;
    padding: 10% 5%;

    tr{
        text-align: left;
    }
}
}



.bottom{
    border-bottom: 1px solid grey;
    padding: 10px 0;
}
.parent{
    padding: 0;
    font-size: $parentSize;
    .parent_item{
        border-bottom: 1px solid transparent;
        padding: 10px 0;
    }
}
.child{
    list-style:none;
    font-size: $childSize;
        &:last-child{
        border-bottom: 1px solid grey;
        padding-bottom: 10px;
    }

}
.modal{
    border-radius: 10px;
    display: none;
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
</style>