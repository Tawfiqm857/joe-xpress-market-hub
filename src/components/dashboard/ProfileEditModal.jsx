
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
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div className="modal-content" style={{
        backgroundColor: 'var(--card-light)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '2rem',
        position: 'relative'
      }}>
        <button 
          className="modal-close" 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem'
          }}
        >
          <X size={24} />
        </button>
        
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Edit Profile</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            {preview ? (
              <img 
                src={preview} 
                alt="Profile" 
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  margin: '0 auto 1rem',
                  border: '3px solid var(--primary)'
                }}
              />
            ) : (
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-light)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto 1rem',
                fontSize: '2.5rem',
                color: 'white'
              }}>
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            
            <label className="upload-label">
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
          
          <div className="form-group">
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
          
          <div className="form-group">
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
          
          <div className="form-group">
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
          
          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>Social Media</h3>
          
          <div className="form-group">
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
          
          <div className="form-group">
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
          
          <div className="form-group">
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
          
          <div className="form-group">
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
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid var(--border-light)',
                background: 'transparent',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: '4px',
                backgroundColor: 'var(--primary)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600
              }}
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
