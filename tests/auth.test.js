const request = require("supertest");
const app = require("../app");

describe("POST /api/register", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/register")
      .send({
        name: "Test User",
        email: `testuser${Date.now()}@mail.com`,
        password: "password123",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});
