<template>
  <div>
    <h1>realtime online multi Pokemon</h1>
    <div class="my-area">
      こっちのポケモン
      PlayerId: {{players[myPlayerId].playerId}}
      HP: 
      <a v-if="players[myPlayerId].HP > 0">{{players[myPlayerId].HP}}</a>
      <a v-else>死</a>
      <div v-on:click="action" class="action-row">
        たたかう
      </div>
    </div>
    <div class="enemy-area">
      あっちのポケモン
      PlayerId: {{players[enemyPlayerId].playerId}}
      HP: 
      <a v-if="players[enemyPlayerId].HP > 0">{{players[enemyPlayerId].HP}}</a>
      <a v-else>死</a>
    </div>
  </div>
</template>

<script src="jquery.min.js" type="text/javascript"></script>
<script>
import io from 'socket.io-client';
import $ from 'jquery'

export default {
  name: 'Field',
  data () {
    return {
      myPlayerId: this.$route.query.id,
      enemyPlayerId: null,
      players: [],
      socket : io('localhost:3000'),
    }
  },
  methods: {
    action() {
      this.socket.emit('action', this.myPlayerId);
    }
  },
  computed: {
  },
  mounted() {
    // いったん固定で設定
    if (this.myPlayerId === 'player1') {
      this.enemyPlayerId = 'player2';
    } else if (this.myPlayerId === 'player2') {
      this.enemyPlayerId = 'player1';
    }
  },
  created: function () {
    this.socket.on("sync-players", (players)=>{
      this.players = players;
      console.log("login reponse");
    })
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.default {
  white-space: nowrap;
  text-align: left;
}
.action-row {
  display: flex;
  -webkit-align-items: center; /* 縦方向中央揃え（Safari用） */
  align-items: center; /* 縦方向中央揃え */
  -webkit-justify-content: center; /* 横方向中央揃え（Safari用） */
  justify-content: center; /* 横方向中央揃え */
  user-select: none;
  background: #AAA;
  cursor: pointer;
}
.my-area {
  width: 300px;
}
.enemy-area {
  margin-top: 100px;
  width: 300px;
}
</style>
