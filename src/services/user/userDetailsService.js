const userDetailsService = async (req, dataModel) => {
  try {
    const { email } = req.headers.user;
    debugger;
    const user = await dataModel.aggregate([
      {
        $match: { email:email },
      },
    ]);
    debugger;
    return { status: 'success', data: user };
  } catch (error) {
    return { status: 'fail', data: error.toString() };
  }
};

module.exports = userDetailsService;
