import {VantComponent} from '../common/component';

VantComponent({
    props: {
        icon: String,
        steps: Array,
        active: Number,
        direction: {
            type: String,
            value: 'horizontal'
        },
        activeColor: { //完成颜色
            type: String,
            value: '#06bf04'
        },
        curColor: {//当前点击或滚动到当前区域颜色
            type: String,
            value: 'red'
        }
    },
    watch: {
        steps: 'formatSteps',
        //active: 'formatSteps'
    },

    created: function created() {

    },
    methods: {
        tapTo:function(e){
            const index = e.currentTarget.dataset.index;

            //点击当前 让其变红 点中颜色
            const steps = this.data.steps;
            steps.forEach(function(step,i){
                step.cur = index == i;
            });

            this.setData({
                steps:steps
            });
            this.$emit('tapTo',index)
        },
        formatSteps:function(){
            console.log( 'steps 当前 改变了' );
        }
    }
});