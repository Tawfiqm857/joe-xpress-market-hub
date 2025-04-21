
import React from 'react';
import { User, MapPin, Phone } from 'lucide-react';

const ProfileDetailsForm = ({ formData, onChange }) => (
  <>
    <div className="form-group animate-slide-right delay-200">
      <label className="form-label">
        <User size={18} style={{ display: 'inline', marginRight: '8px' }} />
        Full Name
      </label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={onChange}
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
        onChange={onChange}
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
        onChange={onChange}
        className="form-control"
        placeholder="Your phone number"
      />
    </div>
  </>
);

export default ProfileDetailsForm;

