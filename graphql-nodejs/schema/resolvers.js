const { UserList } = require("../FakeData")

const resolvers = {
    Query: {
        users() {
            // write js to tell GraphQL what we want it to return
            // if you have database, it is here that you write api to call db
            return UserList;
        }
    }
}

module.exports = { resolvers }