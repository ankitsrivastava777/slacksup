const axios = require("axios")
const { reports } = require("../model/Report")
module.exports.sendReport = async (req, res) => {

    let jsonData = JSON.parse(req.body.payload)
    const block = jsonData.message.blocks.map(el => ({ label: el.label?.text, blockId: el.block_id })).filter(el => el.label);
    const value = jsonData.state.values;
    const keyValue = {}
    block.map(el => {
        keyValue[el.label] = value[`${el.blockId}`]['plain_text_input'].value
    })

    let username = jsonData.user.username;
    let name = jsonData.user.name;
    let team_id = jsonData.user.team_id;
    let channel_id = jsonData.container.channel_id;
    let stand_up = keyValue.Standup;
    let report = keyValue.Report;
    let remaining_task = keyValue.Remaining

    let data =
    {
        stand_up,
        report,
        remaining_task,
        username,
        name,
        team_id,
        channel_id
    }
    await new reports(data).save()
    run(teamName).catch(err => console.log(err));
    async function run(team) {

        const url = 'https://slack.com/api/chat.postMessage';
        await axios.post(url, {
            "channel": channel_id,
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
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Stand Up",
                        "emoji": true
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": `${stand_up}`,
                        "emoji": true
                    }
                },
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Report",
                        "emoji": true
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": `${report}`,
                        "emoji": true
                    }
                },
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Remaining Work",
                        "emoji": true
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": `${remaining_task}`,
                        "emoji": true
                    }
                }
            ]
        }, { headers: { authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}` } });
        res
            .status(200)
            .send("message saved");
    }
};