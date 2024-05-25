db.createCollection('words');

db.createUser({
  user: 'nestjs',
  pwd: 'nestjsPassword',
  roles: [
    {
      role: 'readWrite',
      db: 'dictionary',
    },
  ],
});

const insertWords = async () => {
  const words = await fetch(
    'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json',
  )
    .then((res) => res.json())
    .then((data) => Object.keys(data));

  const chunkSize = 10000;
  const chunks = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(
      words
        .slice(i, i + chunkSize)
        .map((words_dictionary) => ({ word: words_dictionary })),
    );
  }

  for (const chunk of chunks) {
    db.words.insertMany(chunk);
  }
};

insertWords();
