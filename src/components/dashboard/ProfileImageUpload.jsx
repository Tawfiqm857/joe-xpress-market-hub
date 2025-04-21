
import React from 'react';
import { Upload } from 'lucide-react';

const ProfileImageUpload = ({ preview, name, onImageChange }) => (
  <div className="profile-image-container animate-fade-in delay-100">
    {preview ? (
      <img 
        src={preview} 
        alt="Profile" 
        className="profile-image-preview"
      />
    ) : (
      <div className="profile-image-placeholder">
        {name ? name.charAt(0).toUpperCase() : 'U'}
      </div>
    )}
    <label className="upload-label animate-fade-in delay-200">
      <Upload size={16} style={{ marginRight: '8px' }} />
      Upload Image
      <input 
        type="file" 
        accept="image/*" 
        onChange={onImageChange} 
        className="upload-input"
      />
    </label>
  </div>
);

export default ProfileImageUpload;

