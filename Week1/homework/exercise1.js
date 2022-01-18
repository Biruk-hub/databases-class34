// import mysql module
let mysql = require("mysql");
// create the database connection
let connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetups",
});

//invite data
const inviteData = [
  {
    Invitee_name: "Biruk",
    Invited_by: "John",
  },
  {
    Invitee_name: "Lamrot",
    Invited_by: "John",
  },
  {
    Invitee_name: "Eyouab",
    Invited_by: "Mary",
  },
  {
    Invitee_name: "Miraph",
    Invited_by: "Mary",
  },
  {
    Invitee_name: "John",
    Invited_by: "Mary",
  },
];

// room data
const roomData = [
  {
    Room_name: "Room 1",
    Floor_number: 1,
  },
  {
    Room_name: "Room 2",
    Floor_number: 1,
  },
  {
    Room_name: "Room 3",
    Floor_number: 1,
  },
  {
    Room_name: "Room 4",
    Floor_number: 1,
  },
  {
    Room_name: "Room 5",
    Floor_number: 1,
  },
];

//meeting data
const meetingData = [
  {
    Meeting_title: "Meeting 1",
    Starting_time: "10:00:00",
    Ending_time: "11:00:00",
    Room_no: 1,
  },
  {
    Meeting_title: "Meeting 2",
    Starting_time: "10:00:00",
    Ending_time: "11:00:00",
    Room_no: 2,
  },
  {
    Meeting_title: "Meeting 3",
    Starting_time: "10:00:00",
    Ending_time: "11:00:00",
    Room_no: 3,
  },
  {
    Meeting_title: "Meeting 4",
    Starting_time: "10:00:00",
    Ending_time: "11:00:00",
    Room_no: 4,
  },
  {
    Meeting_title: "Meeting 5",
    Starting_time: "10:00:00",
    Ending_time: "11:00:00",
    Room_no: 5,
  },
];

// open the connection
connection.connect();

// query database
const drop_query = "DROP TABLE IF EXISTS Invitee, Room, Meeting;";
const create_invitee_table_query =
  "CREATE TABLE IF NOT EXISTS Invitee (Invitee_no INT NOT NULL AUTO_INCREMENT, Invitee_name VARCHAR(100), Invited_by VARCHAR(100), PRIMARY KEY (invitee_no))";
const create_room_table_query =
  "CREATE TABLE IF NOT EXISTS Room (Room_no INT NOT NULL AUTO_INCREMENT, Room_name VARCHAR(100), Floor_number INT, PRIMARY KEY (room_no))";
const create_meeting_table_query =
  "CREATE TABLE IF NOT EXISTS Meeting (Meeting_no INT NOT NULL AUTO_INCREMENT, Meeting_title VARCHAR(100), Starting_time DATETIME, Ending_time DATETIME, Room_no INT, PRIMARY KEY (meeting_no))";

//   drop the table if it exists
const dropTables = () => {
  // execute the query
  connection.query(drop_query, (error, result, fields) => {
    error ? console.log(error) : console.log("Table dropped successfully");
  });
};

//  create the table if it does not exist
const createTables = () => {
  connection.query(create_invitee_table_query, (err, result) => {
    err ? console.log(err) : console.log("Invitee table created");
  });
  connection.query(create_room_table_query, (err, result) => {
    err ? console.log(err) : console.log("Room table created");
  });
  connection.query(create_meeting_table_query, (err, result) => {
    err ? console.log(err) : console.log("Meeting table created");
  });
};

// populate the invitee table
const insertDataIntoInviteeTable = () => {
  inviteData.forEach((data) => {
    connection.query("INSERT INTO invitee SET ?", data, (err, result) => {
      err && console.log(err);
    });
  });
  console.log(`Invitee table populated `);
};

// populate the room table
const insertDataIntoRoomTable = () => {
  roomData.forEach((data) => {
    connection.query("INSERT INTO room SET ?", data, (err, result) => {
      err && console.log(err);
    });
  });
  console.log(`Room table populated `);
};
// populate the meeting table
const insertDataIntoMeetingTable = () => {
  meetingData.forEach((data) => {
    connection.query("INSERT INTO meeting SET ?", data, (err, result) => {
      err && console.log(err);
    });
  });
  console.log(`Meeting table populated `);
};

// call functions
dropTables();
createTables();
insertDataIntoInviteeTable();
insertDataIntoRoomTable();
insertDataIntoMeetingTable();

// close the connection
connection.end();
