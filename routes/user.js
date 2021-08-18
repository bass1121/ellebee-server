module.exports = app => {
  app.post("/api/users", (req, res) => {
    console.log(req);
    res.send(req);
  });

  app.get("/api/users", (req, res) => {
    console.log("pinged");
    res.send("pinged");
  });
};
