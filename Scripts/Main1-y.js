//#region 定义变量 
//#region 用户名
var dic = 0;
//#endregion   
//#region 空白字符串匹配 
//  \s匹配一个空白字符 /g是全文查找所有匹配 
var reg = /\s/g;
//#endregion
//#region 两个以上的逗号[用户输入]
var re = /,{2,}|\||\;|\:/;
var re1 = /,{2,}|\;{1,}|￥{1,}|:{1,}|\<{1,}|\>{1,}|\/{1,}|\:| of /g;
//var re1 = /,{2,}|\|{1,}|\;{1,}|￥{1,}|:{1,}|\<{1,}|\>{1,}|\/{1,}|\:| of /g;
//#endregion
//#region 动态菜单
var menuList;
//#endregion    
//#region 书签集合
var arrBookmarkName = [];
//#endregion 
//#region 书签信息集合
var arrBookmark = [[], [], []];
//#endregion 
//#region 历史记录
var verHistory = '';
//#endregion 
//#region 是否在编辑状态
var editSwitch = "";
//#endregion 
//#region 书签号       用于书签之间的切换
var BMNum;
//#endregion 
//#region 菜单修改开关
var menuChange = "";
//#endregion 
//#region 书签修改开关
var bmNameChange = "";
//#endregion 
//#region 全局关键字
var keywords = 'none';
//#endregion 
//#region 新关键字
var newkw = '';
//#endregion 
//#region 判断是否搜索
var search = false;
//#endregion
var storage = window.localStorage;
var inputSwitch = false; //输入自定义信息开关

//GPS状态[0:机器获取，1:手动定位（cross），2:自动定位（map center）]
var gpsState = 2;

//#endregion

//#region 点击确定【登录】
/* 已过时
function ok() {
$("#lblMsg").html("");
var id = $.trim($("#txtid").val());
var pwd = $.trim($("#txtpwd").val());
var isrem;
if (document.getElementById("chkre").checked == true) {
isrem = true;
}
else {
isrem = false
};
//判断是否为空
if (id == "" || pwd == "") {
alert("please input your id and password");
$("#txtid").val("");
$("#txtpwd").val("");
return false;
}
else {//非空
if (id.length < 5) {
alert("The length of email name must be greater than 5");
return false;
}
else if (pwd.length < 6) {
alert('Password length must be greater than six.');
return false;
}
else {
$.ajax({
url: 'Handler/Login.ashx',
type: 'POST',
data: { login: id, password: pwd, isreme: isrem },
success: function (inf) {
var info = inf.split('|');
if (info[0] == "true") {
dic = info[6];
$("#dicname").val(info[6]);
//$("#lblUserName").html(info[1]);
$("#lblOut").html("Logout");
$("#lblSP").html("Profile");
$("#txtFirstName").val(info[2]);
$("#txtLastName").val(info[3]);
$("#txtanswerset").val(info[4]);
$("#ddlanswerset").val(info[5]);
$("#txtDicName").val(info[6]);
$("#bid").html("Biz ID:" + dic);
$("#bid").show();
eMsg(0);
setTimeout('$("#login").slideUp()', 1000);
for (var i = 0; i < 3; i++) {
document.getElementById("bookMark" + i).style.background = "-webkit-gradient(linear, left top,right top, from(#ffffc0),color-stop(0.5, #ffffee),to(#ffffcc))";
document.getElementById("bookMark" + i).style.background = "-moz-linear-gradient(left,#ffffc0, #ffffee, #ffffcc)";
}
HasLogin(info[6]);
$("#Lo").hide();
setTimeout('testHeight();', 500);
return true;
}
else {
$("#lblMsg").html("Login failed !<br /> please input your id and password.");
$("#lblMsg").css('color', 'red');
return false;
}
}
});
}
}
if (search) {
setTimeout('reSearch();', 1000);
}
}
*/
//#endregion

//#region 注销   已注释，第二版开放
/*
function logout() {
$("#dicname").val("");
//id
dic = 0;
//menu
defaultArrlist();
listMenu(arrList);
//bookmark
arrBookmark = [];
$("#divBM,#bookMarks,#jiantou").hide();
$("#bid").hide();
//history
verHistory = "";
//dicmap title
//$("#lblUserName").html("Welcome: Tourists");
$("#lblOut").html("Login");
$("#lblSP").html("Sign up");
$("#addGroup").hide(); //#editDone,
$("#Lo").show();
//setTimeout('$("#function").slideUp();',200);
$('#dicmap').click();
}
*/
//#endregion

function search1() {
    //debugger;
    $("#keywords2").blur();
    var kw2 = $.trim($("#keywords2").val());
    if (editSwitch == "") {//    if ($.trim(kw).length > 1) { && $.trim(kw2).length > 1
        click_search(kw2, null, null, null, 2);
        /*var oaa = /^open(|a|an)(account$)/; //【Open an account、Open a account 或 Open account】
        // var tkw = kw2.split(" ");
        //tkw = tkw[0] + tkw[1] + tkw[2];
        //testAAccount(msg)
        //        if (oaa.test(tkw.toLowerCase())) {//如果是oaa且注册未失败并且次数少于七次
        if (testAAccount(kw2.toLowerCase())) {//如果是oaa且注册未失败并且次数少于七次
        if (!(storage.getItem("oaatime") == new Date().getDate())) {
        storage.removeItem("oaa");
        storage.setItem("oaa", '0');
        }
        if (storage.getItem("oaa") && $.trim(storage.getItem("oaa")) != "0") { //已有注册记录
        if ($.trim(storage.getItem("oaa")) < 7) {
        promptAccount(1);
        }
        else {
        alert("Please register in another day");
        }
        }
        else {//无注册记录 
        storage.removeItem("oaa");
        storage.setItem("oaa", '0');
        promptAccount();
        }
        }
        else {
        //#endregion
        try {
        //debugger;
        homeType = false;


        $("#zoom12 img").attr('src', 'images/zoomSearch.png');



        //                if (((kw2.toLowerCase() == keywords.toLowerCase()) && (gps == exgps) && gpschange != 'yes')) {
        //                    click_map();
        //                    /* if (fir) {
        //                    click_map();
        //                    }
        //                    else {
        //                    hisw = true;
        //                    $("#account,#menu,#main,#tb_search,#divBM,#menuLists,#saved,#function,#cpright").hide();
        //                    $("#listBottom").height(182 - $("#container").height());
        //                    $("#map,#list,#listBottom,#container").show();
        //                    testmenu();
        //                    //点击搜索键地图异常
        //                    $("#map").css('-webkit-transform', 'scale(1)');
        //                    $("#map").animate({ left: "0px", top: "0px" }, 500);
        //                    }
        //                    /
        //                }
        //                else {
        //                    gpschange = "";
        //                    click_search(kw2, null, null, null, 2);
        //                    //$("#tb_search").hide();
        //                }
        } catch (e) {
        alert(e.Message);
        }
        }*/
    }
}

function testAAccount(msg) {
    //open + account, get + account, retrieve + account
    msg = $.trim(msg).split(' ');
    if (msg.length < 4) {
        var arrinfo = 0;
        for (var i = 0; i < msg.length; i++) {
            j = msg[i];
            if (j == 'open' || j == 'get' || j == 'retrieve') {
                arrinfo++;
            }
            else if (j == 'account') {
                arrinfo++;
            }
        }
        if (arrinfo == 2) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
//debugger
//storage.removeItem("account");
//storage.setItem("account", "997994358@qq.com");
//function debug() {
//    debugger;
//}
//#region 文档的就绪事件
//var tg;
var exgps = "";
var dicsw = true;
var CanSearch = true;
$(document).ready(function () {
    //#region 点击文本框事件   [点击文本框，清空提示信息]     
    $('input[type=email],input[type=password]').click(function () {
        $("#lblMsg").html("");
    });
    //#endregion
    //#region 跳转至注册界面 已注释，第二版开放
    /* $('#Register').click(function () {
    self.location = "Login.aspx";
    });*/
    //#endregion
    //#region 游客登陆【登出+展示】 已注释，第二版开放
    /*
    $('#tourists').click(function () {
    //logout();
    $("#login").slideUp();
    });*/
    //#endregion
    //#region 找回密码快捷方式   已注释，第二版开放
    /*
    $('#RetrievePassword').click(function () {
    self.location = "Login.aspx?RP=1";
    });*/
    //#endregion
    //#region 登录/登出   已注释，第二版开放
    /*$('#lblOut').click(function () {
    Loginout();
    });
    $("#Lo").click(function () {
    Loginout();
    });*/
    //#endregion
    //#region 点击更新个人信息lblUserName
    /*$('#lblSP').click(function () {
    if ($.trim($("#lblSP").html()) == "Sign up") {
    self.location = "Login.aspx?type=signup";
    }
    else {
    self.location = "Login.aspx?type=profile&bizid=" + dic;
    }
    });*/
    //#endregion
    //#region 点击展示/关闭Dic菜单

    $('#dicmap').click(function () {
        jumpTo(0);
        //简化
        /* if (dicsw) {
        //$("#function").show(0);
        //$("#bookMarks").animate({ top: $("#function").height() + $("#getInfo").height() - 49 + 88 });
        //$("#jiantou").animate({ top: $("#function").height() - 337 }); //-$("#getInfo").height()+49 -
        dicsw = false;
        }
        else {
        //$("#function").hide(0);
        //$("#bookMarks").animate({ top: 88 + $("#getInfo").height() - 49 });
        //$("#jiantou").animate({ top: -337 });
        dicsw = true;
        }*/
        dicsw = dicsw ? false : true;
        testHeight();
    });
    //#endregion

    //    $("#list").mousemove(function () {
    //        hideisearch(2);
    //    });
    //document.getElementById("list").addEventListener("touchstart", hideisearch(2), false);

    //#region 展示/关闭搜索功能及相关
    $('#buttonSearch').click(function () {
        if (CanSearch) {//$.trim($("#keywords2").val()) != "" &&
            search1();
            CanSearch = false;
            setTimeout('CanSearch=true', 100);
        }
    });
    //#endregion
    //#region 点击DIC左侧的Map按钮展示地图
    //    $('#buttonMap').click(function () {
    //        click_map();
    //    });
    //#endregion
    //#region 获取地理位置
    //    $('#lblChLo').click(function () {
    //        initialize();
    //    });
    //var tg = setInterval('testgps()', 500);
    //#endregion 
    $("#keywords2").focus(function () {
        if (!hisw) {
            //#region 后续版本中开发
            /*if (verHistory.length > 1) {
            $("#tb_search").show();
            }*/
            //#endregion
            window.scrollTo(0, 0);
        }
    });

    /*$("#kw2").click(function () {
    $("#keywords2").focus();
    window.scrollTo(0, 0);
    });*/

    /*$("#keywords2").blur(function () {
    // $("#tb_search").hide();
    });*/
    $(".chacha").click(function () {
        $("#keywords2").val("");
        $(".chacha").hide();
        $("#keywords2").focus();
        //$("#tb_search").hide();
        window.scrollTo(0, 0);
    });


    //var tp = setInterval('toTop()', 50);

    //#region 商家认领
    //    $('#Claim').click(function () {
    //        alert('此功能还在开发中，敬请期待……');
    //    });
    //#endregion

    //    $("form").submit(function () {
    //        try {
    //            if ($.trim($("#keywords2").val()) != "") {
    //                //alert($("#keywords2").val());
    //                //setTimeout('search1()', 1000);
    //                setTimeout('search1()', 100);
    //                /*$.ajax({
    //                url: 'Handler/Login.ashx',
    //                type: 'POST',
    //                data: {},
    //                success: function () {
    //                //setTimeout('search1()', 100);
    //                return true;
    //                // setTimeout("$('#buttonSearch').click()", 1000);
    //                }
    //                });*/
    //            }
    //        } catch (e) {
    //            alert(e.Message);
    //        }
    //        return false;
    //    });



    //        document.querySelector("#menu").addEventListener('touchstart', function (e) {
    //       $("#function").hide();
    //    });
    //    document.querySelector("#list").addEventListener('touchstart', function (e) {
    //        hideisearch(2);
    //        setTimeout('$("#tools").height(0);$("#tool,#tools").hide();', 1);
    //    });
    //    document.querySelector("#list").addEventListener('touchmove', function (e) {
    //        hideisearch(2);
    //        setTimeout('$("#tools").height(0);$("#tool,#tools").hide();', 1);
    //    });


    // setTimeout('testLoad()', 5000);
    //#endregion
});

$(function () {
    $("form").submit(function () { return false; }); // 禁用 form 提交，页面不会跳转
    $("form input[type='submit']").click(function () {
        try {
            if ($.trim($("#keywords2").val()) != "" && CanSearch) {
                //alert(234);
                //CanSearch = false;
                $('#buttonSearch').click();
                //                $.ajax({
                //                    url: 'Handler/Login.ashx',
                //                    type: 'POST',
                //                    data: {  },//pause: 5000
                //                    success: function () {
                //                        //debugger;
                //                       
                //                    }
                //                });
                //setTimeout(function () { $('#buttonSearch').click(); }, 500);
                // $('#buttonSearch').click();
                //setTimeout('search1();CanSearch=true', 100);
            }
        } catch (e) {
            //alert(e.Line);
        }
        return false;
    });
});
//#region 函数工具箱
//#region 动态改变菜单框的高度以适应屏幕
function testHeight() {
    $("#menu").height(367);
    if ($("#function").is(":visible")) {
        $("#menu").height($("#menu").height() - $("#function").height()); // -$("#getInfo").height()+49
    }
    //if ($("#saved").is(":visible")) {
    $("#menu").height($("#menu").height() - $("#saved").height());
    //}
    window.scrollTo(0, 0);
}
//#endregion
//#region 在搜索结果界面置顶         toTop() 
function toTop() {
    try {
        //if (hisw && !inputSwitch) {
        if (!inputSwitch) {
            window.scrollTo(0, 0);
            // $('html, body').animate({ scrollTop: 0 }, 'slow'); 
            //$('body').animate({ scrollTop: 0 }, 1000);
            //setTimeout('alert(234)', 1000);
        }
    } catch (e) {

    }
}
//#endregion
//#region 在搜索结果界面显隐搜索按钮
function hideisearch(x) {
    if ((x > 1) && (document.getElementById('isearch') != null)) {
        document.getElementById('centerMap').style.opacity = '0';
        document.getElementById('isearch').style.opacity = '0';
        clearInterval(cb);
    }
    else if (document.getElementById('isearch') != null) {
        //document.getElementById('centerMap').style.opacity = '1';
        document.getElementById('isearch').style.opacity = '1';
    }
}
//#endregion
//#region 在搜索结果列表置顶【Top】
/*function top() {
$flip.utils.scrollToY1(0);
}*/
$("#list-top").live('click', function () {
    setTimeout("$('#list').touchScroll('setPosition', 0)", 200);
    //$flip.utils.scrollToY1(0);
});
//#endregion
//#region buttonSearch
function buttonSearch() {
    if (editSwitch == "") {
        window.scrollTo(0, 0);
        /*$("#bookMarks").hide(200);
        for (var i = 0; i < 3; i++) {
        document.getElementById("bookMark" + i).style.background = "-webkit-gradient(linear, left top,right top, from(#ffffc0),color-stop(0.5, #ffffee),to(#ffffcc))";
        document.getElementById("bookMark" + i).style.background = "-moz-linear-gradient(left,#ffffc0, #ffffee, #ffffcc)";
        }
        $("#tb_search").hide(0);
        showHistory();*/
    }
}
//#endregion
//#region 在搜索结果界面置顶
function kw2change() {
    try {
        //$("#keywords2").height(28);
        //$("#keywords2").width('82%');
        if (!hisw && si1077) {
            var kw2 = $.trim($("#keywords2").val());
            if (kw2 != "" && kw2.length > 0) {
                $(".chacha").show();
            }
            else {
                $(".chacha").hide();
            }
        }
    } catch (e) {
        catche(e);
    }

}
//#endregion
//#region 在主界面测试GPS有无【已过期】
//function testgps() {
//    if (gps.length > 1) {
//        $("#lblIsLo").html("On");
//        $("#lblChLo").html("Update");
//        clearInterval(tg);
//    }
//}
//#endregion
//#region 在主界面控制编辑提示信息显隐
function eMsg(x) {
    if (x > 0) {
        if (!$("#function").is(":visible")) {
            $('#dicmap').click();
        }
        //        $('#dicmap').click();
        //        $("#function").show(0);
        $("#editmsg").show();
    }
    else {
        $("#editmsg").hide();
        if ($("#function").is(":visible")) {
            $('#dicmap').click();
        }
    }
}
//#endregion
var testload = false;
function testLoad() {
    if (!testload) {
        $("#canva,#canvb").show();
    }
}
//#endregion
var emailregs = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//#region promptAccount()
function promptAccount(x) {
    var a;
    if (x == "2") {
        // alert('please input your E-mail Address');
        a = prompt("Email address not found, try again:", "");
    }
    else {
        //alert('please input your E-mail Address');
        a = prompt("email address :", "");
    }
    //a = prompt("");
    if (a != "" && a != null) {
        var email = a;
        if (emailregs.test(email)) {
            $.ajax({
                url: 'Handler/Login.ashx',
                type: 'POST',
                data: { IsMyEmail: email },
                success: function (info) {
                    //debugger;
                    if (info != "notexist") {
                        storage.setItem("oaa", '0');
                        type = '';
                        info = $.trim(info);
                        if (info == 'emailback') { type = 'retrieveaccount'; }
                        if (info == 'register') { type = 'signup'; }
                        self.location = "Login.aspx?type=" + type + "&email=" + email;
                    }
                    else {
                        //alert('E-mail is not exist !');
                        var count = $.trim(storage.getItem("oaa"));
                        if (isNaN(count)) {
                            count = 0;
                        }
                        storage.removeItem("oaa");
                        storage.setItem("oaa", ++count);
                        var date = new Date().getDate();
                        storage.setItem("oaatime", date);
                        promptAccount(2);
                    }
                }
            });
        } else {
            var count = $.trim(storage.getItem("oaa"));
            if (isNaN(count)) {
                count = 0;
            }
            storage.removeItem("oaa");
            storage.setItem("oaa", ++count);
            var date = new Date().getDate();
            storage.setItem("oaatime", date);
            promptAccount(2);
            //$("form").submit();
        }
    }
}
//#endregion
//#region  Loginout()
/*
function Loginout() {
window.scrollTo(0, 0);
var islo = $("#lblOut").html();
if (islo == "Login") {//登录
self.location = "Login.aspx?type=login";
/* $.ajax({
url: 'Handler/Login.ashx',
type: 'POST',
data: { useridcookie: 1 },
success: function (inf) {
var info = inf.split(':');
if (info[0] == "true") {
$("#txtid").val(info[1]);
$("#txtpwd").val(info[2]);
$("#chkre").attr("checked", true); //打勾
$("#login").slideToggle();
}
else {
$("#txtid").val("");
$("#txtpwd").val("");
$("#chk1").attr("checked", ''); //不打勾
$("#login").slideToggle();
}
}

});* /
}
else {
logout();
}
}*/
//#endregion

//#region 展示个人信息界面 
/*
function Update() {
//用层的切换来实现【如果用户已经登陆则】
var loginmsg = $("#lblOut").html();
//dic!=0保证用户完全退出，防止用户修改页面代码造成的bug
if ((loginmsg == "Logout") && (dic != 0)) {
$("#main,#menuLists,#update,#divBM").slideToggle(0);
$("#tb_search,#bookMarks,#login").hide(0);
//书签颜色
for (var i = 0; i < 3; i++) {
document.getElementById("bookMark" + i).style.background = "-webkit-gradient(linear, left top,right top, from(#ffffc0),color-stop(0.5, #ffffee),to(#ffffcc))";
document.getElementById("bookMark" + i).style.background = "-moz-linear-gradient(left,#ffffc0, #ffffee, #ffffcc)";
}
if (editSwitch == "1") {
$("#addGroup").slideToggle("fast");
}
}
}
*/
//#endregion

//合并
//var strarrList = arrList.join(";");
//分离
//arrList = menu1.split(";");

//#region 1.默认菜单
//#region 1.1默认菜单
var arrList;
function defaultArrlist() {
    arrList = [];
    //arrList = new Array();
    /*/如果有数据，则从
    if ((storage) && (storage.getItem("arrList"))) {
    arrList = storage.getItem("arrList").split(";");
    }
    else {
    arrList[0] = "";
    arrList[1] = "Restaurants,Restaurants (LLBO),Buffet,Sushi,Seafood,Chinese Restaurant,Italian Restaurant,Swiss Chalet,Mandarin";
    arrList[2] = "Fast Food,Pizza,Mcdonald's Restaurant,Burger King,KFC,Bakery";
    arrList[3] = "Coffee & Tea,Tim Hortons,Starbucks,Second Cup,Coffee Time";
    //arrList[4] = "Bars & Pubs";
    arrList[4] = "Bars";

    arrList[5] = "Bank,Scotia Bank,RBC,CIBC,TD Bank,BMO Bank,HSBC";
    arrList[6] = "ATM,Bank ATM,Drive Thru ATM";
    arrList[7] = "Pharmacy,Shoppers Drug Mart,Pharma Plus,Walmart Pharmacy,Main Drug Mart,Costco Pharmacy,Nofrill Pharmacy";
    arrList[8] = "Florist";

    // arrList[9] = "Hospital & Clinics,Walk-in Clinic,Hospital,Clinics, Pet Clinic";
    arrList[9] = "Hospital,Walk-in Clinic,Clinics, Pet Clinic";
    arrList[10] = "Auto Services,Midas,Active Green Ross Tire,Good Year,Mr Lube,Canadian Tire Auto Service";
    arrList[11] = "Gas Station,Petro-Canada,Esso,Shell,Huskey";
    arrList[12] = "Liquor,Beer,Wine,LCBO,the Beer Store";

    //======
    var strarrList = arrList.join(";");
    storage.setItem("arrList", strarrList);
    //======
    }
    */

    arrList[0] = "";
    arrList[1] = "Restaurant,Restaurant (LLBO),Bars & Pubs,Buffet,Sushi";
    arrList[2] = "Fast Food,Pizza,Mcdonald#39#s Restaurant,Burger King,KFC,Bakery";
    arrList[3] = "Coffee & Tea,Tim Hortons,Starbucks,Second Cup,Coffee Time";
    //arrList[4] = "Bars & Pubs";
    arrList[4] = "Bars";

    arrList[5] = "Bank,Scotia Bank,RBC,CIBC,TD Bank,BMO Bank,HSBC";
    arrList[6] = "ATM,Bank ATM,Drive Thru ATM";
    arrList[7] = "Pharmacy,Shoppers Drug Mart,Pharma Plus,Walmart Pharmacy,Main Drug Mart,Costco Pharmacy,Nofrill Pharmacy";
    arrList[8] = "Florist";

    // arrList[9] = "Hospital & Clinics,Walk-in Clinic,Hospital,Clinics, Pet Clinic";
    arrList[9] = "Hospital,Walk-in Clinic,Clinics, Pet Clinic";
    arrList[10] = "Auto Services,Midas Auto Serivces,Active Green Ross Tire,Good Year,Mr Lube,Canadian Tire Auto Service";
    arrList[11] = "Gas Station,Petro-Canada,ESSO Gas Station,Shell Gas Station,Huskey";
    arrList[12] = "Liquor,Beer,Wine,LCBO,the Beer Store";

}
//storage.removeItem("arrList");
function defaultArrlist1() {
    //debugger;
    arrList = [];
    //arrList = new Array();
    //如果有数据，则从
    if ((storage) && (storage.getItem("arrList")) && storage.getItem("coreVersion") == 5) {
        //
        arrList = storage.getItem("arrList");
        //arrList = ";History;";
        if (arrList.indexOf(';History') == -1) {
            if (arrList.indexOf(";Nearby") != -1) {
                //,nearby ...
                arrList = ";History;Nearby" + arrList.split(";Nearby")[1];
            }
            else {
                //,...
                arrList = ";History;Nearby" + arrList;
            }
        }
        //如果有历史没有nearby
        else if (arrList.indexOf(";Nearby") == -1) {
            arrList = ";History;Nearby" + arrList.split(";History")[1];
        }

        //  storage.setItem("arrList", arrList);
        arrList = arrList.split(";");
        //;ATM,A1,A2,;Bank,b1
    }
    else {
        var i = 0;
        arrList[i++] = "";
        arrList[i++] = "History";
        arrList[i++] = "Nearby";
        arrList[i++] = "Restaurant,Restaurant (LLBO),Bar & Pub,Buffet,Sushi";
        arrList[i++] = "Coffee & Tea,Tim Hortons, Starbucks Coffee, Second Cup, Coffee Time, Country Style, Timothy#39#s Coffee ";
        arrList[i++] = "Fast Food,Pizza,McDonald#39#s Restaurant,Burger King,KFC,Wendy#39#s Restaurant";
        //arrList[i++] = "Bars";

        arrList[i++] = "Bank,Scotia Bank,BMO Bank,Royal Bank,TD Bank,HSBC Bank,CIBC Bank";
        arrList[i++] = "ATM,Bank ATM";
        arrList[i++] = "Gas Station,Petro-Canada Gas Station,ESSO Gas Station,Shell Gas Station";
        arrList[i++] = "Pharmacy,Shoppers Drug Mart,Pharma Plus";

        arrList[i++] = "Convenience Store";
        arrList[i++] = "Bar & Pub";
        arrList[i++] = "Supermarket,Wal-Mart, Loblaw, nofrills, Food Basics, Longo#39#s";
        arrList[i++] = "Post Office";
        arrList[i++] = "Flower";
        arrList[i++] = "Salon,Hair Salon, Nail Salon, Tanning Salon, Beauty Salon";

        // arrList[9] = "Hospital & Clinics,Walk-in Clinic,Hospital,Clinics, Pet Clinic";
        arrList[i++] = "Hospital,Clinic,Walk in Clinic,Animal Hospital";
        arrList[i++] = "Auto Service,Canadian Tire Auto Service,Midas Auto Service,Mr. Lube,Active Green + Ross ";
        arrList[i++] = "Liquor,LCBO,The Beer Store";

        //======
        var strarrList = arrList.join(";");
        storage.setItem("arrList", strarrList);
        //======
        storage.setItem("coreVersion", 5);
    }
    //alert(arrList);
    /*
    var t1 = $.trim(arrList[1]);
    var th = false;
    if (t1 == 'Nearby') {
    th = true;
    }
    // debugger;
    if (storage.getItem("account") != null && storage.getItem("account") != "" && storage.getItem("account").indexOf('@') != -1) {
    if (!th) {
    t1 = 'Nearby';
    arrList.splice(2, 0, t1);
    }
    }
    else {
    if (th) {
    arrList.splice(1, 1);
    }
    }
    var strarrList = arrList.join(";");
    storage.setItem("arrList", strarrList);
    //======
    storage.setItem("coreVersion", 4);*/
    /*var th = false;
    if (t1 == 'History') {
    th = true;
    }
    if (!!storage.getItem("History")) {
    if (!th) {
    t1 = 'History';
    arrList.splice(1, 0, t1);
    }
    }*/
}

//#endregion
//#region 1.2生成默认菜单
defaultArrlist1();
//#endregion
//#endregion

//是否处于输入状态
var isinput = false;
function inputtxt(x) {
    inputSwitch = x ? false : true;
}
//header置顶，列表滚动 【core】

//2012.04.17
//var $flip;
//var movingTest = false;
//window.iPhone = window.iPhone || {};
//function flip() {
//    $flip = this;
//    $flip.vars = {};
//    $flip.utils = {
//        addClass: function (element, elClass) {
//            var curr = element.className;
//            if (!new RegExp(("(^|\\s)" + elClass + "(\\s|$)"), "i").test(curr)) {
//                element.className = curr + ((curr.length > 0) ? " " : "") + elClass;
//            }
//            return element;
//        },
//        removeClass: function (element, elClass) {
//            if (elClass) {
//                element.className = element.className.replace(elClass, "");
//            } else {
//                element.className = "";
//                element.removeAttribute("class");
//            }
//            return element;
//        },
//        hideURLBar: function () {
//            setTimeout(function () {
//                window.scrollTo(0, 0);
//            }, 0);
//        },
//        updateOrientation: function () {
//            var orientation = window.orientation;
//            switch (orientation) {
//                case 90:
//                case -90:
//                    document.body.setAttribute("orient", "landscape");
//                    break;
//                default:
//                    document.body.setAttribute("orient", "portrait");
//                    break;
//            }
//        },
//        getTranslateX: function (element) {
//            var transform = element.style.webkitTransform;
//            var translateX;
//            if (transform && transform != "") {
//                //alert(transform);
//                var Ttx;
//                try {
//                    Ttx = parseFloat((/translateX\((\-?.*)px\)/).exec(transform)[1]);
//                } catch (e) {

//                }
//                if (!!Ttx) {
//                    translateX = Ttx;
//                }
//            }
//            return translateX;
//        },
//        setTranslateX: function (element, value) {
//            element.style.webkitTransform = "translateX(" + value + "px)";
//        },

//        scrollToX: function (y, x) {

//            try {
//                if (!x) {
//                    x = 0;
//                }
//                var content;
//                var ms = 350;
//                content = document.querySelector("#menu1");
//                var top = $flip.utils.getTranslateX(content);
//                var currentTop = (top < 0) ? -(top) : top;
//                var chunks = (currentTop / 100);
//                var totalTime = (ms * chunks);
//                totalTime = (totalTime > 750) ? 750 : totalTime;
//                content.style.webkitTransition = "-webkit-transform " + totalTime + "ms cubic-bezier(0.1, 0.25, 0.1, 1.0)";
//                $flip.utils.setTranslateX(content, y);
//                setTimeout(function () {
//                    content.style.webkitTransition = "none";
//                }, totalTime);


//            } catch (e) {
//                //alert(e.Line + "*912*" + e.Message);
//            }
//        },

//        scrollToY1: function (y) {
//            //document.querySelector("#list").offsetHeight=1084
//            // y  is location
//            //ms是单位
//            var ms = 350;
//            var content = document.querySelector("#page1");
//            //top获取列表的Y值
//            var top = $flip.utils.getTranslateY(content);
//            var currentTop = (top < 0) ? -(top) : top;
//            var chunks = (currentTop / 100);
//            var totalTime = (ms * chunks);
//            totalTime = (totalTime > 750) ? 750 : totalTime;
//            //   content.style.webkitTransition = "-webkit-transform   " + totalTime + " cubic-bezier(1,1,1,1) "; //ease,linear,ease-in,
//            content.style.webkitTransition = "-webkit-transform  " + totalTime + "ms cubic-bezier(0.1, 0.25, 0.1, 1.0)";
//            $flip.utils.setTranslateY(content, y);
//            //            setTimeout(function () {
//            //                content.style.webkitTransition = "none";
//            //            }, totalTime);

//        }
//        /*     scrollToY: function (y, x) {
//        if (!x) {
//        x = 0;
//        }
//        //#region 防止动态更新菜单时样式出错
//        if (!hisw) {
//        $("#container").hide();
//        }
//        //#endregion
//        var content;
//        if (!isinput) {
//        //if ((editSwitch != "1") || ((editSwitch == "1") && (direction == "down"))) {
//        //$("#bookMark0").html(y);
//        var ms = 350;
//        content = document.querySelector("#menu1");
//        var top = $flip.utils.getTranslateY(content);
//        var currentTop = (top < 0) ? -(top) : top;
//        var chunks = (currentTop / 100);
//        var totalTime = (ms * chunks);
//        totalTime = (totalTime > 750) ? 750 : totalTime;
//        content.style.webkitTransition = "-webkit-transform " + totalTime + "ms cubic-bezier(0.1, 0.25, 0.1, 1.0)";
//        $flip.utils.setTranslateY(content, y);
//        setTimeout(function () {
//        content.style.webkitTransition = "none";
//        }, totalTime);
//        }
//        else {
//        //             $flip.utils.setTranslateY(content, y);
//        //             setTimeout(function () {
//        //                    content.style.webkitTransition = "none";
//        //                }, totalTime);
//        }
//        },

//        scrollToY1: function (y) {
//        //document.querySelector("#list").offsetHeight=1084
//        // y  is location
//        //ms是单位
//        var ms = 350;
//        var content = document.querySelector("#list");
//        //top获取列表的Y值
//        var top = $flip.utils.getTranslateY(content);
//        var currentTop = (top < 0) ? -(top) : top;
//        var chunks = (currentTop / 100);
//        var totalTime = (ms * chunks);
//        totalTime = (totalTime > 750) ? 750 : totalTime;
//        //   content.style.webkitTransition = "-webkit-transform   " + totalTime + " cubic-bezier(1,1,1,1) "; //ease,linear,ease-in,
//        content.style.webkitTransition = "-webkit-transform  " + totalTime + "ms cubic-bezier(0.1, 0.25, 0.1, 1.0)";
//        $flip.utils.setTranslateY(content, y);
//        //            setTimeout(function () {
//        //                content.style.webkitTransition = "none";
//        //            }, totalTime);

//        }
//        ,
//        scrollToY2: function (y) {
//        //if (!inputSwitch){
//        // y  is location
//        //ms是单位
//        var ms = 350;
//        var content = document.querySelector("#si");
//        //top获取列表的Y值
//        var top = $flip.utils.getTranslateY(content);
//        var currentTop = (top < 0) ? -(top) : top;
//        var chunks = (currentTop / 100);
//        var totalTime = (ms * chunks);
//        totalTime = (totalTime > 750) ? 750 : totalTime;
//        //      content.style.webkitTransition = "-webkit-transform   " + totalTime + " cubic-bezier(1,1,1,1) "; //ease,linear,ease-in,
//        content.style.webkitTransition = "-webkit-transform  " + totalTime + "ms cubic-bezier(0.1, 0.25, 0.1, 1.0)";
//        $flip.utils.setTranslateY(content, y);
//        setTimeout(function () {
//        content.style.webkitTransition = "none";
//        }, totalTime);

//        },
//        scrollToY3: function (y) {
//        //ms是单位
//        var ms = 350;
//        var content = document.querySelector("#page3_detail");
//        //top获取列表的Y值
//        var top = $flip.utils.getTranslateY(content);
//        var currentTop = (top < 0) ? -(top) : top;
//        var chunks = (currentTop / 100);
//        var totalTime = (ms * chunks);
//        totalTime = (totalTime > 750) ? 750 : totalTime;
//        //      content.style.webkitTransition = "-webkit-transform   " + totalTime + " cubic-bezier(1,1,1,1) "; //ease,linear,ease-in,
//        content.style.webkitTransition = "-webkit-transform  " + totalTime + "ms cubic-bezier(0.1, 0.25, 0.1, 1.0)";
//        $flip.utils.setTranslateY(content, y);
//        setTimeout(function () {
//        content.style.webkitTransition = "none";
//        }, totalTime);
//        }*/
//    };
//    $flip.init = function () {
//        if (typeof window.orientation !== "undefined") {
//            for (var key in $flip.onload) {
//                $flip.onload[key]();
//            }
//            window.addEventListener("scroll", function () {
//                $flip.utils.addClass(document.body, "scrolled");
//                $flip.utils.scrollToX(0);
//            }, false);
//            window.addEventListener("orientationchange", function () {
//                $flip.utils.removeClass(document.body, "scrolled");
//            }, false);
//            $flip.utils.hideURLBar();
//            window.addEventListener("orientationchange", $flip.utils.hideURLBar, false);
//            $flip.utils.updateOrientation();
//            window.addEventListener("orientationchange", $flip.utils.updateOrientation, false);
//        }
//    };
//    $flip.onload = {
//        disableScrollOnTop: function () {
//            return;
//            document.getElementById("main").addEventListener("touchmove", function (e) {
//                e.preventDefault();
//            }, false);
//            document.body.addEventListener("touchmove", function (e) {
//                e.preventDefault();
//            }, false);
//        },
//        scrollToTop: function () {
//            return;
//            var header = document.querySelector("#main");
//            if (header) {
//                header.addEventListener("touchmove", function () {
//                    this.cancel = true;
//                }, false);
//                header.addEventListener("touchend", function () {
//                    if (!this.cancel) {
//                        $flip.utils.hideURLBar();
//                        $flip.utils.scrollToY(0);
//                    }
//                    this.cancel = false;
//                }, false);
//            }
//        },
//        //#region page0
//        enableScrollOnContent: function () {
//            try {
//                var container = document.querySelector("#menu");
//                var content = document.querySelector("#menu1");
//                var startX, startTime, endX, endTime, startY;
//                //开始移动			
//                content.addEventListener("touchstart", function (e) {
//                    //alert(movingTest);
//                    movingTest = false;
//                    setTimeout('movingTest = true', 50);
//                    startX = e.touches[0].clientX;
//                    //alert("pageX" + e.touches[0].pageX)
//                    startY = e.touches[0].clientY;
//                    startTime = e.timeStamp;
//                    if (startX) {
//                        X1 = startX;
//                    }
//                    if (startY) {
//                        Y1 = startY;
//                    }
//                }, false);
//                //移动中
//                content.addEventListener("touchmove", function (e) {
//                    if (!!VerticalScrolling) {
//                        return;
//                    }
//                    //alert("水平：" + HorizontalScrolling + "竖直：" + VerticalScrolling);
//                    isVMoving = true;
//                    //alert(startX + "+++" + startY);
//                    //VerticalScrolling = true;
//                    var posX = e.touches[0].pageX;
//                    var posY = e.touches[0].pageY;
//                    var dx1 = posX - startX;
//                    var dy1 = posY - startY;
//                    if (movingTest) {
//                        if (!!dx1) {
//                            dx = dx1;
//                            //alert(dx);

//                        }
//                        if (!!dy1) {
//                            dy = dy1;
//                        }
//                        //alert(dx1 + "**" + dy1);
//                        if (!!dx && !!dy) {
//                            if (Math.abs(dx1) > Math.abs(dy1)) {
//                                HorizontalScrolling = true;
//                                VerticalScrolling = false;
//                                movingTest = false;
//                                $("#keywords2").val('H-H');
//                            }
//                            else {
//                                VerticalScrolling = true;
//                                HorizontalScrolling = false;
//                                movingTest = false;
//                                $("#keywords2").val('V-V');
//                            }
//                        }
//                    }
//                    if (!this.style.webkitTransform) {
//                        $flip.utils.setTranslateX(this, 0);
//                    }
//                    var value;
//                    var boundary = (container.offsetHeight - this.offsetHeight);
//                    //向下
//                    //alert(posX + "***" + $flip.vars.oldX);
//                    if (posX > $flip.vars.oldX) {
//                        value = $flip.utils.getTranslateX(this) + (posX - $flip.vars.oldX);
//                        //alert('here');

//                        if (value <= 0) {
//                            $flip.utils.setTranslateX(this, value);
//                        } else {
//                            $flip.utils.setTranslateX(this, (value * 0.9));
//                        }
//                    }
//                    //向上
//                    else if (posX < $flip.vars.oldX) {
//                        value = $flip.utils.getTranslateX(this) - ($flip.vars.oldX - posX);
//                        //$("#bookMark2").html(editSwitch+","+$flip.utils.getTranslateX(this)+","+$flip.vars.oldX+","+posX);
//                        if (value >= boundary) {
//                            $flip.utils.setTranslateX(this, value);
//                        }
//                    }

//                    $flip.vars.oldX = posX;
//                    e.preventDefault();
//                }, false);
//                //结束移动
//                content.addEventListener("touchend", function (e) {
//                    isVMoving = false;
//                    movingTest = false;
//                    //$("#bookMark0").html(container.offsetHeight +","+ this.offsetHeight);
//                    endX = e.changedTouches[0].clientX;
//                    //alert((endX - X1));
//                    if ((X1 - endX) > 50) {
//                        $flip.utils.scrollToX(0);
//                        click_map();
//                    }
//                    else {
//                        $flip.utils.scrollToX(0);
//                    }



//                    endTime = e.timeStamp;
//                    var posX = $flip.utils.getTranslateX(this);
//                    if (posX > 0) {
//                        $flip.utils.scrollToX(0);
//                    } else {
//                        var distance = startX - endX;
//                        //alert(X1 - endX);
//                        var time = endTime - startTime;
//                        var speed = Math.abs(distance / time);
//                        var y = $flip.utils.getTranslateX(this) - (distance * speed);
//                        if ((time < 600) && distance > 50) {
//                            y = y + (y * 0.2);
//                        }
//                        var boundary = (container.offsetHeight - this.offsetHeight);
//                        y = (y <= boundary) ? boundary : (y > 0) ? 0 : y;
//                        $flip.utils.scrollToX(y);
//                    }
//                    HorizontalScrolling = false;
//                    delete $flip.vars.oldX;
//                }, false);
//            } catch (e) {
//                alert(e.Line + "*1140*" + e.Message);
//            }


//        },
//        //#endregion
//        //#region 结果列表
//        enableScrollOnContent1: function () {
//            return;
//            var content = document.querySelector("#list");
//            if ((content) && ($("#list").height() > 182)) {
//                var startX, startTime, endX, endTime;
//                //开始移动			
//                content.addEventListener("touchstart", function (e) {
//                    startX = e.touches[0].clientX;
//                    startTime = e.timeStamp;
//                }, false);
//                //移动中
//                content.addEventListener("touchmove", function (e) {
//                    var posX = e.touches[0].pageX;
//                    $flip.vars.oldX = $flip.vars.oldX || posX;
//                    if (!this.style.webkitTransform) {
//                        $flip.utils.setTranslateX(this, 0);
//                    }
//                    var value;
//                    var boundary = (container.offsetHeight - this.offsetHeight); //210-1084= -874                  
//                    //向下
//                    if (posX > $flip.vars.oldX) {
//                        value = $flip.utils.getTranslateX(this) + (posX - $flip.vars.oldX);
//                        if (value <= 0) {
//                            $flip.utils.setTranslateX(this, value);
//                        } else {
//                            $flip.utils.setTranslateX(this, (value * 0.9));
//                        }
//                    }

//                    //向上
//                    else if (posX < $flip.vars.oldX) {
//                        value = $flip.utils.getTranslateX(this) - ($flip.vars.oldX - posX);
//                        if (value >= boundary) {
//                            $flip.utils.setTranslateX(this, value);
//                        }
//                    }
//                    $flip.vars.oldX = posX;
//                    e.preventDefault();
//                }, false);
//                //结束移动
//                content.addEventListener("touchend", function (e) {
//                    endX = e.changedTouches[0].clientX;
//                    endTime = e.timeStamp;
//                    var posX = $flip.utils.getTranslateX(this);
//                    if (posX > 0) {
//                        $flip.utils.scrollToX1(0);
//                    }
//                    else {
//                        var distance = startX - endX;
//                        var time = endTime - startTime;
//                        var speed = Math.abs(distance / time);
//                        var y = $flip.utils.getTranslateX(this) - (distance * speed);

//                        if ((time < 600) && distance > 50) {
//                            y = y + (y * 0.2);
//                        }
//                        // Set boundary
//                        var boundary = (container.offsetHeight - this.offsetHeight);

//                        // Make sure y does not exceed boundaries
//                        y = (y <= boundary) ? boundary : (y > 0) ? 0 : y;

//                        // Scroll to specified point
//                        $flip.utils.scrollToX1(y);
//                    }

//                    // Clean up after ourselves
//                    delete $flip.vars.oldX;
//                }, false);
//            }
//            else {
//                $("#list").on('touchstart', function (e) {
//                    if ($("#list").height() < 182) {
//                        $flip.utils.setTranslateX(content, 0);
//                    }
//                });
//                $("#list").on('touchmove', function (e) {
//                    if ($("#list").height() < 182) {
//                        $flip.utils.setTranslateX(content, 0);
//                    }
//                });
//                $("#list").on('touchend', function (e) {
//                    if ($("#list").height() < 182) {
//                        $flip.utils.setTranslateX(content, 0);
//                    }
//                });
//                $("#list-mp").on('touchstart', function (e) {
//                    setTimeout('click_back();', 500);
//                });
//            }

//            if ((content) && ($("#list").html().indexOf("sorry") == -1)) {
//                $("#list-top").show();
//            }
//            else {
//                $("#list-top").hide();
//            }
//        }
//        //#endregion

//        /*   //#region 主菜单
//        enableScrollOnContent: function () {
//        var container = document.querySelector("#menu");
//        var content = document.querySelector("#menu1");
//        if (content && ($("#menu1").height() > 333)) {
//        var startY, startTime, endY, endTime;
//        //开始移动			
//        content.addEventListener("touchstart", function (e) {
//        startY = e.touches[0].clientY;
//        startTime = e.timeStamp;
//        }, false);
//        //移动中
//        content.addEventListener("touchmove", function (e) {
//        var posY = e.touches[0].pageY;
//        $flip.vars.oldY = $flip.vars.oldY || posY;
//        if (!this.style.webkitTransform) {
//        $flip.utils.setTranslateY(this, 0);
//        }
//        var value;
//        var boundary = (container.offsetHeight - this.offsetHeight);
//        //向下
//        if (posY > $flip.vars.oldY) {
//        value = $flip.utils.getTranslateY(this) + (posY - $flip.vars.oldY);

//        if (value <= 0) {
//        $flip.utils.setTranslateY(this, value);
//        } else {
//        $flip.utils.setTranslateY(this, (value * 0.9));
//        }
//        }
//        //向上
//        else if (posY < $flip.vars.oldY) {
//        value = $flip.utils.getTranslateY(this) - ($flip.vars.oldY - posY);
//        //$("#bookMark2").html(editSwitch+","+$flip.utils.getTranslateY(this)+","+$flip.vars.oldY+","+posY);
//        if (value >= boundary) {
//        $flip.utils.setTranslateY(this, value);
//        }
//        }

//        $flip.vars.oldY = posY;
//        e.preventDefault();
//        }, false);
//        //结束移动
//        content.addEventListener("touchend", function (e) {
//        //$("#bookMark0").html(container.offsetHeight +","+ this.offsetHeight);
//        endY = e.changedTouches[0].clientY;
//        endTime = e.timeStamp;
//        var posY = $flip.utils.getTranslateY(this);
//        if (posY > 0) {
//        $flip.utils.scrollToY(0);
//        } else {
//        var distance = startY - endY;
//        var time = endTime - startTime;
//        var speed = Math.abs(distance / time);
//        var y = $flip.utils.getTranslateY(this) - (distance * speed);
//        if ((time < 600) && distance > 50) {
//        y = y + (y * 0.2);
//        }
//        var boundary = (container.offsetHeight - this.offsetHeight);
//        y = (y <= boundary) ? boundary : (y > 0) ? 0 : y;
//        $flip.utils.scrollToY(y);
//        }
//        delete $flip.vars.oldY;
//        }, false);
//        }
//        else {
//        $("#menu1").on('touchstart', function (e) {
//        if ($("#menu1").height() < 333) {
//        $flip.utils.setTranslateY(content, 0);
//        }
//        });
//        $("#menu1").on('touchmove', function (e) {
//        if ($("#menu1").height() < 333) {
//        $flip.utils.setTranslateY(content, 0);
//        }
//        });
//        $("#menu1").on('touchend', function (e) {
//        if ($("#menu1").height() < 333) {
//        $flip.utils.setTranslateY(content, 0);
//        }
//        });
//        }
//        },
//        //#endregion
//        //#region 结果列表
//        enableScrollOnContent1: function () {
//        var content = document.querySelector("#list");
//        if ((content) && ($("#list").height() > 182)) {
//        var startY, startTime, endY, endTime;
//        //开始移动			
//        content.addEventListener("touchstart", function (e) {
//        startY = e.touches[0].clientY;
//        startTime = e.timeStamp;
//        }, false);
//        //移动中
//        content.addEventListener("touchmove", function (e) {
//        var posY = e.touches[0].pageY;
//        $flip.vars.oldY = $flip.vars.oldY || posY;
//        if (!this.style.webkitTransform) {
//        $flip.utils.setTranslateY(this, 0);
//        }
//        var value;
//        var boundary = (container.offsetHeight - this.offsetHeight); //210-1084= -874                  
//        //向下
//        if (posY > $flip.vars.oldY) {
//        value = $flip.utils.getTranslateY(this) + (posY - $flip.vars.oldY);
//        if (value <= 0) {
//        $flip.utils.setTranslateY(this, value);
//        } else {
//        $flip.utils.setTranslateY(this, (value * 0.9));
//        }
//        }

//        //向上
//        else if (posY < $flip.vars.oldY) {
//        value = $flip.utils.getTranslateY(this) - ($flip.vars.oldY - posY);
//        if (value >= boundary) {
//        $flip.utils.setTranslateY(this, value);
//        }
//        }
//        $flip.vars.oldY = posY;
//        e.preventDefault();
//        }, false);
//        //结束移动
//        content.addEventListener("touchend", function (e) {
//        endY = e.changedTouches[0].clientY;
//        endTime = e.timeStamp;
//        var posY = $flip.utils.getTranslateY(this);
//        if (posY > 0) {
//        $flip.utils.scrollToY1(0);
//        }
//        else {
//        var distance = startY - endY;
//        var time = endTime - startTime;
//        var speed = Math.abs(distance / time);
//        var y = $flip.utils.getTranslateY(this) - (distance * speed);

//        if ((time < 600) && distance > 50) {
//        y = y + (y * 0.2);
//        }
//        // Set boundary
//        var boundary = (container.offsetHeight - this.offsetHeight);

//        // Make sure y does not exceed boundaries
//        y = (y <= boundary) ? boundary : (y > 0) ? 0 : y;

//        // Scroll to specified point
//        $flip.utils.scrollToY1(y);
//        }

//        // Clean up after ourselves
//        delete $flip.vars.oldY;
//        }, false);
//        }
//        else {
//        $("#list").on('touchstart', function (e) {
//        if ($("#list").height() < 182) {
//        $flip.utils.setTranslateY(content, 0);
//        }
//        });
//        $("#list").on('touchmove', function (e) {
//        if ($("#list").height() < 182) {
//        $flip.utils.setTranslateY(content, 0);
//        }
//        });
//        $("#list").on('touchend', function (e) {
//        if ($("#list").height() < 182) {
//        $flip.utils.setTranslateY(content, 0);
//        }
//        });
//        $("#list-mp").on('touchstart', function (e) {
//        setTimeout('click_back();', 500);
//        });
//        }

//        if ((content) && ($("#list").html().indexOf("sorry") == -1)) {
//        $("#list-top").show();
//        }
//        else {
//        $("#list-top").hide();
//        }
//        },
//        //#endregion

//        //#region showsaved/showshared
//        enableScrollOnContent2: function () {
//        var container = document.querySelector("#savedinfo");
//        var content = document.querySelector("#si");

//        if ((content) && ($("#si").height() > 290)) {
//        var startY, startTime, endY, endTime;
//        //开始移动			
//        content.addEventListener("touchstart", function (e) {
//        startY = e.touches[0].clientY;
//        startTime = e.timeStamp;
//        }, false);
//        //移动中
//        content.addEventListener("touchmove", function (e) {
//        var posY = e.touches[0].pageY;
//        $flip.vars.oldY = $flip.vars.oldY || posY;
//        if (!this.style.webkitTransform) {
//        $flip.utils.setTranslateY(this, 0);
//        }
//        var value;
//        var boundary = (container.offsetHeight - this.offsetHeight);
//        //向下
//        if (posY > $flip.vars.oldY) {
//        value = $flip.utils.getTranslateY(this) + (posY - $flip.vars.oldY);

//        if (value <= 0) {
//        $flip.utils.setTranslateY(this, value);
//        } else {
//        $flip.utils.setTranslateY(this, (value * 0.9));
//        }
//        }
//        //向上
//        else if (posY < $flip.vars.oldY) {
//        value = $flip.utils.getTranslateY(this) - ($flip.vars.oldY - posY);
//        if (value >= boundary) {
//        $flip.utils.setTranslateY(this, value);
//        }
//        }

//        $flip.vars.oldY = posY;
//        e.preventDefault();
//        }, false);

//        //结束移动
//        content.addEventListener("touchend", function (e) {
//        endY = e.changedTouches[0].clientY;
//        endTime = e.timeStamp;
//        var posY = $flip.utils.getTranslateY(this);
//        if (posY > 0) {
//        $flip.utils.scrollToY2(0);
//        } else {
//        var distance = startY - endY;
//        var time = endTime - startTime;
//        var speed = Math.abs(distance / time);
//        var y = $flip.utils.getTranslateY(this) - (distance * speed);
//        if ((time < 600) && distance > 50) {
//        y = y + (y * 0.2);
//        }
//        var boundary = (container.offsetHeight - this.offsetHeight);
//        y = (y <= boundary) ? boundary : (y > 0) ? 0 : y;
//        $flip.utils.scrollToY2(y);
//        }
//        delete $flip.vars.oldY;
//        }, false);

//        }
//        },
//        //#endregion
//        //#region 商家的详细信息
//        enableScrollOnContent3: function () {
//        var container = document.querySelector("#page3_details");
//        var content = document.querySelector("#page3_detail");
//        //alert($("#page3_detail").height());
//        if ((content) && ($("#page3_detail").height() > 195)) {
//        //alert('incoming');
//        var startY, startTime, endY, endTime;
//        //开始移动			
//        content.addEventListener("touchstart", function (e) {
//        startY = e.touches[0].clientY;
//        startTime = e.timeStamp;
//        }, false);
//        //移动中
//        content.addEventListener("touchmove", function (e) {
//        var posY = e.touches[0].pageY;
//        $flip.vars.oldY = $flip.vars.oldY || posY;
//        if (!this.style.webkitTransform) {
//        $flip.utils.setTranslateY(this, 0);
//        }
//        var value;
//        var boundary = (container.offsetHeight - this.offsetHeight);
//        //向下
//        if (posY > $flip.vars.oldY) {
//        value = $flip.utils.getTranslateY(this) + (posY - $flip.vars.oldY);

//        if (value <= 0) {
//        $flip.utils.setTranslateY(this, value);
//        } else {
//        $flip.utils.setTranslateY(this, (value * 0.9));
//        }
//        }
//        //向上
//        else if (posY < $flip.vars.oldY) {
//        value = $flip.utils.getTranslateY(this) - ($flip.vars.oldY - posY);
//        if (value >= boundary) {
//        $flip.utils.setTranslateY(this, value);
//        }
//        }

//        $flip.vars.oldY = posY;
//        e.preventDefault();
//        }, false);

//        //结束移动
//        content.addEventListener("touchend", function (e) {
//        endY = e.changedTouches[0].clientY;
//        endTime = e.timeStamp;
//        var posY = $flip.utils.getTranslateY(this);
//        if (posY > 0) {
//        $flip.utils.scrollToY3(0);
//        } else {
//        var distance = startY - endY;
//        var time = endTime - startTime;
//        var speed = Math.abs(distance / time);
//        var y = $flip.utils.getTranslateY(this) - (distance * speed);
//        if ((time < 600) && distance > 50) {
//        y = y + (y * 0.2);
//        }
//        var boundary = (container.offsetHeight - this.offsetHeight);
//        y = (y <= boundary) ? boundary : (y > 0) ? 0 : y;
//        $flip.utils.scrollToY3(y);
//        }
//        delete $flip.vars.oldY;
//        }, false);
//        }
//        else {
//        $("#page3_detail").on('touchstart', function (e) {
//        if ($("#page3_detail").height() < 195) {
//        $flip.utils.setTranslateY(content, 0);
//        }
//        });
//        $("#page3_detail").on('touchmove', function (e) {
//        if ($("#page3_detail").height() < 195) {
//        $flip.utils.setTranslateY(content, 0);
//        }
//        });
//        $("#page3_detail").on('touchend', function (e) {
//        if ($("#page3_detail").height() < 195) {
//        $flip.utils.setTranslateY(content, 0);
//        }
//        });
//        }
//        }
//        //#endregion*/

//    };
//    window.addEventListener("load", $flip.init, false);
//}
////flip.call(window.iPhone);

//2011.12.14