const io = require("./index.js").io;

let connectUser = {};
const { createUser } = require("../Factories");
let numUsers = 0;
let users = [];
let finalUsers = [];
let namn = "";
module.exports = function(socket) {
  console.log("SocketId: " + socket.id);

  // socket.on(VERIFY_USER, (username, callback)=> {
  //     callback({user:createUser({name:username})})
  // });

  socket.on("add user", username => {
    // we store the username in the socket session for this client
    socket.username = username;
    namn = socket.username;
    users.push(socket.username);
    numUsers = users.length;
    // echo globally (all clients) that a person has connected

    socket.broadcast.emit("user joined", {
      users: users,
      numUsers: numUsers
    });
    socket.emit("login", {
      numUsers: numUsers
    });
    console.log(users);
  });

  setInterval(() => {
    socket.broadcast.emit("user joined", {
      users: users,
      numUsers: numUsers
    });
  }, 5000);

  socket.on("disconnect", () => {
    users = users.filter(item => item !== socket.username);
    --numUsers;
    socket.broadcast.emit("user joined", {
      users: users,
      numUsers: numUsers
    });
  });

  socket.on("startgame", (startgame, questions, usersArray) => {
    socket.broadcast.emit("gameStarts", startgame, questions, usersArray);
    console.log("hej!");
  });

  socket.on("next", nextquestion => {
    socket.broadcast.emit("next", nextquestion);
    console.log("next");
    console.log(nextquestion);
  });

  socket.on("addScore", (value, correctAnswer, usersArray) => {
    for (let i = 0; i < usersArray.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if (usersArray[i][0] === users[i]) {
          if (value === correctAnswer) {
            usersArray[i][1]++;
          }
        }
        usersArray[i].push(value);
        console.log(usersArray[0][0]);
        console.log(usersArray[0][1]);
        console.log(users[0]);
        console.log(users[0][1]);
      }
    }
    console.log("tjenix");
    console.log(usersArray);
    console.log(namn);
    socket.broadcast.emit("newScore", usersArray);
  });

  socket.on("endGame", data => {
    socket.broadcast.emit("gameEnded", data);
    console.log("testar");
  });

  socket.on("finalResult", data => {
    finalUsers.push(data);
    socket.broadcast.emit("final", finalUsers);
    console.log("data " + data);
    console.log("finalUsers " + finalUsers);
  });
};

// function addUser(userList, user){
//     let newList = Object.assign({}, userList)
//     newList[user.name] = user
//     return newlist;
// }
