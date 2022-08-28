const { Router } = require("express");

const router = Router();
const ScheduleController = require("./controller/schedule");
const GroupController = require('./controller/group')
const UserController = require('./controller/user')
const ContactsController = require('./controller/Contacts')


// Get all Schedule
router.get("/schedule/:type", ScheduleController.getAll);
// create
router.post("/schedule/create", ScheduleController.create);
// Edit
router.put("/schedule/edit", ScheduleController.edit);
// Get delete
router.delete("/schedule/delete", ScheduleController.delete);

// add raw Group name
router.get('/get-raw-group', GroupController.getRawGroup)
router.put('/update-raw-group', GroupController.updateold)

// get Group with whatsappId
router.get('/status', GroupController.status)
router.get('/group-list', GroupController.getGroupList)
router.post('/group/add',GroupController.add)
router.post('/group/update',GroupController.update)
router.delete('/group/delete',GroupController.delete)
router.get('/group/link',GroupController.getlink)



// status check

// Login
router.post('/user/login', UserController.login)
router.put('/user/update', UserController.update)

// contact
router.get('/contacts',ContactsController.getAll)
router.get('/contacts/update',ContactsController.update)
router.post('/contacts/add',ContactsController.add)
router.delete('/contacts/delete',ContactsController.delete)






// whatsapp link
router.get("/whatsapplink", async (req, res) => {
  res.send("echo ");
});

// whatsapp update View
router.get("/whatsapplink", async (req, res) => {
  res.send("echo ");
});

// add new Group
// refresh with new group

module.exports = router;
