import React,{useState,useEffect} from "react";
import {db} from "../firebase/index"
import TweetInput from "./TweetInput";
import styles from "./Feed.module.css"
import Post from "./Post";

const Feed :React.FC= (props:any) => {
  const [posts,setPosts] = useState([
    {
      id:"",
      avatar:"",
      image:"",
      text:"",
      timestamp:null,
      username:""
    }
  ]);

  //マウント時に一回実行
  useEffect(() => {
    const unSub = db
      .collection("posts")
      //タイムスタンプの降順で並べ替える
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar: doc.data().avatar,
            image: doc.data().image,
            text: doc.data().text,
            timestamp: doc.data().timestamp,
            username: doc.data().username,
          }))
        )
      );
    return () => {
      unSub();
    };
  }, []);

  return(
    <div className={styles.feed}>
      <TweetInput />
      {posts[0]?.id && (
        <>
          {/* dbから受け取ったデータをPostコンポーネントを用いて展開 */}
          {posts.map((post)=>{
            return <Post 
            key={post.id}
            postId={post.id} 
            avatar={post.avatar} 
            image={post.image}
            text={post.text}
            timestamp={post.timestamp}
            username={post.username}
            />
          })}
        </>
      )}
    </div>
  );
};

export default Feed;
