import React, { useEffect, useState } from "react";
import Bookcard from "../books/bookcard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const categories = [
  "choose a genre",
  "business",
  "Fiction",
  "Horror",
  "Adventure",
  "romance",
  "drama",
  "politcs",
];
const Topsellers = () => {
  const [selectedcategory, setselectedcategory] = useState("choose a genre");

  const { data: books = [] } = useFetchAllBooksQuery();

  const filteredbooks =
    selectedcategory === "choose a genre"
      ? books
      : books.filter(
          (book) => book.category === selectedcategory.toLowerCase()
        );

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Top sellers</h2>
      <div className="mb-8 flex items-center">
        <select
          onChange={(e) => setselectedcategory(e.target.value)}
          name="category"
          id="category"
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {filteredbooks.length > 0 &&
          filteredbooks.map((book, index) => (
            <SwiperSlide key={index}>
              <Bookcard key={index} book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Topsellers;
