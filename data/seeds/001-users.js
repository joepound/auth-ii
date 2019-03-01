exports.seed = (knex, Promise) =>
  // Deletes ALL existing entries
  knex("Users")
    .truncate()
    .then(() =>
      // Inserts seed entries
      knex("Users").insert([
        {
          UserName: "User",
          UserPassword:
            "$2a$12$UDDKseQRhFM39d4IYMD.k.yB1wmNbcsSZLPfizXcC8kztMW/kZLKG", // [plaintext] password
          UserDepartment: "Front End"
        },
        {
          UserName: "John Doe",
          UserPassword:
            "$2a$12$Mu8GwKITHPm8uwHUf1kwTunnYQmR5tkGY0zVjbCPqYsRgbsYhIoX6", // [plaintext] password
          UserDepartment: "Front End"
        },
        {
          UserName: "AzureDiamond",
          UserPassword:
            "$2a$12$mq17wPkfRt0vkEDku7sj3eOSMKeEl/f1GFyXGTGRMLDaK6bDHIjye", // [plaintext] 12345678
          UserDepartment: "Back End"
        }
      ])
    );
