﻿function contextMenu(props, events) {
    this.props = props;
    this.events = events;
}

contextMenu.prototype.buildContextMenu = function () {
    var menuObj = document.getElementById(this.props.menuID);
    var menuId = this.props.menuID;
    var targetEle = this.props.targetEle;
    var eventFunc = this.events;

    document.oncontextmenu = function (evt) {
        hide();
        try {
            clearEventBubble(evt);
            var cobj = ele(evt);
            // if (cobj.className == targetEle) {
            if (isRan(cobj, targetEle)) {
                var _items = menuObj.getElementsByTagName("li");
                for (var i = 0; i < _items.length; i++) {
                    if (_items[i].className != "separator") {
                        _items[i].className = "item";
                        _items[i].onmouseover = function () { this.className = "item itemOver"; };
                        _items[i].onmouseout = function () { this.className = "item"; };
                        _items[i].onclick = function () { hide(); func(this.id, cobj); };
                    }
                }

                var _bodyWidth = document.body.offsetWidth || document.body.clientWidth;
                var _bodyHeight = document.body.offsetHeight || document.body.clientHeight;
                var _mWidth = menuObj.style.width;
                var _mHeight = menuObj.offsetHeight;

                menuObj.style.left = ((parseInt(getX(evt)) + parseInt(_mWidth)) > parseInt(_bodyWidth) ? (parseInt(getX(evt)) - parseInt(_mWidth)) : getX(evt)) + "px";
                menuObj.style.top = ((parseInt(getY(evt)) + parseInt(_mHeight)) > parseInt(_bodyHeight) ? (parseInt(getY(evt)) - parseInt(_mHeight)) : getY(evt)) + "px";
                // menuObj.style.display = "block";
                $("#" + menuId).fadeIn(100);

            } else {
                hide();
            }

        } catch (e) {
        } finally {
            clearEventBubble(evt);
            return false;
        }

    }

    document.onclick = function () { hide(); }

    func = function (fid, srcEle) {
        eventFunc.bindings[fid](srcEle);
    }

    hide = function () {
        try {
            if (menuObj) {
               menuObj.style.display = "none";
                // $("#" + menuId).slideUp();
            }
        } catch (e) { }
    }
    ele = function (evt) {
        evt = evt || window.event;
        return (evt.srcElement || evt.target);
    }

}
function isRan(a, b) {
    //a是被点击元素，b是匹配
    // var tab = th.parentNode.parentNode.parentNode;
    if (a.id == b) {
        return true;
    }
    for (var i = 0; i < 10; i++) {
        a = a.parentNode;
        if (a.id == b) {
            return true;
        }
    }
    return false;
}

/*==============================================================*/
function getX(evt) {
    evt = evt || window.event;
    /**
    CssRain---增加代码. 8月20日 
    使右键菜单，在有滚动条的情况下，也能正常在点击出弹出。
    */
    var scrollPosX;
    if (typeof window.pageYOffset != 'undefined') {
        scrollPosX = window.pageXOffset;
    }
    else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
        scrollPosX = document.documentElement.scrollLeft;
    }
    else if (typeof document.body != 'undefined') {
        scrollPosX = document.body.scrollLeft;
    }

    return (evt.x || evt.clientX || evt.pageX) + scrollPosX;
}

function getY(evt) {
    evt = evt || window.event;
    /**
    CssRain---增加代码. 8月20日 
    使右键菜单，在有滚动条的情况下，也能正常在点击出弹出。
    */
    var scrollPosY;
    if (typeof window.pageYOffset != 'undefined') {
        scrollPosY = window.pageYOffset;
    }
    else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
        scrollPosY = document.documentElement.scrollTop;
    }
    else if (typeof document.body != 'undefined') {
        scrollPosY = document.body.scrollTop;
    }

    return (evt.y || evt.clientY || evt.pageY) + scrollPosY;
}

function clearEventBubble(evt) {
    evt = evt || window.event;

    if (evt.stopPropagation) {
        evt.stopPropagation();
    } else {
        evt.cancelBubble = true;
    }

    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }

} 