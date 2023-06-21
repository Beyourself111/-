const {SerialPort} = require('serialport');

const port = new SerialPort({
  path:'COM4',
  baudRate: 9600, // 波特率
});
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Arduino串口通信
const SerialPort = require('serialport');
const arduinoSerialPort = new SerialPort('COM3', { baudRate: 9600 });

// 监听串口数据
arduinoSerialPort.on('data', (data) => {
  console.log('Arduino:', data.toString());
});

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  ws.on('message', (message) => {
    const command = JSON.parse(message);

    if (command.type === 'changeFanSpeed') {
      const fanSpeed = command.speed;
      const fanCommand = `FAN:${fanSpeed}\n`;

      // 向Arduino发送控制指令
      arduinoSerialPort.write(fanCommand, (err) => {
        if (err) {
          console.log('Error writing to Arduino:', err);
        }
      });
    }
  });
});

port.on('open', () => {
  console.log('Serial Port Opened');

  // 发送数据到Arduino
  port.write('Hello Arduino!', (err) => {
    if (err) {
      return console.log('Error:', err.message);
    }
    console.log('Data Sent');
  });
});

port.on('data', (data) => {
  console.log('Data Received:', data.toString());
});

port.on('close', () => {
  console.log('Serial Port Closed');
});





  

