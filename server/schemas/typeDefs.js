const typeDefs = `
  type User {

    _id: ID
    username: String!
    email: String!
    password: String!
    saveBooks: [Book]!
    bookCount: Int

  }

  type Book {

    bookId: ID!
    authors: [String]
    title: String!
    description: String
    image: String
    bookID: String
    link: String
  
  }
 
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
          me: User
              }


  type Mutation {
  loginUser(email: String!, password: String!): Auth
   createUser(username: String!, email: String!, password: String!): Auth
  
    saveBook(input: BookInput!): User
    removeBook(bookId: ID!): User
              }

  input BookInput {

    authors: [String]
    description: String!
    title: String!
    bookId: ID!
    image: String
    link: String

  }
`;

module.exports = typeDefs;
