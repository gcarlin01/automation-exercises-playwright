import { test, expect } from "@playwright/test";
import { ProductsListApi } from "../client/ProductsListApi";

test.describe.parallel("/api/productsList", () => {
  test("GET returns all products", async ({ request }) => {
    const api = new ProductsListApi(request);
    const response = await api.Get();

    expect(response.status).toBe(200);
    expect(response.body.products.length).toBeGreaterThan(30);
  });

  test("POST returns unsupported method", async ({ request }) => {
    const api = new ProductsListApi(request);
    const response = await api.Post();

    const expectedBody = {
      responseCode: 405,
      message: "This request method is not supported.",
    };
    expect(response.body).toEqual(expectedBody);
  });
});
