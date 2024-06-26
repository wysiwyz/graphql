import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery } from "@apollo/client";
import DisplayData from './DisplayData';

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(), 
    // to cache data into your browser, so that you don't have to send request everytime you refresh page or switch components
    uri: "http://localhost:4000/graphql" // the url to where your GraphQL is running
  }); 
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <DisplayData />
      </div>
    </ApolloProvider>

  );
}

export default App;
