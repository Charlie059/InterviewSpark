export const generateFakeTopics = (
  pageNumber: number,
  itemsCountPerPage: number,
  searchInput: string,
  totalTopics: number
) => {
  const titles = [
    'How to prepare for a software engineering interview?',
    '10 Tips for a Successful Remote Work Experience',
    'Why Learning Data Science is a Good Career Choice',
    'How to Build an Effective Social Media Marketing Strategy',
    'The Future of Artificial Intelligence in Healthcare',
    'The Benefits of Learning a Second Language',
    'How to Start a Successful Online Business',
    'The Importance of Cybersecurity in the Digital Age',
    'How to Build a Successful Career in Marketing',
    'The Future of Renewable Energy',
    'The Art of Public Speaking: Tips for Effective Presentations',
    'The Impact of Social Media on Society',
    'The Benefits of Meditation for Mental Health',
    'The Top Programming Languages for Web Development',
    'The Basics of Investment: How to Get Started',
    'The Role of Technology in Education'
  ]

  const authors = [
    'John Doe',
    'Jane Smith',
    'Alex Kim',
    'Sarah Lee',
    'David Park',
    'Maria Rodriguez',
    'Mark Johnson',
    'Kim Lee',
    'Emily Davis',
    'John Smith',
    'Jessica Chen',
    'Michael Brown',
    'Amanda Lee',
    'Jason Kim',
    'Maggie Lee',
    'Karen Chen'
  ]

  const tags = [['Interview', 'Software Engineering', 'Remote Work', 'Productivity']]
  const imageUrl = [
    'https://res.cloudinary.com/highereducation/images/f_auto,q_auto/g_center,c_fill,fl_lossy,q_auto:best,w_448,h_382/v1662131318/ComputerScience.org/GettyImages-1180183927_73387d16/GettyImages-1180183927_73387d16.jpg?_i=AA'
  ]

  const getRandomElement = (arr: string | any[]) => arr[Math.floor(Math.random() * arr.length)]

  const fakeTopics = []

  for (let i = 0; i < itemsCountPerPage; i++) {
    const title = getRandomElement(titles)
    const author = getRandomElement(authors)
    const lastReply = `${Math.floor(Math.random() * 24)} hours ago`
    const excerpt = `In the picturesque, tranquil village nestled among the verdant, undulating hills, where meandering cobblestone paths led to charming, ivy-covered cottages, resplendent gardens blooming with vibrant, fragrant flowers, and friendly, welcoming villagers bustled about their daily routines, a young, bright-eyed, adventurous girl named Emily embarked on an extraordinary, life-altering journey, accompanied by her loyal, mischievous, and incredibly intelligent border collie named Jasper, as they traversed the lush, awe-inspiring countryside, encountering peculiar, intriguing characters, overcoming seemingly insurmountable challenges, and discovering the boundless depths of their courage, love, and determination in pursuit of uncovering the truth behind the enigmatic, ancient legend that had captivated the hearts and minds of generations of townsfolk, ultimately leading them to a breathtaking, hidden treasure that held the power to transform not only their lives, but also the very essence of the village itself, forging an unbreakable bond between the past, present, and future.`

    fakeTopics.push({
      id: i + 1,
      title,
      author,
      replies: Math.floor(Math.random() * 50),
      lastReply,
      excerpt,
      tags: getRandomElement(tags),
      imageUrl: getRandomElement(imageUrl)
    })
  }

  const filteredTopics = fakeTopics.filter(topic => topic.title.toLowerCase().includes(searchInput.toLowerCase()))

  const totalPages = Math.ceil(totalTopics / itemsCountPerPage)

  return { topics: filteredTopics, totalPages }
}
