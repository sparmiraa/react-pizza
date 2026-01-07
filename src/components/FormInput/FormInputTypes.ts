export interface FormInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    error?: string;
    rightElement?: React.ReactNode; 
  }
  