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
    pickupPoint: "",
    phoneNumber: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString(undefined, options as Intl.DateTimeFormatOptions);

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
      setFormData({ fullName: "", pickupPoint: "", phoneNumber: "" }); // Reset form
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-5 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">WCI Dubai Transport Unit</h1>
        <h2>Bus Registration for today: {formattedDate}</h2>
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
            <label className="mb-1 text-sm font-medium">Pick-Up Point</label>
            <select
              name="pickupPoint"
              value={formData.pickupPoint}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              disabled={isSubmitting}
              required
            >
              <option value="" disabled>Select a pick-up point</option>
              <option value="Ladies Park">Ladies Park</option>
              <option value="Etisalat">Etisalat</option>
              <option value="Hor Al Anz Turn-Off">Hor Al Anz Turn-Off</option>
              <option value="Hamriya Big Mosque">Hamriya Big Mosque</option>
              <option value="Excelsior Hotel">Excelsior Hotel</option>
              <option value="Nesto Supermarket">Nesto Supermarket</option>
              <option value="AL Ghurair Mall">AL Ghurair Mall</option>
              <option value="Day to Day">Day to Day(Not Available on Sundays)</option>
              {/* Add more options as needed */}
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
