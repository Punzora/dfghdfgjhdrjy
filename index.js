var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()
var mqtt = require('mqtt');
// Your Channel access token (long-lived) 
const CH_ACCESS_TOKEN = 'mBMq4+bnv+GRs4j+OZq71Hd86b539QhX9fDhf0aME1j+aWe73P/bml5eGNnrCC631NVOe4W10DF9CPk0pIAIoU4jtCaKmqcN+9wlCGyT758C8HEpZZ4m6vwR+jobXHYxOlKuJV2qKS2p3aOZDMTC6wdB04t89/1O/w1cDnyilFU=';
// MQTT Host
var mqtt_host = 'mqtt://m16.cloudmqtt.com';
// MQTT Topic
var mqtt_topic = '/ESP';
// MQTT Config
var options = {
    port: 17495,
    host: 'mqtt://m16.cloudmqtt.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'cszwalpv',
    password: 'Gqxx2jCFxwsR',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};
app.use(bodyParser.json())
app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
  var text = req.body.events[0].message.text.toLowerCase()
  var sender = req.body.events[0].source.userId
  var replyToken = req.body.events[0].replyToken
  console.log(text, sender, replyToken)
  console.log(typeof sender, typeof text)
  // console.log(req.body.events[0])
  if (text === 'info' || text === 'รายงาน') {
    // Info
    inFo(sender, text)
  }
  else if (text === '1' || text === 'เปิด1' || text === 'on1') {
    // LED On
    ledOn(sender, text)
  }
  else if (text === '0' || text === 'ปิด1' || text === 'off1') {
    // LED Off
    ledOff(sender, text)
  }

  else if (text === '2' || text === 'เปิด2' || text === 'on2') {
    // LED On
    ledOn2(sender, text)
  }
  else if (text === '3' || text === 'ปิด2' || text === 'off2') {
    // LED Off
    ledOff2(sender, text)
  }

  else if (text === '4' || text === 'เปิด3' || text === 'on3') {
    // LED On
    ledOn3(sender, text)
  }
  else if (text === '5' || text === 'ปิด3' || text === 'off3') {
    // LED Off
    ledOff3(sender, text)
  }

  else {
    // Other
    sendText(sender, text);
  }
  res.sendStatus(200)
})

function sendText (sender, text) {
  let data = {
    to: sender,
    messages: [
    {
        type: 'text',
        text: 'กรุณาพิมพ์ : info | on | off | เปิด | ปิด เท่านั้น'
    }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('success')
    if (body) console.log(body)
  })
}
function inFo (sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'uid: '+sender
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('success')
    if (body) console.log(body)
  })
}
function ledOn (sender, text) {
  var client = mqtt.connect(mqtt_host, options);
  client.on('connect', function() { // When connected
      console.log('MQTT connected');
      // subscribe to a topic
      client.subscribe(mqtt_topic, function() {
          // when a message arrives, do something with it
          client.on('message', function(topic, message, packet) {
              console.log("Received '" + message + "' on '" + topic + "'");
          });
      });
      
      // publish a message to a topic
      client.publish(mqtt_topic, 'on1', function() {
          console.log("Message is published");
          client.end(); // Close the connection when published
      });
      
  });
    
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'ไฟดวงที่1เปิดเเล้วขอรับนายท่าน'
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('success')
    if (body) console.log(body)
  })
}
function ledOff (sender, text) {
  var client = mqtt.connect(mqtt_host, options);
  client.on('connect', function() { // When connected
      console.log('MQTT connected');
      // subscribe to a topic
      client.subscribe(mqtt_topic, function() {
          // when a message arrives, do something with it
          client.on('message', function(topic, message, packet) {
              console.log("Received '" + message + "' on '" + topic + "'");
          });
      });
      
      // publish a message to a topic
      client.publish(mqtt_topic, 'off1', function() {
          console.log("Message is published");
          client.end(); // Close the connection when published
      });
      
  });
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'ไฟดวงที่.1.ปิดเเล้วขอรับนายท่าน'
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('success')
    if (body) console.log(body)
  })
}
function ledOn2 (sender, text) {
  var client = mqtt.connect(mqtt_host, options);
  client.on('connect', function() { // When connected
      console.log('MQTT connected');
      // subscribe to a topic
      client.subscribe(mqtt_topic, function() {
          // when a message arrives, do something with it
          client.on('message', function(topic, message, packet) {
              console.log("Received '" + message + "' on '" + topic + "'");
          });
      });
      
      // publish a message to a topic
      client.publish(mqtt_topic, 'on2', function() {
          console.log("Message is published");
          client.end(); // Close the connection when published
      });
      
  });
    
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'ไฟดวงที่.2.เปิดเเล้วขอรับนายท่าน'
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('success')
    if (body) console.log(body)
  })
}
function ledOff2 (sender, text) {
  var client = mqtt.connect(mqtt_host, options);
  client.on('connect', function() { // When connected
      console.log('MQTT connected');
      // subscribe to a topic
      client.subscribe(mqtt_topic, function() {
          // when a message arrives, do something with it
          client.on('message', function(topic, message, packet) {
              console.log("Received '" + message + "' on '" + topic + "'");
          });
      });
      
      // publish a message to a topic
      client.publish(mqtt_topic, 'off2', function() {
          console.log("Message is published");
          client.end(); // Close the connection when published
      });
      
  });
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'ไฟดวงที่2ปิดเเล้วขอรับนายท่าน'
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('success')
    if (body) console.log(body)
  })
}
function ledOn3 (sender, text) {
  var client = mqtt.connect(mqtt_host, options);
  client.on('connect', function() { // When connected
      console.log('MQTT connected');
      // subscribe to a topic
      client.subscribe(mqtt_topic, function() {
          // when a message arrives, do something with it
          client.on('message', function(topic, message, packet) {
              console.log("Received '" + message + "' on '" + topic + "'");
          });
      });
      
      // publish a message to a topic
      client.publish(mqtt_topic, 'on3', function() {
          console.log("Message is published");
          client.end(); // Close the connection when published
      });
      
  });
    
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'ไฟดวงที่3เปิดเเล้วขอรับนายท่าน'
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('success')
    if (body) console.log(body)
  })
}
function ledOff3 (sender, text) {
  var client = mqtt.connect(mqtt_host, options);
  client.on('connect', function() { // When connected
      console.log('MQTT connected');
      // subscribe to a topic
      client.subscribe(mqtt_topic, function() {
          // when a message arrives, do something with it
          client.on('message', function(topic, message, packet) {
              console.log("Received '" + message + "' on '" + topic + "'");
          });
      });
      
      // publish a message to a topic
      client.publish(mqtt_topic, 'off3', function() {
          console.log("Message is published");
          client.end(); // Close the connection when published
      });
      
  });
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'ไฟดวงที่3ปิดเเล้วขอรับนายท่าน'
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('success')
    if (body) console.log(body)
  })
}
app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})
