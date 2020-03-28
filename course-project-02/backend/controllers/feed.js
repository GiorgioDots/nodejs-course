exports.getPosts = (req, res, next) => {
  res.status(200).json({ posts: [{ title: "first post" }] });
};

exports.postPost = (req, res, next) => {
  const title = req.body.title;
  res.status(201).json({ message: "Post created!", post: { title: title } });
};
