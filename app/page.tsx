"use client"; // Mark this component as a Client Component
import { useState } from "react";
import { Client, Databases, ID } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67581f8c003e096231c3');
const databases = new Databases(client);

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    pickupPoint: "",
    phoneNumber: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString(undefined, options as Intl.DateTimeFormatOptions);

  const locationPickupPoints = {
    "Abu Hail": ["Ladies Park", "Etisalat", "Hor Al Anz Turn-Off", "Hamriya Big Mosque", "Excelsior Hotel", "Nesto Supermarket", "Al Ghurair Mall", "Day to Day(Not Available on Sundays)"],
    "Al Nahda": ["Behind Lulu Hypermarket ( 1st & 2nd Service)",  " Lulu hypermarket (3rd Service)" , "Lulu Legs Bridge (3rd Service)" , " Dubai Camel bridge (3rd Service)" , " Day to Day Opp. Sahara Tower (3rd Service)"],
    "Satwa": ["Fillet King Restaurant (1st Service)" , "Al Maya Supermarket Backside (1st Service)" , "Chelsea Plaza (1st Service)" , "Fillet King Restaurant (3rd  Service)" , "Al Maya Supermarket Backside (3rd  Service)" , "Chelsea Plaza (3rd Service)"]
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create a document in your Appwrite database
      const result = await databases.createDocument(
        '675821f00019a9ddd1c0', // Replace with your database ID
        '67582af800226be0de89', // Replace with your collection ID
        ID.unique(),
        formData
      );
      
      console.log('Submission successful:', result);
      alert('Information submitted successfully!');
      setFormData({ fullName: "", location: "", pickupPoint: "", phoneNumber: "" }); // Reset form
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'location' ? { pickupPoint: '' } : {})
    }));
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-5 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">WCI Dubai Transport Unit</h1>
        <h2>Bus Registration for Sunday Service Tomorrow {formattedDate}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <div className="flex flex-col w-full">
            <label className="mb-1 text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              disabled={isSubmitting}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="mb-1 text-sm font-medium">Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              disabled={isSubmitting}
              required
            >
              <option value="" disabled>Select your location</option>
              {Object.keys(locationPickupPoints).map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="mb-1 text-sm font-medium">Pick-Up Point</label>
            <select
              name="pickupPoint"
              value={formData.pickupPoint}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              disabled={isSubmitting || !formData.location}
              required
            >
              <option value="" disabled>Select a pick-up point</option>
              {formData.location && locationPickupPoints[formData.location as keyof typeof locationPickupPoints].map(point => (
                <option key={point} value={point}>{point}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="mb-1 text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              disabled={isSubmitting}
              required
            />
          </div>
          <button
            type="submit"
            className={`bg-red-700 text-white rounded-full h-10 w-40 hover:bg-red-500 transition duration-200 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* You can add footer elements here */}
      </footer>
    </div>
  );
}
