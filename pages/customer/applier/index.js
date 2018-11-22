import WxValidate from '../../../assets/plugins/wx-validate/WxValidate';

Page({
    /**
     * 页面的初始数据
     */
    data: {
        value: "",
        array: ['美国', '中国', '巴西', '日本'],
        dict:{
            is_marriad:[
              {name:"已婚",value:1},
              {name:"未婚",value:0}
          ]
        },
        itemKey:"",
        curSelectItemName:"",

        formDataObj:{

        },
        formData:{
           is_marriad : ""
        },

        showPicker: false,//初始化是否显示picker
        showToolOptions: true ,// 是否显示picker的 确认取消
        
        email:"",
        tel:"",
        idcard:""
    },
    onLoad(){
        // 验证字段的规则
        const rules = {
            email: {
                required: true,
                email: true,
            },
            tel: {
                required: true,
                tel: true,
            },
            idcard: {
                required: true,
                idcard: true,
            },
        }

        // 验证字段的提示信息，若不传则调用默认的信息
        const messages = {
            email: {
                required: '请输入邮箱',
                email: '请输入正确的邮箱',
            },
            tel: {
                required: '请输入手机号',
                tel: '请输入正确的手机号',
            },
            idcard: {
                required: '请输入身份证号码',
                idcard: '请输入正确的身份证号码',
            },
        }

        this.WxValidate = new WxValidate(rules, messages)

    },
    //显示picker选择器
    showAction(event) {
        console.log("picker 显示事件");
        console.log(event);
        this.setData({array:this.data.dict.is_marriad});
        this.setData({itemKey:  event.currentTarget.dataset.itemkey  });
        this.setData({curSelectItemName:  event.currentTarget.dataset.name  });
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
        var key = this.data.curSelectItemName;
        var formDataKey = "formData."+key;
        var formDataObjKey = "formDataObj."+key;

        var dict = "dict."+key;

        this.setData({
            [formDataObjKey] : this.data.dict[key][event.detail]
        });

       //console.log( this.data.dict )
        this.setData({ [formDataKey] : this.data.dict[key][event.detail]['name'] });//setData 使用变量
        this.setData({showPicker: false});
    },
    //picker view 滚动了 值也改变了
    onPickerViewChange(event) {
        console.log('picker 滚动了')
        console.log(event.detail);
    },
    onBlur(event) {
        console.log("输入框 onBlur事件")
        console.log(event)
        var params = {};
        var key = event.currentTarget.dataset.name;
        var val = event.detail;
        params[key] = val;

        if (!this.WxValidate.checkForm(params)) {
            console.log(this.WxValidate.errorList )
            const error = this.WxValidate.errorList[0];
            this.showModal(error);
            return false
        }
    },
    showModal: function (error) {
        wx.showModal({
            content: error.msg,
            showCancel: false,
        })
    },
    submitForm(e){
        console.log(e.detail.value)
    }
})