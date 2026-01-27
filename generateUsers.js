import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const USERS_COUNT = 10; // change as needed
const SALT_ROUNDS = 10;

async function main() {
  const users = [];

  for (let i = 1; i <= USERS_COUNT; i++) {
    const plainPassword = `user${i}`;

    const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);

    users.push({
      email: faker.internet.email(),
      username: faker.internet.username(), // ✅ realistic usernames
      age: faker.number.int({ min: 18, max: 60 }),
      password: hashedPassword,
    });
  }

  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
  console.log('✅ users.json created with realistic usernames');
}

main();
