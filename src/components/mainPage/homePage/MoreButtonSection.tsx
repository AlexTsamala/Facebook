import { Trash2, Edit } from "react-feather";
import { deletePost } from "../../../../fireBaseConfig";
import { FC } from "react";

interface props {
  postId: string;
}

const MoreButtonFunctional: FC<props> = ({ postId }) => {
  return (
    <div className="more-button-container top-12">
      <div className="flex gap-2 post-buttons-style w-full cursor-pointer">
        <Edit color="#ffffff" />
        <span className="font-semibold post-button-text-style">Edit post</span>
      </div>
      <div
        onClick={() => deletePost(postId)}
        className="flex gap-2 post-buttons-style w-full"
      >
        <Trash2 color="#ffffff" />
        <span className="font-semibold post-button-text-style cursor-pointer">
          Move to Recycle bin
        </span>
      </div>
    </div>
  );
};

export default MoreButtonFunctional;
