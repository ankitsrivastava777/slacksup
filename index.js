const express = require("express")
const cron = require("node-cron");
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const { App } = require("@slack/bolt");
const conn = require("./config/config")
const axios = require('axios');
const route  = require("./routes/routes");
require("dotenv").config();
app.use(express.json({
	limit: '500mb',
	extended: true
}))
app.use(bodyParser.urlencoded({
	limit: '500mb',
	parameterLimit: 50000,
	extended: true,
}));
app.use(cors({
	origin: true
}))

app.use('/',route);

async function run(team) {
  const url = 'https://slack.com/api/chat.postMessage';
  const res = await axios.post(url, {
    "channel": team,
    "type": "modal",
    "title": {
      "type": "plain_text",
      "text": "My App",
      "emoji": true
    },
    "submit": {
      "type": "plain_text",
      "text": "Submit",
      "emoji": true
    },
    "close": {
      "type": "plain_text",
      "text": "Cancel",
      "emoji": true
    },
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Submit Report"
        }
      },
      {
        "type": "input",
        "element": {
          "type": "plain_text_input",
          "multiline": true,
          "action_id": "plain_text_input"
        },
        "label": {
          "type": "plain_text",
          "text": "Standup",
          "emoji": true
        }
      },
      {
        "type": "input",
        "element": {
          "type": "plain_text_input",
          "multiline": true,
          "action_id": "plain_text_input"
        },
        "label": {
          "type": "plain_text",
          "text": "Report",
          "emoji": true
        }
      },
      {
        "type": "input",
        "element": {
          "type": "plain_text_input",
          "multiline": true,
          "action_id": "plain_text_input"
        },
        "label": {
          "type": "plain_text",
          "text": "Remaining",
          "emoji": true
        }
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Send",
              "emoji": true
            },
            "value": "click_me_123",
            "action_id": "actionId-0"
          }
        ]
      }
    ]
  }, { headers: { authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}` } });

  console.log('Done', res.data);
}  

cron.schedule("0 10 * * 1-5", function () {
  let teams = {
    test : "C04CPC5E0K0",
    test1 : "C04CPCXK2DU",
    test2 : "C04D8PLQBNF"
  }

  let team = Object.keys(teams);
  for(teamName in teams ) {
    
    run(teamName).catch(err => console.log(err));
  }
});

cron.schedule("30 18 * * 1-5", function () {
  let teams = {
    test : "C04CPC5E0K0",
    test1 : "C04CPCXK2DU",
    test2 : "C04D8PLQBNF"
  }

  let team = Object.keys(teams);
  for(teamName in teams ) {
    
    run(teamName).catch(err => console.log(err));
  }
});

app.listen(8080);
