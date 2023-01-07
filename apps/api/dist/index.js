"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_express = __toESM(require("express"));
var import_trpc = require("@gzlt/trpc");

// ../../node_modules/@trpc/server/dist/TRPCError-7de0a793.mjs
function getMessageFromUnknownError(err, fallback) {
  if (typeof err === "string") {
    return err;
  }
  if (err instanceof Error && typeof err.message === "string") {
    return err.message;
  }
  return fallback;
}
function getErrorFromUnknown(cause) {
  if (cause instanceof Error) {
    return cause;
  }
  const message = getMessageFromUnknownError(cause, "Unknown error");
  return new Error(message);
}
function getTRPCErrorFromUnknown(cause) {
  const error = getErrorFromUnknown(cause);
  if (error.name === "TRPCError") {
    return cause;
  }
  const trpcError = new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    cause: error,
    message: error.message
  });
  trpcError.stack = error.stack;
  return trpcError;
}
function getCauseFromUnknown(cause) {
  if (cause instanceof Error) {
    return cause;
  }
  return void 0;
}
var TRPCError = class extends Error {
  constructor(opts) {
    var _a2;
    const code = opts.code;
    const message = (_a2 = opts.message) != null ? _a2 : getMessageFromUnknownError(opts.cause, code);
    const cause = opts.cause !== void 0 ? getErrorFromUnknown(opts.cause) : void 0;
    super(message, {
      cause
    });
    this.code = code;
    this.cause = cause;
    this.name = "TRPCError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
};

// ../../node_modules/@trpc/server/dist/codes-52c11119.mjs
function invert(obj) {
  const newObj = /* @__PURE__ */ Object.create(null);
  for (const key in obj) {
    const v = obj[key];
    newObj[v] = key;
  }
  return newObj;
}
var TRPC_ERROR_CODES_BY_KEY = {
  PARSE_ERROR: -32700,
  BAD_REQUEST: -32600,
  INTERNAL_SERVER_ERROR: -32603,
  UNAUTHORIZED: -32001,
  FORBIDDEN: -32003,
  NOT_FOUND: -32004,
  METHOD_NOT_SUPPORTED: -32005,
  TIMEOUT: -32008,
  CONFLICT: -32009,
  PRECONDITION_FAILED: -32012,
  PAYLOAD_TOO_LARGE: -32013,
  TOO_MANY_REQUESTS: -32029,
  CLIENT_CLOSED_REQUEST: -32099
};
var TRPC_ERROR_CODES_BY_NUMBER = invert(TRPC_ERROR_CODES_BY_KEY);

// ../../node_modules/@trpc/server/dist/config-4ca0221b.mjs
var TRPC_ERROR_CODES_BY_NUMBER2 = invert(TRPC_ERROR_CODES_BY_KEY);
var JSONRPC2_TO_HTTP_CODE = {
  PARSE_ERROR: 400,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  TIMEOUT: 408,
  CONFLICT: 409,
  CLIENT_CLOSED_REQUEST: 499,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  METHOD_NOT_SUPPORTED: 405,
  TOO_MANY_REQUESTS: 429
};
function getStatusCodeFromKey(code) {
  var _a2;
  return (_a2 = JSONRPC2_TO_HTTP_CODE[code]) != null ? _a2 : 500;
}
function getHTTPStatusCode(json) {
  const arr = Array.isArray(json) ? json : [
    json
  ];
  const httpStatuses = new Set(arr.map((res) => {
    if ("error" in res) {
      const data = res.error.data;
      if (typeof data.httpStatus === "number") {
        return data.httpStatus;
      }
      const code = TRPC_ERROR_CODES_BY_NUMBER2[res.error.code];
      return getStatusCodeFromKey(code);
    }
    return 200;
  }));
  if (httpStatuses.size !== 1) {
    return 207;
  }
  const httpStatus = httpStatuses.values().next().value;
  return httpStatus;
}
function callProcedure(opts) {
  var _a2;
  const { type, path } = opts;
  if (!(path in opts.procedures) || !((_a2 = opts.procedures[path]) == null ? void 0 : _a2._def[type])) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `No "${type}"-procedure on path "${path}"`
    });
  }
  const procedure = opts.procedures[path];
  return procedure(opts);
}
var _a, _b, _c, _d;
var isServerDefault = typeof window === "undefined" || "Deno" in window || ((_b = (_a = globalThis.process) == null ? void 0 : _a.env) == null ? void 0 : _b.NODE_ENV) === "test" || !!((_d = (_c = globalThis.process) == null ? void 0 : _c.env) == null ? void 0 : _d.JEST_WORKER_ID);

// ../../node_modules/@trpc/server/dist/transformTRPCResponse-7a73a2df.mjs
function transformTRPCResponseItem(router, item) {
  if ("error" in item) {
    return __spreadProps(__spreadValues({}, item), {
      error: router._def._config.transformer.output.serialize(item.error)
    });
  }
  if ("data" in item.result) {
    return __spreadProps(__spreadValues({}, item), {
      result: __spreadProps(__spreadValues({}, item.result), {
        data: router._def._config.transformer.output.serialize(item.result.data)
      })
    });
  }
  return item;
}
function transformTRPCResponse(router, itemOrItems) {
  return Array.isArray(itemOrItems) ? itemOrItems.map((item) => transformTRPCResponseItem(router, item)) : transformTRPCResponseItem(router, itemOrItems);
}

// ../../node_modules/@trpc/server/dist/resolveHTTPResponse-b831e644.mjs
var HTTP_METHOD_PROCEDURE_TYPE_MAP = {
  GET: "query",
  POST: "mutation"
};
function getRawProcedureInputOrThrow(req) {
  try {
    if (req.method === "GET") {
      if (!req.query.has("input")) {
        return void 0;
      }
      const raw = req.query.get("input");
      return JSON.parse(raw);
    }
    if (typeof req.body === "string") {
      return req.body.length === 0 ? void 0 : JSON.parse(req.body);
    }
    return req.body;
  } catch (err) {
    throw new TRPCError({
      code: "PARSE_ERROR",
      cause: getCauseFromUnknown(err)
    });
  }
}
async function resolveHTTPResponse(opts) {
  var _a2, _b2, _c2;
  const { createContext: createContext2, onError, router, req } = opts;
  const batchingEnabled = (_b2 = (_a2 = opts.batching) == null ? void 0 : _a2.enabled) != null ? _b2 : true;
  if (req.method === "HEAD") {
    return {
      status: 204
    };
  }
  const type = (_c2 = HTTP_METHOD_PROCEDURE_TYPE_MAP[req.method]) != null ? _c2 : "unknown";
  let ctx = void 0;
  let paths = void 0;
  const isBatchCall = !!req.query.get("batch");
  function endResponse(untransformedJSON, errors) {
    var _a3, _b3, _c3;
    let status = getHTTPStatusCode(untransformedJSON);
    const headers = {
      "Content-Type": "application/json"
    };
    const meta = (_b3 = (_a3 = opts.responseMeta) == null ? void 0 : _a3.call(opts, {
      ctx,
      paths,
      type,
      data: Array.isArray(untransformedJSON) ? untransformedJSON : [
        untransformedJSON
      ],
      errors
    })) != null ? _b3 : {};
    for (const [key, value] of Object.entries((_c3 = meta.headers) != null ? _c3 : {})) {
      headers[key] = value;
    }
    if (meta.status) {
      status = meta.status;
    }
    const transformedJSON = transformTRPCResponse(router, untransformedJSON);
    const body = JSON.stringify(transformedJSON);
    return {
      body,
      status,
      headers
    };
  }
  try {
    if (opts.error) {
      throw opts.error;
    }
    if (isBatchCall && !batchingEnabled) {
      throw new Error(`Batching is not enabled on the server`);
    }
    if (type === "subscription") {
      throw new TRPCError({
        message: "Subscriptions should use wsLink",
        code: "METHOD_NOT_SUPPORTED"
      });
    }
    if (type === "unknown") {
      throw new TRPCError({
        message: `Unexpected request method ${req.method}`,
        code: "METHOD_NOT_SUPPORTED"
      });
    }
    const rawInput = getRawProcedureInputOrThrow(req);
    paths = isBatchCall ? opts.path.split(",") : [
      opts.path
    ];
    ctx = await createContext2();
    const deserializeInputValue = (rawValue) => {
      return typeof rawValue !== "undefined" ? router._def._config.transformer.input.deserialize(rawValue) : rawValue;
    };
    const getInputs = () => {
      if (!isBatchCall) {
        return {
          0: deserializeInputValue(rawInput)
        };
      }
      if (rawInput == null || typeof rawInput !== "object" || Array.isArray(rawInput)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: '"input" needs to be an object when doing a batch call'
        });
      }
      const input = {};
      for (const key in rawInput) {
        const k = key;
        const rawValue = rawInput[k];
        const value = deserializeInputValue(rawValue);
        input[k] = value;
      }
      return input;
    };
    const inputs = getInputs();
    const rawResults = await Promise.all(paths.map(async (path, index) => {
      const input = inputs[index];
      try {
        const output = await callProcedure({
          procedures: router._def.procedures,
          path,
          rawInput: input,
          ctx,
          type
        });
        return {
          input,
          path,
          data: output
        };
      } catch (cause) {
        const error = getTRPCErrorFromUnknown(cause);
        onError == null ? void 0 : onError({
          error,
          path,
          input,
          ctx,
          type,
          req
        });
        return {
          input,
          path,
          error
        };
      }
    }));
    const errors = rawResults.flatMap((obj) => obj.error ? [
      obj.error
    ] : []);
    const resultEnvelopes = rawResults.map((obj) => {
      const { path, input } = obj;
      if (obj.error) {
        return {
          error: router.getErrorShape({
            error: obj.error,
            type,
            path,
            input,
            ctx
          })
        };
      } else {
        return {
          result: {
            data: obj.data
          }
        };
      }
    });
    const result = isBatchCall ? resultEnvelopes : resultEnvelopes[0];
    return endResponse(result, errors);
  } catch (cause) {
    const error = getTRPCErrorFromUnknown(cause);
    onError == null ? void 0 : onError({
      error,
      path: void 0,
      input: void 0,
      ctx,
      type,
      req
    });
    return endResponse({
      error: router.getErrorShape({
        error,
        type,
        path: void 0,
        input: void 0,
        ctx
      })
    }, [
      error
    ]);
  }
}

// ../../node_modules/@trpc/server/dist/nodeHTTPRequestHandler-34404221.mjs
async function getPostBody(opts) {
  const { req, maxBodySize = Infinity } = opts;
  return new Promise((resolve) => {
    if ("body" in req) {
      resolve({
        ok: true,
        data: req.body
      });
      return;
    }
    let body = "";
    let hasBody = false;
    req.on("data", function(data) {
      body += data;
      hasBody = true;
      if (body.length > maxBodySize) {
        resolve({
          ok: false,
          error: new TRPCError({
            code: "PAYLOAD_TOO_LARGE"
          })
        });
        req.socket.destroy();
      }
    });
    req.on("end", () => {
      resolve({
        ok: true,
        data: hasBody ? body : void 0
      });
    });
  });
}
async function nodeHTTPRequestHandler(opts) {
  var _a2;
  const createContext2 = async function _createContext() {
    var _a3;
    return await ((_a3 = opts.createContext) == null ? void 0 : _a3.call(opts, opts));
  };
  const { path, router } = opts;
  const bodyResult = await getPostBody(opts);
  const query = opts.req.query ? new URLSearchParams(opts.req.query) : new URLSearchParams(opts.req.url.split("?")[1]);
  const req = {
    method: opts.req.method,
    headers: opts.req.headers,
    query,
    body: bodyResult.ok ? bodyResult.data : void 0
  };
  const result = await resolveHTTPResponse({
    batching: opts.batching,
    responseMeta: opts.responseMeta,
    path,
    createContext: createContext2,
    router,
    req,
    error: bodyResult.ok ? null : bodyResult.error,
    onError(o) {
      var _a3;
      (_a3 = opts == null ? void 0 : opts.onError) == null ? void 0 : _a3.call(opts, __spreadProps(__spreadValues({}, o), {
        req: opts.req
      }));
    }
  });
  const { res } = opts;
  if ("status" in result && (!res.statusCode || res.statusCode === 200)) {
    res.statusCode = result.status;
  }
  for (const [key, value] of Object.entries((_a2 = result.headers) != null ? _a2 : {})) {
    if (typeof value === "undefined") {
      continue;
    }
    res.setHeader(key, value);
  }
  res.end(result.body);
}

// ../../node_modules/@trpc/server/dist/adapters/express.mjs
function createExpressMiddleware(opts) {
  return async (req, res) => {
    const endpoint = req.path.slice(1);
    await nodeHTTPRequestHandler(__spreadProps(__spreadValues({}, opts), {
      req,
      res,
      path: endpoint
    }));
  };
}

// src/index.ts
var app = (0, import_express.default)();
app.use(
  "/trpc",
  createExpressMiddleware({
    router: import_trpc.appRouter,
    createContext: import_trpc.createContext
  })
);
var PORT = 3e3;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} \u26A1`);
});
