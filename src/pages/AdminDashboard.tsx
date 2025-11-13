import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './AdminDashboard.css'; // Custom CSS for the admin dashboard

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Sample data with additional clients
  const [clients, setClients] = useState([
    { id: 1014, firstName: 'Aziz', lastName: 'Tissawi', email: 'aziztizizi@gmail.com', phone: '525070485' },
    { id: 1478, firstName: 'Ali', lastName: 'Hamdi', email: 'aliaali@gmail.com', phone: '95684723' },
    { id: 4, firstName: 'Manai', lastName: 'Ayoub', email: 'amgforever69@gmail.com', phone: '45784578' },
    { id: 5, firstName: 'Nadhem', lastName: 'Ochi', email: 'nathemnathen@gmail.com', phone: '178557454' },
    { id: 6, firstName: 'Ali', lastName: 'Khmiri', email: 'alikhmiri@gmail.com', phone: '123456789' },
    { id: 7, firstName: 'Mostfa', lastName: 'Benhmid', email: 'mostfa@gmail.com', phone: '987654321' },
    { id: 8, firstName: 'Ala', lastName: 'Warghi', email: 'ala@gmail.com', phone: '555666777' },
    { id: 9, firstName: 'Hama', lastName: 'Abidi', email: 'hama@gmail.com', phone: '111222333' },
    { id: 10, firstName: 'Montasar', lastName: 'Khmiri', email: 'montasar@gmail.com', phone: '444555666' },
  ]);

  const handleDelete = (id) => {
    setClients(clients.filter(client => client.id !== id));
  };

  const handleContact = (phone) => {
    // Construct WhatsApp URL
    const whatsappUrl = `https://wa.me/${phone}`;
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center bg-ivory-50 py-12">
        <div className="w-full max-w-6xl px-4">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="text-center mb-8">
              <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-2">
                Tableau de Bord Admin
              </h1>
              <p className="text-gray-600">
                Gérer les clients et leurs informations.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                    <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nom</th>
                    <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Prénom</th>
                    <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                    <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Téléphone</th>
                    <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id}>
                      <td className="py-3 px-4 border-b border-gray-200">{client.id}</td>
                      <td className="py-3 px-4 border-b border-gray-200">{client.lastName}</td>
                      <td className="py-3 px-4 border-b border-gray-200">{client.firstName}</td>
                      <td className="py-3 px-4 border-b border-gray-200">{client.email}</td>
                      <td className="py-3 px-4 border-b border-gray-200">{client.phone}</td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                          Supprimer
                        </button>
                        <button
                          onClick={() => handleContact(client.phone)}
                          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        >
                          Contacter
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
