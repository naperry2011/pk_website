-- Seed data from mockData.ts
-- Run after migration.sql

-- Towns (all 17)
INSERT INTO towns (id, name, chief, description, landmarks) VALUES
('akropong', 'Akropong', 'Osabarima Ofori Dua III',
  'The capital of the Akuapem Traditional Area, Akropong sits atop the Akuapem Ridge. It is the seat of the Okuapehene and home to the historic Basel Mission, which established one of the first schools in the Gold Coast. The town is renowned for the annual Odwira Festival and its role in the early development of education and Christianity in Ghana.',
  ARRAY['Ahenfie (Royal Palace)', 'Basel Mission House', 'Nkwatia Park']),
('abiriw', 'Abiriw', 'Nana Addo Birikorang',
  'Abiriw is known for its vibrant Ohum Festival, celebrated annually to give thanks for a bountiful harvest. The town is distinguished by its Abiriw waterfalls and lush green surroundings on the Akuapem Ridge, making it a popular destination for visitors seeking natural beauty.',
  ARRAY['Abiriw Waterfalls', 'Ohum Festival Grounds', 'Chief''s Palace']),
('amanokrom', 'Amanokrom', 'Nana Kwadwo Anim',
  'Amanokrom is a peaceful community on the Akuapem Ridge with deep-rooted traditions. The town is known for its strong communal spirit and active involvement in the affairs of the Akuapem Traditional Council. Farming and small-scale commerce form the backbone of the local economy.',
  ARRAY['Chief''s Palace', 'Community Centre', 'Presbyterian Church']),
('awukugua', 'Awukugua', 'Nana Kwaku Duah',
  'Awukugua holds historical significance as the birthplace of the Akuapem state. According to oral tradition, it was from here that the Guan people first settled on the ridge. The town maintains ancient shrines and customs that predate the arrival of the Akan settlers in the area.',
  ARRAY['Ancient Shrine', 'Chief''s Palace', 'Awukugua Market']),
('berekuso', 'Berekuso', 'Nana Osei Bonsu',
  'Berekuso is a growing town at the southern end of the Akuapem Ridge, notable for hosting Ashesi University, one of Ghana''s leading private universities. The town blends traditional governance with modern educational development, attracting visitors and students from across the country.',
  ARRAY['Ashesi University', 'Chief''s Palace', 'Berekuso Hills']),
('tutu', 'Tutu', 'Nana Yaw Agyeman',
  'Tutu is a scenic town along the Akuapem Ridge, known for its elevated terrain and panoramic views. The community is recognized for its strong adherence to traditional customs and its role in the broader governance of the Akuapem state.',
  ARRAY['Chief''s Palace', 'Tutu Viewpoint', 'Presbyterian Church']),
('mamfe', 'Mamfe', 'Nana Kofi Asante',
  'Mamfe is a well-known town in the Akuapem area, situated near the foot of the ridge. It serves as a key commercial hub with a busy market. The town is also recognized for its educational institutions and strong ties to the Akuapem Traditional Council.',
  ARRAY['Mamfe Market', 'Chief''s Palace', 'Methodist Church']),
('larteh', 'Larteh', 'Nana Kwame Opoku',
  'Larteh is one of the prominent Guan towns on the Akuapem Ridge, comprising Larteh-Kubease and Larteh-Ahenease. The town is known for the Klama Festival and its unique cultural identity, with traditions that trace back centuries to the original Guan settlers of the region.',
  ARRAY['Klama Festival Grounds', 'Chief''s Palace', 'Basel Mission Church']),
('adukrom', 'Adukrom', 'Nana Akwasi Boateng',
  'Adukrom is a quiet but historically significant town on the Akuapem Ridge. The community plays an important role in the Traditional Council and is known for its well-preserved cultural practices and warm hospitality towards visitors.',
  ARRAY['Chief''s Palace', 'Adukrom Spring', 'Community Park']),
('mampong', 'Mampong', 'Nana Yaw Mensah',
  'Mampong-Akuapem is a major town on the ridge, known for its educational heritage and the Mampong Presbyterian Training College. The town has produced many of Ghana''s teachers and public servants. It is also noted for its vibrant market and active community life.',
  ARRAY['Presbyterian Training College', 'Mampong Market', 'Chief''s Palace']),
('obosomase', 'Obosomase', 'Nana Kofi Owusu',
  'Obosomase is a serene town on the Akuapem Ridge with a strong sense of community. The town is known for its traditional festivals and the sacred groves that have been preserved for generations, reflecting the deep spiritual heritage of the Akuapem people.',
  ARRAY['Sacred Grove', 'Chief''s Palace', 'Community Centre']),
('apirede', 'Apirede', 'Nana Kwadwo Asare',
  'Apirede is situated on the slopes of the Akuapem Ridge and is known for its rich agricultural lands. The town produces cocoa, palm oil, and food crops that supply local and regional markets. Its people are known for their industrious spirit and strong traditional values.',
  ARRAY['Chief''s Palace', 'Apirede Farm Lands', 'Presbyterian Church']),
('aseseeso', 'Aseseeso', 'Nana Adu Gyamfi',
  'Aseseeso is a town with a rich cultural heritage along the Akuapem Ridge. The community is known for its traditional weaving and craft-making, and it actively participates in the Odwira Festival celebrations that bring together towns across the Akuapem state.',
  ARRAY['Chief''s Palace', 'Craft Market', 'Community Square']),
('dawu', 'Dawu', 'Nana Yaw Amoako',
  'Dawu is located at the northern end of the Akuapem Ridge and serves as a gateway between the ridge towns and the Afram Plains. The town is known for its scenic landscape and its role as a trading post connecting communities on both sides of the ridge.',
  ARRAY['Chief''s Palace', 'Dawu Market', 'Ridge Gateway Viewpoint']),
('koforidua', 'Koforidua', 'Nana Kwaku Agyei',
  'Koforidua is the capital of the Eastern Region of Ghana and the largest commercial centre near the Akuapem Traditional Area. While primarily an urban centre, it maintains strong ties to the Akuapem Traditional Council and hosts a vibrant bead market that draws visitors from across the country.',
  ARRAY['Bead Market', 'Jackson Park', 'Chief''s Palace']),
('nsawam', 'Nsawam', 'Nana Osei Tutu',
  'Nsawam is a bustling town at the foot of the Akuapem Ridge, situated along the main Accra-Kumasi highway. It is one of the largest markets in the Eastern Region, especially known for its pineapple trade. The town serves as a key economic hub for the surrounding Akuapem communities.',
  ARRAY['Nsawam Market', 'Chief''s Palace', 'Presbyterian Church']),
('suhum', 'Suhum', 'Nana Kwame Boahen',
  'Suhum is a prominent commercial town near the Akuapem Traditional Area, well known for its cocoa production and trading activities. The town sits along the Accra-Kumasi corridor and plays an important role in the economic vitality of the wider Akuapem region.',
  ARRAY['Suhum Market', 'Chief''s Palace', 'Cocoa Processing Area']);

-- Announcements (5)
INSERT INTO announcements (title, date, type, town_id, excerpt) VALUES
('Annual Odwira Festival 2026', '2026-09-15', 'event', 'akropong',
  'The Akuapem Traditional Council announces the dates for the annual Odwira Festival celebrations.'),
('Council Meeting Resolution', '2026-01-10', 'council', NULL,
  'Summary of key decisions from the January Traditional Council meeting.'),
('New Development Initiative', '2026-01-05', 'development', NULL,
  'The Council partners with government on new infrastructure projects.'),
('Larteh Cultural Day', '2026-03-20', 'event', 'larteh',
  'Annual celebration of Larteh''s unique cultural heritage and traditions.'),
('Mampong Road Rehabilitation', '2026-02-01', 'development', 'mampong',
  'Construction begins on the main road rehabilitation project in Mampong.');

-- Obituaries (4, all approved so they show publicly)
INSERT INTO obituaries (name, birth_date, passed_date, funeral_date, town_id, status) VALUES
('Maame Akua Asantewaa', '1945-03-15', '2026-01-10', '2026-02-01', 'akropong', 'approved'),
('Opanin Kwame Boateng', '1938-07-22', '2026-01-08', '2026-01-28', 'larteh', 'approved'),
('Nana Yaa Asantewaa', '1950-06-12', '2026-01-15', '2026-02-10', 'mampong', 'approved'),
('Opanin Kofi Mensah', '1942-11-03', '2026-01-12', '2026-02-05', 'akropong', 'approved');

-- Weddings (3, all approved)
INSERT INTO weddings (bride, groom, date, town_id, venue, status) VALUES
('Akosua Mensah', 'Kofi Asante', '2026-02-14', 'mampong', 'Mampong Presbyterian Church', 'approved'),
('Adwoa Serwaa', 'Kwame Owusu', '2026-03-08', 'akropong', 'Basel Mission Church, Akropong', 'approved'),
('Ama Darko', 'Yaw Boateng', '2026-04-15', 'larteh', 'Larteh Presbyterian Church', 'approved');
