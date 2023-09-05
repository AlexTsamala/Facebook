import { deleteComment } from "../../../../../fireBaseConfig";
import { FC, useState } from "react";
import QuestionModal from "../../../modalFolder/QuestionModal";
import { commentDto } from "../../../../dto/PostsDto";

interface Props {
  commentId: string;
  allComments: commentDto[];
  postId: string;
  setClickedCommentId: (id: string) => void;
  setEditButtonId: (id: string) => void;
}

const MoreButtonCommentSection: FC<Props> = ({
  commentId,
  postId,
  allComments,
  setClickedCommentId,
  setEditButtonId,
}) => {
  const [createIsOpen, setCreateIsOpen] = useState<boolean>(false);

  const deleteHandler = () => {
    setCreateIsOpen(true);
  };
  return (
    <div className="comment-section-more z-10">
      <div
        onClick={() => {
          setEditButtonId(commentId), setClickedCommentId("");
        }}
        className="flex gap-2 post-buttons-style w-full cursor-pointer"
      >
        <span className="font-semibold post-button-text-style">Edit</span>
      </div>
      <div
        onClick={deleteHandler}
        className="flex gap-2 post-buttons-style w-full cursor-pointer"
      >
        <span className="font-semibold post-button-text-style ">Delete</span>
      </div>
      <QuestionModal
        yesFunction={() => {
          deleteComment(postId, allComments, commentId),
            setClickedCommentId("");
        }}
        backgroundColor="#242526"
        textColor="#ffffff"
        isOpen={createIsOpen}
        onCancel={() => setCreateIsOpen(false)}
        title="Delete comment?"
        description="Are you sure you want to delete this comment?"
      />
    </div>
  );
};

export default MoreButtonCommentSection;
