import makePrepareResponse from "./make-prepare-response";

const headers = { "Content-Type": "application/json" };

describe("prepare response for make callback helper", () => {
  describe("prod env", () => {
    const prepareResponse = makePrepareResponse({ nodeEnv: "prod" });

    describe("post", () => {
      it("success", () => {
        let input = { success: true, added: {} };
        let expected = {
          statusCode: 201,
          headers,
          body: { added: {}, success: true },
        };
        let result = prepareResponse(input);

        expect(result).toEqual(expected);
      });
      it("failure without errorCode", () => {
        let input = {
          success: false,
          statusCode: 400,
          message: "test error message",
          errors: { property1: { message: "test" } },
        };
        let expected = {
          statusCode: 400,
          headers,
          body: { success: false },
        };
        let result = prepareResponse(input);

        expect(result).toEqual(expected);
      });
      it("failure with simple  errorCode", () => {
        let input = {
          success: false,
          statusCode: 400,
          message: "test error message",
          errors: { property1: { message: "test" } },
          errorCode: "error-code",
        };
        let expected = {
          statusCode: 400,
          headers,
          body: { success: false, errorCode: "error-code" },
        };
        let result = prepareResponse(input);

        expect(result).toEqual(expected);
      });
      it("failure with nested  errorCode", () => {
        let input = {
          success: false,
          statusCode: 400,
          message: "test error message",
          errors: { property1: { message: "test", errorCode: "error-code" } },
        };
        let expected = {
          statusCode: 400,
          headers,
          body: { success: false, errorCode: "error-code" },
        };
        let result = prepareResponse(input);

        expect(result).toEqual(expected);
      });
      it("failure with both nested and simple  errorCode : should return the simple first", () => {
        let input = {
          success: false,
          statusCode: 400,
          message: "test error message",
          errors: {
            property1: { message: "test", errorCode: "nested-error-code" },
          },
          errorCode: "simple-error-code",
        };
        let expected = {
          statusCode: 400,
          headers,
          body: { success: false, errorCode: "simple-error-code" },
        };
        let result = prepareResponse(input);

        expect(result).toEqual(expected);
      });
    });
    describe("update", () => {
      it("success", () => {
        let input = { success: true, updated: {} };
        let expected = {
          statusCode: 200,
          headers,
          body: { updated: {}, success: true },
        };
        let result = prepareResponse(input);

        expect(result).toEqual(expected);
      });
    });
    describe("delete", () => {
      it("success", () => {
        let input = { success: true, deleted: {} };
        let expected = {
          statusCode: 200,
          headers,
          body: { deleted: {}, success: true },
        };
        let result = prepareResponse(input);

        expect(result).toEqual(expected);
      });
    });
    describe("list", () => {
      it("success", () => {
        let input = { success: true, found: [], count: 5 };
        let expected = {
          statusCode: 200,
          headers,
          body: { found: [], count: 5, success: true },
        };
        let result = prepareResponse(input);

        expect(result).toEqual(expected);
      });
    });
  });
});
