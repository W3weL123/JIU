import { useState } from "react";
import MemberNavbar from "../../components/MemberNavbar";
import "./HomeFeed.css";

const dummyPosts = [
  {
    id: 1,
    author: "JIU Admin",
    date: "Feb 13, 2026",
    content: "Welcome to JIU Church community! Stay tuned for updates and events.",
    image: "https://picsum.photos/600/300?random=1",
    avatar: "https://i.pravatar.cc/150?img=3",
    likes: 12,
    comments: [],
  },
  {
    id: 2,
    author: "Youth Leader",
    date: "Feb 12, 2026",
    content: "Reminder: Youth fellowship this Saturday at 4PM. See you everyone!",
    image: "https://picsum.photos/600/300?random=2",
    avatar: "https://i.pravatar.cc/150?img=5",
    likes: 7,
    comments: [],
  },
];

export default function HomeFeed() {
  const [posts, setPosts] = useState(dummyPosts);
  const [commentText, setCommentText] = useState({});

  const handleLike = (id) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleComment = (id) => {
    if (!commentText[id]) return;

    setPosts(posts.map(post =>
      post.id === id
        ? { ...post, comments: [...post.comments, commentText[id]] }
        : post
    ));

    setCommentText({ ...commentText, [id]: "" });
  };

  return (
    <>
      <MemberNavbar />

      <div className="feed-layout">

        {/* LEFT PROFILE */}
        <div className="profile-card">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="profile"
            className="profile-avatar"
          />
          <h3>Emmanuel Vito Cruz</h3>
          <p className="role">Church Member</p>
        </div>

        {/* RIGHT FEED */}
        <div className="feed-container">
          <h2 className="feed-title">Community Feed</h2>

          <div className="posts">
            {posts.map((post) => (
              <div className="post-card" key={post.id}>

                <div className="post-top">
                  <img src={post.avatar} alt="avatar" className="avatar" />
                  <div className="post-user">
                    <h4>{post.author}</h4>
                    <span>{post.date}</span>
                  </div>
                </div>

                <p className="post-content">{post.content}</p>

                {post.image && (
                  <img src={post.image} alt="post" className="post-image" />
                )}

                <div className="post-stats">
                  <span>👍 {post.likes} Likes</span>
                  <span>💬 {post.comments.length} Comments</span>
                </div>

                <div className="post-actions">
                  <button onClick={() => handleLike(post.id)}>Like</button>
                </div>

                <div className="comment-box">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentText[post.id] || ""}
                    onChange={(e) =>
                      setCommentText({ ...commentText, [post.id]: e.target.value })
                    }
                  />
                  <button onClick={() => handleComment(post.id)}>Post</button>
                </div>

                <div className="comments">
                  {post.comments.map((c, i) => (
                    <p key={i} className="comment">{c}</p>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
