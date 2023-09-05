/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {
  ChevronDown,
  Smile,
  Image,
  User,
  MapPin,
  Flag,
  MoreHorizontal,
  CheckCircle,
} from "react-feather";
import earthImg from "../../../assets/worldwide.png";
import Cookies from "js-cookie";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { db, storage, addPost } from "../../../../fireBaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadTask,
  StorageReference,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

interface Props {
  onCancel: () => void;
  isOpen: boolean;
  setInputValue: (vale: string) => void;
  inputValue: string;
}

const CreatePostModal: FC<Props> = ({
  isOpen,
  onCancel,
  setInputValue,
  inputValue,
}) => {
  const [disableStatus, setDisableStatus] = useState<boolean>(true);
  const [emojiPicker, setEmojiPicker] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [file, setFile] = useState<any>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userName = JSON.parse(Cookies.get("userData") || "")[0].name;
  const surName = JSON.parse(Cookies.get("userData") || "")[0].surname;
  const profilePhoto = JSON.parse(Cookies.get("userData") || "")[0]
    .profilePhoto;
  const userId = JSON.parse(Cookies.get("userData") || "")[0].userId;

  useEffect(() => {
    const reader = new FileReader();
    const handleUploadProgress = (event: ProgressEvent<FileReader>) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setUploadProgress(progress);
      }
    };

    if (file) {
      reader.addEventListener("progress", handleUploadProgress);

      reader.readAsDataURL(file);
    }

    return () => {
      if (file) {
        // Clean up event listener
        reader.removeEventListener("progress", handleUploadProgress);
      }
    };
  }, [file]);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    if (event.target.value.length > 0) {
      setDisableStatus(false);
    } else {
      setDisableStatus(true);
    }
  };
  const handleEmoji = (emojiObj: any) => {
    setInputValue(inputValue + emojiObj.emoji);
  };
  const handlePhotoVideoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleCreatePost = () => {
    setLoading(true);
    const authorName = userName + " " + surName;
    if (file) {
      const storageRef: StorageReference = ref(
        storage,
        `/images/${Date.now()}${file?.name}`
      );

      const uploadImage: UploadTask = uploadBytesResumable(storageRef, file);

      uploadImage.on(
        "state_changed",
        () => {
          // const progressPercent = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // );
          // setProgressIndicator(progressPercent);
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref).then((url) => {
            const articleRef = collection(db, "Posts");
            const newArticle = {
              comments: [],
              name: authorName,
              postPhoto: url,
              title: inputValue,
              userId: userId,
              url: profilePhoto,
              createdAt: serverTimestamp(),
              reactions: 0,
            };
            addDoc(articleRef, newArticle)
              .then(() => {
                setFile("");
                setInputValue("");
                setLoading(false);
                onCancel();
                setImageUrl("");
                toast("Post successfully added", { type: "success" });
              })
              .catch(() => {
                toast("Error adding article", { type: "error" });
              });
          });
        }
      );
    } else {
      addPost(authorName, "", inputValue, userId, profilePhoto);
      setInputValue("");
      setLoading(false);
      toast("successfully added", { type: "success" });
      onCancel();
    }
  };

  const onModalClose = () => {
    setUploadProgress(0);
    setImageUrl("");
    onCancel();
  };

  return (
    <Modal isOpen={isOpen} toggle={onCancel}>
      <ModalHeader
        onClick={onModalClose}
        className="post-modal-header"
        toggle={onCancel}
      >
        Create post
      </ModalHeader>
      <ModalBody className="post-modal-body">
        <div className="flex items-center gap-2 mb-3">
          <img
            className="circle-styles cursor-pointer"
            alt="current-user-img"
            src={profilePhoto}
          />
          <div>
            <h3 className="text-white">{userName + " " + surName}</h3>
            <div className="text-white public-private-post-style">
              <img
                title="Public"
                className=" w-3 h-3"
                alt="earth"
                src={earthImg}
              />
              <span>Public</span>
              <ChevronDown />
            </div>
          </div>
        </div>
        <textarea
          className="create-post-input"
          placeholder={`What's on your mind, ${userName}?`}
          name="postText"
          rows={4}
          cols={50}
          onChange={handleInputChange}
          value={inputValue}
        />
        <div title="Emoji" className="cursor-pointer mb-3">
          <Smile onClick={() => setEmojiPicker(!emojiPicker)} color="#ffffff" />
          {emojiPicker ? (
            <EmojiPicker
              theme={Theme.DARK}
              emojiStyle={EmojiStyle.FACEBOOK}
              onEmojiClick={(emoji) => handleEmoji(emoji)}
            />
          ) : null}
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
        {uploadProgress === 100 && (
          <div className="upload-success">
            <CheckCircle /> File uploaded successfully!
          </div>
        )}
        {imageUrl ? (
          <img
            className="post-image-preview"
            src={imageUrl}
            alt="Image Preview"
          />
        ) : null}

        <div className="text-white rounded-xl font-semibold p-3 add-photo-container flex justify-between">
          <h3>Add to your post</h3>
          <div className="flex gap-2">
            <div
              title="Photo/video"
              className="cursor-pointer"
              onClick={handlePhotoVideoClick}
            >
              <Image color="green" />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
            <div title="Tag people" className="cursor-pointer">
              <User color="blue" />
            </div>
            <div title="Feeling/activity" className="cursor-pointer">
              <Smile color="yellow" />
            </div>
            <div title="Check in" className="cursor-pointer">
              <MapPin color="red" />
            </div>
            <div title="Life event" className="cursor-pointer">
              <Flag color="#00BFFF" />
            </div>
            <div title="More" className="cursor-pointer">
              <MoreHorizontal color="#B0C4DE" />
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="post-modal-footer">
        <button
          disabled={disableStatus}
          className={`create-post-button ${
            inputValue.length > 0 ? "active-post-button" : ""
          }`}
          type="button"
          onClick={handleCreatePost}
        >
          {loading ? (
            <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Post"
          )}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default CreatePostModal;
