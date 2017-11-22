//rem适配，一开始加载
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 200 * (clientWidth / 750) + 'px';
            // if(parseInt(docEl.style.fontSize)>120){docEl.style.fontSize = '120px';}
            //css默认body隐藏，加载完适配后展现
            doc.body.style.display="block";
        };
    if (!doc.addEventListener) return;
    //recalc();
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);