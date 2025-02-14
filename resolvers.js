const Book = require("./modules/Book");

const resolvers = {
  Query: {
    books: async () => await Book.find(),
    book: async (_, { id }) => await Book.findById(id),
  },
  Mutation: {
    addBook: async (_, { title, author }) => {
      const newBook = new Book({ title, author });
      return await newBook.save();
    },
    updateBook: async (_, { id, title, author }) => {
      return await Book.findByIdAndUpdate(id, { title, author }, { new: true });
    },
    deleteBook: async (_, { id }) => {
      await Book.findByIdAndDelete(id);
      return "Book deleted successfully";
    },
  },
};

module.exports = resolvers;
