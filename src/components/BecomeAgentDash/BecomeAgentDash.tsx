"use client";

import React, { useState } from "react";
import {
  FaUsers,
  FaUserPlus,
  FaMoneyBillWave,
  FaSearch,
  FaPhoneAlt,
  FaEnvelope,
  FaTimes,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

// 🟢 Dummy Data Structure
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  pkg: string;
  status: "Active" | "Pending" | "Completed";
  joinedDate: string;
}

const dummyCustomers: Customer[] = [
  {
    id: "CST-101",
    name: "রহিম আহমেদ",
    email: "rahim@gmail.com",
    phone: "01711223344",
    pkg: "Premium Hajj Package",
    status: "Active",
    joinedDate: "2026-09-15",
  },
  {
    id: "CST-102",
    name: "আব্দুল করিম",
    email: "karim@gmail.com",
    phone: "01811223344",
    pkg: "Standard Umrah Package",
    status: "Pending",
    joinedDate: "2026-09-20",
  },
  {
    id: "CST-103",
    name: "ফাতিমা বেগম",
    email: "fatima@gmail.com",
    phone: "01911223344",
    pkg: "VIP Hajj Package",
    status: "Completed",
    joinedDate: "2026-08-10",
  },
];

const BecomeAgentDash = () => {
  const [customers, setCustomers] = useState<Customer[]>(dummyCustomers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pkg: "Standard Umrah Package",
  });

  // Handle Form Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add New Customer Handler
  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const newCustomer: Customer = {
      id: `CST-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      email: formData.email || "N/A",
      phone: formData.phone,
      pkg: formData.pkg,
      status: "Pending",
      joinedDate: new Date().toISOString().split("T")[0],
    };

    setCustomers([newCustomer, ...customers]);
    setFormData({ name: "", email: "", phone: "", pkg: "Standard Umrah Package" });
    setIsModalOpen(false);
  };

  // Filter Search
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              এজেন্ট ড্যাশবোর্ড (Agent Portal)
            </h1>
            <p className="text-sm text-gray-500">
              আপনার আন্ডারে কাস্টমার যুক্ত করুন এবং হজ/ওমরাহ প্যাকেজ ম্যানেজ করুন।
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl shadow-md transition"
          >
            <FaUserPlus />
            <span>নতুন কাস্টমার যুক্ত করুন</span>
          </button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-emerald-100 text-emerald-600 rounded-xl text-2xl">
              <FaUsers />
            </div>
            <div>
              <p className="text-sm text-gray-500">মোট কাস্টমার</p>
              <h3 className="text-2xl font-bold text-gray-800">{customers.length} জন</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-blue-100 text-blue-600 rounded-xl text-2xl">
              <FaClock />
            </div>
            <div>
              <p className="text-sm text-gray-500">পেন্ডিং বুকিং</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {customers.filter((c) => c.status === "Pending").length} টি
              </h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-amber-100 text-amber-600 rounded-xl text-2xl">
              <FaMoneyBillWave />
            </div>
            <div>
              <p className="text-sm text-gray-500">মোট কমিশন (আনুমানিক)</p>
              <h3 className="text-2xl font-bold text-gray-800">৳ ৪৫,০০০</h3>
            </div>
          </div>
        </div>

        {/* Customer Table Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Table Search Header */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-lg font-bold text-gray-800">কাস্টমারদের তালিকা</h2>
            <div className="relative w-full sm:w-72">
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="নাম বা মোবাইল দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border rounded-xl text-sm focus:outline-emerald-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
                <tr>
                  <th className="p-4">আইডি (ID)</th>
                  <th className="p-4">কাস্টমারের নাম</th>
                  <th className="p-4">যোগাযোগ</th>
                  <th className="p-4">প্যাকেজ</th>
                  <th className="p-4">স্ট্যাটাস</th>
                  <th className="p-4">যুক্ত করার তারিখ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50/50 transition">
                      <td className="p-4 font-mono font-medium text-gray-500">
                        {customer.id}
                      </td>
                      <td className="p-4 font-semibold text-gray-800">
                        {customer.name}
                      </td>
                      <td className="p-4 space-y-1">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaPhoneAlt className="text-xs text-gray-400" />
                          <span>{customer.phone}</span>
                        </div>
                        {customer.email !== "N/A" && (
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <FaEnvelope />
                            <span>{customer.email}</span>
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-gray-700">{customer.pkg}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            customer.status === "Active"
                              ? "bg-emerald-100 text-emerald-700"
                              : customer.status === "Pending"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {customer.status === "Active" && <FaCheckCircle />}
                          {customer.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500">{customer.joinedDate}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center p-8 text-gray-400">
                      কোনো কাস্টমার পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 🟢 MODAL: Add New Customer */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
              >
                <FaTimes />
              </button>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                নতুন কাস্টমার যোগ করুন
              </h3>

              <form onSubmit={handleAddCustomer} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    কাস্টমারের নাম *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="যেমন: মোঃ রফিকুল ইসলাম"
                    className="w-full border p-2.5 rounded-xl text-sm focus:outline-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    মোবাইল নম্বর *
                  </label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="017XXXXXXXX"
                    className="w-full border p-2.5 rounded-xl text-sm focus:outline-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ইমেইল (ঐচ্ছিক)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="w-full border p-2.5 rounded-xl text-sm focus:outline-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    প্যাকেজ সিলেক্ট করুন
                  </label>
                  <select
                    name="pkg"
                    value={formData.pkg}
                    onChange={handleChange}
                    className="w-full border p-2.5 rounded-xl text-sm focus:outline-emerald-500 bg-white"
                  >
                    <option value="Standard Umrah Package">Standard Umrah Package</option>
                    <option value="Premium Hajj Package">Premium Hajj Package</option>
                    <option value="VIP Hajj Package">VIP Hajj Package</option>
                    <option value="Economy Ramadan Umrah">Economy Ramadan Umrah</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm border rounded-xl hover:bg-gray-100"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium shadow-sm transition"
                  >
                    সেভ করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BecomeAgentDash;