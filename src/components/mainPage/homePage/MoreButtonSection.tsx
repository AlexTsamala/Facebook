import { Trash2, Edit } from "react-feather";
import { deletePost } from "../../../../fireBaseConfig";
import { FC, useState } from "react";
import QuestionModal from "../../modalFolder/QuestionModal";

interface props {
  postId: string;
}

const MoreButtonFunctional: FC<props> = ({ postId }) => {
  const [createIsOpen, setCreateIsOpen] = useState<boolean>(false);

  const deleteHandler = () => {
    setCreateIsOpen(true);
  };

  return (
    <div className="more-button-container top-12">
      <div className="flex gap-2 post-buttons-style w-full cursor-pointer">
        <Edit color="#ffffff" />
        <span className="font-semibold post-button-text-style">Edit post</span>
      </div>
      <div
        onClick={deleteHandler}
        className="flex gap-2 post-buttons-style w-full"
      >
        <Trash2 color="#ffffff" />
        <span className="font-semibold post-button-text-style cursor-pointer">
          Move to Recycle bin
        </span>
      </div>
      <QuestionModal
        yesFunction={() => deletePost(postId)}
        backgroundColor="#242526"
        textColor="#ffffff"
        isOpen={createIsOpen}
        onCancel={() => setCreateIsOpen(false)}
        title="Delete permanently ?"
        description="Your post will be deleted permanently and you can't restore it"
      />
    </div>
  );
};

export default MoreButtonFunctional;
