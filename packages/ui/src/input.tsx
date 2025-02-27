import React from "react";

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        placeholder="Input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
