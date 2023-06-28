// Function: createEmployeeRecord
const createEmployeeRecord = (employeeData) => {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

// Function: createEmployeeRecords
const createEmployeeRecords = (employeesData) => {
  return employeesData.map((employeeData) => createEmployeeRecord(employeeData));
};

// Function: createTimeInEvent
const createTimeInEvent = (employeeRecord, dateTime) => {
  const [date, hour] = dateTime.split(" ");
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date,
  });
  return employeeRecord;
};

// Function: createTimeOutEvent
const createTimeOutEvent = (employeeRecord, dateTime) => {
  const [date, hour] = dateTime.split(" ");
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: date,
  });
  return employeeRecord;
};

// Function: hoursWorkedOnDate
const hoursWorkedOnDate = (employeeRecord, date) => {
  const timeInEvent = employeeRecord.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOutEvent = employeeRecord.timeOutEvents.find(
    (event) => event.date === date
  );

  return (timeOutEvent.hour - timeInEvent.hour) / 100;
};

// Function: wagesEarnedOnDate
const wagesEarnedOnDate = (employeeRecord, date) => {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  return hoursWorked * employeeRecord.payPerHour;
};

// Function: allWagesFor
const allWagesFor = (employeeRecord) => {
  const datesWorked = employeeRecord.timeInEvents.map((event) => event.date);
  const totalWages = datesWorked.reduce((total, date) => {
    return total + wagesEarnedOnDate(employeeRecord, date);
  }, 0);
  return totalWages;
};

// Function: calculatePayroll
const calculatePayroll = (employeeRecords) => {
  const totalPayroll = employeeRecords.reduce((total, employeeRecord) => {
    return total + allWagesFor(employeeRecord);
  }, 0);
  return totalPayroll;
};

// Test Data
const employeeData = [
  ["John", "Doe", "Manager", 25],
  ["Jane", "Smith", "Supervisor", 20],
];

const employees = createEmployeeRecords(employeeData);
const john = employees[0];
const jane = employees[1];

createTimeInEvent(john, "2023-06-27 0900");
createTimeOutEvent(john, "2023-06-27 1700");
createTimeInEvent(jane, "2023-06-27 1000");
createTimeOutEvent(jane, "2023-06-27 1800");

console.log(hoursWorkedOnDate(john, "2023-06-27")); // Output: 8
console.log(wagesEarnedOnDate(jane, "2023-06-27")); // Output: 160
console.log(allWagesFor(john)); // Output: 200
console.log(calculatePayroll(employees)); // Output: 360
