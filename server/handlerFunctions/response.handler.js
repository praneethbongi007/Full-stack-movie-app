const responseWithData = (res, statusCode, data) =>
  res.status(statusCode).json(data);

const error = (err) =>
  responseWithData(err, 500, {
    status: 500,
    message: "Oops! something went wrong",
  });

const badRequest = (res, message) => {
  return responseWithData(res, 400, {
    status: 400,
    message: message,
  });
};

const ok = (res, data) => responseWithData(res, 200, data);

const created = (res, data) => responseWithData(res, 201, data);

const unauthorized = (res) =>
  responseWithData(res, 401, {
    status: 401,
    message: "Unauthorized",
  });

const notFound = (res) =>
  responseWithData(res, 404, {
    status: 400,
    message: "Data Not Found",
  });

export default {
  error,
  ok,
  created,
  badRequest,
  notFound,
  unauthorized,
};
