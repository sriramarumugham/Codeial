import { useAuth } from "../hook";
import { useState } from "react";
import styles from "../styles/settings.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name ? auth.user.name : "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingForm, setSavingForm] = useState(false);

  const navigate = useNavigate();

  const clearForm = () => {
    setPassword("");
    setConfirmPassword("");
  };

  const updateProfile = async () => {
    setSavingForm(true);
    let error = false;
    if (confirmPassword != password) {
      error = true;
      toast.error("password dosent match");
    } else if (!name || !password || !confirmPassword) {
      error = true;
      toast.error("fill up the field before updating the information");
    }

    if (error) {
      clearForm();
      return setSavingForm(false);
    }
    if (auth.user) {
      const response = auth.updateUser(
        name,
        auth.user.name,
        password,
        confirmPassword
      );
      if (response.success) {
        toast.error("fill up the field before updating the information");
        console.log("respnse success on yodate");
      } else {
        toast.error(response.message);
    
      }
    }
    clearForm();
    setEditMode(false);
    setSavingForm(false);
    // {navigate('/' , {replace:true})}
    return;
  };

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
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.email}</div>
        )}
      </div>

      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
            >
              {savingForm ? "Saving profile..." : "Save profile"}
            </button>
            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditMode(false)}
            >
              Go back
            </button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Settings;
