const request = require("supertest");
const app = require("../app");

describe("GET /api/downloads", () => {
  it("should return all downloads", async () => {
    const response = await request(app).get("/api/downloads");
    expect(response.statusCode).toBe(200);
  });
});
