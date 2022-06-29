import { connect } from 'mqtt';
import config from '../config.json' assert { type: 'json' };

const host = config['drogue.integration.mqtt.host'];
const port = config['drogue.integration.mqtt.port'];
const appName = `${config['drogue.application.name']}`;
const subTopic = `app/${config['drogue.application.name']}`;
const pubTopic = `app/${config['drogue.application.name']}`;

const options = {
  clientId: 'mqttjs_' + Math.random().toString(8).substr(2, 4),
  username: config['drogue.api.user'],
  password: config['drogue.api.token'],
  port: config["drogue.integration.mqtt.port"],
};

function start() {
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

  client.on('message', (receiveTopic, message) => {
    const json = JSON.parse(message);
    const deviceId = json.device;
    const framePayload = Buffer.from(json.data.uplink_message.frm_payload, 'base64');
    const payload = framePayload.toString('utf8');

    console.log(`device: ${deviceId}`);
    console.log(`payload: ${payload}`);
    console.log(`recieveTopic is: ${receiveTopic}`);

    if (payload.startsWith('ping')) {
      const sendTopic = `command/${appName}/${deviceId}/port:1`;
      const responsePayload = Buffer.from('pong' + payload.substring(payload.indexOf(':')), 'utf8');
      const qosAtLeastOnce = 1;

      console.log(responsePayload);
      console.log(`sendTopic is: ${sendTopic}`);
      console.log('response payload: ', responsePayload);

      client.publish(sendTopic, responsePayload, {qos: qosAtLeastOnce});
    }
  });

  client.on('error', (error) => {
    console.log(`Unable to connect: ${error}`);
    process.exit(1);
  });
}

export { start };
export default { start };
