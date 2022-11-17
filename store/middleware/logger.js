export const loggerMiddleware = (store) => (next) => (action) => {
  try {
    if (!action.type) {
      return next(action);
    }
    console.log("\n\n");

    console.log("\ntype: ", action.type);
    console.log("\npayload: ", action.payload);
    console.log("\ncurrentState: ", store.getState());

    next(action);
    console.log("\nnext state: ", store.getState());
    // console.log("\n\n");
  } catch (error) {
    console.log(error);
  }
};
