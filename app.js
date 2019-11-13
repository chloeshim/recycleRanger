"use strict";

// external dependencies
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

// // dependencies
// const FSERoute = require("./routes/FSERoute");
// const FSEMiddleware = require("./routes/FSEMiddleware");
// const NotificationService = require("./services/NotificationService");
// const Logger = require("./services/LoggerService")("Server");

// // configurations
// const sessionConf = {
//   secret:            "usersession",
//   resave:            false,
//   saveUninitialized: true,
//   cookie:            {}
// };

// let bob;

// // /////////////////////////////////////
// const morgan = require("morgan");
// const userRoutes = require("./routes/users");
// const messageRoutes = require("./routes/messages");
// const announcementRoutes = require("./routes/announcement");
// const searchRoutes = require("./routes/searchResults");
// const emContactRoutes = require("./routes/emContact");
// const locationRoutes = require("./routes/locations");
// const mapRoutes = require("./routes/map");
// const shelterRoute = require("./routes/shelterRoute");
// const dbConnector = require("./utils/dbConnector");
// const dbConfig = require("./config/dbConfig")[process.env.DB || "prod"];
// const connector = new dbConnector(dbConfig.location, dbConfig.port, dbConfig.dbName);
// const RSIRoutes = require("./routes/resourceShareInfo");
// const NineOneOneRoutes = require("./routes/nineOneOne");
// const incidentRoute = require("./routes/incidentRoute");
// const groupRoutes = require("./routes/group");
// const areaRoutes = require("./routes/area");
// const respondRoutes = require("./routes/respond");
// const organizationRoutes = require("./routes/organization");
// const resourcesRoutes = require("./routes/resources");
// const hospitalRoutes = require("./routes/hospital");
// const patientRoutes = require("./routes/patient");
// const reportRoutes = require("./routes/report");
// const missingPersonRoutes = require("./routes/missingPersons");
// const drugsRoutes = require("./routes/drugs");
// const inventoryRoutes = require("./routes/inventory");
// // /////////////////////////////////////


// // set rendering engine
// app.set("view engine", "ejs");

// // set templates defalut folder
// app.set("views", path.join(__dirname, "./public/templates"));

// // use session
// app.use(session(sessionConf));

// // css
// app.use("/public", express.static(process.cwd() + "/public"));

// // dashboard
// app.use(express.static(__dirname + "/AdminLTE"));

// // to be able to parse json
// // set the file size limit to 10mb to send image
// app.use(bodyParser.json({limit: "10mb"}));
// app.use(bodyParser.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}));

// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: false }));



// global.FSEMiddleware = global.FSEMiddleware || require("./routes/FSEMiddleware");
// new FSERoute(app);

// // inject global
// const io = require("socket.io").listen(server);
// global.NotificationService = new NotificationService(io);
// global.SessionService = require("./services/SessionService");
// global.dbConnector = dbConnector.dbConnection;
// global.UserModel = require("./models/user");
// global.MessageModel = require("./models/message");
// global.AnnouncementModel = require("./models/announcement");
// global.GroupModel = require("./models/group");
// global.ShelterModel = require("./models/shelter");
// global.BlockModel = require("./models/blocks");
// global.FireAreaModel = require("./models/fireaArea");
// global.ResourceShareInfo = require("./models/resourceShareInfo");
// global.PasswordUtil = require("./utils/passwordHashUtil");
// global.UserNameCheckUtil = require("./utils/userNameCheckUtil");
// global.StopWordCheckUtil = require("./utils/stopWordCheckUtil");
// global.RSIModel = require("./models/resourceShareInfo");
// global.IncidentModel = require("./models/incident");
// global.IncidentQuestionsModel = require("./models/incidentQuestions");
// global.IncidentAnswerModel = require("./models/incidentAnswers");
// global.GroupModel = require("./models/group");
// global.CarsModel = require("./models/cars");
// global.AreaModel = require("./models/area");
// global.HospitalModel = require("./models/hospital");
// global.PatientModel = require("./models/patients");
// global.ReportModel = require("./models/report");
// global.MissingPersonModel = require("./models/missingPerson");
// global.DrugsModel = require("./models/drugs");
// global.inventoryModel = require("./models/inventory");
// // ///////////////////////////////////
// app.use(morgan("dev"));
// app.use("/users", userRoutes);
// app.use("/messages", messageRoutes);
// app.use("/announcements", announcementRoutes);
// app.use("/searchResult", searchRoutes);
// app.use("/emContact", emContactRoutes);
// app.use("/location", locationRoutes);
// app.use("/map", mapRoutes);
// app.use("/shelter", shelterRoute);
// app.use("/RSI", RSIRoutes );
// app.use("/911", NineOneOneRoutes );
// app.use("/incident", incidentRoute );
// app.use("/groups", groupRoutes);
// app.use("/respond", respondRoutes);
// app.use("/organization", organizationRoutes);
// app.use("/resources", resourcesRoutes);
// app.use("/area", areaRoutes);
// app.use("/hospital", hospitalRoutes);
// app.use("/patients", patientRoutes);
// app.use("/report", reportRoutes);
// app.use("/missingPersons", missingPersonRoutes);
// app.use("/drugs", drugsRoutes);
// app.use("/inventory", inventoryRoutes);
// // ///////////////////////////////////

// if (!isNaN(parseInt(process.argv[2]))) {
//   const port = process.env.PORT || parseInt(process.argv[2]);
//   server.listen(port, () => {
//     Logger.log("running on port " + port)
//   })
// }

module.exports = server;
