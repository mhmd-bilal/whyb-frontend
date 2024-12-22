// components/ProfileInput.tsx

import React from "react";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { IconCircleCheck, IconCircleCheckFilled } from "@tabler/icons-react";
import { Textarea } from "./ui/textarea";

interface ProfileInputProps {
    type: string;
    label: string;
    value: string;
    editableValue: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSave: () => void;
  }  

  const ProfileInput: React.FC<ProfileInputProps> = ({ type,label, value, editableValue, onChange, onSave }) => {
    return (
    <div className={`flex ${type === "textarea" ? "flex-col items-start gap-2" : "flex-row items-center gap-5"} `}> 
  <label className="block text-sm font-medium">{label}</label>
  <div className="w-full mt-2">
    {type === "textarea" ? (
      <Textarea
        value={editableValue || value || ""}
        onChange={onChange}
        className="border-0 border-b-2 border-dotted focus-visible:outline-none focus-visible:none focus-visible:none focus-visible:none focus:border-primary rounded-none p-0 w-full"
      />
        ) : (<Input
        value={editableValue || value || ""}
        onChange={onChange}
        className="border-0 border-b-2 border-dotted focus-visible:outline-none focus-visible:none focus-visible:none focus-visible:none focus:border-primary rounded-none p-0"
        />
)}
        {editableValue !== value && (
          <IconCircleCheckFilled
            className="ml-2 text-green-500 cursor-pointer"
            onClick={onSave}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileInput;
