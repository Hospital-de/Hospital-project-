import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Search, Calendar, User } from 'lucide-react';

// Mock data for doctors
const doctorsData = [
  { id: 1, name: "Dr. John Doe", specialty: "Cardiologist", address: "New York, NY" },
  { id: 2, name: "Dr. Jane Smith", specialty: "Pediatrician", address: "Los Angeles, CA" },
  { id: 3, name: "Dr. Mike Johnson", specialty: "Dermatologist", address: "Chicago, IL" },
  { id: 4, name: "Dr. Sarah Brown", specialty: "Neurologist", address: "Houston, TX" },
  { id: 5, name: "Dr. David Lee", specialty: "Orthopedist", address: "Phoenix, AZ" },
  { id: 6, name: "Dr. Emily Clark", specialty: "Psychiatrist", address: "Philadelphia, PA" },
];

const uniqueAddresses = [...new Set(doctorsData.map(doctor => doctor.address))];

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [addressFilter, setAddressFilter] = useState('');

  const filteredDoctors = doctorsData.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (addressFilter === '' || doctor.address === addressFilter)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Find a Doctor</h1>
      
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex-1">
          <Select onValueChange={setAddressFilter} value={addressFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by address" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All addresses</SelectItem>
              {uniqueAddresses.map(address => (
                <SelectItem key={address} value={address}>{address}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDoctors.map(doctor => (
          <motion.div
            key={doctor.id}
            className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="h-40 bg-blue-100 flex items-center justify-center">
              <User size={40} className="text-blue-600" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                {doctor.name}
              </h3>
              <p className="text-gray-600 mb-2">{doctor.specialty}</p>
              <p className="text-blue-600 flex items-center text-sm">
                <Calendar className="mr-2" size={12} /> {doctor.address}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;