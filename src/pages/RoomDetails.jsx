import React from 'react';

const HotelRoomDetails = ({ room }) => {
  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{room.name}</h1>
        <p className="text-gray-600">{room.description}</p>
      </div>
      <div className="flex flex-wrap justify-center mb-4">
        {room.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Room Image"
            className="w-64 h-48 object-cover mr-4 mb-4"
          />
        ))}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Room Details</h2>
        <ul>
          <li className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Room Type:</span>
            <span className="text-gray-900">{room.type}</span>
          </li>
          <li className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Capacity:</span>
            <span className="text-gray-900">{room.capacity} guests</span>
          </li>
          <li className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Price:</span>
            <span className="text-gray-900">${room.price}</span>
          </li>
          <li className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Amenities:</span>
            <ul className="list-none ml-4">
              {room.amenities.map((amenity, index) => (
                <li key={index} className="text-gray-900">
                  {amenity}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      <div className="flex justify-center mb-4">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Book Now
        </button>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-4">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default HotelRoomDetails;