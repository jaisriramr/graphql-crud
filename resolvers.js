const Book = require("./modules/Book");
const User = require("./modules/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = process.env.SECRET_KEY;

const resolvers = {
  Query: {
    books: async () => await Book.find(),
    book: async (_, { id }) => await Book.findById(id),
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Authentication requried");
      return user;
    },
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, {
        expiresIn: "1h",
      });

      return { user: newUser, token };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid password");

      const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
        expiresIn: "1h",
      });

      return { user, token };
    },

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
