import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import Cookies from 'js-cookie';
import Star from '/assets/Icon.png';
import './BookShelves.css';
import { useNavigate } from 'react-router-dom';

function BookShelves() {
  const [bookDetails, setBookDetails] = useState([]);
  const [error, setError] = useState(null);
  const [bookshelfName, setBookshelfName] = useState("ALL");
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const BearerToken = Cookies.get('jwt_token');

const handleBookClick = (id) => {
  navigate(`/bookshelves/${id}`); 
};

  const fetchDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBookDetails(data.books);
      } else {
        setError("Failed to fetch books");
      }
    } catch (err) {
      setError("Fetching failed!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [bookshelfName, searchText]);

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen ">
        <div className="w-1/5 bg-gray-100 border-r px-6 py-6 sidebar h-screen ">
          <h2 className="font-bold text-lg mb-4">Bookshelves</h2>
          <p
            className={`cursor-pointer mb-2 ${bookshelfName === "ALL" ? "font-bold text-blue-600" : ""}`}
            onClick={() => setBookshelfName("ALL")}
          >
            All
          </p>
          <p
            className={`cursor-pointer mb-2 ${bookshelfName === "READ" ? "font-bold text-blue-600" : ""}`}
            onClick={() => setBookshelfName("READ")}
          >
            Read
          </p>
          <p
            className={`cursor-pointer mb-2 ${bookshelfName === "CURRENTLY_READING" ? "font-bold text-blue-600" : ""}`}
            onClick={() => setBookshelfName("CURRENTLY_READING")}
          >
            Currently Reading
          </p>
          <p
            className={`cursor-pointer mb-2 ${bookshelfName === "WANT_TO_READ" ? "font-bold text-blue-600" : ""}`}
            onClick={() => setBookshelfName("WANT_TO_READ")}
          >
            Want to Read
          </p>
        </div>

        
        <div className="flex-1 px-8 py-6 mt-[50px] ">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-xl">All Books</h2>
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border rounded px-3 py-1 input-container"
            />
          </div>

        
          {error && <p className="text-red-500">{error}</p>}

          
          {loading ? (
            <LoadingIcon />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ml-[300px]">
              {bookDetails.length > 0 ? (
                bookDetails.map((book) => (
                  <div
                    key={book.id}
                    className="border rounded-lg p-4 shadow hover:shadow-lg transition"
                    onClick={() => handleBookClick(book.id)}
                  >
                    <img
                      src={book.cover_pic}
                      alt={book.title}
                      className="w-full h-48 object-cover rounded"
                    />
                    <h2 className="font-bold text-lg mt-2">{book.title}</h2>
                    <p className="text-sm">{book.author_name}</p>
                    <div className="flex items-center mt-1">
                      <img src={Star} alt="star" className="w-4 h-4" />
                      <p className="text-sm ml-2">{book.rating}</p>
                    </div>
                    <p className="text-sm">Status: {book.read_status}</p>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No books found.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BookShelves;
