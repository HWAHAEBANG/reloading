const schedule = require("node-schedule");

const updateRule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [1]; // 0:일 1:월 2:화 3:수 4:목 5:금  6:토
updateRule.hour = 8;
updateRule.minute = 48;

module.exports = updateRule;
