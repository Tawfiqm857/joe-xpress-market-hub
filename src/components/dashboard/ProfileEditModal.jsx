
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Upload, User, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const ProfileEditModal = ({ user, onClose }) => {
  const { updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user.name || '',
    location: user.location || '',
    phone: user.phone || '',
    socials: {
      facebook: user.socials?.facebook || '',
      twitter: user.socials?.twitter || '',
      instagram: user.socials?.instagram || '',
      linkedin: user.socials?.linkedin || '',
    },
    profilePicture: user.profilePicture || ''
  });
  
  const [preview, setPreview] = useState(user.profilePicture || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      socials: {
        ...formData.socials,
        [name]: value
      }
    });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        onClose();
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in">
        <button 
          className="modal-close" 
          onClick={onClose}
        >
          <X size={24} />
        </button>
        
        <h2 className="modal-title animate-text-reveal">Edit Profile</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="profile-image-container animate-fade-in delay-100">
            {preview ? (
              <img 
                src={preview} 
                alt="Profile" 
                className="profile-image-preview"
              />
            ) : (
              <div className="profile-image-placeholder">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            
            <label className="upload-label animate-fade-in delay-200">
              <Upload size={16} style={{ marginRight: '8px' }} />
              Upload Image
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="upload-input"
              />
            </label>
          </div>
          
          <div className="form-group animate-slide-right delay-200">
            <label className="form-label">
              <User size={18} style={{ display: 'inline', marginRight: '8px' }} />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Your name"
              required
            />
          </div>
          
          <div className="form-group animate-slide-right delay-300">
            <label className="form-label">
              <MapPin size={18} style={{ display: 'inline', marginRight: '8px' }} />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-control"
              placeholder="Your city/country"
            />
          </div>
          
          <div className="form-group animate-slide-right delay-400">
            <label className="form-label">
              <Phone size={18} style={{ display: 'inline', marginRight: '8px' }} />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="Your phone number"
            />
          </div>
          
          <h3 className="section-title animate-text-reveal delay-500">Social Media</h3>
          
          <div className="form-group animate-slide-right delay-500">
            <label className="form-label">
              <Facebook size={18} style={{ display: 'inline', marginRight: '8px' }} />
              Facebook
            </label>
            <input
              type="url"
              name="facebook"
              value={formData.socials.facebook}
              onChange={handleSocialChange}
              className="form-control"
              placeholder="https://facebook.com/yourprofile"
            />
          </div>
          
          <div className="form-group animate-slide-right delay-500">
            <label className="form-label">
              <Twitter size={18} style={{ display: 'inline', marginRight: '8px' }} />
              Twitter
            </label>
            <input
              type="url"
              name="twitter"
              value={formData.socials.twitter}
              onChange={handleSocialChange}
              className="form-control"
              placeholder="https://twitter.com/yourhandle"
            />
          </div>
          
          <div className="form-group animate-slide-right delay-500">
            <label className="form-label">
              <Instagram size={18} style={{ display: 'inline', marginRight: '8px' }} />
              Instagram
            </label>
            <input
              type="url"
              name="instagram"
              value={formData.socials.instagram}
              onChange={handleSocialChange}
              className="form-control"
              placeholder="https://instagram.com/yourhandle"
            />
          </div>
          
          <div className="form-group animate-slide-right delay-500">
            <label className="form-label">
              <Linkedin size={18} style={{ display: 'inline', marginRight: '8px' }} />
              LinkedIn
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.socials.linkedin}
              onChange={handleSocialChange}
              className="form-control"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
          
          <div className="form-actions animate-fade-in delay-600">
            <button
              type="button"
              onClick={onClose}
              className="btn-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-save"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
