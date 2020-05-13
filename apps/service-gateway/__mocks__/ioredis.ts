const IORedis = jest.genMockFromModule<any>('ioredis');
module.exports = IORedis;
const map = {};
IORedis.prototype.hset = function(namespace: string, key: string, value: any) {
  map[`${namespace}_${key}`] = value;
};

IORedis.prototype.hget = function(namespace: string, key: string) {
  return map[`${namespace}_${key}`];
};
