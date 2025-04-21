
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X } from 'lucide-react';
import ProfileImageUpload from './ProfileImageUpload';
import ProfileDetailsForm from './ProfileDetailsForm';
import SocialLinksForm from './SocialLinksForm';
import ProfileEditActions from './ProfileEditActions';

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
          <ProfileImageUpload
            preview={preview}
            name={user.name}
            onImageChange={handleImageChange}
          />
          <ProfileDetailsForm
            formData={formData}
            onChange={handleChange}
          />
          <SocialLinksForm
            socials={formData.socials}
            onChange={handleSocialChange}
          />
          <ProfileEditActions
            onCancel={onClose}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
