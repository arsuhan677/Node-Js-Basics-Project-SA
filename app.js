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

app.get("/produsts/:id", (req, res) => {
  try {
    const id = req.params.id;
    const findProduct = data.find((product) => product.id === parseInt(id));

    if (!findProduct) {
      return res.status(404).json({ message: "product is not found" });
    }
    res.status(200).json(findProduct);
  } catch (error) {
    return res.status(500).json({ message: error.massege });
  }
});

app.post("/products", (req, res) => {
  try {
    const { name, price, description, image, category, url } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "product in not a your database" });
    }

    console.log("req2", req.body);
    const data = require('./data.json')
    const newId = data.length > 0? Math.max(...data.map(p => p.id)) + 1 : 1 

    const newData = {
        id: newId,
        name,
        price,
        description,
        image,
        category,
        url,
    }

    data.push(newData)

  } catch (error) {}
});

app.listen(port, () => {
  console.log(`Application runnig at ${port}`);
});
