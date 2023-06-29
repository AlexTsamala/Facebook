/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash2, Upload } from "react-feather";
import { useRef, ChangeEvent, FC } from "react";

interface props {
  setImageUrl: (url: string) => void;
  setFile: (url: any) => void;
  setKeepCoverIsOpen: (status: boolean) => void;
}

const CoverPhotoDropDown: FC<props> = ({
  setImageUrl,
  setFile,
  setKeepCoverIsOpen,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoVideoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setKeepCoverIsOpen(true);
      setFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-2 flex justify-center mt-3 flex-col gap-2 absolute w-80 bg-neutral-800 bottom-16 right-52 rounded-lg">
      <div
        onClick={handlePhotoVideoClick}
        className="flex justify-start gap-2 cursor-pointer post-buttons-style"
      >
        <Upload color="#ffffff" />
        <span className="font-semibold post-button-text-style">
          Upload photo
        </span>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>
      <div className="flex justify-start gap-2 cursor-pointer post-buttons-style">
        <Trash2 color="#ffffff" />
        <span className="font-semibold post-button-text-style">Remove</span>
      </div>
    </div>
  );
};

export default CoverPhotoDropDown;
