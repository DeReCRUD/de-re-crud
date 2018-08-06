import formPathToValue from "./form-path-to-value";

describe("formPathToValue", () => {
  it("should return value from object path", () => {
    const value = {
      parent: {
        child: {
          value: 1
        }
      }
    };

    expect(formPathToValue(value, "parent.child.value")).toBe(1);
  });

  it("should return value from array path", () => {
    const value = {
      parent: {
        child: {
          array: [{ value: 1 }]
        }
      }
    };

    expect(formPathToValue(value, "parent.child.array.0.value")).toBe(1);
  });
});
