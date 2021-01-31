exports.requiredFields = (req, res, next) => {
  let { rule, data } = req.body;

  const isAnObject = (field) => {
    if (typeof field === "object" && !isArray(field)) {
      return true;
    } else {
      return false;
    }
  };

  if (!rule && !data) {
    return res.json({
      message: "rule and data is required.",
      status: "error",
      data: null,
    });
  } else if (!rule && data) {
    return res.json({
      message: "rule is required.",
      status: "error",
      data: null,
    });
  } else if (!data && rule) {
    return res.json({
      message: "data is required.",
      status: "error",
      data: null,
    });
  } else {
    next();
  }
};

exports.isRuleValid = (req, res, next) => {
  const { rule } = req.body;

  if (typeof rule === "object") {
    next();
  } else {
    return res.status(400).json({
      message: "rule should be an object.",
      status: "error",
      data: null,
    });
  }
};

exports.isDataValid = (req, res, next) => {
  const { data } = req.body;

  if (typeof data === "object" || "string" || "array") {
    next();
    // return res.json({
    //     message: 'Hi'
    // });
  } else {
    return res.status(400).json({
      message: "Invalid JSON payload passed.",
      status: "error",
      data: null,
    });
  }
};

exports.requiredRuleFields = (req, res, next) => {
  const { rule } = req.body;
  const ruleKeys = Object.keys(rule);
  const selectFields = ["field", "condition", "condition_value"];

  function validRuleFields(inputArray, fixedArray) {
    const inputArrayLen = inputArray.length;
    const fixedArrayLen = fixedArray.length;

    if (fixedArrayLen <= inputArrayLen) {
      for (let i = 0; i < fixedArrayLen; i++) {
        if (!(inputArray.indexOf(fixedArray[i]) >= 0)) {
          return false;
        }
      }
    } else {
      return false;
    }
    return true;
  }

  validRuleFields(ruleKeys, selectFields);

  if (validRuleFields) {
    const subtractArrays = (arrayOne, arrayTwo) => {
      for (i in arrayTwo) {
        let index = arrayOne.indexOf(arrayTwo[i]);
        if (index != -1) {
          arrayOne.splice([index], 1);
        }
      }

      return arrayOne;
    };

    const getDifference = subtractArrays(selectFields, ruleKeys);

    if (getDifference.length) {
      return res.status(400).json({
        message: `field ${getDifference.join(",")} is missing from data.`,
        status: "error",
        data: null,
      });
    } else {
      next();
      // return res.json({
      //     message: 'Hi'
      // });
    }
  } else {
    return res.status(400).json({
      message: "Invalid JSON payload passed.",
      status: "error",
      data: null,
    });
  }
};

exports.conditionChecker = (req, res, next) => {
  const {
    rule: { field, condition, condition_value },
  } = req.body;
  const field_value = req.body.data[field] || req.body.data;
  if (condition == "eq") {
    if (field_value == condition_value) {
      return res.json({
        status_code: 200,
        data: {
          message: `field ${field} successfully validated.`,
          status: "success",
          data: {
            validation: {
              error: false,
              field: field,
              field_value: field_value,
              condition: condition,
              condition_value: condition_value,
            },
          },
        },
      });
    } else {
      return res.json({
        status_code: 400,
        data: {
          message: `field ${field} failed validation.`,
          status: "error",
          data: {
            validation: {
              error: true,
              field: field,
              field_value: field_value,
              condition: condition,
              condition_value: condition_value,
            },
          },
        },
      });
    }
  }

  if (condition == "neq") {
    if (field_value != condition_value) {
      return res.json({
        status_code: 200,
        data: {
          message: `field ${field} successfully validated.`,
          status: "success",
          data: {
            validation: {
              error: false,
              field: field,
              field_value: field_value,
              condition: condition,
              condition_value: condition_value,
            },
          },
        },
      });
    } else {
      return res.json({
        status_code: 400,
        data: {
          message: `field ${field} failed validation.`,
          status: "error",
          data: {
            validation: {
              error: true,
              field: field,
              field_value: field_value,
              condition: condition,
              condition_value: condition_value,
            },
          },
        },
      });
    }
  }
  if (condition == "gt") {
    if (field_value > condition_value) {
      return res.json({
        status_code: 200,
        data: {
          message: `field ${field} successfully validated.`,
          status: "success",
          data: {
            validation: {
              error: false,
              field: field,
              field_value: field_value,
              condition: condition,
              condition_value: condition_value,
            },
          },
        },
      });
    } else {
      return res.json({
        status_code: 400,
        data: {
          message: `field ${field} failed validation.`,
          status: "error",
          data: {
            validation: {
              error: true,
              field: field,
              field_value: field_value,
              condition: condition,
              condition_value: condition_value,
            },
          },
        },
      });
    }
  }

  if (condition == "gte") {
    if (field_value >= condition_value) {
      return res.json({
        status_code: 200,
        data: {
          message: `field ${field} successfully validated.`,
          status: "success",
          data: {
            validation: {
              error: false,
              field: field,
              field_value: field_value,
              condition: condition,
              condition_value: condition_value,
            },
          },
        },
      });
    } else {
      return res.json({
        status_code: 400,
        data: {
          message: `field ${field} failed validation.`,
          status: "error",
          data: {
            validation: {
              error: true,
              field: field,
              field_value: field_value,
              condition: condition,
              condition_value: condition_value,
            },
          },
        },
      });
    }
  }

  if (condition == "contains") {
    if (
      parseInt(field) < field_value.length &&
      field_value.includes(condition_value)
    ) {
      return res.json({
        status_code: 200,
        data: {
          message: `field ${field} successfully validated.`,
          status: "success",
          data: {
            validation: {
              error: false,
              field: field,
              field_value: field_value,
              condition: condition,
              condition_value: condition_value,
            },
          },
        },
      });
    } else {
      return res.json({
        status_code: 400,
        data: {
          message: `field ${field} failed validation.`,
          status: "error",
          data: {
            validation: {
              error: true,
              field: field,
              field_value: field_value,
              condition: condition,
              condition_value: condition_value,
            },
          },
        },
      });
    }
  }
};
