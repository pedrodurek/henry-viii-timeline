// All dates ISO. Year-only or year-month births are approximate (historians disagree).
window.HENRY = {
  key: 'henry', name: 'Henry VIII', born: '1491-06-28', died: '1547-01-28',
  reignStart: '1509-04-21', color: '#d8ad55', img: 'images/henry_holbein.jpg'
};

window.WIVES = [
  {
    key: 'aragon', n: 'I', name: 'Catherine of Aragon', short: 'Catherine', born: '1485-12-16', died: '1536-01-07',
    wed: '1509-06-11', end: '1533-05-23', endHow: 'Annulled', fate: 'Divorced', color: '#c0444f',
    img: 'images/aragon.jpg', emblem: 'Pomegranate', motto: 'Humble and loyal',
    birthplace: 'Alcalá de Henares, Castile', deathplace: 'Kimbolton Castle, Huntingdonshire',
    kidsShort: 'Mary I, and 5 lost',
    kids: [
      { name: 'Unnamed daughter', sex: 'Daughter', born: '1510-01-31', fate: 'stillborn',
        note: 'Born early. Her doctor told Catherine she might still be carrying a twin, and she stayed in confinement for months before it became clear she was not.' },
      { name: 'Henry, Duke of Cornwall', sex: 'Son', born: '1511-01-01', died: '1511-02-22', fate: 'infant',
        note: 'England celebrated with bonfires and a great tournament at Westminster. His death at seven weeks devastated both parents.' },
      { name: 'Unnamed son', sex: 'Son', at: '1513-09-15', bornLabel: 'Autumn 1513', fate: 'infant', life: 'Died soon after birth',
        note: 'Born prematurely while Henry was away at war in France.' },
      { name: 'Unnamed son', sex: 'Son', at: '1514-12-15', bornLabel: 'Winter 1514 to 1515', fate: 'infant', life: 'Died at birth',
        note: 'Stillborn or died within hours. The third son Catherine lost. Rumours spread that Henry might set her aside.' },
      { name: 'Mary I', sex: 'Daughter', born: '1516-02-18', died: '1558-11-17', fate: 'adult', img: 'images/mary.jpg', reign: 'Queen of England, 1553 to 1558',
        note: 'Declared illegitimate after the annulment and forced to serve her baby half-sister Elizabeth. Restored to the succession in 1544, she became England\'s first crowned queen regnant. Burning about 280 Protestants earned her the name "Bloody Mary".' },
      { name: 'Unnamed daughter', sex: 'Daughter', born: '1518-11-10', fate: 'stillborn', life: 'Died at birth',
        note: 'Stillborn or died within hours. Catherine\'s last pregnancy. She was 32, and would never conceive again.' }
    ],
    blurb: 'Daughter of Ferdinand and Isabella of Spain and widow of Henry\'s brother Arthur. Queen for 24 years, regent during the Flodden campaign, and loved by the English people to the end.',
    story: [
      'Catherine came to England at 15 to marry Prince Arthur, who died five months later. She spent seven poor, uncertain years as a widow before the new king, 17-year-old Henry, married her six weeks into his reign.',
      'For two decades they were a real partnership. While Henry campaigned in France in 1513, Catherine ran the country and her army crushed the Scots at Flodden. She sent Henry the bloodied coat of the dead Scottish king.',
      'When Henry wanted out, she refused to go quietly. She argued her case in person at Blackfriars, kneeling before the King, and to her final day signed her letters "Katharine the Queen".'
    ],
    fact: 'She was queen longer than the other five wives combined.'
  },
  {
    key: 'boleyn', n: 'II', name: 'Anne Boleyn', short: 'Anne B.', born: '1501', approx: true, died: '1536-05-19',
    wed: '1533-01-25', end: '1536-05-19', endHow: 'Executed', fate: 'Beheaded', color: '#2f8c74',
    img: 'images/boleyn.jpg', emblem: 'White falcon', motto: 'The most happy',
    birthplace: 'Blickling Hall, Norfolk (probably)', deathplace: 'Tower of London',
    kidsShort: 'Elizabeth I, and 2 lost',
    kids: [
      { name: 'Elizabeth I', sex: 'Daughter', born: '1533-09-07', died: '1603-03-24', fate: 'adult', img: 'images/elizabeth.jpg', reign: 'Queen of England, 1558 to 1603',
        note: 'She was two when her mother was executed. She never married, reigned for 44 years, saw off the Spanish Armada, and was the last Tudor monarch.' },
      { name: 'Lost pregnancy', sex: 'Unknown', at: '1534-07-15', bornLabel: 'Summer 1534', fate: 'lost', life: 'Lost',
        note: 'Anne was visibly pregnant early in 1534, and then the record goes quiet. It may have been a stillbirth, a miscarriage or a false pregnancy.' },
      { name: 'Unnamed son', sex: 'Son', born: '1536-01-29', fate: 'miscarriage',
        note: 'Miscarried at about 15 weeks, on the day of Catherine of Aragon\'s funeral and five days after Henry\'s jousting fall. Within four months Anne was dead.' }
    ],
    blurb: 'Educated at the French court, quick-witted and a committed religious reformer. Henry waited nearly seven years for her, and broke with Rome to marry her.',
    story: [
      'Anne refused to become Henry\'s mistress, as her sister Mary had been. She held out for the crown, and Henry spent years trying to annul his first marriage to give it to her.',
      'They married in secret in January 1533, while Henry was technically still married to Catherine. Their daughter Elizabeth was born that September. Henry had wanted a son.',
      'After a miscarriage in January 1536 her enemies moved fast. Within four months she was charged with adultery, incest and treason, charges most historians now see as invented, and beheaded by a swordsman brought over from Calais.'
    ],
    fact: 'Seventeen of Henry\'s love letters to her survive, in the Vatican Library of all places.'
  },
  {
    key: 'seymour', n: 'III', name: 'Jane Seymour', short: 'Jane', born: '1508', approx: true, died: '1537-10-24',
    wed: '1536-05-30', end: '1537-10-24', endHow: 'Died', fate: 'Died', color: '#d3a531',
    img: 'images/seymour.jpg', emblem: 'Phoenix rising from a castle', motto: 'Bound to obey and serve',
    birthplace: 'Wulfhall, Wiltshire (probably)', deathplace: 'Hampton Court Palace',
    kidsShort: 'Edward VI',
    kids: [
      { name: 'Edward VI', sex: 'Son', born: '1537-10-12', died: '1553-07-06', fate: 'adult', img: 'images/edward.jpg', reign: 'King of England, 1547 to 1553',
        note: 'King at nine and a committed Protestant. He died at 15, probably of tuberculosis, after trying to leave the crown to his cousin Lady Jane Grey instead of his sisters.' }
    ],
    blurb: 'A lady-in-waiting to both earlier queens. Quiet, conventional and, crucially for Henry, the mother of the son he had wanted for 25 years.',
    story: [
      'Henry was betrothed to Jane the day after Anne Boleyn\'s execution and married her eleven days later.',
      'She chose a motto that was the opposite of Anne\'s: "Bound to obey and serve". She tried to reconcile Henry with his daughter Mary, and reportedly pleaded for the monasteries.',
      'On 12 October 1537 she gave birth to Edward at Hampton Court. Twelve days later she was dead, probably from an infection after the birth.'
    ],
    fact: 'The only wife to get a queen\'s funeral. Henry chose to be buried beside her.'
  },
  {
    key: 'cleves', n: 'IV', name: 'Anne of Cleves', short: 'Anne C.', born: '1515-09-22', died: '1557-07-16',
    wed: '1540-01-06', end: '1540-07-09', endHow: 'Annulled', fate: 'Divorced', color: '#8a66bd',
    img: 'images/cleves.jpg', emblem: 'Swan of Cleves', motto: 'God send me well to keep',
    birthplace: 'Düsseldorf, Duchy of Berg', deathplace: 'Chelsea Old Manor, London',
    kidsShort: 'None',
    kids: [],
    noKids: 'None. Both sides agreed the marriage was never consummated, which was the legal basis for the annulment.',
    blurb: 'A German princess picked for a Protestant alliance, partly on the strength of a Holbein portrait. The marriage was never consummated and ended after six months.',
    story: [
      'Thomas Cromwell pushed the match to ally England with the Protestant German princes. Holbein was sent to paint her, and Henry liked what he saw.',
      'At their first meeting in Rochester, Henry burst in disguised, a chivalric game she didn\'t know. She didn\'t recognise him, and he was put out. "I like her not," he reportedly said afterwards.',
      'She agreed to the annulment without a fight, which was very smart. She received a generous income, several houses including Hever Castle, and the title of "the King\'s Beloved Sister". She stayed friends with Henry and his children.'
    ],
    fact: 'She outlived all the other wives, and is the only one buried in Westminster Abbey.'
  },
  {
    key: 'howard', n: 'V', name: 'Catherine Howard', short: 'Kitty', born: '1523', approx: true, died: '1542-02-13',
    wed: '1540-07-28', end: '1542-02-13', endHow: 'Executed', fate: 'Beheaded', color: '#d4668a',
    img: 'images/howard.jpg', emblem: 'Crowned rose', motto: 'No other will but his',
    birthplace: 'Lambeth, London (probably)', deathplace: 'Tower of London',
    kidsShort: 'None',
    kids: [],
    noKids: 'None. She was queen for only 18 months, and there is no record that she was ever pregnant.',
    blurb: 'A teenage first cousin of Anne Boleyn. Henry called her his "rose without a thorn". Within 18 months her past caught up with her.',
    story: [
      'Catherine married a 49-year-old Henry on the same day his chief minister Thomas Cromwell was executed. She was probably about 17.',
      'Reports of relationships before her marriage, and a dangerous closeness to the courtier Thomas Culpeper during it, reached Archbishop Cranmer in 1541. Henry reportedly wept.',
      'She was beheaded at the Tower in February 1542. The story that she said "I die a Queen, but I would rather have died the wife of Culpeper" is almost certainly legend.'
    ],
    fact: 'No portrait of her is confirmed. This Holbein workshop painting is one of the best candidates.'
  },
  {
    key: 'parr', n: 'VI', name: 'Catherine Parr', short: 'Kate', born: '1512-08', approx: true, died: '1548-09-05',
    wed: '1543-07-12', end: '1547-01-28', endHow: 'Widowed', fate: 'Survived', color: '#4a7cc6',
    img: 'images/parr.jpg', emblem: 'Maiden\'s head rising from a Tudor rose', motto: 'To be useful in all I do',
    birthplace: 'London (probably Blackfriars)', deathplace: 'Sudeley Castle, Gloucestershire',
    kidsShort: 'None with Henry',
    kids: [
      { name: 'Mary Seymour', sex: 'Daughter', born: '1548-08-30', diedLabel: 'Unknown, after 1550', fate: 'unknown', life: 'Fate unknown', father: 'Thomas Seymour',
        note: 'Her father was Catherine\'s fourth husband, Thomas Seymour, not Henry. Her mother died six days after the birth and her father was executed the next spring. She disappears from the records at about two, and probably died in childhood.' }
    ],
    blurb: 'Twice widowed, clever, and a committed reformer. She ran the country as regent in 1544, brought Henry\'s three children together at court, and outlived him.',
    story: [
      'Catherine was in love with Thomas Seymour, Jane\'s brother, when the King proposed. You don\'t say no to Henry VIII.',
      'She was regent while Henry besieged Boulogne in 1544, published religious books, and helped restore Mary and Elizabeth to the line of succession.',
      'Conservatives at court once had an arrest warrant drawn up against her for her religious views. She talked her way out of it with Henry. After he died she married Seymour, and died after giving birth in 1548.'
    ],
    fact: 'The first queen of England to publish a book under her own name, and the most-married English queen, with four husbands.'
  }
];

window.CHILDREN = [
  { key: 'mary', name: 'Mary I', mother: 'aragon', born: '1516-02-18', died: '1558-11-17', img: 'images/mary.jpg', color: '#c0444f' },
  { key: 'elizabeth', name: 'Elizabeth I', mother: 'boleyn', born: '1533-09-07', died: '1603-03-24', img: 'images/elizabeth.jpg', color: '#2f8c74' },
  { key: 'edward', name: 'Edward VI', mother: 'seymour', born: '1537-10-12', died: '1553-07-06', img: 'images/edward.jpg', color: '#d3a531' }
];

// cat: crown, wife, family, faith, war, politics, death
window.EVENTS = [
  { d: '1491-06-28', t: 'A spare prince is born', cat: 'family', place: 'Greenwich Palace',
    x: 'Henry is the second son of Henry VII and Elizabeth of York. Nobody expects him to be king. His older brother Arthur is the heir, and young Henry is perhaps meant for the Church.' },
  { d: '1501-11-14', t: 'He walks his future wife down the aisle', cat: 'wife', w: 'aragon', img: 'images/aragon_young.jpg', place: 'St Paul\'s Cathedral',
    x: 'Ten-year-old Henry escorts the Spanish princess Catherine of Aragon into St Paul\'s to marry his brother Arthur.' },
  { d: '1502-04-02', t: 'Arthur dies. Henry is now the heir', cat: 'crown', place: 'Ludlow Castle',
    x: 'Prince Arthur dies at 15, probably of sweating sickness. Henry, 10, becomes heir to the throne. His brother\'s widow stays in England, waiting.' },
  { d: '1509-04-21', t: 'King at seventeen', cat: 'crown', img: 'images/henry_1509.jpg', place: 'Richmond Palace',
    x: 'Henry VII dies. His son inherits a full treasury and a peaceful kingdom. He is 6 ft 2, athletic, a fine musician and a keen scholar, and he is hugely popular.' },
  { d: '1509-06-11', t: 'Marries Catherine of Aragon', cat: 'wife', w: 'aragon', img: 'images/aragon.jpg', place: 'Greenwich',
    x: 'Six weeks into his reign he marries his brother\'s widow, using a papal dispensation that will matter enormously twenty years later. Two weeks after that they are crowned together at Westminster Abbey.' },
  { d: '1510-01-31', t: 'A stillborn daughter', cat: 'family', w: 'aragon',
    x: 'Catherine\'s first child is born dead, months early. Her doctor suggests she may still be carrying a twin, so the loss is kept quiet for months.' },
  { d: '1511-01-01', t: 'A son, for 52 days', cat: 'family', w: 'aragon', place: 'Richmond Palace',
    x: 'Prince Henry, Duke of Cornwall, is born to bonfires, bells and a great tournament. He dies on 22 February. It is the first of many losses.' },
  { d: '1513-09-09', t: 'Flodden, won by the Queen', cat: 'war', w: 'aragon', place: 'Northumberland',
    x: 'While Henry wins the Battle of the Spurs in France, Catherine rules as regent. Her army crushes the invading Scots at Flodden, and King James IV is killed. She sends Henry his bloodied coat.' },
  { d: '1515-12-24', t: 'Cardinal Wolsey runs the country', cat: 'politics', img: 'images/wolsey.jpg', place: 'Westminster',
    x: 'Thomas Wolsey, a butcher\'s son from Ipswich, becomes Lord Chancellor. For fourteen years he handles the business of government while Henry hunts, jousts and feasts.' },
  { d: '1516-02-18', t: 'Mary is born', cat: 'family', w: 'aragon', img: 'images/mary.jpg', place: 'Greenwich Palace',
    x: 'The only one of Catherine\'s children to survive infancy. "If it was a daughter this time, by the grace of God, the sons will follow," Henry says. They never do.' },
  { d: '1518-11-10', t: 'The last pregnancy', cat: 'family', w: 'aragon',
    x: 'Catherine, 32, gives birth to a daughter who is stillborn or dies within hours. Of six pregnancies in nine years, only Mary has survived. There will be no more.' },
  { d: '1519-06-15', t: 'An illegitimate son', cat: 'family', place: 'Blackmore, Essex',
    x: 'Henry\'s mistress Elizabeth "Bessie" Blount gives birth to Henry FitzRoy. He is openly acknowledged, and his existence proves to Henry that the problem with sons is not him.' },
  { d: '1520-06-07', t: 'The Field of the Cloth of Gold', cat: 'politics', img: 'images/cloth.jpg', place: 'Near Calais',
    x: 'Henry meets Francis I of France for 18 days of jousting, feasting and showing off, with a temporary palace and fountains running with wine. Henry challenges Francis to a wrestling match and loses.' },
  { d: '1521-10-11', t: 'Defender of the Faith', cat: 'faith', place: 'Rome',
    x: 'For his book attacking Martin Luther, Pope Leo X names Henry "Fidei Defensor". British coins still carry the letters F D today, which is ironic given what comes next.' },
  { d: '1527-05-17', label: 'May 1527', t: 'The King\'s Great Matter', cat: 'wife', w: 'boleyn', place: 'Westminster',
    x: 'With no son and Catherine now 41, Henry seeks an annulment, citing Leviticus: a man who marries his brother\'s wife shall be childless. He is also deeply in love with Anne Boleyn.' },
  { d: '1529-10-09', t: 'Wolsey falls', cat: 'politics', place: 'Westminster',
    x: 'Having failed to get the annulment from Rome, Wolsey is charged and stripped of office. He dies a year later on his way to face treason charges.' },
  { d: '1533-01-25', t: 'Secretly marries Anne Boleyn', cat: 'wife', w: 'boleyn', img: 'images/boleyn.jpg', place: 'Whitehall',
    x: 'Anne is already pregnant. Henry is, legally speaking, still married to Catherine. A new Archbishop of Canterbury, Thomas Cranmer, will sort that out.' },
  { d: '1533-05-23', t: 'First marriage annulled', cat: 'wife', w: 'aragon', img: 'images/annulment.jpg', place: 'Dunstable Priory',
    x: 'Cranmer\'s court declares Henry\'s marriage to Catherine void. This is the actual verdict. Catherine never accepts it. A week later, Anne is crowned.' },
  { d: '1533-09-07', t: 'Elizabeth is born', cat: 'family', w: 'boleyn', img: 'images/elizabeth.jpg', place: 'Greenwich Palace',
    x: 'The astrologers promised a boy. The letters announcing the birth were written in advance: "prince" had to be squeezed into "princes[s]". She will become one of England\'s greatest monarchs.' },
  { d: '1534-11-03', label: 'November 1534', t: 'Supreme Head of the Church', cat: 'faith', img: 'images/parliament.jpg', place: 'Parliament',
    x: 'The Act of Supremacy makes Henry Supreme Head of the Church of England. Nearly a thousand years of papal authority in England ends with a vote.' },
  { d: '1535-07-06', t: 'Thomas More is executed', cat: 'faith', place: 'Tower Hill',
    x: 'Henry\'s former friend and Lord Chancellor refuses to swear the oath accepting the King as head of the Church. On the scaffold he calls himself "the King\'s good servant, but God\'s first."' },
  { d: '1536-01-07', t: 'Catherine of Aragon dies', cat: 'death', w: 'aragon', place: 'Kimbolton Castle',
    x: 'She dies at 50, still calling herself Queen. Her last letter to Henry, if it is genuine, ends "Mine eyes desire you above all things." Henry and Anne reportedly dress in yellow.' },
  { d: '1536-01-24', t: 'The jousting accident', cat: 'crown', place: 'Greenwich',
    x: 'Henry, 44, is thrown from his horse in full armour and the horse falls on him. He is reportedly unconscious for two hours. He never jousts again, and a leg ulcer torments him for the rest of his life. Five days later Anne miscarries a son.' },
  { d: '1536-04-14', label: 'Spring 1536', t: 'Dissolution of the monasteries', cat: 'faith', img: 'images/glastonbury.jpg', place: 'Across England',
    x: 'An act to close the smaller religious houses starts a four-year process. About 800 monasteries, abbeys and priories are closed, and their land and treasure go to the Crown. Glastonbury\'s last abbot is hanged on the Tor in 1539.' },
  { d: '1536-05-19', t: 'Anne Boleyn is beheaded', cat: 'death', w: 'boleyn', place: 'Tower of London',
    x: 'Convicted of adultery, incest and treason, almost certainly on invented evidence. As a final mercy Henry sends for an expert swordsman from Calais rather than an axe.' },
  { d: '1536-05-30', t: 'Marries Jane Seymour', cat: 'wife', w: 'seymour', img: 'images/seymour.jpg', place: 'Whitehall',
    x: 'Betrothed the day after Anne\'s execution, married eleven days later.' },
  { d: '1536-10-13', t: 'The Pilgrimage of Grace', cat: 'faith', img: 'images/pilgrimage.png', place: 'Yorkshire',
    x: 'Up to 30,000 northerners march under the banner of the Five Wounds of Christ against the closing of the monasteries. Henry promises a pardon, then executes more than 200 people once they go home.' },
  { d: '1537-10-12', t: 'At last, a son: Edward', cat: 'family', w: 'seymour', img: 'images/edward.jpg', place: 'Hampton Court',
    x: 'After 28 years of trying, Henry has a legitimate male heir. Two thousand rounds of gunfire are shot off at the Tower of London.' },
  { d: '1537-10-24', t: 'Jane Seymour dies', cat: 'death', w: 'seymour', img: 'images/family.jpg', place: 'Hampton Court',
    x: 'Twelve days after the birth. Years later Henry commissions this family portrait, showing Jane at his side with Edward even though she is long dead.' },
  { d: '1540-01-06', t: 'Marries Anne of Cleves', cat: 'wife', w: 'cleves', img: 'images/cleves.jpg', place: 'Greenwich Palace',
    x: 'He fell for Holbein\'s portrait. In person he is not impressed. "If it were not to satisfy the world and my realm, I would not do that which I must do this day."' },
  { d: '1540-07-09', t: 'Annulled after six months', cat: 'wife', w: 'cleves', place: 'Westminster',
    x: 'Anne agrees, and is rewarded with a generous settlement, houses including Hever Castle, and the title of "the King\'s Beloved Sister". The smartest exit of the six.' },
  { d: '1540-07-28', t: 'Cromwell beheaded. Henry remarries', cat: 'death', img: 'images/cromwell.jpg', place: 'Tower Hill and Oatlands Palace',
    x: 'Thomas Cromwell, architect of the break with Rome and of the Cleves marriage, is executed. On the same day Henry marries his fifth wife.' },
  { d: '1540-07-28', t: 'Marries Catherine Howard', cat: 'wife', w: 'howard', img: 'images/howard.jpg', place: 'Oatlands Palace',
    x: 'She is about 17, the first cousin of Anne Boleyn. Henry calls her his "rose without a thorn".' },
  { d: '1541-06-18', t: 'King of Ireland', cat: 'crown', place: 'Dublin',
    x: 'The Irish Parliament passes the Crown of Ireland Act. Henry upgrades himself from Lord of Ireland to King.' },
  { d: '1542-02-13', t: 'Catherine Howard is beheaded', cat: 'death', w: 'howard', place: 'Tower of London',
    x: 'Accused of affairs before and during the marriage. The night before, she is said to have asked for the block so she could practise laying her head on it.' },
  { d: '1543-07-12', t: 'Marries Catherine Parr', cat: 'wife', w: 'parr', img: 'images/parr.jpg', place: 'Hampton Court',
    x: 'A twice-widowed reformer, she becomes nurse, companion and stepmother. She brings Mary, Elizabeth and Edward together at court.' },
  { d: '1544-09-18', t: 'The capture of Boulogne', cat: 'war', w: 'parr', img: 'images/armor.jpg', place: 'Boulogne, France',
    x: 'A 53-year-old Henry leads one last invasion of France and enters the town after a siege. Catherine Parr governs England as regent. His armour from these years shows how much the athletic young king had grown.' },
  { d: '1545-07-19', t: 'The Mary Rose sinks', cat: 'war', img: 'images/maryrose.jpg', place: 'The Solent',
    x: 'His beloved warship heels over and sinks while Henry watches from Southsea Castle. Of a crew of about 400, fewer than 35 survive. She is raised from the seabed in 1982.' },
  { d: '1547-01-28', t: 'Death of the King', cat: 'death', img: 'images/henry_full.jpg', place: 'Palace of Whitehall',
    x: 'Henry dies at 55, obese, ulcerated and barely able to walk. He is buried at Windsor next to Jane Seymour. All three of his children will reign: Edward, then Mary, then Elizabeth.' }
];

window.QUIZ = [
  { q: 'Which wife outlived all the others?', a: 'cleves', type: 'wife', why: 'Anne of Cleves died in 1557, nine years after Catherine Parr. She is the only wife buried in Westminster Abbey.' },
  { q: 'Which wife had first been married to Henry\'s brother?', a: 'aragon', type: 'wife', why: 'Catherine of Aragon married Prince Arthur in 1501. He died five months later.' },
  { q: 'Which wife gave Henry the son he wanted?', a: 'seymour', type: 'wife', why: 'Jane Seymour gave birth to Edward in October 1537 and died twelve days later.' },
  { q: 'Which wife was Anne Boleyn\'s first cousin?', a: 'howard', type: 'wife', why: 'Anne Boleyn\'s mother, Elizabeth Howard, was the sister of Catherine Howard\'s father. Both cousins ended on the block.' },
  { q: 'Who was the first English queen to publish a book under her own name?', a: 'parr', type: 'wife', why: 'Catherine Parr published Prayers or Meditations in 1545.' },
  { q: 'How old was Henry when he became king?', a: '17', type: 'text', options: ['15', '17', '21', '25'], why: 'He took the throne in April 1509, two months short of his 18th birthday.' },
  { q: 'How long did the marriage to Anne of Cleves last?', a: '6 months', type: 'text', options: ['11 days', '6 months', '2 years', '5 years'], why: 'Married on 6 January 1540, annulled on 9 July 1540.' }
];
