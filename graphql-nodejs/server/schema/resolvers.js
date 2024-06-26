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
    User: {
        favoriteMovies: () => {
            return _.filter(
                MovieList, 
                (movie) => 
                    movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2023)
        }
    },
    Mutation: {
        createUser: (parent, args) => {
            const user = args.input; // input: CreateUserInput
            // console.log(user);
            const lastId = UserList[UserList.length-1].id;
            user.id = lastId + 1;
            UserList.push(user);
            return user;
        },
        updateUsername: (parent, args) => {
            // const id = args.input.id;
            // const newUsername = args.input.newUsername 下面的寫法等價於這兩行
            const {id, newUsername} = args.input;
            let userUpdated;
            UserList.forEach((user) => {
                if (user.id === Number(id)) {
                    user.username = newUsername;
                    userUpdated = user;
                }
            });
            return userUpdated;
        },
        deleteUser: (parent, args) => {
            const id = args.id;
            // this function will loop thru the userlist, find the id and remove this element
            _.remove(UserList, (user) => user.id === Number(id));
            return null;
        }
    },
};

module.exports = { resolvers }