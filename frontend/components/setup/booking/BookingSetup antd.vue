<template>
<div>
    <div>
        <a-week-picker style='width: 90%' v-model='week_picker' placeholder="Select Week" />
    </div>
    <div>
        <a-time-picker placeholder='Start time' :minute-step="5" use12-hours v-model='start_time' :default-value="moment('09:00', 'HH:mm')" format="HH:mm"  />
        <a-time-picker placeholder='Finish time' :minute-step="5" use12-hours v-model='finish_time' :default-value="moment('17:00', 'HH:mm')" format="HH:mm" />
    </div>
    <div>
        <a-time-picker placeholder='Duration' :minute-step="5"  v-model='finish_time' :default-value="moment('01:00', 'HH:mm')" format="HH:mm" />
    </div>
    <div>
        <a-checkbox-group v-model='arrayDay'>
            <a-checkbox @change="onChange">    M  </a-checkbox>
            <a-checkbox @change="onChange">    T </a-checkbox>
            <a-checkbox @change="onChange">    W </a-checkbox>
            <a-checkbox @change="onChange">    T  </a-checkbox>
            <a-checkbox @change="onChange">    F  </a-checkbox>
            <a-checkbox @change="onChange">    S  </a-checkbox>
            <a-checkbox @change="onChange">    S  </a-checkbox>
        </a-checkbox-group>

    
      {{arrayDay}}
    </div>
</div>

</template>
<script>
import moment from 'moment';
export default {
    data(){
        return{
            start_time: '',
            finish_time: '',
            week_picker: '',
            arrayDay: [],

        }
    },

    methods: {
        moment,
    },
};
</script>