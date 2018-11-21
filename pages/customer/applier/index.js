// pages/customer/applier/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        value: "",
        array: ['美国', '中国', '巴西', '日本'],
        showPicker: false,//初始化是否显示picker
        showToolOptions: true ,// 是否显示picker的 确认取消
    },
    //显示picker选择器
    showAction(event) {
        console.log("picker 显示事件");
        //this.setData({array:['apple','pear']})
        this.setData({showPicker: true});
    },
    //picker 选择器关闭事件
    onClose() {
        console.log("picker 关闭事件");
        this.setData({showPicker: false});
    },
    //picker 选择器确认事件
    onConfirm(event) {
        //获取值
        console.log("picker confirm 事件",event.detail);
        this.setData({value: this.data.array[event.detail]})
        //this.setData({value:v})
        this.setData({showPicker: false});
    },
    //picker view 滚动了 值也改变了
    onPickerViewChange(event) {
        console.log('picker 滚动了')
        console.log(event.detail);
    },
    onBlur(event) {
        console.log("输入框 onBlur事件")
    },
    submitForm(e){
        console.log(e.detail)
    }
})