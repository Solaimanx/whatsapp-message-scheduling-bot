const Schedule = require("../model/schedule");

const createSchedule = async (body) => {
  const newSchedule = await Schedule.create({ ...body });
  return newSchedule;
};

const editSchedule = async (body) => {
  const { id, ...restOfField } = body;

  const singleSchedule = await Schedule.findOneAndUpdate(
    { _id: id },
    { ...restOfField },
    { new: true }
  );

  return singleSchedule;
};

const getAllSchedule = async (type) => {
  const filter = {};

  if (type == "upcomming") {
    filter.status = "pending";
  }

  if (type == "failed") {
    filter.status = "failed";
  }

  const allSchedule = await Schedule.find({ ...filter }).sort({
    date: 1,
  });
  return allSchedule;
};

const deleteSchedule = async (id) => {
  const result = await Schedule.findByIdAndRemove(id);
  return result;
};

const updateStateToSuccess = async (id) => {
  const singleSchedule = await Schedule.findOneAndUpdate(
    { _id: id },
    {
      status: "success",
    },
    { new: true }
  );
  return singleSchedule;
};

const updateStateToFailed = async (id, notes) => {
  const feilds = {
    status: "failed",
  };

  if (notes) {
    feilds.notes = notes;
  }

  const singleSchedule = await Schedule.findOneAndUpdate(
    { _id: id },
    {
      ...feilds,
    },
    { new: true }
  );
  return singleSchedule;
};

module.exports = {
  createSchedule,
  getAllSchedule,
  deleteSchedule,
  editSchedule,
  updateStateToSuccess,
  updateStateToFailed,
};
