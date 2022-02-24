const rent = [
  { id: 'rent1', amount: '120', ownerId: 'rent1', bikeId: 'bike2' },
  { id: 'rent2', amount: '120', ownerId: 'rent1', bikeId: 'bike2' },
  { id: 'rent1', amount: '120', ownerId: 'rent1', bikeId: 'bike1' },
];
const owner = [
  { ownerId: 'rent1', name: 'Juan' },
  { ownerId: 'rent2', name: 'Pedro' },
];
const bike = [
  { bikeId: 'bike1', model: 'bmx', price: '120' },
  { bikeId: 'bike2', model: 'mountain2', price: '90' },
];

const data = rent.map((re) => {
  const ownerData = owner.find((own) => own.ownerId === re.ownerId);
  const bikeData = bike.find((bik) => bik.bikeId === re.bikeId);
  return { ...re, ...ownerData, ...bikeData };
});

console.log(data);
/* let mergedSubjects = selectedSubjects.map((subject) => {
  let otherSubject = theOtherSubjects.find(
    (el) => el.subject_id === subject_id,
  );
  return { ...subject, ...otherSubject };
});
 */
