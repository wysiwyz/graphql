const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");

const resolvers = {
    Query: {
        // USER RESOLVERS
        users: (parent, args, context, info) => {
            // write js to tell GraphQL what we want it to return
            // if you have database, it is here that you write api to call db
            // console.log(context.req.headers); // common use case to check authn & authz
            if (UserList) {
                return { users: UserList };
            }
            return { message: "Yo, there was an error" }
        },
        user: (parent, args, context, info) => {
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
    // 注意這個woridng要跟type-defs裡面的union名稱一模一樣
    UserResult: { 
        // A resolver for success/error cases
        __resolveType(obj) {
            if (obj.users) {
                // return obj.users;
                return "UsersSuccessfulResult";
            }
            if (obj.message) {
                // return obj.message;
                return "UsersErrorResult";
            }
            
            return null; // graphql validation error
        }
    }
};

module.exports = { resolvers }