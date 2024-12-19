import React from "react";

function ImageItem({ image, onDelete }) {

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/gallery/${image.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the image.");
      }

      alert("Image deleted successfully!");
      onDelete(image.id); // Notify the parent component to update the state
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete the image. Please try again.");
    }
  };

  return (
    <div className="rounded-lg bg-white overflow-hidden shadow">
      <div className="h-40">
        <img
          src={image.src}
          alt={image.alt}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-wrap justify-between gap-2 p-3">
        {image.tags.map((tag) => (<>
          <span
            key={tag}
            className="px-2 py-1 bg-[#c2c3c7] text-[#293941] text-sm rounded-full"
          >
            {tag}
          </span>
          <div className=" flex gap-1 ">
            <button
              className="text-xs bg-[#293941] text-[#c59a63] border rounded shadow-md block focus:outline-none text-left px-2 py-1 hover:bg-[#c59a63] hover:text-[#293941]"
              onClick={handleDelete}
            >
              Delete
            </button>

          </div>
        </>))}
      </div>
    </div>
  );
}

export default ImageItem;
