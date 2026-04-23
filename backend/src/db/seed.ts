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
    // ARGUMENTS
    // ============================================================
    const argumentsResult = await client.query(
      `
      INSERT INTO "arguments" (user_id, content, content_keyword, domain, for_analysis, against_analysis)
      VALUES
        ($1,  'AI should be granted legal personhood.',
              'legal personhood', 'technology',
              'Granting AI legal personhood would enable autonomous systems to enter contracts, own intellectual property, and be held liable for their actions — creating clear accountability frameworks as AI grows more capable and independent.',
              'AI lacks consciousness, emotions, and moral agency. Legal personhood for AI risks diluting rights meant for humans and living beings, and could be exploited by corporations to shield themselves from liability behind an AI entity.'),

        ($2,  'Social media does more harm than good to society.',
              'more harm', 'society',
              'Extensive research links social media to rising anxiety, depression, and loneliness — especially among teens. It amplifies misinformation, breeds addiction through algorithmic design, and has eroded shared civic discourse.',
              'Social media has democratized information, connected marginalized communities, enabled grassroots activism, and given billions access to global knowledge and economic opportunities that did not exist before.'),

        ($3,  'Universal basic income is necessary for the future of work.',
              'basic income', 'economics',
              'As automation displaces jobs at an accelerating pace, UBI provides a safety net that ensures no one is left behind. It empowers workers to retrain, pursue entrepreneurship, and engage in caregiving or creative work without financial ruin.',
              'UBI is fiscally unsustainable at scale and could fuel inflation. Critics argue it disincentivizes work, crowds out targeted welfare programs, and ignores that automation historically creates more jobs than it destroys.'),

        ($4,  'Space exploration is a waste of resources.',
              'Space exploration', 'science',
              'With billions living in poverty, facing climate disasters, or lacking healthcare, diverting trillions toward space exploration reflects skewed priorities. Those funds could directly alleviate suffering on Earth right now.',
              'Space exploration drives technological innovation — from GPS to medical imaging — while securing humanity''s long-term survival. It also inspires scientific literacy and yields massive returns through spinoff technologies and resource discovery.'),

        ($5,  'Cryptocurrency will replace traditional banking systems.',
              'Cryptocurrency', 'finance',
              'Cryptocurrency offers decentralized, borderless, and permissionless financial infrastructure. It can bank the unbanked, reduce remittance costs, and eliminate rent-seeking middlemen — pointing toward a more equitable financial future.',
              'Crypto remains volatile, energy-intensive, and largely unregulated. Traditional banking offers consumer protections, stability, and trust that crypto has yet to replicate at scale. Most institutional adoption still relies on fiat on-ramps.'),

        ($6,  'Climate change action should be prioritized over economic growth.',
              'prioritized', 'environment',
              'The economic cost of inaction on climate change — through floods, droughts, crop failures, and displacement — far exceeds the cost of transitioning to clean energy now. Sustainable growth is only possible on a stable planet.',
              'Aggressive climate policy without economic safeguards can devastate developing nations still industrializing. Growth funds innovation, and many argue that technological progress — not austerity — is the most effective path to decarbonization.'),

        ($7,  'Artificial intelligence will cause more unemployment than it creates.',
              'unemployment', 'technology',
              'Unlike previous automation waves, AI threatens white-collar, creative, and cognitive jobs simultaneously. The speed of displacement will outpace retraining capacity, leaving large portions of the workforce structurally unemployed.',
              'Every major technological revolution has ultimately created more jobs than it displaced. AI will eliminate repetitive tasks while creating demand for new roles in AI oversight, ethics, maintenance, and adjacent industries we can''t yet predict.'),

        ($8,  'Social media platforms should be held liable for misinformation.',
              'misinformation', 'law',
              'Platforms profit from engagement driven by outrage and falsehoods while facing no consequences for the harm caused. Legal liability would create strong incentives to invest seriously in content moderation and algorithmic accountability.',
              'Holding platforms liable for user-generated content would trigger over-censorship, chilling free speech. It conflates platforms with publishers and could hand governments tools to suppress dissent under the guise of fighting misinformation.'),

        ($9,  'Nuclear energy is the cleanest solution to the global energy crisis.',
              'cleanest solution', 'energy',
              'Nuclear power produces near-zero carbon emissions per kilowatt-hour, operates regardless of weather, and has the smallest land footprint of any energy source. Modern reactor designs have dramatically reduced safety and waste risks.',
              'Nuclear plants are enormously expensive and slow to build, making them a poor fit for the urgency of the climate crisis. Waste storage remains unsolved, and accidents like Fukushima demonstrate that even rare failures carry catastrophic consequences.'),

        ($10, 'Governments should regulate big tech companies like public utilities.',
              'big tech companies', 'policy',
              'A handful of tech giants control the digital infrastructure billions depend on daily. Treating them as utilities would ensure fair access, prevent anti-competitive behavior, and protect users from exploitation of their data and attention.',
              'Public utility regulation stifles innovation by reducing the competitive incentives that drove tech''s growth. Heavy-handed regulation risks entrenching incumbents, slowing product development, and shifting power to politically motivated regulators.')
      RETURNING id
      `,
      [
        users[0].id, users[1].id, users[2].id, users[3].id, users[4].id,
        users[5].id, users[6].id, users[7].id, users[8].id, users[9].id
      ]
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
