import {VantComponent} from '../common/component';

VantComponent({
    props: {
        show: Boolean,
        type: String,
        title: String,
        cancelText: String,
        zIndex: {
            type: Number,
            value: 100
        },
        showToolOptions: Boolean,
        actions: {
            type: Array,
            value: []
        },
        overlay: {
            type: Boolean,
            value: true
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true
        },
        index: Number
    },
    methods: {
        //滚动时候触发
        bindchange: function (e) {
            console.log("触发 bindPickerChange");
            this.setData({
                index: e.detail.value[0]
            });
            //将每一列的值都传回给父组件
            this.$emit('pickerViewChange', e.detail.value);
        },
        onCancel: function onCancel() {
            this.$emit('cancel');
        },
        onClose: function onClose() {
            this.$emit('close');
        },
        onConfirm: function () {
            var index = this.data.index

            this.$emit('confirm', index);
        }
    }
});