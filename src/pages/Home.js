import styles from "../styles/home.module.css";
import PropTypes from 'prop-types'; 
import { useEffect , useState  } from "react";
import { getPosts } from "../api";
import { Loader  } from "../components";
import { Link } from "react-router-dom";

const Home = () => {

  const [posts , setPosts] =useState([]);
  const [spinner , setSpinner]=useState(true);

   useEffect(() => {
   
    const fetchPosts = async () => {
      const response = await getPosts();
      if(response.success){
      setPosts(response.data.posts);
      console.log('response', response.data.posts);
      setSpinner(false);
      }
    };

    fetchPosts();
  }, []);
  if(spinner){
    return (
      <Loader/>
    )
  }

  return (
    <div className={styles.postsList}>
      {posts.map((post) => {
        return (
          <div className={styles.postWrapper} key={`post-${post._id}`}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-pic"
                />
                <div>
                  <div>
                <Link
                  to={{
                    pathname: `/user/${post.user._id}`,
                    state: {
                      user: post.user,
                    },
                  }}
                  className={styles.postAuthor}
                >
                  {post.user.name}
                </Link>
                </div>
                  <span className={styles.postTime}>a minute ago</span>
                </div>
              </div>
              <div className={styles.postContent}>{post.conent}</div>

              <div className={styles.postActions}>
                <div className={styles.postLike}>
                  <img
                    src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                    alt="likes-icon"
                  />
                  <span>5</span>
                </div>

                <div className={styles.postCommentsIcon}>
                  <img
                    src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                    alt="comments-icon"
                  />
                  <span>2</span>
                </div>
              </div>
              <div className={styles.postCommentBox}>
                <input placeholder="Start typing a comment" />
              </div>

              <div className={styles.postCommentsList}>
                <div className={styles.postCommentsItem}>
                  <div className={styles.postCommentHeader}>
                    <span className={styles.postCommentAuthor}>Bill</span>
                    <span className={styles.postCommentTime}>a minute ago</span>
                    <span className={styles.postCommentLikes}>22</span>
                  </div>

                  <div className={styles.postCommentContent}>
                    Random comment
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Home.propTypes={
  posts:PropTypes.array.isRequired
}

export default Home;
