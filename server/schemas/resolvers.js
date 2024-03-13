
// server/schemas/resolvers.js
const { User } = require('../models');



const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {

  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('savedBooks');
        return user;
      }
      throw new AuthenticationError('You are not logged in');
    },
  },


  Mutation: {
    // find one user 
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }
// check the password 
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Invalid credentials');
      }
      const token = signToken(user);
      return { token, user };
    },


    // create new users or add a new user 
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      console.log(user)
      const token = signToken(user);
      console.log("getting the token")
      console.log(token)
      return { token, user };
    },

   
    // saveBook 
    saveBook: async (parent, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedBooks: input} },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('User not logged in');
    },

    // removeBook
    removeBook: async (parent, { bookId }, context) => {
   

      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
   // filter criteria to remove the book 
          context.user._id,
          { $pull: { savedBooks: {bookId} } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;