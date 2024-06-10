import React from 'react';
import { Grid, Card, CardContent, Typography, Button, CardMedia } from '@mui/material';

const ReadingList = ({ books, onRemove }) => (
  <Grid container spacing={3} style={{marginTop:"20px"}}>
    {books.map((book, index) => (
      <Grid item key={index} xs={12} sm={6} md={4}>
        <Card>
          <CardMedia
            component="img"
            alt={book.title}
            height="140"
            image={book.coverPhotoURL}
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
            <Button onClick={() => onRemove(book)} variant="contained" color="secondary">
              Remove
            </Button>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default ReadingList;
