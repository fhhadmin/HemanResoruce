(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{"2goY":function(t,e,n){"use strict";function i(t){return Object.prototype.toString.call(t).slice(8,-1)}function a(t){let e=[];function n(t){if(t&&"Object"===i(t)){if(-1!==e.indexOf(t))return!0;for(var a in e.push(t),t)if(!0===t.hasOwnProperty(a)&&n(t[a]))return!0}return!1}return n(t)}const o=function(t){if(null===t||void 0===t)return;const e=i(t);if("Date"===e){let e=new Date;return e.setTime(t.getTime()),e}if("Object"===e){if(!0===a(t))return t;let e={};for(let n in t)e[n]=o(t[n]);return e}if("Array"===e){let e=[];for(var n=0;n<t.length;n++)e.push(o(t[n]));return e}return t};t.exports=o},"Bda/":function(t,e,n){"use strict";var i=n("EEVd"),a=n.n(i);a.a},BqkH:function(t,e,n){},CDyh:function(t,e,n){},EEVd:function(t,e,n){},MTCC:function(t,e,n){},Niiq:function(t,e,n){},O8En:function(t,e,n){"use strict";var i=n("MTCC"),a=n.n(i);a.a},OVPL:function(t,e,n){"use strict";var i=n("BqkH"),a=n.n(i);a.a},RG4O:function(t,e,n){"use strict";var i=n("ugxR"),a=n.n(i);a.a},SYtW:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._l(t.rePic,function(e,i){return n("div",{staticClass:"imgClass"},[n("img",{staticClass:"imgClass-img",attrs:{src:e},on:{click:function(n){t.clickImg(e)}}}),t._v(" "),t.cancelShow?n("span",{staticClass:"imgClass-close",on:{click:function(e){t.closeClick(i)}}},[t._v("x")]):t._e()])}),t._v(" "),n("Modal",{attrs:{title:"图片"},on:{"on-cancel":t.cancel},model:{value:t.modal,callback:function(e){t.modal=e},expression:"modal"}},[n("img",{staticStyle:{width:"100%",height:"350px","list-style":"none",padding:"0",margin:"5px 0"},attrs:{src:t.imgUrl}})])],2)},a=[],o=(n("jbew"),{data:function(){return{imgUrl:"",modal:!1}},props:{rePic:{type:Array,default:function(){return[]}},cancelShow:{type:Boolean,default:!0}},methods:{clickImg:function(t){this.modal=!0,this.imgUrl=t},cancel:function(){},closeClick:function(t){this.$emit("closeClick",t)}}}),r=o,l=(n("ukxX"),n("KHd+")),s=Object(l["a"])(r,i,a,!1,null,null,null),c=s.exports;e["a"]=c},UNsD:function(t,e,n){"use strict";var i=n("Niiq"),a=n.n(i);a.a},a8rH:function(t,e,n){},ggpE:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{display:"inline-block"}},[n("div",{attrs:{slot:"footer"},slot:"footer"},[n("div",{staticClass:"mt15"},[n("div",{staticClass:"upload-container",attrs:{id:"container"}},[n("div",{staticClass:"upload-pickfiles",attrs:{id:"pickfiles"}},[n("Button",{attrs:{type:t.typeCustom,id:"pickfiles2"+t.uid,size:t.size,loading:t.uploading}},[t._t("default")],2)],1)])])])])},a=[],o=(n("f3/d"),n("VRzm"),n("f4Ay")),r=n("8SHQ"),l=r["a"].baseUrl.qiniuUrl,s=new o["a"](l),c=s,u=function(){return c.request({url:"admin/getQiNiuToken",method:"post"})},d={data:function(){return{uploading:!1,uptokenKey:"",currentFileOldName:"",uid:this._uid}},mounted:function(){var t=this;u().then(function(e){t.uptokenKey=e.info,t.$nextTick(function(){t.qiniu()})}).catch(function(t){console.log(t)})},props:{size:{type:String,default:"small"},typeCustom:{type:String,default:"success"}},methods:{qiniu:function(){var t=this;Qiniu.uploader({runtimes:"html5,flash,html4",browse_button:"pickfiles2"+this.uid,uptoken:t.uptokenKey,domain:"http://qiniu.dnwapp.com/",container:"container",max_file_size:"100mb",flash_swf_url:"plupload/Moxie.swf",max_retries:3,dragdrop:!0,drop_element:"container",chunk_size:"4mb",auto_start:!0,init:{UploadProgress:function(e,n){t.uploading=!0},FileUploaded:function(e,n,i){var a=JSON.parse(i),o=e.getOption("domain")+a.key;t.$emit("updateImg",o),t.uploading=!1},Error:function(e,n,i){t.uploading=!1,t.$Message.error("上传失败，请联系管理员")},Key:function(e,n){t.currentFileOldName=n.name;var i=n.name.lastIndexOf("."),a=n.name.substr(i+1),o=(new Date).getTime()+"."+a;return o}}})}}},p=d,m=(n("O8En"),n("KHd+")),f=Object(m["a"])(p,i,a,!1,null,null,null),h=f.exports;e["a"]=h},jbew:function(t,e,n){},"p+ls":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("Cascader",{staticStyle:{width:"200px",display:"inline-block","z-index":"9999"},attrs:{data:t.data,"load-data":t.loadData},on:{"on-change":t.getSiteDate},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})},a=[],o=(n("f3/d"),n("Zt8a")),r=function(){return o["a"].request({url:"getProvinceList",method:"post"})},l=function(t){var e=new URLSearchParams;return e.append("provinceId",t),o["a"].request({url:"getCityList",data:e,method:"post"})},s=function(t){var e=new URLSearchParams;return e.append("cityId",t),o["a"].request({url:"getAreaList",data:e,method:"post"})},c=n("2goY"),u=n.n(c),d={data:function(){return{data:[]}},props:{value:{type:Array,default:function(){return[]}}},methods:{getProvince:function(){var t=this;return r().then(function(e){var n=[];e.info.map(function(t){var e={};e.value=t.id,e.label=t.name,e.loading=!1,e.children=[],e.state="1",n.push(e)}),t.data=u()(n)}).catch(function(t){console.log(t)})},getCity:function(t){return l(t).then(function(t){var e=[];return t.info.map(function(t){var n={};n.value=t.id,n.label=t.name,n.loading=!1,n.children=[],n.state="2",e.push(n)}),u()(e)}).catch(function(t){console.log(t)})},getArea:function(t){return s(t).then(function(t){var e=[];return t.info.map(function(t){var n={};n.value=t.id,n.label=t.name,n.state="3",e.push(n)}),u()(e)}).catch(function(t){console.log(t)})},loadData:function(t,e){"1"===t.state?this.getCity(t.value).then(function(n){t.loading=!0,t.children=n,t.loading=!1,e()}).catch(function(t){console.log(t)}):"2"===t.state&&this.getArea(t.value).then(function(n){t.loading=!0,t.children=n,t.loading=!1,e()}).catch(function(t){console.log(t)})},getSiteDate:function(t){this.$emit("input",t)}},mounted:function(){this.getProvince()},watch:{}},p=d,m=(n("UNsD"),n("KHd+")),f=Object(m["a"])(p,i,a,!1,null,null,null);e["a"]=f.exports},pEBE:function(t,e,n){},uYIp:function(t,e,n){"use strict";var i=n("a8rH"),a=n.n(i);a.a},ugxR:function(t,e,n){},ukxX:function(t,e,n){"use strict";var i=n("pEBE"),a=n.n(i);a.a},vmhQ:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"bgImg",staticStyle:{width:"100%",height:"100%"}},[n("div",{staticClass:"mgMbl",staticStyle:{width:"490px"}},[n("span",{staticStyle:{color:"#348EED",cursor:"pointer"},on:{click:t.returnPage}},[t._v("\n      <<返回首页\n    ")]),t._v(" "),this.stateFill?n("fillInThePhone",{on:{getStatePhone:t.getStatePhone}}):t._e(),t._v(" "),this.stateFillSub?n("fillInTheForm",{ref:"fillInTheFormSub",attrs:{dLoginNameValue:t.dLoginName},on:{formSuccess:t.formSuccess}}):t._e(),t._v(" "),t.stateShow?n("showState",{attrs:{textValue:t.textValue}}):t._e()],1)])},a=[],o=(n("KKXr"),n("VRzm"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"password"},[n("Form",{ref:"formInline",staticStyle:{width:"300px"},attrs:{model:t.formInline,rules:t.ruleInline}},[n("div",{staticStyle:{"font-weight":"700","font-size":"32px","margin-bottom":"10px"}},[t._v("\n      入住\n    ")]),t._v(" "),n("FormItem",{attrs:{prop:"mobilePhone",label:"手机号（此手机号为登录系统账号）"}},[n("Input",{attrs:{type:"text",placeholder:"请输入手机号"},model:{value:t.formInline.mobilePhone,callback:function(e){t.$set(t.formInline,"mobilePhone",e)},expression:"formInline.mobilePhone"}},[n("Icon",{attrs:{slot:"prepend",type:"md-calculator"},slot:"prepend"})],1)],1),t._v(" "),n("FormItem",[n("Button",{attrs:{type:"primary",loading:t.loading},on:{click:function(e){t.handleSubmit("formInline")}}},[t._v("下一步")])],1)],1)],1)}),r=[],l=(n("f3/d"),n("CDyh"),n("Zt8a")),s=function(t){var e=new URLSearchParams;return e.append("accountName",t),l["a"].request({url:"getAccountDetail",data:e,method:"post"})},c={data:function(){var t=function(t,e,n){/^1[3|4|5|8][0-9]\d{4,8}$/.test(e)?n():n(new Error("请输入正确的手机号"))};return{formInline:{mobilePhone:""},ruleInline:{mobilePhone:[{required:!0,message:"手机号不能为空",trigger:"blur"},{validator:t,trigger:"blur"}]},loading:!1}},methods:{handleSubmit:function(t){var e=this;this.loading=!0,this.$refs[t].validate(function(t){t?s(e.formInline.mobilePhone).then(function(t){switch(t.info){case"该用户不存在,请去申请":e.$emit("getStatePhone","不存在:"+e.formInline.mobilePhone),e.loading=!1;break;case"通过":e.$emit("getStatePhone","通过:"+e.formInline.mobilePhone),e.loading=!1;break;case"未通过":e.$emit("getStatePhone","未通过:"+e.formInline.mobilePhone),e.loading=!1;break;case"审核中":e.$emit("getStatePhone","审核中:"+e.formInline.mobilePhone),e.loading=!1;break;default:}}).catch(function(t){e.loading=!1,e.$Message.error(t)}):(e.loading=!1,e.$Message.error("错误"))})}}},u=c,d=(n("uYIp"),n("KHd+")),p=Object(d["a"])(u,o,r,!1,null,"41845213",null),m=p.exports,f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"password"},[n("Form",{ref:"formInline",staticStyle:{width:"300px"},attrs:{model:t.formInline,rules:t.ruleInline}},[n("FormItem",{attrs:{prop:"deptName",label:"单位名称"}},[n("Input",{attrs:{type:"text",placeholder:"单位名称"},model:{value:t.formInline.deptName,callback:function(e){t.$set(t.formInline,"deptName",e)},expression:"formInline.deptName"}},[n("Icon",{attrs:{slot:"prepend",type:"ios-person-outline"},slot:"prepend"})],1)],1),t._v(" "),n("FormItem",{attrs:{prop:"cityId",label:"单位地址"}},[n("siteSelect",{staticStyle:{width:"300px"},model:{value:t.formInline.cityId,callback:function(e){t.$set(t.formInline,"cityId",e)},expression:"formInline.cityId"}})],1),t._v(" "),n("FormItem",{attrs:{prop:"deptAddr",label:"单位详细地址"}},[n("Input",{attrs:{type:"text",placeholder:"单位详细地址"},model:{value:t.formInline.deptAddr,callback:function(e){t.$set(t.formInline,"deptAddr",e)},expression:"formInline.deptAddr"}},[n("Icon",{attrs:{slot:"prepend",type:"ios-person-outline"},slot:"prepend"})],1)],1),t._v(" "),n("FormItem",{attrs:{prop:"deptPhone",label:"单位电话"}},[n("Input",{attrs:{type:"text",placeholder:"单位电话"},model:{value:t.formInline.deptPhone,callback:function(e){t.$set(t.formInline,"deptPhone",e)},expression:"formInline.deptPhone"}},[n("Icon",{attrs:{slot:"prepend",type:"ios-person-outline"},slot:"prepend"})],1)],1),t._v(" "),n("FormItem",{attrs:{prop:"deptNum",label:"单位编号"}},[n("Input",{attrs:{type:"text",placeholder:"单位编号"},model:{value:t.formInline.deptNum,callback:function(e){t.$set(t.formInline,"deptNum",e)},expression:"formInline.deptNum"}},[n("Icon",{attrs:{slot:"prepend",type:"ios-person-outline"},slot:"prepend"})],1)],1),t._v(" "),n("FormItem",{attrs:{prop:"allowPic",label:"营业执照"}},[n("div",{staticStyle:{display:"block",clear:"both"}}),t._v(" "),n("qiniu-img",{staticStyle:{display:"block"},attrs:{typeCustom:"default"},on:{updateImg:t.updateImg}},[t._v("\n        上传图片\n      ")]),t._v(" "),n("clickImg",{attrs:{rePic:t.formInline.allowPic},on:{closeClick:t.closeClick}})],1),t._v(" "),n("FormItem",[n("Button",{attrs:{type:"primary",loading:t.loading},on:{click:function(e){t.handleSubmit("formInline")}}},[t._v("提交")])],1)],1)],1)},h=[],g=n("p+ls"),v=n("ggpE"),I=n("SYtW"),b=function(t){var e=t.deptName,n=t.deptPhone,i=t.deptNum,a=t.deptAddr,o=t.cityId,r=t.dLoginName,s=t.allowPic;console.log(t);var c=new URLSearchParams;return c.append("deptName",e),c.append("deptPhone",n),c.append("allowPic",s),c.append("deptNum",i),c.append("deptAddr",a),c.append("cityId",o[2]),c.append("dLoginName",r),l["a"].request({url:"dept/add",data:c,method:"post"})},y={components:{siteSelect:g["a"],qiniuImg:v["a"],clickImg:I["a"]},data:function(){var t=function(t,e,n){/^1[3|4|5|8][0-9]\d{4,8}$/.test(e)?n():n(new Error("请输入正确的手机号"))};return{formInline:{deptName:"",deptPhone:"",deptNum:"",deptAddr:"",cityId:[],allowPic:[]},ruleInline:{deptName:[{required:!0,message:"单位名称不能为空",trigger:"blur"}],deptPhone:[{required:!0,message:"单位电话不能为空",trigger:"blur"},{validator:t,trigger:"blur"}],deptNum:[{required:!0,message:"单位编号不能为空",trigger:"blur"}],allowPic:[{required:!0,type:"array",min:1,message:"营业执照不能为空",trigger:"blur"}],cityId:[{required:!0,type:"array",min:1,message:"地址不能为空",trigger:"blur"}],deptAddr:[{required:!0,message:"单位详细地址不能为空",trigger:"blur"}]},loading:!1}},props:{dLoginNameValue:{type:String,default:""}},methods:{handleSubmit:function(t){var e=this;this.loading=!0,this.$refs[t].validate(function(t){t?(e.$Message.success("完成"),e.formInline.dLoginName=e.dLoginNameValue,b(e.formInline).then(function(t){e.loading=!1,e.$emit("formSuccess",!0)}).catch(function(t){e.loading=!1,e.$Message.error(t)})):(e.loading=!1,e.$Message.error("请完善信息"))})},updateImg:function(t){this.formInline.allowPic.push(t)},closeClick:function(t){this.formInline.allowPic.splice(t,1)}}},S=y,w=(n("OVPL"),Object(d["a"])(S,f,h,!1,null,"5b250da4",null)),k=w.exports,_=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"password"},[n("div",{staticStyle:{width:"300px","font-weight":"700","font-size":"42px"}},[t._v("\n    "+t._s(t.textValue)+"\n  ")])])},P=[],x={data:function(){return{}},props:{textValue:{type:String,default:"审核中"}},methods:{}},N=x,$=(n("RG4O"),Object(d["a"])(N,_,P,!1,null,"3ab01a43",null)),C=$.exports,F={name:"passwordForget",components:{fillInThePhone:m,fillInTheForm:k,showState:C},data:function(){return{stateFill:!0,stateShow:!1,stateFillSub:!1,dLoginName:0,textValue:""}},methods:{getStatePhone:function(t){var e=t.split(":")[0];switch(this.dLoginName=t.split(":")[1],console.log(this.$refs.fillInTheFormSub),e){case"不存在":this.stateFill=!1,this.stateFillSub=!0,this.stateShow=!1;break;case"审核中":this.showStateForm("审核中");break;case"通过":this.showStateForm("通过");break;case"未通过":this.showStateForm("未通过");break;default:}},showStateForm:function(t){this.textValue=t,this.stateFill=!1,this.stateFillSub=!1,this.stateShow=!0},formSuccess:function(t){t&&this.showStateForm("审核中")},returnPage:function(){this.$router.push({name:"login"})}}},E=F,q=(n("Bda/"),Object(d["a"])(E,i,a,!1,null,"63fdae0d",null));e["default"]=q.exports}}]);