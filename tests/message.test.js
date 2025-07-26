// tests/message.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/chats/send/", () => {
  it("should send a message", async () => {
    const response = await request(app)
      .post("/api/chats/sendMessage")
      .send({
        sender: "Gowtham",
        message: "Test auto message",
        timestamp: new Date().toISOString(),
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
