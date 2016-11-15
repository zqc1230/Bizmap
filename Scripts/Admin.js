function testAccount() {
    var uid = jQuery.trim($("#uid").val());
    if (!(uid && uid != "")) {
        backborder('uid');
    }
    else {
        backborder();
    }
}
function testPassword() {
    var uid = jQuery.trim($("#uid").val());
    var pwd = jQuery.trim($("#pwd").val());
    if (uid && uid != "") {
        if (pwd == "") {//hefeibizmap
            backborder();
            Login();
        }
    }
    else {
        backborder('uid');
    }
}
var storage = window.localStorage;
var who;
$(document).ready(function () {
    $('body').css('height', screen.height);
    $("#l").click(function () {
        testPassword();
    });
    /* $("form").submit(function () {
    try {
    testPassword();
    } catch (e) {

    }
    return false;
    });*/
    if (storage.getItem("account") != null && storage.getItem("account") != "") {
        who = storage.getItem("account");
        storage.setItem("uid", storage.getItem("account"));
    }
    $("#uid").val(who);
    //#region menu

    $("#menu2").live('click', function () { menubgcolor('menu2'); });
    $("#menu3").live('click', function () { menubgcolor('menu3'); });
    $("#menu4").live('click', function () { menubgcolor('menu4'); });
    $("#menu5").live('click', function () { menubgcolor('menu5'); });
    $("#menu6").live('click', function () { menubgcolor('menu6'); });
    $("#menu7").live('click', function () { menubgcolor('menu7'); });
    //#endregion
    $('#o-c').click(function () {
        if ($('#td1').is(":visible")) {
            $('#td1').hide();
            document.getElementById('o-c').src = 'handle_open.png';
            return false;
        }
        else {
            $('#td1').show();
            document.getElementById('o-c').src = 'handle_close.png';
        }
    });
    time();
});
function fap() {
    //    $("#l").html('Abort');
    //    setTimeout('$("#l").html("Login");',1000);
    //    try {
    //        loajax.abort();
    //    } catch (e) {
    //    }
}
function Login() {
    $("#l").html('<img src="images/loading/loading13.gif" />');
    var uid = jQuery.trim($("#uid").val());
    var pwd = jQuery.trim($("#pwd").val());
    var loajax = $.ajax({
        url: 'Handler/Management.ashx',
        type: 'POST',
        data: {
            Login: uid,
            pwd: pwd
        },
        success: function (info) {
            if (info != 'true') {
                storage.setItem("uid", uid);
                who = uid;
                $("#Login").hide();
                Main1(uid);
            }
            else {
                $("#l").width('135px');
                $("#l").html('Account Error');
                setTimeout('$("#l").html("Login");$("#l").width("65px");', 1000);
                //$('#Login').css('background-color', 'grey');
                // $("#Login").slideUp(50000);
            }
        },
        error: function () {
            $("#l").html('Login');
            $('#Login').css('background-color', 'grey');
            //$("#Login").slideUp(50000);
        }
    });
}
var fswi = true; //focus switch
function backborder(x) {
    var arrb = ["uid", "pwd"];
    for (i in arrb) {
        if (arrb[i] != x) {
            $("#" + arrb[i]).css("border", "1px solid gray");
        }
        else {
            $("#" + arrb[i]).css("border", "1px solid red");
            if (fswi) {
                //$("#" + arrb[i]).focus();
            }
            fswi = !fswi;
        }
    }
}
function Main1(id) {
    var twho = 'Welcome: ' + who;
    $('#who').html(twho);

    if (!id) { return false; }
    $("#main").show();
    var menudiv = "";
    var menunum = 5;
    for (var i = 1; i <= menunum; i++) {
        menudiv += '<div id="menu' + i + '" class="menu"></div>';
    }
    //var navi = '<div id="menu1" onclick="menu1()" class="menu"></div><div id="menu2" onclick="menu2()" class="menu"></div><div id="menu3" onclick="menu3()" class="menu"></div><div id="menu4" onclick="menu4()" class="menu"></div><div id="menu5" onclick="menu5()" class="menu"></div>';
    $("#navi").html(menudiv);
    var menutext = ["Ccode Management", "Index Management", "Point Management", "Lucky Draw", "arrange file"];
    for (var i = 0; i < menunum; i++) {
        $('#menu' + (i + 1)).html(menutext[i]);
    }
    AboutMenu1();
    AboutMenu2();
    AboutMenu3();
    AboutMenu4();
    AboutMenu5();
    return true;
}
function menubgcolor(id) {
    //var menus = $(".menu");
    $(".menu").css('background-color', 'transparent');
    $("#" + id).css('background-color', '#277');
}
//storage.setItem("gccode", 1);//1已经完成 0 正在执行
//        pinfo += "<td class='td11'>existing biz data:</td><td id='ed' class='td12'><img src='images/loading/loading11.gif' /></td><td class='td10'></td><td class='td11'>existing Ccode:</td><td id='ec' class='td12'><img src='images/loading/loading11.gif' /></td></td><td class='td10'></td><td class='td11'>Lack of Ccode:</td><td id='lc' class='td12'><img src='images/loading/loading11.gif' /></td><td class='td100'><center><div id='gccode'>Generating Ccode</div></center></td></tr><tr><td colspan='9' id='progress'></td></tr><tr><td class='td11'> ";
// pinfo += "<tr><td class='td11'></td><td class='td12'></td></tr>";
function AboutMenu1() {
    $("#menu1").live('click', function () {
        var pinfo = "<div id='CcodeManagement' class='contextMenu'  oncontextmenu='RightFunction(\"CcodeManagement\")'><table  cellpadding='0' cellspacing='0' >";
        pinfo += "<tr><td class='td11'>已存在数据:</td><td id='ed' class='td12'><img src='images/loading/loading11.gif' /></td><td class='td10'></td><td class='td11'>已存在Ccode:</td><td id='ec' class='td12'><img src='images/loading/loading11.gif' /></td></td><td class='td10'></td><td class='td11'> Ccode 欠缺:</td><td id='lc' class='td12'><img src='images/loading/loading11.gif' /></td><td class='td100'><center><div id='gccode'>Generating Ccode[main_nuit]</div></center></td></tr><tr><td colspan='9' id='progress'></td></tr> ";
        pinfo += "<tr><td class='td11'>已存在数据:</td><td id='ed1' class='td12'><img src='images/loading/loading11.gif' /></td><td class='td10'></td><td class='td11'>已存在Ccode:</td><td id='ec1' class='td12'><img src='images/loading/loading11.gif' /></td></td><td class='td10'></td><td class='td11'> Ccode 欠缺:</td><td id='lc1' class='td12'><img src='images/loading/loading11.gif' /></td><td class='td100'><center><div id='gccode1'>Generating Ccode[main_nuit1]</div></center></td></tr><tr><td colspan='9' id='progress1'></td></tr> ";

        pinfo += "</table></div>";
        $("#pannel").html(pinfo);
        $.ajax({
            url: 'Handler/Management.ashx',
            type: 'POST',
            data: {
                CcodeManagement: who
            },
            success: function (info) {
                if (info) {
                    info = info.split(';');
                    $("#ed").html(info[0]); //已存在数据[main_nuit]
                    $("#ec").html(info[1]); //已存在Ccode[main_nuit]

                    $("#ed1").html(info[2]); //已存在数据[main_nuit1]
                    $("#ec1").html(info[3]); //已存在Ccode[main_nuit1]

                    $("#lc").html(info[0] - info[1]); //缺少的
                    $("#lc1").html(info[2] - info[3]); //缺少的

                    //=======================
                    var pc = info[1] / info[0];
                    if (storage.getItem("gccode") == 0) {
                        $("#gccode").html("<img src='images/loading/loading11.gif' />");
                    }
                    if (pc == 1) {
                        $("#gccode").html("Generating Ccode[main_nuit]");
                        storage.setItem("gccode", 1);
                    }
                    pc = pc * 100;
                    $('#progressI').width(pc + '%');
                    $('#progressI').html('<center>' + pc + '%</center>');
                    //=======================

                    var pc = info[3] / info[2];
                    if (storage.getItem("gccode1") == 0) {
                        $("#gccode1").html("<img src='images/loading/loading11.gif' />");
                    }
                    if (pc == 1) {
                        $("#gccode1").html("Generating Ccode[main_nuit1]");
                        storage.setItem("gccode1", 1);
                    }
                    pc = pc * 100;
                    $('#progressI1').width(pc + '%');
                    $('#progressI1').html('<center>' + pc + '%</center>');
                }
            }
        });
        var progress = "<div id='progressB'><div id='progressI'></div></div>";
        $('#progress').html(progress);
        $('#progressI').css('background-color', 'green');
        $('#progressI').width('0%');
        $('#progressI').html('<center>0%</center>');

        var progress1 = "<div id='progressB1'><div id='progressI1'></div></div>";
        $('#progress1').html(progress1);
        $('#progressI1').css('background-color', 'green');
        $('#progressI1').width('0%');
        $('#progressI1').html('<center>0%</center>');
        menubgcolor('menu1');
    });

    $("#gccode").live('click', function () {
        if ($.trim($("#gccode").html()) == 'Generating Ccode[main_nuit]') {
            $("#gccode").html("<img src='images/loading/loading11.gif' />");
            storage.setItem("gccode", 0);
            $.ajax({
                url: 'Handler/Management.ashx',
                type: 'POST',
                data: {
                    gccode: who
                },
                success: function (info) {
                    if (info == 'true') {
                        storage.setItem("gccode", 1);
                        alert('Ccode Generate Success');
                        $("#menu1").click();
                    }
                    $("#menu1").click();
                },
                error: function () {
                    $("#menu1").click();
                }
            });
        }
    });
    $("#gccode1").live('click', function () {
        if ($.trim($("#gccode1").html()) == 'Generating Ccode[main_nuit1]') {
            $("#gccode1").html("<img src='images/loading/loading11.gif' />");
            storage.setItem("gccode1", 0);
            $.ajax({
                url: 'Handler/Management.ashx',
                type: 'POST',
                data: {
                    gccode1: who
                },
                success: function (info) {
                    if (info == 'true') {
                        storage.setItem("gccode1", 1);
                        alert('Ccode Generate Success');
                        $("#menu1").click();
                    }
                    $("#menu1").click();
                },
                error: function () {
                    $("#menu1").click();
                }
            });
        }
    });
}

function AboutMenu2() {
    $("#menu2").live('click', function () {
        var pinfo = "<div id='IndexManagement' class='contextMenu'  oncontextmenu='RightFunction(\"IndexManagement\")'><table  cellpadding='0' cellspacing='0' >";
        pinfo += "<tr><td class='td100'><center><div id='gindex'>Generating Index[kw_alias]</div><div id='uindex'>Update Index[kw_alias]</div><div id='aindex'>Add Index[kw_alias]</div></center></td></tr>";
        pinfo += "<tr><td class='td100'><center><div id='gindex1'>Generating Index[main_unit]</div><div id='uindex1'>Old Index[main_unit]</div><div id='aindex1'>Recover Index[main_unit]</div><div id='gindexUmap'>Generating Index[Umap]</div></center></td></tr>";
        pinfo += "</table></div>";
        $("#pannel").html(pinfo);
        if (storage.getItem("gindex") == 0) {
            $("#gindex").html("<img src='images/loading/loading11.gif' />");
        }
        if (storage.getItem("gindex1") == 0) {
            $("#gindex1").html("<img src='images/loading/loading11.gif' />");
        }
        menubgcolor('menu2');
    });
    $("#gindexUmap").live('click', function () {
        if ($.trim($("#gindexUmap").html()) == 'Generating Index[Umap]') {
            var r = confirm("Generating Index To [Umap] ?");
            if (r == true) {
                $("#gindexUmap").html("<img src='images/loading/loading11.gif' />");
                storage.setItem("gindex", 0);
                $.ajax({
                    url: 'Handler/Management.ashx',
                    type: 'POST',
                    data: {
                        umap: who
                    },
                    success: function (info) {
                        if (info == 'true') {
                            storage.setItem("gindex", 1);
                            alert('Umap Index Generate Success');
                            $("#menu2").click();
                        }
                        $("#menu2").click();
                    },
                    error: function () {
                        $("#menu2").click();
                    }
                });
            }
        }
    });
    $("#gindex").live('click', function () {
        if ($.trim($("#gindex").html()) == 'Generating Index[kw_alias]') {
            var r = confirm("Generating Index To [kw_alias] ?");
            if (r == true) {
                $("#gindex").html("<img src='images/loading/loading11.gif' />");
                storage.setItem("gindex", 0);
                $.ajax({
                    url: 'Handler/Management.ashx',
                    type: 'POST',
                    data: {
                        gindex: who
                    },
                    success: function (info) {
                        if (info == 'true') {
                            storage.setItem("gindex", 1);
                            alert('Index Generate Success');
                            $("#menu2").click();
                        }
                        $("#menu2").click();
                    },
                    error: function () {
                        $("#menu2").click();
                    }
                });
            }
        }
    });
    $("#gindex1").live('click', function () {
        if ($.trim($("#gindex1").html()) == 'Generating Index[main_unit]') {
            var r = confirm("Generating Index To [main_unit] ?");
            if (r == true) {
                $("#gindex1").html("<img src='images/loading/loading11.gif' />");
                storage.setItem("gindex1", 0);
                $.ajax({
                    url: 'Handler/Management.ashx',
                    type: 'POST',
                    data: {
                        gindex1: who
                    },
                    success: function (info) {
                        if (info == 'true') {
                            storage.setItem("gindex1", 1);
                            alert('Index Generate Success');
                            $("#menu2").click();
                        }
                        $("#menu2").click();
                    },
                    error: function () {
                        $("#menu2").click();
                    }
                });
            }
        }
    });
    //=====
    $("#uindex").live('click', function () {
        if ($.trim($("#uindex").html()) == 'Update Index[kw_alias]') {
            $("#uindex").html("<img src='images/loading/loading11.gif' />");
            storage.setItem("uindex", 0);
            $.ajax({
                url: 'Handler/Management.ashx',
                type: 'POST',
                data: {
                    uindex: who
                },
                success: function (info) {
                    if (info == 'true') {
                        storage.setItem("uindex", 1);
                        alert('Index Update Success');
                        $("#menu2").click();
                    }
                    $("#menu2").click();
                },
                error: function () {
                    $("#menu2").click();
                }
            });
        }
    });
    $("#uindex1").live('click', function () {
        if ($.trim($("#uindex1").html()) == 'Old Index[main_unit]') {
            $("#uindex1").html("<img src='images/loading/loading11.gif' />");
            storage.setItem("uindex1", 0);
            $.ajax({
                url: 'Handler/Management.ashx',
                type: 'POST',
                data: {
                    uindex1: who
                },
                success: function (info) {
                    if (info == 'true') {
                        storage.setItem("uindex1", 1);
                        alert('Index for Old Success');
                        $("#menu2").click();
                    }
                    $("#menu2").click();
                },
                error: function () {
                    $("#menu2").click();
                }
            });
        }
    });
    //=====
    $("#aindex").live('click', function () {
        if ($.trim($("#aindex").html()) == 'Add Index[kw_alias]') {
            var r = confirm("Add Index To [kw_alias] ?");
            if (r == true) {
                $("#aindex").html("<img src='images/loading/loading11.gif' />");
                storage.setItem("aindex", 0);
                $.ajax({
                    url: 'Handler/Management.ashx',
                    type: 'POST',
                    data: {
                        aindex: who
                    },
                    success: function (info) {
                        if (info == 'true') {
                            storage.setItem("aindex", 1);
                            alert('Index Add Success');
                            $("#menu2").click();
                        }
                        $("#menu2").click();
                    },
                    error: function () {
                        $("#menu2").click();
                    }
                });
            }
        }
    });
    $("#aindex1").live('click', function () {
        if ($.trim($("#aindex1").html()) == 'Recover Index[main_unit]') {
            //var r = confirm("Recover Index To [main_unit] ?");
            //if (r == true) {
                $("#aindex1").html("<img src='images/loading/loading11.gif' />");
                storage.setItem("aindex1", 0);
                $.ajax({
                    url: 'Handler/Management.ashx',
                    type: 'POST',
                    data: {
                        aindex1: who
                    },
                    success: function (info) {
                        if (info == 'true') {
                            storage.setItem("aindex1", 1);
                            alert('Index Recover Success');
                            $("#menu2").click();
                        }
                        $("#menu2").click();
                    },
                    error: function () {
                        $("#menu2").click();
                    }
                });
            //}
        }
    });
}
var Btrue = true;
function AboutMenu3() {
    $("#menu3").live('click', function () {
        var pinfo = "<div id='PointManagement' class='contextMenu'  oncontextmenu='RightFunction(\"PointManagement\")'><table  cellpadding='0' cellspacing='0' >";
        pinfo += "<tr><td class='td100'><center><div id='Bonus1'>Bonus执行一次</div></center></td></tr>";
        pinfo += "<tr><td class='td100'><center><div id='Bonus2'>Bonus永久执行</div></center></td></tr>";
        //pinfo += "<tr><td class='td100'><center><div id='Bonus3'>取消Bonus永久执行</div></center></td></tr>";
        pinfo += "</table></div>";
        $("#pannel").html(pinfo);
        $("#Bonus1").live('click', function () {
            if ($.trim($("#Bonus1").html()) == 'Bonus执行一次') {
                $("#Bonus1").html("<img src='images/loading/loading11.gif' />");
                $.ajax({
                    url: 'Handler/Management.ashx',
                    type: 'POST',
                    data: {
                        Bonus1: who
                    },
                    success: function (info) {
                        alert('Success');
                        $("#Bonus1").html("Bonus执行一次");
                    },
                    error: function () {
                        alert('false');
                        $("#Bonus1").html("Bonus执行一次");

                    }
                });
            }
        });
        $("#Bonus2").live('click', function () {
            if ($.trim($("#Bonus2").html()) == 'Bonus永久执行') {
                $("#Bonus2").html("<img src='images/loading/loading11.gif' />");
                $.ajax({
                    url: 'Handler/Management.ashx',
                    type: 'POST',
                    data: {
                        Bonus2: who
                    },
                    success: function (info) {
                        alert('Success');
                        $("#Bonus2").html("Bonus永久执行");
                    },
                    error: function () {
                        alert('false');
                        $("#Bonus2").html("Bonus永久执行");
                    }
                });
            }
        });
        $("#Bonus3").live('click', function () {
            if ($.trim($("#Bonus3").html()) == '取消Bonus永久执行') {
                $("#Bonus3").html("<img src='images/loading/loading11.gif' />");
                $.ajax({
                    url: 'Handler/Management.ashx',
                    type: 'POST',
                    data: {
                        Bonus3: who
                    },
                    success: function (info) {
                        alert('Success');
                        $("#Bonus3").html("取消Bonus永久执行");
                    },
                    error: function () {
                        alert('false');
                        $("#Bonus3").html("取消Bonus永久执行");
                    }
                });
            }
        });
    });
}
function AboutMenu4() {
    $("#menu4").live('click', function () {
        var pinfo = "<div id='users0'><div id='users' class='contextMenu'  oncontextmenu='RightFunction(\"PointManagement\")'></div></div>";
        pinfo += "<div id='luckyman'></div>";
        pinfo += "<div id='choujiang' onclick='choujiang()'>start</div><div id='luckyOK'></div>";
        //pinfo += "<tr><td class='td100'><center><div id='Bonus3'>取消Bonus永久执行</div></center></td></tr>";
        pinfo += "<div></div>";
        $("#pannel").html(pinfo);
        $.ajax({
            url: 'Handler/Management.ashx',
            type: 'POST',
            data: {
                LuckyDraw: who
            },
            success: function (info) {
                try {
                    //info = "true;1000000;1000001;1000002;1000003;1000004;1234567;1000005;1000006;1000007;1000008;1000009";
                    info = info.split(";");
                    if (info[0] == "true") {
                        var Ttext = "<div id='users1'>";
                        for (var i = 1; i < info.length; i++) {
                            Ttext += "<div id='users" + i + "'>" + info[i] + "</div>";
                        }
                        Ttext += "</div>";
                        $("#users").html(Ttext);
                    }
                    else {
                        alert(info);
                    }

                } catch (e) {
                }
            },
            error: function () {

            }
        });

    });
}
var switch579 = true;
var si580;
function choujiang() {
    if (switch579) {
        $("#luckyOK").hide();
        $("#choujiang").html("stop");
        switch579 = false;
        $("#users1").css({ "-webkit-transform": "translateY(140px)", " -webkit-transition-duration": "0s" });
        //$("#users1").css("-webkit-transform", "translateY(140px)");
        $("#luckyman").css('margin-left', '51px');
        $("#users1 div").css({ 'visibility': 'visible', 'display': 'block' });
        $("#users1").css(" -webkit-transition-duration", "0.1s");

        //        $("#users1").css({ "-webkit-transform": "translateY(140px)", " -webkit-transition-duration": ($("#users1").height() / 200) + "s" });
        UD = true;
        $("#luckyman").html("");
        setTimeout(function () {
            UpDown();
            si580 = setInterval("UD=!UD", $("#users1").height() * 5);
        }, 500);
    }
    else {
        //debugger;
        clearInterval(si580);
        var thistop = $("#users1").css("-webkit-transform").split('(')[1].split('px')[0];
        $("#users1").css({ "-webkit-transform": "translateY(" + thistop + "px)", " -webkit-transition-duration": "0s" });
        $("#choujiang").html("start");
        switch579 = true;
        clearTimeout(st583);
        clearTimeout(st583);
        thistop = parseInt(thistop);
        var n = (Math.round((140 - thistop) / 35)) + 1;
        if (!n || n == 0) {
            debugger;
            return;
        }
        setTimeout(function () {
            $("#users" + n).css('visibility', 'hidden');
            $("#luckyman").html($("#users" + n).html());
            $("#luckyman").css('margin-left', '250px');
            setTimeout(function () {
                $("#users" + n + ",#luckyOK").slideToggle();
                $("#luckyOK").html("Does User: " + $("#users" + n).html() + " win the draw ?");
                $("#luckyOK")[0].onclick = Function("luckyOK(" + $("#users" + n).html() + ")");
            }, 500);
        }, 1000);
    }
}
function luckyOK(id) {
    console.log(id);
    $.ajax({
        url: 'Handler/Management.ashx',
        type: 'POST',
        data: {
            luckyOK: id
        },
        success: function (info) {
            if (info == "true") {
                alert("抽奖成功，中奖用户是：" + id);
            }
            else if (info == "0") {
                alert("网络连接错误");
            }
            else if (info == "1") {
                alert("今日已抽奖！");
            }
            else if (info == "2") {
                alert("未到抽奖时间！");
            }
        }
    });
}
var UD = true;
var st583;
function UpDown() {
    if (switch579) {
        return;
    }
    var thistop = parseInt($("#users1").css("-webkit-transform").split('(')[1].split('px')[0]);
    if (UD) {
        st583 = setTimeout(function () {
            $("#users1").css("-webkit-transform", "translateY(" + (thistop - 20) + "px)");
            UpDown();
        }, 100);
    }
    else {
        st583 = setTimeout(function () {
            //$("#users1").css("-webkit-transform", "translateY(140px)");
            $("#users1").css("-webkit-transform", "translateY(" + (thistop + 20) + "px)");
            UpDown();
            // $("#users1").css("-webkit-transform", "translateY(" + ($("#users1").height() - 160) + "px)");
        }, 100);
    }
}

function AboutMenu5() {
    $("#menu5").live('click', function () {
        /* var pinfo = "<div id='users02'></div>";
        //pinfo += "<div id='luckyman'></div>";
        pinfo += "<div id='choujiang1' onclick='choujiang1()'>start</div><div id='luckyOK1'></div>";
        //pinfo += "<tr><td class='td100'><center><div id='Bonus3'>取消Bonus永久执行</div></center></td></tr>";
        //pinfo += "<div></div>";
        $("#pannel").html(pinfo);
        */
        $("#pannel").html("<div class='AboutMenu5'>Loading ……</div>");
        $.ajax({
            url: 'Handler/Management.ashx',
            type: 'POST',
            data: {
                arrangefile: 1
            },
            success: function (info) {
                if (info == "true") {
                    $("#pannel").html("<div class='AboutMenu5'>整理完成！</div>");
                }
                else {
                    $("#pannel").html("<div class='AboutMenu5'>整理失败！</div>");
                }
            },
            error: function () {

            }
        });

    });
}
function choujiang1(info) {
    //debugger;
    if (switch579) {
        $("#choujiang1").html("stop");
        $("#luckyOK1").hide();
        switch579 = false;
        info = info.split("true;")[1].split(";");
        si580 = setInterval(function () {
            //parseInt(Math.random()*(上限-下限+1)+下限); 
            var x = parseInt(Math.random() * (info.length - 0 + 1) + 0);
            $("#users02").html(info[x]);
        }, 10);
    }
    else {
        $("#choujiang1").html("start");
        switch579 = true;
        clearInterval(si580);
        $("#luckyOK1").show();
        $("#luckyOK1").html("Does User: " + $("#users02").html() + " win the draw ?");
        $("#luckyOK1")[0].onclick = Function("luckyOK(" + $("#users02").html() + ")");
    }
}

setInterval("test11()", 60000);
function test11() {
    var date = new Date();
    if ((date.getHours() + "" == "23") && (date.getMinutes() + "" == "1")) {
        $("#menu3").click();
        $("#Bonus1").click();
    }
}

function RightFunction(from) {
    /*   if (from == "CcodeManagement") {
    $("#right").html("<div onclick='$(\"#menu1\").click();'>Refresh<div>");
    }
    ev = window.event;
    var x = ev.clientX + document.body.scrollLeft - document.body.clientLeft;
    var y = ev.clientY + document.body.scrollTop - document.body.clientTop;
    $("#right").css({ "top": y, "left": x });
    $("#right").show();
    return true;
    //height: 35px;
    //width: 120px;
    <ul><li id="Refresh">Refresh</li></ul>
    */
    if (from == "CcodeManagement") {
        $("#right").html("<div><ul><li id=\"Refresh\"><div id=\"reico\"></div><span>Refresh</span></li><li id=\"gc\"><div id=\"gcico\"></div><span>Generating Ccode[main_nuit]</span></li><li id=\"gc1\"><div id=\"gcico\"></div><span>Generating Ccode[main_nuit1]</span></li><li class=\"separator\"></li><li id=\"Quit\"><div id=\"quico\"></div><span>Quit</span></li></ul><div>");
        var cmenu = new contextMenu(
    {
        menuID: "right",
        targetEle: "CcodeManagement"
    },
	 	{
	 	    bindings: {
	 	        'Refresh': function (o) { $("#menu1").click(); }
                , 'gc': function (o) { $("#gccode").click(); }
                , 'gc1': function (o) { $("#gccode1").click(); }
	 	        , 'Quit': function (o) { location.reload(); }
	 	        /*
	 	        'edit': function (o) { alert("编辑 " + o.id); },
	 	        'del': function (o) { alert("删除 " + o.id); },
	 	        'prop': function () { alert("查看属性"); }*/
	 	    }
	 	}
 	);
        $("#right").width(285);
        $("#right").height(105);
        cmenu.buildContextMenu();
    }
    if (from == "IndexManagement") {
        $("#right").html("<div><ul><li id=\"gc\"><div id=\"gcico1\"></div><span>Generating Index[kw_alias]</span></li><li id=\"gc1\"><div id=\"gcico2\"></div><span>Generating Index[main_unit]</span></li><li class=\"separator\"></li><li id=\"Quit\"><div id=\"quico1\"></div><span>Quit</span></li></ul><div>");
        var cmenu = new contextMenu(
    {
        menuID: "right",
        targetEle: "IndexManagement"
    },
	 	{
	 	    bindings: {
	 	        'Refresh': function (o) { $("#menu1").click(); }
                , 'gc': function (o) { $("#gindex").click(); }
                , 'gc1': function (o) { $("#gindex1").click(); }
	 	        , 'Quit': function (o) { location.reload(); }
	 	        /*
	 	        'edit': function (o) { alert("编辑 " + o.id); },
	 	        'del': function (o) { alert("删除 " + o.id); },
	 	        'prop': function () { alert("查看属性"); }*/
	 	    }
	 	}
 	);
        $("#right").width(280);
        $("#right").height(80);
        cmenu.buildContextMenu();
    }
    //$("#right").show();
}
function time() {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    var h = date.getHours();
    var mm = date.getMinutes();
    var sec = date.getSeconds();
    if (sec < 10) { sec = "0" + sec; }
    var time = "";
    if (h > 12) {
        time = (h - 12) + ":" + mm + ":" + sec + " PM";
    }
    else {
        time = h + ":" + mm + ":" + sec + " AM";
        /*if (sec % 2 == 0) {
        time = h + ":" + mm + " AM";
        }
        else {
        time = h + "&nbsp;" + mm + " AM";
        }*/
    }
    $('#time').html(time);
    setTimeout('time()', 1000);
}

/*
1. 从1开始 至 任意值
parseInt(Math.random()*上限+1);
2. 从任意值开始 至 任意值
parseInt(Math.random()*(上限-下限+1)+下限); 
function fRandomBy(under, over){ 
switch(arguments.length){ 
case 1: return parseInt(Math.random()*under+1); 
case 2: return parseInt(Math.random()*(over-under+1) + under); 
default: return 0; 
} 
} 
document.write(fRandomBy(1,100));　　//输出指定范围内的随机数的随机整数
*/