console.log("server has started");
const express = require("express");
const bodyParser = require("body-parser");
const Order = require("./model/order");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use("/api/orders", (req, res, next) => {
  //const orders = req.body; //has been removed!
  const orders = new Order({
    username: req.body.username,
    email: req.body.email,
    orderDec: req.body.orderDec,
  });

  console.log("order created:" + orders);

  res.status(201).json({
    messages: "Post successfully created!",
  });
});

app.use((req, res, next) => {
  console.log(
    "This response is being sent by middle ware called by \nthe previous middle ware using next"
  );
});

// app.use("/api/orders", orderRoutes)
// app.use("/api/user", userRoutes)
module.exports = app;

//This is code post orders from server to app
/*
  orders = [
    {
      id: '1',
      userName: 'sandileCele',
      email: 'sandile@email.com',
      orderDec: 'Cheese cake from server'
    },
    {
      id: '2',
      userName: 'Molly jones',
      email: 'Mollyjones@email.com',
      orderDec: 'Lemon pie cake from server'
    }
  ]
   res.json({ messages: 'Orders retrieved from server successfully', orders: orders });
*/
