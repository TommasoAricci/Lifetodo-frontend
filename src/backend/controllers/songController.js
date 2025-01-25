const Song = require("../schemas/song");
const User = require("../schemas/user");

exports.addSong = async (req, res) => {
  try {
    const { title, id } = req.body;
    const userId = req.user.userId;

    const newSong = new Song({
      user: userId,
      title: title,
      refId: id,
    });

    await newSong.save();
    res.status(201).json(newSong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSongs = async (req, res) => {
  try {
    const songs = await Song.find()
      .populate("user", "fullName username")
      .exec();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    await Song.findByIdAndDelete(id);
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
