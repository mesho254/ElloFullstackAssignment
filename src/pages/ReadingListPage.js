import React, { useEffect, useState } from 'react';
import ReadingList from '../components/ReadingList';

const READING_LIST_KEY = 'readingList';

const ReadingListPage = ({ onRemoveFromReadingList }) => {
  const [readingList, setReadingList] = useState([]);

  useEffect(() => {
    const storedReadingList = JSON.parse(localStorage.getItem(READING_LIST_KEY)) || [];
    setReadingList(storedReadingList);
  }, []);

  const handleRemove = (book) => {
    const updatedReadingList = readingList.filter((b) => b.title !== book.title);
    setReadingList(updatedReadingList);
    localStorage.setItem(READING_LIST_KEY, JSON.stringify(updatedReadingList));
    onRemoveFromReadingList(book);  
  };

  return (
    <div>
      <ReadingList books={readingList} onRemove={handleRemove} />
    </div>
  );
};

export default ReadingListPage;
