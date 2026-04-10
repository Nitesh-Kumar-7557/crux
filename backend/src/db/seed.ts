import pool from "./index.js";
import bcrypt from 'bcrypt';

const seed = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // ============================================================
    // USERS
    // ============================================================
    const password = "secret";
    const hashedPassword = await bcrypt.hash(password, 10);

    const usersResult = await client.query(`
      INSERT INTO users (name, username, email, hashed_password, role)
      VALUES
        ('Nitesh Kumar',   'nitesh_dev',    'nitesh@example.com',  $1, 'admin'),
        ('Vector Shift',   'vector_shift',  'vector@example.com',  $1, 'user'),
        ('Logic Lord',     'logic_lord',    'logic@example.com',   $1, 'user'),
        ('Debater X',      'debater_x',     'debater@example.com', $1, 'user'),
        ('Alex Carter',    'alex_prime',    'alex@example.com',    $1, 'user'),
        ('Nova Singh',     'nova_thinker',  'nova@example.com',    $1, 'user'),
        ('Iron Wallace',   'iron_clause',   'iron@example.com',    $1, 'user'),
        ('Pete Paradox',   'paradox_pete',  'paradox@example.com', $1, 'user'),
        ('Zara Khan',      'zara_argues',   'zara@example.com',    $1, 'user'),
        ('Baron Byte',     'byte_baron',    'byte@example.com',    $1, 'user')
      RETURNING id, username;
    `,[hashedPassword]);

    await client.query(`
      INSERT INTO refresh_tokens (user_id, token, expires_at)
        VALUES
        (1,  'maplestorm_river_echo_49',    NOW() + INTERVAL '7 days'),
        (2,  'frozen_peak_lantern_82',      NOW() + INTERVAL '7 days'),
        (3,  'silver_drift_hollow_17',      NOW() + INTERVAL '7 days'),
        (4,  'ember_coast_thorn_63',        NOW() + INTERVAL '7 days'),
        (5,  'velvet_moon_cipher_31',       NOW() + INTERVAL '7 days'),
        (6,  'ashen_bridge_falcon_55',      NOW() + INTERVAL '7 days'),
        (7,  'crimson_vale_specter_28',     NOW() + INTERVAL '7 days'),
        (8,  'golden_tide_wraith_74',       NOW() + INTERVAL '7 days'),
        (9,  'iron_grove_phantom_91',       NOW() + INTERVAL '7 days'),
        (10, 'shadow_bloom_raven_46',       NOW() + INTERVAL '7 days')
    `);

    const users = usersResult.rows;
    console.log(`✅ Seeded ${users.length} users`);

    // ============================================================
    // STATEMENTS
    // ============================================================

    const statementsResult = await client.query(
      `
      INSERT INTO "statements" (user_id, content, domain)
      VALUES
        ($1,  'AI should be granted legal personhood.',                                      'Technology'),
        ($2,  'Social media does more harm than good to society.',                           'Society'),
        ($3,  'Universal basic income is necessary for the future of work.',                 'Economics'),
        ($4,  'Space exploration is a waste of resources.',                                  'Science'),
        ($5,  'Cryptocurrency will replace traditional banking systems.',                    'Economics'),
        ($6,  'Climate change action should be prioritized over economic growth.',           'Environment'),
        ($7,  'Artificial intelligence will cause more unemployment than it creates.',       'Technology'),
        ($8,  'Social media platforms should be held liable for misinformation.',            'Society'),
        ($9,  'Nuclear energy is the cleanest solution to the global energy crisis.',        'Environment'),
        ($10, 'Governments should regulate big tech companies like public utilities.',       'Science')
      RETURNING id
    `,
      [users[0].id, users[1].id, users[2].id, users[3].id, users[4].id, users[5].id, users[6].id, users[7].id, users[8].id, users[9].id],
    );

    const stats = statementsResult.rows;
    console.log(`✅ Seeded ${stats.length} statements`);

    // ============================================================
    // ARGUMENTS
    // ============================================================
    const argumentsResult = await client.query(
      `
      INSERT INTO "arguments" (user_id, content, content_keyword, statement_id)
      VALUES
        ($1,  'AI should be granted legal personhood.',                                      'legal personhood',    $11),
        ($2,  'Social media does more harm than good to society.',                           'more harm',           $12),
        ($3,  'Universal basic income is necessary for the future of work.',                 'basic income',        $13),
        ($4,  'Space exploration is a waste of resources.',                                  'Space exploration',   $14),
        ($5,  'Cryptocurrency will replace traditional banking systems.',                    'Cryptocurrency',      $15),
        ($6,  'Climate change action should be prioritized over economic growth.',           'prioritized',         $16),
        ($7,  'Artificial intelligence will cause more unemployment than it creates.',       'unemployment',        $17),
        ($8,  'Social media platforms should be held liable for misinformation.',            'misinformation',      $18),
        ($9,  'Nuclear energy is the cleanest solution to the global energy crisis.',        'cleanest solution',   $19),
        ($10, 'Governments should regulate big tech companies like public utilities.',       'big tech companies',  $20)
      RETURNING id
    `,
      [users[0].id, users[1].id, users[2].id, users[3].id, users[4].id, users[5].id, users[6].id, users[7].id, users[8].id, users[9].id,
        stats[0].id, stats[1].id, stats[2].id, stats[3].id, stats[4].id, stats[5].id, stats[6].id, stats[7].id, stats[8].id, stats[9].id]
    );

    const args = argumentsResult.rows;
    console.log(`✅ Seeded ${args.length} arguments`);

    // ============================================================
    // COMMENTS
    // ============================================================
    const forCommentsResult = await client.query(
      `
      INSERT INTO for_comments (user_id, argument_id, content)
      VALUES
        ($1,  $11, 'AI personhood ensures accountability gaps are closed.'),
        ($2,  $12, 'Social media connects people and spreads awareness.'),
        ($3,  $13, 'UBI provides financial stability in an automated future.'),
        ($4,  $14, 'Space exploration drives innovation and discovery.'),
        ($5,  $15, 'Crypto enables decentralization and financial freedom.'),
        ($6,  $16, 'Climate action is critical for long-term survival.'),
        ($7,  $17, 'AI will also create new industries and opportunities.'),
        ($8,  $18, 'Platforms must take responsibility for harmful content.'),
        ($9,  $19, 'Nuclear energy produces minimal carbon emissions.'),
        ($10, $20, 'Regulation ensures fairness and prevents monopolies.')
      RETURNING id
    `,
      [users[0].id, users[1].id, users[2].id, users[3].id, users[4].id, users[5].id, users[6].id, users[7].id, users[8].id, users[9].id,
        args[0].id, args[1].id, args[2].id, args[3].id, args[4].id, args[5].id, args[6].id, args[7].id, args[8].id, args[9].id]
    );

    console.log(`✅ Seeded ${forCommentsResult.rows.length} for comments`);

    const againstCommentsResult = await client.query(
      `
      INSERT INTO against_comments (user_id, argument_id, content)
      VALUES
        ($1,  $11, 'AI lacks consciousness and cannot hold legal responsibility.'),
        ($2,  $12, 'Social media spreads misinformation and harms mental health.'),
        ($3,  $13, 'UBI may discourage work and strain economies.'),
        ($4,  $14, 'Resources should be spent solving Earth problems first.'),
        ($5,  $15, 'Crypto is volatile and lacks regulation.'),
        ($6,  $16, 'Economic growth is necessary to fund climate solutions.'),
        ($7,  $17, 'AI will replace many jobs faster than it creates new ones.'),
        ($8,  $18, 'Holding platforms liable may limit free speech.'),
        ($9,  $19, 'Nuclear waste and risks make it unsafe.'),
        ($10, $20, 'Overregulation can stifle innovation in tech.')
      RETURNING id
    `,
      [users[0].id, users[1].id, users[2].id, users[3].id, users[4].id, users[5].id, users[6].id, users[7].id, users[8].id, users[9].id,
        args[0].id, args[1].id, args[2].id, args[3].id, args[4].id, args[5].id, args[6].id, args[7].id, args[8].id, args[9].id]
    );

    console.log(`✅ Seeded ${againstCommentsResult.rows.length} against comments`);

    await client.query("COMMIT");
    console.log("🎉 Seeding complete!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Seeding failed, rolled back:", err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
};

seed();
