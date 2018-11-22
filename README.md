小程序表单验证 WxValidate,用法

## step1 
```
import WxValidate from '../../../assets/plugins/wx-validate/WxValidate';

```
定义this.WxValidate对象
```
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
```
表单验证
```
params = {"email":"sss"}
if (!this.WxValidate.checkForm(params)) {
            console.log(this.WxValidate.errorList )
            const error = this.WxValidate.errorList[0];
            this.showModal(error);
            return false
        }
```

表单提交时, 通过表单里面带出来的name 狗造成params, 验证同上

