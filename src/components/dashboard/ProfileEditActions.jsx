
import React from 'react';

const ProfileEditActions = ({ onCancel, isSubmitting }) => (
  <div className="form-actions animate-fade-in delay-600">
    <button
      type="button"
      onClick={onCancel}
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
);

export default ProfileEditActions;

