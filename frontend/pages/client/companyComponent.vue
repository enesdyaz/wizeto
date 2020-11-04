<template>
  <div>
       Name:  <slot name='name' :realName='realName'></slot><br>
       Address: <slot name='address'></slot>
  </div>
</template>

<script>
export default {
  data(){
    return{
      realName: 'haryong Jung'
    }
  }
}
</script>

<style>

</style>