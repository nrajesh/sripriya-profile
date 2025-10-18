import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export const author = {
  name: "Sripriya Srinivasan",
  tagline: "Author & Translator",
  bio: "An accomplished author and translator, Sripriya Srinivasan brings rich narratives and profound ideas to a wider audience through her insightful works.",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/books", label: "Books" },
  //{ href: "/contact", label: "Contact" },
];

export const socialLinks = [
  {
    href: "https://www.facebook.com/sripriya.srinivasan.940309",
    label: "Facebook",
    icon: Facebook,
  },
];

export interface Book {
  id: number;
  title: string;
  coverUrl: string; // Guaranteed to be a string (uploaded or default)
  detailsUrl: string | null;
  amazonUrl?: string | null;
  flipkartUrl?: string | null;
  originalAuthors: string | null;
  publisher: string | null;
  publicationDate: string | null;
  pageCount: string | null;
  isbn: string | null;
  category: string; // Guaranteed to be a string (derived)
  tags: string; // Now mandatory
  description: string; // Now mandatory
}

export const DEFAULT_COVER_IMAGE_URL = "/covers/coming-soon.jpg"; // New constant

// Helper function to parse dates for sorting
export const parseDateForSorting = (dateString: string | null): Date => {
  if (!dateString) return new Date(0); // Treat empty string as very old
  // Handle "Month Day, Year" format
  if (dateString && dateString.includes(',')) {
    return new Date(dateString);
  }
  // Handle "Year" format
  if (dateString && /^\d{4}$/.test(dateString)) {
    return new Date(`${dateString}-01-01`); // Assume Jan 1st for year-only dates
  }
  return new Date(dateString || 0); // Fallback for other formats or null
};

export const rawBooks: Book[] = [
  {
    "id": 8,
    "title": "The Pallava Empire",
    "coverUrl": "/covers/the-pallava-empire.jpg",
    "detailsUrl": "https://sahityabooks.com/shop/rashtrotthana-sahitya/the-pallava-empire/",
    "originalAuthors": null,
    "publisher": "Rashtrotthana Sahitya",
    "publicationDate": "June 19, 2025",
    "pageCount": "xix + 166",
    "isbn": "9789393991423 (ISBN)",
    "category": "Original Publication",
    "tags": "history, archeology, India, tamil, pallava, kingdom",
    "description": "Along with the Colas, Ceras, and Pandyas, the Pallavas were among the most important dynasties that ruled over the Tamil heartland. Who were the Pallavas? Where did they come from? What was their administration like? In what ways did they contribute to the heritage of Bharata?\n\nThe Pallava Empire : A Gentle Introduction offers a broad overview of the political, social, cultural, and economic landscape that prevailed during Pallava rule spanning 600 years, from 3rd to 9th century C.E. This book is written in an eminently readable style keeping in mind a general audience.",
    "amazonUrl": null,
    "flipkartUrl": null
  },
  {
    "id": 7,
    "title": "Kalam’s Family Tree",
    "coverUrl": "/covers/kalams-family-tree.jpg",
    "detailsUrl": "https://www.prabhatbooks.com/kalam-s-family-tree-ancestral-legacy-of-dr-a-p-j-abdul-kalam.htm",
    "amazonUrl": "https://amzn.in/d/5zBwZ9i",
    "flipkartUrl": "https://www.flipkart.com/kalams-family-tree-ancestral-legacy-abdul-kalam/p/itmf5fa0bd544a2c?pid=9789355628121&lid=LSTBOK9789355628121FPAUC6",
    "originalAuthors": "Dr. A.P.J.M. Nazema Maraikayar",
    "publisher": "Prabhat Prakashan",
    "publicationDate": "April 10, 2024",
    "pageCount": "160",
    "isbn": "9789355628121 (ISBN); B0D1CNDBZC (ASIN)",
    "category": "Translated Work",
    "tags": "geneology, family, science, research, space, India",
    "description": "This book is an intimate memoir written by A.P.J. Abdul Kalam’s niece, who is closely connected to him and the family. The book offers a rare glimpse into the family life and ancestral roots of India’s beloved “Missile Man.’ The book was originally written in Tamil and later translated in English and Hindi.\n\nIt takes you to Dr. Kalam’s humble beginnings in Rameshwaram, Tamil Nadu, where the young Kalam’s curiosity and thirst of knowledge were nurtured within the embrace of a close-knit Muslim family. From the sacrifices of his parents to the wisdom imparted by his grandparents, the book celebrates the indelible impact of family on his journey to becoming the President of India.\n\nIt emphasises on the cultural and religious roots that he inherited from different generations. It mainly reflects how historical events, wars, societal changes, economic conditions, etc., had an effect on his personality. It is a tribute to the power of heritage, perseverance and the pursuit of knowledge values that resonated deeply within the Kalam lineage."
  },
  {
    "id": 6,
    "title": "ஸ்வாமி வேதாந்த தேஶிகனின் ஸ்ரீஸூக்திகள் ஒரு அறிமுகம்",
    "coverUrl": "/covers/sri-sukthikal.jpg",
    "detailsUrl": null,
    "originalAuthors": "Sripriya Srinivasan",
    "publisher": "V.K.N. Enterprises, Mylapore",
    "publicationDate": "September 25, 2023",
    "pageCount": null,
    "isbn": null,
    "category": "Original Publication",
    "tags": "religion, hinduism, India, scholar, guru, Vedantha Desikan, swamy, sri vaishnavism, Ramanuja",
    "description": "Launched in Rishikesh by His Holiness Srimad Andavan Sri Varaha Maha Desikan, the current and the twelfth pontiff of the Srirangam Srimad Andavan Ashramam.\n\nPlease note that this book is NOT available to purchase online"
  },
  {
    "id": 5,
    "title": "Memories Never Die",
    "coverUrl": "/covers/memories-never-die.jpg",
    "detailsUrl": "https://www.prabhatbooks.com/dr-a-p-j-abdul-kalam-memories-never-die-english-translation-of-ninaivugalukku-maranamillai.htm",
    "amazonUrl": "https://amzn.in/d/2aHCtVL",
    "flipkartUrl": "https://www.flipkart.com/dr-a-p-j-abdul-kalam-memories-never-die-english-translation-ninaivugalukku-maranamillai-missile-man-president-scientific-contributions-life-lessons-india-vision-complete-biography/p/itm02581ecd27611?pid=9788196159078&lid=LSTBOK9788196159078KBCIO5",
    "originalAuthors": "Dr. Y.S. Rajan; Dr. A.P.J.M. Nazema Maraikayar",
    "publisher": "Prabhat Prakashan",
    "publicationDate": "April 08, 2023",
    "pageCount": "456",
    "isbn": "9788196159078 (ISBN); B0C2YTW8SR (ASIN)",
    "category": "Translated Work",
    "tags": "memories, family, science, research, space, India, isro",
    "description": "This book was released by Union Home Minister and Minister of cooperation Shri Amit Shah during the 8th Remembrance Day of Dr. APJ Abdul Kalam in Rameswaram. It is a translated work of the Tamil book 'நினைவுகளுக்கு மரணமில்லை' (‘Ninaivugalukku Maranamillai’). Written by two people closest to A.P.J. Abdul Kalam—his niece Dr. Nazema Maraikayar and the distinguished ISRO scientist Dr. Y.S. Rajan, who was a close confidante of Kalam —this book gives a holistic and honest revelation of the life of Dr. Kalam from his early childhood till he breathed his last.\n\nThis is the story of how a small-town boy from Rameswaram ascended to the highest echelons of the Indian political world. This book comprehensively covers the beautiful history of Indian rocketry, precursors to today’s Science and Technology, the workings of the Indian political and administrative"
  },
  {
    "id": 3,
    "title": "சிவ-ராம-கிருஷ்ணன்",
    "coverUrl": "/covers/siva-rama-krishnan.jpg",
    "detailsUrl": null,
    "amazonUrl": "https://amzn.in/d/9WCGxn2",
    "originalAuthors": "Shatavadhani Dr. R. Ganesh",
    "publisher": "Prekshaa Pratishtana",
    "publicationDate": "April 21, 2021",
    "pageCount": "10 part series",
    "isbn": "B0936ZXLX7 (ASIN)",
    "category": "Translated Work",
    "tags": "religion, hinduism, gods, society, philosophy, India",
    "description": "சிவன். ராமன். கிருஷ்ணன். இந்திய பாரம்பரியத்தின் முப்பெரும் கதாநாயகர்கள்.\n\nஉயர் இந்தியாவில் தலைமுறைகள் பல கடந்தும் கடவுளர்களாக போற்றப்பட்டு வழிகாட்டிகளாக விளங்குபவர்கள். மனித ஒற்றுமை நூற்றாண்டுகால பரிணாம வளர்ச்சியின் பரிமாணம். தனிநபர்களாகவும், குடும்ப உறுப்பினர்களாகவும், சமுதாய பிரஜைகளாகவும் நாம் அனைவரும் பரிமளிக்கிறோம்.\n\nசிவன் தனிமனித அடையாளமாக அமைகிறான். ராமன் குடும்ப வாழ்க்கைக்கு வழிவகுக்கிறான். கிருஷ்ணன் சமுதாயப் பங்காற்றுவதை போதிக்கிறான்.\n\nஇக்கதாநாயகர்களை மையப்படுத்தி நல்வாக்கு, நற்பண்பு, நல்வாழ்க்கை குறித்து ஷதாவதானி Dr. R. கணேஷ் முன்வைக்கும் ஒரு மாறுபட்ட கண்ணோட்டம்."
  },
  {
    "id": 4,
    "title": "உபநயனம் – ஒரு எளிய அறிமுகம்",
    "coverUrl": "/covers/upanayanam.jpg",
    "detailsUrl": "https://www.prekshaa.in/archive?field_preksha_series_tid=7139",
    "originalAuthors": "Hari Ravikumar",
    "publisher": "Prekshaa Pratishtana",
    "publicationDate": "March 02, 2019",
    "pageCount": null,
    "isbn": null,
    "category": "Translated Work",
    "tags": "religion, hinduism, upanayanam, ritual, ceremony, India",
    "description": "This is a 15 part series published at prekshaa.in. This is a Translated Work of Upanayanam – A Gentle Introduction by Hari Ravikumar"
  },
  {
    "id": 2,
    "title": "பகவத்கீதை தற்காலத் தமிழில்",
    "coverUrl": "/covers/bhagavad-gitai.jpg",
    "detailsUrl": "https://store.pothi.com/book/%E0%AE%B8%E0%AF%8D%E0%AE%B0%E0%AF%80%E0%AE%AA%E0%AF%8D%E0%AE%B0%E0%AE%BF%E0%AE%AF%E0%AE%BE-%E0%AE%B8%E0%AF%8D%E0%AE%B0%E0%AF%80%E0%AE%A8%E0%AE%BF%E0%AE%B5%E0%AE%BE%E0%AE%9A%E0%AE%A9%E0%AF%8D-%E0%AE%AA%E0%AE%95%E0%AE%B5%E0%AE%A4%E0%AF%8D%E0%AE%95%E0%AF%80%E0%AE%A4%E0%AF%88-%E0%AE%A4%E0%AE%B1%E0%AF%8D%E0%AE%95%E0%AE%BE%E0%AE%B2%E0%AE%A4%E0%AF%8D-%E0%AE%A4%E0%AE%AE%E0%AE%BF%E0%AE%B4%E0%AE%BF%E0%AE%B2%E0%AF%8D/",
    "amazonUrl": "https://amzn.in/d/8E1f4BP",
    "originalAuthors": "Koti Sreekrishna; Hari Ravikumar",
    "publisher": "CreateSpace Independent Publishing Platform",
    "publicationDate": "September 11, 2017",
    "pageCount": "340",
    "isbn": "9781976284601 (ISBN-13); 1976284600 (ISBN-10)",
    "category": "Translated Work",
    "tags": "religion, hinduism, sermon, gita, krishna, war, holy, tradition, India",
    "description": "A modern Translated Work of the Bhagavad-Gita, one of the most important works in the Hindu tradition. Two friends have a conversation at the outset of an epic war. One of them, Arjuna, is sad and confused in the face of imminent doom; the other, Krishna, decides to cheer him up and clear his doubts.\n\nThrough the course of their dialogue, while inspiring Arjuna to do his work, Krishna assumes the role of a mentor and imparts the timeless wisdom that is called the Bhagavad-Gita. For someone who wants to know about Indias grand heritage, religious traditions, philosophy, and spirituality, the Bhagavad-Gita is a good place to start. The present work includes the text of the Bhagavad-Gita in the Grantha script."
  },
  {
    "id": 1,
    "title": "கலாமின் இந்தியக் கனவுகள்",
    "coverUrl": "/covers/kalamin-indhiya-kanavugal.jpg",
    "detailsUrl": "https://www.noolulagam.com/product/?pid=34503",
    "amazonUrl": "https://amzn.in/d/2BgWsi3",
    "originalAuthors": "Dr. Y.S. Rajan; Dr. A.P.J. Abdul Kalam",
    "publisher": "கிழக்கு பதிப்பகம்",
    "publicationDate": "July 01, 2017",
    "pageCount": "280",
    "isbn": "B07BJK8TFY (ASIN); 9788184937947 (ISBN)",
    "category": "Translated Work",
    "tags": "India, science, technology, space, research, isro",
    "description": "From enhanced nuclear capability to an unmanned Moon mission, India's scientific achievements in recent years have been spectacular. But, according to the country s best-known scientist Dr. A.P.J. Abdul Kalam and his close associate Dr. Y.S. Rajan, we've only just begun. In a century that many experts predict may belong to India, the realization of the vision of a better future for everyone will require a keen understanding of our needs and this can only be achieved by tailoring our research and innovations to the goal of national development.\n\nIn The Scientific Indian, the authors of the path-breaking India 2020: A Vision for the New Millennium return after ten years to the core areas of scientific advancement that are crucial space exploration, satellite technology, missile development, earth and ocean resources, the biosphere, food production, energy and water harvesting, health care and communications, to name a few. For each aspect, the authors discuss Indian breakthroughs within the context of recent progress on the global platform, before outlining a pragmatic vision of technological development that will propel India to the forefront of the world in the decades to come."
  }
];

// Sort books by publication date, most recent first
export const books: Book[] = rawBooks.sort((a, b) => {
  const dateA = parseDateForSorting(a.publicationDate);
  const dateB = parseDateForSorting(b.publicationDate);
  return dateB.getTime() - dateA.getTime();
});

// Function to get the minimum publication year from the books data
export const getMinPublicationYear = (): number | undefined => {
  if (books.length === 0) return undefined;
  const dates = books
    .map(book => book.publicationDate)
    .filter(dateString => dateString) // Filter out null/undefined dates
    .map(dateString => parseDateForSorting(dateString!)); // Use non-null assertion after filter
  
  if (dates.length === 0) return undefined;
  const minDate = new Date(Math.min(...dates.map(date => date.getTime())));
  return minDate.getFullYear();
};

// Function to get the maximum publication year from the books data
export const getMaxPublicationYear = (): number | undefined => {
  if (books.length === 0) return undefined;
  const dates = books
    .map(book => book.publicationDate)
    .filter(dateString => dateString) // Filter out null/undefined dates
    .map(dateString => parseDateForSorting(dateString!)); // Use non-null assertion after filter

  if (dates.length === 0) return undefined;
  const maxDate = new Date(Math.max(...dates.map(date => date.getTime())));
  return maxDate.getFullYear();
};