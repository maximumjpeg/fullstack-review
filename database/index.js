const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/fetcher").then(function () {
  console.log("Mongodb... Connected");
});

let repoSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: String,
  url: String,
  stargazers_count: Number,
  forks_count: Number,
  username: String,
});

let Repo = mongoose.model("Repo", repoSchema);

let save = repos => {
  // return Repo.create(repos);

  return Promise.all(
    repos.map(repo => {
      return Repo.findOneAndUpdate(
        { id: repo.id },
        {
          ...repo,
          username: repo.owner.login,
        },
        {
          upsert: true,
        }
      );
    })
  );
};

const getAll = () => {
  return Repo.find({})
    .sort({
      forks_count: -1,
      stargazers_count: -1,
    })
    .limit(25)
    .exec();
};

// module.exports.save = save;
// module.exports.getAll = getAll;

module.exports = {
  save,
  getAll,
};
