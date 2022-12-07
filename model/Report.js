var mongoose = require("mongoose");
var {db} = require("../config/config");

var reports = mongoose.Schema(
  {
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    team_id: {
        type: String,
        required: true
    },
    channel_id: {
        type: String,
        required: true,
    },
    stand_up: {
        type: String,
        required: true,
    },
    report: {
        type: String,
        required: true,
    },
    remaining_task: {
        type: String,
    }
},
  {
    strict: true,
    collection: "reports",
  }
);

var reports = mongoose.model("reports", reports);

exports.reports = reports;