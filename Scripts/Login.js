
//        document.getElementById('css').href = 'Styles/Login-min.css?ver=' + Math.random();
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
function base64encode(g) {
    var c, e, a;
    var f, d, b;
    a = g.length;
    e = 0; c = "";
    while (e < a) {
        f = g.charCodeAt(e++) & 255;
        if (e == a) {
            c += base64EncodeChars.charAt(f >> 2);
            c += base64EncodeChars.charAt((f & 3) << 4); c += "=="; break
        }
        d = g.charCodeAt(e++);
        if (e == a) {
            c += base64EncodeChars.charAt(f >> 2);
            c += base64EncodeChars.charAt(((f & 3) << 4) | ((d & 240) >> 4));
            c += base64EncodeChars.charAt((d & 15) << 2); c += "="; break
        }
        b = g.charCodeAt(e++); c += base64EncodeChars.charAt(f >> 2);
        c += base64EncodeChars.charAt(((f & 3) << 4) | ((d & 240) >> 4));
        c += base64EncodeChars.charAt(((d & 15) << 2) | ((b & 192) >> 6));
        c += base64EncodeChars.charAt(b & 63);
    } return c;
}
function base64decode(h) {
    var g, f, d, b;
    var e, a, c;
    a = h.length;
    e = 0;
    c = "";
    while (e < a) {
        do
        { g = base64DecodeChars[h.charCodeAt(e++) & 255] }
        while (e < a && g == -1);
        if (g == -1)
        { break }
        do
        { f = base64DecodeChars[h.charCodeAt(e++) & 255] }
        while (e < a && f == -1);
        if (f == -1) { break } c += String.fromCharCode((g << 2) | ((f & 48) >> 4));
        do {
            d = h.charCodeAt(e++) & 255;
            if (d == 61) { return c }
            d = base64DecodeChars[d]
        }
        while (e < a && d == -1); if (d == -1) { break }
        c += String.fromCharCode(((f & 15) << 4) | ((d & 60) >> 2)); do {
            b = h.charCodeAt(e++) & 255;
            if (b == 61) { return c }
            b = base64DecodeChars[b]
        } while (e < a && b == -1);
        if (b == -1) { break }
        c += String.fromCharCode(((d & 3) << 6) | b)
    } return c
}
function utf16to8(e) {
    var b, d, a, f; b = ""; a = e.length; for (d = 0; d < a; d++) {
        f = e.charCodeAt(d);
        if ((f >= 1) && (f <= 127)) { b += e.charAt(d) } else {
            if (f > 2047) {
                b += String.fromCharCode(224 | ((f >> 12) & 15)); b += String.fromCharCode(128 | ((f >> 6) & 63));
                b += String.fromCharCode(128 | ((f >> 0) & 63))
            } else { b += String.fromCharCode(192 | ((f >> 6) & 31)); b += String.fromCharCode(128 | ((f >> 0) & 63)) }
        }
    } return b
}
function utf8to16(g) {
    var b, e, a, h; var f, d; b = ""; a = g.length; e = 0; while (e < a) {
        h = g.charCodeAt(e++); switch (h >> 4) {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                b += g.charAt(e - 1);
                break;
            case 12:
            case 13:
                f = g.charCodeAt(e++);
                b += String.fromCharCode(((h & 31) << 6) | (f & 63));
                break;
            case 14: f = g.charCodeAt(e++);
                d = g.charCodeAt(e++);
                b += String.fromCharCode(((h & 15) << 12) | ((f & 63) << 6) | ((d & 63) << 0));
                break
        }
    } return b
};

$(function () {
    $("form").submit(function () { return false; }); // 禁用 form 提交，页面不会跳转
    $("form input[type='submit']").click(function () {
        try {
            //获取当前可用提交div
            var divarr = ['logindiv', 'btnsingup', 'changepasswordid', 'InviteSubmit'];
            for (var i = 0; i < divarr.length; i++) {
                var div = eval("$('#" + divarr[i] + "')");
                if (div.is(":visible")) {
                    div.click();
                }
            }
        } catch (e) {
            //alert(e.Line);
        }
        return false;
    });
});


var accountemail = "";
//#region 新建账户【点击时触发】
function newAccount() {
    $("#reset").show();
    $("#agree").show();
    $("#resetpwd").hide();
    $("#forgetpwd").hide();
    $("#login").show();
    $("#email").html("E-mail :&nbsp; &nbsp;");
    $("#btnQuit").val("quit");
    $("#lblMsg").html("");
    document.getElementById("chkOK").checked = true;
    $("#txtislogin").val("0");
}
//#endregion
//#region 注册失败后提示
function Registerfailed(msg) {
    $("#lblMsg").html("Register failed !<br /> " + msg);
}
//#endregion
//#region 退出
function quit() {
    self.location = "http://umap.ca/index.htm";
    //self.location = "bizmap.ca";  发布时替换
}
//#endregion

function RP(log, e) {
    if (log == "1") { //登录
        $("#divsignupprofile").hide();
        $("#divloginlogout").removeClass("divloginlogout").addClass("divlogin");
        getclassid("login");
        //setTimeout('getclassid("login")', 300);
        //var email = localStorage.getItem("account");
        //$("#txtid").val(email);
    } else if (log == "2") { //找回账户
        accountemail = e;
        $("#alltou").hide();
        $("#retaccount").html("Submit");
        getclassid("retrieveaccount");
        setTimeout('$("#retrievepwd").focus()', 500);
    }
    else if (log == "3") { //注册
        accountemail = e;
        $("#divloginlogout").hide();
        $("#divsignupprofile").removeClass("divsignupprofile").addClass("divsignup");
        getclassid("signup");
    }
    else if (log == "4") { //找回密码

        accountemail = e;
        $("#divloginlogout").hide();
        $("#divsignupprofile").removeClass("divsignupprofile").addClass("divsignup");
        $("#signupprofile").text("Change Password");
        $("#signupprofile").unbind("click", "signupfile()");
        getclassid("changepassword");
        $("#changepwd").focus();
    }
    else if (log == "5") { //
        if (e == "0") {

        } else {

        }
    }
    else if (log == "6") { //修改密码
        accountemail = localStorage.getItem("account");
        $("#divloginlogout").hide();
        $("#divsignupprofile").removeClass("divsignupprofile").addClass("divsignup");
        $("#signupprofile").text("Change Password");
        $("#signupprofile").unbind("click", "signupfile()");
        //alert(000);
        $("#lblUserId").text(accountemail);
        getclassid("changepassword");
        $("#changepwd").focus();
        //                if ($("#changepwd") != undefined && $("#changepwd") != '') {
        //                    $("#changepwd").focus();
        //                }
        //                var time = 10;
        //                var hander = setInterval(function () {
        //                    //                    var displaypwd = $("#changepassword").css("display");
        //                    //                    alert(displaypwd);
        //                    if (time <= 0) {
        //                        //|| $("#changepassword").css("display") == "block"
        //                        $("#changepwd").focus();
        //                        clearInterval(hander);
        //                    }
        //                    else {
        //                        //$("#btnsingup").attr("disabled", true);
        //                        alert(time);
        //                        time--;
        //                    }
        //                }, 1000);
        //$("#changepwd1").focus();
        //setTimeout('alert(222)', 10000);
    }
    else if (log == "7") {  //添加邀请人
        getclassid("singupsuccess");
        $("#divsingupOrInvite").hide();

        $("#divloginlogout").hide();
        $("#divsignupprofile").removeClass("divsignupprofile").addClass("divsignup");
        $("#signupprofile").html("Profile");
        toTop();
    }
}
//个人信息
function profile(id) {
    $("#lblshowinfo").text("");
    $("#signupprofile").text("Profile");
    $("#loginlogout").text("Logout");
    $("#lblShowID").text("Biz ID:" + id);
    getclassid("profile");      //函数，让该id的div进行显示，其他的都隐藏
    $("#RetPt").val("");
    $("#bizmap").hide();
    $.ajax({
        url: 'Handler/Login.ashx',
        type: 'post',
        data: { profile: id },
        success: function (inf) {
            var info = inf.split(':');
            if (info[0] == "true") {
                $("#UserAccount").text(info[1]);
                $("#UserID").text(info[2]);
                $("#UserName").val(info[3]);
            }
        }
    });
}

$(document).ready(function () {
    $('body').height(window.innerHeight);
    //#region 点击文本框事件        
    $('input[type=text]').click(function () {
        $("#lblMsg").html("");
    });
    //#endregion
    //#region 点击按钮事件        
    $('input[type=button],.next').click(function () {
        setTimeout('window.scrollTo(0, 0);', 1000);
    });
    //#endregion

    //#region 点击重置密码  跳转至top     
    $('#reset').click(function () {
        $("#login").hide();
        $("#resetpwd").show();
    });

    $('#btnFBack').click(function () {
        $("#login").hide();
        $("#forgetpwd").hide();
        $("#resetpwd").show();
    });

    //#endregion

    //#region 忘记密码       
    $('#forpwd').click(function () {
        RP();
    });
    //#endregion

    //#region 密保问题       
    $('#rbtnAq').click(function () {
        $("#byAq").show();
        $("#byEmail").html("<div class='block'>E-mail&nbsp;:&nbsp;&nbsp;</div><div class='block'>Question&nbsp;:&nbsp;&nbsp;</div><div class='block'>Answer&nbsp;:&nbsp;&nbsp;</div>");
    });
    //#endregionE-mail:<br />Question:<br />Answer:

    //#region 邮件方式    
    $('#rbtnEmail').click(function () {
        $("#byAq").hide();
        $("#byEmail").html("<div class=\"block\">E-mail&nbsp;:&nbsp;&nbsp;</div>");
    });
    //#endregion

    //            if ($("#login").css("display") == "block") {
    //                $("#bizmap").hide();
    //            }
    setTimeout('window.scrollTo(0, 0);', 1000);

});

//#region 登录事件
var count = 0;
//点击确定
function ok() {
    $("#txtid").blur();
    $("#txtpwd").blur();

    //debugger;
    $("#logindiv").html("Loading...");
    $("#lblshowinfo").text("");
    var id = jQuery.trim($("#txtid").val());
    var pwd = jQuery.trim($("#txtpwd").val());
    //判断是否为空
    if (id == "") {
        $("#lblshowinfo").text("Email can not be empty!");
        $("#logindiv").html("Login");
        return false;
    }
    //检查email是否正确
    if (!checkMail(id)) {
        $("#lblshowinfo").text("Not a valid email address");
        $("#logindiv").html("Login");
        return false;
    }
    if (pwd == "") {
        $("#lblshowinfo").text("Password can not be empty!");
        $("#logindiv").html("Login");
        return false;
    }
    if (count >= 10) {
        $("#txtid").attr("disabled", true);
        $("#txtpwd").attr("disabled", true);
        $("#lblshowinfo").text("Please try again later.");
        return false;
    }
    //非空
    $.ajax({
        url: 'Handler/Login.ashx',
        type: 'POST',
        data: { login: id, password: pwd },
        success: function (inf) {
            var info = inf.split('|');
            if (info[0] == "true") {

                var account = localStorage.getItem("account");

                localStorage.setItem("account", id);
                debugger;
                if (info[2]) {
                    localStorage.setItem("account1", id + "￥" + info[2]);  //保存email+临时用户
                    localStorage.setItem("userLevel", info[3]);  //保存用户level
                } else {
                    localStorage.setItem("account1", id + "￥"); //保存email
                }
                debugger;
                //window.location.href = "index.htm";
                //                        $("#lblShowID").text("Biz ID :" + info[1]);
                //                        $("#loginlogout").html("Logout");
                //                        $("#signupprofile").html("Profile");
                //                        $("#BizID").text(info[1]);
                //                        getclassid("profile");      //函数，让该id的div进行显示，其他的都隐藏
                //                        $("#RetPt").val("");
                //                        $("#bizmap").hide();
                //                        //var id = $("#lblShowID").text().split(':');
                //                        $.ajax({
                //                            url: 'Handler/Login.ashx',
                //                            type: 'post',
                //                            data: { profile: id },
                //                            success: function (inf) {
                //                                var info = inf.split(':');
                //                                if (info[0] == "true") {
                //                                    $("#UserAccount").text(info[1]);
                //                                    $("#UserID").text(info[2]);
                //                                    $("#UserName").val(info[3]);
                //                                }
                //                            }
                //                        });
                //                        return ture;

                $.ajax({
                    url: 'Handler/Login.ashx',
                    type: 'post',
                    data: { getInfo: id },
                    success: function (inf) {

                        if (inf) {

                            localStorage.setItem("arrList", inf); //保存菜单
                        } else {
                            localStorage.setItem("arrList", ""); //保存菜单
                        }
                    }
                });


                RetrieveAccount(id, pwd);
                //window.location.href = "index.htm";

            }
            else {
                $("#logindiv").html("Login");
                $("#lblshowinfo").text("Oops! No match found.Please try again.");
                count += 1;
                toTop();
                return false;
            }
        }
    });

    //updateTimeLabel(3);
}
//#endregion


//#region 记录email判断是否通过
var isemailcheck = false;
function emailCheck() {
    var email = $("#txtsignupemail").val();
    str = jQuery.trim(email);
    if (str != "") {
        var regs = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (regs.test(str)) {
            $("#lblshowinfo").text("");
            $("#fgtpwdshowinfo").hide();
            $.ajax({
                url: 'Handler/Login.ashx',
                type: 'POST',
                data: { IsEmail: 1, userid: email },
                success: function (inf) {
                    var info = inf.split('|');
                    if (info[0] == "true") {

                        var account = localStorage.getItem("account");

                        localStorage.setItem("account", id);

                        if (info[2]) {
                            localStorage.setItem("account1", id + "￥" + info[2]);  //保存email+临时用户
                        } else {
                            localStorage.setItem("account1", id + "￥"); //保存email
                        }
                        //window.location.href = "index.htm";
                        //                        $("#lblShowIDtext("Biz ID :" + info[1]);
                        //                        $("#loginlogout").html("Logout");
                        //                        $("#signupprofile").html("Profile");
                        //                        $("#BizID").text(info[1]);
                        //                        getclassid("profile");      //函数，让该id的div进行显示，其他的都隐藏
                        //                        $("#RetP").t").val("");
                        //                        $("#bizmap").hide();
                        //                        //var id = $("#lblShowID").text().split(':');
                        //                        $.ajax({
                        //                            url: 'Handler/Login.ashx',
                        //                            type: 'post',
                        //                            data: { profile: id },
                        //                            success: function (inf) {
                        //                                var info = inf.split(':');
                        //                                if (info[0] == "true") {
                        //                                    $("#UserAccount").text(info[1]);
                        //                                    $("#UserID").text(info[2]);
                        //                                    $("#UserName").val(info[3]);
                        //                                }
                        //                            }
                        //                        });
                        //                        return ture;
                        window.location.href = "http://umap.ca/index.htm";
                    }
                    else {
                        $("#logindiv").html("Login");
                        $("#lblshowinfo").text("Oops! No match found.Please try again.");
                        count += 1;
                        toTop();

                        if (inf == "true") {
                            $("#lblshowinfo").text("Email address is taken.");
                            $("#fgtpwdshowinfo").show();
                            isemailcheck = false;
                            $("#btnsingup").attr({ "disabled": "disabled" });

                            return false;
                        }
                    }
                }
            });
            isemailcheck = true;
            $("#btnsingup").attr({ "disabled": "disabled" });
            //$("#btnsingup").removeAttr("disabled");
            return true;
        }
        else {
            $("#lblshowinfo").text("Not a valid email address");
            isemailcheck = false;
            $("#btnsingup").attr({ "disabled": "disabled" });
            return false;
        }

    }
    else {
        isemailcheck = true;
        $("#lblshowinfo").text("");
        return false;
    }
}
//#endregion

//#region 判断是数字的正则函数
function isNumber(str) {
    if ("" == str) {
        return false;
    }
    var reg = /\D/;
    return str.match(reg) == null;
}
//#endregion

//#region 判断是字母的正则函数
function isLetter(str) {
    if ("" == str) {
        return false;
    }

    var c = str.charAt(str);
    if ((c < "a" || c > "z") && (c < "A" || c > "Z")) {
        return false;
    }

    return true;
}
//#endregion

//#region 判断是否是特殊字符函数
function isCharacter(str) {
    var character = ["-", "_", "$", "@", "#", "*"];
    if ("" == str) {
        return false;
    }

    for (var i = 0; i < character.length; i++) {
        if (str == character[i]) {
            return true;
        }
    }
    return false;
}
//#endregion

//#region 用户提交注册信息之后，让按钮变成不可用状态。
function updateTimeLabel(time) {
    var btn = $("#btnsingup");
    btn.fadeIn(1000);
    var hander = setInterval(function () {
        if (time <= 0) {
            $("#btnsingup").attr("disabled", false);
            clearInterval(hander);
        }
        else {
            $("#btnsingup").attr("disabled", true);
            time--;
        }
    }, 1000);
}
//#endregion

//#region 点击注册函数 注释
//        //点击注册函数
//        function signUp() {

//            var email = $("#txtsignupemail").val();
//            var pwd = $("#txtsignuppwd").val();
//            var confrimpwd = $("#txtconfirmpwd").val();



//            //email不能为空
//            if (jQuery.trim(email) == "") {
//                $("#lblshowinfo").text("email can not be empty!");
//                return false;
//            }
//            //检查email是否正确
//            if (!isemailcheck) {

//                return false;
//            }
//            //pwd不能为空
//            if (jQuery.trim(pwd) == "") {
//                $("#lblshowinfo").text("pwd can not be empty!");
//                return false;
//            }


//            //判断密码的长度是否在6-20之间
//            if (pwd.length < 6 || pwd.length > 20) {
//                $("#lblshowinfo").text("Password must be between 6 to 20 digits.");
//            }
//            else {
//                for (var i = 0; i < pwd.length; i++) {
//                    if (!isNumber(pwd[i]) && !isLetter(pwd[i]) && !isCharacter(pwd[i])) {
//                        $("#lblshowinfo").text("Contains illegal characters");
//                        return false;
//                    }
//                }
//                //检查密码是否一致
//                if (!checkSame()) {
//                    return false;
//                }
//                updateTimeLabel(3);
//                //$("#btnsingup").attr("disabled", false);

//                //所以条件都符合，进行注册，在后台随机生成Dic
//                $.ajax({
//                    url: 'Handler/Login.ashx',
//                    type: 'POST',
//                    data: { Register: 1, userid: email, userpwd: pwd },
//                    success: function (inf) {
//                        var info = inf.split(':')
//                        if (info[0] == "true") {

//                            $("#lblShowID").text("Biz ID :" + info[1]);
//                            $("#loginlogout").html("Logout");
//                            $("#signupprofile").html("Profile");
//                            $("#BizID").text(info[1]);
//                            var mydate = new Date();
//                            $("#todayTime").text(mydate.getFullYear().toString() + "-" + mydate.getMonth().toString() + "-" + mydate.getDate().toString());
//                            $("#bizmap").text("About bizmap.ca");

//                            getclassid("singupsuccess");
//                            localStorage.setItem("account", email);
//                        }
//                        else {howinfo").text(info[1]);
//                        }
//                    }
//                });

//            }
//                            $("#lbls
//        }
//#endregion

function checkMail(email) {
    //var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (filter.test(email)) {
        return true;
    }
    return false;
}


$(document).ready(function () {
    $("#txtsignuppwd").focus(function () {  //注册页面   密码获取焦点时对email的判断
        var email = $("#txtsignupemail").val();
        //email判断是否为空
        if (jQuery.trim(email) == "") {
            $("#lblshowinfo").text("Email can not be empty!");
            $("#btnsingup").html("Submit");
            return false;
        }
        //检查email是否正确
        if (!checkMail(email)) {
            $("#lblshowinfo").text("Not a valid email address");
            $("#btnsingup").html("Submit");
            return false;
        }
        $("#lblshowinfo").html("");
        $("#btnsingup").html("Submit");
    });

    $("#txtpwd").focus(function () {  //登录页面   输入密码获取焦点时对email的判断
        var id = jQuery.trim($("#txtid").val());
        //email判断是否为空
        if (jQuery.trim(id) == "") {
            $("#lblshowinfo").text("Email can not be empty!");
            $("#logindiv").html("Login");
            return false;
        }
        //检查email是否正确
        if (!checkMail(id)) {
            $("#lblshowinfo").text("Not a valid email address");
            $("#logindiv").html("Login");
            return false;
        }
    });

});

//#region 点击注册函数
//点击注册函数
function signUp() {
    $("#txtsignupemail").blur();
    $("#txtsignuppwd").blur();
    $("#btnsingup").html("Loading...");
    var email = $("#txtsignupemail").val();

    var pwd = $("#txtsignuppwd").val();

    //email判断是否为空
    if (jQuery.trim(email) == "") {
        $("#lblshowinfo").text("Email can not be empty!");
        $("#btnsingup").html("Submit");
        return false;
    }

    //检查email是否正确
    if (!checkMail(email)) {
        $("#lblshowinfo").text("Not a valid email address");
        $("#btnsingup").html("Submit");
        return false;
    }

    //pwd不能为空
    if (jQuery.trim(pwd) == "") {
        $("#lblshowinfo").html("<div style='margin-bottom:20px;'>Password can not be empty!</div>");
        $("#btnsingup").html("Submit");
        return false;
    }


    //判断密码的长度是否在6-20之间
    if (pwd.length < 6 || pwd.length > 20) {
        $("#lblshowinfo").text("Password must be between 6 to 20 digits.");
        $("#btnsingup").html("Submit");
        return false;
    }
    else {
        for (var i = 0; i < pwd.length; i++) {
            if (!isNumber(pwd[i]) && !isLetter(pwd[i]) && !isCharacter(pwd[i])) {
                $("#lblshowinfo").text("Contains illegal characters");
                $("#btnsingup").html("Submit");
                return false;
            }
        }


        //$("#btnsingup").attr("disabled", false);
        var account = localStorage.getItem("account"); //获取临时账户的帐号ID
        //所以条件都符合，进行注册，在后台随机生成Dic
        $.ajax({
            url: 'Handler/Login.ashx',
            type: 'POST',
            data: { Register: 1, userid: email, userpwd: pwd, commonid: account },
            success: function (inf) {
                var info = inf.split(':')
                if (info[0] == "true") {

                    $("#lblShowID").text("Biz ID :" + info[1]);
                    $("#loginlogout").html("Logout");
                    $("#signupprofile").html("Profile");
                    //$("#BizID").text(info[1]);
                    var mydate = new Date();
                    $("#todayTime").text(mydate.getFullYear().toString() + "-" + mydate.getMonth().toString() + "-" + mydate.getDate().toString());
                    $("#bizmap").text("About bizmap.ca");

                    getclassid("singupsuccess");
                    toTop();


                    localStorage.setItem("account", email);

                    if (account) {
                        localStorage.setItem("account1", email + "￥" + account);  //保存email+临时用户
                    }
                    else {
                        localStorage.setItem("account1", email + "￥"); //保存email
                    }
                    localStorage.setItem("arrSaved", "");
                    localStorage.setItem("arrShared", "");
                    localStorage.setItem("userLevel", info[1]);

                }
                else {
                    //$("#showinfoId").height(50);
                    $("#lblshowinfo").html("<div style='margin-bottom:20px;'>" + info[1] + "</div>");
                    $("#btnsingup").html("Submit");
                }
            }
        });

    }
}
//#endregion

function toTop() {
    window.scrollTo(0, 0);
}

//#region 检查密码和再次输入的密码是否是一样的
function checkSame() {
    var txtsignuppwd = $("#txtsignuppwd").val();
    var txtconfirmpwd = $("#txtconfirmpwd").val();
    if (txtsignuppwd != txtconfirmpwd) {
        $("#lblshowinfo").text("Not the same password twice");
        return false;
    }
    else {
        if ($("#lblshowinfo").text() == "Not the same password twice") {
            $("#lblshowinfo").text("");
        }
    }
    return true;
}
//#endregion

//#region MainPage 按钮函数--跳转到主页面
function mainPage() {
    var id = $("#lblShowID").text().split(':');
    window.location.href = "http://umap.ca/index.htm";
}
//#endregion 

//#region login 按钮事件
function loginout() {
    $("#lblshowinfo").text("");
    var loginlogout = $("#loginlogout").text();
    if (loginlogout == "Login") {
        getclassid("login");     //函数，让该id的div进行显示，其他的都隐藏

        $("#bizmap").text("");
    } else if (loginlogout != "Retrieve Account") {
        $("#loginlogout").text("Login");
        $("#signupprofile").text("Signup");
        $("#lblShowID").text("");
        getclassid("login");     //函数，让该id的div进行显示，其他的都隐藏

    }
}
//#endregion

//#region 获取 class 为Table 的所有Id ,选择的Id内容进行显示，其他的进行隐藏
function getclassid(selectid) {
    $("#lblshowinfo").text("");

    if (selectid == "termsofuse" || selectid == "retrieveaccount" || selectid == "forgetpwdemail") {
        $("#alltou").hide();

    }
    else {
        $("#alltou").show();
    }
    if (selectid == "login" || selectid == "retrieveaccount" || selectid == "singupsuccess") {
        $("#bizmap").hide();

    } else {
        $("#bizmap").show();
    }
    var biz = $("[class='table']");
    for (var i = 0; i < biz.length; i++) {
        tid = biz[i].id;
        //debugger;
        if (tid == "signup") {
            $("#fgtpwdshowinfo").show();
        }
        else {
            $("#fgtpwdshowinfo").hide();
        }

        if (tid == selectid) {
            if (selectid == "secretquestion" || selectid == "termsofuse" || selectid == "retrieveaccount" || selectid == "forgetpwdemail" || selectid == "signup" || selectid == "changepassword" || selectid == "forgetpwdemailsuccess") {
                $("#cha").hide();
            }
            else {
                $("#cha").show();
            }
            $("#" + tid).show();
            //debugger;
            testclose();
        }
        else {
            $("#" + tid).hide();
        }
    }
}
//#endregion

//#region signupfile 和 profile 按钮事件
var signupfileidbefore = ""; //记录点击signup 之前显示的div的Id。
//signupfile 按钮事件
function signupfile() {
    $("#lblshowinfo").text("");
    var signupprofile = $("#signupprofile").text();
    if (signupprofile == "Profile") {

        var biz = $("[class='table']");

        //记录在跳转到profile页面之前的那个div的Id

        for (var i = 0; i < biz.length; i++) {
            tid = biz[i].id;
            var display = $("#" + tid).css("display");
            if (display == "block") {
                signupfileidbefore = tid;
            }
        }
        getclassid("profile");      //函数，让该id的div进行显示，其他的都隐藏
        $("#RetPt").val("");
        $("#bizmap").hide();
        //var id = $("#lblShowID").text().split(':');
        var id = localStorage.getItem("account");
        $.ajax({
            url: 'Handler/Login.ashx',
            type: 'post',
            data: { profile: id },
            success: function (inf) {
                var info = inf.split(':');
                if (info[0] == "true") {
                    $("#UserAccount").text(info[1]);
                    $("#UserID").text(info[2]);
                    $("#UserName").val(info[3]);
                }
            }
        });
        $("#cha").css('margin-top','40px');
    }
    else {
        if (signupprofile != "Change Password") {
            getclassid("signup");       //函数，让该id的div进行显示，其他的都隐藏
            $("#bizmap").text("About bizmap.ca");
            $("#txtsignupemail").val("");
            $("#txtsignuppwd").val("");
            $("#txtconfirmpwd").val("");
        }
    }
}
//#endregion


//#region Clickhere 跳转到密保单击事件
function clickHere() {
    getclassid("secretquestion");
    $("#DropDownList1").val("0");
    $("#DropDownList2").val("0");
    $("#txtareafrist").val("");
    $("#txtareascecond").val("");
}
//#endregion

//#region forgetpassword  跳转到通过邮件找到密码单击事件
function forgotpwd() {
    getclassid("forgetpwdemail");  //函数，让该id的div进行显示，其他的都隐藏
    $("#lookEmail").focus();
    $("#bizmap").text("");
    $("#forgetpwdinfo").html("<a style=' font-size:13px;'>A email will be sent to your registered email to help you reset your password.</a>");
    // $("#lblshowinfo")
}
//#endregion

//#region emailsend  通过email找回密码
var emailcount = 0;
function emailSend() {
    $("#lblshowinfo").text("");
    var lookEmail = $("#lookEmail").val();
    if (emailcount >= 10) {
        $("#lblshowinfo").text("Please try again later.");
        $("#lookEmail").attr("disabled", true);
        return false;
    }
    //检查email是否正确
    $.ajax({
        url: 'Handler/Login.ashx',
        type: 'POST',
        data: { IsEmail: 1, userid: lookEmail },
        success: function (inf) {
            if (inf == "false") {
                emailcount += 1;
                $("#lblshowinfo").html("<a style=' font-size:13px;'>The email or ID you entered does not match any account.Please try again.</a>");
                return false;
            }
            else {
                var cnum = ''; //给修改密码的地方进行加密
                for (var i = 0; i < 5; i++) {
                    cnum += Math.ceil(Math.random() * 9);
                }
                cnum += lookEmail;
                for (var i = 0; i < 5; i++) {
                    cnum += Math.ceil(Math.random() * 9);
                }
                var vercode = base64encode(cnum);
                $.ajax({
                    url: 'Handler/Login.ashx',
                    type: "post",
                    data: { Forget: 2, uid: lookEmail, verificationcode: vercode },
                    success: function (inf) {
                        var info = inf.split(':');
                        if (info[0] == "true") {
                            getclassid("forgetpwdemailsuccess");
                            $("#divsignupprofile").hide();
                            $("#divloginlogout").removeClass("divloginlogout").addClass("divlogin");
                            $("#emailsuccess").text(info[2]);
                        }
                        else {
                            $("#lblshowinfo").html(info[1]);
                        }
                    }
                });

                updateTimeLabel(3);
            }
        }
    });
}
//#endregion

//#region securequestion 单击事件
function securequestion() {
    $("#lblshowinfo").text("");
    $("#bizmap").text("");
    getclassid("forgetpwdquestion");  //函数，让该id的div进行显示，其他的都隐藏
    $("#lblshowinfo").html("<a style='font-size:13px'>Answer secret questions you set up before</a>");
}
//#endregion

//#region mainPage 单击事件
//mainPage 单击事件
function mainPageEmail() {
    var emailsuccess = $("#lblShowID").text().split(':');
    if (emailsuccess[1] != "") {
        //window.location.href = "index.htm?id=" + emailsuccess[1];
        window.location.href = "http://umap.ca/index.htm";
    }
}
//#endregion

//#region submit 单击事件  通过问题找回密码
//submit 单击事件  通过问题找回密码
function submit() {
    var emailquestion = $("#emailquestion").val();
    if (jQuery.trim(emailquestion) == "") {
        $("#lblshowinfo").text("Email or Biz ID can not be empty!");
        return false;
    }

    var txtaraanswer = $("#txtaraanswer").val();
    if (jQuery.trim(txtaraanswer) == "") {
        $("#lblshowinfo").text("Answer can not be empty!");
        return false;
    }
    //检查email是否正确
    $.ajax({
        url: 'Handler/Login.ashx',
        type: 'POST',
        data: { IsEmail: 1, userid: emailquestion },
        success: function (inf) {
            if (inf == "false") {
                $("#lblshowinfo").html("<a style=' font-size:13px;'>The email or ID you entered does not match any account.Please try again.</a>");
                return false;
            }
            else {
                //判断问题与答案是否正确
                var DropDownList3 = $("#DropDownList3 option:selected").val();
                $.ajax({
                    url: 'Handler/Login.ashx',
                    type: 'POST',
                    data: { Forget: 1, uid: emailquestion, ddl: DropDownList3, an: txtaraanswer },
                    success: function (inf) {
                        var info = inf.split(':');
                        if (info[0] == "false") {
                            $("#lblshowinfo").html("<a style=' font-size:13px;'>" + info[1] + "</a>");
                            return false;
                        }
                        else {
                            $("#lblshowinfo").text("Your password is " + info[1]);
                            return true;
                        }
                    }
                });
            }
        }
    });
    return false;
}
//#endregion

//#region 密保问题
//questionsubmit  密保问题
function questionsubmit() {
    var DropDownList1 = $("#DropDownList1 option:selected").val();
    var DropDownList2 = $("#DropDownList2 option:selected").val();
    var txtareafrist = $("#txtareafrist").val();
    var txtareascecond = $("#txtareascecond").val();
    var lblShowID = $("#lblShowID").text();
    if (jQuery.trim(txtareafrist) == "" && jQuery.trim(txtareascecond) == "") {
        $("#lblshowinfo").html("Your answer is not empty.");
        return false;
    }

    if (jQuery.trim(txtareafrist) != "") {
        if (txtareafrist.length < 3 || txtareafrist.length > 20) {
            $("#lblshowinfo").html("Your answer is too short.<br/>It must be between 3 to 20 digits.");
            return false;
        }
    }
    if (jQuery.trim(txtareascecond) != "") {
        if (txtareascecond.length < 3 || txtareascecond.length > 20) {
            $("#lblshowinfo").html("Your answer is too short.<br/>It must be between 3 to 20 digits.");
            return false;
        }
    }
    if (lblShowID != "") {
        var id = lblShowID.split(':');
        $.ajax({
            url: 'Handler/Login.ashx',
            type: 'POST',
            data: { secret: 1, uid: id[1], ddl1: DropDownList1, an1: txtareafrist, ddl2: DropDownList2, an2: txtareascecond },
            success: function (inf) {
                if (inf == "true") {
                    getclassid("secretquestionsucess"); //函数，让该id的div进行显示，其他的都隐藏
                }
                else {
                    $("#lblshowinfo").html("Due to network reasons, the failure to set!");
                }
            }
        });
    }
}
//#endregion

//#region  proFileSubmit 个人信息提交按钮
//proFileSubmit     个人信息提交按钮
function proFileSubmit() {
    var pwd = $("#RetPt").val();
    //判断密码的长度是否在6-20之间
    if (jQuery.trim(pwd) != "") {
        if (pwd.length < 6 || pwd.length > 20) {
            $("#lblshowinfo").text("Reset Password must be between 6 to 20 digits or Reset Password is empty.");
            return false;
        }
        else {
            for (var i = 0; i < pwd.length; i++) {
                if (!isNumber(pwd[i]) && !isLetter(pwd[i]) && !isCharacter(pwd[i])) {
                    $("#lblshowinfo").text("Contains illegal characters or Reset Password is empty.");
                    return false;
                }
            }
        }
    }
    var id = $("#UserID").text();
    var name = $("#UserName").val();
    $.ajax({
        url: 'Handler/Login.ashx',
        type: 'post',
        data: { profilesubmit: 1, userid: id, username: name, retpwd: pwd },
        success: function (inf) {
            if (inf == "true") {
                $("#lblshowinfo").text("Successful modification of personal information.");
            }
        }

    });
}
//#endregion

//#region 图片叉的事件
function comeBack(x) {
    try {
        //debugger;
        var excloseLR;
        excloseLR = closeLR;
        closeLR = "R";
        if (x == 1) {
            closeLR = "L";
        }
        if (excloseLR != closeLR) {
            config = storage.getItem("config");
            config = config.split(';');
            config[0] = "closeLR:" + closeLR;
            config = config.join(';');
            storage.setItem("config", config);
        }
    } catch (e) { catche(e); }

    var biz = $("[class='table']");
    var success = 0;
    for (var i = 0; i < biz.length; i++) {
        tid = biz[i].id;
        var display = $("#" + tid).css("display");
        if (display == "block") {
            switch (tid) {
                case "signup":
                    window.location.href = "http://umap.ca/index.htm";
                    break;
                case "login":
                    window.location.href = "http://umap.ca/index.htm";
                    break;
                case "forgetpwdemail":
                    //getclassid("login");
                    //loginout();
                    window.location.href = "http://umap.ca/index.htm";
                    break;
                case "forgetpwdquestion":
                    //getclassid("forgetpwdemail");
                    //forgotpwd();
                    window.location.href = "http://umap.ca/index.htm";
                    break;
                case "forgetpwdemailsuccess":
                    //getclassid("forgetpwdemail");
                    //forgotpwd();
                    window.location.href = "http://umap.ca/index.htm";
                    break;
                case "singupsuccess":
                    //getclassid("signup");
                    //loginout();
                    var id = $("#lblShowID").text().split(':');
                    //window.location.href = "index.htm?id=" + id[1];
                    window.location.href = "http://umap.ca/index.htm";
                    break;
                case "secretquestion":
                    //getclassid("singupsuccess");
                    var id = $("#lblShowID").text().split(':');
                    window.location.href = "http://umap.ca/index.htm";
                    break;
                case "secretquestionsucess":
                    //getclassid("secretquestion");
                    //clickHere();
                    var id = $("#lblShowID").text().split(':');
                    window.location.href = "http://umap.ca/index.htm";
                    break;
                case "profile":
                    //getclassid(signupfileidbefore);
                    var id = $("#lblShowID").text().split(':');
                    window.location.href = "http://umap.ca/index.htm";
                case "retrieveaccount":
                    window.location.href = "http://umap.ca/index.htm";
                    break;
                case "changepassword":
                    window.location.href = "http://umap.ca/index.htm";
                    //$("#changepwd").focus();
                    break;
                case "termsofuse":
                    //debugger;
                    $("#divloginlogout").hide();
                    $("#divsignupprofile").removeClass("divsignupprofile").addClass("divsignup");
                    getclassid("signup");
                    success = 1;

                    break;

            }
            if (success == 1) {
                break;
            }
        }
    }
}
//#endregion

//#region 找回账户
function RetrieveAccount(id, pwd) {
    var retrievepwd;
    var retrieveemail;
    if (id) {
        retrieveemail = id;
    } else {
        return false;
    }
    if (pwd) {
        retrievepwd = pwd;
    } else {
        return false;
    }

    $("#retaccount").html("loading...");
    $.ajax({
        url: 'Handler/Login.ashx',
        type: 'POST',
        data: { GetSavedShared: retrieveemail, RetrievePwd: retrievepwd },
        success: function (inf) {
            var info = inf.split('卍');
            if (info[0] == "false") {
                $("#retrieveshowinfo").text("Password is incorrect.");
                $("#retaccount").html("Submit");
            }
            else {
                localStorage.setItem("userLevel", info[3]);
                debugger;
                localStorage.setItem("arrSaved", info[1]);
                localStorage.setItem("arrShared", info[2]);
//                var account1 = localStorage.getItem("account1");
//                localStorage.setItem("account", retrieveemail);

//                if (account) {
//                    localStorage.setItem("account1", retrieveemail + "￥" + account);  //保存email+临时用户
//                }
//                else {
//                    localStorage.setItem("account1", retrieveemail + "￥"); //保存email
//                }
                setTimeout('window.location.href = "http://umap.ca/index.htm"', 1000);
                //                        window.location.href = "index.htm";
            }
        }
    });
}
//#endregion

//#region 密码修改
function changePwd() {
    $("#changepasswordid").html("Loading...");
    $("#lblchangpwd").blur();
    var pwd = $("#changepwd").val();

    //pwd不能为空
    if (jQuery.trim(pwd) == "") {
        $("#lblchangpwd").text("pwd can not be empty!");
        $("#changepasswordid").html("Submit");
        return false;
    }


    //判断密码的长度是否在6-20之间
    if (pwd.length < 6 || pwd.length > 20) {
        $("#lblchangpwd").text("Password must be between 6 to 20 digits.");
        $("#changepasswordid").html("Submit");
        return false;
    }
    else {
        for (var i = 0; i < pwd.length; i++) {
            if (!isNumber(pwd[i]) && !isLetter(pwd[i]) && !isCharacter(pwd[i])) {
                $("#lblchangpwd").text("Contains illegal characters");
                $("#changepasswordid").html("Submit");
                return false;
            }
        }
    }

    $.ajax({
        url: 'Handler/Login.ashx',
        type: 'POST',
        data: { email: accountemail, changepwd: pwd },
        success: function (inf) {
            if (inf == "true") {
                $("#lblchangpwd").text("Password changed successfully.");
                $("#changepasswordid").html("Submit");
            }
            else {
                $("#lblchangpwd").text("Password change fails.");
                $("#changepasswordid").html("Submit");
            }
        }
    });
}
//#endregion

function tou() {
    // getclassid("termsofuse");
}
var storage = window.localStorage;
var closeLR = "L"; //L:Left,  R:Right   [删除键在左边还是右边还是两边]

//setTimeout('testclose()', 500);
function testclose() {
    //debugger;
    if (storage && storage.getItem("config")) {
        try {
            config = storage.getItem("config");
            config = config.split(';');
            closeLR = config[0].split(':')[1];
            if (closeLR == "R") {
                $(".l").html('');
                $(".l").css({ 'background': 'transparent', 'box-shadow': 'none' });
                $(".r").html('<span class="chahao">×</span>');
                $(".r").css({ 'background': '-webkit-gradient(linear, 52% 100%, 53% 0%, from(#6A0000), to(#E27C7B))', 'box-shadow': '4px 2px 5px grey' });
            }
            else {
                $(".r").html('');
                $(".r").css({ 'background': 'transparent', 'box-shadow': 'none' });
                $(".l").html('<span class="chahao">×</span>');
                $(".l").css({ 'background': '-webkit-gradient(linear, 52% 100%, 53% 0%, from(#6A0000), to(#E27C7B))', 'box-shadow': '4px 2px 5px grey' });
            }
        } catch (e) { catche(e); }

    }
    else {
        var config = "closeLR:L;";
        storage.setItem("config", config);
        $(".r").html('');
        $(".r").css({ 'backgroundColor': 'transparent', 'box-shadow': 'none' });
        $(".l").html('<span class="chahao">×</span>');
        $(".l").css({ 'backgroundColor': '#AAA', 'box-shadow': '4px 2px 5px grey' });
    }
}
//#region 添加邀请者
function InviteSubmit() {
    $("#InviteEmail").blur();
    $("#InviteSubmit").html("Loading...");
    var inviteEmail = $("#InviteEmail").val();
    var account = localStorage.getItem("account");
    if (account == inviteEmail) {
        var fail = "<div style='font-family: Verdana;color:red;font-size: 16px;'>Users can not invite yourself.</div>";
        $("#divsingupOrInvite").html(fail);
        $("#InviteSubmit").html("Submit");
        return false;
    }
    $.ajax({
        url: 'Handler/Login.ashx',
        type: 'POST',
        data: { email: account, inviteesemail: inviteEmail },
        success: function (inf) {
            var info = inf.split(';');
            if (info[0] == "true") {
                $("#alltou").hide();
                var success = "<div style='font-family: Verdana;color:red;font-size: 16px;height:265px;margin-top:65px;'>" + info[1] + "</div>";
                $("#singupsuccess").html(success);
                setTimeout('window.location.href = "http://umap.ca/index.htm";', 5000);
            }
            else {
                var fail = "<div style='font-family: Verdana;color:red;font-size: 16px;'>" + info[1] + "</div>";
                $("#divsingupOrInvite").html(fail);
                $("#InviteSubmit").html("Submit");
            }
        }
    });

}
//#endregion

//#region 跳过添加邀请者
function InvitePass() {
    window.location.href = "http://umap.ca/index.htm";
}
//#endregion
