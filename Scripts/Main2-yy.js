//Made by qczhang
//2012.02.28
//使用JSEnhancements.vsix 插件可以很方便的折叠js代码，便于开发【//#region //#endregion】
//#38#[,]
//#39#[']
//#37#["]
//核心版本控制
//if (!storage.getItem("coreVersion")) {
//    storage.setItem("coreVersion", 4);
//}cube版
$("#cpright").html(' Copyright © 2012, Bizmap.ca, Beta 1.114');
var closeLR = "L"; //L:Left,  R:Right   [删除键在左边还是右边还是两边]
//debugger;
if (storage && storage.getItem("config")) {
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
var who;
var dic;
try {
    //debugger;
    who = storage.getItem("account");
    dic = who;
    //if (!who || dic == 0) {
    $.ajax({
        url: 'Handler/SearchInfo.ashx',
        type: 'POST',
        data: {
            kwtest: who
        },
        success: function (id) {
            if (id) {
                who = id;
                dic = id;
                storage.setItem("account", who);
                STtestaccount();
            }
        }
    });
    //}
} catch (e) { catche(e); }
function STtestaccount() {
    //    debugger;
    if (!hisw) {
        testaccount();
    }
    else {
        STtestaccount();
    }
}
//#endregion
//#region 修改个人信息  已注释，第二版开放
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

//#region                               菜单相关
//#region 如果图片加载失败，用系统提供的默认图片
function imgError(j) {
    document.getElementById("icons" + j).src = "images/icons/icon.png";
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
            menuList += "<div class='row0Div' onclick='openList(" + j + ")' id='ListMainControl" + j + "'>"; //展开菜单imgError(" + j + ")' 
            menuList += "<div class='listMain1'><img id='icons" + j + "' src='images/icons/" + pmenu + ".png' onError='imgError(" + j + ")'  /></div>"; //显示图片 
            menuList += "<div class='listMain2' onclick=\"gmbc(0,this," + j + ");dis(event);clickSearchs('" + ppmenu + "','" + j + "');\">&nbsp;" + arrSubList[0] + "</div>"; //主菜单+点击事件[dis(event);clickSearchs('" + pmenu + "');]
            menuList += "<div class='zk' id='zk" + j + "'><span>▲</span></div>"; //展开菜单 .zk
            menuList += "</div>"; //展开菜单结束
            menuList += "<div style='top:15px;' id='imgMainDelete" + j + "'><span class='listEditIconSub' id='removeBt" + j + "' onclick=\"deleteSearch('" + j + "','" + pmenu + "','arrListMain','','',this.id)\"><img id='rm" + j + "' src='images/red1.png' /></span></div>"; //移除+点击事件&nbsp;&#150;&nbsp;
            menuList += "<div style='display:none;' id='listMain" + j + "'>";
            menuList += "<div style='padding-left:40px;' id='listMain2" + j + "'>";
            for (i = 1; i <= arrSubList.length - 1; i++) {
                //子级菜单
                var smenu = arrSubList[i];
                smenu = smenu.replace(reg, "+");
                smenu1 = ReplaceF(arrSubList[i]);
                menuList += "<div id='listSub" + j + "'>";
                menuList += "<div id='" + j + i + "' class='listSub' onclick=\"gmbc(1,this," + j + ");clickSearchs('" + smenu + "','" + j + "')\"><a>" + smenu1 + "</a></div>";
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
    setTimeout("$('#menu1').touchScroll();", 500);
}
//#endregion
//#region 2.生成菜单
listMenu(arrList);
//#endregion
//#region 2.2展开菜单
var ta;
function openList(a) {
    $(".zk").css('opacity', '0.1');
    //$(".zk").css('-webkit-transform', 'rotate(180deg)');
    //    if ($("#function").is(":visible")) {
    //        $('#dicmap').click();
    //    }
    try {
        ta = a;
        //$("#listMain" + a).slideToggle(1);
        if ($("#listMain" + a).is(":visible")) {
            $("#listMain" + a).hide();
            $("#zk" + a).css({ '-webkit-transform': 'rotate(-90deg)', 'opacity': '0.7' }); /*180*/
        }
        else {
            $("#listMain" + a).show();
            $("#zk" + a).css({ '-webkit-transform': 'rotate(-180deg)', 'opacity': '0.7' }); /*0*/
        }
        if (editSwitch == "1") {
            $('#removeBoxSub' + a).show();
        }
        else {
            $('#removeBoxSub' + a).hide();
        }
        //$flip.onload.enableScrollOnContent();
        setTimeout("$('#menu1').touchScroll('update');", 500);
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
        $('#menu1').touchScroll('update');
    } catch (e) { catche(e); }
}
var addswitch = true;
var addbswitch = true;
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
    try {
        //点击编辑
        if (editSwitch == "") {
            $(".row0Div").width("87.5%");
            if (dic == 0 || dic == "") {
                eMsg(1);
            }
            $("#cpright,#Reports").hide();
            $('.listEditIconSub').show();
            $('.listEditMainAdd').show();
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
            //#region
            $(".row0Div").width("99%");
            var add = $.trim($("#addMainInput").val());
            if ((add != "") && (add.length > 1)) {
                $("#buttonAddE").click();
            }

            //#endregion

            $('.listEditIconSub').hide();
            $('.listEditAdd').hide();
            $('.listEditMainAdd').hide();
            $("#cpright,#Reports").show();
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
            if (bmNameChange == "yes") {
                var strBMName = arrBookmarkName.join(":");
                if (dic != 0 && dic != "") {
                    //strBMName = strBMName.replace("+", "strplus");
                    //strBMName = strBMName.replace(reg, "+");
                    //strBMName = strBMName.replace("&", "amp38");
                    //$.post("ajax_saveChanges.asp?", { a: dic, b: "bmn", v: strBMName });
                    $.ajax({
                        url: 'Handler/Login.ashx',
                        type: 'POST',
                        data: { saveBMName: dic, BMName: strBMName },
                        error: function (a, info) {
                            alert("saveBMName save error " + a + info);
                        }
                    });
                    bmNameChange = "";
                }
            }
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
        $('#menu1').touchScroll('update');
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
            click_search(info, null, null, null, 3);
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
            divTag.setAttribute('onclick', 'openList("' + j + '")');
            var newContent;
            var strInput = newInput.replace(reg, "+");
            arrList.push(newInput);

            newContent = "<div class='listMain1'><img id='icons" + j + "' src='images/icons/icon.png' /></div>";
            newContent = newContent + "<div class='listMain2' onclick=\"dis(event);gmbc(0,this," + j + ");clickSearchs('" + strInput + "','" + j + "');\">&nbsp;" + newInput + "</div>";
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
    $('#menu1').touchScroll('update');
    // $flip.onload.enableScrollOnContent();
}
//#endregion
//#region 菜单变底色--change menu background color
function gmbc(type, th, j) {
    //type:0-main 1-sub
    ta2 = type;
    $(".zk").css('opacity', '0.1');
    if (editSwitch == "") {
        $("#zk" + j).css('opacity', '0.7');
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

//#region                                 登录后|           书签
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

var tarrSaved;
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
function saveSearch(uaid, name, addr, uph, ccode, isshow, sos, scode) {
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
    bizEve();
    google.maps.event.trigger(map, 'resize');
    //从本地存储中获取保存的信息字符串到临时变量tarrSaved中
    tarrSaved = storage.getItem("arrSaved");
    $("#page3_details").css("background-color", "#d7d8d9");
    //判断是否已经存在的开关
    var savedexist = false;

    //如果ccode为空，则为0，防止出现undefined情况
    if (!ccode) {
        ccode = 0;
    }

    //#region 取出所有的id，放到数组中，遍历【存在相同的则为true】
    if (tarrSaved) {
        var Tsavedidarr = [];
        Tsavedidarr = tarrSaved.split(';');
        Tsavedidarr.pop();
        for (var i = 0; i < Tsavedidarr.length; i++) {
            Tsavedidarr[i] = Tsavedidarr[i].split('￥');
            //if (Tsavedidarr[i][0] == uaid) {
            if (Tsavedidarr[i][4] == ccode) {
                savedexist = true;
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

    if (!savedexist) {
        //防止手机处理出现异常
        storage.removeItem("arrSaved");
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
            tarrSaved = uaid + "￥" + name + "￥" + addr + "￥" + uph + "￥" + ccode + "￥" + date + ";" + tarrSaved;
            storage.setItem("arrSaved", tarrSaved);
            savedToDB('B', ccode, date);
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
    //#isshow#是否显示此代码，当为shared附属功能时不予显示，则为true


    if (!isshow) {
        //name == name.replace("#39#", "'");
        //name = ReplaceF(name);
        $("#page3_detail").html('<div id="Lsd">Location saved.</div><div id="shareit" onclick="shareBiz(true, \'' + uaid + '\', \'' + name + '\',\'' + addr + '\', \'' + uph + '\', \'' + ccode + '\')">Share it</div><br><div id="backonList" onclick="click_back()">Go Back</div><div id="closeDetails" class="close"  onclick="closeDetails();"><span class="chahao">×</span></div>'); //<div id="closeDetails1" onclick="closeDetails();"><span class="chahao">× </span></div>
        $("#page3_details").show();
        $("#closeDetails").css("margin", "9px 25px");
    } else {
        if (sos) {//true:share
            $("#page3_detail").html('<div id="Lsd">Location shared.</div><br><br><div id="closeDetails1"  class="close" onclick="closeDetails();"><span class="chahao">×</span></div><div id="backonList" onclick="click_back()">Go Back</div><div id="closeDetails"  class="close" onclick="closeDetails();"><span class="chahao">×</span></div>');
        }
        else {//false: saved
            $("#page3_detail").html('<div id="Lsd">Location saved.</div><br><br><div id="closeDetails1"  class="close" onclick="closeDetails();"><span class="chahao">×</span></div><div id="backonList" onclick="click_back()">Go Back</div><div id="closeDetails"  class="close" onclick="closeDetails();"><span class="chahao">×</span></div>');
            $("#backonList").css('margin-left', '70px');
            $("#closeDetails").css('margin', '0px 10px');

        }
        //$("#page3_details").hide();
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

//#region 移除某个书签并保存【如果登陆的话】【第几个书签(-)，第几个书签(|),名字，商家id】//移除saved shared
function removeBMs(n, i, name, id) {
    try {
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
        setTimeout('testShared()', 500);
    } catch (e) { catche(e); }
}

function removeBM2s(n, i, name, scode) {
    try {
        name = ReplaceF(name);
        var r = confirm("Remove '" + name + "' ?");
        tarrSaved = storage.getItem("arrShared");
        var Tsavedarr = [];
        Tsavedarr = tarrSaved.split(';');
        Tsavedarr.pop();
        if (r == true) {
            $("#trBM" + n).hide();
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
        setTimeout('testShared()', 500);
    } catch (e) { catche(e); }
}
//#endregion 

/*/#region                           历史记录相关
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
}
//#endregion*/

//#region                                   搜索
var stvar = [];
var sivar = [];
var clickSearching = false;
var firstseringps = false;
var searvar;
function click_search(kw, sl, notes, gpsll, st) {//st: search type[]
    try {
        if (((kw.toLowerCase() == keywords.toLowerCase()) && gpschange != 'yes')) {
            click_map();
        }
        else {
            firstseringps = true;
            //$("#cover").show();
            CoverTouch();
            ////debugger;
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
            search = true;
            clickSearching = true;
            isSearching = true;
            click_map();
            //clickSearch(kw, sl, notes, gpsll, st);
            /**/
            if (gps.length < 1) {
                // $("#list").html("<center> <br><br><br>Positioning ...<br><br><br><img src=\"images/loading/loading11.gif\" /></center>");
                sivar[0] = setInterval('$("#list").html("<center> <br><br><br>Positioning ...</center>");', 100);
                // $("#list").html(" Positioning...<br><br>");
                // setTimeout("clickSearch('" + kw + "','" + sl + "','" + notes + "','" + gpsll + "','" + st + "')", 2000);
                //$(\"#list\").html(\"<center> <br><br><br>Searching ...</center>\");
                // // //debugger;;
                var stinfo = "clickSearch('" + kw + "', '" + sl + "', '" + notes + "', '" + gpsll + "', '" + st + "')";
                //stvar[1] = setTimeout("clickSearch('" + kw + "','" + sl + "','" + notes + "','" + gpsll + "','" + st + "');", 3000);
                //stvar[1] = setTimeout(stinfo, 3000);
                setTimeout('checksearch()', 5000);
            }
            else {
                clickSearch(kw, sl, notes, gpsll, st);
            }
            fir = false;
            keywords = kw;
        }

    } catch (e) {
        //debugger;
        catche(e);
    }
}
function checksearch() {
    ////debugger;
    if (seachtime == 0 && !isallowgps) {
        if (searvar) {
            searvar = searvar.split(';');
            clickSearch(searvar[0], searvar[1], searvar[2], searvar[3], searvar[4]);
        }
    }
}
var firser = true;
var seachtime = 0;
var sia;
var firgps = true;
var seachpara = "";
var searchSec = 0;
function clickSearch(kw, sl, notes, gpsll, st) {
    ////debugger;
    //alert(1162);
    //if (!hisw) {
    //backmap(1);
    //return;
    //}
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
        $("#list").html("<center> <br><br><br>Searching ...</center>");
        clearTimeout(stsia);
    } catch (e) {
        catche(e);
    }
    //sivar[1] = setInterval('$("#list").html("<center> <br><br><br>Searching ...</center>");', 100);
    $("#list").html("<center> <br><br><br>Searching ...</center>");
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
        } catch (e) { catche(e); }
        if (gps == "" || gps == null) {
            gps = "43.6702131,-79.38679";
            gpsLL = "(43.6702131,-79.38679)";
        }
        gpsState = 2;
        try {
            var marker1 = new google.maps.Marker({
                position: gpsLL,
                icon: gpsicon,
                map: map
            });

            if (marker1) {
                markerGPS.push(marker1);
                addClicktoMarker(marker1, gpsLL);
                newgps = gpsLL;
            }

        } catch (e) { catche(e); }
        //gps = latLngControl.updatePosition();
        //gps = gps.toString().substr(1, gps.toString().length - 2);
    }

    if (kw != "") {
        kws = kw;
        exgps = gps;
        var tgps;
        tgps = gps;
        //debugger;;
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
                SearchTime: SearchTime
            },
            timeout: 30000,
            success: function (a) {
                clearInterval(sisearchSecondFun);
                //debugger;
                //tsi = false;
                ////debugger;
                $("#cover").show();
                CoverTouch();
                try {
                    clearInterval(sisearchSecondFun);
                    //clearInterval(sivar[1]);
                    killwatchGPS();
                    clearTimeout(stsia);
                    SystemBuy = [true, 'listgroup'];
                } catch (e) {
                    catche(e);
                }
                researching = false;
                isSearching = false;
                $("#inMapMsg,#cmm").hide();
                $("#list").html(a);
                clickSearching = false;
                if ((a.indexOf("Shared Location") != -1) || (a.indexOf("Saved Location") != -1)) {
                    $("#list-top").hide();
                }
                if (a.toLowerCase().indexOf("sorry") != -1) {
                    $("#list").height(160); //95  205
                    $("#container").height(160); //95  185 205
                    //$("#listBottom").height(110);
                    $("#list-top").hide();
                }
                else {
                    $("#container").height(160); //210 205
                    //(#10#)
                    //alert(a);
                    try {
                        var amsg = a.split("(#")[1].split("#)")[0];
                        if (amsg == "1" || amsg == "2") {
                            $("#list-top").hide();
                        }
                        else {
                            $("#list-top").show();
                        }
                    } catch (e) { catche(e); }
                }
                $("#list-re").show();
                /* if (storage.getItem("account") != null && storage.getItem("account") != "") {
                   
                }
                else {
                $("#list-re").hide();
                }*/
            },
            error: function (a) {
                //debugger;
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
                $("#cover").hide();
                researching = false;
                var resu;
                /**/
                ////debugger;
                if (searchSec < 20) {
                    if (kw == "dic$") {
                        resu = "<p id='stcs_result1'>&nbsp;Sorry, no location found <br/><br></p><div style='margin-top: -25px;'><div id=\"list-mp\">Go Back</div><div id=\"list-re\">Write something to us.</div></div>";
                    }
                    else {
                        resu = "<p id='stcs_result1'>&nbsp;Sorry, no location found for <br/>&nbsp;'" + kw + "' <br></p><div style='margin-top: -25px;'><div id=\"list-mp\">Go Back</div><div id=\"list-re\">Write something to us.</div></div>";
                    }
                    // resu = "<p id='stcs_result1'>&nbsp;Sorry, no location found for <br/>&nbsp;'" + kw + "' <br></p><div style='margin-top: -25px;'><div id=\"list-mp\">Go Back</div><div id=\"list-re\">Write something to us.</div></div>";
                }
                else {
                    resu = "<p id='stcs_result1'>&nbsp;Sorry network slow, please try again later. <br/></p><div style='margin-top: -25px;'><div id=\"list-mp\">Go Back</div><div id=\"list-re\">Write something to us.</div></div>";
                }
                $("#list").html(resu);
            }
        });

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
        alert(' please enter keywords ');
    }
    // }
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
        $("#cover").hide();
        var listresu = "<p id='stcs_result1'>&nbsp;Sorry network slow, please try again later. <br/><br></p><div style='margin-top: -25px;'><div id=\"list-mp\">Go Back</div><div id=\"list-re\">Write something to us.</div></div>";
        /* if (keywords == "dic$") {
        resu = "<p id='stcs_result1'>&nbsp;Sorry network slow, please try again later. <br/><br></p><div><div id=\"list-mp\">Go Back</div><div id=\"list-re\">Write something to us.</div></div>";
        }
        else {
        resu = "<p id='stcs_result1'>&nbsp;Sorry, no location found for <br/>&nbsp;'" + keywords + "' <br></p><div><div id=\"list-mp\">Go Back</div><div id=\"list-re\">Write something to us.</div></div>";
        }*/
        $("#list").html(listresu);
        isSearching = false;
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

//#region                               地图相关
var privilegeAccount; //特权账户。需要时打开，可以让匿名用户使用登陆后的功能【0无特权、1可报告、2】
var gps = '';
var newgps = ''; //设备可用GPS
var gpsLL = ""; //地图中心店的GPS
var gpsAtt = true; //gps状态，true为机器获取
var map;
var markerGPS = [];
var markersArray = [];
var markersArray1 = [];
var roadEndArr = [];
var myLatLng;
var isclose = false;
var isSearching = false;
var isInrange = true; //判断当前是否在服务范围内【report】false不在范围内
var isAlert;  //是否已经提醒【不在范围内，只提醒一次，重新定位后刷新】false没提醒
// set up default marks icon on google maps.
try {
    var gpsicon = new google.maps.MarkerImage('images/gps32.png',
        new google.maps.Size(32, 32),
        new google.maps.Point(0, 0),
        new google.maps.Point(0, 32));

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
var verStr = navigator.appVersion;
var savedsw = true;
//var isclicknum = true;   
//#region  conText
var conText;
conText = "<strong>What is bizmap.ca</strong><br>Bizmap.ca is a free web based application to help people finding exactly business and service locations. It works on iPhones.";
conText += "<br>It's not a simple business directory. It's totally reconstructed to fit mobile internet use. ";
conText += "<br><br><strong>Why bizmap.ca</strong>";
conText += "<br>So far, finding businesses is still very inconvenient. Many Apps are trying to help you, but also mislead you.";
conText += "<br>'inacturate results', 'many missings', 'wrong  coordinates', 'keywords limit'. You almost can not search businesses by what they are and what they serve.";
conText += "<br>Bizmap.ca devotes to build complete solutions to solve these problems.  We bring you to the font door of business or service exactly what you're looking for.";
conText += "<br>We think what people's think. We are working on a brand new database and try very hard to find business's type, major products or services they provide.";
conText += "<br>In Bizmap.ca you may find 'key cut', 'oil change', 'ice cream', 'walk-in clinic' and many more. Which other Apps just can find them by vendor's names.";
conText += "<br>You may find 'ATM' or 'Coffee' is very closed  to you and are able to get there by walk. We know who has the 'ATM' and who service you 'Coffee'. Other Apps simply send you to the banks or coffee shops far away.";
conText += "<br>You can find locations which is even not a business. Everybody knows where is 'Eaton Centre', but what about if a friend invites you to 'Jubilee Square' or 'woodbine shopping centre'?  You will find only Bizmap.ca helps you.";
conText += "<br>Bizmap.ca is web-based. Any time any iPhone user can open it in the browser. No App download, no account needed.";
conText += "<br>In Bizmap.ca, location sharing becomes so easy. System will generate a simple URL address which you can send to friends by email, text message or twitter. What your friends need to do is just click the link. Bizmap.ca will show them the exact point on map. Nobody will bother you with the direction questions.";
conText += "<br><br><strong>Even more.</strong>";
conText += "<br>We need your help to make this idea works well. We count points to you while you report business informations or invite more members. You will have chances to win iPhones monthly or get points redeemed with business coupons in the future.";
conText += "<br>Bizmap.ca is now on beta version, covers 4 cities in the Great Toronto and Area.  City of Toronto, City of Markham, Town of Richmond Hill and Vaughan City.";
conText += "We will keep working on more area and serve you better.";
conText += "<br><br>2012-2";
//#endregion
$(document).ready(function () {
    try {
        var sist = setInterval('window.scrollTo(0, 0);', 10);
        setTimeout('clearInterval(' + sist + ')', 1000);
        setTimeout('testShared()', 1000);
    } catch (e) { catche(e); }
    $("#showsaved").live('click', function () {
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
                */
                if (storage && storage.getItem("arrSaved")) {
                    //$("#saved").animate({ height: 360 });
                    $("#saved").height(360);
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
                */
                if (storage && storage.getItem("arrShared")) {
                    $("#saved").height(360);
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

        google.maps.event.addDomListener(document.getElementById("container"), 'touchend', function (e) {
            /*$("#tools").height(0);
            $("#tool,#tools").hide();
            bhi = true;*/
            setTimeout('toTop()', 500);
        });
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
        GoogleTouchEvent("imgBizLarge");
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
        if (thisurl.indexOf("www.bizmap.ca") != -1) {
            window.location.href = "http://bizmap.ca";
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
            //#region 跳转 搜索
            storage.setItem("kw", urlinfo);
            storage.setItem("isre", 0);
            window.location.href = "index.htm";
            //#endregion

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
        $("#about").html("<div id='copyrightCanvas'><div id='copyrightText'></div></div><div id='closesaved1' class='close'  onclick='closeabout(1)'><span class='chahao'>×</span></div><div id='closesaved' class='close'  onclick='closeabout(2)'><span class='chahao'>×</span></div>");
        $("#copyrightText").html(conText);
        $("#about").show();

        if (closeLR == "L") {
            $("#closesaved").html('');
            $("#closesaved").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });

        }
        else {
            $("#closesaved1").html('');
            $("#closesaved1").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
        }
        if (iPhoneOrientation == 90) {
            $("#copyrightCanvas,#copyrightText").height(170);
        }
        else {
            $("#copyrightCanvas,#copyrightText").height(310);
        }
        $('#copyrightText').touchScroll();
    });
    $("#Reports").live('click', function () {
        //report(1);
        newReport(1);
    });
    $("#list-re").live('click', function () {
        inputSwitch = true;
        newReport(2);
    });

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
//#region 奖品 相关
function Previouswin() {
    if (iPhoneOrientation == 90) {
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
        $(".Pimg").css('margin-left', '75px');
    }
    else {
        $(".Pimg").css('margin-left', '26px');
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
        $('#PandPInfo1').touchScroll();
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
PandPText += "<br>1.This monthly lucky draw is open to member users of bizmap.ca.";
PandPText += "<br>2.Members activities in bizmap.ca will be counted with points, like reporting, inviting new members, sharing locations, searching, etc.";
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
    $("#about").hide();
}
//#endregion
function GoogleTouchEvent(id, s, m, e) {
    try {
        if (m) {
            google.maps.event.addDomListener(document.getElementById(id), 'touchmove', function (e) {
                e.preventDefault();
            });
        }
        if (e) {
            google.maps.event.addDomListener(document.getElementById(id), 'touchend', function (e) {
                setTimeout('toTop()', 500);
            });
        }
        else {
            google.maps.event.addDomListener(document.getElementById(id), 'touchstart', function (e) {
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
function newReport(x, plat, plng) {
    try {
        clearTimeout(stcr);
        inputSwitch = true;
        reportStep = 1;
        withgps = true;
        var trf;
        closeDetails();


        //if (x == 1 || x == 2) { //从主界面过来的New
        //click_map();
        trf = '<div id="ReportsForm">'; //<div class="dnr"><center>FeedBack</center></div>
        //trf += '<div id="dmsg"><div id="divArea"><center><br><br>Name/Extra info/Address/Telphone<br>Checking location……<img src=\"images/loading/loading11.gif\" /></center></div><br>';
        // trf += '<div id="dmsg"><div id="divArea"><center><br><br>Name/Extra info/Address/Telphone<br>Checking location……</center></div><br>';
        trf += '<div id="dmsg"><div id="divArea"><textarea onfocus="inputSwitch = true;" onblur="inputSwitch = false;" id="reportArea" cols="30" rows="4"></textarea></div><br>';
        //trf += '<span id="CloseReport" onclick="CloseReport(\'' + x + '\',\'' + plat + '\',\'' + plng + '\')"><span class="chahao">×</span></span> <span id="Report" onclick="Next(\'' + x + '\',\'' + plat + '\',\'' + plng + '\')">Next</span><div style="height:10px;clear: both;"></div></div>';
        trf += '<span id="CloseReport1" class="close" onclick="CloseReport(\'' + x + '\',\'' + plat + '\',\'' + plng + '\',1)"><span class="chahao">×</span></span><span id="CloseReport"  class="close" onclick="CloseReport(\'' + x + '\',\'' + plat + '\',\'' + plng + '\',2)"><span class="chahao">×</span></span> <span id="Report" onclick="Next(\'' + x + '\',\'' + plat + '\',\'' + plng + '\')">Next</span> <div style="height:10px;clear: both;"></div></div>';
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
        $("#rf").show();
        //if (x == 2) {//x==1
        //getbound();
        //debugger;
        if (isInrange == false && isAlert == false) {//如果不在范围内且没有提示
            isAlert = true;
            alert('Your area may not be covered by Bizmap.ca');
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
                //alert("2651-getbound info is : 【" + info + "】");
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
            //alert("Sorry, Your location is not within the scope of service .");
            $("#dmsg").html('<div id="divArea"></div><span id="CloseReport" onclick="CloseReport(' + x + ')"><span class="chahao">×</span></span> <span id="Report" onclick="Next(\'' + x + '\')">Next</span><div style="height:10px;clear: both;"></div>');

            $("#divArea").html("<center style='color: gray;'><br>This location may not covered by bizmap.ca<br>Thank you for your help !<center>");
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
        $("#rf").hide();
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
            setTimeout("$('#pr1').touchScroll()", 500);
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
    $('#com1').touchScroll();
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
    $("#closeDetailsaccount").css({ marginTop: "40px" });
    $("#account").hide();
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
            tacc1 += '<div id="MsgInfo"><span>Sign up to start collecting points and enjoy our monthly lucky draw for iPhones and many more.</span>';
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
        $('#com1').touchScroll('update');
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

            setTimeout("$('#com1').touchScroll('update');$('#com1').touchScroll('setPosition', 0);", 500);
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
        setTimeout("$('#menu1').touchScroll('setPosition', 0)", 500);
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
    } catch (e) {
        catche(e);
    };
}
var ta1;
var ta2;
function testmenu() {
    try {
        //    debugger;
        var len = arrList.length;
        $('.zk').css('-webkit-transform', 'rotate(-90deg)'); /180/
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
            $("#zk" + ta1).css('-webkit-transform', 'rotate(-180deg)');
        }
        setTimeout("$('#menu1').touchScroll('update');", 500);
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
        (storage && storage.getItem("arrShared")) ? (document.getElementById("showshared").style.color = 'black') : (document.getElementById("showshared").style.color = 'grey');
        (storage && storage.getItem("arrSaved")) ? (document.getElementById("showsaved").style.color = 'black') : (document.getElementById("showsaved").style.color = 'grey');
    } catch (e) { catche(e); }
}
function showsaved() {
    // // //debugger;;
    $("#saved").html('<div id="savedinfo"></div><div id="closesaved1" class="close" onclick="closesaved(1)"><span class="chahao">×</span></div><div id="closesaved" class="close" onclick="closesaved(2)"><span class="chahao">×</span></div>');
    if (closeLR == "L") {
        $("#closesaved").html('');
        $("#closesaved").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
    }
    else {
        $("#closesaved1").html('');
        $("#closesaved1").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
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
    if (storage.getItem("arrSaved") && jQuery.trim(storage.getItem("arrSaved")) != "") {
        arrSaved = storage.getItem("arrSaved").split(";");
        arrSaved.pop();
        for (j = 0; j < arrSaved.length; j++) {
            arrSaved[j] = arrSaved[j].split("￥");
        }
        listValue = "<table id='si'>";
        for (i = 0; i < arrSaved.length; i++) {
            if ($.trim(arrSaved[i][0]) != "") {
                var arrV = arrSaved[i][1].replace(reg, "&#32;")  //if no replace, cannot handle remove;
                listValue += "<tr id='trBM" + i + "'><td>&nbsp;&nbsp;&nbsp;</td>";
                listValue += "<td class='td_bmMiddle'>";
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
                if ((arrSaved[i][0].indexOf('dic02') == -1) && !count) {//普通商家
                    //var tname = arrSaved[i][1].replace("#39#", "'");
                    var tname = ReplaceF(arrSaved[i][1]);
                    var tadd = ReplaceF(arrSaved[i][2]);
                    listValue += "<a class=\"csa\" onclick=click_search('" + arrSaved[i][4] + "',null,null,null,4)>" + tname + "</a>";
                    //listValue += "<p class='p_smallfont'>" + arrSaved[i][2] + "</p>";
                    listValue += "<p class='p_smallfont'>" + tadd + "</p>";
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
                    listValue += "<p class='p_smallfont'><a href='tel:" + arrSaved[i][3] + "'>Tel:&nbsp;&nbsp;" + arrSaved[i][3] + "</a><a class='p_date'>" + time + "</a></p>";
                    //listValue += "</td><td class='td_bmRight'><img onclick=\"removeBMs('" + 0 + "','" + i + "','" + arrV + "','" + arrSaved[i][0] + "')\" src='images/delete17gray.png' border='0' /></td></tr>";
                    listValue += "</td><td class='td_bmRight' onclick=\"removeBMs('" + 0 + "','" + i + "','" + arrV + "','" + arrSaved[i][4] + "')\" ><div class='dm'><div class='ds'></div></div></td></tr>";

                }
                else {
                    var slinfo = arrSaved[i][0];
                    slinfo = slinfo.split('=')[0];
                    listValue += "<a class=\"csa\" onclick=\"click_search('dic$','" + slinfo + "','" + arrSaved[i][1] + "','" + arrSaved[i][2] + "',4)\">" + slinfo + "</a>";
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
            }
        }
        listValue += "</table>";
        $("#savedinfo").html(listValue);
    }
    else {
        $("#savedinfo").html("<center>Nothing saved</center> ");
    }
    if (iPhoneOrientation == 0) {
        $("#savedinfo,#si").height(310);
    }
    else {
        $("#savedinfo,#si").height(170);
    }
    $('#si').touchScroll();
    googleavent();
}
//测试saved中是否有空头
function testsaved() {
    // // //debugger;;
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
function closesaved(x) {
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
    //$("#saved").css("background-image", "none");
    $("#saved").html('<div id="showsaved">Saved</div><div id="showshared">Shared</div><div id="showaccount" onclick="dis(event); showaccount();">Account</div>');
    setTimeout('testShared()', 50);
    $("#saved").height(32);
    $("#menu").show();
    setTimeout('savedsw = true', 500);
    toTop();
    testaccount();
}
function showshared() {
    $("#saved").html('<div id="savedinfo"></div><div id="closesaved1" class="close" onclick="closesaved(1)"><span class="chahao">×</span></div><div id="closesaved" class="close" onclick="closesaved(2)"><span class="chahao">×</span></div><div id="ra">Remove all</div>');
    if (closeLR == "L") {
        $("#closesaved").html('');
        $("#closesaved").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
    }
    else {
        $("#closesaved1").html('');
        $("#closesaved1").css({ 'background': 'none', 'backgroundColor': 'transparent', 'box-shadow': 'none', 'border': '2px dotted white' });
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
        for (i = 0; i < arrShared.length; i++) {
            var arrV = arrShared[i][1].replace(reg, "&#32;")  //if no replace, cannot handle remove;
            listValue += "<tr id='trBM" + i + "'><td>&nbsp;&nbsp;&nbsp;</td>";
            listValue += "<td class='td_bmMiddle'>";
            //===判断是否saved   "xkk7ex"
            var count = false;
            if (arrShared[i][0].indexOf('Shared Location:') == 0) {
                count = true;
            }
            //=====8709￥ ATM ￥ 792 Broadview Ave , Toronto , ON ￥416-466-2778￥Gx4op4;
            //     8800￥ ATM ￥ 807 Broadview Ave , Toronto , ON ￥416-463-2775￥Gbb464￥date;
            //普通信息
            if ((arrShared[i][0].indexOf('dic02') == -1) && !count) {
                //var tname = arrShared[i][1].replace("#39#", "'");
                var tname = ReplaceF(arrShared[i][1]);
                var tadd = ReplaceF(arrShared[i][2]);
                listValue += "<a class=\"csa\" onclick=click_search('" + arrShared[i][4] + "',null,null,null,5)>" + tname + "</a>";
                listValue += "<p class='p_smallfont'>" + tadd + "</p>";
                //#region time
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
                //#endregion
                listValue += "<p class='p_smallfont'><a href='tel:" + arrShared[i][3] + "'>Tel:&nbsp;&nbsp;" + arrShared[i][3] + "</a><a class='p_date'>" + time + "</a></p>";
                //listValue += "</td><td class='td_bmRight'><img onclick=\"removeBM2s('" + 0 + "','" + i + "','" + arrV + "')\" src='images/delete17gray.png' border='0' /></td></tr>";
                listValue += "</td><td class='td_bmRight' onclick=\"removeBM2s('" + 0 + "','" + i + "','" + arrV + "','" + arrShared[i][4] + "')\"><div class='dm'><div class='ds'></div></div></td></tr>";
            }
            else {
                listValue += "<a class=\"csa\" onclick=\"click_search('dic$','" + arrShared[i][2] + "',null,null,null,5)\">" + arrShared[i][0] + "</a>";
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
    $('#si').touchScroll();
    googleavent();
}
function c1() {
    // // // //  // //debugger;;
    if (!isSearching) {
        //gps = latLngControl.updatePosition();
        gpsLL = latLngControl.updatePosition();
        if (monitor.gps(gpsLL)) {
            oldGps = gpsLL;
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
        var marker = new google.maps.Marker({
            position: gpsLL,
            icon: gpsicon,
            map: map
        });
        markerGPS.push(marker);
        addClicktoMarker(marker, gpsLL);
        newgps = gpsLL;
        gpschange = 'yes';
        //isallowgps = false;
        //$("#closecross").click();
        closecross();
        gpsAtt = false;
        gpsState = 1;
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
    //$("#c").html("<center><br><br><img src=\"images/loading/loading11.gif\" /></center>");
    $("#c").html("<center><br><br>Please wait a moment</center>");
    $.ajax({
        url: 'Handler/Login.ashx',
        type: 'POST',
        data: { scodeMaker: 1 },
        success: function (info) {
            if (info != "" && info != null) {
                scode = info;
                var url = "bizmap.ca/?" + scode;
                $("#c").html("<a style='font-size: medium;font-weight: bolder;'>Share location : </a>&nbsp;&nbsp;&nbsp;<span id=\"url\">" + url + "</span><br><input id='saveLocationNotes' onfocus='inputfocus()' onblur='inputblur()' placeholder=' Notes' maxlength='50' size='35' type='text' /><br><br><div onclick='shareajax(\"" + scode + "\")' class='cross1'><a href='mailto:?Subject=shared%20Location&body=bizmap.ca/?" + scode + "'>&nbsp;E-Mail&nbsp;&nbsp;</a></div><div  onclick='sharebySMS(\"" + scode + "\",1)' class='cross2'><a>&nbsp;&nbsp;&nbsp;&nbsp;SMS&nbsp;&nbsp;&nbsp;&nbsp;</a></div><div onclick='shareajax(\"" + scode + "\")' class='cross3'><a href='tweetie:///post?message=Share location from bizmap. bizmap.ca/?" + scode + "'>&nbsp;Twitter</a></div>");
            }
        },
        error: function () {
            alert("sorry, connect false!");
            closecross();
        }
    });
}
function shareajax(scode) {
    //saveCurLocation(scode, true);
    // // // //  // //debugger;;
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
            success: function () {

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
                closeCurLocation();
            },
            error: function (e) {
                alert('share fault');
                closeCurLocation();
            }
        });
    }
}
function c3() {
    // // // //  // //debugger;;
    if (!isSearching) {
        gpsLL = latLngControl.updatePosition();
        if (monitor.gps(gpsLL)) {
            var tgpsll = gpsLL.toUrlValue(5);
        } else {
            c3();
        }
        $("#c").html("<a style='font-size: medium;font-weight: bolder;'>Save location : </a><br><a style='font-weight: bolder;color:blue;font-size: x-small;margin-left: 5px;'>" + tgpsll + "</a><br><input id='saveLocationNotes' onfocus='inputfocus()' onblur='inputblur()' placeholder=' Notes' maxlength='50' size='35' type='text' /><br><br><div class='cross1' onclick='saveCurLocation(\"" + gpsLL + "\",\"" + tgpsll + "\")' id='saveCurLocation'>Save</div>");
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
    var url = "bizmap.ca?" + scode;
    $("#c").html("Location <a style='font-weight: bolder;color:blue;font-size: small;'>" + url + "</a> was saved.<br>Search in bizmap.ca by the code:<a style='font-weight: bolder;color:blue;font-size: small;'>" + scode + "</a>,<br>or enter the link above in browser to find<br>this location.<br><div class='cross1' onclick='closeCurLocation()'>Close</div>");
    }
    else*/
    if (!savedexist) {
        $("#c").html("Location <a style='font-weight: bolder;color:blue;font-size: small;'>" + tgpsll + "</a><br>  was saved.<br><br><div id=\"backonList\" onclick=\"click_back()\">Go Back</div>"); //<br><br><div class='cross1' onclick='closeCurLocation()'>Close</div>
    }
    else {
        $("#c").html("Location <a style='font-weight: bolder;color:blue;font-size: small;'>" + tgpsll + "</a><br> was already saved.<br><br><div id=\"backonList\" onclick=\"click_back()\">Go Back</div>"); //<br><br><div class='cross1' onclick='closeCurLocation()'>Close</div>
    }
    //$("#c").html("Location <a style='font-weight: bolder;color:blue;font-size: small;'>" + url + "</a> was saved.<br>Search in bizmap.ca by the code:<a style='font-weight: bolder;color:blue;font-size: small;'>" + scode + "</a>,<br>or enter the link above in browser to find<br>this location.<br><div class='cross1' onclick='closeCurLocation()'>Close</div>");
    //}

    /*2011.09.17注释save不需要保存至数据库
    $.ajax({
    url: 'Handler/Login.ashx',
    type: 'POST',
    data: { saveLocation: dic, ip: ip, scode: scode, Latlng: gpsLL, GPS: gps, GPSAtt: gpsAtt, Message: notes }
    // success: function (info) {
    //    $("#c").html("Location <a style='font-weight: bolder;color:blue;font-size: small;'>" + url + "</a> was saved.<br>Search in bizmap.ca by the code:<a style='font-weight: bolder;color:blue;font-size: small;'>" + scode + "</a>,<br>or enter the link above in browser to find<br>this location.<br><div class='cross1' onclick='closeCurLocation()'>Close</div>");
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
        tp = setInterval('toTop()', 50);
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
//#region 显示地图
var fir = true;
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
function click_map(x) {
    $('body').css('background', '#6070A4');
    if (iPhoneOrientation == 0) {
        $("#page0").attr("class", 'cubeleft out');
        $("#page1").attr("class", 'cubeleft in current');
    }
    else {
        $("#page0").attr("class", 'cubeleft1 out1');
        $("#page1").attr("class", 'cubeleft1 in1 current');
    }
    //alert(1);
    if (x) {
        homeType = true;
        $("#zoom12 img").attr('src', 'images/home.png');
    }
    if ($("#account").is(":visible")) {
        showaccount();
    }

    testList();

    //alert(mapEve);
    //debugger;
    if (!hisw && !mapEve) {

        setTimeout('testmenu()', 500);
        if (fir) {
            $("#map").show();
            detectBrowser();
            fir = false;
            $("#container").css("margin-top", $("#map_canvas").height() + 1);
            document.getElementById('map').style.visibility = 'visible';
            document.getElementById('map_canvas').style.visibility = 'visible';
        }
        if (editSwitch == "") {
            if (keywords == "none") {
                $("#list").html("<center><br><br><br><div id=\"backonList\" style='margin-left:118px' onclick=\"click_back()\">Go Back</div><div onclick=\"dis(event);newReport(2);\" id=\"list-re\">Write something to us.</div></center>");
            }
            jumpTo(0);
        }
        //setTimeout('ToMap()', 800);
        try {
            ////debugger;
            clearTimeout(sttesthisw);
            menuPosition = $('#menu1').touchScroll('getPosition');
        } catch (e) { catche(e); }

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


        setTimeout('hisw = true', 500);
        //alert(3);


        //#region  直接进入地图
        //debugger;
        if (x == 1 && !isSearching) {
            //initialize(1);
            $("#map_canvas").width('100%');
            //$("#map_canvas").height(255);
            //google.maps.event.trigger(map, 'resize');
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
        //alert(4);
        //#endregion  
        sttesthisw = setTimeout('toTop();testhisw();$("#mapcor1,#mapcor2,#mapcor3,#mapcor4").show();', 800);
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
}
var sttesthisw;
function testhisw() {
    //$('body').css('background-image', 'url("images/dot.png")');
    //$('body').css('background-repeat', 'repeat');
    //$('body').css('background-position', 'top left, top right');
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
//#region 关闭地图
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
$("#cover").hide();
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
    $('body').css('background', '#6070A4');  // debugger;
    showswitch = true;
    $("#zoom6,#zoom8,#zoom10").hide();
    $('#gpsy').css('right', '0px');
    $('#gpsInMap').css({ 'top': '0px !important', 'right': '0px' });
    $('#croInMap').css('top', '0px !important');

    $("#mapcor1,#mapcor2,#mapcor3,#mapcor4").hide();
    //$('body').css('background', '#6070A4');
    $('body').height(415);
    bizEve();
    clearTimeout(sttesthisw);
    //debugger;
    if (iPhoneOrientation == 0) {
        $("#page1").attr("class", 'cuberight out');
        $("#page0").attr("class", 'cuberight in current');
    }
    else {
        $("#page1").attr("class", 'cuberight1 out1');
        $("#page0").attr("class", 'cuberight1 in1 current');
    }

    if (exnum) {
        exnum.style.backgroundImage = 'url("./images/icon_L.png")';
        exnum.style.webkitTransition = "-webkit-transform  800ms ease";
        exnum.style.WebkitTransform = "scale(1)";
        //$(".plus").slideUp();
    }
    try {
        //// // // //  // //debugger;;
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
    killwatchGPS();
    stopGPS(1);
    $("#cover,#rf").hide();
    $("#closecross").click();
    try {
        $('#list').touchScroll('update');
        $('#list').touchScroll('setPosition', 0);
    } catch (e) { catche(e); }
    if ($("#cross").is(":visible")) {
        closecross();
    }

    /*$("#page0").removeClass();
    $("#page1").removeClass();
    $("#page0").addClass("cuberight in current");
    $("#page1").addClass("cuberight out");
    */

    //$("#page0").animate({ marginLeft: "-160px" }, 400);

    //setTimeout("$('#page0').css('-webkit-transform', 'none');", 390);
    //setTimeout("$('#page0').css('-webkit-transition-duration', '450ms');$('#page0').css('-webkit-transform', 'scale(1) rotateY(0deg)');", 390);
    //$('#page0').css('-webkit-transition-duration', '450ms');
    //$('#page0').css('-webkit-transform', 'scale(1) rotateY(0deg)');

    //saved
    /*if ($("#saved").html().indexOf('savedinfo') != -1) {
    closesaved();
    }*/
    //hisw = false;
    setTimeout('hisw = false', 500);
    //search = false;
    //clickSearching = false;
    //isSearching = false;
    //$("#login").slideUp();
    clearTimeout(t);
    $("#tools").height(0);
    clearTimeout(hi);
    clearTimeout(hi1);
    $("#tool,#tools,#inMapMsg,#cmm,#page3_details").hide();
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
    varbizimg = "";
    //google.maps.event.clearListeners(map, 'click');$("#container").css("position", "initial");
    clearOverlays1();
    sttesthisw = setTimeout('toTop();testhisw();', 800);
    testmenu();
    //testaccount();
    testShared();
    tomenu = true;
    //setTimeout('monitor.menu()', 1000);
    //setTimeout('monitor.tomap(false);', 300);
    //mapEve = false;
    if (!isNaN(menuPosition)) {
        ////debugger;
        $('#menu1').touchScroll('setPosition', parseInt(menuPosition));
    }

}
//#endregion
//#endregion

//#region 放大地图   zoomClick
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
        if (map.getZoom() < 16) {
            map.setZoom(map.getZoom() + 1);
        }
        if (map.getZoom() == 16) {
            map.setZoom(map.getZoom() + 1);
        }
        else if (map.getZoom() == 17 && map.getMapTypeId() == 'roadmap' && type == '1') {
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
        draggable: true,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    //#region  显示红旗
    setTimeout('if((gpsState!= 0)||("' + param + '"=="1")){clearMarkGPS();var marker = new google.maps.Marker({position: myLatLng,icon: gpsicon,map: map});markerGPS.push(marker);addClicktoMarker(marker, myLatLng);}', 100);

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
    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(bottomControlDiv);
    //---------------------------------------------------------------------------------------------

    //缩小L
    //---------------------------------------------------------------------------------------------
    var bottomControlDiv = document.createElement('DIV');
    var bottomControl = new BottomControl2(bottomControlDiv, map);
    bottomControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(bottomControlDiv);
    //---------------------------------------------------------------------------------------------
    //放大R
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
    //#region corss
    var typeControlDiv0 = document.createElement('DIV');
    var typeControl0 = new TypeControl0(typeControlDiv0, map);
    typeControlDiv0.index = 10;
    typeControlDiv0.id = "toolInMap";
    map.controls[google.maps.ControlPosition.RIGHT].push(typeControlDiv0);
    //#endregion   

    //#region cross按钮
    var centerControlDiv = document.createElement('DIV');
    var cControl = new centerControl(centerControlDiv, map);
    centerControlDiv.index = 1;
    centerControlDiv.id = 'centerControlDiv';
    map.controls[google.maps.ControlPosition.RIGHT].push(centerControlDiv);

    latLngControl = new LatLngControl(map);
    //#endregion



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
                map.setCenter(init);
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
            clearMarkGPS();
            var marker = new google.maps.Marker({
                position: init,
                icon: gpsicon,
                map: map
            });
            markerGPS.push(marker);
            addClicktoMarker(marker, init);
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
            var stinfo0 = 'if(!mapEve){mapStatus = false;if (!hisw && tomenu) {$("#keywords2").blur();click_map(1);}}';
            setTimeout(stinfo0, 300);
            st5090 = setTimeout('$("#toolInMap").css("opacity", "0.1")', 2000);
            /*    if (hisw) {
            var str4147 = 'if (!mapStatus) {loadingmap();}';
            st3995 = setTimeout(str4147, 2000);
            }*/
        });
        google.maps.event.addDomListener(document.getElementById('map_canvas'), 'touchmove', function (e) {
            clearTimeout(st5090);
            $("#toolInMap").css("opacity", "0.7");
        });
        google.maps.event.addDomListener(document.getElementById('map_canvas'), 'touchstart', function (e) {
            //alert(5320);
            clearTimeout(st5090);
            $("#toolInMap").css("opacity", "0.7");
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

    } catch (e) { catche(e); }
}
var showswitch = true;
function TypeControl0(typeDiv, map) {
    //typeDiv.style.paddingTop = '0px';
    var tUI = document.createElement('div');
    tUI.style.width = '30px';
    tUI.style.height = '30px';
    //tUI.style.opacity = '0.1';
    tUI.style.border = '0px';
    tUI.style.background = 'url(images/cross3.png)';
    tUI.style.textAlign = 'left';
    tUI.style.marginTop = '8px';
    tUI.style.marginRight = '8px';
    tUI.style.zIndex = '300';
    //tUI.id = 'zoom6';
    typeDiv.appendChild(tUI);
    google.maps.event.addDomListener(tUI, 'click', function () {
        if ($("#cross").is(":visible")) {//隐藏
            //$("#centerMap")
            //$("#centerControlDiv").show();
            $("#centerMap").css('-webkit-transform', 'scale(1)');
            setTimeout('$("#centerControlDiv").css({"top": "115px !important", "right": "150px !important","-webkit-transform": "rotate(120deg)"})', 200);
            //$("#centerControlDiv").css({ "top": "115px !important", "right": "150px !important", "-webkit-transform": "rotate(180deg)"}); zoom10();
            setTimeout('$("#centerControlDiv").css({"top": "8px !important", "right": "8px !important","-webkit-transform": "rotate(0deg)"});zoom10();', 600);
        }
        else {//显示
            $("#centerControlDiv").css({ "top": "8px !important", "right": "8px !important", "-webkit-transform": "rotate(0deg)" });
            //$("#centerControlDiv").css({ "top": "8px !important", "right": "8px !important", "-webkit-transform": "rotate(0deg)" });
            //$("#centerMap")
            $("#centerControlDiv").show();
            zoom10();
            $("#centerMap").css('-webkit-transform', 'scale(1)');
            setTimeout('$("#centerControlDiv").css({"top": "115px !important", "right": "150px !important","-webkit-transform": "rotate(120deg)"});', 200);
            //$("#centerControlDiv").css({ "top": "115px !important", "right": "150px !important", "-webkit-transform": "rotate(180deg)"}); zoom10();
            setTimeout('$("#centerControlDiv").css({"top": "110.5px !important", "right": "145px !important","-webkit-transform": "rotate(180deg)"});', 600);
        }



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
            $('#centerControlDiv').css({ 'left': '225px !important', 'top': '119px !important' });
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
    tUI.style.width = '48px';
    tUI.style.height = '32px';
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
    tUI.style.background = 'url(images/back.png)';
    tUI.style.textAlign = 'center';
    tUI.style.cursor = 'pointer';
    tUI.style.marginTop = '5px';
    tUI.style.marginLeft = '3px';
    //tUI.style.paddingTop = '5px';
    tUI.style.zIndex = '300';
    tUI.style.color = 'white';
    tUI.id = 'backonMap';
    //tUI.innerHTML('Main');
    typeDiv.appendChild(tUI);
    google.maps.event.addDomListener(tUI, 'click', function () {
        ////debugger;
        if (hisw) {
            try {
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
    //setTimeout('clearInterval(' + tbom + ');', 30000); //30s后清除，如果出问题，可注释
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
    /*google.maps.event.addDomListener(tUI, 'click', function () {  //2011.10.08
    //alert(latLngControl.updatePosition());
    cross();
    });*/
}
function cross() {
    //setTimeout('$("#tools").height(0);$("#tool,#tools").hide();', 1);
    //bhi = true;
    if ($("#cross").is(":visible")) {
        closecross();
    }
    else {
        //$("#cross").html('<br><br><div id="c"><div class="cross" onclick="c1()" id="c1">Use as current location</div><div class="cross" onclick="c2()" id="c2">Share this location</div><div class="cross"  onclick="c3()" id="c3">Save this location</div></div><div onclick="closecross()" id="closecross"><span class="chahao">×</span></div><div onclick="closecross()" id="closecross1"><span class="chahao">×</span></div>');


        //$("#cross").html('<br><span id="al" onclick="al()">Auto Location</span><br><br><div id="c"><span class="tip">Use center as</span><div class="cross" onclick="c1()" id="c1"> Current Location</div><span class="tip1">or</span><div class="crossit"  onclick="c3()" id="c3">Save it</div><div class="crossit" onclick="c2()" id="c2">Share it</div></div><div onclick="zoom101()" class="close" id="closecross"><span class="chahao">×</span></div>');


        $("#cross").html('<br><div id="c"><span class="tip">Use center as</span><div class="cross" onclick="c1()" id="c1"> Current Location</div><span class="tip1">or</span><div class="crossit"  onclick="c3()" id="c3">Save it</div><div class="crossit" onclick="c2()" id="c2">Share it</div></div><div onclick="zoom101()" class="close" id="closecross"><span class="chahao">×</span></div>');


        //$("#cross").html('<br><br><br><div id="c"><span class="tip">Use center as</span><div class="cross" onclick="c1()" id="c1"> Current Location</div><span class="tip1">or</span><div class="crossit"  onclick="c3()" id="c3">Save it</div><div class="crossit" onclick="c2()" id="c2">Share it</div></div><div id="closecross"><button type="button" onclick="closecross()" class="specialkey backspace">B</button></div>');
        $("#cross").show();
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
    watchgps(3);
}
function closecross() {
    $("#centerMap").css('-webkit-transform', 'scale(1)');
    setTimeout('$("#centerControlDiv").hide()', 500);
    $("#cross").hide();
    // hideisearch(2);
    clearInterval(cb);
    //testtools();
}
function zoom101() {
    //$("#centerControlDiv").css({ "top": "8px !important", "right": "8px !important" });
    //setTimeout('$("#centerControlDiv").css({"top": "115px !important", "right": "150px !important","-webkit-transform": "rotate(120deg)"});zoom10();', 200);
    $("#centerControlDiv").css({ "top": "115px !important", "right": "150px !important", "-webkit-transform": "rotate(120deg)" });
    //$("#centerMap")
    //$("#centerControlDiv").show();
    setTimeout('$("#centerControlDiv").css({"top": "8px !important", "right": "8px !important","-webkit-transform": "rotate(0deg)"})', 200);
    $("#centerMap").css('-webkit-transform', 'scale(1)');
    setTimeout('closecross();', 200);
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
    rUI.style.width = '30px';
    rUI.style.height = '30px';
    //rUI.style.opacity = '0.8';
    //rUI.style.textAlign = 'middle';
    rUI.style.marginLeft = '5px';
    rUI.style.marginTop = '-25px';
    rUI.style.textAlign = 'center';
    rUI.style.background = 'url(images/zoomin.png)';
    if (closeLR == "R") {
        rUI.style.opacity = '0.1';
    }
    rUI.id = "zoominmap";
    rUI.style.zIndex = '300';
    rUI.style.color = 'white';
    bottomDiv.appendChild(rUI);
    google.maps.event.addDomListener(rUI, 'click', function () {
        _clicktimesR = 0;
        _clicktimes++;
        changeO('l');
        zoom2();
        try {
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

        } catch (e) { catche(e); }
    });
}
//#endregion

//#region 缩小L
function BottomControl2(bottomDiv, map) {
    var rUI1 = document.createElement('div');
    rUI1.style.width = '30px';
    rUI1.style.height = '30px';
    //
    //rUI.style.textAlign = 'middle';
    rUI1.style.marginLeft = '5px';
    rUI1.style.marginTop = '-55px';
    rUI1.style.background = 'url(images/zoomout.png)';
    if (closeLR == "R") {
        rUI1.style.opacity = '0.1';
    }
    rUI1.id = "zoomoutmap";
    bottomDiv.appendChild(rUI1);
    google.maps.event.addDomListener(rUI1, 'click', function () {
        _clicktimesR = 0;
        _clicktimes++;
        changeO('l');
        zoom4();
        try {
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

        } catch (e) { catche(e); }
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
            $("#zoominmap,#zoomoutmap").css('opacity', '0.7');
        }
        else {
            $("#zoominmapR,#zoomoutmapR").css('opacity', '0.7');
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
        setTimeout("killwatchGPS();", 5500);
        watchId = navigator.geolocation.watchPosition(
        // GetLoGPS,
        scrollMap,
        //   alert((new Date).getSeconds()),
        onError,
     { enableHighAccuracy: true, timeout: 5000}//2012.01.14  6-》5
     );
        //gpschange = '';
        watchID = watchId;
        setTimeout("stopwatchGPS('" + watchId + "','" + x + "'); killwatchGPS();", 5500);

    } catch (e) { catche(e); }
}
function GetLoGPS(pos) {
    alert((new Date).getSeconds());

}
//#region scrollMap  在得到新的GPS位置后自动平移到GPS位置
// automatically pan to GPS position after get new GPS location
var newGPS;
function scrollMap(pos) {
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

        var marker = new google.maps.Marker({
            position: newGPS,
            icon: gpsicon,
            map: map
        });
        if (monitor.gps(newGPS)) {
            map.panTo(newGPS);
            //map.panTo(newGPS);
        }
        addClicktoMarker(marker, newGPS);
        markerGPS.push(marker);
        gps = pos.coords.latitude + "," + pos.coords.longitude;
        newgps = newGPS;
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
    if (hisw) {
        if (wid == "") { wid = watchID; }
        if (wid != "") {
            navigator.geolocation.clearWatch(wid);
        }
        try {
            ////debugger;
            if (x == "initialize") {
                getbound();
                gpsLock = false;
            }
            else if (x == '3') {
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
            if (seachtime < 1) {
                if (searvar) {
                    searvar = searvar.split(';');
                    clickSearch(searvar[0], searvar[1], searvar[2], searvar[3], searvar[4]);
                }
            }
            else if (oldGps && newGPS && ("" + oldGps != "" + newGPS)) {
                gpschange = 'yes';
                if (keywords != "" && keywords != 'none' && keywords != 'dic$' && hisw && seachtime > 1) {//有关键字、在地图页、非第一次搜索
                    clearTimeout(t1);
                    $('#inMapMsg').html("<span id='inMapMsg1'></span>");
                    //alert(gpschange);
                    $('#inMapMsg1').html("<center><span onclick='reSearch();'><font color=blue class='button1'>Re-search</font></span></center>");
                    t1 = setTimeout("$('#inMapMsg,#cmm').fadeOut()", 4000);
                    $('#inMapMsg,#cmm').fadeIn();
                    if (monitor.gps(newgps)) {
                        map.panTo(newgps);
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
function reSearch(x) {
    if (keywords != 'none') {
        try {
            $('#list').touchScroll('setPosition', 0);
            sia.abort();
        } catch (e) { catche(e); }

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
        oldGps = newGPS;
        researching = true;
        if (keywords != 'dic$') {
            click_search(keywords, null, null, null, 6);
        }
        else {
            //alert(seachpara);
            if (seachpara.indexOf('￥') != -1) {
                seachpara = seachpara.split('￥');
            }
            //seachpara = seachpara.split('￥');
            click_search(seachpara[0], seachpara[1], seachpara[2], seachpara[3], seachpara[4]);
        }
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
var useragent;
function detectBrowser() {
    jumpTo(0);
    useragent = navigator.userAgent;
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
    cb = setInterval('changeBorder("centerMap");', 17);
}
var zoom10time = 0;
var position1 = true;
function zoom10() {
    if (iPhoneOrientation == 90) {
        $('#centerControlDiv').css({ 'left': '225px !important', 'top': '119px !important' });
    }
    ////debugger;!mapStatus ||
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
        stopGPS(1);
        if ($("#cross").is(":visible")) {
            //alert(2);
            st5090 = setTimeout('$("#toolInMap").css("opacity", "0.1")', 2000);
            $("#centerMap").css('-webkit-transform', 'scale(1)');
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
function flag() {
    var x = map.getZoom();
    var tx = 7;
    switch (x) {
        case 18: tx = tx; break;
        case 17: tx = tx - 1; break;
        case 16: tx = tx - 3; break;
        case 15: tx = tx - 3; break;
        case 14: tx = tx - 4; break;
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
            zoomClick(1);
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
function clearMarkGPS() {
    if (markerGPS) {
        try {
            for (i in markerGPS) {
                markerGPS[i].setMap(null);
            }
        } catch (e) { catche(e); }
        markerGPS.length = 0;   //add
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
function listgroup(x) {//通过点击某个商家重新排版时，去掉x图标[x=x-1]

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
        $('#list').touchScroll();
        firser = false;
    }
    //2.清空markers【清除所有的图钉】
    deleteOverlays();
    //$flip.onload.enableScrollOnContent1();
    $('#list').touchScroll('update');
    var ll22 = $("#list").html();
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
        var nn = "" + newgps.lat();
        var ss = "" + newgps.lat();
        var ww = "" + newgps.lng();
        var ee = "" + newgps.lng();

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
                        var location = new google.maps.LatLng(L25[0], L25[1]);
                        var markerlist = new google.maps.Marker({
                            position: location,
                            map: map,
                            icon: image,
                            zIndex: 2 * (L23.length - i) - 1
                        });
                        markersArray.push(markerlist);
                        //#region 二次标注
                        //markersArray.push(markerlist);
                        //#endregion
                        addClicktoMarker(markerlist, location, kk23[i], i);
                        addClicktoMarker(markerlist, location, kk23[i], i);
                    }
                    //#endregion

                    //#region 商家序号/蓝色
                    var markerlist = new google.maps.Marker({
                        position: location,
                        map: map,
                        icon: iconText,
                        zIndex: 2 * (L23.length - i)
                    });
                    markersArray.push(markerlist);
                    //#region 二次标注
                    markersArray.push(markerlist);
                    //#endregion
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

            var ne = new google.maps.LatLng(nn, ee);
            var sw = new google.maps.LatLng(ss, ww);
            var bounds = new google.maps.LatLngBounds(sw, ne);
            map.fitBounds(bounds);
            if (map.getZoom() > 18) {
                map.setZoom(18);
            }
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
                        $("#list").html("sorry, no location found for '" + newkw + "'<hr>" + data1);
                    }
                    jumpTo(0);
                }
            });
        }
    }
    SystemBuy = [false, 'listgroup'];
    $("#cover").hide();
    try {
        $('#list').touchScroll('setPosition', 0);
    } catch (e) { catche(e); }
    //alert(isAlert);
    if (isInrange == false && isAlert == false) {//如果不在范围内且没有提示
        isAlert = true;
        alert('Your area may not be covered by Bizmap.ca');
        //$("#reportArea").focus();
    }
}
//#endregion
//#region  addClicktoMarker
// make map icon clickable for zoom
var exi;
var gb;
function addClicktoMarker(marker, LatLng, i, exii, isrd) {//i是当前的序号1。2。2，exii是当前的第n个0。1。2  isrd 是否是道路，默认为false
    google.maps.event.addListener(marker, 'click', function () {
        if (hisw) {
            //isclicknum = false;
            // map.panTo(LatLng);
            //#region 关闭十字提示框
            if ($("#cross").is(":visible")) {
                closecross();
            }
            //#endregion

            //#region  打开第i个详细页
            //如果是同一个，且已经打开，则不动
            //list table tbody tr td
            //var xi = document.getElementById("list").childNodes[i].childNodes[0].childNodes[0].childNodes[1].childNodes[1];
            //var xi = $("#list").children()[i].children()[0].children()[0].children()[1].children()[1]
            if (!isNaN(i)) {//序号
                // // //debugger;;
                if (monitor.gps(LatLng)) {
                    map.panTo(LatLng);
                }
                if (exi == i) {//如果是同一个，则放大
                    //                if (!isrd) {
                    //                    $("#page3_details").show();
                    //                }
                    //if i is the same one ,zoom on
                    //if("<div id="page3_detail"> </div>")
                    //$("#page3_details").show();
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
                }
                else {
                    try {
                        //debugger;
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
                        if (isrd) {
                            ico = document.getElementById("list").childNodes[exii].childNodes[0].childNodes[0].childNodes[0].childNodes[1];
                            ico.style.backgroundImage = 'url("./images/icon_L.png")';
                        }
                        else {
                            ico = document.getElementById("list").childNodes[2 * exii + 1].childNodes[0].childNodes[0].childNodes[1].childNodes[0];
                            icoTab = document.getElementById("list").childNodes[2 * exii + 1];
                            //ico.style.backgroundImage = 'url("./images/Icon_b_none.png")';
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
                        $("#list table").css('-webkit-box-shadow', 'none');
                        icoTab.id = "table" + parseInt(Math.random() * 100);
                        $("#" + icoTab.id).css('-webkit-box-shadow', '#999 0px 0px 10px 0px');
                        /* 
                        $("#" + icoTab.id).click();
                        icoTab.id = "";
                        */
                        var tico1 = ico.parentNode;
                        tico1.id = "td" + parseInt(Math.random() * 100);
                        //$("#" + tico1.id).click();
                        tico1.id = "";
                        //#endregion
                        wf = true;
                        //wf = false;
                        //ff
                        //var xi = document.getElementById("list").childNodes[2 * i + 1].childNodes[0].childNodes[0].childNodes[3].childNodes[0].click();
                        //webkit
                        var xi = document.getElementById("list").childNodes[2 * exii + 1].childNodes[0].childNodes[0].childNodes[3].innerHTML; //.childNodes[0].outerHTML;
                        var para = xi.split("click_details(")[1].split(')">')[0].split("','");
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
                        clearTimeout(gb);
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
                            var listNode = document.getElementById("list");
                            for (var j = 0; j < parseInt(exii); j++) {
                                ScrollHeight += listNode.childNodes[2 * j + 1].clientHeight + 1;
                            }
                            try {
                                $('#list').touchScroll('setPosition', ScrollHeight); // - 50
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
                        centerwithGPS(tplat, tplng, parseInt(i), null, null, null, null, null, true, exii, false, 1);
                        if (monitor.gps(LatLng)) {
                            map.panTo(LatLng);
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
        }
    });
}
function getback() {
    return true;
    var scrollY = $('#list').touchScroll('getPosition');
    //alert(scrollY);
    try {
        //$('#list').touchScroll('setPosition', 0);
        hideisearch(2);
        setTimeout('$("#tools").height(0);$("#tool,#tools").hide();', 1);
        bhi = true;
        $('#list').touchScroll('setPosition', (parseInt(scrollY) + 50));
    } catch (e) { catche(e); }

}
var exxxi = null;
var exxxitime = 0;
function fourstep(la, lg, i) {
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
            if (map.getZoom() < 17) {
                map.setZoom(map.getZoom() + 1);
            }
            if (map.getZoom() == 17) {
                map.setZoom(18);
            }
            if (map.getZoom() > 17 && map.getMapTypeId() == 'roadmap') {
                map.setMapTypeId(google.maps.MapTypeId.HYBRID);
            }
        }
        if (map.getZoom() > 17) {//&& map.getMapTypeId() == 'roadmap'
            map.setMapTypeId(google.maps.MapTypeId.HYBRID);
        }
    }
    if (!isNaN(i)) {
        centerwithGPS(la, lg, i, '', '', '', '', '', true, 1, false, '1');
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
function centerwithGPS(plat, plng, k, a, slat, slng, elat, elng, isk, exkk, isc, from) {
    //plat:纬度
    //plng:经度
    //k：第N个【1，2……】可重复
    //a:类型【notbiz】
    //isk 是否对k进行处理  
    //isc  是否两点居中
    //from 1:列表左边的按钮
    //exkk:第n个，不可重复【1.2.3...】

    if ((exk == k) && (!isk) && (from != '1')) {//是前一个，且不要对k进行处理
        center1 = new google.maps.LatLng(plat, plng);
        if (monitor.gps(center1)) {
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
            //普通商家
            //#region imgae
            var image = new google.maps.MarkerImage('images/' + knam + '.png',
        new google.maps.Size(20, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34));
            //#endregion
            var remark = new google.maps.LatLng(plat, plng);
            var markerlist = new google.maps.Marker({
                position: remark,
                map: map,
                icon: image,
                zIndex: 1000
            });
            //if (exkk != "" && exkk != null) {
            addClicktoMarker(markerlist, remark, k, exkk);
            //        }
            //        else {
            //            addClicktoMarker(markerlist, remark, k, k);
            //        }
            markersArray.push(markerlist);
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
            //if (exkk != "" && exkk != null) {
            addClicktoMarker(markerlist, remark, k, exkk);
            addClicktoMarker(markerlist1, remark, k, exkk);
            //        }
            //        else {
            //            addClicktoMarker(markerlist, remark, k, k);
            //        }
            markersArray.push(markerlist);
            markersArray.push(markerlist1);
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
        if (!isk || isc) {
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


            if ((exkk != exn) || (jo)) {
                var swp = new google.maps.LatLng(sw_x, sw_y);
                var nep = new google.maps.LatLng(ne_x, ne_y);
                var boundp = new google.maps.LatLngBounds(swp, nep);
                map.fitBounds(boundp);
                exn = exkk;
                jo = false;
            }
            else {
                center1 = new google.maps.LatLng(plat, plng);
                if (monitor.gps(center1)) {
                    map.panTo(center1);
                    map.setCenter(center1);
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
        if (x == "b") {
            return "" + latlng1.lat();
        }
        else {
            return "" + latlng1.lng();
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
    $("#showsaved, #showshared, #showaccount").css("margin-left", "18px");
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
                tacc1 += '<div id="MsgInfo"><span>Sign up to start collecting points and enjoy our monthly lucky draw for iPhones and many more.</span>';
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
    window.location.href = "Login.aspx?type=signup";
}
function s2Info() {
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
            if (!isNaN(who1) && who1 >= 1000000 && who2 == "bizmap.ca") {//1000000@bizmap.ca
                level = 1;
            }
            else if (who == 'admin@bizmap.ca') {
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
                        $('#monthtdiv1').touchScroll();

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
    // debugger;a6
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

//#region biz   click_details
//#region  click_details(a, b, c, d, e) 
// click business name on search result to get into detail page. which will have pictures and business hours and deals
var wf = false; //where from    from map ,no center  default false
function click_details(a, b, c, d, e, f, g, h, i, j, k, plat, plng, ccode, th, exii, dis, scode, biz_hours) {
    //$("#container").css("position", "initial");
    showswitch = false;
    $("#zoom6,#zoom8,#zoom10").hide();
    $('#gpsy').css('right', '0px');
    $('#gpsInMap').css({ 'top': '0px !important', 'right': '0px' });
    $('#croInMap').css('top', '0px !important');
    $("#page3_details").html('<div id="page3_detail"></div><div id="p3_ownernotes"></div>');
    /* debugger;
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
    $("#page3_details").css("background-color", "#d7d8d9");
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
        $("#page3_detail").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo" cellpadding="0" cellspacing="0"><tr><td><table id="p3_title" cellpadding="0" cellspacing="0"><tr onclick="centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'' + 1 + '\',\'\',\'\',\'\',\'\',\'\',true,1,true)"><td style="width: 27px;"><div class="bizListIcon" style="background-image: url(\'./images/Icon_b_none.png\');">' + 1 + '</div></td><td id="biz_name"></td></tr></table></td></tr><tr><td id="biz_info" class="details"></td></tr><tr><td id="biz_address" class="details"></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td></tr></table>'); //<div id="p3_ownernotes"></div>
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
        details += '<table id="p3_bizinfo" cellpadding="0" cellspacing="0"><tr><td><table id="p3_title" cellpadding="0" cellspacing="0"><tr onclick="centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'' + k + '\',\'\',\'\',\'\',\'\',\'\',\'\',true,0,true,\'1\')"><td style="width: 27px;"><div class="bizListIcon" style="background-image: url(\'./images/Icon_b_none.png\');">' + k + '</div></td><td id="biz_name"></td></tr></table></td></tr><tr><td id="biz_info" class="details" colspan="2"></td></tr><tr><td id="biz_address" class="details"></td></tr><tr><td id="biz_phone" class="details"></td></tr>';
        details += '<tr><td id="biz_code" class="details">Share link:<input id="ccode" type="text" value="bizmap.ca/?' + ccode + '" ></td></tr>';

        details += '</table></td></tr><tr><td class="blank"></td></tr>'; //中间间隙
        //下部扩展信息
        //details += '<tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr>';
        details += '<tr><td><table id="p3_bizinfo1" cellpadding="0" cellspacing="0"><tr><td id="biz_hours" class="details"></td><td id="imgbiz"><img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /></td></tr><td id="biz_Fax" class="details" colspan="2"></td></tr><tr><td id="biz_Email" colspan="2" class="details"></td></tr><tr><td id="biz_Website" colspan="2" class="details"></td></table></td></tr>';

        //details += '<tr><td id="reporttd"><div class="cross6" onclick="newReport(\'' + ccode + '\',\'' + plat + '\',\'' + plng + '\')">Report</div> </td></tr></table>';
        details += '<tr><td id="reporttd"><div class="cross4" onclick="shareBiz(true,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="shareBiz">Share</div><div class="cross5" onclick="saveSearch(\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="saveBiz">Save</div></td></tr></table>';
        var fun;
        //if (storage.getItem("account") != null && storage.getItem("account") != "") { style="border-bottom: 1px solid orange;"--<td rowspan="3"><table id="bizpic" cellpadding="0" cellspacing="0"></table></td>

        //2012.03.01取消限制
        $("#p3_ownernotes").html('<div class="cross6" onclick="newReport(\'' + ccode + '\',\'' + plat + '\',\'' + plng + '\')">Report</div><div class="close"  id="closeDetails0" onclick="closeDetails(1);"><span class="chahao">×</span></div><div class="close"  id="closeDetails" onclick="closeDetails(2);"><span class="chahao">×</span></div>');

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

        //<div id="closeDetails1" onclick="closeDetails();"><span class="chahao">×</span></div>
    }
    //#endregion
    //#region Saved
    else {
        //$("#page3_detail").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo"><tr><td id="biz_name" class="details"></td></tr><tr><td id="biz_info" class="details"></td></tr><tr><td id="biz_address" class="details"></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td><td><table id="bizpic" cellpadding="0" cellspacing="0"><tr><td><img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr></table><div id="p3_ownernotes"><div class="cross4" onclick="shareBiz(false,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="shareBiz">Share</div><div class="cross5" style="color: gray;" id="saveBiz">Save</div><div id="closeDetails" onclick="closeDetails();"><span class="chahao">×</span></div></div>'); //<div id="closeDetails1" onclick="closeDetails();"><span class="chahao">×</span></div>
        //$("#page3_detail").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo"><tr><td id="biz_name" class="details" colspan="2"></td></tr><tr><td id="biz_info" class="details" colspan="2"></td></tr><tr><td id="biz_address" class="details"></td><td rowspan="3"><table id="bizpic" cellpadding="0" cellspacing="0"><tr><td id="imgbiz"><img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td></tr></table><div id="p3_ownernotes"><div class="bizListIcon" onclick="centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'' + 1 + '\',\'\',\'\',\'\',\'\',\'\',true,1,true)" style="background-image: url(\'./images/Icon_b_none.png\');">' + 1 + '</div><div class="cross4" onclick="shareBiz(false,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\')" id="shareBiz">Share</div><div class="cross5" style="color: gray;" id="saveBiz">Save</div><div id="closeDetails" onclick="closeDetails();"><span class="chahao">×</span></div></div>');
        //$("#page3_detail").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo"><tr><td style="border-bottom: 1px solid orange;" colspan="2"><table cellpadding="0" cellspacing="0"><tr><td style="width: 27px;"><div class="bizListIcon" onclick="centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'' + 1 + '\',\'\',\'\',\'\',\'\',\'\',true,1,true)" style="background-image: url(\'./images/Icon_b_none.png\');">' + 1 + '</div></td><td id="biz_name" class="details"></td></tr></table></td></tr><tr><td id="biz_info" class="details" colspan="2"></td></tr><tr><td id="biz_address" class="details"></td><td rowspan="3"><table id="bizpic" cellpadding="0" cellspacing="0" ><tr><td id="imgbiz"><img src="" id="imgbiz0" onclick="javascript:showBizImg(1);" name="imgbiz0" onerror=\'imgError1(this.id)\' alt="" /></td></tr><tr><td><div id="biz_hours"></div></td></tr></table></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td></tr></table><div id="p3_ownernotes"><div class="cross4"  onclick="shareBiz(false,\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',\'' + scode + '\')" id="shareBiz">Share</div><div class="cross5" onclick="saveSearch(\'' + a + '\',\'' + tb + '\',\'' + c + '\',\'' + d + '\',\'' + ccode + '\',true,false,\'' + scode + '\')" id="saveBiz">Save</div><div id="closeDetails" onclick="closeDetails();"><span class="chahao">×</span></div></div>');
        $("#page3_detail").html('<table id="p3_top" style="border: 0px;"><tr><td style="vertical-align: top;width: 210px;"><table id="p3_bizinfo" cellpadding="0" cellspacing="0"><tr><td colspan="2"><table id="p3_title" cellpadding="0" cellspacing="0"><tr onclick="centerwithGPS(\'' + plat + '\',\'' + plng + '\',\'' + 1 + '\',\'\',\'\',\'\',\'\',\'\',true,1,true)"><td style="width: 27px;"><div class="bizListIcon" style="background-image: url(\'./images/Icon_b_none.png\');">' + 1 + '</div></td><td id="biz_name" class="details"></td></tr></table></td></tr><tr><td id="biz_info" class="details"></td></tr><tr><td id="biz_address" class="details"></td></tr><tr><td id="biz_phone" class="details"></td></tr><tr><td id="biz_Fax" class="details"></td></tr><tr><td id="biz_Email" class="details"></td></tr><tr><td id="biz_Website" class="details"></td></tr></table></td></tr></table>'); //<div id="p3_ownernotes"></div>
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
            info = info.split('￥');
            biz_hours = info[0];
            e = info[1];
            e1 = info[2];
            /* if (biz_hours && biz_hours.length > 0) {
            $("#biz_hours").html("open time:<br>" + biz_hours);
            $("#biz_hours").show();
            }*/

            var Time = '<div id="time"><div id="time1">' + biz_hours + '</div></div>';
            $("#biz_hours").html(Time);
            //        $("#biz_hours").html("open time:<br>" + biz_hours);
            //$("#time").css('position','absolute');
            $("#biz_hours").show();

            //照片
            if (ccode && ccode.length > 0 && e && e.length > 0) {
                //生成imgbiz10
                if (!document.imgbiz10) {
                    var imgbiz10 = '<img id="imgbiz10" onclick="showBizImg(2)">';
                    var coverbody = '<div id="coverbody" onclick="showBizImg(2)"></div>';
                    $("#form1").append(coverbody);
                    $("#form1").append(imgbiz10);

                }
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
            setTimeout("$('#time1').touchScroll()", 100);
            if (biz_hours || e || biz_hours.length > 0 || e.length > 0) {
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
            }
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
        $(".cross4").css('margin-left', '60px');
        $(".cross5").css('margin-left', '185px');
    }
    $("#biz_name").html(b);
    if ((b.indexOf("Saved Location:") != 0) && (b.indexOf("Shared Location:") != 0) && d) {
        if (dis) {
            $("#biz_phone").html("Tel: <a style=\"font-weight: bold;\" href='tel:" + d + "'>" + d + "</a><a id='dis' onclick='fourstep(" + plat + "," + plng + ")'>" + dis + "</a>");
        }
        else {
            $("#biz_phone").html("Tel: <a  style=\"font-weight: bold;\" href='tel:" + d + "'>" + d + "</a>");
        }
    }
    else if (dis) {
        $("#biz_phone").html("<a id='dis' onclick='fourstep(" + plat + "," + plng + ")'>" + dis + "</a>");
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
        if (!document.imgbiz10) {
            var imgbiz10 = '<img id="imgbiz10" onclick="showBizImg(2)">';
            var coverbody = '<div id="coverbody" onclick="showBizImg(2)"></div>';
            $("#form1").append(coverbody);
            $("#form1").append(imgbiz10);

        }
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

    //#region 地图页变形
    //debugger;
    //    开业时间              传真              email           网站          照片
    try {

        if (biz_hours || f || g || h || e || biz_hours.length > 0 || f.length > 0 || g.length > 0 || h.length > 0 || e.length > 0) {
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
    $("#p3_ownernotes").show();
    $("#biz_info").hide();
    $("#map,#map_canvas").height(210);
    $("#tools,#tool,#page3_details").css({ top: '210px' });
    google.maps.event.trigger(map, 'resize');
    //debugger;
    $("#page1").height($("#map").height() + $("#page3_details").height());
    $("#coverbody").height($("#page1").height());
    //#endregion


    //#region page3_details
    google.maps.event.addDomListener(document.getElementById("page3_details"), 'touchstart', function (e) {
        $("#tools").height(0);
        $("#tool,#tools").hide();
        bhi = true;
        //toTop();
    });
    /* google.maps.event.addDomListener(document.getElementById("page3_details"), 'touchmove', function (e) {
    e.preventDefault();
    });
    google.maps.event.addDomListener(document.getElementById("page3_details"), 'touchend', function (e) {

    toTop();
    });
    */
    //#endregion
    //$('#page3_detail').touchScroll();
    //$('#page3_detail').touchScroll('setPosition', 0);
}
//function getid(id) { return document.getElementById(id) }
//#endregion

function bizEve() {
    //debugger;
    if (iPhoneOrientation == 0) {
        $("#map,#map_canvas").height(255);
        $("#page1").height(416);
        $("#tools,#tool,#page3_details").css({ top: '257px' });
        google.maps.event.trigger(map, 'resize');
        $("#p3_ownernotes").hide();
        //$("#page3_details").height(160);
    }
}
//shareBiz(true, '8696', 'Embrujo Flamenco Tapas Restaurant', '97 Danforth Ave , Toronto , ON', '416-778-0007', 'Gd7l97')
//shareBiz(true, ''    , 'Saved Location: 9/27/2011'        , '123'                           , ''            , '0')
var shareexist = false;
var detial = "";
function shareBiz(bizid, uaid, name, addr, uph, ccode, scode) {
    bizEve();

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
        var url = "bizmap.ca/?" + scode;
        //name = name.replace("#39#", "'");
        name = ReplaceF(name);
        $("#page3_details").html("");
        $("#page3_details").hide();
        $("#page3_details").html("<div id='page3_detail'></div>");
        $("#page3_detail").html("<br><br><div id='p'><a style='font-size: medium;font-weight: bolder;'>Share location : </a>&nbsp;&nbsp;&nbsp; <span id=\"url\">" + url + "</span><br>" + name + "<br><br><div  onclick=\"closep1()\"  class='cross1'><a href='mailto:?Subject=shared%20Location&body=bizmap.ca/?" + ccode + "'>E-Mail</a></div><div  onclick=\"sharebySMS('" + ccode + "')\"  class='cross2'><a>SMS</a></div><div onclick=\"closep1()\" class='cross3'><a href='tweetie:///post?message=Share location from bizmap. bizmap.ca/?" + ccode + "'>Twitter</a></div></div><div onclick=\"closep2(1)\" class='close' id=\"closep\"><span class=\"chahao\">×</span></div>");
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
                    shareBiz1(scode, addr, gpsLL);
                    //#region 添加信息到本地存储
                    try {
                        var taarshared = storage.getItem("arrShared");
                        storage.removeItem("arrShared");
                    } catch (e) { catche(e); }
                    if (taarshared == null) {
                        taarshared = "";
                    }
                    var tname = name.replace('Saved', 'Shared');
                    taarshared = tname + "￥" + addr + "￥" + scode + ";" + taarshared;
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
                if (Tsavedidarr[i][4] == ccode) {
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
            taarshared = uaid + "￥" + name + "￥" + addr + "￥" + uph + "￥" + ccode + "￥" + date + ";" + taarshared;
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
        var url = "bizmap.ca/?" + ccode;
        //name = name.replace("#39#", "'");
        name = ReplaceF(name);
        $("#page3_details").hide();
        $("#page3_details").html("");
        $("#page3_details").html("<div id='page3_detail'></div>");
        $("#page3_detail").html("<br><br><div id='p'><a style='font-size: medium;font-weight: bolder;'>Share location : </a>&nbsp;&nbsp;&nbsp; <span id=\"url\">" + url + "</span><br>" + name + "<br><br><div  onclick=\"closep1()\"  class='cross1'><a href='mailto:?Subject=shared%20Location&body=bizmap.ca/?" + ccode + "'>E-Mail</a></div><div  onclick=\"sharebySMS('" + ccode + "')\"  class='cross2'><a>SMS</a></div><div onclick=\"closep1()\" class='cross3'><a href='tweetie:///post?message=Share location from bizmap. bizmap.ca/?" + ccode + "'>Twitter</a></div></div><div onclick=\"closep2(1)\" class='close' id=\"closep\"><span class=\"chahao\">×</span></div>");
        $("#page3_details").show();
    }
}
function shareBiz1(scode, addr, gpsLL) {//share saved
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
            var url = "bizmap.ca/?" + scode;
            $("#page3_detail").html("<br><br><div id='p'><a style='font-size: medium;font-weight: bolder;'>Share location : </a>&nbsp;&nbsp;&nbsp;<span id=\"url\">" + url + "</span><br><br><div onclick=\"closep()\" class='cross1'><a href='mailto:?Subject=shared%20Location&body=bizmap.ca/?" + ccode + "'>E-Mail</a></div><div onclick=\"sharebySMS('" + ccode + "')\" class='cross2'><a>SMS</a></div><div onclick=\"closep()\" class='cross3'><a href='tweetie:///post?message=Share location from bizmap. bizmap.ca/?" + ccode + "'>Twitter</a></div></div><div onclick=\"closep()\"  class=\"close\" id=\"closep\"><span class=\"chahao\">×</span></div>");
        }
    });
}

function closep() {
    //$('#page3_detail').touchScroll('update');
    //$('#page3_details').touchScroll('setPosition', 0);
    $("#page3_details").hide();
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
function sharebySMS(code, num) {
    var a = prompt("Please copy the address below and paste it in SMS to share.", "bizmap.ca/?" + code);
    if (a != "" && a != null) {
        if (num == 1) {
            shareajax(code);
        }
        closep1();
        window.open('sms:');
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
function closep1() {
    $("#page3_details").css("background-color", "#d7d8d9");
    $("#page3_detail").html('<div id="Lsd">Shared location saved.</div><br><br><br><br><div id="closeDetails1" class="close" onclick="closeDetails();"><span class="chahao">×</span></div><div id="backonList" onclick="click_back()">Go Back</div><div id="closeDetails2" class="close" onclick="closeDetails();"><span class="chahao">×</span></div>');
    $("#backonList").css({ "margin-left": "74px", "margin-top": "-6px" });
    $("#closeDetails2,#closeDetails1").css("margin-top", "-10px");
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

//#reion 当地图中图标变蓝色时，列表中的图标也相应变蓝色。
var exnum;
var tico;
var extype; // 'biz'  ''
function cc(th, f) { //changecolor(this,from)  from  [0:列表序号  1:详细页序号按钮  2:ATM  3:距离]
    ////debugger;
    isclicktable = false;
    // $(".plus").html('<img src="images/zoomin.png">');
    var isexi = false; //是否存在
    ////debugger;
    try {
        if (exnum) {
            if (!f) {
                //如果背景是蓝色
                if (th.childNodes[0].style.backgroundImage.indexOf('Icon_b_none') == -1) {
                    exnum.style.backgroundImage = 'url("./images/icon_L.png")';
                    exnum.style.webkitTransition = "-webkit-transform 300ms ease";
                    exnum.style.WebkitTransform = "scale(1)";
                    tico.style.WebkitTransform = "scale(0)";
                    //$(".plus").hide(); //slideUp
                }
                else { isexi = true; }
            }
            if (f == 1) {
                //如果点击按钮 且  图标不是红色
                if (th.style.backgroundImage.indexOf('Icon_b_none') == -1) {
                    exnum.style.backgroundImage = 'url("./images/icon_L.png")';
                    exnum.style.webkitTransition = "-webkit-transform 300ms ease";
                    exnum.style.WebkitTransform = "scale(1)";
                    tico.style.WebkitTransform = "scale(0)";
                }
                else { isexi = true; }
            }
            if (f == 2 || f == 3) {
                //如果点击ATM 或距离  且  图标不是红色
                if (th.parentNode.parentNode.childNodes[1].childNodes[0].style.backgroundImage.indexOf('Icon_b_none') == -1) {
                    exnum.style.backgroundImage = 'url("./images/icon_L.png")';
                    exnum.style.webkitTransition = "-webkit-transform 300ms ease";
                    exnum.style.WebkitTransform = "scale(1)";
                    tico.style.WebkitTransform = "scale(0)";
                }
                else { isexi = true; }
            }
        }
    } catch (e) { catche(e); }
    try {
        if (f == null) {
            var ico = th.childNodes[0];
            ico.style.backgroundImage = 'url("./images/Icon_b_none.png")';
            exnum = ico;
            if (!isexi) {
                //debugger
                tico = ico.parentNode.parentNode.childNodes[4].childNodes[1].childNodes[1];
                tico.id = "plus" + parseInt(Math.random() * 100);
                tico.style.webkitTransition = "-webkit-transform  300ms ease";
                tico.style.WebkitTransform = "scale(1.2)";
                setTimeout('tico.style.webkitTransition = "-webkit-transform 300ms ease";tico.style.WebkitTransform = "scale(1)";', 300);
                //$("#" + tico.id).slideDown();
                //tico.id = "";
            }
        }
        else if (f == 1) {//内页小按钮
            //var ico = th.childNodes[0];
            th.style.backgroundImage = 'url("./images/Icon_b_none.png")';
        }
        else if (f == 2 || f == 3) { //点击商家变色//点击距离
            var ico = th.parentNode.parentNode.childNodes[1].childNodes[0]; //yaobiao************************************
            ico.style.backgroundImage = 'url("./images/Icon_b_none.png")';
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
            ico.style.backgroundImage = 'url("./images/Icon_b_none.png")';
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
        exnum.style.backgroundImage = 'url("./images/Icon_b_none.png")';
    }
    try {
        if (f == null) {
            var ico = th.childNodes[0];
            ico.style.backgroundImage = 'url("./images/icon_L.png")';
            exnum = ico;
        }
        else if (f == 1) {//内页小按钮
            //var ico = th.childNodes[0];
            th.style.backgroundImage = 'url("./images/icon_L.png")';
        }
        else if (f == 2 || f == 3) { //点击商家变色//点击距离
            var ico = th.parentNode.parentNode.childNodes[1].childNodes[0]; //yaobiao************************************
            ico.style.backgroundImage = 'url("./images/icon_L.png")';
            exnum = ico;
        }
        else if (f == 4) {//通过地址进行搜索
            var ico = th.parentNode.childNodes[0].childNodes[0];
            ico.style.backgroundImage = 'url("./images/icon_L.png")';
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
            exnum.style.backgroundImage = 'url("./images/icon_L.png")';
            exnum.style.webkitTransition = "-webkit-transform 300ms ease";
            exnum.style.WebkitTransform = "scale(1)";
            tico.style.WebkitTransform = "scale(0)";
        }
        else {
            exnum.style.backgroundImage = 'url("./images/Icon_b_none.png")';
        }
    }
    try {
        if (f == null) {
            var ico = th.childNodes[1];
            ico.style.backgroundImage = 'url("./images/icon_L.png")';
            exnum = ico;
        }
        else if (f == 1) {//内页小按钮
            //var ico = th.childNodes[0];
            th.style.backgroundImage = 'url("./images/icon_L.png")';
        }
        else if (f == 2 || f == 3) { //点击商家变色//点击距离
            var ico = th.parentNode.parentNode.childNodes[1].childNodes[0]; //yaobiao************************************
            ico.style.backgroundImage = 'url("./images/icon_L.png")';
            exnum = ico;
        }
        else if (f == 4) {//通过道路进行搜索
            var ico = th.parentNode.childNodes[0].childNodes[1];
            ico.style.backgroundImage = 'url("./images/icon_L.png")';
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
    //alert(9080);
    if ($("#tools").is(":visible")) {
        $("#tools").height(0);
        $("#tool,#tools").hide();
        bhi = true;
        return true;
    }
    $("#list table").css('-webkit-box-shadow', 'none');
    th.id = "table" + parseInt(Math.random() * 100);
    //$("#" + th.id).css('-webkit-box-shadow', '#999 0px 0px 10px 0px');

    //-webkit-box-shadow: 1px 1px 25px 5px #999;
    ////2012.03.20 取消点击事件
    //debugger

    th = th.childNodes[0].childNodes[0].childNodes[4].childNodes[1];
    th.id = "dis" + parseInt(Math.random() * 100);
    var a = 'cc31("' + th.id + '")';
    setTimeout(a, 100);
}
function cc31(id) {
    //debugger
    if (isclicktable) {
        $("#" + id).click();
        //isclicktable = false;
    }
    else {
        isclicktable = true;
    }
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

//#region   closeDetails() 
function closeDetails(x) {
    //debugger;$("#container").css("position", "absolute");
    showswitch = true;
    $("#zoom6,#zoom8,#zoom10").hide();
    $('#gpsy').css('right', '0px');
    $('#gpsInMap').css({ 'top': '0px !important', 'right': '0px' });
    $('#croInMap').css('top', '0px !important');
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
        $("#map,#map_canvas").height(255);
        $("#tools,#tool").css({ top: '255px' });
        google.maps.event.trigger(map, 'resize');

    } catch (e) { catche(e); }
    //            document.getElementById("page3_details").style.display = "none";
    $("#page3_details").hide();
    sw = true;
    $("#edit").html("Edit");
    //close image pages
    // document.getElementById("imgBizLarge").style.display = "none";
    $("#imgBizLarge").hide();
    varbizimg = true;
    toTop();
}
//#endregion
var varbizimg = true;
function showBizImg(a) {
    //debugger;
    if (a == 1) {
        if (varbizimg) {
            $("#coverbody").show();
            var left = document.getElementById('imgbiz0').getBoundingClientRect().left + document.body.scrollLeft;
            var top = document.getElementById('imgbiz0').getBoundingClientRect().top + document.body.scrollTop;
            $("#imgbiz10").css({ left: left, top: top });
            $("#imgbiz10").show();
            top = 115 + parseInt(document.body.scrollTop);
            $("#imgbiz10").animate({ width: '310px', height: '250px', top: top, left: '5px' });

            //$("#imgbiz10").fadeIn();
            varbizimg = false;
            //window.scrollTo(0, 60);
        }
        else {
            $("#coverbody").hide();
            var left = document.getElementById('imgbiz0').getBoundingClientRect().left + document.body.scrollLeft;
            var top = document.getElementById('imgbiz0').getBoundingClientRect().top + document.body.scrollTop;
            $("#imgbiz10").animate({ width: '100px', height: '66px', top: top, left: left });
            setTimeout('$("#imgbiz10").hide()', 500);
            varbizimg = true;
        }
    }
    if (a == 2) {
        $("#coverbody").hide();
        var left = document.getElementById('imgbiz0').getBoundingClientRect().left + document.body.scrollLeft;
        var top = document.getElementById('imgbiz0').getBoundingClientRect().top + document.body.scrollTop;
        $("#imgbiz10").animate({ width: '100px', height: '66px', top: top, left: left });
        setTimeout('$("#imgbiz10").hide()', 500);
        varbizimg = true;
    }
}
//#endregion

//#region SAVED
function savedToDB(type, notes, date, gps) {
    // //debugger;;
    //自定义saved   savedToDB('L', notes, date, gpsLL);
    //biz           savedToDB('B', ccode, date);
    //自定义shared  savedToDB('LL', addr, tname, gpsLL);
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

//#region tese设备
function testIOS() {
    if ((verStr.indexOf("iPhone") != -1) && (verStr.indexOf("Version/5.1") != -1)) {
        $("#keywords2").width('190px');
    }
    else if (verStr.indexOf("iPhone") == -1) {
        // $("#keywords2").width('170px');
    }
    else {
        $("#keywords2").css("margin-left", "-17px");
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
        listMenu(arrList);
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
    ////debugger;
    if (e.line != '1') {
        //alert(e.sourceURL + ";" + e.line + ";" + e.message);
        jsErrorMSG += "<br />file:" + e.sourceURL + "; line:" + e.line + "; message:" + e.message;
    }
    else {
        jsErrorMSG += "<br />file:" + e.sourceURL + "; message:" + e.message;
        //alert(jsErrorMSG);
    }
}
//#endregion
var SystemBuy = [false, 0]; //系统繁忙
var mapStatus = false;  //地图载入状态
//#endregion

//#region setTimeout最新用法
//var q = "alert(7131)";
//setTimeout(q, 3000);
//#endregion

setInterval('kw2change();', 200);
//$('body').css('background', '#6070A4');
$("#editDone").html('Edit');
setTimeout('toTop()', 1000);
setTimeout('toTop()', 2000);
$("#page1").show();
$("#keywords2").width("81%");
//alert(window.screen.deviceXDPI);
//alert(window.screen.height);//480
//alert(window.screen.width); //320
var iPhoneOrientation = 0;
function orientationChange(para) {
    //alert(window.orientation);

    //debugger
    switch (window.orientation) {
        case 0:
            if (para != '1') {
                //alert(para);
                XY();
            }
            break;
        case 180:
            if (x != '1') {
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
        clearTimeout(xy1);
    } catch (e) { catche(e); }

    iPhoneOrientation = 90;
    $("#page3_details").hide();
    toTop();
    // $("body,#page0").width('100%');
    $("body,#page0").height(270);
    //$('#kw2').width(380);
    setTimeout("$('#keywords2').width(330)", 500);
    //$('#keywords2').css('border', '1px grey solid');
    $("#menu,#menu1").height(165);
    //setTimeout("$('#saved div').css('margin-left', '60px')", 500);
    //setTimeout("alert($('#map').width())", 1000);
    $('.chacha').css('left', '321px');
    $("#s1Info, #s2Info, #s3Info").css('margin', '5px 15px');
    $("#map,#map_canvas").height(268);
    $("#mapcor3,#mapcor4").css('top', '248px');
    google.maps.event.trigger(map, 'resize');
    $("#tools,#tool").css('top', '223px');
    //alert(parseFloat($("#map").width() / 2 - 15));225
    //alert(parseFloat($("#map").height() / 2 - 15));119
    $("#centerControlDiv").css({ 'left': '225px !important', 'top': '119px !important' });
    $("#cross").css('top', '280px');
    $("#savedinfo,#si,#copyrightCanvas,#copyrightText").height(170);
    $("#Pri").hide(); //$("#Pi// .Pimg").css('margin-left', '75px');
    $("#s3Info,#a5").css('color', 'grey');
    //alert(document.body.style.height);
    //alert(document.body.style.width);
    try {
        $('#si').touchScroll('update');
        $('#copyrightText').touchScroll('update');
    } catch (e) { }
} //XZ();
var xy1;
function XY() {
    iPhoneOrientation = 0;
    toTop();
    $("body").height(415);
    $('#keywords2').width('81%');
    $("#menu,#menu1").height(316);
    $('.chacha').css('left', '167px');
    $("#s1Info, #s2Info, #s3Info").css('margin', '15px');
    $("#map,#map_canvas").height(255);
    $("#mapcor3,#mapcor4").css('top', '235px');
    google.maps.event.trigger(map, 'resize');
    $("#tools,#tool").css('top', '255px');
    $("#centerControlDiv").css({ 'right': '145px !important', 'top': '110.5px !important' });
    $("#cross").css('top', '256px');
    $("#savedinfo,#si,#copyrightCanvas,#copyrightText").height(310);
    $("#s3Info,#a5").css('color', 'blue');
    //$(".Pimg").css('margin-left', '30px');
    /*  $("#Pri").height(415);
    if ($("#Pri").is(":visible")) {
    $("#Pri").hide();
    //$("#Pri").show();
    }*/
    try {
        $('#si').touchScroll('update');
        $('#copyrightText').touchScroll('update');
    } catch (e) { }
    $('html body').css({ 'left': '0px', 'top': '0px' });
    //alert($('body').css('height'));
    toTop();
    xy1 = setTimeout("$('#keywords2').width('81%');$('.chacha').css('left', '167px')", 500);
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
function testMyGPS() {
    if (gpsState == 0) {
        watchgps(3);
    }
}
//setInterval('testMyGPS()', 5000);
//#endregion

