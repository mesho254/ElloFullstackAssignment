import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Grid, TextField, Container, List, ListItem, ListItemText, Paper, Box, Pagination, Snackbar, Typography, IconButton, Tooltip } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import BookCard from '../components/BookCard';
import MuiAlert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';

const BOOKS_QUERY = gql`
  query Books {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

const HomePage = ({ onAddToReadingList }) => {
  const { loading, error, data } = useQuery(BOOKS_QUERY);
  const [search, setSearch] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const booksPerPage = 12;

  if (loading) return (
    <div>
      <p>Loading...</p>
      <Box sx={{ display: 'flex', margin: "200px 500px" }}>
        <CircularProgress />
      </Box>
    </div>
  );
  if (error) return <p>Error: {error.message}</p>;

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value) {
      setFilteredBooks(data.books.filter(book => book.title.toLowerCase().includes(value.toLowerCase())));
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelectBook = (book) => {
    setSearch(book.title);
    setShowDropdown(false);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleAddBook = (book) => {
    onAddToReadingList(book);
    setNotification(true, 'Added to reading list');
  };

  const setNotification = (open, message) => {
    setSnackbarOpen(open);
    setSnackbarMessage(message);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const displayedBooks = data.books.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage);
  const totalPages = Math.ceil(data.books.length / booksPerPage);

  return (
    <Container>
      <Typography style={{ textAlign: "center", fontSize: "50px", margin: "20px auto" }}>Book Assignment</Typography>
      <TextField
        label="Search"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
        onClick={() => setShowDropdown(true)}
      />
      {showDropdown && (
        <Paper>
          <List>
            {filteredBooks.slice(0, 5).map((book, index) => (
              <ListItem key={index}>
                <img src={book.coverPhotoURL} alt={book.title} style={{ width: 40, height: 40, marginRight: 10 }} />
                <ListItemText primary={book.title} />
                <Tooltip title="Add to Reading List">
                  <IconButton onClick={() => handleAddBook(book)} color="primary">
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      <Grid container spacing={4}>
        {displayedBooks.map((book, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <BookCard book={book} onAdd={handleAddBook} setNotification={setNotification} />
          </Grid>
        ))}
      </Grid>
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default HomePage;
