這篇 README 分為兩部分，第一部分說明專案架構以及啟動/驗證/測試步驟，第二部分則是根據 [Youtube tutorials](https://youtube.com/playlist?list=PLpPqplz6dKxXICtNgHY1tiCPau_AwWAJU&si=bcgwV3eVYsUWdzJp) 所做的筆記。

---

## GraphQL - Beginner to Expert
Resources are credited by pedro tech and this playlist seems very insightful so I took notes.

### GraphQL 是什麼
- GraphQL 是一種查詢語言，GraphQL 不等於資料庫
- GraphQL 是介於前端跟後端中間
- Queries an API, not a database 
- 請求有兩種類型 (request, type):
  - Query: `GET`
  - Mutation: `PUT`, `DELETE`, `POST` (資料異動)
- GraphQL can exist in two ways in side of a normal application:
  1. GraphQL come from a completely different separate service from your backend, FE only communicate with GraphQL
  2. GraphQL exist as a part of your backend service.

### GraphQL 與 REST 的差異
- GraphQL 只有一個 endpoint `/graphql`

  | REST       | GQL      |
  |------------|----------|
  | /user      | /graphql |
  | /followers | /graphql |
  | /posts     | /graphql |

- Overfetching / Underfetching
  - 假設你設計了一個網站:
    - Over fetching in RESTFUL: 取得太多不會用到的數據
    - under fetching in RESTFUL: 為了取得追蹤人數, 用戶資料, 發文內容, 發送了一共3支API
- GraphQL 改成讓前端自行指定需要取得的數據

### 範例教你如何使用 GraphQL API 

[UI similar to GraphQL playground](https://countries.trevorblades.com/)

```graphql
type User {
  id: ID!
  name: String!
  age: Int!
  height: Float!
  isMarried: Boolean
  friends: [User!]
  videosPosted: [Video!]
}
type Video {
  id: ID!
  title: String!
  description: String!
}
```
- GraphQL 提供五種基本資料型別: ID, String, Int, Float, Boolean
- 因為資料庫都有ID，太常見所以自成一個資料型別
  > **ID**: 
  > The ID scalar type represents a unique identifier, often used to refetch an object or as key for a cache.
  > The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. 
  > When expected as an input type, any string (such as "4") or integer (such as 4) input value will be accepted as an ID.
- 上述的語法自定義了另外一個 type User
- `!` 表示為必要欄位/不可為null
- `[<custom-defined-type>]` 當某個欄位具有不只一個元素(array)，用中括號表示
- 通常array不會加!表示必填
  - `[User!]`: 不一定要有任何朋友，但是如果有朋友，一定要提供User
  - `[User:!]!`: 一定要有 array (通常array不需要為必填)

- 每個 GraphQL API 都必需要有 schema，這個 schema 跟資料庫的 db schema 不一樣
- 另外會有一個 root type 稱為 Query，裡面放不同查詢(查全部、以ID查單筆)
  ```graphqls
  type Query {
    users: [User]
    user(id: ID): User
  }
  ```
- 例如 Countries GraphQL API schema Query 就長這樣
  ```graphqls
  type Query {
    continent(code: ID!): Continent
    continents(filter: ContinentFilterInput = {}): [Continent!]!
    countries(filter: CountryFilterInput = {}): [Country!]!
    country(code: ID!): Country
    language(code: ID!): Language
    languages(filter: LanguageFilterInput = {}): [Language!]!
  }
  ```
- **input** 關鍵字是將QUERY傳入參數(如果兩個查詢條件或更多) 組織成一個結構的寫法
  ```
  input UserInput {
    id: ID
    name: String
  }
  type Query {
    users: [User]
    user(input: UserInput): User
  }
  type Continent {
    code: ID!
    name: String!
    countries: [Country]
  }
  ```
- 使用以下語法呼叫要執行的 Query，如果要回傳的 TYPE 是定義在 Graphql，則要指定需要那些 field，例如這裡需要 Country type
- 如果需要額外其他的資料 (例如以下範例的 continent)，需要加上大括號放要從這個 type Continent 裡面你想拿到的欄位
 ```
  {
    country(code: "US") {
      code
      name
      phone
      capital
      currency
      continent {
        code
        name
        countries {
          name
          capital
        }
      }
    }
  }
  ```
- 查詢語言且傳入的參數非必填 `={}`

  ![filter: filterInput](src/main/resources/static/languages.png)
  ```
  {
    languages {
      code
      name
      native
      rtl
    }
  }
  ```
#### Reference GraphQL API
[Link to the Countries GraphQL API](https://github.com/trevorblades/countries)

### how to create a GraphQL API (using NodeJS)

~~時間不足，只能先看看~~

Execute below command to start a new nodejs project and install dependencies

```bash
# initializing a nodeJS project
npm init
# hit enters and it will generate package.json for you

npm install apollo-server graphql 
# notice that the dependencies are added to package.json

# install nodemon to prevent server from restarting everytime you make any change
npm install nodemon
```

add a start script to the `package.json` file, so as to run nodemon into our packages

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  }
}
```

create an `index.js` file

import some stuff form apollo-server library

`new ApolloServer()` takes in two parameters:
1. type definition - typeDefs
   - 所有你定義在 graphql 的 type 都在這
2. resolvers
   - 所有對這些 type 做處理的 functions 都在這
   - 例如 make calls to the api, interacting with database

Apollo GraphQL VScode extension is very helpful while composing typeDefs.

Use `module.exports` and `const { } = require( )` to create parameter for this Apollo Server

```bash
npm start
```

Viola! Here's the result!

![ApolloServer](src/main/resources/static/apollo.png)

### GraphQL Resolvers

- Short hand notation for whenever your key is equal to the value
  ```javascript
  _.find(UserList, { id : id });
  _.find({ id });
  ```
  
#### Add user resolvers
![Resolvers](src/main/resources/static/resolvers.png)

#### Add movie resolvers
![Resolvers](src/main/resources/static/resolver-movie.png)

如果每個 User 會有對應的 favorite movie array，但我們不要直接把 movie detail 全部放進這個 array 怎麼做?

可以透過 creating resolver for the user type 來達成，如下結果

![favoriteMovies](src/main/resources/static/favoriteMovies.png)

### Mutations

#### 增加 user
- 可以建立一個 input
- 使用 `=` 替必填但沒有input值的欄位加入預設值
  ```graphqls
  input CreateUserInput {
      name: String!
      username: String!
      age: Int = 18 
      nationality: Nationality!
      friends: [User]
      favoriteMovies: [Movie]
  }
  ```
- 驗證結果如下  
  ![createUser](src/main/resources/static/createUser.png)

#### 更新 user 名稱
- 驗證結果如下
  ![updateUsername](src/main/resources/static/updateUsername.png)

#### 刪除一筆 user
- 驗證結果如下
  ![deleteUserById](src/main/resources/static/deleteUser.png)


### UseQuery Hook in Apollo Client


### UseMutation Hook in Apollo Client


### Context, Fragments, Union Result Boxes


---
## Application GraphQL

先不管 npm 跟 node js 了，快回來喝杯 javacano ☕

1. 首先在 Spring initializr 加上以下的 dependencies 並下載 project
   ```
   ✅ Spring for GraphQL [WEB]
   Build GraphQL applications with Spring for GraphQL and GraphQL Java.

   ✅ Spring Boot Actuator [OPS]
   Supports built in (or custom) endpoints that let you monitor and manage your application - such as application health, metrics, sessions, etc.

   ✅ GraphQL DGS Code Generation [DEVELOPER TOOLS]
   Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.

   ✅ Netflix DGS [WEB]
   Build GraphQL applications with Netflix DGS and Spring for GraphQL.

   ✅ Spring Web [WEB]
   Build web, including RESTful, applications using Spring MVC. Uses Apache Tomcat as the default embedded container.

   ✅ PostgreSQL Driver [SQL]
   A JDBC and R2DBC driver that allows Java programs to connect to a PostgreSQL database using standard, database independent Java code.
   ```
2. 調整 application 設定檔並加入其它會用到的 dependencies
   - scalars 用來加入 `ExtendedScalars`
   - micrometer 用來收集 metrics 並將收集到的指標送進監控工具 (Prometheus, Graphite, Datadog) 做可視化分析
   - subscriptions-websockets 使用 websocket 實現 GraphQL 訂閱
   - datafaker 用來生成各種格式/類型的假資料, 可以做單元測試的數據, 或模擬用戶行為做性能測試
   ```groovy
   	implementation 'com.netflix.graphql.dgs:graphql-dgs-extended-scalars'
	  implementation 'com.netflix.graphql.dgs:graphql-dgs-spring-boot-micrometer'
	  implementation 'com.netflix.graphql.dgs:graphql-dgs-subscriptions-websockets-autoconfigure'
  	implementation 'net.datafaker:datafaker:1.9.0'
   ```
