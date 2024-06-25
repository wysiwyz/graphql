const UserList = [
    {
        id: 1,
        name: "Alexander",
        username: "alex.yamamoto",
        age: 62,
        nationality: "JAPAN",
        friends: [
            {
                id: 4,
                name: "Derek",
                username: "derek.pedero",
                age: 42,
                nationality: "MEXICO",
            },
            {
                id: 5,
                name: "Erina",
                username: "erinahuang",
                age: 22,
                nationality: "TAIWAN",
            }
        ]
    },
    {
        id: 2,
        name: "Benson",
        username: "benson.Kim",
        age: 15,
        nationality: "KOREA",
    },
    {
        id: 3,
        name: "Celeste",
        username: "celeste.everdeen",
        age: 34,
        nationality: "CANADA",
        friends: [
            {
                id: 2,
                name: "Benson",
                username: "benson.Kim",
                age: 15,
                nationality: "KOREA",
            }
        ]
    },
    {
        id: 4,
        name: "Derek",
        username: "derek.pedero",
        age: 42,
        nationality: "MEXICO",
    },
    {
        id: 5,
        name: "Erina",
        username: "erinahuang",
        age: 22,
        nationality: "TAIWAN",
    }
];

const MovieList = [
    {
        id: 1,
        name: "Furiosa: A mad max saga",
        yearOfPublication: 2024,
        isInTheaters: true,
    },
    {
        id: 2,
        name: "Dune: Part Two",
        yearOfPublication: 2023,
        isInTheaters: true,
    },
    {
        id: 3,
        name: "The Batman",
        yearOfPublication: 2022,
        isInTheaters: false,
    },
    {
        id: 4,
        name: "Spider-Man: No Way Home",
        yearOfPublication: 2021,
        isInTheaters: false,
    },
    {
        id: 5,
        name: "Avatar: The Way of Water",
        yearOfPublication: 2022,
        isInTheaters: false,
    }
];

module.exports = { UserList, MovieList };