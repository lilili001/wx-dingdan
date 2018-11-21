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
    showAction(event) {
        this.setData({showPicker: true});
    },
    onChange(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
    },
    onClose() {
        this.setData({showPicker: false});
    },
    onConfirm(event) {
        //获取值
        console.log(event.detail);
        this.setData({value: this.data.array[event.detail]})
        //this.setData({value:v})
        this.setData({showPicker: false});
    },
    onSelect(event) {
        console.log('这是select')
        console.log(event.detail);
    },
    onBlur(event) {

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})