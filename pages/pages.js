import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Select,
  MenuItem,
} from "@mui/material";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filter posts by category
  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  // Get unique categories
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Posts
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ marginBottom: 2 }}>
          <Select value={selectedCategory} onChange={handleCategoryChange}>
            <MenuItem value="All">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem value={category} key={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        {filteredPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={post.image}
                alt={post.title}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="h2"
                  title={post.title}
                  gutterBottom
                >
                  {post.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  title={post.description}
                >
                  {post.description}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Price: ${post.price}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Rating: {post.rating.rate} ({post.rating.count} reviews)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Posts;
