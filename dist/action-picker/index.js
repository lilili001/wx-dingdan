import { VantComponent } from '../common/component';
VantComponent({
  props: {
    show: Boolean,
    type:String,
    title: String,
    cancelText: String,
    zIndex: {
      type: Number,
      value: 100
    },
    showToolOptions:Boolean,
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
    index:Number
  },
  methods: {
    onSelect: function onSelect(event) {
      var index = event.currentTarget.dataset.index;
      console.log(index);
      var item = this.data.actions[index];

      if (item && !item.disabled && !item.loading) {
        this.$emit('select', item);
      }
    },
    bindPickerChange:function(e){
       this.setData({
            index:e.detail.value[0]
       })
    },
    onCancel: function onCancel() {
      this.$emit('cancel');
    },
    onClose: function onClose() {
      this.$emit('close');
    },
    onConfirm:function(){
      var index = this.data.index

        this.$emit('confirm',index);
    }
  }
});