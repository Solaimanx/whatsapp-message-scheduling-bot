const {
  createSchedule,
  getAllSchedule,
  editSchedule,
  deleteSchedule,
} = require("../db/schedule");
const {
  deleteCornSchedule,
  deleteAndReschedule,
  createSingleSchedule,
} = require("../utils/schedule/deleteAndReschedule");

const ScheduleController = {
  getAll: async (req, res) => {
    const { type } = req.params;

    const allSchedule = await getAllSchedule(type);
    return res.send(allSchedule);
  },

  create: async (req, res) => {
    const scheduleGroup = await createSchedule(req.body);

    createSingleSchedule(scheduleGroup);

    return res.send(scheduleGroup);
  },

  edit: async (req, res) => {
    const editedSchedule = await editSchedule(req.body);

    deleteAndReschedule(editedSchedule);

    return res.send(editedSchedule);
  },
  delete: async (req, res) => {
    const { id } = req.body;

    const result = await deleteSchedule(id);
    const scheduleName = result._id.toString();

    deleteCornSchedule(scheduleName);

    return res.send(result);
  },
};

module.exports = ScheduleController;
