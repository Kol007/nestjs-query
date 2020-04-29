(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{159:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return l}));var r=n(1),o=n(6),a=(n(0),n(215)),i={title:"Multiple Databases"},c={id:"typeorm/advanced/multiple-databases",title:"Multiple Databases",description:"`TypeOrm` offers the possibility to connect your application to multiple databases or schemas. More details on this can be found on their [official documentation](https://typeorm.io/#/multiple-connections).",source:"@site/docs/typeorm/advanced/multiple-databases.md",permalink:"/nestjs-query/docs/typeorm/advanced/multiple-databases",editUrl:"https://github.com/doug-martin/nestjs-query/edit/master/documentation/docs/typeorm/advanced/multiple-databases.md",sidebar:"docs",previous:{title:"Usage",permalink:"/nestjs-query/docs/typeorm/usage"},next:{title:"Soft Delete",permalink:"/nestjs-query/docs/typeorm/advanced/soft-delete"}},s=[{value:"Defining multiple connections",id:"defining-multiple-connections",children:[]},{value:"Create a new Feature Module",id:"create-a-new-feature-module",children:[]},{value:"Custom TypeOrmQueryService",id:"custom-typeormqueryservice",children:[]}],p={rightToc:s};function l(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"TypeOrm")," offers the possibility to connect your application to multiple databases or schemas. More details on this can be found on their ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://typeorm.io/#/multiple-connections"}),"official documentation"),"."),Object(a.b)("p",null,"Further, the official ",Object(a.b)("inlineCode",{parentName:"p"},"@nestjs/typeorm")," package also provides functionality to support multiple databases within the application. For details, consider the ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://docs.nestjs.com/techniques/database#multiple-databases"}),"official documentation"),"."),Object(a.b)("p",null,"Therefore, ",Object(a.b)("inlineCode",{parentName:"p"},"@nestjs-query/query-typeorm")," also offers this functionality. This section will walk you through a short example indicating how to connect your application to multiple databases. Further, this will assume, that you ",Object(a.b)("strong",{parentName:"p"},"already have a working application with a configured database"),". Please note that only key aspects are shown here:"),Object(a.b)("h2",{id:"defining-multiple-connections"},"Defining multiple connections"),Object(a.b)("p",null,"First lets set up a constants file to hold our connection names."),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"// constants.ts\nexport const MUSIC_DB_CONNECTION = 'default';\nexport const SECRET_DB_CONNECTION = 'secret';\n")),Object(a.b)("p",null,"Then setup multiple database connections."),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"// app.module.ts\nimport { MUSIC_DB_CONNECTION, SECRET_DB_CONNECTION } from './constants';\n\nconst musicEntities = [\n  ArtistEntity,\n  AlbumEntity,\n  SongEntity,\n  GenreEntity,\n  // ...\n];\n\nconst secretEntities = [SecretEntity];\n\n@Module({\n  imports: [\n    ConfigModule.forRoot(environment),\n    TypeOrmModule.forRoot({\n      // name: MUSIC_DB_CONNECTION, // if you leave this out, this will be the \"default\" connection!\n      type: \"postgres\",\n      host: \"localhost\",\n      port: 5436,\n      username: 'user',\n      password: 'password',\n      database: 'music',\n      synchronize: true,\n      logging: true,\n      entities: musicEntities,\n    }),\n    // this also works with the ASYNC configuration!\n    TypeOrmModule.forRootAsync({\n      name: SECRET_DB_CONNECTION,   // you need to set the name here!\n      imports: [ConfigModule],\n      inject: [ConfigService],\n      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({\n        ...configService.get('dbConnections.secret'),\n        entities: secretEntities,\n      }),\n    }),\n    GraphQLModule.forRootAsync({\n      // ...\n    }),\n    // other modules\n  ],\n  controllers: [],\n  providers: [],\n})\nexport class AppModule {}\n")),Object(a.b)("p",null,"Of course, there can only be one ",Object(a.b)("inlineCode",{parentName:"p"},"default")," database connection. All other connections ",Object(a.b)("strong",{parentName:"p"},"must")," have a proper ",Object(a.b)("inlineCode",{parentName:"p"},"name")," set up. Further, this name ",Object(a.b)("strong",{parentName:"p"},"must")," be used when connecting against this specific entity."),Object(a.b)("h2",{id:"create-a-new-feature-module"},"Create a new Feature Module"),Object(a.b)("p",null,"Second, you need to create a new module for the feature that should store its data in another database using the previously defined connection."),Object(a.b)("p",null,"First, define your ",Object(a.b)("inlineCode",{parentName:"p"},"Entity")," class that is stored within the database"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"// app/modules/secret/secret.entity.ts\nimport { Entity, Column } from 'typeorm';\n\n@Entity('secrets')\nexport class SecretEntity {\n  // some properties here, like\n  @Column()\n  name: string;\n}\n")),Object(a.b)("p",null,"and the corresponding ",Object(a.b)("inlineCode",{parentName:"p"},"ObjectType")," that is used for ",Object(a.b)("inlineCode",{parentName:"p"},"GraphQL")),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"import { ObjectType, Field } from '@nestjs/graphql';\n\n@ObjectType('Secret')\nexport class SecretObject {\n  @Field()\n  name: string;\n}\n")),Object(a.b)("p",null,"Now lets register the ",Object(a.b)("inlineCode",{parentName:"p"},"SecretEntity")," with ",Object(a.b)("inlineCode",{parentName:"p"},"NestjsQueryTypeOrmModule"),". "),Object(a.b)("p",null,"The only difference is you need to pass the name of the ",Object(a.b)("inlineCode",{parentName:"p"},"Connection")," when importing respective ",Object(a.b)("inlineCode",{parentName:"p"},"TypeOrmModule"),"."),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"// app/modules/secret/secret.module.ts\nimport { Module } from '@nestjs/common';\nimport { SECRET_DB_CONNECTION } from '../constants';\nimport { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';\nimport { SecretEntity } from './secret.entity';\n\n@Module({\n  imports: [\n    NestjsQueryTypeOrmModule.forFeature(\n      [SecretEntity], \n      SECRET_DB_CONNECTION, // specify the connection name\n    )\n  ],  \n})\nexport class SecretModule {}\n")),Object(a.b)("p",null,"Once the ",Object(a.b)("inlineCode",{parentName:"p"},"SecretEntity")," is registered you can use the ",Object(a.b)("inlineCode",{parentName:"p"},"@InjectTypeOrmQueryService")," with your entities. "),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"@Resolver(() => SecretObject)\nexport class SecretResolver extends CRUDResolver(SecretObject) {\n  constructor(\n    @InjectTypeOrmQueryService(SecretEntity) readonly service: QueryService<SecretEntity>\n  ) {\n    super(service);\n  }\n}\n")),Object(a.b)("h2",{id:"custom-typeormqueryservice"},"Custom TypeOrmQueryService"),Object(a.b)("p",null,"If you want to create a custom ",Object(a.b)("inlineCode",{parentName:"p"},"SecretDatabaseService")," responsible for the database access, a custom ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"./usage.md"}),"TypeOrmQueryService"),", you need to pass an additional argument to the ",Object(a.b)("inlineCode",{parentName:"p"},"@InjectRepository()")," decorator that indicates the ",Object(a.b)("inlineCode",{parentName:"p"},"Connection")," you are using. This string has to match the ",Object(a.b)("inlineCode",{parentName:"p"},"name")," property in the ",Object(a.b)("inlineCode",{parentName:"p"},"TypeOrmModule")," options!"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"import { QueryService } from '@nestjs-query/core';\nimport { TypeOrmQueryService } from '@nestjs-query/query-typeorm';\nimport { InjectRepository } from '@nestjs/typeorm';\nimport { Repository } from 'typeorm';\nimport { SECRET_DB_CONNECTION } from '../constants';\nimport { SecretEntity } from './entities/secret.entity';\n\n@QueryService(SecretEntity)\nexport class SecretDatabaseService extends TypeOrmQueryService<SecretEntity> {\n  constructor(\n    @InjectRepository(SecretEntity, SECRET_DB_CONNECTION) repository: Repository<SecretEntity>,\n  ) {\n    super(repository);\n  }\n}\n")),Object(a.b)("p",null,"For the sake of brevity, the ",Object(a.b)("inlineCode",{parentName:"p"},"AssemblerService")," is not covered here, as it should not directly interact with the database itself. Therefore, no further adaptations are required. This also applies to the ",Object(a.b)("inlineCode",{parentName:"p"},"Resolver"),"!"),Object(a.b)("p",null,"For a full example see the ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/doug-martin/nestjs-query/tree/master/examples"}),"examples"),"."))}l.isMDXComponent=!0},215:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return d}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=o.a.createContext({}),l=function(e){var t=o.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):c({},t,{},e)),n},u=function(e){var t=l(e.components);return o.a.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=l(n),b=r,d=u["".concat(i,".").concat(b)]||u[b]||m[b]||a;return n?o.a.createElement(d,c({ref:t},p,{components:n})):o.a.createElement(d,c({ref:t},p))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=b;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var p=2;p<a;p++)i[p]=n[p];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);