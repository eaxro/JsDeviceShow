/*
    #   @Property   EAX Romania, all rights reserved
    #   @CopyRight  Copyright (c) 2021 EAX Romania
    #   @Author     Alexandru B.
    #   @GitHub     https://github.com/eaxro
    #   @LinkedIN   https://linkedin.com/in/eaxro
    #   @FreeLancer https://www.freelancer.com/u/eaxro
    #   @WebSite    https://code.eax.ro
    #   @Version    v1.0
*/
var jEax = {
    eDragData: {},
    eDrag: function(eName,eMain={}){
        jEax.eDragData[eName] = {};
        jEax.eDragData[eName].eLm = jEax.gDoc(eName);
        jEax.eDragData[eName].ePos = {1:0,2:0,3:0,4:0};
        jEax.eDragData[eName].eLm.onmousedown = eDragStart;
        function eDragStart(eEax) {
            eEax = eEax || window.event;
            eEax.preventDefault();
            if(jEax.gDoc("#eDragOn").checked){
                if(jEax.eDragData[eName].eLm.style.zIndex!="3"){
                    jEax.gDoc("#eMobile").style.zIndex=jEax.gDoc("#eMobile").style.zIndex=="3"?"2":"1";
                    jEax.gDoc("#eDeskTop").style.zIndex=jEax.gDoc("#eDeskTop").style.zIndex=="3"?"2":"1";
                    jEax.gDoc("#eTab").style.zIndex=jEax.gDoc("#eTab").style.zIndex=="3"?"2":"1";
                    jEax.eDragData[eName].eLm.style.zIndex="3";
                }
            }
            jEax.eDragData[eName].ePos[3] = eEax.clientX;
            jEax.eDragData[eName].ePos[4] = eEax.clientY;
            document.onmouseup = eCloseDrag;
            document.onmousemove = eDragElm;
        }
        function eDragElm(eEax) {
            if(jEax.gDoc("#eDragOn").checked){
                eEax = eEax || window.event;
                eEax.preventDefault();
                jEax.eDragData[eName].ePos[1] = jEax.eDragData[eName].ePos[3] - eEax.clientX;
                jEax.eDragData[eName].ePos[2] = jEax.eDragData[eName].ePos[4] - eEax.clientY;
                jEax.eDragData[eName].ePos[3] = eEax.clientX;
                jEax.eDragData[eName].ePos[4] = eEax.clientY;
                jEax.eDragData[eName].eLm.style.top = (jEax.eDragData[eName].eLm.offsetTop - jEax.eDragData[eName].ePos[2]) + "px";
                jEax.eDragData[eName].eLm.style.left = (jEax.eDragData[eName].eLm.offsetLeft - jEax.eDragData[eName].ePos[1]) + "px";
            }
        }
        function eCloseDrag(){
            document.onmouseup = null;
            document.onmousemove = null;
            jEax.iSave;
        }
    },
    get date(){ return new Date(); },
    get eUpdate(){
        if(jEax.gDoc("#iMob").getAttribute("src") != jEax.gDoc("#eURL").value){
            jEax.gDoc("#iMob").src = jEax.gDoc("#eURL").value;
        }
        if(jEax.gDoc("#iTab").getAttribute("src") != jEax.gDoc("#eURL").value){
            jEax.gDoc("#iTab").src = jEax.gDoc("#eURL").value;
        }
        if(jEax.gDoc("#iDeskTop").getAttribute("src") != jEax.gDoc("#eURL").value){
            jEax.gDoc("#iDeskTop").src = jEax.gDoc("#eURL").value;
        }
    },
    get iLoad(){
        var ch = jEax.gCoock("iData");
        var TMP = {};
            TMP.eURL = {};
            TMP.Link = window.location.href.split("?");
        if(ch){
            TMP.JS = JSON.parse(ch);
            if(typeof TMP.Link[1] == "undefined"){
                jEax.gDoc("#eURL").value = TMP.JS.eURL;
                jEax.gDoc("#ePosOff").checked = TMP.JS.ePosOff;
                jEax.gDoc("#ePosOn").checked = TMP.JS.ePosOn;
                jEax.gDoc(".eRow")[0].id = TMP.JS.eLand;
            }else{
                TMP.eData = TMP.Link[1].split("&");
                for (var [k, v] of Object.entries(TMP.eData)){
                    TMP.eData[k] = v.match(/([^=]*)=?(.*)?/);
                    TMP.eData[k][2] = typeof TMP.eData[k][2] == "undefined"? "" : TMP.eData[k][2];
                    TMP.eURL[TMP.eData[k][1]] = TMP.eData[k][2];
                }
                TMP.eURL.link = typeof TMP.eURL.s == "undefined" ? "http://"+TMP.eURL.link : "https://"+TMP.eURL.link;
                TMP.eURL.land = typeof TMP.eURL.land == "undefined" ? "eLandOff" : "eLandOn";
                if(TMP.eURL.land == "eLandOff"){
                    jEax.gDoc("#ePosOff").checked = true;
                }else{
                    jEax.gDoc("#ePosOn").checked = true;
                }
                jEax.gDoc(".eRow")[0].id = TMP.eURL.land;
                jEax.gDoc("#eURL").value = TMP.eURL.link;
            }
            
            jEax.gDoc("#eColor").value = TMP.JS.eColor;
            jEax.gDoc("#eDevM").checked = TMP.JS.eDevM;
            jEax.gDoc("#eDevD").checked = TMP.JS.eDevD;
            jEax.gDoc("#eDevT").checked = TMP.JS.eDevt;
            jEax.gDoc("#eDragOff").checked = TMP.JS.eDragOff;
            jEax.gDoc("#eDragOn").checked = TMP.JS.eDragOn;
            jEax.gDoc("#eMobile").style.zIndex = TMP.JS.eDragData.eMobile.zIndex;
            jEax.gDoc("#eMobile").style.top = TMP.JS.eDragData.eMobile.top;
            jEax.gDoc("#eMobile").style.left = TMP.JS.eDragData.eMobile.left;
            jEax.gDoc("#eDeskTop").style.zIndex = TMP.JS.eDragData.eDeskTop.zIndex;
            jEax.gDoc("#eDeskTop").style.top = TMP.JS.eDragData.eDeskTop.top;
            jEax.gDoc("#eDeskTop").style.left = TMP.JS.eDragData.eDeskTop.left;
            jEax.gDoc("#eTab").style.zIndex = TMP.JS.eDragData.eTab.zIndex;
            jEax.gDoc("#eTab").style.top = TMP.JS.eDragData.eTab.top;
            jEax.gDoc("#eTab").style.left = TMP.JS.eDragData.eTab.left;
            jEax.gDoc(".eMobile")[0].style.display = jEax.gDoc("#eDevM").checked ? "block" : "none";
            jEax.gDoc(".eDeskTop")[0].style.display = jEax.gDoc("#eDevD").checked ? "block" : "none";
            jEax.gDoc(".eTab")[0].style.display = jEax.gDoc("#eDevT").checked ? "block" : "none";
            if(jEax.gDoc("#eColor").value != ""){
                jEax.gDoc("body")[0].style.background = jEax.gDoc("#eColor").value;
            }
        }else{
            TMP.Link[1] = typeof TMP.Link[1] == "undefined" ? "link=eax.ro&s" : TMP.Link[1];
            TMP.eData = TMP.Link[1].split("&");
            for (var [k, v] of Object.entries(TMP.eData)){
                TMP.eData[k] = v.match(/([^=]*)=?(.*)?/);
                TMP.eData[k][2] = typeof TMP.eData[k][2] == "undefined"? "" : TMP.eData[k][2];
                TMP.eURL[TMP.eData[k][1]] = TMP.eData[k][2];
            }
            TMP.eURL.link = typeof TMP.eURL.s == "undefined" ? "http://"+TMP.eURL.link : "https://"+TMP.eURL.link;
            TMP.eURL.land = typeof TMP.eURL.land == "undefined" ? "eLandOff" : "eLandOn";
            if(TMP.eURL.land == "eLandOff"){
                jEax.gDoc("#ePosOff").checked = true;
            }else{
                jEax.gDoc("#ePosOn").checked = true;
            }
            jEax.gDoc(".eRow")[0].id = TMP.eURL.land;
            jEax.gDoc("#eURL").value = TMP.eURL.link;
            jEax.gDoc("#iMob").src = jEax.gDoc("#eURL").value;
            jEax.gDoc("#iTab").src = jEax.gDoc("#eURL").value;
            jEax.gDoc("#iDeskTop").src = jEax.gDoc("#eURL").value;
            jEax.gDoc("#eDevM").checked = true;
            jEax.gDoc("#eDevD").checked = true;
            jEax.gDoc("#eDevT").checked = true;
            jEax.gDoc("#eDragOn").checked = true;
            jEax.gDoc(".eMobile")[0].style.display = jEax.gDoc("#eDevM").checked ? "block" : "none";
            jEax.gDoc(".eDeskTop")[0].style.display = jEax.gDoc("#eDevD").checked ? "block" : "none";
            jEax.gDoc(".eTab")[0].style.display = jEax.gDoc("#eDevT").checked ? "block" : "none";
            jEax.eData = TMP;
        }
    },
    get iSave(){
        var TMP = {};
        TMP.eURL = jEax.gDoc("#eURL").value;
        TMP.eColor = jEax.gDoc("#eColor").value;
        TMP.eLand = jEax.gDoc(".eRow")[0].id;
        TMP.ePosOff = jEax.gDoc("#ePosOff").checked;
        TMP.ePosOn = jEax.gDoc("#ePosOn").checked;
        TMP.eDevM = jEax.gDoc("#eDevM").checked;
        TMP.eDevD = jEax.gDoc("#eDevD").checked;
        TMP.eDevt = jEax.gDoc("#eDevT").checked;
        TMP.eDragOff = jEax.gDoc("#eDragOff").checked;
        TMP.eDragOn = jEax.gDoc("#eDragOn").checked;
        TMP.eDragData = {};
        TMP.eDragData.eMobile = {
            zIndex:jEax.gDoc("#eMobile").style.zIndex,
            top:jEax.gDoc("#eMobile").style.top,
            left:jEax.gDoc("#eMobile").style.left,
        };
        TMP.eDragData.eDeskTop = {
            zIndex:jEax.gDoc("#eDeskTop").style.zIndex,
            top:jEax.gDoc("#eDeskTop").style.top,
            left:jEax.gDoc("#eDeskTop").style.left,
        };
        TMP.eDragData.eTab = {
            zIndex:jEax.gDoc("#eTab").style.zIndex,
            top:jEax.gDoc("#eTab").style.top,
            left:jEax.gDoc("#eTab").style.left,
        };
        
        jEax.sCoock("iData",JSON.stringify(TMP));
    },
    cElm:function(cName){ return document.createElement(cName); },
    gDoc:function(gDocNa,eDT = {}){
        eDT.Doc = document;
        eDT.Matched = gDocNa.match(/(\.|\#|=| )?(.*)/);
        switch (eDT.Matched[1]) {
            case "#":
                eDT.Doc = document.getElementById(eDT.Matched[2]);
                break;
            case "=":
                eDT.Doc = document.getElementsByName(eDT.Matched[2]);
                break;
            case " ":
                eDT.Doc = document.getElementsByName(eDT.Matched[2]);
                break;
            case ".":
                eDT.Doc = document.getElementsByClassName(eDT.Matched[2]);
                break;
            default:
                eDT.Doc = document.getElementsByTagName(eDT.Matched[2]);
        }
        return eDT.Doc;
    },
    gCoock:function(cName,eDT = {}){
        eDT.cName = cName+"=";
        eDT.cData = document.cookie.split(';');
        for(var i = 0; i < eDT.cData.length; i++) {
            eDT.DATA = eDT.cData[i];
            while (eDT.DATA.charAt(0)==' ') { eDT.DATA = eDT.DATA.substring(1); }
            if (eDT.DATA.indexOf(eDT.cName) == 0) { return eDT.DATA.substring(eDT.cName.length, eDT.DATA.length); }
        }
        return false;
    },
    sCoock:function(cName,cValue,cExp = 32140800000,cPath = "/",eDT = {}){
        eDT.DATA = jEax.date;
        eDT.DATA.setTime(eDT.DATA.getTime()+cExp);
        document.cookie = cName+"="+cValue+";expires="+eDT.DATA.toUTCString()+";path="+cPath;
        return cValue;
    },
    get eStart(){
        jEax.iLoad;
        jEax.eUpdate;
        jEax.gDoc("#eSetButton").onclick = function(){
            jEax.gDoc("#eSetBox").style.display = jEax.gDoc("#eSetBox").style.display == "block" ? "none" : "block";
        };
        jEax.gDoc("#ePosOff").onclick = function(){
            jEax.gDoc(".eRow")[0].id = "eLandOff";
            jEax.iSave;
        };
        jEax.gDoc("#ePosOn").onclick = function(){
            jEax.gDoc(".eRow")[0].id = "eLandOn";
            jEax.iSave;
        };
        jEax.gDoc("#eDragOff").onclick = function(){
            jEax.iSave;
        };
        jEax.gDoc("#eDragOn").onclick = function(){
            jEax.iSave;
        };
        jEax.gDoc("#eURL").onchange = function(){
            jEax.eUpdate;
            jEax.iSave;
        };
        
        jEax.gDoc("#eColor").onchange = function(){
            if(jEax.gDoc("#eColor").value != ""){
                jEax.gDoc("body")[0].style.background = jEax.gDoc("#eColor").value;
            }else{
                jEax.gDoc("body")[0].style.removeProperty("background");
            }
            jEax.iSave;
        };
        jEax.gDoc("#eURL").addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                jEax.eUpdate;
                jEax.iSave;
            }
        });
        jEax.gDoc("#eDevM").onchange = function(){
            jEax.gDoc(".eMobile")[0].style.display = jEax.gDoc("#eDevM").checked ? "block" : "none";
            jEax.iSave;
        };
        jEax.gDoc("#eDevD").onchange = function(){
            jEax.gDoc(".eDeskTop")[0].style.display = jEax.gDoc("#eDevD").checked ? "block" : "none";
            jEax.iSave;
        };
        jEax.gDoc("#eDevT").onchange = function(){
            jEax.gDoc(".eTab")[0].style.display = jEax.gDoc("#eDevT").checked ? "block" : "none";
            jEax.iSave;
        };
        jEax.eDrag("#eMobile");
        jEax.eDrag("#eDeskTop");
        jEax.eDrag("#eTab");
        jEax.iSave;
    }
};