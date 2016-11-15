//Made by qczhang
//2012.08.20
//使用JSEnhancements.vsix 插件可以很方便的折叠js代码，便于开发【//#region //#endregion】
//#38#[,]
//#39#[']
//#37#["]
//核心版本控制
//if (!storage.getItem("coreVersion")) {
//    storage.setItem("coreVersion", 4);
//}cube版
$("#cpright").html(' Copyright © 2012, Umap.ca, Beta 1.218');
//storage.clear();
function EveryDay() {
    //debugger;
    try {
        if (!who) {
            who = storage.getItem("LDwho");
        }
        if (!who) {
            return;
        }
        var d = new Date();
        if (!!storage.getItem("EveryDay")) {
            if (storage.getItem("EveryDay") == d.getMonth() + "," + d.getDate()) {
                return;
            }
        }

        storage.setItem("EveryDay", d.getMonth() + "," + d.getDate());


        $.ajax({
            url: 'Handler/SearchInfo.ashx',
            type: 'POST',
            data: {
                EveryDay: who
            },
            success: function (id) {

            },
            error: function (id) {
                setTimeout("EveryDay()", 30000);
            }
        });
    } catch (e) {
        //debugger;
    }

}
EveryDay();
document.title = "Umap";
//#region 全局变量
var closeLR = "L"; //L:Left,  R:Right   [删除键在左边还是右边还是两边]
var who; //用户id
var dic; //用户id
var luckyOK = false; //获取到抽奖信息
var luckyReady = false; //用户的操作满足显示抽奖页面【打开events或进行搜索】
var myScroll; //主菜单滑动对象
var $myiPhone; //甄别iPhone设备的关键词
//var touchmenu = false;
var ta; //前一个被点击的主菜单序号
var OK314 = true; //展开菜单的门票
var addswitch = true; //大+切换开关
var addbswitch = true; //小+切换开关
var OK477 = true; //编辑菜单的门票
var SearchArr = []; //菜单变色参数
var Tid; //前任变色菜单id
var tarrSaved; //saved信息
var exPo1; //expositioin1 删除saved1之前先保存当前位置
var exPo2; //expositioin1 删除saved2之前先保存当前位置
//#endregion
//debugger;
if (storage && storage.getItem("config")) {
    //debugger;
    try {
        config = storage.getItem("config");
        config = config.split(';');
        closeLR = config[0].split(':')[1];
    } catch (e) { catche(e); }

}
else {
    var config = "closeLR:L;";
    storage.setItem("config", config);
}
//#region ajax cty
//debugger;
function ActivePage(x) {
    try {
        //debugger;
        map.panTo(newgps);
        //console.log("ActivePage");
        /*clearMarkGPS();
        var markery = new google.maps.Marker({
        position: newgps,
        icon: gpsicon,
        map: map
        });
        markerGPS.push(markery);
        addClicktoMarker(markery, newgps);*/

    } catch (e) { }
    try {
        if (!!x) {
            testMyGPS(x);
        }
        //debugger;
        who = storage.getItem("account");
        dic = who;
        //if (!who || dic == 0) {

        /*  2012.09.24 电影票先隐去，有用户后才打开

        $.ajax({
        url: 'Handler/SearchInfo.ashx',
        type: 'POST',
        data: {
        kwtest: who
        },
        success: function (id) {
        //debugger;
        if (id) {
        who = id;
        dic = id;
        storage.setItem("account", who);
        STtestaccount();
        EveryDay();
        }
        $.ajax({
        url: 'Handler/SearchInfo.ashx',
        type: 'POST',
        data: {
        LuckyDraw: who,
        step: 1  //1:拉取DB信息  2：点击获取
        },
        success: function (id) {
        //debugger;
        if (!!id) {
        //id = [];
        //true;id;url;status
        id = id.split(";");
        //                        id[0] = "true";
        //                        id[1] = "100895";
        //                        id[2] = "001";
        //                        id[3] = "2";
        storage.setItem("LDwho", id[1]);
        storage.setItem("LDurl", id[2]);
        Twho = id[1];
        try {
        $("#showdraw").html('<img id="Drawimg" src="../images/LuckyDraw/' + storage.getItem("LDurl") + '.jpg">');
        //$("#Drawimg")[0].src = "../images/LuckyDraw/" + storage.getItem("LDurl") + ".jpg";
        } catch (e) { }
        //
        luckyOK = 1;
        //$("#showsaved,#showshared,#showaccount,#showevents").css("width", "30%");
        //$("#showdraw").css({ "width": "10%", "height": "39px", "padding": "0px" });
        //$("#showdraw").show();
        showLucky();
        if (id[3] == "3") {
        $("#showdraw")[0].onclick = Function("showdraw(2)");
        }
        }
        }
        });
        }
        , error: function (a) {
        //  alert("125");
        // setTimeout('ActivePage(' + x + ')', 500);
        }
        });

        */



        //}
    } catch (e) { catche(e); }
}
function showLucky() {
    try {
        if (luckyOK && luckyReady) {
            $("#showsaved,#showshared,#showaccount,#showevents").css("width", "30%");
            $("#showdraw").css({ "width": "10%", "height": "41px", "padding": "0px" });
            $("#showdraw").show();
        }
    } catch (e) {
        catche(e);
    }
}

ActivePage();
function STtestaccount() {
    //    //debugger;
    if (!hisw) {
        testaccount();
    }
    else {
        STtestaccount();
    }
}
//#endregion
//#region 修改个人信息  已注释，第二版开放                                   【已注释】
/*
function Mok() {
var fn = $("#txtFirstName").val();
var ln = $("#txtLastName").val();
var qu = $("#ddlanswerset").val();
var an = $("#txtanswerset").val();
//修改详细的个人信息【update: 标签，用户名, fn: 首名, ln: 尾名, qu: 安全问题, an: a】
$.ajax({
url: 'Handler/Login.ashx',
type: 'POST',
data: { update: dic, fn: fn, ln: ln, qu: qu, an: an },
success: function (info) {
var infoarr = info.split(",");
if (infoarr[0] == "true") {
alert('Modify Successfully');
// $("#lblUserName").html(infoarr[1]);
Update();
}
else {
alert('修改失败');
}
}
});
}*/
/*/#region 点击搜索的X 2011.10.10【无效函数】
function clearInputBox() {
var kws = $('#keywords').val();
if (kws != "") {
$('#keywords').val("");
$('#keywords').focus();
}
else {
$("#tb_search").hide();
}
}
//#endregion*/
//#endregion

if ($("#submit").css('color').indexOf("123") != -1) {
    $myiPhone = 3;
}
else {
    $myiPhone = 4;
}
//#region                               菜单相关
//#region 如果图片加载失败，用系统提供的默认图片
function imgError(j) {
    try {
        if ($myiPhone == 3) {
            document.getElementById("icons" + j).src = "images/icon29/icon.png";
        }
        else {
            document.getElementById("icons" + j).src = "images/icon57/icon.png";
        }
        //$("#icons" + j).attr('class', "");
        //$("#icons" + j).css({ 'margin-top': '6px', 'margin-left': '13px', "float": "left" });
        //debugger;
        //document.getElementById("icons" + j).parentNode.childNodes[1].style.marginLeft = "-26px";

    } catch (e) {
        //alert(e);
    }
}
function imgError1(id) {
    //document.getElementById(id).src = "BizImages/Go2qt2.jpg";
    //document.imgbiz10.src = "BizImages/Go2qt2.jpg";
    //alert(109);
    $("#imgbiz0").hide();
    $("#imgbiz10").hide();
    //document.getElementById(id).src = "images/search_clear.PNG";
}
//#endregion

//alert($("#submit").css('color'));
//alert(screen.width + "*" + screen.height);
//#region 2.1生成菜单

function listMenu(arrList) {
    //debugger;
    var menuList;
    //loop for menu list
    menuList = "<div id='tbList'>";
    //var arrSubList = new Array();
    var arrSubList = [];
    try {
        for (j = 1; j < arrList.length; j++) {
            arrSubList = arrList[j].split(",");
            var arrSubNum = arrSubList.length - 1;
            if (arrSubNum == 0) {
                arrSubNum = '';
            }
            var pmenu = arrSubList[0];
            //父级菜单
            var ppmenu = pmenu.replace(reg, "+");
            //debugger;
            //alert(ppmenu);
            if ($.trim(ppmenu) == "") {
                continue;
            }
            //if ((ppmenu == "History" && arrSubList.length == 1) || ((ppmenu == "Nearby" && (storage.getItem("account") == null || storage.getItem("account") == "" || storage.getItem("account").indexOf('@') == -1)))) {
            if (ppmenu == "History" && arrSubList.length == 1) {
                //continue;
                menuList += "<div class='row0Div none'  onclick='openList(" + j + ")' id='ListMainControl" + j + "'>"; //展开菜单imgError(" + j + ")'
            }
            else {
                menuList += "<div class='row0Div' onclick='openList(" + j + ")' id='ListMainControl" + j + "'>"; //展开菜单imgError(" + j + ")'
            }
            if ($myiPhone == 3) {//低分辨率
                menuList += "<div class='listMain1'><img class='smallpic' id='icons" + j + "' src='images/icon29/" + pmenu + ".png' onError='imgError(" + j + ")'  /><img class='bgpic' src='images/icon29/circle.PNG'></div>"; //显示图片 
            }
            else {//高分辨率
                menuList += "<div class='listMain1'><img class='bigpic' id='icons" + j + "' src='images/icon57/" + pmenu + ".png' onError='imgError(" + j + ")'  /><img class='bgpic1' src='images/icon57/circle.PNG'></div>"; //显示图片 
            }
            //menuList += "<div class='listMain1'><img id='icons" + j + "' src='images/icons/" + pmenu + ".png' onError='imgError(" + j + ")'  /></div>"; //显示图片
            if (ppmenu == "History") {
                menuList += "<div class='listMain2' ";
                menuList += "id='1' ";
                menuList += "onclick=\"gmbc(0,this," + j + ");dis(event);openList('" + j + "');\"><div>&nbsp;" + arrSubList[0] + "</div></div>"; //主菜单+点击事件[dis(event);clickSearchs('" + pmenu + "');]
            }
            else {
                menuList += "<div class='listMain2' id='" + j + "' onclick=\"gmbc(0,this," + j + ");dis(event);clickSearchs('" + ppmenu + "','" + j + "');\"><div>&nbsp;" + arrSubList[0] + "</div></div>"; //主菜单+点击事件[dis(event);clickSearchs('" + pmenu + "');]
            }
            menuList += "<div class='zk' id='zk" + j + "'><span>▲</span></div>"; //展开菜单 .zk
            menuList += "</div>"; //展开菜单结束
            menuList += "<div style='top:15px;' id='imgMainDelete" + j + "'><span class='listEditIconSub' id='removeBt" + j + "' onclick=\"deleteSearch('" + j + "','" + pmenu + "','arrListMain','','',this.id)\"><img id='rm" + j + "' src='images/red1.png' /></span></div>"; //移除+点击事件&nbsp;&#150;&nbsp;
            menuList += "<div class='hide' id='listMain" + j + "'>";
            menuList += "<div style='padding-left:40px;' id='listMain2" + j + "'>";
            for (i = 1; i <= arrSubList.length - 1; i++) {
                //子级菜单
                var smenu = arrSubList[i];
                smenu = smenu.replace(reg, "+");
                smenu1 = ReplaceF(arrSubList[i]);
                menuList += "<div id='listSub" + j + i + "'>";
                menuList += "<div id='" + j + i + "' class='listSub' onclick=\"gmbc(1,this," + j + ");clickSearchs('" + smenu + "','" + j + "')\"><div>" + smenu1 + "</div></div>";
                //menuList += "<div id='" + j + i + "' class='listSub' onclick=\"clickSearchs('" + smenu + "')\"><a>" + arrSubList[i] + "</a></div>";
                menuList += "<div id='" + j + i + "1s'><span class='listEditIconSub' id='" + j + i + "2s' onclick=\"deleteSearch('" + j + i + "','" + smenu + "','arrListSub','" + j + "','" + i + "',this.id);\"><img id='rs" + j + i + "' src='images/red1.png' /></span></div>";
                menuList += "</div>";
            }
            menuList += "</div>";
            menuList += "<div class='listEditAdd' id='removeBoxSub" + j + "'><input onblur='inputtxt(1)' onfocus='inputtxt()' class='inputBoxs' maxlength='22' placeholder='Add new search' id='addInput" + j + "' type='text' /><span class='addNewInputSpan' id='buttonAdd" + j + "' onclick=\"addFlash(this.id);addDiv('addInput" + j + "','" + j + "')\"><img id='b" + j + "' src='images/blue1.png' /></span></div>";
            menuList += "</div>";
        }
    } catch (e) { catche(e); }
    menuList += "</div>";
    $("#menuLists").html(menuList);

    $("#editDone").show();
    testList();
    //$('#menu1').height($('#menu1').height + 50);
    //$('#menu1').touchScroll();
    //setTimeout("$('#menu1').touchScroll();", 500);
    //    try {
    //        //    myScroll = new iScroll('menu');
    //        myScroll = new iScroll('menu', { vScrollbar: false });
    //        setTimeout(function () { document.getElementById('menu').style.left = '0'; }, 800);
    //        //$(".hide").hide();
    //        setTimeout(function () {
    //            // myScroll.refresh();
    //        }, 0);
    //        //        var tmu1 = setInterval(function () {
    //        //            //debugger;
    //        //            //            -webkit-transition-property: -webkit-transform;
    //        //            //-webkit-transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    //        //            //-webkit-transition-duration: 0ms;
    //        //            if ($("#menu1").css('-webkit-transition-duration').indexOf('0ms') == -1) {
    //        //                $("#menu1").touchScroll();
    //        //            }
    //        //            else {
    //        //                clearInterval(tmu1);
    //        //            }
    //        //        }, 50);

    //        //      setTimeout(function () { $("#menu1").touchScroll(); }, 50);
    //        //-webkit

    //        //setInterval('console.log($("#menu1").touchScroll("getPosition"))', 1000);
    //        //   setInterval('if(!touchmenu){$("#menu1").touchScroll("update");}', 1000);
    //        //        setTimeout(function () {
    //        //           
    //        //            google.maps.event.addDomListener($('#menu1')[0], 'touchstart', function (e) {
    //        //                alert(242);
    //        //                touchmenu = true;
    //        //            });
    //        //            google.maps.event.addDomListener($('#menu1')[0], 'touchmove', function (e) {
    //        //                touchmenu = true;
    //        //            });
    //        //            google.maps.event.addDomListener($('#menu1')[0], 'touchend', function (e) {
    //        //                touchmenu = false;
    //        //            });
    //        //        }, 500);
    //    } catch (e) { console.log(e); }
}

//#endregion
//#region 2.生成菜单
listMenu(arrList);
//#endregion
//#region 2.2展开菜单

function openList(a, b) {
    if (!OK314) {
        return;
    }
    OK314 = false;
    setTimeout("OK314=true", 500);
    var y = myScroll.y;
    $("#tbList div.zk span").css('opacity', '0.1');

    //$(".zk").css('-webkit-transform', 'rotate(180deg)');
    //    if ($("#function").is(":visible")) {
    //        $('#dicmap').click();
    //    }
    try {
        ta = a;
        //$("#listMain" + a).slideToggle(1);
        if (!b) {
            setTimeout("OK314=true", 500);
            if ($("#listMain" + a).is(":visible")) {
                $("#listMain" + a).hide();
                //            $("#zk" + a).css({ '-webkit-transform': 'rotate(-90deg)', 'opacity': '0.7' }); /*180*/
                $("#zk" + a + " span").css({ '-webkit-transform': 'rotate(-90deg)', 'opacity': '0.7' }); /*180*/
            }
            else {
                $("#listMain" + a).show();
                $("#zk" + a + " span").css({ '-webkit-transform': 'rotate(-180deg)', 'opacity': '0.7' }); /*0*/
                //$("#zk" + a+" span").css({ '-webkit-transform': 'rotate(-90deg)', 'opacity': '0.7' }); /*0*/
            }
        }
        else {
            setTimeout("OK314=true", 100);
        }
        if (editSwitch == "1") {
            $("#menu").html('<div id="menu1">' + $("#menu1").html() + '</div>');
            $('#removeBoxSub' + a).show();
        }
        else {
            $("#menu").html('<div id="menu1">' + $("#menu1").html() + '</div>');
            $('#removeBoxSub' + a).hide();
        }
        //$flip.onload.enableScrollOnContent();
        //setTimeout("$('#menu1').touchScroll('update');", 500);

        try {
            //alert(1);
            setTimeout(function () {
                //debugger;
                // console.log("展开后menu1的高度是：" + $("#menu1").height());

                /* myScroll.refresh();*/

                myScroll.destroy();
                myScroll = null;
                myScroll = new iScroll('menu', { vScrollbar: false });
                if (!!y) {
                    myScroll.scrollTo(0, y, 0);
                }
                else {
                    myScroll.scrollTo(0, 0, 0);
                }
            }, 0);
            // setTimeout(function () { myScroll.refresh(); }, 500);
            //setTimeout(function () { $("#menu1").touchScroll('update'); }, 500);
        } catch (e) { console.log(e); }
    } catch (e) { catche(e); }
}
//#endregion
//#region 2.3 删除热词
function DS(para) {
    try {
        var par = para.split(',');
        var a = par[0];
        var b = par[1];
        var d = par[2];
        var j = par[3];
        var i = par[4];
        var id = par[5];
        if (b != "" && a != "") {
            b = b.replace(/\+/g, " ");
            if (d == "arrListSub") {
                var r = confirm("Confirm remove '" + b + "'");
                if (r == true) {
                    $("#" + a).hide();
                    $("#" + a + "1s").hide();
                    $("#" + a + "2s").hide();
                    //var arrTemp1 = arrList[j].toString().split(",");
                    var arrTemp1 = ("" + arrList[j]).split(",");
                    arrTemp1.splice(i, 1, "none01");
                    arrList[j] = arrTemp1;
                    menuChange = "yes";
                }
            }

            if (d == "arrListMain") {
                var r = confirm("Confirm remove '" + b + "' and group.");
                if (r == true) {
                    $('#listMain' + a).hide();
                    $("#ListMainControl" + a).hide();
                    $("#imgMainDelete" + a).hide();
                    arrList.splice(a, 1, "none00");
                    menuChange = "yes";
                }
            }
        }
        DSC(a, 0, d);
        //$('#menu1').touchScroll('update');
        try {
            var y = myScroll.y;
            myScroll.destroy();
            myScroll = null;
            $("#menu").html('<div id="menu1">' + $("#menu1").html() + '</div>');
            myScroll = new iScroll('menu', { vScrollbar: false });

            //setTimeout(function () { $("#menu1").touchScroll('update'); }, 500);
        } catch (e) { console.log(e); }
    } catch (e) { catche(e); }
}
function DSC(a, x, d) {
    try {
        if (a != "E") {
            if (d == "arrListMain") {
                document.getElementById("rm" + a).style.webkitTransition = "-webkit-transform  800ms ease";
                document.getElementById("rm" + a).style.WebkitTransform = "rotate(" + x + "deg) ";
                document.getElementById("rm" + a).style.MozTransition = "-moz-transform  800ms ease";
                document.getElementById("rm" + a).style.MozTransform = "rotate(" + x + "deg) ";

            }
            else if (d == "b") {
                if (addbswitch) {
                    document.getElementById("b" + a).style.webkitTransition = "-webkit-transform  800ms ease";
                    document.getElementById("b" + a).style.WebkitTransform = "rotate(" + x + "deg)";
                    document.getElementById("b" + a).style.MozTransition = "-moz-transform  800ms ease";
                    document.getElementById("b" + a).style.MozTransform = "rotate(" + x + "deg)";
                    addbswitch = false;
                }
                else {
                    document.getElementById("b" + a).style.WebkitTransform = "rotate(0deg)";
                    document.getElementById("b" + a).style.MozTransform = "rotate(0deg)";
                    addbswitch = true;
                }
            }
            else {
                document.getElementById("rs" + a).style.webkitTransition = "-webkit-transform  800ms ease";
                document.getElementById("rs" + a).style.WebkitTransform = "rotate(" + x + "deg)";
                document.getElementById("rs" + a).style.MozTransition = "-moz-transform  800ms ease";
                document.getElementById("rs" + a).style.MozTransform = "rotate(" + x + "deg)";
            }
        }
        else if (addswitch) {
            document.getElementById(a).style.webkitTransition = "-webkit-transform  800ms ease";
            document.getElementById(a).style.WebkitTransform = "rotate(" + x + "deg)"; // scale(1.454)
            document.getElementById(a).style.MozTransition = "-moz-transform  800ms ease";
            document.getElementById(a).style.MozTransform = "rotate(" + x + "deg)"; //scale(1.454)
            addswitch = false;
        }
        else {
            document.getElementById(a).style.WebkitTransform = "rotate(0deg)"; // scale(1.454)
            document.getElementById(a).style.MozTransform = "rotate(0deg)"; // scale(1.454)
            addswitch = true;
        }
    } catch (e) { catche(e); }
}
function deleteSearch(a, b, d, j, i, id) {
    try {
        DSC(a, 90, d);
        var para = a + ',' + b + ',' + d + ',' + j + ',' + i + ',' + id;
        setTimeout('DS("' + para + '")', 500);
    } catch (e) { catche(e); }
    //$('#menu1').touchScroll('update');
}
//#endregion
//#region 2.4编辑菜单

function editList() {
    var y = myScroll.y;
    if (!OK477) {
        return;
    }
    OK477 = false;
    setTimeout("OK477=true", 500);
    try {
        //点击编辑
        //alert(480);
        if (editSwitch == "") {
            $("#tbList div.row0Div").width("87.5%");
            $("#tbList div.listMain2").width("60%");
            //            if (dic == 0 || dic == "") {
            //                eMsg(1);
            //            }
            $("#cpright,#Reports").hide();
            $('#tbList span.listEditIconSub').show();
            $("#imgMainDelete1,#imgMainDelete2").hide();
            //$('#tbList span.listEditMainAdd').show();
            /*   try {
            var y = myScroll.y;
            myScroll.destroy();
            myScroll = null;
            $("#menu").html('<div id="menu1">' + $("#menu1").html() + '</div>');
            myScroll = new iScroll('menu', { vScrollbar: false });
            myScroll.scrollTo(0, parseInt(y) - 50, 0);

            //$('#menu1').touchScroll('setPosition', $('#menu1').touchScroll('getPosition')[0] + 20);
            } catch (e) { catche(e); }*/
            editSwitch = "1";
            $("#editDone").html("Done");
            $("#addGroup,#rl").show();
            for (var i = 1; i < arrList.length; i++) {
                if ($("#listSub" + i).is(":visible")) {
                    $('#removeBoxSub' + i).show();
                }
            }
        }
        else {  //保存已经完成编辑的菜单
            //debugger;
            //#region
            var add = $.trim($("#addMainInput").val());
            if ((add != "") && (add.length > 1)) {
                $("#buttonAddE").click();
            }
            $("#tbList div.row0Div").width("99%");
            $("#tbList div.listMain2").width("63%");
            $("#cpright").show();
            //#endregion

            $('#tbList span.listEditIconSub').hide();
            $('#tbList div.listEditAdd').hide();
            //$('.listEditMainAdd').hide();
            $("#Reports").show();
            //            $("#cpright,#Reports").show();
            //debugger;
            if (menuChange == "yes") {
                if (dic == 0 || dic == "") {
                    eMsg(1);
                }
                var length = arrList.length;
                for (var i = 1; i < length; i++) {
                    //如果此菜单被删
                    if (arrList[i] == "none00") {
                        arrList.splice(i, 1);
                        i = 0;
                        if (length > 3) {
                            --length;
                        }
                    }
                }
                var strarrList = arrList.join(";");
                //删除子菜单
                strarrList = strarrList.replace(/,none01/g, "");

                //======
                storage.removeItem("arrList"); //防止异常
                storage.setItem("arrList", strarrList);
                //======

                if (dic != 0 && dic != "") {
                    //strarrList = strarrList.replace("+", "strplus");
                    //strarrList = strarrList.replace(reg, "+");
                    //strarrList = strarrList.replace("&", "amp38");
                    //保存菜单到数据库
                    $.ajax({
                        url: 'Handler/Login.ashx',
                        type: 'POST',
                        data: { saveMenu: dic, menu: strarrList },
                        error: function (a, info) {
                            alert("saveMenu save error " + a + info);
                        }
                    });
                    menuChange = "";
                }
            }
            else {
                eMsg(0);
            }
            // if bookmarks changed, save new bookmarks under user's account.
            //            if (bmNameChange == "yes") {
            //                var strBMName = arrBookmarkName.join(":");
            //                if (dic != 0 && dic != "") {
            //                    //strBMName = strBMName.replace("+", "strplus");
            //                    //strBMName = strBMName.replace(reg, "+");
            //                    //strBMName = strBMName.replace("&", "amp38");
            //                    //$.post("ajax_saveChanges.asp?", { a: dic, b: "bmn", v: strBMName });
            //                    $.ajax({
            //                        url: 'Handler/Login.ashx',
            //                        type: 'POST',
            //                        data: { saveBMName: dic, BMName: strBMName },
            //                        error: function (a, info) {
            //                            alert("saveBMName save error " + a + info);
            //                        }
            //                    });
            //                    bmNameChange = "";
            //                }
            //            }
            $("#editDone").html("Edit");
            $("#addGroup,#rl").hide();
            editSwitch = "";
            //debugger
            testList();
            //$("#pmenu").html('<div id="menu"><div id="menu1"><div id="menuLists"></div><div style="float: left; text-align: right; width: 100%; border-top: 1px solid #efefef"><span id="addGroup"><input class=\'inputBoxs\' id=\'addMainInput\' maxlength=\'22\' placeholder=\'Add new group\'type=\'text\' /><span class=\'addNewInputSpan\' id="buttonAdd" onclick="addFlash(this.id);addDiv(\'addMainInput\')">&nbsp;+&nbsp;</span></span><spanid="editDone" onclick=\'editList();\'>Edit</span><br />&nbsp;</div></div></div>');
            //alert("listMenu");
            //listMenu(arrList);
            //refresh();
            //   $(this).css("background-color");
            //        alert($("#menu1").html());
            //        if ($("#menu1").css("margin-top")== 0) {
            //            $("#menu1").css("margin-top", "30px");
            //        }
            //$('#menu1').touchScroll('update');
        }
        //$('#menu1').touchScroll('update');
        try {
            //debugger;
            myScroll.destroy();
            myScroll = null;
            $("#menu").html('<div id="menu1">' + $("#menu1").html() + '</div>');
            myScroll = new iScroll('menu', { vScrollbar: false }); //setTimeout(function () { $("#menu1").touchScroll('update'); }, 500);
            if (!!y) {
                myScroll.scrollTo(0, parseInt(y) - 50, 0);
            }
            else {
                y = -$("#menu1").height() + 318;
                myScroll.scrollTo(0, y, 0);

            }

        } catch (e) { console.log(e); }
    } catch (e) { catche(e); }
}
//#endregion
//#region 搜索info
function clickSearchs(info, j) {
    ta1 = j;
    if (editSwitch == "") {
        try {
            homeType = true;
            $("#zoom12 img").attr('src', 'images/home.png');
            info = info.replace("+", " ");
            setTimeout(function () {
                click_search(info, null, null, null, 3);
            }, 200);
        } catch (e) { catche(e); }
    }
}
//#endregion
//#region 阻止事件冒泡
// 终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播。
function dis(a) {
    a.stopPropagation();
}
//#endregion
//#region 添加删除菜单时加号的颜色
// while user edit menu list, give different color on the button.
function addFlash(id) {
    var id = id.split('buttonAdd');
    DSC(id[1], 180, "b");
    // $("#" + id).html("<img src='images/blue1.png' />");
    // document.getElementById(id).style.backgroundColor = "blue";
    //  var t = setTimeout("document.getElementById('" + id + "').style.backgroundColor = 'green';", 500);
}
function removeFlash(id) {
    //$("#" + id).html("<img src='images/red1.png' />");
    //document.getElementById(id).style.backgroundColor = "blue";
    //var tt = setTimeout("document.getElementById('" + id + "').style.backgroundColor = 'red';", 500);
}
//#endregion
//#region 添加新菜单【与2.3 删除热词对应】
// handle menu list edit. add or remove.
// variable 'menuChange' hold the status of edit, if 'yes', saved changes to database after click 'Done' at bottom.
function addDiv(v, vj) {
    var newInput = $("#" + v).val();
    var newInput = $.trim(newInput);
    newInput = capitalValue(newInput);
    if (!newInput) {
        newInput = "";
    }
    if (newInput.toUpperCase() == "NONE01") {
        alert("please input other keywords");
        $("#" + v).val("");
    } else {
        if (newInput.length <= 1) {
            alert("not allowed, try again");
        }
        else if (v == "addMainInput") {
            //add to main menu
            var j;
            j = arrList.length;

            var divTag = document.createElement("div");
            divTag.id = "ListMainControl" + j;
            divTag.className = "row0Div";
            divTag.setAttribute('onclick', 'openList(\'' + j + '\')');
            divTag.style.width = "87.5%";

            var newContent;
            var strInput = newInput.replace(reg, "+");
            arrList.push(newInput);
            if ($myiPhone == 3) {//低分辨率
                newContent = "<div class='listMain11 listMain1'><img class='smallpic' id='icons" + j + "' src='images/icon29/icon.png' /><img class='bgpic' src='images/icon29/circle.PNG'></div>";
            }
            else {
                newContent = "<div class='listMain11 listMain1'><img class='bigpic' id='icons" + j + "' src='images/icon57/icon.png' /><img class='bgpic1' src='images/icon57/circle.PNG'></div>";
            }
            newContent = newContent + "<div class='listMain2' style='width: 60%;' onclick=\"dis(event);gmbc(0,this," + j + ");clickSearchs('" + strInput + "','" + j + "');\"><div>&nbsp;" + newInput + "</div></div>";
            newContent = newContent + "<div class='zk' id='zk" + j + "'><span>▲</span></div>"; //展开菜单 .zk
            divTag.innerHTML = newContent;
            document.body.appendChild(divTag);
            var mainDiv = document.getElementById("tbList");
            mainDiv.appendChild(divTag);

            var dv = document.createElement("div");
            dv.id = "imgMainDelete" + j;
            dv.innerHTML = "<span class='listEditIconSub' style='display:block' id='removeBt" + j + "' onclick=\"deleteSearch('" + j + "','" + strInput + "','arrListMain','','',this.id)\"><img id='rm" + j + "' src='images/red1.png' /></span>";
            mainDiv.appendChild(dv);

            var subDV = document.createElement("div");
            subDV.id = "listMain" + j;
            subDV.setAttribute('style', 'display:none;');
            var sdvAdd = "<div style='padding-left:40px;' id='listMain2" + j + "'></div>";
            sdvAdd = sdvAdd + "<div class='listEditAdd' id='removeBoxSub" + j + "'>"
            sdvAdd = sdvAdd + "<input class='inputBoxs' onblur='inputtxt(1)' onfocus='inputtxt()' maxlength='22' placeholder='Add new search' id='addInput" + j + "' type='text' />"
            sdvAdd = sdvAdd + "<span class='addNewInputSpan' id='buttonAdd" + j + "' onclick=\"addFlash(this.id);addDiv('addInput" + j + "','" + j + "')\"><img  id='b" + j + "'  src='images/blue1.png' /></span>"
            sdvAdd = sdvAdd + "</div>"
            subDV.innerHTML = sdvAdd;
            mainDiv.appendChild(subDV);
            menuChange = "yes";
            //if ($("#menu1").height() > $("#menu").height()) {
            //$flip.utils.scrollToY($("#menu").height() - $("#menu1").height());
            //alert($("#menu1").height() + "," + $("#menu").height());
            //alert($("#tbList").height());
            //$('#menu1').touchScroll('setPosition', $("#menu1").height() + 10);
            // }
            // alert($("#menu1").height());
        }
        else {
            // add to submenu
            var strInput = newInput.replace(reg, "+");
            var sdv1 = document.createElement("div");
            sdv1.setAttribute = "'style','display:block";
            sdv1.id = "listSub" + vj;
            //var arrSubList = new Array();
            //arrSubList = arrList[vj].toString().split(",");
            arrSubList = ("" + arrList[vj]).split(",");
            arrSubList.push(newInput);

            //arrList[vj] = arrSubList.toString();
            arrList[vj] = "" + arrSubList;
            var i = arrSubList.length - 1;

            var sdv1HTML = "<div id='" + vj + i + "' class='listSub' style='display:block;float:left' onclick=\"gmbc(1,this," + j + ");clickSearchs('" + strInput + "','" + j + "')\"><a>" + newInput + "</a></div>"
            sdv1HTML += "<div id='" + vj + i + "1s'><span style='display:block' class='listEditIconSub' id='" + vj + i + "2s' onclick=\"deleteSearch('" + vj + i + "','" + strInput + "','arrListSub','" + vj + "','" + i + "',this.id);\"><img id='rs" + vj + i + "' src='images/red1.png' /></span></div>";
            sdv1.innerHTML = sdv1HTML;

            var sDv = document.getElementById("listMain2" + vj);
            sDv.appendChild(sdv1);
            menuChange = "yes";
        }
        $("#" + v).val('');
    }
    //$('#menu1').touchScroll('update');
    try {
        var y = myScroll.y;
        myScroll.destroy();
        myScroll = null;
        $("#menu").html('<div id="menu1">' + $("#menu1").html() + '</div>');
        myScroll = new iScroll('menu', { vScrollbar: false }); // setTimeout(function () { $("#menu1").touchScroll('update'); }, 500);
    } catch (e) { console.log(e); }
    // $flip.onload.enableScrollOnContent();
}
//#endregion
//#region 菜单变底色--change menu background color

function gmbc(type, th, j) {
    //debugger;
    // gmbc(0, this, 3);
    //gmbc(1,this,3);
    SearchArr[0] = type;
    SearchArr[1] = j;
    //type:0-main 1-sub
    ta2 = type;
    $("#tbList div.zk span").css('opacity', '0.1');
    if (editSwitch == "") {
        try {
            $("#zk" + j + " span").css('opacity', '0.7');
            $("#tbList .listMain2,#tbList .listSub").css('text-shadow', 'none');
            $("#" + th.id).css('text-shadow', '5px 5px 3px grey');
            $("#" + th.id + " div").css('-webkit-transform', 'scale(1.3)');
            setTimeout('$("#' + th.id + ' div").css("-webkit-transform", "scale(1)");', 200);
            Tid = th.id;
            if (j == 1) {
                Tid = 11;
            }

        } catch (e) {
            //alert(e);
        }
        /* ////debugger;
        $(".listMain2").css('background-color', 'transparent');
        $(".listSub a").css('background-color', 'transparent');
        //th.style.backgroundColor = '#C0C6CF';
        if (type == 0) {
        th.style.backgroundColor = '#C0C6CF';

        //var mdiv = th.parentNode;
        //mdiv.style.backgroundColor = "silver";
        }
        else {
        th.childNodes[0].style.backgroundColor = "#C0C6CF";
        }*/
    }
}
//#endregion
//#endregion

//#region                                 登录后|           书签             【已注释】
//#region 启动登陆操作  已注释，第二版开放
/*
function HasLogin(id) {
if (dic == "" || dic == 0) {
AfterLogin(id);
}
//登陆后用户名
dic = id;
$.ajax({
url: 'Handler/Login.ashx',
type: 'POST',
data: { getInfo: dic },
success: successHandler
});
}
function AfterLogin(id) {
$("#bid").html("Biz ID:" + id);
$("#lblOut").html("Logout");
$("#lblSP").html("Profile");
$("#bid").show();
eMsg(0);
{
jumpTo(0);
$("#function").show(0);
$("#bookMarks").animate({ top: $("#function").height() + $("#getInfo").height() - 49 + 88 });
setTimeout('$("#jiantou").animate({ top: $("#function").height() - 337 });', 2000);
dicsw = false;
testHeight();
}
}*/
//#region 成功后执行
/*
function successHandler(info) {
$("#divBM").show();
//$("#editDone").show();

//【，，，，，，，，，，，，，，，】
//将信息以【，，，】分隔为各模块【菜单、书签名称、书签内容、历史记录】
//1.返回信息模块以，，，分隔
//2.第一模块是菜单
//2.1. 菜单是一维数组  arrList[1] = "ATM,Bank ATM,Drive Thru ATM";
//2.2. 菜单由;划分类型如“ATM,Bank ATM,Drive Thru ATM;Bank,BMO Bank,CIBC,HSBC,RBC,Scotia BANK,TD Bank;”
//3第二模块是书签名
//3.1  书签名是一维数组
//3.2  书签名由:分隔如Daily:Business Suppliers:Friends & Family
//4第三模块是书签内容
//4.1  书签内容是二维数组    arrBookmark[i][1] = ["198478", "Skylon Tower", "5200 Robinson St.", "905-356-2651"];
//4.2  书签内容名由|分隔如"199761", "Waterfalls", "Niagara Pkwy", ""|"198478", "Skylon Tower", "5200 Robinson St.", "905-356-2651"
//5第四模块是历史记录
//5.1  历史记录是一维数组
//5.2  历史记录由,,分隔如Garage,,Gas Station

var data = info.split(",,,");

//0.菜单
var menu1 = data[0];
if (menu1 != '') {
arrList = menu1.split(";");
listMenu(arrList);
}
if (editSwitch == "1") {
$(".listEditIconSub").show();
}

//1.书签名称arrBookmarkName[0]:[1]:[2]
var bmnamelist = data[1];
if (bmnamelist != '') {
arrBookmarkName = bmnamelist.split(":");
var len = arrBookmarkName.length;
for (i = 0; i < len; i++) {
$("#bookMark" + i).html(arrBookmarkName[i]);
}
}

//2.书签内容
var bm1 = data[2];
var bm2 = bm1.split("|"); //分割书签集合
arrBookmark = bm2;
for (i = 0; i < bm2.length; i++) {
arrBookmark[i] = bm2[i].split(";"); //分隔各书签
arrBookmark[i].pop();
for (j = 0; j < arrBookmark[i].length; j++) {
arrBookmark[i][j] = bm2[i][j].split("￥"); //分隔书签内信息
}
}

//3.历史记录
var his = data[3];
if (his != '') {
verHistory = his;
//showHistory();
}
//#endregion
}
*/
//#endregion
//#endregion
//#region 书签相关      已注释，第二版开放
//#region 显示书签名称
/*
function insertBMName() {
arrBookmarkName = ["Bookmark1", "Bookmark2", "Bookmark3"];
for (i = 0; i < arrBookmarkName.length; i++) {
$("#bookMark" + i).html(arrBookmarkName[i]);
}
}
insertBMName();
*/
//#endregion
//#region 生成书签列表
/*
var listValue;
function bookmarkList(n) {
//获取书签名
var v = $("#bookMark" + n).html();
//如果书签内容为空
listValue = "<p onclick=bookMark(" + n + ")>&nbsp;bookMark " + v + " is empty.&nbsp;&nbsp;&nbsp;<span class='closeSpan'>Close</span><br>&nbsp;&nbsp;&nbsp;(search results can be saved here)</p>";

if (arrBookmark[n].length > 0) {
listValue = "<table>";
for (i = 0; i < arrBookmark[n].length; i++) {
var arrV = arrBookmark[n][i][1].replace(reg, "&#32;")  //if no replace, cannot handle remove;
listValue += "<tr id='trBM" + n + i + "'><td>&nbsp;&nbsp;&nbsp;</td>";
listValue += "<td class='td_bmMiddle'>";
if (arrBookmark[n][i][0].indexOf('dic02') == -1) {
listValue += "<a href='#' onclick=click_search('dic00" + arrBookmark[n][i][0] + "')>" + arrBookmark[n][i][1] + "</a>";
listValue += "<p class='p_smallfont'>" + arrBookmark[n][i][2] + "</p>";
listValue += "<p class='p_smallfont'><a href='tel:" + arrBookmark[n][i][3] + "'>Tel:&nbsp;&nbsp;" + arrBookmark[n][i][3] + "</p>";
}
else {
listValue += "<a href='#' onclick=click_search('" + arrBookmark[n][i][0] + "')>" + arrBookmark[n][i][1] + "</a>";
listValue += "<p class='p_smallfont'></p>";
listValue += "<p class='p_smallfont'>" + arrBookmark[n][i][2] + "</p>";
}
listValue += "</td><td class='td_bmRight'><img onclick=\"removeBMs('" + n + "','" + i + "','" + arrV + "','" + arrBookmark[n][i][0] + "')\" src='images/delete17gray.png' border='0' alt='R'/></td></tr>";
}
listValue += "<tr onclick=\"bookMark(" + n + ")\"><td></td><td colspan=2><br><span class='closeSpan'>Close</span></td></tr></table>";
}
$("#bookMarks").html(listValue);
}
*/
//#endregion
//#region 显示书签内容
// open/close pages when click different bookmark bar
// if editing bookmark, use 'Input' instead of text, alow user to change the name.
// 'Edit on what you see' will be one of our design rules.
/*
function bookMark(n) {

//    if ($("#function").is(":visible")) {
//        $("#jiantou").css('top', '-314px');
//    } else {
//        $("#jiantou").css('top', '-336px');
//    }
switch (n) {
case 0: $("#jiantou").animate({ left: "48px" }); break;
case 1: $("#jiantou").animate({ left: "154px" }); break;
case 2: $("#jiantou").animate({ left: "261px" }); break;
}
if (editSwitch == "") {
bookmarkList(n);
if ($("#bookMarks").is(":visible") && BMNum == n) {//
$("#jiantou,#bookMarks").hide(250);
document.getElementById("bookMark" + n).style.background = "-webkit-gradient(linear, left top,right top, from(#ffffc0),color-stop(0.5, #ffffee),to(#ffffcc))";
document.getElementById("bookMark" + n).style.background = "-moz-linear-gradient(left,#ffffc0, #ffffee, #ffffcc)";
}
else {
$("#jiantou,#bookMarks").show(250);
BMNum = n;
for (i = 0; i < 3; i++) {
if (i != parseInt(n)) {
document.getElementById("bookMark" + i).style.background = "-webkit-gradient(linear, left top,right top, from(#ffffc0),color-stop(0.5, #ffffee),to(#ffffcc))";
document.getElementById("bookMark" + i).style.background = "-moz-linear-gradient(left,#ffffc0, #ffffee, #ffffcc)";
}
else {
document.getElementById("bookMark" + i).style.background = "-moz-linear-gradient(left, #fafafa, #dddddd)";
document.getElementById("bookMark" + i).style.background = "-webkit-gradient(linear, left top, left bottom,from(#dedede),color-stop(0.5, #efefef),to(#dedede))";
}
}
}
}
else {//编辑状态
var arrV = arrBookmarkName[n].replace(reg, "&#32;"); //被点击的书签名
$("#bookMark" + n).html("<input onblur=\"renameBM('" + n + "','" + arrV + "')\" id='inputBookmark" + n + "' placeholder='" + arrBookmarkName[n] + "' maxlength='20' class='inputBookmark'>");
$("#inputBookmark" + n).focus();
if ($("#bookMarks").is(":visible")) {
$("#bookMarks").hide();
document.getElementById("bookMark" + n).style.background = "-webkit-gradient(linear, left top,right top, from(#ffffc0),color-stop(0.5, #ffffee),to(#ffffcc))";
document.getElementById("bookMark" + n).style.background = "-moz-linear-gradient(left,#ffffc0, #ffffee, #ffffcc)";
}
}
}
*/
//#endregion

//storage.setItem("arrSaved", '');

//#region 更改书签名称           
// handle input of bookmark changes
/*
function renameBM(n, vbm) {//第N个书签，原书签名
var v = $("#inputBookmark" + n).val();
if (v.length > 0) {
v = capitalValue(v);
$("#bookMark" + n).html(v);
arrBookmarkName.splice(n, 1, v);
bmNameChange = "yes"
}
else {
$("#bookMark" + n).html(vbm);
}
}
*/

//#endregion
//#region  首字母大写        
// upper case fist input.
function capitalValue(vv) {
    if (vv.length > 0) {
        vv = vv.charAt(0).toUpperCase() + vv.substring(1);
        if (vv.indexOf(' ') >= 1) {
            var ww = vv.split(" ");
            for (var i = 0; i < ww.length; ++i) {
                ww[i] = ww[i].charAt(0).toUpperCase() + ww[i].substring(1);
                vv = ww.join(" ");
            }
        }
        return vv;
    }
}
//#endregion
//#region  保存书签

// save business info to bookmark from search result.
/*
function saveBM(n) {
var varSaveBM = [];
var vt;
vt = $("#valuePass").html();
//需要保存的商家信息
varSaveBM = vt.split("￥");
// if has,no save
//    var strBM = "";
//    if (arrBookmark[n] != null) {
//        strBM = arrBookmark[n].toString();
//    }
var bmswitch = false;
//1.把id集合  
var bmarr = [];
//3.匹配为true    //4.为true  执行下面的
if (arrBookmark[n] != null) {
for (var i = 0; i < arrBookmark[n].length; i++) {
if (arrBookmark[n][i] != null) {
bmarr.push(arrBookmark[n][i][0]);
}
}
}
//2.循环匹配   
if (bmarr != "") {
for (var i = 0; i < bmarr.length; i++) {
if (bmarr[i] == varSaveBM[0]) {
bmswitch = true;
}
}
}
if (!bmswitch) {
arrBookmark[n].push(varSaveBM);
var vtemp = $("#saveBM" + n).html();
$("#saveBMmsg").html("Saved to Bookmark '" + vtemp + "'");
// instant save bookmark
if (dic != 0 && dic != "") {
//vt = vt.replace("+", "strplus");
//vt = vt.replace(reg, "+");
//vt = vt.replace("&", "amp38");
//  $.post("ajax_saveChanges.asp?", { a: dic, b: "bma", v: vt, n: n });
//保存书签信息至数据库
$.ajax({
url: 'Handler/Login.ashx',
type: 'POST',
data: { saveBookmark: dic, n: n, bm: vt },
error: function (a, info) {
alert("saveBookmark  error " + a + info);
}
});
}
}
else {
$("#saveBMmsg").html("Its already in Bookmark" + (n + 1) + "");
}
}
*/
//#endregion
//#region 保存商家信息到书签
function saveSearch(uaid, name, addr, uph, ccode, isshow, sos, scode, id) {
    $("#" + id).css('-webkit-transform', 'scale(1.3)');
    setTimeout(function () {
        $('#' + id).css('-webkit-transform', 'scale(1)');
        $('#' + id).html('Saved');
        $("#_save").css('margin-left', '50px');
    }, 400);
    /*$("#saveBMmsg").html("");
    $("#DivSaveSearch").show(500);
    name = jQuery.trim(name);
    addr = jQuery.trim(addr);
    $("#valuePass").html(uaid + "￥" + name + "￥" + addr + "￥" + uph);
    $("#saveBMName").html("'" + name + "'");

    for (i = 0; i < arrBookmarkName.length; i++) {
    $("#saveBM" + i).html(arrBookmarkName[i]);
    }
    */
    /*
    $("#page3_details").css("background-color", "#d7d8d9");
    $("#page3_details").show();
    shareBiz(name);
    */
    //debugger;
    bizEve();
    showswitch = true;
    google.maps.event.trigger(map, 'resize');
    //从本地存储中获取保存的信息字符串到临时变量tarrSaved中
    tarrSaved = storage.getItem("arrSaved");
    $("#page3_details").css("background-color", "#d7d8d9");
    //判断是否已经存在的开关
    var savedexist = false;
    var RealArr = [];
    try {
        RealArr = tarrSaved.split(';');
        RealArr.pop();
    } catch (e) {

    }

    //如果ccode为空，则为0，防止出现undefined情况
    if (!ccode) {
        ccode = 0;
    }
    //storage.removeItem("arrSaved");

    //#region 取出所有的id，放到数组中，遍历【存在相同的则为true】
    var RepeatItem = [];
    if (tarrSaved) {
        var Tsavedidarr = [];
        Tsavedidarr = tarrSaved.split(';');
        Tsavedidarr.pop();

        for (var i = 0; i < Tsavedidarr.length; i++) {
            Tsavedidarr[i] = Tsavedidarr[i].split('￥');
            //if (Tsavedidarr[i][0] == uaid) {
            if (uaid == "address") {
                if (Tsavedidarr[i][2] == ccode) {
                    //debugger;
                    savedexist = true;
                    RepeatItem[0] = 'address';  //type
                    RepeatItem[1] = i;          //第N个,从0开始
                    RepeatItem[2] = Tsavedidarr[i]; //数据
                    break;
                }
            }
            else if (Tsavedidarr[i][4] == ccode) {
                //debugger;
                savedexist = true;
                RepeatItem[0] = 'biz';  //type
                RepeatItem[1] = i;          //第N个
                RepeatItem[2] = Tsavedidarr[i]; //数据
                break;
            }
        }
    }
    //#endregion
    //#region 循环匹配重复项 2011.09.19
    //savedexist = false;
    /*if (tarrSaved) {
    var Tsavedidarr = [];
    Tsavedidarr = tarrSaved.split(';');
    Tsavedidarr.pop();
    for (var i = 0; i < Tsavedidarr.length; i++) {
    Tsavedidarr[i] = Tsavedidarr[i].split('￥');
    if (Tsavedidarr[i][2] == gpsLL) {
    savedexist = true;
    }
    }
    }*/
    //#endregion

    //如果是不重复的
    if (!savedexist) {
        //防止手机处理出现异常
        //如果没有值，则为空，防止出错
        if (tarrSaved == null || tarrSaved == "null") {
            tarrSaved = "";
        }
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        var h = date.getHours();
        var mm = date.getMinutes();
        var time = "";
        if (h > 12) {
            time = (h - 12) + ":" + mm + " PM";
        }
        else {
            time = h + ":" + mm + " AM";
        }

        //time = time.split('/'); //月、日、年、时分A/PM
        //date1用在shared ->saved
        //date 用在biz->saved
        date1 = m + "/" + d + "/" + y + '=' + getSMAX();
        date = m + "/" + d + "/" + y + "/" + time;
        if (name.indexOf('Shared Location:') == 0) {
            //"Saved Location: 9/23/2011￥123￥(43.66557265746533, -79.37734057764055);"
            //var tname = name.replace('Shared', 'Saved');
            var tname = 'Saved Location: ' + date1;
            //gpsLL = latLngControl.updatePosition();
            //#region get gps
            // [(43.65241357047869, -79.39237234751226)](#1#)
            var tttgps = $("#tt1").html();
            tttgps = tttgps.split('[(')[1];
            tttgps = tttgps.split(')]')[0];
            gpsLL = '(' + tttgps + ')';
            //#endregion
            tarrSaved = tname + "￥" + addr + "￥" + gpsLL + ";" + tarrSaved;
            storage.setItem("arrSaved", tarrSaved);
            tname = tname.replace('Saved Location:', '');
            savedToDB('LL', addr, tname, gpsLL);
        }
        else {
            if (uaid == "address") {
                //address       toronto         id
                tarrSaved = uaid + "￥" + name + "￥" + ccode + "￥" + date + ";" + tarrSaved; // + addr + "￥" + uph + "￥"
            }
            else {
                tarrSaved = uaid + "￥" + name + "￥" + addr + "￥" + uph + "￥" + ccode + "￥" + date + ";" + tarrSaved;
            }
            storage.setItem("arrSaved", tarrSaved);
            if (uaid == 'address') {
                savedToDB('A', ccode, date);
            }
            else {
                savedToDB('B', ccode, date);
            }
        }

        /*        var latlng
        if (gpsLL && gpsLL != "") { latlng = gpsLL; }
        else { latlng = gps; }
        var msg = ccode;
        */
        //保存商家信息至cookie
        /*$.ajax({
        url: 'Handler/Login.ashx',
        type: 'POST',
        data: { saved: ccode }
        });*/
    }
    else {
        //如果是重复的
        var RepeatType = RepeatItem[0];
        var RepeatNum = RepeatItem[1];
        var RepeatData = RepeatItem[2];
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        var h = date.getHours();
        var mm = date.getMinutes();
        var time = "";
        if (h > 12) {
            time = (h - 12) + ":" + mm + " PM";
        }
        else {
            time = h + ":" + mm + " AM";
        }
        date = m + "/" + d + "/" + y + "/" + time;
        if (RepeatType == "address") {
            RepeatData[3] = date;
        }
        else {
            RepeatData[5] = date;
        }
        //debugger;
        RepeatData = RepeatData.join('￥');
        RealArr.splice(RepeatNum, 1); //del repeat item
        //  Tsavedidarr.splice(0, 1, 'aaa'); //insert the same one
        RealArr.splice(0, 0, RepeatData); //insert the same one
        RealArr = RealArr.join(';') + ";";
        storage.setItem("arrSaved", RealArr);
        closesaved(null, 1);
        setTimeout('$("#showsaved").click();', 500);

    }
    //#isshow#是否显示此代码，当为shared附属功能时不予显示，则为true

    if (!isshow) {
        //name == name.replace("#39#", "'");
        //name = ReplaceF(name);
        $("#page3_detail").html('<div id="Lsd">Location saved.</div><div id="shareit" onclick="shareBiz(true, \'' + uaid + '\', \'' + name + '\',\'' + addr + '\', \'' + uph + '\', \'' + ccode + '\',null,true)">Share it</div><br><div id="backonList" onclick="click_back()">Go Back</div><div id="closeDetails" class="close"  onclick="closeDetails();"><span class="chahao">×</span></div>'); //<div id="closeDetails1" onclick="closeDetails();"><span class="chahao">× </span></div>
        $("#page3_details").show();
        $("#closeDetails").css("margin", "8px 28px");
    } else {
        if (sos == "address") {//false: saved
            $("#page3_detail").html('<div id="Lsd">Address saved.</div><br><br><div id="closeDetails1"  class="close" onclick="closeDetails(1);"><span class="chahao">×</span></div><div id="backonList" onclick="click_back()">Go Back</div><div id="closeDetails"  class="close" onclick="closeDetails(2);"><span class="chahao">×</span></div>');
            $("#backonList").css('margin-left', '70px');
            $("#closeDetails").css('margin', '0px 10px');
            //debugger;
            if (closeLR == "L") {
                $("#closeDetails").html('');
                $("#closeDetails").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
            }
            else {
                $("#closeDetails1").html('');
                $("#closeDetails1").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
            }
        }
        else if (sos) {//true:share
            $("#page3_detail").html('<div id="Lsd">Location shared.</div><br><br><div id="closeDetails1"  class="close" onclick="closeDetails();"><span class="chahao">×</span></div><div id="backonList" onclick="click_back()">Go Back</div><div id="closeDetails"  class="close" onclick="closeDetails();"><span class="chahao">×</span></div>');
        }
        else {//false: saved
            $("#page3_detail").html('<div id="Lsd">Location saved.</div><br><br><div id="closeDetails1"  class="close" onclick="closeDetails();"><span class="chahao">×</span></div><div id="backonList" onclick="click_back()">Go Back</div><div id="closeDetails"  class="close" onclick="closeDetails();"><span class="chahao">×</span></div>');
            $("#backonList").css('margin-left', '50px');
            $("#closeDetails").css('margin', '0px 10px');

        }
        //$("#page3_details").hide();
    }
}
//#endregion
//#region 保存Event信息到书签
function saveEvent(uaid, name, addr, uph, ccode, isshow, sos, scode, id) {
    //debugger;
    $(".ESave").css('-webkit-transform', 'scale(1.3)');
    setTimeout(function () {
        $(".ESave").css({ '-webkit-transform': 'scale(1)', 'background': 'none', 'border': '0px' });
        $(".ESave").html('Saved');
    }, 400);

    bizEve();
    showswitch = true;
    google.maps.event.trigger(map, 'resize');
    //从本地存储中获取保存的信息字符串到临时变量tarrSaved中
    tarrSaved = storage.getItem("arrSaved");
    $("#page3_details").css("background-color", "#d7d8d9");
    //判断是否已经存在的开关
    var savedexist = false;
    var RealArr = [];
    try {
        RealArr = tarrSaved.split(';');
        RealArr.pop();
    } catch (e) {

    }

    //如果ccode为空，则为0，防止出现undefined情况
    if (!ccode) {
        ccode = 0;
    }
    //storage.removeItem("arrSaved");

    //#region 取出所有的id，放到数组中，遍历【存在相同的则为true】
    var RepeatItem = [];
    if (tarrSaved) {
        var Tsavedidarr = [];
        Tsavedidarr = tarrSaved.split(';');
        Tsavedidarr.pop();

        for (var i = 0; i < Tsavedidarr.length; i++) {
            Tsavedidarr[i] = Tsavedidarr[i].split('￥');
            //if (Tsavedidarr[i][0] == uaid) {
            if (uaid == "address") {
                if (Tsavedidarr[i][2] == ccode) {
                    //debugger;
                    savedexist = true;
                    RepeatItem[0] = 'address';  //type
                    RepeatItem[1] = i;          //第N个,从0开始
                    RepeatItem[2] = Tsavedidarr[i]; //数据
                    break;
                }
            }
            else if (Tsavedidarr[i][4] == ccode) {
                //debugger;
                savedexist = true;
                RepeatItem[0] = 'biz';  //type
                RepeatItem[1] = i;          //第N个
                RepeatItem[2] = Tsavedidarr[i]; //数据
                break;
            }
        }
    }
    //#endregion    

    //如果是不重复的
    if (!savedexist) {
        //防止手机处理出现异常
        //如果没有值，则为空，防止出错
        if (tarrSaved == null || tarrSaved == "null") {
            tarrSaved = "";
        }
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        var h = date.getHours();
        var mm = date.getMinutes();
        var time = "";
        if (h > 12) {
            time = (h - 12) + ":" + mm + " PM";
        }
        else {
            time = h + ":" + mm + " AM";
        }

        //time = time.split('/'); //月、日、年、时分A/PM
        //date1用在shared ->saved
        //date 用在biz->saved
        date1 = m + "/" + d + "/" + y + '=' + getSMAX();
        date = m + "/" + d + "/" + y + "/" + time;
        if (name.indexOf('Shared Location:') == 0) {
            //"Saved Location: 9/23/2011￥123￥(43.66557265746533, -79.37734057764055);"
            //var tname = name.replace('Shared', 'Saved');
            var tname = 'Saved Location: ' + date1;
            //gpsLL = latLngControl.updatePosition();
            //#region get gps
            // [(43.65241357047869, -79.39237234751226)](#1#)
            var tttgps = $("#tt1").html();
            tttgps = tttgps.split('[(')[1];
            tttgps = tttgps.split(')]')[0];
            gpsLL = '(' + tttgps + ')';
            //#endregion
            tarrSaved = tname + "￥" + addr + "￥" + gpsLL + ";" + tarrSaved;
            storage.setItem("arrSaved", tarrSaved);
            tname = tname.replace('Saved Location:', '');
            savedToDB('LL', addr, tname, gpsLL);
        }
        else {
            //            if (uaid == "address") {
            //                //address       toronto         id
            //                tarrSaved = uaid + "￥" + name + "￥" + ccode + "￥" + date + ";" + tarrSaved; // + addr + "￥" + uph + "￥"
            //            }
            //            else {
            tarrSaved = uaid + "￥" + "Ev*" + name + "￥" + addr + "￥" + uph + "￥" + ccode + "￥" + date + ";" + tarrSaved;
            //}
            storage.setItem("arrSaved", tarrSaved);
            //            if (uaid == 'address') {
            //                savedToDB('A', ccode, date);
            //            }
            //            else {
            savedToDB('B', ccode, date);
            // }
        }

    }
    else {
        //如果是重复的
        var RepeatType = RepeatItem[0];
        var RepeatNum = RepeatItem[1];
        var RepeatData = RepeatItem[2];
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        var h = date.getHours();
        var mm = date.getMinutes();
        var time = "";
        if (h > 12) {
            time = (h - 12) + ":" + mm + " PM";
        }
        else {
            time = h + ":" + mm + " AM";
        }
        date = m + "/" + d + "/" + y + "/" + time;
        if (RepeatType == "address") {
            RepeatData[3] = date;
        }
        else {
            RepeatData[5] = date;
        }
        //debugger;
        RepeatData = RepeatData.join('￥');
        RealArr.splice(RepeatNum, 1); //del repeat item
        //  Tsavedidarr.splice(0, 1, 'aaa'); //insert the same one
        RealArr.splice(0, 0, RepeatData); //insert the same one
        RealArr = RealArr.join(';') + ";";
        storage.setItem("arrSaved", RealArr);
        closesaved(null, 1);
        setTimeout('$("#showsaved").click();', 500);

    }

}
//#endregion
//#region 关闭
/*
function CloseDivSaveSearch() {
$("#DivSaveSearch").hide(100);
}*/
//#endregion

//storage.removeItem("arrSaved");
/*
function goMenu() {
CloseDivSaveSearch();
click_back();
}*/
//#endregion
//#endregion
//storage.setItem("arrSaved", '');

//#region  移除书签 【removeBMs】【removeBM2s】
//移除某个书签并保存【如果登陆的话】【第几个书签(-)，第几个书签(|),名字，商家id】//移除saved shared

function removeBMs(n, i, name, id) {
    deleting = true;
    try {
        exPo1 = $('#si').touchScroll('getPosition');
        name = ReplaceF(name);
        var tname = name.split('=')[0];
        var r = confirm("Remove '" + tname + "' ?");
        //== ====================
        tarrSaved = storage.getItem("arrSaved");
        var Tsavedarr = [];
        Tsavedarr = tarrSaved.split(';');
        Tsavedarr.pop();
        if (r == true) {
            $("#trBM" + n).hide();
            //$("#trBM" + n).css('visibility', 'hidden');
            Tsavedarr.splice(i, 1);
            storage.removeItem("arrSaved");
            if (tarrSaved == null) {
                tarrSaved = "";
            }
            if (Tsavedarr.length == 0) {
                storage.setItem("arrSaved", '');
            }
            else {
                tarrSaved = Tsavedarr.join(';') + ";";
                storage.setItem("arrSaved", tarrSaved);
            }
            if (getAccountLevel() > 1) {
                var code;
                try {
                    code = $.trim(name.split(':')[1]);
                } catch (e) { catche(e); }
                if (id) {
                    code = id;
                }
                $.ajax({
                    url: 'Handler/Login.ashx',
                    type: 'POST',
                    data: {
                        delsaved: code,
                        who: who
                    },
                    error: function (a, info) {
                        alert("removeBMs save error " + a + info);
                    }
                });
            }
        }
        //======================
        /*   if (r == true) {
        $("#trBM" + n + i).hide();
        arrBookmark[n].splice(i, 1);
        //nx++;
        if (arrBookmark[n].length == 0) {
        $("#bookMarks").html("<p onclick=\"bookMark(" + n + ")\">&nbsp;This bookMark is empty.&nbsp;&nbsp;&nbsp;<span class='closeSpan'>Close</span><br>&nbsp;&nbsp;&nbsp;(search results can be saved here)</p>");
        }

        //instant update bookmark
        if (dic != 0 && dic != "") {
        $.ajax({
        url: 'Handler/Login.ashx',
        type: 'POST',
        data: { removeBMs: dic, no: n, uid: id },
        error: function (a, info) {
        alert("removeBMs save error " + a + info);
        }
        });
        }
        }*/
        showsaved();
        $("#si").touchScroll("setPosition", exPo1)
        setTimeout('testShared();deleting=false', 500);
    } catch (e) { catche(e); }
}
//移除分享
function removeBM2s(n, i, name, scode) {
    deleting = true;
    try {
        exPo2 = $('#si').touchScroll('getPosition');
        name = ReplaceF(name);
        var r = confirm("Remove '" + name + "' ?");
        tarrSaved = storage.getItem("arrShared");
        var Tsavedarr = [];
        Tsavedarr = tarrSaved.split(';');
        Tsavedarr.pop();
        if (r == true) {
            $("#trBM" + n).hide();
            //$("#trBM" + n).css('visibility', 'hidden');
            Tsavedarr.splice(i, 1);
            storage.removeItem("arrShared");
            if (tarrSaved == null) {
                tarrSaved = "";
            }
            if (Tsavedarr.length == 0) {
                storage.setItem("arrShared", '');
            }
            else {
                tarrSaved = Tsavedarr.join(';') + ";";
                storage.setItem("arrShared", tarrSaved);
            }
            if (scode) {
                $.ajax({
                    url: 'Handler/Login.ashx',
                    type: 'POST',
                    data: {
                        delshared: scode,
                        who: who
                    }
                });
            }
        }
        showshared();
        $("#si").touchScroll("setPosition", exPo2);
        setTimeout('testShared();deleting=false', 500);
    } catch (e) { catche(e); }
}
//#endregion 

//#region                           历史记录相关                             【已注释】
/*
function showHistory() {
if (verHistory != '') {
var divHistory = "";
var verH = verHistory.split(",,");
//如果最后一个是空值
if (verH[verH.length - 1] == "") {
verH.pop();
}

for (i = 0; i < verH.length; i++) {
if (i <= 9) {
divHistory += "<a href='javascript:;' onclick=\"click_search('" + verH[i] + "')\">" + verH[i] + "</a><br>";
}
}
$("#div_History2").html(divHistory);
$("#div_History").show();
}
else {
$("#div_History2").html("");
}
}
//清空记录
function clearHistory() {
$("#div_History2").html("");
verHistory = '';
//保存至数据库
$.ajax({
url: 'Handler/Login.ashx',
type: 'POST',
data: { clearHistory: dic },
success: function () {
$("#tb_search").hide();
},
error: function (a, info) {
alert("clearHistory  error !");
}
});
}*/
//#endregion

//#region                                   搜索
var stvar = []; //setTimeout对象集合
var sivar = []; //setInterval对象集合
var clickSearching = false;
var firstseringps = false;
var searvar;
var deleting = false;
var ttttnum = 3;
var siResearch;
function click_searchs(kw, sl, notes, gpsll, st, from) {
    setTimeout(function () {
        if (deleting) {
            //return;
        }
        click_search(kw, sl, notes, gpsll, st, from);
    }, 200);
}
var si1795;
function click_search(kw, sl, notes, gpsll, st, from) {//st: search type[]
    //debugger;
    //debugger;
    //alert(1789);
    if (!hisw) {
        click_map();
    }
    if (fir) {
        detectBrowser();
    }
    if (kw == "111") {
        $("#showsaved,#showshared,#showaccount,#showevents").css("width", "30%");
        $("#showdraw").css({ "width": "10%", "height": "41px", "padding": "0px" });
        $("#showdraw").show();
        return;
    }
    try {
        if (deleting) {
            return;
        }
        //debugger;
        //如果不是
        if (((kw.toLowerCase() == keywords.toLowerCase()) && gpschange != 'yes' && kw != 'dic$') && from != "res" || !kw) {
            //alert(1266);
            click_map();
        }
        else if (!!kw) {
            firstseringps = true;
            //$("#cover").show();
            CoverTouch();
            //debugger;
            if ((($.trim(kw).toLowerCase() == "nearby") || ($.trim(sl).toLowerCase() == "nearby")) && (storage.getItem("account") != null && storage.getItem("account") != "")) {
                kw = "dic$";
                sl = "Nearby";
                notes = null;
                gpsll = null;
                st = 7;
            }
            searvar = kw + ";" + sl + ";" + notes + ";" + gpsll + ";" + st;
            //alert(1103);
            //alert(gps);
            listPool = null; //释放内存
            search = true;
            clickSearching = true;
            isSearching = true;
            MapLock();
            //clickSearch(kw, sl, notes, gpsll, st);
            /**/
            //if (gps.length < 1) {
            if (firser || gps.length < 1) {
                // $("#list").html("<center> <br><br><br>Positioning ...<br><br><br><img src=\"images/loading/loading11.gif\" /></center>");
                //console.log(1846);
                //console.log("1: " + new Date());
                si1795 = setTimeout(function () {
                    //console.log("2: " + new Date());

                    // checksearch();
                }, 2000);
                //sivar[0] = setInterval('$("#list").html("<center> <br><br><br>Positioning ..."+(-- ttttnum)+"</center>");if(ttttnum == 0){checksearch()}', 1000);
                //$("#listin").html("<center><br><br><br>Positioning ...<br><div id=\'jindutiao\'><div></div></div></center>");
                //  $("#jindutiao div").css('-webkit-transition-duration', '1s');

                $("#listin").html("<center><br><br><br>Positioning ...<br><div id=\'jindutiao\'><div></div></div></center>");
                // sivar[0] = setInterval('-- ttttnum;testjindutiao(ttttnum);if(ttttnum == 0){checksearch()}', 1000);
                // checksearch();

                //                sivar[0] = setInterval('-- ttttnum;if(ttttnum == 0){checksearch()}', 1000);
                //  $("#jindutiao div").width("100%");

                //替换为更保险的方法：回调函数
                $("#jindutiao div").animate({ width: "100%" }, 4000, function () {
                    checksearch();
                });



                //sivar[0] = setInterval('$("#list").html("<center><br><br><br>Positioning ...<br><div id=\'jindutiao\'><div></div></div>"+()+"</center>");testjindutiao(ttttnum);if(ttttnum == 0){checksearch()}', 1000);
                // $("#list").html(" Positioning...<br><br>");
                // setTimeout("clickSearch('" + kw + "','" + sl + "','" + notes + "','" + gpsll + "','" + st + "')", 2000);
                //$(\"#list\").html(\"<center> <br><br><br>Searching ...</center>\");
                // // //debugger;;
                //     var stinfo = "clickSearch('" + kw + "', '" + sl + "', '" + notes + "', '" + gpsll + "', '" + st + "')";
                //stvar[1] = setTimeout("clickSearch('" + kw + "','" + sl + "','" + notes + "','" + gpsll + "','" + st + "');", 3000);
                //     stvar[1] = setTimeout(stinfo, 2000);
                //  console.log("3: " + new Date());

                // checksearch();
                // checksearch();
                //setTimeout('checksearch()', 2000);

                $("#map").show();
                //document.getElementById('map').style.visibility = 'visible';
                //document.getElementById('map_canvas').style.visibility = 'visible';
            }
            else {
                clickSearch(kw, sl, notes, gpsll, st);
            }

            keywords = kw;
        }

    } catch (e) {
        //debugger;
        catche(e);
    }
}
function testjindutiao(x, y) {
    if (!!y && x < 21) {
        //debugger;
        $("#jindutiao div").width(100 * (x / 20) + "%");
    }
    else {
        if (x == "2") {
            $("#jindutiao div").width("50%");
        }
        else if (x == "1") {
            $("#jindutiao div").width("100%");
        }
    }
}
var si1804;
function checksearch() {
    //$("#jindutiao div").width("100%");
    clearTimeout(si1795);
    //si1804 = setTimeout('$("#list").html("<center> <br><br><br>Searching ...</center>")', 200);
    if (!isallowgps) {//seachtime == 0 && 
        if (searvar) {
            setTimeout(function () {
                searvar = searvar.split(';');
                clickSearch(searvar[0], searvar[1], searvar[2], searvar[3], searvar[4]);
            }, 2000);
        }
    }
}
var firser = true;
var seachtime = 0;
var sia;
var firgps = true;
var seachpara = "";
var searchSec = 0;
var T11gps;
var firser1 = true;
var service;
var infowindow;
var GSearch;
var PZkw = "";
//Main
var listPool = [];
var listNum;
function clickSearch(kw, sl, notes, gpsll, st) {
    // alert(1925);
    //debugger;
    //console.log("here00");
    if (!researching) {
        SearchGPS = null;
        clearMarkGPS(1);
    }
    PZkw = "";
    $("#bizName").hide();
    $("#bizName").html('');
    try {
        directionsRenderer.setMap(null);

    } catch (e) {

    }
    if (st != '10' && st != '11') {
        AddHistory(kw);
    }
    ////
    //alert(1162);
    //if (!hisw) {
    //backmap(1);
    //return;
    //}

    try {
        if (newMaker) {
            for (i in newMaker) {
                newMaker[i].setMap(null);
            }
        }
    } catch (e) {

    }
    if (!firser) {
        try {
            //// // // //  // //debugger;;
            sia.abort();
        }
        catch (e) { catche(e); }
    }
    seachtime++;
    searchSec = 0;
    clearInterval(sisearchSecondFun);
    sisearchSecondFun = setInterval('searchSecondFun();', 1000);
    //alert(1141);
    seachpara = kw + "￥" + sl + "￥" + notes + "￥" + gpsll + "￥" + st;
    isSearching = true;
    keywords = kw;
    exi = "";
    // //  // //debugger;;
    //$("#list").html("<center> <br><br><br>Searching ...<br><br><br><img src=\"images/loading/loading11.gif\" /></center>");
    try {
        clearInterval(sivar[0]);
        //$("#list").html("<center> <br><br><br>Searching ...</center>");
        clearTimeout(stsia);
        //infowindow.close();
    } catch (e) {
        //alert(e);
        //catche(e);
    }
    //sivar[1] = setInterval('$("#list").html("<center> <br><br><br>Searching ...</center>");', 100);
    //$("#list").html("<center> <br><br><br>Searching ...</center>");
    //setTimeout(function () {
    //debugger;
    if (!isSearching) {
        return;
    }
    ttttnum = 5;
    $("#listin").html("<center> <br><br><br>Searching ...<br><div id=\'jindutiao\'><div></div></div></center>");
    $("#jindutiao div").css('-webkit-transition-duration', '20s');
    $("#jindutiao div").width("100%");
    // sivar[1] = setInterval('++ ttttnum;testjindutiao(ttttnum,1);if(ttttnum == 20){ clearInterval(sivar[1]);}', 1000);
    // }, 1000);
    kw = kw.replace(/\+{1,}/g, " ");
    newkw = kw;
    if (kw == 'kw') {
        kw = $("#keywords2").val();
    }
    //if (re1.test(kw)) {
    //alert("wrong keyworks");
    var ckw = kw;
    ckw = ckw.replace(re1, " ");
    //$("#keywords2").val(ckw);
    kw = ckw;
    //}
    //else {
    /* if (gpsLL != "") {
    var marker = new google.maps.Marker({
    position: gpsLL,
    icon: gpsicon,
    map: map
    });
    markerGPS.push(marker);
    newgps = gpsLL;
    }
    else */
    //2.清空markers
    deleteOverlays();
    //alert(gpsState);
    if ((gps == "" || gpsState == 2) && (gpsState != 0)) {
        //确定定位之后，清除之前的gps
        try {
            clearMarkGPS();
            gpsLL = latLngControl.updatePosition();
            gps = GetgpsLL();
        } catch (e) {
            //alert(2026);
            //catche(e);
        }
        if (gps == "" || gps == null) {
            gps = "43.6702131,-79.38679";
            gpsLL = "(43.6702131,-79.38679)";
        }
        gpsState = 2;
        try {
            gpsMaker = new google.maps.Marker({
                position: gpsLL,
                icon: gpsicon,
                map: map
            });

            if (gpsMaker) {
                markerGPS.push(gpsMaker);
                addClicktoMarker(gpsMaker, gpsLL);
                newgps = gpsLL;
            }

        } catch (e) {
            //catche(e);
        }
        //gps = latLngControl.updatePosition();
        //gps = gps.toString().substr(1, gps.toString().length - 2);
    }
    //alert(gpsState);
    //alert(gps);
    luckyReady = true;
    if (kw != "") {
        kws = kw;
        exgps = gps;
        var tgps;
        tgps = gps;
        //debugger;
        //#region 搜索次数入库[when who times]
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        date = y + ":" + m + ":" + d;
        var SearchTime;
        //debugger;
        if (storage.getItem("SearchTime")) {
            SearchTime = storage.getItem("SearchTime").split(';');
            var SearchWho = SearchTime[0];
            var SearchWhen = SearchTime[1];
            SearchTime = SearchTime[2];
            if (SearchWho == who && SearchWhen == date) {//同一个人  同一天
                //if (SearchWhen == date) {//
                if ((!isNaN(SearchTime)) && (parseInt(SearchTime) < 100)) {
                    SearchTime++;
                    var TSearchTime = who + ";" + date + ";" + SearchTime;
                    storage.setItem("SearchTime", TSearchTime);
                }
                else {
                    SearchTime = 1;
                }
            }
            else {
                var TSearchTime = who + ";" + date + ":1";
                storage.getItem("SearchTime", TSearchTime);
                SearchTime = 1;
            }
        }
        else {
            if (!who)
            { who = ""; }
            var TSearchTime = who + ";" + date + ";1";
            storage.setItem("SearchTime", TSearchTime);
            SearchTime = 1;
        }
        if (isNaN(SearchTime)) {
            SearchTime = 1;
        }
        //#endregion
        //debugger;
        if (st == "11") {
            if (firser1 || !T11gps) {
                T11gps = newgps;
                firser1 = false;
            }
            else if (gpsState == 2) {
                if (T11gps) {
                    newgps = T11gps;
                }
            }
        }
        if (newgps) {
            /* var tnewgps = "" + newgps;
            //tgps = newgps.toString().split(',')[0].split('(')[1] + ',' + newgps.toString().split(',')[1].split(')')[0];
            tgps = tnewgps.split(',')[0].split('(')[1] + ',' + tnewgps.split(',')[1].split(')')[0];
            //delete tnewgps;*/
            tgps = newgps.lat() + "," + newgps.lng();
        }
        //#region 地图显示
        // tsi = true;
        var gatt = 'f';
        if (gpsAtt) {
            gatt = 't';
        }
        //增加搜索超时设置，逾期自动终止
        //增加下次搜索关闭机制，终止一次的搜索
        //增加定时关闭ajax连接，保障超时终止
        //这三个是一套解决方案
        //debugger;
        var token;
        token = storage.getItem("account");
        if (storage.getItem("account1")) {
            token = storage.getItem("account1");
        }
        //alert("" + tgps);
        //debugger;
        var gps2 = "";
        try {
            //搜索点
            if (G2GPSSearch) {
                gps2 = GetgpsLL();
            }
            //    console.log("here00");");

        } catch (e) {
            alert(2139);
        }
        G2GPSSearch = false;

        if (isInrange) {
            //console.log("在范围内");
            sia = $.ajax({
                url: 'Handler/SearchInfo.ashx',
                type: 'POST',
                data: {
                    gps: "" + tgps,
                    kw: kw,
                    token: token,
                    isize: isize,
                    savelocation: sl,
                    notes: notes,
                    gpsll: gpsll,
                    GPSAtt: gatt,
                    st: st,
                    SearchTime: SearchTime,
                    gps2: gps2
                },
                timeout: 30000,
                success: function (a) {
                    //console.log("搜到结果了");
                    // alert(1611);
                    //return;
                    //debugger;
                    //    console.log("here00");"); $("#_coverDiv3").html("<center>Marking ...<center>");
                    clearInterval(sisearchSecondFun);
                    //debugger;
                    //tsi = false;
                    ////debugger;
                    $("#cover").show();
                    CoverTouch();
                    try {
                        clearTimeout(si1804);
                        clearInterval(sisearchSecondFun);
                        clearInterval(sivar[1]);
                        killwatchGPS();
                        clearTimeout(stsia);
                        SystemBuy = [true, 'listgroup'];
                    } catch (e) {
                        catche(e);
                    }
                    researching = false;
                    isSearching = false;
                    $("#inMapMsg,#cmm").hide();
                    GSearch = false;
                    //debugger;
                    //                try {
                    //                    if ($("#container1").length == "1") {
                    //                        $("#container1")[0].id = "container";
                    //                    }
                    //    console.log("here00");");
                    //                } catch (e) {

                    //                }
                    if (!$("#container").hasClass("container")) {
                        $("#container").attr("class", "container");
                    }
                    if (a.indexOf('EVtab') != -1) {
                        $("#container").removeClass("container");
                        //$("#container")[0].id = "container1";
                        TserEvent = true;
                        //$("#list1,#container").height(340);
                        $("#container").html("<div id='list1'>" + a + "</div>");
                        //$("#container").css("overflow", "auto");
                        $("#page1").height(550);
                        setTimeout("ClearGoogleTouchEvent('container')", 500);
                        setTimeout('MapLock(1)', 2000);
                        //$("body").hight($("#page1").hight());
                        //$("#list1").html(a);
                    }
                    else if (a.toLowerCase().indexOf("sorry") == -1) {
                        var latlng = tgps.replace("(", "").replace(")", "").split(",");
                        var gpslat = latlng[0];
                        var gpslng = latlng[1];
                        //var latlng2 = "";
                        //debugger;
                        if (a.indexOf("Ggle0") != -1) {
                            localDateInfo = a;
                            localgpslat = gpslat;
                            localgpslng = gpslng;

                            if (gps2 != "") {
                                //google 搜索数据
                                GpsSearchLatLng = gps2;
                                onLoad(gps2, kw);
                                setTimeout('NotShowGoogleDate()', 2000);
                            } else {
                                //google 搜索数据
                                GpsSearchLatLng = gps;
                                onLoad(gps, kw);
                                setTimeout('NotShowGoogleDate()', 2000);
                            }
                        }
                        else {
                            if (gps2 != "") {
                                var googleDateValue = googleandlocal(a, gpslat, gpslng);
                                listPool = googleDateValue.split("￥￥￥￥￥");
                            } else {
                                listPool = a.split("￥￥￥￥￥");
                            }
                            listNum = parseInt(listPool.length - 1);
                            listNum = listNum > 0 ? listNum : 1;
                            var Ttext = "<div id='listin'>"; //<div id='list'>
                            Ttext += listPool[0] + "<div id=\"LISTPP0\" onclick=\"LISTNP(1,0)\">Pre Page</div><div id=\"LISTNP0\" onclick=\"LISTNP(2,0)\">Next Page</div><div id='Glogo'><img src='images/GLogo.png'></div><div><div id='list-mp'>Go Back</div><div id='list-top'><a>▲ </a>Top</div><div id=\"list-re\"><img src=\"images/write.gif\"></div><div id=\"list-clear\"></div></div>";
                            Ttext += "</div>" + listPool[listPool.length - 1]; //</div>
                            TserEvent = false;
                            $("#container").html(Ttext);
                            //$("#container").css("overflow", "hidden");
                            //$("#container").height(160);
                            $("#page1").height(416);
                            if (listNum == 1) {
                                $("#LISTNP0").hide();
                            }
                        }
                        
                        /*  var latlng = tgps.replace("(", "").replace(")", "").split(",");
                        var gpslat = latlng[0];
                        var gpslng = latlng[1];
                        //debugger;
                        if (a.indexOf("Ggle0") != -1) {
                        localDateInfo = a;
                        localgpslat = gpslat;
                        localgpslng = gpslng;
                        //google 搜索数据
                        onLoad(gps, kw);
                        }
                        else {
                        listPool = a.split("￥￥￥￥￥");
                        listNum = parseInt(listPool.length - 1);
                        listNum = listNum > 0 ? listNum : 1;
                        var Ttext = "<div id='listin'>"; //<div id='list'>
                        Ttext += listPool[0] + "<div id=\"LISTPP0\" onclick=\"LISTNP(1,0)\">Pre Page</div><div id=\"LISTNP0\" onclick=\"LISTNP(2,0)\">Next Page</div><div id='Glogo'><img src='images/GLogo.png'></div><div><div id='list-mp'>Go Back</div><div id='list-top'><a>▲ </a>Top</div><div id=\"list-re\"><img src=\"images/write.gif\"></div><div id=\"list-clear\"></div></div>";
                        Ttext += "</div>" + listPool[listPool.length - 1]; //</div>
                        TserEvent = false;
                        $("#container").html(Ttext);
                        //$("#container").css("overflow", "hidden");
                        //$("#container").height(160);
                        $("#page1").height(416);
                        if (listNum == 1) {
                        $("#LISTNP0").hide();
                        }
                        }
                        */
                        /* listPool = a.split("￥￥￥￥￥");
                        listNum = parseInt(listPool.length - 1);
                        listNum = listNum > 0 ? listNum : 1;
                        var Ttext = "<div id='listin'>"; //<div id='list'>
                        Ttext += listPool[0] + "<div id=\"LISTPP0\" onclick=\"LISTNP(1,0)\">Pre Page</div><div id=\"LISTNP0\" onclick=\"LISTNP(2,0)\">Next Page</div><div><div id='list-mp'>Go Back</div><div id='SearchIcon1' onclick='RectSearch()'></div><div id='list-top'><a>▲ </a>Top</div><div id=\"list-re\"><img src=\"images/write.gif\"></div><div id=\"list-clear\"></div></div>";
                        Ttext += "</div>" + listPool[listPool.length - 1]; //</div>
                        TserEvent = false;
                        $("#container").html(Ttext);
                        //$("#container").css("overflow", "hidden");
                        //$("#container").height(160);
                        $("#page1").height(416);
                        if (listNum == 1) {
                        $("#LISTNP0").hide();
                        }*/
                    }
                    //a = " <table id='EVtab' cellpadding='0' cellspacing='3'><tbody><tr><td width='35px' rowspan='2' onclick=\"cc(this);centerwithGPS('43.638689','-79.381605','1','','','','','',true,0,true,'1')\"><div class='bizListIcon' >1</div></td><td colspan='2'onclick=\"centerwithGPS('43.638689','-79.381605')\"><a>French Festival</a></td></tr><tr><td></td><td><font onclick=\"cc6(this);fourstep('43.638689','-79.381605',1,0)\">3.53km</font></td> </tbody></table><div id='EInfo'>Harbourfront Centre,&nbsp;Downtown Toronto.&nbsp;</br></br>Free.&nbsp;Francophone Festival.&nbsp;Hosted by <a href='javascript:;'><u>Franco-Fete de Toronto</u></a>.&nbsp;</br></br>416-644-1575</div><div class='ESave' onclick=\"saveEvent('1','French Festival','June&nbsp;22&nbsp;-&nbsp;24#38#&nbsp;Francophone Festival&nbsp;in&nbsp;Downtown Toronto#38#&nbsp;Free',null,'6')\">Save</div><div id='closetab3' class='close left' onclick='click_back()'><span class='chahao'>×</span></div><span id=\"blank1\"></span><div id='tt1' style='display:none'>[(43.638689,-79.381605)](#1#)</div> <div id='Div1' style='display:none'>[[1]][#biz#][-43.6702131-][+--79.38679+]</div><script type=\"text/javascript\">listgroup(null,1);</script>";
                    clickSearching = false;
                    if ((a.indexOf("Shared Location") != -1) || (a.indexOf("Saved Location") != -1)) {
                        $("#list-top").hide();
                    }

                    if (a.toLowerCase().indexOf("sorry") != -1) {
                        //debugger;
                        Tcall = 0;
                        //$("#containert").height(160); //95  205
                        //$("#listBottom").height(110);
                        // $("#list-top").hide();
                        //window.open("http://maps.google.com/maps?q=" + kw, '_parent');
                        //console.log(newgps);
                        //console.log(kw);
                        try {
                            /* a = a.split(";");
                            //a[1] = "star walk";
                            //a[1] = "";
                            if (kw.indexOf(a[1]) == -1 && !!a[1]) {
                            PZkw = kw + "|" + a[1];
                            }*/
                            var latlng = tgps.replace("(", "").replace(")", "").split(",");
                            var gpslat = latlng[0];
                            var gpslng = latlng[1];
                            localDateInfo = "";
                            localgpslat = gpslat;
                            localgpslng = gpslng;
                            //debugger;
                            if (gps2 != "") {
                                //google 搜索数据
                                GpsSearchLatLng = gps2;
                                onLoad(gps2, kw);
                            } else {
                                //google 搜索数据
                                GpsSearchLatLng = gps;
                                onLoad(tgps, kw);
                            }
                            setTimeout('NotShowGoogleDate()', 5000);

                            /* //debugger;
                            a = a.split(";");
                            //a[1] = "star walk";
                            //a[1] = "";
                            if (kw.indexOf(a[1]) == -1 && !!a[1]) {
                            PZkw = kw + "|" + a[1];
                            }
                            var request = {
                            location: newgps,
                            radius: '10000', //100000
                            keyword: kw
                            //,
                            //name: kw //'starwalk|star walk'
                            //                            query: kw
                            };
                            //service.textSearch(request, callback);
                            service.search(request, callback);
                            */
                        } catch (e) {
                            alert("1953" + e);
                        }
                    }
                    else {
                        if (!TserEvent) {
                            //$("#container").height(160); //210 205
                            //(#10#)
                            //alert(a);
                            try {
                                var amsg = a.split("(#")[1].split("#)")[0];
                                if (amsg == "1" || amsg == "2") {
                                    //    $("#list-top").hide();
                                }
                                else {
                                    //  $("#list-top").show();
                                }
                            } catch (e) { catche(e); }
                        }
                    }
                    $("#list-re").show();
                    /* if (storage.getItem("account") != null && storage.getItem("account") != "") {
                   
                    }
                    else {
                    $("#list-re").hide();
                    }*/
                },
                error: function (a) {
                    //console.log("搜不到结果");
                    //alert(a);
                    /* debugger;
                    clearInterval(sisearchSecondFun);
                    try {
                    //clearInterval(sivar[1]);
                    clearInterval(sisearchSecondFun);
                    clearTimeout(stsia);
                    } catch (e) {
                    catche(e);
                    }   //alert(a);
                    $("#container").height(160); // 205
                    isSearching = false;
                    clickSearching = false;
                    //MapLock(1);
                    researching = false;
                    var resu;
                    /** /
                    ////debugger;
                    if (searchSec < 20) {
                    if (kw == "dic$") {
                    resu = "<p id='stcs_result1'>&nbsp;Sorry, no location found <br/><br></p><div style='margin-top: -25px;'><div id=\"list-mp\">Go Back</div><div id=\"list-re\"><img src=\"images/write.gif\"></div></div>";
                    }
                    else {
                    resu = "<p id='stcs_result1'>&nbsp;Sorry, no location found for <br/>&nbsp;'" + kw + "' <br></p><div style='margin-top: -25px;'><div id=\"list-mp\">Go Back</div><div id=\"list-re\"><img src=\"images/write.gif\"></div></div>";
                    }
                    // resu = "<p id='stcs_result1'>&nbsp;Sorry, no location found for <br/>&nbsp;'" + kw + "' <br></p><div style='margin-top: -25px;'><div id=\"list-mp\">Go Back</div><div id=\"list-re\">Write something to us.</div></div>";Write something to us
                    }
                    else {
                    resu = "<p id='stcs_result1'>&nbsp;Sorry network slow, please try again later. <br/></p><div style='margin-top: -25px;'><div id=\"list-mp\">Go Back</div><div id=\"list-re\"><img src=\"images/write.gif\"></div></div>";
                    }
                    $("#list").html(resu);
                    */
                    Tcall = 0;
                    //$("#lis,#containert").height(160); //95  205
                    //$("#listBottom").height(110);
                    // $("#list-top").hide();
                    //window.open("http://maps.google.com/maps?q=" + kw, '_parent');
                    //console.log(newgps);
                    //console.log(kw);
                    try {
                        /* var request = {
                        location: newgps,
                        radius: '100000',
                        keyword: kw
                        };
                        service.search(request, callback);
                        */
                        var latlng = tgps.replace("(", "").replace(")", "").split(",");
                        var gpslat = latlng[0];
                        var gpslng = latlng[1];
                        localDateInfo = "";
                        localgpslat = gpslat;
                        localgpslng = gpslng;
                        //debugger;
                        if (gps2 != "") {
                            //google 搜索数据
                            GpsSearchLatLng = gps2;
                            onLoad(gps2, kw);

                        } else {
                            //google 搜索数据
                            GpsSearchLatLng = gps;
                            onLoad(tgps, kw);
                        }
                    } catch (e) {
                        alert("1953" + e);
                    }

                }
            });
        }
        else {
            //不在范围内
            var latlng = tgps.replace("(", "").replace(")", "").split(",");
            var gpslat = latlng[0];
            var gpslng = latlng[1];
            localDateInfo = "";
            localgpslat = gpslat;
            localgpslng = gpslng;
            //debugger;
            if (gps2 != "") {
                //google 搜索数据
                GpsSearchLatLng = gps2;
                onLoad(gps2, kw);

            } else {
                //google 搜索数据
                GpsSearchLatLng = gps;
                onLoad(tgps, kw);
            }
            setTimeout('NotShowGoogleDate()', 5000);
            /* var latlng = tgps.replace("(", "").replace(")", "").split(",");
            var gpslat = latlng[0];
            var gpslng = latlng[1];
            localDateInfo = "";
            localgpslat = gpslat;
            localgpslng = gpslng;
            //debugger;
            onLoad(tgps, kw);
            */
            /* //console.log("在范围外");
            var request = {
            location: newgps,
            radius: '1500',
            name: kw
            };
            service.search(request, callback);*/
        }
        //setTimeout('testsi("' + kw + '")', 30000);
        // //  // //debugger;;
        try {
            var tsia = {};
            tsia = sia;
            //StopSearch(tsia);
            // stsia = setTimeout('StopSearch("' + tsia + '")', 30000);
            //setTimeout('StopSearch(1)', 30000);
        } catch (e) {
            catche(e);
        }
        //#endregion

        kws = jQuery.trim(kw);
        /*/#region  历史记录相关
        //如果不是书签  dic01  是nearby
        //            if ((kws.indexOf("dic00") == -1) && (kws.indexOf("dic01") == -1)) {
        //是否是saved
        var isaved = true;
        if ((kws.substr(0, 1) == 'G') && kws.length == 6 && !isNaN(kws.substr(5, 1))) {
        isaved = false;
        }

        //#region  已登录用户保存历史记录  
        if ((kws.indexOf("dic00") == -1) && (kws.indexOf("dic$") == -1) && isaved) {
        //如果历史记录有信息
        if (verHistory != "") {
        //如果历史记录不包含此信息
        if (verHistory.indexOf(kws) == -1) {
        verHistory = kws + ",," + verHistory;
        //showHistory();
        }
        else {
        var tkw = ",," + kws + ",,";
        var tverHistory = ",," + verHistory;
        //如果这个词是第一个
        if (tverHistory.indexOf(tkw) != 0) {
        //如果立即里面不只有这个词
        if (verHistory != kws) {
        //把这个词移除
        verHistory = verHistory.replace(tkw, ",,");
        //放在最前面
        verHistory = kws + ",," + verHistory;
        //showHistory();
        }
        }
        //showHistory();
        }
        }
        else {
        verHistory = kws + ",,";
        //showHistory();
        }

        }
        if (dic != 0 && dic != "") {
        //var strHistory = verHistory.replace("+", "strplus");
        //strHistory = strHistory.replace(reg, "+");
        //strHistory = strHistory.replace("&", "amp38");
        //$.post("ajax_saveChanges.asp?", { a: dic, b: "his", v: strHistory });

        //保存历史纪录到数据库
        //1.指向Handler/Login.ashx
        //2.关键字["saveHistory"]
        //3.数据["data"]  存放verHistory["a,,b,,c,,d,,"]

        $.ajax({
        url: 'Handler/Login.ashx',
        type: 'POST',
        data: { saveHistory: dic, data: verHistory },
        //                        success: function () {
        //                            alert("History save success");
        //                        },
        error: function (a, info) {
        alert("History save error " + a + info);
        }
        });

        }
        //#endregion
        //#endregion*/
    }
    else {
        // alert(' please enter keywords ');
    }
    // }
}
var whichTeam = 0;
function LISTNP(x, y) {
    //x:1前2后
    //y:0,1,2

    //p1: 1,0×     2,0
    //p2: 1,1       2,1
    //p3: 1,2       2,2×
    if (x == "1") {
        switch (y) {
            //0                                                                                                                                                                                            
            case (1):
                $("#listin").html(listPool[0] + "<div id=\"LISTPP0\" onclick=\"LISTNP(1,0)\">Pre Page</div><div id=\"LISTNP0\" onclick=\"LISTNP(2,0)\">Next Page</div><div id='Glogo'><img src='images/GLogo.png'></div><div><div id='list-mp'>Go Back</div><div id='list-top'><a>▲ </a>Top</div><div id=\"list-re\"><img src=\"images/write.gif\"></div><div id=\"list-clear\"></div></div>");
                listgroup(null, 0);
                whichTeam = 0;
                break;
            case (2):
                $("#listin").html(listPool[1] + "<div id=\"LISTPP1\" onclick=\"LISTNP(1,1)\">Pre Page</div><div id=\"LISTNP1\" onclick=\"LISTNP(2,1)\">Next Page</div><div id='Glogo'><img src='images/GLogo.png'></div><div><div id='list-mp'>Go Back</div><div id='list-top'><a>▲ </a>Top</div><div id=\"list-re\"><img src=\"images/write.gif\"></div><div id=\"list-clear\"></div></div>");
                listgroup(null, 1);
                whichTeam = 1;
                break;
        }
    }
    else {
        switch (y) {
            case (0):
                $("#listin").html(listPool[1] + "<div id=\"LISTPP1\" onclick=\"LISTNP(1,1)\">Pre Page</div><div id=\"LISTNP1\" onclick=\"LISTNP(2,1)\">Next Page</div><div id='Glogo'><img src='images/GLogo.png'></div><div><div id='list-mp'>Go Back</div><div id='list-top'><a>▲ </a>Top</div><div id=\"list-re\"><img src=\"images/write.gif\"></div><div id=\"list-clear\"></div></div>");
                listgroup(null, 1);
                whichTeam = 1;
                break;
            case (1):
                $("#listin").html(listPool[2] + "<div id=\"LISTPP2\" onclick=\"LISTNP(1,2)\">Pre Page</div><div id=\"LISTNP2\" onclick=\"LISTNP(2,2)\">Next Page</div><div id='Glogo'><img src='images/GLogo.png'></div><div><div id='list-mp'>Go Back</div><div id='list-top'><a>▲ </a>Top</div><div id=\"list-re\"><img src=\"images/write.gif\"></div><div id=\"list-clear\"></div></div>");
                listgroup(null, 2);
                whichTeam = 2;
                break;
        }
    }
    if (listNum == 2) {
        $("#LISTNP1").hide();
    }
    else if (listNum == 1) {
        $("#LISTNP0").hide();
    }
    //listgroup(null, y);
}
//                                                                                                              google search
var Tcall = 0;
function callback(results, status, x, y, z) {
    if (firser) {
        firser = false;
    }
    Tcall++;
    //debugger;
    try {
        if (newMaker) {
            for (i in newMaker) {
                newMaker[i].setMap(null);
            }
        }
    } catch (e) {
        catche(e);
    }
    try {
        myScrolllist.destroy();
        myScrolllist = null;
    } catch (e) { }
    try {
        var listText = "<div id='listin'>";
        if (status == google.maps.places.PlacesServiceStatus.OK) {

            GSearch = true;
            deleteOverlays();
            //#region 排序
            for (var i = 0; i < results.length; i++) {
                results[i].disnum = jisuanjuli(results[i].geometry.location.lat(), results[i].geometry.location.lng(), 1);
                results[i].dis = jisuanjuli(results[i].geometry.location.lat(), results[i].geometry.location.lng());
            }
            var TParr0 = [];
            TParr0[0] = results[0];
            var TParr = results.slice(1);
            TParr.sort(sortNumber1);
            //#endregion
            results = TParr0.concat(TParr);
            var Firtab = true;
            var nn = "" + newgps.lat();
            var ss = "" + newgps.lat();
            var ww = "" + newgps.lng();
            var ee = "" + newgps.lng();
            for (var i = 0; i < (results.length > 10 ? 10 : results.length); i++) {//results.length
                //var place = results[i];
                createMarker(results[i], i);
                var dis = results[i].dis;
                var lat = results[i].geometry.location.lat();
                var lng = results[i].geometry.location.lng();
                listText += "<table class='GTable' ";
                if (Firtab) {
                    listText += "style='background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0) 0px, rgba(255, 255, 255, 0.496094) 50px);'";
                    Firtab = false;
                }
                //var add = FormatAddress(results[i].formatted_address);
                var add = FormatAddress(results[i].vicinity);
                if (add.length > 22) {
                    add = add.substr(0, 22) + " ...";
                }
                var name = results[i].name;
                if (name.length > 20) {
                    name = name.substr(0, 20) + " ...";
                }
                listText += " cellpadding=\"0\" cellspacing=\"3\" onclick=\"dis(event);cc3(this)\"><tbody><tr> <td rowspan=\"2\" class=\"td_cate\" onclick=\"cc(this);centerwithGPS('" + lat + "','" + lng + "','" + (parseInt(i) + 1) + "','','','','','',true," + i + ",true,'1')\" align=\"center\" valign=\"middle\"><div class=\"bizListIcon\">" + (parseInt(i) + 1) + "</div> </td> <td colspan=\"1\" class=\"unit_info\" style=\"line-height:17px;\"><a onclick=\"cc7(this);centerwithGPS('" + lat + "','" + lng + "','" + (parseInt(i) + 1) + "','','','','','',true," + i + ",true,'1');getDetails('" + results[i].reference + "'," + (parseInt(i) + 1) + "," + i + ",this)\"  class=\"unit_name\">" + name + "</a><br><a class=\"unit_phone\" onclick=\"fourstep(" + lat + "," + lng + "," + (parseInt(i) + 1) + "," + i + ")\">" + results[i].types[0] + "</a></td><td rowspan=\"2\" style=\"width:75px;text-align: center;\" onclick=\"cc7(this,3);fourstep(" + lat + "," + lng + "," + (parseInt(i) + 1) + "," + i + ")\">" + dis + "</td></tr><tr><td onclick=\"fourstep(" + lat + "," + lng + "," + (parseInt(i) + 1) + "," + i + ")\"> <span class=\"unit_info\">" + add + "</span></td></tr></tbody></table>";

                //types: Array[3]
                //0: "restaurant"
                //listText += " cellpadding=\"0\" cellspacing=\"3\" onclick=\"dis(event);cc3(this)\"><tbody><tr> <td rowspan=\"2\" class=\"td_cate\" onclick=\"cc(this);centerwithGPS('" + lat + "','" + lng + "','" + (parseInt(i) + 1) + "','','','','','',true," + i + ",true,'1')\" align=\"center\" valign=\"middle\"><div class=\"bizListIcon\">" + (parseInt(i) + 1) + "</div> </td> <td colspan=\"1\" class=\"unit_info\" style=\"line-height:17px;\"><input readonly=\"readonly\" onclick=\"cc7(this);centerwithGPS('" + lat + "','" + lng + "','" + (parseInt(i) + 1) + "','','','','','',true," + i + ",true,'1');getDetails('" + results[i].reference + "'," + (parseInt(i) + 1) + "," + i + ",this)\"  class=\"unit_name\" value=\"" + results[i].name + "\"/><br><input readonly=\"readonly\" class=\"unit_phone\" value=\"" + results[i].types[0] + "\"/></td><td rowspan=\"2\" style=\"width:75px;text-align: center;\" onclick=\"cc7(this,3);fourstep(" + lat + "," + lng + "," + (parseInt(i) + 1) + "," + i + ")\">" + dis + "</td></tr><tr><td onclick=\"fourstep(" + lat + "," + lng + "," + (parseInt(i) + 1) + "," + i + ")\"> <input readonly=\"readonly\" class=\"unit_info\" value=\"" + add + "\"/></td></tr></tbody></table>";

                if (i <= 3) {
                    if ((parseFloat(nn) - parseFloat(lat)) >= 0) {
                        nn = nn;
                    }
                    else {
                        nn = lat;
                    }
                    if ((parseFloat(ss) - parseFloat(lat)) <= 0) {
                        ss = ss;
                    }
                    else {
                        ss = lat;
                    }
                    if ((parseFloat(ww) - parseFloat(lng)) >= 0) {
                        ww = lng;
                    }
                    else {
                        ww = ww;
                    }
                    if ((parseFloat(ee) - parseFloat(lng)) >= 0) {
                        ee = ee;
                    }
                    else {
                        ee = lng;
                    }
                }

            }
            listText += "<div id='Glogo'><img src=\"images/GLogo.png\"></div>";
            listText += '<div><div id="list-mp">Go Back</div><div id="SearchIcon1" onclick="RectSearch()"></div><div id="list-top"><a>▲ </a>Top</div><div id="list-re"><img src="images/write.gif"></div><div id="list-clear"></div></div></div>';
            //$("#container")
            $("#container").html(listText);

            try {
                if (map.getMapTypeId() == 'hybrid') {
                    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
                }
                var ne = new google.maps.LatLng(nn, ee);
                var sw = new google.maps.LatLng(ss, ww);
                var bounds = new google.maps.LatLngBounds(sw, ne);
                map.fitBounds(bounds);
                if (map.getZoom() > 18) {
                    map.setZoom(18);
                }
            } catch (e) {

            }
            setTimeout('toTop();MapLock(1)', 1000);
            setTimeout('toTop();MapLock(1)', 1000);
            $.ajax({
                url: 'Handler/SearchInfo.ashx',
                type: 'POST',
                data: {
                    GLog: keywords
                }
            });

            //            setTimeout(function () {
            //                myScrolllist.destroy();
            //                myScrolllist = null;
            //                //myScrolllist = new iScroll('container', { vScrollbar: false });
            //                //myScrolllist.scrollTo(0, 0, 0);
            //            }, 0);
            setTimeout(function () {
                myScrolllist = new iScroll('container', { vScrollbar: false });
                myScrolllist.scrollTo(0, 0, 0);
            }, 1000);
        }
        else if (Tcall == 1) {
            var request = {
                location: newgps,
                radius: '3000',
                keyword: keywords// name: PZkw
            };
            service.search(request, callback);
        }
        else if (Tcall == 2) {
            var request = {
                location: newgps,
                radius: '10000',
                keyword: keywords
            };
            service.search(request, callback);
        }
        else if (Tcall == 3) {
            var request = {
                location: newgps,
                radius: '20000',
                keyword: keywords
            };
            service.search(request, callback);
        }
        else {
            var listText = "&nbsp;&nbsp;Sorry, no location found for<br>&nbsp;&nbsp; '" + keywords + "' <br></p><div><div id=\"list-mp\">Go Back</div><div id=\"list-top\"><a>▲ </a>Top</div><div id=\"list-re\"><img src=\"images/write.gif\"></div><div id=\"list-clear\"></div></div>";
            $("#listin").html(listText);
            setTimeout('toTop();MapLock(1)', 1000);
            setTimeout('toTop();MapLock(1)', 1000);
            //            setTimeout(function () {
            //                myScrolllist.destroy();
            //                myScrolllist = null;
            //                //myScrolllist = new iScroll('container', { vScrollbar: false });
            //                //myScrolllist.scrollTo(0, 0, 0);
            //            }, 0);
            setTimeout(function () {
                myScrolllist = new iScroll('container', { vScrollbar: false });
                myScrolllist.scrollTo(0, 0, 0);
            }, 100);
        }
        //$('#list').touchScroll();
        //$('#list').touchScroll('update');

        SystemBuy = [false, 'listgroup'];
        //GoogleTouchEvent("list", null, null, 1);

    } catch (e) {
        catche(e);
    }
}
function sortNumber1(a, b) {
    return a.disnum - b.disnum;
}
var roadtype = ["drive", "dr", "road", "rd", "avenue", "ave", "boulevard", "blvd", "crescent", "cres", "court", "ct", "parkway", "pkwy", "expressway", "expy", "line", "ln", "circle", "cir", "place", "pl", "street", "st", "cove", "cv", "heights", "hts", "grove", "grv", "alley", "aly"];
function FormatAddress(add) {
    //debugger;
    //add = add.split(',');
    //add = add.splice(0, 2);
    //add = add.join(',');
    try {
        for (var i = 0; i < parseInt(roadtype.length / 2); i++) {
            add = add.replace(roadtype[2 * i], roadtype[2 * i + 1]);
        }
    } catch (e) {
        catche(e);
    }
    return add;
}

var newMaker = [];
function createMarker(place, i) {
    var image = new google.maps.MarkerImage('images/iconrc.png',
                          new google.maps.Size(20, 34),
                          new google.maps.Point(0, 0),
                          new google.maps.Point(10, 34));
    var iconText = new google.maps.MarkerImage('images/iconrText' + (parseInt(i) + 1) + '.png',
                          new google.maps.Size(20, 34),
                          new google.maps.Point(0, 0),
                          new google.maps.Point(10, 34));

    //var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: image
    });
    var marker1 = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: iconText
    });
    newMaker.push(marker);
    newMaker.push(marker1);
    addClicktoMarker(marker, place, parseInt(i) + 1, i);
    addClicktoMarker(marker1, place, parseInt(i) + 1, i);

    //return;
    google.maps.event.addListener(marker, 'click', function () {
        //debugger;
        var ScrollHeight = 0;
        var listNode = document.getElementById("listin");
        for (var j = 0; j < i; j++) {
            ScrollHeight += listNode.childNodes[j + 1].clientHeight + 1;
        }
        try {
            myScrolllist.scrollTo(0, -ScrollHeight, 0);
            //$('#listin').touchScroll('setPosition', ScrollHeight); // - 50
            gb = setTimeout('getback()', 7500);
        } catch (e) { catche(e); }
    });
    google.maps.event.addListener(marker1, 'click', function () {
        //debugger;
        var ScrollHeight = 0;
        var listNode = document.getElementById("listin");
        for (var j = 0; j < i; j++) {
            ScrollHeight += listNode.childNodes[j + 1].clientHeight + 1;
        }
        try {
            myScrolllist.scrollTo(0, -ScrollHeight, 0);
            // $('#list').touchScroll('setPosition', ScrollHeight); // - 50
            gb = setTimeout('getback()', 7500);
        } catch (e) { catche(e); }
    });
}
function jisuanjuli(plat, plng, x) {
    //debugger
    var R = 6378.137;
    try {
        aa1 = isNaN(plng) ? 0 : plng;
        bb1 = isNaN(plat) ? 0 : plat;

        aa2 = $.trim(convertGPS(gps, 'a'));
        bb2 = $.trim(convertGPS(gps, 'b'));

        aa1 = convertH(aa1);
        aa2 = convertH(aa2);
        bb1 = convertH(bb1);
        bb2 = convertH(bb2);

        var D = R * Math.acos(Math.cos(bb1) * Math.cos(bb2) * Math.cos(aa1 - aa2) + Math.sin(bb1) * Math.sin(bb2));
        if (!!x) {
            return (D * 1000);
        }
        if (D > 1) {
            D += "";
            if (D.indexOf('.') != -1) {
                //D = D.split('.')[0] + (D.split('.')[1].substr(0, 2) > 0 ? "." + D.split('.')[1].substr(0, 2) : "");
                //取最后两位，如果最后一位为零，抛弃
                D = D.split('.')[0] + (D.split('.')[1].substr(0, 2) > 0 ? (D.split('.')[1].substr(1, 1) == 0 ? "." + D.split('.')[1].substr(0, 1) : "." + D.split('.')[1].substr(0, 2)) : "");
            }
            return (D + " km");
            //setTimeout('$("#dis1").html("' + D + 'km")', 400);
        }
        else {
            D *= 1000;
            D += "";
            if (D.indexOf('.') != -1) {
                D = D.split('.')[0];
            }
            return (D + " m");
            //setTimeout('$("#dis1").html("' + D + 'm")', 400);
        }
        //debugger;
        // setTimeout('$("#dis1").css("-webkit-transform", "scale(1)")', 400);

    } catch (e) {
        // alert(e);
    }
}
var sisearchSecondFun;
function searchSecondFun() {
    //alert(searchSec);
    searchSec = parseInt(searchSec) + 1;
}
var stsia;
function StopSearch(tsia) {
    if (isSearching) {
        try {
            //clearInterval(sivar[1]);
            tsia.abort();
        } catch (e) {
            catche(e);
        }
        MapLock(1);
        var listresu = "<p id='stcs_result1'>&nbsp;Sorry network slow, please try again later. <br></p><div style='margin-top: -25px;'><div id=\"list-mp\">Go Back</div><div id=\"list-re\"><img src=\"images/write.gif\"></div></div>";
        /* if (keywords == "dic$") {
        resu = "<p id='stcs_result1'>&nbsp;Sorry network slow, please try again later. <br/><br></p><div><div id=\"list-mp\">Go Back</div><div id=\"list-re\">Write something to us.</div></div>";
        }
        else {
        resu = "<p id='stcs_result1'>&nbsp;Sorry, no location found for <br/>&nbsp;'" + keywords + "' <br></p><div><div id=\"list-mp\">Go Back</div><div id=\"list-re\">Write something to us.</div></div>";
        }*/
        $("#listin").html(listresu);
        isSearching = false;
    }
}
function AddHistory(_Tkw) {
    try {
        //debugger;
        _Tkw = _Tkw.replace('+', " ");
        _Tkw = ReplaceT(_Tkw);
        if (_Tkw == "dic$" || (_Tkw.length == 8 && _Tkw.indexOf('G') == 0)) {
            return;
        }
        if (!!(_Tkw) && $.trim(_Tkw) != "") {
            //一整行的列表
            var _TarrList = storage.getItem("arrList");
            //分层的列表
            var _TarrList2 = _TarrList.split(';');
            if (_TarrList2[1].indexOf("History") == -1) {
                _TarrList2.splice(1, 0, 'History');
            }

            //debugger;
            //历史记录一行
            var _TarrList3 = _TarrList2[1].split(','); ;
            //#region 检测重复项
            var RepeatItemNum = 0;
            for (var i = 1; i < _TarrList3.length; i++) {
                if (_TarrList3[i] == _Tkw || _TarrList3[i] == ReplaceT(_Tkw) || _TarrList3[i] == ReplaceF(_Tkw)) {
                    RepeatItemNum = i;
                }
            }
            //#endregion
            if (RepeatItemNum == 0) {
                if (_TarrList3.length < 8) {
                    _TarrList2[1] = ("History," + _Tkw) + _TarrList2[1].split('History')[1];
                }
                else {
                    _TarrList3.pop();
                    _TarrList3.splice(1, 0, _Tkw);
                    _TarrList2[1] = _TarrList3.join(',');
                }
            }
            else {
                _TarrList3.splice(RepeatItemNum, 1); //删掉第N个                
                _TarrList3.splice(1, 0, _Tkw); //插入到第一位
                _TarrList2[1] = _TarrList3.join(',');
            }
            arrList = _TarrList2;
            _TarrList = _TarrList2.join(";");
            storage.setItem("arrList", _TarrList);
            //$("#ListMainControl1").show();
            //debugger;

            setTimeout(function () {
                listMenu(arrList);
                $(".bigpic,.bgpic1").show();
                var type = SearchArr[0];
                var j = SearchArr[1];
                if (type == 1) {
                    openList(j);
                }
                setTimeout("$('#tbList .listMain1').css('-webkit-transform', 'rotateY(0deg)')", 100);
            }, 600);
            $("#keywords2").val('');
            $(".chacha").hide();
        }

    } catch (e) {

    }
}
/*
var tsi = true;
function testsi(kw) {
if (tsi) {
$.ajax({
url: 'Handler/SearchInfo.ashx',
type: 'POST',
data: { abort: 1 }
});
sia.abort();
var resu = "<p id='stcs_result1'>&nbsp;Sorry, no location found for <br/>&nbsp;'" + kw + "' <br></p><div><div id=\"list-mp\">Go Back</div></div>";
$("#list").html(resu);
}
}*/
//#endregion

//#region  锁屏
function MapLock(x) {
    if (x) {//up
        //setTimeout('$("#cover").css(\'top\', \'-256px\')', 1000);
        //debugger;
        $("#cover").css('opacity', '0');
        //        $("#_coverDiv0").css('top', '-256px');
        //      $("#_coverDiv4").css('top', '440px');
        setTimeout('$("#cover").hide();', 400);
    }
    else {
        //$("#cover").css('top', '-256px');
        if (!$.trim($("#cover").html())) {
            //$("#cover").html('<div id="_coverDiv0"><div id="_coverDiv1"></div><div onclick="click_back()" id="_coverDiv2"><a>S</a></div><div id="_coverDiv3"></div></div><div id="_coverDiv4"></div>');
            $("#cover").html('<div id="_coverDiv1"></div><div onclick="click_back()" id="_coverDiv2"><a>S</a></div><div id="_coverDiv3"></div>');
        }
        $("#cover").show();
        $("#cover").css('opacity', '1');

        //setTimeout('$("#cover").css(\'top\', \'0px\')', 200);
        //$("#cover").css('top', '0px');
    }
}



//#endregion

//#region                                                                  地图相关
var privilegeAccount; //特权账户。需要时打开，可以让匿名用户使用登陆后的功能【0无特权、1可报告、2】
var gps = '';
var newgps = ''; //设备可用GPS
var gpsLL = ""; //地图中心店的GPS
var gpsAtt = true; //gps状态，true为机器获取
var map;
var markerGPS = []; //红旗图标
var markersArray = []; //地图上的标注
var markersArray1 = [];
var roadEndArr = []; //道路两端的图标
var myLatLng;
var isclose = false;
var isSearching = false; //是否正在搜索
var isInrange = true; //判断当前是否在服务范围内【report】false不在范围内
var isAlert;  //是否已经提醒【不在范围内，只提醒一次，重新定位后刷新】false没提醒
// set up default marks icon on google maps.
var iscanalert = true; //是否可以提醒，无秒内不做两次提醒
try {
    //    var gpsicon = new google.maps.MarkerImage('images/1.gif',
    //  var gpsicon = new google.maps.MarkerImage('￥￥￥',   gps32
    var gpsicon = new google.maps.MarkerImage('images/gps16.png',
        new google.maps.Size(16, 16),
        new google.maps.Point(0, 0),
        new google.maps.Point(8, 8));

    var searchicon = new google.maps.MarkerImage('images/gps32.png',
        new google.maps.Size(32, 32),
        new google.maps.Point(0, 0),
        new google.maps.Point(0, 32));

    /*  var gpsicon = new google.maps.MarkerImage('images/gps25.png',
    new google.maps.Size(32, 32),
    new google.maps.Point(0, 0),
    new google.maps.Point(0, 32));*/
    var image = new google.maps.MarkerImage('images/iCon_none.png',
        new google.maps.Size(20, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34));
    storage.setItem("loadtime", 0);
} catch (e) {
    //self.location.reload();
    $("#keywords2").val("GoogleMap Load fail");
    var loadtime = storage.getItem("loadtime");
    if (loadtime) {
        loadtime++;
    }
    else {
        loadtime = 0;
    }
    storage.setItem("loadtime", loadtime);
    if (loadtime < 5) {
        setTimeout('window.location.reload();', 10000);
    }
}

var isize = 32;
var scode = "0"; //location code
var ccode = "0";
var url = "";
//#region 隐藏工具栏 /**/

var hi;
var hi1;
var bhi = false;
var hisw = false; //true-map/false-menu
/*function hideToolbar() {
if (hisw && !opentools) {
//if ($("#tools").is(":visible")) {
if (bhi) {
//alert("收回");$("#list,#page3_details").css("top","272px");
hi = setTimeout('$("#tools").height(0);$("#tool,#tools").hide();', 7000);
bhi = !bhi;
}
else {
//alert("弹出");$("#list,#page3_details").css("top","307px");
if (!($("#cross").is(":visible"))) {

//#region 如果搜索结果列表很少[1个]，则将工具栏上移
//testtools();
//#endregion

hi1 = setTimeout('$("#tools,#tool").show();$("#tools").height(45);', 1); //30px->45px
bhi = !bhi;
hideToolbar();
}
}
}
}
*/
//#region 如果搜索结果列表很少[1个]，则将工具栏上移[版权纠纷-另谋出路] /**/
/*function testtools() {
if ($('#list').height() < 180 || $("#cross").is(":visible")) {//向上移
$("#tools").css("top", '180px');
//$("#tools").animate({ top: "180px" });

}
else {//向下移
//$("#tools").animate({ top: "230px" });
var h = $("#map_canvas").height();
$("#tools").css("top", h + "px");
}
}*/
//#endregion
/**/
function clearhide() {
    return true;
    clearTimeout(hi);
    clearTimeout(hi1);
    hideToolbar();
}
//#endregion
var verStr = navigator.appVersion; //浏览器版本信息
var savedsw = true;
//var sthInsaved;
var sthInMain;
var isshowevents;
var EventsText = '';
//var isclicknum = true;   
//#region  conText
var conText;
conText = "<strong>What is umap.ca</strong><br>umap.ca is a free web based application to help people finding exactly business and service locations. It works on iPhones.";
conText += "<br>It's not a simple business directory. It's totally reconstructed to fit mobile internet use. ";
conText += "<br><br><strong>Why umap.ca</strong>";
conText += "<br>So far, finding businesses is still very inconvenient. Many Apps are trying to help you, but also mislead you.";
conText += "<br>'inacturate results', 'many missings', 'wrong  coordinates', 'keywords limit'. You almost can not search businesses by what they are and what they serve.";
conText += "<br>umap.ca devotes to build complete solutions to solve these problems.  We bring you to the font door of business or service exactly what you're looking for.";
conText += "<br>We think what people's think. We are working on a brand new database and try very hard to find business's type, major products or services they provide.";
conText += "<br>In umap.ca you may find 'key cut', 'oil change', 'ice cream', 'walk-in clinic' and many more. Which other Apps just can find them by vendor's names.";
conText += "<br>You may find 'ATM' or 'Coffee' is very closed  to you and are able to get there by walk. We know who has the 'ATM' and who service you 'Coffee'. Other Apps simply send you to the banks or coffee shops far away.";
conText += "<br>You can find locations which is even not a business. Everybody knows where is 'Eaton Centre', but what about if a friend invites you to 'Jubilee Square' or 'woodbine shopping centre'?  You will find only umap.ca helps you.";
conText += "<br>Umap.ca is web-based. Any time any iPhone user can open it in the browser. No App download, no account needed.";
conText += "<br>In Umap.ca, location sharing becomes so easy. System will generate a simple URL address which you can send to friends by email, text message or twitter. What your friends need to do is just click the link. Umap.ca will show them the exact point on map. Nobody will bother you with the direction questions.";
conText += "<br><br><strong>Even more.</strong>";
conText += "<br>We need your help to make this idea works well. We count points to you while you report business informations or invite more members. You will have chances to win iPhones monthly or get points redeemed with business coupons in the future.";
conText += "<br>Umap.ca is now on beta version, covers 4 cities in the Great Toronto and Area.  City of Toronto, City of Markham, Town of Richmond Hill and Vaughan City.";
conText += "We will keep working on more area and serve you better.";
conText += "<br><br>2012-2";
//#endregion
$(document).ready(function () {
    try {
        var sist = setInterval('window.scrollTo(0, 0);', 10);
        setTimeout('clearInterval(' + sist + ')', 1000);
        setTimeout('testShared()', 1000);
    } catch (e) { catche(e); }

    /*
    $("#showsaved").live('click', function () {
    //debugger;
    try {
    $("#account").hide();
    if (savedsw) {
    setTimeout('toTop()', 500);
    // background-image: -moz-linear-gradient(center top ,#eff3f7,#d6dbde); /* #3F6F98, #004080, #004080, #3F6F98  background-color:#3f6f98;     background-image: -moz-linear-gradient(top, #788d9c,#004080,#002050,#002050);     background-image: -webkit-gradient(             linear, left top,              left bottom,              from (#788d9c),             color-stop(0.4, #004080),             color-stop(0.6, #002050),             to(#002050)              ); */
    //background: -webkit-gradient(linear, left top,right top, from(#eff3f7), to(#d6dbde)); /*background-image: -moz-linear-gradient(center top ,#ffe9cb,#e6d0b7);  #3F6F98, #004080, #004080, #3F6F98  background-color:#3f6f98;     background-image: -moz-linear-gradient(top, #788d9c,#004080,#002050,#002050);     background-image: -webkit-gradient(             linear, left top,              left bottom,              from (#788d9c),             color-stop(0.4, #004080),             color-stop(0.6, #002050),             to(#002050)              );      background: -webkit-gradient(linear, 54% 13%, 54% 67%, from(#ffe9cb), to(#e6d0b7))background-image: -webkit-gradient(linear,left top,right top,from(#ffe9cb),color-stop(0.5,#ffe9cb),to(#e6d0b7)); -webkit-gradient(linear, 0% 0%, 0% 100%, from(#FFE9CB), color-stop(0.5, #FFE9CB), to(#E6D0B7));*/
    /*  var app = navigator.appName;
    if (app.indexOf("Netscape") != -1) {//FF
    $("#saved").css("background-image", "-moz-linear-gradient(center top ,#eff3f7,#d6dbde)");
    }
    if (verStr.indexOf('Safari') != -1) { //safari
    $("#saved").css("background-image", "-webkit-gradient(linear, left top,right top, from(#eff3f7), to(#d6dbde))");
    }
    * /
    if (storage && storage.getItem("arrSaved")) {
    //$("#saved").animate({ height: 360 });
    $("#saved").height(348);
    //$("#menu").hide();
    savedsw = false;
    showsaved();
    }
    }
    testmenu();
    } catch (e) { catche(e); }
    });
    $("#showshared").live('click', function () {
    try {
    $("#account").hide();
    if (savedsw) {
    setTimeout('toTop()', 500);
    // background-image: -moz-linear-gradient(center top ,#eff3f7,#d6dbde); /* #3F6F98, #004080, #004080, #3F6F98  background-color:#3f6f98;     background-image: -moz-linear-gradient(top, #788d9c,#004080,#002050,#002050);     background-image: -webkit-gradient(             linear, left top,              left bottom,              from (#788d9c),             color-stop(0.4, #004080),             color-stop(0.6, #002050),             to(#002050)              ); */
    //background: -webkit-gradient(linear, left top,right top, from(#eff3f7), to(#d6dbde)); /*background-image: -moz-linear-gradient(center top ,#ffe9cb,#e6d0b7);  #3F6F98, #004080, #004080, #3F6F98  background-color:#3f6f98;     background-image: -moz-linear-gradient(top, #788d9c,#004080,#002050,#002050);     background-image: -webkit-gradient(             linear, left top,              left bottom,              from (#788d9c),             color-stop(0.4, #004080),             color-stop(0.6, #002050),             to(#002050)              );      background: -webkit-gradient(linear, 54% 13%, 54% 67%, from(#ffe9cb), to(#e6d0b7))background-image: -webkit-gradient(linear,left top,right top,from(#ffe9cb),color-stop(0.5,#ffe9cb),to(#e6d0b7)); -webkit-gradient(linear, 0% 0%, 0% 100%, from(#FFE9CB), color-stop(0.5, #FFE9CB), to(#E6D0B7));*/
    /*  var app = navigator.appName;
    var verStr = navigator.appVersion;
    if (app.indexOf("Netscape") != -1) {//FF
    $("#saved").css("background-image", "-moz-linear-gradient(center top ,#eff3f7,#d6dbde)");
    }
    if (verStr.indexOf('Safari') != -1) { //safari
    $("#saved").css("background-image", "-webkit-gradient(linear, left top,right top, from(#eff3f7), to(#d6dbde))");
    }
    * /
    if (storage && storage.getItem("arrShared")) {
    $("#saved").height(348);
    //$("#menu").hide();
    savedsw = false;
    showshared();
    }
    }
    testmenu();
    } catch (e) {
    catche(e);
    }
    }); 
    */
    /* $("#backonMap").live('click', function () {
    //// // // //  // //debugger;;
    try {
    click_back();
    return false;
    } catch (e) { catche(e); }
    });
    $("#isearch").live('click', function () {
    //// // // //  // //debugger;;
    try {
    tomenu = false;
    $("#keywords2").val('');
    click_back();
    $("#keywords2").focus();
    return false;
    } catch (e) { catche(e); }
    });*/
    try {
        //#region  google touch event
        /* google.maps.event.addDomListener(document.getElementById("list"), 'touchstart', function (e) {
        clearTimeout(gb);
        hideisearch(2);
        setTimeout('$("#tools").height(0);$("#tool,#tools").hide();', 100);
        bhi = true;
        //setTimeout('toTop()', 500);
        });*/
        google.maps.event.addDomListener(document.getElementById("map_canvas"), 'touchstart', function (e) {
            clickmap();
        });
        GoogleTouchEvent('map_canvas', null, null, true);
        /*google.maps.event.addDomListener(document.getElementById("map_canvas"), 'touchend', function (e) {
        setTimeout('toTop()', 500);
        });*/
        google.maps.event.addDomListener(document.getElementById("account"), 'touchend', function (e) {
            if (!inputSwitch) { setTimeout('toTop()', 500); }
            inputSwitch = false;
        });
        /*/#region tools
        google.maps.event.addDomListener(document.getElementById("tools"), 'touchstart', function (e) {
        clearhide();
        hideisearch(0);
        toTop();
        });
        GoogleTouchEvent('tools', null, true);
        GoogleTouchEvent('tools', null, null, true);*/
        /*google.maps.event.addDomListener(document.getElementById("tools"), 'touchmove', function (e) {
        e.preventDefault();           
        });
        google.maps.event.addDomListener(document.getElementById("tools"), 'touchend', function (e) {
        toTop();
        }); */

        //#endregion
        /*/#region page3_details
        google.maps.event.addDomListener(document.getElementById("page3_details"), 'touchstart', function (e) {
        alert(234);
        $("#tools").height(0);
        $("#tool,#tools").hide();
        bhi = true;
        toTop();
        });
        google.maps.event.addDomListener(document.getElementById("page3_details"), 'touchmove', function (e) {
        e.preventDefault();
        });
        google.maps.event.addDomListener(document.getElementById("page3_details"), 'touchend', function (e) {

        toTop();
        });
        //#endregion*/

        /*google.maps.event.addDomListener(document.getElementById("ReportsForm"), 'touchstart', function (e) {
        $("#tools").height(0);
        $("#tool,#tools").hide();
        bhi = true;
        toTop();
        });*/
        //    google.maps.event.addDomListener(document.getElementById("main"), 'touchstart', function (e) {
        //        toTop();
        //    });


        google.maps.event.addDomListener(document.getElementById("menu"), 'touchend', function (e) {
            //toTop();
            setTimeout('toTop()', 500);
        });
        google.maps.event.addDomListener(document.getElementById("keywords2"), 'touchend', function (e) {
            setTimeout('toTop(); $("#keywords2").focus();', 500);
        });
        /**/

        //    google.maps.event.addDomListener(document.getElementById("tbList"), 'touchstart', function (e) {
        //        toTop();
        //    });
        //#region main
        //        google.maps.event.addDomListener(document.getElementById("main"), 'touchstart', function (e) {
        //            //setTimeout('toTop()', 500);
        //            alert(234234);
        //        });
        google.maps.event.addDomListener(document.getElementById("main"), 'touchmove', function (e) {
            e.preventDefault();
        });
        google.maps.event.addDomListener(document.getElementById("main"), 'touchend', function (e) {
            setTimeout('toTop()', 500);
        });
        //#endregion
        //#region //ReportsForm
        /* google.maps.event.addDomListener(document.getElementById("rf"), 'touchstart', function (e) {
        toTop();
        });
        google.maps.event.addDomListener(document.getElementById("rf"), 'touchmove', function (e) {
        //toTop();
        // e.preventDefault();
        });
        google.maps.event.addDomListener(document.getElementById("rf"), 'touchend', function (e) {
        //toTop();
        //setTimeout('toTop()', 500);
        });*/
        //#endregion

        GoogleTouchEvent("about");
        GoogleTouchEvent("menu");

        //#region cross
        GoogleTouchEvent("cross");
        /*google.maps.event.addDomListener(document.getElementById("cross"), 'touchstart', function (e) {
        toTop();
        });
        google.maps.event.addDomListener(document.getElementById("cross"), 'touchmove', function (e) {
        e.preventDefault();
        });
        google.maps.event.addDomListener(document.getElementById("cross"), 'touchend', function (e) {
        toTop();
        });*/
        //#endregion
        //#region imgBizLarge
        /*        GoogleTouchEvent("imgBizLarge");*/
        /*google.maps.event.addDomListener(document.getElementById("imgBizLarge"), 'touchstart', function (e) {
        toTop();
        });
        google.maps.event.addDomListener(document.getElementById("imgBizLarge"), 'touchmove', function (e) {
        e.preventDefault();
        });
        google.maps.event.addDomListener(document.getElementById("imgBizLarge"), 'touchend', function (e) {
        toTop();
        });*/
        //#endregion
        //#region saved
        GoogleTouchEvent("saved");
        /*google.maps.event.addDomListener(document.getElementById("saved"), 'touchstart', function (e) {
        // setTimeout('toTop()', 500);
        //$('body').animate({ scrollTop: 0 });

        });
        google.maps.event.addDomListener(document.getElementById("saved"), 'touchmove', function (e) {
        e.preventDefault();
        });
        google.maps.event.addDomListener(document.getElementById("saved"), 'touchend', function (e) {
        setTimeout('toTop()', 500);
        });*/
        //#endregion

        //#endregion
    } catch (e) { catche(e); }
    testIOS();

    $("#tools").mouseout(function () {
        clearhide();
    });
    $("#list-mp").live('click', function () {
        setTimeout('click_back()', 400);
    });
    $("#ra").live('click', function () {
        try {
            var r = confirm("Remove all shared ?");
            var tarrSaved = storage.getItem("arrShared");
            var Tsavedarr = [];
            Tsavedarr = tarrSaved.split(';');
            Tsavedarr.pop();
            if (r == true) {
                /*$("#trBM" + n).hide();
                Tsavedarr.splice(i, 1);
                storage.removeItem("arrShared");
                if (tarrSaved == null) {
                tarrSaved = "";
                }*/
                //storage.removeItem("arrShared");
                var length = Tsavedarr.length;
                var codelist = "";
                for (var i = 0; i < length; i++) {
                    Tsavedarr[i] = Tsavedarr[i].split('￥');
                    if (Tsavedarr[i][0].indexOf('Shared Location:') == 0) {
                        codelist += Tsavedarr[i][2] + ";";
                    }
                }
                if (getAccountLevel() > 1) {
                    $.ajax({
                        url: 'Handler/Login.ashx',
                        type: 'POST',
                        data: {
                            rashared: codelist,
                            who: who
                        }
                    });
                }
                storage.setItem("arrShared", '');
            }
            showshared();
            setTimeout('testShared()', 500);
        } catch (e) { catche(e); }
    });
    //#region 获取URL
    try {
        var thisurl = location.href;
        if (thisurl.indexOf("www.umap.ca") != -1) {
            window.location.href = "http://umap.ca";
        }
        var urlinfo;
        urlinfo = thisurl.split('?')[1];
        //    if (thisurl && (urlinfo[0] == '?kw')) {
        //        click_search(thisurl);
        //    }
        if (urlinfo) {
            urlinfo = urlinfo.replace(re1, " ");
            urlinfo = urlinfo.replace(/@/g, '');
            urlinfo = urlinfo.replace('dic00', '');
            urlinfo = urlinfo.replace('dic01', '');
            urlinfo = urlinfo.replace('dic02', '');
            urlinfo = urlinfo.replace('dic$', '');
            urlinfo = urlinfo.replace("%20", " ");
            //debugger;
            if (urlinfo == "events") {
                setTimeout('showevent()', 1500);
            }
            else {
                //#region 跳转 搜索   
                if (urlinfo.toLowerCase().indexOf("&details=true") != -1) {
                    storage.setItem("details", 1);
                    urlinfo = urlinfo.toLowerCase().replace("&details=true", " ");
                }
                else {
                    storage.setItem("details", 0);
                }
                storage.setItem("kw", urlinfo);
                storage.setItem("isre", 0);

                window.location.href = "index.htm";
                //#endregion
            }
            // click_map();
            // click_search(urlinfo, null, null, null, 1);
        }
        if (storage.getItem("isre") == 1) {
            reurl();
        }
        else {
            storage.setItem("isre", 1);
        }
    } catch (e) { catche(e); }
    //#endregion
    $("#cpright").live('click', function () {
        return;
        $("#about").html("<div id='copyrightCanvas'><div id='copyrightText'></div></div><div id='closesaved1' class='close'  onclick='closeabout(1)'><span class='chahao'>×</span></div><div id='closesaved' class='close'  onclick='closeabout(2)'><span class='chahao'>×</span></div>");

        $("#copyrightText").html(conText);

        $("#about").show();
        //console.log(3);
        //console.log(5);
        setTimeout(function () {
            try {
                if (closeLR == "L") {
                    $("#closesaved").html('');
                    $("#closesaved").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
                    //$("#closesaved").animate({ 'background': 'none', 'backgroundColor': 'transparent', 'boxShadow': 'none', 'border': '2px dotted white' });
                }
                else {
                    $("#closesaved1").html('');
                    $("#closesaved1").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
                    //  $("#closesaved1").animate({ 'background': 'none', 'backgroundColor': 'transparent', 'boxShadow': 'none', 'border': '2px dotted white' });
                }
                //console.log(4);
                if (iPhoneOrientation == 90) {
                    $("#copyrightCanvas,#copyrightText").height(170);
                }
                else {
                    $("#copyrightCanvas,#copyrightText").height(310);
                }
                //console.log(1);
                //$('#copyrightText').touchScroll();
                //                try {
                //                    $("#copyrightText").touchScroll();
                //                } catch (e) { console.log(e); }
                //console.log(2);
            } catch (e) {
                //alert(e);
            }

        }, 80);
        //console.log(6);
    });
    $("#Reports").live('click', function () {
        //report(1);
        newReport(1);
    });
    $("#list-re").live('click', function () {
        inputSwitch = true;
        newReport(2);
    });
    //    $("#container").live('click', function () {
    //        $('#list').touchScroll('setPosition', 0);
    //    });

    $("#Previouswin").live('click', function () {
        Previouswin();
        /*debugger;
       
        $("#Pri").html('<div id="Ptitle">Upcoming lucky draw:<span id="Ptime"></span></div><div id="Prize"><div id="Pimg"></div></div><div id="closePrize"  class="close" onclick="closePrize(2);"><span class="chahao">×</span></div><div id="closePrize1" class="close"  onclick="closePrize(1);"><span class="chahao">×</span></div>');
        //   <img src="images/Prize1.png" alt="">
        var imginfo = '<span class="Pimg"><img src="images/Prize1.png" alt=""><span id="Pinfo1"></span></span><span class="Pimg"><img src="images/Prize2.png" alt=""><span id="Pinfo2"></span></span><div id="PandP">Rules and Policy</div>';

        $("#Pimg").html(imginfo);

        if (closeLR == "L") {
        $("#closePrize").html('');
        $("#closePrize").css({  'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        }
        else {
        $("#closePrize1").html('');
        $("#closePrize1").css({  'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        }


        $("#Pinfo1").html("1st prize(1pcs)<br> iPhone 4S 16G White");
        $("#Pinfo2").html("2nd prize(20pcs)<br> Kingston 8G USB Drive");
        var date = new Date();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var i = 1;
        switch (month) {
        case i++: month = 'January'; break;
        case i++: month = 'February'; break;
        case i++: month = 'March'; break;
        case i++: month = 'April'; break;
        case i++: month = 'May'; break;
        case i++: month = 'June'; break;
        case i++: month = 'July'; break;
        case i++: month = 'August'; break;
        case i++: month = 'September'; break;
        case i++: month = 'October'; break;
        case i++: month = 'November'; break;
        case i++: month = 'December'; break;
        }
        i = 1;
        switch (day) {
        case i++: day = '1st'; break;
        case i++: day = '2nd'; break;
        case i++: day = '3rd'; break;
        default: day = day + 'th'; break;
        }

        //$("#Ptime").html(month + " " + day);
        $("#Ptime").html("April 4th");
        $("#Pri").show();
        google.maps.event.addDomListener(document.getElementById("PandP"), 'click', function (e) {
        $("#Pri").html('<div id="PandPInfo"><div id="PandPInfo1"></div></div><div id="closePandP"  class="close" onclick="closePrize(2);"><span class="chahao">×</span></div><div id="closePandP1"  class="close" onclick="closePrize(1);"><span class="chahao">×</span></div>');
        PandPInfo();
        $("#PandPInfo1").html(PandPText);

        if (closeLR == "L") {
        $("#closePandP").html('');
        $("#closePandP").css({  'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        }
        else {
        $("#closePandP1").html('');
        $("#closePandP1").css({  'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        }
        $('#PandPInfo1').touchScroll();
        //alert(2034);
        });
        google.maps.event.addDomListener(document.getElementById("Pri"), 'touchmove', function (e) {
        e.preventDefault();
        });
        google.maps.event.addDomListener(document.getElementById("Pri"), 'touchend', function (e) {
        setTimeout('toTop()', 500);
        });*/
    });
    testaccount();
    //#region 关闭提示框

    google.maps.event.addDomListener(document.getElementById("cmm"), 'touchstart', function (e) {
        $("#inMapMsg,#cmm").hide();
    });
    //#endregion

    //#region region

    /*背景色 if (verStr.indexOf("Version/5.0") != -1 || verStr.indexOf('Android') != -1) {
    //alert('Android');
    $('body').css('background-image', 'url("images/dot.png")');
    $('body').css('background-repeat', 'repeat');
    $('body').css('background-position', 'top left, top right');
    $('body').css('background-size', '10px');
    $('body').css('-webkit-background-size', '10px');
    }*/

    //$("#showaccount").'click' 
    //   var iscanbeclose1 = true;
    //    $("#showaccount").live('click', function () {
    //        if (iscanbeclose) {
    //            if ($("#account").is(":visible")) {
    //                clearTimeout(tif);
    //                $("#account,#a41").hide();
    //                iscanbeclose = false;
    //                setTimeout('iscanbeclose=true;', 1000);
    //            }
    //            else {
    //                if (userLevel < 3) {
    //                    var tacc = '<div id="a2" onclick="a2()">Previous reports</div><div id="a4" onclick="a4()">Add friends under your account</div><div id="a41"></div><div id="a1" onclick="a1()">Change Passwords</div><div id="closeDetailsaccount" onclick="closeaccount();"><span class="chahao">×</span></div>';
    //                    $("#account").html(tacc);
    //                    $("#account").show();
    //                }
    //                else {
    //                    var tacc = '<div id="a2" onclick="a2()">Previous reports</div><div id="a1" onclick="a1()">Change Passwords</div><div id="closeDetailsaccount" onclick="closeaccount();"><span class="chahao">×</span></div>';
    //                    $("#account").html(tacc);
    //                    $("#account").show();
    //                    $("#a1, #a2, #a3").css('margin-top', '50px');
    //                    //addbgcolor('account');<div id="a3" onclick="a3()">Comments</div>
    //                }
    //                iscanbeclose = false;
    //                setTimeout('iscanbeclose=true;', 1000);
    //            }
    //        }
    //    });

    /* URL COPY false 
    $("#url").live('click', function () {
    //#region webkit-OK, FF-No
    $("#url").select();
    document.execCommand("Copy");
    $("#url").blur();
    alert("This URL<" + $("#url").val() + "> is copyed !");
    //#endregion    
    });*/

    //dicmap
    /*if (vars.length >= 2) {
    if (vars.substr(0, 1) == '@' || vars.substr(0, 1) == '=') {
    keywords = vars.replace("%20", " ");
    keywords = keywords.replace("%20", " ");
    keywords = keywords.replace("%20", " ");
    keywords = keywords.replace("%20", " ");
    keywords = keywords.replace("%20", " ");
    keywords = keywords.replace("%20", " ");
    click_search(keywords);
    }
    }*/

    //    $("#cmm").click(function () {
    //        //clearTimeout();
    //        alert(1);
    //        $("#inMapMsg,#cmm").hide();
    //    });

    /*  google.maps.event.addDomListener(document.getElementById("list"), 'touchmove', function (e) {
    hideisearch(2);
    bhi = true;
    setTimeout('$("#tools").height(0);$("#tool,#tools").hide();', 1);
    });*/
    /* google.maps.event.addDomListener(document.getElementById("menu"), 'touchstart', function (e) {
    if ($("#function").is(":visible")) {
    $('#dicmap').click();
    }
    });
    */
    /*    $("#map_canvas").mouseover(function () {
    clearhide();
    hideisearch(0);
    })

    //  for test
    //    if (window.localStorage) {
    //        alert('This browser supports localStorage');
    //    } else {
    //        alert('This browser does NOT support localStorage');
    //    }
    //    localStorage.a = 3; //设置a为"3"
    //    localStorage["a"] = "sfsf"; //设置a为"sfsf"，覆盖上面的值
    //    localStorage.setItem("b", "isaac"); //设置b为"isaac"
    //    var a1 = localStorage["a"]; //获取a的值
    //    var a2 = localStorage.a; //获取a的值
    //    var b = localStorage.getItem("b"); //获取b的值
    //    localStorage.removeItem("c"); //清除c的值
    //    var storage = window.localStorage;
    //    if (!storage.getItem("pageLoadCount")) {
    //        storage.setItem("pageLoadCount", 0);
    //    }
    //    storage.pageLoadCount = parseInt(storage.getItem("pageLoadCount")) + 1; //必须格式转换
    //    alert(storage.pageLoadCount);
    //    showStorage();
    //    $("#map_canvas").mousemove(function () {
    //        hideisearch(0);
    //    });
    //    document.querySelector("#map_canvas").addEventListener('touchmove', function () {
    //        hideisearch(0);
    //    });
    //    google.maps.event.addDomListener(document.getElementById("map_canvas"), 'touchmove', function () {
    //        hideisearch(0);
    //    });
    //    $(document).mousemove(function (e) {
    //        clearInterval(mapdivt1);
    //        mapdivt = 0;
    //    });
    //setInterval('da()', 100);

    $("#map_canvas").mouseout(function () {
    clearhide();
    });*/

    //#endregion

});
function showsave() {
    //debugger;
    try {
        //sthInsaved = $("#saved").html();
        $("#account").hide();
        if (savedsw) {
            setTimeout('toTop()', 500);
            // background-image: -moz-linear-gradient(center top ,#eff3f7,#d6dbde); /* #3F6F98, #004080, #004080, #3F6F98  background-color:#3f6f98;     background-image: -moz-linear-gradient(top, #788d9c,#004080,#002050,#002050);     background-image: -webkit-gradient(             linear, left top,              left bottom,              from (#788d9c),             color-stop(0.4, #004080),             color-stop(0.6, #002050),             to(#002050)              ); */
            //background: -webkit-gradient(linear, left top,right top, from(#eff3f7), to(#d6dbde)); /*background-image: -moz-linear-gradient(center top ,#ffe9cb,#e6d0b7);  #3F6F98, #004080, #004080, #3F6F98  background-color:#3f6f98;     background-image: -moz-linear-gradient(top, #788d9c,#004080,#002050,#002050);     background-image: -webkit-gradient(             linear, left top,              left bottom,              from (#788d9c),             color-stop(0.4, #004080),             color-stop(0.6, #002050),             to(#002050)              );      background: -webkit-gradient(linear, 54% 13%, 54% 67%, from(#ffe9cb), to(#e6d0b7))background-image: -webkit-gradient(linear,left top,right top,from(#ffe9cb),color-stop(0.5,#ffe9cb),to(#e6d0b7)); -webkit-gradient(linear, 0% 0%, 0% 100%, from(#FFE9CB), color-stop(0.5, #FFE9CB), to(#E6D0B7));*/
            /*  var app = navigator.appName;
            if (app.indexOf("Netscape") != -1) {//FF
            $("#saved").css("background-image", "-moz-linear-gradient(center top ,#eff3f7,#d6dbde)");
            }
            if (verStr.indexOf('Safari') != -1) { //safari
            $("#saved").css("background-image", "-webkit-gradient(linear, left top,right top, from(#eff3f7), to(#d6dbde))");
            }
            */
            if (storage && storage.getItem("arrSaved")) {
                //  $("#saved").animate({ height: 348 });
                $("#saved").height(348);
                //setTimeout('$("#saved").height(348)', 300);
                //$("#menu").hide();
                savedsw = false;
                showsaved();
            }
        }
        testmenu();
    } catch (e) { catche(e); }
}
function showshare() {
    try {
        //sthInsaved = $("#saved").html();
        $("#account").hide();
        if (savedsw) {
            setTimeout('toTop()', 500);
            // background-image: -moz-linear-gradient(center top ,#eff3f7,#d6dbde); /* #3F6F98, #004080, #004080, #3F6F98  background-color:#3f6f98;     background-image: -moz-linear-gradient(top, #788d9c,#004080,#002050,#002050);     background-image: -webkit-gradient(             linear, left top,              left bottom,              from (#788d9c),             color-stop(0.4, #004080),             color-stop(0.6, #002050),             to(#002050)              ); */
            //background: -webkit-gradient(linear, left top,right top, from(#eff3f7), to(#d6dbde)); /*background-image: -moz-linear-gradient(center top ,#ffe9cb,#e6d0b7);  #3F6F98, #004080, #004080, #3F6F98  background-color:#3f6f98;     background-image: -moz-linear-gradient(top, #788d9c,#004080,#002050,#002050);     background-image: -webkit-gradient(             linear, left top,              left bottom,              from (#788d9c),             color-stop(0.4, #004080),             color-stop(0.6, #002050),             to(#002050)              );      background: -webkit-gradient(linear, 54% 13%, 54% 67%, from(#ffe9cb), to(#e6d0b7))background-image: -webkit-gradient(linear,left top,right top,from(#ffe9cb),color-stop(0.5,#ffe9cb),to(#e6d0b7)); -webkit-gradient(linear, 0% 0%, 0% 100%, from(#FFE9CB), color-stop(0.5, #FFE9CB), to(#E6D0B7));*/
            /*  var app = navigator.appName;
            var verStr = navigator.appVersion;
            if (app.indexOf("Netscape") != -1) {//FF
            $("#saved").css("background-image", "-moz-linear-gradient(center top ,#eff3f7,#d6dbde)");
            }
            if (verStr.indexOf('Safari') != -1) { //safari
            $("#saved").css("background-image", "-webkit-gradient(linear, left top,right top, from(#eff3f7), to(#d6dbde))");
            }
            */
            if (storage && storage.getItem("arrShared")) {
                $("#saved").height(348);
                setTimeout('$("#saved").height(348)', 300);  //$("#menu").hide();
                savedsw = false;
                showshared();
            }
        }
        testmenu();
    } catch (e) {
        catche(e);
    }
}
function showevent() {
    try {
        if (!isshowevents) {
            isshowevents = true;
            AutoEvents();
            //            $.ajax({
            //                url: 'Handler/Login.ashx',
            //                type: 'POST',
            //                data: {
            //                    getEvents: who
            //                },
            //                success: function (a) {
            //                    //debugger;
            //                    isshowevents = false;
            //                    EventsText = a;
            //                    if ($("#main").html().indexOf('Events') != -1) {
            //                        showevent();
            //                    }
            //                    //   EventsText = "1:;CTY Computers:;14-420 Hwy 7 E , Richmond Hill￥2:;Kum Hong BBQ Restaurant:;14-420 Hwy 7 E , Richmond Hill￥￥3:;Kum Hong BBQ Restaurant:;14-420 Hwy 7 E , Richmond Hill";
            //                },
            //                error: function (a) {
            //                }
            //            });
        }
        luckyReady = true;
        $("#SearchIcon").css({ "top": "379px", "left": "145px", "display": "block" });
        isshowevents = true;
        //sthInsaved = $("#saved").html();
        sthInMain = $("#main").html();
        $("#account").hide();
        if (savedsw) {
            setTimeout('toTop()', 500);
            $("#saved").height(348);
            //setTimeout('$("#saved").height(348)', 300);
            savedsw = false;
            showevents();
        }
        testmenu();
    } catch (e) {
        catche(e);
    }
}
//#region 奖品 相关
function Previouswin() {
    if (iPhoneOrientation == 90 || userLevel < 30) {
        return true;
    }
    //debugger;
    $("#Pri").html('<div id="Ptitle">Upcoming lucky draw:<span id="Ptime"></span></div><div id="Prize"><div id="Pimg"></div></div><div id="closePrize"  class="close" onclick="closePrize(2);"><span class="chahao">×</span></div><div id="closePrize1" class="close"  onclick="closePrize(1);"><span class="chahao">×</span></div>');
    //   <img src="images/Prize1.png" alt="">
    var imginfo = '<span class="Pimg"><img src="images/Prize1.png" alt=""><span id="Pinfo1"></span></span><span class="Pimg"><img src="images/Prize2.png" alt=""><span id="Pinfo2"></span></span><div id="PandP">Rules and Policy</div>';

    $("#Pimg").html(imginfo);

    if (closeLR == "L") {
        $("#closePrize").html('');
        $("#closePrize").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
    }
    else {
        $("#closePrize1").html('');
        $("#closePrize1").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
    }
    if (iPhoneOrientation == 90) {
        $("#Pimg span.Pimg").css('margin-left', '75px');
    }
    else {
        $("#Pimg span.Pimg").css('margin-left', '26px');
    }


    $("#Pinfo1").html("1st prize(1pcs)<br> iPhone 4S 16G White");
    $("#Pinfo2").html("2nd prize(20pcs)<br> Kingston 8G USB Drive");
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var i = 1;
    switch (month) {
        case i++: month = 'January'; break;
        case i++: month = 'February'; break;
        case i++: month = 'March'; break;
        case i++: month = 'April'; break;
        case i++: month = 'May'; break;
        case i++: month = 'June'; break;
        case i++: month = 'July'; break;
        case i++: month = 'August'; break;
        case i++: month = 'September'; break;
        case i++: month = 'October'; break;
        case i++: month = 'November'; break;
        case i++: month = 'December'; break;
    }
    i = 1;
    switch (day) {
        case i++: day = '1st'; break;
        case i++: day = '2nd'; break;
        case i++: day = '3rd'; break;
        default: day = day + 'th'; break;
    }

    //$("#Ptime").html(month + " " + day);
    $("#Ptime").html("April 4th");
    $("#Pri").show();
    google.maps.event.addDomListener(document.getElementById("PandP"), 'click', function (e) {
        $("#Pri").html('<div id="PandPInfo"><div id="PandPInfo1"></div></div><div id="closePandP"  class="close" onclick="closePrize(2);"><span class="chahao">×</span></div><div id="closePandP1"  class="close" onclick="closePrize(1);"><span class="chahao">×</span></div>');
        PandPInfo();
        $("#PandPInfo1").html(PandPText);

        if (closeLR == "L") {
            $("#closePandP").html('');
            $("#closePandP").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        }
        else {
            $("#closePandP1").html('');
            $("#closePandP1").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        }
        //$('#PandPInfo1').touchScroll();
        //        try {
        //            $("#PandPInfo1").touchScroll();
        //        } catch (e) { console.log(e); }
        //alert(2034);
    });
    google.maps.event.addDomListener(document.getElementById("Pri"), 'touchmove', function (e) {
        e.preventDefault();
    });
    google.maps.event.addDomListener(document.getElementById("Pri"), 'touchend', function (e) {
        setTimeout('toTop()', 500);
    });
}
//#region  PandPText
var PandPText = "";
PandPText += "<strong>How it works</strong>";
PandPText += "<br>1.This monthly lucky draw is open to member users of umap.ca.";
PandPText += "<br>2.Members activities in umap.ca will be counted with points, like reporting, inviting new members, sharing locations, searching, etc.";
PandPText += "<br>3.New member will get two tickets after register.";
PandPText += "<br>4.50 points turn to 1 ticket. Each ticket will be issued a unique 7 digits number by computer. tickets are only available for current lucky draw. ";
PandPText += "<br>5.Maximum 60 tickets issued for each month for each user, extra earned points will be put to next month.";
PandPText += "<br>6.Winner will be announced on first Wednesday of each month. The closest ticket number to the same day LOTTO 6/49 Encore number wins.";
PandPText += "<br>7.Winners will be notified by their registered email address, and have to claim prizes in two months from the announcement. Otherwise the prizes will be added to next coming drawing.";
PandPText += "<br><br><strong>Terms and Conditions</strong>";
PandPText += "<br>1.First prize winner's basic information will be published for publicity purposes.";
PandPText += "<br>2.Prize winnings are pick-up only unless notice.";
PandPText += "<br>3.First and second prize winners need to show ID for verifying with their Account.";
PandPText += "<br>4.For purpose of making our fair points and lucky draw system, these rules may change. ";
//#endregion
function PandPInfo() {

}
function closePrize(x) {
    //debugger;
    try {
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
    $("#Pri").hide();
    //debugger;
    if (x == 1) {
        $("#closepoints").html('');
        $("#closepoints").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });

        $("#closepoints1").html('<span class="chahao">×</span>');
        $("#closepoints1").css({ 'background': '-webkit-gradient(linear, 52% 100%, 53% 0%, from(#6A0000), to(#E27C7B))', 'box-shadow': '4px 2px 5px grey', 'border': '2px solid white' });
    }
    else {
        $("#closepoints1").html('');
        $("#closepoints1").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });

        $("#closepoints").html('<span class="chahao">×</span>');
        $("#closepoints").css({ 'background': '-webkit-gradient(linear, 52% 100%, 53% 0%, from(#6A0000), to(#E27C7B))', 'box-shadow': '4px 2px 5px grey', 'border': '2px solid white' });
    }
}
function closeabout(x) {
    try {
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
    setTimeout(function () {
        $("#about").hide();
        $("#about").css("-webkit-transform", 'scale(1)');
        $("#about").css("-webkit-transition-duration", ' ');
    }, 400);
    $("#about").css("-webkit-transition-duration", '0.4s');
    $("#about").css("-webkit-transform", 'scale(0)');
}
//#endregion
var tid;
function GoogleTouchEvent(id, s, m, e) {
    //return;
    tid = id;
    //console.log(id);
    try {
        //debugger;
        if (s) {
            google.maps.event.addDomListener(document.getElementById(id), 'touchstart', function (e) {
                if (id == "container") {
                    if (!TserEvent) {
                        //alert(3155);
                        e.preventDefault();
                    }
                    else {
                        //alert(id);
                    }
                }
                else {
                    e.preventDefault();

                }
            });
        }
        if (m) {
            google.maps.event.addDomListener(document.getElementById(id), 'touchmove', function (e) {
                //alert(3777);
                if (id == "container") {
                    if (!TserEvent) {
                        e.preventDefault();
                    }
                }
                else {
                    if (id == "container") {
                        if (!TserEvent) {
                            e.preventDefault();
                        }
                    }
                    else {
                        e.preventDefault();
                    }
                }
            });
        }
        if (e) {
            google.maps.event.addDomListener(document.getElementById(id), 'touchend', function (e) {
                setTimeout('toTop()', 500);
            });
        }

        if (!(s || m || e)) {
            google.maps.event.addDomListener(document.getElementById(id), 'touchstart', function (e) {
                //console.log(e);
                //toTop();
            });
            google.maps.event.addDomListener(document.getElementById(id), 'touchmove', function (e) {
                e.preventDefault();
            });
            google.maps.event.addDomListener(document.getElementById(id), 'touchend', function (e) {
                setTimeout('toTop()', 500);
            });
        }

    } catch (e) { catche(e); }
}
function ClearGoogleTouchEvent(id) {
    google.maps.event.clearInstanceListeners(document.getElementById(id));
}
var canLocation = true;
var st2564;
google.maps.event.addDomListener(document.getElementById('map'), 'touchstart', function (e) {
    showswitch = true;
    clearInterval(si6629);
    /*$("#layerPulse2").hide();
    $("#layerPulse1").removeClass("layerPulse1");*/
    isgetthis = false;
    //clearTimeout(st2564);
});
google.maps.event.addDomListener(document.getElementById('map'), 'touchend', function (e) {
    clearInterval(si6629);
    showswitch = false;
    si6629 = setInterval('showCenter()', 2000);
    setTimeout('isgetthis=true; $("#layerPulse").removeClass("layerPulse");', 500);
    /*st2564 = setTimeout(function () {
    if (gpsState == 2 && canLocation) {
    try {
    gpsLL = latLngControl.updatePosition();
    gps = GetgpsLL();
    } catch (e) { catche(e); }
    if (gps == "" || gps == null) {
    gps = "43.6702131,-79.38679";
    gpsLL = "(43.6702131,-79.38679)";
    }
    try {
    var marker1 = new google.maps.Marker({
    position: gpsLL,
    icon: gpsicon,
    map: map
    });
    if (marker1) {
    clearMarkGPS();
    markerGPS.push(marker1);
    addClicktoMarker(marker1, gpsLL);
    newgps = gpsLL;
    newGPS = gpsLL;
    }

    } catch (e) { catche(e); }
    }
    }, 1000);*/
});
google.maps.event.addDomListener(document.getElementById('map'), 'click', function (e) {
    //debugger;
    isgetthis = false;
});
//ClearGoogleTouchEvent('map');
function CoverTouch() {
    google.maps.event.addDomListener(document.getElementById("cover"), 'touchmove', function (e) {
        e.preventDefault();
    });
    google.maps.event.addDomListener(document.getElementById("cover"), 'touchend', function (e) {
        setTimeout('toTop()', 500);
    });
}
function reurl() {
    if (storage.getItem("kw") != null && storage.getItem("kw") != "") {
        try {
            kw = storage.getItem("kw");
            storage.removeItem("kw");
            click_map();
            click_search(kw, null, null, null, 1);
        } catch (e) {
            catche(e);
        }
    }
}
var tfswi = true;
//#region Report
//$("#Reports").html('write something to us.');

var reportStep;
var FirnewReport = true;
function newReport(x, plat, plng) {
    //debugger;
    try {
        if (x && x.indexOf('G') == 0) {
            bizToMap();
        }
    } catch (e) { }
    try {
        clearTimeout(stcr);
        inputSwitch = true;
        reportStep = 1;
        withgps = true;
        var trf;
        //closeDetails();

        //if (x == 1 || x == 2) { //从主界面过来的New
        //click_map();
        trf = '<div id="ReportsForm">'; //<div class="dnr"><center>FeedBack</center></div>
        //trf += '<div id="dmsg"><div id="divArea"><center><br><br>Name/Extra info/Address/Telphone<br>Checking location……<img src=\"images/loading/loading11.gif\" /></center></div><br>';
        // trf += '<div id="dmsg"><div id="divArea"><center><br><br>Name/Extra info/Address/Telphone<br>Checking location……</center></div><br>';
        trf += '<div id="dmsg"><div id="divArea"><textarea onfocus="inputSwitch = true;" onblur="inputSwitch = false;" id="reportArea" cols="30" rows="4"></textarea></div><br>';
        //trf += '<span id="CloseReport" onclick="CloseReport(\'' + x + '\',\'' + plat + '\',\'' + plng + '\')"><span class="chahao">×</span></span> <span id="Report" onclick="Next(\'' + x + '\',\'' + plat + '\',\'' + plng + '\')">Next</span><div style="height:10px;clear: both;"></div></div>';
        trf += '<span id="CloseReport1" class="close" onclick="CloseReport(\'' + x + '\',\'' + plat + '\',\'' + plng + '\',1)"><span class="chahao">×</span></span><span id="CloseReport"  class="close" onclick="CloseReport(\'' + x + '\',\'' + plat + '\',\'' + plng + '\',2)"><span class="chahao">×</span></span> <span id="Report" onclick="Next(\'' + x + '\',\'' + plat + '\',\'' + plng + '\')">Next</span></div>'; //<div style="height:10px;clear: both;"></div>
        //trf += '<div id="CloseReport" onclick="CloseReport(\'' + x + '\',\'' + plat + '\',\'' + plng + '\')"><button type="button" onclick="closecross()" class="specialkey backspace">B</button></div><span id="Report" onclick="Next(\'' + x + '\',\'' + plat + '\',\'' + plng + '\')">Next</span>';

        $("#rf").html(trf);
        if (closeLR == "L") {
            $("#CloseReport").html('');
            $("#CloseReport").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        }
        else {
            $("#CloseReport1").html('');
            $("#CloseReport1").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        }

        google.maps.event.addDomListener(document.getElementById("ReportsForm"), 'touchstart', function (e) {
            $("#tools").height(0);
            $("#tool,#tools").hide();
            bhi = true;
            setTimeout('toTop()', 500);
        });
        google.maps.event.addDomListener(document.getElementById("ReportsForm"), 'touchend', function (e) {
            $("#tools").height(0);
            $("#tool,#tools").hide();
            bhi = true;
            setTimeout('toTop()', 500);
        });
        setTimeout(function () {
            $("#container").hide();
            $("#rf").show();
            $("#rf").css("-webkit-transform", 'scale(1)');
            $("#reportArea").focus();
        }, 0)
        //if (x == 2) {//x==1
        //getbound();
        //debugger;
        if (isInrange == false && isAlert == false) {//如果不在范围内且没有提示
            isAlert = true;
            if (iscanalert) {
                //alert('Your area may not be covered by Umap.ca');
                clearTimeout(t1);
                $('#inMapMsg,#cmm').show();
                $('#inMapMsg').html("<center><span>Your area may not be covered by Umap.ca</span></center>");
                t1 = setTimeout("$('#inMapMsg,#cmm').hide()", 5000);
                iscanalert = false;
                setTimeout(function () { iscanalert = true; }, 5000);
            }
            $("#reportArea").focus();
        }
        // }
        inputSwitch = true;
        $("#reportArea").focus();
    } catch (e) { catche(e); }
    GoogleTouchEvent('ReportsForm');
    //inputSwitch = true;
    //    }
    //    else if (x.length == 8) {
    //        ccode = x;
    //    }
    //$("#reportArea").val((new Date).getSeconds());

    setTimeout(function () {
        $("#reportArea").focus();
    }, 500);

    //    if (FirnewReport) {
    //        FirnewReport = false;
    //        setTimeout(function () {
    //            CloseReport();
    //            //newReport(2);
    //        }, 500);
    //    }
}

var reportinfo;
var newbizgps = "";
var opentools = false;
//原函数
function Next1(x, plat, plng) {
    try {
        // //debugger;
        reportStep = 2;
        if ($("#Report").html() == "Next") {
            reportinfo = $.trim($('#reportArea').val());
            if (reportinfo != "") {
                try {
                    if (!isNaN(plat)) {
                        var ll = new google.maps.LatLng(plat, plng)
                        if (monitor.gps(ll)) {
                            map.panTo(ll);
                        }
                        map.setZoom(18);
                    }
                } catch (e) { catche(e); }
                $("#Report, #CloseReport").css("margin-top", "-7px");
                $("#tools").css("top", "255px");
                //#region
                $("#tools").height(45);
                $("#tool,#tools").show();
                opentools = true;
                //#region
                $('#divArea').css('border', '0px');
                //$("#divArea").html('<center>If coordinates updated, or a new business, please put the center of the screen to move the position ,<br>and submit<br>if not,<a style="color:darkblue" onclick="withoutgps()">click Me</a></center>');
                $("#divArea").html('<span><br><br><br>If it\'s about a biz position, please place the cursor on top of it by moving the map.<br>Or ignore it.</span>');
                $("#Report").html("submit");
                getc();
                google.maps.event.addDomListener(document.getElementById("reportArea"), 'touchend', function (e) {
                    $("#tools").height(45);
                    $("#tools").css("top", "255px");
                    $("#tool,#tools").show();
                });
            }
        }
        else {//提交
            //$("#dmsg").html('<center><br><br><br>Report Data Updating ……<br><img src=\"images/loading/loading11.gif\" /></center>');
            opentools = false;
            $("#tools").height(0);
            $("#tool,#tools").hide();
            bhi = true;
            setTimeout('toTop()', 500);
            //debugger;
            $("#dmsg").html('<center><br><br><br>Report Data Updating ……</center>');
            if (withgps) {
                newbizgps = getc();
                //// // // //  // //debugger;;
                //getbound(1, newbizgps, x);
                reportToDB(x);
            }
            else {
                newbizgps = "";
                reportToDB(x);
            }
        }
    } catch (e) { catche(e); }
}
function Next(x, plat, plng) {
    //debugger;
    try {
        reportinfo = $.trim($('#reportArea').val());
        if (reportinfo != "") {
            try {
                if (!isNaN(plat)) {
                    newbizgps = new google.maps.LatLng(plat, plng)
                    if (monitor.gps(newbizgps)) {
                        map.panTo(newbizgps);
                    }
                    map.setZoom(18);
                }
                else {
                    newbizgps = latLngControl.updatePosition();
                }
                reportToDB(x);
            } catch (e) { catche(e); }
        }
    } catch (e) { catche(e); }
    /*

    try {
    // //debugger;
    reportStep = 2;
    if ($("#Report").html() == "Next") {

    $("#Report, #CloseReport").css("margin-top", "-7px");
    $("#tools").css("top", "255px");
    //#region
    $("#tools").height(45);
    $("#tool,#tools").show();
    opentools = true;
    //#region
    $('#divArea').css('border', '0px');
    //$("#divArea").html('<center>If coordinates updated, or a new business, please put the center of the screen to move the position ,<br>and submit<br>if not,<a style="color:darkblue" onclick="withoutgps()">click Me</a></center>');
    $("#divArea").html('<span><br><br><br>If it\'s about a biz position, please place the cursor on top of it by moving the map.<br>Or ignore it.</span>');
    $("#Report").html("submit");
    getc();
    google.maps.event.addDomListener(document.getElementById("reportArea"), 'touchend', function (e) {
    $("#tools").height(45);
    $("#tools").css("top", "255px");
    $("#tool,#tools").show();
    });

    }
    else {//提交
    //$("#dmsg").html('<center><br><br><br>Report Data Updating ……<br><img src=\"images/loading/loading11.gif\" /></center>');
    opentools = false;
    $("#tools").height(0);
    $("#tool,#tools").hide();
    bhi = true;
    setTimeout('toTop()', 500);
    //debugger;
    $("#dmsg").html('<center><br><br><br>Report Data Updating ……</center>');
    if (withgps) {
    newbizgps = getc();
    //// // // //  // //debugger;;
    //getbound(1, newbizgps, x);
    reportToDB(x);
    }
    else {
    newbizgps = "";
    reportToDB(x);
    }
    }
    } catch (e) { catche(e); }*/
}
var stcr; //setTimeout  CloseReport
function reportToDB(x) {
    try {
        //debugger;
        var who = "";
        if (storage.getItem("account") != null && storage.getItem("account") != "") {
            who = storage.getItem("account");
        }
        if (storage.getItem("whoT") != null && storage.getItem("whoT") != "") {
            whoT = storage.getItem("whoT");
        }
        var tx;
        if (x.length != 8) {
            tx = "";
        }
        else {
            tx = x;
        }
        //tmsg = $("#dmsg").html();
        //$("#dmsg").html('<center><br><br><br>Report Data Updating ……</center>');
        $("#dmsg").html('<center><br><br><br>Thanks for your report!</center><div id="CloseReport" class="close" onclick="CloseReport()"><span class="chahao">×</span></div>');
        $("#CloseReport").css("margin-top", "49px");
        stcr = setTimeout('CloseReport("' + x + '");', 10000);
        //$("#dmsg").html('<center><br><br><br>Submit save, Thanks!</center>');<button type="button" onclick="closecross()" class="specialkey backspace">B</button>
        var gatt = 'f';
        if (gpsAtt) {
            gatt = 't';
        }
        //#region gps
        tnewgps = newgps;
        if (newgps.toUrlValue(5)) {
            tnewgps = "" + newgps.toUrlValue(5);
        }
        tnewbizgps = newbizgps;
        if (tnewbizgps && newbizgps.toUrlValue(5)) {
            tnewbizgps = "" + newbizgps.toUrlValue(5);
        }
        else {
            tnewbizgps = "" + tnewgps;
        }
        //#endregion
        $.ajax({
            url: 'Handler/Login.ashx',
            type: 'POST',
            data: {
                reportToDB: reportinfo,
                curgps: tnewgps,
                gps: tnewbizgps,
                who: who,
                GPSAtt: gatt,
                whoT: whoT,
                ccode: tx
            },
            success: function (info) {
                info = info.split(';');
                if (info[0] == "true") {
                    if ((who == "" || who == null) && (whoT == "" || whoT == null)) {
                        whoT = info[1];
                        storage.setItem("whoT", whoT);
                    }
                    isclose = false;
                    //alert("Submit save, Thanks!");
                    //CloseReport(x);
                }
                else {
                    alert('Submit failed, please try again later, sorry about the inconveinece.');
                    // CloseReport(x);
                }
            },
            error: function (info) {
                //alert(info);
                alert('Submit failed, please try again later, sorry about the inconveinece.');
                // CloseReport(x);
            }
        });
        //alert("Submiting Thanks!");
        //setTimeout('CloseReport("' + x + '")', 10000);
    } catch (e) { catche(e); }
}
function changeText() {
    try {
        if (reportStep == 1) {
            $("#divArea").html('<textarea onfocus="inputSwitch = true;" onblur="inputSwitch = false;" id="reportArea" cols="30" rows="4"></textarea>');
            google.maps.event.addDomListener(document.getElementById("reportArea"), 'touchend', function (e) {
                $("#tools").height(0);
                $("#tool,#tools").hide();
                bhi = true;
                //setTimeout('toTop()', 500);
            });
            //$("#Report").css("color", "white");
            $("#reportArea").focus();
        }
    } catch (e) { catche(e); }
}
var withgps = true; //true可以获取
function withoutgps() {
    //if (withgps) {
    getc();
    withgps = !withgps;
    // }
}
function getbound(x, newbizgps, code) {
    //x=1,使用给定的gps，否则使用newgps
    //x=2。设备获取gps后，改变变量
    //debugger;
    var tgps = "" + newgps;
    if (x) {
        tgps = "" + newbizgps;
    }
    //debugger;
    //alert("Your GPS is: " + tgps);
    $.ajax({
        url: 'Handler/Login.ashx',
        type: 'POST',
        data: {
            getbound: tgps
        },
        success: function (info) {
            if (x != '3') {
                //alert("getbound info is : 【" + info + "】");
                //console.log("getbound info is : 【" + info + "】");
                isInrange = false;
                isAlert = false;
                if (info == "true") {
                    //alert("position ok"); && x == 2
                    isInrange = true;
                }
                if (x == '1') {
                    reportToDB(code);
                }
            }
        },
        error: function () {
            return;
            //alert("Sorry, Your location is not within the scope of service .");
            $("#dmsg").html('<div id="divArea"></div><span id="CloseReport" onclick="CloseReport(' + x + ')"><span class="chahao">×</span></span> <span id="Report" onclick="Next(\'' + x + '\')">Next</span><div style="height:10px;clear: both;"></div>');

            $("#divArea").html("<center style='color: gray;'><br>This location may not covered by umap.ca<br>Thank you for your help !<center>");
            $("#Report").css("color", "grey");
        }
    });
}
function getc() {
    if (!isclose) {//if havn`t close
        $("#zoom10").click();
        if (tfswi) {
            tfswi = false;
            //$("#nrc").val("click me to get location");
            //$('#inMapMsg').html("move map, put cross to the front door.");
            //$('#inMapMsg,#cmm').fadeIn();
            //t1 = setTimeout("$('#inMapMsg,#cmm').fadeOut();", 5000);
        }
        else {
            // $('#inMapMsg,#cmm').fadeOut();
            //clearTimeout(t1);
            curgps = latLngControl.updatePosition();
            //$("#nrc").val(curgps.toUrlValue(6));
            tfswi = true;
            return curgps;
        }
    }
}
/*/#region OLD-Report
//生成report界面
function report(x) {
click_map();
var trf;
/*  = '<div id="ReportsForm"><table cellpadding="0" cellspacing="0"><tbody><tr><td colspan="4" class="tnr"><center>New &nbsp;Report</center></td>';
trf += '</tr><tr><td class="t1"></td><td class="t2"><span>Business name :</span></td><td class="t3"><input id="nrbn" type="text" class="txt" title="Please input Business name" />';
trf += '</td><td class="t4">*</td></tr><tr><td class="t1"></td><td class="t2"><span>Phone number :<br>(no fax)</span></td>';
trf += '<td class="t3"><input id="nrpn" type="text" class="txt" title="Please input Phone number" /></td><td class="t4"></td>';
trf += '</tr><tr><td class="t1"></td><td class="t2"><span>Address :</span></td><td class="t3"><input id="nra" type="text" class="txt" title="Please input Address" />';
trf += '</td><td class="t4"></td></tr><tr><td class="t1"></td><td class="t2"><span>Extra info :</span></td><td class="t3"><input id="nrei" type="text" class="txt" title="Please input Extra info" />';
trf += '</td><td class="t4"></td></tr><tr><td class="t1"></td><td class="t2"><span>Coordinates :</span></td><td class="t3"><input id="nrc" type="text" readonly="readonly" class="txt" title="Coordinates" />';
trf += '</td><td class="t4"></td></tr><tr><td class="t1"></td><td class="t2"><span>Notes :</span></td><td class="t3"><input id="nrn" type="text" maxlength="300" class="txt" title="Please input Notes" />';
trf += '</td><td class="t4"></td></tr><tr><td colspan="4"><span id="CloseReport">Close</span><span id="Report">Reports</span> </td></tr></tbody></table></div>';
       
*
trf = '<div id="ReportsForm">'; //<div class="dnr"><center>FeedBack</center></div>
trf += '<div id="dmsg"><span>Business name :</span><br><span>Phone number :</span><br>';
trf += '<span>Address :</span><br><span>Extra info:</span><br><span>Coordinates:</span><br>';
trf += '<span>Notes:</span><br></div><div id="dinput">';
trf += '<input onfocus="inputfocus(1)" onblur="testposition(this)" id="nrbn" type="text" class="txt" title="Please input Business name" />';
trf += '<input onfocus="inputfocus(1)" onblur="testposition(this)" id="nrpn" type="text" class="txt" title="Please input Phone number" />';
trf += '<input onfocus="inputfocus(1)" onblur="testposition(this)" id="nra" type="text" class="txt" title="Please input Address" />';
trf += '<input onfocus="inputfocus(1)"  id="nrei" type="text" class="txt" title="Please input Extra info" />';
trf += '<input onfocus="inputfocus(1)"  id="nrc" type="text" onclick="getc()" readonly="readonly" class="txt" title="Coordinates" />';
trf += '<input onfocus="inputfocus(1)"  id="nrn" type="text" maxlength="300" class="txt" title="Please input Notes" /></div>';
trf += '<span id="CloseReport" onclick="CloseReport(' + x + ')"><span class="chahao">×</span></span> <span id="Report" onclick="NewReport(null,null,' + x + ')">Next</span><div id="xing">*<div style="height:117px;"></div>*</div><div style="height:10px;clear: both;"></div></div>';

$("#rf").html(trf);
google.maps.event.addDomListener(document.getElementById("ReportsForm"), 'touchstart', function (e) {
$("#tools").height(0);
$("#tool,#tools").hide();
setTimeout('toTop()', 500);
});
google.maps.event.addDomListener(document.getElementById("ReportsForm"), 'touchend', function (e) {
$("#tools").height(0);
$("#tool,#tools").hide();
bhi = true;
setTimeout('toTop()', 500);
});
$("#rf").show();
/*if (verStr.indexOf("Version/5.0") != -1 || verStr.indexOf('Android') != -1) {
$('#rf').css('background-image', 'url("images/dot.png")');
$('#rf').css('background-repeat', 'repeat');
$('#rf').css('background-position', 'top left, top right');
$('#rf').css('background-size', '10px');
$('#rf').css('-webkit-background-size', '10px');
}
addbgcolor('rf');*
//$('#ReportsForm').touchScroll();


}
//跳转至下一格
function testposition(th) {
if (th.value != "") {
var scrollY = $('#ReportsForm').touchScroll('getPosition');
if (parseInt(scrollY) < 100) {
try {
$('#ReportsForm').touchScroll('setPosition', (parseInt(scrollY) + 35));
} catch (e) { catche(e); }
}
}
}
//报告【new+it】【x:null[new] 2[it]  cc:ccode】
var telreg = /\d{1,}-\d{1,}-\d{1,}/;
function NewReport(x, cc, xx) {
//#region 判断是否可以提交
var bn = $("#nrbn").val();
var pn = $("#nrpn").val();
var ad = $("#nra").val();
var ei = $("#nrei").val();
var co = $("#nrc").val();
var ns = $("#nrn").val();
var isclosed = false;
try {
isclosed = $("#isClose").attr("checked");
} catch (e) { catche(e); }
var from = (x == 2) ? 2 : 1;
var who;
if (storage.getItem("account") != null && storage.getItem("account") != "") {
who = storage.getItem("account");
}
if (!cc) {
cc = "";
}
if (jQuery.trim(bn) == "") {
$('#ReportsForm').touchScroll('setPosition', 0);
backborder();
$("#nrbn").css("border", "1px solid red");
$("#nrbn").focus();
}
else {// if (telregif.test(pn)) {
if ((jQuery.trim(co) == "" || jQuery.trim(co) == "click me to get location") && !isclosed) {
$('#ReportsForm').touchScroll('setPosition', 0);
backborder();
$("#nrc").css("border", "1px solid red");
$("#nrc").focus();
$("#nrc").click();
$('#ReportsForm').touchScroll('setPosition', (parseInt(scrollY) + 35));
}
else {
var tinfo = $("#ReportsForm").html();
//$("#ReportsForm").html("<center><br><br><br>Data Uploading ……<br><br><img src=\"images/loading/loading11.gif\" /></center>");
$("#ReportsForm").html("<center><br><br><br>Data Uploading ……</center>");
$('#ReportsForm').touchScroll('update');
$.ajax({
url: 'Handler/Login.ashx',
type: 'POST',
data: {
bn: bn, //bizname
pn: pn, //photo
ad: ad, //address
ei: ei, //info
co: "" + curgps, //gps
ns: ns, //notes
fr: from, //where from[2 report 1 new]
wh: who, //account
cc: cc, //ccode  [""或"G21gcpo2"]
isc: isclosed//biz close[true: close ,false; noclose]
},
success: function (info) {
if (info == "true") {
isclose = false;
alert("Report success!\r\nThank you for your help!");
CloseReport(xx);
//$("#rf").hide();
}
else {
alert("Report false! error code:1");
$("#ReportsForm").html(tinfo);
$("#nrbn").val(bn);
$("#nrpn").val(pn);
$("#nra").val(ad);
$("#nrei").val(ei);
$("#nrc").val(co);
$("#nrn").val(ns);
$('#ReportsForm').touchScroll('update');
$('#ReportsForm').touchScroll('setPosition', 0);
}
},
error: function () {
alert("Report false! error code:2\r\ndatabase link false");
$("#ReportsForm").html(tinfo);
$("#nrbn").val(bn);
$("#nrpn").val(pn);
$("#nra").val(ad);
$("#nrei").val(ei);
$("#nrc").val(co);
$("#nrn").val(ns);
$('#ReportsForm').touchScroll('update');
$('#ReportsForm').touchScroll('setPosition', 0);
}
});
}
}
/* else {
alert('please input correct phone number');
backborder();
$("#nrpn").css("border", "1px solid red");
$("#nrpn").focus();
}
*
//#endregion
}
function backborder() {
$("#nrbn").css("border", "1px solid #999");
$("#nrpn").css("border", "1px solid #999");
$("#nrc").css("border", "1px solid #999");
$("#nra").css("border", "1px solid #999");
$("#nrei").css("border", "1px solid #999");
$("#nrn").css("border", "1px solid #999");
}
var curgps;
function CloseReport(x, plat, plng) {
if ($("#Report").html() == 'submit') {
isclose = false;
opentools = false;
getc();
trf = '<div id="ReportsForm">'; //<div class="dnr"><center>FeedBack</center></div>
trf += '<div id="dmsg"><div id="divArea"><textarea onfocus="inputSwitch = true;" id="reportArea" cols="30" rows="4"></textarea></div><br>'; //  placeholder="Find error? Let people know."
trf += '<span id="CloseReport" onclick="CloseReport(\'' + x + '\',\'' + plat + '\',\'' + plng + '\')"><span class="chahao">×</span></span> <span id="Report" onclick="Next(\'' + x + '\',\'' + plat + '\',\'' + plng + '\')">Next</span><div style="height:10px;clear: both;"></div></div>';
$("#rf").html(trf);
$('#reportArea').val(reportinfo);
$("#tools").height(0);
$("#tool,#tools").hide();
google.maps.event.addDomListener(document.getElementById("reportArea"), 'touchend', function (e) {
$("#tools").height(0);
$("#tool,#tools").hide();
bhi = true;
});
$("#Report").css("margin-top", "-31px");
$("#CloseReport").css("margin-top", "-47px");
$("#reportArea").focus();
}
else {
$("#rf").hide();
if ($("#cross").is(":visible")) {
//$("#zoom10").click();
closecross();
}
if (x.indexOf('G') == 0) {
toTop();
}
if (x == 1) {//由主界面进入
click_back();
} if (x == 2) {//由结果列表底部进入
//click_back();
}
isclose = false;
}
}
//=======================================Report it
function Reportit(ccode) {
//var dmsg = $("#p3_top").html();
var trf;
trf = '<div id="ReportsForm"><div class="dnr"><center> Report&nbsp;it</center></div>';
trf += '<div id="dmsg"><span>Business name :</span><br><span>Phone number :</span><br>';
trf += '<span>Address :</span><br><span>Extra info:</span><br><span>Coordinates:</span><br>';
trf += '<span>Notes:</span><br></div><div id="dinput">';
trf += '<input onfocus="inputfocus(1)" onblur="testposition(this)" id="nrbn" type="text" class="txt" title="Please input Business name" />';
trf += '<input onfocus="inputfocus(1)" onblur="testposition(this)" id="nrpn" type="text" class="txt" title="Please input Phone number" />';
trf += '<input onfocus="inputfocus(1)" onblur="testposition(this)" id="nra" type="text" class="txt" title="Please input Address" />';
trf += '<input onfocus="inputfocus(1)"  id="nrei" type="text" class="txt" title="Please input Extra info" />';
trf += '<input onfocus="inputfocus(1)"  id="nrc" type="text" onclick="getc()" readonly="readonly" class="txt" title="Coordinates" />';
trf += '<input onfocus="inputfocus(1)"  id="nrn" type="text" maxlength="300" class="txt" title="Please input Notes" />';
trf += '<span id="cbiz1"><input id="isClose" type="checkbox" onchange="closebiz1()" /><span id="cbiz" onclick="closebiz()">This biz closing or closed</span></span></div>';
trf += '<span id="CloseReport" onclick="CloseReport(2)"><span class="chahao">×</span></span> <span id="Report" onclick="NewReport(2,\'' + ccode + '\')">Reports</span><div id="xing">*<div style="height:117px;"></div>*</div><div style="height:10px;clear: both;"></div></div>';

$("#rf").html(trf);
google.maps.event.addDomListener(document.getElementById("ReportsForm"), 'touchstart', function (e) {
$("#tools").height(0);
$("#tool,#tools").hide();
bhi = true;
setTimeout('toTop()', 500);
});
google.maps.event.addDomListener(document.getElementById("ReportsForm"), 'touchend', function (e) {
$("#tools").height(0);
$("#tool,#tools").hide();
bhi = true;
setTimeout('toTop()', 500);
});
$("#rf").show();
/*if (verStr.indexOf("Version/5.0") != -1 || verStr.indexOf('Android') != -1) {
$('#rf').css('background-image', 'url("images/dot.png")');
$('#rf').css('background-repeat', 'repeat');
$('#rf').css('background-position', 'top left, top right');
$('#rf').css('background-size', '10px');
$('#rf').css('-webkit-background-size', '10px');
}
addbgcolor('rf');*

$("#nrbn").val(document.getElementById('biz_name').innerText);
var tel = $("#biz_phone").html().split('">')[1].split("</a>")[0];
$("#nrpn").val(tel);
$("#nra").val(document.getElementById('biz_address').innerText);
$("#nrei").val(document.getElementById('biz_info').innerText);
$("#nrc").val('click me to get location');
$("#Report, #CloseReport").css("margin-top", "40px");
$('#ReportsForm').touchScroll();
}
var isclose = false;
function closebiz1() {
if ($("#isClose").attr("checked")) {
isclose = true;
$("#nrbn").css('color', 'grey');
$("#nrpn").css('color', 'grey');
$("#nra").css('color', 'grey');
$("#nrei").css('color', 'grey');
$("#nrc").css('color', 'grey');

$("#nrbn").attr("readonly", "readonly");
$("#nrpn").attr("readonly", "readonly");
$("#nra").attr("readonly", "readonly");
$("#nrei").attr("readonly", "readonly");
$("#nrc").attr("readonly", "readonly");
$("#nrn").focus();
}
else {
isclose = false;

$("#nrbn").css('color', 'black');
$("#nrpn").css('color', 'black');
$("#nra").css('color', 'black');
$("#nrei").css('color', 'black');
$("#nrc").css('color', 'black');

$("#nrbn").attr("readonly", false);
$("#nrpn").attr("readonly", false);
$("#nra").attr("readonly", false);
$("#nrei").attr("readonly", false);
}
}
function closebiz() {
if ($("#isClose").attr("checked")) {
$("#isClose").attr("checked", false);
}
else {
$("#isClose").attr("checked", true);
}
closebiz1();
}
//#endregion*/

var curgps;
function CloseReport(x, plat, plng, lr) {
    //debugger;
    $("#container").show();
    try {
        var excloseLR;
        excloseLR = closeLR;
        closeLR = "R";
        if (lr == 1) {
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

    if ($("#Report").html() == 'submit') {
        isclose = false;
        opentools = false;
        getc();
        trf = '<div id="ReportsForm">'; //<div class="dnr"><center>FeedBack</center></div>
        trf += '<div id="dmsg"><div id="divArea"><textarea onfocus="inputSwitch = true;" id="reportArea" cols="30" rows="4"></textarea></div><br>'; //  placeholder="Find error? Let people know."
        trf += '<div id="CloseReport" onclick="CloseReport(\'' + x + '\',\'' + plat + '\',\'' + plng + '\')"><button type="button" onclick="closecross()" class="specialkey backspace">B</button></div><span id="Report" onclick="Next(\'' + x + '\',\'' + plat + '\',\'' + plng + '\')">Next</span>';
        //trf += '<span id="CloseReport" onclick="CloseReport(\'' + x + '\',\'' + plat + '\',\'' + plng + '\')"><span class="chahao">×</span></span> <span id="Report" onclick="Next(\'' + x + '\',\'' + plat + '\',\'' + plng + '\')">Next</span><div style="height:10px;clear: both;"></div></div>';
        $("#rf").html(trf);
        $('#reportArea').val(reportinfo);
        $("#tools").height(0);
        $("#tool,#tools").hide();
        google.maps.event.addDomListener(document.getElementById("reportArea"), 'touchend', function (e) {
            $("#tools").height(0);
            $("#tool,#tools").hide();
            bhi = true;
        });
        $("#Report,#CloseReport").css("margin-top", "-22px");
        $("#reportArea").focus();
    }
    else {
        // $("#rf").hide();
        //        setTimeout(function () {
        //            //$("#rf").hide();
        //            $("#rf").css("-webkit-transform", 'scale(1)');
        //        }, 400);
        $("#rf").css("-webkit-transform", 'scale(0)');

        if ($("#cross").is(":visible")) {
            //$("#zoom10").click();
            closecross();
        }
        try {
            if (x.indexOf('G') == 0) {
                toTop();
            }
            if (x == 1) {//由主界面进入
                click_back();
            } if (x == 2) {//由结果列表底部进入
                //click_back();
            }
        } catch (e) { catche(e); }
        isclose = false;
    }
}
//#endregion
//#region Account
function a1() {//Manage account
    window.location.href = "Login.aspx?type=changepwd";
}
//#region Previous reports
function showPr() {
    //Previous reports[<div id="pr"><div id="pr1">]
    //var tacc = '<div id="a21">Previous reports</div><div id="pr"><div id="pr1"><center><br><br><br><br><br>Reports Data Loading ……<br><br><img src=\"images/loading/loading11.gif\" /><center></div></div><div id="closeDetailspr" onclick="backToaccount();"><span class="chahao">×</span></div>';
    var tacc = '<div id="a21">Previous reports</div><div id="pr"><div id="pr1"><center><br><br><br><br><br>Reports Data Loading ……<center></div></div><div id="closeDetailspr" class="close" onclick="backToaccount(2);"><span class="chahao">×</span></div><div id="closeDetailspr1" class="close" onclick="backToaccount(1);"><span class="chahao">×</span></div>';
    //var tacc = '<div id="a21">Previous reports</div><div id="pr"><div id="pr1"><center><br><br><br><br><br>Reports Data Loading ……<center></div></div><div id="closeDetailspr"><button type="button" onclick="backToaccount();" class="specialkey backspace">B</button></div>';
    $("#account").html(tacc);
    if (closeLR == "L") {
        $("#closeDetailspr").html('');
        $("#closeDetailspr").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
    }
    else {
        $("#closeDetailspr1").html('');
        $("#closeDetailspr1").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
    }
    var who;
    if (storage.getItem("account") != null && storage.getItem("account") != "") {
        who = storage.getItem("account");
    }
    $.ajax({
        url: 'Handler/Login.ashx',
        type: 'POST',
        data: {
            getreports: who
        },
        success: function (info) {
            if (info == "") {
                tacc = "<center><br><br><br><br><br><br><br>No Reports<center>";
            }
            else {
                tacc = info;
            }
            $("#pr1").html(tacc);
            //setTimeout("$('#pr1').touchScroll('update')", 500);
            //            try {
            //                setTimeout("$('#pr1').touchScroll()", 500);
            //            } catch (e) {

            //            }
        },
        error: function () {
            $("#pr1").html("<center><br><br><br><br><br><br><br>No Reports<center>");
        }
    });
    //$('#pr1').touchScroll();
    //addbgcolor('pr1');
}
function delPR(th, aid) {
    var thiimg = th.childNodes[0];
    thiimg.style.webkitTransition = "-webkit-transform  800ms ease";
    thiimg.style.WebkitTransform = "rotate(90deg)";
    thiimg.style.MozTransition = "-moz-transform  800ms ease";
    thiimg.style.MozTransform = "rotate(90deg)";
    DPR.th = th;
    DPR.aid = aid;
    setTimeout('delPR1()', 500);
}
var DPR = [];
function delPR1() {
    var th = DPR.th;
    var thiimg = th.childNodes[0];
    var aid = DPR.aid;
    r = confirm("Delete this report, Continue ?");
    if (r) {
        $.ajax({
            url: 'Handler/Login.ashx',
            type: 'POST',
            data: { delPR: aid },
            success: function (info) {
                if (info == 'true') {
                    //var tab = th.parentNode.parentNode.parentNode;
                    //tab.style.display = 'none';
                    showPr();
                }
                else {
                    alert('Report Delete False');
                }
            }
        });
    }
    else {
        thiimg.style.webkitTransition = "-webkit-transform  800ms ease";
        thiimg.style.WebkitTransform = "rotate(0deg)";
        thiimg.style.MozTransition = "-moz-transform  800ms ease";
        thiimg.style.MozTransform = "rotate(0deg)";
    }
    delete DPR.th;
    delete DPR.aid;
}
//#endregion
function a3() { //Comments[<div id="com"><div id="com1">]
    // var tacc = '<div id="a21">Comments</div><div id="subcom"><input onfocus="inputfocus(1)" id="incom" type="text" class="txt" title="Please input Comments" /><span id="subcomments" onclick="subcomments()">Submit</span></div><div id="com"><div id="com1"><center><br><br><br><br>Comments Data Loading ……<br><br><img src=\"images/loading/loading11.gif\" /><center></div></div><div id="closeDetailspr" onclick="backToaccount();"><span class="chahao">×</span></div>';
    var tacc = '<div id="a21">Comments</div><div id="subcom"><input onfocus="inputfocus(1)" id="incom" type="text" class="txt" title="Please input Comments" /><span id="subcomments" onclick="subcomments()">Submit</span></div><div id="com"><div id="com1"><center><br><br><br><br>Comments Data Loading ……<center></div></div><div id="closeDetailspr" onclick="backToaccount(2);"><span class="chahao">×</span></div><div id="closeDetailspr1" onclick="backToaccount(1);"><span class="chahao">×</span></div>';
    $("#account").html(tacc);
    //    try {
    //        $('#com1').touchScroll();
    //    } catch (e) {

    //    }

    ajaxcomm();
}
function a4() {
    if ($("#a41").is(":visible")) {
        $("#a1, #a2, #a3, #a4").css({ marginTop: "30px" });
        $("#a41").hide();
        $("#closeDetailsaccount2,#closeDetailsaccount1").css({ marginTop: "37px" });
        clearTimeout(tif);
        notif = true;
    }
    else {
        //#region 改变样式
        $("#a1, #a2, #a3, #a4").css({ marginTop: "15px" });
        $("#a41").html('<input id="inif" onfocus="testif()" placeholder="email address" onblur="testif1();" type="email" class="txt" title="Please input Invite friend\'s Email" /><br><span id="subif" onclick="subif()">Submit</span>');
        $("#a41").show();
        $("#inif").focus();
        $("#closeDetailsaccount,#closeDetailsaccount1").css({ marginTop: "25px" });
        notif = false;
        $("#a41").height("35px");
        google.maps.event.addDomListener(document.getElementById("inif"), 'touchend', function (e) {
            setTimeout('toTop()', 500);
        });
        //#endregion
    }

    //    var tacc = '<div id="a21">Add friends under your account</div><div id="if"><input onfocus="inputfocus(1)" id="inif" type="text" class="txt" title="Please input Invite friend\'s Email" /><span id="subcomments" onclick="subcomments()">Submit</span></div><div id="com"><div id="com1"><center><br><br><br><br>Comments Data Loading ……<br><br><img src=\"images/loading/loading11.gif\" /><center></div></div><div id="closeDetailspr" onclick="backToaccount();"><span class="chahao">×</span></div>';
    //    $("#account").html(tacc);
    //    $('#com1').touchScroll();
    //    ajaxcomm();
}
function testif1() {
    toTop();
    //    setTimeout('', 500);
}
//#region Invite friend
var tif;
var notif = false;
function testif() { //测试 email
    inputSwitch = true;
    if (notif) {
        clearTimeout(tif);
    }
    else if (!submiting) {
        tif = setTimeout('testif()', 500);
        var email = $('#inif').val();
        if (emailregs.test(email)) {
            $("#a41").height(67);
            $("#closeDetailsaccount").css({ marginTop: "54px" });
            $("#subif").show();
        }
        else {
            $("#a41").height(35);
            //$("#closeDetailsaccount").css({ marginTop: "86px" });
            $("#subif").fadeOut();
        }
    }
}
var submiting = false;
function subif() {
    var email = $('#inif').val();
    var who;
    exinfo = $("#a41").html();
    if (storage.getItem("account") != null && storage.getItem("account") != "") {
        who = storage.getItem("account");
    }
    //$("#a41").html("<center><br>Inviting …… <br><img src=\"images/loading/loading11.gif\" /></center>");
    $("#a41").html("<center><br>Inviting …… </center>");
    $("#a41").height(67);
    submiting = true;
    $.ajax({
        url: 'Handler/Login.ashx',
        type: 'POST',
        data: {
            Invite: who,
            Invited: email
        },
        success: function (info) {
            if (info == "true") {
                alert('Invited friend Success ！');
                $("#a41").html('<input id="inif" onfocus="testif()" type="email" class="txt" title="Please input Invite friend\'s Email" /><br><span id="subif" onclick="subif()">Submit</span>');
                $("#a41").height(35);
                $("#closeDetailsaccount").css({ marginTop: "86px" });
                google.maps.event.addDomListener(document.getElementById("inif"), 'touchend', function (e) {
                    setTimeout('toTop()', 500);
                });
            }
            else {
                /* if (info) {
                alert(info);
                }
                else {
                alert('Invited friend false ！\r\n please try again');
                }
                alert('Invited friend false ！\r\n please try again');*/
                alert(info);
                $("#a41").html(exinfo);
                $('#inif').val(email);
            }
            delete exinfo;
            submiting = false;
        },
        error: function (info) {
            if (info) {
                alert(info);
            }
            else {
                alert('Invited friend false ！\r\n please try again');
            }
            $("#a41").html(exinfo);
            $('#inif').val(email);
            delete exinfo;
            submiting = false;
        }
    });

}
//#endregion

//关闭账户页
function closeaccount(x) {
    //debugger;
    try {
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
    try {
        setTimeout(function () {
            $("#closeDetailsaccount").css({ marginTop: "40px" });
            $("#account").css("-webkit-transform", 'scale(1)');
            $("#account").hide();
        }, 400);
    } catch (e) { }
    $("#account").css("-webkit-transform", 'scale(0)');
}
//返回账户页
function backToaccount(x) {
    try {
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
    try {
        if (who.indexOf('@') != -1) {
            //无限邀请
            //var tacc = '<div id="a2" onclick="showPr()">Previous reports</div><div id="a4" onclick="a4()">Add friends under your account</div><div id="a41"></div><div id="a1" onclick="a1()">Change Passwords</div><div id="closeDetailsaccount" onclick="closeaccount();"><span class="chahao">×</span></div>';
            //2012.03.02  <div id="a4" onclick="a4()">Add friends under your account</div><div id="a41"></div>
            var tacc1 = '<div id="a6"><span id="uemail"></span></div><div id="a2" onclick="showPr()">Previous Reports</div><div id="a1" onclick="a1()">Change Passwords</div><div id="a5" onclick="a5()"><span id="a51"></span><span id="ponum"></span></div><div id="closeDetailsaccount" class="close" onclick="closeaccount(2);"><span class="chahao">×</span></div><div id="closeDetailsaccount1" class="close" onclick="closeaccount(1);"><span class="chahao">×</span></div><span onclick="logout()" id="logout">Log out</span>';
            //var tacc1 = '<div id="a2" onclick="showPr()">Previous reports</div><div id="a4" onclick="a4()">Add friends under your account</div><div id="a41"></div><div id="a1" onclick="a1()">Change Passwords</div><div id="a5" onclick="a5()">Points:<span id="ponum"></span></div><div id="iphone-keyboard"><button type="button" onclick="closeaccount();" class="specialkey backspace">B</button></div>';
            $("#account").html(tacc1); //tacc1
            $("#account").show();
            $("#uemail").html(who);
            var date = new Date();
            var month = date.getMonth() + 1;
            var i = 1;
            switch (month) {
                case i++: month = 'January'; break;
                case i++: month = 'February'; break;
                case i++: month = 'March'; break;
                case i++: month = 'April'; break;
                case i++: month = 'May'; break;
                case i++: month = 'June'; break;
                case i++: month = 'July'; break;
                case i++: month = 'August'; break;
                case i++: month = 'September'; break;
                case i++: month = 'October'; break;
                case i++: month = 'November'; break;
                case i++: month = 'December'; break;
            }
            $("#a51").html("Points on " + month + ":");
            // debugger;
            $("#closeDetailsaccount2,#closeDetailsaccount1").css({ marginTop: "37px" });
            changeMsgInfo();
            if (closeLR == "L") {
                $("#closeDetailsaccount").html('');
                $("#closeDetailsaccount").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
            }
            else {
                $("#closeDetailsaccount1").html('');
                $("#closeDetailsaccount1").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
            }
            /*if (userLevel < 3) {  }
            else {
            //var tacc = '<div id="a2" onclick="showPr()">Previous reports</div><div id="a1" onclick="a1()">Change Passwords</div><div id="closeDetailsaccount" onclick="closeaccount();"><span class="chahao">×</span></div>';
            var tacc1 = '<div id="a2" onclick="showPr()">Previous reports</div><div id="a1" onclick="a1()">Change Passwords</div><div id="a5" onclick="a5()">Points:<span id="ponum"></span></div><div id="closeDetailsaccount" onclick="closeaccount();"><span class="chahao">×</span></div><div id="closeDetailsaccount1" onclick="closeaccount();"><span class="chahao">×</span></div>';
            $("#account").html(tacc1); //tacc1
            $("#account").show();
            $("#a1, #a2, #a3").css('margin-top', '50px');
            }        */
            $.ajax({
                url: 'Handler/Login.ashx',
                type: 'POST',
                data: {
                    getpoint: who,
                    type: 1
                },
                success: function (a) {
                    try {
                        //如果是合并信息，则取第一个
                        if (a.indexOf(';') != -1) {
                            a = a.split(";");
                            if (a[0] && !isNaN(a[0])) {
                                $("#ponum").html("&nbsp;&nbsp;" + a[0]);
                                //$("#ponum").html(123);
                            }
                            else {
                                // $("#ponum").html('O');
                            }
                        }
                        else {
                            //  $("#ponum").html("&nbsp;&nbsp;" + 123);
                            if (a && !isNaN(a)) {
                                $("#ponum").html(a);
                                $("#ponum").html(123);
                            }
                            else {
                                //$("#ponum").html('O');
                            }
                        }
                    } catch (e) { catche(e); }
                },
                error: function () {
                    alert('point Error! please try again later');

                }
            });
        }
        else {
            var tacc1 = '<div id="accountMsg">';
            tacc1 += '<div id="MsgInfo"><span>Sign up to start collectiong points and get rewards in the future.</span>';
            tacc1 += '<br><div id="s1Info" onclick="s1Info()">Sign Up</div><div id="s2Info" onclick="s2Info()">Log In</div>';
            tacc1 += '<br><div id="s3Info" onclick="s3Info()">Check upcoming drawings</span>';
            tacc1 += '</div></div><div id="a5" onclick="a5()">Points:<span id="ponum"></span></div><div id="closeDetailsaccount" class="close" onclick="closeaccount(2);"><span class="chahao">×</span></div><div id="closeDetailsaccount1" class="close" onclick="closeaccount(1);"><span class="chahao">×</span></div>';


            $("#account").html(tacc1);
            $("#account").show();
            $("#closeDetailsaccount,#closeDetailsaccount1").css({ marginTop: "0px" });
            changeMsgInfo();
            if (closeLR == "L") {
                $("#closeDetailsaccount").html('');
                $("#closeDetailsaccount").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
            }
            else {
                $("#closeDetailsaccount1").html('');
                $("#closeDetailsaccount1").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
            }

            /*$("#s1Info").live('click', function () {
            window.location.href = "Login.aspx?type=signup";
            });
            $("#s2Info").live('click', function () {
            window.location.href = "Login.aspx?type=login";
            });*/
            GoogleTouchEvent('account');
            $.ajax({
                url: 'Handler/Login.ashx',
                type: 'POST',
                data: {
                    getpoint: who,
                    type: 1
                },
                success: function (a) {
                    // // //debugger;;
                    try {
                        //如果是合并信息，则取第一个
                        if (a.indexOf(';') != -1) {
                            a = a.split(";");
                            if (a[0] && !isNaN(a[0])) {
                                $("#ponum").html("&nbsp;&nbsp;" + a[0]);
                                //$("#ponum").html(123);
                            }
                            else {
                                //  $("#ponum").html('O');
                            }
                        }
                        else {
                            //$("#ponum").html("&nbsp;&nbsp;" + 123);
                            if (a && !isNaN(a)) {
                                $("#ponum").html("&nbsp;&nbsp;" + a);
                                //$("#ponum").html(123);
                            }
                            else {
                                //  $("#ponum").html('O');
                            }
                        }
                    } catch (e) { catche(e); }
                },
                error: function (a) {
                    ////debugger;
                    alert('point error! please try again later');
                }
            });
        }
        if (userLevel <= openLevel) {
            $("#a5").css({ "color": "black", "text-decoration": "none" });
        }
    } catch (e) { catche(e); }
    //var tacc = '<div id="a1" onclick="a1()">Manage account</div><div id="a2" onclick="showPr()">Previous reports</div><div id="a3" onclick="a3()">Comments</div><div id="a4" onclick="a4()">Add friends under your account</div><div id="a41"></div><div id="closeDetailsaccount" onclick="closeaccount();"><span class="chahao">×</span></div>';
    //$("#account").html(tacc);
}
//提交评论
function subcomments() {
    var cmsg = jQuery.trim($("#incom").val());
    if (cmsg != "") {
        $("#incom").css("border", "1px solid grey");
        //var tmsg = '<center><br><br><br><br>Comments Submiting ……<br><br><img src=\"images/loading/loading11.gif\" /><center>';
        var tmsg = '<center><br><br><br><br>Comments Submiting ……<center>';
        $("#com1").html(tmsg);
        //$('#com1').touchScroll('update');
        ajaxcomm(cmsg);
    }
    else {
        $("#incom").css("border", "1px solid red");
        $("#incom").focus();
    }
}
//获取评论
function ajaxcomm(x, id) {
    var who;
    if (storage.getItem("account") != null && storage.getItem("account") != "") {
        who = storage.getItem("account");
    }
    //保存评论，再获取
    $.ajax({
        url: 'Handler/Login.ashx',
        type: 'POST',
        data: {
            getcomments: who,
            setcomments: x, //评论信息
            commid: id
        },
        success: function (info) {
            $("#incom").val("");
            if (info == "") {
                if (x) {
                    alert("Comments failure !");
                    $("#incom").val(x);
                }
                tacc = "<center><br><br><br><br><br><br>No Comments<center>";
            }
            else {
                if (x) {
                    alert("Comments success !");
                }
                tacc = info;
                $("#incom").val('');
            }
            $("#com1").html(tacc);

            //  setTimeout("$('#com1').touchScroll('update');$('#com1').touchScroll('setPosition', 0);", 500);
        },
        error: function () {
            if (x) {
                alert("Comments failure !");
                $("#incom").val(x);
            }
            $("#com1").html("<center><br><br><br><br><br><br>No Comments<center>");
        }
    });

}
//修改评论
function alterco(th, id) {
    var tmsg = th.parentNode.parentNode.parentNode.childNodes[2].childNodes[1].innerText;
    tmsg = prompt("Please alter your comments", tmsg);
    if (tmsg != "" && tmsg != null) {
        ajaxcomm(tmsg, id)
    }

}
//#endregion
function resetList() {
    var r = confirm("All changes will be removed , Continue ?");
    if (r == true) {
        storage.removeItem("arrList");
        defaultArrlist1();
        listMenu(arrList);
        editList();
        //        try {
        //            setTimeout("$('#menu1').touchScroll('setPosition', 0)", 500);
        //        } catch (e) { catche(e); }
        alert('list has been reseted');
    }
}
//function nb() {
//    click_search("dic$", "nearby", null, null, 7);
//}
function googleavent() {
    //#region savedinfo
    google.maps.event.addDomListener(document.getElementById("savedinfo"), 'touchstart', function (e) {
        toTop();
    });
    google.maps.event.addDomListener(document.getElementById("savedinfo"), 'touchmove', function (e) {
        e.preventDefault();
    });
    google.maps.event.addDomListener(document.getElementById("savedinfo"), 'touchend', function (e) {
        toTop();
    });
    //#endregion
}
//测试主列表 如果没有字列表，则不显示三角形或为空心
function testList() {
    //debugger
    var List = arrList;
    try {
        for (j = 1; j < arrList.length; j++) {
            var Tinfo = List[j].split(',');
            if (Tinfo.length < 2) {
                $("#zk" + j).html("<span>△</span>");
            }
            else {
                $("#zk" + j).html("<span>▲</span>");
            }
        }
        $("#zk" + ta1 + " span").css('opacity', '0.7');
    } catch (e) {
        catche(e);
    };
}
var ta1 = -1;
var ta2;
function testmenu() {
    try {
        //    //debugger;
        var len = arrList.length;
        $('.zk span').css('-webkit-transform', 'rotate(-90deg)'); /180/
        for (var i = 1; i < len; i++) {
            //            if (who.indexOf('@') != -1) {
            //                i++;
            //            }
            if (!isNaN(ta1)) {
                if (i != ta1 || ta2 == '0') {
                    $("#listMain" + i).hide();
                }
            }
        }
        //debugger;
        if (ta2 == '1') {//如果是子菜单
            $("#zk" + ta1 + " span").css('-webkit-transform', 'rotate(-180deg)');
        }
        //123123123   setTimeout("$('#menu1').touchScroll('update');", 500);
    } catch (e) { catche(e); }
}
function clickmap() {
    // if (isclicknum) {
    if (hisw) {
        $("#tools,#tool").show();
        $("#tools").height(45);
        clearhide();
        hideisearch(0);
    }
    // }
    // isclicknum = true;
}
function testShared() {
    /*简化
    //如果存储有值，则添加事件，显示，删除，则隐藏
    if (storage && storage.getItem("arrShared")) {
    $("#showshared").show();
    }
    else {
    $("#showshared").hide();
    }
    (storage && storage.getItem("arrShared")) ? ($("#showshared").css('color', 'black')) : ($("#showshared").css('color', 'grey'));
    (storage && storage.getItem("arrSaved")) ? ($("#showsaved").css('color', 'black')) : ($("#showsaved").css('color', 'grey'));
    */
    try {
        if (!!(document.getElementById("showshared"))) {
            (storage && storage.getItem("arrShared")) ? (document.getElementById("showshared").style.color = 'black') : (document.getElementById("showshared").style.color = 'grey');
            (storage && storage.getItem("arrSaved")) ? (document.getElementById("showsaved").style.color = 'black') : (document.getElementById("showsaved").style.color = 'grey');
        }
    } catch (e) { catche(e); }
}
var myScrollsaved;
function showsaved() {
    //debugger; ;
    //$("#saved").html('<div id="savedinfo"></div><div id="closesaved1" class="close" onclick="closesaved(1)"><span class="chahao">×</span></div><div id="closesaved" class="close" onclick="closesaved(2)"><span class="chahao">×</span></div>');
    try {
        $("#saved").html('<div id="savedinfo"></div><div id="closeTab" onclick="dis(event);"><div id="closetab1" class="close left" onclick="closesaved(1)"><span class="chahao">×</span></div><div id="closetab2" class="close right" onclick="closesaved(2)"><span class="chahao">×</span></div></div>');

        if (closeLR == "L") {
            $("#closetab2").html('');
            $("#closetab2").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        }
        else {
            $("#closetab1").html('');
            $("#closetab1").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        }
        //showsavedinfo
        //    var bm2 = bm1.split("|");
        //"8709￥ATM￥792 Broadview Ave , Toronto , ON￥416-466-2778;8800￥ATM￥807 Broadview Ave , Toronto , ON￥416-463-2775;|8709￥ATM￥792 Broadview Ave , Toronto , ON￥416-466-2778;8800￥ATM￥807 Broadview Ave , Toronto , ON￥416-463-2775;|8709￥ATM￥792 Broadview Ave , Toronto , ON￥416-466-2778;8800￥ATM￥807 Broadview Ave , Toronto , ON￥416-463-2775;"
        //    arrBookmark = bm2;
        //    for (i = 0; i < bm2.length; i++) {
        //        arrBookmark[i] = bm2[i].split(";");
        //        arrBookmark[i].pop();
        //        for (j = 0; j < arrBookmark[i].length; j++) {
        //            arrBookmark[i][j] = bm2[i][j].split("￥");
        //        }
        //    }
        //每个biz用;分隔
        //var str = '8709￥ATM￥792 Broadview Ave , Toronto , ON￥416-466-2778';
        //storage.setItem("arrSaved", str);
        testsaved();
        var arrSaved = new Array();
        if (storage.getItem("arrSaved") == ";") {
            storage.setItem("arrSaved", '');
        }
        //debugger;
        if (storage.getItem("arrSaved") && jQuery.trim(storage.getItem("arrSaved")) != "") {
            arrSaved = storage.getItem("arrSaved").split(";");
            arrSaved.pop();
            for (j = 0; j < arrSaved.length; j++) {
                arrSaved[j] = arrSaved[j].split("￥");
            }
            listValue = "<table id='si'>";
            for (i = 0; i < (arrSaved.length > 10 ? 10 : arrSaved.length); i++) {
                //if ($.trim(arrSaved[i][0]) != "") {
                var arrV = arrSaved[i][1].replace(reg, "&#32;")  //if no replace, cannot handle remove;
                //            listValue += "<tr id='trBM" + i + "'><td><div class='bizListIcon'>" + (i + 1) + "</div></td>";
                //            listValue += "<td class='td_bmMiddle'>";
                //===判断是否saved   "xkk7ex"
                var count = false;
                //            if (arrSaved[i][0].length == 6) {
                //                if (arrSaved[i][0].indexOf('x') == 0) {
                //                    if (arrSaved[i][0].indexOf('x', 1) == 5) {
                //                        count = true;
                //                    }
                //                    else {
                //                        count = false;
                //                    }
                //                }
                //                else {
                //                    count = false;
                //                }
                //            }
                if (arrSaved[i][0].indexOf('Saved Location:') == 0) {
                    count = true;
                }
                //=====jumpTo(0);saveSearch('8709',' ATM ',' 792 Broadview Ave , Toronto , ON ','416-466-2778','Gx4op4')
                //普通信息
                if (arrSaved[i][0].indexOf('address') == 0) {
                    var tname = ReplaceF(arrSaved[i][1]);
                    var tname1 = ReplaceT(arrSaved[i][1]);
                    listValue += "<tr onclick=\"click_search('" + tname1 + "',null,null,null,4)\" id='trBM" + i + "'><td><div class='bizListIcon'>" + (i + 1) + "</div></td>";
                    listValue += "<td class='td_bmMiddle'>";
                    //道路
                    //address￥1 Adelaide St W , Toronto , ON￥2￥4/9/2012/6:3 PM;
                    //debugger;
                    //var tadd = ReplaceF(arrSaved[i][2]);
                    listValue += "<a class=\"csa\">" + tname + "</a>";
                    //listValue += " onclick=\"click_search('" + tname + "',null,null,null,4)\">" + tname + "</a>";
                    listValue += "<p class='p_smallfont'></p>";
                    //#region time
                    try {
                        var time = arrSaved[i][3];
                        time = time.split('/'); //月、日、年、时分A/PM
                        var t3 = time[3];
                        if (time[2] == new Date().getFullYear()) {
                            time = time[0] + "/" + time[1];
                        }
                        else {
                            time = time[2] + "/" + time[0] + "/" + time[1];
                        }
                        if (t3) {
                            time += " &nbsp;" + t3;
                        }

                        listValue += "<p class='p_smallfont'><a class='p_date'>" + time + "</a></p>";
                    } catch (e) {

                    }
                    //#endregion
                    listValue += "</td><td class='td_bmRight' onclick=\"removeBMs('" + 0 + "','" + i + "','" + arrV + "','address" + arrSaved[i][2] + "')\" ><div class='dm'><div class='ds'></div></div></td></tr>";

                }
                else if ((arrSaved[i][0].indexOf('dic02') == -1) && !count) {//普通商家
                    //var tname = arrSaved[i][1].replace("#39#", "'");
                    //"Saved Location: 5/9/2012=1￥123￥(43.670213100000005, -79.38679000000002);0￥Royal Bank ATM￥2 Bloor St E #38# Toronto￥￥Gnnvm707￥5/8/2012/5:32 PM;"
                    var tname = ReplaceF(arrSaved[i][1]);
                    var tadd = ReplaceF(arrSaved[i][2]);
                    listValue += "<tr id='trBM" + i + "'><td><div class='bizListIcon'>" + (i + 1) + "</div></td>";
                    listValue += "<td class='td_bmMiddle'>";
                    var TisEvent = false;
                    var name = arrSaved[i][4];
                    //debugger;
                    if (tname.indexOf("Ev*") != -1) {
                        TisEvent = true;
                        tname = tname.split("Ev*")[1];
                        listValue += "<a class=\"csa0\">E</a><a class=\"csa\" onclick=\"click_searchs('" + arrSaved[i][4] + "',null,null,null,10)\">" + tname + "</a>";
                    }
                    else {
                        listValue += "<a class=\"csa\" onclick=\"click_searchs('" + arrSaved[i][4] + "',null,null,null,4)\">" + tname + "</a>";
                    }
                    //listValue += "<p class='p_smallfont'>" + arrSaved[i][2] + "</p>";

                    //#region time
                    var time = arrSaved[i][5];
                    time = time.split('/'); //月、日、年、时分A/PM
                    var t3 = time[3];
                    if (time[2] == new Date().getFullYear()) {
                        time = time[0] + "/" + time[1];
                    }
                    else {
                        time = time[2] + "/" + time[0] + "/" + time[1];
                    }
                    if (t3) {
                        time += " &nbsp;" + t3;
                    }
                    //#endregion
                    //debugger;
                    if (!!arrSaved[i][3] && arrSaved[i][3] != "null") {
                        //地址    listValue += "<p class='p_smallfont'>" + tadd + "</p>";

                        listValue += "<p class='p_smallfont'><input type='text' readonly=readonly class='inputadd' value='" + tadd + "'></p>"; //onfocus='deleting=true' onblur='deleting=false' 
                        listValue += "<p class='p_smallfont'><a href='tel:" + arrSaved[i][3] + "'>Tel:&nbsp;&nbsp;" + arrSaved[i][3] + "</a><a class='p_date'>" + time + "</a></p>";
                    }
                    else if (tadd.length > 25) {
                        if (tadd.length > 50) {
                            tadd = tadd.substr(0, 50) + ' ...';
                        }
                        listValue += "<p class='p_smallfont'>" + tadd + "</p>";
                        listValue += "<p class='p_smallfont'><a>&nbsp;&nbsp;</a><a class='p_date'>" + time + "</a></p>";
                    }
                    else {
                        listValue += "<p class='p_smallfont'><a>&nbsp;&nbsp;</a></p>";
                        listValue += "<p class='p_smallfont'>" + tadd + "<a class='p_date'>" + time + "</a></p>";
                    }
                    //listValue += "</td><td class='td_bmRight'><img onclick=\"removeBMs('" + 0 + "','" + i + "','" + arrV + "','" + arrSaved[i][0] + "')\" src='images/delete17gray.png' border='0' /></td></tr>";
                    listValue += "</td><td class='td_bmRight' onclick=\"removeBMs('" + 0 + "','" + i + "','" + arrV + "','" + arrSaved[i][4] + "')\" ><div class='dm'><div class='ds'></div></div></td></tr>";

                }
                else {
                    var slinfo = arrSaved[i][0];
                    slinfo = slinfo.split('=')[0];
                    listValue += "<tr onclick=\"click_search('dic$','" + slinfo + "','" + arrSaved[i][1] + "','" + arrSaved[i][2] + "',4)\" id='trBM" + i + "'><td><div class='bizListIcon'>" + (i + 1) + "</div></td>";
                    listValue += "<td class='td_bmMiddle'>";
                    listValue += "<a class=\"csa\">" + slinfo + "</a>";
                    if (arrSaved[i][1].length < 36) {
                        listValue += "<p class='p_smallfont'></p>";
                        var msg = ReplaceF(arrSaved[i][1]);
                        listValue += "<p class='p_smallfont'>" + msg + "</p>";
                    }
                    //                listValue += "<a href='#' onclick=click_search('dic00" + arrSaved[i][0] + "')>" + arrSaved[i][1] + "</a>";
                    else {//if (arrSaved[i][2].length < 70)
                        var msg = ReplaceF(arrSaved[i][1]);
                        var str1 = msg.substr(0, 34);
                        var str2 = msg.substr(34);
                        //                    var msg = ReplaceF(str1);
                        //                    var msg1 = ReplaceF(str2);
                        listValue += "<p class='p_smallfont'>" + str1 + "</p>";
                        listValue += "<p class='p_smallfont'>" + str2 + "</p>";
                    }
                    //                else {
                    //                    var str1 = arrSaved[i][2].substr(0, 34);
                    //                    var str2 = arrSaved[i][2].substr(35,30)+" ...";
                    //                    listValue += "<p class='p_smallfont'>" + str1 + "</p>";
                    //                    listValue += "<p class='p_smallfont'>" + str2 + "</p>";
                    //                }

                    //listValue += "</td><td class='td_bmRight'><img onclick=\"removeBMs('" + 0 + "','" + i + "','" + arrSaved[i][0] + "','" + arrSaved[i][0] + "')\" src='images/delete17gray.png' border='0' /></td></tr>";
                    listValue += "</td><td class='td_bmRight'onclick=\"removeBMs('" + 0 + "','" + i + "','" + arrSaved[i][0] + "')\"><div class='dm'><div class='ds'></div></div></td></tr>";
                }
                //listValue += "</td><td class='td_bmRight'><img onclick=\"removeBMs('" + 0 + "','" + i + "','" + arrV + "','" + arrSaved[i][0] + "')\" src='images/delete17gray.png' border='0' alt='R'/></td></tr>";
                //}
            }
            listValue += "</table>";
            $("#savedinfo").html(listValue);
        }
        else {
            $("#savedinfo").html("<center>Nothing saved</center> ");
        }
        if (iPhoneOrientation == 0) {
            //$("#savedinfo,#si").height(310);
        }
        else {
            $("#savedinfo,#si").height(170);
        }
        try {
            $("#savedinfo").html('<table id="si">' + $("#si").html() + '</table>');

            myScrollsaved.destroy();
            myScrollsaved = null;
        } catch (e) {
            catche(e);
        }
        myScrollsaved = new iScroll('savedinfo', { vScrollbar: false });
        //$('#si').touchScroll();
        $("#saved").show();
        googleavent();
        $('html,body').css('background-image', 'url("images/dot.png")');
        $('html,body').css('background-repeat', 'repeat');
        $('html,body').css('background-position', 'top left, top right');
        //$("#page0").hide();
        //setTimeout('$("#page0").show()',200);

    } catch (e) {
        catche(e);
    }
}
//测试saved中是否有空头
function testsaved() {
    // // //debugger;;
    return;
    var arrSaved = new Array();
    var TarrSaved = new Array();
    if (storage.getItem("arrSaved") == ";") {
        storage.setItem("arrSaved", '');
    }
    if (storage.getItem("arrSaved") && jQuery.trim(storage.getItem("arrSaved")) != "") {
        arrSaved = storage.getItem("arrSaved").split(";");
        arrSaved.pop();
    }
    for (j = 0; j < arrSaved.length; j++) {
        TarrSaved[j] = arrSaved[j].split("￥");
    }
    for (i = 0; i < arrSaved.length; i++) {
        if ($.trim(TarrSaved[i][0]) == "") {
            arrSaved.splice(i, 1);
            var Tsavedarr;
            Tsavedarr = arrSaved.join(';') + ";";
            storage.setItem("arrSaved", Tsavedarr);
            testsaved();
            break;
        }
    }
}
var Switch5487 = false; //判断改变saved层阴影
function closesaved(x, y, z) {
    //debugger;
    //$("#saved").show();
    $("#SearchIcon").hide();
    try {
        isshowevents = false;
        if (x) {
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
        }
    } catch (e) { catche(e); }
    if ($("#main").html().indexOf('Events') != -1) {
        $("#main").html(sthInMain);
        $('#buttonSearch').click(function () {
            if (CanSearch) {//$.trim($("#keywords2").val()) != "" &&
                search1();
                CanSearch = false;
                setTimeout('CanSearch=true', 100);
            }
        });
        $(".chacha").click(function () {
            $("#keywords2").val("");
            $(".chacha").hide();
            $("#keywords2").focus();
            //$("#tb_search").hide();
            window.scrollTo(0, 0);
        });
    }
    //$("#saved").css("background-image", "none");
    $("#account").css({ "-webkit-transition-duration": "0s", 'display': 'block', 'top': '60px', 'z-index': '0' });
    $("#a6").css('padding-top', '15px');
    $("#accountMsg").css('padding-top', '50px');
    if (!!z) {
        //  $("#saved").css({ "-webkit-transition-duration": "0s", "-webkit-transform": 'scale(0)' });
    }
    else {
        $("#saved").css({ "-webkit-transition-duration": "0.4s", "-webkit-transform": 'scale(0)' });
    }
    Switch5487 = true;
    setTimeout(function () {
        //debugger;
        //$("#saved").html('<div id="showsaved">Saved</div><div id="showshared">Shared</div><div id="showaccount" onclick="dis(event); showaccount();">Account</div>');
        //$("#saved").html('<div id="showsaved" onclick="dis(event); showsave();">Saved</div><div id="showshared" onclick="dis(event); showshare();">Shared</div><div id="showaccount" onclick="dis(event); showaccount();">Account</div>');
        $("#saved").html('<div id="showsaved" onclick="dis(event); showsave();" style="color: black; ">Saved</div><div id="showshared" onclick="dis(event); showshare();" style="color: black; ">Shared</div><div id="showevents" onclick="dis(event); showevent();">Events</div><div id="showdraw" onclick="dis(event); showdraw();"><img id="Drawimg" src="../images/LuckyDraw/' + storage.getItem("LDurl") + '.jpg"></div>');
        $("#saved").css({ "-webkit-transform": 'scale(1)', "-webkit-transition-duration": "0s" });
        setTimeout('testShared()', 50);
        $("#saved").height(32);
        $("#menu").show();
        $("#account").css({ "-webkit-transition-duration": "0.4s", 'display': 'none', 'top': '98px', 'z-index': '2000' });
        $("#a6").css('padding-top', '5px');
        $("#accountMsg").css('padding-top', '0px');
        if (y) {
            setTimeout('savedsw = true;$("#showsaved").click();', 500);
        }
        else {
            setTimeout('savedsw = true', 500);
        }
        toTop();
        testaccount();
        showLucky();
        if (myScroll.y < 0) {
            $("#saved").css("-webkit-box-shadow", "black 0px 7px 10px");
            //            $("#saved").css("-webkit-box-shadow", "black 0px 2px 30px");
        }
        else {
            $("#saved").css("-webkit-box-shadow", "none");
        }
    }, 300);
}
function showshared() {
    //$("#saved").html('<div id="savedinfo"></div><div id="closesaved1" class="close" onclick="closesaved(1)"><span class="chahao">×</span></div><div id="closesaved" class="close" onclick="closesaved(2)"><span class="chahao">×</span></div><div id="ra">Remove all</div>');
    $("#saved").html('<div id="savedinfo"></div><div id="closeTab" onclick="dis(event);"><div id="closetab1" class="close left" onclick="closesaved(1)"><span class="chahao">×</span></div><div id="closetab2" class="close right" onclick="closesaved(2)"><span class="chahao">×</span></div><div id="ra">Remove all</div></div>');
    if (closeLR == "L") {
        $("#closetab2").html('');
        $("#closetab2").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
    }
    else {
        $("#closetab1").html('');
        $("#closetab1").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
    }
    //Shared Location: 9/23/2011￥请问恶趣味额￥xvv47x;   date + note + scode
    var arrShared = [];
    if (storage.getItem("arrShared") == ";") {
        storage.setItem("arrShared", '');
    }
    if (storage.getItem("arrShared") && jQuery.trim(storage.getItem("arrShared")) != "") {
        arrShared = storage.getItem("arrShared").split(";");
        arrShared.pop();
        if (arrShared.length > 3) {
            $("#ra").show();
        }
        else {
            $("#ra").hide();
        }
        for (j = 0; j < arrShared.length; j++) {
            arrShared[j] = arrShared[j].split("￥");
        }
        listValue = "<table id='si'>";
        for (i = 0; i < (arrShared.length > 10 ? 10 : arrShared.length); i++) {
            var arrV = arrShared[i][1].replace(reg, "&#32;")  //if no replace, cannot handle remove;
            //       listValue += "<tr id='trBM" + i + "'><td><div class='bizListIcon'>" + (i + 1) + "</div></td>";
            //       listValue += "<td class='td_bmMiddle'>";
            //===判断是否saved   "xkk7ex"
            var count = false;
            if (arrShared[i][0].indexOf('Shared Location:') == 0) {
                count = true;
            }
            //=====8709￥ ATM ￥ 792 Broadview Ave , Toronto , ON ￥416-466-2778￥Gx4op4;
            //     8800￥ ATM ￥ 807 Broadview Ave , Toronto , ON ￥416-463-2775￥Gbb464￥date;
            //普通信息
            if (arrShared[i][0].indexOf('address') == 0) {
                listValue += "<tr onclick=\"click_search('" + tname + "',null,null,null,5)\" id='trBM" + i + "'><td><div class='bizListIcon'>" + (i + 1) + "</div></td>";
                listValue += "<td class='td_bmMiddle'>";


                //var tname = arrShared[i][1].replace("#39#", "'");
                //address￥1 Adelaide St W , Toronto , ON￥2￥xjj2ax￥4/12/2012/3:36 PM;
                var tname = ReplaceF(arrShared[i][1]);
                //var tadd = ReplaceF(arrShared[i][2]);
                listValue += "<a class=\"csa\">" + tname + "</a>";
                //                  listValue += "<a class=\"csa\"";
                //                listValue += " onclick=\"click_search('" + tname + "',null,null,null,5)\">" + tname + "</a>";
                listValue += "<p class='p_smallfont'>Share Code: " + arrShared[i][3] + "</p>";
                //#region time
                try {
                    var time = arrShared[i][4];
                    time = time.split('/'); //月、日、年、时分A/PM
                    var t3 = time[3];
                    if (time[2] == new Date().getFullYear()) {
                        time = time[0] + "/" + time[1];
                    }
                    else {
                        time = time[2] + "/" + time[0] + "/" + time[1];
                    }
                    if (t3) {
                        time += " &nbsp;" + t3;
                    }
                    listValue += "<p class='p_smallfont'><a class='p_date'>" + time + "</a></p>";

                } catch (e) {

                }
                //#endregion
                //listValue += "</td><td class='td_bmRight'><img onclick=\"removeBM2s('" + 0 + "','" + i + "','" + arrV + "')\" src='images/delete17gray.png' border='0' /></td></tr>";
                listValue += "</td><td class='td_bmRight' onclick=\"removeBM2s('" + 0 + "','" + i + "','" + arrShared[i][1] + "','" + arrShared[i][3] + "')\"><div class='dm'><div class='ds'></div></div></td></tr>";
            }
            else if ((arrShared[i][0].indexOf('dic02') == -1) && !count) {
                listValue += "<tr id='trBM" + i + "'><td><div class='bizListIcon'>" + (i + 1) + "</div></td>";
                listValue += "<td class='td_bmMiddle'>";
                //var tname = arrShared[i][1].replace("#39#", "'");
                var tname = ReplaceF(arrShared[i][1]);
                var tadd = ReplaceF(arrShared[i][2]);
                listValue += "<a class=\"csa\" onclick=\"click_searchs('" + arrShared[i][4] + "',null,null,null,5)\">" + tname + "</a>";

                var time = arrShared[i][5];
                time = time.split('/'); //月、日、年、时分A/PM
                var t3 = time[3];
                if (time[2] == new Date().getFullYear()) {
                    time = time[0] + "/" + time[1];
                }
                else {
                    time = time[2] + "/" + time[0] + "/" + time[1];
                }
                if (t3) {
                    time += " &nbsp;" + t3;
                }
                if (!!arrShared[i][3]) {
                    //listValue += "<p class='p_smallfont'>" + tadd + "</p>";
                    listValue += "<p class='p_smallfont'><input type='text' readonly=readonly class='inputadd' value='" + tadd + "'></p>"; //onfocus='deleting=true' onblur='deleting=false'
                    listValue += "<p class='p_smallfont'><a href='tel:" + arrShared[i][3] + "'>Tel:&nbsp;&nbsp;" + arrShared[i][3] + "</a><a class='p_date'>" + time + "</a></p>";
                }
                else if (tadd.length > 25) {
                    listValue += "<p class='p_smallfont'>" + tadd + "</p>";
                    listValue += "<p class='p_smallfont'><a>&nbsp;&nbsp;</a><a class='p_date'>" + time + "</a></p>";
                }
                else {
                    listValue += "<p class='p_smallfont'><a>&nbsp;&nbsp;</a></p>";
                    listValue += "<p class='p_smallfont'>" + tadd + "<a class='p_date'>" + time + "</a></p>";
                }

                //listValue += "</td><td class='td_bmRight'><img onclick=\"removeBM2s('" + 0 + "','" + i + "','" + arrV + "')\" src='images/delete17gray.png' border='0' /></td></tr>";
                listValue += "</td><td class='td_bmRight' onclick=\"removeBM2s('" + 0 + "','" + i + "','" + arrV + "','" + arrShared[i][4] + "')\"><div class='dm'><div class='ds'></div></div></td></tr>";
            }
            else {
                listValue += "<tr onclick=\"click_search('dic$','" + arrShared[i][2] + "',null,null,null,5)\" id='trBM" + i + "'><td><div class='bizListIcon'>" + (i + 1) + "</div></td>";
                listValue += "<td class='td_bmMiddle'>";
                listValue += "<a class=\"csa\">" + arrShared[i][0] + "</a>";
                //if (arrShared[i][1].length < 36) {
                listValue += "<p class='p_smallfont'>Share Code: " + arrShared[i][2] + "</p>";
                var str1 = arrShared[i][1];
                str1 = ReplaceF(str1);
                if (arrShared[i][1].length > 35) {
                    str1 = arrShared[i][1].substr(0, 34) + '....';
                }
                listValue += "<p class='p_smallfont'>" + str1 + "</p>";
                // }
                //                listValue += "<a href='#' onclick=click_search('dic00" + arrShared[i][0] + "')>" + arrShared[i][1] + "</a>";
                /* else {//if (arrShared[i][2].length < 70)
                var str1 = arrShared[i][1].substr(0, 34);
                var str2 = arrShared[i][1].substr(34);
                listValue += "<p class='p_smallfont'>" + str1 + "</p>";
                listValue += "<p class='p_smallfont'>" + str2 + "</p>";
                }*/
                //                else {
                //                    var str1 = arrShared[i][2].substr(0, 34);
                //                    var str2 = arrShared[i][2].substr(35,30)+" ...";
                //                    listValue += "<p class='p_smallfont'>" + str1 + "</p>";
                //                    listValue += "<p class='p_smallfont'>" + str2 + "</p>";
                //                }
                //listValue += "</td><td class='td_bmRight'><img onclick=\"removeBM2s('" + 0 + "','" + i + "','" + arrShared[i][0] + "','" + arrShared[i][2] + "')\" src='images/delete17gray.png' border='0' /></td></tr>";
                listValue += "</td><td class='td_bmRight' onclick=\"removeBM2s('" + 0 + "','" + i + "','" + arrShared[i][0] + "','" + arrShared[i][2] + "')\"><div class='dm'><div class='ds'></div></div></td></tr>";

            }
            //listValue += "</td><td class='td_bmRight'><img onclick=\"removeBMs('" + 0 + "','" + i + "','" + arrV + "','" + arrSaved[i][0] + "')\" src='images/delete17gray.png' border='0' alt='R'/></td></tr>";
        }
        listValue += "</table>";
        $("#savedinfo").html(listValue);
    }
    else {
        $("#ra").hide();
        $("#savedinfo").html("<center>Nothing Shared</center> ");
    }
    if (iPhoneOrientation == 0) {
        $("#savedinfo,#si").height(310);
    }
    else {
        $("#savedinfo,#si").height(170);
    }
    try {
        $("#savedinfo").html('<table id="si">' + $("#si").html() + '</table>');

        myScrollsaved.destroy();
        myScrollsaved = null;
    } catch (e) {
        catche(e);
    }
    myScrollsaved = new iScroll('savedinfo', { vScrollbar: false });
    //$('#si').touchScroll();
    googleavent();
}
var listValue5471;
var Time5472 = true;
var myScrollevents;
function showevents(x) {
    /* if (!Time5472) {
    setTimeout(function () {
    showevents(x)
    }, 200);
    }
    */
    Time5472 = false;
    //console.log(x);
    if (!x) {
        //$("#saved").html("");
        $("#main").html("<div id='backInMain' onclick='closesaved()'>Back</div><div id='etitleInMain'>Events</div>");
        //#region title
        var TlistValue = "<div id='ET0'><div id='ET1' onclick='ET(1)' class='EventTitle'>Popular Events</div><div id='ET2' onclick='ET(2)' class='EventTitle'>Games & Sports</div><div id='ET3' onclick='ET(3)' class='EventTitle'>Music & Concerts</div><div id='ET4' onclick='ET(4)' class='EventTitle'>Exibitions & Fairs</div></div>";
        TlistValue += "<div id='ET10'><div class='ET00' id='ET11'></div><div class='ET00' id='ET12'></div><div class='ET00' id='ET13'></div><div class='ET00' id='ET14'></div></div>";
        TlistValue += '<div id="savedinfo"><div id="siout"></div></div><div id="closeTab" onclick="dis(event);"><div id="closetab1" class="close left" onclick="closesaved(1)"><span class="chahao">×</span></div><div id="closetab2" class="close right" onclick="closesaved(2)"><span class="chahao">×</span></div><div id="ra">Remove all</div></div>';
        //#endregion
        $("#saved").html(TlistValue);
        if (closeLR == "L") {
            $("#closetab2").html('');
            $("#closetab2").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        }
        else {
            $("#closetab1").html('');
            $("#closetab1").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        }
    }
    //#region 1
    var arrEvents = [];
    try {
        //debugger;
        var isOOD = false;
        if (!!EventsText) {
            var xxxx = EventsText.split(";;");
            if (xxxx.length > 0) {
                arrEvents = xxxx[0].split("￥");
                listValue5471 = "<div id='si0' class='siin'><div id='si01'>";
                for (var i = 0; i < arrEvents.length; i++) {
                    arrEvents[i] = arrEvents[i].split(":;");
                    var ttime = ReplaceF(arrEvents[i][1]);
                    var tname = ReplaceF(arrEvents[i][2]);
                    if (!tname) {
                        if (!isOOD) {
                            listValue5471 += "<div id='OD'><span style='float: left;'>▲</span>Out of Date Events<span style='float: right;'>▲</span></div>";
                            isOOD = true;
                        }
                        continue;
                    }
                    var tinfo = ReplaceF(arrEvents[i][3]);
                    if (arrEvents[i][4] == "A") {
                        listValue5471 += "<div  class='eventTime'>" + ttime + "</div><br>";
                        listValue5471 += "<div class='eventName' onclick=\"click_search('" + arrEvents[i][0] + "',null,1,null,10)\">" + tname;
                    }
                    else if (arrEvents[i][4] == "B") {
                        listValue5471 += "<div  class='eventTime'>" + ttime + "</div><br>";
                        listValue5471 += "<div class='eventName' onclick=\"click_search('" + arrEvents[i][4] + "',null,1,null,11)\">" + tname;
                    }

                    if (arrEvents[i][6] > 0) {
                        //arrEvents[i][5] = "Frenchf2012";
                        listValue5471 += "<div class='eventInfo'>" + tinfo + "</div><img src='../images/Events/" + arrEvents[i][5] + "-SS1.jpg'></div>";
                    }
                    else {
                        listValue5471 += "<div class='eventInfo'>" + tinfo + "</div></div>";
                    }
                }
                listValue5471 += "</div></div>";
            }
            //$("#savedinfo").html(listValue5471);
        }
        else {
            $("#si0").html("<center><br><br><br>Loading Events ···</center> ");
        }
    } catch (e) {
        alert("line:5982" + e);
    }
    //#endregion
    //#region 2
    arrEvents = [];
    try {
        //debugger;
        var isOOD = false;
        if (!!EventsText) {
            var xxxx = EventsText.split(";;");
            if (xxxx.length > 1) {
                arrEvents = xxxx[1].split("￥");
                //74:;1/1:;Toronto Blue Jays vs. Tampa Bay Rays:;&nbsp;in&nbsp;Downtown Toronto,&nbsp;Ticket: $14.25 - $216.25:;Baseball:;:;0
                listValue5471 += "<div id='si1' class='siin'><div id='si11'>";
                for (var i = 0; i < arrEvents.length; i++) {
                    arrEvents[i] = arrEvents[i].split(":;");
                    var ttime = ReplaceF(arrEvents[i][1]);
                    var tname = ReplaceF(arrEvents[i][2]);
                    if (!tname) {
                        continue;
                        if (!isOOD) {
                            listValue5471 += "<div id='OD'><span style='float: left;'>▲</span>Out of Date Events<span style='float: right;'>▲</span></div>";
                            isOOD = true;
                        }
                    }
                    var tinfo = ReplaceF(arrEvents[i][3]);
                    //if (arrEvents[i][4] == "A") {
                    listValue5471 += "<div  class='eventTime'>" + ttime + "</div><br>";
                    listValue5471 += "<div class='eventName' onclick=\"click_search('" + arrEvents[i][0] + "',null,1,null,10)\"><div class='eventNames'>" + tname + "</div>";
                    //arrEvents[i][4] = "Baseball";
                    listValue5471 += "<div class='eventSportType'>" + arrEvents[i][4] + "</div>";
                    listValue5471 += "<div class='eventInfo'>" + tinfo + "</div></div>";

                }
                listValue5471 += "</div></div>";
            }
            //$("#siout").html(listValue5471);
        }
        else {
            $("#si1").html("<center><br><br><br>Loading Events ···</center> ");
        }
    } catch (e) {
        alert("line:6022" + e);
    }
    //#endregion
    //#region 3
    arrEvents = [];
    try {
        //debugger;
        var isOOD = false;
        if (!!EventsText) {
            var xxxx = EventsText.split(";;");
            if (xxxx.length > 2) {
                arrEvents = xxxx[2].split("￥");
                //74:;1/1:;Toronto Blue Jays vs. Tampa Bay Rays:;&nbsp;in&nbsp;Downtown Toronto,&nbsp;Ticket: $14.25 - $216.25:;Baseball:;:;0
                listValue5471 += "<div id='si2' class='siin'><div id='si21'>";
                for (var i = 0; i < arrEvents.length; i++) {
                    arrEvents[i] = arrEvents[i].split(":;");
                    var ttime = ReplaceF(arrEvents[i][1]);
                    var tname = ReplaceF(arrEvents[i][2]);
                    if (!tname) {
                        continue;
                        if (!isOOD) {
                            listValue5471 += "<div id='OD'><span style='float: left;'>▲</span>Out of Date Events<span style='float: right;'>▲</span></div>";
                            isOOD = true;
                        }
                    }
                    var tinfo = ReplaceF(arrEvents[i][3]);
                    //if (arrEvents[i][4] == "A") {
                    listValue5471 += "<div  class='eventTime'>" + ttime + "</div><br>";
                    listValue5471 += "<div class='eventName' onclick=\"click_search('" + arrEvents[i][0] + "',null,1,null,10)\"><div class='eventNames'>" + tname + "</div>";
                    //                arrEvents[i][4] = "Baseball";
                    listValue5471 += "<div class='eventSportType'>" + arrEvents[i][4] + "</div>";
                    listValue5471 += "<div class='eventInfo'>" + tinfo + "</div></div>";

                }

            }
        }
        else {
            $("#si2").html("<center><br><br><br>Loading Events ···</center> ");
        }
    } catch (e) {
        alert("line:6062" + e);
    }
    //#endregion
    listValue5471 += "</div></div>";
    $("#siout").html(listValue5471);
    //$("#siout").html(listValue5471);
    /*
    //Shared Location: 9/23/2011￥请问恶趣味额￥xvv47x;   date + note + scode
    var arrShared = [];
    if (storage.getItem("arrShared") == ";") {
    storage.setItem("arrShared", '');
    }
    if (storage.getItem("arrShared") && jQuery.trim(storage.getItem("arrShared")) != "") {
    arrShared = storage.getItem("arrShared").split(";");
    arrShared.pop();
    if (arrShared.length > 3) {
    $("#ra").show();
    }
    else {
    $("#ra").hide();
    }
    for (j = 0; j < arrShared.length; j++) {
    arrShared[j] = arrShared[j].split("￥");
    }
    listValue = "<table id='si'>";
    for (i = 0; i < arrShared.length; i++) {
    var arrV = arrShared[i][1].replace(reg, "&#32;")  //if no replace, cannot handle remove;
    //       listValue += "<tr id='trBM" + i + "'><td><div class='bizListIcon'>" + (i + 1) + "</div></td>";
    //       listValue += "<td class='td_bmMiddle'>";
    //===判断是否saved   "xkk7ex"
    var count = false;
    if (arrShared[i][0].indexOf('Shared Location:') == 0) {
    count = true;
    }
    //=====8709￥ ATM ￥ 792 Broadview Ave , Toronto , ON ￥416-466-2778￥Gx4op4;
    //     8800￥ ATM ￥ 807 Broadview Ave , Toronto , ON ￥416-463-2775￥Gbb464￥date;
    //普通信息
    if (arrShared[i][0].indexOf('address') == 0) {
    listValue += "<tr onclick=\"click_search('" + tname + "',null,null,null,5)\" id='trBM" + i + "'><td><div class='bizListIcon'>" + (i + 1) + "</div></td>";
    listValue += "<td class='td_bmMiddle'>";


    //var tname = arrShared[i][1].replace("#39#", "'");
    //address￥1 Adelaide St W , Toronto , ON￥2￥xjj2ax￥4/12/2012/3:36 PM;
    var tname = ReplaceF(arrShared[i][1]);
    //var tadd = ReplaceF(arrShared[i][2]);
    listValue += "<a class=\"csa\">" + tname + "</a>";
    //                  listValue += "<a class=\"csa\"";
    //                listValue += " onclick=\"click_search('" + tname + "',null,null,null,5)\">" + tname + "</a>";
    listValue += "<p class='p_smallfont'>Share Code: " + arrShared[i][3] + "</p>";
    //#region time
    try {
    var time = arrShared[i][4];
    time = time.split('/'); //月、日、年、时分A/PM
    var t3 = time[3];
    if (time[2] == new Date().getFullYear()) {
    time = time[0] + "/" + time[1];
    }
    else {
    time = time[2] + "/" + time[0] + "/" + time[1];
    }
    if (t3) {
    time += " &nbsp;" + t3;
    }
    listValue += "<p class='p_smallfont'><a class='p_date'>" + time + "</a></p>";

    } catch (e) {

    }
    //#endregion
    //listValue += "</td><td class='td_bmRight'><img onclick=\"removeBM2s('" + 0 + "','" + i + "','" + arrV + "')\" src='images/delete17gray.png' border='0' /></td></tr>";
    listValue += "</td><td class='td_bmRight' onclick=\"removeBM2s('" + 0 + "','" + i + "','" + arrShared[i][1] + "','" + arrShared[i][3] + "')\"><div class='dm'><div class='ds'></div></div></td></tr>";
    }
    else if ((arrShared[i][0].indexOf('dic02') == -1) && !count) {
    listValue += "<tr id='trBM" + i + "'><td><div class='bizListIcon'>" + (i + 1) + "</div></td>";
    listValue += "<td class='td_bmMiddle'>";
    //var tname = arrShared[i][1].replace("#39#", "'");
    var tname = ReplaceF(arrShared[i][1]);
    var tadd = ReplaceF(arrShared[i][2]);
    listValue += "<a class=\"csa\" onclick=\"click_searchs('" + arrShared[i][4] + "',null,null,null,5)\">" + tname + "</a>";

    var time = arrShared[i][5];
    time = time.split('/'); //月、日、年、时分A/PM
    var t3 = time[3];
    if (time[2] == new Date().getFullYear()) {
    time = time[0] + "/" + time[1];
    }
    else {
    time = time[2] + "/" + time[0] + "/" + time[1];
    }
    if (t3) {
    time += " &nbsp;" + t3;
    }
    if (!!arrShared[i][3]) {
    //listValue += "<p class='p_smallfont'>" + tadd + "</p>";
    listValue += "<p class='p_smallfont'><input type='text' readonly=readonly class='inputadd' value='" + tadd + "'></p>"; //onfocus='deleting=true' onblur='deleting=false'
    listValue += "<p class='p_smallfont'><a href='tel:" + arrShared[i][3] + "'>Tel:&nbsp;&nbsp;" + arrShared[i][3] + "</a><a class='p_date'>" + time + "</a></p>";
    }
    else if (tadd.length > 25) {
    listValue += "<p class='p_smallfont'>" + tadd + "</p>";
    listValue += "<p class='p_smallfont'><a>&nbsp;&nbsp;</a><a class='p_date'>" + time + "</a></p>";
    }
    else {
    listValue += "<p class='p_smallfont'><a>&nbsp;&nbsp;</a></p>";
    listValue += "<p class='p_smallfont'>" + tadd + "<a class='p_date'>" + time + "</a></p>";
    }

    //listValue += "</td><td class='td_bmRight'><img onclick=\"removeBM2s('" + 0 + "','" + i + "','" + arrV + "')\" src='images/delete17gray.png' border='0' /></td></tr>";
    listValue += "</td><td class='td_bmRight' onclick=\"removeBM2s('" + 0 + "','" + i + "','" + arrV + "','" + arrShared[i][4] + "')\"><div class='dm'><div class='ds'></div></div></td></tr>";
    }
    else {
    listValue += "<tr onclick=\"click_search('dic$','" + arrShared[i][2] + "',null,null,null,5)\" id='trBM" + i + "'><td><div class='bizListIcon'>" + (i + 1) + "</div></td>";
    listValue += "<td class='td_bmMiddle'>";
    listValue += "<a class=\"csa\">" + arrShared[i][0] + "</a>";
    //if (arrShared[i][1].length < 36) {
    listValue += "<p class='p_smallfont'>Share Code: " + arrShared[i][2] + "</p>";
    var str1 = arrShared[i][1];
    str1 = ReplaceF(str1);
    if (arrShared[i][1].length > 35) {
    str1 = arrShared[i][1].substr(0, 34) + '....';
    }
    listValue += "<p class='p_smallfont'>" + str1 + "</p>";
    // }
    //                listValue += "<a href='#' onclick=click_search('dic00" + arrShared[i][0] + "')>" + arrShared[i][1] + "</a>";
    /* else {//if (arrShared[i][2].length < 70)
    var str1 = arrShared[i][1].substr(0, 34);
    var str2 = arrShared[i][1].substr(34);
    listValue += "<p class='p_smallfont'>" + str1 + "</p>";
    listValue += "<p class='p_smallfont'>" + str2 + "</p>";
    }* /
    //                else {
    //                    var str1 = arrShared[i][2].substr(0, 34);
    //                    var str2 = arrShared[i][2].substr(35,30)+" ...";
    //                    listValue += "<p class='p_smallfont'>" + str1 + "</p>";
    //                    listValue += "<p class='p_smallfont'>" + str2 + "</p>";
    //                }
    //listValue += "</td><td class='td_bmRight'><img onclick=\"removeBM2s('" + 0 + "','" + i + "','" + arrShared[i][0] + "','" + arrShared[i][2] + "')\" src='images/delete17gray.png' border='0' /></td></tr>";
    listValue += "</td><td class='td_bmRight' onclick=\"removeBM2s('" + 0 + "','" + i + "','" + arrShared[i][0] + "','" + arrShared[i][2] + "')\"><div class='dm'><div class='ds'></div></div></td></tr>";

    }
    //listValue += "</td><td class='td_bmRight'><img onclick=\"removeBMs('" + 0 + "','" + i + "','" + arrV + "','" + arrSaved[i][0] + "')\" src='images/delete17gray.png' border='0' alt='R'/></td></tr>";
    }
    listValue += "</table>";
    $("#savedinfo").html(listValue);
    }
    */
    if (isorientationChange) {
        if (iPhoneOrientation == 0) {
            $("#savedinfo,#si,#si1").height(258);
        }
        else {
            $("#savedinfo,#si,#si1").height(118);
        }
    }

    try {
        //$("#savedinfo").html('<table id="si">' + $("#si").html() + '</table>');
        myScrollsaved.destroy();

    } catch (e) {
        //catche(e);
    }
    myScrollsaved = null;
    myScrollevents = new iScroll('si0', { vScrollbar: false });
    myScrollevents = new iScroll('si1', { vScrollbar: false });
    myScrollevents = new iScroll('si2', { vScrollbar: false });
    //setTimeout("$('#si').touchScroll();$('#si1').touchScroll();$('#si2').touchScroll();", 500);
    //googleavent();
    setTimeout("Time5472=true", 1000);
}
//function showevents0(x) {
//    if (!Time5472) {
//        setTimeout(function () {
//            showevents(x)
//        }, 200);
//    }
//    Time5472 = false;
//    console.log(x);
//    if (!x) {
//        //$("#saved").html("");
//        $("#main").html("<div id='backInMain' onclick='closesaved()'>Back</div><div id='etitleInMain'>Events</div>");
//        //#region title
//        var TlistValue = "<div id='ET0'><div id='ET1' onclick='ET(1)' class='EventTitle'>Popular Events</div><div id='ET2' onclick='ET(2)' class='EventTitle'>Games & Sports</div><div id='ET3' onclick='ET(3)' class='EventTitle'>Music & Concerts</div><div id='ET4' onclick='ET(4)' class='EventTitle'>Exibitions & Fairs</div></div>";
//        TlistValue += "<div id='ET10'><div class='ET00' id='ET11'></div><div class='ET00' id='ET12'></div><div class='ET00' id='ET13'></div><div class='ET00' id='ET14'></div></div>";
//        TlistValue += '<div id="savedinfo"></div><div id="closeTab" onclick="dis(event);"><div id="closetab1" class="close left" onclick="closesaved(1)"><span class="chahao">×</span></div><div id="closetab2" class="close right" onclick="closesaved(2)"><span class="chahao">×</span></div><div id="ra">Remove all</div></div>';
//        //#endregion
//        $("#saved").html(TlistValue);
//        if (closeLR == "L") {
//            $("#closetab2").html('');
//            $("#closetab2").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
//        }
//        else {
//            $("#closetab1").html('');
//            $("#closetab1").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
//        }
//    }
//    try {
//        $("#savedinfo").html("");
//    } catch (e) {
//    }
//    //Popular Events
//    if (!x || x == "1") {
//        //CTY Computers;14-420 Hwy 7 E , Richmond Hill
//        var arrEvents = [];
//        try {
//            //debugger;
//            var isOOD = false;
//            if (!!EventsText) {
//                var xxxx = EventsText.split(";;");
//                arrEvents = xxxx[0].split("￥");
//                listValue5471 = "<div id='si'>";
//                //5     7/6 - 7/22      Summerlicious 2012      Restaurants promotions&nbsp;in&nbsp;Toronto,&nbsp;Luch $15,$20,$25 - Dinner $25,$35,$45     B      sl2012       0
//                //58     7/29           Blue Jay vs. Tigers     &nbsp;in&nbsp;Downtown Toronto,&nbsp;Ticket: $14.25 - $216.25                                       e-S0729     0
//                for (var i = 0; i < arrEvents.length; i++) {
//                    arrEvents[i] = arrEvents[i].split(":;");
//                    var ttime = ReplaceF(arrEvents[i][1]);
//                    var tname = ReplaceF(arrEvents[i][2]);
//                    if (!tname) {
//                        if (!isOOD) {
//                            listValue5471 += "<div id='OD'><span style='float: left;'>▲</span>Out of Date Events<span style='float: right;'>▲</span></div>";
//                            isOOD = true;
//                        }
//                        continue;
//                    }
//                    var tinfo = ReplaceF(arrEvents[i][3]);
//                    if (arrEvents[i][4] == "A") {
//                        listValue5471 += "<div  class='eventTime'>" + ttime + "</div><br>";
//                        listValue5471 += "<div class='eventName' onclick=\"click_search('" + arrEvents[i][0] + "',null,1,null,10)\">" + tname;
//                    }
//                    else if (arrEvents[i][4] == "B") {
//                        listValue5471 += "<div  class='eventTime'>" + ttime + "</div><br>";
//                        listValue5471 += "<div class='eventName' onclick=\"click_search('" + arrEvents[i][4] + "',null,1,null,11)\">" + tname;
//                    }
//                    if (arrEvents[i][6] > 0) {
//                        //arrEvents[i][5] = "Frenchf2012";
//                        listValue5471 += "<div class='eventInfo'>" + tinfo + "</div><img src='../images/Events/" + arrEvents[i][5] + "-SS1.jpg'></div>";
//                    }
//                    else {
//                        listValue5471 += "<div class='eventInfo'>" + tinfo + "</div></div>";
//                    }
//                }
//                listValue5471 += "</div>";
//                $("#savedinfo").html(listValue5471);
//                /*
//                setTimeout(function () {
//                $("#savedinfo").html(listValue5471);
//                }, 200);
//                */
//            }
//            else {
//                $("#savedinfo").html("<center><br><br><br>Loading Events ···</center> ");
//            }
//        } catch (e) {
//            alert(e);
//        }
//    }
//    //Games & Sports
//    else if (x == "2") {
//        var arrEvents = [];
//        try {
//            //debugger;
//            var isOOD = false;
//            if (!!EventsText) {
//                var xxxx = EventsText.split(";;");
//                arrEvents = xxxx[1].split("￥");
//                listValue5471 = "<div id='si'>";
//                //5         7/6 - 7/22      Summerlicious 2012      Restaurants promotions&nbsp;in&nbsp;Toronto,&nbsp;Luch $15,$20,$25 - Dinner $25,$35,$45     B      sl2012       0
//                //47        7/13            Blue Jay vs. Indians:;&nbsp;in&nbsp;Downtown Toronto,&nbsp;Ticket: $14.25 - $216.25                                        e-S0713      0
//                for (var i = 0; i < arrEvents.length; i++) {
//                    arrEvents[i] = arrEvents[i].split(":;");
//                    var ttime = ReplaceF(arrEvents[i][1]);
//                    var tname = ReplaceF(arrEvents[i][2]);
//                    if (!tname) {
//                        continue;
//                        if (!isOOD) {
//                            listValue5471 += "<div id='OD'><span style='float: left;'>▲</span>Out of Date Events<span style='float: right;'>▲</span></div>";
//                            isOOD = true;
//                        }
//                    }
//                    var tinfo = ReplaceF(arrEvents[i][3]);
//                    //if (arrEvents[i][4] == "A") {
//                    listValue5471 += "<div  class='eventTime'>" + ttime + "</div><br>";
//                    listValue5471 += "<div class='eventName' onclick=\"click_search('" + arrEvents[i][0] + "',null,1,null,10)\">" + tname;
//                    //                    }
//                    //                    else if (arrEvents[i][4] == "B") {
//                    //                        listValue5471 += "<div  class='eventTime'>" + ttime + "</div><br>";
//                    //                        listValue5471 += "<div class='eventName' onclick=\"click_search('" + arrEvents[i][4] + "',null,1,null,11)\">" + tname;
//                    //                    }
//                    //                    else {
//                    //debugger;
//                    //                    }
//                    if (arrEvents[i][6] > 0) {
//                        arrEvents[i][5] = "Frenchf2012";
//                        listValue5471 += "<div class='eventInfo'>" + tinfo + "</div><img src='../images/Events/" + arrEvents[i][5] + "-SS1.jpg'></div>";
//                    }
//                    else {
//                        listValue5471 += "<div class='eventInfo'>" + tinfo + "</div></div>";
//                    }
//                }
//                listValue5471 += "</div>";
//                $("#savedinfo").html(listValue5471);
//            }
//            else {
//                $("#savedinfo").html("<center><br><br><br>Loading Events ···</center> ");
//            }
//        } catch (e) {
//            alert(e);
//        }
//    }
//    else {
//        $("#savedinfo").html("<center><br><br><br>Loading Events ···</center> ");
//    }
//    /*
//    //Shared Location: 9/23/2011￥请问恶趣味额￥xvv47x;   date + note + scode
//    var arrShared = [];
//    if (storage.getItem("arrShared") == ";") {
//    storage.setItem("arrShared", '');
//    }
//    if (storage.getItem("arrShared") && jQuery.trim(storage.getItem("arrShared")) != "") {
//    arrShared = storage.getItem("arrShared").split(";");
//    arrShared.pop();
//    if (arrShared.length > 3) {
//    $("#ra").show();
//    }
//    else {
//    $("#ra").hide();
//    }
//    for (j = 0; j < arrShared.length; j++) {
//    arrShared[j] = arrShared[j].split("￥");
//    }
//    listValue = "<table id='si'>";
//    for (i = 0; i < arrShared.length; i++) {
//    var arrV = arrShared[i][1].replace(reg, "&#32;")  //if no replace, cannot handle remove;
//    //       listValue += "<tr id='trBM" + i + "'><td><div class='bizListIcon'>" + (i + 1) + "</div></td>";
//    //       listValue += "<td class='td_bmMiddle'>";
//    //===判断是否saved   "xkk7ex"
//    var count = false;
//    if (arrShared[i][0].indexOf('Shared Location:') == 0) {
//    count = true;
//    }
//    //=====8709￥ ATM ￥ 792 Broadview Ave , Toronto , ON ￥416-466-2778￥Gx4op4;
//    //     8800￥ ATM ￥ 807 Broadview Ave , Toronto , ON ￥416-463-2775￥Gbb464￥date;
//    //普通信息
//    if (arrShared[i][0].indexOf('address') == 0) {
//    listValue += "<tr onclick=\"click_search('" + tname + "',null,null,null,5)\" id='trBM" + i + "'><td><div class='bizListIcon'>" + (i + 1) + "</div></td>";
//    listValue += "<td class='td_bmMiddle'>";
//    //var tname = arrShared[i][1].replace("#39#", "'");
//    //address￥1 Adelaide St W , Toronto , ON￥2￥xjj2ax￥4/12/2012/3:36 PM;
//    var tname = ReplaceF(arrShared[i][1]);
//    //var tadd = ReplaceF(arrShared[i][2]);
//    listValue += "<a class=\"csa\">" + tname + "</a>";
//    //                  listValue += "<a class=\"csa\"";
//    //                listValue += " onclick=\"click_search('" + tname + "',null,null,null,5)\">" + tname + "</a>";
//    listValue += "<p class='p_smallfont'>Share Code: " + arrShared[i][3] + "</p>";
//    //#region time
//    try {
//    var time = arrShared[i][4];
//    time = time.split('/'); //月、日、年、时分A/PM
//    var t3 = time[3];
//    if (time[2] == new Date().getFullYear()) {
//    time = time[0] + "/" + time[1];
//    }
//    else {
//    time = time[2] + "/" + time[0] + "/" + time[1];
//    }
//    if (t3) {
//    time += " &nbsp;" + t3;
//    }
//    listValue += "<p class='p_smallfont'><a class='p_date'>" + time + "</a></p>";
//    } catch (e) {
//    }
//    //#endregion
//    //listValue += "</td><td class='td_bmRight'><img onclick=\"removeBM2s('" + 0 + "','" + i + "','" + arrV + "')\" src='images/delete17gray.png' border='0' /></td></tr>";
//    listValue += "</td><td class='td_bmRight' onclick=\"removeBM2s('" + 0 + "','" + i + "','" + arrShared[i][1] + "','" + arrShared[i][3] + "')\"><div class='dm'><div class='ds'></div></div></td></tr>";
//    }
//    else if ((arrShared[i][0].indexOf('dic02') == -1) && !count) {
//    listValue += "<tr id='trBM" + i + "'><td><div class='bizListIcon'>" + (i + 1) + "</div></td>";
//    listValue += "<td class='td_bmMiddle'>";
//    //var tname = arrShared[i][1].replace("#39#", "'");
//    var tname = ReplaceF(arrShared[i][1]);
//    var tadd = ReplaceF(arrShared[i][2]);
//    listValue += "<a class=\"csa\" onclick=\"click_searchs('" + arrShared[i][4] + "',null,null,null,5)\">" + tname + "</a>";
//    var time = arrShared[i][5];
//    time = time.split('/'); //月、日、年、时分A/PM
//    var t3 = time[3];
//    if (time[2] == new Date().getFullYear()) {
//    time = time[0] + "/" + time[1];
//    }
//    else {
//    time = time[2] + "/" + time[0] + "/" + time[1];
//    }
//    if (t3) {
//    time += " &nbsp;" + t3;
//    }
//    if (!!arrShared[i][3]) {
//    //listValue += "<p class='p_smallfont'>" + tadd + "</p>";
//    listValue += "<p class='p_smallfont'><input type='text' readonly=readonly class='inputadd' value='" + tadd + "'></p>"; //onfocus='deleting=true' onblur='deleting=false'
//    listValue += "<p class='p_smallfont'><a href='tel:" + arrShared[i][3] + "'>Tel:&nbsp;&nbsp;" + arrShared[i][3] + "</a><a class='p_date'>" + time + "</a></p>";
//    }
//    else if (tadd.length > 25) {
//    listValue += "<p class='p_smallfont'>" + tadd + "</p>";
//    listValue += "<p class='p_smallfont'><a>&nbsp;&nbsp;</a><a class='p_date'>" + time + "</a></p>";
//    }
//    else {
//    listValue += "<p class='p_smallfont'><a>&nbsp;&nbsp;</a></p>";
//    listValue += "<p class='p_smallfont'>" + tadd + "<a class='p_date'>" + time + "</a></p>";
//    }
//    //listValue += "</td><td class='td_bmRight'><img onclick=\"removeBM2s('" + 0 + "','" + i + "','" + arrV + "')\" src='images/delete17gray.png' border='0' /></td></tr>";
//    listValue += "</td><td class='td_bmRight' onclick=\"removeBM2s('" + 0 + "','" + i + "','" + arrV + "','" + arrShared[i][4] + "')\"><div class='dm'><div class='ds'></div></div></td></tr>";
//    }
//    else {
//    listValue += "<tr onclick=\"click_search('dic$','" + arrShared[i][2] + "',null,null,null,5)\" id='trBM" + i + "'><td><div class='bizListIcon'>" + (i + 1) + "</div></td>";
//    listValue += "<td class='td_bmMiddle'>";
//    listValue += "<a class=\"csa\">" + arrShared[i][0] + "</a>";
//    //if (arrShared[i][1].length < 36) {
//    listValue += "<p class='p_smallfont'>Share Code: " + arrShared[i][2] + "</p>";
//    var str1 = arrShared[i][1];
//    str1 = ReplaceF(str1);
//    if (arrShared[i][1].length > 35) {
//    str1 = arrShared[i][1].substr(0, 34) + '....';
//    }
//    listValue += "<p class='p_smallfont'>" + str1 + "</p>";
//    // }
//    //                listValue += "<a href='#' onclick=click_search('dic00" + arrShared[i][0] + "')>" + arrShared[i][1] + "</a>";
//    /* else {//if (arrShared[i][2].length < 70)
//    var str1 = arrShared[i][1].substr(0, 34);
//    var str2 = arrShared[i][1].substr(34);
//    listValue += "<p class='p_smallfont'>" + str1 + "</p>";
//    listValue += "<p class='p_smallfont'>" + str2 + "</p>";
//    }* /
//    //                else {
//    //                    var str1 = arrShared[i][2].substr(0, 34);
//    //                    var str2 = arrShared[i][2].substr(35,30)+" ...";
//    //                    listValue += "<p class='p_smallfont'>" + str1 + "</p>";
//    //                    listValue += "<p class='p_smallfont'>" + str2 + "</p>";
//    //                }
//    //listValue += "</td><td class='td_bmRight'><img onclick=\"removeBM2s('" + 0 + "','" + i + "','" + arrShared[i][0] + "','" + arrShared[i][2] + "')\" src='images/delete17gray.png' border='0' /></td></tr>";
//    listValue += "</td><td class='td_bmRight' onclick=\"removeBM2s('" + 0 + "','" + i + "','" + arrShared[i][0] + "','" + arrShared[i][2] + "')\"><div class='dm'><div class='ds'></div></div></td></tr>";
//    }
//    //listValue += "</td><td class='td_bmRight'><img onclick=\"removeBMs('" + 0 + "','" + i + "','" + arrV + "','" + arrSaved[i][0] + "')\" src='images/delete17gray.png' border='0' alt='R'/></td></tr>";
//    }
//    listValue += "</table>";
//    $("#savedinfo").html(listValue);
//    }
//    */
//    if (iPhoneOrientation == 0) {
//        $("#savedinfo,#si").height(258);
//    }
//    else {
//        $("#savedinfo,#si").height(118);
//    }
//    setTimeout("$('#si').touchScroll()", 200);
//    googleavent();
//    setTimeout("Time5472=true", 300);
//}
function ET(x) {
    $(".EventTitle").css("background-color", "#CCC");
    $("#ET" + x).css("background-color", "transparent");
    $(".ET00").css({ "background-color": "#999", "width": "24%" });
    $("#ET1" + x).css({ "background-color": "#FC0", "width": "23%" });
    setTimeout(function () {
        $("#siout").css("-webkit-transform", "translateX(-" + ((parseInt(x) - 1) * 320) + "px)");
    }, 200);
    // if (x == "2") {
    // $('#si1').touchScroll("update");
    // }
    // showevents(x);
}
setTimeout('AutoEvents()', 500);
function AutoEvents() {
    if (!isshowevents) {
        isshowevents = true;
        $.ajax({
            url: 'Handler/Login.ashx',
            type: 'POST',
            data: {
                getEvents: who
            },
            success: function (a) {
                //debugger;
                EventsText = a;
                if ($("#main").html().indexOf('Events') != -1) {
                    showevents();
                }
                //   EventsText = "1:;CTY Computers:;14-420 Hwy 7 E , Richmond Hill:;A:;string￥2:;Kum Hong BBQ Restaurant:;14-420 Hwy 7 E , Richmond Hill￥￥3:;Kum Hong BBQ Restaurant:;14-420 Hwy 7 E , Richmond Hill";
            },
            error: function (a) {

            }
        });
    }
}

function c1() {
    // // // //  // //debugger;;
    if (!isSearching) {
        //gps = latLngControl.updatePosition();
        clearInterval(si9916);
        gpsLL = latLngControl.updatePosition();
        if (monitor.gps(gpsLL)) {
            oldGps = gpsLL;
            gps = gpsLL;
            getbound(2, gpsLL);
        }
        else {
            c1();
        }
        //alert(oldGps);
        //确定定位之后，清除之前的gps
        try {
            clearMarkGPS();
        } catch (e) { catche(e); }
        gpsMaker = new google.maps.Marker({
            position: gpsLL,
            icon: gpsicon,
            map: map
        });
        markerGPS.push(gpsMaker);
        gpsMaker.setAnimation(google.maps.Animation.DROP);
        addClicktoMarker(gpsMaker, gpsLL);
        addClicktoMarker(gpsMaker, gpsLL);
        setTimeout(function () {
            addClicktoMarker(gpsMaker, gpsLL);
        }, 100);
        newgps = gpsLL;
        gpschange = 'yes';
        //isallowgps = false;
        //$("#closecross").click();
        closecross();
        gpsAtt = false;
        gpsState = 1;
        exgpsstate = 1;
        if (hisw && keywords != "none") {
            clearTimeout(t1);
            $('#inMapMsg,#cmm').show();
            $('#inMapMsg').html("<center><span onclick='reSearch();' id='res'><font color=blue class='button1'>Research?</font></span></center>");
            t1 = setTimeout("$('#inMapMsg,#cmm').hide()", 5000);
        }
        //map.panTo(gps);
        //移至GPS点
        //map.setCenter(gps);
    }
    else {
        $('#inMapMsg,#cmm').show();
        //$('#inMapMsg').html("Searching....Please wait");
        $('#inMapMsg').html("<center><span id='resing'>Searching ...</span><center>");
        t1 = setTimeout("$('#inMapMsg,#cmm').fadeOut()", 5000);
    }
}
function c2() {
    if ($("#c2").css('color') == 'rgb(128, 128, 128)') {
        return;
    }
    $("#c3").css('color', 'black');
    $("#c2").css('color', 'grey');
    //$("#c").html("<center><br><br><img src=\"images/loading/loading11.gif\" /></center>");
    $("#c").html("<center><br><br>Please wait a moment</center>");
    $("#c").height(94);
    $.ajax({
        url: 'Handler/Login.ashx',
        type: 'POST',
        data: { scodeMaker: 1 },
        success: function (info) {
            if (info != "" && info != null) {
                scode = info;
                var url = "umap.ca/?" + scode;
                // $("#c").html("<a style='font-size: medium;font-weight: bolder;'>Share location : </a>&nbsp;&nbsp;&nbsp;<span id=\"url\">" + url + "</span><br><input id='saveLocationNotes' onfocus='inputfocus()' onblur='inputblur()' placeholder=' Notes' maxlength='50' size='35' type='text' /><br><br><div onclick='shareajax(\"" + scode + "\")' class='cross1'><a href='mailto:?Subject=shared%20Location&body=umap.ca/?" + scode + "'>&nbsp;E-Mail&nbsp;&nbsp;</a></div><div  onclick='sharebySMS(\"" + scode + "\",1)' class='cross2'><a>&nbsp;&nbsp;&nbsp;&nbsp;SMS&nbsp;&nbsp;&nbsp;&nbsp;</a></div><div onclick='shareajax(\"" + scode + "\")' class='cross3'><a href='tweetie:///post?message=Share location from umap. umap.ca/?" + scode + "'>&nbsp;Twitter</a></div>");

                $("#c").html("<a style='font-size: medium;font-weight: bolder;'>Share location : </a>&nbsp;&nbsp;&nbsp;<span id=\"url\">" + url + "</span><br><input id='saveLocationNotes' onfocus='inputfocus()' onblur='inputblur()' placeholder=' Notes' maxlength='50' size='35' type='text' /><br><br><div onclick=\"shareajax('" + scode + "','mailto:?Subject=shared%20Location&body=umap.ca/?" + scode + "')\" class='cross1'><a>&nbsp;E-Mail&nbsp;&nbsp;</a></div><div  onclick=\"sharebySMS('" + scode + "',1)\" class='cross2'><a>&nbsp;&nbsp;&nbsp;&nbsp;SMS&nbsp;&nbsp;&nbsp;&nbsp;</a></div><div onclick=\"shareajax('" + scode + "','tweetie:///post?message=Share location from umap. umap.ca/?" + scode + "')\" class='cross3'><a>&nbsp;Twitter</a></div>");
            }
        },
        error: function () {
            alert("sorry, connect false!");
            closecross();
        }
    });
}
function shareajax(scode, emailurl) {
    //saveCurLocation(scode, true);
    // // // //  // //debugger;;
    try {
        if (!isSearching) {
            gpsLL = latLngControl.updatePosition();
            if (!monitor.gps(gpsLL)) {
                shareajax(scode);
            }
            var notes = $("#saveLocationNotes").val();
            notes = ReplaceT(notes);
            if (storage.getItem("account") != null && storage.getItem("account") != "") {
                who = storage.getItem("account");
            }
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth() + 1;
            var y = date.getFullYear();
            var h = date.getHours();
            var mm = date.getMinutes();
            var time = "";
            if (h > 12) {
                time = (h - 12) + ":" + mm + " PM";
            }
            else {
                time = h + ":" + mm + " AM";
            }
            //time = time.split('/'); //月、日、年、时分A/PM
            //date = m + "/" + d + "/" + y + "/" + time;
            date = m + "/" + d + "/" + y;
            $.ajax({//保存shared自定义到DB
                url: 'Handler/Login.ashx',
                type: 'POST',
                data: {
                    share: scode,
                    gpsLL: "" + GetgpsLL(),
                    GPS: "" + gps,
                    GPSAtt: gpsAtt,
                    notes: notes,
                    date: date,
                    who: who
                },
                success: function (id) {
                    //alert(4730);
                    id = id.split(':')[1];
                    if (id) {
                        who = id;
                        dic = id;
                        storage.setItem("account", who);
                        STtestaccount();
                    }
                    closeCurLocation();
                    window.open(emailurl, '_parent');
                },
                error: function (e) {
                    alert(e);
                    //alert('share fault');
                    closeCurLocation();
                }
            });
            //#region 添加信息到本地存储
            try {
                var taarshared = storage.getItem("arrShared");
                storage.removeItem("arrShared");
            } catch (e) { catche(e); }

            if (taarshared == null) {
                taarshared = "";
            }
            //Shared Location: 9/23/2011￥请问恶趣味额￥xvv47x;
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth() + 1;
            var y = date.getFullYear();
            taarshared = "Shared Location: " + m + "/" + d + "/" + y + "￥" + notes + "￥" + scode + ";" + taarshared;
            storage.setItem("arrShared", taarshared);
            //#endregion
        }
    } catch (e) {
        alert(e);
    }

}
function sharebySMS(code, num) {
    var a = prompt("Please copy the address below and paste it in SMS to share.", "umap.ca/?" + code);
    if (a != "" && a != null) {

        shareajax(code, "sms:");
        if (num == 1) {
            closep1(num);
        }
        try {
            //setTimeout("window.open('sms:', '_parent')", 300);
        } catch (e) {
            alert(e);
        }
    }
    else {
        //#region remove this share
        tarrSaved = storage.getItem("arrShared");
        var Tsavedarr = [];
        Tsavedarr = tarrSaved.split(';');
        Tsavedarr.pop();
        if (Tsavedarr.length == 0) {
            storage.setItem("arrShared", '');
        }
        else if (!shareexist) {//如果之前shared已经存在，则没有添加进来，所以不用删除
            storage.removeItem("arrShared");
            Tsavedarr.splice(0, 1);
            if (Tsavedarr.length > 0) {
                tarrSaved = Tsavedarr.join(';') + ";";
            }
            else {
                tarrSaved = "";
            }
            storage.setItem("arrShared", tarrSaved);
        }
        //#endregion 
        clearInterval(cb);
        $("#page3_detail").html("");
        $("#page3_details,#cross").hide();
        $("#centerControlDiv").hide();
        closeDetails();
    }

    /*
    else {//no share then delete
    tarrSaved = storage.getItem("arrShared");
    var Tsavedarr = [];
    Tsavedarr = tarrSaved.split(';');
    Tsavedarr.pop();
    Tsavedarr.splice(i, 1);
    storage.removeItem("arrShared");
    if (tarrSaved == null) {
    tarrSaved = "";
    }
    if (Tsavedarr.length == 0) {
    storage.setItem("arrShared", '');
    }
    else {
    tarrSaved = Tsavedarr.join(';') + ";";
    storage.setItem("arrShared", tarrSaved);
    }
    if (scode) {
    $.ajax({
    url: 'Handler/Login.ashx',
    type: 'POST',
    data: { delshared: code }
    });
    }
    }
    */
}
function c3() {
    // // // //  // //debugger;;
    if (!isSearching) {
        if ($("#c3").css('color') == 'rgb(128, 128, 128)') {
            return;
        }
        $("#c2").css('color', 'black');
        $("#c3").css('color', 'grey');
        gpsLL = latLngControl.updatePosition();
        if (monitor.gps(gpsLL)) {
            var tgpsll = gpsLL.toUrlValue(5);
        } else {
            c3();
        }
        $("#c").html("<a style='font-size: medium;font-weight: bolder;'>Save location : </a><div class='cross1' onclick='saveCurLocation(\"" + gpsLL + "\",\"" + tgpsll + "\")' id='saveCurLocation'>Save</div><br><a style='font-weight: bolder;color:blue;font-size: x-small;margin-left: 5px;'>" + tgpsll + "</a><br><input id='saveLocationNotes' onfocus='inputfocus()' onblur='inputblur()' placeholder=' Notes' maxlength='50' size='35' type='text' /><br><br>");
        $("#c").height(94);
    }
}
function saveCurLocation(gpsLL, tgpsll) {
    var notes = $("#saveLocationNotes").val();
    notes = ReplaceT(notes);
    var tarrSaved = storage.getItem("arrSaved");
    //#region 循环匹配重复项 2011.09.19
    savedexist = false;
    if (tarrSaved) {
        var Tsavedidarr = [];
        Tsavedidarr = tarrSaved.split(';');
        Tsavedidarr.pop();
        for (var i = 0; i < Tsavedidarr.length; i++) {
            Tsavedidarr[i] = Tsavedidarr[i].split('￥');
            if (Tsavedidarr[i][2] == gpsLL) {
                savedexist = true;
                break;
            }
        }
    }

    //#endregion

    //#region 添加信息到本地存储
    if (tarrSaved == null) {
        tarrSaved = "";
    }
    if (!savedexist) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        var date = m + "/" + d + "/" + y + '=' + getSMAX();
        tarrSaved = "Saved Location: " + date + "￥" + notes + "￥" + gpsLL + ";" + tarrSaved;
        savedToDB('L', notes, date, gpsLL);
    }
    storage.removeItem("arrSaved");
    storage.setItem("arrSaved", tarrSaved);
    //#endregion

    /*/if (!isfb) {2011.09.24  不会从share指向saved
    if (scode) {
    var url = "umap.ca?" + scode;
    $("#c").html("Location <a style='font-weight: bolder;color:blue;font-size: small;'>" + url + "</a> was saved.<br>Search in umap.ca by the code:<a style='font-weight: bolder;color:blue;font-size: small;'>" + scode + "</a>,<br>or enter the link above in browser to find<br>this location.<br><div class='cross1' onclick='closeCurLocation()'>Close</div>");
    }
    else*/
    if (!savedexist) {
        $("#c").html("Location <a style='font-weight: bolder;color:blue;font-size: small;'>" + tgpsll + "</a><br>  was saved.<br><br><div id=\"backonList\" onclick=\"click_back()\">Go Back</div>"); //<br><br><div class='cross1' onclick='closeCurLocation()'>Close</div>
    }
    else {
        $("#c").html("Location <a style='font-weight: bolder;color:blue;font-size: small;'>" + tgpsll + "</a><br> was already saved.<br><br><div id=\"backonList\" onclick=\"click_back()\">Go Back</div>"); //<br><br><div class='cross1' onclick='closeCurLocation()'>Close</div>
    }
    //$("#c").html("Location <a style='font-weight: bolder;color:blue;font-size: small;'>" + url + "</a> was saved.<br>Search in umap.ca by the code:<a style='font-weight: bolder;color:blue;font-size: small;'>" + scode + "</a>,<br>or enter the link above in browser to find<br>this location.<br><div class='cross1' onclick='closeCurLocation()'>Close</div>");
    //}

    /*2011.09.17注释save不需要保存至数据库
    $.ajax({
    url: 'Handler/Login.ashx',
    type: 'POST',
    data: { saveLocation: dic, ip: ip, scode: scode, Latlng: gpsLL, GPS: gps, GPSAtt: gpsAtt, Message: notes }
    // success: function (info) {
    //    $("#c").html("Location <a style='font-weight: bolder;color:blue;font-size: small;'>" + url + "</a> was saved.<br>Search in umap.ca by the code:<a style='font-weight: bolder;color:blue;font-size: small;'>" + scode + "</a>,<br>or enter the link above in browser to find<br>this location.<br><div class='cross1' onclick='closeCurLocation()'>Close</div>");
    //  }
    });*/
}
function closeCurLocation() {
    $("#cross").hide();
    hideisearch(2);
    $("#centerControlDiv").hide();
    clearInterval(cb);
}
var ifsw = true;
function inputfocus(x) {
    //alert(123);
    //$("#saved").hide();
    //$("#cross").animate({ marginTop: "-403px" });
    //    //$("#cross").css("margin-top", "-403px");
    //    if ($("#list").html().indexOf("stcs_result") == -1) {
    inputSwitch = true;
    if (x != 1) {
        try {
            clearInterval(tp);
        } catch (e) { catche(e); }
    }
    //$("#cross").animate({ marginTop: "-200px" });
    //        }
    //        else {
    //            $("#cross").animate({ marginTop: "-403px" });
    //        }
    //    if (ifsw) {
    //        ifsw = false;
    //        $("#saveLocationNotes").focus();
    //    }
    //$("p").css("color", "red");

}
var tp;
function inputblur(x) {
    inputSwitch = false;
    if (x != 1) {
        tp = setTimeout('toTop()', 50);
    }
    //    $("#cross").animate({ marginTop: "0px" });
    //$("#list").show();
}
//为IOS4层添加背景颜色
/*function addbgcolor(id) {
if (verStr.indexOf("Version/5.0") != -1 || verStr.indexOf('Android') != -1) {
$('#' + id).css('background-image', 'url("images/dot.png")');
$('#' + id).css('background-repeat', 'repeat');
$('#' + id).css('background-position', 'top left, top right');
$('#' + id).css('background-size', '10px');
$('#' + id).css('-webkit-background-size', '10px');
}
}*/
//#region                                                                          显示地图
var fir = true;
var pageFZOK = true; //页面翻转OK
/*2012.02.14原版
function click_map(x) {
//alert(mapEve);
if (!hisw && !mapEve) {
setTimeout('testmenu()', 500);
//if ((document.getElementById("container").style.display != "none") || (document.getElementById("container").style.display != "")) {
//    if ($("#function").is(":visible")) {
//        $("#container").css("margin-top", 216 - $("#function").height()); //修复点击主菜单
//    } else {
//        $("#container").css("margin-top", 216); //修复点击主菜单
//    }
if (fir) {
detectBrowser();
fir = false;
$("#container").css("margin-top", $("#map_canvas").height() + 1);
}
else {
//==================================
$("#map").css('-webkit-transform', 'scale(1)');
$("#map").css('-moz-transform', 'scale(1)');
$("#map").animate({ left: "0px", top: "0px" }, 500);
//$("#map").animate({ top: "0px" }, 500);map.setZoom(map.getZoom()-1);
backmap();
//isactived = false;
//setTimeout("activeMap();", 500);
//===================================
}
setTimeout('ToMap()', 800);
hisw = true;
//$("#login").slideUp();
//$("body").css({ "background-color": "#F3F3F3", "background-image": "none" });
//editgpsmap();
if (editSwitch == "") {
setTimeout('ToMap(1)', 800);
if (keywords == "none") {
//document.getElementById("list").innerHTML = "<span id='listGoBack' onclick='click_back()'>&nbsp;&nbsp;<img src='images/bg_back.png' border=0>&nbsp;&nbsp;&nbsp;</span>";
//$("#list").html("<center><br><br><br><span id='listGoBack' onclick='click_back()'>&nbsp;&nbsp;<img src='images/bg_back.png' border=0>&nbsp;&nbsp;&nbsp;</span></center>");
$("#list").html("<center><br><br><br><br><div id=\"backonList\" style='margin-left:118px' onclick=\"click_back()\">Go Back</div><div onclick=\"dis(event);newReport(2);\" id=\"list-re\">Write something to us.</div></center>");
//$("#backonList").css('margin-left', '118px');
              
}

// 隐藏工具栏
//hideToolbar();
//$("#tbList,#DivSignin,#div_History2").hide();
//ft = 'map';      
jumpTo(0);
}
//#region  直接进入地图
if (x == 1) {
//initialize(1);
$("#map_canvas").width(320);
$("#map_canvas").height(255);
google.maps.event.trigger(map, 'resize');
if ((keywords != "none") && (keywords != "")) {
try {
exnum.style.backgroundImage = 'url("./images/icon_L.png")';
} catch (e) { catche(e); }
//reMap();
setTimeout('listgroup()', 500);
}
else {
//stopGPS(1);
if (newgps != "") {
if (monitor.gps(newgps)) {
map.panTo(newgps);
}
}
}
}
//#endregion  
setTimeout('toTop();', 1000);
setTimeout('monitor.tomap(true)', 1000);
}
}
function ToMap(x) {
$("#saved,#cpright").hide();
$("#container").show();
$("#menu,#function,#saved,#nb,#account").hide();
document.getElementById('map_canvas').style.visibility = 'visible';
$("#map,#list,#map_canvas").show();
$("#map_canvas").width(320);
$("#map_canvas").height(255);
google.maps.event.trigger(map, 'resize');
if (x == 1) {
$("#main,#tb_search,#divBM,#menuLists,#editDone,#bookMarks").hide();
}
if (keywords != "none") {
$('#list').touchScroll('update');
}
}
*/
var pageFZOK1 = true;
function click_map(x) {
    //debugger;

    /*if (fir) {
    $("#map").show();
    document.getElementById('map').style.visibility = 'visible';
    document.getElementById('map_canvas').style.visibility = 'visible';
    }*/
    $("#keywords2").blur();
    $("#page2").css("margin-left", "100px");
    pageFZOK = false;
    //sthInsaved = $("#saved").html();
    hisw = true;
    //clearTimeout(sttesthisw);
    //debugger;
    if (iPhoneOrientation == 0) {
        //$('body').css('background', '#6070A4');
        //$('body').css('background', '#6070A4');
        //$('html').css('background', '#6070A4');
        $("#page0").attr("class", 'cubeleft out');
        $("#page1").attr("class", 'cubeleft in current');
        setTimeout('click_map1(' + x + ')', 200);
    }
    else {
        //        $('body').css('background', '#6070A4');
        //        $('body').css('background', '#6070A4');
        //        $('html').css('background', '#6070A4');
        $("#page0").attr("class", 'cubeleft1 out1');
        $("#page1").attr("class", 'cubeleft1 in1 current');
        setTimeout('click_map1(' + x + ')', 200);
    }
}
var si6629;
var myScrolllist;
function click_map1(x) {
    try {
        clearInterval(si6629);
    } catch (e) { }
    //debugger;
    //    $('body').css('background', '#6070A4');
    //    $('body').css('background', '#6070A4');
    //    $('html').css('background', '#6070A4');
    //    if (iPhoneOrientation == 0) {
    //        $("#page0").attr("class", 'cubeleft out');
    //        $("#page1").attr("class", 'cubeleft in current');
    //    }
    //    else {
    //        $("#page0").attr("class", 'cubeleft1 out1');
    //        $("#page1").attr("class", 'cubeleft1 in1 current');
    //    }
    //alert(1);
    if (clickSearching) {
        MapLock();
    }
    else {
        MapLock(1);
    }
    /*if (x) {
    homeType = true;
    $("#zoom12 img").attr('src', 'images/home.png');
    }*/
    if ($("#account").is(":visible")) {
        showaccount();
    }
    //   $("#SearchIcon").css({ "top": "173px", "left": "276px", "display": "block" });
    // $("#SearchIcon").show();
    testList();
    //alert(mapEve);
    //debugger;
    if (hisw && !mapEve) {
        //clearTimeout(sttesthisw);
        setTimeout('testmenu()', 500);
        if (editSwitch == "") {
            if (keywords == "none") {
                $("#listin").html("<center><br><div id=\"backonList\" style='margin-left:118px' onclick=\"click_back()\">Go Back</div><div onclick=\"dis(event);newReport(2);\" id=\"list-re\"><img src=\"images/write.gif\"></div></center>");
            }
            jumpTo(0);
        }
        if (fir) {
            fir = false;
            //debugger;
            //$("#map").show();
            //$("#map").css('top', '-1px');
            // detectBrowser();
            //$("#container").css("margin-top", $("#map_canvas").height() + 1);
            //document.getElementById('map').style.visibility = 'visible';
            //document.getElementById('map_canvas').style.visibility = 'visible';
            try {
                //debugger;
                //clearTimeout(sttesthisw);
                //  menuPosition = $('#menu1').touchScroll('getPosition');
                myScrolllist = new iScroll('container', { vScrollbar: false });
                si6629 = setInterval('showCenter()', 2000);
                //$('#list').touchScroll();
            } catch (e) { catche(e); }
        }
        else {
            showCenter();
        }
        //setTimeout('ToMap()', 800);

        // alert(2);

        //$("#page0").animate({ marginLeft: "-160px" }, 400);
        //$("#page0").css('-webkit-transform', 'scale(1) rotateY(-80deg) translate(-160px)');
        //$("#page0").animate({ marginLeft: "-160px" }, 400);
        /* $("#page0").css('-webkit-transition-duration', '450ms');
        $("#page0").css('-webkit-transform', 'rotateY(-90deg)');
        setTimeout('toTop()', 5);
        setTimeout("$('#page1').css('-webkit-transition-duration', '450ms');$('#page1').css('-webkit-transform', 'rotateY(0deg)');", 390);
        */
        /*  $("#page0").removeClass();
        //$("#page00").removeClass();
        $("#page1").removeClass();
        $("#page1").addClass("cubeleft in current");
        $("#page0").addClass("cubeleft out");
        //$("#page00").addClass("cubeleft out");
        cuberight2 out","cuberight2 in current*/

        //setTimeout('', 500);
        //alert(3);

        toTop();
        //#region  直接进入地图
        //debugger;
        if (x == 1 && !isSearching) {
            //initialize(1);
            $("#map_canvas").width('100%');
            //$("#map_canvas").height(255);
            //google.maps.event.trigger(map, 'resize');
            if ((keywords != "none") && (keywords != "")) {
                try {
                    //exnum.style.backgroundImage = 'url("./images/icon_L.png")';
                    exnum.style.backgroundColor = '#FF7A6E';
                } catch (e) { catche(e); }
                //reMap();
                //2012.04.16     setTimeout('listgroup()', 500);
            }
            else {
                //stopGPS(1);
                if (newgps != "") {
                    if (monitor.gps(newgps)) {
                        map.panTo(newgps);
                    }
                }
            }
        }
        //alert(4);
        //#endregion  
        //sttesthisw = setTimeout('testhisw()', 200);
        //testhisw();
        //$("#mapcor1,#mapcor2,#mapcor3,#mapcor4").show();
        //setTimeout('monitor.tomap(true)', 1000);    
        //debugger;$("#container").css("position", "absolute");
        /*if (closeLR == "R") {
        $("#zoominmap").css('opacity', '0.1');
        $("#zoomoutmap").css('opacity', '0.1');
        $("#zoominmapR").css('opacity', '1');
        $("#zoomoutmapR").css('opacity', '1');
        }
        else {
        $("#zoominmapR").css('opacity', '0.1');
        $("#zoomoutmapR").css('opacity', '0.1');
        $("#zoominmap").css('opacity', '1');
        $("#zoomoutmap").css('opacity', '1');
        }*/
    }
    pageFZOK = true;
    if (iPhoneOrientation == 90) {
        XZ();
        $("#map,#map_canvas").height(268);
    }
    $("#page2").css("margin-left", "0px");
    //debugger;
}
function MyOverlay(map) {
    this.setMap(map);
}
MyOverlay.prototype = new google.maps.OverlayView();
MyOverlay.prototype.onAdd = function () { }
MyOverlay.prototype.onRemove = function () { }
MyOverlay.prototype.draw = function () { }
function showCenter() {
    return;
    try {
        //debugger;
        if (!document.getElementById("layerPulse1")) {
            var layerPulse1 = '<div id="layerPulse1"></div><div id="layerPulse2"></div>'; //
            $("body").append(layerPulse1);
            GoogleTouchEvent('layerPulse1');
        }
        var overlay = new MyOverlay(map);
        var latlng = gpsMaker.getPosition();
        var pp = overlay.getProjection().fromLatLngToContainerPixel(latlng);
        //console.log(pp);
        var top = parseInt(pp.y) - 6;
        var left = parseInt(pp.x) - 6;
        var top1 = parseInt(pp.y) - 12;
        var left1 = parseInt(pp.x) - 12;
        if (hisw && !showDetails && top < 255 && left < 320 && !map_canvasMove) {
            $("#layerPulse2").show();
            $("#layerPulse1").css({ "top": top1 + "px", "left": left1 + "px" });
            $("#layerPulse2").css({ "top": top + "px", "left": left + "px" });
            $("#layerPulse1").addClass('layerPulse1');
            setTimeout('$("#layerPulse1").removeClass("layerPulse1");', 1500);
        }
        else if ($("#layerPulse2").is(":visible")) {
            $("#layerPulse2").hide();
        }
    } catch (e) {
    }
}
var menuPosition = 0;
function backmap(x) {
    /*
    // // //debugger;;
    if (!clickSearching && hisw) {
    if (!(infoinmappage && infoinmappage.indexOf("table") != -1)) {
    //alert(3532);
    infoinmappage = "<center><br><br><br><br><div id=\"backonList\" style='margin-left:118px' onclick=\"click_back()\">Go Back</div><div onclick=\"dis(event);newReport(2);\" id=\"list-re\">Write something to us.</div></center>";
    }
    try {
    $('#list').html(infoinmappage);
    $("#backonList").css('margin-left', '118px');
    $('#list').touchScroll('update');
    $('#list').touchScroll('setPosition', 0);
    } catch (e) { catche(e); }
    }*/
}
//alert(screen.height);
//#endregion
//var sttesthisw;
function testhisw() {
    if (pageFZOK && pageFZOK1) {
        //$('html,body').css('background-image', 'url("images/dot.png")');
        //$('html,body').css('background-repeat', 'repeat');
        //$('html,body').css('background-position', 'top left, top right');
        //debugger;
        if (hisw) { //地图页
            //if ($("#page0").attr("class") != "cubeleft out") {
            //}
            if (iPhoneOrientation == 0) {
                $("#page0").attr("class", 'cubeleft out');
                $("#page1").attr("class", 'cubeleft in current');
            }
            else {
                $("#page0").attr("class", 'cubeleft1 out1');
                $("#page1").attr("class", 'cubeleft1 in1 current');
            }
        }
        else {
            //if ($("#page1").attr("class") != "cuberight out") {
            //}
            if (iPhoneOrientation == 0) {
                $("#page1").attr("class", 'cuberight out');
                $("#page0").attr("class", 'cuberight in current');
            }
            else {
                $("#page1").attr("class", 'cuberight1 out1');
                $("#page0").attr("class", 'cuberight1 in1 current');
            }
        }
    }
    else {
        setTimeout('testhisw()', 200);
    }
    //$('body').css({ 'background': 'red', "background-image": "none" });

}
//#region                                                                          关闭地图
//var ft = 'list';
//#region 原版
/*
function click_back1() {
stopGPS(1); //停止检测gps
$("#closecross").click();
try {
$('#list').touchScroll('setPosition', 0);
} catch (e) {

}

$("#menu,#saved").show();
$("#main,#menuLists,#editDone").show();
$("#container,#saveLocation,#rf").hide();
//saved
if ($("#saved").html().indexOf('savedinfo') != -1) {
closesaved();
}
hisw = false;
search = false;
//$("#login").slideUp();
clearTimeout(t);
$("#tools").height(0);
clearTimeout(hi);
clearTimeout(hi1);
$("#map,#list,#tool,#tools,#inMapMsg,#cmm").hide();
//ft = 'list';
//$("#tbList,#div_History2").show();

//            //showHistory();
//            if (keywords == 'kw') {
//                document.getElementById('keywords').focus();
//            }
//if page3 or image page open, close it
//document.getElementById("page3_details").style.display = "none";
//document.getElementById("imgBizLarge").style.display = "none";
$("#page3_details").hide();
$("#imgBizLarge").hide();
varbizimg = "";
google.maps.event.clearListeners(map, 'click');
clearOverlays1();
setTimeout('toTop()', 5);
testmenu();
testaccount();
testShared();
}
*/
//#endregion
/*/#region 改版1-地图地图缩小到主界面右上方
var infoinmappage = "";
function click_back12() {
if (exnum) {
exnum.style.backgroundImage = 'url("./images/icon_L.png")';
exnum.style.webkitTransition = "-webkit-transform  800ms ease";
exnum.style.WebkitTransform = "scale(1)";
$(".plus").slideUp();
}
try {
//// // // //  // //debugger;;
clearInterval(sivar[0]);
stopgps = true;
gpsLock = false;
//clearInterval(sivar[1]);
clearTimeout(stvar[1]);
infoinmappage = $('#list').html();
sia.abort();
} catch (e) { catche(e); }
killwatchGPS();
stopGPS(1);
MapLock(1);
$("#closecross").click();
try {
$('#list').touchScroll('update');
$('#list').touchScroll('setPosition', 0);
} catch (e) { catche(e); }

$("#menu,#saved,#cpright").show();
$("#main,#menuLists,#editDone").show();
$("#container,#saveLocation,#rf").hide();
//saved
if ($("#saved").html().indexOf('savedinfo') != -1) {
closesaved();
}
hisw = false;
search = false;
clickSearching = false;
isSearching = false;
//$("#login").slideUp();
clearTimeout(t);
$("#tools").height(0);
clearTimeout(hi);
clearTimeout(hi1);

$("#list,#tool,#tools,#inMapMsg,#cmm").hide();
//ft = 'list';
//$("#tbList,#div_History2").show();
//            //showHistory();
//            if (keywords == 'kw') {
//                document.getElementById('keywords').focus();
//            }
//if page3 or image page open, close it
//document.getElementById("page3_details").style.display = "none";
//document.getElementById("imgBizLarge").style.display = "none";
//$("#box").animate({ height: "300px" });


$("#map").css('-webkit-transform', 'matrix(0.082, 0, 0, 0.11, 0, 0)');
$("#map").css('-moz-transform', 'matrix(0.082, 0, 0, 0.11, 0, 0)');

//setTimeout('$("#map").animate({ top: "-75px" },500)', 500);
// $("#map").animate({ left: "132px" });
$("#map").animate({ left: "132px", top: "-97px" }, 500);
$("#page3_details").hide();
$("#imgBizLarge").hide();
varbizimg = "";
google.maps.event.clearListeners(map, 'click');
clearOverlays1();
setTimeout('toTop()', 5);
testmenu();
testaccount();
testShared();
tomenu = true;
//setTimeout('monitor.menu()', 1000);
//setTimeout('monitor.tomap(false);', 300);
//mapEve = false;
}
//#endregion*/
//#region 改版2-cube
var infoinmappage = "";
function click_back() {
    //$("#saved").hide();

    //#region  清理内存


    //alert(7329);




    //#endregion
    pageFZOK = false;
    //clearTimeout(sttesthisw);
    $("#layerPulse2").hide();
    hisw = false;
    $("#page2").css("margin-left", "100px");
    //debugger;
    //$('body').css('background', '#6070A4');
    //$('body').css('background', '#6070A4');
    //$('html').css('background', '#6070A4');
    //debugger;
    //$("#mapcor1,#mapcor2,#mapcor3,#mapcor4").hide();
    //alert(7346);
    if (iPhoneOrientation == 0) {
        $("#page1").attr("class", 'cuberight out');
        $("#page0").attr("class", 'cuberight in current');
        $("#map,#map_canvas").height(268);
    }
    else {
        $("#page1").attr("class", 'cuberight1 out1');
        $("#page0").attr("class", 'cuberight1 in1 current');
        $("#map,#map_canvas").height(255);
    }
    // alert(7355);
    setTimeout('click_back1()', 400);
}
function click_back1() {
    $("#SearchIcon").hide();
    var i7359 = 0;
    //alert(++i7359);
    //debugger;
    //    $('body').css('background', '#6070A4');
    //    $('body').css('background', '#6070A4');
    //    $('html').css('background', '#6070A4');
    //    //debugger;
    //    //$("#mapcor1,#mapcor2,#mapcor3,#mapcor4").hide();
    //    if (iPhoneOrientation == 0) {
    //        $("#page1").attr("class", 'cuberight out');
    //        $("#page0").attr("class", 'cuberight in current');
    //    }
    //    else {
    //        $("#page1").attr("class", 'cuberight1 out1');
    //        $("#page0").attr("class", 'cuberight1 in1 current');
    //    }
    try {
        closeDetails();
    } catch (e) { }
    showswitch = true;
    try {
        $("#container").show();
        $("#zoom6,#zoom8,#zoom10").hide();
        $('#gpsy').css('right', '0px');
        $('#gpsInMap').css({ 'top': '0px !important', 'right': '0px' });
        $('#croInMap').css('top', '0px !important');
        //alert(++i7359);
        if (gpsState == 2) {
            try {
                gpsLL = latLngControl.updatePosition();
                gps = GetgpsLL();
            } catch (e) { catche(e); }
            gpschange = "yes";
            if (gps == "" || gps == null) {
                gps = "43.6702131,-79.38679";
                gpsLL = "(43.6702131,-79.38679)";
            }
            try {
                gpsMaker = new google.maps.Marker({
                    position: gpsLL,
                    icon: gpsicon,
                    map: map
                });
                if (gpsMaker) {
                    clearMarkGPS();
                    markerGPS.push(gpsMaker);
                    addClicktoMarker(gpsMaker, gpsLL);
                    newgps = gpsLL;
                    newGPS = gpsLL;
                }

            } catch (e) { catche(e); }
        }

    } catch (e) {
        console.log("click_back1-7421");
    }
    try {
        infowindow.close();

    } catch (e) {
        console.log("click_back1-7428");
    }
    try {
        $('body').height(415);
        bizEve();
        //clearTimeout(sttesthisw);
        $("#container").css('top', '262px');
        if (exnum) {
            //exnum.style.backgroundImage = 'url("./images/icon_L.png")';
            exnum.style.backgroundColor = '#FF7A6E';
            exnum.style.webkitTransition = "-webkit-transform  800ms ease";
            exnum.style.WebkitTransform = "scale(1)";
            //$(".plus").slideUp();
        }
    } catch (e) {
        console.log("click_back1-7443");
    }
    try {
        //// // // //  // //debugger;;
        //clearTimeout(sttesthisw);
        clearInterval(sivar[0]);
        stopgps = true;
        gpsLock = false;
        //clearInterval(sivar[1]);
        clearTimeout(stvar[1]);
        infoinmappage = $('#list').html();
        //sia.abort();
        /* $("#map,#map_canvas").height(255);
        $("#tools,#tool").css({ top: '255px' });
        google.maps.event.trigger(map, 'resize');
        */
    } catch (e) { catche(e); }
    try {
        killwatchGPS();
        //alert(++i7359);
        stopGPS(1);
        $("#cover,#rf").hide();
        $("#closecross").click();
    } catch (e) {
        console.log("click_back1-7467");
    }
    try {
        //debugger;
        //$('#list').touchScroll('update');
        // $('#list').touchScroll('setPosition', 0);
        //setTimeout("$('#list').touchScroll('setPosition', 0)", 500);
        myScrolllist.scrollTo(0, 0, 0);
        ChangeHeightSwitch = true;
        ChangeHeight(x);
    } catch (e) { catche(e); }
    try {
        if ($("#cross").is(":visible")) {
            closecross();
        }
        storage.setItem("details", 0);
        /*$("#page0").removeClass();
        $("#page1").removeClass();
        $("#page0").addClass("cuberight in current");
        $("#page1").addClass("cuberight out");
        */

        //$("#page0").animate({ marginLeft: "-160px" }, 400);
        //alert(++i7359);
        showLucky();

        //setTimeout("$('#page0').css('-webkit-transform', 'none');", 390);
        //setTimeout("$('#page0').css('-webkit-transition-duration', '450ms');$('#page0').css('-webkit-transform', 'scale(1) rotateY(0deg)');", 390);
        //$('#page0').css('-webkit-transition-duration', '450ms');
        //$('#page0').css('-webkit-transform', 'scale(1) rotateY(0deg)');

        //saved
        /*if ($("#saved").html().indexOf('savedinfo') != -1) {
        closesaved();
        }*/
        //hisw = false;
        //setTimeout('', 400);
        //search = false;
        //clickSearching = false;
        //isSearching = false;
        //$("#login").slideUp();
        //alert(++i7359);
        clearTimeout(t);
        $("#tools").height(0);
        clearTimeout(hi);
        clearTimeout(hi1);
        $("#tool,#tools,#inMapMsg,#cmm,#page3_details").hide();
        //alert(++i7359);
        //debugger;
        var Tiw = $(".iw");
        for (var i = 0; i < Tiw.length; i++) {
            if (Tiw[i].id != "smpi-iw") {
                Tiw[i].parentNode.parentNode.parentNode.parentNode.style.display = "none";
            }
        }

        //$("#saved").html(sthInsaved);
        $("#saved").css({ "-webkit-transform": 'scale(1)', "-webkit-transition-duration": "0s" });
        //  closesaved();

        //ft = 'list';
        //$("#tbList,#div_History2").show();
        /* if (dic != 0 && dic != "") {
        //书签颜色
        for (var i = 0; i < 3; i++) {
        document.getElementById("bookMark" + i).style.background = "-webkit-gradient(linear, left top,right top, from(#ffffc0),color-stop(0.5, #ffffee),to(#ffffcc))";
        document.getElementById("bookMark" + i).style.background = "-moz-linear-gradient(left,#ffffc0, #ffffee, #ffffcc)";
        }
        $("#divBM").show();
        }*/
        //            //showHistory();
        //            if (keywords == 'kw') {
        //                document.getElementById('keywords').focus();
        //            }
        //if page3 or image page open, close it
        //document.getElementById("page3_details").style.display = "none";
        //document.getElementById("imgBizLarge").style.display = "none";
        //$("#box").animate({ height: "300px" });

        //$("#map").css('-webkit-transform', 'matrix(0.082, 0, 0, 0.11, 0, 0)');
        //$("#map").css('-moz-transform', 'matrix(0.082, 0, 0, 0.11, 0, 0)');
        //setTimeout('$("#map").animate({ top: "-75px" },500)', 500);
        // $("#map").animate({ left: "132px" });

        //----====$("#map").animate({ left: "132px", top: "-97px" }, 500);

        //$("#page3_details").hide();
        //$("#imgBizLarge").hide();
        //varbizimg = "";
        //google.maps.event.clearListeners(map, 'click');$("#container").css("position", "initial");
        clearOverlays1();
        //debugger;
        toTop();
        testhisw();
        testmenu();
        //testaccount();
        testShared();
        tomenu = true;
        //setTimeout('monitor.menu()', 1000);
        //setTimeout('monitor.tomap(false);', 300);
        //mapEve = false;
        if (!isNaN(menuPosition)) {
            //debugger;
            //     alert(5333);
            //$('#menu1').touchScroll('setPosition', parseInt(menuPosition));
        }
        pageFZOK = true;
        $("#" + Tid).css('text-shadow', '5px 5px 3px grey');
        // debugger;
    } catch (e) {
        console.log("click_back1-7575");
    }

}
//#endregion
//#endregion

//#region 缩放地图   zoomClick
function zoomClick(n, t, type) {
    //n:变焦控制开关  1+ 0-
    //t:控制居中开关
    //type:"1":加号

    //#region 当倍率为奇数时，改为偶数
    /*if (map.getZoom() % 2 != 0) {
    map.setZoom(map.getZoom() - 1);
    }*/
    //#endregion
    if (exz > 14) {
        exz = 14;
    }
    //debugger;   //放大
    if (n == 1) {//放大
        if (map.getZoom() < 4) {
            map.setZoom(4);
        }
        //       else
        //        if (map.getZoom() < 14) {
        //            map.setZoom(map.getZoom() + 1);
        //        } else 

        // if (map.getZoom() <= 17 && is17) {
        //debugger;
        if (map.getZoom() < 16) {
            map.setZoom(map.getZoom() + 1);
        }
        else if (map.getZoom() == 16) {
            map.setZoom(map.getZoom() + 1);
        }
        else if (map.getZoom() >= 17 && map.getMapTypeId() == 'roadmap' && type == '1') {

            map.setMapTypeId(google.maps.MapTypeId.HYBRID);
        }
        else if (map.getZoom() == 17 && map.getMapTypeId() != 'roadmap') {
            map.setZoom(map.getZoom() + 1);
        }
        /*if (map.getZoom() >= 17 && map.getMapTypeId() == 'roadmap' && type == '1' && is17) {
        //map.setZoom(map.getZoom() + 1);
        map.setMapTypeId(google.maps.MapTypeId.HYBRID);
        }*/
        if (t && map.getZoom() < 14) {
            map.setZoom(14);
        }
        if (map.getZoom() >= 17) {
            exs = false;
        }
    }
    //else if (map.getZoom() > 4) {
    else {
        if (map.getMapTypeId() == 'hybrid' && map.getZoom() <= 17) {
            map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        }
        else {
            map.setZoom(map.getZoom() - 1);
        }
        //if (map.getZoom() <= exz) {
        //#region 缩小至原始倍数时焦距居中
        if (ext != "" && ext != null && !t) {
            /*/=============
            var tnewgps = "" + newgps;
            //tgps = newgps.toString().split(',')[0].split('(')[1] + ',' + newgps.toString().split(',')[1].split(')')[0];
            var tgps = tnewgps.split(',')[0].split('(')[1] + ',' + tnewgps.split(',')[1].split(')')[0];
            //delete tnewgps;

            //var tgps = newgps.toString().split(',')[0].split('(')[1] + ',' + newgps.toString().split(',')[1].split(')')[0];

            var gpsLatLng = tgps.split(",");
            //delete tgps;
            //var gpsLatLng = gps.split(",");
            var nn = gpsLatLng[0];
            var ss = gpsLatLng[0];
            var ww = gpsLatLng[1];
            var ee = gpsLatLng[1];
            //================*/
            var nn = "" + newgps.lat();
            var ss = "" + newgps.lat();
            var ww = "" + newgps.lng();
            var ee = "" + newgps.lng();


            var L25 = [ext, exg];
            if ((parseFloat(nn) - parseFloat(L25[0])) >= 0) {
                nn = nn;
            }
            else {
                nn = L25[0];
            }
            if ((parseFloat(ss) - parseFloat(L25[0])) <= 0) {
                ss = ss;
            }
            else {
                ss = L25[0];
            }
            if ((parseFloat(ww) - parseFloat(L25[1])) >= 0) {
                ww = L25[1];
            }
            else {
                ww = ww;
            }
            if ((parseFloat(ee) - parseFloat(L25[1])) >= 0) {
                ee = ee;
            }
            else {
                ee = L25[1];
            }
            //debugger;
            var ne = new google.maps.LatLng(nn, ee);
            var sw = new google.maps.LatLng(ss, ww);
            var bounds = new google.maps.LatLngBounds(sw, ne);
            map.fitBounds(bounds);
            exs = true;
        }
        //#endregion
        // }
    }
    stopGPS(2);
    FormateMap();
}
/*
function zoomX(x, y, z) {
//x:0：缩小，1：放大
//y:地图中按钮标识符
//z:列表中按钮标识符

if (map.getZoom() % 2 != 0) {
map.setZoom(map.getZoom() - 1);
}
//#endregion
if (x == 0 && map.getZoom() > 4) {//如果四级以上可以缩小
map.setZoom(map.getZoom() - 2);
if (map.getMapTypeId() == 'hybrid') {//如果是俯瞰图模式则变为道路图模式
map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
}
}
else {//放大
//0~3
if (map.getZoom() < 4) {
map.setZoom(4);
}
//4~16
else if (map.getZoom() < 17) {
map.setZoom(map.getZoom() + 2);
}
//17以上转换视图模式
if (map.getZoom() > 17 && map.getMapTypeId() == 'roadmap') {
map.setMapTypeId(google.maps.MapTypeId.HYBRID);
}
}

}
*/
//#endregion

//#region 获取centre的GPS     latLngControl.updatePosition()
var latLngControl;
function LatLngControl(map) {
    this.setMap(map);
}
LatLngControl.prototype = new google.maps.OverlayView();
LatLngControl.prototype.onAdd = function () { };
LatLngControl.prototype.onRemove = function () { };
LatLngControl.prototype.draw = function () { };
LatLngControl.prototype.updatePosition = function () {//debugger
    var projection = this.getProjection();
    //var point = new google.maps.Point(160, 115);
    var wid = $("#map_canvas").width() / 2;
    var hei = $("#map_canvas").height() / 2;
    var point;
    if (wid && hei) {
        point = new google.maps.Point(wid, hei);
    }
    else {
        point = new google.maps.Point(160, 105);
    }
    var LatLng = projection.fromContainerPixelToLatLng(point);
    // // //debugger;;
    //是否是正常的GPS
    if (monitor.gps(LatLng)) {
        monitorGPSTime = 0;
        return LatLng;
    }
    //如果不正常，循环次数是不是大于10，是，则停止循环。给个定值
    else if (monitorGPSTime > 10) {
        monitorGPSTime = 0;
        return (new google.maps.LatLng(43.6702131, -79.38679));
    }
    else {
        monitorGPSTime++;
        setTimeout('return latLngControl.updatePosition();', 100);
    }
};
function GetgpsLL() {
    var gpsl = latLngControl.updatePosition();
    //gpsl = gpsl.toString().substr(1, gpsl.toString().length - 2);
    gpsl = ("" + gpsl).substr(1, ("" + gpsl).length - 2);
    return gpsl;
}
//#endregion

//#region 初始化地图                                                    【initialize()】
var isallowgps = false; //用户是否提供gps
var oldGps;
var st3995;
var st5090;
var directionService;
var directionsRenderer;
var gpsMaker;
var searchMaker;
var map_canvasMove = false;
function initialize(param) {
    myLatLng = new google.maps.LatLng(43.6702131, -79.38679);
    //getbound(2, myLatLng);
    isInrange = true;
    isAlert = false;
    newgps = myLatLng;
    /*if (newgps) {
    myLatLng = newgps;
    } else {
    }*/
    var myOptions = {
        zoom: 14,
        center: myLatLng,
        //noClear: true,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    directionService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({ map: map,
        suppressMarkers: true
        , routeIndex: 2

    });
    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    //#region  显示红旗
    setTimeout('if((gpsState!= 0)||("' + param + '"=="1")){clearMarkGPS();gpsMaker = new google.maps.Marker({position: myLatLng,icon: gpsicon,map: map});markerGPS.push(gpsMaker);addClicktoMarker(gpsMaker, myLatLng);}', 100);

    //#endregion

    //#region search按钮 /*
    /*var homeControlDiv = document.createElement('DIV');
    var homeControl = new HomeControl(homeControlDiv, map);
    homeControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.LEFT].push(homeControlDiv);*/
    //#endregion

    //#region 飘动的缩放键 /**/
    /*
    var bottomControlDiv = document.createElement('DIV');
    var bottomControl = new BottomControl10(bottomControlDiv, map);
    bottomControlDiv.index = 1;
    bottomControlDiv.id = "flyIn";
    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(bottomControlDiv);

    var bottomControlDiv = document.createElement('DIV');
    var bottomControl = new BottomControl20(bottomControlDiv, map);
    bottomControlDiv.index = 1;
    bottomControlDiv.id = "flyOut";
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(bottomControlDiv);*/
    //#endregion

    //放大L
    //---------------------------------------------------------------------------------------------
    var bottomControlDiv = document.createElement('DIV');
    var bottomControl = new BottomControl(bottomControlDiv, map);
    bottomControlDiv.index = 1;
    bottomControlDiv.id = "zoominmapC";
    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(bottomControlDiv);
    //---------------------------------------------------------------------------------------------

    //缩小L
    //---------------------------------------------------------------------------------------------
    var bottomControlDiv = document.createElement('DIV');
    var bottomControl = new BottomControl2(bottomControlDiv, map);
    bottomControlDiv.index = 1;
    bottomControlDiv.id = "zoomoutmapC";
    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(bottomControlDiv); //LEFT_BOTTOM
    //---------------------------------------------------------------------------------------------

    /*//放大R
    //---------------------------------------------------------------------------------------------
    var bottomControlDiv = document.createElement('DIV');
    var bottomControl = new BottomControlR(bottomControlDiv, map);
    bottomControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(bottomControlDiv);
    //---------------------------------------------------------------------------------------------

    //缩小R
    //---------------------------------------------------------------------------------------------
    var bottomControlDiv = document.createElement('DIV');
    var bottomControl = new BottomControl2R(bottomControlDiv, map);
    bottomControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(bottomControlDiv);
    //---------------------------------------------------------------------------------------------
    */
    //#region 返回
    var typeControlDiv = document.createElement('DIV');
    var typeControl = new TypeControl(typeControlDiv, map);
    typeControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(typeControlDiv);
    //#endregion
    //#region 工具
    /*
    //右上角的   gps按钮
    var typeControlDiv2 = document.createElement('DIV');
    var typeControl2 = new TypeControl2(typeControlDiv2, map);
    typeControlDiv2.index = 1;
    typeControlDiv2.id = "gpsy";
    map.controls[google.maps.ControlPosition.RIGHT].push(typeControlDiv2);

    ///GPS
    var typeControlDiv10 = document.createElement('DIV');
    var typeControl10 = new TypeControl10(typeControlDiv10, map);
    typeControlDiv10.index = 1;
    typeControlDiv10.id = "gpsInMap";
    map.controls[google.maps.ControlPosition.RIGHT].push(typeControlDiv10);

    //SEARCH
    var typeControlDiv11 = document.createElement('DIV');
    var typeControl11 = new TypeControl10(typeControlDiv11, map);
    typeControlDiv11.index = 1;
    typeControlDiv11.id = "seaInMap";
    typeControlDiv11.class = "butInMap";
    map.controls[google.maps.ControlPosition.RIGHT].push(typeControlDiv11);

    //GROSS
    var typeControlDiv12 = document.createElement('DIV');
    var typeControl12 = new TypeControl12(typeControlDiv12, map);
    typeControlDiv12.index = 1;
    typeControlDiv12.id = "croInMap";
    map.controls[google.maps.ControlPosition.RIGHT].push(typeControlDiv12);
    //*/

    //#endregion  
    //#region corss 2012.07.12
    // debugger;
    /*  var SControlDiv0 = document.createElement('DIV');
    var sControl0 = new SControl0(SControlDiv0, map);
    sControl0.index = 10;
    sControl0.id = "Satellite";
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(sControl0);
    */
    var typeControlDiv0 = document.createElement('DIV');
    var typeControl0 = new SControl0(typeControlDiv0, map);
    typeControlDiv0.index = 10;
    typeControlDiv0.id = "Satellite";
    typeControlDiv0.style.display = "none";
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(typeControlDiv0);

    /*
    var typeControlDiv0 = document.createElement('DIV');
    var typeControl0 = new TypeControl0(typeControlDiv0, map);
    typeControlDiv0.index = 10;
    typeControlDiv0.id = "toolInMap";
    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(typeControlDiv0);
    */
    //#endregion   

    //#region cross按钮
    /*
    var centerControlDiv = document.createElement('DIV');
    var cControl = new centerControl(centerControlDiv, map);
    centerControlDiv.index = 1;
    centerControlDiv.id = 'centerControlDiv';
    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(centerControlDiv);*/

    //#endregion

    //#region 地图中心十字按钮
    var centerControlDiv = document.createElement('DIV');
    var cControl = new centerControl(centerControlDiv, map);
    centerControlDiv.index = 1;
    centerControlDiv.id = 'centerControlDiv';
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
    //#endregion

    latLngControl = new LatLngControl(map);


    //    if (!param) {
    //        isInrange = true;
    //        isAlert = false;
    if (navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function (pos) {
            //   var wid = navigator.geolocation.watchPosition(function (pos) {
            var init = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            map.panTo(init);
            isallowgps = true; //用户给了gps
            gpsState = 0;
            gpschange = 'yes';
            if (monitor.gps(init)) {
                map.panTo(init);
                newgps = init;
            }
            //oldGps = init;
            //alert(oldGps);
            gps = pos.coords.latitude + "," + pos.coords.longitude;
            oldGps = init;
            //debugger;
            getbound(2, init);
            //alert(newgps + "\r\n" + gps);
            //确定定位之后，清除之前的gps
            clearMarkGPS(2);
            gpsMaker = new google.maps.Marker({
                position: init,
                icon: gpsicon,
                map: map
            });
            markerGPS.push(gpsMaker);
            addClicktoMarker(gpsMaker, init);
            /**************************************************************/
            searchMaker = new google.maps.Marker({
                position: init,
                icon: searchicon,
                map: map
            });
            //markerGPS.push(gpsMaker);
            FormateMap();
            //定位后重新搜索
            /* if (hisw && keywords != "none") {
            /*$('#inMapMsg').show();
            $('#inMapMsg').html("<span onclick='reSearch();'><font color=blue class='button1'>Re-search</font></span>");
            setTimeout("$('#inMapMsg').fadeOut()", 10000);*
            //click_search(keywords);
            reSearch();
            }*/
            watchgps('initialize');
            gpsLock = true;
            setTimeout(function () {
                IntelligentPositioner();
            }, 3000);
        }, function () { }, {
            //  timeout: 6000
        });
        //  setTimeout("stopwatchGPS('" + wid + "')", 7000);
        // Try Google Gears Geolocation
    }
    else if (google.gears) {
        browserSupportFlag = true;
        var geo = google.gears.factory.create('beta.geolocation');
        geo.getCurrentPosition(function (pos) {
            var init = new google.maps.LatLng(pos.latitude, pos.longitude);
            map.panTo(init);
            gpsMaker = new google.maps.Marker({
                position: init,
                icon: gpsicon,
                map: map
            });
            try {
                clearMarkGPS();
            } catch (e) { catche(e); }
            newgps = init;
            markerGPS.push(gpsMaker);
            addClicktoMarker(gpsMaker, init);
            watchgps();
        }, function () { });
    }
    // }
    /*google.maps.event.addListener(map, 'touchmove', function () {
    clearhide();
    });
    google.maps.event.addListener(map, 'touchend', function (event) {
    if (!hisw) {
    $("#map").css('-webkit-transform', 'scale(1)');
    $("#map").animate({ top: "0px" });
    $("#map").css({ left: "0px" });
    }
    });*/
    try {
        google.maps.event.addDomListener(document.getElementById('map_canvas'), 'touchend', function (e) {
            map_canvasMove = false;
            var stinfo0 = 'if(!mapEve){mapStatus = false;if (!hisw && tomenu) {$("#keywords2").blur();click_map(1);}}';
            setTimeout(stinfo0, 300);
            st5090 = setTimeout('$("#toolInMap").css("opacity", "0.1")', 2000);
            /*    if (hisw) {
            var str4147 = 'if (!mapStatus) {loadingmap();}';
            st3995 = setTimeout(str4147, 2000);
            }*/
        });
        google.maps.event.addDomListener(document.getElementById('map_canvas'), 'touchmove', function (e) {
            map_canvasMove = true;
            if (iPhoneOrientation != 90) {
                clearTimeout(st5090);
                $("#toolInMap").css("opacity", "0.7");
            }
        });
        google.maps.event.addDomListener(document.getElementById('map_canvas'), 'touchstart', function (e) {
            //alert(5320);
            if (iPhoneOrientation != 90) {
                clearTimeout(st5090);
                $("#toolInMap").css("opacity", "0.7");
            }
        });
        /* google.maps.event.addDomListener(document.getElementById('map'), 'click', function (e) {
        var stinfo1 = 'alert(4156);if(!mapEve){if (!hisw && tomenu) { $("#keywords2").blur(); click_map(1); }}';
        setTimeout(stinfo1, 300);
        });*/
        google.maps.event.addListener(map, 'dblclick', function () {
            mapStatus = false;
            if (!hisw) {
                $("#keywords2").blur(); click_map(1);
            }
            else {
                clearTimeout(st5090);
                $("#toolInMap").css("opacity", "0.7");
                clearhide();
                zoom4();
            }
        });
        google.maps.event.addListener(map, 'tilesloaded', function () {//idle
            // //debugger;
            if (hisw) {
                isidle = true;
                //alert(4173);
                mapStatus = true;
                ////loadingmap(1);
                isactived = true;
            }
        });
        google.maps.event.addListener(map, 'dragstart', function () {
            //alert(ChangeHeightSwitch);
            if (ChangeHeightSwitch && iPhoneOrientation == 0) { ChangeHeight(1); }
            else {
                $("#map,#map_canvas").height(268);
            }
         //debugger;
            if (iPhoneOrientation == 0) {
                //alert(11);
                $("#centerControlDiv").attr("class", "centerControlDiv_heng");
                // $("#centerControlDiv").css({ "top": "148px !important", "display": "block" }); //148px"left": "152px", 
            }
            else {//alert(8414);
                $("#centerControlDiv").attr("class", "centerControlDiv_shu");
                // $("#centerControlDiv").css({ "top": "120px", "display": "block" });
            }

            //$("#centerControlDiv").show();
            clearTimeout(siResearch);
            $("#Redo").hide();
            // $("#Redo").css("margin-top", "-50px");
        });
        google.maps.event.addListener(map, 'dragend', function () {
            //alert($("#centerControlDiv").css("top"));
            //$("#centerControlDiv").css("display","none !important");
            $("#centerControlDiv").attr("class", "centerControlDiv_none");
            if (!document.getElementById("Redo")) {
                var Redo = '<div id="Redo" onclick="reSearch(null,1)">Redo Search</div>';
                $("#map").append(Redo);
            }
            //debugger;
            if (keywords != "none" && keywords != "dic$") {
                var wid = $("#map_canvas").width() / 2;
                var left = wid - 53;
                $("#Redo").css("margin-left", left + "px");

                $("#Redo").show();
                //$("#Redo").css("margin-top", "0px");
                siResearch = setTimeout(function () {
                    $("#Redo").hide();
                    // $("#Redo").css("margin-top", "-50px");
                }, 3000);
            }
            ChangeHeightSwitch = true;
        });
        google.maps.event.addListener(map, 'zoom_changed', function () {
            if (map.getZoom() >= 16) {
                $("#Satellite").show();
                $("#Satellite").css("top", "0px");
                $("#toolInMap").css("top", "100px !important");
            }
            else {
                $("#Satellite").hide();
                $("#toolInMap").css("top", "0px !important");
            }
            FormateMap();
        });
        google.maps.event.addListener(map, 'center_changed', function () {
            FormateMap();
        });

        /*  google.maps.event.addDomListener($("body")[0], 'touchend', function (e) {
        ChangeHeightSwitch = true;
        });*/
        /*google.maps.event.addDomListener(document.getElementById('container'), 'touchend', function (e) {
        ChangeHeightSwitch = true;
        转移至 i.js
        });*/
    } catch (e) { catche(e); }
}
var ChangeHeightSwitch = true;
var ChangingHeightSwitch = false;
function ChangeHeight(x) {
    //debugger;
    //alert(iPhoneOrientation + " " + ChangingHeightSwitch);
    if ((iPhoneOrientation != 0) && !ChangingHeightSwitch) {
        return;
    }
    ChangeHeightSwitch = false;
    if (x == "1") {
        ChangingHeightSwitch = true;
        //alert(8452);
        //$("#map,#map_canvas").css('-webkit-transition-duration', '500s');
        //alert(8454);
        $("#map,#map_canvas").height(325);
        /*$("#container").css({ "height": "91px", "top": "328px" });
        var y = myScrolllist.y;
        myScrolllist.destroy();
        myScrolllist = null;
        myScrolllist = new iScroll('container', { vScrollbar: false });
        myScrolllist.scrollTo(0, (y ? y : 0), 0);*/
        google.maps.event.trigger(map, 'resize');
    }
    else {
        ChangingHeightSwitch = false;
        //$("#map,#map_canvas").css('-webkit-transition-duration', '500s');
        $("#map,#map_canvas").height(255);
        google.maps.event.trigger(map, 'resize');
        /*$("#container").css({ "height": "160px", "top": "262px" });
        var y = myScrolllist.y;
        myScrolllist.destroy();
        myScrolllist = null;
        myScrolllist = new iScroll('container', { vScrollbar: false });
        myScrolllist.scrollTo(0, (y ? y : 0), 0);*/
    }
}
function FormateMap() {
    if (map.getMapTypeId() == 'hybrid') {
        $("#Satellite div").html("Map");
    }
    else {
        $("#Satellite div").html("Satellite");
    }
}

function SControl0(SDiv, map) {
    //debugger;
    var tUI = document.createElement('div');
    /* tUI.style.width = '30px';
    tUI.style.height = '30px';
    //tUI.style.opacity = '0.1';
    tUI.style.border = '0px';
    //tUI.style.background = 'url(images/cross3.png)';
    tUI.style.textAlign = 'left';
    tUI.style.marginTop = '8px';
    tUI.style.marginRight = '8px';
    zIndex = '300';
    //tUI.id = 'zoom6';
    */
    tUI.innerHTML = "Satellite";
    SDiv.appendChild(tUI);
    google.maps.event.addDomListener(tUI, 'click', function () {
        if (map.getMapTypeId() == 'hybrid') {
            $("#Satellite div").html("Satellite");
            map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        }
        else {
            $("#Satellite div").html("Map");
            map.setMapTypeId(google.maps.MapTypeId.HYBRID);
        }
    });
}

var showswitch = true;
var over5357 = true;
function TypeControl0(typeDiv, map) {
    //typeDiv.style.paddingTop = '0px';
    var tUI = document.createElement('div');
    tUI.style.width = '30px';
    tUI.style.height = '30px';
    //tUI.style.opacity = '0.1';
    tUI.style.border = '0px';
    tUI.style.background = 'url(images/cross3.png)';
    tUI.style.textAlign = 'left';
    // tUI.style.marginTop = '8px';
    tUI.style.marginRight = '8px';
    tUI.style.zIndex = '300';
    //tUI.id = 'zoom6';
    typeDiv.appendChild(tUI);
    google.maps.event.addDomListener(tUI, 'click', function () {
        cross3();
        /*   if (showswitch) {"left": "145px !important",
        $("#zoom6,#zoom8,#zoom10").show();
        //#region 1
        $("#gpsy").css('right', '80px');
        $("#gpsInMap").css({ 'top': '38px !important', 'right': '47px' });
        $("#croInMap").css({ 'top': '45px !important', 'right': '-3px' });
        showswitch = !showswitch;
        setTimeout("$('#gpsy').css('right', '75px');$('#gpsInMap').css({ 'top': '33px !important', 'right': '42px' });$('#croInMap').css({ 'top': '40px !important', 'right': '-3px' })", 500);
        //#endregion

        //#region 2
        $("#gpsy").css('right', '205px');
        $("#gpsInMap").css('right', '125px');
        $("#croInMap").css('right', '65px');
        showswitch = !showswitch;
        setTimeout("$('#gpsy').css('right', '200px');$('#gpsInMap').css('right', '120px');$('#croInMap').css('right', '60px')", 500);
        //#endregion
        }
        else {
        showswitch = !showswitch;
        setTimeout('$("#zoom6,#zoom8,#zoom10").hide()', 300);
        /#region 1
        $("#gpsy").css('right', '80px');
        $("#gpsInMap").css({ 'top': '38px !important', 'right': '47px' });
        $("#croInMap").css({ 'top': '45px !important', 'right': '-3px' });
        setTimeout("$('#gpsy').css('right', '0px');$('#gpsInMap').css({ 'top': '0px !important', 'right': '0px' });$('#croInMap').css('top', '0px !important')", 150);
        //#endregion*

        //#region 2 
        $("#gpsy").css('right', '205px');
        $("#gpsInMap").css('right', '125px');
        $("#croInMap").css('right', '65px');
        setTimeout("$('#gpsy').css('right', '0px');$('#gpsInMap').css('right','0px');$('#croInMap').css('right','0px')", 150);
        //#endregion

        }
        */
        //$("#gpsy,#gpsInMap,#seaInMap,#croInMap").show();
    });
}
function cross3() {
    //debugger;
    if (!$("#page3_details").is(":visible") && iPhoneOrientation == 0) {
        //
        if (over5357) {
            over5357 = false;
            if ($("#cross").is(":visible")) {//隐藏
                //$("#centerMap")
                //$("#centerControlDiv").show();
                $("#centerMap").css('-webkit-transform', 'scale(1)');
                $("#centerControlDiv").css({ "right": "8px !important", "-webkit-transform": "rotate(0deg)" });
                //   setTimeout('$("#centerControlDiv").css({"top": "115px !important", "right": "150px !important","-webkit-transform": "rotate(180deg)"})', 1);
                //$("#centerControlDiv").css({ "top": "115px !important", "right": "150px !important", "-webkit-transform": "rotate(180deg)"}); zoom10();zoom102(300);
                //   setTimeout('$("#centerControlDiv").css({"top": "8px !important", "right": "8px !important","-webkit-transform": "rotate(0deg)"});', 600);
                setTimeout('zoom10();', 400);
                setTimeout('over5357 = true;', 600);
            }
            else {//显示
                $("#centerControlDiv").css({ "right": "8px !important", "-webkit-transform": "rotate(0deg)" });
                //$("#centerControlDiv").css({ "top": "8px !important", "right": "8px !important", "-webkit-transform": "rotate(0deg)" });
                //$("#centerMap")
                $("#centerControlDiv").show();
                setTimeout('$("#centerControlDiv").css({"right": "145px !important","-webkit-transform": "rotate(270deg)"});', 200);
                //   $("#centerMap").css('-webkit-transform', 'scale(1)');
                //   setTimeout('$("#centerControlDiv").css({"top": "115px !important", "right": "150px !important","-webkit-transform": "rotate(180deg)"});', 200);
                //$("#centerControlDiv").css({ "top": "115px !important", "right": "150px !important", "-webkit-transform": "rotate(180deg)"}); zoom10();zoom102(400);
                //   setTimeout('$("#centerControlDiv").css({"top": "110.5px !important", "right": "145px !important","-webkit-transform": "rotate(270deg)"});', 600);
                setTimeout('zoom10();over5357 = true;', 600);
            }
        }
        else {
            setTimeout('cross3()', 1500);
        }
    }
}
function zoom102(x) {
    setTimeout('zoom10()', x);
}
//#region GPS键
var gpsLock = false;
function TypeControl2(typeDiv, map) {
    typeDiv.style.paddingTop = '0px';
    var tUI = document.createElement('div');
    tUI.style.width = '34px';
    tUI.style.height = '34px';
    tUI.style.opacity = '0.8';
    tUI.style.border = '0px';
    tUI.style.background = 'url(images/GPSLogo30.png)';
    tUI.style.textAlign = 'left';
    tUI.style.marginTop = '8px';
    tUI.style.marginRight = '8px';
    tUI.style.zIndex = '299';
    tUI.id = 'zoom6';
    tUI.style.display = "none";
    typeDiv.appendChild(tUI);

    google.maps.event.addDomListener(tUI, 'click', function () {
        ////debugger;
        if (hisw && !gpsLock) {
            try {
                clearTimeout(t1);
            } catch (e) { catche(e); }
            //alert(isallowgps);
            if (isallowgps) {//允许获取gps，则获取
                gpsLock = true;
                clearTimeout(t1);
                resetGPS("1");
            }
            else {
                $('#inMapMsg').html("Can't get current location<br>Click <img alt='zoomin' id='zoom11' src='images/cross3.PNG'> to set manually.");
                $('#inMapMsg,#cmm').fadeIn();
                t1 = setTimeout("$('#inMapMsg,#cmm').fadeOut();", 3000);
            }
        }
    });

    /*   google.maps.event.addDomListener(tUI, 'mouseover', function () {
    showBack("editgps");
    });

    google.maps.event.addDomListener(tUI, 'mouseout', function () {
    hideBack("editgps");
    });*/
}

var n = 0;
var t1;
function stopGPS(x) {
    if (x == 1) {
        killwatchGPS();
        stopgps = true;
        gpsLock = false;
        clearTimeout(t1);
        $('#inMapMsg,#cmm').hide();
        n = 0;
    }
    else {
        stopgps = false;
    }
}
function msgReloadGPS() {
    if (hisw) {
        if (!stopgps) {
            try {
                var msg = "getting current location &nbsp;"
                //while relocate GPS, lock click
                google.maps.event.clearListeners(map, 'click');
                msg += (5 - n); //2012.01.14//7-》5
                $('#inMapMsg1').html(msg);
            } catch (e) { catche(e); }
            n++;
            if (n < 5) {//2012.01.14
                setTimeout("msgReloadGPS()", 1000);
            }
            else {
                ////debugger;
                //alert("4556" + gpschange);
                if (gpschange == 'yes') {
                    if (keywords != 'none') {//有值
                        try {
                            if (monitor.gps(newgps)) {
                                map.panTo(newgps);
                            }
                            //alert(keywords);
                            if (keywords != 'dic$' && hisw) {
                                clearTimeout(t1);
                                $('#inMapMsg').html("<span id='inMapMsg1'></span>");
                                //$('#inMapMsg1').html("<center>Location changes</center>");
                                $('#inMapMsg1').html("<center><span onclick='reSearch();'><font color=blue class='button1'>Re-search</font></span></center>");
                                t1 = setTimeout("$('#inMapMsg,#cmm').fadeOut()", 4000);
                                $('#inMapMsg,#cmm').fadeIn();
                                if (monitor.gps(newgps)) {
                                    map.panTo(newgps);
                                }
                            }
                            else {
                                $('#inMapMsg,#cmm').fadeOut();
                            }
                        } catch (e) { catche(e); }

                        //$('#inMapMsg').html("<center><span id='resing'>Researching ...</span><center>");
                        //t1 = setTimeout("$('#inMapMsg,#cmm').fadeOut()", 4000);
                    }
                    /*else if (keywords == 'dic$') {//nearby
                    //$('#inMapMsg1').html("<center>Location changes</center>");
                    $('#inMapMsg').html("<span onclick='reSearch();'><font color=blue class='button1'>Re-search</font></span>");
                    t1 = setTimeout("$('#inMapMsg,#cmm').fadeOut()", 4000);
                    map.panTo(newgps);
                    }*/
                    /*    if (keywords == 'none') {
                    $('#inMapMsg,#cmm').fadeOut();
                    map.panTo(newgps);
                    }
                    */
                }
                else if (hisw && !researching) {
                    try {
                        //$('#inMapMsg').html("<span id='inMapMsg1'></span>");
                        setTimeout('$("#inMapMsg1").html("<center>no change</center>")', 1000);
                        $('#inMapMsg,#cmm').fadeIn();
                        t1 = setTimeout("$('#inMapMsg,#cmm').fadeOut()", 4000);
                    } catch (e) { catche(e); }
                }
                n = 0;

                // restore map click after relocate GPS
                if ($("#GPSControl").is(":visible")) {
                    GPSModify();
                }
                setTimeout('gpsLock = false;', 1000);
            }
        }
        else {
            clearTimeout(t1);
            stopGPS(2);
            $('#inMapMsg,#cmm').hide();
        }
    }
}
function resetGPS(x) {
    $('#inMapMsg,#cmm').show();
    if (markersArray1) {
        for (i in markersArray1) {
            markersArray1[i].setMap(null);
        }
    }
    //if (keywords != "" && keywords != null && keywords != "none") {

    // }
    watchgps(x);
    if (n == 0) {
        $('#inMapMsg').html("<span id='inMapMsg1'></span>");
        msgReloadGPS();
        //alert(n);
    }
    $("#GPSinfoword").fadeOut();
}

//#endregion
//红旗
function TypeControl10(typeDiv, map) {
    typeDiv.style.paddingTop = '0px';
    var tUI = document.createElement('div');
    tUI.style.width = '32px';
    tUI.style.height = '32px';
    tUI.style.opacity = '0.8';
    tUI.style.border = '0px';
    tUI.style.background = 'url(images/GPS32.png)';
    tUI.style.textAlign = 'left';
    tUI.style.marginTop = '8px';
    tUI.style.marginRight = '8px';
    tUI.style.zIndex = '299';
    tUI.id = 'zoom8';
    tUI.style.display = "none";
    typeDiv.appendChild(tUI);
    google.maps.event.addDomListener(tUI, 'click', function () {
        bhi = false;
        clearhide();
        toTop();
        if ((SystemBuy[0] == true) && circlenumber["zoom8"] > 300) {
            if (circlenumber["zoom8"]) {
                circlenumber["zoom8"] = circlenumber["zoom8"] + 1;
            }
            else {
                circlenumber["zoom8"] = 1;
            }
            setTimeout('$("#zoom8").click()', 100);
            return;
        }
        else {
            circlenumber["zoom8"] = 0;
            mapStatus = false;
            stopGPS(1);
            if (newgps != "") {
                flag();
            }
        }
    });
}
//cross
function TypeControl12(typeDiv, map) {
    typeDiv.style.paddingTop = '0px';
    var tUI = document.createElement('div');
    tUI.style.width = '30px';
    tUI.style.height = '30px';
    tUI.style.opacity = '0.8';
    tUI.style.border = '0px';
    tUI.style.background = 'url(images/cross3.png)';
    tUI.style.textAlign = 'left';
    tUI.style.marginTop = '8px';
    tUI.style.marginRight = '8px';
    tUI.style.zIndex = '299';
    tUI.id = 'zoom10';
    tUI.style.display = "none";
    typeDiv.appendChild(tUI);
    google.maps.event.addDomListener(tUI, 'click', function () {
        if (iPhoneOrientation == 90) {
            $('#centerControlDiv').css({ 'left': '225px !important' });
        }
        if (SystemBuy[0] == true) {
            zoom10time++;
            if (zoom10time > 10) {
                //loadingmap();
            }
            setTimeout('$("#zoom10").click()', 100);
            return;
        }
        else {
            //loadingmap('over');
            stopGPS(1);
            if ($("#cross").is(":visible")) {
                //alert(2);
                closecross();
                // iscanbeclose = false;
                //  setTimeout('iscanbeclose=true;', 1000);
            }
            else {
                //alert(3);
                tocross();
                //iscanbeclose = false;
                //   setTimeout('iscanbeclose=true;', 1000);
            }
        }
    });
}
function whereTouch(x, y) {
    if (hisw) {
        if (x > 36 && y > 83) {
            return true;
        }
        return false;
    }
    return true;
}
//#endregion

var tomenu = true;
function loadingmap(x) {
    ////debugger;
    try {
        if (x) {
            if ($('#inMapMsg1').html() && $('#inMapMsg1').html().indexOf("Loading") != -1) {
                $('#inMapMsg,#cmm').hide()
            }
        }
        else {
            if (hisw) {
                clearTimeout(t1);
                $('#inMapMsg,#cmm').show();
                $('#inMapMsg').html("<span id='inMapMsg1'></span>");
                $('#inMapMsg1').html("<center>Loading map ……</center>");
            }
        }
    } catch (e) { catche(e); }
}
var isactived = false;
var isidle = false;
function activeMap() {
    ////debugger;
    //if (map.getZoom() > 16) { map.setZoom(map.getZoom() - 2); }
    //else { map.setZoom(map.getZoom() + 2); }
    google.maps.event.addListener(map, 'tilesloaded', function () {//tilesloaded
        ////debugger;
        isidle = true;
        ////debugger;
        mapStatus = true;
        isactived = true;
        ////loadingmap(1);
    });
}
//#region 地图上的搜索
function HomeControl(controlDiv, map) {
    controlDiv.style.paddingTop = '10px';
    controlDiv.style.left = '20px';
    //var imgss = ["url(images/zoomin30.png)", "url(images/zoomout30.png)"]; //, "url(images/centerGps.png)", "url(images/reloadgps30.png)"]
    //`var imgsss = ["url(images/icon_search.png)  no-repeat"];
    // for (i = 0; i < 1; i++) {
    var cUI = document.createElement('DIV');
    cUI.style.width = '30px';
    cUI.style.height = '30px';
    cUI.id = "isearch";
    // cUI.style.top = '-30px';
    //        if (i > 0) {
    //            cUI.style.marginLeft = '45px';
    //            cUI.style.marginTop = '-30px';
    //        }
    //cUI.style.left = '30px';
    //cUI.style.cssText = "width :30px;height:30px;margin-left:30px;margin-top:-30px;";
    cUI.style.opacity = '0';
    cUI.style.marginTop = '5px';
    cUI.style.zIndex = '300';
    cUI.style.marginLeft = '5px';
    cUI.style.background = "url(images/empty30.png)  no-repeat";
    //var tools = document.getElementById("tools");
    //tools.appendChild(cUI);

    controlDiv.appendChild(cUI);
    google.maps.event.addDomListener(cUI, 'click', function () {
        if (hisw) {
            try {
                mapEve = true;
                setTimeout("mapEve=false;", 500);
                //alert(mapEve);
                //console.log("ser---"+mapEve);
                tomenu = false;
                $("#keywords2").val('');
                click_back();
                $("#keywords2").focus();
                //return false;
            } catch (e) { catche(e); }
        }
    });
    //if (i == 0) {
    /* google.maps.event.addDomListener(cUI, 'click', function () {
    tomenu = false;
    $("#keywords2").val('');
    click_back();
    $("#keywords2").focus();        
    });*/
}
//        if (i == 1) {
//            google.maps.event.addDomListener(cUI, 'click', function () {
//                zoomClick(2);
//            });
//        }
//        if (i == 2) {
//            google.maps.event.addDomListener(cUI, 'click', function () {
//                map.panTo(newgps);
//            });
//        }
//        if (i == 3) {
//            google.maps.event.addDomListener(cUI, 'click', function () {
//                resetGPS();
//                clearRoadend();
//            });
//        }
// }
//}

//#endregion
var mapEve = false;
//#region 地图上显示返回
function TypeControl(typeDiv, map) {
    typeDiv.style.padding = '0px';
    typeDiv.style.Top = '0px';

    var tUI = document.createElement('div');
    //tUI.style.width = '35px';
    //tUI.style.height = '19px';
    //tUI.style.height = '35px';
    //tUI.style.opacity = '0.6';
    tUI.style.border = '0px';
    //背景改为方块 2011.09.26
    //        background-image: -moz-linear-gradient(top,#407099,#154060,#154060);
    //    background-image: -webkit-gradient(linear,left top,left bottom,from(#407099),color-stop(0.5,#154060),to(#154060));
    /*    var app = navigator.appName;
    var verStr = navigator.appVersion;
    if (app.indexOf("Netscape") != -1) {//FF
    tUI.style.backgroundImage = '-moz-linear-gradient(top,#407099,#154060,#154060)';
    //$("#saved").css("background-image", "-moz-linear-gradient(center top ,#eff3f7,#d6dbde)");
    }
    if (verStr.indexOf('Safari') != -1) { //safari
    tUI.style.backgroundImage = '-webkit-gradient(linear,left top,left bottom,from(#407099),color-stop(0.5,#154060),to(#154060))';
    // $("#saved").css("background-image", "-webkit-gradient(linear, left top,right top, from(#eff3f7), to(#d6dbde))");
    }
    b.style.width="48px";b.style.height="32px";b.style.border="0px";b.style.background="url(images/back.png)";
    */
    //1111    tUI.style.background = 'url(images/back.png)';
    tUI.style.textAlign = 'center';
    tUI.style.cursor = 'pointer';
    //tUI.style.marginTop = '19px';
    //tUI.style.marginLeft = '2px';
    //tUI.style.paddingTop = '5px';
    tUI.style.zIndex = '300';
    //tUI.style.color = 'white';
    tUI.id = 'backonMap';
    //tUI.innerHTML('Main');
    //tUI.innerHTML('<div id="bkd1"><div id="bkd2"></div><div id="bkd33"><a>Main</a></div></div>');
    typeDiv.appendChild(tUI);
    google.maps.event.addDomListener(tUI, 'click', function () {
        ////debugger;
        $("#backonMap a").css('-webkit-transform', 'rotate(-180deg) scale(3)');
        setTimeout("$('#backonMap a').css('-webkit-transform', 'rotate(-90deg) scale(3)')", 500);
        // return;
        if (hisw) {
            try {
                TimeStamp();
                mapEve = true;
                //alert(mapEve);
                setTimeout("mapEve=false;", 500);
                //console.log("back---" + mapEve);
                click_back();
            } catch (e) { catche(e); }
        }
    });

    //document.write("Main");
    //var tbom = setInterval('$("#backonMap").html("Main");', 500);
    //var tbom = setInterval('$("#backonMap").html(\'<div id="bkd2"></div><div id="bkd33"><a>S</a></div>\');', 50);
    //var tbom = setInterval('$("#backonMap").html(\'<div id="bomdiv"><a>S</a></div>\');', 50);
    var tbom = setInterval(function () {
        if (!$("#backonMap").html()) {
            $("#backonMap").html('<a>S</a>');
            $("#backonMap").css("border", "4px solid white");
        }
        else {
            clearInterval(tbom);
        }
    }, 50);
    // var tbom = setInterval('$("#backonMap").css("border","4px solid white")', 50);
    //var tbom = setInterval('$("#backonMap").html(\'<a>S</a>\');$("#backonMap").css("border","4px solid white")', 50);
    //setTimeout('clearInterval(' + tbom + ');', 5000); //30s后清除，如果出问题，可注释
    /* google.maps.event.addDomListener(tUI, 'click', function () {
    click_back();
    });
    */
    //    google.maps.event.addDomListener(tUI, 'mouseover', function () {
    //        showBack("backonMap");
    //    });

    //    google.maps.event.addDomListener(tUI, 'mouseout', function () {
    //        hideBack("backonMap");
    //    });
}
//#endregion
//#region center
var Tsi8995;
function centerControl(centerControlDiv, map) {
    var tUI = document.createElement('div');
    var hei = $("#map_canvas").height() / 2;
    tUI.style.width = '30px'; //24
    tUI.style.height = '30px'; //24
    //tUI.style.opacity = '01';
    tUI.style.border = '0px';
    //tUI.style.marginTop = '103px';
    //    tUI.style.background = 'url(images/cross3.PNG)';
    //tUI.style.cursor = 'pointer';
    tUI.id = 'centerMap';
    AddPlus();
    centerControlDiv.appendChild(tUI);
}

function AddPlus() {
    if (!$("#centerMap").html()) {
        $("#centerMap").html("+");
        var wid = $("#map_canvas").width() / 2;
        var left = wid - 15;
        $("#centerControlDiv").css("margin-left", left + "px");
        Tsi8995 = setTimeout('AddPlus();', 500);
    }
    else {
        clearTimeout(Tsi8995);
    }

}



/*
function centerControl(centerControlDiv, map) {
var tUI = document.createElement('div');
var hei = $("#map_canvas").height() / 2;
tUI.style.width = '30px'; //24
tUI.style.height = '30px'; //24
tUI.style.opacity = '01';
tUI.style.border = '0px';
//tUI.style.marginTop = '103px';
tUI.style.background = 'url(images/cross3.PNG)';
tUI.style.cursor = 'pointer';
tUI.id = 'centerMap';
centerControlDiv.appendChild(tUI);
google.maps.event.addDomListener(tUI, 'click', function () {  //2011.10.08
//alert(latLngControl.updatePosition());
//cross();
//debugger;
if (over5357) {
zoom101();
}
});
}*/
function cross() {
    //setTimeout('$("#tools").height(0);$("#tool,#tools").hide();', 1);
    //bhi = true;
    //debugger;
    if ($("#cross").is(":visible")) {
        $("#cross").css('-webkit-transform', 'scale(0)');
        setTimeout('closecross()', 400);
    }
    else {
        //$("#cross").html('<br><br><div id="c"><div class="cross" onclick="c1()" id="c1">Use as current location</div><div class="cross" onclick="c2()" id="c2">Share this location</div><div class="cross"  onclick="c3()" id="c3">Save this location</div></div><div onclick="closecross()" id="closecross"><span class="chahao">×</span></div><div onclick="closecross()" id="closecross1"><span class="chahao">×</span></div>');
        //$("#cross").html('<br><span id="al" onclick="al()">Auto Location</span><br><br><div id="c"><span class="tip">Use center as</span><div class="cross" onclick="c1()" id="c1"> Current Location</div><span class="tip1">or</span><div class="crossit"  onclick="c3()" id="c3">Save it</div><div class="crossit" onclick="c2()" id="c2">Share it</div></div><div onclick="zoom101()" class="close" id="closecross"><span class="chahao">×</span></div>');
        //2012.04.16        $("#cross").html('<br><div id="c"><div class="cross" onclick="c1()" id="c1"> Use center as Current Location</div><br><span id="al" onclick="al()">Restore Auto Location</span><div class="crossit"  onclick="c3()" id="c3">Save</div><div class="crossit" onclick="c2()" id="c2">Share</div></div><div onclick="zoom101()" class="close" id="closecross"><span class="chahao">×</span></div>');
        //$("#cross").html('<br><br><br><div id="c"><span class="tip">Use center as</span><div class="cross" onclick="c1()" id="c1"> Current Location</div><span class="tip1">or</span><div class="crossit"  onclick="c3()" id="c3">Save it</div><div class="crossit" onclick="c2()" id="c2">Share it</div></div><div onclick="zoom101()" class="close" id="closecross"><span class="chahao">×</span></div>');
        //$("#cross").html('<br><br><br><div id="c"><span class="tip">Use center as</span><div class="cross" onclick="c1()" id="c1"> Current Location</div><span class="tip1">or</span><div class="crossit"  onclick="c3()" id="c3">Save it</div><div class="crossit" onclick="c2()" id="c2">Share it</div></div><div id="closecross"><button type="button" onclick="closecross()" class="specialkey backspace">B</button></div>');Use center as Current Location

        $("#cross").html('<br><div id="c"><div class="cross" onclick="c1()" id="c1">  Set   &nbsp;&nbsp;&nbsp; &nbsp;<img src="../images/cross3.png">&nbsp; as Current Location</div><br><span id="al" onclick="al()">Restore Auto Location</span></div><div id="closeTab" style="top:120px;"><div onclick="zoom101(1)" class="close left" id="closecross"><span class="chahao">×</span></div><div onclick="c2()" class="left" id="c2">Share</div><div class="left" onclick="c3()" id="c3">Save</div><div onclick="zoom101(2)" class="close right" id="closecross0"><span class="chahao">×</span></div></div>');
        //$("#cross").css('-webkit-transform', 'scale(0)');
        $("#cross").show();
        setTimeout("$('#cross').css('-webkit-transform', 'scale(1)')", 100);
        if ((gpsState == 0 || !isallowgps) && !activing) {
            $("#al").hide();
            $("#c1").css('margin-top', '0px');
            $("#c").height(72);
        }
        // $("#closecross0").hide();
        // $("#SearchIcon").css('left', '270px');
        if (closeLR == "L") {
            $("#closecross0").html('');
            $("#closecross0").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        }
        else {
            $("#closecross").html('');
            $("#closecross").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        }

        /*if (verStr.indexOf("Version/5.0") != -1) {
        $('#cross').css('background-image', 'url("images/dot.png")');
        $('#cross').css('background-repeat', 'repeat');
        $('#cross').css('background-position', 'top left, top right');
        $('#cross').css('background-size', '10px');
        $('#cross').css('-webkit-background-size', '10px');
        }
        addbgcolor('cross');*/
    }
    stopGPS(2);
    //testtools();
}
function al() {
    gpsState = 0;
    testMyGPS();
    if (monitor.gps(newGPS)) {
        map.panTo(newGPS);
    }
    //alert(hisw + "***" + keywords);
    cross3();
    setTimeout(function () {
        if (hisw && keywords != "none") {
            clearTimeout(t1);
            $('#inMapMsg,#cmm').show();
            $('#inMapMsg').html("<center><span onclick='reSearch();' id='res'><font color=blue class='button1'>Research?</font></span></center>");
            t1 = setTimeout("$('#inMapMsg,#cmm').hide()", 5000);
        }
    }, 450);

}
function closecross() {
    $("#centerMap").css('-webkit-transform', 'scale(1)');
    //ssetTimeout('$("#centerControlDiv").hide()', 500);
    $("#centerControlDiv").hide();
    $("#cross").hide();
    // hideisearch(2);
    clearInterval(cb);
    //testtools();
}
function zoom101(x) {
    try {
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
    //$("#centerControlDiv").css({ "top": "8px !important", "right": "8px !important" });
    //setTimeout('$("#centerControlDiv").css({"top": "115px !important", "right": "150px !important","-webkit-transform": "rotate(120deg)"});zoom10();', 200);
    $("#centerControlDiv").css({ "right": "150px !important", "-webkit-transform": "rotate(120deg)" });
    //$("#centerMap")
    //$("#centerControlDiv").show();
    setTimeout('$("#centerControlDiv").css({ "right": "8px !important","-webkit-transform": "rotate(0deg)"})', 200);
    $("#centerMap").css('-webkit-transform', 'scale(1)');
    // setTimeout('closecross();', 200);
    $("#cross").css('-webkit-transform', 'scale(0)');
    setTimeout('closecross()', 400);
    //$("#SearchIcon").css('left', '145px');

}
//#endregion

/*
function editgpsmap() {
mapdiv.onmousedown = function () {
add();
}
//自加计时
var mapdivt = 0;
var mapdivt1;
function ad() {
mapdivt1 = setInterval('++mapdivt', 500);
}
document.getElementById("map_canvas").onmouseup = function () {
if (mapdivt < 2) {
clearInterval(mapdivt1);
mapdivt = 0;
}
}
function da() {
if (mapdivt > 1) {
GPSControl();
clearRoadend();
clearInterval(mapdivt1);
mapdivt = 0;
}
}*/
//}

//#region 飘动的缩放键
function BottomControl10(bottomDiv, map) {
    bottomDiv.style.padding = '0px';
    bottomDiv.style.Top = '0px'
    var rUI = document.createElement('div');
    rUI.style.width = '30px';
    rUI.style.height = '30px';
    rUI.style.opacity = '0';
    //rUI.style.textAlign = 'middle';
    rUI.style.marginLeft = '5px';
    rUI.style.marginTop = '-25px';
    rUI.style.textAlign = 'center';
    rUI.style.background = 'url(images/zoomin.png)';
    rUI.id = "zoominmapfly";
    rUI.style.zIndex = '300';
    rUI.style.color = 'white';
    bottomDiv.appendChild(rUI);
}
function BottomControl20(bottomDiv, map) {
    var rUI1 = document.createElement('div');
    rUI1.style.width = '30px';
    rUI1.style.height = '30px';
    rUI1.style.marginLeft = '5px';
    rUI1.style.marginTop = '-55px';
    rUI1.style.background = 'url(images/zoomout.png)';
    rUI1.style.opacity = '0';
    rUI1.id = "zoomoutmapfly";
    bottomDiv.appendChild(rUI1);
}
//#endregion

function switchLR() {
    //debugger;
    if (closeLR == "R") {
        /*$("#zoominmapfly,#zoomoutmapfly").css("opacity", "0.8");
        $("#flyIn,#flyOut").css({ 'left': '', 'right': '0px' });*/
        $("#zoominmap").css('opacity', '0.1');
        $("#zoomoutmap").css('opacity', '0.1');
        $("#zoominmapR").css('opacity', '1');
        $("#zoomoutmapR").css('opacity', '1');
        /*
        $("#zoominmap").css('background-image', 'none');
        $("#zoomoutmap").css('background-image', 'none');
        $("#zoominmapR").css('background-image', 'url(images/zoomin.png)');
        $("#zoomoutmapR").css('background-image', 'url(images/zoomout.png)');*/
    }
    else {
        $("#zoominmapR").css('opacity', '0.1');
        $("#zoomoutmapR").css('opacity', '0.1');
        $("#zoominmap").css('opacity', '1');
        $("#zoomoutmap").css('opacity', '1');
        /*
        $("#zoominmapR").css('background-image', 'none');
        $("#zoomoutmapR").css('background-image', 'none');
        $("#zoominmap").css('background-image', 'url(images/zoomin.png)');
        $("#zoomoutmap").css('background-image', 'url(images/zoomout.png)');*/
    }
}
//#region  放大L
function BottomControl(bottomDiv, map) {
    bottomDiv.style.padding = '0px';
    bottomDiv.style.Top = '0px'
    var rUI = document.createElement('div');
    //    rUI.style.width = '30px';
    //    rUI.style.height = '30px';
    //rUI.style.opacity = '0.8';
    //rUI.style.textAlign = 'middle';
    rUI.style.marginLeft = '5px';
    //rUI.style.marginTop = '65px';
    rUI.style.textAlign = 'center';
    //    rUI.style.background = 'url(images/zoomin.png)';
    //if (closeLR == "R") {
    //    rUI.style.opacity = '0.1';
    //}
    rUI.id = "zoominmap";
    rUI.style.zIndex = '300';
    rUI.style.color = 'white';
    bottomDiv.appendChild(rUI);
    //var tbom1 = setInterval('$("#zoominmap").html(\'<a>+</a>\');$("#zoominmap").css("border","4px solid white")', 50);
    var tbom1 = setInterval(function () {
        if (!$("#zoominmap").html()) {
            $("#zoominmap").html('<a>+</a>');
            $("#zoominmap").css("border", "4px solid white");
        }
        else {
            clearInterval(tbom1);
        }
    }, 50);
    //setTimeout('clearInterval(' + tbom1 + ');', 5000);
    google.maps.event.addDomListener(rUI, 'click', function () {
        $("#zoominmap").css('opacity', '0.8');
        setTimeout("$('#zoominmap').css('opacity', '0.3')", 400);
        //_clicktimesR = 0;
        //_clicktimes++;
        //changeO('l');
        zoom2();
        /*  try {
        var excloseLR;
        excloseLR = closeLR;
        closeLR = "L";
        if (excloseLR != closeLR) {
        switchLR();
        config = storage.getItem("config");
        config = config.split(';');
        config[0] = "closeLR:" + closeLR;
        config = config.join(';');
        storage.setItem("config", config);
        }

        } catch (e) { catche(e); }*/
    });
}
//#endregion

//#region 缩小L
function BottomControl2(bottomDiv, map) {
    var rUI1 = document.createElement('div');
    //    rUI1.style.width = '30px';
    //    rUI1.style.height = '30px';
    //
    //rUI.style.textAlign = 'middle';
    rUI1.style.marginLeft = '5px';
    //rUI1.style.marginTop = '45px';
    //    rUI1.style.background = 'url(images/zoomout.png)';
    //if (closeLR == "R") {
    //    rUI1.style.opacity = '0.8';
    //}
    rUI1.id = "zoomoutmap";
    bottomDiv.appendChild(rUI1);
    //var tbom2 = setInterval('$("#zoomoutmap").html(\'<a>-</a>\');$("#zoomoutmap").css("border","4px solid white")', 50);
    //setTimeout('clearInterval(' + tbom2 + ');', 5000);
    var tbom2 = setInterval(function () {
        if (!$("#zoomoutmap").html()) {
            $("#zoomoutmap").html('<a>-</a>');
            $("#zoomoutmap").css("border", "4px solid white");
        }
        else {
            clearInterval(tbom2);
        }
    }, 50);
    google.maps.event.addDomListener(rUI1, 'click', function () {
        //        $("#zoomoutmap").css('-webkit-transform', 'scale(0.7)');
        //        setTimeout("$('#zoomoutmap').css('-webkit-transform', 'scale(1)')", 100);
        $("#zoomoutmap").css('opacity', '0.8');
        setTimeout("$('#zoomoutmap').css('opacity', '0.3')", 400);
        //_clicktimesR = 0;
        //_clicktimes++;
        //changeO('l');
        zoom4();
        /*        try {
        var excloseLR;
        excloseLR = closeLR;
        closeLR = "L";
        if (excloseLR != closeLR) {
        switchLR();
        config = storage.getItem("config");
        config = config.split(';');
        config[0] = "closeLR:" + closeLR;
        config = config.join(';');
        storage.setItem("config", config);
        }

        } catch (e) { catche(e); }*/
    });
}
//#endregion

//#region  放大R
//点击计数
var _clicktimes = 0;
var _clicktimesR = 0;
function BottomControlR(bottomDiv, map) {
    bottomDiv.style.padding = '0px';
    bottomDiv.style.Top = '0px'
    var rUI = document.createElement('div');
    rUI.style.width = '30px';
    rUI.style.height = '30px';
    //rUI.style.opacity = '0.8';
    //rUI.style.textAlign = 'middle';
    rUI.style.marginRight = '5px';
    rUI.style.marginTop = '-25px';
    rUI.style.textAlign = 'center';
    rUI.style.background = 'url(images/zoomin.png)';
    if (closeLR == "L") {
        rUI.style.opacity = '0.1';
    }
    rUI.id = "zoominmapR";
    rUI.style.zIndex = '300';
    rUI.style.color = 'white';
    bottomDiv.appendChild(rUI);
    google.maps.event.addDomListener(rUI, 'click', function () {
        _clicktimes = 0;
        _clicktimesR++;
        changeO('r');
        zoom2();
        try {
            var excloseLR;
            excloseLR = closeLR;
            closeLR = "R";
            if (excloseLR != closeLR) {
                switchLR();
                config = storage.getItem("config");
                config = config.split(';');
                config[0] = "closeLR:" + closeLR;
                config = config.join(';');
                storage.setItem("config", config);
            }

        } catch (e) { catche(e); }
    });
}
//#endregion

//#region 缩小R
function BottomControl2R(bottomDiv, map) {
    var rUI1 = document.createElement('div');
    rUI1.style.width = '30px';
    rUI1.style.height = '30px';
    //rUI.style.opacity = '0.8';
    //rUI.style.textAlign = 'middle';
    rUI1.style.marginRight = '5px';
    rUI1.style.marginTop = '-55px';
    rUI1.style.background = 'url(images/zoomout.png)';
    if (closeLR == "L") {
        rUI1.style.opacity = '0.1';
    }
    rUI1.id = "zoomoutmapR";
    bottomDiv.appendChild(rUI1);
    google.maps.event.addDomListener(rUI1, 'click', function () {
        _clicktimes = 0;
        _clicktimesR++;
        changeO('r');
        zoom4();
        try {
            var excloseLR;
            excloseLR = closeLR;
            closeLR = "R";
            if (excloseLR != closeLR) {
                switchLR();
                config = storage.getItem("config");
                config = config.split(';');
                config[0] = "closeLR:" + closeLR;
                config = config.join(';');
                storage.setItem("config", config);
            }

        } catch (e) { catche(e); }
    });
}
//#endregion

function changeO(lr) {

    if (_clicktimes > 3 || _clicktimesR > 3) {
        if (lr == "l") {
            $("#zoominmap,#zoomoutmap").css('opacity', '0.3');
        }
        else {
            $("#zoominmapR,#zoomoutmapR").css('opacity', '0.3');
        }
    }
}

//#region 点击显示工具栏
function BottomControl22(bottomDiv, map) {
    var tUI = document.createElement('div');
    tUI.style.width = '60px';
    tUI.style.opacity = '0.7';
    tUI.style.paddingLeft = '0px';
    tUI.style.paddingRight = '0px';
    tUI.style.marginLeft = '-90px';
    //            tUI.style.position = 'absolute';
    //            tUI.style.zIndex = '5000';
    //            tUI.style.top = '-30px';
    tUI.id = 'down';
    tUI.style.border = '0px';
    tUI.style.background = 'url(images/down_orange.png)';
    //bottomDiv.appendChild(tUI);

    google.maps.event.addDomListener(tUI, 'click', function () {
        clearhide();
    });

}
//#endregion

/*/#region 半透明效果
function showBack(id) {
document.getElementById(id).style.opacity = '1';
}
function hideBack(id) {
document.getElementById(id).style.opacity = '0.6';
}
function hideBack1(id) {
$("#" + id).hide();
}
//#endregion*/

//#region 监视GPS
var watchID
var gpschange = "";
// get gps location. use 'watchPosition' is much accurate then 'getCurrentPosition'.
// you guy my try to find better solutin for it.
function watchgps(x) {
    try {
        //alert('watchgps');
        setTimeout("killwatchGPS();", 2500);
        if (x == '3') {
            watchId = navigator.geolocation.watchPosition(
            // GetLoGPS,
        scrollMap1,
            //   alert((new Date).getSeconds()),
        onError,
     { enableHighAccuracy: true, timeout: 2000 }
     );
        }
        else {
            watchId = navigator.geolocation.watchPosition(
            // GetLoGPS,
        scrollMap,
            //   alert((new Date).getSeconds()),
        onError,
     { enableHighAccuracy: true, timeout: 5000}//2012.01.14  6-》5
     );
        }
        //gpschange = '';
        watchID = watchId;
        setTimeout("stopwatchGPS('" + watchId + "','" + x + "'); killwatchGPS();", 2500);
    } catch (e) { catche(e); }
}
function GetLoGPS(pos) {
    alert((new Date).getSeconds());
}
//#region scrollMap  在得到新的GPS位置后自动平移到GPS位置
// automatically pan to GPS position after get new GPS location
var newGPS;
function scrollMap(pos) {
    //alert(6922);
    if (gpsState != 0) {
        return;
    }
    //alert((new Date).getSeconds());
    if (newgps != pos) {
        //gpschange = 'yes';
        clearMarkGPS();
        // alert(position1.coords.accuracy);
        if (map.getZoom() >= 17 && map.getMapTypeId() == 'hybrid') {
            map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
            map.setZoom(15);
        }
        newGPS = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

        gpsMaker = new google.maps.Marker({
            position: newGPS,
            icon: gpsicon,
            map: map
        });
        /*if (monitor.gps(newGPS)) {
        map.panTo(newGPS);
        }*/
        addClicktoMarker(gpsMaker, newGPS);
        markerGPS.push(gpsMaker);
        gps = pos.coords.latitude + "," + pos.coords.longitude;
        newgps = newGPS;
    }
}
function scrollMap1(pos1) {
    //alert(6722);
    if (gpsState != 0) {
        return;
    }
    //alert((new Date).getSeconds());
    //alert(newgps != pos);
    if (newgps != pos1) {
        /*  //gpschange = 'yes';
        clearMarkGPS();
        // alert(position1.coords.accuracy);
        if (map.getZoom() >= 17 && map.getMapTypeId() == 'hybrid') {
        map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        map.setZoom(15);
        }

        var marker = new google.maps.Marker({
        position: newGPS,
        icon: gpsicon,
        map: map
        });
        /*if (monitor.gps(newGPS)) {
        map.panTo(newGPS);
        }*
        addClicktoMarker(marker, newGPS);
        markerGPS.push(marker);*/
        newGPS = new google.maps.LatLng(pos1.coords.latitude, pos1.coords.longitude);
        gps = pos1.coords.latitude + "," + pos1.coords.longitude;
        newgps = newGPS;
        //console.log(newgps);
        //alert(6748);
        //alert(exgpsstate);
        if (exgpsstate == 1) {
            clearMarkGPS();
            if (map.getZoom() >= 17 && map.getMapTypeId() == 'hybrid') {
                map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
                map.setZoom(15);
            }
            gpsMaker = new google.maps.Marker({
                position: newgps,
                icon: gpsicon,
                map: map
            });
            try {
                clearMarkGPS();
                markerGPS.push(gpsMaker);
                addClicktoMarker(gpsMaker, newGPS);
                markerGPS.push(gpsMaker);
            }
            catch (e) {
                console.log(e);
                //alert(e);
            }
            exgpsstate = 0;
        }
        //alert(newGPS);
    }
}
//#endregion
/*过时功能
function GPSControl() {
if (hisw) {
if ($("#GPSControl").is(":visible")) {
$("#GPSControl").hide();
$("#GPSinfoword").hide();
google.maps.event.clearListeners(map, 'click');
}
else {
$("#tools").hide();
$("#GPSControl,#GPSinfoword").show();
$("#reSearch").hide();
$("#gpsinfowords").html("Tap on map to modify GPS location.");
GPSModify();
}
}
}
*/
function GPSModify() {
    //    navigator.geolocation.getCurrentPosition(scrollMap, { enableHighAccuracy: true, maximumAge: 0 });
    jumpTo(0);
    clearOverlays();
    clearMarkGPS();
    /*google.maps.event.addListener(map, 'click', function (event) {
    if (markersArray1) {
    for (i in markersArray1) {
    markersArray1[i].setMap(null);
    }
    }
    clearMarkGPS();
    var marker = new google.maps.Marker({
    position: event.latLng,
    icon: gpsicon,
    map: map
    });
    markerGPS.push(marker);
    newgps = event.latLng;
    addClicktoMarker(marker, newgps);
    var newgps2;
    //newgps2 = newgps.toString();
    newgps2 = "" + newgps;
    gps = newgps2.replace("(", "");
    gps = gps.replace(")", "");
    gpschange = 'yes';
    $("#gpsinfowords").html("<font color=tomato>GPS location changed.</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:;' class='button' style='color:blue;' onclick='saveLocation()'>Quick Save</a>");
    if (keywords != 'none' && gpschange == 'yes') {
    //$('#reSearch').show();
    }
    });*/
}
//#endregion
//#region   stopwatchGPS
function killwatchGPS() {
    // //debugger;
    try {
        if (watchID) {
            navigator.geolocation.clearWatch(watchID);
        }
    } catch (e) { catche(e); }
}
function stopwatchGPS(wid, x) {
    //alert('stopwatchGPS');
    if (hisw) {
        if (wid == "") { wid = watchID; }
        if (wid != "") {
            navigator.geolocation.clearWatch(wid);
        }
        if (gpsState != 0) {
            return;
        }
        try {
            ////debugger;
            if (x == "initialize") {
                getbound();
                gpsLock = false;
            }
            else if (x == '3') {
                /*if (monitor.gps(newGPS)) {
                map.panTo(newGPS);
                }*/
                getbound(3, newGPS);
            }
            else {
                getbound(2, newGPS);
            }
            //alert(seachpara);
            //alert(seachpara.indexOf('￥'));
            if (seachpara.indexOf('￥') != -1) {
                seachpara = seachpara.split('￥');
            }
            //alert(("" + oldGps) + "\r\n" + ("" + newGPS));
            //if ("" + oldGps != "" + newGPS) {
            gpschange = '';
            ////debugger;
            if (seachtime < 1 && x != '3') {
                if (searvar) {
                    searvar = searvar.split(';');
                    clickSearch(searvar[0], searvar[1], searvar[2], searvar[3], searvar[4]);
                }
            }
            else if (oldGps && newGPS && ("" + oldGps != "" + newGPS)) {
                gpschange = 'yes';
                /*userStatu = 1;
                clearInterval(si9916);
                si9916 = setInterval('testMyGPS()', 5000);*/
                if (x == '3') {
                    //alert(6877);
                    oldGps = newGPS;
                    clearMarkGPS();
                    /*if (map.getZoom() >= 17 && map.getMapTypeId() == 'hybrid') {
                    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
                    map.setZoom(15);
                    }*/
                    gpsMaker = new google.maps.Marker({
                        position: newGPS,
                        icon: gpsicon,
                        map: map
                    });
                    markerGPS.push(gpsMaker);
                    addClicktoMarker(gpsMaker, newGPS);
                    markerGPS.push(gpsMaker);
                }
                else {
                    if (keywords != "" && keywords != 'none' && keywords != 'dic$' && hisw && seachtime > 1) {//有关键字、在地图页、非第一次搜索
                        clearTimeout(t1);
                        $('#inMapMsg').html("<span id='inMapMsg1'></span>");
                        //alert(gpschange);
                        $('#inMapMsg1').html("<center><span onclick='reSearch();'><font color=blue class='button1'>Re-search</font></span></center>");
                        t1 = setTimeout("$('#inMapMsg,#cmm').fadeOut()", 4000);
                        $('#inMapMsg,#cmm').fadeIn();
                        if (monitor.gps(newgps)) {
                            map.panTo(newgps);
                            //console.log("stopwatchGPS");
                        }
                    }
                    //alert(4119+gpschange);
                    if (seachpara[1] == 'Nearby' || seachtime < 1) {
                        //nearby、第一次搜索
                        //alert('oldGps;' + oldGps + "   newGPS:" + newGPS);
                        //#region 计算差值
                        //a为经度 b为纬度
                        var R = 6378.137;
                        aa1 = $.trim(convertGPS(oldGps, 'a'));
                        bb1 = $.trim(convertGPS(oldGps, 'b'));

                        aa2 = $.trim(convertGPS(newGPS, 'a'));
                        bb2 = $.trim(convertGPS(newGPS, 'b'));

                        aa1 = convertH(aa1);
                        aa2 = convertH(aa2);
                        bb1 = convertH(bb1);
                        bb2 = convertH(bb2);

                        var D = R * Math.acos(Math.cos(bb1) * Math.cos(bb2) * Math.cos(aa1 - aa2) + Math.sin(bb1) * Math.sin(bb2));
                        //alert(D * 1000);
                        if (D * 1000 > 50) {
                            $('#inMapMsg,#cmm').fadeOut();
                            oldGps = newGPS;
                            reSearch(x);
                        }
                        else {
                            if (hisw && !researching && keywords == 'none') {
                                gpschange = '';
                                $('#inMapMsg').html("<span id='inMapMsg1'></span>");
                                setTimeout('$("#inMapMsg1").html("<center>no change</center>")', 1000);
                                $('#inMapMsg,#cmm').fadeIn();
                                t1 = setTimeout("$('#inMapMsg,#cmm').fadeOut()", 4000);
                            }
                        }
                        //#endregion
                    }
                }
            }
            /*else {
            userStatu = 0;
            clearInterval(si9916);
            si9916 = setInterval('testMyGPS()', 15000);
            }*/
            //alert(userStatu);
            //var myDate = new Date();
            //console.log(myDate.getSeconds() + "~~" + gpschange + "~~" + oldGps + "~~" + newGPS);
        } catch (e) { catche(e); }
    }
}
function convertH(d) {
    try {
        var x = Math.PI / 180;
        //alert("d:" + d + " x:" + x + " re:" + x * d);
        return x * d;
    } catch (e) { catche(e); }
}
//#endregion


//#region for 'Quick Save' feathere
// system allow user to point a mark on map, save it with a secure code. other people and find this point by searching the secure code. 
function clearSaveLocationArea() {
    $("#insideMsg1").html("");
    $("#saveLocationCode").val("");
    $("#saveLocation").hide();
    $("#GPSControl").hide();
    $("#GPSinfoword").hide();
    google.maps.event.clearListeners(map, 'click');
}

function saveLocation(a) {
    if (a == null) {
        $('#saveLocation').show();
        $("#saveLocationCode").focus();
    }
    else {
        var val = "@" + $('#' + a + "Code").val();
        var mg = $('#' + a + "Notes").val();
        var p = "0000";
        $.ajax({
            url: 'Handler/Login.ashx',
            type: 'POST',
            data: { saveLocations: 1, a: val, g: newgps.toUrlValue(7), b: p, m: mg },
            success: sl
        });
    }
}
var t;
function sl(info) {
    if (info == "True") {
        $("#insideMsg1").html("saved for a week.");
        t = setTimeout("clearSaveLocationArea();", 2000);
        $("#saveLocationNotes").val("");
    }
    else {
        $("#insideMsg1").html("please choose another code.");
    }
}
//#endregion

//#region  修改地图
// for modify GPS position by left/right/up/down button.
function setmap(t) {
    var gpsLatLng = gps.split(",");
    var add;
    if (map.getZoom() <= 15) {
        add = 0.0002;
    }
    else {
        add = 0;
    }
    var aLat;
    var aLng;
    if (t == "r") {
        aLat = 0;
        aLng = 0.0001 + add;
    }
    if (t == "l") {
        aLat = 0;
        aLng = -0.0001 - add;
    }
    if (t == "u") {
        aLat = 0.0001 + add;
        aLng = 0;
    }
    if (t == "d") {
        aLat = -0.0001 - add;
        aLng = 0;
    }
    gpschange = 'yes';

    gpsLatLng[0] = parseFloat(gpsLatLng[0]) + parseFloat(aLat);
    gpsLatLng[1] = parseFloat(gpsLatLng[1]) + parseFloat(aLng);
    gps = gpsLatLng[0] + "," + gpsLatLng[1];
    var moveto = new google.maps.LatLng(gpsLatLng[0], gpsLatLng[1]);

    clearMarkGPS();
    var marker = new google.maps.Marker({
        position: moveto,
        icon: gpsicon,
        map: map
    });
    markerGPS.push(marker);
    newgps = moveto;
    addClicktoMarker(marker, newgps);
    //document.getElementById("gpsinfowords").innerHTML = "<font color=tomato>GPS location changed.</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:;' style='color:blue;' class='button' onclick='saveLocation()'>Quick Save</a>";
    $("#gpsinfowords").html("<font color=tomato>GPS location changed.</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:;' style='color:blue;' class='button' onclick='saveLocation()'>Quick Save</a>");
    if (keywords != 'none' && gpschange == 'yes') {
        //document.getElementById('reSearch').style.display = 'block';
        //$('#reSearch').show();
    }
}

// if GPS position changed. save it as new GPS info.
function saveNewGPS() {
    clearOverlays1();
    clearMarkGPS();
    var marker = new google.maps.Marker({
        position: newgps,
        icon: gpsicon,
        map: map
    });

    markerGPS.push(marker);
    map.setCenter(newgps);
    addClicktoMarker(marker, newgps);
    google.maps.event.clearListeners(map, 'click');

    $("#gpsinfowords").html("<font color=tomato>GPS location changed.</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:;' style='color:blue;' class='button'  onclick='saveLocation()'>Quick Save</a>");

    // if GPS info changed and keywork is not empty. show 'Research'
    if (keywords != 'none' && gpschange == 'yes') {
        //$('#reSearch').show();
    }
}

//#endregion

var researching = false;
var G2GPSSearch = false;
var SearchGPS;
function reSearch(x, y) {
    //debugger;
    //    console.log("here00");00");
    G2GPSSearch = false;
    if (!!y) {
        G2GPSSearch = true;
    }
    if (keywords != 'none') {
        clearMarkGPS(1);
        SearchGPS = latLngControl.updatePosition();
        searchMaker = new google.maps.Marker({
            position: SearchGPS,
            icon: searchicon,
            map: map
        });


        try {
            sia.abort();
        } catch (e) { catche(e); }
        //    console.log("here00");01");

        if (x == '1') {
            $('#inMapMsg,#cmm').fadeOut();
        }
        else if (seachtime > 1) {
            $('#inMapMsg').html("<center><span id='resing'>Researching ...</span><center>");
            $('#inMapMsg,#cmm').fadeIn();
            t1 = setTimeout("$('#inMapMsg,#cmm').fadeOut()", 3000);
        }
        else {
            $('#inMapMsg,#cmm').fadeOut();
        }
        $('#page3_details').fadeOut();
        //    console.log("here00");02");
        oldGps = newGPS;
        researching = true;
        if (seachpara.indexOf('￥') != -1) {
            seachpara = seachpara.split('￥');
        }
        //    console.log("here00");03");

        click_search(seachpara[0], seachpara[1], seachpara[2], seachpara[3], seachpara[4], 'res');
        //alert(keywords);
        //        if (keywords != 'dic$') {
        //            click_search(keywords, null, null, null, 6, 'res');
        //        }
        //        else {
        //            //alert(seachpara);
        //            if (seachpara.indexOf('￥') != -1) {
        //                seachpara = seachpara.split('￥');
        //            }
        //            //seachpara = seachpara.split('￥');
        //            click_search(seachpara[0], seachpara[1], seachpara[2], seachpara[3], seachpara[4], 'res');
        //        }
        gpschange = '';
    }
}

//#region onError 事件
function onError() {
    gpschange = '';
}
//#endregion

//#region 检测浏览器
var mapdiv;
var useragent = navigator.userAgent;
//lert(screen.width+"*"+screen.height);
//alert(useragent + "$" + verStr);
function detectBrowser() {
    jumpTo(0);
    mapdiv = document.getElementById("map_canvas");
    //if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
    if (verStr.indexOf('iPhone') != -1 || verStr.indexOf('Android') != -1) {
        // set map size by phone's resolution
        // iPhone 3G/3GS is 640x480, iPhone 4 960x640, some Android phone is 800x480. 
        // setup different map size for best result.
        //alert(screen.width);
        /*  if (screen.width == 320) {
        mapdiv.style.width = '320px';
        //mapdiv.style.height = '255px';
        mapdiv.style.height = '255Apx';
        mapdiv.style.backgroundColor = '#efefef'
        }
        if (screen.width == 480) {
        mapdiv.style.width = '480px';
        mapdiv.style.height = '455px';
        }
        if (screen.width == 640) {
        mapdiv.style.width = '640px';
        mapdiv.style.height = '550px';
        }
        */
        mapdiv.style.width = '100%';
        mapdiv.style.height = '100%';
        if (gps.length < 1) {
            initialize();
        }
    }
    else {
        mapdiv.style.width = '100%';
        mapdiv.style.height = '100%';
        if (gps.length < 1) {
            initialize();
        }
    }


    // for "quick save" search
    // allow search by put quick search secure code in URL
    // for example http://www.ctycomputers.ca/gta/?@mycode
    var vars = window.location.href.slice(window.location.href.indexOf('?') + 1);
    if (vars.length >= 4 && vars.length <= 11) {
        if (vars.substr(0, 1) == '@') {
            keywords = vars;
            click_search(keywords, null, null, null, 1);
        }
    }

}
//#endregion

function zoom2() {
    bhi = false;
    clearhide();
    toTop();
    if ((SystemBuy[0] == true) && circlenumber["zoom2"] > 300) {
        if (circlenumber["zoom2"]) {
            circlenumber["zoom2"] = circlenumber["zoom2"] + 1;
        }
        else {
            circlenumber["zoom2"] = 1;
        }
        setTimeout('$("#zoom2").click()', 100);
        return;
    }
    else {
        circlenumber["zoom2"] = 0;
        mapStatus = false;
        stopGPS(1);
        zoomClick(1, null, '1');
    }
}
function zoom4() {
    bhi = false;
    clearhide();
    toTop();
    if ((SystemBuy[0] == true) && circlenumber["zoom4"] > 300) {
        if (circlenumber["zoom4"]) {
            circlenumber["zoom4"] = circlenumber["zoom4"] + 1;
        }
        else {
            circlenumber["zoom4"] = 1;
        }
        setTimeout('$("#zoom4").click()', 100);
        return;
    }
    else {
        circlenumber["zoom4"] = 0;
        mapStatus = false;
        stopGPS(1);
        zoomClick(2, true);
    }
}
//#region  点击工具事件
var stopgps = false; //停止获取gps
var circlenumber = [];
$("#zoom1,#zoom2").click(function () {//放大
    //// // // //  // //debugger;;!mapStatus ||
    bhi = false;
    clearhide();
    toTop();
    if ((SystemBuy[0] == true) && circlenumber["zoom2"] > 300) {
        if (circlenumber["zoom2"]) {
            circlenumber["zoom2"] = circlenumber["zoom2"] + 1;
        }
        else {
            circlenumber["zoom2"] = 1;
        }
        setTimeout('$("#zoom2").click()', 100);
        return;
    }
    else {
        circlenumber["zoom2"] = 0;
        mapStatus = false;
        stopGPS(1);
        zoomClick(1, null, '1');
    }
});
$("#zoom3,#zoom4").click(function () {//缩小!mapStatus ||
    bhi = false;
    clearhide();
    toTop();
    if ((SystemBuy[0] == true) && circlenumber["zoom4"] > 300) {
        if (circlenumber["zoom4"]) {
            circlenumber["zoom4"] = circlenumber["zoom4"] + 1;
        }
        else {
            circlenumber["zoom4"] = 1;
        }
        setTimeout('$("#zoom4").click()', 100);
        return;
    }
    else {
        circlenumber["zoom4"] = 0;
        mapStatus = false;
        stopGPS(1);
        zoomClick(2, true);
    }
});
//$("#zoom5,#zoom6").click(function () {
/*$("#zoom6").live('click', function () {//重新获取gps
try {
clearTimeout(t1);
//clearTimeout(te1);
} catch (e) { }
if (isallowgps) {//允许获取gps，则获取
resetGPS();
}
else {
$('#inMapMsg').html("Can't get current location<br>Click <img alt='zoomin' id='zoom11' src='images/cross1.PNG'> to set manually.");
//$('#inMapMsg').width(200);
$('#inMapMsg,#cmm').fadeIn();
t1 = setTimeout("$('#inMapMsg,#cmm').fadeOut();", 3000);
//te1 = setTimeout("$('#inMapMsg').width(138);", 4000);
}
});*/
var exj;
$("#zoom7,#zoom8").click(function () {//红旗!mapStatus ||
    bhi = false;
    clearhide();
    toTop();
    if ((SystemBuy[0] == true) && circlenumber["zoom8"] > 300) {
        if (circlenumber["zoom8"]) {
            circlenumber["zoom8"] = circlenumber["zoom8"] + 1;
        }
        else {
            circlenumber["zoom8"] = 1;
        }
        setTimeout('$("#zoom8").click()', 100);
        return;
    }
    else {
        circlenumber["zoom8"] = 0;
        mapStatus = false;
        stopGPS(1);
        if (newgps != "") {
            //        var x = ("" + newgps).split(',');
            //        var xt = x[0].split('(')[1];
            //        var xg = x[1].split(')')[0];
            //#region 修改红旗放大逻辑 2011.10.25   
            //#region 判断是否居中
            flag();
            //#endregion   
            //        map.panTo(newgps);
            //        zoomClick(1);
            //#endregion
            //centerwithGPS(xt, xg);
        }
    }
});
$("#zoom9").click(function () {
    if (SystemBuy[0] == true) {//!mapStatus ||
        setTimeout('$("#zoom9").click()', 100);
        return;
    }
    else {
        //mapStatus = false;
        click_back();
        $("#keywords2").focus();
    }
    //    if (verHistory.length > 1) {
    //        $("#tb_search").show();
    //    }
});
var homeType = true; //home键图片/点击事件
$("#zoom12").click(function () {
    if (!opentools && !homeType) {
        $("#keywords2").val('');
        click_back();
        $("#keywords2").focus();
    }
    else {
        click_back();
    }
});
//var iscanbeclose = true;
//$("#zoom101").click(function (event) {//十字
//    //alert(iscanbeclose);
//    //alert(1);
//    //if (iscanbeclose) {
//    stopGPS(1);
//    if ($("#cross").is(":visible")) {
//        //alert(2);
//        closecross();
//       // iscanbeclose = false;
//      //  setTimeout('iscanbeclose=true;', 1000);
//    }
//    else {
//        //alert(3);
//        tocross();
//        //iscanbeclose = false;
//     //   setTimeout('iscanbeclose=true;', 1000);
//    }
//    // }
//    //dis(event);
//});!mapStatus ||
$("#zoom11").live('click', function () {
    if (SystemBuy[0] == true) {
        setTimeout('$("#zoom11").click()', 100);
        return;
    }
    else {
        //mapStatus = false;
        stopGPS(1);
        if (!($("#cross").is(":visible"))) {
            tocross();
        }
    }
});
function tocross() {
    $("#centerControlDiv").show();
    $("#inMapMsg,#cmm").hide();
    try {
        clearTimeout(t1);

    } catch (e) { catche(e); }
    document.getElementById('centerMap').style.opacity = '1';
    //$("#centerMap").css('border', '1px solid green');
    cross();
    //debugger;
    cb = setInterval('changeBorder1("centerMap");', 600);
}
var zoom10time = 0;
var position1 = true;
function zoom10() {
    if (iPhoneOrientation == 90) {
        $('#centerControlDiv').css({ 'left': '225px !important' });
    }
    ////!mapStatus ||
    /*if (position1) {
    var hei = $("#map_canvas").height() / 2;
    document.getElementById("centerControlDiv").style.top = (hei - 17) + 'px';
    position1 = false;
    }*/
    if (SystemBuy[0] == true) {
        zoom10time++;
        if (zoom10time > 10) {
            //loadingmap();
        }
        setTimeout('$("#zoom10").click()', 100);
        return;
    }
    else {
        //loadingmap('over');
        //debugger;
        stopGPS(1);
        if ($("#cross").is(":visible")) {
            //alert(2);
            st5090 = setTimeout('$("#toolInMap").css("opacity", "0.1")', 2000);
            $("#centerMap").css('-webkit-transform', 'scale(1)');
            //$("#cross").css('-webkit-transform', 'scale(0)');
            //setTimeout('closecross()', 400);
            closecross();
            // iscanbeclose = false;
            //  setTimeout('iscanbeclose=true;', 1000);
        }
        else {
            //alert(3);
            clearTimeout(st5090);
            $("#toolInMap").css("opacity", "0.7");
            tocross();
            //iscanbeclose = false;
            //   setTimeout('iscanbeclose=true;', 1000);
        }

    }
}
//#endregion
var cb;
var curb = 0.81; //当前倍率
var curt = true; //当前方向
function changeBorder(id) {
    var min = 0.81;
    var max = 1.2;
    if (curb < max && curt) {
        curb = parseFloat(curb) + 0.005;
    }
    else {
        curb = parseFloat(curb) - 0.005;
        curt = false;
        if (curb < min) {
            curt = true;
        }
    }
    $("#" + id).css('-webkit-transform', 'scale(' + curb + ')');
}
function changeBorder1(id) {
    if (curt) {
        $("#" + id).css('-webkit-transform', 'scale(1.2)');
    }
    else {
        $("#" + id).css('-webkit-transform', 'scale(0.8)');
    }
    curt = !curt;
}
function flag() {
    var x = map.getZoom();
    var tx = 7;
    switch (x) {
        case 18: tx = tx; break;
        case 17: tx = tx - 3; break;
        case 16: tx = tx - 3; break;
        case 15: tx = tx - 4; break;
        case 14: tx = tx - 5; break;
        default: tx = tx - 6; break;
    }
    flagCenter(tx);
}
function flagCenter(x) {
    var tgps = latLngControl.updatePosition().toUrlValue(x); //获取中心值
    var tngps = newgps.toUrlValue(x);
    if (tgps == tngps) {
        if (monitor.gps(newgps)) {
            map.panTo(newgps);
            zoomClick(1, null, 1);
        }
    }
    else {
        if (monitor.gps(newgps)) {
            map.panTo(newgps);
        }
    }
}

//#region  清空markers   deleteOverlays
// Deletes all markers in the array 
function deleteOverlays() {
    if (markersArray) {
        for (i in markersArray) {
            markersArray[i].setMap(null);
        }
        markersArray.length = 0;
    }
}
//#endregion 

//#region  Removes the overlays from the map, but keeps them in the array   clearOverlays() 
function clearOverlays() {
    if (markersArray) {
        for (i in markersArray) {
            markersArray[i].setMap(null);
        }
    }
    clearRoadend();
}
//#endregion
//#region  remove another gourp of map marks                        clearOverlays1()
function clearOverlays1() {
    if (markersArray1) {
        for (i in markersArray1) {
            markersArray1[i].setMap(null);
        }
    }
    clearRoadend();
}
//#endregion
//#region  remove marks on map                              clearMarkGPS()
function clearMarkGPS(x) {
    //如果x默认为空或是2 表示清除gps或清除两个点
    if ((!x) || x == "2") {
        try {
            if (markerGPS) {
                try {
                    for (i in markerGPS) {
                        markerGPS[i].setMap(null);
                    }
                } catch (e) { catche(e); }
                markerGPS.length = 0;   //add
            }
        } catch (e) {

        }
    }
    if (!!x) {
        try {
            if (searchMaker) {
                searchMaker.setMap(null);
                searchMaker = null;
            }
        } catch (e) {

        }

    }
}
//#endregion
//#region  clearRoadend() 
// remove marks for road ends
function clearRoadend() {
    if (roadEndArr) {
        for (i in roadEndArr) {
            roadEndArr[i].setMap(null);
        }
    }
}
//#endregion
var knam;
var nn;
var ss;
var ww;
var ee;
var tbizk; //有多少是商家，
var TserEvent = false;
//#region  添加图钉[从后台返回的商家列表中获取信息，再将图钉加载到地图]                               listgroup
// add a group of mark icons on map from search results.
// zoom map to fit first 3 locations.
function listgroup1() {
    if (hisw) {
        /*clearTimeout(t1);
        $('#inMapMsg,#cmm').show();
        $('#inMapMsg').html("<span id='inMapMsg1'></span>");
        $('#inMapMsg1').html("<center>Checking map ……</center>");
        t1 = setTimeout("$('#inMapMsg,#cmm').hide()", 550);*/
        setTimeout("listgroup()", 500);
    }
}
function listgroup(x, y) {//通过点击某个商家重新排版时，去掉x图标[x=x-1]
    //debugger;
    //debugger;
    if (x == "null") {
        x == null
    }
    if (!y) {
        y = 0;
    }
    // debugger;
    fir = false;
    MakerLIST = [];
    //testtools();
    /*clearTimeout(t1);
    $('#inMapMsg,#cmm').show();
    $('#inMapMsg').html("<span id='inMapMsg1'></span>");
    $('#inMapMsg1').html("<center>Checking map ……</center>");
    t1 = setTimeout("$('#inMapMsg,#cmm').hide()", 550);*/
    //// // // //  // //debugger;; 
    //if (!mapStatus) {        listgroup1();        return;    }
    ////debugger;
    /* if (!isactived) {
    setTimeout('listgroup("' + x + '")', 100);
    return;
    }*/
    exxxi = null;
    //搜索停止了
    isSearching = false;
    //第一次搜索时添加滑动效果
    if (firser) {
        firser = false;
    }
    //console.log(9845);
    try {
        //alert(1);

        if ($("#container").html().indexOf('EVtab') == -1) {
            setTimeout(function () {
                //debugger;
                //var y = myScrolllist.y;

                //myScroll.refresh();
                myScrolllist.destroy();
                myScrolllist = null;
                myScrolllist = new iScroll('container', { vScrollbar: false });
                myScrolllist.scrollTo(0, 0, 0);
            }, 0);
        }
    } catch (e) { console.log(e); }
    //$('#list').touchScroll();
    //2.清空markers【清除所有的图钉】
    deleteOverlays();
    //$flip.onload.enableScrollOnContent1();
    //$('#list').touchScroll('update');
    GoogleTouchEvent("listin", null, null, 1);
    if (!!TserEvent) {
        var ll22 = $("#list1").html();
    }
    else {
        var ll22 = $("#tt" + y).html();
        //  var ll22 = $("#list").html();
    }
    if (ll22.indexOf("sorry") == -1) {
        isfircwg = false;
        //#region 从列表中分离出参数
        var str_lat0 = ll22.indexOf("[-");
        var str_lat1 = ll22.indexOf("-]");
        var str_lng0 = ll22.indexOf("[+");
        var str_lng1 = ll22.indexOf("+]");

        var str_1 = ll22.indexOf("(#");
        var str_2 = ll22.indexOf("#)");
        var bizK = ll22.substring(str_1 + 2, str_2);
        tbizk = bizK;
        var str_1 = ll22.indexOf("[(");
        var str_2 = ll22.indexOf(")]");
        var str_3 = ll22.indexOf("[[");
        var str_4 = ll22.indexOf("]]");

        var L21 = ll22.substring(str_1 + 2, str_2);
        var kk21 = ll22.substring(str_3 + 2, str_4);
        ll22 = "";
        //#endregion
        /*  // //debugger;;
        var tnewgps = "" + newgps;
        //tgps = newgps.toString().split(',')[0].split('(')[1] + ',' + newgps.toString().split(',')[1].split(')')[0];
        tgps = tnewgps.split(',')[0].split('(')[1] + ',' + tnewgps.split(',')[1].split(')')[0];
        // delete tnewgps;

        //var tgps = newgps.toString().split(',')[0].split('(')[1] + ',' + newgps.toString().split(',')[1].split(')')[0];
        var gpsLatLng = tgps.split(",");
        //var gpsLatLng = gps.split(",");
        var nn = gpsLatLng[0];
        var ss = gpsLatLng[0];
        var ww = gpsLatLng[1];
        var ee = gpsLatLng[1];
        */
        try {
            if (!!SearchGPS) {
                var nn = "" + SearchGPS.lat();
                var ss = "" + SearchGPS.lat();
                var ww = "" + SearchGPS.lng();
                var ee = "" + SearchGPS.lng();
            }
            else {
                var nn = "" + newgps.lat();
                var ss = "" + newgps.lat();
                var ww = "" + newgps.lng();
                var ee = "" + newgps.lng();
            }
            //debugger;
            if (kk21 != 0) {
                var L23 = L21.split(";");
                var kk23 = kk21.split(",");

                if (map.getMapTypeId() == 'hybrid') {
                    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
                }

                for (i = 0; i < L23.length; i++) {
                    var L25 = L23[i].split(",");
                    var location = new google.maps.LatLng(L25[0], L25[1]);

                    if (parseInt(kk23[i]) > parseInt(bizK)) {
                        knam = "icon_bm" + kk23[i];
                    }
                    else {
                        var knam = "iconrText" + kk23[i];
                        //knam = "iconr" + kk23[i]
                    }
                    /* 2011.09.27
                    var image = new google.maps.MarkerImage('images/' + knam + '.png',
                    new google.maps.Size(17, 30), //20,34  17, 30
                    new google.maps.Point(0, 0),
                    new google.maps.Point(10, 34));
                    */

                    var image = new google.maps.MarkerImage('images/iconrc.png',
                          new google.maps.Size(20, 34),
                          new google.maps.Point(0, 0),
                          new google.maps.Point(10, 34));

                    var iconText = new google.maps.MarkerImage('images/' + knam + '.png',
                          new google.maps.Size(20, 34),
                          new google.maps.Point(0, 0),
                          new google.maps.Point(10, 34));

                    if (i != x) {
                        //#region 背景水滴
                        if (parseInt(kk23[i]) <= parseInt(bizK)) {//正常图标
                            /* var location = new google.maps.LatLng(L25[0], L25[1]);
                            AddMaker(0, location, image, L23.length, kk23[i], i);*/

                            var markerlist = new google.maps.Marker({
                                position: location,
                                map: map,
                                icon: image,
                                zIndex: 300 + parseInt(2 * (L23.length - i) - 1)
                            });
                            markersArray.push(markerlist);
                            //#region 二次标注
                            //markersArray.push(markerlist);
                            //#endregion
                            // markerlist.setAnimation(google.maps.Animation.DROP);
                            addClicktoMarker(markerlist, location, kk23[i], i);
                            addClicktoMarker(markerlist, location, kk23[i], i);
                        }
                        //#endregion

                        //#region 商家序号/蓝色
                        /* AddMaker(1, location, iconText, L23.length, kk23[i], i);*/

                        var markerlist = new google.maps.Marker({
                            position: location,
                            map: map,
                            icon: iconText,
                            zIndex: 300 + parseInt(2 * (L23.length - i))
                        });
                        markersArray.push(markerlist);
                        //#region 二次标注
                        markersArray.push(markerlist);
                        //#endregion

                        //markerlist.setShadow(gpsicon);
                        // markerlist.setAnimation(google.maps.Animation.DROP);
                        //markerlist.setTitle("here");
                        addClicktoMarker(markerlist, location, kk23[i], i);
                        //#endregion
                    }
                    //count ne and sw points, count only first 5 points to get square range
                    if (i <= 3) {
                        if ((parseFloat(nn) - parseFloat(L25[0])) >= 0) {
                            nn = nn;
                        }
                        else {
                            nn = L25[0];
                        }
                        if ((parseFloat(ss) - parseFloat(L25[0])) <= 0) {
                            ss = ss;
                        }
                        else {
                            ss = L25[0];
                        }
                        if ((parseFloat(ww) - parseFloat(L25[1])) >= 0) {
                            ww = L25[1];
                        }
                        else {
                            ww = ww;
                        }
                        if ((parseFloat(ee) - parseFloat(L25[1])) >= 0) {
                            ee = ee;
                        }
                        else {
                            ee = L25[1];
                        }
                    }
                }
                //debugger;
                var ne = new google.maps.LatLng(nn, ee);
                var sw = new google.maps.LatLng(ss, ww);
                var bounds = new google.maps.LatLngBounds(sw, ne);
                map.fitBounds(bounds);
                // map.panToBounds(bounds);
                FormateMap();
                if (map.getZoom() > 18) {
                    map.setZoom(18);
                }
            }
        } catch (e) {

        }
        setTimeout('toTop()', 1000);

    }
    else {
        var ValidChars = "0123456789";
        var Char;
        var IsNum = true;
        for (i = 0; i < newkw.length && IsNum == true; i++) {
            Char = newkw.charAt(i);
            if (ValidChars.indexOf(Char) == -1) {
                IsNum = false;
            }
        }
        if (IsNum == true && newkw.length == 10) {
            var a = "111";
            $.ajax({
                url: 'Handler/Login.ashx',
                type: 'POST',
                data: { loadbulletin: newkw },
                success: function (data1) {
                    if (data1 != 'Nothing found') {
                        $("#listin").html("sorry, no location found for '" + newkw + "'<hr>" + data1);
                    }
                    jumpTo(0);
                }
            });
        }
    }
    //console.log(11006);
    SystemBuy = [false, 'listgroup'];
    if (parseInt(bizK) < 11) {
        setTimeout('MapLock(1)', 1000);
    }
    else {
        setTimeout('MapLock(1)', 2000);
    }
    setTimeout('MapLock(1)', 2000);
    //    try {
    //        //$('#list').touchScroll('setPosition', 0);
    //    } catch (e) { catche(e); }
    //alert(isAlert);
    //debugger;
    if (pageFZOK) {
        if (isInrange == false && isAlert == false) {//如果不在范围内且没有提示
            if (iscanalert) {
                //alert('Your area may not be covered by Umap.ca');
                clearTimeout(t1);
                $('#inMapMsg,#cmm').show();
                $('#inMapMsg').html("<center><span>Your area may not be covered by Umap.ca</span></center>");
                t1 = setTimeout("$('#inMapMsg,#cmm').hide()", 5000);
                iscanalert = false;
                isAlert = true;
                setTimeout(function () { iscanalert = true; }, 5000);
            }
            //alert('Your area may not be covered by Umap.ca');
            //$("#reportArea").focus();
        }
    }
    else if (isInrange == false && isAlert == false) {
        setTimeout(function () {
            if (iscanalert) {
                //alert('Your area may not be covered by Umap.ca');
                clearTimeout(t1);
                $('#inMapMsg,#cmm').show();
                $('#inMapMsg').html("<center><span>Your area may not be covered by Umap.ca</span></center>");
                t1 = setTimeout("$('#inMapMsg,#cmm').hide()", 5000);
                isAlert = true;
                iscanalert = false;
                setTimeout(function () { iscanalert = true; }, 5000);
            }
        }, 300);

    }

    if (storage.getItem("details") == "1") {
        var ta9269 = $("#listin")[0].childNodes[1].childNodes[0].childNodes[0].childNodes[3].childNodes[0];
        ta9269.id = "ta9269";
        $("#ta9269").click();
        ta9269.id = "";
        storage.setItem("details", 0);
    }
    if (!TserEvent) {
        GoogleTouchEvent("container");
    }
}
function Esave() {
    $(".ESave").css({ 'margin': '0px 0px 0px 25px', 'float': 'left' });
}
var MakerLIST = [];
function AddMaker(type, location, image, L23L, kk23, i) {//debugger;
    setTimeout(function () {
        //debugger;
        var markerlist;
        if (type == 0) {
            markerlist = new google.maps.Marker({
                position: location,
                map: map,
                icon: image,
                zIndex: 300 + parseInt(2 * (L23L - i) - 1)
                //,visible:false
            });
            //  markerlist.setVisible();
        }
        else if (type == 1) {
            markerlist = new google.maps.Marker({
                position: location,
                map: map,
                icon: image,
                zIndex: 300 + parseInt(2 * (L23L - i))
            });
        }
        MakerLIST.push(markerlist);
        markersArray.push(markerlist);
        //#region 二次标注
        //markersArray.push(markerlist);
        //#endregion
        markerlist.setAnimation(google.maps.Animation.DROP);
        addClicktoMarker(markerlist, location, kk23, i);
        addClicktoMarker(markerlist, location, kk23, i);
    }, 500);
}
//#endregion
//#region  addClicktoMarker
// make map icon clickable for zoom
var exi;
var gb;
var usingMaker = true;
function addClicktoMarker(marker, LatLng, i, exii, isrd) {//i是当前的序号1。2。2，exii是当前的第n个0。1。2  isrd 是否是道路，默认为false
    google.maps.event.addListener(marker, 'click', function () {
        if (hisw && usingMaker) {
            //alert(10900 + ":" + usingMaker);
            usingMaker = false;
            setTimeout('usingMaker=true', 500);
            //isclicknum = false;
            // map.panTo(LatLng);
            //#region 关闭十字提示框
            if ($("#cross").is(":visible")) {
                closecross();
            }
            //#endregion
            var isEVENT = false;
            try {
                if ($("#listin").html().indexOf("Participate places") != -1) {
                    isEVENT = true;
                }
            } catch (e) {
                catche(e);
            }

            //#region  打开第i个详细页
            //如果是同一个，且已经打开，则不动
            //list table tbody tr td
            //var xi = document.getElementById("list").childNodes[i].childNodes[0].childNodes[0].childNodes[1].childNodes[1];
            //var xi = $("#list").children()[i].children()[0].children()[0].children()[1].children()[1]
            if (!isNaN(i)) {//序号
                // // //debugger;;
                // 
                if (exi == i) {//如果是同一个，则放大
                    //                if (!isrd) {
                    //                    $("#page3_details").show();
                    //                }
                    //if i is the same one ,zoom on
                    //if("<div id="page3_detail"> </div>")
                    //$("#page3_details").show();
                    //return;
                    if (map.getZoom() < 14) {
                        map.setZoom(14);
                    }
                    else {
                        if (map.getZoom() < 16) {
                            map.setZoom(map.getZoom() + 1);
                        }
                        if (map.getZoom() == 16) {
                            map.setZoom(map.getZoom() + 1);
                        }
                        else if (map.getZoom() >= 17 && map.getMapTypeId() == 'roadmap') {
                            map.setMapTypeId(google.maps.MapTypeId.HYBRID);
                        }
                        else if (map.getZoom() == 17 && map.getMapTypeId() != 'roadmap') {
                            map.setZoom(map.getZoom() + 1);
                        }
                    }
                    if (monitor.gps(LatLng)) {
                        map.panTo(LatLng);
                    }
                }
                else {
                    try {
                        //alert("1");
                        //debugger;
                        //gger;
                        //#region 按钮变色
                        /* if (exnum) {
                        exnum.style.backgroundImage = 'url("./images/icon_L.png")';
                        exnum.style.webkitTransition = "-webkit-transform  800ms ease";
                        exnum.style.WebkitTransform = "scale(1)";
                        $(".plus").slideUp();
                        }*/
                        var ico;
                        var icoTab;
                        //如果是道路
                        //debugger;
                        //alert("2");
                        if (isrd) {
                            ico = document.getElementById("list").childNodes[exii].childNodes[0].childNodes[0].childNodes[0].childNodes[1];
                            //ico.style.backgroundImage = 'url("./images/icon_L.png")';
                            ico.style.backgroundColor = '#FF7A6E';
                        }
                        else {
                            if (isEVENT) {
                                ico = document.getElementById("listin").childNodes[2 * exii + 3].childNodes[0].childNodes[0].childNodes[1].childNodes[0];
                                icoTab = document.getElementById("listin").childNodes[2 * exii + 3];
                            }
                            else if (GSearch) {
                                ico = document.getElementById("listin").childNodes[exii].childNodes[0].childNodes[0].childNodes[1].childNodes[0];
                                icoTab = document.getElementById("listin").childNodes[exii];
                            }
                            else {
                                ico = document.getElementById("listin").childNodes[2 * exii + 1].childNodes[0].childNodes[0].childNodes[1].childNodes[0];
                                icoTab = document.getElementById("listin").childNodes[2 * exii + 1];
                                //ico.style.backgroundImage = 'url("./images/Icon_b_none.png")';
                            }
                        }
                        //exnum = ico;
                        /*  var tico = ico.parentNode.parentNode.childNodes[4].childNodes[1].childNodes[1];
                        tico.id = "plus" + parseInt(Math.random() * 100);
                        $("#" + tico.id).slideDown();
                        tico.id = "";
                        exnum.style.webkitTransition = "-webkit-transform  300ms ease";
                        exnum.style.WebkitTransform = "scale(1.5)";
                        setTimeout('exnum.style.webkitTransition = "-webkit-transform  300ms ease";exnum.style.WebkitTransform = "scale(1.2)";', 300);
                        */
                        //=================
                        //提取按钮外的td
                        //$("#list table").css('-webkit-box-shadow', 'none');
                        //icoTab.id = "table" + parseInt(Math.random() * 100);
                        //$("#" + icoTab.id).css('-webkit-box-shadow', '#999 0px 0px 10px 0px');
                        /* 
                        $("#" + icoTab.id).click();
                        icoTab.id = "";
                        */
                     //debugger;
                        //alert("3");
                        //               var tico1 = ico.parentNode;
                        var tico1 = ico.parentNode.parentNode.childNodes[4].childNodes[1];
                        tico1.id = "font" + parseInt(Math.random() * 100);
                        //----      
                        $("#" + tico1.id).click();
                        tico1.id = "";
                        //alert("4");
                        //#endregion
                        wf = true;
                        //wf = false;
                        //ff
                        //var xi = document.getElementById("list").childNodes[2 * i + 1].childNodes[0].childNodes[0].childNodes[3].childNodes[0].click();
                        //webkit
                        try {
                            var xi = document.getElementById("listin").childNodes[2 * exii + 1].childNodes[0].childNodes[0].childNodes[3].innerHTML; //.childNodes[0].outerHTML;
                            var para = xi.split("click_details(")[1].split(')">')[0].split("','");

                        } catch (e) {

                        }
                        try {
                            if (iPhoneOrientation == 90) {
                                $("#bizName").show();
                                // $("#bizName").html("<div id='bizName1'></div><div id='bizName2'>" + para[1] + "</div>");
                                $("#bizName").html(" " + ReplaceF(para[1]) + " ");
                                google.maps.event.addDomListener(document.getElementById('bizName'), 'touchstart', function (e) {
                                    e.preventDefault();
                                    toTop();
                                });
                                google.maps.event.addDomListener(document.getElementById('bizName'), 'touchmove', function (e) {
                                    e.preventDefault();
                                });
                                google.maps.event.addDomListener(document.getElementById('bizName'), 'touchend', function (e) {
                                    setTimeout('toTop()', 500);
                                });
                            }
                            //alert("11044");
                            var tpara = para[9].split(",");
                            var tpara1 = para[10];
                            var tpara2 = para[11];
                            para[9] = tpara[0];
                            para[10] = tpara[1];
                            para[11] = tpara[2];
                            para[12] = tpara1;
                            tpara2 = tpara2.split(",");
                            para[13] = tpara2[0];
                            para[14] = tpara2[1];
                            para[15] = tpara2[2];
                            para[16] = tpara2[3];

                            for (var j = 0; j < para.length; j++) {
                                try {
                                    para[j] = para[j].replace("'", "");
                                    para[j] = para[j].replace("'", "");
                                } catch (e) { catche(e); }
                            }
                            //alert("11064");
                            clearTimeout(gb);
                        } catch (e) {

                        }
                        //#region 如果不是道路，则进行列表翻滚
                        if (!isrd) {
                            /*                             //debugger;
                            var height = $("#list table").height();
                            try {
                            $('#list').touchScroll('setPosition', exii * (height + 1) - 45);
                            gb = setTimeout('getback()', 7500);
                            } catch (e) { catche(e); }*/
                            //====
                            var ScrollHeight = 0;
                            var listNode = document.getElementById("listin");
                            for (var j = 0; j < parseInt(exii); j++) {
                                ScrollHeight += listNode.childNodes[2 * j + 1].clientHeight + 1;
                            }
                            if (ChangingHeightSwitch) {
                                ScrollHeight = ScrollHeight - 66;
                            }
                            try {
                                myScrolllist.scrollTo(0, -ScrollHeight, 500);
                                //$('#list').touchScroll('setPosition', ScrollHeight); // - 50
                                gb = setTimeout('getback()', 7500);
                            } catch (e) { catche(e); }
                            //====

                            if ($("#page3_details").is(":visible")) {
                                click_details(para[0], para[1], para[2], para[3], para[4], para[5], para[6], para[7], para[8], para[9], para[10], para[11], para[12], para[13], null, para[15], para[16]);
                            }
                        }
                        //#endregion 
                        tplat = ("" + LatLng).split("(")[1].split(',')[0];
                        tplng = ("" + LatLng).split("(")[1].split(',')[1].split(')')[0];
                        //           centerwithGPS(tplat, tplng, parseInt(i), null, null, null, null, null, true, exii, false, 1);
                        if (monitor.gps(LatLng)) {
                            //  map.panTo(LatLng);
                        }
                    } catch (e) { catche(e); }
                }
            }
            else {//红旗
                //#region 判断是否居中
                /* var tgps = latLngControl.updatePosition().toUrlValue(3); //获取中心值
                if (tgps == LatLng.toUrlValue(3)) {
                map.panTo(LatLng);
                zoomClick(1);
                }
                else {
                map.panTo(LatLng);
                }
                */
                flag();
                //#endregion
            }
            wf = false;

            //#endregion
            exi = i;
            //屏蔽工具栏
            //setTimeout('$("#tools").height(0);$("#tool,#tools").hide();bhi = true;', 500);

            /*
            //if (ext == "" || ext == null) {
            if (exi == i) {
            zoomClick(1);
            }
            else {
            //var x = LatLng.toString().split(',');
            /*    var x = ("" + LatLng).split(',');
            var xt = x[0].split('(')[1];
            var xg = x[1].split(')')[0];
            centerwithGPS(xt, xg, i + 1);
            // centerwithGPS(ext, exg, exk);
            exi = i;
            }*/
            FormateMap();
        } // alert(8163);   
    });
}
function getback() {
    // return true;
    //var scrollY = $('#list').touchScroll('getPosition');
    //alert(scrollY);
    //    try {
    //        //$('#list').touchScroll('setPosition', 0);
    //        hideisearch(2);
    //        setTimeout('$("#tools").height(0);$("#tool,#tools").hide();', 1);
    //        bhi = true;
    //        $('#list').touchScroll('setPosition', (parseInt(scrollY) + 50));
    // } catch (e) { catche(e); }

}
var exxxi = null;
var exxxitime = 0;
function fourstep(la, lg, i, j) {
    try {
        LatLng = new google.maps.LatLng(la, lg);
        if (monitor.gps(LatLng)) {
            map.panTo(LatLng);
        }
    } catch (e) { catche(e); }
    if (map.getZoom() < 14) {
        map.setZoom(14);
    }
    else {
        //debugger;
        if (exxxi == i && exxxitime != 0) {
            if (map.getZoom() < 16) {
                map.setZoom(map.getZoom() + 1);
            }
            else if (map.getZoom() == 16) {
                map.setZoom(map.getZoom() + 1);
            }
            else if (map.getZoom() >= 17 && map.getMapTypeId() == 'roadmap') {

                map.setMapTypeId(google.maps.MapTypeId.HYBRID);
            }
            else if (map.getZoom() == 17 && map.getMapTypeId() != 'roadmap') {
                map.setZoom(map.getZoom() + 1);
            }
            /*if (map.getZoom() < 17) {
            map.setZoom(map.getZoom() + 1);
            }
            else if (map.getZoom() == 17) {
            map.setZoom(18);
            }
            if (map.getZoom() > 17 && map.getMapTypeId() == 'roadmap') {
            map.setMapTypeId(google.maps.MapTypeId.HYBRID);
            }*/
        }
        /*if (map.getZoom() >= 17) {//&& map.getMapTypeId() == 'roadmap'
        map.setMapTypeId(google.maps.MapTypeId.HYBRID);
        }*/
    }
    if (!isNaN(i)) {
        centerwithGPS(la, lg, i, '', '', '', '', '', true, j, false, '1');
    }
    exxxi = i;
    exxxitime = 1;
}
//#endregion
//#region  checklistdata
// work with function click_search(kw)
// keep check to wait while get data back from ajax.
// this is bad design, try to get good solutions. 4/13/2011
//        function checklistdata() {
//            if (document.getElementById("list").innerHTML.length > 15) {
//                jumpTo(0);
//                listgroup();
//            }
//            else {
//                var t = setTimeout("checklistdata()", 1000);
//            }
//        }
//#endregion
//----- map control area
function sortNumber(a, b) {
    return a - b;
}
//#region  centerwithGPS()
var exk = ""; //用来与之前的K进行比较
var exs = true; //用来开关放大缩小
var exz = 14; //ex-zoom
var ext;
var exg;
var exn;
var isfircwg = false; //是否是第一次使用 is-first-center-with-gps
var jo = true; //奇偶控制，点击数字按钮循环居中
var center1;
var exMaker;
var delaytime = 300;
function centerwithGPS(plat, plng, k, a, slat, slng, elat, elng, isk, exkk, isc, from) {
    var center1 = new google.maps.LatLng(plat, plng);
    //plat:纬度
    //plng:经度
    //k：第N个【1，2……】可重复
    //a:类型【notbiz】
    //isk 是否对k进行处理  
    //isc  是否两点居中
    //from 1:列表左边的按钮
    //exkk:第n个，不可重复【1.2.3...】
    //debugger;
    if ((exk == k) && (!isk) && (from != '1')) {//是前一个，且不要对k进行处理

        if (monitor.gps(center1)) {
            map.panTo(center1);
            map.panTo(center1);
        }
        if ((map.getZoom() < 18) && exs) {
            zoomClick(1, k);
        }
        else {
            zoomClick(2);
        }
    }
    else {
        //        try {
        //            markersArray[exk].setMap(map);
        //        } catch (e) {
        //        }
        if (!isNaN(map.getZoom())) {
            exz = map.getZoom();
        }
        exk = k;
        ext = plat;
        exg = plng;
        exs = true;
        jumpTo(0);
        clearRoadend();
        /* deleteOverlays();
        listgroup(k - 1);
        */
        //#region  清除前一个
        try {
            //debugger;
            if (isfircwg) {
                //            for (var i = 0; i < 3; i++) {
                //                if (markersArray[markersArray.length - 1].zIndex == 1000) {
                //                    markersArray[markersArray.length - 1].setMap(null);
                //                    markersArray.length--;
                //                }
                //            }
                markersArray[markersArray.length - 1].setMap(null);
                markersArray.length--;
                if (!chosetype) {
                    markersArray[markersArray.length - 1].setMap(null);
                    markersArray.length--;
                }
            }
            //    MakerLIST[2 * (exMaker) - 1].setVisible(true);
            //    MakerLIST[2 * (exMaker) - 2].setVisible(true);
        } catch (e) { }

        try {

            //   MakerLIST[2 * exkk - 1].setVisible(false);
            //   MakerLIST[2 * exkk - 2].setVisible(false);
        } catch (e) {
            //  alert(e); 
        }
        exMaker = exkk;
        //隐藏这个红色
        //markersArray[k].setMap(null);
        //markersArray[k+1].setMap(null);
        //#endregion
        if (!(a == 'notbiz')) {
            knam = "icon_bm" + k;
            chosetype = true;
        }
        else {
            //knam = "iconr" + k;
            knam = "iconrText" + k;
            chosetype = false;
        }
        //alert(plat + plng + knam);
        if (chosetype) {
            //debugger;
            //普通商家
            //#region imgae
            var image = new google.maps.MarkerImage('images/' + knam + '.png',
        new google.maps.Size(20, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34));
            //#endregion
            var remark = new google.maps.LatLng(plat, plng);
            if (showswitch) {
                var markerlist = new google.maps.Marker({
                    position: remark,
                    map: map,
                    icon: image,
                    zIndex: 1000
                });
                addClicktoMarker(markerlist, remark, k, exkk);
                markersArray.push(markerlist);
            } else {
                setTimeout(function () {
                    var markerlist = new google.maps.Marker({
                        position: remark,
                        map: map,
                        icon: image,
                        zIndex: 1000
                    });
                    //if (exkk != "" && exkk != null) {
                    markerlist.setAnimation(google.maps.Animation.DROP);
                    addClicktoMarker(markerlist, remark, k, exkk);

                    //        }
                    //        else {
                    //            addClicktoMarker(markerlist, remark, k, k);
                    //        }
                    markersArray.push(markerlist);
                }, delaytime);
            }
            //markersArray.push(markerlist);
        }
        else {
            //#region imgae 
            var image = new google.maps.MarkerImage('images/iconrc.png',
                          new google.maps.Size(20, 34),
                          new google.maps.Point(0, 0),
                          new google.maps.Point(10, 34));
            var iconText = new google.maps.MarkerImage('images/' + knam + '.png',
                          new google.maps.Size(20, 34),
                          new google.maps.Point(0, 0),
                          new google.maps.Point(10, 34));
            //            var image = new google.maps.MarkerImage('images/' + knam + '.png',
            //        new google.maps.Size(20, 34),
            //        new google.maps.Point(0, 0),
            //        new google.maps.Point(10, 34));
            //#endregion
            //#region roadImg
            //#endregion
            var remark = new google.maps.LatLng(plat, plng);
            if (showswitch) {
                var markerlist = new google.maps.Marker({
                    position: remark,
                    map: map,
                    icon: image,
                    zIndex: 1000
                });
                var markerlist1 = new google.maps.Marker({
                    position: remark,
                    map: map,
                    icon: iconText,
                    zIndex: 1001
                });
                addClicktoMarker(markerlist, remark, k, exkk);
                addClicktoMarker(markerlist1, remark, k, exkk);
                markersArray.push(markerlist);
                markersArray.push(markerlist1);
            }
            else {
                setTimeout(function () {
                    var markerlist = new google.maps.Marker({
                        position: remark,
                        map: map,
                        icon: image,
                        zIndex: 1000
                    });
                    var markerlist1 = new google.maps.Marker({
                        position: remark,
                        map: map,
                        icon: iconText,
                        zIndex: 1001
                    });
                    markerlist.setAnimation(google.maps.Animation.DROP);
                    markerlist1.setAnimation(google.maps.Animation.DROP);  //if (exkk != "" && exkk != null) {
                    addClicktoMarker(markerlist, remark, k, exkk);
                    addClicktoMarker(markerlist1, remark, k, exkk);
                    //        }
                    //        else {
                    //            addClicktoMarker(markerlist, remark, k, k);
                    //        }
                    markersArray.push(markerlist);
                    markersArray.push(markerlist1);
                }, delaytime);
            }
            //markersArray.push(markerlist);
        }
        //#region roadImg
        var roadImg = new google.maps.MarkerImage('images/roadend.png',
        new google.maps.Size(20, 20),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 10));
        //#endregion

        // // //debugger;;
        /* var tnewgps = "" + newgps;
        var gpsString = tnewgps.split(',')[0].split('(')[1] + ',' + tnewgps.split(',')[1].split(')')[0];
        //delete tnewgps;

        //var gpsString = newgps.toString().split(',')[0].split('(')[1] + ',' + newgps.toString().split(',')[1].split(')')[0]; ;
        //        var gpsString = gps;
        var gpsLatLng = gpsString.split(",");
        var gpsLat = gpsLatLng[0];
        var gpsLng = gpsLatLng[1];*/
        //==
        var gpsLat = "" + newgps.lat();
        var gpsLng = "" + newgps.lng();
        //==

        var x1 = parseFloat(gpsLat);
        var y1 = parseFloat(gpsLng);
        var x2 = parseFloat(plat);
        var y2 = parseFloat(plng);
        var gpslanlng0 = new google.maps.LatLng(gpsLat, gpsLng);
        if (x2 - x1 > 0) {
            var sw_x = x1;
            var ne_x = x2;
        }
        else {
            var sw_x = x2;
            var ne_x = x1
        }
        if (y2 - y1 > 0) {
            var sw_y = y1;
            var ne_y = y2;
        }
        else {
            var sw_y = y2;
            var ne_y = y1
        }
        var x3 = parseFloat(slat);
        var y3 = parseFloat(slng);
        var x4 = parseFloat(elat);
        var y4 = parseFloat(elng);
        if (x3 != '' && isNaN(x3) == false && x4 != '' && isNaN(x4) == false) {
            var rstart = new google.maps.LatLng(slat, slng);
            var rendlist = new google.maps.Marker({
                position: rstart,
                map: map,
                icon: roadImg
            });
            addClicktoMarker(rendlist, rstart, k - 1, null, true);
            roadEndArr.push(rendlist);
            var rend = new google.maps.LatLng(elat, elng);
            var rendlist = new google.maps.Marker({
                position: rend,
                map: map,
                icon: roadImg
            });
            addClicktoMarker(rendlist, rend, k - 1, null, true);
            roadEndArr.push(rendlist);
            var arrX = [x1, x2, x3, x4];
            var arrY = [y1, y2, y3, y4];
            var newX = arrX.sort(sortNumber);
            var newY = arrY.sort(sortNumber);
            sw_x = newX[0];
            ne_x = newX[3];
            if (newY[3] - newY[0] > 0) {
                sw_y = newY[0];
                ne_y = newY[3];
            }
            else {
                sw_y = newY[3];
                ne_y = newY[0];
            }
        }

        if (monitor.gps(center1)) {
            map.panTo(center1);
        }
        if ((!isk || isc) && usingMaker) {
            //debugger;
            //            if (exkk != exn) {//不是同一个
            //                if (jo) {//允许两点居中
            //                    var swp = new google.maps.LatLng(sw_x, sw_y);
            //                    var nep = new google.maps.LatLng(ne_x, ne_y);
            //                    var boundp = new google.maps.LatLngBounds(swp, nep);
            //                    map.fitBounds(boundp);
            //                    exn = exkk;
            //                }
            //                else {
            //                    !jo;
            //                }
            //            }

            //debugger;
            if ((exkk != exn) || (jo)) {
                var swp = new google.maps.LatLng(sw_x, sw_y);
                var nep = new google.maps.LatLng(ne_x, ne_y);
                var boundp = new google.maps.LatLngBounds(swp, nep);
                map.fitBounds(boundp);
                //setTimeout('map.fitBounds("' + boundp + '")"', 200);
                //    setTimeout(function () { map.fitBounds(boundp) }, 200);
                /* setTimeout(function () {
                map.fitBounds(boundp);
                if (map.getZoom() < 17) {
                map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
                }
                else if (map.getZoom() > 17) {
                map.setMapTypeId(google.maps.MapTypeId.HYBRID);
                if (map.getZoom() > 18) {
                map.setZoom(18);
                }
                }

                }, 600);*/
                exn = exkk;
                jo = false;
            }
            else {
                center1 = new google.maps.LatLng(plat, plng);
                if (monitor.gps(center1)) {
                    map.panTo(center1);
                    //map.setCenter(center1);
                }
                jo = true;
            }
        }
        if (map.getZoom() < 17) {
            map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        }
        else if (map.getZoom() > 17) {
            map.setMapTypeId(google.maps.MapTypeId.HYBRID);
            if (map.getZoom() > 18) {
                map.setZoom(18);
            }
        }


    }
    isfircwg = true;

}
//#endregion
//#endregion

//#region GPS相关
function GPSToNum(GPS) {
    //return gps;...
}
//convertGPS(new google.maps.LatLng(43.6702131, -79.38679));
//convertGPS(new google.maps.LatLng(43.6702131, -79.38679), 'b');
function convertGPS(latlng1, x) {
    // // //debugger;;
    try {
        /*  latlng = "" + latlng1;
        if (x == "b") {//纬度 b
        return latlng.split(',')[0].split('(')[1];
        }
        else {
        return latlng.split(',')[1].split(')')[0];
        }
        */

        if (typeof (latlng1) == "string") {
            //"43.670213100000005, -79.38679000000002"
            if (x == "b") {
                return latlng1.split(',')[0];
            }
            else {
                return $.trim(latlng1.split(',')[1]);
            }
        }
        else {
            if (x == "b") {
                return "" + latlng1.lat();
            }
            else {
                return "" + latlng1.lng();
            }
        }
    } catch (e) { catche(e); }
}
//#endregion

//#region 获取saved自定义最大值
var savedMAX = 0;
function getSMAX() {
    var tarrSaved = storage.getItem("arrSaved");
    if (tarrSaved) {
        var Tsavedidarr = [];
        Tsavedidarr = tarrSaved.split(';');
        Tsavedidarr.pop();
        for (var i = 0; i < Tsavedidarr.length; i++) {
            Tsavedidarr[i] = Tsavedidarr[i].split('￥');
            if (Tsavedidarr[i][0].indexOf('Saved Location') != -1) {
                var val = Tsavedidarr[i][0];
                try {
                    val = val.split('=')[1];
                    if (val) {
                        savedMAX = (savedMAX < val) ? val : savedMAX;
                    }
                } catch (e) { catche(e); }
            }
        }
    }
    return ++savedMAX;
}
//#endregion

//#region 账户相关
var userLevel = 0; //100
//storage.removeItem("account");
var openLevel = 89; //开放帐号
function testaccount() {
    //debugger;
    //if (storage.getItem("account") != null && storage.getItem("account") != "") {
    //if (getAccountLevel() > 1) {
    //debugger;
    //if (who) {
    //2012.03.01  未登录用户可以使用account
    //$("#saved").html('<div id="showsaved">Saved</div><div id="showshared">Shared</div><div id="showaccount" onclick="dis(event); showaccount();">Account</div>');
    //$("#showsaved, #showshared, #showaccount").css("margin-left", "18px");
    //$("#nb").html('<div class="row0Div" onclick="nb()"><div class="listMain1"><img id="icons1" src="images/icons/icon.png" onerror="imgError(1)"></div><div class="listMain2">&nbsp;Nearby</div></div>');
    $("#nb,#showaccount,#Reports").show();
    //$("#menu,#menu1").height(318 - $("#nb").height());
    $("#showaccount").css("color", "black");

    /*if (who.indexOf('@') != -1) {
    $("#saved").html('<div id="showsaved">Saved</div><div id="showshared">Shared</div><div id="showaccount" onclick="dis(event); showaccount();">Account</div>');
    $("#showsaved, #showshared, #showaccount").css("margin-left", "18px");
    //$("#nb").html('<div class="row0Div" onclick="nb()"><div class="listMain1"><img id="icons1" src="images/icons/icon.png" onerror="imgError(1)"></div><div class="listMain2">&nbsp;Nearby</div></div>');
    $("#nb,#showaccount,#Reports").show();
    //$("#menu,#menu1").height(318 - $("#nb").height());
    $("#showaccount").css("color", "black");
    }
    else {
    $("#saved").html('<div id="showsaved">Saved</div><div id="showshared">Shared</div>');
    $("#showsaved, #showshared").css("margin-left", "45px");
    }*/
    // }
    //else {
    //  $("#saved").html('<div id="showsaved">Saved</div><div id="showshared">Shared</div>');
    // $("#showsaved, #showshared").css("margin-left", "45px");
    //}

    if (storage.getItem("userLevel") != null && storage.getItem("userLevel") != "") {
        userLevel = storage.getItem("userLevel");
        //alert(userLevel);
    }
}
function showaccount() {
    try {
        if ($("#account").is(":visible")) {
            clearTimeout(tif);
            $("#account,#a41").hide();
        }
        else {
            //debugger;
            if (who.indexOf('@') != -1) {//已经登录的用户
                //无限邀请
                //debugger;
                //2012.03.02   <div id="a4" onclick="a4()">Add friends under your account</div><div id="a41"></div>
                var tacc1 = '<div id="a6"><span id="uemail"></span></div><div id="a2" onclick="showPr()">Previous Reports</div><div id="a1" onclick="a1()">Change Passwords</div><div id="a5" onclick="a5()"><span id="a51"></span><span id="ponum"></span></div><div id="closeDetailsaccount" class="close" onclick="closeaccount(2);"><span class="chahao">×</span></div><div id="closeDetailsaccount1" class="close" onclick="closeaccount(1);"><span class="chahao">×</span></div><span onclick="logout()" id="logout">Log out</span>';


                //var tacc1 = '<div id="a2" onclick="showPr()">Previous reports</div><div id="a4" onclick="a4()">Add friends under your account</div><div id="a41"></div><div id="a1" onclick="a1()">Change Passwords</div><div id="a5" onclick="a5()">Points:<span id="ponum"></span></div><div id="iphone-keyboard"><button type="button" onclick="closeaccount();" class="specialkey backspace">B</button></div>';
                $("#account").html(tacc1);
                $("#uemail").html(who);
                var date = new Date();
                var month = date.getMonth() + 1;
                var i = 1;
                switch (month) {
                    case i++: month = 'January'; break;
                    case i++: month = 'February'; break;
                    case i++: month = 'March'; break;
                    case i++: month = 'April'; break;
                    case i++: month = 'May'; break;
                    case i++: month = 'June'; break;
                    case i++: month = 'July'; break;
                    case i++: month = 'August'; break;
                    case i++: month = 'September'; break;
                    case i++: month = 'October'; break;
                    case i++: month = 'November'; break;
                    case i++: month = 'December'; break;
                }
                $("#a51").html("Points on " + month + ":");

                $("#account").show();
                $("#closeDetailsaccount2,#closeDetailsaccount1").css({ marginTop: "37px" });
                changeMsgInfo();
                if (closeLR == "L") {
                    $("#closeDetailsaccount").html('');
                    $("#closeDetailsaccount").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
                }
                else {
                    $("#closeDetailsaccount1").html('');
                    $("#closeDetailsaccount1").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
                }
                /*if (userLevel < 3) {
                //var tacc = '<div id="a2" onclick="showPr()">Previous reports</div><div id="a4" onclick="a4()">Add friends under your account</div><div id="a41"></div><div id="a1" onclick="a1()">Change Passwords</div><div id="closeDetailsaccount" onclick="closeaccount();"><span class="chahao">×</span></div>';
                var tacc1 = '<div id="a2" onclick="showPr()">Previous reports</div><div id="a4" onclick="a4()">Add friends under your account</div><div id="a41"></div><div id="a1" onclick="a1()">Change Passwords</div><div id="a5" onclick="a5()">Points:<span id="ponum"></span></div><div id="closeDetailsaccount" onclick="closeaccount();"><span class="chahao">×</span></div><div id="closeDetailsaccount1" onclick="closeaccount();"><span class="chahao">×</span></div>';
                $("#account").html(tacc1);
                $("#account").show();
                $("#closeDetailsaccount").css({ marginTop: "30px" });
                }
                else {
                //var tacc = '<div id="a2" onclick="showPr()">Previous reports</div><div id="a1" onclick="a1()">Change Passwords</div><div id="closeDetailsaccount" onclick="closeaccount();"><span class="chahao">×</span></div>';
                var tacc1 = '<div id="a2" onclick="showPr()">Previous reports</div><div id="a1" onclick="a1()">Change Passwords</div><div id="a5" onclick="a5()">Points:<span id="ponum"></span></div><div id="closeDetailsaccount" onclick="closeaccount();"><span class="chahao">×</span></div><div id="closeDetailsaccount1" onclick="closeaccount();"><span class="chahao">×</span></div>';
                $("#account").html(tacc1); //tacc1
                $("#account").show();
                $("#a1, #a2, #a3").css('margin-top', '50px');
                $("#a5").css('margin-top', '51px');
                //addbgcolor('account');<div id="a3" onclick="a3()">Comments</div>
                }*/
                GoogleTouchEvent('account');
                $.ajax({
                    url: 'Handler/Login.ashx',
                    type: 'POST',
                    data: {
                        getpoint: who,
                        type: 1
                    },
                    success: function (a) {
                        // // //debugger;;
                        try {
                            //如果是合并信息，则取第一个
                            if (a.indexOf(';') != -1) {
                                a = a.split(";");
                                if (a[0] && !isNaN(a[0])) {
                                    $("#ponum").html("&nbsp;&nbsp;" + a[0]);
                                    //$("#ponum").html(123);
                                }
                                else {
                                    // $("#ponum").html('O');
                                }
                            }
                            else {
                                // $("#ponum").html("&nbsp;&nbsp;" + 123);
                                if (a && !isNaN(a)) {
                                    $("#ponum").html("&nbsp;&nbsp;" + a);
                                    //$("#ponum").html(123);
                                }
                                else {
                                    //  $("#ponum").html('O');
                                }
                            }
                        } catch (e) { catche(e); }
                    },
                    error: function (a) {
                        ////debugger;
                        alert('point error! please try again later');
                    }
                });
            }
            else {//未登录用户
                //var tacc1 = '<div id="a2" onclick="showPr()">Previous reports</div><div id="a4" onclick="a4()">Add friends under your account</div><div id="a41"></div><div id="a1" onclick="a1()">Change Passwords</div>';
                var tacc1 = '<div id="accountMsg">';
                tacc1 += '<div id="MsgInfo"><span>Sign up to start collectiong points and get rewards in the future.</span>';
                tacc1 += '<br><div id="s1Info" onclick="s1Info()">Sign Up</div><div id="s2Info" onclick="s2Info()">Log In</div>';
                tacc1 += '<br><div id="s3Info" onclick="s3Info()">Check upcoming drawings</span>';
                tacc1 += '</div></div><div id="a5" onclick="a5()">Points:<span id="ponum"></span></div><div id="closeDetailsaccount" class="close" onclick="closeaccount(2);"><span class="chahao">×</span></div><div id="closeDetailsaccount1" class="close" onclick="closeaccount(1);"><span class="chahao">×</span></div>';


                $("#account").html(tacc1);
                $("#account").show();
                $("#closeDetailsaccount,#closeDetailsaccount1").css({ marginTop: "3px" });
                changeMsgInfo();
                if (closeLR == "L") {
                    $("#closeDetailsaccount").html('');
                    $("#closeDetailsaccount").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
                }
                else {
                    $("#closeDetailsaccount1").html('');
                    $("#closeDetailsaccount1").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
                }

                /*$("#s1Info").live('click', function () {
                window.location.href = "Login.aspx?type=signup";
                });
                $("#s2Info").live('click', function () {
                window.location.href = "Login.aspx?type=login";
                });*/
                GoogleTouchEvent('account');
                $.ajax({
                    url: 'Handler/Login.ashx',
                    type: 'POST',
                    data: {
                        getpoint: who,
                        type: 1
                    },
                    success: function (a) {
                        // // //debugger;;
                        try {
                            //如果是合并信息，则取第一个
                            if (a.indexOf(';') != -1) {
                                a = a.split(";");
                                if (a[0] && !isNaN(a[0])) {
                                    $("#ponum").html("&nbsp;&nbsp;" + a[0]);
                                    //$("#ponum").html(123);
                                }
                                else {
                                    //$("#ponum").html('O');
                                }
                            }
                            else {
                                // $("#ponum").html("&nbsp;&nbsp;" + 123);
                                if (a && !isNaN(a)) {
                                    $("#ponum").html("&nbsp;&nbsp;" + a);
                                    //$("#ponum").html(123);
                                }
                                else {
                                    // $("#ponum").html('O');
                                }
                            }
                        } catch (e) { catche(e); }
                    },
                    error: function (a) {
                        ////debugger;
                        alert('point error! please try again later');
                    }
                });
            }
        }
        if (iPhoneOrientation == 90) {
            $("#s3Info,#a5").css('color', 'grey');
        }
        else {
            $("#s3Info,#a5").css('color', 'blue');
        }
        if (userLevel <= openLevel) {
            $("#a5").css({ "color": "black", "text-decoration": "none" });
        }
    } catch (e) { catche(e); }
}
function s1Info() {
    //   window.location.href = "https://umap.ca/Login.aspx?type=signup";
    window.location.href = "Login.aspx?type=signup";
}
function s2Info() {
    //   window.location.href = "https://umap.ca/Login.aspx?type=login";
    window.location.href = "Login.aspx?type=login";
}
function s3Info() {
    Previouswin();
}
// alert(window.screen.width);
//alert(window.screen.height);
function getAccountLevel() {
    //0:无账户
    //1：系统分配递增账户
    //2：普通账户
    //3：高级账户
    //4：保留账户
    //9：管理员帐户
    var level = 0;
    try {
        if (storage.getItem("account") != null && storage.getItem("account") != "") {
            who = storage.getItem("account");
            var who1 = who.split('@')[0];
            var who2 = who.split('@')[1];
            if (!isNaN(who1) && who1 >= 1000000 && who2 == "umap.ca") {//1000000@umap.ca
                level = 1;
            }
            else if (who == 'admin@umap.ca') {
                level = 9;
            }
            else {
                level = 3;
            }
        }
    } catch (e) { catche(e); }
    return level;
}
var infoinaccount;
function a5() {
    if (userLevel <= openLevel) {
        return true;
    }
    if (iPhoneOrientation == 90) {
        return true;
    }
    try {
        infoinaccount = $("#account").html();
        var pointdiv = '<div id="monthpdiv" class="points">This month points:<span id="monthpspan"></span></div><div id="totalpdiv" class="points">Total points:<span id="totalpspan"></span></div>';
        //== T1
        /*
        pointdiv += '<div id="pact" class="points">Activities:<span id="pact1"></span></div>'; //活跃
        pointdiv += '<div id="psha" class="points">Sharing:<span id="psha1"></span></div>'; //分享积分
        pointdiv += '<br/><div id="prep" class="points">Reports:<span id="prep1"></span></div>'; //报告
        pointdiv += '<div id="pinv" class="points">Inviting:<span id="pinv1"></span></div>'; //邀请
        */
        //==
        //== T2
        pointdiv += '<div id="pim"><div id="pimg">Finding:<br/>Sharing:<br/>Reporting:<br/>Inviting:<br/>Bonus:</div>';
        pointdiv += '<div id="pimg0"><div id="pimg1"></div><span id="pact1"></span><br/><div id="pimg2"></div><span id="psha1"></span><br/><div id="pimg3"></div><span id="prep1"></span><br/><div id="pimg4"></div><span id="pinv1"></span><br/><div id="pimg5"></div><span id="pbon1"></span></div>';
        pointdiv += '</div>';
        //==
        pointdiv += '<br/><span id="monthtspan" class="points">This month tickets</span><br/><div id="monthtdiv"><div id="monthtdiv1"><br><br><center>loading ……</center></div><div id="eie" onclick="eie()">Enter inviter\'s email</div></div>';
        //pointdiv += '<div id="eie" onclick="eie()">Enter inviter\'s email</div>';
        pointdiv += '<div id="Previouswin">Prizes and Winners</div>';
        pointdiv += '<div id="closepoints" class="close" onclick="backToaccount(2);"><span class="chahao">×</span></div><div id="closepoints1" class="close" onclick="backToaccount(1);"><span class="chahao">×</span></div>';
        //pointdiv += '<div id="closepoints"><button type="button" onclick="backToaccount();" class="specialkey backspace">B</button></div>';
        $("#account").html(pointdiv);
        if (closeLR == "L") {
            $("#closepoints").html('');
            $("#closepoints").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        }
        else {
            $("#closepoints1").html('');
            $("#closepoints1").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        }
        // //debugger;;

        if (verStr.indexOf('iPhone') == -1) {
            $("#pimg1, #pimg2, #pimg3, #pimg4, #pimg5").height(15);
        }
        $.ajax({
            url: 'Handler/Login.ashx',
            type: 'POST',
            data: {
                getpoint: who,
                type: 2
            },
            success: function (a) {
                try {
                    //debugger;
                    if (a) {
                        //iseie,当月积分，总积分，Finding，Sharing，Reporting，Inviting，Bonus，彩票数目，彩票内容  [ caipiao
                        //a = "true,307;826;303;0;4;0;0;10;5861064;7420806;7870760;6723056;6644500;2121023;7031516;6274440;7080118;4502711;7688127;1176172;5651017;4741623;5106244;0086302;6181148;4511174;3766064;3551851;4066265;4317632;2616020;5536821;"
                        //a = "307;826;303;0;4;0;0;3;5861064;7420806;7870760;"
                        a = a.split(";");
                        //本月积分
                        var count = 0;
                        var iseie = a[count++];
                        if (iseie != 'true' && who.indexOf("@") != -1) {
                            $("#eie").show();
                            //$("#Previouswin").css('margin-left', '180px');
                            $("#monthtdiv1").height(65);
                        }
                        else {
                            // $("#Previouswin").css('margin-left', '100px');
                            $("#eie").hide();
                        }
                        $("#monthpspan").html("&nbsp;" + a[count++]); //0
                        $("#totalpspan").html("&nbsp;" + a[count++]); //0

                        //===T1
                        /**/
                        $("#pact1").html("&nbsp;" + a[count++]);  //2
                        $("#psha1").html("&nbsp;" + a[count++]);  //3
                        $("#prep1").html("&nbsp;" + a[count++]);  //4
                        $("#pinv1").html("&nbsp;" + a[count++]);  //5
                        $("#pbon1").html("&nbsp;" + a[count++]);  //6

                        //===width();
                        //===T2
                        var pointMax = a[3];
                        for (var i = 4; i < 8; i++) {
                            pointMax = parseInt(pointMax) > parseInt(a[i]) ? pointMax : a[i];
                        }
                        var pointMax1 = parseInt(pointMax) + parseFloat(pointMax / 3);

                        var length1 = parseInt((a[3] / pointMax1) * 100) + "%";
                        var length2 = parseInt((a[4] / pointMax1) * 100) + "%";
                        var length3 = parseInt((a[5] / pointMax1) * 100) + "%";
                        var length4 = parseInt((a[6] / pointMax1) * 100) + "%";
                        var length5 = parseInt((a[7] / pointMax1) * 100) + "%";
                        ////debugger;
                        for (var i = 1; i < 6; i++) {
                            if (eval('length' + i) == "100%") {
                                eval('length' + i) = "75%";
                            }
                        }

                        $("#pimg1").animate({ width: length1 });
                        $("#pimg2").animate({ width: length2 });
                        $("#pimg3").animate({ width: length3 });
                        $("#pimg4").animate({ width: length4 });
                        $("#pimg5").animate({ width: length5 });

                        //    $("#pimg1").animate({ width: "50px" });
                        //    $("#pimg2").animate({ width: "70px" });
                        //    $("#pimg3").animate({ width: "40px" });
                        //    $("#pimg4").animate({ width: "100px" });
                        //===

                        //如果用户积分1000以上，则向左移一点
                        //var marginl = $("#totalpdiv").css('margin-left');
                        if (a[1] >= 10000) {
                            $("#monthpdiv").css('margin-left', '20px');
                        }
                        if (a[1] >= 1000) {
                            $("#monthpdiv").css('margin-left', '25px');
                        }
                        if (a[2] >= 10000) {
                            $("#totalpdiv").css('margin-left', '4px');
                        }
                        if (a[2] >= 1000) {
                            $("#totalpdiv").css('margin-left', '8px');
                        }
                        var ticketnum = 0;
                        if (a[count]) {
                            ticketnum = a[count];
                        }
                        var li = "";
                        //ticketnum = 6; //test
                        //彩票
                        for (var i = 0; i < ticketnum; i++) {
                            if (i < 60) {//防止出错 onclick='gettickets(this)'
                                li += "<li>" + a[9 + i] + "</li>"; //id='li" + i + "'
                            }
                        }
                        //$("#monthpspan").html(100);
                        //$("#totalpspan").html(123);
                        //li = "<li onclick='gettickets(this)'>#81234568</li><li onclick='gettickets(this)'>#81234568</li><li onclick='gettickets(this)'>#81234568</li>";
                        if (ticketnum > 0) {
                            $("#monthtdiv1").html('<ui id="tickets"></ui><div id="blank"></div>');
                            if (ticketnum < 4) {
                                $("#tickets").css("margin-top", "30px");
                            }
                            else {
                                $("#tickets").css("margin-top", "0px");
                            }
                            $("#tickets").html(li);
                        }
                        else {
                            ////debugger;
                            if (who.indexOf("@") != -1) {
                                var lackT = 0;
                                lackT = 30 - a[1];
                                lackT = 'need ' + lackT + ' points for ticket';
                                $("#monthtdiv1").html('<br><br><center>' + lackT + '</center>');
                            }
                            else {
                                $("#monthtdiv1").html('<div id="s1Info" onclick="s1Info()">Sign Up</div><div id="s2Info" onclick="s2Info()">Log In</div>');
                            }
                        }
                        if (who.indexOf("@") != -1) {
                            /* if (ticketnum < 4) {
                            $("#monthtdiv,#monthtdiv1").height(34);
                            $("#closepoints,#closepoints1").css('margin-top', '98px');
                            }
                            else {
                            $("#monthtdiv").height(65);
                            $("#monthtdiv1").height(63);
                            $("#blank").height(5);
                            }*/
                        }
                        else {//如果没有登陆，提示语句
                            $("#s1Info, #s2Info").css({ 'margin-top': '22px', 'margin-left': '45px' });
                        }
                        if (ticketnum < 7) {
                            $("#blank").height(0);
                        }
                        //$('#monthtdiv1').touchScroll();

                        if (verStr.indexOf('iPhone') == -1) {
                            $("#pimg1, #pimg2, #pimg3, #pimg4, #pimg5").height(15);
                            $("#tickets li").css('margin-left', '15px');
                        }
                    }
                } catch (e) { catchE(e); }
            },
            error: function (a) {
                ////debugger;
                //alert('Point error! please try again later');
                //backToaccount();
                $("#monthtdiv1").html('<center>Connection error</center>');
            }
        });

    } catch (e) { catche(e); }
}
function eie() {
    window.location.href = "Login.aspx?type=eie";
}
function gettickets(th) {
    ////debugger;
    if (th.style.color != "gold") {
        th.style.color = "gold";
        th.style.border = '1px solid gold';
        var pointNum = th.innerHTML;
        $.ajax({
            url: 'Handler/Login.ashx',
            type: 'POST',
            data: {
                getpoint: who,
                pointNum: pointNum,
                type: 3
            },
            success: function (a) {
            }
        });
    }
}
function logout() {
    //debugger;a6
    if (storage) {
        var r = confirm("Confirm Logout ?");
        if (r) {
            window.localStorage.clear();
            location.reload();
        }
    }
}
var whoT = ""; //temp
if (storage && storage.getItem("whoT") != "") {
    whoT = storage.getItem("whoT");
}
//#endregion

//#region biz   click_details                                    商家页
///#region  click_details(a, b, c, d, e) 
// click business name on search result to get into detail page. which will have pictures and business hours and deals
var wf = false; //where from    from map ,no center  default false
var Tccode;
var isupdate = true;
//var exHeight = 0;
//普通商家/SAVE/SHARE

//启用
var showDetails = false;
var Timgsrc;
var Timgsrc1;
var myScrolltime;
var Ubizccode;
var Ubizgps;
function click_details(a, b, c, d, e, f, g, h, i, j, k, plat, plng, ccode, th, exii, dis, scode, biz_hours) {
    //debugger;
    Ubizccode = ccode;
    Ubizgps = plat + "," + plng;
    $("#SearchIcon").css({ "top": "379px", "left": "260px", "display": "block" });
    //$("#SearchIcon").show();
    showDetails = true;
    $("#layerPulse2").hide();
    try {
        if (b.indexOf("Location") != -1) {
            return;
        }
        //debugger;
        $("#page2").css("margin-left", "0px");
        pageFZOK1 = false;
        //d = "";
        //directionsRenderer.setMap(null);
        /*debugger;
        a = "0"
        b = "Fit For Life"
        c = "2 Bloor St West #38# Toronto"
        ccode = "Gmmm8lk9"
        d = "416-964-9816"
        dis = "20m"
        //exii = 0
        f = "10101"
        g = "997994358@qq.com"
        h = "http://baidu.com"
        i = "ture"
        j = " fast food "
        k = 1*/
        //plat = "43.6702954"
        //plng = "-79.3870295"
        /* biz_hours = 'Mon. 8:00am - 10:00pm<br>';
        biz_hours += 'Tue. 8:00am - 10:00pm<br>';
        biz_hours += 'Wen. 8:00am - 10:00pm<br>';
        biz_hours += 'Thu. 8:00am - 10:00pm<br>';
        biz_hours += 'Sat. 8:00am - 10:00pm<br>';
        biz_hours += 'Sun. 8:00am - 10:00pm<br>';
        biz_hours += 'Hol. close<br>';
   
        biz_hours = '<table cellpadding="0" cellspacing="0" ><tr><td>';
        biz_hours += 'Mon.</td><td> 8:00am - 10:00pm</td></tr><td>';
        biz_hours += 'Tue.</td><td> 8:00am - 10:00pm</td></tr><td>';
        biz_hours += 'Wen.</td><td> 8:00am - 10:00pm</td></tr><td>';
        biz_hours += 'Thu.</td><td> 8:00am - 10:00pm</td></tr><td>';
        biz_hours += 'Sat.</td><td> 8:00am - 10:00pm</td></tr><td>';
        biz_hours += 'Sun.</td><td> 8:00am - 10:00pm</td></tr><td>';
        biz_hours += 'Hol.</td><td> 8:00am - 10:00pm';
        biz_hours += '</td></tr></table>';
        */

        //e = "../BizImages/Go2qt2.jpg";
        //a:aid
        //b:name
        //c:address
        //d:phone
        //e:Photonumber
        //f:Fax
        //g:Email
        //h:Website
        //i:Claim
        //j:Unit_business
        //k:第N个
        //plat
        //plng
        //ccode
        //th:this
        //exii：第n个
        //dis:距离
        //$("#page0").hide();
        $("#page0").css("margin-left", "-100px");
        b = ReplaceF(b);
        c = ReplaceF(c);
        b1 = ReplaceT(b);
        // debugger;
        //$("#biztitle").html('<div onclick="dis(event);bizToMap()" id="bizback"><div id="bkd2"></div><div id="bkd33"><a>Map</a></div></div><div id="_bizname">' + b + '</div>');
        $("#biztitle").html('<div onclick="dis(event);bizToMap()" id="bizback"><a>S</a></div><div id="_bizname">' + b + '</div>');
        //var mainText = '<div id="_bizmap"><img id="_staticmap" onclick="showBizImg(1);"></div><div id="_bizTime" onclick="showTimeOnPage(this)"><font style="font-weight: bold;">Business Hours:</font><div id="_bizTime1"></div></div><div class="_bizinfo" id="_bizTel"><a href="tel:' + d + '">' + d + '</a></div><div id="_route" onclick="calDis(' + plat + ',' + plng + ',\'' + dis + '\',\'' + b1 + '\')">Route</div><div class="_bizinfo" id="_bizAdd">' + c + '</div><div id="_bizShare" class="_bizinfo">Share link: umap.ca?' + ccode + '<br><div onclick=\"shareBiz(true,\'' + a + '\',\'' + b1 + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',null,null,this);sharebySMS(\'' + ccode + '\')\"><a>Text Message</a></div><div  onclick=\"shareBiz(true,\'' + a + '\',\'' + b1 + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',null,null,this);\"><a href=\'mailto:?Subject=shared%20Location&body=umap.ca/?' + ccode + '\'>E-Mail</a></div><div onclick=\"shareBiz(true,\'' + a + '\',\'' + b1 + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',null,null,this);\"><a href=\'tweetie:///post?message=Share location from umap. umap.ca/?' + ccode + '\'>Twitter</a></div></div>';
        if (!dis) {
            dis = "";
        }
        /*2012.08.24   var mainText = '<div id="_bizmap"><img id="_staticmap" onerror="imgError1(1)" onclick="showBizImg(1);"></div><div id="_bizTime" onclick="showTimeOnPage(this)"><div id="_bizTime1"><font style="font-weight: bold;">Business Hours:</font><div id="time1">' + biz_hours + '</div></div></div><div class="_bizinfo" id="_bizTel"><a href="tel:' + d + '">' + d + '</a></div><div id="_route" onclick="calDis(' + plat + ',' + plng + ',\'' + dis + '\',\'' + b1 + '\')">Route</div><div class="_bizinfo" id="_bizAdd">' + c + '</div><div id="_bizShare" class="_bizinfo">Share link: umap.ca?' + ccode + '<br><div class=\"sms\" onclick=\"shareBiz(true,\'' + a + '\',\'' + b1 + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',null,null,this);sharebySMS(\'' + ccode + '\')\"><a>Text Message</a></div><div  onclick=\"shareBiz(true,\'' + a + '\',\'' + b1 + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',null,null,this,\'mailto:?Subject=shared%20Location&body=umap.ca/?' + ccode + '\');\"><a>E-Mail</a></div><div onclick=\"shareBiz(true,\'' + a + '\',\'' + b1 + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',null,null,this,\'tweetie:///post?message=Share location from umap. umap.ca/?' + ccode + '\');\"><a>Twitter</a></div></div>';*/
        var mainText = '<div id="_bizmap"><img id="_staticmap" onerror="imgError1(1)" onclick="showBizImg(1);"></div><div id="_bizTime" onclick="showTimeOnPage(this)"><div id="_bizTime1"><font style="font-weight: bold;">Business Hours:</font><div id="time1">' + biz_hours + '</div></div></div><div class="_bizinfo" id="_bizTel"><a href="tel:' + d + '">' + d + '</a></div><div id="_route" onclick="calDis(' + plat + ',' + plng + ',\'' + dis + '\',\'' + b1 + '\')">Route</div><div class="_bizinfo" id="_bizAdd">' + c + '</div><div id="_bizShare" class="_bizinfo">Share link: <input id="ccode"  onfocus="inputSwitch = true;" onblur="inputBlur()"  type="text" value="umap.ca/?' + ccode + '" ><hr><div class=\"sms\" onclick=\"shareBiz(true,\'' + a + '\',\'' + b1 + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',null,null,this);sharebySMS(\'' + ccode + '\')\"><a>Text Message</a></div><div  onclick=\"shareBiz(true,\'' + a + '\',\'' + b1 + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',null,null,this,\'mailto:?Subject=shared%20Location&body=umap.ca/?' + ccode + '\');\"><a>E-Mail</a></div><div onclick=\"shareBiz(true,\'' + a + '\',\'' + b1 + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',null,null,this,\'tweetie:///post?message=Share location from umap. umap.ca/?' + ccode + '\');\"><a>Twitter</a></div></div>';

        mainText += '<div id="_report" class="_bizinfo" onclick="newReport(\'' + ccode + '\',\'' + plat + '\',\'' + plng + '\')">Report</div><span id="blank"></span>';
        $("#_bizMain").html(mainText);
        if (!d) {
            $("#_bizTel").hide();
            $('#_route').css({ "width": "260px", "margin-left": "15px" });
        }
        //#region map
        /*
        var myOptions1 = {
        zoom: 14,
        center: newgps,
        //draggable: false,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        try {
        setTimeout(function () {
        map1 = new google.maps.Map(document.getElementById("_bizmap"), myOptions1);
        var marker0 = new google.maps.Marker({
        position: newgps,
        icon: gpsicon,
        map: map1
        });

        marker0.setAnimation(google.maps.Animation.DROP);
        //debugger;
        var _HereGps = new google.maps.LatLng(plat, plng);
        var image = new google.maps.MarkerImage('images/iconr' + k + '.png',
        new google.maps.Size(20, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34));
        /*            var image = new google.maps.MarkerImage('images/iconrc.png',
        new google.maps.Size(20, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34));

        var iconText = new google.maps.MarkerImage('images/' + knam + '.png',
        new google.maps.Size(20, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34));* /
        var marker0 = new google.maps.Marker({
        position: _HereGps,
        icon: image,
        map: map1
        });

        marker0.setAnimation(google.maps.Animation.DROP);
        setTimeout(function () {
        var nn = "" + newgps.lat();
        var ss = "" + newgps.lat();
        var ww = "" + newgps.lng();
        var ee = "" + newgps.lng();
        if ((parseFloat(nn) - parseFloat(plat)) >= 0) {
        nn = nn;
        }
        else {
        nn = plat;
        }
        if ((parseFloat(ss) - parseFloat(plat)) <= 0) {
        ss = ss;
        }
        else {
        ss = plat;
        }
        if ((parseFloat(ww) - parseFloat(plng)) >= 0) {
        ww = plng;
        }
        else {
        ww = ww;
        }
        if ((parseFloat(ee) - parseFloat(plng)) >= 0) {
        ee = ee;
        }
        else {
        ee = plng;
        }
        var ne = new google.maps.LatLng(nn, ee);
        var sw = new google.maps.LatLng(ss, ww);
        var bounds = new google.maps.LatLngBounds(sw, ne);
        map1.fitBounds(bounds);
        if (map1.getZoom() > 18) {
        map1.setZoom(18);
        }
        //map1.setZoom(map1.getZoom() + 1);
        }, 500);
        }, 200);
        } catch (e) {
        alert(e);
        }*/
        //#endregion
        //#region 静态地图

        //http://maps.google.com/maps/api/staticmap?center=63.259591,-144.667969&zoom=6&size=400x400\&markers=color:blue%7Clabel:S%7C62.107733,-145.541936&markers=size:tiny%7Ccolor:green%7CDelta+Junction,AK\&markers=size:mid%7Ccolor:0xFFFF00%7Clabel:C%7CTok,AK&sensor=false" />
        var url = 'http://maps.google.com/maps/api/staticmap?center=';

        url += encodeURI(plat) + ',' + encodeURI(plng);
        var url1 = url;
        url += '&zoom=15&size=143x100&format=jpg&markers=size:mid|color:blue|label:1|' + plat + ',' + plng + '&sensor=false';
        url1 += '&zoom=15&size=310x250&format=jpg&markers=size:mid|color:blue|label:1|' + plat + ',' + plng + '&sensor=false';
        $("#_staticmap")[0].src = url;
        Timgsrc = url;
        /*
        var trs = getObj('tdFlagList').getElementsByTagName('tr');
        for (var i = 1; i < trs.length; i++) {
        var txtFlagAddress = trs[i].getElementsByTagName('input')[0];
        if (txtFlagAddress.value == '') {
        continue;
        }
        var selFlagColor = trs[i].getElementsByTagName('select')[0];
        var selFlagSize = trs[i].getElementsByTagName('select')[1];
        var txtFlagLabel = trs[i].getElementsByTagName('input')[1];
        url += '&markers=size:' + selFlagSize.value;
        url += '|color:' + selFlagColor.options[selFlagColor.selectedIndex].text;
        url += '|label:' + txtFlagLabel.value;
        url += '|' + encodeURI(txtFlagAddress.value);
        }
        url += '&sensor=false';

        getObj('txtImageUrl').value = url;
        getObj('imgMap').src = url;
        getObj('imgMap').style.display = 'block';
        */
        //debugger;
        //if (!$("#coverbody")) {
        AddBGIMG();
        $("#coverbody").html("Loading ···");
        document.getElementById('imgbiz10').src = url1;
        Timgsrc1 = url1;
        $("#imgbiz0").show();

        //#endregion
        //#region 图片与营业时间调用用Ajax
        if (!!ccode) {
            $.ajax({
                url: 'Handler/Login.ashx',
                type: 'POST',
                data: {
                    ImgAndTime: ccode
                    , who: who
                },
                success: function (info) {
                    try {
                      //debugger;
                        info = info.split('￥');
                        biz_hours = info[0];
                        e = "../images/S150/" + info[1] + ".JPG";
                        e1 = "../images/S480/" + info[1] + ".JPG";
                        //e = "../images/S150/CATO01/CATO01-2011-2-26/DSC_00011.JPG";
                        //e1 = "../images/S480/CATO01/CATO01-2011-2-26/DSC_0001.JPG";
                        isupdate = false;
                        var Time = '<font style="font-weight: bold;">Business Hours:</font><div id="time1">' + biz_hours + '</div>'; //<div id="time"></div>
                        $("#_bizTime1").html(Time);
                        $("#_bizTime,#_bizTime1").show();
                        try {
                            //照片
                            if (!!e && isNull(e.length > 0)) {
                                $("#_staticmap")[0].src = e;
                                $("#imgbiz10")[0].src = e1;
                            }
                            else {
                                //document.imgbiz0.src = null;
                                //$("#imgbiz0").hide();
                                //                            $("#imgbiz").hide();
                                //                            $("#imgbiz10").hide();
                                //                            $("#time,#time1").width('100%');
                                //document.imgbiz10.src = "images/search_clear.PNG";
                            }
                        } catch (e) { }
                        //if (biz_hours) {        
                        try {
                            if (userLevel < 30) {
                                if (biz_hours.indexOf("Fri") == -1 && biz_hours.indexOf("24") == -1) {
                                    $("#_bizTime").hide();
                                }
                                else {
                                    $("#p3_bizinfo1").show();
                                    $("#biz_hours,#imgbiz").css('border-bottom', '0px !important');
                                }
                            }
                            else {
                                $("#p3_bizinfo1").show();
                                $("#biz_hours,#imgbiz").css('border-bottom', '0px !important');
                            }
                            // myScrolltime = new iScroll('_bizTime', { vScrollbar: false });
                            // setTimeout(function () { $("#time1").touchScroll("update"); }, 200);
                        } catch (e) {
                            //alert(e);
                        }

                        //$('#time1').touchScroll();
                    } catch (e) {
                        //alert(e);
                    }
                    //debugger
                    //setTimeout("$('#bizIn').touchScroll('update');", 100);
                    //setTimeout('$("time1").touchScroll();
                    //var Ttr = $("#hu")[0].parentNode.parentNode;


                    //}', 200);
                    //}

                    //$('#page3_detail').touchScroll('update');
                },
                error: function () {
                    // alert('share biz fault');
                }
            });
        }
        //#endregion
        //debugger;
        setTimeout(function () {
            testTextHeight("_bizname", 30, 0);
        }, 100);
        setTimeout(function () {
            testTextHeight("_bizname", 30, 0);
        }, 200);
        $("#page2").height(416);
        $("#page2").show();
        $("#_bizSave").html('<div id="closetab1" class="close left" onclick="dis(event);bizToMap(1);"><span class="chahao">×</span></div><div id="closetab2" class="close right" style="display:none;" onclick="dis(event);bizToMap(2);"><span class="chahao">×</span></div><div id="_save" onclick="saveSearch(\'' + a + '\',\'' + b1 + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',null,null,null,\'_save\')" id="saveBiz">Save</div>');
        $("#closetab2").html('');
        $("#closetab2").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        /* if (closeLR == "L") {
        $("#closetab2").html('');
        $("#closetab2").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        }
        else {
        $("#closetab1").html('');
        $("#closetab1").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        }*/
        if (iPhoneOrientation == 0) {
            //            $('body').css('background', '#6070A4');
            //            $('body').css('background', '#6070A4');
            //            $('html').css('background', '#6070A4');
            $("#page1").attr("class", 'cubeleft out');
            $("#page2").attr("class", 'cubeleft in current');

        }
        else {
            //            $('body').css('background', '#6070A4');
            //            $('body').css('background', '#6070A4');
            //            $('html').css('background', '#6070A4');
            $("#page1").attr("class", 'cubeleft1 out1');
            $("#page2").attr("class", 'cubeleft1 in1 current');
        }
        setTimeout('pageFZOK1 = true;', 900);
        setTimeout(function () {
            if (pageFZOK && pageFZOK1) {
                $('html,body').css('background-image', 'url("images/dot.png")');
                $('html,body').css('background-repeat', 'repeat');
                $('html,body').css('background-position', 'top left, top right');
            }
        }, 1000);
        GoogleTouchEvent('biztitle');
        GoogleTouchEvent('_bizSave');
        GoogleTouchEvent('_bizMain');
        //    GoogleTouchEvent('_bizMain', null, null, true);
        // $("#_bizMain").touchScroll();
        testTextHeight('_bizAdd', 20);
        if (!ccode) {
            $("#_bizShare,#_save").hide();
            $("#_bizAdd").css('font-size', '17px');
            $("#_bizTel,#_route").css({ "margin-top": "20px", "margin-bottom": "20px" });
        }
        if (biz_hours) {
            $("#_bizTime").show();
        }
    } catch (e) {

    }
    var today1 = new Date().getDay();
    $("#whichred" + today1).css("color", "red");
    //setTimeout("testTextHeight('_bizAdd',20)", 400);
}
function getDetails(reference, k, exii, th) {
    //debugger;

    //e = "../BizImages/Go2qt2.jpg";
    //a:aid
    //b:name
    //c:address
    //d:phone
    //e:Photonumber
    //f:Fax
    //g:Email
    //h:Website
    //i:Claim
    //j:Unit_business
    //k:第N个
    //plat
    //plng
    //ccode
    //th:this
    //exii：第n个
    //dis:距离
    //$("#page0").hide();

    /*
    place: Object
    address_components: Array[4]
    formatted_address: "420 Hwy 7 E Unit B103, Richmond Hill, ON, Canada"
    formatted_phone_number: "(905) 882-8848"
    geometry: Object
    html_attributions: Array[1]
    icon: "http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png"
    id: "8c811b019a835e1cfaaa7d6c79bcdf421874d2ba"
    international_phone_number: "+1 905-882-8848"
    name: "Education Power Inc"
    opening_hours: Object
    open_now: false
    periods: Array[3]
    0: Object
    1: Object
    2: Object
    length: 3
    __proto__: Array[0]
    __proto__: Object
    reference: "CoQBcQAAAJnHUkfwFSmgFyVYbvCeqvihebVCIsE93BdFJs7-8A41y4qZQAqkJhvEXNPwmqjQNHAq_dgKlTANiffmZpS7_nXYmFFX2WQxgJSPFTsvt7Xv0W_S0YxTZHtQcuSEdvHzjBSe_tLWAAw-eAw3nJPw2fIpd7Rz4Rkpv5Gs9FZd6xpIEhD-YzyfrYGEUmDeK5LzpIuuGhT3JsslckfH0vlRJhsxo8gbmsCnpg"
    types: Array[1]
    tz: "GMT-0400"
    url: "https://plus.google.com/116229244613814933686/about?hl=zh-CN"
    utc_offset: -240
    vicinity: "420 Hwy 7 E Unit B103, Richmond Hill"
    website: "http://www.educationpower.ca/"
    */
    try {
        var request1 = {
            reference: reference
        };
        service.getDetails(request1, function (place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                //debugger;
                var a = "";
                var b = place.name;
                var c = place.vicinity;
                var d = place.formatted_phone_number;
                var e, f, g, h, i, j, ccode, dis, scode = "";
                var plat = place.geometry.location.lat();
                var plng = place.geometry.location.lng();
                var biz_info = "";
                try {
                    var biz_hours = place.opening_hours.periods;
                    if (biz_hours) {
                        biz_info = '<table cellpadding="0" cellspacing="0">'; //<div id="time"><div id="time1">
                        var today = new Date().getDay();

                        i = today;
                        switch (today) {
                            case 1: today = "Monday"; break;
                            case 2: today = "Tuesday"; break;
                            case 3: today = "Wednesday"; break;
                            case 4: today = "Thursday"; break;
                            case 5: today = "Friday"; break;
                            case 6: today = "Saturday"; break;
                            case 0: today = "Sunday"; break;
                        }
                        biz_info += "<tr class=\"today\"><td colspan=\"4\">" + today + "  : <p>" + (biz_hours[i].open.hours > 12 ? biz_hours[i].open.hours - 12 : biz_hours[i].open.hours) + (biz_hours[i].open.minutes > 0 ? ":" + biz_hours[i].open.minutes : "") + "&nbsp;&nbsp;am  to&nbsp;&nbsp;" + (biz_hours[i].close.hours > 12 ? biz_hours[i].close.hours - 12 : biz_hours[i].close.hours) + (biz_hours[i].close.minutes > 0 ? ":" + biz_hours[i].close.minutes : "") + "pm</td></tr>";

                        for (var i = 1; i < biz_hours.length; i++) {
                            switch (biz_hours[i].open.day) {
                                case 1: biz_info += "<tr id='whichred1'><td>Monday :</td><td>" + (biz_hours[i].open.hours > 12 ? biz_hours[i].open.hours - 12 : biz_hours[i].open.hours) + (biz_hours[i].open.minutes > 0 ? ":" + biz_hours[i].open.minutes : "") + "am</td><td class='to'> to</td><td>" + (biz_hours[i].close.hours > 12 ? biz_hours[i].close.hours - 12 : biz_hours[i].close.hours) + (biz_hours[i].close.minutes > 0 ? ":" + biz_hours[i].close.minutes : "") + "pm</td></tr>"; break;

                                case 2: biz_info += "<tr id='whichred2'><td>Tuesday :</td><td>" + (biz_hours[i].open.hours > 12 ? biz_hours[i].open.hours - 12 : biz_hours[i].open.hours) + (biz_hours[i].open.minutes > 0 ? ":" + biz_hours[i].open.minutes : "") + "am</td><td class='to'> to</td><td>" + (biz_hours[i].close.hours > 12 ? biz_hours[i].close.hours - 12 : biz_hours[i].close.hours) + (biz_hours[i].close.minutes > 0 ? ":" + biz_hours[i].close.minutes : "") + "pm</td></tr>"; break;

                                case 3: biz_info += "<tr id='whichred3'><td>Wednesday:</td><td>" + (biz_hours[i].open.hours > 12 ? biz_hours[i].open.hours - 12 : biz_hours[i].open.hours) + (biz_hours[i].open.minutes > 0 ? ":" + biz_hours[i].open.minutes : "") + "am</td><td class='to'> to</td><td>" + (biz_hours[i].close.hours > 12 ? biz_hours[i].close.hours - 12 : biz_hours[i].close.hours) + (biz_hours[i].close.minutes > 0 ? ":" + biz_hours[i].close.minutes : "") + "pm</td></tr>"; break;

                                case 4: biz_info += "<tr id='whichred4'><td>Thursday :</td><td>" + (biz_hours[i].open.hours > 12 ? biz_hours[i].open.hours - 12 : biz_hours[i].open.hours) + (biz_hours[i].open.minutes > 0 ? ":" + biz_hours[i].open.minutes : "") + "am</td><td class='to'> to</td><td>" + (biz_hours[i].close.hours > 12 ? biz_hours[i].close.hours - 12 : biz_hours[i].close.hours) + (biz_hours[i].close.minutes > 0 ? ":" + biz_hours[i].close.minutes : "") + "pm</td></tr>"; break;

                                case 5: biz_info += "<tr id='whichred5'><td>Friday :</td><td>" + (biz_hours[i].open.hours > 12 ? biz_hours[i].open.hours - 12 : biz_hours[i].open.hours) + (biz_hours[i].open.minutes > 0 ? ":" + biz_hours[i].open.minutes : "") + "am</td><td class='to'> to</td><td>" + (biz_hours[i].close.hours > 12 ? biz_hours[i].close.hours - 12 : biz_hours[i].close.hours) + (biz_hours[i].close.minutes > 0 ? ":" + biz_hours[i].close.minutes : "") + "pm</td></tr>"; break;

                                case 6: biz_info += "<tr id='whichred6'><td>Saturday :</td><td>" + (biz_hours[i].open.hours > 12 ? biz_hours[i].open.hours - 12 : biz_hours[i].open.hours) + (biz_hours[i].open.minutes > 0 ? ":" + biz_hours[i].open.minutes : "") + "am</td><td class='to'> to</td><td>" + (biz_hours[i].close.hours > 12 ? biz_hours[i].close.hours - 12 : biz_hours[i].close.hours) + (biz_hours[i].close.minutes > 0 ? ":" + biz_hours[i].close.minutes : "") + "pm</td></tr>"; break;

                                //case 0:                                                                                                                                           
                            }
                            /* switch (biz_hours[i].open.day) {
                            case 0: biz_info += "<tr class=\"today\"><td>Sun:<p>" + (biz_hours[i].open.hours > 12 ? biz_hours[i].open.hours - 12 : biz_hours[i].open.hours) + ":" + (biz_hours[i].open.minutes > 0 ? biz_hours[i].open.minutes : "00") + "&nbsp;am&nbsp; to&nbsp;" + (biz_hours[i].close.hours > 12 ? biz_hours[i].close.hours - 12 : biz_hours[i].close.hours) + ":" + (biz_hours[i].close.minutes > 0 ? biz_hours[i].close.minutes : "00") + "&nbsp;pm</td></tr>"; break;

                            case 1: biz_info += "<tr><td>Mon:&nbsp;" + (biz_hours[i].open.hours > 12 ? biz_hours[i].open.hours - 12 : biz_hours[i].open.hours) + ":" + (biz_hours[i].open.minutes > 0 ? biz_hours[i].open.minutes : "00") + "&nbsp;am&nbsp; to&nbsp;" + (biz_hours[i].close.hours > 12 ? biz_hours[i].close.hours - 12 : biz_hours[i].close.hours) + ":" + (biz_hours[i].close.minutes > 0 ? biz_hours[i].close.minutes : "00") + "&nbsp;pm</td></tr>"; break;
                            case 2: biz_info += "<tr><td>Tue:&nbsp;" + (biz_hours[i].open.hours > 12 ? biz_hours[i].open.hours - 12 : biz_hours[i].open.hours) + ":" + (biz_hours[i].open.minutes > 0 ? biz_hours[i].open.minutes : "00") + "&nbsp;am&nbsp; to&nbsp;" + (biz_hours[i].close.hours > 12 ? biz_hours[i].close.hours - 12 : biz_hours[i].close.hours) + ":" + (biz_hours[i].close.minutes > 0 ? biz_hours[i].close.minutes : "00") + "&nbsp;pm</td></tr>"; break;
                            case 3: biz_info += "<tr><td>Wed:&nbsp;" + (biz_hours[i].open.hours > 12 ? biz_hours[i].open.hours - 12 : biz_hours[i].open.hours) + ":" + (biz_hours[i].open.minutes > 0 ? biz_hours[i].open.minutes : "00") + "&nbsp;am&nbsp; to&nbsp;" + (biz_hours[i].close.hours > 12 ? biz_hours[i].close.hours - 12 : biz_hours[i].close.hours) + ":" + (biz_hours[i].close.minutes > 0 ? biz_hours[i].close.minutes : "00") + "&nbsp;pm</td></tr>"; break;
                            case 4: biz_info += "<tr><td>Thu:&nbsp;" + (biz_hours[i].open.hours > 12 ? biz_hours[i].open.hours - 12 : biz_hours[i].open.hours) + ":" + (biz_hours[i].open.minutes > 0 ? biz_hours[i].open.minutes : "00") + "&nbsp;am&nbsp; to&nbsp;" + (biz_hours[i].close.hours > 12 ? biz_hours[i].close.hours - 12 : biz_hours[i].close.hours) + ":" + (biz_hours[i].close.minutes > 0 ? biz_hours[i].close.minutes : "00") + "&nbsp;pm</td></tr>"; break;
                            case 5: biz_info += "<tr><td>Fri:&nbsp;&nbsp;&nbsp;" + (biz_hours[i].open.hours > 12 ? biz_hours[i].open.hours - 12 : biz_hours[i].open.hours) + ":" + (biz_hours[i].open.minutes > 0 ? biz_hours[i].open.minutes : "00") + "&nbsp;am&nbsp; to&nbsp;" + (biz_hours[i].close.hours > 12 ? biz_hours[i].close.hours - 12 : biz_hours[i].close.hours) + ":" + (biz_hours[i].close.minutes > 0 ? biz_hours[i].close.minutes : "00") + "&nbsp;pm</td></tr>"; break;
                            case 6: biz_info += "<tr><td>Sat:&nbsp;" + (biz_hours[i].open.hours > 12 ? biz_hours[i].open.hours - 12 : biz_hours[i].open.hours) + ":" + (biz_hours[i].open.minutes > 0 ? biz_hours[i].open.minutes : "00") + "&nbsp;am&nbsp; to&nbsp;" + (biz_hours[i].close.hours > 12 ? biz_hours[i].close.hours - 12 : biz_hours[i].close.hours) + ":" + (biz_hours[i].close.minutes > 0 ? biz_hours[i].close.minutes : "00") + "&nbsp;pm</td></tr>"; break;
                            }*/
                        }
                        i = 0;
                        biz_info += "<tr id='whichred0'><td>Sunday :</td><td>" + (biz_hours[i].open.hours > 12 ? biz_hours[i].open.hours - 12 : biz_hours[i].open.hours) + (biz_hours[i].open.minutes > 0 ? ":" + biz_hours[i].open.minutes : "") + "am&nbsp;</td><td class='to'> to</td><td>&nbsp;" + (biz_hours[i].close.hours > 12 ? biz_hours[i].close.hours - 12 : biz_hours[i].close.hours) + (biz_hours[i].close.minutes > 0 ? ":" + biz_hours[i].close.minutes : "") + "pm</td></tr>";

                    }

                    biz_info += "</table>"; //</div></div>

                } catch (e) {

                }
                click_details(a, b, c, d, e, f, g, h, i, j, k, plat, plng, ccode, th, exii, dis, scode, biz_info);
            }
        });

    } catch (e) {

    }






}
function imgError1(x) {
    if (x == "1") {
        $("#_staticmap")[0].src = Timgsrc;
    }
    else {
        document.getElementById('imgbiz10').src = Timgsrc1;
    }
}
function showTimeOnPage() {
    //debugger;
    AddBGIMG();
    $("#coverbody").html(" ");
    $("#_bizTime0").html($("#_bizTime").html());
    $("#coverbody,#_bizTime0").show();
    GoogleTouchEvent('coverbody');
    GoogleTouchEvent('_bizTime0');
}
function testTextHeight(id, max) {
    //debugger;
    if ($("#" + id).height() > max) {
        $("#" + id).css('font-size', ($("#" + id).css('font-size').split('px')[0] - 1) + 'px');
        testTextHeight(id, max);
    }
    else { return; }
}
function bizToMap(x) {
    showDetails = false;
    $("#SearchIcon").hide();
    //$("#SearchIcon").css({ "top": "173px", "left": "276px" });
    try {
        if (x) {
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
        }
        //$("#_bizMain").touchScroll('setPosition', 0);
    } catch (e) { catche(e); }
    //    $('body').css('background', '#6070A4');
    //    $('body').css('background', '#6070A4');
    //    $('html').css('background', '#6070A4');
    //debugger;
    //$("#mapcor1,#mapcor2,#mapcor3,#mapcor4").hide();
    if (iPhoneOrientation == 0) {
        $("#page2").attr("class", 'cuberight out');
        $("#page1").attr("class", 'cuberight in current');
    }
    else {
        $("#page2").attr("class", 'cuberight1 out1');
        $("#page1").attr("class", 'cuberight1 in1 current');
    }
    setTimeout('testhisw1()', 400);
}
function testhisw1() {
    setTimeout(function () {
        if (pageFZOK && pageFZOK1) {
            $('html,body').css('background-image', 'url("images/dot.png")');
            $('html,body').css('background-repeat', 'repeat');
            $('html,body').css('background-position', 'top left, top right');
        }
        else {
            setTimeout('testhisw1()', 200);
        }
    }, 400);
    setTimeout('$("#page0").css("margin-left", "0px");', 1000);
}
function click_details0(a, b, c, d, e, f, g, h, i, j, k, plat, plng, ccode, th, exii, dis, scode, biz_hours) {
    //debugger;
    //exHeight = $("#container").height();
    //debugger;
    $("#page3_details").css('margin-top', '210px');
    if (b.indexOf("Location") != -1) {
        return;
    }
    //console.log(8481);
    //$("#container").css("position", "initial");
    Tccode = ccode;
    showswitch = false;
    $("#zoom6,#zoom8,#zoom10").hide();
    $('#gpsy').css('right', '0px');
    $('#gpsInMap').css({ 'top': '0px !important', 'right': '0px' });
    $('#croInMap').css('top', '0px !important');
    $("#page3_details").html('<div id="page3_detail"></div>');
    $("#dis").width("");
    //directionsRenderer.setMap(null);
    /*debugger;
    a = "0"
    b = "Fit For Life"
    c = "2 Bloor St West #38# Toronto"
    ccode = "Gmmm8lk9"
    d = "416-964-9816"
    dis = "20m"
    //exii = 0
    f = "10101"
    g = "997994358@qq.com"
    h = "http://baidu.com"
    i = "ture"
    j = " fast food "
    k = 1*/
    //plat = "43.6702954"
    //plng = "-79.3870295"
    /* biz_hours = 'Mon. 8:00am - 10:00pm<br>';
    biz_hours += 'Tue. 8:00am - 10:00pm<br>';
    biz_hours += 'Wen. 8:00am - 10:00pm<br>';
    biz_hours += 'Thu. 8:00am - 10:00pm<br>';
    biz_hours += 'Sat. 8:00am - 10:00pm<br>';
    biz_hours += 'Sun. 8:00am - 10:00pm<br>';
    biz_hours += 'Hol. close<br>';
   
    biz_hours = '<table cellpadding="0" cellspacing="0" ><tr><td>';
    biz_hours += 'Mon.</td><td> 8:00am - 10:00pm</td></tr><td>';
    biz_hours += 'Tue.</td><td> 8:00am - 10:00pm</td></tr><td>';
    biz_hours += 'Wen.</td><td> 8:00am - 10:00pm</td></tr><td>';
    biz_hours += 'Thu.</td><td> 8:00am - 10:00pm</td></tr><td>';
    biz_hours += 'Sat.</td><td> 8:00am - 10:00pm</td></tr><td>';
    biz_hours += 'Sun.</td><td> 8:00am - 10:00pm</td></tr><td>';
    biz_hours += 'Hol.</td><td> 8:00am - 10:00pm';
    biz_hours += '</td></tr></table>';
    */

    //e = "../BizImages/Go2qt2.jpg";
    //a:aid
    //b:name
    //c:address
    //d:phone
    //e:Photonumber
    //f:Fax
    //g:Email
    //h:Website
    //i:Claim
    //j:Unit_business
    //k:第N个
    //plat
    //plng
    //ccode
    //th:this
    //exii：第n个
    //dis:距离

    //#region cc  c-w-g()
    if (th) {
        cc(th, 2);
    }
    if (!wf) {
        if (map.getZoom() < 14 || exk != k) {
            centerwithGPS(plat, plng, k, null, null, null, null, null, null, exii);
        }
    }
    //#endregion
    var tb = b;
    // b = b.replace("#39#", "'");
    b = ReplaceF(b);
    jumpTo(0);
    if ((b.indexOf("Saved Location:") != 0) || (b.indexOf("Shared Location:") != 0)) {//如果是普通搜索
        /* if (map.getZoom() < 18 && exs) {
        centerwithGPS(plat, plng, k);
        }*/
    }
    //testMapwithGPS(plat, plng);
    //  $("#page3_details").css("background-color", "#d7d8d9");
    //    var f = "Fax";
    //    var g = "Email";
    //    var h = "Website";
    //    var i = "";
    if (!ccode) {
        ccode = 0;
    }

    /*/#region 早期商家页2012.02.29
    //#region 如果是shared
    if (b.indexOf("Shared Location:") == 0) {
    //$("#page3_detail").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo"><tr><td id="biz_name" class="details"></td></tr><tr><td id="biz_info" class="details"></td></tr><tr><td id="biz_address" class="details"></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td><td><table id="bizpic" cellpadding="0" cellspacing="0" ><tr><td><img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr></table><div id="p3_ownernotes"><div class="cross4" style="color: gray;" id="shareBiz">Share</div><div class="cross5" onclick="saveSearch(\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',true,false)" id="saveBiz">Save</div><div id="closeDetails" onclick="closeDetails();"><span class="chahao">×</span></div></div>');
    //        $("#page3_detail").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo"><tr><td id="biz_name" class="details" colspan="2">                                                                                                                                                                                                                                                                                                                                                         </td></tr><tr><td id="biz_info" class="details" colspan="2"></td></tr><tr><td id="biz_address" class="details"></td><td rowspan="3"><table id="bizpic" cellpadding="0" cellspacing="0" ><tr><td id="imgbiz"><img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td></tr></table><div id="p3_ownernotes"><div class="bizListIcon" onclick="centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'' + 1 + '\',\'\',\'\',\'\',\'\',\'\',true,1,true)" style="background-image: url(\'./images/Icon_b_none.png\');">' + 1 + '</div><div class="cross4"  onclick="shareBiz(false,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',\'' + scode + '\')" id="shareBiz">Share</div><div class="cross5" onclick="saveSearch(\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',true,false,\'' + scode + '\')" id="saveBiz">Save</div><div id="closeDetails" onclick="closeDetails();"><span class="chahao">×</span></div></div>');
    $("#page3_detail").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo" cellpadding="0" cellspacing="0"><tr><td colspan="2"><table id="p3_title" cellpadding="0" cellspacing="0"><tr onclick="centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'' + 1 + '\',\'\',\'\',\'\',\'\',\'\',true,1,true)"><td style="width: 27px;"><div class="bizListIcon" style="background-image: url(\'./images/Icon_b_none.png\');">' + 1 + '</div></td><td id="biz_name"></td></tr></table></td></tr><tr><td id="biz_info" class="details" colspan="2"></td></tr><tr><td id="biz_address" class="details"></td><td rowspan="3"><table id="bizpic" cellpadding="0" cellspacing="0" ><tr><td id="imgbiz"></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td></tr></table><div id="p3_ownernotes"><div class="cross4"  onclick="shareBiz(false,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',\'' + scode + '\')" id="shareBiz">Share</div><div class="cross5" onclick="saveSearch(\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',true,false,\'' + scode + '\')" id="saveBiz">Save</div><div id="closeDetails" onclick="closeDetails();"><span class="chahao">×</span></div></div>');
    //<table cellpadding="0" cellspacing="0"><tr><td></td><td  id="biz_name" class="details"></td></tr></table> style="border-bottom: 1px solid orange;"
    }
    //#endregion
    //#region 如果是普通搜索
    else if (b.indexOf("Saved Location:") != 0) {
    // $("#page3_detail").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo"><tr><td id="biz_name" class="details"></td></tr><tr><td id="biz_info" class="details"></td></tr><tr><td id="biz_address" class="details"></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td><td><table id="bizpic" cellpadding="0" cellspacing="0"><tr><td><img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr></table><div id="p3_ownernotes"><div class="bizListIcon" onclick="centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'' + k + '\')" style="background-image: url(\'./images/Icon_b_none.png\');">' + k + '</div><div class="cross4" onclick="shareBiz(true,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="shareBiz">Share</div><div class="cross5" onclick="saveSearch(\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="saveBiz">Save</div><div id="closeDetails" onclick="closeDetails();"><span class="chahao">×</span></div></div>'); //<div id="closeDetails1" onclick="closeDetails();"><span class="chahao">×</span></div>
    //var details = '<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo"><tr><td id="biz_name" class="details" colspan="2"></td></tr><tr><td id="biz_info" class="details" colspan="2"></td></tr><tr><td id="biz_address" class="details"></td><td rowspan="3"><table id="bizpic" cellpadding="0" cellspacing="0"><tr><td id="imgbiz"><img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td></tr></table>';
    var details = '<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo" cellpadding="0" cellspacing="0"><tr><td colspan="2"><table id="p3_title" cellpadding="0" cellspacing="0"><tr onclick="centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'' + k + '\',\'\',\'\',\'\',\'\',\'\',\'\',true,0,true,\'1\')"><td style="width: 27px;"><div class="bizListIcon" style="background-image: url(\'./images/Icon_b_none.png\');">' + k + '</div></td><td id="biz_name"></td></tr></table></td></tr><tr><td id="biz_info" class="details" colspan="2"></td></tr><tr><td id="biz_address" class="details"></td><td rowspan="3"><table id="bizpic" cellpadding="0" cellspacing="0"><tr><td id="imgbiz"></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td></tr></table>';
    var fun;
    //if (storage.getItem("account") != null && storage.getItem("account") != "") { style="border-bottom: 1px solid orange;"
    if (getAccountLevel() >= 0) {
    fun = '<div id="p3_ownernotes"><div class="cross4" onclick="shareBiz(true,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="shareBiz">Share</div><div class="cross5" onclick="saveSearch(\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="saveBiz">Save</div><div class="cross6" onclick="newReport(\'' + ccode + '\',\'' + plat + '\',\'' + plng + '\')">Report</div><div id="closeDetails" onclick="closeDetails();"><span class="chahao">×</span></div></div>';
    }
    else {
    fun = '<div id="p3_ownernotes"><div class="cross4" onclick="shareBiz(true,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="shareBiz">Share</div><div class="cross5" onclick="saveSearch(\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="saveBiz">Save</div><div id="closeDetails" onclick="closeDetails();"><span class="chahao">×</span></div></div>';
    }
    $("#page3_detail").html(details + fun);
    //<div id="closeDetails1" onclick="closeDetails();"><span class="chahao">×</span></div>
    }
    //#endregion
    //#region Saved
    else {
    //$("#page3_detail").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo"><tr><td id="biz_name" class="details"></td></tr><tr><td id="biz_info" class="details"></td></tr><tr><td id="biz_address" class="details"></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td><td><table id="bizpic" cellpadding="0" cellspacing="0"><tr><td><img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr></table><div id="p3_ownernotes"><div class="cross4" onclick="shareBiz(false,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="shareBiz">Share</div><div class="cross5" style="color: gray;" id="saveBiz">Save</div><div id="closeDetails" onclick="closeDetails();"><span class="chahao">×</span></div></div>'); //<div id="closeDetails1" onclick="closeDetails();"><span class="chahao">×</span></div>
    //$("#page3_detail").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo"><tr><td id="biz_name" class="details" colspan="2"></td></tr><tr><td id="biz_info" class="details" colspan="2"></td></tr><tr><td id="biz_address" class="details"></td><td rowspan="3"><table id="bizpic" cellpadding="0" cellspacing="0"><tr><td id="imgbiz"><img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td></tr></table><div id="p3_ownernotes"><div class="bizListIcon" onclick="centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'' + 1 + '\',\'\',\'\',\'\',\'\',\'\',true,1,true)" style="background-image: url(\'./images/Icon_b_none.png\');">' + 1 + '</div><div class="cross4" onclick="shareBiz(false,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="shareBiz">Share</div><div class="cross5" style="color: gray;" id="saveBiz">Save</div><div id="closeDetails" onclick="closeDetails();"><span class="chahao">×</span></div></div>');
    //$("#page3_detail").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo"><tr><td style="border-bottom: 1px solid orange;" colspan="2"><table cellpadding="0" cellspacing="0"><tr><td style="width: 27px;"><div class="bizListIcon" onclick="centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'' + 1 + '\',\'\',\'\',\'\',\'\',\'\',true,1,true)" style="background-image: url(\'./images/Icon_b_none.png\');">' + 1 + '</div></td><td id="biz_name" class="details"></td></tr></table></td></tr><tr><td id="biz_info" class="details" colspan="2"></td></tr><tr><td id="biz_address" class="details"></td><td rowspan="3"><table id="bizpic" cellpadding="0" cellspacing="0" ><tr><td id="imgbiz"><img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td></tr></table><div id="p3_ownernotes"><div class="cross4"  onclick="shareBiz(false,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',\'' + scode + '\')" id="shareBiz">Share</div><div class="cross5" onclick="saveSearch(\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',true,false,\'' + scode + '\')" id="saveBiz">Save</div><div id="closeDetails" onclick="closeDetails();"><span class="chahao">×</span></div></div>');
    $("#page3_detail").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo" cellpadding="0" cellspacing="0"><tr><td colspan="2"><table id="p3_title" cellpadding="0" cellspacing="0"><tr onclick="centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'' + 1 + '\',\'\',\'\',\'\',\'\',\'\',true,1,true)"><td style="width: 27px;"><div class="bizListIcon" style="background-image: url(\'./images/Icon_b_none.png\');">' + 1 + '</div></td><td id="biz_name"></td></tr></table></td></tr><tr><td id="biz_info" class="details" colspan="2"></td></tr><tr><td id="biz_address" class="details"></td><td rowspan="3"><table id="bizpic" cellpadding="0" cellspacing="0"><tr><td id="imgbiz"></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td></tr></table><div id="p3_ownernotes"><div class="cross4" onclick="shareBiz(false,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="shareBiz">Share</div><div class="cross5" style="color: gray;" id="saveBiz">Save</div><div id="closeDetails" class="close" onclick="closeDetails();"><span class="chahao">×</span></div></div>');
    //<td id="imgbiz"> <img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /> style="border-bottom: 1px solid orange;"

    //<div id="closeDetails1" onclick="closeDetails();"><span class="chahao">×</span></div>
    //↓添加数字按钮
    //<div class="bizListIcon" onclick="cc('+this+');centerwithGPS(\''+plat+'\',\''+plng+'\',\''+k+'\')" style="background-image: url("./images/icon_L.png");">'+k+'</div>
    //onclick="cc('+this+');centerwithGPS('43.6762320','-79.3582750','2')"
    //$("#page3_details").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo"><tr><td id="biz_name" class="details"></td></tr><tr><td id="biz_info" class="details"></td></tr><tr><td id="biz_address" class="details"></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td><td><table><tr><td><img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr></table><div id="p3_ownernotes"><div class="bizListIcon" onclick="cc(' + this + ');centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'' + k + '\')" style="background-image: url("./images/icon_L.png");">' + k + '</div><div class="cross4" onclick="shareBiz(false,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="shareBiz">Share</div><div class="cross5" style="color: gray;" id="saveBiz">Save</div><div id="closeDetails1" onclick="closeDetails();"><span class="chahao">×</span></div><div id="closeDetails" onclick="closeDetails();"><span class="chahao">×</span></div></div>');
    }
    //#endregion*/
    //#endregion

    //endregion 商家页
    //#region 如果是shared
    //debugger;
    if (b.indexOf("Shared Location:") == 0) {
        //$("#page3_detail").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo"><tr><td id="biz_name" class="details"></td></tr><tr><td id="biz_info" class="details"></td></tr><tr><td id="biz_address" class="details"></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td><td><table id="bizpic" cellpadding="0" cellspacing="0" ><tr><td><img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr></table><div id="p3_ownernotes"><div class="cross4" style="color: gray;" id="shareBiz">Share</div><div class="cross5" onclick="saveSearch(\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',true,false)" id="saveBiz">Save</div><div id="closeDetails" onclick="closeDetails();"><span class="chahao">×</span></div></div>');
        //        $("#page3_detail").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo"><tr><td id="biz_name" class="details" colspan="2">                                                                                                                                                                                                                                                                                                                                                         </td></tr><tr><td id="biz_info" class="details" colspan="2"></td></tr><tr><td id="biz_address" class="details"></td><td rowspan="3"><table id="bizpic" cellpadding="0" cellspacing="0" ><tr><td id="imgbiz"><img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td></tr></table><div id="p3_ownernotes"><div class="bizListIcon" onclick="centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'' + 1 + '\',\'\',\'\',\'\',\'\',\'\',true,1,true)" style="background-image: url(\'./images/Icon_b_none.png\');">' + 1 + '</div><div class="cross4"  onclick="shareBiz(false,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',\'' + scode + '\')" id="shareBiz">Share</div><div class="cross5" onclick="saveSearch(\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',true,false,\'' + scode + '\')" id="saveBiz">Save</div><div id="closeDetails" onclick="closeDetails();"><span class="chahao">×</span></div></div>');
        $("#page3_detail").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo" cellpadding="0" cellspacing="0"><tr><td><table id="p3_title" cellpadding="0" cellspacing="0"><tr onclick="centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'' + 1 + '\',\'\',\'\',\'\',\'\',\'\',true,1,true)"><td style="width: 27px;"><div class="bizListIcon" style="background-color: #719CFB;">' + 1 + '</div></td><td id="biz_name"></td></tr></table></td></tr><tr><td id="biz_info" class="details"></td></tr><tr><td id="biz_address" class="details"></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td></tr></table>'); //<div id="p3_ownernotes"></div>
        $("#p3_ownernotes").html('<div class="cross4"  onclick="shareBiz(false,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',\'' + scode + '\')" id="shareBiz">Share</div><div class="cross5" onclick="saveSearch(\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',true,false,\'' + scode + '\')" id="saveBiz">Save</div><div id="closeDetails" class="close" onclick="closeDetails();"><span class="chahao">×</span></div>');
        //<table cellpadding="0" cellspacing="0"><tr><td></td><td  id="biz_name" class="details"></td></tr></table> style="border-bottom: 1px solid orange;"--  <td rowspan="3"><table id="bizpic" cellpadding="0" cellspacing="0" ><tr><td id="imgbiz"></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td>
    }
    //#endregion
    //#region 如果是普通搜索
    else if (b.indexOf("Saved Location:") != 0) {
        // $("#page3_detail").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo"><tr><td id="biz_name" class="details"></td></tr><tr><td id="biz_info" class="details"></td></tr><tr><td id="biz_address" class="details"></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td><td><table id="bizpic" cellpadding="0" cellspacing="0"><tr><td><img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr></table><div id="p3_ownernotes"><div class="bizListIcon" onclick="centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'' + k + '\')" style="background-image: url(\'./images/Icon_b_none.png\');">' + k + '</div><div class="cross4" onclick="shareBiz(true,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="shareBiz">Share</div><div class="cross5" onclick="saveSearch(\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="saveBiz">Save</div><div id="closeDetails" onclick="closeDetails();"><span class="chahao">×</span></div></div>'); //<div id="closeDetails1" onclick="closeDetails();"><span class="chahao">×</span></div>
        //var details = '<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo"><tr><td id="biz_name" class="details" colspan="2"></td></tr><tr><td id="biz_info" class="details" colspan="2"></td></tr><tr><td id="biz_address" class="details"></td><td rowspan="3"><table id="bizpic" cellpadding="0" cellspacing="0"><tr><td id="imgbiz"><img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td></tr></table>';        

        //外部table
        var details = '<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;">';
        //上部详细信息
        //debugger
        // var pth=$("#list")[0].childNodes[exii];
        details += '<table id="p3_bizinfo" cellpadding="0" cellspacing="0"><tr><td><table id="p3_title" cellpadding="0" cellspacing="0"><tr onclick="centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'' + k + '\',\'\',\'\',\'\',\'\',\'\',\'\',true,0,true,\'1\')"><td style="width: 27px;"><div class="bizListIcon" style="background-color: #719CFB;">' + k + '</div></td><td id="biz_name"></td></tr></table></td></tr><tr><td id="biz_info" class="details" colspan="2"></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_address" onclick="cc4(\'' + exii + '\')" class="details"></td></tr>';
        details += '<tr><td id="biz_code" class="details">Share link:<input id="ccode"  onfocus="inputSwitch = true;" onblur="inputBlur()"  type="text" value="umap.ca/?' + ccode + '" ></td></tr>';

        details += '</table></td></tr><tr><td class="blank"></td></tr>'; //中间间隙
        //下部扩展信息
        //details += '<tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr>';
        details += '<tr><td><table id="p3_bizinfo1" cellpadding="0" cellspacing="0"><tr><td id="biz_hours" class="details"></td><td id="imgbiz"><img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /></td></tr><td id="biz_Fax" class="details" colspan="2"></td></tr><tr><td id="biz_Email" colspan="2" class="details"></td></tr><tr><td id="biz_Website" colspan="2" class="details"></td></table></td></tr>';

        //details += '<tr><td id="reporttd"><div class="cross6" onclick="newReport(\'' + ccode + '\',\'' + plat + '\',\'' + plng + '\')">Report</div> </td></tr></table>';
        details += '<tr><td id="reporttd"><div class="cross6" onclick="newReport(\'' + ccode + '\',\'' + plat + '\',\'' + plng + '\')">Report</div></td></tr></table>';
        //details += '<tr><td id="reporttd"><div class="cross4" onclick="shareBiz(true,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="shareBiz">Share</div><div class="cross5" onclick="saveSearch(\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="saveBiz">Save</div></td></tr></table>';
        var fun;
        //if (storage.getItem("account") != null && storage.getItem("account") != "") { style="border-bottom: 1px solid orange;"--<td rowspan="3"><table id="bizpic" cellpadding="0" cellspacing="0"></table></td>

        //2012.03.01取消限制
        $("#p3_ownernotes").html('<div class="cross4" onclick="shareBiz(true,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="shareBiz">Share</div><div class="cross5" onclick="saveSearch(\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="saveBiz">Save</div><div class="close"  id="closeDetails0" onclick="closeDetails(1);"><span class="chahao">×</span></div><div class="close"  id="closeDetails" onclick="closeDetails(2);"><span class="chahao">×</span></div>');

        //$("#p3_ownernotes").html('<div class="cross6" onclick="newReport(\'' + ccode + '\',\'' + plat + '\',\'' + plng + '\')">Report</div><div class="close"  id="closeDetails0" onclick="closeDetails(1);"><span class="chahao">×</span></div><div class="close"  id="closeDetails" onclick="closeDetails(2);"><span class="chahao">×</span></div>');

        /* if (getAccountLevel() >= 0) {
        $("#p3_ownernotes").html('<div class="cross4" onclick="shareBiz(true,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="shareBiz">Share</div><div class="cross5" onclick="saveSearch(\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="saveBiz">Save</div><div class="close"  id="closeDetails" onclick="closeDetails();"><span class="chahao">×</span></div>');
        //<div class="cross6" onclick="newReport(\'' + ccode + '\',\'' + plat + '\',\'' + plng + '\')">Report</div>
        }
        else {
        $("#p3_ownernotes").html('<div class="cross4" onclick="shareBiz(true,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="shareBiz">Share</div><div class="cross5" onclick="saveSearch(\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="saveBiz">Save</div><div id="closeDetails"  class="close" onclick="closeDetails();"><span class="chahao">×</span></div>');
        //
        }
        */

        $("#page3_detail").html(details);
        if (closeLR == "L") {
            $("#closeDetails").html('');
            $("#closeDetails").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        }
        else {
            $("#closeDetails0").html('');
            $("#closeDetails0").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        }
        //pth.id = "";
        //<div id="closeDetails1" onclick="closeDetails();"><span class="chahao">×</span></div>
    }
    //#endregion
    //#region Saved
    else {
        //$("#page3_detail").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo"><tr><td id="biz_name" class="details"></td></tr><tr><td id="biz_info" class="details"></td></tr><tr><td id="biz_address" class="details"></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td><td><table id="bizpic" cellpadding="0" cellspacing="0"><tr><td><img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr></table><div id="p3_ownernotes"><div class="cross4" onclick="shareBiz(false,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="shareBiz">Share</div><div class="cross5" style="color: gray;" id="saveBiz">Save</div><div id="closeDetails" onclick="closeDetails();"><span class="chahao">×</span></div></div>'); //<div id="closeDetails1" onclick="closeDetails();"><span class="chahao">×</span></div>
        //$("#page3_detail").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo"><tr><td id="biz_name" class="details" colspan="2"></td></tr><tr><td id="biz_info" class="details" colspan="2"></td></tr><tr><td id="biz_address" class="details"></td><td rowspan="3"><table id="bizpic" cellpadding="0" cellspacing="0"><tr><td id="imgbiz"><img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td></tr></table><div id="p3_ownernotes"><div class="bizListIcon" onclick="centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'' + 1 + '\',\'\',\'\',\'\',\'\',\'\',true,1,true)" style="background-image: url(\'./images/Icon_b_none.png\');">' + 1 + '</div><div class="cross4" onclick="shareBiz(false,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="shareBiz">Share</div><div class="cross5" style="color: gray;" id="saveBiz">Save</div><div id="closeDetails" onclick="closeDetails();"><span class="chahao">×</span></div></div>');
        //$("#page3_detail").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo"><tr><td style="border-bottom: 1px solid orange;" colspan="2"><table cellpadding="0" cellspacing="0"><tr><td style="width: 27px;"><div class="bizListIcon" onclick="centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'' + 1 + '\',\'\',\'\',\'\',\'\',\'\',true,1,true)" style="background-image: url(\'./images/Icon_b_none.png\');">' + 1 + '</div></td><td id="biz_name" class="details"></td></tr></table></td></tr><tr><td id="biz_info" class="details" colspan="2"></td></tr><tr><td id="biz_address" class="details"></td><td rowspan="3"><table id="bizpic" cellpadding="0" cellspacing="0" ><tr><td id="imgbiz"><img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td></tr></table><div id="p3_ownernotes"><div class="cross4"  onclick="shareBiz(false,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',\'' + scode + '\')" id="shareBiz">Share</div><div class="cross5" onclick="saveSearch(\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',true,false,\'' + scode + '\')" id="saveBiz">Save</div><div id="closeDetails" onclick="closeDetails();"><span class="chahao">×</span></div></div>');
        $("#page3_detail").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo" cellpadding="0" cellspacing="0"><tr><td colspan="2"><table id="p3_title" cellpadding="0" cellspacing="0"><tr onclick="centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'' + 1 + '\',\'\',\'\',\'\',\'\',\'\',true,1,true)"><td style="width: 27px;"><div class="bizListIcon" style="background-color: #719CFB;">' + 1 + '</div></td><td id="biz_name" class="details"></td></tr></table></td></tr><tr><td id="biz_info" class="details"></td></tr><tr><td id="biz_address" class="details"></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td></tr></table>'); //<div id="p3_ownernotes"></div>
        $("#p3_ownernotes").html('<div class="cross4" onclick="shareBiz(false,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="shareBiz">Share</div><div class="cross5" style="color: gray;" id="saveBiz">Save</div><div id="closeDetails"  class="close" onclick="closeDetails();"><span class="chahao">×</span></div>');
        //<td id="imgbiz"> <img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /> style="border-bottom: 1px solid orange;"--<td rowspan="3"><table id="bizpic" cellpadding="0" cellspacing="0"><tr><td id="imgbiz"></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td>

        //<div id="closeDetails1" onclick="closeDetails();"><span class="chahao">×</span></div>
        //↓添加数字按钮
        //<div class="bizListIcon" onclick="cc('+this+');centerwithGPS(\''+plat+'\',\''+plng+'\',\''+k+'\')" style="background-image: url("./images/icon_L.png");">'+k+'</div>
        //onclick="cc('+this+');centerwithGPS('43.6762320','-79.3582750','2')"
        //$("#page3_details").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo"><tr><td id="biz_name" class="details"></td></tr><tr><td id="biz_info" class="details"></td></tr><tr><td id="biz_address" class="details"></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td><td><table><tr><td><img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr></table><div id="p3_ownernotes"><div class="bizListIcon" onclick="cc(' + this + ');centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'' + k + '\')" style="background-image: url("./images/icon_L.png");">' + k + '</div><div class="cross4" onclick="shareBiz(false,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="shareBiz">Share</div><div class="cross5" style="color: gray;" id="saveBiz">Save</div><div id="closeDetails1" onclick="closeDetails();"><span class="chahao">×</span></div><div id="closeDetails" onclick="closeDetails();"><span class="chahao">×</span></div></div>');
    }
    //#endregion
    //#endregion
    //debugger;
    //#region 图片与营业时间调用用Ajax
    $.ajax({
        url: 'Handler/Login.ashx',
        type: 'POST',
        data: {
            ImgAndTime: ccode
        },
        success: function (info) {
            //debugger;
            //return true;
            //alert(8680);
            try {
              //debugger;
                info = info.split('￥');
                biz_hours = info[0];
                e = info[1];
                e1 = info[2];
                /* if (biz_hours && biz_hours.length > 0) {
                $("#biz_hours").html("open time:<br>" + biz_hours);
                $("#biz_hours").show();
                }*/
                isupdate = false;
                var Time = '<div id="time"><div id="time1">' + biz_hours + '</div></div>';
                $("#biz_hours").html(Time);
                //alert(Time)
                //        $("#biz_hours").html("open time:<br>" + biz_hours);
                //$("#time").css('position','absolute');
                $("#biz_hours").show();
                //setTimeout("$('#bizIn').touchScroll();$('#bizIn').touchScroll('update');", 100);
                //alert(8695);
                try {
                    //照片
                    if (!!ccode && isNull(ccode.length > 0) && !!e && isNull(e.length > 0)) {
                        //生成imgbiz10
                        AddBGIMG();
                        $("#coverbody").html("Loading ···");
                        document.imgbiz0.src = e;
                        document.getElementById('imgbiz10').src = e1;
                        $("#imgbiz0").show();
                    }
                    else {
                        //document.imgbiz0.src = null;
                        //$("#imgbiz0").hide();
                        $("#imgbiz").hide();
                        $("#imgbiz10").hide();
                        $("#time,#time1").width('100%');
                        //document.imgbiz10.src = "images/search_clear.PNG";
                    }
                } catch (e) { }
                //if (biz_hours) {        
                try {
                    //  if (userLevel < 30) {
                    //alert(biz_hours);
                    // debugger;
                    // $("#hu,#hu1").hide();
                    if (biz_hours.indexOf("Fri") == -1 && biz_hours.indexOf("24") == -1) {
                        $("#p3_bizinfo1").hide();
                    }
                    else {
                        $("#p3_bizinfo1").show();
                        $("#biz_hours,#imgbiz").css('border-bottom', '0px !important');
                    }
                    //                    }
                    //                    else {
                    //                        $("#p3_bizinfo1").show();
                    //                        $("#biz_hours,#imgbiz").css('border-bottom', '0px !important');
                    //                    }
                    // setTimeout(function () { $("#time1").touchScroll("update"); }, 200);
                } catch (e) { //alert(e);
                }





                /*if (biz_hours || e || biz_hours.length > 0 || e.length > 0) {
                $("#p3_bizinfo1").show();
                if (!$("#biz_Website").is(":visible")) { //如果最后一行不可见，倒数第二行底线消失
                if ($("#biz_Email").is(":visible")) {
                //$("#biz_Email").css('border-bottom', '0px !important');
                }
                else if ($("#biz_Fax").is(":visible")) {
                $("#biz_Fax").css('border-bottom', '0px !important');
                }
                else {
                $("#biz_hours,#imgbiz").css('border-bottom', '0px !important');
                }
                }
                }*/
                //$("#container").css('top', '1000px');
                //$("#container").css('top', '1000px');
                //                try {
                //                    $('#bizIn').touchScroll();
                //                } catch (e) { }
                //setTimeout("$('#bizIn').touchScroll('update')", 200);
                //  setTimeout(function () { $('#bizIn').touchScroll('update') }, 200);
                //$('#time1').touchScroll();
            } catch (e) {
                //alert(e);
            }
            //debugger
            //setTimeout("$('#bizIn').touchScroll('update');", 100);
            //setTimeout('$("time1").touchScroll();
            //var Ttr = $("#hu")[0].parentNode.parentNode;


            //}', 200);
            //}

            //$('#page3_detail').touchScroll('update');
        },
        error: function () {
            // alert('share biz fault');
        }
    });
    //#endregion

    //营业时间
    /*  if (biz_hours && biz_hours.length > 0) {
    var Time = '<div id="time"><div id="time1">' + biz_hours + '</div></div>';
    $("#biz_hours").html(Time);
    //        $("#biz_hours").html("open time:<br>" + biz_hours);
    //$("#time").css('position','absolute');
    $("#biz_hours").show();
    setTimeout("$('#time1').touchScroll()", 100);
    }*/
    $("#page3_details").show();
    if ((b.indexOf("Shared Location:") == -1) && (b.indexOf("Saved Location:") == -1)) {
        //如果有账户或特权，可进
        $("#p3_ownernotes div.cross4").css('margin-left', '80px');
        $("#p3_ownernotes div.cross5").css('margin-left', '180px');
    }
    $("#biz_name").html('<div>' + b + '</div>');
    b1 = ReplaceT(b);
    //debugger;
    if ((b.indexOf("Saved Location:") != 0) && (b.indexOf("Shared Location:") != 0) && d) {
        var Ttex = "Tel: <a href='tel:" + d + "'>" + d + "</a><a id='dis' onclick=\"calDis(" + plat + "," + plng + ",'" + dis + "','" + b1 + "')\"><div id='dis1'>Route</div></a>"
        $("#biz_phone").html(Ttex);
        //style=\"font-weight: bold;\"
        /*
        if (dis) {
        $("#biz_phone").html("Tel: <a href='tel:" + d + "'>" + d + "</a><a id='dis' onclick='fourstep(" + plat + "," + plng + ")'>" + dis + "</a>"); //style=\"font-weight: bold;\"
        }
        else {
        $("#biz_phone").html("Tel: <a  style=\"font-weight: bold;\" href='tel:" + d + "'>" + d + "</a>");
        }*/
    }
    else if (dis) {
        // $("#biz_phone").html("<a id='dis' onclick='fourstep(" + plat + "," + plng + ")'>" + dis + "</a>");
        //$("#biz_phone").html("<a id='dis' onclick='calDis(" + plat + "," + plng + ",\"" + dis + "\")'><div id='dis1'>Route</div></a>");
        var Ttex = "<a id='dis' onclick=\"calDis(" + plat + "," + plng + ",'" + dis + "'," + b1 + ")\"><div id='dis1'>Route</div></a>"
        $("#biz_phone").html(Ttex);
    }
    //地址
    c = ReplaceF(c);
    //    if (c.length > 35) {
    //        var c1 = c.substr(0, 34) + '<br>';
    //        var c2 = c.substr(34);
    //        c = c1 + c2;
    //    }
    $("#biz_address").html(c);
    var tj = j.trim();
    //首字母大写toUpperCase()
    tj = tj.substr(0, 1).toUpperCase() + tj.substr(1, j.length - 2)
    tj = ReplaceF(tj);
    //34
    if (tj.length > 0) {
        if (tj.length > 32) {
            tj = tj.substr(0, 32) + " ...";
        }
        //$("#biz_info").show();
        $("#biz_info").html(tj);
    }
    else {
        $("#biz_info").hide();
    }


    //if (e.length > 0) {
    //照片
    if (ccode && ccode.length > 0 && e && e.length > 0) {
        //debugger;
        AddBGIMG();
        $("#coverbody").html("Loading ···");
        document.imgbiz0.src = e;
        document.getElementById('imgbiz10').src = e;
        ///BizImages/ ccode 2012.01.12 
        // document.imgbiz0.src = "bizo/s/" + e + ".jpg";
        //document.imgbiz10.src = "bizo/m/" + e + ".jpg";
        //document.imgbiz0.src = "../BizImages/" + ccode + ".jpg";
        //document.imgbiz10.src = "../BizImages/" + ccode + ".jpg";
        $("#imgbiz0").show();
    }
    else {
        //document.imgbiz0.src = null;
        //$("#imgbiz0").hide();
        $("#imgbiz").hide();
        $("#imgbiz10").hide();
        //document.imgbiz10.src = "images/search_clear.PNG";
    }
    //传真
    if (f && f.length > 0) {
        $("#biz_Fax,#editFax").show();
        $("#biz_Fax").html("Fax:" + f);
    }
    //email
    if (g && g.length > 0) {
        $("#biz_Email,#editEmail").show();
        $("#biz_Email").html("Email:&nbsp;<a href=\"mailto:" + g + "\">" + g + "</a>");
    }
    //网站
    if (h && h.length > 0) {
        //$("#biz_Website,#editWebsite").show();
        $("#biz_Website").html("Website:&nbsp;<a href=\"http://" + h + "\">" + h + "</a>");
    }
    if (i && i == "true") {
        $("#Claim").show();
    }
    //$flip.onload.enableScrollOnContent3();
    /*/#region 对高度进行处理[备用方案]
    if ($("#p3_top").height() > 100) {
    $("#closeDetails1").css('margin-top', '-12px');
    $("#closeDetails").css('margin-top', '-12px');
    }
    else {
    $("#closeDetails1").css('margin-top', '10px');
    $("#closeDetails").css('margin-top', '10px');
    }
    //#endregion*/
    //alert(88481);
    //#region 地图页变形
    //debugger;
    //    开业时间              传真              email           网站          照片
    //$("#mapcor3,#mapcor4").css('top', '191px');
    $("#p3_ownernotes").show();
    $("#biz_info").hide();
    $("#map,#map_canvas").height(210);
    //alert(9435);
    //    $("#container").css('top', '1000px');

    //  $("#container").height(0);

    //alert(9438);
    //$("#tools,#tool,#page3_details").css({ top: '210px' });
    google.maps.event.trigger(map, 'resize');
    //debugger;
    //$("#page1").height($("#map").height() + $("#page3_details").height());
    $("#coverbody").height($("#page1").height());
    //#endregion
    //alert(8879)

    //#region page3_details
    google.maps.event.addDomListener(document.getElementById("page3_details"), 'touchend', function (e) {
        /*$("#tools").height(0);
        $("#tool,#tools").hide();
        bhi = true;*/
        setTimeout(function () { toTop() }, 100);
    });
    /* google.maps.event.addDomListener(document.getElementById("page3_details"), 'touchmove', function (e) {
    e.preventDefault();
    });
    google.maps.event.addDomListener(document.getElementById("page3_details"), 'touchend', function (e) {

    toTop();
    });
    */
    //#endregion

    //setTimeout("$('#page3_detail').touchScroll();", 100);
    try {
        GoogleTouchEvent('p3_ownernotes');
    } catch (e) { }
    //setTimeout("GoogleTouchEvent('ccode', false, true)", 100);
    try {
        GoogleTouchEvent('ccode', false, true);
        //alert(8901);
        if (isupdate) {
            //alert(8902);
            //$("#container").css('top', '1000px');
            /* try {
            $('#bizIn').touchScroll();
            //$('#bizIn').touchScroll('update');
            } catch (e) { alert('here'); }
            */
            //$('#bizIn').touchScroll({ y: 255 });
            //setTimeout("$('#bizIn').touchScroll('update');", 200);
        }
        isupdate = true;

    } catch (e) {

    }
    //$('#page3_detail').touchScroll('setPosition', 0);    
    /*try {
    //debugger
    if (isNull(biz_hours) || isNull(f) || isNull(g) || isNull(h) || isNull(e) || isNull(biz_hours.length > 0) || isNull(f.length > 0) || isNull(g.length > 0) || isNull(h.length > 0) || isNull(e.length > 0)) {
    alert(8854);
    //$("#p3_bizinfo1").show();
    //debugger;
    if (!$("#biz_Website").is(":visible")) { //如果最后一行不可见，倒数第二行底线消失
    if ($("#biz_Email").is(":visible")) {
    //$("#biz_Email").css('border-bottom', '0px !important');
    }
    else if ($("#biz_Fax").is(":visible")) {
    $("#biz_Fax").css('border-bottom', '0px !important');
    }
    else {
    $("#biz_hours,#imgbiz").css('border-bottom', '0px !important');
    }
    }
    }
    } catch (e) { catche(e); }
    alert(8870);*/

    $("#container").attr("class", 'MoveToleft');
    $("#page3_details").css("-webkit-transform", "translateX(0px)");
}
function calDis(plat, plng, dis, name) {
    //window.open('sms:', '_parent');
    name = ReplaceF(name);
    //window.open('http://maps.google.com/maps?ll=43.797123,-79.14245&z=15&t=m&hl=zh-CN&saddr=上海东方明珠&daddr=200234&f=d');
    window.open("http://maps.google.com/maps?saddr=Current Location@" + gps + "&daddr=" + name + "@" + plat + "," + plng + "&f=d", '_parent');
    return;
    try {
        directionsRenderer.setMap(null);
        // $("#dis").width(78);
        $("#dis1").css("-webkit-transform", "scale(0)");
        directionsRenderer.setMap(map);
        var Tgps = new google.maps.LatLng(plat, plng);
        /*if ($("#dis1").html().indexOf("Route") != -1) {
        //            $("#dis").html("<span>&nbsp;walk&nbsp;drive&nbsp;</span><span id='bggrey'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>");
        //$("#dis").html("<span>Calculating</span>");
        }*/
        var request = {
            origin: newgps,
            destination: Tgps,
            travelMode: google.maps.DirectionsTravelMode.DRIVING,
            avoidTolls: true
            //travelMode: google.maps.DirectionsTravelMode.WALKING
        }
        // Make the directions request
        directionService.route(request, function (result, status) {
            //debugger; 
            if (status == google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
            } else {
                clearTimeout(t1);
                $('#inMapMsg,#cmm').show();
                $('#inMapMsg').html("<span style='float: left; margin: 12px 40px;'>Directions failed</span>")
                t1 = setTimeout("$('#inMapMsg,#cmm').hide()", 3000);
                directionsRenderer.setMap(null);
                //alert("Directions query failed: " + status);
            }
        });
        /* 成熟，可用，可切换
        //if ($("#dis").html().indexOf("m") != -1) {
        if ($("#bggrey").css('margin-left').indexOf("42") != -1) {
        //  directionsRenderer.setRouteIndex(2);
        $("#bggrey").css('margin-left', '-82px');
        //$("#bggrey").animate({ marginLeft: '-82px' }, 'fast');
        // $("#bggrey").animate({ marginLeft: '-82px' }, 'fast');
        var request = {
        origin: newgps,
        destination: Tgps,
        // travelMode: google.maps.DirectionsTravelMode.DRIVING
        travelMode: google.maps.DirectionsTravelMode.WALKING
        }
        // Make the directions request
        directionService.route(request, function (result, status) {
        //debugger; 
        if (status == google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
        } else {

        clearTimeout(t1);
        $('#inMapMsg,#cmm').show();
        $('#inMapMsg').html("<span style='float: left; margin: 12px 40px;'>Directions failed</span>");
        t1 = setTimeout("$('#inMapMsg,#cmm').hide()", 3000);
        directionsRenderer.setMap(null);
        }
        });
        // $("#dis").html("<span id='grey'>walk</span><span id='light'>drive</span>");
        }
        else {
        $("#bggrey").css('margin-left', '-42px');
        //$("#bggrey").animate({ marginLeft: '-42px' }, 'fast');
        var request = {
        origin: newgps,
        destination: Tgps,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
        //travelMode: google.maps.DirectionsTravelMode.WALKING
        }
        // Make the directions request
        directionService.route(request, function (result, status) {
        //debugger; 
        if (status == google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
        } else {
        clearTimeout(t1);
        $('#inMapMsg,#cmm').show();
        $('#inMapMsg').html("<span style='float: left; margin: 12px 40px;'>Directions failed</span>")
        t1 = setTimeout("$('#inMapMsg,#cmm').hide()", 3000);
        directionsRenderer.setMap(null);
        //alert("Directions query failed: " + status);
        }
        });
        // $("#dis").html("<span id='light'>walk</span><span id='grey'>drive</span>");
        }*/

    } catch (e) {

    }
    //debugger;
    //onclick='calDis(" + plat + "," + plng + "," + dis + ")'
    //return;

    //alert(D * 1000);

}

//道路
function click_details1(id, name, plat, plng) {
    //exHeight = $("#container").height();
    $("#page3_details").css('margin-top', '210px');
    showswitch = false;
    $("#zoom6,#zoom8,#zoom10").hide();
    $('#gpsy').css('right', '0px');
    $('#gpsInMap').css({ 'top': '0px !important', 'right': '0px' });
    $('#croInMap').css('top', '0px !important');
    $("#page3_details").html('<div id="page3_detail"></div>');

    var details = '<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;">';
    details += '<table id="p3_bizinfo" cellpadding="0" cellspacing="0"><tr><td><table id="p3_title" cellpadding="0" cellspacing="0"><tr onclick="centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'1\',\'\',\'\',\'\',\'\',\'\',\'\',true,0,true,\'1\')"><td style="width: 27px;"><div class="bizListIcon">1</div></td><td id="biz_name"></td></tr></table></td></tr><tr><td id="biz_info" class="details" colspan="2"></td></tr><tr><td id="biz_address" onclick="cc5(\'' + plat + '\',\'' + plng + '\')" class="details"></td></tr>';

    details += '<tr><td id="reporttd"><div class="cross6" onclick="newReport(\'' + id + '\',\'' + plat + '\',\'' + plng + '\',\'address\')">Report</div></td></tr></table>';

    //  style="color:grey;"
    $("#p3_ownernotes").html('<div class="cross4" onclick="shareBiz(\'address\',\'' + id + '\',\'' + name + '\',null,null,0)" id="shareBiz">Share</div><div class="cross5" onclick="saveSearch(\'address\',\'' + name + '\',\'\',\'\',\'' + id + '\',true,\'address\')" id="saveBiz">Save</div><div class="close"  id="closeDetails0" onclick="closeDetails(1);"><span class="chahao">×</span></div><div class="close"  id="closeDetails" onclick="closeDetails(2);"><span class="chahao">×</span></div>');

    $("#page3_detail").html(details);
    if (closeLR == "L") {
        $("#closeDetails").html('');
        $("#closeDetails").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
    }
    else {
        $("#closeDetails0").html('');
        $("#closeDetails0").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
    }

    $("#reporttd div.cross6").css('margin-top', '0px');
    $("#reporttd").css('border-bottom', '0px');

    $("#page3_details").show();

    $("#p3_ownernotes div.cross4").css('margin-left', '80px');
    $("#p3_ownernotes div.cross5").css('margin-left', '180px');
    $("#biz_name").html(name);
    $("#biz_address").html('<center>Click to Zoom in</center>');

    //#region 地图页变形
    //debugger;
    //    开业时间              传真              email           网站          照片
    //$("#mapcor3,#mapcor4").css('top', '191px');
    $("#p3_ownernotes").show();
    $("#biz_info").hide();
    $("#map,#map_canvas").height(210);
    //  $("#container").height(0);
    //$("#container").css('top', '1000px');
    //$("#tools,#tool,#page3_details").css({ top: '210px' });
    google.maps.event.trigger(map, 'resize');
    //debugger;
    //$("#page1").height($("#map").height() + $("#page3_details").height());
    $("#coverbody").height($("#page1").height());
    //#endregion
    //alert(8879)

    //#region page3_details
    google.maps.event.addDomListener(document.getElementById("page3_details"), 'touchend', function (e) {
        /*$("#tools").height(0);
        $("#tool,#tools").hide();
        bhi = true;*/
        setTimeout(function () { toTop() }, 100);
    });
    //#endregion

    //setTimeout("$('#page3_detail').touchScroll();", 100);
    try {
        GoogleTouchEvent('p3_ownernotes');
    } catch (e) { }
    //setTimeout("GoogleTouchEvent('ccode', false, true)", 100);
    try {
        GoogleTouchEvent('ccode', false, true);
        //alert(8901);
        if (isupdate) {
            //alert(8902);
            //exHeight = $("#container").height();
            //$("#container").height(0);
            //$("#container").css('top', '1000px');
            /*  try {
            $('#bizIn').touchScroll();
            //$('#bizIn').touchScroll('update');
            } catch (e) { alert('here'); }
            **/
            //$('#bizIn').touchScroll({ y: 255 });
            //setTimeout("$('#bizIn').touchScroll('update');", 200);
        }
        isupdate = true;

    } catch (e) {

    }

    $("#container").attr("class", 'MoveToleft');
    $("#page3_details").css("-webkit-transform", "translateX(0px)");
}
function inputBlur() {
    inputSwitch = false;
    toTop();
}
//#region                                                                            closeDetails() 
function closeDetails(x) {
    //debugger;$("#container").css("position", "absolute");
    //$("#mapcor3,#mapcor4").css('top', '236px');
    try {
        //directionsRenderer.setMap(null);
        showswitch = true;
        $("#zoom6,#zoom8,#zoom10").hide();
        $('#gpsy').css('right', '0px');
        $('#gpsInMap').css({ 'top': '0px !important', 'right': '0px' });
        $('#croInMap').css('top', '0px !important');
    } catch (e) {

    }
    try {
        //debugger;
        if (x) {
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
        }

        $("#map,#map_canvas").height(255);
        $("#tools,#tool").css({ top: '255px' });
        google.maps.event.trigger(map, 'resize');

    } catch (e) { catche(e); }
    //            document.getElementById("page3_details").style.display = "none";

    try {
        setTimeout(function () {
            $("#page3_details,#p3_ownernotes").hide();
            //$('#bizIn').touchScroll('setPosition', 0);
            $("#page3_details").css("-webkit-transform", 'translateX(320px) scale(1)');
            $("#p3_ownernotes").css("-webkit-transform", 'scale(1)');
        }, 400);
    } catch (e) { }
    try {
        sw = true;
        $("#edit").html("Edit");
        //close image pages
        // document.getElementById("imgBizLarge").style.display = "none";
        //$("#imgBizLarge").hide();
        //$("#container").css('top', '256px');
        //$("#container").height(exHeight ? exHeight : 160);

        //  $("#container").attr("class", 'MoveToleft1');
        //$("#page3_details").attr("class", 'MoveToRight');
        $("#page3_details,#p3_ownernotes").css("-webkit-transform", 'scale(0)');
        // $('#list').touchScroll({ elastic: true, momentum: true });
        //$('#list').touchScroll('update');
        varbizimg = true;
        toTop();
    } catch (e) {

    }
    //showswitch = false;
}
//#endregion
//alert(8915);
//function getid(id) { return document.getElementById(id) }
///#endregion
function hoursUpdate() {
    //storage.getItem("account1", email + "￥" + account);
    try {
        var commonid = storage.getItem("account1").split("￥")[1];
    } catch (e) { catche(e); }
    //$.post("hoursUpdate.asp", { businessid: Tccode, userid: commonid });
    //$.post("../Login.aspx", { businessid: Tccode, userid: commonid });
    //http://umap.ca/gta/c2_inputhoursloadmobilepublic3.asp?a=1001148&b=G2dbs8m2&c=43.333,-74.222
    /* storage.setItem('hoursUpdate', Tccode + ";" + commonid);
    window.location.href = "hoursUpdate.asp";*/

    window.location.href = "http://umap.ca/gta/c2_inputhoursloadmobilepublic3.asp?a=" + who + "&b=" + Ubizccode + "&c=" + Ubizgps;

    /*/get info
    var userInfo = window.localStorage.getItem('hoursUpdate').split(";");
    var ccode = userInfo[0];
    var commonid = userInfo[1];*/
}
function bizEve() {
    //debugger;
    if (iPhoneOrientation == 0) {
        toTop();
        $("#map,#map_canvas").height(255);
        $("#page1,#page2").height(416);
        //$("#tools,#tool,#page3_details").css({ top: '257px' });
        google.maps.event.trigger(map, 'resize');
        $("#p3_ownernotes").hide();
        //$("#page3_details").height(160);
        $("#page3_details").css('margin-top', '256px');
        //        try {
        //            $('#bizIn').touchScroll('setPosition', 0);
        //        } catch (e) { }
    }
}
//shareBiz(true, '8696', 'Embrujo Flamenco Tapas Restaurant', '97 Danforth Ave , Toronto , ON', '416-778-0007', 'Gd7l97')
//shareBiz(true, ''    , 'Saved Location: 9/27/2011'        , '123'                           , ''            , '0')
var shareexist = false;
var detial = "";
function shareBiz(bizid, uaid, name, addr, uph, ccode, scode, from, th, hrefurl) {
    //th.id = "_share" + parseInt(Math.random() * 100);
    //var id = th.id;
    //$("#" + id).css('-webkit-transform', 'scale(1.3)');
    //setTimeout(function () {
    //    $('#' + id).css('-webkit-transform', 'scale(1)');
    //}, 400);
    //shareBiz(true,'53690','Manchu Wok','2 Bloor St West #38# Toronto','416-922-9536','Gt7xknd8')
    //shareBiz('address','2','1 Adelaide St W , Toronto , ON')
    //from:默认为空，用户直接点击分享，为true时，是save后-shared
    //debugger;
    bizEve();
    showswitch = true;
    //    if (scode != "" || scode != null) {
    //        ccode = scode;
    //    }
    detial = $("#page3_details").html();
    /*var biz; useless
    if (bizid) {
    biz = uaid;
    }*/
    //替换背景色
    //$("#page3_details").css("background-color", "white");
    //获取当前GPS
    gpsLL = latLngControl.updatePosition();
    //是否关键字查询
    //var isls = true;

    //二次分享[share===>shared]
    if (scode) {
        //#region 添加信息到本地存储
        try {
            var taarshared = storage.getItem("arrShared");
            storage.removeItem("arrShared");
        } catch (e) { catche(e); }
        if (taarshared == null) {
            taarshared = "";
        }
        //#region 取出所有的id，放到数组中，遍历【存在相同的则为true】
        shareexist = false;
        if (taarshared) {
            var Tsavedidarr = [];
            Tsavedidarr = taarshared.split(';');
            Tsavedidarr.pop();
            for (var i = 0; i < Tsavedidarr.length; i++) {
                Tsavedidarr[i] = Tsavedidarr[i].split('￥');
                /*if (uaid == "address") {
                if (Tsavedidarr[i][2] == ccode) {
                savedexist = true;
                break;
                }
                }
                else */
                if (Tsavedidarr[i][2] == scode) {
                    shareexist = true;
                    break;
                }
            }
        }
        //#endregion

        if (!shareexist) {
            //shareBiz(false,'','Shared Location:12/11/2011','','','0','x7ir2x')
            //"Shared Location: 12/13/2011￥123123￥x5q7jx"
            if (getAccountLevel() > 1) {//保存shared到DB    
                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth() + 1;
                var y = date.getFullYear();
                var h = date.getHours();
                var mm = date.getMinutes();
                date = m + "/" + d + "/" + y;
                name = 'Shared Location: ' + m + "/" + d + "/" + y;
                taarshared = name + "￥" + addr + "￥" + scode + ";" + taarshared;
                var tttgps = $("#tt1").html();
                tttgps = tttgps.split('[(')[1];
                tttgps = tttgps.split(')]')[0];
                gpsLL = '(' + tttgps + ')';
                $.ajax({
                    url: 'Handler/Login.ashx',
                    type: 'POST',
                    data: {
                        share: scode,
                        gpsLL: gpsLL,
                        GPS: "" + newgps,
                        GPSAtt: gpsAtt,
                        notes: addr,
                        date: date,
                        who: who
                    },
                    success: function () {
                        //alert('share biz success');
                    },
                    error: function () {
                        // alert('share biz fault');
                    }
                });
            }
        }
        storage.setItem("arrShared", taarshared);
        //#endregion  
        var url = "umap.ca/?" + scode;
        //name = name.replace("#39#", "'");
        name = ReplaceF(name);
        $("#page3_details").html("");
        $("#page3_details").hide();
        $("#page3_details").html("<div id='page3_detail'></div>");
        $("#page3_detail").html("<br><br><div id='p'><a style='font-size: medium;font-weight: bolder;'>Share location : </a>&nbsp;&nbsp;&nbsp; <span id=\"url\">" + url + "</span><br>" + name + "<br><br><div  onclick=\"closep1()\"  class='cross1'><a href='mailto:?Subject=shared%20Location&body=umap.ca/?" + ccode + "'>E-Mail</a></div><div  onclick=\"sharebySMS('" + ccode + "')\"  class='cross2'><a>SMS</a></div><div onclick=\"closep1()\" class='cross3'><a href='tweetie:///post?message=Share location from umap. umap.ca/?" + ccode + "'>Twitter</a></div></div><div onclick=\"closep2(1)\" class='close' id=\"closep\"><span class=\"chahao\">×</span></div>");
        $("#page3_details").show();
    }
    //非关键字查询【获取scode，保存】
    else if (ccode == "0") {//share  saved
        //debugger;
        $("#page3_detail").html("<br><br><center>loading ...</center><br><br><br><br><br><br>");
        $.ajax({
            url: 'Handler/Login.ashx',
            type: 'POST',
            data: { scodeMaker: 1 },
            success: function (info) {
                if (info != "" && info != null) {
                    scode = info;
                    if (bizid == 'address') {
                        shareBiz1(scode, 'addr￥' + uaid, gpsLL);
                    }
                    else {
                        shareBiz1(scode, addr, gpsLL);
                    }
                    //#region 添加信息到本地存储
                    try {
                        var taarshared = storage.getItem("arrShared");
                        storage.removeItem("arrShared");
                    } catch (e) { catche(e); }
                    if (taarshared == null) {
                        taarshared = "";
                    }
                    var tname = name.replace('Saved', 'Shared');
                    var date = new Date();
                    var d = date.getDate();
                    var m = date.getMonth() + 1;
                    var y = date.getFullYear();
                    var h = date.getHours();
                    var mm = date.getMinutes();
                    var time = "";
                    if (h > 12) {
                        time = (h - 12) + ":" + mm + " PM";
                    }
                    else {
                        time = h + ":" + mm + " AM";
                    }
                    //time = time.split('/'); //月、日、年、时分A/PM
                    date = m + "/" + d + "/" + y + "/" + time;
                    //taarshared = uaid + "￥" + name + "￥" + addr + "￥" + uph + "￥" + ccode + "￥" + m + "/" + d + "/" + y + ";" + taarshared;
                    if (bizid == 'address') {
                        taarshared = bizid + "￥" + name + "￥" + uaid + "￥" + scode + "￥" + date + ";" + taarshared;
                        ccode = "address" + uaid;
                    }
                    else {
                        taarshared = tname + "￥" + addr + "￥" + scode + ";" + taarshared;
                    }
                    /*  if (getAccountLevel() > 1) {//保存shared商家到DB
                    $.ajax({
                    url: 'Handler/Login.ashx',
                    type: 'POST',
                    data: {
                    share: ccode,
                    date: date,
                    who: who
                    },
                    success: function () {
                    //alert('share biz success');
                    },
                    error: function () {
                    //alert('share biz fault');
                    }
                    });
                    }*/

                    storage.setItem("arrShared", taarshared);
                    //#endregion
                }
            }
        });
    }
    else {//关键字查询
        //#region 添加信息到本地存储
        try {
            var taarshared = storage.getItem("arrShared");
            storage.removeItem("arrShared");
        } catch (e) { catche(e); }
        if (taarshared == null) {
            taarshared = "";
        }
        //#region 取出所有的id，放到数组中，遍历【存在相同的则为true】
        shareexist = false;
        if (taarshared) {
            var Tsavedidarr = [];
            Tsavedidarr = taarshared.split(';');
            Tsavedidarr.pop();
            for (var i = 0; i < Tsavedidarr.length; i++) {
                Tsavedidarr[i] = Tsavedidarr[i].split('￥');
                if (bizid == 'address' && Tsavedidarr[i][1] == uaid) {
                    shareexist = true;
                    break;
                }

                else if (Tsavedidarr[i][4] == ccode) {
                    shareexist = true;
                    break;
                }
            }
        }
        //#endregion

        if (!shareexist) {
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth() + 1;
            var y = date.getFullYear();
            var h = date.getHours();
            var mm = date.getMinutes();
            var time = "";
            if (h > 12) {
                time = (h - 12) + ":" + mm + " PM";
            }
            else {
                time = h + ":" + mm + " AM";
            }
            //time = time.split('/'); //月、日、年、时分A/PM
            date = m + "/" + d + "/" + y + "/" + time;
            //taarshared = uaid + "￥" + name + "￥" + addr + "￥" + uph + "￥" + ccode + "￥" + m + "/" + d + "/" + y + ";" + taarshared;
            if (bizid == 'address') {
                taarshared = bizid + "￥" + name + "￥" + uaid + "￥" + date + ";" + taarshared;
                ccode = "address" + uaid;
            }
            else {
                //￥ Esther#39#s Soup Kitchen ￥ 2 Bloor St West , Toronto , ON ￥416-963-6667￥Grr49694￥3/9/2012/11:28 AM;
                taarshared = uaid + "￥" + name + "￥" + addr + "￥" + uph + "￥" + ccode + "￥" + date + ";" + taarshared;
            }
            if (getAccountLevel() > 1) {//保存shared商家到DB
                $.ajax({
                    url: 'Handler/Login.ashx',
                    type: 'POST',
                    data: {
                        share: ccode,
                        date: date,
                        who: who
                    },
                    success: function () {
                        //alert('share biz success');
                    },
                    error: function () {
                        //alert('share biz fault');
                    }
                });
            }
        }
        storage.setItem("arrShared", taarshared);
        //#endregion  
        var url = "umap.ca/?" + ccode;
        //name = name.replace("#39#", "'");
        name = ReplaceF(name);
        $("#page3_details").hide();
        $("#page3_details").html("");
        $("#page3_details").html("<div id='page3_detail'></div>");
        if (!!from) {
            $("#page3_detail").html("<br><br><div id='p'><a style='font-size: medium;font-weight: bolder;'>Share location : </a>&nbsp;&nbsp;&nbsp; <span id=\"url\">" + url + "</span><br>" + name + "<br><br><div  onclick=\"closep1()\"  class='cross1'><a href='mailto:?Subject=shared%20Location&body=umap.ca/?" + ccode + "'>E-Mail</a></div><div  onclick=\"sharebySMS('" + ccode + "')\"  class='cross2'><a>SMS</a></div><div onclick=\"closep1()\" class='cross3'><a href='tweetie:///post?message=Share location from umap. umap.ca/?" + ccode + "'>Twitter</a></div></div><div onclick=\"closep2(1)\" class='close' id=\"closep\"><span class=\"chahao\">×</span></div>");
        }
        else {
            $("#page3_detail").html("<br><br><div id='p'><a style='font-size: medium;font-weight: bolder;'>Share location : </a>&nbsp;&nbsp;&nbsp; <span id=\"url\">" + url + "</span><br>" + name + "<br><br><div  onclick=\"closep1()\"  class='cross1'><a href='mailto:?Subject=shared%20Location&body=umap.ca/?" + ccode + "'>E-Mail</a></div><div  onclick=\"sharebySMS('" + ccode + "')\"  class='cross2'><a>SMS</a></div><div onclick=\"closep1()\" class='cross3'><a href='tweetie:///post?message=Share location from umap. umap.ca/?" + ccode + "'>Twitter</a></div></div><div onclick=\"closeDetails(1)\" class='close' id=\"closep\"><span class=\"chahao\">×</span></div>");
        }
        $("#page3_details").show();
        window.open(hrefurl, '_parent');
    }
}
function shareBiz1(scode, addr, gpsLL) {//share saved
    //debugger;
    //if (bizid == 'address') {
    //shareBiz1(scode, 'addr￥' + uaid, gpsLL);

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    date = m + "/" + d + "/" + y;
    $.ajax({
        url: 'Handler/Login.ashx',
        type: 'POST',
        data: {
            share: scode,
            gpsLL: ("" + gpsLL),
            GPS: "" + gps,
            GPSAtt: gpsAtt,
            notes: addr,
            who: who,
            date: date
        },
        success: function () {
            ccode = scode;
            var url = "umap.ca/?" + scode;
            $("#page3_detail").html("<br><br><div id='p'><a style='font-size: medium;font-weight: bolder;'>Share location : </a>&nbsp;&nbsp;&nbsp;<span id=\"url\">" + url + "</span><br><br><div onclick=\"closep()\" class='cross1'><a href='mailto:?Subject=shared%20Location&body=umap.ca/?" + ccode + "'>E-Mail</a></div><div onclick=\"sharebySMS('" + ccode + "')\" class='cross2'><a>SMS</a></div><div onclick=\"closep()\" class='cross3'><a href='tweetie:///post?message=Share location from umap. umap.ca/?" + ccode + "'>Twitter</a></div></div><div onclick=\"closep()\"  class=\"close\" id=\"closep\"><span class=\"chahao\">×</span></div>");
        }
    });
}
//alert(9182);
function closep() {
    //$('#page3_detail').touchScroll('update');
    //$('#page3_details').touchScroll('setPosition', 0);
    //$("#page3_details").hide();
    closeDetails();
}
function closep2(x) {
    //debugger;
    $("#page3_details").html(detial);
    if (detial.indexOf('Location saved') == -1) {
        $("#p3_ownernotes").show();
    }
    if ($("#p3_ownernotes").is(":visible")) {
        $("#map,#map_canvas").height(210);
        $("#tools,#tool,#page3_details").css({ top: '210px' });
        google.maps.event.trigger(map, 'resize');
    }
    //$('#page3_detail').touchScroll();
    //$('#page3_detail').touchScroll('setPosition', 0);
}
//alert(storage.getItem('arrShared'));

function closep1(num) {
    //debugger;
    $("#page3_details").css("background-color", "#d7d8d9");
    $("#page3_detail").html('<div id="Lsd">Shared location saved.</div><br><br><br><br><div id="closeDetails1" class="close" onclick="closeDetails();"><span class="chahao">×</span></div><div id="backonList" onclick="click_back()">Go Back</div><div id="closeDetails2" class="close" onclick="closeDetails();"><span class="chahao">×</span></div>');
    if (num) {
        $("#backonList").css("margin", "7px 117px");
        $("#closeDetails2,#closeDetails1").css("margin-top", "-10px");
    }
    else {
        $("#backonList").css("margin", "-40px 117px");
        $("#closeDetails1").css("margin-top", "-10px");
        $("#closeDetails2").css("margin-top", "-26px");
    }
}

//#region  编辑信息         editBiz（id）
var sw = true;
function editBiz() {
    var biz = $("td[class='details']");
    //id=  biz[n].id
    var tid;
    var info;
    //编辑
    if (sw) {
        for (var i = 0; i < biz.length - 1; i++) {
            tid = biz[i].id;
            info = $("#" + tid).html().trim();

            //#region 如果是电话号码
            if (tid.indexOf("phone") != -1) {
                var tel = info.split('>');
                tel = tel[1].split('<')[0];
                $("#" + tid).html("<input class='editbiz' value='" + tel + "' />"); // onblur=\"DoneBiz('" + id + "','" + tid + "')\"
            }
            //#endregion

            //#region 如果是传真
            else if (tid.indexOf("Fax") != -1) {
                if (info.length > 1) {
                    var Fax = info.split('Fax:')[1];
                    $("#" + tid).html("<input class='editbiz' value='" + Fax + "' />"); // onblur=\"DoneBiz('" + id + "','" + tid + "')\"
                }
            }
            //#endregion

            //#region 如果是邮件
            else if (tid.indexOf("Email") != -1) {
                //Email:
                if (info.length > 1) {
                    var Email = info.split('>');
                    Email = Email[1].split('<')[0];
                    $("#" + tid).html("<input class='editbiz' value='" + Email + "' />"); //onblur=\"DoneBiz('" + id + "','" + tid + "')\"
                }
            }
            //#endregion

            //#region 如果是网站
            else if (tid.indexOf("Website") != -1) {
                if (info.length > 1) {
                    var Website = info.split('>');
                    Website = Website[1].split('<')[0];
                    $("#" + tid).html("<input class='editbiz' value='" + Website + "' />"); //onblur=\"DoneBiz('" + id + "','" + tid + "')\"
                }
            }
            //#endregion

            //其他的普通情况
            else {
                $("#" + tid).html("<input class='editbiz' value='" + info + "' />"); //onblur=\"DoneBiz('" + id + "','" + tid + "')\"
            }
        }
        $("#edit").html("Done");
        sw = false;
    }
    else {
        DoneBiz();
        sw = true;
    }

    /*
    var tid = 'biz_' + id.split("edit")[1];
    var info = $("#" + tid).html();
    if ($("#" + id).html().indexOf("Edit") != -1) {
    if (tid.indexOf("phone") != -1) {
    //如果是电话号码
    var tel = info.split('>');
    tel = tel[1].split('<')[0];
    $("#" + tid).html("<input onblur=\"DoneBiz('" + id + "','" + tid + "')\" id='editbiz' value='" + tel + "' />");
    }
    else if (tid.indexOf("Fax") != -1) {
    //Fax
    var Fax = info.split('Fax:')[1];
    $("#" + tid).html("<input onblur=\"DoneBiz('" + id + "','" + tid + "')\" id='editbiz' value='" + Fax + "' />");
    }
    else if (tid.indexOf("Email") != -1) {
    //Email:
    var Email = info.split('>');
    Email = Email[1].split('<')[0];
    $("#" + tid).html("<input onblur=\"DoneBiz('" + id + "','" + tid + "')\" id='editbiz' value='" + Email + "' />");
    }
    else if (tid.indexOf("Website") != -1) {
    //Website:
    var Website = info.split('>');
    Website = Website[1].split('<')[0];
    $("#" + tid).html("<input onblur=\"DoneBiz('" + id + "','" + tid + "')\" id='editbiz' value='" + Website + "' />");
    }
    else {
    $("#" + tid).html("<input onblur=\"DoneBiz('" + id + "','" + tid + "')\" id='editbiz' value='" + info + "' />");
    }
    $("#editbiz").focus();
    $("#" + id).html("Done");
    }
    else {
    DoneBiz(id, tid);
    }
    */
}
//完成编辑    editbiz 是文本框
function DoneBiz() {
    var info = $("input[class='editbiz']");
    var i = 0
    var l = info.length;
    if (info[i].value.length > 0) {
        $("#biz_name").html(info[i++].value);
    }
    if (info[i].value.length > 0) {
        $("#biz_info").html(info[i++].value);
    }
    if (info[i].value.length > 0) {
        $("#biz_address").html(info[i++].value);
    }
    if (info[i].value.length > 0) {
        $("#biz_phone").html('tel: <a href="tel:' + info[i].value + '">' + info[i++].value + '</a>');
    }
    if (l > 4) {
        if (info[i].value.length > 0) {
            $("#biz_Fax").html('Fax:' + info[i++].value);
        }
    }
    if (l > 5) {
        if (info[i].value.length > 0) {
            $("#biz_Email").html("Email:<a href=\"mailto:" + info[i].value + "\">" + info[i++].value + "</a>");
        }
    }
    if (l > 6) {
        if (info[i].value.length > 0) {
            $("#biz_Website").html("Website:<a href=\"http://" + info[i].value + "\">" + info[i++].value + "</a>");
        }
    }

    /*
    var type = "";
    if (info.length > 0) {
    if (tid.indexOf("phone") != -1) {            //如果是电话号码
    type = 'phone';
    $("#" + tid).html('tel: <a href="tel:' + info + '">' + info + '</a>');
    }
    else if (tid.indexOf("Fax") != -1) {            //Fax
    $("#" + tid).html('Fax:' + info);
    }
    else if (tid.indexOf("Email") != -1) {              //Email:
    $("#" + tid).html("Email:<a href=\"mailto:" + info + "\">" + info + "</a>");
    }
    else if (tid.indexOf("Website") != -1) {
    $("#" + tid).html("Website:<a href=\"http://" + info + "\">" + info + "</a>");
    }
    else {
    $("#" + tid).html(info);
    }
    }
    */
    $("#edit").html("Edit");

    //ajax  .....
}
//#endregion

//#region jumpTo
// move page to top
function jumpTo(b) {
    b = parseInt(b);
    window.scrollTo(0, b);
}
//#endregion

//#region 当地图中图标变蓝色时，列表中的图标也相应变蓝色。
var exnum;
var tico;
var extype; // 'biz'  ''
function cc(th, f) { //changecolor(this,from)  from  [0:列表序号  1:详细页序号按钮  2:ATM  3:距离]
    ////debugger;
    //debugger;
    //debugger;
    //debugger;
    isclicktable = false;
    // $(".plus").html('<img src="images/zoomin.png">');
    var isexi = false; //是否存在
    ////debugger;
    try {
        if (!!exnum) {
            if (!f) {
                //如果背景是蓝色
                //if (th.childNodes[0].style.backgroundImage.indexOf('Icon_b_none') == -1) {
                if (th.childNodes[0].style.backgroundColor.indexOf('#719CFB') == -1) {
                    //exnum.style.backgroundImage = 'url("./images/icon_L.png")';
                    exnum.style.backgroundColor = '#FF7A6E';
                    exnum.style.webkitTransition = "-webkit-transform 300ms ease";
                    exnum.style.WebkitTransform = "scale(1)";
                    //tico.style.WebkitTransform = "scale(0)";
                    //$(".plus").hide(); //slideUp
                }
                else { isexi = true; }
            }
            if (f == 1) {
                //如果点击按钮 且  图标不是红色
                if (th.style.backgroundColor.indexOf('#719CFB') == -1) {
                    //exnum.style.backgroundImage = 'url("./images/icon_L.png")';
                    exnum.style.backgroundColor = '#FF7A6E';
                    exnum.style.webkitTransition = "-webkit-transform 300ms ease";
                    exnum.style.WebkitTransform = "scale(1)";
                    tico.style.WebkitTransform = "scale(0)";
                }
                else { isexi = true; }
            }
            if (f == 2 || f == 3) {
                //如果点击ATM 或距离  且  图标不是红色
                //if (th.parentNode.parentNode.childNodes[1].childNodes[0].style.backgroundImage.indexOf('Icon_b_none') == -1) {
                if (th.parentNode.parentNode.childNodes[1].childNodes[0].style.backgroundColor.indexOf('#719CFB') == -1) {
                    //exnum.style.backgroundImage = 'url("./images/icon_L.png")';
                    exnum.style.backgroundColor = '#FF7A6E';
                    exnum.style.webkitTransition = "-webkit-transform 300ms ease";
                    exnum.style.WebkitTransform = "scale(1)";
                    if (!!tico) {
                        tico.style.WebkitTransform = "scale(0)";
                    }
                }
                else { isexi = true; }
            }
        }
    } catch (e) { catche(e); }
    try {
        if (f == null) {
            var ico = th.childNodes[0];
            //ico.style.backgroundImage = 'url("./images/Icon_b_none.png")';
            ico.style.backgroundColor = '#719cfb';
            exnum = ico;
            if (!isexi) {
                //debugger
                //                tico = ico.parentNode.parentNode.childNodes[4].childNodes[1].childNodes[1];
                //                tico.id = "plus" + parseInt(Math.random() * 100);
                //                tico.style.webkitTransition = "-webkit-transform  300ms ease";
                //                tico.style.WebkitTransform = "scale(1.2)";
                //                setTimeout('tico.style.webkitTransition = "-webkit-transform 300ms ease";tico.style.WebkitTransform = "scale(1)";', 300);
                //$("#" + tico.id).slideDown();
                //tico.id = "";
            }
        }
        else if (f == 1) {//内页小按钮
            //var ico = th.childNodes[0];
            //th.style.backgroundImage = 'url("./images/Icon_b_none.png")';
            th.style.backgroundColor = '#719cfb';
        }
        else if (f == 2 || f == 3) { //点击商家变色//点击距离
            var ico = th.parentNode.parentNode.childNodes[1].childNodes[0]; //yaobiao************************************
            //ico.style.backgroundImage = 'url("./images/Icon_b_none.png")';
            ico.style.backgroundColor = '#719cfb';
            exnum = ico;
            /*if (!isexi) {
            tico = ico.parentNode.parentNode.childNodes[4].childNodes[1].childNodes[1];
            tico.id = "plus" + parseInt(Math.random() * 100);
            //$("#" + tico.id).slideDown();
            tico.style.webkitTransition = "-webkit-transform 300ms ease";
            tico.style.WebkitTransform = "scale(1.2)";
            setTimeout('tico.style.webkitTransition = "-webkit-transform 300ms ease";tico.style.WebkitTransform = "scale(1)";', 300);
            //tico.id = "";
            }*/
        }
        else if (f == 4) {//通过地址进行搜索
            var ico = th.parentNode.childNodes[0].childNodes[0];
            //ico.style.backgroundImage = 'url("./images/Icon_b_none.png")';
            ico.style.backgroundColor = '#719cfb';
            exnum = ico;
        }
        //变大
        ////debugger;

        /*  $("#" + exnum.id).css('-webkit-transform', 'scale(1)');

        $("#map").animate({ left: "132px", top: "-97px" }, 500);*/

        /*else if (f == 3) { //点击距离
        var ico = th.parentNode.parentNode.childNodes[1].childNodes[0]; //yaobiao************************************
        ico.style.backgroundImage = 'url("./images/Icon_b_none.png")';
        exnum = ico;
        }*/
    } catch (e) { catche(e); }
    finally {
        exnum.style.webkitTransition = "-webkit-transform  300ms ease";
        exnum.style.WebkitTransform = "scale(1.5)";
        setTimeout('exnum.style.webkitTransition = "-webkit-transform  300ms ease";exnum.style.WebkitTransform = "scale(1.2)";', 300);
    }
    extype = 'biz';
}
function cc1(th, f) { //changecolor(this,from)  from  [0:列表  1:详细页序号按钮  2:ATM  3:距离]
    if (exnum) {
        //exnum.style.backgroundImage = 'url("./images/Icon_b_none.png")';
        exnum.style.backgroundColor = '#719cfb';
    }
    try {
        if (f == null) {
            var ico = th.childNodes[0];
            //            ico.style.backgroundImage = 'url("./images/icon_L.png")';
            ico.style.backgroundColor = '#FF7A6E';
            exnum = ico;
        }
        else if (f == 1) {//内页小按钮
            //var ico = th.childNodes[0];
            //            th.style.backgroundImage = 'url("./images/icon_L.png")';
            th.style.backgroundColor = '#FF7A6E';
        }
        else if (f == 2 || f == 3) { //点击商家变色//点击距离
            var ico = th.parentNode.parentNode.childNodes[1].childNodes[0]; //yaobiao************************************
            //ico.style.backgroundImage = 'url("./images/icon_L.png")';
            ico.style.backgroundColor = '#FF7A6E';
            exnum = ico;
        }
        else if (f == 4) {//通过地址进行搜索
            var ico = th.parentNode.childNodes[0].childNodes[0];
            //ico.style.backgroundImage = 'url("./images/icon_L.png")';
            ico.style.backgroundColor = '#FF7A6E';
            exnum = ico;
        }
        /*else if (f == 3) { //点击距离
        var ico = th.parentNode.parentNode.childNodes[1].childNodes[0]; //yaobiao************************************
        ico.style.backgroundImage = 'url("./images/Icon_b_none.png")';
        exnum = ico;
        }*/
    } catch (e) { catche(e); }
}
function cc2(th, f) { //changecolor(this,from)  from  [0:列表  1:详细页序号按钮  2:ATM  3:距离]
    //debugger;
    if (exnum) {
        if (extype == 'biz') {
            //exnum.style.backgroundImage = 'url("./images/icon_L.png")';
            exnum.style.backgroundColor = '#FF7A6E';
            exnum.style.webkitTransition = "-webkit-transform 300ms ease";
            exnum.style.WebkitTransform = "scale(1)";
            tico.style.WebkitTransform = "scale(0)";
        }
        else {
            //exnum.style.backgroundImage = 'url("./images/Icon_b_none.png")';
            exnum.style.backgroundColor = '#719cfb';
        }
    }
    try {
        if (f == null) {
            var ico = th.childNodes[1];
            //ico.style.backgroundImage = 'url("./images/icon_L.png")';
            ico.style.backgroundColor = '#FF7A6E';
            exnum = ico;
        }
        else if (f == 1) {//内页小按钮
            //var ico = th.childNodes[0];
            //            th.style.backgroundImage = 'url("./images/icon_L.png")';
            th.style.backgroundColor = '#FF7A6E';
        }
        else if (f == 2 || f == 3) { //点击商家变色//点击距离
            var ico = th.parentNode.parentNode.childNodes[1].childNodes[0]; //yaobiao************************************
            //ico.style.backgroundImage = 'url("./images/icon_L.png")';
            ico.style.backgroundColor = '#FF7A6E';
            exnum = ico;
        }
        else if (f == 4) {//通过道路进行搜索
            var ico = th.parentNode.childNodes[0].childNodes[1];
            //ico.style.backgroundImage = 'url("./images/icon_L.png")';
            ico.style.backgroundColor = '#FF7A6E';
            exnum = ico;
        }
        /*else if (f == 3) { //点击距离
        var ico = th.parentNode.parentNode.childNodes[1].childNodes[0]; //yaobiao************************************
        ico.style.backgroundImage = 'url("./images/Icon_b_none.png")';
        exnum = ico;
        }*/
    } catch (e) { catche(e); }
}
var isclicktable = true;
function cc3(th) {
    //debugger;
    // return;
    try {
        //alert(9080);
        //debugger;
        if ($("#tools").is(":visible")) {
            $("#tools").height(0);
            $("#tool,#tools").hide();
            bhi = true;
            return true;
        }
        $("#listin table").css('-webkit-box-shadow', 'none');
        th.id = "table" + parseInt(Math.random() * 100);
        //$("#" + th.id).css('-webkit-box-shadow', '#999 0px 0px 10px 0px');

        //-webkit-box-shadow: 1px 1px 25px 5px #999;
        ////2012.03.20 取消点击事件
        //debugger

        th = th.childNodes[0].childNodes[0].childNodes[4].childNodes[1];
        th.id = "dis" + parseInt(Math.random() * 100);
        var a = 'cc31("' + th.id + '")';
        setTimeout(a, 100);

    } catch (e) {
        catche(e);
    }
}
function cc31(id) {
    //debugger
    //alert("isclicktable  " + isclicktable);
    if (isclicktable) {
        $("#" + id).click();
        //isclicktable = false;
    }
    else {
        // isclicktable = true;
        setTimeout('isclicktable=true', 1000);
    }
}
function cc4(exii) {
    //debugger
    var tab = $("#listin")[0].childNodes[2 * exii + 1];
    cc3(tab);
}
function cc5(plat, plng) {
    var Tgps = new google.maps.LatLng(plat, plng);
    map.panTo(Tgps);
    setTimeout(function () {
        try {
            zoomClick(1, null, 1);
            map.panTo(Tgps);
        } catch (e) { }
    }, 100);
}
var exnum1;
function cc6(th) {
    //debugger;
    try {
        exnum = $("#EVtab .bizListIcon")[0];
        exnum.style.backgroundColor = '#719cfb';
        exnum = ico;
    } catch (e) { }
    exnum.style.WebkitTransform = "scale(1.5)";
    th.style.WebkitTransform = "scale(1.5)";
    exnum1 = th;
    setTimeout('exnum.style.WebkitTransform = "scale(1.2)";exnum1.style.WebkitTransform = "scale(1)";', 300);
}
function cc7(th, f) { //changecolor(this,from)  from  [0:列表序号  1:详细页序号按钮  2:ATM  3:距离]
    ////debugger;
    //debugger;
    try {
        if (!!exnum) {


            exnum.style.backgroundColor = '#FF7A6E';
            exnum.style.webkitTransition = "-webkit-transform 300ms ease";
            exnum.style.WebkitTransform = "scale(1)";
            tico.style.WebkitTransform = "scale(0)";

        }
    } catch (e) { catche(e); }
    try {
        if (f == null) {
            var ico = th.parentNode.parentNode.childNodes[1].childNodes[0];
            //ico.style.backgroundImage = 'url("./images/Icon_b_none.png")';
            ico.style.backgroundColor = '#719cfb';
            exnum = ico;
            var tico = ico;
            //tico = ico.parentNode.parentNode.childNodes[4].childNodes[1].childNodes[1];
            tico.id = "plus" + parseInt(Math.random() * 100);
            tico.style.webkitTransition = "-webkit-transform  300ms ease";
            tico.style.WebkitTransform = "scale(1.2)";
            setTimeout('tico.style.webkitTransition = "-webkit-transform 300ms ease";tico.style.WebkitTransform = "scale(1)";', 300);
            //$("#" + tico.id).slideDown();
            //tico.id = "";

        }
        else if (f == 1) {//内页小按钮
            //var ico = th.childNodes[0];
            //th.style.backgroundImage = 'url("./images/Icon_b_none.png")';
            th.style.backgroundColor = '#719cfb';
        }
        else if (f == 2 || f == 3) { //点击商家变色//点击距离
            //debugger;
            var ico = th.parentNode.childNodes[1].childNodes[0]; //yaobiao************************************
            //ico.style.backgroundImage = 'url("./images/Icon_b_none.png")';
            ico.style.backgroundColor = '#719cfb';
            exnum = ico;
            /*if (!isexi) {
            tico = ico.parentNode.parentNode.childNodes[4].childNodes[1].childNodes[1];
            tico.id = "plus" + parseInt(Math.random() * 100);
            //$("#" + tico.id).slideDown();
            tico.style.webkitTransition = "-webkit-transform 300ms ease";
            tico.style.WebkitTransform = "scale(1.2)";
            setTimeout('tico.style.webkitTransition = "-webkit-transform 300ms ease";tico.style.WebkitTransform = "scale(1)";', 300);
            //tico.id = "";
            }*/
        }
        else if (f == 4) {//通过地址进行搜索
            var ico = th.parentNode.childNodes[0].childNodes[0];
            //ico.style.backgroundImage = 'url("./images/Icon_b_none.png")';
            ico.style.backgroundColor = '#719cfb';
            exnum = ico;
        }
        //变大
        ////debugger;

        /*  $("#" + exnum.id).css('-webkit-transform', 'scale(1)');

        $("#map").animate({ left: "132px", top: "-97px" }, 500);*/

        /*else if (f == 3) { //点击距离
        var ico = th.parentNode.parentNode.childNodes[1].childNodes[0]; //yaobiao************************************
        ico.style.backgroundImage = 'url("./images/Icon_b_none.png")';
        exnum = ico;
        }*/
    } catch (e) { catche(e); }
    finally {
        exnum.style.webkitTransition = "-webkit-transform  300ms ease";
        exnum.style.WebkitTransform = "scale(1.5)";
        setTimeout('exnum.style.webkitTransition = "-webkit-transform  300ms ease";exnum.style.WebkitTransform = "scale(1.2)";', 300);
    }
    extype = 'biz';
}
//endregion

//#region   saveReport1(a, b, c, d, e)
function saveReport1(a, b, c, d, e) {
    // $.post("ajax_saveReport.asp?", { a: a, b: b, c: c, d: d });
    //alert(e);
    //document.getElementById(e).innerHTML = "&nbsp;&nbsp;<br>&nbsp;&nbsp;Your report is appreciated.&nbsp;&nbsp;&nbsp;&nbsp;<img src='images/bg_back.png' onclick='click_back();'><br>&nbsp;&nbsp;<br />&nbsp;&nbsp;&nbsp;"
    $("#" + e).html("&nbsp;&nbsp;<br>&nbsp;&nbsp;Your report is appreciated.&nbsp;&nbsp;&nbsp;&nbsp;<img src='images/bg_back.png' onclick='click_back();'><br>&nbsp;&nbsp;<br />&nbsp;&nbsp;&nbsp;");
}



//#endregion

var varbizimg = true;
function showBizImg(a) {
    //debugger;
    try {
        if (a == 1) {
            if (varbizimg) {
                $("#coverbody").show();
                var left = document.getElementById('_staticmap').getBoundingClientRect().left + document.body.scrollLeft;
                var top = document.getElementById('_staticmap').getBoundingClientRect().top + document.body.scrollTop;
                $("#imgbiz10").css({ left: left, top: top });
                $("#imgbiz10").show();
                top = 53 + parseInt(document.body.scrollTop);
                //$("#imgbiz10").animate({ width: '310px', height: '250px', top: top, left: '5px' });
                $("#imgbiz10").css({ width: '310px', height: '250px', top: top, left: '5px' });

                //$("#imgbiz10").fadeIn();
                varbizimg = false;
                GoogleTouchEvent("coverbody");
                GoogleTouchEvent("imgbiz10");
                //window.scrollTo(0, 60);
            }
            else {
                var covertype = 0; //0 map 1 time
                if ($("#_bizTime0").is(':visible')) {
                    covertype = 1;
                }
                $("#_bizTime0,#coverbody").hide();
                varbizimg = true;
                if (covertype == 1) {
                    return;
                }
                var left = document.getElementById('_staticmap').getBoundingClientRect().left + document.body.scrollLeft;
                var top = document.getElementById('_staticmap').getBoundingClientRect().top + document.body.scrollTop;
                //$("#imgbiz10").animate({ width: '100px', height: '66px', top: top, left: left });
                $("#imgbiz10").css({ width: '143px', height: '100px', top: top, left: left });
                setTimeout('$("#imgbiz10,#_bizTime0").hide()', 400);
            }
        }
        if (a == 2) {
            var covertype = 0; //0 map 1 time
            if ($("#_bizTime0").is(':visible')) {
                covertype = 1;
            }
            $("#_bizTime0,#coverbody").hide();
            varbizimg = true;
            if (showDetails) {
                $("#SearchIcon").css({ "top": "379px", "left": "260px", "display": "block" });
            } else {
                $("#SearchIcon").css({ "top": "173px", "left": "276px", "display": "block" });
            }
            if (covertype == 1) {
                return;
            } var left, top;
            /* if (OK15211) {
            left = OK15211.getBoundingClientRect().left + document.body.scrollLeft;
            top = OK15211.getBoundingClientRect().top + document.body.scrollTop;
            OK15211 = false;
            $("#imgbiz10").css({ width: '75px', height: '50px', top: top, left: left });
            }
            else {
            left = document.getElementById('_staticmap').getBoundingClientRect().left + document.body.scrollLeft;
            top = document.getElementById('_staticmap').getBoundingClientRect().top + document.body.scrollTop;
            $("#imgbiz10").css({ width: '143px', height: '100px', top: top, left: left });
            }

            */
            //        $("#imgbiz10").animate({ width: '100px', height: '66px', top: top, left: left });
            $("#imgbiz10").hide(); // setTimeout('$("#imgbiz10").hide()', 400);
        }

    } catch (e) {

    }
}
//#endregion

//#region SAVED
function savedToDB(type, notes, date, gps) {
    // //debugger;;
    //自定义saved   savedToDB('L', notes, date, gpsLL);
    //biz           savedToDB('B', ccode, date);
    //自定义shared  savedToDB('LL', addr, tname, gpsLL);
    //地址          savedToDB('A', ccode, date);
    if (storage.getItem("account") != null && storage.getItem("account") != "") {
        who = storage.getItem("account");
    }
    if (who != "") {
        $.ajax({
            url: 'Handler/Login.ashx',
            type: 'POST',
            data: {
                savedToDB: type,
                notes: notes,
                date: date,
                gps: "" + gps,
                who: who
            },
            success: function () {
                //alert("save success");
            },
            error: function (a) {
                //alert("save error " + a);
            }
        });
    }
}
//#endregion

//alert(verStr);
//#region tese设备
function testIOS() {
    //debugger;
    if (verStr.indexOf("iPhone") == -1) {
        //alert(11826);
        $("#keywords2").width('87%');
        $("#keywords2").css("margin-left", "-17px");
    }
    else if (verStr.indexOf("OS 4") != -1) {
        $("#keywords2").width('86%');
        $("#keywords2").css("margin-left", "-20px");
        // $("#keywords2").width('170px');
    }
    else {
        //$("#keywords2").css("margin-left", "-17px");
    }
}
//#endregion

//#region 正则
var regd = /'{1,}/g;
var regd1 = /,{1,}/g;
var regd2 = /"{1,}/g;

function ReplaceT(str1) {
    if (str1) {
        str1 = str1.replace(regd, "#39#");
        str1 = str1.replace(regd1, "#38#");
        str1 = str1.replace(regd2, '#37#');
        str1 = str1.replace("￥", "");
        str1 = str1.replace(";", "");
        str1 = str1.replace(/ /g, '+');
        return str1;
    }
    else {
        return "";
    }
}
//##-》符号
function ReplaceF(str) {
    if (str) {
        var str2 = str.replace(/#39#/g, "'");
        str2 = str2.replace(/#38#/g, ",");
        str2 = str2.replace(/#37#/g, '"');
        str2 = str2.replace(/\+/g, ' ');
        //str1.replace("￥", "");
        //str1.replace(";", "");
        return str2;
    }
    else {
        return "";
    }
}
$("#canva").height(0);
$("#canvb").height(0);
$("#canva,#canvb").hide();
testload = true;
//#endregion

//#region 禁止其他用户访问
var equi;
if (verStr.indexOf('Android') != -1) {
    equi = 'Android';
}
if (verStr.indexOf('iPhone') != -1) {
    equi = 'iPhone';
}
if (equi == 'iPhone') {
    //查看版本号
    var ver = verStr.toLowerCase().split('applewebkit/')[1];
    ver = ver.split('.')[0];
    if (ver < 500) {
        alert('Sorry, Your device does not support \r\n we just work for iphone 3G, iphone 3GS, iphone 4, iphone 4S');
    }
}
//#endregion

//#region 恢复机制
//菜单丢失，则立即重新生成一个  
//地图切换放大失败
//to map还是to menu
var monitor;
function Monitor() { }
//#region 监控列表
Monitor.prototype.menu = function () {
    if (!($("#menu1").is(":visible") && $("#menu").is(":visible"))) {
        // listMenu(arrList);
    }
};
//#endregion
//#region 监控地图
var monitorTomap;
var monitorTomapTime = 0;
Monitor.prototype.tomap = function (x)
{ }
/*{
try {
//// // // //  // //debugger;;
//map
if (hisw) {
if (x && ((!($("#map").is(":visible") && $("#map").css("-webkit-transform").indexOf("scale(1)") == 0)) && monitorTomapTime < 5)) {
$("#map").show();
document.getElementById('map').style.visibility = 'visible';
document.getElementById('map_canvas').style.visibility = 'visible';
$("#map").css('-webkit-transform', 'scale(1)');
monitorTomap = setTimeout('monitor.tomap(true)', 1000);
monitorTomapTime++;
}
else {
clearTimeout(monitorTomap);
monitorTomapTime = 0;
}
}
//menu
else {
if (!(!x && (($("#map").css("-webkit-transform").indexOf("0.082") != -1) && monitorTomapTime < 5))) {
$("#map").css('-webkit-transform', 'matrix(0.082, 0, 0, 0.11, 0, 0)');
$("#map").css('-moz-transform', 'matrix(0.082, 0, 0, 0.11, 0, 0)');
$("#map").animate({ left: "132px", top: "-97px" }, 500);
//click_back();
monitorTomap = setTimeout('monitor.tomap(false)', 1000);
monitorTomapTime++;
} else {
clearTimeout(monitorTomap);
monitorTomapTime = 0;
}
}

} catch (e) { catche(e); }
};*/
//#endregion
//#region 检测GPS是否正常
var monitorGPSTime;
Monitor.prototype.gps = function (x) {
    try {
        if (x) {
            if (!isNaN(x.lat()) && !isNaN(x.lng())) {
                return true;
            }
        }
        return false;

    } catch (e) { catche(e); }
};
//#endregion
monitor = new Monitor();
//#region 错误日志
//记录错误发生的来源
var jsErrorMSG = "";
function catche(e) {
    //alert(e.line);
    if (!e.line) {
        return;
    }
    if (e.line != '1') {
        //alert(e.sourceURL + ";" + e.line + ";" + e.message);
        jsErrorMSG += "<br />file:" + e.sourceURL + "; line:" + e.line + "; message:" + e.message;
    }
    else {
        jsErrorMSG += "<br />file:" + e.sourceURL + "; message:" + e.message;
        //alert(jsErrorMSG);
    }
    //alert(e);
    //alert(tid);
    console.log(e);
    //    console.log(e.line + "; message:" + e.message);
}




//#endregion
var SystemBuy = [false, 0]; //系统繁忙
var mapStatus = false;  //地图载入状态
//#endregion

//#region setTimeout最新用法
//var q = "alert(7131)";
//setTimeout(q, 3000);
//#endregion
var si1077;
function watchinput() {
    si1077 = setInterval('kw2change()', 500);
}
function stopwatchinput() {
    clearInterval(si1077);
}
/*
function kw2change() {
try {
//$("#keywords2").height(28);
//$("#keywords2").width('82%');
if (!hisw) {
var kw2 = $.trim($("#keywords2").val());
if (kw2 != "" && kw2.length > 0) {
$(".chacha").show();
//return;
}
else {
$(".chacha").hide();
}
}
} catch (e) {
alert(e);
}

}*/
//$('body').css('background', '#6070A4');
$("#editDone").html('Edit');

setTimeout('window.scrollTo(0, 0)', 1000);
setTimeout('window.scrollTo(0, 0)', 2000);
var sivar2;
var isgetthis = true;


document.addEventListener('DOMContentLoaded', loaded, false);
function loaded() {
    //debugger;
    window.scrollTo(0, 0);
    $("#listin").html("<center><br><br><br>Positioning ...<br><div id=\'jindutiao\'><div></div></div></center>");
    if (!$("#container").hasClass("container")) {
        $("#container").attr("class", "container");
    }
}
//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);


window.onload = function () {
    /*  2012.08.23*/
    setTimeout(function () {
        try {
            myScroll.destroy();
        } catch (e) {
        }
        myScroll = null;
        myScroll = new iScroll('menu', { vScrollbar: false });
    }, 3000);
    //debugger;
    var sttime = 200;
    if ($myiPhone == 3) {
        sttime = 300;
    }
    google.maps.event.addDomListener(document.getElementById("menu"), 'touchmove', function (e) {
        if (myScroll.y < 0) {
            if (Switch5487) {
                $("#saved").css("-webkit-box-shadow", "black 0px 7px 10px");
            }
            else {
                $("#saved").css("-webkit-box-shadow", "0px 3px 10px grey");
            }
        }
        else {
            $("#saved").css("-webkit-box-shadow", "none");
        }
    });
    google.maps.event.addDomListener(document.getElementById("menu"), 'touchend', function (e) {
        setTimeout(function () {
            if (myScroll.y < 0) {
                if (Switch5487) {
                    $("#saved").css("-webkit-box-shadow", "black 0px 7px 10px");
                }
                else {
                    $("#saved").css("-webkit-box-shadow", "0px 3px 10px grey");
                }
            }
            else {
                $("#saved").css("-webkit-box-shadow", "none");
            }
        }, 500);
    });
    // sivar2 = setInterval('$("#menu1").touchScroll("update")', 100);
    setTimeout(function () {
        $(".bigpic,.bgpic1").show();
        $("#menu").css('opacity', '1');
        //$(".bigpic").css('margin-left', '5px');
        window.scrollTo(0, 0);
        setTimeout("$('#tbList .listMain1').css('-webkit-transform', 'rotateY(0deg)');", 300);
        /* google.maps.event.addDomListener($('#menu1')[0], 'touchstart', function (e) {
        clearTimeout(stvar2);
        });
        google.maps.event.addDomListener($('#menu1')[0], 'touchend', function (e) {
        stvar2 = setTimeout('$("#menu1").touchScroll("update")', 500);
        });*/
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-1829103-4']);
        _gaq.push(['_setDomainName', '.umap.ca']);
        _gaq.push(['_trackPageview']);
        (function () {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    }, sttime);
    setTimeout('clearInterval(sivar2)', 3000);
    var layerPulse = '<div id="layerPulse"></div>';
    $("body").append(layerPulse);
    var SearchIcon = '<div id="SearchIcon" onclick="RectSearch();"></div>';
    $("body").append(SearchIcon);
    onLoadEvent();
    //setInterval('LoadMainList()', 10);
}
//var LoadMainListOK = false;
//function LoadMainList() {
//    if (!LoadMainListOK) {
//        try {
//            if (document.readyState == "complete") {
//                setTimeout(function () {
//                    LoadMainListOK = true;
//                    myScroll = new iScroll('menu', { vScrollbar: false });
//                    document.getElementById('menu').style.left = '0';
//                }, 100);
//            }
//        } catch (e) { console.log(e); }
//    }
//}
function onLoadEvent() {
    $("*").click(function (e) {
        if (isgetthis && this.id != "map_canvas") {
            //
            //alert(this.id);
            var left = getX(e) - 10;
            var top = getY(e);
            // var left = this.getBoundingClientRect().left + document.body.scrollLeft;
            // var top = this.getBoundingClientRect().top + document.body.scrollTop;
            $("#layerPulse").css({ "top": top + "px", "left": left + "px" });
            $("#layerPulse").addClass('layerPulse');
            //console.log(left + "," + top);
            isgetthis = false;
            setTimeout('isgetthis=true; $("#layerPulse").removeClass("layerPulse");', 500);
        }
    });
    //    $("#submit").val($("#menu1").height());
    //    $("#submit").val($("#menu").height());
    //    $("#submit").val($("#menu1").height());
    //2012.08.23
    setTimeout(function () {
        //LoadMainListOK = true;
        //        $("#submit").val($("#menu1").height());
        //        $("#submit").val($("#menu").height());
        //        $("#submit").val($("#menu1").height());
        //console.log("menu的高度是：" + $("#menu").height());
        //var height = $("#menu1").height();
        //console.log("menu1的高度是：" + $("#menu1").height());
        myScroll = new iScroll('menu', { vScrollbar: false });
        //        console.log("menu1的高度是：" + $("#menu1").height());
        //        myScroll.destroy();
        //        myScroll = null;
        //        $("#menu1").height(1000);
        //        $("#menu1").height(height);
        //        myScroll = new iScroll('menu', { vScrollbar: false });
        //console.log("menu1的高度是：" + $("#menu1").height());
        openList(arrList.length - 1, 1);
        setTimeout("openList(arrList.length - 1,1);", 150);
    }, 1000);


    //myScroll.refresh();
}
//获取鼠标X、Y轴坐标
function mousePosition(ev) {
    if (ev.pageX || ev.pageY) {
        return { x: ev.pageX, y: ev.pageY };
    }
    return {
        x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y: ev.clientY + document.body.scrollTop - document.body.clientTop
    };
}

function getX(ev) {
    ev = ev || window.event;
    var mousePos = mousePosition(ev);
    var x = mousePos.x;
    return x;
}

function getY(ev) {
    ev = ev || window.event;
    var mousePos = mousePosition(ev);
    var y = mousePos.y;
    return y;
}



$("#page0").width("100%");
$("#page1").show();
//$("#keywords2").width("81%");
//alert(window.screen.deviceXDPI);
//alert(window.screen.height);//480
//alert(window.screen.width); //320
var iPhoneOrientation = 0;
var isorientationChange = false;
function orientationChange(para) {
    //alert(window.orientation);
    if (!para) {
        isorientationChange = true;
    }
    //debugger
    switch (window.orientation) {
        case 0:
            if (para != '1') {
                //alert(para);
                XY();
            }
            break;
        case 180:
            if (para != '1') {
                XY();
            }
            break;
        case -90: { XZ(); }
            break;
        case 90: { XZ(); }
            break;
    }
    changeMsgInfo();
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orientationChange, false);
orientationChange('1');
function XZ() {
    try {
        var y = myScroll.y;

    } catch (e) {

    }
    try {
        myScroll.destroy();
    } catch (e) { }
    myScroll = null;
    try {
        closecross();
        iPhoneOrientation = 90;
        try {
            if (!!$.trim($("#bizName").html())) {
                $("#bizName").show();
            }
            if (showDetails) { bizToMap(); showBizImg(2); }
        } catch (e) {
            throw (e);
        }
        // closeDetails();
        //$("#page3_details").css('margin-top','480px');
        toTop();
        // $("body,#page0").width('100%');
        $("body,#page0").height(270);
        //alert($('#container').css('top'));
        $('#container').css('top', '400px');
        //$('#keywords2').width(330);
        // setTimeout("$('#keywords2').width(81%)", 500);
        //    setTimeout("", 500);
        //$('#keywords2').css('border', '1px grey solid');
        $("#menu,#menu1").height(165);
        try {
            $("#menu").html('<div id="menu1">' + $("#menu1").html() + '</div>');
            setTimeout(function () {
                myScroll = new iScroll('menu', { vScrollbar: false });

                if (!!y) {
                    myScroll.scrollTo(0, y, 0);
                }
                else {
                    myScroll.scrollTo(0, 0, 0);
                }
            }, 500);
        } catch (e) { console.log(e); }
        //setTimeout("$('#saved div').css('margin-left', '60px')", 500);
        //setTimeout("alert($('#map').width())", 1000);
        $('.chacha').css('margin-right', '28px');
        $("#s1Info, #s2Info, #s3Info").css('margin', '5px 15px');
        $("#map,#map_canvas").height(268);
        $("#map,#map_canvas").height(268);
        //$("#mapcor3,#mapcor4").css('top', '248px');
        google.maps.event.trigger(map, 'resize');
        // $("#tools,#tool").css('top', '223px');
        setTimeout(function () {
            var wid = $("#map_canvas").width() / 2;
            var left = wid - 53;
            $("#Redo").css("margin-left", left + "px");
        }, 500);
        //alert(parseFloat($("#map").width() / 2 - 15));225
        //alert(parseFloat($("#map").height() / 2 - 15));119
        //$("#centerControlDiv").css({ 'left': '225px !important', 'top': '119px !important' });
        $("#cross").css('top', '280px');
        $("#savedinfo,#si,#copyrightCanvas,#copyrightText").height(170);
        $("#Pri").hide(); //$("#Pi// .Pimg").css('margin-left', '75px');
        $("#s3Info,#a5").css('color', 'grey');

    } catch (e) {

    }
    /* try {
    clearTimeout(xy1);
    } catch (e) { catche(e); }*/
    //alert(document.body.style.height);
    //alert(document.body.style.width);
    //    try {
    //        $('#si').touchScroll('update');
    //        $('#copyrightText').touchScroll('update');
    //    } catch (e) { }
}
//XZ();
var xy1;
function XY() {
    iPhoneOrientation = 0;
    try {
        var y = myScroll.y;

    } catch (e) {

    }
    try {
        myScroll.destroy();
    } catch (e) { }
    myScroll = null;
    toTop();
    $("#bizName").hide();
    $("body").height(415);
    //$('#keywords2').width('82%');
    //$('#keywords2').width(174);
    //$("#page3_details").css('margin-top', '265px');
    /*if ($("#page3_details").is(":visible")) {

    $("#map,#map_canvas").height(210);
    }
    else {
    $("#map,#map_canvas").height(255);
    }*/
    $("#map,#map_canvas").height(255);
    $('#container').css('top', '262px');
    $("#menu,#menu1").height(316);
    try {
        $("#menu").html('<div id="menu1">' + $("#menu1").html() + '</div>');
        setTimeout(function () {
            myScroll = new iScroll('menu', { vScrollbar: false });

            if (!!y) {
                myScroll.scrollTo(0, y, 0);
            }
            else {
                myScroll.scrollTo(0, 0, 0);
            }
        }, 500);
    } catch (e) { console.log(e); }
    $('.chacha').css('margin-right', '21px');
    $("#s1Info, #s2Info, #s3Info").css('margin', '15px');
    //$("#mapcor3,#mapcor4").css('top', '236px');
    google.maps.event.trigger(map, 'resize');
    // $("#tools,#tool").css('top', '255px');
    /*var wid = $("#map_canvas").width() / 2;
    var left = wid - 15;
    $("#centerControlDiv").css("margin-left", left + "px");
    left = wid - 53;
    $("#Redo").css("margin-left", left + "px");*/
    setTimeout(function () {
        var wid = $("#map_canvas").width() / 2;
        var left = wid - 53;
        $("#Redo").css("margin-left", left + "px");
    }, 500);


    //$("#centerControlDiv").css({ 'right': '145px !important' });
    $("#cross").css('top', '256px');
    $("#savedinfo,#si,#copyrightCanvas,#copyrightText").height(310);
    $("#s3Info,#a5").css('color', 'blue');
    //$(".Pimg").css('margin-left', '30px');
    /*  $("#Pri").height(415);
    if ($("#Pri").is(":visible")) {
    $("#Pri").hide();
    //$("#Pri").show();
    }*/
    //    try {
    //        $('#si').touchScroll('update');
    //        $('#copyrightText').touchScroll('update');
    //    } catch (e) { }
    $('html body').css({ 'left': '0px', 'top': '0px' });
    //alert($('body').css('height'));
    toTop();
    //xy1 = setTimeout("$('#keywords2').width('81%');$('.chacha').css('left', '167px')", 500);
}
function changeMsgInfo() {
    if (iPhoneOrientation == 0) {//正常
        $("#s1Info, #s2Info, #s3Info").css('margin', '15px');
        $("#MsgInfo").css({ 'margin': '10px auto', 'height': '135px' });
        $("#a5").css('margin', '30px');
        $("#account").height(318);
        $("#closeDetailsaccount,#closeDetailsaccount1").css({ marginTop: "3px" });
    }
    else {//翻转
        $("#s1Info, #s2Info, #s3Info").css('margin', '5px 15px');
        $("#MsgInfo").css({ 'margin': '0px auto', 'height': '110px' });
        $("#a5").css('margin', '0px 100px');
        $("#account").height(168);
        $("#closeDetailsaccount,#closeDetailsaccount1").css({ marginTop: "-35px" });
    }
}

//#region 定时采集GPS
/*
var testMyGPS;
TestMyGPS.prototype.open();
testMyGPS=new TestMyGPS();*/
var exgpsstate;
function testMyGPS(x) {
    //debugger;
    if ((gpsState == 0 || x) && isallowgps) {
        //alert(12199);
        gpsState = 0;
        watchgps(3);
        /*if (navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function (pos) {
        var init = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        map.panTo(init);
        isallowgps = true; //用户给了gps
        gpsState = 0;

        if (monitor.gps(init)) {
        map.setCenter(init);
        newgps = init;
        }
        gps = pos.coords.latitude + "," + pos.coords.longitude;
        newGPS = init;
        getbound(3, init);
        //alert(newgps + "\r\n" + gps);
        //确定定位之后，清除之前的gps
        clearMarkGPS();
        var marker = new google.maps.Marker({
        position: init,
        icon: gpsicon,
        map: map
        });
        markerGPS.push(marker);
        addClicktoMarker(marker, init);

        if (oldGps && newGPS && ("" + oldGps != "" + newGPS)) {
        //alert();
        gpschange = 'yes';
        clearInterval(si9916);
        si9916 = setInterval('testMyGPS()', 5000);
        }
        else {
        gpschange = '';
        clearInterval(si9916);
        si9916 = setInterval('testMyGPS()', 15000);
        }
        oldGps = newGPS;

        console.log(gpschange + "~~" + oldGps + "~~" + newGPS);

        //watchgps('initialize');
        //gpsLock = true;
        }, function () { }, {
        //  timeout: 6000
        });
        //  setTimeout("stopwatchGPS('" + wid + "')", 7000);
        // Try Google Gears Geolocation
        }
        else if (google.gears) {
        browserSupportFlag = true;
        var geo = google.gears.factory.create('beta.geolocation');
        geo.getCurrentPosition(function (pos) {
        var init = new google.maps.LatLng(pos.latitude, pos.longitude);
        map.setCenter(init);
        var marker = new google.maps.Marker({
        position: init,
        icon: gpsicon,
        map: map
        });
        try {
        clearMarkGPS();
        } catch (e) { catche(e); }
        newgps = init;
        markerGPS.push(marker);
        addClicktoMarker(marker, init);
        watchgps();
        }, function () { });
        }
        */
    }
}
var si9916;
var userStatu; //0:定，1：动
si9916 = setInterval('testMyGPS()', 15000);
//#endregion
//#region 时间戳 [保留]
var myDate = new Date();
var Timestamp; // = [myDate.getMinutes(), ];
var si9919;
if (verStr.indexOf('iPhone') != -1 || verStr.indexOf('Android') != -1) {
    si9919 = setInterval('TimeStamp()', 1000);
}
var activing = false;
google.maps.event.addDomListener($('body')[0], 'touchstart', function (e) {
    //alert(9925);
    /* try {
    clearInterval(si9919);
    } catch (e) { catche(e); }
    */
    try {
        if (ChangeHeightSwitch) {
            var top = getY(e);
            if (top > 330) {
                ChangeHeight(2);
            }
        }
        if (!Timestamp) {
            return;
        }
        var extime = parseInt(Timestamp);
        var aftime = new Date().getMinutes(); // parseInt(Timestamp[1]);
        if (aftime >= extime) {
            if ((aftime - extime) > 4) {
                // alert(1446);
                ActivePage(1);
                activing = true;
            }
        }
        else {
            if ((60 + aftime - extime) > 5) {
                // alert(1466);
                ActivePage(1);
            }
        }
    } catch (e) {

    }
});
google.maps.event.addDomListener($('body')[0], 'touchend', function (e) {
    ChangeHeightSwitch = true;
    //alert(9929);
    //    try {
    //        clearInterval(si9919);
    //    } catch (e) { catche(e); }
    Timestamp = new Date().getMinutes();
    //  si9919 = setInterval('TimeStamp()', 1000);
});
function TimeStamp() {
    return;
    //debugger
    Timestamp[1] = new Date().getMinutes();
    var extime = parseInt(Timestamp[0]);
    var aftime = parseInt(Timestamp[1]);
    if (aftime >= extime) {
        if ((aftime - extime) > 4) {
            //alert(14687);
            ActivePage(1);
            //location.reload();
        }
    }
    else {
        if ((60 + aftime - extime) > 5) {
            // alert(14694);
            ActivePage(1);
            //location.reload();
        }
    }   /* */
    //$("#keywords2").val(aftime - extime);
}
//#endregion


function isNull(x) {
    if (x == null || x == undefined || x == "") {
        return false;
    }
    else if (x) {
        return true;
    }
}


//#region Event
function PU(kw, CP, th) {
    if (th.style.color != "gray") {
        //$('#list').touchScroll('setPosition', 0);
        myScrolllist.scrollTo(0, 0, 0);
        MapLock();
        clickSearch(kw, null, CP, null, 11);
    }
}
function PD(kw, CP, th) {
    if (th.style.color != "gray") {
        myScrolllist.scrollTo(0, 0, 0);
        //        $('#list').touchScroll('setPosition', 0);
        MapLock();
        clickSearch(kw, null, CP, null, 11);
    }
}
var isEventPic = false;
function EventPic(name) {
    toTop();
    //文件名http://umap.ca/images/events/frenchf2012-ss4.jpg 
    //文件名组成'images/events/' + EventsCode + 'SS' + (1,2,3,4) 
    //在上面的图片页里，小图一行最多4个，支持两行
    //Frenchf2012-SL1.JPG
    //Frenchf2012-SS1.jpg
    //onclick = "EventPic('EventsCode;4')"
    //debugger;
    //alert(isEventPic);
    if (isEventPic) {
        return;
    }
    isEventPic = true;
    try {
        document.removeChild($("#coverbody1")[0]);
    } catch (e) {

    }
    try {
        name = name.split(";");
        //        if (!document.getElementById("coverbody1")) {
        //            //alert(1);
        var coverbody1 = '<div id="coverbody1"></div><div id="BigEP"><div id="BigEP1">';
        for (var i = 1; i < parseInt(name[1]) + 1; i++) {
            coverbody1 += '<img  src="../images/events/' + name[0] + '-SL' + i + '.jpg">';
        }
        coverbody1 += '</div></div><div id="smallEP">';
        for (var i = 1; i < parseInt(name[1]) + 1; i++) {
            coverbody1 += '<img onclick="MoveEP(' + i + ',this)"  src="../images/events/' + name[0] + '-SS' + i + '.jpg">';
        }
        coverbody1 += '</div><div id="closeEvPic" class="close left" onclick="closeEvPic()"><span class="chahao">×</span></div>'; //coverbody1
        $("#form1").append(coverbody1);
        //        }
        //        else {
        //            return;
        //            alert(2);
        //            $("#coverbody1").html('div id="coverbody1"><div id="BigEP"><div id="BigEP1"></div></div><div id="smallEP"></div><div id="closeEvPic" class="close left" onclick="closeEvPic()"><span class="chahao">×</span></div>');
        //            $("#coverbody1").show();
        //            var BEP = '';
        //            var SEP = '';
        //            for (var i = 1; i < parseInt(name[1]) + 1; i++) {
        //                BEP += '<img  src="../images/events/' + name[0] + '-SL' + i + '.jpg">';
        //            }
        //            $("#BigEP1").html(BEP);
        //            for (var i = 1; i < parseInt(name[1]) + 1; i++) {
        //                SEP += '<img onclick="MoveEP(' + i + ')" src="../images/events/' + name[0] + '-SL' + i + '.jpg">';
        //            }
        //            $("#smallEP").html(SEP);
        //        }
        if (parseInt(name[1]) > 4) {
            $("#BigEP").css('margin-top', '25px');
            $("#smallEP").css('margin-top', '250px');
            $("#closeEvPic").css('margin-top', '375px');
        }
        $("#coverbody1").css({ "display": "block", "-webkit-transform": "scale(1)" });
    } catch (e) {
        alert(e);
    }
    //alert($("#coverbody1").html());
    GoogleTouchEvent("coverbody1");
    GoogleTouchEvent("BigEP");
    GoogleTouchEvent("smallEP");
    GoogleTouchEvent("closeEvPic");
}
function MoveEP(x, th) {
    //-webkit-transform: translateX(-320px);
    //$("#BigEP1").css('-webkit-transform', 'translateX(-' + (320 * parseInt(x - 1)) + 'px)');
    $("#BigEP1").css('margin-left', '-' + (320 * parseInt(x - 1)) + 'px');
    $("#smallEP img").css({ 'border': '5px solid  transparent', '-webkit-box-shadow': 'none' });
    th.id = "Tempimg";
    $("#Tempimg").css({ "border-color": "#F5F6F0", '-webkit-box-shadow': '0px 0px 5px black' });
    //th.style.borderColor = "#F5F6F0";
    th.id = " ";
    return false;
}
function closeEvPic() {
    //$("#coverbody1").hide();
    //debugger;
    $("#form1")[0].removeChild($("#coverbody1")[0]);
    $("#form1")[0].removeChild($("#BigEP")[0]);
    $("#form1")[0].removeChild($("#smallEP")[0]);
    $("#form1")[0].removeChild($("#closeEvPic")[0]);
    isEventPic = false;
}
//#endregion
//EventPic('Frenchf2012;4');

//添加指路
//用户位置数据分析
//用户页面分析
//商家评论与照片
//商家upoint图片

//#region Lucky Draw
//debugger;
//var Twho = who;
//if (!who) {
//    Twho = "￥";
//}
//if (!!storage.getItem("LDwho")) {
//    Twho = storage.getItem("LDwho");
//    //Twho = "1001120";
//}
//页面加载时

//$.ajax({
//    url: 'Handler/SearchInfo.ashx',
//    type: 'POST',
//    data: {
//        LuckyDraw: Twho,
//        step: 1  //1:拉取DB信息  2：点击获取
//    },
//    success: function (id) {
//        //debugger;
//        if (!!id) {
//            //id = [];
//            //true;id;url;status
//            id = id.split(";");
//            //                        id[0] = "true";
//            //                        id[1] = "100895";
//            //                        id[2] = "001";
//            //                        id[3] = "2";
//            storage.setItem("LDwho", id[1]);
//            storage.setItem("LDurl", id[2]);
//            Twho = id[1];
//            try {
//                $("#showdraw").html('<img id="Drawimg" src="../images/LuckyDraw/' + storage.getItem("LDurl") + '.jpg">');
//                //$("#Drawimg")[0].src = "../images/LuckyDraw/" + storage.getItem("LDurl") + ".jpg";
//            } catch (e) { }
//            //
//            //            $("#showsaved,#showshared,#showaccount,#showevents").css("width", "30%");
//            //            $("#showdraw").css({ "width": "10%", "height": "39px", "padding": "0px" });
//            //            $("#showdraw").show();
//            //
//            if (id[3] == "3") {
//                $("#showdraw")[0].onclick = Function("showdraw(2)");
//            }
//        }
//    }
//});

var step = 4;
//var LuckyTitle = '<div id="LuckyTitle"><span id="char1"><a class="red">M</a><a class="green">o</a><a class="blue">v</a><a>i</a></span><span> <a class="red">T</a><a>ic</a><a class="blue">k</a><a class="green">e</a><a class="red"></a><a class="red"></a></div>';

//    var LuckyTitle = '<div id="LuckyTitle"><div id="LT1"><span style="color:#FF0000;">M</span><span style="color:#00CC00;">o</span><span style="color:#0000FF;">v</span><span style="color:#333333;">i</span><span style="color:#FFCC00;">e</span></div><div id="LT2"><span style="color:#FF0000;">T</span><span style="color:#333333;">ic</span><span style="color:#0000FF;">k</span><span style="color:#00CC00;">e</span><span style="color:#800080;">t</span></div><div id="LT3"><span style="color:#FF0000;">L</span><span style="color:#333333;">u</span><span style="color:#00CC00;">c</span><span style="color:#0000FF;">k</span><span style="color:#333333;">y </span></div><div id="LT4"><span style="color:#FF0000;">D</span><span style="color:#333333;">r</span><span style="color:#993333;">a</span><span style="color:#800080;">w</span></div><hr></div>';


function showdraw(x, y) {
    //debugger;
    //关闭页面          
    if (!document.getElementById("coverbody1")) {
        var LDwindow = '<div id="LDwindow"></div>';
        var coverbody1 = '<div id="coverbody1" onclick="showdraw(null,1)">Loading ……</div>';
        $("body").append(coverbody1);
        $("body").append(LDwindow);
    }
    $("#coverbody1").css({ "-webkit-transform": "scale(1)", "display": "block" });

    GoogleTouchEvent("coverbody1");
    //$("#coverbody1").css("-webkit-transform", "scale(1)");
    //$("#coverbody1").show();
    if (!!y) {
        //关闭
        $("#coverbody1").html("");
        $("#LDwindow").css("-webkit-transform", "scale(0)");
        setTimeout('$("#coverbody1").css("-webkit-transform", "scale(0)")', 400);
        $("#showdraw").width("10%");
        $("#showsaved,#showshared,#showaccount,#showevents").css("width", "30%");
        return;
    }
    if (!x) {
        $("#coverbody1").html("Loading ……");

        //2.点击获取,同时抽奖
        $.ajax({
            url: 'Handler/SearchInfo.ashx',
            type: 'POST',
            data: {
                LuckyDraw: storage.getItem("LDwho"),
                step: 2  //1:拉取DB信息  2：点击获取
            },
            success: function (info) {
                //debugger;
                //"true;3;today's drawing for a movie ticket.;tianxia</br>合肥;0"
                //id = step;
                // step--;
                //true;id;url;status;today
                info = info.split(";");
                //info = ["true", "1", "0", "Today Winner:<br><font color='red'>101059</font><br>David Cui, Richmond Hill", "You checked in on July 13.<br>Winner is 100898, David Cui from Richmond Hill."]; //0-today, "3", "1"
                //      结果类型，id，抽哪天的奖（today/tomorrow）/哪天去检查（today、tomorrow）,中奖者简要信息,notes,
                //1.没中奖【默认】
                //2.用于已经中奖,d但并没有填写信息
                //3.用于已经中奖且有信息
                //4.提交抽奖信息成功
                id = info[1];
                //                if (info[1] == "0") {
                //                    info[1] = "today";
                //                }
                //                else {
                //                    info[1] = "tomorrow";
                //                }
                if (id != "2" && id != "3") {
                    if (info[2] == "0") {
                        info[2] = "today";
                    }
                    else {
                        info[2] = "tomorrow";
                    }
                }
                var TDate = new Date;
                TDate = TDate.getFullYear() + "-" + (TDate.getMonth() + 1) + "-" + TDate.getDate();
                var Tday = info[2];
                if (info[0] != "true" || id == "0") {
                    $("#coverbody1,#LDwindow").css("-webkit-transform", "scale(0)");
                    $("#showdraw").width("10%");
                    $("#showsaved,#showshared,#showaccount,#showevents").css("width", "30%");
                    alert("sorry,Network connection error,please try again later!");
                    return;
                }
                /*if (id == "1") */
                else {
                    //没中奖
                    //debugger;
                    //info0 = "Your previous play was not win.";
                    var LuckyTitle = '<div id="LuckyTitle"><div id="LT1"><span style="color:#FF0000;">M</span><span style="color:#00CC00;">o</span><span style="color:#0000FF;">v</span><span style="color:#333333;">i</span><span style="color:#FFCC00;">e</span></div><div id="LT2"><span style="color:#FF0000;">T</span><span style="color:#333333;">ic</span><span style="color:#0000FF;">k</span><span style="color:#00CC00;">e</span><span style="color:#800080;">t</span></div><div id="LT3"><span style="color:#FF0000;">L</span><span style="color:#333333;">u</span><span style="color:#00CC00;">c</span><span style="color:#0000FF;">k</span><span style="color:#333333;">y </span></div><div id="LT4"><span style="color:#FF0000;">D</span><span style="color:#333333;">r</span><span style="color:#993333;">a</span><span style="color:#800080;">w</span></div><hr></div>';
                    var msg = LuckyTitle;
                    LuckyTitle = null;
                    msg += "<div id='LuckyPanel'><br><br><a> Your number:<font id='Luckyuserid'> " + storage.getItem("LDwho") + "</font></a>";

                    if (id == "2" || id == "3") {
                        //info[2] = "today's drawing for a movie ticket.";
                        msg += "<br><font style='font-weight:bold'>Cool!</font>You won " + info[2];
                    }
                    else {
                        msg += "<a>&nbsp;added for " + info[2] + "'s drawing.</a><br>";
                        msg += "<a>Please check winning numbers<br>after 5pm " + Tday + ".</a><br>";
                    }
                    msg += "<p id='Pticketimg'><img id='ticketimg' onclick='zoomself(this,1)' src = \"../images/LuckyDraw/" + storage.getItem("LDurl") + ".jpg\"><span id='winnerinfo'>" + (!!(id != "3" && info[3]) ? info[3] : "") + "</span></p>";
                    if (!info[4]) {
                        msg += "<div id='LDtip'></div><br>";
                    }
                    else {
                        msg += "<div id='LDtip'><font>Note:</font><br>" + info[4] + "</div><br>";
                    }
                    msg += '</div><font id="LuckyPW" onclick="showPW()">Previous Winners</font><div id="closelucky" class="close right" onclick="showdraw(null,1)"><span class="chahao">×</span></div><hr><span id="LDCR">Umap.ca ' + TDate + '</span><span id="LuckyTerms" onclick="showPW(1)">Terms</span>';
                    $("#coverbody1,#LDwindow").css("-webkit-transform", "scale(1)");
                    $("#LDwindow").html(msg);
                    $("#showsaved,#showshared,#showaccount,#showevents").css("width", "28%");
                    $("#showdraw").css({ "width": "16%", "height": "39px", "padding": "0px" });
                    //                    $("#coverbody1,#LDwindow").css("-webkit-transform", "scale(1)");
                    //                    $("#coverbody1,#LDwindow").show();
                    $("#LDwindow").css("-webkit-transform", "scale(1)");
                    //2.用于已经中奖,d但并没有填写信息
                    if (id == "2") {
                        $("#LDtip").html("We will mail this ticket to you,Please fill out your address<font style='padding: 10px;text-decoration: underline;color:blue;' onclick='LuckyInfo()'>here</font>.");
                    }
                    //3.用于已经中奖且有信息
                    if (id == "3") {
                        //debugger;
                        //info[3] = "David Cui<br>420Highway 7,Richmond Hill"
                        //info[4] = "0";
                        //                        if (info[4] == "0") {
                        $("#LDwindow").css("margin-top", "30px");
                        $("#LDtip").html("Your ticket will be sent out in 3 business days.<br>to:" + info[3] + "<br><br>Click<font style='padding: 10px;text-decoration: underline;color:blue;' onclick='LuckyInfo()'>here</font>if address is not correct.");
                        $("#LDtip").height(85);
                        //                        }
                        //                        else {
                        //                            $("#LDwindow").css("margin-top", "25px");
                        //                            $("#LDtip").html("Your ticket will be sent out in 3 business days.<br>to:" + info[3] + "<p>confirm</p>click<font style='padding: 10px;text-decoration: underline;color:blue;' onclick='LuckyInfo()'>here</font>if address is not correct.");
                        //                            $("#LDtip").height(100);
                        //                        }
                    }
                    //4.提交抽奖信息成功



                    //$("#LDtip").html(info0);
                    for (var i = 1; i < 5; i++) {
                        shake('LT' + i);
                    }

                    GoogleTouchEvent("LDwindow");
                    //flipimg();
                    return;
                    /* }
                    if (id == "2") {
                    //用于已经中奖,d但并没有填写信息
                    //debugger;
                    var Tinfo = info[2];
                    Tinfo = Tinfo.substr(0, Tinfo.length - 1);
                    if (Tinfo.indexOf(",") != -1) {
                    var Treg = /,/g;
                    var Tcount = Tinfo.match(Treg).length + 1;
                    info1 = "<font>Cool!</font> You won " + Tinfo + " draw for " + Tcount + " movie tickets.";
                    }
                    else {
                    info1 = "<font>Cool!</font> You won " + Tinfo + " draw for a movie ticket.";
                    }
                    //                    if (!document.getElementById("coverbody1")) {
                    //                        var LDwindow = '<div id="LDwindow"></div>';
                    //                        var coverbody1 = '<div id="coverbody1" onclick="showdraw(null,1)"></div>';
                    //                        $("body").append(coverbody1);
                    //                        $("body").append(LDwindow);
                    //                    }
                    //$("#Drawimg")[0].src = "../images/LuckyDraw/" + storage.getItem("LDurl") + ".jpg";
                    var msg = LuckyTitle;
                    msg += "<div id='LuckyPanel'><p> Lucky#: " + storage.getItem("LDwho") + "</p>";
                    msg += "<a>" + info1 + "</a>";
                    msg += "<p><img src = \"../images/LuckyDraw/" + storage.getItem("LDurl") + ".jpg\"></p>";
                    msg += "<a id='LDtip1'>We will mail this ticket to you,Please fill out your address <font style='padding: 10px;text-decoration: underline;' onclick='LuckyInfo()'> here </font>.</a><br>";


                    msg += '</div><span id="LDCR">' + TDate + ' Umap.ca Present</span><div id="closeluck" class="close right" onclick="showdraw(null,1)"><span class="chahao">×</span></div>';
                    $("#coverbody1,#LDwindow").css("-webkit-transform", "scale(1)");
                    $("#LDwindow").html(msg);
                    $("#showsaved,#showshared,#showaccount,#showevents").css("width", "28%");
                    $("#showdraw").css({ "width": "16%", "height": "39px", "padding": "0px" });
                    //                    $("#coverbody1,#LDwindow").css("-webkit-transform", "scale(1)");
                    //                    $("#coverbody1,#LDwindow").show();
                    $("#LDwindow").css("-webkit-transform", "scale(1)");

                    return;
                    }
                    if (id == "3") {
                    //用于已经中奖且有信息
                    //                    if (!document.getElementById("coverbody1")) {
                    //                        var LDwindow = '<div id="LDwindow"></div>';
                    //                        var coverbody1 = '<div id="coverbody1" onclick="showdraw(null,1)"></div>';
                    //                        $("body").append(coverbody1);
                    //                        $("body").append(LDwindow);
                    //                    }
                    var msg = "<div id='LuckyPanel'><p> Lucky#: " + storage.getItem("LDwho") + "</p>";
                    msg += "<a>Your ticket will be sent out in 3 business days.</a>";
                    msg += "<p><img src = \"../images/LuckyDraw/" + storage.getItem("LDurl") + ".jpg\"></p>";
                    msg += "<a id='LDtip1'>Played for next ticket.Check result after 5pm " + Tday + ".</a><br>";
                    msg += '</div><span id="LDCR">' + TDate + ' Umap.ca Present</span><div id="closeluck" class="close right" onclick="showdraw(null,1)"><span class="chahao">×</span></div>';
                    $("#coverbody1,#LDwindow").css("-webkit-transform", "scale(1)");
                    $("#LDwindow").html(msg);
                    $("#showsaved,#showshared,#showaccount,#showevents").css("width", "28%");
                    $("#showdraw").css({ "width": "16%", "height": "39px", "padding": "0px" });
                    //                    $("#coverbody1,#LDwindow").css("-webkit-transform", "scale(1)");
                    //                    $("#coverbody1,#LDwindow").show();
                    $("#LDwindow").css("-webkit-transform", "scale(1)");

                    return;
                    }
                    if (id == "4") {
                    //提交抽奖信息成功
                    // $("#showdraw")[0].onclick = Function("showdraw(2)");
                    //                    if (!document.getElementById("coverbody1")) {
                    //                        var LDwindow = '<div id="LDwindow"></div>';
                    //                        var coverbody1 = '<div id="coverbody1" onclick="showdraw(null,1)"></div>';
                    //                        $("body").append(coverbody1);
                    //                        $("body").append(LDwindow);
                    //                    }
                    $("#coverbody1,#LDwindow").show();
                    var msg = "<a> Your number: " + storage.getItem("LDwho") + "</a><br>";
                    msg += "<a>Played for next ticket.</a><br>";
                    msg += "<a>Check result after 5 pm " + Tday + ".</a><br>";
                    msg += "<p><img src = \"../images/LuckyDraw/" + storage.getItem("LDurl") + ".jpg\"></p>";
                    msg += "<a id='LDtip'></a><br>";
                    msg += '<span id="LDCR">' + TDate + ' Umap Present</span><div id="closetab1" class="close right" onclick="showdraw(null,1)"><span class="chahao">×</span></div>';
                    $("#coverbody1,#LDwindow").css("-webkit-transform", "scale(1)");
                    $("#LDwindow").html(msg);
                    $("#showsaved,#showshared,#showaccount,#showevents").css("width", "28%");
                    $("#showdraw").width("16%");
                    $("#LDwindow").css("-webkit-transform", "scale(1)");
                    return;*/
                }
            }
        });
    }
    else {
        //3.检查抽奖结果
        $.ajax({
            url: 'Handler/SearchInfo.ashx',
            type: 'POST',
            data: {
                LuckyDraw: Twho,
                step: 3  //1:拉取DB信息  2：点击获取,同时抽奖  3:检查抽奖结果
            },
            success: function (info) {
                if (!info) {
                    info = [2];
                    //info = info.split(";");
                    if (info[0] == "2") {
                        if (!document.getElementById("coverbody1")) {
                            var LDwindow = '<div id="LDwindow"></div>';
                            var coverbody1 = '<div id="coverbody1" onclick="showdraw(null,1)"></div>';
                            $("body").append(coverbody1);
                            $("body").append(LDwindow);
                        }
                        var msg = "<div id='LuckyPanel'><p> Lucky#: " + storage.getItem("LDwho") + "</p>";
                        msg += "<a>Your ticket will be sent out in 3 business days.</a>";
                        msg += "<p><img src = \"../images/LuckyDraw/" + storage.getItem("LDurl") + ".jpg\"></p>";
                        msg += "<a id='LDtip1'>Played for next ticket.Check result after 5pm " + Tday + ".</a><br>";
                        msg += '</div><span id="LDCR">' + TDate + ' Umap.ca Present</span><div id="closeluck" class="close right" onclick="showdraw(null,1)"><span class="chahao">×</span></div>';
                        $("#coverbody1,#LDwindow").css("-webkit-transform", "scale(1)");
                        $("#LDwindow").html(msg);
                        $("#showsaved,#showshared,#showaccount,#showevents").css("width", "28%");
                        $("#showdraw").css({ "width": "16%", "height": "39px", "padding": "0px" });
                        $("#coverbody1,#LDwindow").css("-webkit-transform", "scale(1)");
                        $("#coverbody1,#LDwindow").show();
                    }
                    else if (info[0] == "1") {
                        info[1] = "<font>Cool!</font> You won July 4th draw for a movie ticket.";
                        info[2] = "";
                        if (!document.getElementById("coverbody1")) {
                            var LDwindow = '<div id="LDwindow"></div>';
                            var coverbody1 = '<div id="coverbody1" onclick="showdraw(null,1)"></div>';
                            $("body").append(coverbody1);
                            $("body").append(LDwindow);
                        }
                        $("#Drawimg")[0].src = "../images/LuckyDraw/" + storage.getItem("LDurl") + ".jpg";
                        var msg = "<div id='LuckyPanel'><p> Lucky#: " + storage.getItem("LDwho") + "</p>";
                        msg += "<a>" + info[1] + "</a>";
                        msg += "<p><img src = \"../images/LuckyDraw/" + storage.getItem("LDurl") + ".jpg\"></p>";
                        msg += "<a id='LDtip1'>We will mail this ticket to you,Please fill out your address <font style='padding: 10px;text-decoration: underline;' onclick='LuckyInfo()'>here</font>.</a><br>";
                        msg += '</div><span id="LDCR">' + TDate + ' Umap.ca Present</span><div id="closeluck" class="close right" onclick="showdraw(null,1)"><span class="chahao">×</span></div>';
                        $("#coverbody1,#LDwindow").css("-webkit-transform", "scale(1)");
                        $("#LDwindow").html(msg);
                        $("#showsaved,#showshared,#showaccount,#showevents").css("width", "28%");
                        $("#showdraw").css({ "width": "16%", "height": "39px", "padding": "0px" });
                        $("#coverbody1,#LDwindow").css("-webkit-transform", "scale(1)");
                        $("#coverbody1,#LDwindow").show();
                    }
                    else if (info[0] == "0") {
                        info[1] = "Your previous play was not win.";
                        if (!document.getElementById("coverbody1")) {
                            var LDwindow = '<div id="LDwindow"></div>';
                            var coverbody1 = '<div id="coverbody1" onclick="showdraw(null,1)"></div>';
                            $("body").append(coverbody1);
                            $("body").append(LDwindow);
                        }
                        var msg = "<p> Your number: " + storage.getItem("LDwho") + "</p>";
                        msg += "<a>Played for next ticket.</a><br>";
                        msg += "<a>Check result after 5 pm " + Tday + ".</a><br>";
                        msg += "<p><img src = \"../images/LuckyDraw/" + storage.getItem("LDurl") + ".jpg\"></p>";
                        msg += "<a id='LDtip'></a><br>";
                        msg += '<span id="LDCR">' + TDate + ' Umap.ca Present</span><div id="closetab1" class="close right" onclick="showdraw(null,1)"><span class="chahao">×</span></div>';
                        $("#coverbody1,#LDwindow").css("-webkit-transform", "scale(1)");
                        $("#LDwindow").html(msg);
                        $("#showsaved,#showshared,#showaccount,#showevents").css("width", "28%");
                        $("#showdraw").css({ "width": "16%", "height": "39px", "padding": "0px" });
                        $("#coverbody1,#LDwindow").css("-webkit-transform", "scale(1)");
                        $("#coverbody1,#LDwindow").show();
                        $("#LDtip").html(id);
                    }
                }
            }
        });
    }
}
function showPW(x) {
    $("#ticketimg").css({ "width": "100px", "height": "60px" });
    $("#winnerinfo").width(147);
    sthInLuky = $("#LuckyPanel").html();
    //$("#LuckyPanel").html('<canvas id="canvas"></canvas>');
    $("#LuckyPanel").html('<div class="x-loading-spinner"><span class="x-loading-top"></span><span class="x-loading-right"></span><span class="x-loading-bottom"></span><span class="x-loading-left"></span></div>');
    $("#closelucky")[0].onclick = Function("LuckyInfo(1)");
    $("#LuckyPW,#LuckyTerms").hide();
    $("#LDwindow hr").css("margin-top", "7px");
    //var loadingObj = new loading(document.getElementById('canvas'), { radius: 8, circleLineWidth: 3 });
    //loadingObj.show();  
    if (!x) {
        //Previous Winners
        $.ajax({
            url: 'Handler/SearchInfo.ashx',
            type: 'POST',
            data: {
                pw: Twho
            },
            success: function (info) {
                //debugger;
                try {
                    //info = "true;July 23?1001082?123,qwe:July 24?100895?David Cui,Richmond Hill:July 25?1001120?";
                    //info = "true;July 18?101016?David Cui,Richmond Hill:July 18?101016?David Cui,Richmond Hill:July 18?101016?David Cui,Richmond Hill:July 18?101016?David Cui,Richmond Hill:July 18?101016?David Cui,Richmond Hill";
                    info = info.split(";");
                    if (info[0] == "true") {
                        //july 18,101016,David,Cui,Richmond Hill:
                        var Arrpw = info[1].split(":");
                        var Tinfo = "<div id='pwout'><div style=\"font-weight: bold;float: left;margin-top: 0px;\">Previous Winners</div>";
                        for (var i = 0; i < Arrpw.length; i++) {
                            Arrpw[i] = Arrpw[i].split("?");
                            Tinfo += "<div class='pwInfo0'><div class='pwDate'>" + Arrpw[i][0] + "</div><div class='pwId'>" + Arrpw[i][1] + "</div><div class='pwInfo'>" + Arrpw[i][2] + "</div></div>";
                        }
                        Tinfo += "</div>";
                        $("#LuckyPanel").html(Tinfo);
                        $("#LuckyPanel").css("margin-top", "35px !important");
                    }
                } catch (e) {

                }

            }
        });
    }
    else {
        //Terms
        //$("#LuckyPanel").height(145);
    }
}
var mt14451 = 0;
function zoomself(th, x) {
    //debugger;
    if (x) {
        mt14451 = $("#LDwindow").css("margin-top");
        $("#winnerinfo").width(50);
        $("#LDwindow").css("margin-top", "10px");
        $("#" + th.id).css({ "width": "195px", "height": "102px" });
        $("#" + th.id)[0].onclick = Function("zoomself(this)");
    }
    else {
        $("#LDwindow").css("margin-top", mt14451);
        $("#" + th.id).css({ "width": "100px", "height": "60px" });
        $("#winnerinfo").width(147);
        $("#" + th.id)[0].onclick = Function("zoomself(this,1)");
        //setTimeout('', 400);
    }
}
function shake(id) {
    var i = 1;
    setInterval(function () {
        i = (i == 1) ? -1 : 1;
        $("#" + id)[0].style.cssText = '-webkit-transform:rotate(' + i * 5 + 'deg);';
    }, 150);
}
function flipimg() {
    var x = 0;
    setInterval(function () {
        if (x == 0) {
            $("#ticketimg").css("-webkit-transform", "Scale(" + x + ")");
            x = 1;
        }
        else {
            $("#ticketimg").css("-webkit-transform", "Scale(" + x + ")");
            x = 0;
        }
        setTimeout(function () {
            if (x == 0) {
                $("#ticketimg").css("-webkit-transform", "Scale(" + x + ")");
                x = 1;
            }
            else {
                $("#ticketimg").css("-webkit-transform", "Scale(" + x + ")");
                x = 0;
            }
        }, 1000);
    }, 3000);

    return;
    try {
        var x = 0;
        var y = 1;
        var deg = 0;
        setInterval(function () {
            if (x == 0) {
                $("#ticketimg").css("-webkit-transform", "rotateY(" + (deg + 180) + "deg) Scale(" + x + ")");
                $("#ticketimg1").css("-webkit-transform", "rotateY(" + (deg + 360) + "deg) Scale(" + y + ")");
                x = 1;
                y = 0;
            }
            else {
                $("#ticketimg").css("-webkit-transform", "rotateY(" + (deg + 180) + "deg) Scale(" + x + ")");
                $("#ticketimg1").css("-webkit-transform", "rotateY(" + (deg + 360) + "deg) Scale(" + y + ")");
                x = 0;
                y = 1;
            }
            //            setTimeout(function () {
            //                if (x) {
            //                    //$("#ticketimg").css("opacity", "0");
            //                    //$("#ticketimg1").css("opacity", "1");
            //                    $("#ticketimg").css("-webkit-transform", "Scale(0)");
            //                    $("#ticketimg1").css("-webkit-transform", "Scale(1)");
            //                    x = false;
            //                }
            //                else {
            //                    $("#ticketimg").css("-webkit-transform", "Scale(1)");
            //                    $("#ticketimg1").css("-webkit-transform", "Scale(0)");
            //                    //$("#ticketimg").css("opacity", "1");
            //                    //$("#ticketimg1").css("opacity", "0");
            //                    x = true;
            //                }
            //            }, 500);
            deg += 180;
        }, 3000);
    } catch (e) {
        catche(e);
    }
}
var sthInLuky;
function LuckyInfo(x) {
    //debugger;
    $("#ticketimg").css({ "width": "100px", "height": "60px" });
    $("#winnerinfo").width(147);
    if (!!x) {
        $("#LuckyPanel").css("margin-top", "0px !important");
        $("#LuckyPW,#LuckyTerms").show();
        $("#LDwindow hr").css("margin-top", "1px");
        $("#LuckyPanel").html(sthInLuky);
        $("#closelucky")[0].onclick = Function("showdraw(null,1)");
    }
    else {
        sthInLuky = $("#LuckyPanel").html();
        var luckInfo = "<input placeholder='Name' id='LuckyName' onfocus='inputSwitch = true;' onblur='inputBlur()' ><br>";
        luckInfo += "<input placeholder='Email' id='LuckyEmail' onfocus='inputSwitch = true;' onblur='inputBlur()' ><br>";
        luckInfo += "<input placeholder='Address' id='LuckyAddress' onfocus='inputSwitch = true;' onblur='inputBlur()' ><br>";
        luckInfo += "<input placeholder='City' id='LuckyCity' onfocus='inputSwitch = true;' onblur='inputBlur()' >";
        luckInfo += "<input placeholder='ON'  id='LuckyPri' disabled='true'><br>";
        luckInfo += "<input placeholder='Postal code' id='LuckyPc' onfocus='inputSwitch = true;' onblur='inputBlur()' >";
        luckInfo += "<input type='button' value='Submit' id='Luckysubmit' onclick='LuckySubmit()' /><br><br><span id='litips'>&nbsp;</span>";
        $("#LuckyPanel").html(luckInfo);
        $("#closelucky")[0].onclick = Function("LuckyInfo(1)");
        $.ajax({
            url: 'Handler/SearchInfo.ashx',
            type: 'POST',
            data: {
                getLuckyUserInfo: who
            },
            success: function (info) {
                info = info.split(";");
                if (info[0] == "true") {
                    try {
                        i = 1;
                        $("#LuckyName").val(info[i] ? info[i] : ""); i++;
                        $("#LuckyEmail").val(info[i] ? info[i] : ""); i++;
                        $("#LuckyAddress").val(info[i] ? info[i] : ""); i++;
                        $("#LuckyCity").val(info[i] ? info[i] : ""); i++;
                        $("#LuckyPc").val(info[i] ? info[i] : ""); i++;
                        //$("#LuckyPri").val(info[i] ? info[i] : ""); i++;
                    } catch (e) {
                        alert(e);
                    }
                }

            }
        })
    }
}
//function loading(canvas, options) {
//    this.canvas = canvas;
//    if (options) {
//        this.radius = options.radius || 12;
//        this.circleLineWidth = options.circleLineWidth || 4;
//        this.circleColor = options.circleColor || 'lightgray';
//        this.dotColor = options.dotColor || 'gray';
//    } else {
//        this.radius = 12;
//        this.circelLineWidth = 4;
//        this.circleColor = 'lightgray';
//        this.dotColor = 'gray';
//    }
//}
//loading.prototype = {
//    show: function () {
//        var canvas = this.canvas;
//        if (!canvas.getContext) return;
//        if (canvas.__loading) return;
//        canvas.__loading = this;
//        var ctx = canvas.getContext('2d');
//        var radius = this.radius;
//        var rotators = [{ angle: 0, radius: 1.5 }, { angle: 3 / radius, radius: 2 }, { angle: 7 / radius, radius: 2.5 }, { angle: 12 / radius, radius: 3}];
//        var me = this;
//        canvas.loadingInterval = setInterval(function () {
//            ctx.clearRect(0, 0, canvas.width, canvas.height);
//            var lineWidth = me.circleLineWidth;
//            var center = { x: canvas.width / 2 - radius, y: canvas.height / 2 - radius };
//            ctx.beginPath();
//            ctx.lineWidth = lineWidth;
//            ctx.strokeStyle = me.circleColor;
//            ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
//            ctx.closePath();
//            ctx.stroke();
//            for (var i = 0; i < rotators.length; i++) {
//                var rotatorAngle = rotators[i].currentAngle || rotators[i].angle;
//                //在圆圈上面画小圆  
//                var rotatorCenter = { x: center.x - (radius) * Math.cos(rotatorAngle), y: center.y - (radius) * Math.sin(rotatorAngle) };
//                var rotatorRadius = rotators[i].radius;
//                ctx.beginPath();
//                ctx.fillStyle = me.dotColor;
//                ctx.arc(rotatorCenter.x, rotatorCenter.y, rotatorRadius, 0, Math.PI * 2);
//                ctx.closePath();
//                ctx.fill();
//                rotators[i].currentAngle = rotatorAngle + 4 / radius;
//            }
//        }, 50);
//    },
//    hide: function () {
//        var canvas = this.canvas;
//        canvas.__loading = false;
//        if (canvas.loadingInterval) {
//            window.clearInterval(canvas.loadingInterval);
//        }
//        var ctx = canvas.getContext('2d');
//        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
//    }
//}; 

var PCReg = /^([a-zA-Z][0-9][a-zA-Z])\s*([0-9][a-zA-Z][0-9])$/; // /[a-zA-Z0-9]{6,7}/;
function LuckySubmit() {
    //debugger;
    $("#litips").html("&nbsp;");
    $("#LuckyPanel input").css("color", "black");
    if (!$("#LuckyName").val()) {
        $("#LuckyName").css("color", "red");
        $("#litips").html("Wrong info in red, try again.");
        $("#LuckyName").focus();
        return;
    }
    if (!$("#LuckyEmail").val() || !(emailregs.test($("#LuckyEmail").val()))) {
        $("#LuckyEmail").css("color", "red");
        $("#litips").html("Wrong info in red, try again.");
        $("#LuckyEmail").focus();
        return;
    }
    if (!$("#LuckyAddress").val()) {
        $("#LuckyAddress").css("color", "red");
        $("#litips").html("Wrong info in red, try again.");
        $("#LuckyAddress").focus();
        return;
    }
    if (!$("#LuckyCity").val()) {
        $("#LuckyCity").css("color", "red");
        $("#litips").html("Wrong info in red, try again.");
        $("#LuckyCity").focus();
        return;
    }

    if (!$("#LuckyPc").val() || !PCReg.test($("#LuckyPc").val())) {
        $("#LuckyPc").css("color", "red");
        $("#litips").html("Wrong info in red, try again.");
        $("#LuckyPc").focus();
        return;
    }
    //4.提交中奖信息
    $.ajax({
        url: 'Handler/SearchInfo.ashx',
        type: 'POST',
        data: {
            LuckyDraw: Twho,
            name: $("#LuckyName").val(),
            email: $("#LuckyEmail").val(),
            address: $("#LuckyAddress").val(),
            city: $("#LuckyCity").val(),
            pc: $("#LuckyPc").val(),
            step: 4  //1:拉取DB信息  2：点击获取,同时抽奖  3:检查抽奖结果  4:提交中奖信息
        },
        success: function (info) {
            //debugger;
            if (!!info) {
                info = info.split(";");
                //info = ["true", "1", "0", "Today Winner:<br><font color='red'>101059</font><br>David Cui, Richmond Hill", "You checked in on July 13.<br>Winner is 100898, David Cui from Richmond Hill."]; //0-today, "3", "1"
                //      结果类型，id，抽哪天的奖（today/tomorrow）/哪天去检查（today、tomorrow）,中奖者简要信息,notes,
                //1.没中奖【默认】
                //2.用于已经中奖,d但并没有填写信息
                //3.用于已经中奖且有信息
                //4.提交抽奖信息成功
                id = info[1];
                //                if (info[1] == "0") {
                //                    info[1] = "today";
                //                }
                //                else {
                //                    info[1] = "tomorrow";
                //                }
                if (id != "2" && id != "3") {
                    if (info[2] == "0") {
                        info[2] = "today";
                    }
                    else {
                        info[2] = "yesterday";
                    }
                }
                var TDate = new Date;
                TDate = TDate.getFullYear() + "-" + (TDate.getMonth() + 1) + "-" + TDate.getDate();
                var Tday = info[2];
                if (info[0] != "true" || id == "0") {
                    $("#coverbody1,#LDwindow").css("-webkit-transform", "scale(0)");
                    $("#showdraw").width("10%");
                    $("#showsaved,#showshared,#showaccount,#showevents").css("width", "30%");
                    alert("sorry,Network connection error,please try again later!");
                    return;
                }
                var LuckyTitle = '<div id="LuckyTitle"><div id="LT1"><span style="color:#FF0000;">M</span><span style="color:#00CC00;">o</span><span style="color:#0000FF;">v</span><span style="color:#333333;">i</span><span style="color:#FFCC00;">e</span></div><div id="LT2"><span style="color:#FF0000;">T</span><span style="color:#333333;">ic</span><span style="color:#0000FF;">k</span><span style="color:#00CC00;">e</span><span style="color:#800080;">t</span></div><div id="LT3"><span style="color:#FF0000;">L</span><span style="color:#333333;">u</span><span style="color:#00CC00;">c</span><span style="color:#0000FF;">k</span><span style="color:#333333;">y </span></div><div id="LT4"><span style="color:#FF0000;">D</span><span style="color:#333333;">r</span><span style="color:#993333;">a</span><span style="color:#800080;">w</span></div><hr></div>';
                var msg = LuckyTitle;
                LuckyTitle = null;
                msg += "<div id='LuckyPanel'><br><br><a> Your number:<font id='Luckyuserid'> " + storage.getItem("LDwho") + "</font></a><br>";
                msg += "<font style='font-weight:bold'>Cool!</font>You won " + info[2];
                msg += "<p id='Pticketimg'><img id='ticketimg' onclick='zoomself(this,1)' src = \"../images/LuckyDraw/" + storage.getItem("LDurl") + ".jpg\"><span id='winnerinfo'>" + (!!(id != "3" && info[3]) ? info[3] : "") + "</span></p>";
                if (!info[4]) {
                    msg += "<div id='LDtip'></div><br>";
                }
                else {
                    msg += "<div id='LDtip'><font>Note:</font><br>" + info[4] + "</div><br>";
                }
                msg += '</div><font id="LuckyPW" onclick="showPW()">Previous Winners</font><div id="closelucky" class="close right" onclick="showdraw(null,1)"><span class="chahao">×</span></div><hr><span id="LDCR">Umap.ca ' + TDate + '</span><span id="LuckyTerms" onclick="showPW(1)">Terms</span>';
                $("#coverbody1,#LDwindow").css("-webkit-transform", "scale(1)");
                $("#LDwindow").html(msg);
                $("#showsaved,#showshared,#showaccount,#showevents").css("width", "28%");
                $("#showdraw").css({ "width": "16%", "height": "39px", "padding": "0px" });
                //                    $("#coverbody1,#LDwindow").css("-webkit-transform", "scale(1)");
                //                    $("#coverbody1,#LDwindow").show();
                $("#LDwindow").css("-webkit-transform", "scale(1)");
                if (id == "3") {
                    $("#LDwindow").css("margin-top", "30px");
                    $("#LDtip").html("Your ticket will be sent out in 3 business days.<br>to:" + info[3] + "<br>Click<font style='padding: 10px;text-decoration: underline;color:blue;' onclick='LuckyInfo()'>here</font>if address is not correct.");
                    $("#LDtip").height(85);

                }
                for (var i = 1; i < 5; i++) {
                    shake('LT' + i);
                }




                //                var Tday = "today";
                //                if (info == "1") {
                //                    Tday = "tomorrow";
                //                }
                //                var TDate = new Date;
                //                TDate = TDate.setFullYear() + "-" + (TDate.getMonth() + 1) + "-" + TDate.getDate();
                //                var msg = "<div id='LuckyPanel'><p> Lucky#: " + storage.getItem("LDwho") + "</p>";
                //                msg += "<a>Your ticket will be sent out in 3 business days.</a>";
                //                msg += "<p><img src = \"../images/LuckyDraw/" + storage.getItem("LDurl") + ".jpg\"></p>";
                //                msg += "<a id='LDtip1'>Played for next ticket.Check result after pm " + Tday + ".</a><br>";
                //                msg += '</div><span id="LDCR">' + TDate + ' Umap.ca Present</span><div id="closeluck" class="close right" onclick="showdraw(null,1)"><span class="chahao">×</span></div>';
                //                $("#coverbody1,#LDwindow").css("-webkit-transform", "scale(1)");
                //                $("#LDwindow").html(msg);
                //                $("#showsaved,#showshared,#showaccount,#showevents").css("width", "28%");
                //                $("#showdraw").css({ "width": "16%", "height": "39px", "padding": "0px" });
                //                $("#coverbody1,#LDwindow").css("-webkit-transform", "scale(1)");
                //                $("#coverbody1,#LDwindow").show();
            }
        }
    });
}
//#endregion


function hideself(th) {
    th.style.display = "none";
}
var OK15211 = false;
function showself(th, src) {
    //debugger;
    $("#SearchIcon").css({ "top": "379px", "left": "260px", "display": "block" });
    OK15211 = th;
    AddBGIMG();
    $("#coverbody").html("Loading ···");
    //src = '../images/S480/CATO09/CATO09-2011-4-1/DSC_0152.jpg';
    document.getElementById('imgbiz10').src = src;

    $("#coverbody").show();
    var left = th.getBoundingClientRect().left + document.body.scrollLeft;
    var top = th.getBoundingClientRect().top + document.body.scrollTop;
    //                $("#imgbiz10").css({ left: left, top: top });
    $("#imgbiz10").show();
    top = 53 + parseInt(document.body.scrollTop);
    //$("#imgbiz10").animate({ width: '310px', height: '250px', top: top, left: '5px' });
    $("#imgbiz10").css({ width: '310px', height: '250px', top: top, left: '5px' });

    //$("#imgbiz10").fadeIn();
    varbizimg = false;
    GoogleTouchEvent("coverbody");
    GoogleTouchEvent("imgbiz10");
}
function AddBGIMG() {
    if (!document.getElementById("coverbody")) {
        var timgbody = '<div id="_bizTime0" onclick="showBizImg(2)"></div>';
        var imgbiz10 = '<img id="imgbiz10" onclick="showBizImg(2)">';
        var coverbody = '<div id="coverbody" onclick="showBizImg(2)"></div>';
        $("#form1").append(coverbody);
        $("#form1").append(imgbiz10);
        $("#form1").append(timgbody);
    }
}

//debugger;
//var zqc0 = 0, zqc1 = 1, zqc2 = 2;
//clear('zqc0', 'zqc1', 'zqc2');
//function clear() {
//    try {
//        for (var i = 0; i < arguments.length; i++) {
//            //将每个参数进行累加
//            eval(arguments[i]) = null;
//        }
//    } catch (e) {

//    }
//}

/*
function RectSearch() {
//debugger;
try {
//详细页
showBizImg(2);
if (showDetails) {
bizToMap();
setTimeout(function () {
RectSearch();
}, 1000);
}
else if (hisw) {
click_back();
$("#keywords2").focus();
setTimeout(function () {
RectSearch();
}, 800);
}
else if (isshowevents) {
closesaved(null, null, 1);
$("#keywords2").focus();
setTimeout(function () {
//debugger;
$("#saved").show();
$("#saved").css('-webkit-transition-duration', "0");
$("#saved").css("-webkit-transform", "scale(1)");
}, 500);
}

} catch (e) {

}
$("#SearchIcon").hide();
$("#keywords2").val("");
$("#keywords2").focus();
}
*/
function RectSearch() {
    showBizImg(2);
    if (hisw) {
        click_back();
    }
    if (isshowevents) {
        closesaved(null, null, 1);
    }
    if (iPhoneOrientation == 0) {
        //$("#page1,#page2").attr("class", 'cuberight out');
        $("#page2").attr("class", 'cuberight out');
        //$("#page0").attr("class", 'cuberight in current');
    }
    else {
        //$("#page1,#page2").attr("class", 'cuberight1 out1');
        $("#page2").attr("class", 'cuberight1 out1');
        //$("#page0").attr("class", 'cuberight1 in1 current');
    }
    $("#page0").css("margin-left", "0px");
    $("#saved").show();
    $("#saved").css('-webkit-transition-duration', "0");
    $("#saved").css("-webkit-transform", "scale(1)");
    $("#SearchIcon").hide();
    $("#keywords2").val("");
    $("#keywords2").focus();
}

//#region                                                                               智能定位  
//默认每3秒动一次，第二次与前一次对比,没动位置，就自动跳为每10秒动一次。在10秒状态，如果后一次有动位置，就自动转为3秒状态。蓝点动时地图不要动
function IntelligentPositioner() {
    var T16119; //临时GPS
    //alert("进入定位");
    try {
        navigator.geolocation.getCurrentPosition(function (pos) {
            T16119 = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            //alert(T16119);
            var Tgps1 = newgps.lat() * 1000000;
            var Tgps2 = newgps.lng() * 1000000;
            var Tgps3 = pos.coords.latitude * 1000000;
            var Tgps4 = pos.coords.longitude * 1000000;
            if (Math.round(Tgps1) == Math.round(Tgps3) && Math.round(Tgps2) == Math.round(Tgps4)) {
                setTimeout(function () {
                    IntelligentPositioner();
                }, 10000);
            }
            else {
                newgps = T16119;
                newGPS = T16119;
                try {
                    clearMarkGPS();
                    if (markerGPS) {
                        try {
                            for (i in markerGPS) {
                                markerGPS[i].setMap(null);
                            }
                        } catch (e) { catche(e); }
                        markerGPS.length = 0;   //add
                    }
                } catch (e) { }
                gpsMaker = new google.maps.Marker({
                    position: newGPS,
                    icon: gpsicon,
                    map: map
                });
                addClicktoMarker(gpsMaker, newGPS);
                markerGPS.push(gpsMaker);

                setTimeout(function () {
                    IntelligentPositioner();
                }, 3000);
            }


        });

    } catch (e) {
        catche(e);
    }
}


//#endregion

//setTimeout(function () { alert(16131); IntelligentPositioner(); }, 18000);


//-------------------------------------wang--05-------------------------------------------
var googleArr = new Array();    //存储google数据对象的数组。
var isGoogleDate = "01";  //是否显示google数据  00表示等待时间过长，不显示,  02 显示。
var localSearch = "";
var localArr = new Array();    //存储本地数据对象的数组。
//var googleDateWaitTimes = 0;  //google数据 等待次数
var localDateInfo = "";
var localgpslat = "";
var localgpslng = "";
var kwSearchGoogle = "";
var GpsSearchLatLng = ""; //记录红旗的位置

//google + local 都没有查询到数据
function NotData() {

    var listText = "&nbsp;&nbsp;Sorry, no location found for<br>&nbsp;&nbsp; '" + keywords + "' <br></p><div><div id=\"list-mp\">Go Back</div><div id=\"list-top\"><a>▲ </a>Top</div><div id=\"list-re\"><img src=\"images/write.gif\"></div><div id=\"list-clear\"></div></div>";
    $("#listin").html(listText);
    setTimeout('toTop();MapLock(1)', 1000);
    setTimeout('toTop();MapLock(1)', 1000);
    //            setTimeout(function () {
    //                myScrolllist.destroy();
    //                myScrolllist = null;
    //                //myScrolllist = new iScroll('container', { vScrollbar: false });
    //                //myScrolllist.scrollTo(0, 0, 0);
    //            }, 0);
    setTimeout(function () {
        myScrolllist = new iScroll('container', { vScrollbar: false });
        myScrolllist.scrollTo(0, 0, 0);
    }, 100);

    //$('#list').touchScroll();
    //$('#list').touchScroll('update');

    SystemBuy = [false, 'listgroup'];
}

function NotShowGoogleDate() {
    //debugger;
    if (isGoogleDate == "02") {
        isGoogleDate = "01"; //中立
    } else {
        isGoogleDate = "00";
    }
    if (isGoogleDate == "00") {  //不显示google 数据
        //isGoogleDate = true;
        $("#_coverDiv3").html("<center>Marking ...<center>");
        clearInterval(sisearchSecondFun);
        //debugger;
        //tsi = false;
        ////debugger;
        $("#cover").show();
        CoverTouch();
        try {
            clearTimeout(si1804);
            clearInterval(sisearchSecondFun);
            clearInterval(sivar[1]);
            killwatchGPS();
            clearTimeout(stsia);
            SystemBuy = [true, 'listgroup'];
        } catch (e) {
            catche(e);
        }
        researching = false;
        isSearching = false;
        $("#inMapMsg,#cmm").hide();
        GSearch = false;
        if (!$("#container").hasClass("container")) {
            $("#container").attr("class", "container");
        }
        var googleDateValue = googleandlocal(localDateInfo, localgpslat, localgpslng);
        if (googleDateValue == "") {
            NotData();
            return;
        }
        listPool = googleDateValue.split("￥￥￥￥￥");

        listNum = parseInt(listPool.length - 1);
        listNum = listNum > 0 ? listNum : 1;
        var Ttext = "<div id='listin'>"; //<div id='list'>
        Ttext += listPool[0] + "<div id=\"LISTPP0\" onclick=\"LISTNP(1,0)\">Pre Page</div><div id=\"LISTNP0\" onclick=\"LISTNP(2,0)\">Next Page</div><div id='Glogo'><img src=\"images/GLogo.png\"></div><div><div id='list-mp'>Go Back</div><div id='list-top'><a>▲ </a>Top</div><div id=\"list-re\"><img src=\"images/write.gif\"></div><div id=\"list-clear\"></div></div>";
        Ttext += "</div>" + listPool[listPool.length - 1]; //</div>
        TserEvent = false;
        $("#container").html(Ttext);
        //$("#container").css("overflow", "hidden");
        //$("#container").height(160);
        $("#page1").height(416);
        if (listNum == 1) {
            $("#LISTNP0").hide();
        }
        googleArr = new Array();    //存储google数据对象的数组。
        //localSearch;
        localArr = new Array();     //存储本地数据对象的数组。
        //googleDateWaitTimes = 0;  //google数据 等待次数
        localDateInfo = "";
        localgpslat = "";
        localgpslng = "";
        //debugger;
        clickSearching = false;
    }
}
//获取google 数据，并对象形式存储 数组中。
function searchComplete() {
    //debugger;
    if (isGoogleDate == "00") {
        isGoogleDate = "01";
    } else {
        isGoogleDate = "02";
    }
    if (isGoogleDate == "02") {
        // Check that we got results
        //document.getElementById('content').innerHTML = '';
        //debugger;
        $("#_coverDiv3").html("<center>Marking ...<center>");
        clearInterval(sisearchSecondFun);
        //debugger;
        //tsi = false;
        ////debugger;
        $("#cover").show();
        CoverTouch();
        try {
            clearTimeout(si1804);
            clearInterval(sisearchSecondFun);
            clearInterval(sivar[1]);
            killwatchGPS();
            clearTimeout(stsia);
            SystemBuy = [true, 'listgroup'];
        } catch (e) {
            catche(e);
        }
        researching = false;
        isSearching = false;
        $("#inMapMsg,#cmm").hide();
        GSearch = false;
        //debugger;
        //                try {
        //                    if ($("#container1").length == "1") {
        //                        $("#container1")[0].id = "container";
        //                    }

        //                } catch (e) {

        //                }
        if (!$("#container").hasClass("container")) {
            $("#container").attr("class", "container");
        }

        //debugger;
        if (localDateInfo == "" && localSearch.results.length == 0) {
            NotData(); return;
        }

        var dis = "";
        var disRed = "";
        var SearchrLatLng = GpsSearchLatLng.replace("(", "").replace(")", "").split(",");  //红旗位置
        if (localSearch.results && localSearch.results.length > 0) {
            for (var i = 0; i < localSearch.results.length; i++) {
                var results = this.localSearch.results[i];
                var googleData = new Object();  //google  数据对象
                googleData.lat = results.lat;
                googleData.lng = results.lng;
                googleData.address = results.streetAddress;
                googleData.name = results.titleNoFormatting;
                dis = Distance(results.lng, results.lat, localgpslng, localgpslat); //距离蓝底 坐标距离
                googleData.dis = dis;
                disRed = Distance(results.lng, results.lat, SearchrLatLng[1], SearchrLatLng[0]); //距离红旗
                googleData.disRed = disRed;
                if (!!results.addressLines) {
                    if (results.addressLines.length >= 2) {
                        googleData.address2 = results.addressLines[1];
                    } else {
                        googleData.address2 = "";
                    }
                } else {
                    googleData.address2 = "";
                }
                if (!!results.phoneNumbers) {
                    googleData.phone = results.phoneNumbers[0].number;
                    if (results.phoneNumbers.length >= 2) {
                        googleData.phone2 = results.phoneNumbers[1].number;
                    } else {
                        googleData.phone2 = "";
                    }
                } else {
                    googleData.phone = "";
                    googleData.phone2 = "";
                }
                googleArr[i] = googleData;

            }
        }
        var googleDateValue = googleandlocal(localDateInfo, localgpslat, localgpslng);
        //debugger;
        if (googleDateValue == "") {
            NotData();
            return;
        }
        listPool = googleDateValue.split("￥￥￥￥￥");

        listNum = parseInt(listPool.length - 1);
        listNum = listNum > 0 ? listNum : 1;
        var Ttext = "<div id='listin'>"; //<div id='list'>
        Ttext += listPool[0] + "<div id=\"LISTPP0\" onclick=\"LISTNP(1,0)\">Pre Page</div><div id=\"LISTNP0\" onclick=\"LISTNP(2,0)\">Next Page</div><div id='Glogo'><img src=\"images/GLogo.png\"></div><div><div id='list-mp'>Go Back</div><div id='list-top'><a>▲ </a>Top</div><div id=\"list-re\"><img src=\"images/write.gif\"></div><div id=\"list-clear\"></div></div>";
        Ttext += "</div>" + listPool[listPool.length - 1]; //</div>
        TserEvent = false;
        $("#container").html(Ttext);
        //$("#container").css("overflow", "hidden");
        //$("#container").height(160);
        $("#page1").height(416);
        if (listNum == 1) {
            $("#LISTNP0").hide();
        }
        googleArr = new Array();    //存储google数据对象的数组。
        //localSearch;
        localArr = new Array();     //存储本地数据对象的数组。
        //googleDateWaitTimes = 0;  //google数据 等待次数
        localDateInfo = "";
        localgpslat = "";
        localgpslng = "";
        //debugger;
        clickSearching = false;
        //将数据传入数据库

    }
}
//本地数据和google数据整合
function googleandlocal(a, gpslat, gpslng) {
    //debugger;

    //googleDateWaitTimes = 0; //google 数据等待次数清零
    googleDataTable(googleArr, gpslat, gpslng); //google 数据
    if (a != "") {
        localDataTable(a, gpslat, gpslng);  //本地数据
    }
    //debugger;

    var newTable = "";
    var latlng0 = "";
    var number0 = "";
    var biz0 = "";
    var latlng1 = "";
    var number1 = "";
    var biz1 = "";
    var latlng2 = "";
    var number2 = "";
    var biz2 = "";
    var table = "";
    var googleArrLength = googleArr.length;
    //googleArrLength = 0;
    var localArrLength = localArr.length;
    var sumI = 0;
    var googlecount = 0;
    var localLatLng = "";
    var localDataMin = 0;  // 最小距离 local
    var localDataTemp = 0; //临时存储 距离
    if (a != "") {
        localLatLng = localArr[0].latlng.split(",");
        var SearchrLatLng = GpsSearchLatLng.replace("(", "").replace(")", "").split(",");
        localDataMin = Distance(localLatLng[1], localLatLng[0], SearchrLatLng[1], SearchrLatLng[0]) * 1000;
        localArr[0].disRed = localDataMin;
        for (var i = 1; i < localArrLength; i++) {
            localLatLng = localArr[i].latlng.split(",");
            localDataTemp = Distance(localLatLng[1], localLatLng[0], SearchrLatLng[1], SearchrLatLng[0]) * 1000;
            localArr[i].disRed = localDataTemp;
            if (localDataMin > localDataTemp) {
                localDataMin = localDataTemp;
            }
        }
    }

    //    for (var i = 0; i < googleArrLength; i++) {
    //        if (a == "") {
    //            table = googleArr[i].table.replace(new RegExp("Ggle0", "gm"), String(i)).replace(new RegExp("Ggle1", "gm"), String(i + 1));
    //            newTable += table;
    //            if (i == googleArrLength - 1) {
    //                newTable += "￥￥￥￥￥";
    //            }
    //            if (i == 0) {
    //                latlng0 += googleArr[i].lat + "," + googleArr[i].lng;
    //                number0 += "" + (parseInt(i) + 1);
    //                biz0 += "biz";
    //            } else {
    //                latlng0 += ";" + googleArr[i].lat + "," + googleArr[i].lng;
    //                number0 += "," + (parseInt(i) + 1);
    //                biz0 += ",biz";
    //            }
    //            sumI++;
    //            googlecount++;
    //        }
    //        else {
    //            if ((googleArr[i].dis * 1000) <= localDataMin) {
    //                table = googleArr[i].table.replace(new RegExp("Ggle0", "gm"), String(i)).replace(new RegExp("Ggle1", "gm"), String(i + 1));
    //                newTable += table;
    //                if (i == 0) {
    //                    latlng0 += googleArr[i].lat + "," + googleArr[i].lng;
    //                    number0 += "" + (parseInt(i) + 1);
    //                    biz0 += "biz";
    //                } else {
    //                    latlng0 += ";" + googleArr[i].lat + "," + googleArr[i].lng;
    //                    number0 += "," + (parseInt(i) + 1);
    //                    biz0 += ",biz";
    //                }
    //                sumI++;
    //                googlecount++;
    //            }
    //        }
    //    }

    //    var SpecialGoogleData = new Array();
    //    var SpecialGoogleBoll = false;
    //    SpecialGoogleData = ["restaurant", "coffee", "cafe", "bank", "pub", "bar", "salon", "apparel", "convenience store"];
    //    for (var i = 0; i < SpecialGoogleData.length - 1; i++)
    //    {
    //        if (kwSearchGoogle.toLocaleLowerCase() == SpecialGoogleData[i]) {
    //            SpecialGoogleBoll = true;
    //            break;
    //        }
    //    } `
    var googleDataTran = "";
    //合并 google数据和本地数据 到一个数组中。 localArr 数组中
    for (var i = 0; i < googleArrLength; i++) {
        if ((googleArr[i].disRed * 1000) <= localDataMin || a == "") {
            var googleInfoBool = true;
            for (var j = 0; j < localArrLength; j++) {
                if (localArr[j].phone.replace("-", " ").replace("-", " ") == googleArr[i].phone.replace("(", "").replace(")", "").replace("-", " ")) {
                    googleInfoBool = false;
                    break;
                    if (localArr[j].name.toLocaleLowerCase() == googleArr[i].name.toLocaleLowerCase()) {
                        var localAddress = localArr[j].address.split(" ");
                        var googleAddress = googleArr[i].address.split(" ");
                        if (localAddress[0].toLocaleLowerCase() == googleAddress[0].toLocaleLowerCase() && localAddress[1].toLocaleLowerCase() == googleAddress[1].toLocaleLowerCase()) {
                            googleInfoBool = false;
                            break;
                        }
                    }
                }

            }
            if (googleInfoBool && googleArr[i].dis < 200) {
                var localData = new Object();    //google  数据对象
                localData.table = googleArr[i].table;
                localData.dis = googleArr[i].dis;
                localData.disRed = googleArr[i].disRed;
                localData.latlng = googleArr[i].lat + "," + googleArr[i].lng;
                localArr[localArrLength + googlecount] = localData;
                googlecount++;
                //if (isInrange) {  //只是记录 在范围内的数据。
                googleDataTran += googleArr[i].name + ":;" + googleArr[i].address + ":;" + googleArr[i].phone + ":;" + googleArr[i].phone2 + ":;" + googleArr[i].lat + ":;" + googleArr[i].lng + ":;" + googleArr[i].address2 + ":;" + kwSearchGoogle + ":;" + GpsSearchLatLng + "￥;";
                //}
            }
        }
    }

    //排序
    localArr = localGoogleDataSort(localArr);


    var LGlength = localArr.length;
    if (LGlength > 30) {
        LGlength = 30;
    }
    var k = 0;
    var recordLatLng = "";
    for (var i = 0; i < LGlength; i++) {
        if (i == 0) {
            k += 1;
            recordLatLng = localArr[i].latlng;
        } else {
            if (localArr[i].latlng != recordLatLng) {
                recordLatLng = localArr[i].latlng;
                k += 1;
            }
        }
        table = localArr[i].table.replace(new RegExp("Ggle0", "gm"), String(i)).replace(new RegExp("Ggle1", "gm"), String(k));
        newTable += table;

        if (i == 9 || i == 19 || i == 29) {
            newTable += "￥￥￥￥￥";
        }
        else if (i == (LGlength - 1)) {
            newTable += "￥￥￥￥￥";
            // break;
        }

        if (i < 10) {
            if (i == 0) {
                latlng0 += "" + localArr[i].latlng;
                number0 += "" + k;
                biz0 += "biz";
            } else {
                latlng0 += ";" + localArr[i].latlng;
                number0 += "," + k;
                biz0 += ",biz";
            }
        } else if (i >= 10 && i < 20) {
            if (i == 10) {
                latlng1 += "" + localArr[i].latlng;
                number1 += "" + k;
                biz1 += "biz";
            } else {
                latlng1 += ";" + localArr[i].latlng;
                number1 += "," + k;
                biz1 += ",biz";
            }
        } else if (i >= 20) {
            if (i == 20) {
                latlng2 += "" + localArr[i].latlng;
                number2 += "" + k;
                biz2 += "biz";
            } else {
                latlng2 += ";" + localArr[i].latlng;
                number2 += "," + k;
                biz2 += ",biz";
            }
        }
    }

    var divtt0 = "<div id='tt0' style='display:none'>[(" + latlng0 + ")](#" + LGlength + "#)[[" + number0 + "]][#" + biz0 + "#][-" + gpslat + "-][+-" + gpslng + "+]</div>";
    var divtt1 = "";
    var divtt2 = "";
    if (biz1 != "") {
        divtt1 = "<div id='tt1' style='display:none'>[(" + latlng1 + ")](#" + LGlength + "#)[[" + number1 + "]][#" + biz1 + "#][-" + gpslat + "-][+-" + gpslng + "+]</div>";
    }
    if (biz2 != "") {
        divtt2 = "<div id='tt2' style='display:none'>[(" + latlng2 + ")](#" + LGlength + "#)[[" + number2 + "]][#" + biz2 + "#][-" + gpslat + "-][+-" + gpslng + "+]</div>";
    }
    var divlistGroup = "<script type=\"text/javascript\">listgroup();</script>";
    //debugger;
    if (newTable != "") {
        newTable += divtt0 + divtt1 + divtt2 + divlistGroup;
    }

    if (googleDataTran != "") {
        $.ajax({
            url: 'Handler/SearchInfo.ashx',
            type: 'POST',
            data: {
                googleDate: googleDataTran
            },
            timeout: 30000,
            success: function () { }
        });
    }
    googleDataTran = "";


    return newTable;

}
//合并表格 Google Date  And Local Date
function mergerTable(gpslat, gpslng) {
    var unitInfo = "";
    var allkw_latlng1 = "";
    var strnumber1 = "";
    var type1 = "";
    var unitcount = googleArr.length;
    if (googleArr.length > 0) {
        for (var i = 0; i < googleArr.length; i++) {
            var googleData = new Object();   //google  数据对象
            googleData = googleArr[i];
            //debugger;
            unitInfo += googleData.table;
            var aa = "ss";
            aa = aa.replace("ss", String(i));
            //            String.prototype.replaceAll = function (s1, s2) {
            //                return this.replace(new RegExp(s1, "gm"), s2);
            //            }
            unitInfo = unitInfo.replace(new RegExp("Ggle0", "gm"), String(i)).replace(new RegExp("Ggle1", "gm"), String(i + 1));

            if (i == 9 || i == 19 || i == 19 || i == googleArr.length - 1) {
                unitInfo += "￥￥￥￥￥";
            }
            if (i != 0) {
                allkw_latlng1 += ";" + googleData.lat + "," + googleData.lng;
                strnumber1 += "," + String(i + 1);
                type1 += ",biz";
            } else {
                allkw_latlng1 += googleData.lat + "," + googleData.lng;
                strnumber1 += String(i + 1);
                type1 += "biz";
            }
        }
        unitInfo += "<div id='tt0' style='display:none'>[(" + allkw_latlng1 + ")](#" + unitcount + "#)[[" + strnumber1 + "]][#" + type1 + "#][-" + gpslat + "-][+-" + gpslng + "+]</div>";
        unitInfo += "<script type=\"text/javascript\">listgroup();</script>";
    }
    return unitInfo;
}
//本地数据
function localDataTable(a, gpslat, gpslng) {
    //debugger;
    try {

        var newdata = a.split("￥￥￥￥￥");
        var temp = 0;
        for (var i = 0; i < newdata.length - 1; i++) {
            var newdata2 = newdata[i].split("</table>");
            var latlng = newdata[newdata.length - 1].split("<div")[i + 1].split("[(")[1].split(")]")[0].split(";");
            var number = newdata[newdata.length - 1].split("<div")[i + 1].split("[[")[1].split("]]")[0].split(",");
            for (var j = 0; j < newdata2.length - 1; j++) {
                var localData = new Object();   //google  数据对象
                localData.table = newdata2[j] + "</table>";

                //截取出 名字 和 地址 和电话
                var Info = newdata2[j].split("<a")[1].split("click_details(")[1].split(")\"")[0].split(",");
                localData.name = Info[1].replace("'", "").replace("'", "").replace("#38#", "'").replace("#39#", ",");
                localData.phone = Info[3].replace("'", "").replace("'", "");
                localData.address = Info[2].replace("'", "").replace("'", "").replace("#38#", "'").replace("#39#", ",");

                var localLatLng = latlng[j].replace("(", "").replace(")", "").split(",");
                localData.dis = Distance(localLatLng[1], localLatLng[0], gpslng, gpslat);
                localData.latlng = latlng[j];
                localData.number = number[j];
                localArr[temp++] = localData;
            }
        }
    } catch (e) {
        catche(e);
    }
}
//googleData 排序
function googleDataSort(googleArr, lat, lng) {
    var temp = new Object();
    //debugger;
    var dis1 = 0;
    var dis2 = 0;
    //    if (googleArr.length == 1) {
    //        var googleData = new Object();   //google  数据对象
    //        googleData = googleArr[0];
    //        var lat1 = googleData.lat;
    //        var lng1 = googleData.lng;
    //        dis1 = Distance(lat1, lng1, lat, lng);
    //        googleData.dis = dis1;
    //        googleArr[0] = googleData;
    //    }
    for (var i = 0; i < googleArr.length - 1; i++) {
        var googleData = new Object();   //google  数据对象
        googleData = googleArr[i];
        var lat1 = googleData.lat;
        var lng1 = googleData.lng;
        //        dis1 = Distance(lat1, lng1, lat, lng);
        //        googleData.dis = dis1;
        //        googleArr[i] = googleData;
        dis1 = googleArr[i].dis;
        for (var j = i + 1; j < googleArr.length; j++) {
            var googleData2 = new Object();   //google  数据对象
            googleData2 = googleArr[j];
            var lat2 = googleData2.lat;
            var lng2 = googleData2.lng;

            //            if (i == 0) {
            //                dis2 = Distance(lat2, lng2, lat, lng);
            //                googleData2.dis = dis2;
            //                googleArr[j] = googleData2;
            //            } else {
            dis2 = googleData2.dis;
            //            }
            if (dis1 * 10000 > dis2 * 10000) {

                temp = googleArr[i];
                googleArr[i] = googleArr[j];
                googleArr[j] = temp;
            }
            dis1 = googleArr[i].dis;
        }

    }
}
//本地数据+google数据综合后的排序函数 有小到大
function localGoogleDataSort(localArr) {
    var temp = new Object();
    //debugger;
    var dis1 = 0;
    var dis2 = 0;
    var localArrTemp10 = new Array();    //存储本地数据对象的数组。
    var localArrTemp20 = new Array();    //存储本地数据对象的数组。
    var localArrTemp30 = new Array();    //存储本地数据对象的数组。
    for (var i = 0; i < localArr.length; i++) {
        if (i != localArr.length - 1) {
            dis1 = localArr[i].disRed;
            for (var j = i + 1; j < localArr.length; j++) {

                dis2 = localArr[j].disRed;

                if (dis1 * 10000 > dis2 * 10000) {

                    temp = localArr[i];
                    localArr[i] = localArr[j];
                    localArr[j] = temp;
                }
                dis1 = localArr[i].disRed;
            }
        }
        if (i < 10) {
            localArrTemp10[i] = localArr[i];
        } else if (i >= 10 && i < 20) {
            localArrTemp20[i - 10] = localArr[i];
        } else if (i >= 20 && i < 30) {
            localArrTemp30[i - 20] = localArr[i];
        }
    }
    localArr = new Array();
    var sum = 0;
    //localArrTemp10 按照蓝点 距离排序
    for (var i = 0; i < localArrTemp10.length; i++) {
        if (i != localArrTemp10.length - 1) {
            dis1 = localArrTemp10[i].dis;
            for (var j = i + 1; j < localArrTemp10.length; j++) {
                dis2 = localArrTemp10[j].dis;

                if (dis1 * 10000 > dis2 * 10000) {

                    temp = localArrTemp10[i];
                    localArrTemp10[i] = localArrTemp10[j];
                    localArrTemp10[j] = temp;
                }
                dis1 = localArrTemp10[i].dis;
            }
        }
        localArr[sum++] = localArrTemp10[i];
    }

    //localArrTemp20 按照蓝点 距离排序
    for (var i = 0; i < localArrTemp20.length; i++) {
        if (i != localArrTemp20.length - 1) {
            dis1 = localArrTemp20[i].dis;
            for (var j = i + 1; j < localArrTemp20.length; j++) {
                dis2 = localArrTemp20[j].dis;

                if (dis1 * 10000 > dis2 * 10000) {

                    temp = localArrTemp20[i];
                    localArrTemp20[i] = localArrTemp20[j];
                    localArrTemp20[j] = temp;
                }
                dis1 = localArrTemp20[i].dis;
            }
        }
        localArr[sum++] = localArrTemp20[i];
    }
    //localArrTemp30 按照蓝点 距离排序
    for (var i = 0; i < localArrTemp30.length - 1; i++) {
        if (i != localArrTemp30.length - 1) {
            dis1 = localArrTemp30[i].dis;
            for (var j = i + 1; j < localArrTemp30.length; j++) {
                dis2 = localArrTemp30[j].dis;

                if (dis1 * 10000 > dis2 * 10000) {

                    temp = localArrTemp30[i];
                    localArrTemp30[i] = localArrTemp30[j];
                    localArrTemp30[j] = temp;
                }
                dis1 = localArrTemp30[i].dis;
            }
        }
        localArr[sum++] = localArrTemp30[i];
    }

    return localArr;
}

//googleData 变成我们需要的表格
function googleDataTable(googleArr, gpslat, gpslng) {
    //debugger;

    //googleDataSort(googleArr, gpslat, gpslng);

    for (var i = 0; i < googleArr.length; i++) {
        var googleData = new Object();   //google  数据对象
        googleData = googleArr[i];
        var lat = googleData.lat;
        var lng = googleData.lng;
        var dis = googleData.dis;
        var add = googleData.address;
        var addnew = "";
        //debugger;
        if (add.length > 20) {
            addnew = add.substring(0, 20) + "..."
        } else {
            addnew = add;
        }
        var name = googleData.name;
        var namenew = "";
        if (name.length > 20) {
            namenew = name.substring(0, 20) + "..."
        } else {
            namenew = name;
        }
        var phone = googleData.phone;
        var strdis = "";
        var disnew;
        var googleTable = "";
        if (dis < 1) {
            disnew = dis * 1000;
            strdis = Math.round(disnew) + "m";
        } else {
            disnew = Math.round(dis * 100) / 100;
            strdis = disnew + "km";
        }
        googleTable += " <table";
        //googleTable += "style='background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0) 0px, rgba(255, 255, 255, 0.496094) 50px);'";
        googleTable += " cellpadding=\"0\" cellspacing=\"3\" onclick=\"dis(event);cc3(this)\">";
        googleTable += "<tbody><tr> <td rowspan=\"2\" class=\"td_cate\" align='center' valign='middle' onclick=\"cc(this);"
        googleTable += "centerwithGPS('" + lat + "','" + lng + "','" + ("Ggle1") + "','','','','','',true," + ("Ggle0") + ",true,'1')\" align=\"center\" valign=\"middle\">";
        googleTable += "<div class=\"bizListIcon\">" + ("Ggle1") + "</div> </td> <td colspan=\"1\" class=\"unit_info\" style=\"line-height:17px;width:90%' \" valign='top'><a "


        var details = "'','" + name.replace("&#39;", "#39#").replace("'", "#39#") + "','" + add.replace("&#39;", "#39#").replace("'", "#39#") + "','" + phone + "','','','','','','','Ggle1','" + lat + "','" + lng + "','',this,'Ggle0','" + strdis + "',''";

        googleTable += "class=\"unit_name\" href='javascript:;' onclick=\"click_details(" + details + ")\" >" + namenew + "</a>";
        //googleTable += "<br> <a class=\"unit_phone\" onclick=\"fourstep(" + lat + "," + lng + "," + ("Ggle1") + "," + ("Ggle0") + ")\"></a>";
        googleTable += "</td><td class='unit_phone' align='center' valign='middle' rowspan='2'> <font onclick=\"cc(this,3);fourstep(" + lat + "," + lng + "," + ("Ggle1") + "," + ("Ggle0") + ")\" style=\"font-size: 15px;\">" + strdis + "</font></td></tr><tr> <td width='73%'> ";
        googleTable += "<span class=\"unit_info\">" + addnew + "</span></td></tr></tbody></table>";
        googleData.table = googleTable;
        googleArr[i] = googleData;
    }

}

function onLoad(gpslatlng, kw) {
    // Create a LocalSearch instance.
    //debugger;
    if (localSearch == "") {
        localSearch = new google.search.LocalSearch();
    }
    kwSearchGoogle = kw;
    // Set the Local Search center point
    localSearch.setCenterPoint(gpslatlng);
    //new google.maps.LatLng(43.7669601, -79.3380954);
    localSearch.setResultSetSize(google.search.Search.LARGE_RESULTSET);
    // Set searchComplete as the callback function when a search is complete. The
    // localSearch object will have results in it.
    localSearch.setSearchCompleteCallback(this, searchComplete);

    // Specify search quer(ies)
    localSearch.execute(kw);


}
//计算距离
function Distance(aa1, bb1, aa2, bb2) {
    var R = 6378.137;
    aa1 = (Math.PI / 180) * aa1;
    aa2 = (Math.PI / 180) * aa2;
    bb1 = (Math.PI / 180) * bb1;
    bb2 = (Math.PI / 180) * bb2;
    var D = R * Math.acos(Math.cos(bb1) * Math.cos(bb2) * Math.cos(aa1 - aa2) + Math.sin(bb1) * Math.sin(bb2));
    return D;
}
//---------------------------------------------------------------------------------------------------------