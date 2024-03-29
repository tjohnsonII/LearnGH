import assert from 'assert';
import { test } from 'tap';

test('that 1 is equal 1', (t) => { // Pass 't' as a parameter to the test function
  assert.strictEqual(1, 1);
  t.end(); // Call the 'end' method to signal the completion of the test
});

test('that throws as 1 is not equal 2', (t) => { // Pass 't' as a parameter to the test function
  assert.strictEqual(1, 2); // This should fail
  t.end(); // Call the 'end' method to signal the completion of the test
});

// node --experimental-modules ServerTest.mjs
 
