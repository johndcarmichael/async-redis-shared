import connect from '../connect';

it('should connect', async (done) => {
  await connect();
  done();
});

it('should be able to now set', async () => {
  const client = require('../client').default();
  const now = new Date().getTime();
  await client.set('key:unittest', String(now));
  const fetchedVal = await client.get('key:unittest');
  expect(fetchedVal).toBe(String(now));
});

it('should be able to now set json and fetch json as proper object', async () => {
  const client = require('../client').default();
  const objectA = {
    name: 'bob'
  };
  await client.setJson('key:unittest', objectA);
  const fetchedVal = await client.getJson('key:unittest');
  expect(fetchedVal).toEqual(objectA);
});

