
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FormError from './FormError';

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error
}) => {
  return (
    <div className="form-group">
      <Label htmlFor={id} className="form-label">{label}</Label>
      <Input
        type={type}
        id={id}
        name={id}
        className="form-control"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <FormError message={error} />}
    </div>
  );
};

export default FormInput;
