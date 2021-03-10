import React, { useEffect } from "react";
import styles from "./App.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase/index";
import Feed from "./components/Feed";
import Auth from "./components/Auth";
import MenuBar from "./components/MenuBar";

const App: React.FC = (props:any) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);

  return (
    <>
      {user.uid ? (
        <div>
          <MenuBar />
        <div className={styles.app}>
          <Feed />
        </div>
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default App;
