"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const API_URL = `${API_BASE_URL}/api/contacts`;

export const contactApi = {
  async getAllMessages() {
    const response = await fetch(`${API_URL}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || "Failed to fetch messages");
    return data;
  },

  async updateMessageStatus(id: string, isRead: boolean) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead }),
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || "Failed to update status");
    return data;
  },

  async updateMessage(
    id: string,
    formData: {
      name: string;
      phone: string;
      email?: string;
      service?: string;
      message: string;
    },
  ) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || "Failed to update message");
    return data;
  },

  async deleteMessage(id: string) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || "Failed to delete message");
    return data;
  },
};

interface Message {
  id?: string;
  _id?: string;
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message: string;
  isRead: boolean;
}

const ContactInfoPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const responseData = await contactApi.getAllMessages();

      if (responseData.data && Array.isArray(responseData.data)) {
        setMessages(responseData.data);
      } else if (Array.isArray(responseData)) {
        setMessages(responseData);
      } else {
        setMessages([]);
      }

      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (id: string, currentStatus: boolean) => {
    try {
      await contactApi.updateMessageStatus(id, !currentStatus);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id || msg._id === id
            ? { ...msg, isRead: !currentStatus }
            : msg,
        ),
      );
    } catch (err: any) {
      toast(err.message);
    }
  };

  const handleStartEdit = (msg: Message) => {
    const targetId = msg.id || msg._id || "";
    setEditingId(targetId);
    setEditFormData({
      name: msg.name,
      phone: msg.phone,
      email: msg.email || "",
      service: msg.service || "",
      message: msg.message,
    });
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await contactApi.updateMessage(id, editFormData);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id || msg._id === id ? { ...msg, ...editFormData } : msg,
        ),
      );
      setEditingId(null);
      toast("Updated successfully!");
    } catch (err: any) {
      toast(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      await contactApi.deleteMessage(id);
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== id && msg._id !== id),
      );
    } catch (err: any) {
      toast(err.message);
    }
  };

  if (loading)
    return (
      <div className="p-6 text-center text-gray-700 bg-white">
        Loading messages...
      </div>
    );
  if (error)
    return (
      <div className="p-6 text-center text-red-500 bg-white">
        Error: {error}
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen bg-white text-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Contact Messages Dashboard
      </h1>

      {messages.length === 0 ? (
        <p className="text-gray-600">No messages found.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="bg-gray-100 border-b text-gray-700">
                <th className="p-3">Name</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Service</th>
                <th className="p-3">Message</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((item) => {
                const itemId = item.id || item._id || "";
                return (
                  <tr key={itemId} className="border-b hover:bg-gray-50">
                    {editingId === itemId ? (
                      <td colSpan={6} className="p-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <input
                            type="text"
                            value={editFormData.name}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                name: e.target.value,
                              })
                            }
                            placeholder="Name"
                            className="p-2 border rounded bg-white text-gray-800"
                          />
                          <input
                            type="text"
                            value={editFormData.phone}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                phone: e.target.value,
                              })
                            }
                            placeholder="Phone"
                            className="p-2 border rounded bg-white text-gray-800"
                          />
                          <input
                            type="email"
                            value={editFormData.email}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                email: e.target.value,
                              })
                            }
                            placeholder="Email"
                            className="p-2 border rounded bg-white text-gray-800"
                          />
                          <input
                            type="text"
                            value={editFormData.service}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                service: e.target.value,
                              })
                            }
                            placeholder="Service"
                            className="p-2 border rounded bg-white text-gray-800"
                          />
                        </div>
                        <textarea
                          value={editFormData.message}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              message: e.target.value,
                            })
                          }
                          placeholder="Message"
                          className="w-full p-2 border rounded bg-white text-gray-800 mb-3"
                        />
                        <div className="space-x-2">
                          <button
                            onClick={() => handleSaveEdit(itemId)}
                            className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    ) : (
                      <>
                        <td className="p-3 font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="p-3">
                          <div className="text-gray-900">{item.phone}</div>
                          <div className="text-xs text-gray-500">
                            {item.email}
                          </div>
                        </td>
                        <td className="p-3 text-gray-700">
                          {item.service || "N/A"}
                        </td>
                        <td className="p-3 max-w-xs truncate text-gray-700">
                          {item.message}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              item.isRead
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {item.isRead ? "Read" : "Unread"}
                          </span>
                        </td>
                        <td className="p-3 space-x-2 whitespace-nowrap">
                          <button
                            onClick={() =>
                              handleToggleRead(itemId, item.isRead)
                            }
                            className="px-2.5 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                          >
                            {item.isRead ? "Mark Unread" : "Mark Read"}
                          </button>
                          <button
                            onClick={() => handleStartEdit(item)}
                            className="px-2.5 py-1 bg-amber-500 text-white rounded text-xs hover:bg-amber-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(itemId)}
                            className="px-2.5 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactInfoPage;
