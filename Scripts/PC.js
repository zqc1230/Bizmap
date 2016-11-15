/*/debugger;
$("body").css("background-color", "grey");
$("body").css("background-image", 'none'); //url('PcFile/bg.PNG')
//系统重新布局
//var infoInForm="";
//$("#form1").html(infoInForm);
var blankDiv = '#saved,#cross,#tools,#page3_details,#imgBizLarge,#rf,#account';
$('input,' + blankDiv).hide();
$(blankDiv).html('');
$("#main").html('About Bizmap.ca');
$("#menu").html('Bizmap is a free web app for iphone users to find local bussiness and services with exact locations.');

//saved--background  main--title  menu--message
$("#saved").show();
//debugger;
$("#saved").width($("html").width());
document.getElementById("saved").style.cursor = 'auto';
document.getElementById("bgimg").style.cursor = 'auto';
//var o = document.getElementById('tbl1 ');
//o.parentNode.removeChild(o);

var blankDiv1 = blankDiv.split(',');
for (var i = 0; i < blankDiv1.length; i++) {
document.getElementById("form1").removeChild(document.getElementById(blankDiv1[i].split("#")[1]));
}

$("#pannel1").html('');
$("#pannel1").html('<center><img id="bgimg" width="1145px" height="730px" src="PcFile/bg.png"/></center>');*/
$("#bgimg").attr('src', 'PcFile/bg.png');
var isSearch = false;
//#region 填充文字
var msg = "<br><br><br><br><strong>Bizmap.ca</strong> is a web application to help users finding local businesses and services on mobile phones.<br><br>We bring users to front door of business with our keyword friendly search engine.";
msg += "<br><br>Bizmap.ca is in beta version now, covers 4 cities in the Great Toronto And Area. City of Toronto, City of Markham, Town of Richmond Hill, Vaughan City.";
msg += "More cities will be added by this summer. <br><br>Please use iPhones to visit bizmap.ca to explore. Tring your work place, neighbourhood stores and let us know what do you think. <br><br>";
msg += "Android phones will be supported in the future. ";
$("#msgInP").html(msg);
//$("#footInP").html('<div id="mainInF">Main</div><div id="aboutInF">About</div><div id="mapInF">Map</div><div id="loginInF">Login</div>');
var conText;
conText = "<strong>What is bizmap.ca</strong><br>Bizmap.ca is a free web based application to help people finding exactly business and service locations. It works on iPhones.";
conText += "<br><br>It's not a simple business directory. It's totally reconstructed to fit mobile internet use. ";
conText += "<br><br><strong>Why bizmap.ca</strong>";
conText += "<br>So far, finding businesses is still very inconvenient. Many Apps are trying to help you, but also mislead you.";
conText += "<br><br>'inacturate results', 'many missings', 'wrong  coordinates', 'keywords limit'. You almost can not search businesses by what they are and what they serve.";
conText += "<br><br>Bizmap.ca devotes to build complete solutions to solve these problems.  We bring you to the font door of business or service exactly what you're looking for.";
conText += "<br><br>We think what people's think. We are working on a brand new database and try very hard to find business's type, major products or services they provide.";
conText += "<br><br>In Bizmap.ca you may find 'key cut', 'oil change', 'ice cream', 'walk-in clinic' and many more. Which other Apps just can find them by vendor's names.";
conText += "<br><br>You may find 'ATM' or 'Coffee' is very closed  to you and are able to get there by walk. We know who has the 'ATM' and who service you 'Coffee'. Other Apps simply send you to the banks or coffee shops far away.";
conText += "<br><br>You can find locations which is even not a business. Everybody knows where is 'Eaton Centre', but what about if a friend invites you to 'Jubilee Square' or 'woodbine shopping centre'?  You will find only Bizmap.ca helps you.";
conText += "<br><br>Bizmap.ca is web-based. Any time any iPhone user can open it in the browser. No App download, no account needed.";
conText += "<br><br>In Bizmap.ca, location sharing becomes so easy. System will generate a simple URL address which you can send to friends by email, text message or twitter. What your friends need to do is just click the link. Bizmap.ca will show them the exact point on map. Nobody will bother you with the direction questions.";
conText += "<br><br><strong>Even more.</strong>";
conText += "<br>We need your help to make this idea works well. We count points to you while you report business informations or invite more members. You will have chances to win iPhones monthly or get points redeemed with business coupons in the future.";
conText += "<br><br>Bizmap.ca is now on beta version, covers 4 cities in the Great Toronto and Area.  City of Toronto, City of Markham, Town of Richmond Hill and Vaughan City.";
conText += "We will keep working on more area and serve you better.";
conText += "<br><br>2012-2";
//#endregion
$(document).ready(function () {
    $("#mainInF,#mapInF,#loginInF").attr('class', 'grey');
    if (isSearch) {
        $("#mainInF").removeAttr("class");
    }
    $("#mainInF").live('click', function () {
        if ($("#mainInF").attr('class') != 'grey') {
            $("#footInP").css('top', '-660px');
            $("#mapInP,#containerInP").hide();
            $("#msgInP").show();
            $("#msgInP").html(msg);
            $("#mainInF").attr('class', 'grey');
            $("#aboutInF").removeAttr("class");

        }
    });
    $("#aboutInF").live('click', function () {
        if ($("#aboutInF").attr('class') != 'grey') {
            $("#footInP").css('top', '-660px');
            $("#mapInP,#containerInP").hide();
            $("#msgInP").show();
            $("#msgInP").html(conText);
            $("#aboutInF").attr('class', 'grey');
            $("#mainInF").removeAttr("class");

            //debugger;
            if (isSearch) {
                $("#mapInF").removeAttr("class");
            }
        }
    });
    $("#mapInF").live('click', function () {
        if ($("#mapInF").attr('class') != 'grey') {
            $("#footInP").css('top', '-988px');
            $("#msgInP,#mapInP,#containerInP").toggle();
            $("#mapInF").attr('class', 'grey');
        }
    });
    $("#loginInF").live('click', function () {

    });

});
//#region 地图初始化
function initialize() {
    myLatLng = new google.maps.LatLng(43.6702131, -79.38679);
    //alert(myLatLng);
    $("#mapInP,#containerInP").show();
    var myOptions = {
        zoom: 14,
        center: myLatLng,
        draggable: true,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map_canvasInP"), myOptions);
}
//#endregion
var re1 = /,{2,}|\|{1,}|\;{1,}|￥{1,}|:{1,}|\<{1,}|\>{1,}|\/{1,}|\:/g;
//#region 获取URL
try {
    //debugger;
    var thisurl = location.href;
    if (thisurl.indexOf("www.bizmap.ca") != -1) {
        window.location.href = "http://bizmap.ca";
    }
    var urlinfo;
    urlinfo = thisurl.split('?')[1];
    if (urlinfo) {
        urlinfo = urlinfo.replace(re1, " ");
        urlinfo = urlinfo.replace(/@/g, '');
        urlinfo = urlinfo.replace('dic00', '');
        urlinfo = urlinfo.replace('dic01', '');
        urlinfo = urlinfo.replace('dic02', '');
        urlinfo = urlinfo.replace('dic$', '');
        urlinfo = urlinfo.replace("%20", " ");
        if (thisurl.indexOf('http') != -1) {
            thisurl = thisurl.split('http://')[1];
        }
        $("#titleInP").html(thisurl);
        Search(urlinfo);
    }
} catch (e) { catche(e); }

function Search(kw) {
    isSearch = true;
    //debugger;
    $("#listInP").html('<center><br><br><br>Loading……</center>');
    $("#footInP").css('top', '-988px');
    $("#msgInP").hide();
    $("#containerInP,#mapInP").show();
    setTimeout('initialize()', 500);
    $.ajax({
        url: 'Handler/SearchInfo.ashx',
        type: 'POST',
        data: {
            kwPC: kw
        },
        timeout: 30000,
        success: function (a) {
            //未完成
            //debugger;
            $("#listInP").html(a);
        },
        error: function (a) {
            resu = "<p id='stcs_result1'>&nbsp;Sorry network slow, please try again later. <br/></div>";
            $("#listInP").html(resu);
        }
    });
}
//#endregion
var markersArray = [];
function listgroup(x) {
    $("#mapInF,#loginInF").attr('class', 'grey');
    //通过点击某个商家重新排版时，去掉x图标[x=x-1]
    //debugger;
    if (!x) {
        setTimeout('listgroup(1)', 500);
    }
    $("#msgInP").hide();
    $("#containerInP,#mapInP").show();
    var ll22 = $("#listInP").html();
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
            }
            // debugger;
            map.panTo(new google.maps.LatLng(L25[0], $.trim(L25[1])));
            if (map.getZoom() > 18) {
                map.setZoom(18);
            }
        }
        setTimeout('toTop()', 1000);

    }
}
function toTop() {
    window.scrollTo(0, 0);
}
var exi;
function addClicktoMarker(marker, LatLng, i, exii, isrd) {//i是当前的序号1。2。2，exii是当前的第n个0。1。2  isrd 是否是道路，默认为false
    google.maps.event.addListener(marker, 'click', function () {
        map.panTo(LatLng);
        if (!isNaN(i)) {//序号
            //debugger
            if (exi != null && exi == i) {//如果是同一个，则放大
                if (map.getZoom() < 14) {
                    map.setZoom(14);
                }
                else {
                    if (map.getZoom() < 17) {
                        map.setZoom(map.getZoom() + 2);
                    }
                    if (map.getZoom() > 17 && map.getMapTypeId() == 'roadmap') {
                        map.setMapTypeId(google.maps.MapTypeId.HYBRID);
                    }
                }
            }
            else {
                try {
                    var ico;
                    //如果是道路
                    if (isrd) {
                        ico = document.getElementById("list").childNodes[exii].childNodes[0].childNodes[0].childNodes[0].childNodes[1];
                        ico.style.backgroundImage = 'url("./images/icon_L.png")';
                    }
                    else {
                        ico = document.getElementById("list").childNodes[2 * exii + 1].childNodes[0].childNodes[0].childNodes[1].childNodes[0];
                        //ico.style.backgroundImage = 'url("./images/Icon_b_none.png")';
                    }

                    var tico1 = ico.parentNode;
                    tico1.id = "td" + parseInt(Math.random() * 100);
                    $("#" + tico1.id).click();
                    tico1.id = "";
                    //#endregion
                    wf = true;
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
                        /*                             debugger;
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
                            $('#list').touchScroll('setPosition', ScrollHeight - 45);
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
                    //centerwithGPS(tplat, tplng, parseInt(i), null, null, null, null, null, true, exii);                    
                } catch (e) { }
            }
        }
        wf = false;
        exi = i;
    });
}