const express = require("express");
const router = express.Router();
const {createEmployee,fetchAllEmployees,fetchEmployeeById,updateEmployee,deleteEmployee} = require("../controllers/EmployeeController");

// Fix: Correctly reference the controller methods

// routes.get("/", EmployeeController);

router.post("/", createEmployee);

router.get("/", fetchAllEmployees);
router.get("/:employeeId", fetchEmployeeById);
router.put("/:employeeId", updateEmployee);
router.delete("/:employeeId", deleteEmployee);

module.exports = router;
