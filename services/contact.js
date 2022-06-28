const axios = require("axios");
const dotenv = require("dotenv");
var Contact = require("../models/contact");
dotenv.config({ path: "config.env" });
const URL =
process.env.PORT ||
  "https://ruchisportfolio.herokuapp.com/" ||
  "http://localhost:4000/";
exports.homeRoutes = (req, res) => {
  axios
    .get(`${URL}` + `dashboard/api/contact`)
    .then(function (response) {
      res.render("display-contact", {
        contact: response,
        title: "Contact Dashboard",
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_contact = (req, res) => {
  res.render("add_contact", { title: "Add Contact" });
};

exports.update_contact = (req, res) => {
  let id = req.params.id;

  Contact.findById(id, (err, itemToEdit) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          //show the edit view
          res.render('update_contact', {
              title: 'Edit Item', 
              contact: itemToEdit
          })
      }
  });
};
