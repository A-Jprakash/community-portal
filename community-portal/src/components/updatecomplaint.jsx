import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [formData, setFormData] = useState({ status: "Pending", image: null });
  const navigate = useNavigate();

  // Fetch complaints from the backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:9090/complaint/incomplete");
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  // Handle selecting a complaint to update
  const handleSelectComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setFormData({ status: complaint.status, image: null }); // Initialize form with status and allow new image upload
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prevData) => ({ ...prevData, image: reader.result }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission for updating the complaint
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedComplaint = {
        ...selectedComplaint, // Keep the existing complaint fields
        status: formData.status, // Update status
        image: formData.image,   // Update image (Base64 encoded string)
      };

      // Send the updated complaint to the backend API
      await axios.put(
        `http://localhost:9090/complaint/update`,
        updatedComplaint
      );

      alert("Complaint updated successfully!");

      // Redirect to the starting page
      setSelectedComplaint(null);
      navigate("/update");
    } catch (error) {
      console.error("Error updating complaint:", error);
      alert("Failed to update complaint. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
        Update Complaints
      </h1>

      {selectedComplaint ? (
        <form
          onSubmit={handleFormSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Update Complaint
          </h2>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload New Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Uploaded Preview"
                className="mt-4 max-h-64 object-cover rounded"
              />
            )}
          </div>

          {/* Status Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setSelectedComplaint(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {complaint.title}
              </h3>
              <div className="mt-6">
                {complaint.image && (
                <img
                src={complaint.image} // Base64 data already includes the required prefix
                alt={complaint.complaintType}
                className="w-full h-64 object-cover rounded-md"
                />
                )}
              </div>
              <button
                  className="px-4 py-2 my-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
                  disabled
                >
                  Upvote ({complaint.upvote})
                </button>
                <button
                  className="px-4 py-2 m-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                  disabled
                >
                  Downvote ({complaint.downvote})
                </button>
              <p className="text-gray-700 mt-2">{complaint.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Status: {complaint.status}
              </p>
              <button
                onClick={() => handleSelectComplaint(complaint)}
                className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Update
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpdateComplaint;
