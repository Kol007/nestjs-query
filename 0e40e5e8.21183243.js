(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{107:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return s})),r.d(t,"metadata",(function(){return c})),r.d(t,"rightToc",(function(){return u})),r.d(t,"default",(function(){return l}));var n=r(2),o=r(6),i=(r(0),r(226)),s={title:"Custom Service"},c={id:"persistence/sequelize/custom-service",isDocsHomePage:!1,title:"Custom Service",description:"To create a custom query service to add your own methods to you can extend the SequelizeQueryService.",source:"@site/docs/persistence/sequelize/custom-service.md",permalink:"/nestjs-query/docs/persistence/sequelize/custom-service",editUrl:"https://github.com/doug-martin/nestjs-query/edit/master/documentation/docs/persistence/sequelize/custom-service.md",sidebar:"docs",previous:{title:"Getting Started",permalink:"/nestjs-query/docs/persistence/sequelize/getting-started"},next:{title:"Serialization",permalink:"/nestjs-query/docs/persistence/sequelize/serialization"}},u=[],a={rightToc:u};function l(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},a,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"To create a custom query service to add your own methods to you can extend the ",Object(i.b)("inlineCode",{parentName:"p"},"SequelizeQueryService"),"."),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts",metastring:'title="todo-item.service.ts"',title:'"todo-item.service.ts"'}),"import { QueryService } from '@nestjs-query/core';\nimport { InjectModel } from '@nestjs/sequelize';\nimport { SequelizeQueryService } from '@nestjs-query/query-sequelize';\nimport { TodoItemEntity } from './entity/todo-item.entity';\n\n@QueryService(TodoItemEntity)\nexport class TodoItemService extends SequelizeQueryService<TodoItemEntity> {\n  constructor(@InjectModel(TodoItemEntity) model: typeof TodoItemEntity) {\n    super(model);\n  }\n\n  async markAllAsCompleted(): Promise<number> {\n    const entities = await this.query({ filter: { completed: { is: true } } });\n\n    const { updatedCount } = await this.updateMany(\n      { completed: true }, // update\n      { id: { in: entities.map((e) => e.id) } }, // filter\n    );\n    // do some other business logic\n    return updatedCount;\n  }\n}\n")),Object(i.b)("p",null,"To use the custom service in the auto-generated resolver you can specify the ",Object(i.b)("inlineCode",{parentName:"p"},"ServiceClass")," option."),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts",metastring:'title="todo-item.module.ts" {12,16}',title:'"todo-item.module.ts"',"{12,16}":!0}),"import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';\nimport { NestjsQuerySequelizeModule } from '@nestjs-query/query-sequelize';\nimport { Module } from '@nestjs/common';\nimport { TodoItemDTO } from './dto/todo-item.dto';\nimport { TodoItemEntity } from './todo-item.entity';\nimport { TodoItemService } from './todo-item.service';\n\n@Module({\n  imports: [\n    NestjsQueryGraphQLModule.forFeature({\n      imports: [NestjsQuerySequelizeModule.forFeature([TodoItemEntity])],\n      services: [TodoItemService],\n      resolvers: [\n        {\n          DTOClass: TodoItemDTO,\n          ServiceClass: TodoItemService,\n        },\n      ],\n    }),\n  ],\n})\nexport class TodoItemModule {}\n\n")))}l.isMDXComponent=!0},226:function(e,t,r){"use strict";r.d(t,"a",(function(){return m})),r.d(t,"b",(function(){return y}));var n=r(0),o=r.n(n);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var a=o.a.createContext({}),l=function(e){var t=o.a.useContext(a),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},m=function(e){var t=l(e.components);return o.a.createElement(a.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,s=e.parentName,a=u(e,["components","mdxType","originalType","parentName"]),m=l(r),d=n,y=m["".concat(s,".").concat(d)]||m[d]||p[d]||i;return r?o.a.createElement(y,c(c({ref:t},a),{},{components:r})):o.a.createElement(y,c({ref:t},a))}));function y(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,s=new Array(i);s[0]=d;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:n,s[1]=c;for(var a=2;a<i;a++)s[a]=r[a];return o.a.createElement.apply(null,s)}return o.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"}}]);