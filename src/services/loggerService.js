class LoggerService {}

const mockLogger = {
  log: () => {},
  warn: () => {},
  error: () => {},
};

export const logger = process.env.NODE_ENV === 'test' ? mockLogger : console;

export default LoggerService;
