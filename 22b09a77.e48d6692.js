(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{118:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return d})),n.d(t,"default",(function(){return p}));var a=n(2),r=n(6),o=(n(0),n(226)),i=n(230),s=n(231),c={title:"Federation"},l={id:"graphql/federation",isDocsHomePage:!1,title:"Federation",description:"nestjs-query provides basic federation support, with the intention of helping to",source:"@site/docs/graphql/federation.mdx",permalink:"/nestjs-query/docs/graphql/federation",editUrl:"https://github.com/doug-martin/nestjs-query/edit/master/documentation/docs/graphql/federation.mdx",sidebar:"docs",previous:{title:"Types",permalink:"/nestjs-query/docs/graphql/types"},next:{title:"v0.5.x to v0.6.x",permalink:"/nestjs-query/docs/migration-guides/v0.5.x-to-v0.6.x"}},d=[{value:"Base Type",id:"base-type",children:[{value:"Base Type",id:"base-type-1",children:[]},{value:"Auto Generated Resolver",id:"auto-generated-resolver",children:[]},{value:"Manual Resolver",id:"manual-resolver",children:[]},{value:"App Module",id:"app-module",children:[]}]},{value:"Reference Base Type",id:"reference-base-type",children:[{value:"@Reference Decorator",id:"reference-decorator",children:[]},{value:"Resolver",id:"resolver",children:[]}]},{value:"Federated Relations",id:"federated-relations",children:[{value:"RelationQueryService",id:"relationqueryservice",children:[]},{value:"Add the Connection",id:"add-the-connection",children:[]},{value:"Federation Resolver",id:"federation-resolver",children:[]}]},{value:"Complete Example",id:"complete-example",children:[]}],b={rightToc:d};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"nestjs-query")," provides ",Object(o.b)("strong",{parentName:"p"},"basic")," federation support, with the intention of helping to"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Plug into existing federated graphs, through references."),Object(o.b)("li",{parentName:"ul"},"Create a federated relations/connections on types defined in other services.")),Object(o.b)("p",null,"These docs assume you have read"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(a.a)({parentName:"li"},{href:"https://docs.nestjs.com/graphql/federation"}),"https://docs.nestjs.com/graphql/federation")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(a.a)({parentName:"li"},{href:"https://www.apollographql.com/docs/apollo-server/federation/introduction/"}),"https://www.apollographql.com/docs/apollo-server/federation/introduction/"))),Object(o.b)("h2",{id:"base-type"},"Base Type"),Object(o.b)("p",null,"The simplest way to integrate with a federated graph is through references."),Object(o.b)("p",null,"A reference is an object that looks like"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"{ __typename: 'TodoItem', id: subTask.todoItemId }\n")),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"__typename")," lets the gateway know which type is being referenced with additional fields that can be used to uniquely identify the type."),Object(o.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(o.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(o.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(o.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"note")),Object(o.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(o.b)("p",{parentName:"div"},"Both of the examples below add a ",Object(o.b)("inlineCode",{parentName:"p"},"resolveReference")," function see ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.apollographql.com/docs/apollo-server/federation/entities/#resolving"}),"https://www.apollographql.com/docs/apollo-server/federation/entities/#resolving")))),Object(o.b)("p",null,"To reference a type in ",Object(o.b)("inlineCode",{parentName:"p"},"nestjs-query")," you must first create DTO that defines the base type."),Object(o.b)("h3",{id:"base-type-1"},"Base Type"),Object(o.b)("p",null,"The base type in its own service must be decorated with federated directives specifying its key."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts",metastring:'title="todo-item/todo-item.dto.ts"',title:'"todo-item/todo-item.dto.ts"'}),"import { FilterableField } from '@nestjs-query/query-graphql';\nimport { ObjectType, ID, GraphQLISODateTime, Directive } from '@nestjs/graphql';\n\n@ObjectType('TodoItem')\n@Directive('@key(fields: \"id\")')\nexport class TodoItemDTO {\n  @FilterableField(() => ID)\n  id!: number;\n  ...\n}\n")),Object(o.b)("h3",{id:"auto-generated-resolver"},"Auto Generated Resolver"),Object(o.b)("p",null,"When using the ",Object(o.b)("inlineCode",{parentName:"p"},"NestjsQueryGraphQLModule")," module add the ",Object(o.b)("inlineCode",{parentName:"p"},"referenceBy")," option that ",Object(o.b)("inlineCode",{parentName:"p"},"nestjs-query")," will use to automatically expose add a ",Object(o.b)("inlineCode",{parentName:"p"},"@ResolveReference")," decorator and method that the gateway can use."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts",metastring:'title="todo-item/todo-item.module.ts" {14-15}',title:'"todo-item/todo-item.module.ts"',"{14-15}":!0}),"import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';\nimport { Module } from '@nestjs/common';\nimport { TodoItemDTO } from './todo-item.dto';\nimport { TodoItemEntity } from './todo-item.entity';\n\n@Module({\n  imports: [\n    NestjsQueryGraphQLModule.forFeature({\n      imports: [ /* import the nestjs-query persistence module*/],\n      resolvers: [\n        {\n          DTOClass: TodoItemDTO,\n          EntityClass: TodoItemEntity,\n          // specify the referenceBy option letting nestjs-query know to to resolve a reference\n          referenceBy: { key: 'id' },\n        },\n      ],\n    }),\n  ],\n})\nexport class TodoItemModule {}\n\n")),Object(o.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(o.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(o.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(o.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"note")),Object(o.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(o.b)("p",{parentName:"div"},"The ",Object(o.b)("inlineCode",{parentName:"p"},"referenceBy.key")," should be the field you want to look up the DTO by."))),Object(o.b)("h3",{id:"manual-resolver"},"Manual Resolver"),Object(o.b)("p",null,"If you want to manually define your resolver pass in the ",Object(o.b)("inlineCode",{parentName:"p"},"referenceBy")," option to the ",Object(o.b)("inlineCode",{parentName:"p"},"CRUDResolver"),"."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts",metastring:'title="todo-item.resolver.ts" {3-4}',title:'"todo-item.resolver.ts"',"{3-4}":!0}),"@Resolver(() => TodoItemDTO)\nexport class TodoItemResolver extends CRUDResolver(TodoItemDTO, {\n  // specify the referenceBy option letting nestjs-query know to to resolve a reference\n  referenceBy: { key: 'id' },\n}) {\n  constructor(@InjectQueryService(TodoItemEntity) readonly service: QueryService<TodoItemEntity>) {\n    super(service);\n  }\n}\n")),Object(o.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(o.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(o.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(o.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"note")),Object(o.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(o.b)("p",{parentName:"div"},"The ",Object(o.b)("inlineCode",{parentName:"p"},"referenceBy.key")," should be the field you want to look up the DTO by."))),Object(o.b)("h3",{id:"app-module"},"App Module"),Object(o.b)("p",null,"This app module ",Object(o.b)("strong",{parentName:"p"},"must")," also use the ",Object(o.b)("inlineCode",{parentName:"p"},"GraphQLFederationModule")," in order for the base type to be resolved by the gateway."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts",metastring:'title="app.module.ts"',title:'"app.module.ts"'}),"import { GraphQLFederationModule } from '@nestjs/graphql';\n\n@Module({\n  imports: [\n    TypeOrmModule.forRoot(ormconfig as TypeOrmModuleOptions),\n    GraphQLFederationModule.forRoot({\n      autoSchemaFile: 'schema.gql',\n    }),\n    TodoItemModule,\n  ],\n})\nexport class AppModule {}\n")),Object(o.b)("h2",{id:"reference-base-type"},"Reference Base Type"),Object(o.b)("p",null,"In a separate service from the one defining the base type above, we can use Apollo Federation to extend that base type."),Object(o.b)("p",null,"To do this with ",Object(o.b)("inlineCode",{parentName:"p"},"nestjs-query")," you must create a type that extends the base type contained in some other graphql service."),Object(o.b)("div",{className:"admonition admonition-warning alert alert--danger"},Object(o.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(o.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"}),Object(o.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"})))),"warning")),Object(o.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(o.b)("p",{parentName:"div"},"The type name must be the same name as the type it extends in the graph."))),Object(o.b)("p",null,"For example"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts",metastring:'title="sub-task/todo-item-reference.dto.ts" {4-5}',title:'"sub-task/todo-item-reference.dto.ts"',"{4-5}":!0}),"import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';\n\n@ObjectType('TodoItem')\n@Directive('@extends')\n@Directive('@key(fields: \"id\")')\nexport class TodoItemReferenceDTO {\n  @Field(() => ID)\n  @Directive('@external')\n  id!: number;\n}\n\n")),Object(o.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(o.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(o.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(o.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"note")),Object(o.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(o.b)("p",{parentName:"div"},"Notice how the ",Object(o.b)("inlineCode",{parentName:"p"},"@Directive")," decorator is used to add the ",Object(o.b)("inlineCode",{parentName:"p"},"@extends")," annotation along with the ",Object(o.b)("inlineCode",{parentName:"p"},"@keys"),"."),Object(o.b)("p",{parentName:"div"},"To read more about ",Object(o.b)("inlineCode",{parentName:"p"},"@extends")," annotation see ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.apollographql.com/docs/apollo-server/federation/entities/#extending"}),"https://www.apollographql.com/docs/apollo-server/federation/entities/#extending")))),Object(o.b)("h3",{id:"reference-decorator"},"@Reference Decorator"),Object(o.b)("p",null,"To reference a type defined in another service you can use the ",Object(o.b)("inlineCode",{parentName:"p"},"@Reference")," decorator."),Object(o.b)("p",null,"When using the ",Object(o.b)("inlineCode",{parentName:"p"},"@Reference")," decorator ",Object(o.b)("inlineCode",{parentName:"p"},"nestjs-query")," will ",Object(o.b)("strong",{parentName:"p"},"NOT")," look up the relation through the ",Object(o.b)("inlineCode",{parentName:"p"},"QueryService"),", instead return a reference type like the one described above."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts",metastring:'title="sub-task/sub-task.dto.ts" {5-6}',title:'"sub-task/sub-task.dto.ts"',"{5-6}":!0}),"import { FilterableField, Reference } from '@nestjs-query/query-graphql';\nimport { ObjectType, ID, GraphQLISODateTime } from '@nestjs/graphql';\n\n@ObjectType('SubTask')\n// add a todoItem reference and use the subTask.todoItemId as the id\n@Reference('todoItem', () => TodoItemReferenceDTO, { id: 'todoItemId' })\nexport class SubTaskDTO {\n  @FilterableField(() => ID)\n  id!: number;\n\n  @FilterableField()\n  title!: string;\n\n  @FilterableField({ nullable: true })\n  description?: string;\n\n  @FilterableField()\n  completed!: boolean;\n\n  @FilterableField(() => GraphQLISODateTime)\n  created!: Date;\n\n  @FilterableField(() => GraphQLISODateTime)\n  updated!: Date;\n\n  @FilterableField()\n  todoItemId!: string;\n}\n")),Object(o.b)("p",null,"In the above example we provided the keys which look like the following"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"{ id: 'todoItemId' }\n")),Object(o.b)("p",null,"Which will map the ",Object(o.b)("inlineCode",{parentName:"p"},"SubTask.todoItemId")," to the ",Object(o.b)("inlineCode",{parentName:"p"},"id")," field in the reference type."),Object(o.b)("p",null,"Assuming you have the following ",Object(o.b)("inlineCode",{parentName:"p"},"SubTask")),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"{id: 1, title: 'Sub Task 1', completed: false, todoItemId: 2}\n")),Object(o.b)("p",null,"The reference type would be"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"{ __typename: 'TodoItem', id: 2 }\n")),Object(o.b)("h3",{id:"resolver"},"Resolver"),Object(o.b)("p",null,"Now that we have added the decorator the ",Object(o.b)("inlineCode",{parentName:"p"},"nestjs-query")," resolver will automatically add the reference to the graphql type when using ",Object(o.b)("inlineCode",{parentName:"p"},"NestjsQueryGraphQLModule")," or ",Object(o.b)("inlineCode",{parentName:"p"},"CRUDResolver")),Object(o.b)(i.a,{defaultValue:"module",values:[{label:"NestjsQueryGraphQLModule",value:"module"},{label:"CRUDResolver",value:"resolver"}],mdxType:"Tabs"},Object(o.b)(s.a,{value:"module",mdxType:"TabItem"},Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts",metastring:'title="sub-task/sub-task.module.ts"',title:'"sub-task/sub-task.module.ts"'}),"import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';\nimport { Module } from '@nestjs/common';\nimport { SubTaskDTO } from './dto/sub-task.dto';\nimport { SubTaskEntity } from './sub-task.entity';\n\n@Module({\n  imports: [\n    NestjsQueryGraphQLModule.forFeature({\n      imports: [ /* import the nestjs-query persistence module*/],\n      resolvers: [{ DTOClass: SubTaskDTO, EntityClass: SubTaskEntity }],\n    }),\n  ],\n})\nexport class SubTaskModule {}\n"))),Object(o.b)(s.a,{value:"resolver",mdxType:"TabItem"},Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts",metastring:'title="sub-task/sub-task.resolver.ts"',title:'"sub-task/sub-task.resolver.ts"'}),"import { QueryService, InjectQueryService } from '@nestjs-query/core';\nimport { CRUDResolver } from '@nestjs-query/query-graphql';\nimport { Resolver } from '@nestjs/graphql';\nimport { SubTaskDTO } from './sub-task.dto';\nimport { TodoItemReferenceDTO } from './dto/todo-item-reference.dto';\nimport { SubTaskEntity } from './sub-task.entity';\n\n@Resolver(() => SubTaskDTO)\nexport class SubTaskResolver extends CRUDResolver(SubTaskDTO) {\n  constructor(@InjectQueryService(SubTaskEntity) readonly service: QueryService<SubTaskEntity>) {\n    super(service);\n  }\n}\n")))),Object(o.b)("h2",{id:"federated-relations"},"Federated Relations"),Object(o.b)("p",null,"Another common use case is to add ",Object(o.b)("inlineCode",{parentName:"p"},"relations")," to a federated type from another service."),Object(o.b)("p",null,"Lets continue with the ",Object(o.b)("inlineCode",{parentName:"p"},"SubTask")," example used above. We have add a ",Object(o.b)("inlineCode",{parentName:"p"},"todoItem")," reference to the ",Object(o.b)("inlineCode",{parentName:"p"},"SubTask")," but now lets add subTasks to the ",Object(o.b)("inlineCode",{parentName:"p"},"TodoItem"),"."),Object(o.b)("h3",{id:"relationqueryservice"},"RelationQueryService"),Object(o.b)("p",null,"The first step is to create a ",Object(o.b)("inlineCode",{parentName:"p"},"RelationQueryService"),". The ",Object(o.b)("inlineCode",{parentName:"p"},"RelationQueryService")," is a special type of ",Object(o.b)("inlineCode",{parentName:"p"},"QueryService")," that allows looking up relations without defining them in your entity."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts",metastring:'title="todo-item.service.ts"',title:'"todo-item.service.ts"'}),"import { InjectQueryService, QueryService, RelationQueryService } from '@nestjs-query/core';\nimport { TodoItemReferenceDTO } from './todo-item-reference.dto';\nimport { SubTaskEntity } from './sub-task.entity';\n\n@QueryService(TodoItemReferenceDTO)\nexport class TodoItemService extends RelationQueryService<TodoItemReferenceDTO> {\n  constructor(@InjectQueryService(SubTaskEntity) readonly subTaskService: QueryService<SubTaskEntity>) {\n    super({\n      // the name of the relation\n      subTasks: {\n        service: subTaskService,\n        // a query factory that will take in the reference to create a query.\n        query: (todoItemReferenceDTO) => ({ filter: { todoItemId: { eq: todoItemReferenceDTO.id } } }),\n      },\n    });\n  }\n}\n\n")),Object(o.b)("p",null,"In this example we inject a ",Object(o.b)("inlineCode",{parentName:"p"},"SubTask")," service that will be used to look up ",Object(o.b)("inlineCode",{parentName:"p"},"subTask")," relations. The ",Object(o.b)("inlineCode",{parentName:"p"},"query")," method is used to filter relations when ",Object(o.b)("inlineCode",{parentName:"p"},"findRelation")," or ",Object(o.b)("inlineCode",{parentName:"p"},"queryRelations")," is called."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"{\n  // the name of the relation\n  subTasks: {\n    // the service to delegate to when looking up the relations\n    service: subTaskService,\n    // a query factory that will take in the reference to create a query.\n    query: (todoItemReferenceDTO) => ({ filter: { todoItemId: { eq: todoItemReferenceDTO.id } } }),\n  },\n}\n")),Object(o.b)("h3",{id:"add-the-connection"},"Add the Connection"),Object(o.b)("p",null,"Next we add the ",Object(o.b)("inlineCode",{parentName:"p"},"subTasks")," connection to the ",Object(o.b)("inlineCode",{parentName:"p"},"TodoItemReferenceDTO"),"."),Object(o.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(o.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(o.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(o.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"note")),Object(o.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(o.b)("p",{parentName:"div"},"The name of the relation should match the name of the relation defined by your ",Object(o.b)("inlineCode",{parentName:"p"},"RelationQueryService"),"."))),Object(o.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(o.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(o.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(o.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"note")),Object(o.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(o.b)("p",{parentName:"div"},"The same pattern applies when you have a single relation and use the ",Object(o.b)("inlineCode",{parentName:"p"},"@Relation")," decorator."))),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts",metastring:"title='sub-task/todo-item-reference.dto.ts'",title:"'sub-task/todo-item-reference.dto.ts'"}),"import { Connection } from '@nestjs-query/query-graphql';\nimport { ObjectType, Directive, Field, ID } from '@nestjs/graphql';\nimport { SubTaskDTO } from './sub-task.dto';\n\n@ObjectType('TodoItem')\n@Directive('@extends')\n@Directive('@key(fields: \"id\")')\n@Connection('subTasks', () => SubTaskDTO)\nexport class TodoItemReferenceDTO {\n  @Field(() => ID)\n  @Directive('@external')\n  id!: number;\n}\n\n")),Object(o.b)("h3",{id:"federation-resolver"},"Federation Resolver"),Object(o.b)("p",null,"Next we set up our resolver that exposes the relations in the schema. As with other resolvers you can use the ",Object(o.b)("inlineCode",{parentName:"p"},"NestjsQueryGraphQLModule")," or define your own ",Object(o.b)("inlineCode",{parentName:"p"},"FederationResolver"),"."),Object(o.b)(i.a,{defaultValue:"module",values:[{label:"NestjsQueryGraphQLModule",value:"module"},{label:"FederationResolver",value:"resolver"}],mdxType:"Tabs"},Object(o.b)(s.a,{value:"module",mdxType:"TabItem"},Object(o.b)("p",null,"When using the ",Object(o.b)("inlineCode",{parentName:"p"},"NestjsQueryGraphQLModule")," set the ",Object(o.b)("inlineCode",{parentName:"p"},"type")," of the resolver to ",Object(o.b)("inlineCode",{parentName:"p"},"federated"),", and specify the ",Object(o.b)("inlineCode",{parentName:"p"},"Service"),"."),Object(o.b)("p",null,"Also, add the ",Object(o.b)("inlineCode",{parentName:"p"},"TodoItemService")," to the ",Object(o.b)("inlineCode",{parentName:"p"},"services")," option to make it available for nest to inject the service into the auto-generated resolver."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts",metastring:'title="sub-task/sub-task.module.ts" {12,18-22}',title:'"sub-task/sub-task.module.ts"',"{12,18-22}":!0}),"import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';\nimport { Module } from '@nestjs/common';\nimport { SubTaskDTO } from './dto/sub-task.dto';\nimport { SubTaskEntity } from './sub-task.entity';\nimport { TodoItemReferenceDTO } from './dto/todo-item-reference.dto';\nimport { TodoItemService } from './todo-item.service';\n\n@Module({\n  imports: [\n    NestjsQueryGraphQLModule.forFeature({\n      imports: [/* import the nestjs-query persistence module*/],\n      services: [TodoItemService],\n      resolvers: [\n        {\n          DTOClass: SubTaskDTO,\n          EntityClass: SubTaskEntity,\n        },\n        {\n          type: 'federated',\n          DTOClass: TodoItemReferenceDTO,\n          Service: TodoItemService,\n        },\n      ],\n    }),\n  ],\n})\nexport class SubTaskModule {}\n\n"))),Object(o.b)(s.a,{value:"resolver",mdxType:"TabItem"},Object(o.b)("p",null,"When manually defining the resolver extend the ",Object(o.b)("inlineCode",{parentName:"p"},"FederationResolver"),"."),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"FederationResolver")," this will not set up any queries or mutations in the graph. Instead, it is used set up the reading of relations for a type that originates from another service."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts",metastring:'title="sub-task/todo-item.resolver.ts"',title:'"sub-task/todo-item.resolver.ts"'}),"import { FederationResolver } from '@nestjs-query/query-graphql';\nimport { Resolver } from '@nestjs/graphql';\nimport { TodoItemReferenceDTO } from './todo-item-reference.dto';\nimport { TodoItemService } from './todo-item.service';\n\n@Resolver(() => TodoItemReferenceDTO)\nexport class TodoItemResolver extends FederationResolver(TodoItemReferenceDTO) {\n  constructor(readonly service: TodoItemService) {\n    super(service);\n  }\n}\n")))),Object(o.b)("h2",{id:"complete-example"},"Complete Example"),Object(o.b)("p",null,"To see a complete example checkout ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/doug-martin/nestjs-query/tree/master/examples/federation"}),"https://github.com/doug-martin/nestjs-query/tree/master/examples/federation")))}p.isMDXComponent=!0},226:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return u}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=r.a.createContext({}),d=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},b=function(e){var t=d(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),b=d(n),m=a,u=b["".concat(i,".").concat(m)]||b[m]||p[m]||o;return n?r.a.createElement(u,s(s({ref:t},l),{},{components:n})):r.a.createElement(u,s({ref:t},l))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},227:function(e,t,n){"use strict";function a(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}t.a=function(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(r&&(r+=" "),r+=t);return r}},228:function(e,t,n){"use strict";var a=n(0);const r=Object(a.createContext)({tabGroupChoices:{},setTabGroupChoices:()=>{},isAnnouncementBarClosed:!1,closeAnnouncementBar:()=>{}});t.a=r},229:function(e,t,n){"use strict";var a=n(0),r=n(228);t.a=function(){return Object(a.useContext)(r.a)}},230:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(229),i=n(227),s=n(92),c=n.n(s);const l=37,d=39;t.a=function(e){const{block:t,children:n,defaultValue:s,values:b,groupId:p}=e,{tabGroupChoices:m,setTabGroupChoices:u}=Object(o.a)(),[h,j]=Object(a.useState)(s);if(null!=p){const e=m[p];null!=e&&e!==h&&b.some(t=>t.value===e)&&j(e)}const O=e=>{j(e),null!=p&&u(p,e)},v=[];return r.a.createElement("div",null,r.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(i.a)("tabs",{"tabs--block":t})},b.map(({value:e,label:t})=>r.a.createElement("li",{role:"tab",tabIndex:"0","aria-selected":h===e,className:Object(i.a)("tabs__item",c.a.tabItem,{"tabs__item--active":h===e}),key:e,ref:e=>v.push(e),onKeyDown:e=>((e,t,n)=>{switch(n.keyCode){case d:((e,t)=>{const n=e.indexOf(t)+1;e[n]?e[n].focus():e[0].focus()})(e,t);break;case l:((e,t)=>{const n=e.indexOf(t)-1;e[n]?e[n].focus():e[e.length-1].focus()})(e,t)}})(v,e.target,e),onFocus:()=>O(e),onClick:()=>O(e)},t))),r.a.createElement("div",{role:"tabpanel",className:"margin-vert--md"},a.Children.toArray(n).filter(e=>e.props.value===h)[0]))}},231:function(e,t,n){"use strict";var a=n(0),r=n.n(a);t.a=function(e){return r.a.createElement("div",null,e.children)}}}]);