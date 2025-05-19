**EcoConecta** é uma plataforma colaborativa focada na conscientização e ação em prol da **ODS 12: Consumo e Produção Responsáveis**. Usuários podem compartilhar artigos sobre sustentabilidade e divulgar eventos relacionados, como feiras, oficinas e mutirões ecológicos.

## Referencia: https://www.terracycle.com/en-US/

## 🚀 Tecnologias Utilizadas

| Tecnologia       
| [Next.js](https://nextjs.org/)      
| [TypeScript](https://www.typescriptlang.org/)    
| [Firebase](https://firebase.google.com/)   
| [Node.js](https://nodejs.org/)       
| Firebase Auth

## Front End

- Home (/)
-Descrição: Página inicial com uma breve apresentação do projeto e um feed dos posts e eventos mais recentes.

- Login/Cadastro (/auth)
- Descrição: Tela de autenticação do usuário com: Login via e-mail/senha. Cadastro simples com nome, e-mail e senha

-  Posts (/posts e /posts/new)
- Descrição: /posts: Lista de conteúdos compartilhados sobre consumo consciente e sustentabilidade. /posts/new: Formulário para criar um novo post com título, conteúdo e tags.

- Eventos (/events e /events/new)
- Descrição: /events: Lista de eventos sustentáveis abertos ao público (ex: mutirões, feiras, palestras). /events/new: Formulário para cadastrar um novo evento com título, descrição, data e local.


## Back End
```
| Método | Rota         | Descrição             |
| ------ | ------------ | --------------------- |
| GET    | `/posts`     | Listar todos os posts |
| GET    | `/posts/:id` | Obter post pelo ID    |
| POST   | `/posts`     | Criar novo post       |
| PUT    | `/posts/:id` | Atualizar post        |
| DELETE | `/posts/:id` | Deletar post          |
| ------ | ------------- | ----------------------- |
| GET    | `/events`     | Listar todos os eventos |
| GET    | `/events/:id` | Obter evento pelo ID    |
| POST   | `/events`     | Criar novo evento       |
| PUT    | `/events/:id` | Atualizar evento        |
| DELETE | `/events/:id` | Deletar evento          |
```

## Banco de Dados
```
// Collection: users
{
  uid: string;              // ID do Firebase Auth
  displayName: string;      // Nome público
  email: string;
  photoURL?: string;        // Foto de perfil
  bio?: string;             // Pequena descrição do usuário
  role?: "user" | "admin";  // Permissão (opcional)
  createdAt: Timestamp;
}
```

```
// Collection: posts
{
  id: string;               // ID do documento (gerado automaticamente)
  title: string;
  content: string;
  imageUrl?: string;
  tags: string[];           // ["reciclagem", "educação", ...]
  authorId: string;         // uid do autor (relaciona com `users.uid`)
  authorName: string;       // nome público
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}
```

```
// Collection: events
{
  id: string;
  title: string;
  description: string;
  date: Timestamp;
  location: string;
  category: string;         // Ex: "mutirão", "feira", "palestra"
  imageUrl?: string;
  authorId: string;         // uid do autor
  authorName: string;
  interestedUserIds: string[];  // lista de usuários interessados
  createdAt: Timestamp;
}
```

