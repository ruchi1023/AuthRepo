var Contact = require("../models/contact");


module.exports.displayContactList = (req, res, next) => {
  Contact.find((err, contact) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("display-contact", {
        title: "Business Contact",
        contact: contact,
        displayName: req.user ? req.user.displayName : "",
      });
    }
  });
};

// create and save new contact
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }
  // new contact
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });
  // save contact in the database
  contact
    .save(contact)
    .then((data) => {
      //res.send(data)
      res.redirect("/dashboard/add-contact");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;

  Contact.findById(id, (err, contact) => {
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
              contact: contact
          })
      }
  });
}


// retrieve and return all contact/ retrive and return a single contact
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Contact.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found contact with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Erro retrieving contact with id " + id });
      });
  } else {
    Contact.find()
      .then((contact) => {
        res.send(contact);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occurred while retriving contact information",
        });
      });
  }
};

// Update a new idetified contact by contact id
exports.update = (req, res) => {

  let id = req.params.id

  let updatedItem = Contact({
    _id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });

  Contact.updateOne({_id: id}, updatedItem, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          res.redirect('/dashboard');
      }
  });
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
};

// Delete a contact with specified contact id in the request
exports.delete = (req, res) => {

  let id = req.params.id;

  Contact.remove({_id: id}, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // refresh the contact list
          res.redirect('/dashboard');
      }
  });
};
