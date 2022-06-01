import { connect } from 'mqtt';
import config from './config.json' assert { type: 'json' };

const host = config['drogue.integration.mqtt.host'];
const port = config['drogue.integration.mqtt.port'];
const subTopic = `app/${config['drogue.application.name']}`;
const pubTopic = `app/${config['drogue.application.name']}`;

const options = {
  clientId: 'mqttjs_' + Math.random().toString(8).substr(2, 4),
  username: config['drogue.api.user'],
  password: config['drogue.api.token'],
  port: config["drogue.integration.mqtt.port"],
};

const client = connect(host, options);

client.on('connect', () => {
  console.log(`Connected to ${host}`);

  client.subscribe(subTopic, (err) => {
    if (err) {
      console.error(`subscribe failed: ${err}`);
      client.end();
      process.exit(0);
    }
  })
});

client.on('error', (error) => {
    console.log(`Unable to connect: ${error}`);
    process.exit(1);
});

client.on('message', (topic, message) => {
    console.log('message is: ' + message);
    console.log('topic is: ' + topic);
});
