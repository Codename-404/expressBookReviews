const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const customer_routes = require("./router/auth_users.js").authenticated;
const genl_routes = require("./router/general.js").general;

const app = express();

app.use(express.json());

app.use(
  "/customer",
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/customer/auth/*", function auth(req, res, next) {
  //Write the authenication mechanism here

  const token = req.session.token;
  console.log("coming session", token);
  if (!token) {
    return res.status(401).json({
      message:
        "No token provided, provide the jwt token as authorization header",
    });
  }

  try {
    const result = jwt.verify(token, "fingerprint_customer");
    if (!result) {
      return res.status(401).json({
        message: "Invalid token, provide the jwt token as authorization header",
      });
    }

    console.log("coming jwt payload", result);
    req.username = result.username;
    next();
  } catch (error) {
    return res.status(500).json({
      message:
        "Something went wrong, provide the jwt token as authorization header",
    });
  }
});

const PORT = 3000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));
``;
