import React from "react";
import { Input } from "@/components/ui/input";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { Textarea } from "./ui/textarea";

interface ProfileInputProps {
  type: string;
  label: string;
  value: string;
  editableValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSave: () => void;
}

const ProfileInput: React.FC<ProfileInputProps> = ({ type, label, value, editableValue, onChange, onSave }) => {
  return (
    <div className="flex flex-col gap-0">
      <label className="font-semibold text-sm text-muted-foreground">{label}</label>
      <div className="w-full flex flex-row items-center h-full">
        <div className="flex-1 w-full h-full">
          {type === "textarea" ? (
            <Textarea
              value={editableValue || value || ""}
              onChange={onChange}
              rows={6}
              className="border-0 border-b-2 border-dotted focus-visible:outline-none focus:border-primary rounded-none p-0 w-full h-full text-xl resize-y scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-transparent"
            />
          ) : (
            <Input
              value={editableValue || value || ""}
              onChange={onChange}
              className="border-0 border-b-2 border-dotted focus-visible:outline-none focus:border-primary rounded-none p-0 text-xl"
            />
          )}
        </div>
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
