const loginIdValidator = new FieldValidator("txtLoginId",async function(val){    //验证规则，文本框的值为val
    if(!val){     //如果val没有值
        return "请填写账号";
    }
})
const loginPwdValidator =  new FieldValidator("txtLoginPwd",async function(val){
    if(!val){
        return "请填写密码"
    }
})
const form = $(".user-form")
form.onsubmit = async function(e){
    e.preventDefault();
    const result = await FieldValidator.validate(
        loginIdValidator,
        loginPwdValidator,
    )
    if(!result){
        return;   //验证未通过
    }
    const data = {
        loginId : loginIdValidator.input.value,
        loginPwd : loginPwdValidator.input.value,
    }
    console.log(data)
    const resp = await API.login(data)
    if(resp.code === 0){
        alert("登录成功，点击确定，跳转首页");
        location.href = "./index.html"
    }else{
        // alert("登录失败，请检查账号和密码");
        loginIdValidator.p.innerText = "账号密码不匹配"
        loginPwdValidator.input.value = " ";
    }
}