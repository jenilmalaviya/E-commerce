import React from "react";

const Logo = ({ w, h }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-gradient-to-r from-[#ac3c3ce1] to-[#ff0000] rounded-full p-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.2 7.8C19.8 7.2 19.2 6.8 18.6 6.8H6.6L6 4.8C5.8 3.8 4.8 3 3.8 3H2V5H3.8L7.8 16.2C8 16.8 8.6 17.2 9.2 17.2H18.2C18.8 17.2 19.4 16.8 19.8 16.2L21.2 9.8C21.4 9 21 8.2 20.2 7.8ZM9.2 15.2C9 15.2 8.8 15 8.6 14.8L7 9H18.6L17 15.2H9.2Z"
            fill="white"
          />
          <path
            d="M9 19C9 20.1 9.9 21 11 21C12.1 21 13 20.1 13 19C13 17.9 12.1 17 11 17C9.9 17 9 17.9 9 19Z"
            fill="white"
          />
          <path
            d="M16 19C16 20.1 16.9 21 18 21C19.1 21 20 20.1 20 19C20 17.9 19.1 17 18 17C16.9 17 16 17.9 16 19Z"
            fill="white"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
        Jenil Shop
      </h1>
    </div>
  );
};

export default Logo;
