"use client";
import{__awaiter as e,__generator as t}from"../node_modules/tslib/tslib.es6.js";import r,{useState as a,useEffect as c}from"react";import{KalendiNavbar as i}from"./components/KalendiNavbar.js";import{KalendiViewer as s}from"./components/KalendiViewer.js";import n from"../node_modules/@mui/icons-material/Close.js";function l(l){var o=l.backendRoute,d=l.user_id,u=l.service_id,m=l.closeCallback,v=l.header,p=a(null),_=p[0],h=p[1],f=a(null),b=f[0],w=f[1],E=a(null);E[0],E[1];var T=a(null),g=T[0],k=T[1],q=a(!0),S=q[0],y=q[1],x=a("service"),j=x[0],N=x[1],R=a(u||null),U=R[0],C=R[1],D=a(d||null),K=D[0],V=D[1],A=a(null),Q=A[0],B=A[1];if(!o)throw new TypeError("backendRoute prop must be provided!");return c((function(){null===g&&function(){e(this,void 0,void 0,(function(){var e,r,a,c,i;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,3,,4]),e=null,d&&!u?e="".concat(o,"/public/user_data/").concat(d):u&&!d?e="".concat(o,"/public/user_data/null/").concat(u):u&&d?e="".concat(o,"/public/user_data/").concat(d,"/").concat(u):u||d||(e="".concat(o,"/public/user_data")),e?[4,fetch(e,{method:"GET"})]:[2];case 1:return[4,t.sent().json()];case 2:return r=t.sent(),k(r),a=new Set,c=new Array,r.forEach((function(e){a.has(e.service_id)||(c.push({service_id:e.service_id,service_image:e.service_image,service_name:e.service_name,service_price:e.service_price,service_currency:e.service_currency,service_time_block:e.service_time_block}),a.add(e.service_id))})),h(c),y(!1),[3,4];case 3:return i=t.sent(),console.error(i),y(!1),k(!1),[3,4];case 4:return[2]}}))}))}()}),[g]),c((function(){if(null===b&&g){var e=new Set,t=new Array;g.forEach((function(r){e.has(r.user_id)||(t.push({user_id:r.user_id,firstname:r.firstname,lastname:r.lastname,avatar:r.avatar,title:r.title,email:r.email,admin_id:r.admin_id}),e.add(r.user_id))})),w(t)}}),[b,g]),r.createElement("div",{className:"kalendi-container"},r.createElement("div",{className:"kalendi-widget-wrapper","data-loading":S},r.createElement("div",{className:"absolute flex justify-center items-center right-[20px] top-[20px] rounded-[50%] w-[30px] h-[30px] hover:cursor-pointer hover:opacity-80 hover:bg-[#d4d4d4]",onClick:m},r.createElement(n,null)),S&&r.createElement("svg",{className:"animate-spin",style:{fill:"#000"},xmlns:"http://www.w3.org/2000/svg",height:"80",width:"80",viewBox:"0 -960 960 960"},r.createElement("path",{d:"M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"})),!S&&g&&_&&r.createElement(r.Fragment,null,r.createElement(i,{backendRoute:o,service_id:u,services:_,data:g,header:v,selectedService:U,setSelectedService:C,selectedUser:K,setSelectedUser:V,selectedDate:Q,users:b,view:j,setView:N}),r.createElement(s,{backendRoute:o,services:_,data:g,view:j,setView:N,selectedUser:K,setSelectedUser:V,selectedService:U,setSelectedService:C,selectedDate:Q,setSelectedDate:B}))),r.createElement("a",{className:"absolute bottom-[10px]",href:"https://datablock.dev"},"Powered by Kalendi"))}export{l as KalendiContainer};
