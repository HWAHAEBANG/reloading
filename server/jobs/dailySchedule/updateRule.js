const schedule = require("node-schedule");

const updateRule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [1]; // 0:일 1:월 2:화 3:수 4:목 5:금  6:토
updateRule.hour = 15;
updateRule.minute = 40;

module.exports = updateRule;
