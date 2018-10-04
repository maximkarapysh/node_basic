const fs = require('fs');

const command = process.argv[2];
const title = process.argv[3];
const content = process.argv[4];

// console.log(process.argv)


switch (command) {
    case 'list': 
    case '-l':
        list();
        break;

    case 'view':
    case '-v':

        view(title, (error, note) => {
            if (error) return console.error(error.message);

            console.log(`# ${note.title} \r\n\r\n---\r\n\r\n${note.content}`);
        }); 
        break;

    case 'create':
    case '-c':
        create(title, content, error => {
            if (error) return console.error(error.message);

            console.log("Заметка создана");
        }); 
        break;

    case 'remove':
    case '-r':
        remove(title, error => {
            if (error) return console.error(error.message)

            console.log('Заметка удалена')
        });
        break;

    default: 
        console.log('Unknown command')
}

function list() {
    fs.readFile('notes.json', (err, data) => {
        if (err) return console.error(err.message);

        const notes = JSON.parse(data);

        notes.forEach((note, index) => {
            console.log(`${index + 1}. ${note.title}`)
        });
    });
}

function view(title, done) {
    fs.readFile('notes.json', (error, data) => {
        if (error) return done(error);

        const notes = JSON.parse(data);
        const note = notes.find(note => note.title === title);

        if (!note) return done(new Error('Заметка не найдена'))
        
        done(null, note)
    });
}


function create(title, content, done) {
    fs.readFile('notes.json', (error, data) => {
        if (error) return done(error);

        const notes = JSON.parse(data);
        
        notes.push({
            title,
            content
        });

        const json = JSON.stringify(notes);

        fs.writeFile('notes.json', json, (err) => {
            if (err) return done(err);

            done()
          })
    });
}

function remove(title, done) {
    fs.readFile('notes.json', (error, data) => {
        if (error) return done(error);

        let notes = JSON.parse(data);

        notes = notes.filter(note => note.title !== title);

        const json = JSON.stringify(notes);
        
        fs.writeFile('notes.json', json, (error) => {
            if (error) return done(error);

            done()
        })        
    })
}