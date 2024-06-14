import React from "react";
import Avatar from "@mui/material/Avatar";

export default function ImageUpload({
  profileImage,
  setProfileImage,
  formErrors,
  className,
}) {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split("base64,")[1];
      setProfileImage(base64String);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Transparent input overlay covering the entire container */}
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={handleImageChange}
      />
      <div className="flex items-center border border-[#c4c4c4] py-[8px] px-3">
        <div className="relative">
          <label
            htmlFor="profile-image"
            className={`block text-xs text-[#2C3BFA] mb-1 absolute -top-4 ml-2 px-1 bg-[#111827] whitespace-nowrap`}
          >
            Profile Image
          </label>
          <span className="inline-block h-8 w-8 overflow-hidden">
            {profileImage ? (
              <Avatar
                src={profileImage}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <Avatar alt="Profile" className="h-full w-full object-cover" />
            )}
          </span>
        </div>
        {/* Clickable label for opening file picker */}
        <label
          htmlFor="profile-image"
          className="ml-auto cursor-pointer font-medium text-blue-600 hover:text-blue-500 mt-1 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
        >
          Change
        </label>
        {formErrors.profileImage && (
          <p className="mt-1 text-xs text-red-600">{formErrors.profileImage}</p>
        )}
      </div>
    </div>
  );
}
