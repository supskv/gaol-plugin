(this["webpackJsonpgaol-plugin"]=this["webpackJsonpgaol-plugin"]||[]).push([[0],{135:function(e,n,t){},160:function(e,n){},162:function(e,n){},178:function(e,n,t){},179:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(9),i=t.n(c),o=t(113),l=t(232),s=t(233),u=t(28),d=t(112),f=t(13),p=t(223),j=t(105),b=t.n(j),m=t(117),x=t(41),h=t(220),y=t(15),v=t(100),O={gaolRegex:/\|(.*)?\|2B6(B|C)\|.*?\|.*?\|/,nameRegex:/2B6(B|C)\|.*?\|.*?\|[A-Za-z ]+/,testRegex:/(.*)?(#-135-).*?/,testNameRegex:/#-135-[A-Za-z ]+/},g=O.gaolRegex,w=O.testRegex,C=O.nameRegex,N=O.testNameRegex,k=function(e,n){var t=e.findIndex((function(e){return n.includes(e)}));return[t,t>-1]},P=function(e,n){return e-n},R=function(e){var n=e.match(C),t=e.match(N);return n?n[0].split("|").pop():t?t[0].split("-").pop():null},S=t(17),T=t(20),z=t(19),I=t.n(z),B=t(33),A=t(57),D=t(104).createInstance({name:"gaoloverlay"});function E(e){var n=e.players,t=e.myNumber;return new Promise(function(){var e=Object(B.a)(I.a.mark((function e(a,r){return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,D.setItem("gaol",{players:n,myNumber:t});case 3:return e.t0=console,e.next=6,D.getItem("gaol");case 6:e.t1=e.sent,e.t0.log.call(e.t0,e.t1),a(!0),e.next=14;break;case 11:e.prev=11,e.t2=e.catch(0),r(e.t2);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(n,t){return e.apply(this,arguments)}}())}var M=Object(A.b)("gaol/fetchUserConfig",Object(B.a)(I.a.mark((function e(){var n;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise(function(){var e=Object(B.a)(I.a.mark((function e(n,t){var a;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,D.getItem("gaol");case 3:a=e.sent,n(a||{}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),t(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(n,t){return e.apply(this,arguments)}}());case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})))),L=Object(A.c)({name:"gaol",initialState:{number:-1,players:[],gaoledPlayers:[],myNumber:-1,nog:3,status:"ready",error:""},reducers:{order:function(e,n){e.number=n.payload},form:function(e,n){e.players=n.payload},position:function(e,n){e.myNumber=n.payload},error:function(e,n){e.error=n.payload},appendGaoledPlayer:function(e,n){e.gaoledPlayers=[].concat(Object(T.a)(e.gaoledPlayers),[n.payload])},resetGaoledPlayer:function(e){e.gaoledPlayers=[]}},extraReducers:function(e){e.addCase(M.pending,(function(e){e.status="loading"})).addCase(M.fulfilled,(function(e,n){e.status="ready",e.players=n.payload.players||e.players,e.myNumber=void 0!==n.payload.myNumber?n.payload.myNumber:e.myNumber}))}}),G=L.actions,F=G.order,U=G.form,H=G.position,J=G.error,Z=G.appendGaoledPlayer,W=G.resetGaoledPlayer,X=function(e){return e.gaol.number},q=function(e){return e.gaol.myNumber},K=function(e){return e.gaol.players},Q=function(e){return e.gaol.gaoledPlayers},V=function(e){return e.gaol.error},Y=function(){return function(e,n){var t=Q(n());if(3===t.length){var a=function(e,n){var t,a=n.map((function(e){return e}));return a.sort(P),[t=a.findIndex((function(n){return n===e}))+1,t>-1]}(q(n()),t),r=Object(S.a)(a,1)[0];console.log(t,r),setTimeout((function(){e(W()),e(F(-1))}),1e4),e(F(r))}}},$=function(e){var n=e.players,t=e.myNumber;return function(){var e=Object(B.a)(I.a.mark((function e(a){return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E({players:n,myNumber:t});case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()},_=L.reducer,ee=(t(135),t(6)),ne=Object(h.a)((function(e){return{root:{display:"flex",justifyContent:"space-between",padding:"5px 8px",background:Object(y.a)("#000000",.5)},msgRoot:{display:"flex",flexDirection:"column",justifyContent:"center"},msg:{fontSize:"9px"},order:{color:e.palette.success.main},timer:{fontSize:"10px"},paper:{padding:e.spacing(2),textAlign:"center",color:e.palette.text.secondary}}}));var te=function(){var e=Object(u.c)(X),n=Object(u.c)(V),t=ne(),r=Object(u.b)();Object(a.useEffect)((function(){r(M());var e=[{name:"LogLine",event:c}];return function(e){try{e.forEach((function(e){window.addOverlayListener(e.name,(function(n){return e.event(n)}))})),window.startOverlayEvents(),console.log("Started Overlay plugin")}catch(n){console.error("Must import Overlay Plugin CDN"),console.error(n)}}(e),function(){return function(e){try{e.forEach((function(e){window.removeOverlayListener(e.name,(function(n){return e.event(n)}))})),console.log("Stopped Overlay plugin")}catch(n){console.error("Must import Overlay Plugin CDN"),console.error(n)}}(e)}}),[]);var c=Object(a.useCallback)((function(e){var n,t=e.rawLine;(n=t,g.test(n)||w.test(n))&&r(M()).then((function(){r(function(e){return function(n,t){var a=R,r=k(K(t()),e),c=Object(S.a)(r,2),i=c[0];if(c[1])-1!==Q(t()).find((function(e){return e===i}))&&(n(Z(i)),n(Y()));else{n(W());var o=a(e);o&&(n(J("".concat(o," isn't in the party."))),setTimeout((function(){return n(J(""))}),3e3))}}}(t))}))}),[]);return Object(ee.jsxs)(m.a,{className:t.root,variant:"outlined",elevation:3,children:[Object(ee.jsxs)("div",{className:t.msgRoot,children:[Object(ee.jsxs)(x.a,{variant:"p",children:["Gaol:",Object(ee.jsx)("span",{children:" "}),Object(ee.jsx)(x.a,{variant:"subtitle1",className:t.order,display:"inline",children:e>-1?e||"Eating Titan's ass.":"N/A"}),Object(ee.jsx)("span",{children:" "}),e>-1&&Object(ee.jsx)(v.a,{date:Date.now()+1e4,intervalDelay:0,precision:2,renderer:function(e){return Object(ee.jsx)(x.a,{variant:"subtitle1",className:t.timer,display:"inline",children:"".concat(e.seconds,".").concat(e.milliseconds)})}})]}),Object(ee.jsx)(x.a,{variant:"body2",className:t.msg,color:"error",children:n||""})]}),Object(ee.jsx)("div",{children:Object(ee.jsx)(p.a,{"aria-label":"setting",size:"small",onClick:function(){return function(){var e=String(window.location.search),n=-1!==e.indexOf("?")?"&":"?";e="".concat(e).concat(n);var t=window.location.href;window.open("".concat(t,"settings"),"","width=630,height=870,location=no,menubar=yes")}()},children:Object(ee.jsx)(b.a,{})})})]})},ae=t(40),re=t(2),ce=t(39),ie=t(106),oe=t.n(ie),le=t(230),se=t(236),ue=t(231),de=t(235),fe=t(224),pe=t(225),je=t(228),be=t(111),me=t.n(be),xe=t(108),he=t.n(xe),ye=t(110),ve=t.n(ye),Oe=t(109),ge=t.n(Oe),we=t(229),Ce=t(114),Ne=t(239),ke=t(226),Pe=t(227),Re=t(81),Se=function(e){var n={declaration:{attributes:{version:"1.0",encoding:"utf-8",standalone:"yes"}},elements:[]},t=e.map((function(e){return{type:"element",name:"Player",elements:[{type:"text",text:e}]}}));return n.elements.push({type:"element",name:"Priority",elements:t}),n},Te=t(234),ze=t(237),Ie=t(107),Be=t.n(Ie),Ae=Object(h.a)((function(e){return{characterRow:{display:"flex",justifyContent:"space-between",padding:"7px 6px"},no:{marginRight:"6px"}}}));var De=function(e){var n=e.name,t=void 0===n?"":n,a=e.selectMe,r=e.index,c=e.onChangeSelectMe,i=e.onTextInput,o=e.removeHandle,l=e.hiddenAction,s=Ae();return Object(ee.jsxs)("div",{className:s.characterRow,children:[Object(ee.jsxs)("div",{children:[Object(ee.jsx)(x.a,{className:s.no,variant:"body2",component:"span",children:r+1}),Object(ee.jsx)(ze.a,{size:"small",checked:a===r,value:r,onChange:function(){return c(r)}}),Object(ee.jsx)(Te.a,{id:"filled-search",label:"Character Name",value:t,type:"text",variant:"outlined",size:"small",onChange:function(e){return i(e.target.value,r)}})]}),!l&&Object(ee.jsx)(p.a,{"aria-label":"remove",color:"secondary",size:"small",onClick:function(){return o(r)},children:Object(ee.jsx)(Be.a,{})})]})},Ee={max:{fullParty:8,lightParty:4}},Me=Object(h.a)((function(e){return{actionDiv:{display:"flex",justifyContent:"flex-end",marginTop:10},cancelBtn:{margin:"0px 10px"},dnone:{display:"none"}}}));var Le=function(){var e=r.a.useState(!1),n=Object(S.a)(e,2),t=n[0],a=n[1],c=r.a.useState(null),i=Object(S.a)(c,2),o=i[0],l=i[1],s=r.a.useRef(null),d=r.a.useRef(null),f=Object(u.c)(q),j=Object(u.c)(K),b=Object(u.b)();r.a.useEffect((function(){b(M())}),[t]);var m=function(){l(null)},x=function(e){m(),b(U(j.filter((function(n,t){return t!==e}))))},h=function(){var e=Object(B.a)(I.a.mark((function e(){var n,t,a;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{m(),n=Se({}.players),t=Re.js2xml(n),a=new Blob([t],{type:"text/xml"}),function(e,n){var t=new FileReader;t.onload=function(e){n(e.target.result)},t.readAsDataURL(e)}(a,(function(e){d.current.href=e,d.current.innerText=e,d.current.download="Priority.xml",d.current.click()}))}catch(r){console.error(r)}case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=function(e,n){var t=j.map((function(t,a){return a===n?e:t}));b(U(t))},v=function(e){b(H(e))},O=function(){var e=Object(B.a)(I.a.mark((function e(){return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:b($({players:j,myNumber:f})),alert("Saved successful.");case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),g=function(){var e=Ee.max.fullParty;return j.length===e?"Full Party":"Light Party"}(),w=Me(),C=[{title:"New",icon:Object(ee.jsx)(he.a,{fontSize:"small"}),action:function(){m(),j.length<Ee.max.fullParty&&b(U([].concat(Object(T.a)(j),[""])))},disabled:j.length>=Ee.max.fullParty},{title:"Import",icon:Object(ee.jsx)(ge.a,{fontSize:"small"}),action:function(){s.current.click()}},{title:"Export",icon:Object(ee.jsx)(ve.a,{fontSize:"small"}),action:h,disabled:!0,display:!0}];return Object(ee.jsxs)("div",{children:[Object(ee.jsxs)(fe.a,{style:{paddingBottom:0},children:[Object(ee.jsx)(pe.a,{action:Object(ee.jsx)(p.a,{onClick:function(e){l(e.currentTarget)},"aria-controls":"simple-menu","aria-haspopup":"true","aria-label":"more",children:Object(ee.jsx)(me.a,{})}),title:"".concat(g),titleTypographyProps:{variant:"h6"},subheader:"The ones who are suffering in UwU."}),Object(ee.jsx)(Ce.a,{id:"simple-menu",anchorEl:o,keepMounted:!0,open:Boolean(o),onClose:m,children:C.map((function(e,n){return void 0===e.display||e.display?Object(ee.jsxs)(Ne.a,{onClick:e.action,disabled:void 0!==e.disabled&&e.disabled,children:[Object(ee.jsx)(ke.a,{children:e.icon}),Object(ee.jsx)(Pe.a,{primary:e.title})]},n):""}))}),Object(ee.jsx)(je.a,{children:j.map((function(e,n){return Object(ee.jsx)(De,{selectMe:f,index:n,name:e,onChangeSelectMe:v,onTextInput:y,removeHandle:x,hiddenAction:j.length<=1},n)}))})]}),Object(ee.jsxs)("div",{className:w.actionDiv,children:[Object(ee.jsx)(we.a,{variant:"contained",color:"secondary",className:w.cancelBtn,onClick:function(){a((function(e){return!e}))},children:"Reset"}),Object(ee.jsx)(we.a,{variant:"contained",color:"primary",onClick:O,children:"Save"})]}),Object(ee.jsx)("input",{type:"file",id:"import",ref:s,className:w.dnone,onChange:function(e){e.stopPropagation(),e.preventDefault(),m();var n=e.target.files[0],t=new FileReader;t.onload=function(e){try{var n=e.target.result,t=Re.xml2js(n);if(!t)throw"The reault of file's content is invalid, result: ".concat(t);var a=t.elements[0].elements.map((function(e){return e.elements[0].text}));b(U(a))}catch(r){alert("Cannot import XML file, please try again."),console.error(r)}},t.readAsText(n)}})]})},Ge=["children","value","index"];function Fe(e){var n=e.children,t=e.value,a=e.index,r=Object(re.a)(e,Ge);return Object(ee.jsx)("div",Object(ae.a)(Object(ae.a)({role:"tabpanel",hidden:t!==a,id:"full-width-tabpanel-".concat(a),"aria-labelledby":"full-width-tab-".concat(a)},r),{},{children:t===a&&Object(ee.jsx)(de.a,{p:3,children:Object(ee.jsx)(x.a,{children:n})})}))}function Ue(e){return{id:"full-width-tab-".concat(e),"aria-controls":"full-width-tabpanel-".concat(e)}}var He=function(){var e=Object(ce.a)(),n=Object(h.a)((function(e){return{root:{background:e.palette.background.default,height:"inherit"}}}))(),t=r.a.useState(0),a=Object(S.a)(t,2),c=a[0],i=a[1];return Object(ee.jsxs)("div",{className:n.root,children:[Object(ee.jsx)(le.a,{position:"sticky",color:"default",children:Object(ee.jsxs)(se.a,{value:c,onChange:function(e,n){i(n)},indicatorColor:"primary",textColor:"primary",variant:"fullWidth","aria-label":"full width tabs example",children:[Object(ee.jsx)(ue.a,Object(ae.a)({label:"General"},Ue(0))),Object(ee.jsx)(ue.a,Object(ae.a)({label:"About"},Ue(1)))]})}),Object(ee.jsxs)(oe.a,{index:c,onChangeIndex:function(e){i(e)},children:[Object(ee.jsx)(Fe,{value:c,index:0,dir:e.direction,children:Object(ee.jsx)(Le,{})}),Object(ee.jsx)(Fe,{value:c,index:1,dir:e.direction,children:"Coming Soon..."})]})]})};var Je=function(){return Object(ee.jsx)(ee.Fragment,{children:Object(ee.jsx)(d.a,{children:Object(ee.jsxs)(f.c,{children:[Object(ee.jsx)(f.a,{exact:!0,path:"/",children:Object(ee.jsx)(te,{})}),Object(ee.jsx)(f.a,{path:"/settings",children:Object(ee.jsx)(He,{})})]})})})},Ze=Object(A.a)({reducer:{gaol:_}}),We=(t(178),Object(o.a)({palette:{type:"dark"}}));i.a.render(Object(ee.jsx)(r.a.StrictMode,{children:Object(ee.jsxs)(l.a,{theme:We,children:[Object(ee.jsx)(s.a,{}),Object(ee.jsx)(u.a,{store:Ze,children:Object(ee.jsx)(Je,{})})]})}),document.getElementById("root"))}},[[179,1,2]]]);
//# sourceMappingURL=main.450242d2.chunk.js.map