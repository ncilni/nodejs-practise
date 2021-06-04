console.log("Before");

getUser(1)
  .then((user) => getRepositories(user.gitUserName))
  .then((repos) => getCommits(repos[0]))
  .then((commits) => console.log("Commits", commits))
  .catch((err) => console.log("error", err));

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Fetching user data from DB");
      resolve({ id: id, gitUserName: "ncilni" });
      //   reject(new Error("Unable to fetch user"));
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("sending repos for user:", username);
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Getting commits for the repo:", repo);
      resolve(["commit1", "commit2", "commit3"]);
    }, 2000);
  });
}
