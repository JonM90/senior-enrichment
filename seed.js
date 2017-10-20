const db = require('./db/index');
const Campus = require('./db/models/campus');
const Student = require('./db/models/student');

const campuses = [
  { name: 'Safe Space U', image: 'http://c8.nrostatic.com/sites/default/files/styles/original_image_with_cropping/public/uploaded/safe-space-campus-protest.jpg?itok=oJGqjAsi' },
  { name: 'Apple U', image: 'https://lh3.googleusercontent.com/_6YA9EjmCVr9xyFyzdNrSlZEHI6iWIt9eDbUttrJL6wRJRPM7mHDc62FpqBO4sGgfENjp02_iSfkwi9uKZ8Im9dLyn-5o318=s750' },
  { name: 'Pink U', image: 'http://www.greatvaluecolleges.net/wp-content/uploads/2016/01/university-washington-cheapest-colleges-most-beautiful-college-campuses-1024x626.jpg' },
  { name: 'Broken U', image: 'https://static.wixstatic.com/media/152efa_f87772b08f544532946ef76772e8bb41~mv2_d_5184_3456_s_4_2.jpg/v1/fill/w_630,h_420,al_c,q_80,usm_0.66_1.00_0.01/152efa_f87772b08f544532946ef76772e8bb41~mv2_d_5184_3456_s_4_2.webp' }
];

const roster = [ 'Abdul',
'Atom',
'Bandit',
'Batman',
'Ben',
'Betsy',
'Brad',
'Buddy',
'Cody',
'Debbie',
'Ellen',
'Elliott',
'Felix',
'Fira',
'Harry',
'Henry',
'Jake',
'Jane',
'Jasper',
'Lana',
'Luke',
'Max',
'Milton',
'Odie',
'Pena',
'Ribs',
'Shakespeare',
'Snow',
'Stacey',
'Stuart',
'Sushi',
'Tacocat' ]

const students = roster.map( (stu, idx) => {
  let type;
  if (stu === 'Atom') type = 'png';
  else if (stu === 'Betsy') type = 'gif';
  else type = 'jpg';
  return {
    name: stu,
    image: `/images/${stu}.${type}`,
    email: `${stu}@email.com`,
    campusId: idx%4 + 1
  };
});

//const id = () => Math.round(Math.random() * (students.length - 1)) + 1;

const seed = () =>
  Promise.all(campuses.map(campus =>
    Campus.create(campus))
  )
  .then(() =>
  Promise.all(students.map(student =>
    Student.create(student))
  )
)

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
