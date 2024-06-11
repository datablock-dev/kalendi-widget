"use strict";var e=require("react/jsx-runtime"),s=require("react"),r=require("@mui/icons-material/Category"),t=require("@mui/icons-material/Person"),a=require("@mui/icons-material/Close"),i=require("dayjs"),d=require("dayjs/plugin/isBetween"),c=require("@mui/icons-material/KeyboardArrowLeft"),n=require("@mui/icons-material/KeyboardArrowRight"),l=require("@mui/icons-material/Image"),o=require("validator");
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function x(e,s,r,t){return new(r||(r=Promise))((function(s,a){function i(e){try{c(t.next(e))}catch(e){a(e)}}function d(e){try{c(t.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,d)}c((t=t.apply(e,[])).next())}))}function u({backendRoute:s,service_id:i,services:d,data:c,header:n,view:l,setView:o,selectedService:x,setSelectedService:u,selectedUser:m,setSelectedUser:p,selectedDate:b,users:f}){var v,h,j;return e.jsx(e.Fragment,{children:e.jsxs("div",Object.assign({className:"w-[100%]"},{children:[e.jsx("h3",Object.assign({className:"font-[600] text-[24px] mb-[10px]"},{children:n||"Book an Appointment"})),e.jsxs("div",Object.assign({className:"flex flex-col"},{children:[e.jsxs("div",Object.assign({className:"flex flex-row items-center gap-[10px] flex-wrap"},{children:[x&&"confirmation"!==l&&e.jsxs("div",Object.assign({className:"rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] select-none data-[selected=true]:bg-[#d4d4d4] max-w-fit flex flex-row gap-[10px] items-center"},{children:[e.jsx(r,{}),e.jsx("span",{children:null===(v=d.find((e=>e.service_id===x)))||void 0===v?void 0:v.service_name}),e.jsx("div",Object.assign({className:"w-[20px] h-[20px] flex items-center justify-center rounded-[50%] hover:bg-[#d4d4d4] hover:cursor-pointer",onClick:()=>{u(null),p(null),o("service")}},{children:e.jsx(a,{fontSize:"small"})}))]})),m&&f&&"confirmation"!==l&&e.jsxs("div",Object.assign({className:"rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] select-none data-[selected=true]:bg-[#d4d4d4] max-w-fit flex flex-row gap-[10px] items-center"},{children:[e.jsx(t,{}),e.jsxs("span",{children:[null===(h=f.find((e=>e.user_id===m)))||void 0===h?void 0:h.firstname," ",null===(j=f.find((e=>e.user_id===m)))||void 0===j?void 0:j.lastname]})]}))]})),e.jsx("div",Object.assign({className:"flex mt-[10px] flex-row gap-[10px] flex-wrap"},{children:"confirmation"!==l&&e.jsxs(e.Fragment,{children:[e.jsx("div",Object.assign({className:"rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] hover:cursor-pointer hover:bg-[#d4d4d4] select-none data-[selected=true]:bg-[#d4d4d4]",onClick:()=>{"service"!==l&&o("service")},"data-selected":"service"===l},{children:"Services"})),x&&e.jsx("div",Object.assign({className:"rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] hover:cursor-pointer hover:bg-[#d4d4d4] select-none data-[selected=true]:bg-[#d4d4d4]",onClick:()=>{"employee"!==l&&o("employee")},"data-selected":"employee"===l},{children:"Employees"})),x&&m&&e.jsx("div",Object.assign({className:"rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] hover:cursor-pointer hover:bg-[#d4d4d4] select-none data-[selected=true]:bg-[#d4d4d4]",onClick:()=>{"book"!==l&&o("book")},"data-selected":"book"===l},{children:"Book"})),b&&x&&m&&e.jsx("div",Object.assign({className:"rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] hover:cursor-pointer hover:bg-[#d4d4d4] select-none data-[selected=true]:bg-[#d4d4d4]",onClick:()=>{"date-selected"!==l&&o("date-selected")},"data-selected":"date-selected"===l},{children:"Confirm Booking"}))]})}))]}))]}))})}const m=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],p=["January","February","March","April","May","June","July"," August","September","October","November","December"];function b(e){const[s,r]=e.split("T");return`${s} ${r.replace("Z","")}`}const f=Array.from({length:24}).map(((e,s)=>{const r=s<10?"0":"";return[`${r}${s}:00`,`${r}${s}:15`,`${r}${s}:30`,`${r}${s}:45`]})).flat(1);function v({backendRoute:r,data:t,services:a,selectedUser:l,selectedService:o,setView:u,setSelectedDate:m}){i.extend(d);const p=i(),[v,j]=s.useState(0),[g,y]=s.useState(null),[w,_]=s.useState(null),[N,O]=s.useState(null),[k,S]=s.useState(null),$=a.find((e=>e.service_id===o));if(!$)return e.jsx("span",{children:"..."});function D(e){return x(this,0,void 0,(function*(){try{let s=null;if(!l||!e)return;const t=`${e[0].year}-${e[0].monthLeadingZero}-${e[0].dayOfMonthLeadingZero}`,a=`${e[4].year}-${e[4].monthLeadingZero}-${e[4].dayOfMonthLeadingZero}`;if(s=`${r}/public/availability/${l}/null/${t}/${a}`,!s)return;const i=yield fetch(s,{method:"GET"}),d=yield i.json();d.availability?_(d.availability):_(!1),d.bookings.length>0&&S(d.bookings),d.events&&O(d.events)}catch(e){console.error(e)}}))}function Y(e){"right"===e&&v<10?j(v+1):"left"===e&&v>0&&j(v-1)}return s.useEffect((()=>{g?g&&v!==g[0].weekFromCurrentWeek&&(y(h(p,v)),D(h(p,v))):y(h(p,v)),null===w&&l&&g&&D(g)}),[p,v]),e.jsxs("div",Object.assign({className:"h-[100%] w-[100%]"},{children:[e.jsxs("div",Object.assign({className:"flex flex-row justify-between w-[100%] h-[40px] mb-[10px]"},{children:[e.jsxs("div",Object.assign({className:"flex flex-row items-center gap-[6px] rounded-[3px] data-[selectable=true]:hover:cursor-pointer data-[selectable=false]:hover:cursor-not-allowed border-[#787878] border-[1px] border-solid px-[12px]","data-selectable":v>0,onClick:()=>{Y("left")}},{children:[e.jsx(c,{})," Previous Week"]})),e.jsxs("div",Object.assign({className:"flex flex-row items-center gap-[6px] rounded-[3px] data-[selectable=true]:hover:cursor-pointer data-[selectable=false]:hover:cursor-not-allowed data-[selectable=true]:hover:bg-[#d4d4d4] border-[#787878] border-[1px] border-solid px-[12px]","data-selectable":v<10,onClick:()=>{Y("right")}},{children:["Next Week ",e.jsx(n,{})]}))]})),!g&&e.jsx("div",Object.assign({className:"w-[100%] h-[100%] flex justify-center items-center"},{children:e.jsx("div",Object.assign({id:"outer"},{children:e.jsx("div",Object.assign({id:"middle"},{children:e.jsx("div",{id:"inner"})}))}))})),e.jsx("div",Object.assign({className:"w-[100%] h-[50px] grid week-grid overflow-y-auto"},{children:g&&null!==w&&g.map((s=>e.jsx("div",Object.assign({className:"w-[100%] h-[100%] min-h-[100%] flex flex-col odd:bg-[#c4c4c48a]","data-date":s.date.format("YYYY-MM-DD")},{children:e.jsxs("div",Object.assign({className:"flex flex-col items-center"},{children:[e.jsx("span",{children:s.weekDayString.substring(0,3)}),e.jsx("span",{children:s.dayOfMonth})]}))}),s.date.format("YYYY-MM-DD HH:mm:ss"))))})),e.jsx("div",Object.assign({className:"w-[100%] h-[calc(100%_-_100px)] grid week-grid overflow-y-auto relative"},{children:g&&null!==w&&g.map(((s,r)=>{const t=function(e,s){let r=!0;return e.forEach(((e,t)=>{const a=s?s[Object.keys(s)[2*t]]:null,i=s?s[Object.keys(s)[2*t+1]]:null;a&&i&&(r=!1)})),r}(g,w),a=w?w[Object.keys(w)[2*r]]:null,d=w?w[Object.keys(w)[2*r+1]]:null;let c=f,n=!1;if(s.date.isBefore(p,"day")&&(n=!0,c=[]),a?(c=c.filter((e=>e>=a)),c.length>0&&d&&(c=c.filter((e=>e<d)))):c=[],$.service_time_block){const e=$.service_time_block/15;c=c.filter(((s,r)=>r%e==0))}if(i().isSame(s.date,"day")&&(c=c.filter((e=>{const[s,r]=e.split(":").map((e=>parseInt(e)));return i().get("hour")<s||i().get("hour")===s&&i().get("minute")<r?e:void 0}))),N){const e=i(s.date);N.forEach((s=>{const r=i(b(s.from_timestamp)),t=i(b(s.to_timestamp));t.diff(r,"hour")>24&&i(e).isBetween(r,t,"minute")&&(c=[])}))}if(k){const e=i(s.date);$.service_time_block,k.forEach((s=>{const{from_timestamp:r,to_timestamp:t}=s;i(b(r));const[a,d]=r.split("T");a===e.format("YYYY-MM-DD")&&(c=c.filter((e=>{if(i().set("hour",parseInt(e.split(":")[0])).set("minute",parseInt(e.split(":")[1])),e!==d.substring(0,5))return e})))}))}return e.jsx("div",Object.assign({className:"w-[100%] h-[100%] min-h-[100%] flex flex-col","data-date":s.date.format("YYYY-MM-DD")},{children:e.jsxs("div",Object.assign({className:"flex flex-col h-[100%] items-center gap-[10px] bg-[#fff] pt-[10px]"},{children:[c.length>0&&c.filter((e=>parseInt(e.substring(0,2))>=7)).map((r=>e.jsx("div",Object.assign({className:"rounded-[3px] bg-[#fff] py-[4px] px-[4px] border-solid border-[#d4d4d4] border-[1px] hover:cursor-pointer hover:bg-[#e4e4e4]",onClick:()=>{const e=`${s.year}-${s.monthLeadingZero}-${s.dayOfMonthLeadingZero} ${r}:00`;m(i(e)),u("date-selected")}},{children:e.jsx("span",{children:r})}),s.weekDayString+r))),!t&&0===c.length&&!n&&e.jsx("div",{children:e.jsx("span",Object.assign({className:"text-wrap"},{children:"No available slots"}))}),t&&2===r&&!n&&e.jsx("div",Object.assign({className:"bg-[#1890ff] text-[#fff] px-[12px] py-[8px] rounded-[3px] border-[1px] hover:cursor-pointer hover:brightness-80 absolute bottom-[50%]"},{children:e.jsx("span",{children:"Next available time"})})),n&&e.jsx("div",{className:"w-[calc(100%_-_2px)] h-[100%] bg-[repeating-linear-gradient(45deg,#606dbc,#606dbc_10px,#465298_10px,#465298_20px)] rounded-[3px]"})]}))}),s.date.format("YYYY-MM-DD HH:mm:ss"))}))}))]}))}function h(e,s){const r=i(e),t=r.day(),a=new Array,d=t>0?1-r.day():-6,c=r.add(d,"day").add(s,"week");return Array.from({length:5}).forEach(((e,r)=>{const t=c.add(r,"day");a.push({dayOfMonth:t.date(),dayOfMonthLeadingZero:t.date()>=10?`${t.date()}`:`0${t.date()}`,year:t.year(),month:t.month(),monthLeadingZero:t.month()+1>=10?`${t.month()+1}`:`0${t.month()+1}`,monthString:p[t.month()],daysInMonth:t.daysInMonth(),weekDay:t.day(),weekDayString:m[t.day()],date:t,weekFromCurrentWeek:s})})),a}function j({service:s,backendRoute:r,selectedService:t,setSelectedService:a,setView:i}){return e.jsxs("div",Object.assign({className:"list-item justify-between"},{children:[e.jsxs("div",Object.assign({className:"flex flex-row items-center gap-[10px]"},{children:[s.service_image?e.jsx("img",{className:"w-[50px] h-[50px] rounded-[50%] object-cover bg-[#d4d4d4]",src:s.service_image?`${r}/upload/${s.service_image}`:"",alt:"service_image"}):e.jsx("div",Object.assign({className:"w-[50px] h-[50px] rounded-[50%] object-cover bg-[#d4d4d4] text-[12px] flex items-center justify-center"},{children:e.jsx(l,{})})),e.jsx("span",{children:s.service_name})]})),e.jsx("div",{className:"rounded-[50%] h-[20px] w-[20px] border-[#787878] border-[1px] data-[selected=true]:bg-[#50913b] data-[selected=true]:border-[#141414] hover:bg-[#d4d4d4] hover:cursor-pointer","data-selected":t===s.service_id,onClick:()=>{t===s.service_id?a(null):(a(s.service_id),i("employee"))}})]}),s.service_id)}function g({backendRoute:r,services:t,setView:a,selectedService:i,setSelectedService:d,selectedUser:c,setSelectedUser:n,data:l}){return s.useEffect((()=>{}),[i,c]),e.jsx("div",Object.assign({className:""},{children:e.jsxs("div",Object.assign({className:"list"},{children:[t&&!c&&t.sort(((e,s)=>e.service_name<s.service_name?-1:1)).map((s=>e.jsx(j,{service:s,backendRoute:r,selectedService:i,setSelectedService:d,setView:a},s.service_id))),c&&l&&l.filter((e=>e.user_id===c)).sort(((e,s)=>e.service_name<s.service_name?-1:1)).map((s=>e.jsx(j,{service:s,backendRoute:r,selectedService:i,setSelectedService:d,setView:a},s.service_id)))]}))}))}function y({label:s,type:r,onChangeCallBack:t,forwardRef:a}){return e.jsxs("div",Object.assign({className:"flex flex-col gap-[4px] w-[100%]"},{children:[e.jsx("label",Object.assign({className:"font-[500]"},{children:s})),e.jsx("input",{className:"rounded-[3px] border-[1px] border-[#787878] border-solid h-[44px] w-[100%] pl-[8px]",type:r,onChange:t,ref:a})]}))}function w({children:s,text:r,style:t,callBack:a,isClickable:i=!0,isLoading:d=!1,loadingColor:c}){return e.jsxs("button",Object.assign({className:i?"border-[1px] bg-[#141414] text-[#fff] rounded-[3px] py-[8px] mt-[20px] hover:bg-[#484848]":"border-[1px] bg-[#aaaaaa] text-[#fff] border-[#787878] rounded-[3px] py-[8px] mt-[20px] hover:cursor-not-allowed",style:t||void 0,onClick:a&&i?a:void 0},{children:[d&&e.jsx("div",Object.assign({className:"flex items-center justify-center"},{children:e.jsx("svg",Object.assign({className:"animate-spin",style:{fill:c||"#000"},xmlns:"http://www.w3.org/2000/svg",height:"24",width:"24",viewBox:"0 -960 960 960"},{children:e.jsx("path",{d:"M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"})}))})),r&&!d&&r]}))}function _({backendRoute:r,data:t,services:a,selectedUser:i,selectedService:d,selectedDate:c,setView:n,setCustomerData:u}){const[m,p]=s.useState(!1),[b,f]=s.useState(!1),v=s.useRef(null),h=s.useRef(null),j=a.find((e=>e.service_id===d)),g=t.find((e=>e.user_id===i));if(!j||!g)return e.jsx("div",{children:"Error..."});function _(){if(!v.current||!h.current)return p(!1);const e=v.current.value,s=h.current.value;return o.isEmail(s)?e.length<2?p(!1):void p(!0):p(!1)}return e.jsxs("div",Object.assign({className:"w-[100%] h-[100%] flex flex-col"},{children:[e.jsxs("div",Object.assign({className:"flex flex-row gap-[6px] items-center mb-[10px]"},{children:[e.jsx("label",Object.assign({className:"font-[600]"},{children:"Date:"})),e.jsxs("div",Object.assign({className:"flex flex-row items-center gap-[10px]"},{children:[e.jsx("span",Object.assign({className:"bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid"},{children:c.format("YYYY-MM-DD")})),e.jsx("span",Object.assign({className:"bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid"},{children:c.format("HH:mm")})),e.jsx("span",Object.assign({className:"bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid"},{children:c.add(j.service_time_block,"minutes").format("HH:mm")}))]}))]})),e.jsxs("div",Object.assign({className:"flex flex-row flex-wrap gap-[10px]"},{children:[e.jsxs("div",Object.assign({className:"flex flex-col items-center rounded-[3px] border-[#787878] border-[1px] border-solid sd:w-[100%] md:w-[min(calc(50%_-_5px),500px)] py-[10px]"},{children:[e.jsx("label",Object.assign({className:"font-[600]"},{children:"Service"})),e.jsxs("div",Object.assign({className:"flex flex-row items-center gap-[10px]"},{children:[j.service_image?e.jsx("img",{className:"image-round",src:j.service_image?`${r}/upload/${j.service_image}`:"",alt:"service_image"}):e.jsx("div",Object.assign({className:"image-round text-[12px] flex items-center justify-center"},{children:e.jsx(l,{})})),e.jsx("span",{children:j.service_name})]}))]})),e.jsxs("div",Object.assign({className:"flex flex-col items-center rounded-[3px] border-[#787878] border-[1px] border-solid sd:w-[100%] md:w-[min(calc(50%_-_5px),500px)] py-[10px]"},{children:[e.jsx("label",Object.assign({className:"font-[600]"},{children:"Employee"})),e.jsxs("div",Object.assign({className:"flex flex-row items-center gap-[10px]"},{children:[g.avatar?e.jsx("img",{className:"image-round",src:g.avatar?`${r}/upload/${g.avatar}`:"",alt:"user_avatar"}):e.jsx("div",Object.assign({className:"image-round text-[12px] flex items-center justify-center"},{children:"N/A"})),e.jsxs("span",{children:[g.firstname," ",g.lastname]})]}))]}))]})),e.jsxs("div",Object.assign({className:"grid grid-cols-[repeat(2,calc(50%_-_5px))] gap-[10px] mt-[20px] sd:flex sd:flex-col sd:gap-[10px]"},{children:[e.jsx(y,{label:"Name",forwardRef:v,onChangeCallBack:_}),e.jsx(y,{label:"Email",type:"Email",forwardRef:h,onChangeCallBack:_})]})),e.jsx(w,{text:"Book",callBack:function(){return x(this,0,void 0,(function*(){try{if(!j)return;if(!v.current||!h.current)return p(!1);const e=v.current.value,s=h.current.value;if(!o.isEmail(s))return alert("Please provide a valid email address");if(e.length<2)return alert("Please provide a valid name value");f(!0);if(!t.find((e=>e.user_id===i&&e.service_id===d)))return f(!1);const a={user_id:i,service_id:d,from_timestamp:c.format("YYYY-MM-DD HH:mm:ss"),to_timestamp:c.add(null==j?void 0:j.service_time_block,"minutes").format("YYYY-MM-DD HH:mm:ss"),customer:{name:e,email:s}};yield fetch(`${r}/public`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(a)});return u({name:e,email:s}),f(!1),void n("confirmation")}catch(e){console.error(e)}}))},isClickable:m,isLoading:b,loadingColor:"#fff"})]}))}function N({backendRoute:s,data:r,setView:a,selectedService:i,selectedUser:d,setSelectedUser:c}){return e.jsx("div",{children:e.jsx("div",Object.assign({className:"list"},{children:r.filter((e=>e.service_id===i)).sort(((e,s)=>e.firstname>s.firstname?1:-1)).map((r=>e.jsxs("div",Object.assign({className:"list-item justify-between"},{children:[e.jsxs("div",Object.assign({className:"flex flex-row items-center gap-[10px]"},{children:[r.avatar?e.jsx("img",{className:"w-[50px] h-[50px] rounded-[50%] object-cover bg-[#d4d4d4]",src:r.avatar?`${s}/upload/${r.avatar}`:"",alt:"service_image"}):e.jsx("div",Object.assign({className:"w-[50px] h-[50px] rounded-[50%] object-cover bg-[#d4d4d4] text-[12px] flex items-center justify-center"},{children:e.jsx(t,{})})),e.jsxs("span",{children:[r.firstname," ",r.lastname]})]})),e.jsx("div",{className:"rounded-[50%] h-[20px] w-[20px] border-[#787878] border-[1px] data-[selected=true]:bg-[#50913b] hover:bg-[#d4d4d4] hover:cursor-pointer","data-selected":d===r.user_id,onClick:()=>{d===r.user_id?c(null):c(r.user_id),a("book")}})]}),r.user_id)))}))})}function O({backendRoute:s,data:r,services:t,selectedUser:a,selectedService:i,selectedDate:d,customerData:c}){const n=t.find((e=>e.service_id===i)),o=r.find((e=>e.user_id===a));return n&&o?e.jsxs("div",Object.assign({className:"w-[100%] h-[100%] flex flex-col"},{children:[e.jsxs("p",Object.assign({className:"whitespace-pre-line text-[18px]"},{children:["Dear ",e.jsx("span",Object.assign({className:"font-[600]"},{children:c.name})),",",e.jsx("br",{}),e.jsx("br",{}),"We are thrilled to confirm that your booking has been successfully processed. Please review the details below to ensure that everything aligns with your request:"]})),e.jsxs("div",Object.assign({className:"flex flex-col items-center mx-[20px]"},{children:[e.jsxs("div",Object.assign({className:"flex flex-row items-center gap-[10px]"},{children:[e.jsx("span",Object.assign({className:"bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid"},{children:d.format("YYYY-MM-DD")})),e.jsx("span",Object.assign({className:"bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid"},{children:d.format("HH:mm")})),e.jsx("span",{children:"to"}),e.jsx("span",Object.assign({className:"bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid"},{children:d.add(n.service_time_block,"minutes").format("HH:mm")}))]})),e.jsxs("div",Object.assign({className:"flex flex-col flex-wrap gap-[10px] my-[10px] w-fit"},{children:[e.jsxs("div",Object.assign({className:"flex flex-col items-center rounded-[3px] border-[#787878] border-[1px] border-solid sd:w-[100%] md:w-[300px] py-[10px]"},{children:[e.jsx("label",Object.assign({className:"font-[600]"},{children:"Service"})),e.jsxs("div",Object.assign({className:"flex flex-row items-center gap-[10px]"},{children:[n.service_image?e.jsx("img",{className:"image-round",src:n.service_image?`${s}/upload/${n.service_image}`:"",alt:"service_image"}):e.jsx("div",Object.assign({className:"image-round text-[12px] flex items-center justify-center"},{children:e.jsx(l,{})})),e.jsx("span",{children:n.service_name})]}))]})),e.jsxs("div",Object.assign({className:"flex flex-col items-center rounded-[3px] border-[#787878] border-[1px] border-solid sd:w-[100%] md:w-[300px] py-[10px]"},{children:[e.jsx("label",Object.assign({className:"font-[600]"},{children:"Employee"})),e.jsxs("div",Object.assign({className:"flex flex-row items-center gap-[10px]"},{children:[o.avatar?e.jsx("img",{className:"image-round",src:o.avatar?`${s}/upload/${o.avatar}`:"",alt:"user_avatar"}):e.jsx("div",Object.assign({className:"image-round text-[12px] flex items-center justify-center"},{children:"N/A"})),e.jsxs("span",{children:[o.firstname," ",o.lastname]})]}))]}))]}))]})),e.jsxs("p",{children:["A confirmation email has been sent to the email address provided during booking.",e.jsx("br",{}),"If you do not see it in your inbox, please check your spam or junk folder. Thank you for choosing our service. We look forward to serving you. If you have any questions or need further assistance, please feel free to reach out to us."]})]})):e.jsx("div",{children:"Error..."})}function k({backendRoute:r,services:t,data:a,view:i,setView:d,selectedUser:c,setSelectedUser:n,selectedService:l,setSelectedService:o,selectedDate:x,setSelectedDate:u}){const[m,p]=s.useState(null);return s.useEffect((()=>{u(null)}),[c]),e.jsxs("div",Object.assign({className:"overflow-y-scroll w-[100%] h-[100%] mt-[10px]"},{children:["service"===i&&e.jsx(g,{backendRoute:r,services:t,setView:d,selectedService:l,setSelectedService:o,selectedUser:c,setSelectedUser:n,data:a}),"employee"===i&&a&&l&&e.jsx("div",{children:e.jsx(N,{backendRoute:r,data:a,setView:d,selectedService:l,selectedUser:c,setSelectedUser:n})}),"book"===i&&l&&c&&e.jsx(v,{backendRoute:r,data:a,services:t,selectedUser:c,selectedService:l,setView:d,setSelectedDate:u}),l&&c&&x&&t&&a&&e.jsxs(e.Fragment,{children:["date-selected"===i&&e.jsx(_,{backendRoute:r,data:a,services:t,selectedUser:c,selectedService:l,selectedDate:x,setView:d,setCustomerData:p}),"confirmation"===i&&m&&e.jsx(O,{backendRoute:r,customerData:m,data:a,services:t,selectedUser:c,selectedService:l,selectedDate:x})]})]}))}exports.KalendiContainer=function({backendRoute:r,user_id:t,service_id:i,closeCallback:d,header:c}){const[n,l]=s.useState(null),[o,m]=s.useState(null);s.useState(null);const[p,b]=s.useState(null),[f,v]=s.useState(!0),[h,j]=s.useState("service"),[g,y]=s.useState(i||null),[w,_]=s.useState(t||null),[N,O]=s.useState(null);if(!r)throw new TypeError("backendRoute prop must be provided!");return s.useEffect((()=>{null===p&&function(){x(this,0,void 0,(function*(){try{let e=null;if(t&&!i?e=`${r}/public/user_data/${t}`:i&&!t?e=`${r}/public/user_data/null/${i}`:i&&t?e=`${r}/public/user_data/${t}/${i}`:i||t||(e=`${r}/public/user_data`),!e)return;const s=yield fetch(e,{method:"GET"}),a=yield s.json();b(a);const d=new Set,c=new Array;a.forEach((e=>{d.has(e.service_id)||(c.push({service_id:e.service_id,service_image:e.service_image,service_name:e.service_name,service_price:e.service_price,service_currency:e.service_currency,service_time_block:e.service_time_block}),d.add(e.service_id))})),l(c),v(!1)}catch(e){console.error(e),v(!1),b(!1)}}))}()}),[p]),s.useEffect((()=>{if(null===o&&p){const e=new Set,s=new Array;p.forEach((r=>{e.has(r.user_id)||(s.push({user_id:r.user_id,firstname:r.firstname,lastname:r.lastname,avatar:r.avatar,title:r.title,email:r.email,admin_id:r.admin_id}),e.add(r.user_id))})),m(s)}}),[o,p]),e.jsxs("div",Object.assign({className:"kalendi-container"},{children:[e.jsxs("div",Object.assign({className:"kalendi-widget-wrapper","data-loading":f},{children:[e.jsx("div",Object.assign({className:"absolute flex justify-center items-center right-[20px] top-[20px] rounded-[50%] w-[30px] h-[30px] hover:cursor-pointer hover:opacity-80 hover:bg-[#d4d4d4]",onClick:d},{children:e.jsx(a,{})})),f&&e.jsx("svg",Object.assign({className:"animate-spin",style:{fill:"#000"},xmlns:"http://www.w3.org/2000/svg",height:"80",width:"80",viewBox:"0 -960 960 960"},{children:e.jsx("path",{d:"M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"})})),!f&&p&&n&&e.jsxs(e.Fragment,{children:[e.jsx(u,{backendRoute:r,service_id:i,services:n,data:p,header:c,selectedService:g,setSelectedService:y,selectedUser:w,setSelectedUser:_,selectedDate:N,users:o,view:h,setView:j}),e.jsx(k,{backendRoute:r,services:n,data:p,view:h,setView:j,selectedUser:w,setSelectedUser:_,selectedService:g,setSelectedService:y,selectedDate:N,setSelectedDate:O})]})]})),e.jsx("a",Object.assign({className:"absolute bottom-[10px]",href:"https://datablock.dev"},{children:"Powered by Kalendi"}))]}))};