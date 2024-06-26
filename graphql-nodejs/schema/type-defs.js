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
       users: [User!]!
       user(id: ID!): User!
       movies: [Movie!]!
       movie(name: String!): Movie! 
   }

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
   }
`;



module.exports = { typeDefs }