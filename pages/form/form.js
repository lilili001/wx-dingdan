// pages/form/form.js
import WxValidate from '../../assets/plugins/wx-validate/WxValidate';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //步骤
      active:-1,
      steps: [
          {
              //text: '步骤一',
              desc: '贷款信息'
          },
          {
              //text: '步骤二',
              desc: '客户信息',
          },
          {
              //text: '步骤三',
              desc: '附件信息'
          }
      ],
      stepActiveColor:'#1d86f4',
      stepCustomClass:"stepCustomClass", //进度条外部样式

      insurance:"10000.00",

      //picker
      index:0,
      array: ['美国', '中国', '巴西', '日本'],
      scrollToView:"sec-1"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var arr = [1,2,3];
       for(let [index,v] of arr.entries()){
           var secClass = '.sec-'+v;

           wx.createIntersectionObserver(this, {
               thresholds: [0.2]
           }).relativeTo('.form').relativeToViewport().observe(secClass, (res) => {
               // res.intersectionRatio // 相交区域占目标节点的布局区域的比例
               // res.intersectionRect // 相交区域
               // res.intersectionRect.left // 相交区域的左边界坐标
               // res.intersectionRect.top // 相交区域的上边界坐标
               // res.intersectionRect.width // 相交区域的宽度
               // res.intersectionRect.height // 相交区域的高度

             if (res.intersectionRatio>0){
               console.log('组' + v + '触发');
               console.log(res)
             }
              
           })
       }

      this.initValidate();
  },
  initValidate:function(){
      //验证 https://github.com/skyvow/wx-extend/blob/master/docs/components/validate.md
     //验证字段规则
      const rules = {
          carType:{
              required:true
          },
          insurance:{
              required: true,
              assistance: true,
          }
      };

      //验证字段提示,若不传则显示默认的信息
      const messages = {
          carType:{
              required:"请选择车辆类型"
          }
      };

      //创建实例对象
      this.WxValidate = new WxValidate(rules,messages);
      // 自定义验证规则
      this.WxValidate.addMethod('assistance', (value, param) => {
          return this.WxValidate.optional(value) || /^([0-9])+(\.[0-9]+)?$/.test(value)
      }, '请输入非负数字');
  },

  changeInsurance:function(e){
        console.log(e)
  },
    bindKeyInput:function(e){
        console.log(e)
    },
    submitForm:function(e){
      console.log(e.detail.value);
      return;
      const params = e.detail.value;
      console.log(params);
      console.log(this.WxValidate);
      if (!this.WxValidate.checkForm(params)) {
            const error = this.WxValidate.errorList[0];
            this.showModal(error);
            return false
      }

      return false
    },
  showModal:function(error) {
        wx.showModal({
            content: error.msg,
            showCancel: false,
        })
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

  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);

    this.setData({
      value:event.detail
    })
  },
  bindPickerChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
});