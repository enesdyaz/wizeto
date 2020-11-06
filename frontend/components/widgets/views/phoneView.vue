<template>
<div>
    <main-view />
    <card-view />
    <display1 />

</div>
</template>

<script>
import mainView from '../../widgets/views/mainView'
import display1 from '../../../pages/display/service1'
import cardView from '../../widgets/views/cardView'
export default {
components: {
    mainView,
    cardView,
    display1,
}
}
</script>

<style>

</style>