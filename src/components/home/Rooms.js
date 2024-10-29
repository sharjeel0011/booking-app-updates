import React, { useEffect, useState } from "react";
import CommonHeading from "../common/CommonHeading";
import { facility } from "../data/Data"; // Keep facility static as requested
import { BASE_URL } from '../../config';
import axios from 'axios';
import { useInView } from "react-intersection-observer";
import "animate.css";

export default function Rooms() {
  const [roomItems, setRoomItems] = useState([]); // State to hold room items
  const { ref, inView } = useInView({ threshold: 0.1 });

  const getAnimationClass = (index) => {
    if (index % 3 === 0) return inView ? "animate__slideInLeft" : "opacity-0";
    if (index % 3 === 1) return inView ? "animate__slideInRight" : "opacity-0";
    return inView ? "animate__zoomIn" : "opacity-0";
  };

  const fetchRoomItems = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tours`);
      console.log("API response data:", response.data); // Log the entire response data
      
      // Assuming response.data is an array of rooms
      setRoomItems(response.data.data); // Set to the data array returned by the API
    } catch (error) {
      console.error("Error fetching room items:", error.message);
      setRoomItems([]); // Set to an empty array on error
    }
  };

  // Use useEffect to trigger fetchRoomItems on component load
  useEffect(() => {
    fetchRoomItems();
  }, []);

  return (
    <div ref={ref} className="text-xl container-xxl py-5">
      <div className="container">
        <CommonHeading heading="Our Rooms" title="Rooms" subtitle="Explore Our" />
        <div className="row g-4">
          {Array.isArray(roomItems) && roomItems.length > 0 ? (
            roomItems.map((item, key) => (
              <div
                key={key}
                className={`col-lg-4 col-md-6 mb-4 animate__animated ${getAnimationClass(key)}`}
                style={{
                  transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
                }}
              >
                <div className="room-item shadow rounded overflow-hidden">
                  <div className="position-relative">
                    <img className="img-fluid" src={item.photo} alt={item.title} />
                    <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                      ${item.price}
                    </small>
                  </div>
                  <div className="p-4 mt-2">
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">{item.title}</h5>
                      <div className="ps-2">
                        {[...Array(item.stars || 0)].map((_, index) => (
                          <small key={index} className="fa fa-star text-primary"></small>
                        ))}
                      </div>
                    </div>
                    <div className="d-flex mb-3">
                      {facility.map((facilityItem, facilityIndex) => (
                        <small className="border-end me-3 pe-3" key={facilityIndex}>
                          <i className={facilityItem.iconClass}></i>
                          {facilityItem.quantity} {facilityItem.facility}
                        </small>
                      ))}
                    </div>
                    <p className="text-body mb-3">{item.desc}</p>
                    <div className="d-flex justify-content-between">
                      <a className="btn btn-sm btn-primary rounded py-2 px-4" href="#">
                        View Details
                      </a>
                      <a className="btn btn-sm btn-dark rounded py-2 px-4" href="#">
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No rooms available.</p> {/* You can add a loading indicator here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
