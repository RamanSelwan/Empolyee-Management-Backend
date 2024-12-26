const User = require("../modals/User");

const createEmployee = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      name,
      position,
      department,
      salary,
      email,
      phone,
      address,
      dateOfJoining,
      dateOfBirth,
    } = req.body;

    // Validate the input data
    if (
      !name ||
      !position ||
      !department ||
      !salary ||
      !email ||
      !phone ||
      !address ||
      !dateOfJoining ||
      !dateOfBirth
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (name, position, department, salary, email, phone, address, dateOfJoining, dateOfBirth) are required.",
      });
    }

    // Check if email or phone already exists in the database
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An employee with this email or phone number already exists.",
      });
    }

    // Create a new employee object
    const employee = new User({
      name,
      position,
      department,
      salary,
      email,
      phone,
      address,
      dateOfJoining: new Date(dateOfJoining), // Ensure date format
      dateOfBirth: new Date(dateOfBirth), // Ensure date format
    });

    // Save the employee to the database
    const savedEmployee = await employee.save();

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Employee created successfully.",
      data: savedEmployee,
    });
  } catch (error) {
    // Log the error and send a response
    console.error("Error creating employee:", error);
    res.status(500).json({
      success: false,
      message:
        error.message || "An error occurred while creating the employee.",
    });
  }
};

const fetchAllEmployees = async (req, res) => {
  try {
    const employees = await User.find();
    res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while fetching employees.",
    });
  }
};

const fetchEmployeeById = async (req, res) => {
  try {
    const employee = await User.findById(req.params.employeeId);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    } else {
      res.status(200).json({ success: true, employee });
    }
    //   res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({
      success: false,
      message:
        error.message || "An error occurred while fetching the employee.",
    });
  }
};
const updateEmployee = async (req, res) => {
    try {
      const { employeeId } = req.params;
  
      // Check if the request body is not empty
      if (!req.body || Object.keys(req.body).length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Request body is empty." });
      }
  
      // Update the employee using `findByIdAndUpdate`
      const updatedEmployee = await User.findByIdAndUpdate(
        employeeId,
        { $set: req.body }, // Use `$set` to ensure only provided fields are updated
        { new: true, runValidators: true } // Return the updated document and validate
      );
  
      // If employee not found
      if (!updatedEmployee) {
        return res
          .status(404)
          .json({ success: false, message: "Employee not found." });
      }
  
      // Respond with success
      res.status(200).json({
        success: true,
        message: "Employee updated successfully.",
        data: updatedEmployee,
      });
    } catch (error) {
      // Log and respond with error
      console.error("Error updating employee:", error);
      res.status(500).json({
        success: false,
        message: error.message || "An error occurred while updating the employee.",
      });
    }
  };
  
const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await User.findByIdAndDelete(req.params.employeeId);
    if (!deletedEmployee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({
      success: false,
      message:
        error.message || "An error occurred while deleting the employee.",
    });
  }
};
module.exports = {
  createEmployee,
  fetchAllEmployees,
  fetchEmployeeById,
  updateEmployee,
  deleteEmployee,
};
