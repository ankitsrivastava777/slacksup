const { WebClient, LogLevel } = require("@slack/web-api");
const express = require("express");
const cron = require("node-cron");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { App } = require("@slack/bolt");
const route = require("./routes/routes");
const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://xmage:xmage@cluster0-xooqb.mongodb.net/slack_settings_test?retryWrites=true";
const client = new MongoClient(url);
const dbName = "test";
async function main() {
  await client.connect();
  const db = client.db(dbName);
  let collection = await db.collection("users").find().toArray();
  return collection;
}

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
    "xoxb-4437570014530-4461293462368-9frmfVE6xdsGstAQsqzzmGMR",
    {
      logLevel: LogLevel.DEBUG,
    }
  );
  const channelId = "U04CSJHC23X";

  try {
    const result = await client.chat.postMessage({
      channel: team,
      username: "sup",
      text: "Hello Whatsup",
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

cron.schedule("0 10 * * 1-5", function () {
  (async () => {
    let data = await main();
    console.log(data, "dddd");
    for (let i = 0; i <= data.length - 1; i++) {
      run(data[i].slack_id).catch((err) => console.log(err));
    }
  })();
});

cron.schedule("30 18 * * 1-5", function () {
  (async () => {
    let data = await main();
    console.log(data, "dddd");
    for (let i = 0; i <= data.length - 1; i++) {
      run(data[i].slack_id).catch((err) => console.log(err));
    }
  })();
});

app.listen(8000);
