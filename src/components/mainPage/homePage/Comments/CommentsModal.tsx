import { useRef, FC, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { PostDto, commentDto, createdAtObj } from "../../../../dto/PostsDto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {
  ThumbsUp,
  MessageSquare,
  CornerUpRight,
  MoreHorizontal,
} from "react-feather";
import {
  collection,
  onSnapshot,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import "./commentsStyles.css";
import earthImg from "../../../../assets/worldwide.png";
import LikeImg from "../../../../assets/like.png";
import Cookies from "js-cookie";
import getTimeAgo from "../../../../helper/timeConverter";
import { addComment, updatePost } from "../../../../../fireBaseConfig";
import MoreButtonFunctional from "../MoreButtonSection";
import { v4 as uuidv4 } from "uuid";
import MoreButtonCommentSection from "./MoreButtonComment";

interface Props {
  postData: PostDto[];
  onCancel: () => void;
  isOpen: boolean;
}

const CommentsModal: FC<Props> = ({ onCancel, isOpen, postData }) => {
  const [clickOnLike, setClickOnLike] = useState<string>("#B0B3B8");
  const [clickedPostId, setClickedPostId] = useState<string>("");
  const [clickedCommentId, setClickedCommentId] = useState<string>("");
  const [commentText, setCommentText] = useState<string>("");
  const [editCommentText, setEditCommentText] = useState<string>("");
  const [allComments, setAllComments] = useState<commentDto[]>();
  const [editButtonId, setEditButtonId] = useState<string>("");
  const userId = JSON.parse(Cookies.get("userData") || "")[0].userId;
  const userPhoto = JSON.parse(Cookies.get("userData") || "")[0].profilePhoto;
  const userData = JSON.parse(Cookies.get("userData") || "")[0];

  const db = getFirestore();
  const colRefPosts = collection(db, "Posts");
  const q = query(colRefPosts, where("__name__", "==", postData[0].id));
  const addCommentRef = useRef(null);

  onSnapshot(q, (snapShot) => {
    const postsArr: PostDto[] = [];
    snapShot.docs.forEach((doc) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const postsData = doc.data() as any;
      const posts = { id: doc.id, ...postsData };
      postsArr.push(posts);
    });

    setAllComments(postsArr[0].comments);
  });

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
    if (commentText.length > 0) {
      const commentId = uuidv4();
      const commentData: commentDto = {
        comment: commentText,
        name: userData.name + " " + userData.surname,
        profilePhoto: userPhoto,
        id: commentId,
        userId: userId,
        createdAt: new Date(),
      };
      addComment(postId, commentData);
      setCommentText("");
    }
  };

  const commentMoreButton = (commentId: string) => {
    if (commentId === clickedCommentId) {
      setClickedCommentId("");
    } else {
      setClickedCommentId(commentId);
    }
  };

  const enterButtonTextArea = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && commentText.length > 0) {
      addCommentHandler(postData[0].id);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={onCancel} className="bg-postContainer">
      <ModalHeader
        toggle={onCancel}
        className="custom-modal bg-postContainer text-white"
      >
        {postData[0].name}'s post
      </ModalHeader>
      <ModalBody className="bg-postContainer">
        <div
          key={postData[0].id}
          className="bg-postContainer mt-3 rounded-md relative"
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-2 p-2.5">
              <img
                className="circle-styles cursor-pointer"
                alt="postAuthorPhoto"
                src={postData[0].url}
              />
              <div>
                <h3 className="post-author-style">{postData[0].name}</h3>
                <span className="post-time-style">
                  {getTimeAgo(postData[0].createdAt)}
                  <img
                    title="Public"
                    className=" w-3 h-3"
                    alt="earth"
                    src={earthImg}
                  />
                </span>
              </div>
            </div>

            {userId === postData[0].userId ? (
              <div
                onClick={() => moreButtonHandler(postData[0].id)}
                className="post-more-button mr-3"
              >
                <MoreHorizontal className=" cursor-pointer" color="#b0b3b8" />
              </div>
            ) : null}

            {clickedPostId === postData[0].id ? (
              <MoreButtonFunctional postId={postData[0].id} />
            ) : null}
          </div>
          <p className="post-description-style p-2.5">{postData[0].title}</p>
          {postData[0].postPhoto.length > 0 ? (
            <img alt="postPhoto" src={postData[0].postPhoto} />
          ) : null}
          <div className="flex gap-1 p-2.5">
            <img className="w-5 h-5" alt="like" src={LikeImg} />
            <span className="post-button-text-style text-sm">
              {postData[0].reactions}
            </span>
          </div>
          <div className="flex justify-around w-full mt-1 engagement-section">
            <div
              onClick={() =>
                likeClickHandler(postData[0].id, postData[0].reactions)
              }
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
          <div className="flex flex-col gap-2">
            {allComments?.map((item, index) => {
              return (
                <div key={index} className="flex gap-3 comment-container">
                  <img
                    className="w-8 h-8 rounded-full"
                    alt="userProfile"
                    src={item.profilePhoto}
                  />
                  <div>
                    <div className="flex gap-1 relative">
                      <div className="comment-styles w-editCommentWidth">
                        {editButtonId === item.id ? (
                          <>
                            <textarea
                              className="comment-input relative w-editCommentTextAreaWidth"
                              placeholder="Write a comment..."
                              cols={50}
                              rows={4}
                              value={editCommentText}
                              onKeyDown={enterButtonTextArea}
                              onChange={(event) =>
                                setEditCommentText(event.target.value)
                              }
                            />
                            <div className="hover:bg-messengerPhoto w-7 h-7 rounded-full flex items-center justify-center absolute bottom-6 right-8">
                              <FontAwesomeIcon
                                ref={addCommentRef}
                                onClick={() =>
                                  addCommentHandler(postData[0].id)
                                }
                                style={{
                                  color: `${
                                    editCommentText.length > 0
                                      ? "#0084FF"
                                      : "#65676b"
                                  }`,
                                  width: "20px",
                                  height: "20px",
                                  rotate: "45deg",
                                }}
                                className={
                                  editCommentText.length > 0
                                    ? "cursor-pointer "
                                    : ""
                                }
                                icon={faPaperPlane}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <h3 className="text-white text-sm">{item.name}</h3>
                            <p className="text-white text-base">
                              {item.comment}
                            </p>
                          </>
                        )}
                      </div>
                      {item.userId === userId ? (
                        <div
                          onClick={() => {
                            commentMoreButton(item.id),
                              setEditCommentText(item.comment);
                          }}
                          className="flex items-center justify-center w-7 h-7 self-center"
                        >
                          <MoreHorizontal
                            className="more-horizontal"
                            color="#b0b3b8"
                          />
                        </div>
                      ) : null}
                      {clickedCommentId === item.id ? (
                        <MoreButtonCommentSection
                          setEditButtonId={setEditButtonId}
                          commentId={item.id}
                          allComments={allComments}
                          postId={postData[0].id}
                          setClickedCommentId={setClickedCommentId}
                        />
                      ) : null}
                    </div>
                    <div className="text-commentButtons text-xs flex gap-3 ml-1">
                      <span className="font-bold cursor-pointer">Like</span>
                      <span className="font-bold cursor-pointer">Reply</span>
                      <span>{getTimeAgo(item.createdAt as createdAtObj)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
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
          onKeyDown={enterButtonTextArea}
          onChange={(event) => setCommentText(event.target.value)}
        />
        <div className="hover:bg-messengerPhoto w-7 h-7 rounded-full flex items-center justify-center absolute bottom-6 right-8">
          <FontAwesomeIcon
            ref={addCommentRef}
            onClick={() => addCommentHandler(postData[0].id)}
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
