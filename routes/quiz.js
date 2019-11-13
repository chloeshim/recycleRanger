"use strict";

const Logger = require("../services/LoggerService")("Route");
const SessionService = require("../services/SessionService");
const FSEMiddleware = require("./FSEMiddleware");
const commonHandler = require("./route-common");
const RSIController = require("../controllers/resourceShareInfoController");
const UsersController = require("../controllers/usersController");
const respondController = require("../controllers/respondController");
const incidentController = require("../controllers/incidentController");
const missingPersonController = require("../controllers/missingPersonController");
const Process = require("../models/process").Process;

module.exports = class FSERoute {

  get session() {
    return global.SessionService
  }
  get UserModel() {
    return global.UserModel
  }
  get IncidentModel() {
    return global.IncidentModel;
  }
  get GroupModel() {
    return global.GroupModel;
  }

  get CarsModel() {
    return global.CarsModel;
  }

  get IncidentQuestionsModel() {
    return global.IncidentQuestionsModel
  }
  get NotificationService() {
    return global.NotificationService;
  }

  get MissingPersonModel() {
    return global.MissingPersonModel;
  }

  static renderSession(req, res, url) {
    const session = global.SessionService.getUserSession(req);
    const data = Object.assign({}, session);
    res.render(url, {
      hydrateData: JSON.stringify(data)
    });
  }

  constructor(app) {
    const FSEMiddleware = global.FSEMiddleware;
    const middleware = new FSEMiddleware();

    /* get */
    app.get("/", (req, res) => {
      const session = this.session.getUserSession(req);
      res.render("pages/index", {
        username: session ? session.userName : "",
        message:  ""
      });
    });

    app.get("/AnnouncementWall", middleware.isUserLoggedIn, (req, res) => {
      const session = this.session.getUserSession(req);
      // Ugly
      const data = Object.assign({}, session, {
        greeting: req.query.greeting
      });
      res.render("../../AdminLTE/pages/announcement", {
        hydrateData: JSON.stringify(data)
      });
    });

    app.get("/privateroom/:toWho", middleware.isUserLoggedIn, (req, res) => {
      // req.params.toWho
      const session = this.session.getUserSession(req);
      const data = Object.assign({}, session, {
        toWho: req.params.toWho
      });
      res.render("../../AdminLTE/pages/private-wall.ejs", {
        hydrateData: JSON.stringify(data)
      });
    });

    app.get("/directory", middleware.isUserLoggedIn, (req, res) => {
      const session = this.session.getUserSession(req);
      // Ugly
      const data = Object.assign({}, session, {

      });
      res.render("../../AdminLTE/pages/directory", {
        hydrateData: JSON.stringify(data)
      });
    });

    app.get("/groupDirectory", middleware.isUserLoggedIn, (req, res) => {
      const session = this.session.getUserSession(req);
      const data = Object.assign({}, session, {});
      res.render("../../AdminLTE/pages/groupDirectory", {
        hydrateData: JSON.stringify(data)
      });
    });

    app.get("/incidents", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);

      const firstResponderArray = [1, 2, 4, 5, 6, 8];

      if (firstResponderArray.includes(data.role)) {
        res.render("../../AdminLTE/pages/firstResponderIncident", {
          hydrateData: JSON.stringify(data)
        });
      } else if (data.role === 3) {
        res.render("../../AdminLTE/pages/dispatcherIncident", {
          hydrateData: JSON.stringify(data)
        });
      } else {
        res.redirect("/chat"); // TODO: render or redirect here?
      }
    });

    app.get("/defineGroup", middleware.isUserLoggedIn, (req, res) => {
      const session = this.session.getUserSession(req);
      // Ugly
      const data = Object.assign({}, session, {

      });
      res.render("../../AdminLTE/pages/defineGroup", {
        hydrateData: JSON.stringify(data)
      });
    });

    app.get("/search", middleware.isUserLoggedIn, (req, res) => {
      // const session = this.session.getUserSession(req);
      // const data = Object.assign({}, session);
      // res.render("../../AdminLTE/pages/search", {
      //   hydrateData : JSON.stringify(data)
      // });
      FSERoute.renderSession(req, res, "../../AdminLTE/pages/search")
    });

    app.get("/organization", middleware.isUserLoggedIn, (req, res) => {
      const session = this.session.getUserSession(req);
      // Ugly
      const data = Object.assign({}, session, {});
      res.render("../../AdminLTE/pages/organization", {
        hydrateData: JSON.stringify(data)
      });
    });

    app.get("/resources", middleware.isUserLoggedIn, (req, res) => {
      const session = this.session.getUserSession(req);
      // Ugly again
      const data = Object.assign({}, session, {});
      res.render("../../AdminLTE/pages/resources", {
        hydrateData: JSON.stringify(data)
      });
    });

    app.get("/RSI", middleware.isUserLoggedIn, (req, res) => {
      const session = this.session.getUserSession(req);
      const data = Object.assign({}, session, {

      });
      res.render("../../AdminLTE/pages/rsi", {
        hydrateData: JSON.stringify(data)
      });
    });

    app.get("/report", middleware.isUserLoggedIn, (req, res) => {
      const session = this.session.getUserSession(req);
      // Ugly
      const data = Object.assign({}, session, {});
      res.render("../../AdminLTE/pages/report", {
        hydrateData: JSON.stringify(data)
      });
    });

    app.get("/openReport", middleware.isUserLoggedIn, (req, res) => {
      const session = this.session.getUserSession(req);
      // Ugly
      const data = Object.assign({}, session, {});
      res.render("../../AdminLTE/pages/openReport", {
        hydrateData: JSON.stringify(data)
      });
    });

    app.get("/contact", middleware.isUserLoggedIn, (req, res) => {
      // const session = this.session.getUserSession(req);
      // const data = Object.assign({}, session);
      // res.render("../../AdminLTE/pages/contact", {
      //   hydrateData : JSON.stringify(data)
      // });
      FSERoute.renderSession(req, res, "../../AdminLTE/pages/contact")
    });

    app.get("/organization", middleware.isUserLoggedIn, (req, res) => {
      FSERoute.renderSession(req, res, "../../AdminLTE/pages/organization")
    });

    app.get("/resources", middleware.isUserLoggedIn, (req, res) => {
      FSERoute.renderSession(req, res, "../../AdminLTE/pages/resources")
    });

    app.get("/report", middleware.isUserLoggedIn, (req, res) => {
      FSERoute.renderSession(req, res, "../../AdminLTE/pages/report")
    });

    app.post("/RSI/reserve", middleware.isUserLoggedIn, (req, res) => {
      const session = this.session.getUserSession(req);
      // Ugly
      const data = Object.assign({}, session, {

      });
      const _id = req.body._id;
      const reserveData = {
        userName: req.body.name,
        sendDate: new Date()
      };
      const dataPacket = { _id, reserveData};
      // console.log("at router: reserve: " + JSON.stringify(dataPacket))
      commonHandler(RSIController.addReserve(dataPacket), req, res);

      res.render("../../AdminLTE/pages/rsi", {
        hydrateData: JSON.stringify(data)
      });
    });

    app.get("/shelter", middleware.isUserLoggedIn, (req, res) => {
      // const session = this.session.getUserSession(req);
      // const data = Object.assign({}, session);
      // res.render("../../AdminLTE/pages/shelter", {
      //   hydrateData : JSON.stringify(data)
      // });
      FSERoute.renderSession(req, res, "../../AdminLTE/pages/shelter")
    });

    app.get("/profile", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);
      res.render("../../AdminLTE/pages/profile", {
        hydrateData: JSON.stringify(data)
      });
    });

    app.get("/patientDirectory", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);
      res.render("../../AdminLTE/pages/patientDirectory", {
        hydrateData: JSON.stringify(data)
      });
    });

    app.get("/drugDirectory", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);
      res.render("../../AdminLTE/pages/drugDirectory", {
        hydrateData: JSON.stringify(data)
      });
    });

    app.get("/inventoryInfo", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);
      res.render("../../AdminLTE/pages/inventoryInfo", {
        hydrateData: JSON.stringify(data)
      });
    });

    app.get("/assignHospital", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);
      res.render("../../AdminLTE/pages/assignHospital", {
        hydrateData: JSON.stringify(data)
      });
    });

    app.get("/updateBeds", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);
      res.render("../../AdminLTE/pages/updateBeds", {
        hydrateData: JSON.stringify(data)
      });
    });

    app.get("/hospitalDirectory", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);
      res.render("../../AdminLTE/pages/hospitalDirectory", {
        hydrateData: JSON.stringify(data)
      });
    });


    app.get("/missingPersons", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);
      if (req.query.id === void(0)) {
        res.render("../../AdminLTE/pages/missingPersons", {
          hydrateData: JSON.stringify(data)
        });
      } else {
        this.MissingPersonModel.getMissingPersonById(req.query.id)
          .then((missingPerson) => {
            data.missingPerson = missingPerson;
            res.render("../../AdminLTE/pages/viewMissingPerson", {
              hydrateData: JSON.stringify(data),
              description: missingPerson.description,
              userName: missingPerson.name,
            });
          })
      }
    });

    app.get("/addMissingPersons", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);
      this.UserModel.getAllUsers()
        .then((users) => {
          this.MissingPersonModel.getAllMissingPerson()
            .then((missingPerson) => {
              const allMissingPerson = [];
              const allUsers = [];
              for (let i = 0; i < missingPerson.length; i++) {
                if (missingPerson[i]["status"] === "missing") {allMissingPerson.push(missingPerson[i]["name"])}
              }
              for (let i = 0; i < users.length; i++) {
                if (allMissingPerson.indexOf(users[i]["userName"]) === -1) {
                  const tmp = [];
                  tmp.push(users[i]["userName"]);
                  if ("name" in users[i] && typeof users[i]["name"] !== "undefined") {
                    tmp.push(users[i]["name"])
                  }
                  allUsers.push(tmp)
                }
              }
              if (allUsers.length > 0) {
                res.render("../../AdminLTE/pages/addMissingPersons", {
                  hydrateData: JSON.stringify(data),
                  allUsers: allUsers
                });
              } else {
                res.render("../../AdminLTE/pages/addMissingPersons", {
                  hydrateData: JSON.stringify(data),
                  allUsers: []
                });
              }
            }).catch((err) => {
              console.log("users");
              res.render("../../AdminLTE/pages/addMissingPersons", {
                hydrateData: JSON.stringify(data),
                allUsers: []
              });
            })
        }).catch((err) => {
          res.render("../../AdminLTE/pages/addMissingPersons", {
            hydrateData: JSON.stringify(data),
            allUsers: []
          });
        })
    });

    app.get("/userProfile", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);
      res.render("../../AdminLTE/pages/userProfile", {
        hydrateData: JSON.stringify(data)
      });
    });

    app.get("/newIncident", middleware.isUserLoggedIn, (req, res) => {
      const session = this.session.getUserSession(req);
      // Ugly
      const data = Object.assign({}, session, {

      });
      res.render("../../AdminLTE/pages/nineOneOne-step1", {
        hydrateData: JSON.stringify(data)
      });
    });

    app.get("/911", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);
      const validSteps = ["1", "2", "3", "4"];
      this.IncidentModel.notClosedIncidentExist(session.userName)
        .then((msg) => {
          if (typeof msg[0] === "undefined" || msg.length === 0) {
            res.redirect("/911/step1")
          } else if (validSteps.includes(msg[0].lastUpdatedStep)) {
            const lastUpdateStepNumber = Math.min(Math.max(parseInt(msg[0].lastUpdatedStep), 1), 4);
            const redirectUrl = "/911/step" + lastUpdateStepNumber;
            res.redirect(redirectUrl);
          } else {
            res.redirect("/chat");
          }
        });
    });

    app.get("/911/step1", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);
      let location = "";
      const firstResponderArray = [1, 2, 4, 5, 6, 8];
      const role = data.role;
      const incidentID = "I_" + data.userName;
      this.IncidentModel.notClosedIncidentExist(session.userName)
        .then((msg) => {
          data["incident"] = msg[0];
          if (firstResponderArray.includes(role)) {
            location = msg[0].location;
            console.log("Responder step1!");
            res.render("../../AdminLTE/pages/nineOneOneResponder-step1", {
              hydrateData: JSON.stringify(data),
              location:    location,
              incidentName: incidentID
            });
          } else if (typeof msg[0] === "undefined" || msg.length === 0) {
            res.render("../../AdminLTE/pages/nineOneOne-step1", {
              hydrateData: JSON.stringify(data),
              location: location
            });
          } else {
            location = msg[0].location;
            res.render("../../AdminLTE/pages/nineOneOne-step1", {
              hydrateData: JSON.stringify(data),
              location: location
            });
          }
        })
        .catch((err) => {
          if (firstResponderArray.includes(role)) {
            console.log("error Responder step1!");
            res.render("../../AdminLTE/pages/nineOneOneResponder-step1", {
              hydrateData: JSON.stringify(data),
              incidentName: "I_" + data.userName,
              location: ""
            });
          } else {
            res.render("../../AdminLTE/pages/nineOneOne-step1", {
              hydrateData: JSON.stringify(data)
            });
          }
        });
    });

    app.get("/911/step2", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);

      this.IncidentModel.notClosedIncidentExist(session.userName)
        .then((msg) => {
          data["incident"] = msg[0];
          const location = msg[0].location;
          if (typeof msg[0] === "undefined") {
            res.render("../../AdminLTE/pages/nineOneOne-step1", {
              hydrateData: JSON.stringify(data),
              location:    location
            });
          }
          if (msg.length > 0) {
            let incidentType = ["", "", ""];
            if (msg[0].incidentType !== "undefined" && msg[0].incidentType !== null) {
              if (msg[0].incidentType === "F") {
                incidentType = ["active", "", ""];
              } else if (msg[0].incidentType === "M") {
                incidentType = ["", "active", ""];
              } else if (msg[0].incidentType === "P") {
                incidentType = ["", "", "active"];
              }
            }
            const firstResponderArray = [1, 2, 4, 5, 6, 8];
            const role = data.role;
            if (firstResponderArray.includes(role)) {
              console.log("Responder step2!");
              res.render("../../AdminLTE/pages/nineOneOneResponder-step2", {
                hydrateData: JSON.stringify(data),
                location:    location,
                incidentType: incidentType
              });
            } else {
              console.log("Citizen step2!");
              res.render("../../AdminLTE/pages/nineOneOne-step2", {
                hydrateData:  JSON.stringify(data),
                incidentType: incidentType
              });
            }
          } else {
            // TODO: change to 911 display incident
            res.redirect("/chat");
          }
        });
    });

    app.get("/911/step3", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);
      this.UserModel.checkUserExist(session.userName)
        .then((user) => {
          data["user"] = user;
          this.IncidentModel.notClosedIncidentExist(session.userName)
            .then((msg) => {
              if (msg.length >= 0) {
                data["incident"] = msg[0];
                console.log("Responder step3! No change needed here!");
                res.render("../../AdminLTE/pages/relevantQuestions", {
                  hydrateData: JSON.stringify(data)
                });
              } else {
                // TODO: change to 911 group url
                res.redirect("/chat");
              }
            });
        })
    });

    app.get("/911/step4", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);
      this.IncidentModel.notClosedIncidentExist(session.userName)
        .then((msg) => {
          if (msg.length >= 0) {
            data["incident"] = msg[0];
            const firstResponderArray = [1, 2, 4, 5, 6, 8];
            const role = data.role;
            const location = msg[0].location;

            if (firstResponderArray.includes(role)) {
              console.log("Responder step4! No CHAT!");
              const incidentName = msg[0].incidentName;
              res.render("../../AdminLTE/pages/nineOneOneResponder-step4", {
                hydrateData: JSON.stringify(data),
                incidentID: data.incident._id,
                incidentName: incidentName,
                location: location
              });
            } else {
              res.render("../../AdminLTE/pages/incidentGroupChat", {
                hydrateData: JSON.stringify(data)
              });
            }
          } else {
            // TODO: change to 911 group url
            res.redirect("/chat");
          }
        });
    });

    // app.get("/respond", middleware.isUserLoggedIn, (req, res) => {
    //   const session = SessionService.getUserSession(req);
    //   const data = Object.assign({}, session);
    //   const validSteps = ["1", "2", "3", "4", "5"];
    //   this.IncidentModel.notClosedIncidentExist(session.userName)
    //     .then((msg) => {
    //       if(typeof msg[0] === "undefined" || msg.length === 0) {
    //         res.redirect("/respond/step1")
    //       } else if(validSteps.includes(msg[0].lastUpdatedStep)) {
    //         const lastUpdateStepNumber = Math.min(Math.max((parseInt(msg[0].lastUpdatedStep)), 1), 4);
    //         const redirectUrl = "/respond/step" + lastUpdateStepNumber;
    //         res.redirect(redirectUrl);
    //       } else {
    //         res.redirect("/chat");
    //       }
    //     });
    // });

    app.get("/respond", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);
      let location = "";
      respondController.getIncidentNameByID(req.query.incidentID)
        .then((returnVal) => {
          const incidentName = returnVal.result[0].incidentName;
          location = returnVal.result[0].location;
          commonHandler(respondController.updateIncidentStateIfWaiting(req.query.incidentID), req, res);
          data["incident"] = returnVal.result[0];
          res.render("../../AdminLTE/pages/respond-step1", {
            hydrateData:  JSON.stringify(data),
            incidentID:   req.query.incidentID,
            incidentName: incidentName,
            location:     location
          });
        })
        .catch((err) => {
          res.render("../../AdminLTE/pages/respond-step1", {
            hydrateData:  JSON.stringify(data),
            incidentID:   req.query.incidentID,
            incidentName: "Undefined",
            location:     location,
          });
        })
    });

    app.get("/respond/step1", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);
      let location = "";
      respondController.getIncidentNameByID(req.query.incidentID)
        .then((returnVal) => {
          const incidentName = returnVal.result[0].incidentName;
          location = returnVal.result[0].location;
          console.log(returnVal.result[0]);
          data["incident"] = returnVal.result[0];
          commonHandler(respondController.updateIncidentStateIfWaiting(req.query.incidentID), req, res);
          res.render("../../AdminLTE/pages/respond-step1", {
            hydrateData:  JSON.stringify(data),
            incidentID:   req.query.incidentID,
            incidentName: incidentName,
            location:     location
          });
        })
        .catch((err) => {
          res.render("../../AdminLTE/pages/respond-step1", {
            hydrateData:  JSON.stringify(data),
            incidentID:   req.query.incidentID,
            incidentName: "Undefined",
            location:     location
          });
        })
    });

    app.get("/respond/step2", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);
      let location = "";
      respondController.getIncidentNameByID(req.query.incidentID)
        .then((returnVal) => {
          const incidentName = returnVal.result[0].incidentName;
          location = returnVal.result[0].location;
          data["incident"] = returnVal.result[0];
          commonHandler(respondController.updateIncidentStateIfWaiting(req.query.incidentID), req, res);
          res.render("../../AdminLTE/pages/respond-step2", {
            hydrateData:  JSON.stringify(data),
            incidentID:   req.query.incidentID,
            incidentName: incidentName,
            location:     location
          });
        })
        .catch((err) => {
          res.render("../../AdminLTE/pages/respond-step2", {
            hydrateData:  JSON.stringify(data),
            incidentID:   req.query.incidentID,
            incidentName: "Undefined",
            location:     location
          });
        })
    });

    app.get("/respond/step3", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);
      let location = "";
      let multipleVictims = [];
      respondController.getIncidentNameByID(req.query.incidentID)
        .then((returnVal) => {
          const incidentName = returnVal.result[0].incidentName;
          location = returnVal.result[0].location;
          multipleVictims = returnVal.result[0].multipleVictims;
          data["incident"] = returnVal.result[0];

          multipleVictims.push(data.incident.caller);
          this.UserModel.getUserByName(data.incident.caller)
            .then((user) => {
              data["user"] = user[0];
              commonHandler(respondController.updateIncidentStateIfWaiting(req.query.incidentID), req, res);
              res.render("../../AdminLTE/pages/respond-step3", {
                hydrateData: JSON.stringify(data),
                incidentID:   req.query.incidentID,
                incidentName: incidentName,
                location:     location,
                multipleVictimsArray: multipleVictims
              });
            })
        })
        .catch((err) => {
          res.render("../../AdminLTE/pages/respond-step3", {
            hydrateData:  JSON.stringify(data),
            incidentID:   req.query.incidentID,
            incidentName: "Undefined",
            location:     location,
            multipleVictimsArray: multipleVictims
          });
        })
    });

    app.get("/respond/step4", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);
      let location = "";
      let state;
      respondController.getIncidentNameByID(req.query.incidentID)
        .then((returnVal) => {
          const incidentName = returnVal.result[0].incidentName;
          location = returnVal.result[0].location;
          state = returnVal.result[0].state;
          data["incident"] = returnVal.result[0];
          commonHandler(respondController.updateIncidentStateIfWaiting(req.query.incidentID), req, res);
          res.render("../../AdminLTE/pages/respond-step4", {
            hydrateData: JSON.stringify(data),
            incidentID:   req.query.incidentID,
            incidentName: incidentName,
            location:     location,
            incidentState: state
          });
        })
        .catch((err) => {
          res.render("../../AdminLTE/pages/respond-step4", {
            hydrateData:  JSON.stringify(data),
            incidentID:   req.query.incidentID,
            incidentName: "Undefined",
            location:     location,
            incidentState: state
          });
        })
    });

    app.get("/respond/step5", middleware.isUserLoggedIn, (req, res) => {
      const session = SessionService.getUserSession(req);
      const data = Object.assign({}, session);
      let location = "";
      respondController.getIncidentNameByID(req.query.incidentID)
        .then((returnVal) => {
          const incidentName = returnVal.result[0].incidentName;
          location = returnVal.result[0].location;
          data["incident"] = returnVal.result[0];
          commonHandler(respondController.updateIncidentStateIfWaiting(req.query.incidentID), req, res);
          res.render("../../AdminLTE/pages/respond-step5", {
            hydrateData:  JSON.stringify(data),
            incidentID:   req.query.incidentID,
            incidentName: incidentName,
            location:     location
          });
        })
        .catch((err) => {
          res.render("../../AdminLTE/pages/respond-step5", {
            hydrateData:  JSON.stringify(data),
            incidentID:   req.query.incidentID,
            incidentName: "Undefined",
            location:     location
          });
        })
    });

    app.get("/register", (req, res) => {
      const userSession = SessionService.getUserSession(req);
      // console.log("/register", userSession);
      res.render("pages/register", userSession ? {username: userSession.name} : {});
    });

    app.get("/error", (req, res) => {
      res.render("pages/index", {
        username: "",
        message:  "The user already exists!. Incorrect password!"
      });
    });

    app.get("/chat", middleware.isUserLoggedIn, (req, res) => {
      const session = this.session.getUserSession(req) || req.body.session.user;
      global.UserModel.checkUserExist(session.userName)
        .then((user) => {
          session.role = user.role;
          session.locateStatus = user.locateStatus;
          const data = Object.assign({}, session, {
            greeting: req.query.greeting
          });
          // console.log(data);
          res.render("../../AdminLTE/pages/public-wall", {
            hydrateData: JSON.stringify(data)
          });
        });
    });

    app.get("/home", middleware.isUserLoggedIn, (req, res) => {
      const session = this.session.getUserSession(req) || req.body.session.user;
      global.UserModel.checkUserExist(session.userName)
        .then((user) => {
          session.role = user.role;
          session.locateStatus = user.locateStatus;
          const data = Object.assign({}, session, {
            greeting: req.query.greeting
          });
          // console.log(data);
          res.render("../../AdminLTE/pages/home", {
            hydrateData: JSON.stringify(data)
          });
        });
    });

    app.get("/location", middleware.isUserLoggedIn, (req, res) => {
      const session = this.session.getUserSession(req);
      this.UserModel.checkUserExist(session.userName)
        .then((user) => {
          session.locateStatus = user.locateStatus;
          // console.log(user)
          const data = Object.assign({}, session, {
            greeting: req.query.greeting
          });
          res.render("../../AdminLTE/pages/location", {
            hydrateData: JSON.stringify(data)
          });
        })
    });

    app.get("/map", middleware.isUserLoggedIn, (req, res) => {
      const session = this.session.getUserSession(req);
      this.UserModel.checkUserExist(session.userName)
        .then((user) => {
          session.locateStatus = user.locateStatus;
          // console.log(user)
          const data = Object.assign({}, session, {
            greeting: req.query.greeting
          });
          res.render("../../AdminLTE/pages/map", {
            hydrateData: JSON.stringify(data)
          });
        })
    });

    app.get("/patientProfile", middleware.isUserLoggedIn, (req, res) => {
      const session = this.session.getUserSession(req);
      this.UserModel.checkUserExist(session.userName)
        .then((user) => {
          session.locateStatus = user.locateStatus;
          // console.log(user)
          const data = Object.assign({}, session, {
            greeting: req.query.greeting
          });
          res.render("../../AdminLTE/pages/patientProfile", {
            hydrateData: JSON.stringify(data)
          });
        })
    });

    app.post("/patientProfile", middleware.isUserLoggedIn, (req, res) => {
      console.log(req.body);
    });

    app.post("/logout", (req, res) => {

      const session = this.session.getUserSession(req);
      res.redirect("/");
      incidentController.transferCommandOnLogout(session.userName);
      let newCommander = "";

      this.UserModel.getUserByName(session.userName).then(users => {
        const user = users[0];
        if (!user || user.role === 3) {
          return;
        }
        return this.UserModel.getAllFirstResponders();
      })
        .then((users) => {
          for (let i = 0; i < users.length; i++) {
            console.log(users[i].userName );
            if (users[i].userName !== session.userName) {
              newCommander = users[i].userName;
              break;
            }
          }
          newCommander = newCommander === "" ? "dfdispatcher" : newCommander;
          return this.IncidentModel.updateIncidentCommander(session.userName, newCommander);
        })
        .then(() => this.IncidentModel.findMyAssignedIncidents(newCommander))
        .then((incidents) => Promise.all(incidents.map((incident) =>
          this.GroupModel.updateIncidentGroup(incident._id))))
        .then(() => {
          this.UserModel.updateLocationVisibility(session.userName, false)
          this.session.deleteUserSession(req);
          res.redirect("/");
        });
      const NothingToDo = Symbol("NothingToDo");
      this.UserModel.getUserByName(session.userName)
        .then((user) => {
          if ([1, 4, 5, 6, 8].includes(user[0].role)) {
            return this.UserModel.unassignVehicle(user[0].userName);
          }
        })
        .then((user) => {
          console.log(user);
          if (user) {
            if ([1, 4, 5, 6, 8].includes(user.role)) {
              return this.CarsModel.unassignVehicle(user.userName);
            }
          }

        })
        .catch((e) => {
          if (e === NothingToDo) {
            return;
          }
          throw e;
        });
    });

    /* post */

    app.post("/login", (req, res, next) => {
      const userInfo = JSON.parse(req.body.userInfo);
      this.session.createUserSession(req, userInfo);
      this.UserModel.getAllDispatchers()
        .then((dispatchers) => {
          if (dispatchers.length === 0) {
            this.UserModel.createDefaultDispatcher("dfdispatcher", "dfdispatcher")
              .then((user) => {
                console.log("Successfully created a default dispatcher")
              })
          }
        });
      this.IncidentQuestionsModel.getAllQuestions()
        .then((questions) => {
          if (questions.length === 0) {
            this.IncidentQuestionsModel.createQuestions()
              .then((questions) => {
                // Default questions have been created
              })
          }
        });
      if (userInfo.process === "SIGNIN") {res.redirect("/home");} else {res.redirect("/home?greeting=true");}
    });

  }
};
