import pool from "./index.js";
import bcrypt from "bcrypt";

const seed = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // ============================================================
    // USERS
    // ============================================================
    const password = "secret";
    const hashedPassword = await bcrypt.hash(password, 10);

    const usersResult = await client.query(
      `
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
    `,
      [hashedPassword],
    );

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
              'Autonomous systems need legal standing to function as independent agents in society.\n\n### Key Points\n- Enables AI to enter contracts and own intellectual property\n- Creates clear accountability as AI grows more capable and independent\n- Establishes liability frameworks before systems become uncontrollable',
              'AI lacks the consciousness and moral agency that legal personhood was designed to protect.\n\n### Key Points\n- Dilutes rights meant exclusively for humans and living beings\n- Corporations could exploit AI personhood to evade liability\n- No ethical basis for rights without genuine autonomy or suffering'),

        ($2,  'Social media does more harm than good to society.',
              'more harm', 'society',
              'Decades of research consistently link social media to measurable psychological and civic damage.\n\n### Key Points\n- Drives rising anxiety and depression, especially among teenagers\n- Algorithmic design engineers addiction at the cost of mental health\n- Erodes shared civic discourse by amplifying outrage over truth',
              'Social media has fundamentally expanded human connection and access to information at scale.\n\n### Key Points\n- Democratized information for billions who lacked mainstream media access\n- Enabled grassroots activism and gave voice to marginalized communities\n- Created entirely new economic opportunities and global markets'),

        ($3,  'Universal basic income is necessary for the future of work.',
              'basic income', 'economics',
              'Accelerating automation demands a systemic safety net that no targeted program can provide.\n\n### Key Points\n- Ensures no worker is left behind as jobs are structurally displaced\n- Empowers retraining, entrepreneurship, and caregiving without financial ruin\n- Decouples survival from employment in an era of machine labor',
              'UBI is fiscally unsustainable and misdiagnoses the actual threat automation poses.\n\n### Key Points\n- At scale, costs would be inflationary and crowd out targeted welfare\n- Disincentivizes work and productive contribution to society\n- Automation historically creates more jobs than it destroys — UBI assumes the worst'),

        ($4,  'Space exploration is a waste of resources.',
              'Space exploration', 'science',
              'Trillions spent on space while billions lack basic needs reflects a profound failure of priorities.\n\n### Key Points\n- Funds could directly address poverty, disease, and climate disasters on Earth\n- Benefits of space investment are abstract and long-term; suffering is immediate\n- Private space ventures primarily serve billionaire vanity, not humanity',
              'Space exploration is humanity''s highest-return long-term investment, not a luxury.\n\n### Key Points\n- Has produced GPS, medical imaging, water filtration, and countless spinoff technologies\n- Secures humanity''s survival by developing off-world contingency options\n- Inspires scientific literacy and yields compounding returns across generations'),

        ($5,  'Cryptocurrency will replace traditional banking systems.',
              'Cryptocurrency', 'finance',
              'Crypto offers the first genuinely decentralized alternative to rent-seeking financial infrastructure.\n\n### Key Points\n- Banks the unbanked — 1.4 billion adults globally without financial access\n- Eliminates middlemen and slashes remittance costs for migrant workers\n- Permissionless and borderless by design — no institution can revoke access',
              'Crypto remains too volatile, energy-intensive, and unregulated to displace mature banking systems.\n\n### Key Points\n- Lacks consumer protections that traditional banking guarantees by law\n- Price volatility makes it structurally unsuitable as a medium of exchange\n- Most institutional crypto adoption still depends entirely on fiat on-ramps'),

        ($6,  'Climate change action should be prioritized over economic growth.',
              'prioritized', 'environment',
              'The cost of climate inaction already exceeds the cost of transition — the math is settled.\n\n### Key Points\n- Floods, droughts, and crop failures impose economic costs dwarfing clean energy investment\n- Sustainable growth is only possible on a climatically stable planet\n- Delaying action compounds costs exponentially — early investment is rational',
              'Aggressive climate policy without economic safeguards punishes the world''s poorest nations most.\n\n### Key Points\n- Developing nations still industrializing cannot afford a forced energy transition\n- Economic growth funds the very innovation needed to solve climate change\n- Technological progress — not austerity — is the most viable decarbonization path'),

        ($7,  'Artificial intelligence will cause more unemployment than it creates.',
              'unemployment', 'technology',
              'AI threatens cognitive and creative jobs simultaneously — unlike any automation wave before it.\n\n### Key Points\n- White-collar, legal, medical, and creative roles are all vulnerable at once\n- Speed of displacement will outpace any realistic retraining infrastructure\n- Structural unemployment will concentrate in communities with no alternative industries',
              'Every technological revolution has ultimately created more jobs than it eliminated.\n\n### Key Points\n- AI eliminates repetitive tasks while generating demand for oversight, ethics, and new roles\n- Adjacent industries we cannot yet predict will absorb displaced workers\n- Historical pattern: automation raises productivity, which expands the overall job market'),

        ($8,  'Social media platforms should be held liable for misinformation.',
              'misinformation', 'law',
              'Platforms profit from misinformation-driven engagement while bearing zero consequence for the harm.\n\n### Key Points\n- Legal liability creates direct financial incentive for serious content moderation\n- Platforms already curate content algorithmically — liability should follow editorial control\n- Victims of misinformation currently have no legal recourse against the amplifier',
              'Platform liability for user content would trigger mass censorship and destroy open discourse.\n\n### Key Points\n- Conflates platforms with publishers — a legally and functionally false equivalence\n- Governments could weaponize liability laws to suppress legitimate dissent\n- Moderation at scale is technically impossible without catastrophic collateral censorship'),

        ($9,  'Nuclear energy is the cleanest solution to the global energy crisis.',
              'cleanest solution', 'energy',
              'Nuclear produces near-zero carbon emissions and operates independently of weather or daylight.\n\n### Key Points\n- Smallest land footprint of any major energy source at equivalent output\n- Modern reactor designs have dramatically reduced safety and waste risks\n- Only proven baseload power source fully compatible with complete decarbonization',
              'Nuclear is too expensive and too slow to build to meet the urgency of the climate crisis.\n\n### Key Points\n- Average construction time exceeds 10 years — utility-scale renewables deploy in months\n- Waste storage remains an unsolved problem spanning geological timescales\n- Rare failures like Fukushima carry consequences no other energy source can match'),

        ($10, 'Governments should regulate big tech companies like public utilities.',
              'big tech companies', 'policy',
              'A handful of corporations control digital infrastructure billions depend on — that is a utility.\n\n### Key Points\n- Utility status ensures fair access and prevents anti-competitive gatekeeping\n- Protects users from algorithmic exploitation of attention and personal data\n- Accountability frameworks would force transparency currently absent from platform governance',
              'Utility regulation would strangle the innovation engine that made big tech valuable in the first place.\n\n### Key Points\n- Competitive incentives drove every major platform breakthrough — regulation kills that pressure\n- Heavy-handed rules risk entrenching incumbents and blocking new challengers\n- Shifts power to politically motivated regulators with no technical expertise')
      RETURNING id
      `,
      [
        users[0].id,
        users[1].id,
        users[2].id,
        users[3].id,
        users[4].id,
        users[5].id,
        users[6].id,
        users[7].id,
        users[8].id,
        users[9].id,
      ],
    );

    const args = argumentsResult.rows;
    console.log(`✅ Seeded ${args.length} arguments`);

    // ============================================================
    // COMMENTS
    // ============================================================
    const commentsResult = await client.query(
      `
      INSERT INTO comments (user_id, argument_id, side, content)
      VALUES
        ($1,  $11, 'for',     'AI personhood ensures accountability gaps are closed.'),
        ($2,  $12, 'for',     'Social media connects people and spreads awareness.'),
        ($3,  $13, 'for',     'UBI provides financial stability in an automated future.'),
        ($4,  $14, 'for',     'Space exploration drives innovation and discovery.'),
        ($5,  $15, 'for',     'Crypto enables decentralization and financial freedom.'),
        ($6,  $16, 'for',     'Climate action is critical for long-term survival.'),
        ($7,  $17, 'for',     'AI will also create new industries and opportunities.'),
        ($8,  $18, 'for',     'Platforms must take responsibility for harmful content.'),
        ($9,  $19, 'for',     'Nuclear energy produces minimal carbon emissions.'),
        ($10, $20, 'for',     'Regulation ensures fairness and prevents monopolies.'),
        ($1,  $11, 'against', 'AI lacks consciousness and cannot hold legal responsibility.'),
        ($2,  $12, 'against', 'Social media spreads misinformation and harms mental health.'),
        ($3,  $13, 'against', 'UBI may discourage work and strain economies.'),
        ($4,  $14, 'against', 'Resources should be spent solving Earth problems first.'),
        ($5,  $15, 'against', 'Crypto is volatile and lacks regulation.'),
        ($6,  $16, 'against', 'Economic growth is necessary to fund climate solutions.'),
        ($7,  $17, 'against', 'AI will replace many jobs faster than it creates new ones.'),
        ($8,  $18, 'against', 'Holding platforms liable may limit free speech.'),
        ($9,  $19, 'against', 'Nuclear waste and risks make it unsafe.'),
        ($10, $20, 'against', 'Overregulation can stifle innovation in tech.')
      RETURNING id
      `,
      [
        users[0].id,
        users[1].id,
        users[2].id,
        users[3].id,
        users[4].id,
        users[5].id,
        users[6].id,
        users[7].id,
        users[8].id,
        users[9].id,
        args[0].id,
        args[1].id,
        args[2].id,
        args[3].id,
        args[4].id,
        args[5].id,
        args[6].id,
        args[7].id,
        args[8].id,
        args[9].id,
      ],
    );

    console.log(`✅ Seeded ${commentsResult.rows.length} comments`);

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
