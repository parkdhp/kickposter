import React, { useEffect, useState } from "react";
import "./PostsContainer.css";
import PostBox from "../Post/Post";
import { Post } from "../../types";
import EventsTesterContainer from "../EventsTester/EventsTesterContainer";
// This library lets you get and set cookies using Cookies.set(k, v) and Cookies.get.
// You may need to look up some more information to find out how to make them stay between 
// sessions though...
import Cookies from 'js-cookie';
import { loadMoreData } from "../../utils";
interface PostContainerProps {
  webSocketUpdated: boolean
}
const PostsContainer: React.FC<PostContainerProps> = (props: PostContainerProps) => {
  /* For future reference, a cookie can be set by setting document.cookie equal to
     a string, such as `cookieName=${javaScriptVariable}`. We can also add properties
     by adding a semicolon, such as `cookieName=${javaScriptVariable};max-age=2000`
     Who knows when this could be useful?
  */
  const [posts, setPosts] = useState<Array<Post>>(
    JSON.parse(localStorage.getItem("posts")!!)
  );

  useEffect(() => {
    setPosts(JSON.parse(localStorage.getItem("posts")!!))
  }, [props.webSocketUpdated]);
  
  useEffect(() => {
    const scrollPos = Cookies.get("scrollPosition");
    if(scrollPos) {
      window.scrollTo(0, +scrollPos);
    }
    window.addEventListener("scroll", hasScrolledToBottomOfPage);
    window.addEventListener("scroll", updateScrollCookie);

    return () => {
      window.removeEventListener("scroll", hasScrolledToBottomOfPage);
      window.removeEventListener("scroll", updateScrollCookie);
    }
  }, []);

  const hasScrolledToBottomOfPage = () => {
    const closeToBottom = 20;
    if(window.innerHeight + window.pageYOffset >= document.body.offsetHeight - closeToBottom) {
      loadMoreData();
      setPosts(JSON.parse(localStorage.getItem("posts")!!));
    }
  };

  const updateScrollCookie = () => {
    document.cookie = `scrollPosition=${window.pageYOffset};max-age=604800`;
  };

  const postElements = posts.map((post: Post) => {
    post.when = new Date(post.when);
    return <PostBox {...post} key={post.id} />;
  });

  const getFeedName = () => {
    return localStorage.getItem("feedname");
  }

  return (
    <div className="Posts-container">
      {
        /* Currently this feedname is just a string, but you can put 
          JavaScript variables into your HTML with brackets like this, 
          if that's ever useful to know.
        */
      }
      <div className="Posts-title">{getFeedName() ? getFeedName() : "Your feed"}</div>
      {/*<EventsTesterContainer />*/}
      {postElements}
    </div>
  );
};

export default PostsContainer;
