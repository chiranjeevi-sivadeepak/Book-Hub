import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './HomeSection.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import Navbar from '../Navbar/Navbar'
import Cookies from 'js-cookie'

function NextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        right: '25px',
        zIndex: 2,
        background: 'rgba(147, 146, 146, 0.8)',
        borderRadius: '50%',
        width: '35px',
        height: '35px',
      }}
      onClick={onClick}
    />
  )
}

function PrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        left: '25px',
        zIndex: 2,
        background: 'rgba(147, 146, 146, 0.8)',
        borderRadius: '50%',
        width: '35px',
        height: '35px',
      }}
      onClick={onClick}
    />
  )
}

function HomeSection() {
  const [booklist, setBooklist] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const BearerToken = Cookies.get('jwt_token') 
  const navigate = useNavigate()

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  }

  const fetchBooks = async () => {
    try {
      const BookResponse = await fetch(
        'https://apis.ccbp.in/book-hub/top-rated-books',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )

      if (BookResponse.ok) {
        const BookDetails = await BookResponse.json()
        setBooklist(BookDetails.books)
      } else {
        const errorData = await BookResponse.json()
        setError(errorData.error_msg || 'Failed to fetch books')
      }
    } catch (er) {
      setError('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (BearerToken) {
      fetchBooks()
    } else {
      navigate('/login')
    }
  }, [BearerToken, navigate])

  const findBooks = () => {
    navigate('/bookshelves')
  }

  return (
    <div>
      <Navbar />
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="mt-[100px]">
          <h1 className="homepage-heading">Find Your Next Favorite Books?</h1>
          <p className="homepage-paragraph">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past,
            <br />
            and we will give you surprisingly insightful recommendations.
          </p>

          <div className="carousals">
            <div className="flex flex-row m-[10px] h-[30px] items-center text-center btnElement">
              <h1 className="carousalName text-black text-[30px] mt-[50px] py-[10px]">
                Top Rated Books
              </h1>
              <button className="bg-blue-400 findBtn" onClick={findBooks}>
                Find Books
              </button>
            </div>

            <div className="mt-[50px]">
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                Array.isArray(booklist) &&
                booklist.length > 0 && (
                  <Slider {...settings}>
                    {booklist.map((item) => (
                      <div key={item.id} className="book-card">
                        <img
                          src={item.cover_pic}
                          alt={item.title}
                          className="book-cover"
                        />
                        <h2>{item.title}</h2>
                        <p>{item.author_name}</p>
                      </div>
                    ))}
                  </Slider>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomeSection
