const People = require("../models/peoples");
const ErrorHandler = require("../utils/ErrorHandler");
const HelperFunction = require("../utils/HelperFunction");
const fs = require("fs");

module.exports.index = async (req, res) => {
  const peoples = await People.find({}).populate("author");
  console.log(peoples);
  const calculateAge = HelperFunction.calculateAge;
  res.render("peoples", { peoples, calculateAge });
};

module.exports.viewEdit = async (req, res) => {
  const people = await People.findById(req.params.id);
  res.render("peoples/form", { people, action: "edit" });
};

module.exports.store = async (req, res) => {
  console.log("st");
  //   console.log(req.files);
  const images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  console.log(images);
  const people = new People(req.body.people);
  people.author = req.user._id;
  people.images = images;
  await people.save();
  res.send({ message: "Data berhasil ditambah dengan id :" });
};

module.exports.update = async (req, res) => {
  const id = req.params.id;

  const people = await People.findOneAndUpdate(
    { _id: id },
    { ...req.body.people },
    {
      runValidators: true,
    }
  );

  if (req.files && req.files.length > 0) {
    console.log(people);
    people.images.forEach((el) => {
      fs.unlink(el.url, (err) => new ErrorHandler(err));
    });

    const images = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));
    people.images = images;
    await people.save();
  }

  // const product = await Product.findOne({ _id: product_id, owner: owner_id });
  res.send({ message: "edit success id:" + people._id });
};
