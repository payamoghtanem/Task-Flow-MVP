require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function parseMigration(sql) {
  const upMatch = sql.match(/-- migrate:up([\s\S]*?)(?=-- migrate:down|$)/);
  const downMatch = sql.match(/-- migrate:down([\s\S]*?)$/);
  return {
    up: upMatch ? upMatch[1].trim() : null,
    down: downMatch ? downMatch[1].trim() : null,
  };
}

async function run(direction = 'up') {
  const migrationsDir = path.join(__dirname, 'migrations');
  let files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith('.sql')).sort();

  if (direction === 'down') files = files.reverse();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    const { up, down } = parseMigration(sql);
    const section = direction === 'up' ? up : down;

    if (!section) {
      console.warn(`[migrate] No ${direction} section in ${file} — skipping`);
      continue;
    }

    console.log(`[migrate:${direction}] ${file}`);
    await pool.query(section);
    console.log(`[migrate:${direction}] ✓ ${file}`);
  }

  await pool.end();
}

const direction = process.argv[2] === 'down' ? 'down' : 'up';
run(direction).catch((err) => {
  console.error('[migrate] FAILED:', err.message);
  pool.end().finally(() => process.exit(1));
});
