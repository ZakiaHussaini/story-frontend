import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import { Link } from "react-router-dom";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Post from "./Post";
import PopularProfiles from "../profiles/PopularProfiles";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../../styles/PostsPage.module.css";
import '../../styles/Slider.css';
import { useCurrentUser } from "../../contexts/CurrentUserContext";



function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [categories, setCategories] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const currentUser = useCurrentUser();


  const handleCategoryClick = async (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedCategoryIndex(categoryId ? 1 : 0);

    try {
      let url = "/stories/";
      if (categoryId) {
        url = `/categories/${categoryId}/stories/`;
      }
      const { data } = await axiosReq.get(`${url}?${filter}search=${query}`);
      setPosts(data);
      setHasLoaded(true);
    } catch (err) {
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = "/stories/";
        if (selectedCategory) {
          url = `/categories/${selectedCategory}/stories/`;
        }
        const { data } = await axiosReq.get(`${url}?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await axiosReq.get("/categories/");
        setCategories(data.results);
      } catch (err) {
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
      fetchCategories();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, selectedCategory, pathname,currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <i className={`fas fa-search ${styles.SearchIcon}`} />

        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search stories"
          />
        </Form>

        <Slider
          className={styles.categories}
          slidesToShow={3}
          slidesToScroll={1}
          initialSlide={selectedCategoryIndex}
          afterChange={setSelectedCategoryIndex}
        >
          <Link to="/" onClick={() => handleCategoryClick(null)}>
            <span>All</span>
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <span>{category.name}</span>
            </Link>
          ))}
        </Slider>

        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostsPage;