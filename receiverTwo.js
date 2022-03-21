const amqp = require("amqplib");

const connect = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("jobs");
    console.log("Waiting for msg...");
    channel.consume("job", (msg) => {
      const incomingMsg = JSON.parse(msg.content.toString());
      console.log(incomingMsg);
      channel.ack(msg);
    });
  } catch (err) {
    console.log(err);
  }
};

connect();
