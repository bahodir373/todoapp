const { Router } = require("express");
const { getData, addData, deleteData, updateData } = require("../controller/data_controller");

const dataRouter = Router();

dataRouter.get("/get",getData);
dataRouter.post("/add_todo", addData);
dataRouter.delete("/delete_todo/:id",deleteData)
dataRouter.put("/update_todo/:id",updateData)

module.exports = dataRouter;