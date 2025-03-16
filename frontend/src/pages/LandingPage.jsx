import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Blocks, Shield, Database, Link as LinkIcon, 
  Search, FileCheck, ChevronRight, CheckCircle, Building2 
} from 'lucide-react';
import Navbar from './Navbar';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Perubahan gradasi agar lebih menyeluruh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#dcfce7_30%,_transparent_70%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative">
          <div className="text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-emerald-100 rounded-lg">
              <span className="text-emerald-700 font-medium flex items-center gap-2">
                <Blocks size={18} />
                Powered by Blockchain Technology
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transparent Pharmaceutical
              <span className="text-emerald-600"> Supply Chain</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Secure, traceable, and transparent pharmaceutical supply chain management powered by blockchain technology. 
              Ensure authenticity from manufacturer to patient.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/roles" 
                className="px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 
                        transition-all duration-300 flex items-center justify-center gap-2">
                <LinkIcon size={20} />
                Connect Platform
              </Link>
              <Link to="/explorer" 
                className="px-8 py-4 border-2 border-emerald-600 text-emerald-600 rounded-lg 
                        hover:bg-emerald-50 transition-all duration-300 flex items-center justify-center gap-2">
                <Search size={20} />
                Explore Network
              </Link>
            </div>
          </div>
        </div>

        {/* Partner Companies Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/70 backdrop-blur-md rounded-xl p-8 shadow-lg">
            <h3 className="text-center text-xl font-semibold text-gray-700 mb-8">
              Perusahaan yang Bekerja Sama dengan Kami
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "Kimia Farma", type: "Perusahaan Farmasi Nasional" },
                { name: "Kalbe Farma", type: "Manufaktur & Distribusi" },
                { name: "Dexa Medica", type: "Produsen Farmasi" },
                { name: "Apotek K-24", type: "Jaringan Apotek Nasional" }
              ].map((company, index) => (
                <div key={index} className="text-center flex flex-col items-center">
                  <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center mb-3">
                    <Building2 size={32} className="text-emerald-600" />
                  </div>
                  <div className="text-lg font-bold text-emerald-600">{company.name}</div>
                  <div className="text-sm text-gray-600">{company.type}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Database />,
              title: "Immutable Records",
              description: "Every transaction is permanently recorded on the blockchain, ensuring complete traceability and authenticity."
            },
            {
              icon: <Shield />,
              title: "Smart Contracts",
              description: "Automated compliance and verification through blockchain-powered smart contracts."
            },
            {
              icon: <FileCheck />,
              title: "Digital Certificates",
              description: "Blockchain-verified certificates for each product ensuring authenticity and preventing counterfeits."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-emerald-100">
              <div className="h-14 w-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <div className="text-emerald-600">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Blockchain-Powered Supply Chain</h2>
            <p className="text-xl text-gray-600">Complete transparency from manufacturer to end-user</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Smart contract verification",
              "Real-time blockchain tracking",
              "Decentralized record keeping",
              "Automated compliance",
              "Product authentication",
              "Temperature monitoring",
              "Secure data sharing",
              "Digital certificates"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3 bg-emerald-50 p-4 rounded-lg">
                <CheckCircle className="text-emerald-600 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Join Our Blockchain Network</h2>
          <p className="text-xl mb-8 text-emerald-100">Connect your supply chain to our secure blockchain platform</p>
          <Link to="/roles" 
            className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 rounded-lg 
                     hover:bg-emerald-50 transition-all duration-300 font-medium gap-2">
            Connect Now
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
