export interface Book {
  id: number;
  title: string;
  coverUrl: string;
  detailsUrl: string | null;
  originalAuthors: string | null;
  publisher: string | null;
  publicationDate: string | null;
  pageCount: string | null;
  isbn: string | null;
  category: string;
  tags: string | null;
  description: string;
}

export const booksData: Book[] = [
  {
    id: 1,
    title: "கலாமின் இந்தியக் கனவுகள்",
    coverUrl: "/covers/kalamin-indhiya-kanavugal.jpg",
    detailsUrl: "https://www.noolulagam.com/product/?pid=34503",
    originalAuthors: "Dr. Y.S. Rajan; Dr. A.P.J. Abdul Kalam",
    publisher: "கிழக்கு பதிப்பகம்",
    publicationDate: "July 01, 2017",
    pageCount: "280",
    isbn: "B07BJK8TFY (ASIN); 9788184937947 (ISBN)",
    category: "Translated Work",
    tags: "India, science, technology, space, research, isro",
    description: "From enhanced nuclear capability to an unmanned Moon mission, India's scientific achievements in recent years have been spectacular. But, according to the country s best-known scientist Dr. A.P.J. Abdul Kalam and his close associate Dr. Y.S. Rajan, we've only just begun. In a century that many experts predict may belong to India, the realization of the vision of a better future for everyone will require a keen understanding of our needs and this can only be achieved by tailoring our research and innovations to the goal of national development.\n\nIn The Scientific Indian, the authors of the path-breaking India 2020: A Vision for the New Millennium return after ten years to the core areas of scientific advancement that are crucial space exploration, satellite technology, missile development, earth and ocean resources, the biosphere, food production, energy and water harvesting, health care and communications, to name a few. For each aspect, the authors discuss Indian breakthroughs within the context of recent progress on the global platform, before outlining a pragmatic vision of technological development that will propel India to the forefront of the world in the decades to come.",
  },
  {
    id: 2,
    title: "பகவத்கீதை தற்காலத் தமிழில்",
    coverUrl: "/covers/bhagavad-gitai.jpg",
    detailsUrl: "https://amzn.in/d/8E1f4BP",
    originalAuthors: "Koti Sreekrishna; Hari Ravikumar",
    publisher: "CreateSpace Independent Publishing Platform",
    publicationDate: "September 11, 2017",
    pageCount: "340",
    isbn: "9781976284601 (ISBN-13); 1976284600 (ISBN-10)",
    category: "Translated Work",
    tags: "religion, hinduism, sermon, gita, krishna, war, holy, tradition, India",
    description: "A modern Translated Work of the Bhagavad-Gita, one of the most important works in the Hindu tradition. Two friends have a conversation at the outset of an epic war. One of them, Arjuna, is sad and confused in the face of imminent doom; the other, Krishna, decides to cheer him up and clear his doubts.\n\nThrough the course of their dialogue, while inspiring Arjuna to do his work, Krishna assumes the role of a mentor and imparts the timeless wisdom that is called the Bhagavad-Gita. For someone who wants to know about Indias grand heritage, religious traditions, philosophy, and spirituality, the Bhagavad-Gita is a good place to start. The present work includes the text of the Bhagavad-Gita in the Grantha script.",
  },
  {
    id: 3,
    title: "சிவ-ராம-கிருஷ்ணன்",
    coverUrl: "/covers/siva-rama-krishnan.jpg",
    detailsUrl: "https://amzn.in/d/3p2s24Y",
    originalAuthors: "Shatavadhani Dr. R. Ganesh",
    publisher: "Prekshaa Pratishtana",
    publicationDate: "April 21, 2021",
    pageCount: "10 part series",
    isbn: "B0936ZXLX7 (ASIN)",
    category: "Translated Work",
    tags: "religion, hinduism, gods, society, philosophy, India",
    description: "சிவன். ராமன். கிருஷ்ணன். இந்திய பாரம்பரியத்தின் முப்பெரும் கதாநாயகர்கள்.\n\nஉயர் இந்தியாவில் தலைமுறைகள் பல கடந்தும் கடவுளர்களாக போற்றப்பட்டு வழிகாட்டிகளாக விளங்குபவர்கள். மனித ஒற்றுமை நூற்றாண்டுகால பரிணாம வளர்ச்சியின் பரிமாணம். தனிநபர்களாகவும், குடும்ப உறுப்பினர்களாகவும், சமுதாய பிரஜைகளாகவும் நாம் அனைவரும் பரிமளிக்கிறோம்.\n\nசிவன் தனிமனித அடையாளமாக அமைகிறான். ராமன் குடும்ப வாழ்க்கைக்கு வழிவகுக்கிறான். கிருஷ்ணன் சமுதாயப் பங்காற்றுவதை போதிக்கிறான்.\n\nஇக்கதாநாயகர்களை மையப்படுத்தி நல்வாக்கு, நற்பண்பு, நல்வாழ்க்கை குறித்து ஷதாவதானி Dr. R. கணேஷ் முன்வைக்கும் ஒரு மாறுபட்ட கண்ணோட்டம்."
  },
  {
    id: 4,
    title: "உபநயனம் – ஒரு எளிய அறிமுகம்",
    coverUrl: "/covers/upanayanam.jpg",
    detailsUrl: "https://www.prekshaa.in/archive?field_preksha_series_tid=7139",
    originalAuthors: "Hari Ravikumar",
    publisher: "Prekshaa Pratishtana",
    publicationDate: "March 02, 2019",
    pageCount: null,
    isbn: null,
    category: "Translated Work",
    tags: "religion, hinduism, upanayanam, ritual, ceremony, India",
    description: "This is a 15 part series published at prekshaa.in. This is a Translated Work of Upanayanam – A Gentle Introduction by Hari Ravikumar"
  },
  {
    id: 5,
    title: "ஸ்வாமி வேதாந்த தேஸிகனின் ஸ்ரீஸூக்திகள் ஒரு அறிமுகம்",
    coverUrl: "/covers/sri-sukthikal.png",
    detailsUrl: "https://sripriya.in",
    originalAuthors: null,
    publisher: "V.K.N. Enterprises, Mylapore",
    publicationDate: "September 25, 2023",
    pageCount: null,
    isbn: null,
    category: "Original Publication",
    tags: "religion, hinduism, India, scholar, guru, vedanta desikan, swamy, sri vaishnavism, ramanuja",
    description: "Launched in Rishikesh by His Holiness Srimad Andavan Sri Varaha Maha Desikan, the current and the twelfth pontiff of the Srirangam Srimad Andavan Ashramam. Please note that this book is not available to purchase online",
  },
  {
    id: 6,
    title: "Kalam’s Family Tree",
    coverUrl: "/covers/kalams-family-tree.jpg",
    detailsUrl: "https://www.prabhatbooks.com/kalam-s-family-tree-ancestral-legacy-of-dr-a-p-j-abdul-kalam.htm",
    originalAuthors: "Dr. A.P.J.M. Nazema Maraikayar",
    publisher: "Prabhat Prakashan",
    publicationDate: "April 10, 2024",
    pageCount: "160",
    isbn: "9789355628121 (ISBN); B0D1CNDBZC (ASIN)",
    category: "Translated Work",
    tags: "geneology, family, science, research, space, India",
    description: "This book is an intimate memoir written by A.P.J. Abdul Kalam’s niece, who is closely connected to him and the family. The book offers a rare glimpse into the family life and ancestral roots of India’s beloved “Missile Man.’ The book was originally written in Tamil and later translated in English and Hindi.\n\nIt takes you to Dr. Kalam’s humble beginnings in Rameshwaram, Tamil Nadu, where the young Kalam’s curiosity and thirst of knowledge were nurtured within the embrace of a close-knit Muslim family. From the sacrifices of his parents to the wisdom imparted by his grandparents, the book celebrates the indelible impact of family on his journey to becoming the President of India.\n\nIt emphasises on the cultural and religious roots that he inherited from different generations. It mainly reflects how historical events, wars, societal changes, economic conditions, etc., had an effect on his personality. The book is a tribute to the power of heritage, perseverance and the pursuit of knowledge values that resonated deeply within the Kalam lineage.",
  },
  {
    id: 7,
    title: "The Pallava Empire",
    coverUrl: "/covers/the-pallava-empire.jpg",
    detailsUrl: "https://sahityabooks.com/shop/rashtrotthana-sahitya/the-pallava-empire/",
    originalAuthors: null,
    publisher: "Rashtrotthana Sahitya",
    publicationDate: "June 19, 2025",
    pageCount: "xix + 166",
    isbn: "9789393991423 (ISBN)",
    category: "Original Publication",
    tags: "history, archeology, India, tamil, pallava, kingdom",
    description: "Along with the Colas, Ceras, and Pandyas, the Pallavas were among the most important dynasties that ruled over the Tamil heartland. Who were the Pallavas? Where did they come from? What was their administration like? In what ways did they contribute to the heritage of Bharata?\n\nThe Pallava Empire : A Gentle Introduction offers a broad overview of the political, social, cultural, and economic landscape that prevailed during Pallava rule spanning 600 years, from 3rd to 9th century C.E. This book is written in an eminently readable style keeping in mind a general audience.",
  },
];