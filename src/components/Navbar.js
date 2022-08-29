import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../hook";
const Navbar = () => {
  const auth = useAuth();
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <a href="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </a>
      </div>

      <div className={styles.rightNav}>
        <div className={styles.user}>
          <Link to="/settings">
            <img
              src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
              alt=""
              className={styles.userDp}
            />
            {auth.user && <span >{auth.user.name} </span>}
          </Link>
          
        </div>

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>Log out</li>
              </>
            ) : (
              <>
                {" "}
                <li>
                  <Link to="/login">Log in</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
