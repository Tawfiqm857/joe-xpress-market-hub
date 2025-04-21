
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const SocialLinksForm = ({ socials, onChange }) => (
  <>
    <h3 className="section-title animate-text-reveal delay-500">Social Media</h3>
    <div className="form-group animate-slide-right delay-500">
      <label className="form-label">
        <Facebook size={18} style={{ display: 'inline', marginRight: '8px' }} />
        Facebook
      </label>
      <input
        type="url"
        name="facebook"
        value={socials.facebook}
        onChange={onChange}
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
        value={socials.twitter}
        onChange={onChange}
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
        value={socials.instagram}
        onChange={onChange}
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
        value={socials.linkedin}
        onChange={onChange}
        className="form-control"
        placeholder="https://linkedin.com/in/yourprofile"
      />
    </div>
  </>
);

export default SocialLinksForm;

