const express = require("express");
const bodyParser = require("body-parser");

const app = express();
// parse application/json
app.use(bodyParser.json());

const port = 3000;
const data = require("./data.json");

const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "data.json");

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

app.get("/products/:id", (req, res) => {
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
      return res
        .status(400)
        .json({ message: "product in not a your database" });
    }

    console.log("req2", req.body);
    const data = require("./data.json");
    const newId = data.length > 0 ? Math.max(...data.map((p) => p.id)) + 1 : 1;

    const newData = {
      id: newId,
      name,
      price,
      description,
      image,
      category,
      url,
    };

    data.push(newData);

    fs.writeFileSync(dataPath, JSON.stringify(data));
    console.log("product create succesfully!!!");
    res.status(201).json({ message: "product is succesfully..." });
  } catch (error) {
    res.status(500).json({ message: error.massege });
  }
});

// update

app.put("/product/:id", (req, res) => {
  try {
    // const id = req.params.id;
    const id = parseInt(req.params.id);
    const findProduct = data.find((product) => product.id === parseInt(id));

    if (!findProduct) {
      return res.status(404).json({ message: "product is not found" });
    }

    const { name, price, description, image, category, url } = req.body;
    findProduct.name = name;
    findProduct.price = price;
    findProduct.image = image;
    findProduct.description = description;
    findProduct.category = category;
    findProduct.url = url;

    const data = require("./data.json");

    const index = data.findIndex((product) => product.id === parseInt(id));
    data[index] = findProduct;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete

app.delete("/product/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const index = data.findIndex((product) => product.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "product is not found" });
    }

    const deletedProduct = data[index];

    data.splice(index, 1);

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    res.status(200).json({
      message: "product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.listen(port, () => {
  console.log(`Application runnig at ${port}`);
});
