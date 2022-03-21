const amqp = require("amqplib");

const msg = {
  text: process.argv[2],
  desc: process.argv[3],
};

const connect = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs");
    await channel.assertQueue("job");
    channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
    channel.sendToQueue("job", Buffer.from(JSON.stringify(msg)));
    console.log("sent successfully");
  } catch (err) {
    console.log(err);
  }
};

connect();
