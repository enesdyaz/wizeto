
<template>


<div>
    <div v-for='(c, index) in category' :key='index'>
        <div class='body-2' style='color: #455a64;padding-left: 5%'><v-icon style='font-size: 12px;'>mdi-menu-right-outline</v-icon> {{c.parent}}</div>
        <div style='display: flex; background: #fff;color: #455a64;border-radius: 5px; padding: 5px;margin: 5px 15px;' v-for='a in c.content' :key='a.id'>
            <div style='width: 15%;line-height: 40px; text-align: center;' ><v-icon>mdi-checkbox-marked-circle-outline</v-icon></div>
            <div style='width: 65%;'>
                <div class='overline'>{{a.service_name}}</div>
                <div class='caption' style='margin-top: -11px;'>{{a.description}}</div>
            </div>
            <div style='width: 20%;line-height: 40px;color: #ff6f00'>$ {{a.price}}</div>
        </div>
    </div>



</div>
</template>


<style lang="scss" scoped>
.service-list{
    width: 95%;
    margin: 0 auto;
    border: 1px solid red;
    color: #455a64;
    clear: both;
    .service-list-first{
        float: left;
        width: 10%;
    }
    .service-list-left{
        float: left;
        width: 70%;
    }
    .service-list-right{
        float: left;
        width: 20%;
    }
}

</style>



<script>
    export default {
        
        data: () => ({
        selected: [2],
        items: [
            {
            action: '15 min',
            headline: 'Brunch this weekend?',
            title: 'Ali Connors',
            subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
            },
            {
            action: '2 hr',
            headline: 'Summer BBQ',
            title: 'me, Scrott, Jennifer',
            subtitle: "Wish I could come, but I'm out of town this weekend.",
            },
            {
            action: '12 hr',
            headline: 'Birthday gift',
            title: 'Trevor Hansen',
            subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
            },
            {
            action: '18hr',
            headline: 'Recipe to try',
            title: 'Britta Holt',
            subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
            },
        ],
        }),

        computed:{
        category(){
            return this.$store.state.parent.category
        }
    },
}
</script>
