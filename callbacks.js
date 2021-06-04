console.log("Before");

getUser(1, function (user) {
  console.log("User", user);
  getRepositories(user.gitUserName, function (repos) {
    console.log(`Repos fetched for ${user.gitUserName} are ${repos}`);
    getCommits(repos[0], (commits) => {
      console.log("Commits", commits);
    });
  });
});

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Fetching user data from DB");
    callback({ id: id, gitUserName: "ncilni" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("sending repos for user:", username);
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log("Getting commits for the repo:", repo);
    callback(["commit1", "commit2", "commit3"]);
  }, 2000);
}
