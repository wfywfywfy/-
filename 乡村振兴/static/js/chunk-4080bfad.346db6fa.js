(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4080bfad"],{2934:function(e,t,a){"use strict";a.d(t,"a",(function(){return o})),a.d(t,"b",(function(){return n}));var l=a("b775");function o(e){return Object(l["a"])({url:"/admin/v1/city/cityTree",method:"post",data:e})}function n(e){return Object(l["a"])({url:"/admin/v1/city/partyTree",method:"post",data:e})}},"3c5e":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"poor"},[a("el-row",[a("el-col",{attrs:{span:21}},[a("el-col",[a("div",{staticClass:"item"},[a("div",{staticClass:"item1"},[e._v("所在地区")]),a("div",{staticClass:"item2"},[e._v("天水市")])]),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"item"},[a("div",{staticClass:"item1"},[e._v("户编号")]),a("div",{staticClass:"item2"},[e._v("00365")])])]),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"item"},[a("div",{staticClass:"item1"},[e._v("户主姓名")]),a("div",{staticClass:"item2"},[e._v("王海兰")])])]),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"item"},[a("div",{staticClass:"item1"},[e._v("户主身份证")]),a("div",{staticClass:"item2"},[e._v("6532144")])])]),e._l(7,(function(t,l){return a("el-col",{key:l,attrs:{span:8}},[a("div",{staticClass:"item"},[a("div",{staticClass:"item1"},[e._v("所在地区")]),a("div",{staticClass:"item2"},[e._v("天水市")])])])}))],2)],1),a("el-col",[a("div",{staticClass:"PovertyInfo"},[a("div",{staticClass:"table-btn"},[a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.handleCreate}},[e._v(" 新增 ")])],1),a("div",{staticClass:"table-con"},[a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:e.tableData}},[a("el-table-column",{attrs:{label:"地区",align:"center",width:"270"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[a("span",[e._v(e._s(l.cityName))])]}}])}),a("el-table-column",{attrs:{label:"户主姓名",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[a("span",[e._v(e._s(l.poorName))])]}}])}),a("el-table-column",{attrs:{label:"户主身份证号",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[a("span",[e._v(e._s(l.cardNo))])]}}])}),a("el-table-column",{attrs:{label:"详细地址",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[a("span",[e._v(e._s(l.address))])]}}])}),a("el-table-column",{attrs:{label:"户主电话号码",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[a("span",[e._v(e._s(l.telephone))])]}}])}),a("el-table-column",{attrs:{label:"是否住在安置区",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[a("span",[e._v(e._s(l.name))])]}}])}),a("el-table-column",{attrs:{label:"安置区地址",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[a("span",[e._v(e._s(l.poorName))])]}}])}),a("el-table-column",{attrs:{label:"户属性",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[a("span",[e._v(e._s(l.type))])]}}])})],1)],1),a("el-dialog",{directives:[{name:"el-drag-dialog",rawName:"v-el-drag-dialog"}],attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible1},on:{"update:visible":function(t){e.dialogFormVisible1=t}}},[a("div",{staticClass:"mform"},[a("el-row",[a("el-col",[a("el-form",{ref:"dataForm",staticStyle:{width:"100%"},attrs:{rules:e.rules,model:e.temp,"label-position":e.labelPosition,"label-width":"150px"}},[a("el-form-item",{attrs:{label:"地区",prop:"cityName"}},[a("el-cascader",{staticStyle:{width:"300px"},attrs:{options:e.options,clearable:""},model:{value:e.temp.cityName,callback:function(t){e.$set(e.temp,"cityName",t)},expression:"temp.cityName"}})],1),a("el-form-item",{attrs:{label:"户主姓名",prop:"poorName"}},[a("el-input",{attrs:{placeholder:"姓名",maxlength:"64",clearable:""},model:{value:e.temp.poorName,callback:function(t){e.$set(e.temp,"poorName",t)},expression:"temp.poorName"}})],1),a("el-form-item",{attrs:{label:"户主身份证号",prop:"cardNo"}},[a("el-input",{attrs:{placeholder:"身份证号",maxlength:"64",clearable:""},model:{value:e.temp.cardNo,callback:function(t){e.$set(e.temp,"cardNo",t)},expression:"temp.cardNo"}})],1),a("el-form-item",{attrs:{label:"详细地址",prop:"address"}},[a("el-input",{attrs:{placeholder:"请输入详细地址",maxlength:"64",clearable:""},model:{value:e.temp.address,callback:function(t){e.$set(e.temp,"address",t)},expression:"temp.address"}})],1),a("el-form-item",{attrs:{label:"户主电话号码",prop:"telephone"}},[a("el-input",{attrs:{placeholder:"请输入手机号码",maxlength:"64",clearable:""},model:{value:e.temp.telephone,callback:function(t){e.$set(e.temp,"telephone",t)},expression:"temp.telephone"}})],1),a("el-form-item",{attrs:{label:"是否住在安置区",prop:"tenantCode"}},[a("el-radio-group",{model:{value:e.temp.radio,callback:function(t){e.$set(e.temp,"radio",t)},expression:"temp.radio"}},[a("el-radio",{attrs:{label:"1"}},[e._v("是")]),a("el-radio",{attrs:{label:"2"}},[e._v("否")])],1)],1),a("el-form-item",{attrs:{label:"安置区地址",prop:"tenantCode"}},[a("el-input",{attrs:{placeholder:"请输入安置区地址",maxlength:"64",clearable:""},model:{value:e.temp.tenantCode,callback:function(t){e.$set(e.temp,"tenantCode",t)},expression:"temp.tenantCode"}})],1),a("el-form-item",{attrs:{label:"户属性",prop:"type"}},[a("el-select",{attrs:{placeholder:"请选择户属性"},model:{value:e.temp.type,callback:function(t){e.$set(e.temp,"type",t)},expression:"temp.type"}},[a("el-option",{attrs:{label:"脱贫户",value:"1"}}),a("el-option",{attrs:{label:"脱贫不稳定户",value:"2"}})],1)],1)],1)],1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible1=!1}}},[e._v(" 取消 ")]),a("el-button",{attrs:{type:"primary",disabled:e.disabledStatus},on:{click:function(t){"create"===e.dialogStatus?e.createData():e.updateData()}}},[e._v(" 确定 ")])],1)])],1)])],1)],1)},o=[],n=(a("a15b"),a("b8d7")),i=a("6724"),s=a("a888"),r=a("211c"),c={components:{CityTree:r["a"]},directives:{waves:i["a"],elDragDialog:s["a"]},data:function(){return{options:[{value:"霞浦县",label:"霞浦县",children:[{value:"北壁乡",label:"北壁乡",children:[{value:"长春镇",label:"长春镇",children:[{value:"松城街道",label:"松城街道"},{value:"松港街道",label:"松港街道"},{value:"松山街道",label:"松山街道"}]},{value:"牙城镇",label:"牙城镇"},{value:"溪南镇",label:"溪南镇"},{value:"沙江镇",label:"沙江镇"},{value:"下浒镇",label:"下浒镇"},{value:"三沙镇",label:"三沙镇"}]},{value:"海岛乡",label:"海岛乡"},{value:"盐田畲族乡",label:"盐田畲族乡"},{value:"崇儒畲族乡",label:"崇儒畲族乡"},{value:"柏洋乡",label:"柏洋乡"}]}],disabledStatus:!1,textMap:{update:"编辑",create:"新增"},rules:{tenantName:[{required:!0,validator:this.checkTenantName,trigger:["blur","change"]}]},labelPosition:"right",temp:{id:void 0},dialogFormVisible1:!1,dialogStatus:"",obj:{},tableData:[{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-08",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-06",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-07",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"}]}},created:function(){window.innerWidth<700&&(this.labelPosition="top"),this.getList()},watch:{},methods:{getList:function(){var e=this,t={id:this.$route.query.id};console.log("params",t),Object(n["seepoorinfo"])(t).then((function(t){200===t.code&&(e.obj=t.obj[0],console.log("this.obj",e.obj),e.tableData=t.obj[0].poorList,console.log("this.obj",e.tableData))}))},handleDelete:function(e,t){e.id&&this.delete(e.id)},goDetail:function(){this.$router.push({path:"PovertyInfo-detail",query:{id:"11"}})},handleGetCityId:function(e){this.cityId=e},checkTenantName:function(e,t,a){if(!t)return a(new Error(this.$t("systenant.tenantName-required")));a()},handleUpdate:function(e){var t=this;this.temp=Object.assign({},e),this.dialogStatus="update",this.dialogFormVisible1=!0,this.$nextTick((function(){t.$refs["dataForm"].clearValidate()}))},handleCreate:function(){var e=this;this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible1=!0,this.$nextTick((function(){e.$refs["dataForm"].clearValidate()}))},resetTemp:function(){this.temp={id:void 0}},updateData:function(){var e=this;this.$refs["dataForm"].validate((function(t){t&&(e.disabledStatus=!0)}))},createData:function(){var e=this;this.$refs["dataForm"].validate((function(t){if(t){e.disabledStatus=!0;var a=e.temp.cityName.join(",");e.temp=Object.assign({},e.temp,{cityName:a})}}))}}},d=c,u=(a("6bc6"),a("2877")),p=Object(u["a"])(d,l,o,!1,null,"21a78948",null);t["default"]=p.exports},4182:function(e,t,a){},6724:function(e,t,a){"use strict";a("8d41");var l="@@wavesContext";function o(e,t){function a(a){var l=Object.assign({},t.value),o=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},l),n=o.ele;if(n){n.style.position="relative",n.style.overflow="hidden";var i=n.getBoundingClientRect(),s=n.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":(s=document.createElement("span"),s.className="waves-ripple",s.style.height=s.style.width=Math.max(i.width,i.height)+"px",n.appendChild(s)),o.type){case"center":s.style.top=i.height/2-s.offsetHeight/2+"px",s.style.left=i.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(a.pageY-i.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(a.pageX-i.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=o.color,s.className="waves-ripple z-active",!1}}return e[l]?e[l].removeHandle=a:e[l]={removeHandle:a},a}var n={bind:function(e,t){e.addEventListener("click",o(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[l].removeHandle,!1),e.addEventListener("click",o(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[l].removeHandle,!1),e[l]=null,delete e[l]}},i=function(e){e.directive("waves",n)};window.Vue&&(window.waves=n,Vue.use(i)),n.install=i;t["a"]=n},"6bc6":function(e,t,a){"use strict";a("4182")},"8d41":function(e,t,a){},a888:function(e,t,a){"use strict";a("caad"),a("2532"),a("ac1f"),a("5319"),a("99af");var l={bind:function(e,t,a){var l=e.querySelector(".el-dialog__header"),o=e.querySelector(".el-dialog");l.style.cssText+=";cursor:move;",o.style.cssText+=";top:0px;";var n=function(){return window.document.currentStyle?function(e,t){return e.currentStyle[t]}:function(e,t){return getComputedStyle(e,!1)[t]}}();l.onmousedown=function(e){var t=e.clientX-l.offsetLeft,i=e.clientY-l.offsetTop,s=o.offsetWidth,r=o.offsetHeight,c=document.body.clientWidth,d=document.body.clientHeight,u=o.offsetLeft,p=c-o.offsetLeft-s,m=o.offsetTop,f=d-o.offsetTop-r,v=n(o,"left"),b=n(o,"top");v.includes("%")?(v=+document.body.clientWidth*(+v.replace(/\%/g,"")/100),b=+document.body.clientHeight*(+b.replace(/\%/g,"")/100)):(v=+v.replace(/\px/g,""),b=+b.replace(/\px/g,"")),document.onmousemove=function(e){var l=e.clientX-t,n=e.clientY-i;-l>u?l=-u:l>p&&(l=p),-n>m?n=-m:n>f&&(n=f),o.style.cssText+=";left:".concat(l+v,"px;top:").concat(n+b,"px;"),a.child.$emit("dragDialog")},document.onmouseup=function(e){document.onmousemove=null,document.onmouseup=null}}}},o=function(e){e.directive("el-drag-dialog",l)};window.Vue&&(window["el-drag-dialog"]=l,Vue.use(o)),l.install=o;t["a"]=l},b8d7:function(e,t,a){"use strict";a.d(t,"e",(function(){return o})),a.d(t,"a",(function(){return n})),a.d(t,"c",(function(){return i})),a.d(t,"b",(function(){return s})),a.d(t,"d",(function(){return r}));var l=a("b775");function o(e){return Object(l["a"])({url:"/admin/v1/poor/poorinfoList",method:"post",data:e})}function n(e){return Object(l["a"])({url:"/admin/v1/poor/addpoorinfo",method:"post",data:e})}function i(e){return Object(l["a"])({url:"/admin/v1/poor/editpoorinfo",method:"post",data:e})}function s(e){return Object(l["a"])({url:"/admin/v1/poor/delpoorinfo",method:"post",data:e})}function r(e){return Object(l["a"])({url:"/admin/v1/poor/poorInformation",method:"post",data:e})}}}]);