import React, { useState } from "react";
import { useNavigate } from "react-router";

function ImageUploadForm() {
  const [file, setFile] = useState(null);
  const [altText, setAltText] = useState("");
  const [tags, setTags] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image to upload.");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("image", file); // Attach the image file
    formData.append("alt_text", altText); // Add alt_text
    formData.append("tags", tags); // Add tags

    try {
      // Use the actual API endpoint
      const response = await fetch("http://localhost:5000/api/gallery", {
        method: "POST",
        body: formData,
      });
      console.log(file);

      if (!response.ok) {
        throw new Error("Failed to upload image.");
      }

      const result = await response.json();
      alert(`Image uploaded successfully! Image ID: ${result.id}`);
      navigate('/image-list')
      // Reset form
      setFile(null);
      setAltText("");
      setTags("");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 max-w-3xl w-full"
      >
        <h4 className="text-2xl font-semibold text-center text-[#c59a63] mb-6">
          Add Images In Gallery
        </h4>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="altText" className="block text-sm font-medium text-gray-700">
            Alt Text
          </label>
          <input
            id="altText"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Describe the image"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <textarea
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags separated by commas"
            required
            className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={isUploading}
          className={`w-full mt-4 flex justify-center items-center rounded-md bg-[#c59a63] py-2 px-4 text-sm font-medium text-[#293941] hover:bg-[#293941] hover:text-[#c59a63] focus:outline-none ${isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {isUploading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  );
}

export default ImageUploadForm;
