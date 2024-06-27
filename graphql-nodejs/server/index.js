const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");

const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: (parent, args, context) => {
        console.log(context);  // {name."Pedro"} context means the content you return
        return { name: "Pedro" };
    }});

server.listen().then(({url}) => {
    console.log(`Your API is running at ${url} :)`);
})