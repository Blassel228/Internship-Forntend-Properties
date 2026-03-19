import Contacts from "./Contacts.tsx";
import Location from "./Location.tsx";

const ContactsAndLocation = () => {
  return (
    <div id="contacts" className="py-8 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 max-w-6xl mx-auto">

        <div className="flex-1">
          <Location />
          <Contacts />
        </div>

        <div className="w-full md:w-[300px] lg:w-[400px]">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            alt="Hotel Rooms San Francisco"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactsAndLocation;