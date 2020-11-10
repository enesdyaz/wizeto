<template>

    <div class='containerView'>
        <div class='dataBoxCompanyName'>
            Your Luxury Web App Template with Widget which created just now
        </div>
        <div class='dataBoxCompanyDescription'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus iusto, incidunt, omnis qui consequatur, delectus nisi temporibus aliquam iure molestias laborum dicta tempora necessitatibus? Totam ab vero sunt quasi eligendi?
        </div>
    </div>

</template>

<script>
export default {
    data(){
        return{
        }
    }
}
</script>


<style lang="scss" scoped>

// $fontColor: black;
// $backgroundColor: white;



.containerView{
    width: 100%;
    background-color: white;
    color: black;
    padding: 10% 5%;

    .dataBoxCompanyName{
        font-weight: 900;
        text-align: center;
    }
    .dataBoxCompanyDescription{
            font-size: .7rem;
            font-weight: 400;
            text-align: center;
    }
}




</style>

