(function(){"use strict";var t={5774:function(t,e,s){var o=s(9242),a=s(3396);function n(t,e,s,o,n,r){const i=(0,a.up)("ToDoList");return(0,a.wg)(),(0,a.j4)(i)}const r={class:"todoList"};function i(t,e,s,o,n,i){const l=(0,a.up)("ToDoListForm"),k=(0,a.up)("ToDoListList");return(0,a.wg)(),(0,a.iD)("div",r,[(0,a.Wm)(l,{onAddTask:t.addTask,onDeleteAllTasks:t.deleteAllTasks},null,8,["onAddTask","onDeleteAllTasks"]),(0,a.Wm)(k,{sortedTasks:t.sortedTasks,onMarkComplete:t.markComplete,onMarkImportant:t.markImportant,onDeleteTask:t.deleteTask},null,8,["sortedTasks","onMarkComplete","onMarkImportant","onDeleteTask"])])}const l={class:"todoList-form"};function k(t,e,s,n,r,i){return(0,a.wg)(),(0,a.iD)("fieldset",l,[(0,a.wy)((0,a._)("input",{type:"text",placeholder:"Description",class:"todoList-form__description-task","onUpdate:modelValue":e[0]||(e[0]=e=>t.input=e)},null,512),[[o.nr,t.input]]),(0,a._)("button",{class:"todoList-form__addTaskButton",onClick:e[1]||(e[1]=(...e)=>t.addTask&&t.addTask(...e))}," Add task "),(0,a._)("button",{class:"todoList-form__deleteAllTaskButton",onClick:e[2]||(e[2]=(...e)=>t.deleteAllTasks&&t.deleteAllTasks(...e))}," Delete all ")])}var d=(0,a.aZ)({name:"ToDoListForm",data:()=>({input:""}),methods:{addTask(){this.$emit("addTask",this.input),this.input=""},deleteAllTasks(){this.$emit("deleteAllTasks")}}}),m=s(89);const c=(0,m.Z)(d,[["render",k]]);var u=c;const p={class:"todoList-list"},h=(0,a._)("h3",null,"Tasks:",-1),f={class:"todoList-wrapper"};function T(t,e,s,o,n,r){const i=(0,a.up)("ToDoListTask");return(0,a.wg)(),(0,a.iD)("div",p,[h,(0,a._)("ul",f,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.sortedTasks,(e=>((0,a.wg)(),(0,a.j4)(i,{key:e.id,task:e,onMarkComplete:t.markComplete,onMarkImportant:t.markImportant,onDeleteTask:t.deleteTask},null,8,["task","onMarkComplete","onMarkImportant","onDeleteTask"])))),128))])])}var _=s(7139);const v={class:"taskItem__buttonsContainer"},g=["textContent"];function I(t,e,s,o,n,r){return(0,a.wg)(),(0,a.iD)("li",{key:t.task.id,class:(0,_.C_)(["taskItem",t.task.completed?"taskItem_completed":"",t.task.important?"taskItem_important":"",t.task.deleted?"taskItem_deletion":""])},[(0,a._)("div",v,[(0,a._)("button",{onClick:e[0]||(e[0]=e=>t.markComplete(t.task.id)),class:(0,_.C_)(["taskItem__button",t.task.completed?"taskItem__isCompleted":"taskItem__isNotCompleted"])},null,2),(0,a._)("button",{onClick:e[1]||(e[1]=e=>t.markImportant(t.task.id)),class:(0,_.C_)(["taskItem__button",t.task.important?"taskItem__isImportant":"taskItem__isNotImportant"])},null,2),(0,a._)("button",{onClick:e[2]||(e[2]=e=>t.deleteTask(t.task.id)),class:"taskItem__button taskItem__deleteButton"})]),(0,a._)("span",{class:"taskItem__description",textContent:(0,_.zw)(t.task.title)},null,8,g)],2)}var L=(0,a.aZ)({name:"ToDoListTask",props:{task:{type:Object}},methods:{markComplete(t){this.$emit("markComplete",t)},markImportant(t){this.$emit("markImportant",t)},deleteTask(t){this.$emit("deleteTask",t)}}});const C=(0,m.Z)(L,[["render",I]]);var D=C,b=(0,a.aZ)({name:"ToDoListList",props:{sortedTasks:{type:Array}},components:{ToDoListTask:D},methods:{markComplete(t){this.$emit("markComplete",t)},markImportant(t){this.$emit("markImportant",t)},deleteTask(t){this.$emit("deleteTask",t)}}});const w=(0,m.Z)(b,[["render",T]]);var y=w,Z=s(2482);class A{constructor(t){(0,Z.Z)(this,"id",void 0),(0,Z.Z)(this,"title",void 0),(0,Z.Z)(this,"completed",void 0),(0,Z.Z)(this,"important",void 0),(0,Z.Z)(this,"deleted",void 0),this.id=Date.now(),this.title=t,this.completed=!1,this.important=!1,this.deleted=!1}}var O=A,S=(0,a.aZ)({name:"ToDoList",props:{},components:{ToDoListForm:u,ToDoListList:y},data:()=>({tasks:[]}),methods:{addTask(t){if(t){const e=new O(t);this.tasks.push(e),this.setLocalStorage(this.tasks)}},deleteAllTasks(){this.tasks.forEach((t=>t.deleted=!0)),setTimeout((()=>{this.tasks=[],this.setLocalStorage(this.tasks)}),500)},deleteTask(t){this.tasks.forEach(((e,s)=>{e.id===t&&(e.deleted=!0,setTimeout((()=>{this.tasks.splice(s,1),this.setLocalStorage(this.tasks)}),500))}))},markComplete(t){this.tasks.forEach((e=>{e.id===t&&(e.completed=!e.completed)})),this.setLocalStorage(this.tasks)},markImportant(t){this.tasks.forEach((e=>{e.id===t&&(e.important=!e.important)})),this.setLocalStorage(this.tasks)},filterTasks(t){if(this.tasks.length>0){const e=t.length&&t.filter((t=>!1===t.completed&&!0===t.important)),s=t.length&&t.filter((t=>!1===t.completed&&!1===t.important)),o=t.length&&t.filter((t=>!0===t.completed&&!0===t.important)),a=t.length&&t.filter((t=>!0===t.completed&&!1===t.important));return[...e,...s,...o,...a]}return[]},getLocalStorage(){return localStorage.tasksvue?JSON.parse(localStorage.getItem("tasksvue")||"{}"):[]},setLocalStorage(t){localStorage.setItem("tasksvue",JSON.stringify(t))}},computed:{sortedTasks(){const t=this.filterTasks(this.tasks);return t}},mounted(){this.tasks=this.getLocalStorage()}});const j=(0,m.Z)(S,[["render",i]]);var M=j,$=(0,a.aZ)({name:"App",components:{ToDoList:M}});const x=(0,m.Z)($,[["render",n]]);var E=x;(0,o.ri)(E).mount("#app")}},e={};function s(o){var a=e[o];if(void 0!==a)return a.exports;var n=e[o]={exports:{}};return t[o](n,n.exports,s),n.exports}s.m=t,function(){var t=[];s.O=function(e,o,a,n){if(!o){var r=1/0;for(d=0;d<t.length;d++){o=t[d][0],a=t[d][1],n=t[d][2];for(var i=!0,l=0;l<o.length;l++)(!1&n||r>=n)&&Object.keys(s.O).every((function(t){return s.O[t](o[l])}))?o.splice(l--,1):(i=!1,n<r&&(r=n));if(i){t.splice(d--,1);var k=a();void 0!==k&&(e=k)}}return e}n=n||0;for(var d=t.length;d>0&&t[d-1][2]>n;d--)t[d]=t[d-1];t[d]=[o,a,n]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var o in e)s.o(e,o)&&!s.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};s.O.j=function(e){return 0===t[e]};var e=function(e,o){var a,n,r=o[0],i=o[1],l=o[2],k=0;if(r.some((function(e){return 0!==t[e]}))){for(a in i)s.o(i,a)&&(s.m[a]=i[a]);if(l)var d=l(s)}for(e&&e(o);k<r.length;k++)n=r[k],s.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return s.O(d)},o=self["webpackChunktodolist_vue"]=self["webpackChunktodolist_vue"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=s.O(void 0,[998],(function(){return s(5774)}));o=s.O(o)})();
//# sourceMappingURL=app.77bacedb.js.map