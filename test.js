const DuplicatesRemover = require('./build/modules/duplicates_remover');

// const dr = new DuplicatesRemover('author');

/* dr.find_duplicates(['firstname', 'lastname'], {
    firstname: '90%',
    lastname: '90%',
}).then((results) => {}).catch(err => console.error(err));*/


const dr = new DuplicatesRemover('journal');
dr.find_duplicates(['name'], {
    name: '90%',
}).then((results) => {}).catch(err => console.error(err));
