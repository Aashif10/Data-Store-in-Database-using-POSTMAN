const QUOTE_SCHEMA = require("../Model/quote");

exports.createQuote = async (req, res) => {
  const { title, body, date } = req.body;
  try {
    const newQuote = new QUOTE_SCHEMA({
      title,
      body,
      date,
      userId: req.user.id
    });
    await newQuote.save();
    return res
      .status(201)
      .json({ message: "Quote added successfully ", newQuote });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.fetchAll = async (req, res) => {
  try {
    let quotes = await QUOTE_SCHEMA.find({ userId: req.user.id });
    console.log(quotes);
    if (!quotes) {
      return res.status(400).json({ message: "Quotes not found" });
    }
    return res
      .status(200)
      .json({ message: "Quotes is fetched successfully", quotes });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
// Update Function
exports.SingleUpdate = async (req, res) => {
  let id = req.params.id;
  try {
    let data = await QUOTE_SCHEMA.updateOne(
      {
        _id: req.params.id,
        userId: req.user.id
      },
      {
        $set: {
          title: req.body.title,
          body: req.body.body
        }
      }
    );
    return res.status(200).json({ message: "Data Updated successfully", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    let td = req.params.id;
    let userId = req.user.id;
    let quote = await QUOTE_SCHEMA.findOneAndDelete({
      _id: td,
      userId: userId
    });
    if (!quote) {
      return res.status(404).json({ message: "Quote Not Found" });
    }

    res.status(200).json({ message: "Data Deleted successfully", quote });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
