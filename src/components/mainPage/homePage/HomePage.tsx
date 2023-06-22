import "./homePage.css";
import {
  Video,
  Image,
  Smile,
  ThumbsUp,
  MessageSquare,
  CornerUpRight,
} from "react-feather";
import profileImg from "../../../assets/სანდროწამალაშვილი.jpg";
import earthImg from "../../../assets/worldwide.png";
import LikeImg from "../../../assets/like.png";
import Cookies from "js-cookie";
import { PostDto } from "../../../dto/PostsDto";
import { updatePost } from "../../../../fireBaseConfig";
import {
  collection,
  onSnapshot,
  getFirestore,
  query,
  orderBy,
} from "firebase/firestore";
import { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import getTimeAgo from "../../../helper/timeConverter";

const Homepage = () => {
  const [clickOnLike, setClickOnLike] = useState<string>("#B0B3B8");
  const [createIsOpen, setCreateIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const [posts, setPosts] = useState<PostDto[]>();
  const userName = JSON.parse(Cookies.get("userData") || "")[0].name;

  const db = getFirestore();
  const colRefPosts = collection(db, "Posts");
  const q = query(colRefPosts, orderBy("createdAt", "desc"));

  onSnapshot(q, (snapShot) => {
    const postsArr: PostDto[] = [];
    snapShot.docs.forEach((doc) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const postsData = doc.data() as any;
      const posts = { id: doc.id, ...postsData };
      postsArr.push(posts);
    });
    setPosts(postsArr);
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

  return (
    <div>
      <div className="flex justify-center items-start rounded-md bg-postContainer p-3 flex-col">
        <div className="flex gap-2">
          <img
            className="circle-styles cursor-pointer"
            alt="current-user-img"
            src={profileImg}
          />
          <input
            className="rounded-3xl facebook-search-styles w-postInputWidth p-2.5 outline-none"
            type="text"
            placeholder={`What's on your mind ${userName} ?`}
            onClick={() => setCreateIsOpen(true)}
            value={inputValue}
            readOnly
          />
        </div>
        <hr className="border text-white w-full mt-3" />
        <div className="flex justify-center w-full mt-3">
          <div className="flex gap-2 cursor-pointer post-buttons-style">
            <Video color="red" />
            <span className="font-semibold post-button-text-style">
              Live video
            </span>
          </div>
          <div className="flex gap-2 cursor-pointer post-buttons-style">
            <Image color="green" />
            <span className="font-semibold post-button-text-style">
              Photo/video
            </span>
          </div>
          <div className="flex gap-2 cursor-pointer post-buttons-style">
            <Smile color="yellow" />
            <span className="font-semibold post-button-text-style">
              Feeling/activity
            </span>
          </div>
        </div>
      </div>
      {posts?.map((post: PostDto) => {
        return (
          <div key={post.id} className="bg-postContainer mt-3 rounded-md">
            <div className="flex gap-2 p-2.5">
              <img
                className="circle-styles cursor-pointer"
                alt="postAuthorPhoto"
                src={post.url}
              />
              <div>
                <h3 className="post-author-style">{post.name}</h3>
                <span className="post-time-style">
                  {getTimeAgo(post.createdAt)}
                  <img
                    title="Public"
                    className=" w-3 h-3"
                    alt="earth"
                    src={earthImg}
                  />
                </span>
              </div>
            </div>
            <p className="post-description-style p-2.5">{post.title}</p>
            {post.postPhoto.length > 0 ? (
              <img alt="postPhoto" src={post.postPhoto} />
            ) : null}
            <div className="flex gap-1 p-2.5">
              <img className="w-5 h-5" alt="like" src={LikeImg} />
              <span className="post-button-text-style text-sm">
                {post.reactions}
              </span>
            </div>
            <div className="flex justify-around w-full mt-1 engagement-section">
              <div
                onClick={() => likeClickHandler(post.id, post.reactions)}
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
        );
      })}
      <CreatePostModal
        isOpen={createIsOpen}
        onCancel={() => setCreateIsOpen(false)}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </div>
  );
};

export default Homepage;
