import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

// Reconstruct the original supplied certificate contact sheet after an interrupted
// binary transfer. Target is the Git blob SHA calculated from the original image.
const filename = 'src/assets/certificates-sheet.webp';
const expected = '147640289d0585f76a1e83cd82d4f5283b876f00';
const sha = bytes => createHash('sha1').update('blob ' + bytes.length + '\0').update(bytes).digest('hex');
const original = readFileSync(filename);
if (sha(original) === expected) {
  console.log('Certificate photograph verified.');
  process.exit(0);
}
const damaged = original.toString('base64').replace(/=+$/, '');
if (original.length !== 5891 || damaged.length !== 7855) {
  throw new Error('Unexpected certificate asset size. Refusing to modify it.');
}
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for (let position = 0; position <= damaged.length; position++) {
  const start = damaged.slice(0, position);
  const end = damaged.slice(position);
  for (const letter of alphabet) {
    const candidate = Buffer.from(start + letter + end, 'base64');
    if (candidate.length === 5892 && sha(candidate) === expected) {
      writeFileSync(filename, candidate);
      console.log('Restored and verified original certificate photograph.');
      process.exit(0);
    }
  }
}
throw new Error('Could not restore certificate image. No file was changed.');
