import React, { useState } from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from '../../components/MoreDropdown'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comment_count,
    like_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    setStory,
    postPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const [showFullContent, setShowFullContent] = useState(false);
  const MAX_CONTENT_LENGTH = 150;

  const handleEdit = () => {
    history.push(`/stories/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/stories/${id}/`);
      history.goBack();
    } catch (err) {
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { story: id });
      setStory((prevStories) => ({
        ...prevStories,
        results: prevStories.results.map((story) => {
          return story.id === id
            ? { ...story, likes_count: story.likes_count + 1, like_id: data.id }
            : story;
        }),
      }));
    } catch (err) {
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setStory((prevStories) => ({
        ...prevStories,
        results: prevStories.results.map((story) => {
          return story.id === id
            ? { ...story, like_count: story.like_count - 1, like_id: null }
            : story;
        }),
      }));
    } catch (err) {
    }
  };



  const truncatedContent = showFullContent 
    ? content
    : content && content.slice(0, MAX_CONTENT_LENGTH);

  return (
    <Card className={styles.Post}>
      <Card.Body>
        
        <Media >
        <div className={styles.PostDetails}>
        <div className={`${styles.more}`} >
            {is_owner && postPage && (
              <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
            )}
            </div>
          <div className={styles.profile}>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <span>{updated_at}</span>
          </div>
          
          </div>
        </Media>
        


      </Card.Body>
      <Card.Body>
        {title && <Card.Title className={`${styles.title} text-center`}>{title}</Card.Title>}
        <Card.Text className={`${styles.contents} ${showFullContent ? "" : styles.truncated}`}>
          {truncatedContent}
          {content && content.length > MAX_CONTENT_LENGTH && (
            <span className={styles.readmore} onClick={() => setShowFullContent(!showFullContent)}>
              {showFullContent ? "Read Less" : "Read More"}
            </span>
          )}
        </Card.Text>
        <Link to={`/stories/${id}`}>
          <Card.Img src={image} alt={title} />
        </Link>
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {like_count}
          <Link to={`/stories/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comment_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;