import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import Cookies from "js-cookie";
import Star from "/assets/Icon.png";
import './BookDetails.css'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BearerToken = Cookies.get("jwt_token");
    const navigate = useNavigate();
  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://apis.ccbp.in/book-hub/books/${id}`,
          { headers: { Authorization: `Bearer ${BearerToken}` } }
        );

        if (response.ok) {
          const data = await response.json();
          setBook(data.book_details);
          console.log(data);
        } else {
          setError("Failed to fetch book details");
        }
      } catch (err) {
        setError("Error fetching book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);
const handleBackButton =()=>{
    navigate('/bookshelves')
}
  if (loading) return <LoadingIcon />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>
      <Navbar />
      <button className="mt-[70px] ml-[50px] back-button flex flex-row justify-center items-center" onClick={handleBackButton}><FaArrowLeft />Back</button>
      <div className="flex flex-col items-center p-6 bookdetails-container">
        
        <div className="bg-white p-6 rounded-2xl shadow-md w-full md:w-3/4 lg:w-2/3">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={book.cover_pic}
              alt={book.title}
              className="w-40 h-56 object-cover rounded-md"
            />
            <div>
              <h1 className="text-2xl font-bold">{book.title}</h1>
              <p className="text-gray-700">{book.author_name}</p>
              <div className="flex items-center my-2">
                <p className="font-semibold">Avg Rating</p>
                <img src={Star} className="w-4 h-4 mx-2" />
                <span>{book.rating}</span>
              </div>
              <p>
                <span className="font-semibold">Status : </span>
                <span className="text-blue-600">{book.read_status}</span>
              </p>
            </div>
          </div>

          <hr className="my-4" />

          <h2 className="font-bold text-lg">About Author</h2>
          <p className="text-gray-700 mb-4">{book.about_author}</p>

          <h2 className="font-bold text-lg">About Book</h2>
          <p className="text-gray-700">{book.about_book}</p>
        </div>
      </div>
    </>
  );
}

export default BookDetails;
