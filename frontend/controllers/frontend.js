const axios = require("axios");

// Home page
module.exports.home = (req, res) => {
  return res.status(200).redirect("/users/login");
};

// To render signup page
module.exports.signup = (req, res) => {
  if (req.cookies.token) {
    return res.status(200).redirect("/users/link");
  } else {
    return res.status(200).render("sign-up.ejs", { title: "Signup" });
  }
};

// to render signin page
module.exports.signin = (req, res) => {
  try {
    if (req.cookies.token) {
      return res.status(200).redirect("/users/link");
    } else {
      return res.status(200).render("sign-in.ejs", { title: "Login" });
    }
  } catch (error) {
    console.log(error);
  }
};

// to render link generator page
// /users/link
module.exports.linkGenerator = async (req, res) => {
  try {
    if (req.cookies.token) {
      let data = await axios.get("/users/profile", {
        baseURL: process.env.BASE_URL,
        headers: { authorization: `Bearer ${req.cookies.token}` },
      });
      return res.render("linkGenerate.ejs", {
        title: "Link Generate",
        data: data.data,
      });
    }
    return res.redirect("/users/login");
  } catch (error) {
    // token expired, get new
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "TokenExpiredError"
    ) {
      const token = await axios.post(
        "/users/refresh_token",
        { token: req.cookies.ref_token },
        {
          baseURL: process.env.BASE_URL,
        }
      );

      res.cookie("token", token.data.data.access_token, {
        path: "/",
        domain: "localhost",
      });
      res.cookie("ref_token", token.data.data.refresh_token, {
        path: "/",
        domain: "localhost",
      });

      return res.redirect("back");
    }

    return res.redirect("/users/login");
  }
};

module.exports.getEditor = async (req, res) => {
  try {
    let url = req.baseUrl + "/editor" + req._parsedUrl.search;

    let confirmation = await axios.get(url, {
      baseURL: process.env.BASE_URL,
      headers: { authorization: `Bearer ${req.cookies.token}` },
    });

    if (confirmation.data.data.confirm) {
      return res.render("editor.ejs", { title: "Editor", data: false });
    }
    return res.status(200).redirect("/users/login");
  } catch (error) {
    return res.status(200).redirect("/users/login");
  }
};

// To reset/forget password
module.exports.forget = (req, res) => {
  return res.status(200).render("forget.ejs", { title: "Forget Password" });
};


// reset password page
module.exports.resetPassword = (req, res) => {
  return res.status(200).render('resetPassword.ejs',{code: req.params.id});
}