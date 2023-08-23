import { FC, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { PostDto, commentDto } from "../../../../dto/PostsDto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {
  ThumbsUp,
  MessageSquare,
  CornerUpRight,
  MoreHorizontal,
} from "react-feather";
import "./commentsStyles.css";
import earthImg from "../../../../assets/worldwide.png";
import LikeImg from "../../../../assets/like.png";
import Cookies from "js-cookie";
import getTimeAgo from "../../../../helper/timeConverter";
import { addComment, updatePost } from "../../../../../fireBaseConfig";
import MoreButtonFunctional from "../MoreButtonSection";

interface Props {
  postData: PostDto;
  onCancel: () => void;
  isOpen: boolean;
}

const CommentsModal: FC<Props> = ({ onCancel, isOpen, postData }) => {
  const [clickOnLike, setClickOnLike] = useState<string>("#B0B3B8");
  const [clickedPostId, setClickedPostId] = useState<string>("");
  const [commentText, setCommentText] = useState<string>("");

  const userId = JSON.parse(Cookies.get("userData") || "")[0].userId;
  const userPhoto = JSON.parse(Cookies.get("userData") || "")[0].profilePhoto;
  const userData = JSON.parse(Cookies.get("userData") || "")[0];

  const likeClickHandler = (postId: string, numberOfLikes: number) => {
    if (clickOnLike === "#B0B3B8") {
      setClickOnLike("#2078f4");
      updatePost(postId, numberOfLikes + 1);
    } else {
      setClickOnLike("#B0B3B8");
      updatePost(postId, numberOfLikes - 1);
    }
  };

  const moreButtonHandler = (postId: string) => {
    if (postId === clickedPostId) {
      setClickedPostId("");
    } else {
      setClickedPostId(postId);
    }
  };

  const addCommentHandler = (postId: string) => {
    const commentData: commentDto = {
      comment: commentText,
      name: userData.name + userData.surname,
      profilePhoto: userPhoto,
      createdAt: new Date(),
    };
    addComment(postId, commentData);
  };

  return (
    <Modal isOpen={isOpen} toggle={onCancel} className="bg-postContainer">
      <ModalHeader
        toggle={onCancel}
        className="custom-modal bg-postContainer text-white"
      >
        {postData.name}'s post
      </ModalHeader>
      <ModalBody className="bg-postContainer">
        <div
          key={postData.id}
          className="bg-postContainer mt-3 rounded-md relative"
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-2 p-2.5">
              <img
                className="circle-styles cursor-pointer"
                alt="postAuthorPhoto"
                src={postData.url}
              />
              <div>
                <h3 className="post-author-style">{postData.name}</h3>
                <span className="post-time-style">
                  {getTimeAgo(postData.createdAt)}
                  <img
                    title="Public"
                    className=" w-3 h-3"
                    alt="earth"
                    src={earthImg}
                  />
                </span>
              </div>
            </div>

            {userId === postData.userId ? (
              <div
                onClick={() => moreButtonHandler(postData.id)}
                className="post-more-button mr-3"
              >
                <MoreHorizontal className=" cursor-pointer" color="#b0b3b8" />
              </div>
            ) : null}

            {clickedPostId === postData.id ? (
              <MoreButtonFunctional postId={postData.id} />
            ) : null}
          </div>
          <p className="post-description-style p-2.5">{postData.title}</p>
          {postData.postPhoto.length > 0 ? (
            <img alt="postPhoto" src={postData.postPhoto} />
          ) : null}
          <div className="flex gap-1 p-2.5">
            <img className="w-5 h-5" alt="like" src={LikeImg} />
            <span className="post-button-text-style text-sm">
              {postData.reactions}
            </span>
          </div>
          <div className="flex justify-around w-full mt-1 engagement-section">
            <div
              onClick={() => likeClickHandler(postData.id, postData.reactions)}
              className="flex gap-2 cursor-pointer post-buttons-style"
            >
              <ThumbsUp color={clickOnLike} />
              <span
                style={{ color: clickOnLike }}
                className="font-semibold post-button-text-style"
              >
                Like
              </span>
            </div>
            <div className="flex gap-2 cursor-pointer post-buttons-style">
              <MessageSquare color="#B0B3B8" />
              <span className="font-semibold post-button-text-style">
                Comment
              </span>
            </div>
            <div className="flex gap-2 cursor-pointer post-buttons-style">
              <CornerUpRight color="#B0B3B8" />
              <span className="font-semibold post-button-text-style">
                Share
              </span>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="bg-postContainer">
        <img
          className="w-8 h-8 rounded-full"
          alt="currentUser"
          src={userPhoto}
        />
        <textarea
          className="comment-input relative"
          placeholder="Write a comment..."
          cols={50}
          rows={4}
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        />
        <div className="hover:bg-messengerPhoto w-7 h-7 rounded-full flex items-center justify-center absolute bottom-6 right-8">
          <FontAwesomeIcon
            onClick={() => addCommentHandler(postData.id)}
            style={{
              color: `${commentText.length > 0 ? "#0084FF" : "#65676b"}`,
              width: "20px",
              height: "20px",
              rotate: "45deg",
            }}
            className={commentText.length > 0 ? "cursor-pointer " : ""}
            icon={faPaperPlane}
          />
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default CommentsModal;
