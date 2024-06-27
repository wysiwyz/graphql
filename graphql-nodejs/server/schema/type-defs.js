// Write your own graphql schema that define the API
const { gql } = require('apollo-server');

// Tip: Install vscode Apollo GraphQL extension
const typeDefs = gql`
   type User {
       id: ID!
       name: String!
       username: String!
       age: Int!
       nationality: Nationality!
       friends: [User]
       favoriteMovies: [Movie]
   }

   type Movie {
       id: ID!
       name: String!
       yearOfPublication: Int!
       isInTheaters: Boolean!
   }

   type Query {
       users: UserResult
       user(id: ID!): User!
       movies: [Movie!]!
       movie(name: String!): Movie! 
   }
   
   # errorhanding for not nullable types
   type UsersSuccessfulResult {
       users: [User!]!
   }
     
   type UsersErrorResult {
       message: String!
   }

   # merge successful/error result into an union
   union UserResult = UsersSuccessfulResult | UsersErrorResult

   input CreateUserInput {
       name: String!
       username: String!
       age: Int!
       nationality: Nationality = BRAZIL
   }

   input UpdateUsernameInput {
       id: ID!
       newUsername: String!
   }

   type Mutation {
       createUser(input: CreateUserInput!): User
       updateUsername(input: UpdateUsernameInput): User
       deleteUser(id: ID!): User
   }

   enum Nationality {
       JAPAN
       KOREA 
       CANADA
       MEXICO 
       TAIWAN
       UKRAINE
       TURKEY
       BRAZIL
   }
`;



module.exports = { typeDefs }