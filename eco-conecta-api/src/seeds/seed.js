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

    // Adiciona 3 posts
    const posts = [
      {
        title: 'A importância da reciclagem para o meio ambiente',
        content: 'Reciclar ajuda a diminuir a quantidade de lixo nos aterros e preserva recursos naturais.',
        tags: ['reciclagem', 'sustentabilidade', 'meio ambiente'],
        authorId: 'test-user-1',
        authorName: 'Usuário de Teste',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        title: 'Como o desmatamento afeta a biodiversidade',
        content: 'O desmatamento leva à perda de habitat e ameaça diversas espécies de plantas e animais.',
        tags: ['desmatamento', 'biodiversidade', 'natureza'],
        authorId: 'test-user-1',
        authorName: 'Usuário de Teste',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        title: 'Práticas simples para reduzir o lixo doméstico',
        content: 'Separe seu lixo, reutilize embalagens e evite o desperdício para contribuir com um planeta mais limpo.',
        tags: ['lixo', 'reciclagem', 'consumo consciente'],
        authorId: 'test-user-1',
        authorName: 'Usuário de Teste',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
    ];

    for (const post of posts) {
      const postRef = db.collection('posts').doc();
      await postRef.set(post);
    }

    // Adiciona 6 eventos (3 eventos + 3 denúncias)
    const now = new Date();
    const events = [
      // Eventos de reciclagem/sustentabilidade
      {
        title: 'Feira de Reciclagem na Praça Central',
        description: 'Venha aprender a separar corretamente seu lixo e contribuir com o meio ambiente.',
        date: admin.firestore.Timestamp.fromDate(new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000)), // daqui 5 dias
        location: 'Praça Central',
        category: 'feira',
        authorId: 'test-user-1',
        authorName: 'Usuário de Teste',
        interestedUserIds: [],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        title: 'Palestra: Impactos do Desmatamento na Região',
        description: 'Discussão sobre os efeitos ambientais do desmatamento e como podemos ajudar a combater.',
        date: admin.firestore.Timestamp.fromDate(new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000)), // daqui 10 dias
        location: 'Auditório Municipal',
        category: 'palestra',
        authorId: 'test-user-1',
        authorName: 'Usuário de Teste',
        interestedUserIds: [],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        title: 'Mutirão de Limpeza no Parque das Flores',
        description: 'Participe do mutirão para limpar o parque e promover a conscientização ambiental.',
        date: admin.firestore.Timestamp.fromDate(new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000)), // daqui 15 dias
        location: 'Parque das Flores',
        category: 'mutirão',
        authorId: 'test-user-1',
        authorName: 'Usuário de Teste',
        interestedUserIds: [],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },

      // Eventos do tipo denúncia (desmatamento, lixo, poluição)
      {
        title: 'Denúncia: Desmatamento ilegal na Área Rural',
        description: 'Foi identificado corte ilegal de árvores próximo à estrada principal da zona rural.',
        date: admin.firestore.Timestamp.fromDate(new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)), // 2 dias atrás
        location: 'Zona Rural - Estrada Principal',
        category: 'denúncia',
        authorId: 'test-user-1',
        authorName: 'Usuário de Teste',
        interestedUserIds: [],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        title: 'Denúncia: Acúmulo de lixo em área de proteção ambiental',
        description: 'Grande quantidade de lixo foi encontrada próximo à reserva ambiental local.',
        date: admin.firestore.Timestamp.fromDate(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)), // 1 dia atrás
        location: 'Reserva Ambiental Local',
        category: 'denúncia',
        authorId: 'test-user-1',
        authorName: 'Usuário de Teste',
        interestedUserIds: [],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        title: 'Denúncia: Poluição do rio na região industrial',
        description: 'Descarga ilegal de resíduos está poluindo o rio que passa pela área industrial.',
        date: admin.firestore.Timestamp.fromDate(new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)), // 3 dias atrás
        location: 'Rio da Região Industrial',
        category: 'denúncia',
        authorId: 'test-user-1',
        authorName: 'Usuário de Teste',
        interestedUserIds: [],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
    ];

    for (const event of events) {
      const eventRef = db.collection('events').doc();
      await eventRef.set(event);
    }

    console.log('✅ Seed inserida com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao inserir seed:', error);
    process.exit(1);
  }
}

seed();
