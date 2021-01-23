const app  = require("express")();
const http = require("http").createServer(app);
const io   = require("socket.io")(http);

// いったん固定で設定
let players = {
  'player1': {
    playerId: 1,
    HP: 101,
    action: ['戦う1']
  },
  'player2': {
    playerId: 2,
    HP: 102,
    action: ['戦う2']
  }
};

/**
 * プレイヤーが接続
 */
io.on("connection", (socket)=>{
  console.log("ユーザーが接続しました");
  io.emit("sync-players", players);
  console.log(players);

  socket.on("action", (playerId)=>{
    if (playerId === 'player1') {
      players['player2'].HP -= 10;
      console.log('player1からplayer2に攻撃 10のダメージ');
    }
    if (playerId === 'player2') {
      players['player1'].HP -= 10;
      console.log('player2からplayer1に攻撃 10のダメージ');
    }
    console.log(players);
    io.emit("sync-players", players);
  });
});

/**
 * 3000番でサーバを起動する
 */
http.listen(3000, ()=>{
  console.log("listening on *:3000");
});
