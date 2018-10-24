// pages/form/form.js
import WxValidate from '../../assets/plugins/wx-validate/WxValidate';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //步骤
        active: -1,
        steps: [
            {
                //text: '步骤一',
                desc: '贷款信息',
                cur: true
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
        stepActiveColor: '#1d86f4',
        stepCustomClass: "stepCustomClass", //进度条外部样式

        insurance: "10000.00",

        //picker
        index: 0,
        array: ['美国', '中国', '巴西', '日本'],
        scrollToView: "sec-1",

        //actions
        show: false,
        actions: [
            {
                name: '选项'
            },
            {
                name: '分享',
                subname: '描述信息',
                openType: 'share'
            },
            {
                loading: true
            },
            {
                name: '禁用选项',
                disabled: true
            }
        ],
        showSelect: false,
        showtest: true,
        showToolOptions: true,
        isUpScroll: false,
        offsetTop: [],
        i: 0,
        formPaddingBottom:700
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this;

        //检查设备 如果是iphonex 则paddingbottom1000
        wx.getSystemInfo({
            success: function ( res ){

                if(res.model == 'iPhone X'){
                    _this.setData({
                        formPaddingBottom: 1000
                    });
                }else if(res.model == 'iPhone 7'){
                    _this.setData({
                        formPaddingBottom: 780
                    });
                }
                else if(res.model == 'iPhone 6'){
                    _this.setData({
                        formPaddingBottom: 780
                    });
                }else if(res.model == 'iPhone 5'){
                    _this.setData({
                        formPaddingBottom: 720
                    });
                }

               /* // 得到一个系统信息对象，以 iPhone 7 Plus 为例
                SDKVersion:"1.9.0"  // 客户端的基础版本库
                batteryLevel: 100  //  会打印出此属性及属性值，据说是手机电量，但实际上跟手机电量并不吻合
                brand:"iPhone"  // 手机品牌
                errMsg:"getSystemInfo:ok"
                fontSizeSetting:16    // 用户设置的字体大小，单位px（以“我-设置-通用-字体大小”中的设置为准）
                language:"zh_CN"   // 微信设置的语言
                model:"iPhone 7 Plus<iPhone9.2> "   // 手机型号
                pixelRatio:3  // 设备的像素比
                platform:"ios"   // 客户端平台
                screenHeight:736  // 屏幕高度
                screenWidth:414  // 屏幕宽度
                system:"iOS 11.1.2"  // 操作系统版本
                version:"6.6.1"   // 微信版本号
                windowHeight:672    // 可使用窗口的高度
                windowWidth:414   // 可使用窗口的宽度*/
            }
        });

        var arr = [1, 2, 3];
        var offsetTop = [];
        for (let [index, v] of arr.entries()) {
            var groupClass = '.sec-' + v;
            var query = wx.createSelectorQuery();
            query.select(groupClass).boundingClientRect();
            query.selectViewport().scrollOffset();
            query.exec(function (res) {
                //res[0].top       // #the-id节点的上边界坐标
                //res[1].scrollTop // 显示区域的竖直滚动位置

                offsetTop.push(res[0].top);
                _this.setData({
                    offsetTop: offsetTop
                })
            });
        }

        //相对当前屏幕

        for (let [index, v] of arr.entries()) {
            var secClass = '.sec-' + v;
            wx.createIntersectionObserver(this, {
                thresholds: [0, 0.8, 1]
            }).relativeToViewport().observe(secClass, (res) => {
                console.log(
                    'relativeToViewport 组' + v + '触发\n' +
                    '相交区域占目标节点的布局区域的比例:' + res.intersectionRatio + '\n' +

                    '相交区域的左边界坐标left:' + res.intersectionRect.left + '\n' +
                    '相交区域的上边界坐标top:' + res.intersectionRect.top + '\n' +
                    '相交区域的下边界坐标bottom:' + res.intersectionRect.bottom + '\n' +
                    '相交区域的宽度width:' + res.intersectionRect.width + '\n' +
                    '相交区域的高度height:' + res.intersectionRect.height
                );

                const steps = _this.data.steps;

                if (_this.data.isUpScroll && res.intersectionRatio > 0 && res.intersectionRatio < 0.8) {
                    steps.forEach(function (step, index) {
                        step.cur = index == res.dataset.index
                    });
                    _this.setData({
                        steps: steps
                    })
                }
            });
        }

        this.initValidate();
    },
    /***********  点击 进度当前 页面跳转 ************************/
    tapTo: function (e) {
        wx.pageScrollTo({
            scrollTop: this.data.offsetTop[e.detail] - 58
        })
    },
    initValidate: function () {
        //验证 https://github.com/skyvow/wx-extend/blob/master/docs/components/validate.md
        //验证字段规则
        const rules = {
            carType: {
                required: true
            },
            insurance: {
                required: true,
                assistance: true,
            }
        };

        //验证字段提示,若不传则显示默认的信息
        const messages = {
            carType: {
                required: "请选择车辆类型"
            }
        };

        //创建实例对象
        this.WxValidate = new WxValidate(rules, messages);
        // 自定义验证规则
        this.WxValidate.addMethod('assistance', (value, param) => {
            return this.WxValidate.optional(value) || /^([0-9])+(\.[0-9]+)?$/.test(value)
        }, '请输入非负数字');
    },
    onClickSelect: function () {
        console.log('click111')
    },
    changeInsurance: function (e) {
        console.log(e)
    },
    bindKeyInput: function (e) {
        console.log(e)
    },
    submitForm: function (e) {
        const params = e.detail.value;
        if (!this.WxValidate.checkForm(params)) {
            const error = this.WxValidate.errorList[0];
            this.showModal(error);
            return false
        }

        return false
    },
    showAction() {
        this.setData({show: true});
    },
    onClose() {
        this.setData({show: false});
    },
    onConfirm(v) {
        //获取值
        console.log(v);
    },
    onClosePullUp() {
        this.setData({
            showSelect: false
        });
    },
    onSelect(event) {
        console.log(event.detail);
    },

    showSelect() {
        this.setData({
            showSelect: true
        })
    },
    showModal: function (error) {
        wx.showModal({
            content: error.msg,
            showCancel: false,
        })
    },
    hideTest: function (e) {
        this.setData({
            showtest: false
        });
        console.log(e);
    },

    onPageScroll: function (obj) {
        var _this = this;

        var scrollTop = obj.scrollTop;

        /********************* 设置头部step 的当前高亮  ****************************/
        var offsetTops = this.data.offsetTop;
        var steps = this.data.steps;
        var scrollTopNew = scrollTop + 100;

        steps.forEach(function (step, index) {
            step.cur = false;

            if (scrollTopNew > offsetTops[index]) {
                if (scrollTopNew - offsetTops[index] > 0) {
                    _this.data.i = index;
                }
            }
        });

        var timer = setTimeout(()=>{
            steps[_this.data.i]['cur'] = true;
            this.setData({
                steps: steps
            })
            clearInterval(timer)
        },400)

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
            value: event.detail
        })
    },
    bindPickerChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
});