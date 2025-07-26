const request = require("supertest");
const app = require("../app");

describe("GET /api/blogs", () => {
  it("should return all blogs", async () => {
    const response = await request(app).get("/api/blogs");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
