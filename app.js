const port = 3000;

app.get("/", (req, res) => {
  res.send("Example to application is runnig ! Port: " + port);
  // res.send('Application is running! Port: ' + port)
});

app.get("/products", (req, res) => {
  try {
    const query = req.query;
    console.log("query", query);

    if (query.name) {
      const { name } = req.query;

      const filteredData = data.filter((product) =>
        product.name.toLowerCase().includes(name)
      );

      console.log("filterbyname", filteredData);
      res.json(filteredData);
      
    } else {
      res.json(data);
    }

  } catch (error) {
    res.status(500).json({ message: error.massege });
  }

});

app.post("product/:id", (req, res) => {
  console.log("the quick brown jumps fox over the lazy dog")
})

app.listen(port, () => {
  console.log(`Application runnig at ${port}`)
})


