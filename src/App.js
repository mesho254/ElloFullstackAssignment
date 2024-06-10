import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import HomePage from './pages/HomePage';
import ReadingListPage from './pages/ReadingListPage';
import Navbar from './components/NavBar';
import Footer from './components/Footer';

// Set up Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/', // URL of your GraphQL server
  cache: new InMemoryCache()
});

const READING_LIST_KEY = 'readingList';

const App = () => {
  const [readingList, setReadingList] = useState([]);

  useEffect(() => {
    // Load reading list from local storage on initial load
    const storedReadingList = JSON.parse(localStorage.getItem(READING_LIST_KEY));
    if (storedReadingList) {
      setReadingList(storedReadingList);
    }
  }, []);

  useEffect(() => {
    // Save reading list to local storage whenever it changes
    localStorage.setItem(READING_LIST_KEY, JSON.stringify(readingList));
  }, [readingList]);

  const handleAddToReadingList = (book, student) => {
    const updatedReadingList = [...readingList, { ...book, assignedTo: student }];
    setReadingList(updatedReadingList);
  };

  const handleRemoveFromReadingList = (bookToRemove) => {
    const updatedReadingList = readingList.filter(book => book.title !== bookToRemove.title);
    setReadingList(updatedReadingList);
  };

  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={<HomePage onAddToReadingList={handleAddToReadingList} />} 
        />
        <Route 
          path="/reading-list" 
          element={
            <ReadingListPage 
              readingList={readingList} 
              onRemoveFromReadingList={handleRemoveFromReadingList} 
            />
          } 
        />
      </Routes>
      <Footer/>
    </ApolloProvider>
  );
};

export default App;
