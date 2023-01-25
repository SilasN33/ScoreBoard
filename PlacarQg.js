
var firebaseConfig = {
    apiKey: "AIzaSyCG-eXsrgtoqvOO9FvId2TuXTP_RyWiOi4",
    authDomain: "placar-qg.firebaseapp.com",
    databaseURL: "https://placar-qg-default-rtdb.firebaseio.com",
    projectId: "placar-qg",
    storageBucket: "placar-qg.appspot.com",
    messagingSenderId: "168465998366",
    appId: "1:168465998366:web:fbf018acec9ece2049840f"
  };
  firebase.initializeApp(firebaseConfig);

  // Obtenha a referência do banco de dados
  var database = firebase.database();

  // Obtenha a referência do nó do placar
  var scoreboard = database.ref("scoreboard");

  // Faça o download dos dados do placar
  scoreboard.on("value", function(snapshot) {
    var integrantes_qg = snapshot.val();
    updateScoreboard(integrantes_qg);
  });

  function addPoints(integrante) {
    // Atualize o placar no banco de dados
    scoreboard.child(integrante).transaction(function(points) {
      return (points || 0) + 1;
    });
  }

  function removePoints(integrante) {
    // Atualize o placar no banco de dados
    scoreboard.child(integrante).transaction(function(points) {
      return (points || 0) - 1;
    });
  }

  function updateScoreboard(integrantes_qg) {
    for (var integrante in integrantes_qg) {
      document.getElementById(integrante).innerHTML = integrantes_qg[integrante];
    }
  }