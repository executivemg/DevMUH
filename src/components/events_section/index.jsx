"use client";

import EventCard from '@/components/event_card';

const EventSection = ({ className }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("127.0.0.1:8000/ranaevents/events");
        if (response.status === 200) {
          setEvents(response.data.data);
        } else {
          console.error("Error: Unexpected response structure", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      return [];
    })();
  }, []);

  return (
    <section
      className={`flex justify-center w-full ${className}`}
    >
      <div className="">
        {Array(4).keys().map((_, index) => (
          <EventCard key={index} />
        ))}
      </div>
      
      <div className="flex justify-center">
        <button className="">
          View All
        </button>
      </div>
    </section>
  );
};

export default EventSection;
