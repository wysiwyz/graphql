// type rfce and hit enter: 產生 functional component template
// first you need to install VScode extension ES7 React/Redux/GraphQL/React-Native snippets

import React, { useState } from 'react'
import { useQuery, useLazyQuery, useMutation, gql } from "@apollo/client";

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            name
            age
            name
            username
            nationality
        }
    }`;

const QUERY_ALL_MOVIES = gql`
    query GetAllMovies {
        movies {
            id
            name
            yearOfPublication
        }
    }`;

//     ($<the_param_of_your_choice> : <Data_type>)
//  (<the_param_defined_in_type-defs.js>: $<the_param_of_your_choice>)
const GET_MOVIE_BY_NAME = gql`
    query Movie($nameInput: String!) {
        movie(name: $nameInput) { 
            id
            name
            yearOfPublication
        }
    }`; // 如果是帶參數的Query，外層的名稱需要跟 type-defs 定義的一樣，只是首字母轉大寫

// 這裡 createUser 第一個 input 要跟定義在 type-defs.js 的名字一樣
// createUser(input: CreateUserInput!): User 
const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) { 
            id
            name
            username
            age
            nationality
        }
    }`;

const DELETE_USER_MUTATION = gql`
    mutation DeleteUser($id: ID!) {
        deleteUser(id: $id) { 
            id
        }
    }`;

function DisplayData() {
    // search for a movie state
    const [movieSearched, setMovieSearched] = useState(''); // !⚠ not const{movieSearched, setMovieSearched}

    // create user state
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [username, setUsername] = useState('');
    const [nationality, setNationality] = useState('');

    // update user state

    // delete user state
    const [idToDelete, setDeleteId] = useState(0);

    // name of the function, data
    const [fetchMovie, { data: movieSearchedData, error: movieError }] = useLazyQuery(GET_MOVIE_BY_NAME);

    // mutation hook
    const [createUser, {data: userCreatedData, error: userCreatedError}] = useMutation(CREATE_USER_MUTATION);
    const [deleteUser] = useMutation(DELETE_USER_MUTATION);
    const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
    const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
    // to give them different name

    if (loading) {
        return <h1>Data is loading ...</h1>
    }

    return (
        <div>
            <h1>Create user:</h1>
            <div>
                <input type='text' placeholder='Name' onChange={(event) => {
                    setName(event.target.value);
                }} />
                <input type='text' placeholder='Username' onChange={(event) => {
                    setUsername(event.target.value);
                }} />
                <input type='number' placeholder='Age' onChange={(event) => {
                    setAge(event.target.value);
                }} />
                <input type='text' placeholder='Nationality' onChange={(event) => {
                    setNationality(event.target.value.toUpperCase());
                }} />
                <button onClick={() => {
                    createUser({
                        variables: {
                            input: {
                                name, // name: name,
                                username,
                                age: Number(age),
                                nationality
                            }
                        }
                    });
                    refetch();
                }}>Create User</button>
            </div>
            <h1>Update user:</h1>
            <div>

            </div>
            <h1>Delete user:</h1>
            <div>
            <input type='number' placeholder='user ID' onChange={(event) => {
                setDeleteId(event.target.value);
            }} />
            <button onClick={() => {
                console.log(typeof idToDelete) // string
                console.log(idToDelete)        // 9
                deleteUser({
                    variables: {
                        input: {
                            id: idToDelete
                        }
                    }
                });
                refetch();
            }}>Delete this user</button>
            </div>
            <h1>All Users</h1>
            <div>{data && data.users.length > 0 ? (
                data.users.map((user) => (
                    <div key={user.id}>
                        <div>User ID: {user.id}</div>
                        <div>Name: {user.name}</div>
                        <div>Username: {user.username}</div>
                        <div>Age: {user.age}</div>
                        <div>Nationality: {user.nationality}</div>
                    </div>
                ))
            ) : (
                <p>No user data available</p>
            )}
            </div>
            <h1>All Movies</h1>
            <div>{movieData && movieData.movies.length > 0 ? (
                movieData.movies.map((movie) => (
                    <div key={movie.id}>
                        <div>Movie name: {movie.name}</div>
                        <div>Year of publication: {movie.yearOfPublication}</div>
                    </div>
                ))
            ) : (
                <p>No movie data available</p>
            )}</div>
            <h1>Get movie by name</h1>
            <div>
                <input type='text' placeholder='The Batman' onChange={(event) => {
                    setMovieSearched(event.target.value);
                }}></input>
                <button onClick={() => {
                    fetchMovie({
                        variables: {
                            nameInput: movieSearched,
                        },
                    });
                }}
                >
                    {" "}
                    Fetch Data</button>
                <div>
                    {movieSearchedData && (
                        <div>
                            <div>Movie name: {movieSearchedData.movie.name}</div>
                            <div>Year of publication: {movieSearchedData.movie.yearOfPublication}</div>
                        </div>
                    )}
                    {movieError && <div>There was an error fetching the data.</div>}
                </div>
            </div>
        </div>
    );
}

export default DisplayData
