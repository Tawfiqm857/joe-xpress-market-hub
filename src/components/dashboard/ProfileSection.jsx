
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, MapPin, Phone, Edit, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import ProfileEditModal from './ProfileEditModal';
import '../../styles/dashboard.css';

const ProfileSection = () => {
  const { user } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  return (
    <div className="profile-section animate-fade-in">
      <div className="avatar-container">
        {user.profilePicture ? (
          <img src={user.profilePicture} alt={user.name} className="profile-avatar animate-fade-in" />
        ) : (
          <div className="avatar-placeholder animate-fade-in">
            {getInitials(user.name)}
          </div>
        )}
      </div>
      
      <div className="profile-details">
        <h2 className="profile-name animate-text-reveal">{user.name}</h2>
        <p className="profile-info animate-slide-right delay-100">
          <User size={18} />
          {user.email}
        </p>
        
        {user.location && (
          <p className="profile-info animate-slide-right delay-200">
            <MapPin size={18} />
            {user.location}
          </p>
        )}
        
        {user.phone && (
          <p className="profile-info animate-slide-right delay-300">
            <Phone size={18} />
            {user.phone}
          </p>
        )}
        
        {user.socials && Object.values(user.socials).some(val => val) && (
          <div className="social-links animate-slide-right delay-400">
            {user.socials.facebook && (
              <a href={user.socials.facebook} target="_blank" rel="noopener noreferrer" className="social-link">
                <Facebook size={18} />
              </a>
            )}
            {user.socials.twitter && (
              <a href={user.socials.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                <Twitter size={18} />
              </a>
            )}
            {user.socials.instagram && (
              <a href={user.socials.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                <Instagram size={18} />
              </a>
            )}
            {user.socials.linkedin && (
              <a href={user.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                <Linkedin size={18} />
              </a>
            )}
          </div>
        )}
        
        <button 
          className="profile-edit-btn animate-fade-in delay-500"
          onClick={() => setShowEditModal(true)}
        >
          <Edit size={16} />
          Edit Profile
        </button>
      </div>
      
      {showEditModal && (
        <ProfileEditModal 
          user={user} 
          onClose={() => setShowEditModal(false)} 
        />
      )}
    </div>
  );
};

export default ProfileSection;
