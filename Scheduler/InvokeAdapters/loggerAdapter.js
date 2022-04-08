const apiAdapter = require('./apiAdapter');
const {
  BaseURL_LoggerAdapterAPI
} = require('../config/config.json')[process.env.NODE_ENV];
const LoggerAdapter = function () {};

const api = apiAdapter(BaseURL_LoggerAdapterAPI);

LoggerAdapter.trace = function (params) {
  const options = {
    headers: {
      'TraceID': params.TraceID
    }
  };
  api.post('/logger/trace', {
    LogMessage: {
      Service: params.Service,
      Message: params.Message
    }
  }, options).catch(function (error) {
    console.log(error);
  });
};
LoggerAdapter.info = function (params) {
  const options = {
    headers: {
      'TraceID': params.TraceID
    }
  };
  api.post('/logger/info', {
    LogMessage: {
      Service: params.Service,
      Message: params.Message
    }

  }, options).catch(function (error) {
    console.log(error);
  });
};
LoggerAdapter.debug = function (params) {
  const options = {
    headers: {
      'TraceID': params.TraceID
    }
  };
  api.post('/logger/debug', {
    LogMessage: {
      Service: params.Service,
      Message: params.Message
    }
  }, options).catch(function (error) {
    console.log(error);
  });
};
LoggerAdapter.warn = function (params) {
  const options = {
    headers: {
      'TraceID': params.TraceID
    }
  };
  api.post('/logger/warn', {
    LogMessage: {
      Service: params.Service,
      Message: params.Message
    }
  }, options).catch(function (error) {
    console.log(error);
  });
};
LoggerAdapter.error = function (params) {
  const options = {
    headers: {
      'TraceID': params.TraceID
    }
  };
  api.post('/logger/error', {
    LogMessage: {
      Service: params.Service,
      Message: params.Message
    }
  }, options).catch(function (error) {
    console.log(error);
  });
};
LoggerAdapter.fatal = function (params) {
  const options = {
    headers: {
      'TraceID': params.TraceID
    }
  };
  api.post('/logger/fatal', {
    LogMessage: {
      Service: params.Service,
      Message: params.Message
    }
  }, options).catch(function (error) {
    console.log(error);
  });
};

exports.LoggerAdapter = LoggerAdapter;