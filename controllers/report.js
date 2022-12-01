const axios = require("axios")
const { reports } = require("../model/Report")
module.exports.sendReport = async (req, res) => {

    let jsonData = JSON.parse(req.body.payload)
    const block = jsonData.message.blocks.map(el => ({label : el.label?.text, blockId: el.block_id})).filter(el => el.label);
    const value = jsonData.state.values;
    const keyValue = {}
    block.map(el=> {
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
    res
        .status(200)
        .send("message saved");
};