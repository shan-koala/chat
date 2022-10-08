// 用户登录和注册的表单项验证的通用代码
/**
 * 对某一个表单项进行验证的构造函数
 */
 class FieldValidator {
    /**
     * 构造器
     * @param {String} txtId 文本框的Id
     * @param {Function} validatorFunc 验证规则函数，当需要对该文本框进行验证时，会调用该函数，函数的参数为当前文本框的值，函数的返回值为验证的错误消息，若没有返回，则表示无错误
     */
    constructor(txtId, validatorFunc) {
      this.input = $('#' + txtId);            //拿到文本框 
      this.p = this.input.nextElementSibling;           //拿到p元素，（文本框的下一个值）
      this.validatorFunc = validatorFunc;
      this.input.onblur = () => {                  //文本框失去焦点时
        this.validate();                                 //进行验证
      };
    }
  
    /**
     * 验证，成功返回true，失败返回false
     */
    async validate() {
      const err = await this.validatorFunc(this.input.value);           //等待验证结果，并保存错误消息 
      if (err) {
        // 有错误
        this.p.innerText = err;
        return false;
      } else {
        this.p.innerText = '';
        return true;
      }
    }
  
    /**
     * 对传入的所有验证器进行统一的验证，如果所有的验证均通过，则返回true，否则返回false
     * @param {FieldValidator[]} validators
     */
    static async validate(...validators) {
      const proms = validators.map((v) => v.validate());
      const results = await Promise.all(proms);
      return results.every((r) => r);
    }
  }
  

//调用构造函数
// var loginIdValidator = new FieldValidator("txtLoginId",async function(val){    //验证规则，文本框的值为val
//     if(!val){     //如果val没有值
//         return "请填写账号";
//     }
//     const resp =await API.exists(val);           //判断当前账号是否存在
//     if(resp.data){
//         return "该账号已被占用，请重新选择一个账号名"    //若存在返回
//     }
// })
// var nicknameValidator = new FieldValidator("txtNickname",async function(val){
//     if(!val){
//         return "请填写昵称"
//     }
// })
// function test(){
//     FieldValidator.validate(loginIdValidator,nicknameValidator).then(
//         (result) => {
//             console.log(result)
//         }
//     )
// }
