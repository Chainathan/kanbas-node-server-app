import Database from "../Database/index.js";
function AssignmentRoutes(app) {
  app.get("/api/assignments", (req, res) => {
    const assignments = Database.assignments;
    res.json(assignments);
  });
  app.get("/api/courses/:id/assignments", (req, res) => {
    const { id } = req.params;
    const assignments = Database.assignments.filter(
      (assignment) => assignment.course === id
    );
    res.json(assignments);
  });
  app.get("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const assignment = Database.assignments.find(
      (assignment) => assignment._id === id
    );
    if (!assignment) {
      res.status(404).send("Module not found");
      return;
    }
    res.json(assignment);
  });
  app.delete("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    Database.assignments = Database.assignments.filter((a) => a._id !== id);
    res.sendStatus(200);
  });
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const newAssignment = {
      ...req.body,
      course: req.params.cid,
      _id: new Date().getTime().toString(),
    };
    Database.assignments.unshift(newAssignment);
    res.json(newAssignment);
  });
  app.put("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    Database.assignments = Database.assignments.map((assignment) =>
      assignment._id === id ? { ...assignment, ...req.body } : assignment
    );
    res.sendStatus(204);
  });
}
export default AssignmentRoutes;
