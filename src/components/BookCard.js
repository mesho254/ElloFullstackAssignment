import React from 'react';
import { Card, CardContent, IconButton, Typography, CardMedia, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const READING_LIST_KEY = 'readingList';

const BookCard = ({ book, onAdd, setNotification }) => {
  const coverImage = `${process.env.PUBLIC_URL}/${book.coverPhotoURL}`;

  const handleAdd = () => {
    onAdd(book);

    // Save the book to local storage
    const readingList = JSON.parse(localStorage.getItem(READING_LIST_KEY)) || [];
    const updatedReadingList = [...readingList, book];
    localStorage.setItem(READING_LIST_KEY, JSON.stringify(updatedReadingList));

    setNotification(true, 'Added to reading list');
  };

  return (
    <Card>
      <CardMedia
        component="img"
        alt={book.title}
        height="140"
        image={coverImage}
        title={book.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Author: {book.author}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Reading Level: {book.readingLevel}
        </Typography>
        <Tooltip title="Add to Reading List">
          <IconButton onClick={handleAdd} color="primary" style={{ fontSize: "100px", marginLeft: "7px" }}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default BookCard;
