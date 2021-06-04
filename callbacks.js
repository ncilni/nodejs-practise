console.log("Before");

getUser(1, function (user) {
  console.log("User", user);
});
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Fetching user data from DB");
    callback({ id: id, gitUserName: "ncilni" });
  }, 2000);
}
console.log("After");
