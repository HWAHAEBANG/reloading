const schedule = require("node-schedule");

const refetchRule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [1]; // 0:일 1:월 2:화 3:수 4:목 5:금  6:토
refetchRule.hour = 20;
refetchRule.minute = 50;

module.exports = refetchRule;
