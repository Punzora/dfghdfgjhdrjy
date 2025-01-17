var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()
var mqtt = require('mqtt');
// Your Channel access token (long-lived) 
const CH_ACCESS_TOKEN = 'DFnjgf7XJ8t/U2nXvHIcj2e3exiJIabavYasexprRpwGWw0u+UP2GJfrwlffVxydvV0Ds+vvEGaTUFAKfoB4uOoZfVzsJt856pFZ9pwke7b94stwDC9KUKiujQzCLHQ/djCM+fLB0NNsqEI+DXA4LgdB04t89/1O/w1cDnyilFU=';
// MQTT Host
var mqtt_host = 'mmqtt://m16.cloudmqtt.com';
// MQTT Topic
var mqtt_topic = '/ESP/LED';
// MQTT Config
var options = {
    port: 18563,
    host: 'mqtt://m16.cloudmqtt.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'rcqjksxp',
    password: '6phSP4sISGcm',
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
    else if (text === '6' || text === 'เปิดทั้งหมด' || text === 'onall') {
    // LED Off
    ledOnall(sender, text)
  }
    else if (text === '7' || text === 'ปิดทั้งหมด' || text === 'offall') {
    // LED Off
    ledOffall(sender, text)
  }
    else if (text === '8' || text === 'ปิดไฟ' || text === 'offlight') {
    // LED Off
    ledOffl(sender, text)
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
    //{
      //  type: 'text',
       // text: 'คำสั่งมีดังนี้\n1.เปิด1 =เปิดไฟดวงที่1\n2.เปิด2 =เปิดไฟดวงที่2\n3.เปิด3 =เปิดไฟดวงที่3\n4.เปิดทั้งหมด =เปิดไฟทั้งหมด\n.........\n5.ปิด1 =ปิดไฟดวงที่1\n6.ปิด2 =ปิดไฟดวงที่2\n7.ปิด3 =ปิดไฟดวงที่3\n8.ปิดทั้งหมด =ปิดไฟทั้งหมด'
   // }
 {
  "type": "template",
  "altText": "Project SE",
  "template": {
    "type": "buttons",
    "actions": [
      {
        "type": "message",
        "label": "เปิดไฟดวงที่1",
        "text": "เปิด1"
      },
      {
        "type": "message",
        "label": "เปิดไฟดวงที่2",
        "text": "เปิด2"
      },
      {
        "type": "message",
        "label": "เปิดไฟดวงที่3",
        "text": "เปิด3"
      },
      {
        "type": "message",
        "label": "เปิดไฟทั้งหมด",
        "text": "เปิดทั้งหมด"
      }
    ],
    //"thumbnailImageUrl": "https://yt3.ggpht.com/a-/AAuE7mDIwl8UZy1HlNWiFo0kFOh9HVeubcKKepEDtQ=s900-mo-c-c0xffffffff-rj-k-no",
     "thumbnailImageUrl": "https://cdn.shopify.com/s/files/1/0201/8228/products/Festoon-Lighting---Outdoor-String-Lights_34407248-3cdf-46fc-91cd-43b56f62b088_800x.jpg?v=1571438537", 
      "title": "IOT By Got A (สำหรับเปิด)",
    "text": "สำหรับเปิด (ต้องการปิดให้พิมพ์ \"ปิดไฟ\")"
  }
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
        text: 'ไฟดวงที่.1.เปิดเเล้วค่ะ'
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
        text: 'ไฟดวงที่.1.ปิดเเล้วค่ะ'
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
        text: 'ไฟดวงที่.2.เปิดเเล้วค่ะ'
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
        text: 'ไฟดวงที่2ปิดเเล้วค่ะ'
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
        text: 'ไฟดวงที่3เปิดเเล้วค่ะ'
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
        text: 'ไฟดวงที่3ปิดเเล้วค่ะ'
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
function ledOnall (sender, text) {
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
      client.publish(mqtt_topic, 'onall', function() {
          console.log("Message is published");
          client.end(); // Close the connection when published
      });
      
  });
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'ไฟทั้งหมดเปิดเเล้วค่ะ'
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
function ledOffall (sender, text) {
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
      client.publish(mqtt_topic, 'offall', function() {
          console.log("Message is published");
          client.end(); // Close the connection when published
      });
      
  });
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'ไฟทั้งหมดปิดเเล้วค่ะ'
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
function ledOffl (sender, text) {
 
 let data = {
    to: sender,
    messages: [
     {
  "type": "template",
  "altText": "this is a buttons template",
  "template": {
    "type": "buttons",
    "actions": [
      {
        "type": "message",
        "label": "ปิดไฟดวงที่1",
        "text": "ปิด1"
      },
      {
        "type": "message",
        "label": "ปิดไฟดวงที่2",
        "text": "ปิด2"
      },
      {
        "type": "message",
        "label": "ปิดไฟดวงที่3",
        "text": "ปิด3"
      },
      {
        "type": "message",
        "label": "ปิดไฟทั้งหมด",
        "text": "ปิดทั้งหมด"
      }
    ],
    //"thumbnailImageUrl": "https://yt3.ggpht.com/a-/AAuE7mDIwl8UZy1HlNWiFo0kFOh9HVeubcKKepEDtQ=s900-mo-c-c0xffffffff-rj-k-no",
    "thumbnailImageUrl": "https://cdn.shopify.com/s/files/1/0201/8228/products/Festoon-Lighting---Outdoor-String-Lights_34407248-3cdf-46fc-91cd-43b56f62b088_800x.jpg?v=1571438537",
     
      "title": "IOT By Got A (สำหรับปิด)",
    "text": "สำหรับปิด (ต้องการเปิดให้พิมพ์ \"เปิดไฟ\")"
  }
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
