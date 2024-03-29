import { test, expect } from "@playwright/test";
import { VerifyLoginApi } from "../client/VerifyLoginApi";

test.describe.parallel("/api/verifylogin", () => {
  test("POST with correct credentials returns user exists", async ({
    request,
  }) => {
    const api = new VerifyLoginApi(request);

    const response = await api.Post({
      email: "testUser@QA.com",
      password: "test1234",
    });

    expect(response.body).toEqual({
      responseCode: 200,
      message: "User exists!",
    });
  });

  test("POST with incorrect credentials returns user not found", async ({
    request,
  }) => {
    const api = new VerifyLoginApi(request);

    const response = await api.Post({
      email: "doesnotexist@QA.com",
      password: "test1234",
    });

    expect(response.body).toEqual({
      responseCode: 404,
      message: "User not found!",
    });
  });

  test("POST without email credential returns bad request", async ({
    request,
  }) => {
    const api = new VerifyLoginApi(request);

    const response = await api.Post({
      password: "test1234",
    });

    expect(response.body).toEqual({
      responseCode: 400,
      message:
        "Bad request, email or password parameter is missing in POST request.",
    });
  });

  test("Delete returns unsupported method", async ({ request }) => {
    const api = new VerifyLoginApi(request);

    const response = await api.Delete();

    expect(response.body).toEqual({
      responseCode: 405,
      message: "This request method is not supported.",
    });
  });
});
