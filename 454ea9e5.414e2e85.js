(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{130:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return p}));var r=n(1),a=n(6),o=(n(0),n(215)),i={title:"DTOs"},c={id:"concepts/dtos",title:"DTOs",description:"Throughout the documentation you will read about DTOs (Data Transfer Object). If you have never heard of a DTO before you can read about them [here](https://martinfowler.com/eaaCatalog/dataTransferObject.html)",source:"@site/docs/concepts/dtos.md",permalink:"/nestjs-query/docs/concepts/dtos",editUrl:"https://github.com/doug-martin/nestjs-query/edit/master/documentation/docs/concepts/dtos.md",sidebar:"docs",previous:{title:"Example",permalink:"/nestjs-query/docs/introduction/example"},next:{title:"Queries",permalink:"/nestjs-query/docs/concepts/queries"}},s=[{value:"Why are DTOs separate from the database entity definition?",id:"why-are-dtos-separate-from-the-database-entity-definition",children:[]}],u={rightToc:s};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Throughout the documentation you will read about DTOs (Data Transfer Object). If you have never heard of a DTO before you can read about them ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://martinfowler.com/eaaCatalog/dataTransferObject.html"}),"here")),Object(o.b)("p",null,"In the ",Object(o.b)("inlineCode",{parentName:"p"},"nestjs-query")," packages there are two types of DTOs referenced."),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},"Read DTO - The DTO returned from queries and certain mutations, the read DTO does not typically define validation and is used as the basis for querying and filtering."),Object(o.b)("li",{parentName:"ol"},"Input DTOs - The DTO used when creating or updating records. The input DTO typically defines user input validation, and a subset of fields from the read DTO that the end user can modify.")),Object(o.b)("p",null,"To read more about DTOs in graphql check out the ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"../graphql/dtos"}),"DTO docs in the graphql section"),"."),Object(o.b)("h2",{id:"why-are-dtos-separate-from-the-database-entity-definition"},"Why are DTOs separate from the database entity definition?"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"They don't have to be!")),Object(o.b)("p",null,"Often times the overhead of maintaining two classes that mirror each other is not worth the overhead."),Object(o.b)("p",null,"As your application grows you may want to separate them to prevent leaking of certain fields, renaming columns or changing your DB definition while making the change in your API passive."),Object(o.b)("p",null,"It is recommended to create an input DTO to make clear what an end user can specify for input and to make your business logic more concise based on the type you are working with.  "))}p.isMDXComponent=!0},215:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return b}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=a.a.createContext({}),p=function(e){var t=a.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):c({},t,{},e)),n},l=function(e){var t=p(e.components);return a.a.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},f=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),l=p(n),f=r,b=l["".concat(i,".").concat(f)]||l[f]||d[f]||o;return n?a.a.createElement(b,c({ref:t},u,{components:n})):a.a.createElement(b,c({ref:t},u))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=f;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var u=2;u<o;u++)i[u]=n[u];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}f.displayName="MDXCreateElement"}}]);