import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Loader } from "../components";
import styles from "../styles/settings.module.css";
import { useAuth } from "../hook/index";
import { useEffect, useState } from "react";
import { fetchUserProfile  , addFriend , removeFriend} from "../api";
const UserProfile = () => {
  const [user, setUser] = useState({});
  const [requestInProgress ,setRequestInProgress]=useState(true);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);
      if (response.success) {
        setUser(response.data.user);
      } else {
        toast(response.message);
        return navigate("/");
      }

      setLoading(false);
    };

    getUser();
  }, [userId]);

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    
    const friends = auth.user.friends;
    if(friends.length<0){console.log( friends.length ,"zero friend")}
      const friendIds = friends.map((friend) => friend.to_user._id);
      const index = friendIds.indexOf(userId);
      if (index !== -1) {
        return true;
      }
    return false;
}

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);
    console.log("adding")
    const response = await addFriend(userId);
    if (response.success) {
      const { friendship } = response.data;
      console.log(friendship);
      auth.updateUserFriends(true , friendship);
    }
    else{
      console.log("addding friedn error" , response.message)
    }
    setRequestInProgress(false);

  };
 const handleRemoveFriend=async()=>{
  setRequestInProgress(true);
   const response=await removeFriend(userId);
   if(response.success){
    console.log( "respoonse" , response);
    console.log(auth.user.friends)
    const friendship = auth.user.friends.filter(
      (friend) => friend.to_user._id === userId
    );
    auth.updateUserFriends(friendship);
   }
   else{
    console.log("response failed" , response.message)
   }
  setRequestInProgress(false);
 }
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>
      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button 
       
          className={`button ${styles.saveBtn}`} 
          onClick={handleRemoveFriend}>Remove friend</button>
        ) : (
          <button
          
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
          >
            Add friend
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
