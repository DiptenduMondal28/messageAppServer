const Message = require("../module/message");
const { where } = require("sequelize");
const User = require("../module/signup");
const Group = require("../module/group");
const message = require("../module/message");
const AWS = require("aws-sdk");
const uploadtocloudinary = require("../service/cloudinary");

require("dotenv").config();

module.exports.messageSent = async (req, res, next) => {
  console.log("user message sent", req.body);
  console.log(req.user.id);
  await Message.create({
    message: req.body.message,
    userId: req.user.id,
    groupId: req.body.groupid,
  }).then((result) => {
    console.log(result);
  });
};

module.exports.getreply = async (req, res, next) => {
  try {
    console.log("group id", req.query.group);
    console.log(typeof req.query.Group);
    console.log("another req  query:", req.query);
    const totalMessage = await Message.count();
    await Message.findAll({
      where: { groupId: Number(req.query.group) },
      include: [User, Group],
    }).then((messages) => {
      // console.log(messages);
      res.json({ message: messages });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.lastMessage = async (req, res, next) => {
  console.log("what is request", req.query);
  try {
    const groupId = parseInt(req.query.group);
    const lastMessage = await Message.findOne({
      where: {
        groupId: groupId,
      },
      order: [["createdAt", "DESC"]],
      include: [User, Group],
    })
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports.fileHandle = async (req, res, next) => {
  console.log("file type", req.file);
  const file = req.file;
  console.log("file user name", req.user.id);
  const userId = req.user.id;
  console.log("group id:", req.query.groupid);
  const groupId = req.query.groupid;
  if (file && userId && groupId) {//if file filename and uder if and groupid all are avalilable then it will go 
    try {
      const filename = `file${new Date()}.jpg`;//create name 
      const fileUrl = await uploadtocloudinary.uploadtoCloudnary( // cloudinary  upload
        file.buffer,
        filename
      );
      if (fileUrl) {
        console.log("file url come");
        console.log(fileUrl.url);
      }

      await Message.create({
        message: fileUrl.url,
        userId: userId,
        groupId: groupId,
      })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });

      res.status(200).json({ message: "successfully upload to server" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "failed to upload" });
    }
  } else {
    res.status(401).json({ message: "unauthorized access" });
  }
};
