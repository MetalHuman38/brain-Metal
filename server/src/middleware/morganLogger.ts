import morgan from "morgan";

morgan(':method :url :status :res[content-length] - :response-time ms')

morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
})

morgan('combined', {
    skip: function (req, res) { return res.statusCode < 400 }
})

morgan('tiny', {
    skip: function (req, res) { return res.statusCode >= 400 }
})

export default morgan;