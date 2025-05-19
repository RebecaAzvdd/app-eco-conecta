const admin = require('firebase-admin');
const { db } = require('../config/firebase'); // ajuste esse caminho se for diferente

async function seed() {
  try {
    // Adiciona um usuário
    const userRef = db.collection('users').doc('test-user-1');
    await userRef.set({
      uid: 'test-user-1',
      displayName: 'Usuário de Teste',
      email: 'teste@email.com',
      role: 'user',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Adiciona um post
    const postRef = db.collection('posts').doc();
    await postRef.set({
      title: 'Primeiro post de teste',
      content: 'Conteúdo do post para testar o banco.',
      tags: ['reciclagem', 'educação'],
      authorId: 'test-user-1',
      authorName: 'Usuário de Teste',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Adiciona um evento
    const eventRef = db.collection('events').doc();
    await eventRef.set({
      title: 'Feira de Reciclagem',
      description: 'Evento para incentivar o consumo responsável.',
      date: admin.firestore.Timestamp.fromDate(new Date()),
      location: 'Praça Central',
      category: 'feira',
      authorId: 'test-user-1',
      authorName: 'Usuário de Teste',
      interestedUserIds: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log('✅ Seed inserida com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao inserir seed:', error);
    process.exit(1);
  }
}

seed();
