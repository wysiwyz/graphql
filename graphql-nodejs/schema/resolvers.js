const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");

const resolvers = {
    Query: {
        // USER RESOLVERS
        users: () => {
            // write js to tell GraphQL what we want it to return
            // if you have database, it is here that you write api to call db
            return UserList;
        },
        user: (parent, args) => {
            // args: whatever data that user passes
            const id = args.id;
            const user = _.find(UserList, { id: Number(id) });
            return user;
        },

        // MOVIE RESOLVERS
        movies: () => {
            return MovieList;
        },
        movie: (parent, args) => {
            const name = args.name;
            const user = _.find(MovieList, { name });
            return user;
        }
    },
};

module.exports = { resolvers }