這篇 README 分為兩部分，第一部分說明專案架構以及啟動/驗證/測試步驟，第二部分則是根據 [Youtube tutorials](https://youtube.com/playlist?list=PLpPqplz6dKxXICtNgHY1tiCPau_AwWAJU&si=bcgwV3eVYsUWdzJp) 所做的筆記。

## Application GraphQL





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
- `[``]` 當某個欄位具有不只一個元素(array)，用中括號表示
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

  ![filter: filterInput={}](https://imgur.com/1zYQTjB)
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

[Countries GraphQL API](https://github.com/trevorblades/countries)

### how to create a GraphQL API (using NodeJS)
時間不足，只能先看看




### GraphQL language
Types, Queries, Mutations, Scalars, Enums, Unions


### 如何從React 的 Apollo Client 串接一個 GraphQL API
All the things you can do with Apollo Client in React
Apollo Client 是 React + GraphQL 最廣泛使用的 library

