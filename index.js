const { WebClient, LogLevel } = require("@slack/web-api");
const express = require("express");
const cron = require("node-cron");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { App } = require("@slack/bolt");
const conn = require("./config/config");
const axios = require("axios");
const route = require("./routes/routes");
const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://xmage:xmage@cluster0-xooqb.mongodb.net/slack_settings_test?retryWrites=true";
const client = new MongoClient(url);
const dbName = "test";

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log("Connected successfully to server");
//   const db = client.db(dbName);
//   const collection = await db.collection("users").find().toArray();
//   console.log(collection, "dddddddddd");
//   // the following code examples can be pasted here...
//   return "done.";
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

require("dotenv").config();
app.use(
  express.json({
    limit: "500mb",
    extended: true,
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "500mb",
    parameterLimit: 50000,
    extended: true,
  })
);
app.use(
  cors({
    origin: true,
  })
);

app.use("/", route);

async function run(team) {
  const client = new WebClient(
    "xoxb-4437570014530-4461293462368-3wfx5crreNTZ8pdWH6kmrt6Y",
    {
      logLevel: LogLevel.DEBUG,
    }
  );
  const channelId = "D04CVHDDPEE";

  try {
    const result = await client.chat.postMessage({
      channel: channelId,
      text: "Hello world",
      title: {
        type: "plain_text",
        text: "My App",
        emoji: true,
      },
      submit: {
        type: "plain_text",
        text: "Submit",
        emoji: true,
      },
      close: {
        type: "plain_text",
        text: "Cancel",
        emoji: true,
      },
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Submit Report",
          },
        },
        {
          type: "input",
          element: {
            type: "plain_text_input",
            multiline: true,
            action_id: "plain_text_input",
          },
          label: {
            type: "plain_text",
            text: "Standup",
            emoji: true,
          },
        },
        {
          type: "input",
          element: {
            type: "plain_text_input",
            multiline: true,
            action_id: "plain_text_input",
          },
          label: {
            type: "plain_text",
            text: "Report",
            emoji: true,
          },
        },
        {
          type: "input",
          element: {
            type: "plain_text_input",
            multiline: true,
            action_id: "plain_text_input",
          },
          label: {
            type: "plain_text",
            text: "Remaining",
            emoji: true,
          },
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Send",
                emoji: true,
              },
              value: "click_me_123",
              action_id: "actionId-0",
            },
          ],
        },
      ],
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// cron.schedule("0 10 * * 1-5", function () {
//   let teams = {
//     test: "C04CPC5E0K0",
//     test1: "C04CPCXK2DU",
//     test2: "C04D8PLQBNF",
//   };

//   let team = Object.keys(teams);
//   for (teamName in teams) {
run().catch((err) => console.log(err));
//   }
// });

cron.schedule("30 18 * * 1-5", function () {
  let teams = {
    test: "C04CPC5E0K0",
    test1: "C04CPCXK2DU",
    test2: "C04D8PLQBNF",
  };

  let team = Object.keys(teams);
  for (teamName in teams) {
    run(teamName).catch((err) => console.log(err));
  }
});

app.listen(8000);
