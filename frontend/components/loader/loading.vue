<template>
<div>
    <div class='wrap'>
        <span class="loader"><span class="loader-inner"></span></span><br>
        <v-btn text color='white'> Loading...</v-btn>
    </div>
</div>
</template>

<script>
export default {

}
</script>


<style lang='scss' scoped>

.wrap{
    position: absolute;
    top: 30%;
    left: 40%;

    .loader {
    display: inline-block;
    width: 40px;
    height: 40px;
    position: relative;
    border: 4px solid #fff;
    top: 50%;
    animation: loader 2s infinite ease;
}

.loader-inner {
    vertical-align: top;
    display: inline-block;
    width: 100%;
    background-color: #455a64;
    animation: loader-inner 2s infinite ease-in;
}

}

@keyframes loader {
    0% {
        transform: rotate(0deg);
    }
    
    25% {
        transform: rotate(180deg);
    }
    
    50% {
        transform: rotate(180deg);
    }
    
    75% {
        transform: rotate(360deg);
    }
    
    100% {
        transform: rotate(360deg);
    }
}

@keyframes loader-inner {
    0% {
        height: 0%;
    }
    
    25% {
        height: 0%;
    }
    
    50% {
        height: 100%;
    }
    
    75% {
        height: 100%;
    }
    
    100% {
        height: 0%;
    }
}

@media only screen and (max-width: 600px) {
    .wrap{
    top: 30%;
    left: 45%;
    }
}
</style>