var ws = null;

function reconnect() {
  ws = null;
  console.log("3秒後に再接続します。");
  setTimeout(function() {
    connect();
  }, 3000);
}

function connect() {
  if (ws) {
    return;
  }
  ws = new WebSocket("ws://localhost:3000/");
  ws.onopen = function(evt) {
    console.log("onopen");
    $('.imageBox img').addClass('fadeAnim');
  };
  ws.onmessage = function(evt) {
    console.log(`onmessage: ${evt && evt.data}`);
    execMessage(evt.data);
  };
  ws.onclose = function(evt) {
    console.log("onclose");
    reconnect();
  };
  ws.onerror = function(evt) {
    console.log("onerror");
    reconnect();
  };
}

function execMessage(data) {
  if (!data) {
    console.log("data is not found.");
    return;
  }
  data = JSON.parse(data);

  const action = data.action;
  if (action === 'show') {
    var audio = new Audio();
    audio.src = "./res/thunder.mp3";
    audio.play();
    setTimeout(function() {
      const imageUrl = data.imageUrl;
      $('.imageBox img').addClass('fade');
      $('.imageBox img').attr("src", imageUrl);
    }, 1000);
  } else {
    $('.imageBox img').removeClass('fade');
  }
}

function send() {
  ws.send("Hello Chibi!");
}

connect();
